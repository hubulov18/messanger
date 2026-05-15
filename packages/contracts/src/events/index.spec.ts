import test from 'node:test';
import assert from 'node:assert/strict';

import { CHAT_MEMBER_ADDED_EVENT_TYPE, createEventEnvelope } from './index.js';

test('createEventEnvelope uses deterministic defaults', () => {
  const occurredAt = new Date('2026-04-21T10:00:00.000Z');
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

  assert.equal(event.eventId, 'evt_1');
  assert.equal(event.eventType, CHAT_MEMBER_ADDED_EVENT_TYPE);
  assert.equal(event.eventVersion, 1);
  assert.equal(event.occurredAt, occurredAt.toISOString());
  assert.equal(event.producedAt, occurredAt.toISOString());
  assert.equal(event.correlationId, 'evt_1');
  assert.equal(event.causationId, 'evt_1');
});
