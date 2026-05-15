# Telegram-Like Messenger Sequence Flows

## 1. Objective

Define the core end-to-end sequence flows for a Telegram-like messenger MVP.

This document connects:

- client API calls
- service responsibilities
- RabbitMQ events
- realtime delivery
- read and sync behavior

The purpose is to validate the architecture through behavior, not just through static service boundaries.

## 2. Flow Design Principles

- commands write to the owning service
- durable state is committed before fanout
- RabbitMQ events propagate completed state changes
- websocket delivery is best-effort live transport, not source of truth
- clients recover state through APIs after disconnects or missed events

## 3. Core Actors

- iOS Client
- API Gateway
- Identity Service
- User Profile Service
- Chat Service
- Message Service
- Realtime Service
- Media Service
- Notification Service
- RabbitMQ
- PostgreSQL
- Redis

## 4. Flow: User Sign In With OTP

### Steps

1. iOS client calls `POST /v1/auth/register` with phone number.
2. API Gateway routes request to Identity Service.
3. Identity Service creates `OtpChallenge` and sends OTP through provider integration.
4. Identity Service returns `challengeId` and expiration.
5. iOS client submits `POST /v1/auth/verify-otp`.
6. Identity Service validates the challenge and code.
7. Identity Service creates or resolves `UserAccount`.
8. Identity Service creates a `Session`.
9. Identity Service returns access token, refresh token, and user identity.
10. Identity Service publishes `identity.user.registered` if this is a new account.
11. Identity Service publishes `identity.user.authenticated`.
12. User Profile Service consumes registration event and ensures profile bootstrap if needed.

### Result

- user is authenticated
- session exists as durable state
- downstream services are informed asynchronously

## 5. Flow: Open Chat List

### Steps

1. iOS client calls `GET /v1/chats`.
2. API Gateway authenticates token.
3. Gateway requests chat memberships and chat metadata from Chat Service or an approved read model.
4. Gateway requests last message previews and unread counters from the read side that is built from Message events.
5. Gateway aggregates response.
6. iOS client renders chat list.
7. Client opens realtime session in parallel or immediately after.

### Result

- chat list is served from durable or projection-backed data
- websocket is not required for initial correctness

## 6. Flow: Establish Realtime Connection

### Steps

1. iOS client calls `GET /v1/realtime/session`.
2. API Gateway validates access token.
3. Realtime Service issues short-lived realtime token or connection metadata.
4. Client opens websocket connection.
5. Realtime Service validates token.
6. Realtime Service registers connection in Redis.
7. Realtime Service updates presence state.
8. Realtime Service may publish `realtime.presence.updated`.

### Result

- client is connected for live updates
- ephemeral connection state is stored in Redis

## 7. Flow: Send Text Message

This is the primary critical flow.

### Steps

1. iOS client submits `POST /v1/messages` with `chatId`, `clientMessageId`, and message content.
2. API Gateway authenticates request and forwards to Message Service.
3. Message Service validates payload.
4. Message Service verifies sender membership and permissions through local read model or Chat Service contract.
5. Message Service checks blocking and moderation constraints where applicable.
6. Message Service writes `Message` to PostgreSQL.
7. Message Service returns the created message to the client.
8. Message Service publishes `message.message.sent` to RabbitMQ.
9. Realtime Service consumes the event and determines connected recipients.
10. Realtime Service pushes `message.created` websocket events to active recipients.
11. Notification Service consumes the same event.
12. Notification Service evaluates mute settings, device registrations, and online status.
13. Notification Service sends push notifications where required.
14. Search projection consumes the event and indexes the message.
15. Chat list projection updates last message preview and unread counters.

### Important Guarantees

- durable write happens before event publication
- client gets authoritative message ID from Message Service
- live delivery failure does not mean message loss
- offline recipients recover through message history APIs later

## 8. Flow: Send Media Message

### Steps

1. iOS client calls `POST /v1/media/upload-sessions`.
2. Media Service creates `MediaObject` in pending state and returns signed upload details.
3. Client uploads bytes to object storage.
4. Client calls `POST /v1/media/finalize`.
5. Media Service verifies upload and updates metadata.
6. Media Service triggers or performs processing.
7. Media Service publishes `media.object.uploaded` and then `media.object.processed` when ready.
8. Client sends `POST /v1/messages` referencing `mediaId`.
9. Message Service writes the message with attachment references.
10. Message Service publishes `message.message.sent`.
11. Realtime and Notification flows proceed as in text messaging.

### Result

- media storage and message storage remain separate
- message contains attachment references, not binary data

## 9. Flow: Receive Message While Online

### Steps

1. Recipient client has active websocket connection.
2. Realtime Service receives `message.message.sent` from RabbitMQ.
3. Realtime Service resolves active recipient connections in Redis.
4. Realtime Service emits `message.created` to relevant sockets.
5. Recipient client appends message to UI.
6. Recipient client may send delivery acknowledgment or implicit presence/activity signal.
7. Realtime Service may publish `realtime.message.delivered`.
8. If durable delivery tracking is required, Message Service updates delivery cursor from that signal path.

### Result

- online user sees the message with low latency
- source of truth still remains in Message Service storage

## 10. Flow: Read Messages

### Steps

1. User opens a chat and scrolls to latest seen message.
2. Client calls `POST /v1/chats/{chatId}/read` with `lastReadMessageId`.
3. API Gateway routes request to Message Service.
4. Message Service validates that the message belongs to the chat and that the user is a valid member.
5. Message Service upserts read cursor.
6. Message Service publishes `message.chat.read_position_updated`.
7. Realtime Service consumes event and emits `message.read` updates to relevant chat participants.
8. Chat list and unread counter projections update asynchronously.

### Result

- read state is durable
- other participants receive read updates live
- unread counters converge through projections

## 11. Flow: Edit Message

### Steps

1. Client sends `PATCH /v1/messages/{messageId}`.
2. Message Service verifies edit permissions and time-window policy.
3. Message Service updates message and optional revision record.
4. Message Service publishes `message.message.edited`.
5. Realtime Service sends `message.updated` to connected members.
6. Search and chat preview projections update if needed.

## 12. Flow: Delete Message

### Steps

1. Client sends `DELETE /v1/messages/{messageId}`.
2. Message Service validates delete permissions.
3. Message Service applies tombstone or delete policy.
4. Message Service publishes `message.message.deleted`.
5. Realtime Service broadcasts `message.deleted`.
6. Projections update previews, unread logic, and search visibility as required.

## 13. Flow: Reconnect And Catch Up

This flow is critical for mobile reliability.

### Steps

1. Client comes back online after disconnect.
2. Client refreshes access token if needed.
3. Client re-establishes websocket connection through Realtime Service.
4. Client calls `GET /v1/chats` and `GET /v1/chats/{chatId}/messages` for affected chats.
5. Gateway returns durable current state from source services or approved projections.
6. Client reconciles optimistic local state using authoritative server IDs and timestamps.
7. Any missed websocket events are naturally repaired by durable API fetches.

### Result

- correctness depends on APIs, not on perfect websocket continuity
- mobile connectivity problems do not corrupt chat state

## 14. Flow: Start Outgoing Voice Call

### Steps

1. Caller client sends `POST /v1/calls` with `chatId`.
2. API Gateway routes request to Call Service.
3. Call Service verifies direct-chat access through Chat Service.
4. Call Service verifies block policy through Profile Service.
5. Call Service ensures neither participant nor chat already has an active or ringing call.
6. Call Service writes durable `CallSession` and `CallParticipant` rows.
7. Call Service returns signaling bootstrap data and ICE servers to the caller.
8. Call Service emits `call.ringing` to connected callee sockets and requests VoIP delivery when needed.

### Result

- call state is durable before live signaling starts
- caller has enough data to connect to signaling
- callee can be reached by socket or VoIP notification

## 15. Flow: Accept Incoming Call

### Steps

1. Callee receives incoming call through connected call socket or PushKit.
2. iOS native layer reports incoming call to CallKit.
3. Callee accepts through in-app UI or CallKit.
4. Client sends `POST /v1/calls/{callId}/accept`.
5. Call Service updates participant state and returns signaling bootstrap data.
6. Caller receives `call.accepted`.
7. Caller creates WebRTC offer and sends it over the call signaling namespace.
8. Callee sends answer and ICE candidates.
9. Call Service marks the session `active` once signaling handshake completes.

### Result

- both peers share durable call state and live signaling
- media setup remains decoupled from chat transport

## 16. Flow: Missed Or Declined Call

### Steps

1. Callee declines explicitly or does not answer before timeout.
2. Call Service transitions the session to `declined` or `missed`.
3. Call Service publishes terminal call events.
4. Call Service asks Message Service to create a `call_event` timeline entry.
5. Caller and callee receive `call.ended` over signaling if connected.

### Result

- terminal outcome is durable
- chat history reflects the result

## 17. Flow: Rejoin Active Call

### Steps

1. Client loses signaling connectivity during an accepted or active call.
2. Client reconnects authenticated call socket.
3. Client sends `POST /v1/calls/{callId}/join`.
4. Call Service returns a fresh signaling token and ICE config.
5. Client rejoins the call room and renegotiates if necessary.

### Result

- active call can recover from transient network loss
- reconnect does not require a brand-new durable call session

## 18. Flow: Add Member To Group

### Steps

1. Admin client calls `POST /v1/chats/{chatId}/members`.
2. Chat Service validates role permissions.
3. Chat Service writes new `ChatMember` rows.
4. Chat Service publishes `chat.member.added` for each new member or as a batch event if chosen.
5. Realtime Service informs connected clients that membership changed.
6. Notification Service may notify added users.
7. Message Service updates membership read models if required for send authorization.

## 19. Flow: Block User

### Steps

1. Client calls `POST /v1/me/blocks/{targetUserId}`.
2. User Profile Service writes `BlockRelation`.
3. User Profile Service publishes `profile.user.blocked`.
4. Chat Service and Message Service consume event and update enforcement read models.
5. Notification Service stops inappropriate notifications where policy requires.

### Result

- policy state is durable in profile domain
- enforcement is distributed via events, not shared tables

## 20. Failure Handling Guidance

### Message Send Failure Before Commit

- client receives error response
- no event is published
- no realtime delivery occurs

### Event Publish Failure After Commit

- use outbox pattern or equivalent transactional publication strategy
- message remains durable even if fanout is delayed
- retry publication until event is delivered to RabbitMQ

### Realtime Delivery Failure

- do not roll back message state
- client recovers via API fetch on reconnect

### Notification Failure

- do not affect message persistence
- failures are operational concerns with retries and metrics

## 21. Recommended Reliability Pattern

For message-producing services, use:

- transactional write to database
- outbox record in same transaction
- background publisher to RabbitMQ
- consumer idempotency by `eventId`

This is especially important for:

- Message Service
- Chat Service
- Identity Service
- Media Service

## 18. Summary

These sequence flows validate the architecture around the most important MVP behaviors:

- sign in
- chat list load
- realtime connect
- send text/media message
- receive message online
- mark read
- edit/delete message
- reconnect recovery
- membership changes
- block enforcement

The main architectural rule holds across all flows: durable state first, event propagation second, realtime delivery third.
