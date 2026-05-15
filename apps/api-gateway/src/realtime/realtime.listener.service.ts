import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { type Channel, type ChannelModel, type ConsumeMessage } from 'amqplib';

import { ChatMembershipCacheService } from './chat-membership-cache.service.js';
import { RealtimeService, type RealtimePayload } from './realtime.service.js';

@Injectable()
export class RealtimeListenerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RealtimeListenerService.name);
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly realtimeService: RealtimeService,
    private readonly chatMembershipCacheService: ChatMembershipCacheService,
  ) {}

  async onModuleInit() {
    const rabbitMqUrl = this.configService.get<string>('realtime.rabbitMqUrl');
    const exchange = this.configService.get<string>('realtime.exchange') ?? 'telegram.events';

    if (!rabbitMqUrl) {
      this.logger.warn('Realtime listener is disabled because RABBITMQ_URL is not configured.');
      return;
    }

    this.connection = await amqp.connect(rabbitMqUrl);
    const channel = await this.connection.createChannel();
    this.channel = channel;
    await channel.assertExchange(exchange, 'topic', { durable: true });
    const queue = await channel.assertQueue('', { durable: false, exclusive: true, autoDelete: true });

    for (const routingKey of [
      'message.message.sent',
      'message.message.edited',
      'message.message.deleted',
      'message.message.reacted',
      'message.message.reaction_removed',
      'message.chat.read_position_updated',
      'chat.member.added',
      'chat.member.removed',
      'chat.member.banned',
    ]) {
      await channel.bindQueue(queue.queue, exchange, routingKey);
    }

    await channel.consume(queue.queue, (message) => {
      void this.handleMessage(message);
    });
  }

  async onModuleDestroy() {
    await this.channel?.close();
    await this.connection?.close();
  }

  private async handleMessage(message: ConsumeMessage | null) {
    if (!message || !this.channel) {
      return;
    }

    try {
      const parsed = JSON.parse(message.content.toString()) as {
        eventType?: string;
        payload?: {
          chatId?: string;
          messageId?: string;
          clientMessageId?: string;
          senderUserId?: string;
          type?: string;
          text?: string | null;
          attachments?: Array<{
            mediaId?: string;
            attachmentType?: string;
          }>;
          createdAt?: string;
          editedAt?: string;
          deletedAt?: string;
          status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
          userId?: string;
          lastReadMessageId?: string;
        };
      };
      const eventType = parsed.eventType ?? message.fields.routingKey;
      const payload = parsed.payload ?? {};
      const chatId = payload.chatId;

      if (!chatId) {
        this.channel.ack(message);
        return;
      }

      if (eventType === 'chat.member.added' && payload.userId) {
        this.chatMembershipCacheService.addMember(chatId, payload.userId);
        this.channel.ack(message);
        return;
      }

      if (
        ['chat.member.removed', 'chat.member.banned'].includes(eventType) &&
        payload.userId
      ) {
        this.chatMembershipCacheService.removeMember(chatId, payload.userId);
        this.channel.ack(message);
        return;
      }

      const memberUserIds = await this.chatMembershipCacheService.getActiveMemberUserIds(chatId);
      if (memberUserIds.length === 0) {
        this.channel.ack(message);
        return;
      }

      if (eventType === 'message.message.sent') {
        const preview = this.buildMessagePreview(payload);
        const createdEvent: RealtimePayload = {
          type: 'chat.message_created',
          chatId,
          ...(payload.messageId ? { messageId: payload.messageId } : {}),
          ...(payload.clientMessageId ? { clientMessageId: payload.clientMessageId } : {}),
          ...(payload.senderUserId ? { senderUserId: payload.senderUserId } : {}),
          ...(payload.createdAt ? { createdAt: payload.createdAt } : {}),
          ...(preview ? { preview } : {}),
        };
        this.realtimeService.emitToUsers(memberUserIds, createdEvent);
      }

      if (['message.message.edited', 'message.message.deleted', 'message.message.reacted', 'message.message.reaction_removed'].includes(eventType)) {
        const preview =
          eventType === 'message.message.edited'
            ? this.buildMessagePreview(payload)
            : eventType === 'message.message.deleted'
              ? 'Message deleted'
              : null;
        const updatedEvent: RealtimePayload = {
          type: 'chat.message_updated',
          chatId,
          ...(payload.messageId ? { messageId: payload.messageId } : {}),
          ...(payload.senderUserId ? { senderUserId: payload.senderUserId } : {}),
          ...(payload.status ? { messageStatus: payload.status } : {}),
          ...(eventType === 'message.message.edited' ? { updateKind: 'edited' as const } : {}),
          ...(eventType === 'message.message.deleted' ? { updateKind: 'deleted' as const } : {}),
          ...(payload.text ? { text: payload.text } : {}),
          ...(payload.editedAt ? { editedAt: payload.editedAt } : {}),
          ...(payload.deletedAt ? { deletedAt: payload.deletedAt } : {}),
          ...(preview ? { preview } : {}),
        };
        this.realtimeService.emitToUsers(memberUserIds, updatedEvent);
      }

      if (eventType === 'message.chat.read_position_updated') {
        const readEvent: RealtimePayload = {
          type: 'chat.read_updated',
          chatId,
          ...(payload.userId ? { userId: payload.userId } : {}),
          ...(payload.lastReadMessageId ? { lastReadMessageId: payload.lastReadMessageId } : {}),
        };
        this.realtimeService.emitToUsers(memberUserIds, readEvent);
      }

      this.channel.ack(message);
    } catch (error) {
      const details = error instanceof Error ? error.message : 'Unknown realtime listener error';
      this.logger.error(details);
      this.channel.nack(message, false, false);
    }
  }

  private buildMessagePreview(payload: {
    type?: string;
    text?: string | null;
    attachments?: Array<{
      mediaId?: string;
      attachmentType?: string;
    }>;
  }) {
    if (payload.text && payload.text.trim().length > 0) {
      return payload.text.trim().slice(0, 120);
    }

    switch (payload.type) {
      case 'image':
        return 'Photo';
      case 'video':
        return 'Video';
      case 'audio':
        return 'Voice message';
      case 'file':
        return 'File';
      default:
        if (payload.attachments && payload.attachments.length > 0) {
          return 'Attachment';
        }

        return null;
    }
  }
}
