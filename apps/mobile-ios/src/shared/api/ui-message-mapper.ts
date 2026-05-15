import { ApiError, type Message, type Reaction, type ReplyRef } from '@telegram/ui';

export type BackendReactionRow = {
  readonly emoji: string;
  readonly userId: string;
};

export type BackendMessageLike = {
  readonly id: string;
  readonly chatId: string;
  readonly senderUserId: string;
  readonly type: string;
  readonly text: string | null;
  readonly createdAt: string;
  readonly editedAt: string | null;
  readonly deletedAt: string | null;
  readonly replyToMessageId: string | null;
  readonly reactions: ReadonlyArray<BackendReactionRow>;
  readonly delivery: {
    readonly delivered: boolean;
    readonly seen: boolean;
  };
};

export function mapBackendMessageToUiMessage(
  server: BackendMessageLike,
  currentUserId: string | null,
  replyRefFromClient?: ReplyRef,
): Message {
  const createdAtMs = Date.parse(server.createdAt);
  if (Number.isNaN(createdAtMs)) {
    throw new ApiError('Server returned invalid createdAt', { code: 'INVALID_CREATED_AT' });
  }

  const base = {
    id: server.id,
    chatId: server.chatId,
    senderId: server.senderUserId,
    type: 'text' as const,
    body: buildMessageBody(server),
    createdAt: createdAtMs,
    status: deriveStatus(server.delivery),
    reactions: aggregateReactions(server.reactions, currentUserId),
  };

  const editedAtMs = server.editedAt !== null ? Date.parse(server.editedAt) : NaN;
  const replyTo =
    replyRefFromClient ??
    (server.replyToMessageId !== null
      ? { messageId: server.replyToMessageId, senderName: '', preview: '' }
      : undefined);

  if (!Number.isNaN(editedAtMs) && replyTo !== undefined) {
    return { ...base, editedAt: editedAtMs, replyTo };
  }
  if (!Number.isNaN(editedAtMs)) {
    return { ...base, editedAt: editedAtMs };
  }
  if (replyTo !== undefined) {
    return { ...base, replyTo };
  }
  return base;
}

function deriveStatus(delivery: BackendMessageLike['delivery']): Message['status'] {
  if (delivery.seen) return 'read';
  if (delivery.delivered) return 'delivered';
  return 'sent';
}

function aggregateReactions(rows: ReadonlyArray<BackendReactionRow>, currentUserId: string | null): Reaction[] {
  if (rows.length === 0) return [];

  const byEmoji = new Map<string, { count: number; reactedByMe: boolean }>();
  for (const row of rows) {
    const existing = byEmoji.get(row.emoji);
    const reactedByMe = currentUserId !== null && row.userId === currentUserId;
    if (existing === undefined) {
      byEmoji.set(row.emoji, { count: 1, reactedByMe });
    } else {
      existing.count += 1;
      if (reactedByMe) existing.reactedByMe = true;
    }
  }

  const out: Reaction[] = [];
  for (const [emoji, aggregate] of byEmoji) {
    out.push({ emoji, count: aggregate.count, reactedByMe: aggregate.reactedByMe });
  }
  return out;
}

function buildMessageBody(server: BackendMessageLike) {
  if (server.type === 'text') {
    return server.text ?? '';
  }

  if (server.deletedAt) {
    return 'Message deleted';
  }

  switch (server.type) {
    case 'image':
      return server.text?.trim() ? `Photo · ${server.text}` : 'Photo';
    case 'video':
      return server.text?.trim() ? `Video · ${server.text}` : 'Video';
    case 'audio':
      return server.text?.trim() ? `Voice message · ${server.text}` : 'Voice message';
    case 'file':
      return server.text?.trim() ? `File · ${server.text}` : 'File';
    default:
      return server.text ?? 'Unsupported message';
  }
}
