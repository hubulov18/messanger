import {
  CHAT_MEMBER_ADDED_EVENT_TYPE,
  CHAT_MEMBER_REMOVED_EVENT_TYPE,
  CHAT_MEMBER_RESTRICTED_EVENT_TYPE,
  type ChatMemberAddedEvent,
  type ChatMemberRemovedEvent,
  type ChatMemberRestrictedEvent,
} from '@telegram/contracts/events';

export type ProjectionChatMemberRole = 'owner' | 'admin' | 'member';
export type ProjectionChatMemberStatus = 'active' | 'invited' | 'requested' | 'banned' | 'left' | 'removed';

export type ChatMembershipProjectionSourceRow = {
  id: string;
  event_type: string;
  event_version: number;
  aggregate_id: string;
  payload_json: unknown;
  occurred_at: Date;
};

export type ChatMembershipProjectionMutation =
  | {
      kind: 'added';
      eventId: string;
      eventType: string;
      occurredAt: Date;
      chatId: string;
      userId: string;
      role: ProjectionChatMemberRole;
      status: ProjectionChatMemberStatus;
    }
  | {
      kind: 'removed' | 'banned';
      eventId: string;
      eventType: string;
      occurredAt: Date;
      chatId: string;
      userId: string;
      role: ProjectionChatMemberRole | null;
      status: ProjectionChatMemberStatus;
    }
  | {
      kind: 'restricted';
      eventId: string;
      eventType: string;
      occurredAt: Date;
      chatId: string;
      userId: string;
      role: ProjectionChatMemberRole | null;
      status: ProjectionChatMemberStatus;
    };

type EnvelopeLike<TPayload> = {
  eventId: string;
  eventType: string;
  eventVersion: number;
  aggregateId: string;
  occurredAt: string;
  producedAt: string;
  correlationId: string;
  causationId: string;
  payload: TPayload;
};

export function normalizeChatMembershipProjectionEvent(
  row: ChatMembershipProjectionSourceRow,
): ChatMembershipProjectionMutation | null {
  switch (row.event_type) {
    case CHAT_MEMBER_ADDED_EVENT_TYPE:
      return normalizeAdded(row);
    case CHAT_MEMBER_REMOVED_EVENT_TYPE:
      return normalizeRemoved(row);
    case 'chat.member.banned':
      return normalizeBanned(row);
    case CHAT_MEMBER_RESTRICTED_EVENT_TYPE:
      return normalizeRestricted(row);
    default:
      return null;
  }
}

function normalizeAdded(row: ChatMembershipProjectionSourceRow): ChatMembershipProjectionMutation | null {
  const payload = unwrapPayload<ChatMemberAddedEvent['payload']>(row.payload_json);
  const chatId = asString(payload?.chatId);
  const userId = asString(payload?.userId);
  const role = toRole(payload?.role);

  if (!chatId || !userId || !role) {
    return null;
  }

  return {
    kind: 'added',
    eventId: getEnvelopeEventId(row),
    eventType: CHAT_MEMBER_ADDED_EVENT_TYPE,
    occurredAt: row.occurred_at,
    chatId,
    userId,
    role,
    status: toStatus(payload?.status) ?? 'active',
  };
}

function normalizeRemoved(row: ChatMembershipProjectionSourceRow): ChatMembershipProjectionMutation | null {
  const payload = unwrapPayload<ChatMemberRemovedEvent['payload']>(row.payload_json);
  const chatId = asString(payload?.chatId);
  const userId = asString(payload?.userId);

  if (!chatId || !userId) {
    return null;
  }

  return {
    kind: 'removed',
    eventId: getEnvelopeEventId(row),
    eventType: CHAT_MEMBER_REMOVED_EVENT_TYPE,
    occurredAt: row.occurred_at,
    chatId,
    userId,
    role: toRole(payload?.role),
    status: toStatus(payload?.status) ?? 'removed',
  };
}

function normalizeBanned(row: ChatMembershipProjectionSourceRow): ChatMembershipProjectionMutation | null {
  const payload = asRecord(row.payload_json);
  const chatId = asString(payload?.chatId);
  const userId = asString(payload?.userId);

  if (!chatId || !userId) {
    return null;
  }

  return {
    kind: 'banned',
    eventId: row.id,
    eventType: 'chat.member.banned',
    occurredAt: row.occurred_at,
    chatId,
    userId,
    role: toRole(payload?.role),
    status: 'banned',
  };
}

function normalizeRestricted(row: ChatMembershipProjectionSourceRow): ChatMembershipProjectionMutation | null {
  const payload = unwrapPayload<ChatMemberRestrictedEvent['payload']>(row.payload_json);
  const chatId = asString(payload?.chatId);
  const userId = asString(payload?.userId);

  if (!chatId || !userId) {
    return null;
  }

  return {
    kind: 'restricted',
    eventId: getEnvelopeEventId(row),
    eventType: CHAT_MEMBER_RESTRICTED_EVENT_TYPE,
    occurredAt: row.occurred_at,
    chatId,
    userId,
    role: toRole(payload?.role),
    status: toStatus(payload?.status) ?? 'active',
  };
}

function getEnvelopeEventId(row: ChatMembershipProjectionSourceRow) {
  const payload = asRecord(row.payload_json);
  const eventId = asString(payload?.eventId);
  return eventId ?? row.id;
}

function unwrapPayload<TPayload>(value: unknown): Partial<TPayload> | null {
  const record = asRecord(value);
  if (!record) {
    return null;
  }

  const payload = record.payload;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return record as Partial<TPayload>;
  }

  return payload as Partial<TPayload>;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function toRole(value: unknown): ProjectionChatMemberRole | null {
  if (value === 'owner' || value === 'admin' || value === 'member') {
    return value;
  }

  return null;
}

function toStatus(value: unknown): ProjectionChatMemberStatus | null {
  switch (value) {
    case 'active':
    case 'invited':
    case 'requested':
    case 'banned':
    case 'left':
    case 'removed':
      return value;
    default:
      return null;
  }
}
