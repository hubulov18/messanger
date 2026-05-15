import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { performance } from 'node:perf_hooks';
import { Prisma } from '../generated/prisma/client.js';
import type {
  ChatMessageSummaryDto,
  ChatSummaryProjectionRecordDto,
  ChatSummaryProjectionResponseDto,
} from '@telegram/contracts/internal-api';

import { PrismaService } from '../prisma/prisma.service.js';
import { toLastMessagePreview } from './message-summary-preview.js';
import {
  normalizeChatSummaryProjectionEvent,
  type ChatSummaryProjectionMutation,
  type ChatSummaryProjectionSourceRow,
} from './chat-summary-projection.events.js';

const CHAT_SUMMARY_PROJECTION_CONSUMER = 'chat_summary_projection';
const CHAT_SUMMARY_EVENT_TYPES = [
  'message.message.sent',
  'message.message.edited',
  'message.message.deleted',
] as const;

const summaryProjectionItemSelect = {
  chatId: true,
  lastMessagePreview: true,
  lastActivityAt: true,
  lastSenderUserId: true,
} as const;

const roundDuration = (value: number) => Math.round(value * 100) / 100;

@Injectable()
export class ChatSummaryProjectionService {
  private readonly logger = new Logger(ChatSummaryProjectionService.name);
  private processedEvents = 0;
  private duplicateEvents = 0;
  private malformedEvents = 0;
  private consumerErrors = 0;
  private lastLagMs: number | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

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

  async getProjectedSummaries(chatIds: string[], userId?: string): Promise<ChatSummaryProjectionResponseDto> {
    return this.getProjectedSummariesWithOptions(chatIds, userId, true);
  }

  async getProjectedSummariesWithOptions(
    chatIds: string[],
    userId: string | undefined,
    includeMetadata: boolean,
  ): Promise<ChatSummaryProjectionResponseDto> {
    const startedAt = performance.now();
    const timings: Record<string, number> = {};
    const projectionRowsStartedAt = performance.now();
    const projectionRowsPromise = (
      includeMetadata
        ? this.prisma.chatSummaryProjection.findMany({
            where: {
              chatId: {
                in: chatIds,
              },
            },
            orderBy: [{ lastActivityAt: 'desc' }, { chatId: 'asc' }],
          })
        : this.prisma.chatSummaryProjection.findMany({
            where: {
              chatId: {
                in: chatIds,
              },
            },
            select: summaryProjectionItemSelect,
          })
    ).finally(() => {
      timings.projectionRowsMs = roundDuration(performance.now() - projectionRowsStartedAt);
    });
    const unreadCountsStartedAt = performance.now();
    const unreadCountsPromise = (
      userId ? this.listUnreadCountsByChatIds(chatIds, userId) : Promise.resolve(new Map<string, number>())
    ).finally(() => {
      timings.unreadCountsMs = roundDuration(performance.now() - unreadCountsStartedAt);
    });
    const watermarkStartedAt = performance.now();
    const watermarkPromise = (
      includeMetadata
        ? this.prisma.chatSummaryProjectionOffset.findUnique({
            where: { consumer: CHAT_SUMMARY_PROJECTION_CONSUMER },
          })
        : Promise.resolve(null)
    ).finally(() => {
      timings.watermarkMs = roundDuration(performance.now() - watermarkStartedAt);
    });

    const [projectionRows, unreadCountsByChatId, watermark] = await Promise.all([
      projectionRowsPromise,
      unreadCountsPromise,
      watermarkPromise,
    ]);

    const projectionByChatId = new Map(projectionRows.map((row) => [row.chatId, row]));
    const projectionMetadataRows = includeMetadata
      ? (projectionRows as Array<{
          chatId: string;
          lastMessageId: string | null;
          lastMessagePreview: string | null;
          lastActivityAt: Date | null;
          lastSenderUserId: string | null;
          updatedAt: Date;
        }>)
      : [];

    const transformStartedAt = performance.now();
    const items: ChatMessageSummaryDto[] = chatIds.map((chatId) => {
      const row = projectionByChatId.get(chatId) ?? null;
      return {
        chatId,
        lastMessagePreview: row?.lastMessagePreview ?? null,
        lastActivityAt: row?.lastActivityAt?.toISOString() ?? null,
        lastSenderUserId: row?.lastSenderUserId ?? null,
        unreadCount: unreadCountsByChatId.get(chatId) ?? 0,
      };
    });
    timings.transformMs = roundDuration(performance.now() - transformStartedAt);
    timings.totalMs = roundDuration(performance.now() - startedAt);

    this.logSlowProjectedSummaries({
      chatCount: chatIds.length,
      userId,
      includeMetadata,
      projectionRowCount: projectionRows.length,
      timings,
    });

    return {
      items,
      projectionItems: includeMetadata
        ? projectionMetadataRows.map(
            (row): ChatSummaryProjectionRecordDto => ({
              chatId: row.chatId,
              lastMessageId: row.lastMessageId,
              lastMessagePreview: row.lastMessagePreview,
              lastActivityAt: row.lastActivityAt?.toISOString() ?? null,
              lastSenderUserId: row.lastSenderUserId,
              updatedAt: row.updatedAt.toISOString(),
            }),
          )
        : [],
      watermark:
        includeMetadata && watermark
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
    const watermark = await this.prisma.chatSummaryProjectionOffset.findUnique({
      where: { consumer: CHAT_SUMMARY_PROJECTION_CONSUMER },
    });

    return {
      consumer: CHAT_SUMMARY_PROJECTION_CONSUMER,
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
    const eventTypeSql = CHAT_SUMMARY_EVENT_TYPES.map((eventType) => `'${eventType}'`).join(', ');

    return this.prisma.$queryRawUnsafe<ChatSummaryProjectionSourceRow[]>(
      `SELECT
         oe.id,
         oe.event_type,
         oe.event_version,
         oe.aggregate_id,
         oe.payload_json,
         oe.occurred_at
       FROM outbox_events AS oe
       LEFT JOIN chat_summary_projection_events AS pe
         ON pe.event_id = oe.id
       WHERE oe.event_type IN (${eventTypeSql})
         AND pe.event_id IS NULL
       ORDER BY oe.occurred_at ASC, oe.id ASC
       LIMIT $1`,
      limit,
    );
  }

  private async applyEvent(event: ChatSummaryProjectionSourceRow) {
    const mutation = normalizeChatSummaryProjectionEvent(event);
    if (!mutation || Number.isNaN(mutation.occurredAt.getTime())) {
      this.logger.warn(`Skipping malformed chat summary event ${event.id} (${event.event_type})`);
      this.malformedEvents += 1;
      return this.markMalformedEventAsProcessed(event);
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.chatSummaryProjectionEvent.create({
          data: {
            eventId: mutation.eventId,
            eventType: mutation.eventType,
            occurredAt: mutation.occurredAt,
            chatId: mutation.chatId,
          },
        });

        await this.applyMutation(tx, mutation);

        await tx.chatSummaryProjectionOffset.upsert({
          where: { consumer: CHAT_SUMMARY_PROJECTION_CONSUMER },
          create: {
            consumer: CHAT_SUMMARY_PROJECTION_CONSUMER,
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

  private async markMalformedEventAsProcessed(event: ChatSummaryProjectionSourceRow) {
    try {
      await this.prisma.chatSummaryProjectionEvent.create({
        data: {
          eventId: event.id,
          eventType: event.event_type,
          occurredAt: event.occurred_at,
          chatId: this.extractChatId(event.payload_json),
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

  private async applyMutation(tx: Prisma.TransactionClient, mutation: ChatSummaryProjectionMutation) {
    switch (mutation.kind) {
      case 'sent': {
        const message = await tx.message.findUnique({
          where: { id: mutation.messageId },
          select: {
            id: true,
            chatId: true,
            senderUserId: true,
            type: true,
            text: true,
            deletedAt: true,
            createdAt: true,
            attachments: {
              select: { id: true },
            },
          },
        });

        if (!message) {
          return;
        }

        const existing = await tx.chatSummaryProjection.findUnique({
          where: { chatId: mutation.chatId },
        });

        if (existing?.lastActivityAt && existing.lastActivityAt.getTime() > message.createdAt.getTime()) {
          return;
        }

        await tx.chatSummaryProjection.upsert({
          where: { chatId: mutation.chatId },
          create: {
            chatId: mutation.chatId,
            lastMessageId: message.id,
            lastMessagePreview: toLastMessagePreview({
              type: message.type,
              text: message.text,
              deletedAt: message.deletedAt,
              attachmentCount: message.attachments.length,
            }),
            lastActivityAt: message.createdAt,
            lastSenderUserId: message.senderUserId,
            updatedAt: mutation.occurredAt,
          },
          update: {
            lastMessageId: message.id,
            lastMessagePreview: toLastMessagePreview({
              type: message.type,
              text: message.text,
              deletedAt: message.deletedAt,
              attachmentCount: message.attachments.length,
            }),
            lastActivityAt: message.createdAt,
            lastSenderUserId: message.senderUserId,
            updatedAt: mutation.occurredAt,
          },
        });
        return;
      }
      case 'edited': {
        const existing = await tx.chatSummaryProjection.findUnique({
          where: { chatId: mutation.chatId },
        });

        if (!existing || existing.lastMessageId !== mutation.messageId) {
          return;
        }

        const message = await tx.message.findUnique({
          where: { id: mutation.messageId },
          select: {
            type: true,
            text: true,
            deletedAt: true,
            attachments: {
              select: { id: true },
            },
          },
        });

        if (!message) {
          return;
        }

        await tx.chatSummaryProjection.update({
          where: { chatId: mutation.chatId },
          data: {
            lastMessagePreview: toLastMessagePreview({
              type: message.type,
              text: message.text,
              deletedAt: message.deletedAt,
              attachmentCount: message.attachments.length,
            }),
            updatedAt: mutation.occurredAt,
          },
        });
        return;
      }
      case 'deleted': {
        const existing = await tx.chatSummaryProjection.findUnique({
          where: { chatId: mutation.chatId },
        });

        if (!existing || existing.lastMessageId !== mutation.messageId) {
          return;
        }

        const replacement = await tx.message.findFirst({
          where: {
            chatId: mutation.chatId,
            deletedAt: null,
          },
          select: {
            id: true,
            senderUserId: true,
            type: true,
            text: true,
            deletedAt: true,
            createdAt: true,
            attachments: {
              select: { id: true },
            },
          },
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        });

        if (!replacement) {
          await tx.chatSummaryProjection.upsert({
            where: { chatId: mutation.chatId },
            create: {
              chatId: mutation.chatId,
              lastMessageId: null,
              lastMessagePreview: null,
              lastActivityAt: null,
              lastSenderUserId: null,
              updatedAt: mutation.occurredAt,
            },
            update: {
              lastMessageId: null,
              lastMessagePreview: null,
              lastActivityAt: null,
              lastSenderUserId: null,
              updatedAt: mutation.occurredAt,
            },
          });
          return;
        }

        await tx.chatSummaryProjection.update({
          where: { chatId: mutation.chatId },
          data: {
            lastMessageId: replacement.id,
            lastMessagePreview: toLastMessagePreview({
              type: replacement.type,
              text: replacement.text,
              deletedAt: replacement.deletedAt,
              attachmentCount: replacement.attachments.length,
            }),
            lastActivityAt: replacement.createdAt,
            lastSenderUserId: replacement.senderUserId,
            updatedAt: mutation.occurredAt,
          },
        });
      }
    }
  }

  private async listUnreadCountsByChatIds(chatIds: string[], userId: string) {
    const counts = new Map(chatIds.map((chatId) => [chatId, 0]));
    const rows = await this.prisma.$queryRaw<Array<{ chatId: string; unreadCount: number }>>(Prisma.sql`
      SELECT
        m.chat_id AS "chatId",
        COUNT(m.id)::int AS "unreadCount"
      FROM messages AS m
      LEFT JOIN read_receipts AS rr
        ON rr.chat_id = m.chat_id
       AND rr.user_id = ${userId}
      LEFT JOIN messages AS last_read
        ON last_read.id = rr.last_read_message_id
      WHERE m.chat_id IN (${Prisma.join(chatIds)})
        AND m.sender_user_id <> ${userId}
        AND m.deleted_at IS NULL
        AND (
          rr.last_read_message_id IS NULL
          OR m.created_at > last_read.created_at
          OR (m.created_at = last_read.created_at AND m.id <> rr.last_read_message_id)
        )
      GROUP BY m.chat_id
    `);

    for (const row of rows) {
      counts.set(row.chatId, row.unreadCount);
    }

    return counts;
  }

  private extractChatId(payload: unknown) {
    if (!payload || typeof payload !== 'object' || !('chatId' in payload)) {
      return null;
    }

    const chatId = (payload as { chatId?: unknown }).chatId;
    return typeof chatId === 'string' ? chatId : null;
  }

  private logSlowProjectedSummaries(params: {
    chatCount: number;
    userId: string | undefined;
    includeMetadata: boolean;
    projectionRowCount: number;
    timings: Record<string, number>;
  }) {
    const thresholdMs = this.configService.get<number>('instrumentation.slowRequestThresholdMs') ?? 500;

    if ((params.timings.totalMs ?? 0) < thresholdMs) {
      return;
    }

    this.logger.warn(
      `slow_projected_chat_summaries ${JSON.stringify({
        chatCount: params.chatCount,
        userId: params.userId ?? null,
        includeMetadata: params.includeMetadata,
        projectionRowCount: params.projectionRowCount,
        timings: params.timings,
      })}`,
    );
  }
}
