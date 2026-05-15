import {
  reconcileServerMessage,
  queryKeys,
  type Message,
  type MessageId,
  type MessageMap,
  type MessageStatus,
} from '@telegram/ui';
import type { QueryClient } from '@tanstack/react-query';

import type { RealtimeEvent } from '@shared/realtime/realtime-events';

type MessageCreatedEvent = Extract<RealtimeEvent, { type: 'chat.message_created' }>;
type MessageUpdatedEvent = Extract<RealtimeEvent, { type: 'chat.message_updated' }>;
type ReadUpdatedEvent = Extract<RealtimeEvent, { type: 'chat.read_updated' }>;

export function applyRealtimeChatScreenMessageCreated(params: {
  queryClient: QueryClient;
  event: MessageCreatedEvent;
  currentUserId: string | null;
}) {
  const { queryClient, event, currentUserId } = params;
  if (!event.messageId) {
    return;
  }

  const serverMessage = mapRealtimeEventToUiMessage(event);
  const messageMapKey = queryKeys.messages(event.chatId);
  const messageIdsKey = queryKeys.messageIds(event.chatId);
  const currentMessages = queryClient.getQueryData<MessageMap>(messageMapKey) ?? {};
  const currentMessageIds = queryClient.getQueryData<ReadonlyArray<MessageId>>(messageIdsKey) ?? [];
  const isOwnEcho =
    currentUserId !== null &&
    event.senderUserId === currentUserId &&
    typeof event.clientMessageId === 'string' &&
    event.clientMessageId.length > 0;

  if (isOwnEcho && currentMessages[event.clientMessageId!]) {
    // Use the package's reconciliation — handles optimistic row swap, id-list
    // deduplication, and is idempotent if the HTTP response already landed.
    reconcileServerMessage(queryClient, event.chatId, event.clientMessageId!, serverMessage);
    return;
  }

  queryClient.setQueryData<MessageMap>(messageMapKey, (previous) => {
    const next = { ...(previous ?? {}) };
    next[serverMessage.id] = mergeMessage(previous?.[serverMessage.id], serverMessage);
    return next;
  });

  queryClient.setQueryData<ReadonlyArray<MessageId>>(messageIdsKey, (previous) => {
    const next = previous ?? currentMessageIds;
    return next.includes(serverMessage.id) ? next : [serverMessage.id, ...next];
  });
}

export function applyRealtimeChatScreenMessageUpdated(params: {
  queryClient: QueryClient;
  event: MessageUpdatedEvent;
}) {
  const { queryClient, event } = params;
  const messageId = event.messageId;
  if (!messageId) {
    return;
  }

  const messageMapKey = queryKeys.messages(event.chatId);
  queryClient.setQueryData<MessageMap>(messageMapKey, (previous) => {
    if (!previous || !previous[messageId]) {
      return previous ?? {};
    }

    const currentMessage = previous[messageId];
    const nextMessage = mergeRealtimeMessageUpdate(currentMessage, event);
    if (nextMessage === currentMessage) {
      return previous;
    }

    return {
      ...previous,
      [messageId]: nextMessage,
    };
  });
}

export function applyRealtimeChatScreenReadUpdated(params: {
  queryClient: QueryClient;
  event: ReadUpdatedEvent;
  currentUserId: string | null;
}) {
  const { queryClient, event, currentUserId } = params;
  const lastReadMessageId = event.lastReadMessageId;

  if (!currentUserId || !lastReadMessageId || event.userId === currentUserId) {
    return;
  }

  const messageMapKey = queryKeys.messages(event.chatId);
  const messageIdsKey = queryKeys.messageIds(event.chatId);
  const messageIds = queryClient.getQueryData<ReadonlyArray<MessageId>>(messageIdsKey) ?? [];
  const lastReadIndex = messageIds.indexOf(lastReadMessageId);
  if (lastReadIndex === -1) {
    return;
  }

  queryClient.setQueryData<MessageMap>(messageMapKey, (previous) => {
    if (!previous) {
      return {};
    }

    let changed = false;
    const next = { ...previous };

    for (let index = lastReadIndex; index < messageIds.length; index += 1) {
      const mid = messageIds[index];
      if (!mid) continue;

      const message = next[mid];
      if (!message || message.senderId !== currentUserId) continue;

      const nextStatus = promoteStatus(message.status, 'read');
      if (nextStatus === message.status) continue;

      next[mid] = { ...message, status: nextStatus };
      changed = true;
    }

    return changed ? next : previous;
  });
}

function mapRealtimeEventToUiMessage(event: MessageCreatedEvent): Message {
  return {
    id: event.messageId!,
    chatId: event.chatId,
    senderId: event.senderUserId ?? 'unknown',
    type: 'text',
    body: event.preview ?? '',
    createdAt: parseRealtimeCreatedAt(event.createdAt),
    status: 'sent',
    reactions: [],
  };
}

function mergeMessage(existing: Message | undefined, incoming: Message): Message {
  if (!existing) return incoming;
  return {
    ...existing,
    ...incoming,
    createdAt: existing.createdAt || incoming.createdAt,
  };
}

function mergeRealtimeMessageUpdate(message: Message, event: MessageUpdatedEvent): Message {
  let changed = false;
  let nextMessage: Message = message;

  if (event.messageStatus) {
    const nextStatus = promoteStatus(message.status, event.messageStatus);
    if (nextStatus !== message.status) {
      nextMessage = { ...nextMessage, status: nextStatus };
      changed = true;
    }
  }

  if (event.updateKind === 'edited') {
    const nextBody = resolveUpdatedBody(event, nextMessage.body);
    const nextEditedAt = parseOptionalTimestamp(event.editedAt);
    if (nextBody !== nextMessage.body || nextEditedAt !== nextMessage.editedAt) {
      nextMessage = {
        ...nextMessage,
        body: nextBody,
        ...(nextEditedAt !== undefined ? { editedAt: nextEditedAt } : {}),
      };
      changed = true;
    }
  }

  if (event.updateKind === 'deleted') {
    const deletedBody = resolveDeletedBody(event, nextMessage.body);
    if (deletedBody !== nextMessage.body) {
      nextMessage = { ...nextMessage, body: deletedBody };
      changed = true;
    }
  }

  if (!changed && event.preview && event.preview !== nextMessage.body) {
    nextMessage = { ...nextMessage, body: event.preview };
    changed = true;
  }

  return changed ? nextMessage : message;
}

function resolveUpdatedBody(event: MessageUpdatedEvent, fallback: string) {
  if (typeof event.text === 'string') return event.text;
  if (typeof event.preview === 'string') return event.preview;
  return fallback;
}

function resolveDeletedBody(event: MessageUpdatedEvent, fallback: string) {
  if (typeof event.preview === 'string' && event.preview.length > 0) return event.preview;
  if (event.deletedAt) return 'Message deleted';
  return fallback;
}

function parseRealtimeCreatedAt(createdAt: string | undefined) {
  if (!createdAt) return Date.now();
  const timestamp = Date.parse(createdAt);
  return Number.isNaN(timestamp) ? Date.now() : timestamp;
}

function parseOptionalTimestamp(value: string | undefined) {
  if (!value) return undefined;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? undefined : timestamp;
}

function promoteStatus(currentStatus: MessageStatus, incomingStatus: MessageStatus): MessageStatus {
  return getStatusRank(incomingStatus) > getStatusRank(currentStatus) ? incomingStatus : currentStatus;
}

function getStatusRank(status: MessageStatus) {
  switch (status) {
    case 'failed': return -1;
    case 'sending': return 0;
    case 'sent': return 1;
    case 'delivered': return 2;
    case 'read': return 3;
    default: return 0;
  }
}
