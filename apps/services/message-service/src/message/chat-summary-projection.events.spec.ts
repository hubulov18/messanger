import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeChatSummaryProjectionEvent } from './chat-summary-projection.events.js';

test('normalizes sent summary projection events', () => {
  const event = normalizeChatSummaryProjectionEvent({
    id: 'evt_1',
    event_type: 'message.message.sent',
    event_version: 1,
    aggregate_id: 'msg_1',
    payload_json: {
      chatId: 'chat_1',
      messageId: 'msg_1',
      senderUserId: 'user_1',
      createdAt: '2026-04-21T10:00:00.000Z',
    },
    occurred_at: new Date('2026-04-21T10:00:00.000Z'),
  });

  assert.deepEqual(event, {
    kind: 'sent',
    eventId: 'evt_1',
    eventType: 'message.message.sent',
    occurredAt: new Date('2026-04-21T10:00:00.000Z'),
    chatId: 'chat_1',
    messageId: 'msg_1',
    senderUserId: 'user_1',
  });
});
