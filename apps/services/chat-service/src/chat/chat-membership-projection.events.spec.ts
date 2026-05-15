import test from 'node:test';
import assert from 'node:assert/strict';

import { CHAT_MEMBER_ADDED_EVENT_TYPE, createEventEnvelope } from '@telegram/contracts/events';

import { normalizeChatMembershipProjectionEvent } from './chat-membership-projection.events.js';

test('normalizes envelope-based added event', () => {
  const occurredAt = new Date('2026-04-21T12:00:00.000Z');
  const event = createEventEnvelope({
    eventId: 'evt_1',
    eventType: CHAT_MEMBER_ADDED_EVENT_TYPE,
    aggregateId: 'member_1',
    occurredAt,
    payload: {
      chatId: 'chat_1',
      userId: 'user_1',
      role: 'member',
      status: 'active',
      addedByUserId: null,
      joinedAt: occurredAt.toISOString(),
    },
  });

  const normalized = normalizeChatMembershipProjectionEvent({
    id: 'evt_row',
    event_type: CHAT_MEMBER_ADDED_EVENT_TYPE,
    event_version: 1,
    aggregate_id: 'member_1',
    payload_json: event,
    occurred_at: occurredAt,
  });

  assert.deepEqual(normalized, {
    kind: 'added',
    eventId: 'evt_1',
    eventType: CHAT_MEMBER_ADDED_EVENT_TYPE,
    occurredAt,
    chatId: 'chat_1',
    userId: 'user_1',
    role: 'member',
    status: 'active',
  });
});

test('normalizes legacy removed event payload', () => {
  const occurredAt = new Date('2026-04-21T12:05:00.000Z');
  const normalized = normalizeChatMembershipProjectionEvent({
    id: 'evt_2',
    event_type: 'chat.member.removed',
    event_version: 1,
    aggregate_id: 'member_2',
    payload_json: {
      chatId: 'chat_1',
      userId: 'user_2',
      removedAt: occurredAt.toISOString(),
    },
    occurred_at: occurredAt,
  });

  assert.deepEqual(normalized, {
    kind: 'removed',
    eventId: 'evt_2',
    eventType: 'chat.member.removed',
    occurredAt,
    chatId: 'chat_1',
    userId: 'user_2',
    role: null,
    status: 'removed',
  });
});
