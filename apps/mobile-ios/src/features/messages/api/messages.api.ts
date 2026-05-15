import { apiRequest } from '@shared/api/http-client';

export type MessageAttachmentItem = {
  mediaId: string;
  attachmentType: string;
};

export type CallEventPayload = {
  kind: 'call_event';
  callId: string;
  initiatorUserId: string;
  endedByUserId: string | null;
  outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
  durationSec: number;
};

export type MessageListItem = {
  id: string;
  chatId: string;
  senderUserId: string;
  type: string;
  text: string | null;
  attachments: MessageAttachmentItem[];
  callEvent?: CallEventPayload | null;
  replyToMessageId: string | null;
  forwardedFromMessageId: string | null;
  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
  reactions: Array<{
    emoji: string;
    userId: string;
  }>;
  delivery: {
    delivered: boolean;
    seen: boolean;
  };
};

export type SendMessageType = 'text' | 'image' | 'video' | 'audio' | 'file';

export function getMessages(chatId: string) {
  return apiRequest<{ items: MessageListItem[]; nextCursor: string | null }>({
    method: 'GET',
    path: '/chats/' + chatId + '/messages',
    authenticated: true,
    timeoutMs: 15000,
  });
}

export function searchMessages(chatId: string, query: string, options?: { limit?: number }) {
  const params = new URLSearchParams({
    query,
    ...(options?.limit ? { limit: String(options.limit) } : {}),
  });

  return apiRequest<{ items: MessageListItem[] }>({
    method: 'GET',
    path: '/chats/' + chatId + '/messages/search?' + params.toString(),
    authenticated: true,
    timeoutMs: 15000,
  });
}

export function sendTextMessage(chatId: string, text: string, options?: { replyToMessageId?: string | null }) {
  return sendMessage({
    chatId,
    type: 'text',
    text,
    replyToMessageId: options?.replyToMessageId ?? null,
    attachments: [],
  });
}

export function sendAttachmentMessage(params: {
  chatId: string;
  type: Exclude<SendMessageType, 'text'>;
  attachments: MessageAttachmentItem[];
  text?: string;
  replyToMessageId?: string | null;
}) {
  return sendMessage({
    chatId: params.chatId,
    type: params.type,
    ...(params.text ? { text: params.text } : {}),
    replyToMessageId: params.replyToMessageId ?? null,
    attachments: params.attachments,
  });
}

function sendMessage(params: {
  chatId: string;
  type: SendMessageType;
  text?: string;
  replyToMessageId?: string | null;
  attachments: MessageAttachmentItem[];
}) {
  return apiRequest<{ message: MessageListItem }>({
    method: 'POST',
    path: '/messages',
    authenticated: true,
    timeoutMs: 20000,
    body: {
      chatId: params.chatId,
      clientMessageId: 'ios_' + Date.now(),
      type: params.type,
      ...(params.text ? { text: params.text } : {}),
      ...(params.replyToMessageId ? { replyToMessageId: params.replyToMessageId } : {}),
      attachments: params.attachments,
    },
  });
}

export function forwardMessage(params: { targetChatId: string; messageId: string; text?: string }) {
  return apiRequest<{ message: MessageListItem }>({
    method: 'POST',
    path: '/messages',
    authenticated: true,
    timeoutMs: 20000,
    body: {
      chatId: params.targetChatId,
      clientMessageId: 'ios_fwd_' + Date.now(),
      type: 'text',
      ...(params.text ? { text: params.text } : {}),
      forwardedFromMessageId: params.messageId,
      attachments: [],
    },
  });
}

export function editTextMessage(messageId: string, text: string) {
  return apiRequest<{ message: { id: string; text: string; editedAt: string | null } }>({
    method: 'PATCH',
    path: '/messages/' + messageId,
    authenticated: true,
    timeoutMs: 15000,
    body: { text },
  });
}

export function deleteMessage(messageId: string, scope: 'for_me' | 'for_everyone' = 'for_everyone') {
  return apiRequest<{ success: true }>({
    method: 'DELETE',
    path: '/messages/' + messageId,
    authenticated: true,
    timeoutMs: 15000,
    body: { scope },
  });
}

export function addMessageReaction(messageId: string, emoji: string) {
  return apiRequest<{ success: true }>({
    method: 'POST',
    path: '/messages/' + messageId + '/reactions',
    authenticated: true,
    timeoutMs: 15000,
    body: { emoji },
  });
}

export function removeMessageReaction(messageId: string, emoji: string) {
  return apiRequest<{ success: true }>({
    method: 'DELETE',
    path: '/messages/' + messageId + '/reactions/' + encodeURIComponent(emoji),
    authenticated: true,
    timeoutMs: 15000,
  });
}

export function markChatRead(chatId: string, lastReadMessageId: string) {
  return apiRequest<{ success: true; chatId: string; lastReadMessageId: string }>({
    method: 'POST',
    path: '/chats/' + chatId + '/read',
    authenticated: true,
    timeoutMs: 15000,
    body: { lastReadMessageId },
  });
}
