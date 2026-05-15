type SummaryProjectionSentPayload = {
  chatId: string;
  messageId: string;
  senderUserId: string;
  type: string;
  text?: string | null;
  attachments?: Array<{ mediaId: string; attachmentType: string }>;
  createdAt: string;
};

type SummaryProjectionEditedPayload = {
  chatId: string;
  messageId: string;
  text?: string | null;
  editedAt: string;
};

type SummaryProjectionDeletedPayload = {
  chatId: string;
  messageId: string;
  deletedAt: string;
};

export type ChatSummaryProjectionSourceRow = {
  id: string;
  event_type: string;
  event_version: number;
  aggregate_id: string;
  payload_json: unknown;
  occurred_at: Date;
};

export type ChatSummaryProjectionMutation =
  | {
      kind: 'sent';
      eventId: string;
      eventType: string;
      occurredAt: Date;
      chatId: string;
      messageId: string;
      senderUserId: string;
    }
  | {
      kind: 'edited';
      eventId: string;
      eventType: string;
      occurredAt: Date;
      chatId: string;
      messageId: string;
    }
  | {
      kind: 'deleted';
      eventId: string;
      eventType: string;
      occurredAt: Date;
      chatId: string;
      messageId: string;
    };

export function normalizeChatSummaryProjectionEvent(
  row: ChatSummaryProjectionSourceRow,
): ChatSummaryProjectionMutation | null {
  switch (row.event_type) {
    case 'message.message.sent':
      return normalizeSentEvent(row);
    case 'message.message.edited':
      return normalizeEditedEvent(row);
    case 'message.message.deleted':
      return normalizeDeletedEvent(row);
    default:
      return null;
  }
}

function normalizeSentEvent(row: ChatSummaryProjectionSourceRow): ChatSummaryProjectionMutation | null {
  const payload = row.payload_json as Partial<SummaryProjectionSentPayload> | null;
  if (
    !payload ||
    typeof payload.chatId !== 'string' ||
    typeof payload.messageId !== 'string' ||
    typeof payload.senderUserId !== 'string' ||
    typeof payload.createdAt !== 'string'
  ) {
    return null;
  }

  return {
    kind: 'sent',
    eventId: row.id,
    eventType: row.event_type,
    occurredAt: new Date(payload.createdAt),
    chatId: payload.chatId,
    messageId: payload.messageId,
    senderUserId: payload.senderUserId,
  };
}

function normalizeEditedEvent(row: ChatSummaryProjectionSourceRow): ChatSummaryProjectionMutation | null {
  const payload = row.payload_json as Partial<SummaryProjectionEditedPayload> | null;
  if (
    !payload ||
    typeof payload.chatId !== 'string' ||
    typeof payload.messageId !== 'string' ||
    typeof payload.editedAt !== 'string'
  ) {
    return null;
  }

  return {
    kind: 'edited',
    eventId: row.id,
    eventType: row.event_type,
    occurredAt: new Date(payload.editedAt),
    chatId: payload.chatId,
    messageId: payload.messageId,
  };
}

function normalizeDeletedEvent(row: ChatSummaryProjectionSourceRow): ChatSummaryProjectionMutation | null {
  const payload = row.payload_json as Partial<SummaryProjectionDeletedPayload> | null;
  if (
    !payload ||
    typeof payload.chatId !== 'string' ||
    typeof payload.messageId !== 'string' ||
    typeof payload.deletedAt !== 'string'
  ) {
    return null;
  }

  return {
    kind: 'deleted',
    eventId: row.id,
    eventType: row.event_type,
    occurredAt: new Date(payload.deletedAt),
    chatId: payload.chatId,
    messageId: payload.messageId,
  };
}
