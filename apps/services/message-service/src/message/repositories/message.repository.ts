import { Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { MessageStatus, MessageType, OutboxEventStatus } from '../../generated/prisma/client.js';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../../prisma/prisma.service.js';

const messageListSelect = {
  id: true,
  chatId: true,
  senderUserId: true,
  type: true,
  text: true,
  replyToMessageId: true,
  forwardedFromMessageId: true,
  createdAt: true,
  editedAt: true,
  deletedAt: true,
  status: true,
  attachments: {
    select: {
      mediaId: true,
      attachmentType: true,
    },
  },
  reactions: {
    select: {
      emoji: true,
      userId: true,
    },
  },
} as const;

type OutboxWriter = {
  outboxEvent: {
    create: (args: {
      data: {
        id: string;
        eventType: string;
        eventVersion: number;
        aggregateId: string;
        partitionKey: string;
        payloadJson: object;
        occurredAt: Date;
        status: OutboxEventStatus;
      };
    }) => Promise<unknown>;
  };
};

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  createMessage(params: {
    chatId: string;
    senderUserId: string;
    clientMessageId: string;
    type: MessageType;
    text?: string;
    replyToMessageId?: string;
    forwardedFromMessageId?: string;
    attachments: Array<{ mediaId: string; attachmentType: string }>;
  }) {
    const messageId = `msg_${randomUUID()}`;
    const occurredAt = new Date();
    const attachmentCreates = params.attachments.map((attachment, index) => ({
      id: `msgatt_${randomUUID()}`,
      mediaId: attachment.mediaId,
      attachmentType: attachment.attachmentType,
      sortOrder: index,
    }));

    const messageCreate = this.prisma.message.create({
      data: {
        id: messageId,
        chatId: params.chatId,
        senderUserId: params.senderUserId,
        clientMessageId: params.clientMessageId,
        type: params.type,
        ...(params.text !== undefined ? { text: params.text } : {}),
        ...(params.replyToMessageId !== undefined ? { replyToMessageId: params.replyToMessageId } : {}),
        ...(params.forwardedFromMessageId !== undefined ? { forwardedFromMessageId: params.forwardedFromMessageId } : {}),
        attachments: {
          create: attachmentCreates,
        },
      },
      include: {
        attachments: true,
        reactions: true,
      },
    });

    const outboxCreate = this.prisma.outboxEvent.create({
      data: {
        id: `evt_${randomUUID()}`,
        eventType: 'message.message.sent',
        eventVersion: 1,
        aggregateId: messageId,
        partitionKey: params.chatId,
        payloadJson: {
          messageId,
          clientMessageId: params.clientMessageId,
          chatId: params.chatId,
          senderUserId: params.senderUserId,
          type: params.type,
          ...(params.text !== undefined ? { text: params.text } : { text: null }),
          attachments: params.attachments.map((attachment) => ({
            mediaId: attachment.mediaId,
            attachmentType: attachment.attachmentType,
          })),
          ...(params.replyToMessageId !== undefined
            ? { replyToMessageId: params.replyToMessageId }
            : { replyToMessageId: null }),
          createdAt: occurredAt.toISOString(),
        },
        occurredAt,
        status: OutboxEventStatus.pending,
      },
    });

    return this.prisma.$transaction([messageCreate, outboxCreate]).then(([message]) => message);
  }

  createCallEventMessage(params: {
    chatId: string;
    initiatorUserId: string;
    endedByUserId: string | null;
    callId: string;
    outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
    durationSec: number;
  }) {
    const occurredAt = new Date();
    const clientMessageId = `call_event_${params.callId}`;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.message.findUnique({
        where: {
          chatId_clientMessageId: {
            chatId: params.chatId,
            clientMessageId,
          },
        },
        include: {
          attachments: true,
          reactions: true,
        },
      });

      if (existing) {
        return existing;
      }

      const text = JSON.stringify({
        kind: 'call_event',
        callId: params.callId,
        initiatorUserId: params.initiatorUserId,
        endedByUserId: params.endedByUserId,
        outcome: params.outcome,
        durationSec: params.durationSec,
      });

      const message = await tx.message.create({
        data: {
          id: `msg_${randomUUID()}`,
          chatId: params.chatId,
          senderUserId: params.initiatorUserId,
          clientMessageId,
          type: MessageType.system,
          text,
        },
        include: {
          attachments: true,
          reactions: true,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'message.message.sent',
        aggregateId: message.id,
        partitionKey: message.chatId,
        payloadJson: {
          messageId: message.id,
          clientMessageId: message.clientMessageId,
          chatId: message.chatId,
          senderUserId: message.senderUserId,
          type: message.type,
          text: message.text,
          attachments: [],
          replyToMessageId: null,
          createdAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return message;
    });
  }

  findMessageById(messageId: string) {
    return this.prisma.message.findUnique({
      where: { id: messageId },
      select: messageListSelect,
    });
  }

  listMessages(chatId: string, limit: number) {
    return this.prisma.message.findMany({
      where: { chatId },
      select: messageListSelect,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  searchMessages(params: { chatId: string; query: string; limit: number }) {
    return this.prisma.message.findMany({
      where: {
        chatId: params.chatId,
        deletedAt: null,
        OR: [
          {
            text: {
              contains: params.query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: messageListSelect,
      orderBy: {
        createdAt: 'desc',
      },
      take: params.limit,
    });
  }

  async listChatIdsByMediaId(mediaId: string) {
    const attachments = await this.prisma.messageAttachment.findMany({
      where: {
        mediaId,
      },
      select: {
        message: {
          select: {
            chatId: true,
          },
        },
      },
    });

    return [...new Set(attachments.map((attachment) => attachment.message.chatId))];
  }

  listLatestMessagesByChatIds(chatIds: string[]) {
    return this.prisma.message.findMany({
      where: {
        chatId: {
          in: chatIds,
        },
      },
      select: {
        id: true,
        chatId: true,
        senderUserId: true,
        type: true,
        text: true,
        createdAt: true,
        deletedAt: true,
        attachments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: [{ chatId: 'asc' }, { createdAt: 'desc' }],
    });
  }

  listReadReceipts(chatIds: string[], userId: string) {
    return this.prisma.readReceipt.findMany({
      where: {
        userId,
        chatId: {
          in: chatIds,
        },
      },
      select: {
        chatId: true,
        lastReadMessageId: true,
      },
    });
  }

  listMessagesByIds(messageIds: string[]) {
    return this.prisma.message.findMany({
      where: {
        id: {
          in: messageIds,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });
  }

  listUnreadCandidateMessages(chatIds: string[], userId: string) {
    return this.prisma.message.findMany({
      where: {
        chatId: {
          in: chatIds,
        },
        senderUserId: {
          not: userId,
        },
        deletedAt: null,
      },
      select: {
        id: true,
        chatId: true,
        createdAt: true,
      },
    });
  }

  listReadReceiptsForChat(chatId: string) {
    return this.prisma.$queryRaw<Array<{ userId: string; lastReadMessageId: string; lastReadCreatedAt: Date | null }>>(
      Prisma.sql`
        SELECT
          rr.user_id AS "userId",
          rr.last_read_message_id AS "lastReadMessageId",
          m.created_at AS "lastReadCreatedAt"
        FROM read_receipts AS rr
        LEFT JOIN messages AS m
          ON m.id = rr.last_read_message_id
        WHERE rr.chat_id = ${chatId}
      `,
    );
  }

  listDeliveryReceiptsForChat(chatId: string) {
    return this.prisma.$queryRaw<
      Array<{ userId: string; lastDeliveredMessageId: string; lastDeliveredCreatedAt: Date | null }>
    >(
      Prisma.sql`
        SELECT
          dr.user_id AS "userId",
          dr.last_delivered_message_id AS "lastDeliveredMessageId",
          m.created_at AS "lastDeliveredCreatedAt"
        FROM delivery_receipts AS dr
        LEFT JOIN messages AS m
          ON m.id = dr.last_delivered_message_id
        WHERE dr.chat_id = ${chatId}
      `,
    );
  }

  upsertDeliveryReceipt(params: { chatId: string; userId: string; lastDeliveredMessageId: string }) {
    return this.prisma.deliveryReceipt.upsert({
      where: {
        chatId_userId: {
          chatId: params.chatId,
          userId: params.userId,
        },
      },
      update: {
        lastDeliveredMessageId: params.lastDeliveredMessageId,
      },
      create: {
        id: `delivery_${randomUUID()}`,
        chatId: params.chatId,
        userId: params.userId,
        lastDeliveredMessageId: params.lastDeliveredMessageId,
      },
    });
  }


  async editMessage(params: { messageId: string; text: string; editedByUserId: string }) {
    const existing = await this.prisma.message.findUnique({
      where: { id: params.messageId },
    });

    if (!existing) {
      return null;
    }

    return this.prisma.$transaction(async (tx) => {
      const occurredAt = new Date();

      if (existing.text !== null && existing.text !== undefined) {
        await tx.messageRevision.create({
          data: {
            id: `msgr_${randomUUID()}`,
            messageId: existing.id,
            previousText: existing.text,
            editedByUserId: params.editedByUserId,
            editedAt: occurredAt,
          },
        });
      }

      const message = await tx.message.update({
        where: { id: params.messageId },
        data: {
          text: params.text,
          status: MessageStatus.edited,
          editedAt: occurredAt,
        },
        include: {
          attachments: true,
          reactions: true,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'message.message.edited',
        aggregateId: message.id,
        partitionKey: message.chatId,
        payloadJson: {
          messageId: message.id,
          chatId: message.chatId,
          editorUserId: params.editedByUserId,
          text: message.text,
          editedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return message;
    });
  }

  deleteMessage(params: { messageId: string; deletedByUserId?: string; scope?: string }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const message = await tx.message.update({
        where: { id: params.messageId },
        data: {
          status: MessageStatus.deleted,
          deletedAt: occurredAt,
        },
        include: {
          attachments: true,
          reactions: true,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'message.message.deleted',
        aggregateId: message.id,
        partitionKey: message.chatId,
        payloadJson: {
          messageId: message.id,
          chatId: message.chatId,
          deletedByUserId: params.deletedByUserId ?? message.senderUserId,
          scope: params.scope ?? 'for_everyone',
          deletedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return message;
    });
  }

  upsertReadReceipt(params: { chatId: string; userId: string; lastReadMessageId: string }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const receipt = await tx.readReceipt.upsert({
        where: {
          chatId_userId: {
            chatId: params.chatId,
            userId: params.userId,
          },
        },
        update: {
          lastReadMessageId: params.lastReadMessageId,
        },
        create: {
          id: `read_${randomUUID()}`,
          chatId: params.chatId,
          userId: params.userId,
          lastReadMessageId: params.lastReadMessageId,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'message.chat.read_position_updated',
        aggregateId: receipt.id,
        partitionKey: params.chatId,
        payloadJson: {
          chatId: params.chatId,
          userId: params.userId,
          lastReadMessageId: params.lastReadMessageId,
          updatedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return receipt;
    });
  }

  addReaction(params: { messageId: string; userId: string; emoji: string }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const reaction = await tx.messageReaction.create({
        data: {
          id: `react_${randomUUID()}`,
          messageId: params.messageId,
          userId: params.userId,
          emoji: params.emoji,
        },
      });

      const message = await tx.message.findUnique({
        where: { id: params.messageId },
      });

      if (!message) {
        throw new Error('Message not found after reaction create');
      }

      await this.writeOutboxEvent(tx, {
        eventType: 'message.message.reacted',
        aggregateId: reaction.id,
        partitionKey: message.chatId,
        payloadJson: {
          messageId: params.messageId,
          chatId: message.chatId,
          userId: params.userId,
          emoji: params.emoji,
          createdAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return reaction;
    });
  }

  removeReaction(params: { messageId: string; emoji: string; userId: string }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const reaction = await tx.messageReaction.delete({
        where: {
          messageId_userId_emoji: {
            messageId: params.messageId,
            userId: params.userId,
            emoji: params.emoji,
          },
        },
      });

      const message = await tx.message.findUnique({
        where: { id: params.messageId },
      });

      if (!message) {
        throw new Error('Message not found after reaction delete');
      }

      await this.writeOutboxEvent(tx, {
        eventType: 'message.message.reaction_removed',
        aggregateId: reaction.id,
        partitionKey: message.chatId,
        payloadJson: {
          messageId: params.messageId,
          chatId: message.chatId,
          userId: params.userId,
          emoji: params.emoji,
          removedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return reaction;
    });
  }

  private writeOutboxEvent(
    tx: OutboxWriter,
    params: {
      eventType: string;
      aggregateId: string;
      partitionKey: string;
      payloadJson: object;
      occurredAt: Date;
    },
  ) {
    return tx.outboxEvent.create({
      data: {
        id: `evt_${randomUUID()}`,
        eventType: params.eventType,
        eventVersion: 1,
        aggregateId: params.aggregateId,
        partitionKey: params.partitionKey,
        payloadJson: params.payloadJson,
        occurredAt: params.occurredAt,
        status: OutboxEventStatus.pending,
      },
    });
  }
}
