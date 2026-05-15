# Telegram-Like Messenger Event Schemas

## 1. Objective

Define the asynchronous event contracts for a Telegram-like messenger using RabbitMQ as the internal messaging backbone.

This document covers:

- event envelope format
- publisher ownership
- consumer expectations
- routing conventions
- idempotency rules
- MVP event payloads

This is a service-contract document, not a broker deployment manual.

## 2. Event Design Principles

The event layer should follow these rules:

- every event has a single owning publisher
- events describe facts that already happened
- events are immutable
- payloads must contain enough business context for downstream consumers
- consumers must be idempotent
- events are for propagation, not synchronous request replacement
- source-of-truth data remains in owning services

## 3. RabbitMQ Topology Model

Recommended logical model:

- exchange type: `topic`
- primary exchange: `messenger.domain.events`
- dead-letter exchange: `messenger.domain.dlx`
- retry queues per consumer group where needed

Routing key pattern:

- `<context>.<entity>.<action>`

Examples:

- `identity.user.registered`
- `chat.member.added`
- `message.message.sent`
- `media.object.processed`

## 4. Common Event Envelope

All domain events should use a consistent envelope.

```json
{
  "eventId": "evt_123",
  "eventType": "message.message.sent",
  "eventVersion": 1,
  "occurredAt": "2026-04-10T15:31:00Z",
  "producer": "message-service",
  "correlationId": "req_123",
  "causationId": "cmd_456",
  "partitionKey": "chat_2",
  "payload": {}
}
```

## 4.1 Envelope Fields

- `eventId`: unique immutable event identifier
- `eventType`: stable routing/event name
- `eventVersion`: schema version for payload evolution
- `occurredAt`: event occurrence timestamp in UTC
- `producer`: publishing service name
- `correlationId`: trace identifier across one flow
- `causationId`: originating command or upstream event ID
- `partitionKey`: business ordering key, usually `chatId` or `userId`
- `payload`: event-specific body

## 5. Delivery Rules

- delivery is at least once
- consumers must support duplicate delivery
- retries should be bounded and observable
- poison messages go to dead-letter queues
- ordering is best effort globally, but should be preserved per partition key when possible

## 6. Versioning Rules

- increment `eventVersion` when payload structure changes incompatibly
- additive fields are preferred over breaking renames
- consumers should ignore unknown fields
- old versions may coexist during rollout windows

## 7. Identity Events

Owned by Identity Service.

## 7.1 `identity.user.registered`

Published when a user account is successfully created.

Publisher:

- Identity Service

Consumers:

- User Profile Service
- Analytics Service
- Notification Service if welcome flows exist later

Payload:

```json
{
  "userId": "user_1",
  "phoneNumber": "+15551234567",
  "registeredAt": "2026-04-10T15:30:00Z",
  "isNewUser": true
}
```

## 7.2 `identity.user.authenticated`

Published when login or OTP verification completes successfully.

Payload:

```json
{
  "userId": "user_1",
  "sessionId": "sess_1",
  "deviceId": "device_abc",
  "clientType": "ios",
  "authenticatedAt": "2026-04-10T15:31:00Z"
}
```

## 7.3 `identity.session.revoked`

Published when a session is explicitly revoked.

Payload:

```json
{
  "userId": "user_1",
  "sessionId": "sess_1",
  "revokedAt": "2026-04-10T16:00:00Z",
  "reason": "user_logout"
}
```

## 8. User Profile Events

Owned by User Profile Service.

## 8.1 `profile.user.updated`

Payload:

```json
{
  "userId": "user_1",
  "username": "judy",
  "displayName": "Judy Ann",
  "bio": "Building a messenger",
  "avatarMediaId": "media_2",
  "updatedAt": "2026-04-10T16:05:00Z"
}
```

Consumers:

- Search Service
- Chat read-model projections
- Analytics Service

## 8.2 `profile.user.blocked`

Payload:

```json
{
  "ownerUserId": "user_1",
  "blockedUserId": "user_2",
  "createdAt": "2026-04-10T16:06:00Z"
}
```

Consumers:

- Chat Service
- Message Service
- Notification Service

## 8.3 `profile.user.unblocked`

Payload:

```json
{
  "ownerUserId": "user_1",
  "blockedUserId": "user_2",
  "createdAt": "2026-04-10T16:07:00Z"
}
```

## 9. Chat Events

Owned by Chat Service.

## 9.1 `chat.chat.created`

Payload:

```json
{
  "chatId": "chat_2",
  "type": "group",
  "title": "Product Team",
  "createdByUserId": "user_1",
  "memberUserIds": ["user_1", "user_2", "user_3"],
  "createdAt": "2026-04-10T15:30:00Z"
}
```

Consumers:

- Message Service
- Realtime Service
- Search Service
- Analytics Service

## 9.2 `chat.chat.updated`

Payload:

```json
{
  "chatId": "chat_2",
  "title": "Product Team Core",
  "description": null,
  "photoMediaId": null,
  "updatedAt": "2026-04-10T16:10:00Z"
}
```

## 9.3 `chat.member.added`

Payload:

```json
{
  "chatId": "chat_2",
  "userId": "user_4",
  "role": "member",
  "addedByUserId": "user_1",
  "joinedAt": "2026-04-10T16:11:00Z"
}
```

Consumers:

- Realtime Service
- Notification Service
- Message Service

## 9.4 `chat.member.removed`

Payload:

```json
{
  "chatId": "chat_2",
  "userId": "user_4",
  "removedByUserId": "user_1",
  "removedAt": "2026-04-10T16:12:00Z"
}
```

## 9.5 `chat.permissions.changed`

Payload:

```json
{
  "chatId": "chat_2",
  "changedByUserId": "user_1",
  "permissions": {
    "canSendMessages": true,
    "canAddMembers": false
  },
  "updatedAt": "2026-04-10T16:13:00Z"
}
```

## 10. Message Events

Owned by Message Service.

## 10.1 `message.message.sent`

This is the most important event in the MVP.

Publisher:

- Message Service

Consumers:

- Realtime Service
- Notification Service
- Search Service
- Analytics Service
- unread counter projections

Payload:

```json
{
  "messageId": "msg_10",
  "clientMessageId": "client_123",
  "chatId": "chat_2",
  "senderUserId": "user_1",
  "type": "text",
  "text": "Hello team",
  "attachments": [],
  "replyToMessageId": null,
  "createdAt": "2026-04-10T15:31:00Z"
}
```

Partition key:

- `chatId`

## 10.2 `message.message.edited`

Payload:

```json
{
  "messageId": "msg_10",
  "chatId": "chat_2",
  "editorUserId": "user_1",
  "text": "Hello team updated",
  "editedAt": "2026-04-10T15:33:00Z"
}
```

## 10.3 `message.message.deleted`

Payload:

```json
{
  "messageId": "msg_10",
  "chatId": "chat_2",
  "deletedByUserId": "user_1",
  "scope": "for_everyone",
  "deletedAt": "2026-04-10T15:34:00Z"
}
```

## 10.4 `message.message.reacted`

Payload:

```json
{
  "messageId": "msg_10",
  "chatId": "chat_2",
  "userId": "user_2",
  "emoji": "🔥",
  "createdAt": "2026-04-10T15:35:00Z"
}
```

## 10.5 `message.chat.read_position_updated`

Payload:

```json
{
  "chatId": "chat_2",
  "userId": "user_2",
  "lastReadMessageId": "msg_10",
  "updatedAt": "2026-04-10T15:36:00Z"
}
```

Consumers:

- Realtime Service
- unread counter projections
- Analytics Service

## 11. Realtime Events

Owned by Realtime Service.

These events are mostly derived from websocket activity and should remain lightweight.

## 11.1 `realtime.presence.updated`

Payload:

```json
{
  "userId": "user_2",
  "state": "online",
  "lastActiveAt": "2026-04-10T15:36:00Z"
}
```

## 11.2 `realtime.typing.started`

Payload:

```json
{
  "chatId": "chat_2",
  "userId": "user_2",
  "startedAt": "2026-04-10T15:36:10Z",
  "expiresAt": "2026-04-10T15:36:15Z"
}
```

## 11.3 `realtime.typing.stopped`

Payload:

```json
{
  "chatId": "chat_2",
  "userId": "user_2",
  "stoppedAt": "2026-04-10T15:36:14Z"
}
```

## 11.4 `realtime.message.delivered`

Payload:

```json
{
  "chatId": "chat_2",
  "messageId": "msg_10",
  "userId": "user_2",
  "deliveredAt": "2026-04-10T15:36:20Z"
}
```

Note:

- this event is informative for downstream consumers
- Message Service remains source of truth if durable delivery cursor persistence is required

## 12. Media Events

Owned by Media Service.

## 12.1 `media.upload.session.created`

Payload:

```json
{
  "uploadId": "upload_1",
  "mediaId": "media_9",
  "ownerUserId": "user_1",
  "mediaType": "image",
  "mimeType": "image/jpeg",
  "sizeBytes": 204800,
  "expiresAt": "2026-04-10T15:40:00Z",
  "createdAt": "2026-04-10T15:29:00Z"
}
```

## 12.2 `media.object.uploaded`

Payload:

```json
{
  "uploadId": "upload_1",
  "mediaId": "media_9",
  "ownerUserId": "user_1",
  "mediaType": "image",
  "mimeType": "image/jpeg",
  "sizeBytes": 204800,
  "uploadedAt": "2026-04-10T15:29:00Z"
}
```

## 12.3 `media.object.processed`

Payload:

```json
{
  "mediaId": "media_9",
  "processingStatus": "ready",
  "variants": [
    {
      "variantType": "thumbnail",
      "storageKey": "media_9/thumb.jpg"
    }
  ],
  "processedAt": "2026-04-10T15:30:00Z"
}
```

Consumers:

- Message Service if attachment readiness matters
- Notification Service if media previews are built into notifications later

## 12.4 `media.object.failed`

Payload:

```json
{
  "mediaId": "media_9",
  "processingStatus": "failed",
  "reasonCode": "TRANSCODE_ERROR",
  "failedAt": "2026-04-10T15:30:30Z"
}
```

## 13. Notification Events

Owned by Notification Service.

These are operationally useful but should not become business dependencies.

## 13.1 `notification.push.sent`

Payload:

```json
{
  "notificationId": "notif_1",
  "userId": "user_2",
  "sourceEventId": "evt_123",
  "sentAt": "2026-04-10T15:31:10Z"
}
```

## 13.2 `notification.push.failed`

Payload:

```json
{
  "notificationId": "notif_1",
  "userId": "user_2",
  "sourceEventId": "evt_123",
  "failedAt": "2026-04-10T15:31:11Z",
  "reasonCode": "TOKEN_INVALID"
}
```

## 14. Moderation Events

Owned by Moderation Service.

## 14.1 `moderation.report.created`

Payload:

```json
{
  "reportId": "report_1",
  "reporterUserId": "user_2",
  "targetType": "message",
  "targetId": "msg_10",
  "reason": "spam",
  "createdAt": "2026-04-10T16:40:00Z"
}
```

## 14.2 `moderation.sanction.applied`

Payload:

```json
{
  "sanctionId": "sanction_1",
  "targetType": "user",
  "targetId": "user_2",
  "actionType": "mute",
  "expiresAt": "2026-04-11T16:40:00Z",
  "createdAt": "2026-04-10T16:40:00Z"
}
```

Consumers:

- Chat Service
- Message Service
- Notification Service

## 15. Consumer Responsibilities

Every consumer must:

- validate the envelope
- validate required payload fields
- deduplicate by `eventId`
- handle retries safely
- emit logs and metrics for success/failure
- avoid side effects before idempotency checks when possible

## 16. Idempotency Strategy

Recommended approach:

- store processed `eventId` values per consumer group
- make writes conditional where possible
- use natural business keys when available, such as `clientMessageId`
- do not assume single delivery from RabbitMQ

Examples:

- unread projection updates should ignore stale read-position events
- search indexing should upsert by `messageId`
- notification sends should not double-send from duplicate message events without a dedupe key

## 17. Ordering Guidance

Ordering expectations:

- message lifecycle events should be processed in chat order when possible
- `message.message.sent`, `message.message.edited`, and `message.message.deleted` should use `chatId` as partition key
- user-centric events such as session and profile changes should use `userId` as partition key

Do not assume total system ordering.

## 18. MVP Event Set

Minimum event set for MVP:

- `identity.user.registered`
- `identity.user.authenticated`
- `identity.session.revoked`
- `profile.user.updated`
- `profile.user.blocked`
- `chat.chat.created`
- `chat.chat.updated`
- `chat.member.added`
- `chat.member.removed`
- `message.message.sent`
- `message.message.edited`
- `message.message.deleted`
- `message.chat.read_position_updated`
- `realtime.message.delivered`
- `realtime.presence.updated`
- `media.object.uploaded`
- `media.object.processed`
- `media.object.failed`

## 19. Call Events

The v1 call flow should publish versioned topic events with idempotent consumers.

### 19.1 `call.session.created`

Payload fields:

- `callId`
- `chatId`
- `initiatorUserId`
- `receiverUserId`
- `state`
- `startedAt`

### 19.2 `call.participant.ringing`

Payload fields:

- `callId`
- `userId`
- `role`
- `state`
- `occurredAt`

### 19.3 `call.participant.accepted`

Payload fields:

- `callId`
- `userId`
- `role`
- `acceptedAt`

### 19.4 `call.session.active`

Payload fields:

- `callId`
- `chatId`
- `activeAt`

### 19.5 `call.session.ended`

Payload fields:

- `callId`
- `chatId`
- `endedByUserId`
- `outcome`
- `durationSec`
- `endedAt`

### 19.6 `call.session.missed`

Payload fields:

- `callId`
- `chatId`
- `initiatorUserId`
- `receiverUserId`
- `timedOutAt`

Rules:

- call events are partitioned by `callId`
- consumers must treat repeated terminal events as idempotent
- terminal outcomes are immutable after publication

## 20. Deferred Events

Reasonable to defer until later phases:

- channel broadcast events
- bot integration events
- scheduled message events
- advanced moderation workflow events
- analytics-specific low-level telemetry events

## 21. Recommended Next Documents

The next design documents should be:

1. `sequence-flows.md`
2. `database-design.md`
3. `service-bootstrap-plan.md`

## 22. Summary

These event schemas define the internal contracts for RabbitMQ-driven integration across:

- identity
- profile
- chat membership
- messaging
- realtime presence
- media processing
- notification outcomes
- call lifecycle
- moderation actions

The event layer is explicitly at-least-once, versioned, idempotent, and aligned with service ownership and the MVP architecture.
