import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { performance } from 'node:perf_hooks';
import { MessageType } from '../generated/prisma/client.js';

import type { CurrentUser } from '../auth/current-user.type.js';
import { ChatServiceClient } from '../chat-client/chat-service.client.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { NotificationServiceClient } from '../notification-client/notification-service.client.js';
import { ChatSummaryProjectionService } from './chat-summary-projection.service.js';
import { AddReactionDto } from './dto/add-reaction.dto.js';
import { DeleteMessageDto } from './dto/delete-message.dto.js';
import { EditMessageDto } from './dto/edit-message.dto.js';
import { ListMessagesDto } from './dto/list-messages.dto.js';
import { MarkReadDto } from './dto/mark-read.dto.js';
import { SearchMessagesDto } from './dto/search-messages.dto.js';
import { SendMessageDto } from './dto/send-message.dto.js';
import { toLastMessagePreview } from './message-summary-preview.js';
import { MessageRepository } from './repositories/message.repository.js';

type CallEventPayload = {
  kind: 'call_event';
  callId: string;
  initiatorUserId: string;
  endedByUserId: string | null;
  outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
  durationSec: number;
};

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatSummaryProjectionService: ChatSummaryProjectionService,
    private readonly chatServiceClient: ChatServiceClient,
    private readonly profileServiceClient: ProfileServiceClient,
    private readonly notificationServiceClient: NotificationServiceClient,
    private readonly configService: ConfigService,
  ) {}

  async sendMessage(currentUser: CurrentUser, body: SendMessageDto) {
    const startedAt = performance.now();
    const timings: Record<string, number> = {};

    const accessStartedAt = performance.now();
    const chatAccess = await this.chatServiceClient.getChatAccessContext(body.chatId, currentUser.userId);
    timings.chatAccessMs = roundDuration(performance.now() - accessStartedAt);

    if (!chatAccess.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: {
          reason: 'chat_missing',
        },
      });
    }

    if (chatAccess.memberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason: chatAccess.memberState === 'missing' ? 'membership_missing' : 'membership_inactive',
        },
      });
    }

    if (chatAccess.chatType === 'direct' && chatAccess.peerUserId) {
      const dmPolicyStartedAt = performance.now();
      await this.profileServiceClient.assertUsersCanDirectMessage(currentUser.userId, chatAccess.peerUserId);
      timings.directMessagePolicyMs = roundDuration(performance.now() - dmPolicyStartedAt);
    }

    if (!chatAccess.canSendMessages) {
      throw new ForbiddenException({
        message: 'User cannot send messages to this chat',
        details: {
          reason: 'send_restricted',
        },
      });
    }

    const createMessageStartedAt = performance.now();
    const message = await this.messageRepository.createMessage({
      chatId: body.chatId,
      senderUserId: currentUser.userId,
      clientMessageId: body.clientMessageId,
      type: body.type as MessageType,
      ...(body.text !== undefined ? { text: body.text } : {}),
      ...(body.replyToMessageId !== undefined ? { replyToMessageId: body.replyToMessageId } : {}),
      ...(body.forwardedFromMessageId !== undefined ? { forwardedFromMessageId: body.forwardedFromMessageId } : {}),
      attachments: body.attachments,
    });
    timings.createMessageMs = roundDuration(performance.now() - createMessageStartedAt);

    const notificationPayload = {
      messageId: message.id,
      chatId: message.chatId,
      senderUserId: message.senderUserId,
      senderDisplayName: currentUser.userId, // display name resolved by notification-service via profile
      ...(message.text ? { messagePreview: message.text } : {}),
    };

    // Fire-and-forget push notification — must never block or throw
    void this.notificationServiceClient.queueMessageNotification(notificationPayload);

    timings.totalMs = roundDuration(performance.now() - startedAt);
    this.logSlowSendMessage({
      userId: currentUser.userId,
      chatId: body.chatId,
      attachmentCount: body.attachments.length,
      timings,
    });

    return {
      message: this.toMessageResponse(message),
    };
  }

  async editMessage(currentUser: CurrentUser, messageId: string, body: EditMessageDto) {
    const existing = await this.messageRepository.findMessageById(messageId);
    if (!existing) {
      throw new NotFoundException('Message not found');
    }

    if (existing.senderUserId !== currentUser.userId) {
      throw new NotFoundException('Message not found');
    }

    const message = await this.messageRepository.editMessage({
      messageId,
      text: body.text,
      editedByUserId: currentUser.userId,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return {
      message: {
        id: message.id,
        text: message.text,
        editedAt: message.editedAt?.toISOString() ?? null,
      },
    };
  }

  async deleteMessage(currentUser: CurrentUser, messageId: string, _body: DeleteMessageDto) {
    const message = await this.messageRepository.findMessageById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.senderUserId !== currentUser.userId) {
      throw new NotFoundException('Message not found');
    }

    await this.messageRepository.deleteMessage({
      messageId,
      deletedByUserId: currentUser.userId,
      scope: _body.scope,
    });

    return {
      success: true,
    };
  }

  async listMessages(currentUser: CurrentUser, chatId: string, query: ListMessagesDto) {
    const startedAt = performance.now();
    const timings: Record<string, number> = {};

    const accessStartedAt = performance.now();
    await this.chatServiceClient.assertChatAccess(chatId, currentUser.userId, 'access');
    timings.chatAccessMs = roundDuration(performance.now() - accessStartedAt);

    const listMessagesStartedAt = performance.now();
    const messages = await this.messageRepository.listMessages(chatId, query.limit ?? 50);
    timings.listMessagesMs = roundDuration(performance.now() - listMessagesStartedAt);
    const latestVisibleMessageId = messages[0]?.id;

    if (latestVisibleMessageId) {
      const deliveryReceiptStartedAt = performance.now();
      this.queueDeliveryReceiptUpdate({
        chatId,
        userId: currentUser.userId,
        lastDeliveredMessageId: latestVisibleMessageId,
      });
      timings.upsertDeliveryReceiptMs = roundDuration(performance.now() - deliveryReceiptStartedAt);
    }

    const deliveryStateStartedAt = performance.now();
    const deliveryStateByMessageId = await this.getDeliveryStateByMessageId(messages);
    timings.deliveryStateMs = roundDuration(performance.now() - deliveryStateStartedAt);

    const transformStartedAt = performance.now();
    const items = messages.map((message) => this.toMessageListItem(message, deliveryStateByMessageId.get(message.id)));
    timings.transformMs = roundDuration(performance.now() - transformStartedAt);
    timings.totalMs = roundDuration(performance.now() - startedAt);

    this.logSlowListMessages({
      userId: currentUser.userId,
      chatId,
      limit: query.limit ?? 50,
      messageCount: messages.length,
      timings,
    });

    return {
      items,
      nextCursor: null,
    };
  }

  async searchMessages(currentUser: CurrentUser, chatId: string, query: SearchMessagesDto) {
    await this.chatServiceClient.assertChatAccess(chatId, currentUser.userId, 'access');

    const normalizedQuery = query.query.trim();
    if (!normalizedQuery) {
      return {
        items: [],
      };
    }

    const messages = await this.messageRepository.searchMessages({
      chatId,
      query: normalizedQuery,
      limit: query.limit ?? 20,
    });

    const deliveryStateByMessageId = await this.getDeliveryStateByMessageId(messages);

    return {
      items: messages.map((message) => this.toMessageListItem(message, deliveryStateByMessageId.get(message.id))),
    };
  }

  async markRead(currentUser: CurrentUser, chatId: string, body: MarkReadDto) {
    await this.chatServiceClient.assertChatAccess(chatId, currentUser.userId, 'access');

    await Promise.all([
      this.messageRepository.upsertDeliveryReceipt({
        chatId,
        userId: currentUser.userId,
        lastDeliveredMessageId: body.lastReadMessageId,
      }),
      this.messageRepository.upsertReadReceipt({
        chatId,
        userId: currentUser.userId,
        lastReadMessageId: body.lastReadMessageId,
      }),
    ]);

    return {
      success: true,
      chatId,
      lastReadMessageId: body.lastReadMessageId,
    };
  }

  async getChatSummaries(chatIds: string[], userId?: string) {
    if (chatIds.length === 0) {
      return { items: [] };
    }

    const latestMessages = await this.messageRepository.listLatestMessagesByChatIds(chatIds);
    const summaries = new Map<string, (typeof latestMessages)[number]>();

    for (const message of latestMessages) {
      if (!summaries.has(message.chatId)) {
        summaries.set(message.chatId, message);
      }
    }

    const unreadCountsByChatId = userId ? await this.getUnreadCountsByChatId(chatIds, userId) : new Map<string, number>();

    return {
      items: chatIds.map((chatId) => {
        const message = summaries.get(chatId);

        return {
          chatId,
          lastMessagePreview: message ? this.toLastMessagePreview(message) : null,
          lastActivityAt: message?.createdAt.toISOString() ?? null,
          lastSenderUserId: message?.senderUserId ?? null,
          unreadCount: unreadCountsByChatId.get(chatId) ?? 0,
        };
      }),
    };
  }

  async getProjectedChatSummaries(chatIds: string[], userId?: string, includeMetadata = true) {
    if (chatIds.length === 0) {
      return {
        items: [],
        projectionItems: includeMetadata ? [] : [],
        watermark: null,
      };
    }

    return this.chatSummaryProjectionService.getProjectedSummariesWithOptions(chatIds, userId, includeMetadata);
  }

  getChatSummaryProjectionMetrics() {
    return this.chatSummaryProjectionService.getMetricsSnapshot();
  }

  async getMediaAccess(mediaId: string, userId: string) {
    const chatIds = await this.messageRepository.listChatIdsByMediaId(mediaId);

    if (chatIds.length === 0) {
      return {
        attachedToMessages: false,
        canAccess: false,
      };
    }

    const accessResults = await Promise.all(
      chatIds.map(async (chatId) => {
        const access = await this.chatServiceClient.getChatAccessContext(chatId, userId);
        return access.canAccess;
      }),
    );

    return {
      attachedToMessages: true,
      canAccess: accessResults.some(Boolean),
    };
  }

  async createCallEventMessage(body: {
    callId: string;
    chatId: string;
    initiatorUserId: string;
    endedByUserId: string | null;
    outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
    durationSec: number;
  }) {
    const message = await this.messageRepository.createCallEventMessage(body);

    return {
      messageId: message.id,
    };
  }

  async addReaction(currentUser: CurrentUser, messageId: string, body: AddReactionDto) {
    const message = await this.messageRepository.findMessageById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    await this.chatServiceClient.assertChatAccess(message.chatId, currentUser.userId, 'access');

    await this.messageRepository.addReaction({
      messageId,
      userId: currentUser.userId,
      emoji: body.emoji,
    });

    return {
      success: true,
    };
  }

  async removeReaction(currentUser: CurrentUser, messageId: string, emoji: string) {
    const message = await this.messageRepository.findMessageById(messageId);
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    await this.chatServiceClient.assertChatAccess(message.chatId, currentUser.userId, 'access');

    await this.messageRepository.removeReaction({
      messageId,
      emoji,
      userId: currentUser.userId,
    });

    return {
      success: true,
    };
  }

  private async getDeliveryStateByMessageId(
    messages: Array<{ id: string; chatId: string; senderUserId: string; createdAt: Date }>,
  ) {
    if (messages.length === 0) {
      return new Map<string, { delivered: boolean; seen: boolean }>();
    }

    const chatId = messages[0]?.chatId;
    if (!chatId) {
      return new Map();
    }

    const [readReceipts, deliveryReceipts] = await Promise.all([
      this.messageRepository.listReadReceiptsForChat(chatId),
      this.messageRepository.listDeliveryReceiptsForChat(chatId),
    ]);
    const readPosition = this.buildReceiptPosition(readReceipts, 'lastReadMessageId', 'lastReadCreatedAt');
    const deliveryPosition = this.buildReceiptPosition(
      deliveryReceipts,
      'lastDeliveredMessageId',
      'lastDeliveredCreatedAt',
    );
    const stateByMessageId = new Map<string, { delivered: boolean; seen: boolean }>();

    for (const message of messages) {
      const messageCreatedAtMs = message.createdAt.getTime();
      const seen = this.positionCoversMessage(readPosition, message.senderUserId, message.id, messageCreatedAtMs);
      const delivered =
        seen ||
        this.positionCoversMessage(deliveryPosition, message.senderUserId, message.id, messageCreatedAtMs);

      stateByMessageId.set(message.id, { delivered, seen });
    }

    return stateByMessageId;
  }

  private queueDeliveryReceiptUpdate(params: {
    chatId: string;
    userId: string;
    lastDeliveredMessageId: string;
  }) {
    void this.messageRepository
      .upsertDeliveryReceipt(params)
      .catch((error) => {
        this.logger.warn(
          `delivery_receipt_update_failed chatId=${params.chatId} userId=${params.userId} messageId=${params.lastDeliveredMessageId} error=${String(error)}`,
        );
      });
  }

  private buildReceiptPosition<
    TReceipt extends {
      userId: string;
      [key: string]: string | Date | null;
    },
  >(
    receipts: TReceipt[],
    messageIdKey: keyof TReceipt,
    createdAtKey: keyof TReceipt,
  ) {
    const maxTimeByUserId = new Map<string, number>();
    const receiptMessageIdsByUserId = new Map<string, Set<string>>();

    for (const receipt of receipts) {
      const receiptMessageId = receipt[messageIdKey];
      if (typeof receiptMessageId !== 'string' || receiptMessageId.length === 0) {
        continue;
      }

      const receiptCreatedAt = receipt[createdAtKey];
      if (!(receiptCreatedAt instanceof Date)) {
        continue;
      }
      const receiptTime = receiptCreatedAt.getTime();

      const previousMax = maxTimeByUserId.get(receipt.userId) ?? Number.NEGATIVE_INFINITY;
      if (receiptTime > previousMax) {
        maxTimeByUserId.set(receipt.userId, receiptTime);
      }

      const existingIds = receiptMessageIdsByUserId.get(receipt.userId);
      if (existingIds) {
        existingIds.add(receiptMessageId);
        continue;
      }

      receiptMessageIdsByUserId.set(receipt.userId, new Set([receiptMessageId]));
    }

    const topUsers = [...maxTimeByUserId.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 2)
      .map(([userId, maxTimeMs]) => ({ userId, maxTimeMs }));

    return {
      topUsers,
      receiptMessageIdsByUserId,
    };
  }

  private positionCoversMessage(
    position: {
      topUsers: Array<{ userId: string; maxTimeMs: number }>;
      receiptMessageIdsByUserId: Map<string, Set<string>>;
    },
    senderUserId: string,
    messageId: string,
    messageCreatedAtMs: number,
  ) {
    const topCandidate = position.topUsers[0];
    const fallbackCandidate = position.topUsers[1];
    const maxCoveredTimeMs =
      topCandidate?.userId === senderUserId ? (fallbackCandidate?.maxTimeMs ?? Number.NEGATIVE_INFINITY) : (topCandidate?.maxTimeMs ?? Number.NEGATIVE_INFINITY);

    if (maxCoveredTimeMs > messageCreatedAtMs) {
      return true;
    }

    for (const [userId, receiptMessageIds] of position.receiptMessageIdsByUserId.entries()) {
      if (userId === senderUserId) {
        continue;
      }

      if (receiptMessageIds.has(messageId)) {
        return true;
      }
    }

    return false;
  }

  private async getUnreadCountsByChatId(chatIds: string[], userId: string) {
    const readReceipts = await this.messageRepository.listReadReceipts(chatIds, userId);
    const lastReadMessageIds = [...new Set(readReceipts.map((receipt) => receipt.lastReadMessageId))];
    const lastReadMessages = lastReadMessageIds.length > 0 ? await this.messageRepository.listMessagesByIds(lastReadMessageIds) : [];
    const lastReadCreatedAtByMessageId = new Map(lastReadMessages.map((message) => [message.id, message.createdAt.getTime()]));
    const lastReadPositionByChatId = new Map(
      readReceipts.map((receipt) => [receipt.chatId, {
        lastReadMessageId: receipt.lastReadMessageId,
        lastReadCreatedAt: lastReadCreatedAtByMessageId.get(receipt.lastReadMessageId) ?? 0,
      }]),
    );

    const unreadCandidates = await this.messageRepository.listUnreadCandidateMessages(chatIds, userId);
    const counts = new Map<string, number>();

    for (const chatId of chatIds) {
      counts.set(chatId, 0);
    }

    for (const message of unreadCandidates) {
      const lastReadPosition = lastReadPositionByChatId.get(message.chatId) ?? { lastReadMessageId: null, lastReadCreatedAt: 0 };
      const messageCreatedAt = message.createdAt.getTime();

      if (messageCreatedAt > lastReadPosition.lastReadCreatedAt) {
        counts.set(message.chatId, (counts.get(message.chatId) ?? 0) + 1);
        continue;
      }

      if (messageCreatedAt === lastReadPosition.lastReadCreatedAt && message.id !== lastReadPosition.lastReadMessageId) {
        counts.set(message.chatId, (counts.get(message.chatId) ?? 0) + 1);
      }
    }

    return counts;
  }

  private toLastMessagePreview(message: {
    type: MessageType;
    text: string | null;
    deletedAt: Date | null;
    attachments: Array<{ id: string }>;
  }) {
    return toLastMessagePreview({
      type: message.type,
      text: message.text,
      deletedAt: message.deletedAt,
      attachmentCount: message.attachments.length,
    });
  }

  private toMessageResponse(message: Awaited<ReturnType<MessageRepository['createMessage']>>) {
    return {
      id: message.id,
      chatId: message.chatId,
      senderUserId: message.senderUserId,
      type: message.type,
      text: message.text,
      createdAt: message.createdAt.toISOString(),
      editedAt: message.editedAt?.toISOString() ?? null,
      status: message.status,
    };
  }

  private toMessageListItem(
    message: Awaited<ReturnType<MessageRepository['findMessageById']>>,
    deliveryState?: { delivered: boolean; seen: boolean },
  ) {
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return {
      id: message.id,
      chatId: message.chatId,
      senderUserId: message.senderUserId,
      type: message.type,
      text: message.text,
      attachments: message.attachments.map((attachment) => ({
        mediaId: attachment.mediaId,
        attachmentType: attachment.attachmentType,
      })),
      callEvent: this.parseCallEventText(message.text),
      replyToMessageId: message.replyToMessageId,
      forwardedFromMessageId: message.forwardedFromMessageId ?? null,
      createdAt: message.createdAt.toISOString(),
      editedAt: message.editedAt?.toISOString() ?? null,
      deletedAt: message.deletedAt?.toISOString() ?? null,
      reactions: message.reactions.map((reaction) => ({
        emoji: reaction.emoji,
        userId: reaction.userId,
      })),
      delivery: {
        delivered: deliveryState?.delivered ?? false,
        seen: deliveryState?.seen ?? false,
      },
    };
  }

  private parseCallEventText(text: string | null): CallEventPayload | null {
    if (!text) {
      return null;
    }

    try {
      const payload = JSON.parse(text) as Partial<CallEventPayload>;
      if (payload.kind !== 'call_event' || typeof payload.callId !== 'string' || typeof payload.initiatorUserId !== 'string') {
        return null;
      }

      if (
        payload.outcome !== 'completed' &&
        payload.outcome !== 'missed' &&
        payload.outcome !== 'declined' &&
        payload.outcome !== 'canceled' &&
        payload.outcome !== 'failed'
      ) {
        return null;
      }

      return {
        kind: 'call_event',
        callId: payload.callId,
        initiatorUserId: payload.initiatorUserId,
        endedByUserId: typeof payload.endedByUserId === 'string' ? payload.endedByUserId : null,
        outcome: payload.outcome,
        durationSec: typeof payload.durationSec === 'number' ? payload.durationSec : 0,
      };
    } catch {
      return null;
    }
  }

  private logSlowSendMessage(params: {
    userId: string;
    chatId: string;
    attachmentCount: number;
    timings: Record<string, number>;
  }) {
    const thresholdMs = this.configService.get<number>('instrumentation.slowRequestThresholdMs') ?? 500;
    if ((params.timings.totalMs ?? 0) < thresholdMs) {
      return;
    }

    this.logger.warn(
      `slow_send_message ${JSON.stringify({
        userId: params.userId,
        chatId: params.chatId,
        attachmentCount: params.attachmentCount,
        timings: params.timings,
      })}`,
    );
  }

  private logSlowListMessages(params: {
    userId: string;
    chatId: string;
    limit: number;
    messageCount: number;
    timings: Record<string, number>;
  }) {
    const thresholdMs = this.configService.get<number>('instrumentation.slowRequestThresholdMs') ?? 500;
    if ((params.timings.totalMs ?? 0) < thresholdMs) {
      return;
    }

    this.logger.warn(
      `slow_list_messages ${JSON.stringify({
        userId: params.userId,
        chatId: params.chatId,
        limit: params.limit,
        messageCount: params.messageCount,
        timings: params.timings,
      })}`,
    );
  }
}

function roundDuration(durationMs: number) {
  return Number(durationMs.toFixed(2));
}
