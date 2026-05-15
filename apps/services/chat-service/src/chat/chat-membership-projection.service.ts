import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { ChatMemberRole, ChatMemberStatus } from '../generated/prisma/client.js';

import { PrismaService } from '../prisma/prisma.service.js';
import {
  normalizeChatMembershipProjectionEvent,
  type ChatMembershipProjectionMutation,
  type ProjectionChatMemberRole,
  type ProjectionChatMemberStatus,
  type ChatMembershipProjectionSourceRow,
} from './chat-membership-projection.events.js';

const MEMBERSHIP_PROJECTION_CONSUMER = 'chat_membership_projection';
const MEMBERSHIP_EVENT_TYPES = [
  'chat.member.added',
  'chat.member.removed',
  'chat.member.banned',
  'chat.member.restricted',
] as const;

@Injectable()
export class ChatMembershipProjectionService {
  private readonly logger = new Logger(ChatMembershipProjectionService.name);
  private processedEvents = 0;
  private duplicateEvents = 0;
  private malformedEvents = 0;
  private consumerErrors = 0;
  private lastLagMs: number | null = null;

  constructor(private readonly prisma: PrismaService) {}

  async processPendingBatch(limit: number) {
    const events = await this.findUnprocessedEvents(limit);
    let processed = 0;
    let lastProcessedAt: Date | null = null;

    for (const event of events) {
      const applied = await this.applyEvent(event);
      if (applied) {
        processed += 1;
        this.processedEvents += 1;
        lastProcessedAt = event.occurred_at;
      }
    }

    if (lastProcessedAt) {
      this.lastLagMs = Math.max(0, Date.now() - lastProcessedAt.getTime());
    }

    return {
      processed,
      lagMs: this.lastLagMs,
      hasMore: events.length === limit,
    };
  }

  async getProjectedMembership(chatId: string) {
    const [items, watermark] = await Promise.all([
      this.prisma.chatMembershipProjection.findMany({
        where: { chatId },
        orderBy: [{ role: 'asc' }, { userId: 'asc' }],
      }),
      this.prisma.chatMembershipProjectionOffset.findUnique({
        where: { consumer: MEMBERSHIP_PROJECTION_CONSUMER },
      }),
    ]);

    return {
      userIds: items.filter((item) => item.status === ChatMemberStatus.active).map((item) => item.userId),
      items: items.map((item) => ({
        chatId: item.chatId,
        userId: item.userId,
        role: item.role,
        status: item.status,
        updatedAt: item.updatedAt.toISOString(),
      })),
      watermark: watermark
        ? {
            consumer: watermark.consumer,
            lastEventId: watermark.lastEventId,
            lastOccurredAt: watermark.lastOccurredAt?.toISOString() ?? null,
            updatedAt: watermark.updatedAt.toISOString(),
          }
        : null,
    };
  }

  async getMetricsSnapshot() {
    const watermark = await this.prisma.chatMembershipProjectionOffset.findUnique({
      where: { consumer: MEMBERSHIP_PROJECTION_CONSUMER },
    });

    return {
      consumer: MEMBERSHIP_PROJECTION_CONSUMER,
      processedEvents: this.processedEvents,
      duplicateEvents: this.duplicateEvents,
      malformedEvents: this.malformedEvents,
      consumerErrors: this.consumerErrors,
      lastLagMs: this.lastLagMs,
      watermark: watermark
        ? {
            lastEventId: watermark.lastEventId,
            lastOccurredAt: watermark.lastOccurredAt?.toISOString() ?? null,
            updatedAt: watermark.updatedAt.toISOString(),
          }
        : null,
    };
  }

  private async findUnprocessedEvents(limit: number) {
    const eventTypeSql = MEMBERSHIP_EVENT_TYPES.map((eventType) => `'${eventType}'`).join(', ');

    return this.prisma.$queryRawUnsafe<ChatMembershipProjectionSourceRow[]>(
      `SELECT
         oe.id,
         oe.event_type,
         oe.event_version,
         oe.aggregate_id,
         oe.payload_json,
         oe.occurred_at
       FROM outbox_events AS oe
       LEFT JOIN chat_membership_projection_events AS pe
         ON pe.event_id = oe.id
       WHERE oe.event_type IN (${eventTypeSql})
         AND pe.event_id IS NULL
       ORDER BY oe.occurred_at ASC, oe.id ASC
       LIMIT $1`,
      limit,
    );
  }

  private async applyEvent(event: ChatMembershipProjectionSourceRow) {
    const mutation = normalizeChatMembershipProjectionEvent(event);
    if (!mutation) {
      this.logger.warn(`Skipping malformed membership event ${event.id} (${event.event_type})`);
      this.malformedEvents += 1;
      return this.markMalformedEventAsProcessed(event);
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.chatMembershipProjectionEvent.create({
          data: {
            eventId: mutation.eventId,
            eventType: mutation.eventType,
            occurredAt: mutation.occurredAt,
            chatId: mutation.chatId,
            userId: mutation.userId,
          },
        });

        await this.applyMutation(tx, mutation);

        await tx.chatMembershipProjectionOffset.upsert({
          where: { consumer: MEMBERSHIP_PROJECTION_CONSUMER },
          create: {
            consumer: MEMBERSHIP_PROJECTION_CONSUMER,
            lastEventId: mutation.eventId,
            lastOccurredAt: mutation.occurredAt,
          },
          update: {
            lastEventId: mutation.eventId,
            lastOccurredAt: mutation.occurredAt,
          },
        });
      });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        this.duplicateEvents += 1;
        return false;
      }

      this.consumerErrors += 1;
      throw error;
    }
  }

  private async markMalformedEventAsProcessed(event: ChatMembershipProjectionSourceRow) {
    try {
      await this.prisma.chatMembershipProjectionEvent.create({
        data: {
          eventId: event.id,
          eventType: event.event_type,
          occurredAt: event.occurred_at,
        },
      });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        this.duplicateEvents += 1;
        return false;
      }

      this.consumerErrors += 1;
      throw error;
    }
  }

  private async applyMutation(
    tx: Prisma.TransactionClient,
    mutation: ChatMembershipProjectionMutation,
  ) {
    const existing = await tx.chatMembershipProjection.findUnique({
      where: {
        chatId_userId: {
          chatId: mutation.chatId,
          userId: mutation.userId,
        },
      },
    });

    const role = this.toRole(mutation.role ?? existing?.role ?? ChatMemberRole.member);
    const status = this.toStatus(mutation.status ?? existing?.status ?? ChatMemberStatus.active);

    await tx.chatMembershipProjection.upsert({
      where: {
        chatId_userId: {
          chatId: mutation.chatId,
          userId: mutation.userId,
        },
      },
      create: {
        chatId: mutation.chatId,
        userId: mutation.userId,
        role,
        status,
        updatedAt: mutation.occurredAt,
      },
      update: {
        role,
        status,
        updatedAt: mutation.occurredAt,
      },
    });
  }

  private toRole(role: ProjectionChatMemberRole | ChatMemberRole) {
    switch (role) {
      case 'owner':
        return ChatMemberRole.owner;
      case 'admin':
        return ChatMemberRole.admin;
      default:
        return ChatMemberRole.member;
    }
  }

  private toStatus(status: ProjectionChatMemberStatus | ChatMemberStatus) {
    switch (status) {
      case 'invited':
        return ChatMemberStatus.invited;
      case 'requested':
        return ChatMemberStatus.requested;
      case 'banned':
        return ChatMemberStatus.banned;
      case 'left':
        return ChatMemberStatus.left;
      case 'removed':
        return ChatMemberStatus.removed;
      default:
        return ChatMemberStatus.active;
    }
  }
}
