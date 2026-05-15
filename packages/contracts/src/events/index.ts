export type EventEnvelope<TPayload, TType extends string = string> = {
  eventId: string;
  eventType: TType;
  eventVersion: number;
  aggregateId: string;
  occurredAt: string;
  producedAt: string;
  correlationId: string;
  causationId: string;
  payload: TPayload;
};

export const CHAT_MEMBER_ADDED_EVENT_TYPE = 'chat.member.added' as const;
export const CHAT_MEMBER_REMOVED_EVENT_TYPE = 'chat.member.removed' as const;
export const CHAT_MEMBER_RESTRICTED_EVENT_TYPE = 'chat.member.restricted' as const;

export type ChatMemberRoleDto = 'owner' | 'admin' | 'member';
export type ChatMemberStatusDto = 'active' | 'invited' | 'requested' | 'banned' | 'left' | 'removed';

export type ChatMemberAddedEventPayload = {
  chatId: string;
  userId: string;
  role: ChatMemberRoleDto;
  status: ChatMemberStatusDto;
  addedByUserId: string | null;
  joinedAt: string | null;
};

export type ChatMemberRemovedEventPayload = {
  chatId: string;
  userId: string;
  role: ChatMemberRoleDto;
  status: ChatMemberStatusDto;
  removedAt: string;
  removedByUserId: string | null;
};

export type ChatMemberRestrictedEventPayload = {
  chatId: string;
  userId: string;
  role: ChatMemberRoleDto;
  status: ChatMemberStatusDto;
  restrictedByUserId: string | null;
  restrictedAt: string;
  restrictionUntil: string | null;
  restriction: Record<string, boolean> | null;
};

export type ChatMemberAddedEvent = EventEnvelope<
  ChatMemberAddedEventPayload,
  typeof CHAT_MEMBER_ADDED_EVENT_TYPE
>;

export type ChatMemberRemovedEvent = EventEnvelope<
  ChatMemberRemovedEventPayload,
  typeof CHAT_MEMBER_REMOVED_EVENT_TYPE
>;

export type ChatMemberRestrictedEvent = EventEnvelope<
  ChatMemberRestrictedEventPayload,
  typeof CHAT_MEMBER_RESTRICTED_EVENT_TYPE
>;

export function createEventEnvelope<TPayload, TType extends string>(params: {
  eventId: string;
  eventType: TType;
  eventVersion?: number;
  aggregateId: string;
  occurredAt: Date;
  correlationId?: string;
  causationId?: string;
  payload: TPayload;
}): EventEnvelope<TPayload, TType> {
  const occurredAt = params.occurredAt.toISOString();
  const correlationId = params.correlationId ?? params.eventId;
  const causationId = params.causationId ?? params.eventId;

  return {
    eventId: params.eventId,
    eventType: params.eventType,
    eventVersion: params.eventVersion ?? 1,
    aggregateId: params.aggregateId,
    occurredAt,
    producedAt: occurredAt,
    correlationId,
    causationId,
    payload: params.payload,
  };
}
