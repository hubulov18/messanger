# Telegram-Like Messenger API Contracts

## 1. Objective

Define the initial API contracts for a Telegram-like messenger aligned with the existing service decomposition, tech stack, and domain model.

This document focuses on:

- client-facing API boundaries
- service ownership of commands and reads
- request and response shapes
- error conventions
- MVP endpoint scope

This is an architecture contract, not a full OpenAPI specification.

## 2. API Design Principles

The API layer should follow these rules:

- external clients talk to the API Gateway
- each command is routed to the owning service
- each read comes from the authoritative service or a sanctioned read model
- payloads stay stable and versionable
- APIs expose business concepts, not database structures
- realtime delivery supplements APIs but does not replace durable reads

## 3. API Style

### External API

- protocol: HTTPS
- style: REST
- payload format: JSON
- authentication: Bearer access token
- versioning: `/v1`

### Internal Communication

- synchronous service-to-service calls only when necessary
- asynchronous propagation through RabbitMQ events

## 4. Common Conventions

## 4.1 Headers

Required for authenticated endpoints:

- `Authorization: Bearer <access-token>`
- `X-Device-Id: <device-id>`
- `X-Request-Id: <uuid>`

Optional:

- `X-Client-Version`
- `X-Platform`

## 4.2 ID Strategy

All primary identifiers should be opaque string IDs.

Examples:

- `user_...`
- `chat_...`
- `msg_...`
- `media_...`
- `sess_...`

## 4.3 Timestamp Format

Use ISO 8601 UTC timestamps.

Example:

- `2026-04-10T15:30:00Z`

## 4.4 Pagination

Use cursor-based pagination for collections that grow continuously.

Request shape:

```json
{
  "cursor": "opaque-cursor",
  "limit": 50
}
```

Response shape:

```json
{
  "items": [],
  "nextCursor": "opaque-cursor-or-null"
}
```

## 4.5 Error Format

All services should return a consistent error body through the gateway.

```json
{
  "error": {
    "code": "CHAT_FORBIDDEN",
    "message": "You do not have access to this chat.",
    "details": null,
    "requestId": "req_123"
  }
}
```

## 4.6 Standard Error Codes

- `UNAUTHENTICATED`
- `FORBIDDEN`
- `VALIDATION_ERROR`
- `NOT_FOUND`
- `CONFLICT`
- `RATE_LIMITED`
- `CHAT_FORBIDDEN`
- `MEMBER_BLOCKED`
- `MESSAGE_NOT_EDITABLE`
- `MEDIA_PROCESSING_FAILED`

## 5. Identity API

Owned by Identity Service.

## 5.1 Start Registration

`POST /v1/auth/register`

Purpose:

- start signup or login challenge using phone number

Request:

```json
{
  "phoneNumber": "+15551234567"
}
```

Response:

```json
{
  "challengeId": "otp_123",
  "expiresAt": "2026-04-10T15:35:00Z"
}
```

## 5.2 Verify OTP

`POST /v1/auth/verify-otp`

Request:

```json
{
  "challengeId": "otp_123",
  "code": "123456",
  "deviceId": "device_abc",
  "clientType": "ios"
}
```

Response:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "opaque-refresh-token",
  "user": {
    "id": "user_1",
    "isNewUser": true
  }
}
```

## 5.3 Refresh Session

`POST /v1/auth/refresh`

Request:

```json
{
  "refreshToken": "opaque-refresh-token",
  "deviceId": "device_abc"
}
```

Response:

```json
{
  "accessToken": "new-jwt-access-token",
  "refreshToken": "new-refresh-token"
}
```

## 5.4 Logout Current Session

`POST /v1/auth/logout`

Request:

```json
{
  "refreshToken": "opaque-refresh-token"
}
```

Response:

```json
{
  "success": true
}
```

## 5.5 List Sessions

`GET /v1/auth/sessions`

Response:

```json
{
  "items": [
    {
      "id": "sess_1",
      "clientType": "ios",
      "deviceId": "device_abc",
      "lastSeenAt": "2026-04-10T15:30:00Z",
      "current": true
    }
  ]
}
```

## 5.6 Revoke Session

`DELETE /v1/auth/sessions/{sessionId}`

Response:

```json
{
  "success": true
}
```

## 6. User Profile API

Owned by User Profile Service.

## 6.1 Get Current User

`GET /v1/me`

Response:

```json
{
  "id": "user_1",
  "username": "judy",
  "displayName": "Judy",
  "bio": "Hello",
  "avatarMediaId": "media_1",
  "privacy": {
    "lastSeenVisibility": "contacts",
    "phoneVisibility": "nobody",
    "profilePhotoVisibility": "everyone"
  }
}
```

## 6.2 Update Profile

`PATCH /v1/me`

Request:

```json
{
  "displayName": "Judy Ann",
  "bio": "Building a messenger",
  "avatarMediaId": "media_2"
}
```

Response:

```json
{
  "success": true,
  "profile": {
    "id": "user_1",
    "displayName": "Judy Ann",
    "bio": "Building a messenger",
    "avatarMediaId": "media_2"
  }
}
```

## 6.3 Resolve User By Username

`GET /v1/users/by-username/{username}`

Response:

```json
{
  "id": "user_2",
  "username": "alice",
  "displayName": "Alice",
  "avatarMediaId": "media_3"
}
```

## 6.4 Update Privacy

`PATCH /v1/me/privacy`

Request:

```json
{
  "lastSeenVisibility": "contacts",
  "phoneVisibility": "nobody",
  "profilePhotoVisibility": "everyone"
}
```

Response:

```json
{
  "success": true
}
```

## 6.5 Block User

`POST /v1/me/blocks/{targetUserId}`

Response:

```json
{
  "success": true
}
```

## 6.6 Unblock User

`DELETE /v1/me/blocks/{targetUserId}`

Response:

```json
{
  "success": true
}
```

## 6.7 List Blocked Users

`GET /v1/me/blocks`

Response:

```json
{
  "items": [
    {
      "id": "user_9",
      "username": "alice",
      "displayName": "Alice",
      "avatarMediaId": "media_3",
      "blockedAt": "2026-04-14T09:30:00.000Z"
    }
  ]
}
```

## 7. Chat API

Owned by Chat Service for metadata and membership.

## 7.1 Create Direct Chat

`POST /v1/chats/direct`

Policy denial reasons:

- `self_chat_not_allowed` -> `400`
- `blocked_by_user_policy` -> `403`

Request:

```json
{
  "participantUserId": "user_2"
}
```

Response:

```json
{
  "chat": {
    "id": "chat_1",
    "type": "direct",
    "createdAt": "2026-04-10T15:30:00Z"
  }
}
```

## 7.2 Create Group Chat

`POST /v1/chats/group`

Request:

```json
{
  "title": "Product Team",
  "memberUserIds": ["user_2", "user_3"]
}
```

Response:

```json
{
  "chat": {
    "id": "chat_2",
    "type": "group",
    "title": "Product Team",
    "createdAt": "2026-04-10T15:30:00Z"
  }
}
```

## 7.3 List Chats

`GET /v1/chats?cursor=<cursor>&limit=20`

Access rule:

- only chats where the requester has an active membership are returned
- inactive, removed, left, or missing memberships are excluded rather than emitted as partial items

Response:

```json
{
  "items": [
    {
      "id": "chat_1",
      "type": "direct",
      "title": null,
      "counterpart": {
        "id": "user_2",
        "displayName": "Alice",
        "avatarMediaId": "media_3"
      },
      "lastMessagePreview": {
        "id": "msg_9",
        "text": "See you soon",
        "createdAt": "2026-04-10T15:28:00Z"
      },
      "unreadCount": 2
    }
  ],
  "nextCursor": null
}
```

## 7.4 Get Chat Details

`GET /v1/chats/{chatId}`

Policy denial reasons:

- `chat_missing` -> `404`
- `membership_missing` -> `403`
- `membership_inactive` -> `403`

Response:

```json
{
  "id": "chat_2",
  "type": "group",
  "title": "Product Team",
  "description": null,
  "photoMediaId": null,
  "permissions": {
    "canSendMessages": true,
    "canAddMembers": true
  },
  "memberCount": 3
}
```

## 7.5 Add Members

`POST /v1/chats/{chatId}/members`

Policy denial reasons:

- `chat_missing` -> `404`
- `membership_missing` -> `403`
- `membership_inactive` -> `403`
- `member_mutation_not_supported_for_direct_chat` -> `400`
- `add_members_restricted` -> `403`

Request:

```json
{
  "userIds": ["user_4", "user_5"]
}
```

Response:

```json
{
  "success": true,
  "addedCount": 2
}
```

## 7.6 Remove Member

`DELETE /v1/chats/{chatId}/members/{userId}`

Policy denial reasons:

- `chat_missing` -> `404`
- `membership_missing` -> `403`
- `membership_inactive` -> `403`
- `member_mutation_not_supported_for_direct_chat` -> `400`
- `target_membership_missing` -> `404`
- `target_membership_inactive` -> `409`
- `remove_members_restricted` -> `403`

Response:

```json
{
  "success": true
}
```

## 8. Message API

Owned by Message Service.

## 8.1 Send Message

`POST /v1/messages`

Policy denial reasons:

- `chat_missing` -> `404`
- `membership_missing` -> `403`
- `membership_inactive` -> `403`
- `blocked_by_user_policy` -> `403`
- `send_restricted` -> `403`

Request:

```json
{
  "chatId": "chat_2",
  "clientMessageId": "client_123",
  "type": "text",
  "text": "Hello team",
  "replyToMessageId": null,
  "attachments": []
}
```

Response:

```json
{
  "message": {
    "id": "msg_10",
    "chatId": "chat_2",
    "senderUserId": "user_1",
    "type": "text",
    "text": "Hello team",
    "createdAt": "2026-04-10T15:31:00Z",
    "editedAt": null,
    "status": "sent"
  }
}
```

Notes:

- `clientMessageId` supports idempotency and retry-safe mobile sends

## 8.2 Send Media Message

`POST /v1/messages`

Request:

```json
{
  "chatId": "chat_2",
  "clientMessageId": "client_124",
  "type": "image",
  "text": "",
  "attachments": [
    {
      "mediaId": "media_9",
      "attachmentType": "image"
    }
  ]
}
```

Response shape matches `Send Message`.

## 8.3 Edit Message

`PATCH /v1/messages/{messageId}`

Request:

```json
{
  "text": "Hello team updated"
}
```

Response:

```json
{
  "message": {
    "id": "msg_10",
    "text": "Hello team updated",
    "editedAt": "2026-04-10T15:33:00Z"
  }
}
```

## 8.4 Delete Message

`DELETE /v1/messages/{messageId}`

Request:

```json
{
  "scope": "for_everyone"
}
```

Response:

```json
{
  "success": true
}
```

## 8.5 List Messages

`GET /v1/chats/{chatId}/messages?cursor=<cursor>&limit=50`

Response:

```json
{
  "items": [
    {
      "id": "msg_10",
      "chatId": "chat_2",
      "senderUserId": "user_1",
      "type": "text",
      "text": "Hello team updated",
      "attachments": [],
      "replyToMessageId": null,
      "createdAt": "2026-04-10T15:31:00Z",
      "editedAt": "2026-04-10T15:33:00Z",
      "deletedAt": null,
      "reactions": [],
      "delivery": {
        "delivered": true,
        "seen": true
      }
    }
  ],
  "nextCursor": null
}
```

## 8.6 Mark Chat Read

`POST /v1/chats/{chatId}/read`

Request:

```json
{
  "lastReadMessageId": "msg_10"
}
```

Response:

```json
{
  "success": true,
  "chatId": "chat_2",
  "lastReadMessageId": "msg_10"
}
```

## 8.7 Add Reaction

`POST /v1/messages/{messageId}/reactions`

Request:

```json
{
  "emoji": "🔥"
}
```

Response:

```json
{
  "success": true
}
```

## 8.8 Remove Reaction

`DELETE /v1/messages/{messageId}/reactions/{emoji}`

Response:

```json
{
  "success": true
}
```

## 9. Media API

Owned by Media Service.

## 9.1 Create Upload Session

`POST /v1/media/upload-sessions`

Purpose:

- allocate a pending media object
- create a short-lived upload session
- return storage target information without sending raw bytes through the gateway

Request:

```json
{
  "mediaType": "image",
  "fileName": "photo.jpg",
  "mimeType": "image/jpeg",
  "sizeBytes": 204800,
  "checksum": "sha256:abc123"
}
```

Response:

```json
{
  "uploadId": "upload_1",
  "mediaId": "media_9",
  "upload": {
    "method": "PUT",
    "uploadUrl": "https://storage.example.com/upload-url",
    "headers": {
      "content-type": "image/jpeg"
    }
  },
  "processingStatus": "pending",
  "expiresAt": "2026-04-10T15:40:00Z"
}
```

Notes:

- upload session creation is authenticated and owner-scoped
- the upload target is opaque to the client beyond method, URL, and required headers
- `processingStatus` is initially `pending`

## 9.2 Finalize Upload

`POST /v1/media/finalize`

Purpose:

- mark a previously issued upload session as completed
- move media object state from `pending` to `uploaded`
- trigger asynchronous post-processing when required

Request:

```json
{
  "uploadId": "upload_1",
  "checksum": "sha256:abc123"
}
```

Response:

```json
{
  "media": {
    "id": "media_9",
    "mediaType": "image",
    "mimeType": "image/jpeg",
    "sizeBytes": 204800,
    "processingStatus": "uploaded",
    "variants": [
      {
        "variantType": "thumbnail",
        "url": "https://cdn.example.com/media_9_thumb.jpg"
      }
    ]
  }
}
```

## 9.3 Get Media Metadata

`GET /v1/media/{mediaId}`

Response:

```json
{
  "id": "media_9",
  "mediaType": "image",
  "mimeType": "image/jpeg",
  "sizeBytes": 204800,
  "processingStatus": "ready",
  "downloadUrl": "https://cdn.example.com/media_9.jpg",
  "variants": [
    {
      "variantType": "thumbnail",
      "downloadUrl": "https://cdn.example.com/media_9_thumb.jpg"
    }
  ]
}
```

## 10. Contacts API

Owned by Contacts Service.

## 10.1 Import Contacts

`POST /v1/contacts/import`

Hash contract:

- the client must normalize the raw phone number before hashing
- current normalization rule: trim leading and trailing whitespace, then remove spaces, `(`, `)`, and `-`
- example: `+1 (555) 123-4567` -> `+15551234567`
- `normalizedHash` must be the SHA-256 digest of that normalized string, encoded as lowercase hex
- the backend stores and matches the same normalized hash through Identity Service

Notes:

- this is the MVP contract for iOS and backend interoperability
- if normalization rules change later, they must be versioned rather than silently replaced

Request:

```json
{
  "contacts": [
    {
      "normalizedHash": "sha256-hash",
      "displayName": "Alice"
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "matchedCount": 1
}
```

## 10.2 List Contacts

`GET /v1/contacts`

Response:

```json
{
  "items": [
    {
      "userId": "user_2",
      "displayName": "Alice",
      "username": "alice",
      "avatarMediaId": "media_3"
    }
  ]
}
```

## 11. Notification API

Owned by Notification Service.

## 11.1 Register Device

`POST /v1/notifications/devices`

Request:

```json
{
  "platform": "ios",
  "deviceId": "device_abc",
  "pushToken": "apns-token",
  "voipPushToken": "voip-apns-token",
  "appVersion": "1.0.0"
}
```

Response:

```json
{
  "success": true,
  "deviceRegistrationId": "devreg_1"
}
```

## 11.2 Update Chat Notification Preference

`PATCH /v1/chats/{chatId}/notification-settings`

Request:

```json
{
  "isMuted": true,
  "muteUntil": "2026-04-11T15:00:00Z",
  "showPreview": false
}
```

Response:

```json
{
  "success": true
}
```

## 12. Call API

Owned by Call Service.

## 12.1 Start Call

`POST /v1/calls`

Request:

```json
{
  "chatId": "chat_2"
}
```

Response:

```json
{
  "callId": "call_1",
  "chatId": "chat_2",
  "state": "ringing",
  "role": "caller",
  "counterpartUserId": "user_2",
  "signalingUrl": "wss://api.example.com/calls/socket",
  "signalingToken": "call-signal-token",
  "iceServers": [
    {
      "urls": [
        "stun:stun.example.com:3478"
      ]
    },
    {
      "urls": [
        "turn:turn.example.com:3478?transport=udp"
      ],
      "username": "1744567890:user_1",
      "credential": "temporary-credential"
    }
  ],
  "participants": [
    {
      "userId": "user_1",
      "role": "caller",
      "state": "joined"
    },
    {
      "userId": "user_2",
      "role": "callee",
      "state": "ringing"
    }
  ],
  "startedAt": "2026-04-13T08:00:00Z"
}
```

## 12.2 Get Call

`GET /v1/calls/{callId}`

Response:

```json
{
  "callId": "call_1",
  "chatId": "chat_2",
  "state": "accepted",
  "counterpartUserId": "user_2",
  "participants": [
    {
      "userId": "user_1",
      "role": "caller",
      "state": "joined"
    },
    {
      "userId": "user_2",
      "role": "callee",
      "state": "accepted"
    }
  ],
  "startedAt": "2026-04-13T08:00:00Z",
  "acceptedAt": "2026-04-13T08:00:08Z",
  "endedAt": null
}
```

## 12.3 Accept Call

`POST /v1/calls/{callId}/accept`

Response:

```json
{
  "callId": "call_1",
  "state": "accepted",
  "role": "callee",
  "signalingUrl": "wss://api.example.com/calls/socket",
  "signalingToken": "call-signal-token",
  "iceServers": [
    {
      "urls": [
        "stun:stun.example.com:3478"
      ]
    }
  ]
}
```

## 12.4 Decline Call

`POST /v1/calls/{callId}/decline`

Response:

```json
{
  "success": true,
  "callId": "call_1",
  "state": "declined"
}
```

## 12.5 End Call

`POST /v1/calls/{callId}/end`

Response:

```json
{
  "success": true,
  "callId": "call_1",
  "state": "ended"
}
```

## 12.6 Rejoin Call

`POST /v1/calls/{callId}/join`

Response:

```json
{
  "callId": "call_1",
  "state": "active",
  "signalingUrl": "wss://api.example.com/calls/socket",
  "signalingToken": "call-signal-token",
  "iceServers": [
    {
      "urls": [
        "turn:turn.example.com:3478?transport=udp"
      ],
      "username": "1744567890:user_1",
      "credential": "temporary-credential"
    }
  ]
}
```

## 12.7 Call Error Codes

- `CALL_CONFLICT`
- `CALL_NOT_ALLOWED`
- `CALL_ALREADY_ENDED`
- `CALL_TARGET_BUSY`
- `CALL_INVALID_STATE`

## 13. Search API

Owned by Search Service or deferred read model.

## 13.1 Search Users

`GET /v1/search/users?q=alice`

Response:

```json
{
  "items": [
    {
      "id": "user_2",
      "username": "alice",
      "displayName": "Alice"
    }
  ]
}
```

## 13.2 Search Messages

`GET /v1/search/messages?q=team&chatId=chat_2`

Response:

```json
{
  "items": [
    {
      "id": "msg_10",
      "chatId": "chat_2",
      "snippet": "Hello team updated",
      "createdAt": "2026-04-10T15:31:00Z"
    }
  ]
}
```

## 14. Realtime Contract

Realtime is owned by Realtime Service.

The websocket connection is not the source of truth. It delivers live events after durable state is accepted by owning services.

## 14.1 Connection

`GET /v1/realtime/session`

Response:

```json
{
  "socketUrl": "wss://rt.example.com/socket",
  "token": "short-lived-realtime-token"
}
```

## 14.2 Client Events

Client may emit:

- `typing:start`
- `typing:stop`
- `presence:ping`

Example:

```json
{
  "event": "typing:start",
  "payload": {
    "chatId": "chat_2"
  }
}
```

## 13.3 Server Events

Server may emit:

- `message.created`
- `message.updated`
- `message.deleted`
- `message.read`
- `chat.updated`
- `typing.updated`
- `presence.updated`

Example event:

```json
{
  "event": "message.created",
  "payload": {
    "id": "msg_10",
    "chatId": "chat_2",
    "senderUserId": "user_1",
    "type": "text",
    "text": "Hello team",
    "createdAt": "2026-04-10T15:31:00Z"
  }
}
```

## 14. Gateway Aggregation Rules

The API Gateway may aggregate read models for client efficiency, but must not become the domain owner.

Allowed gateway aggregation examples:

- `GET /v1/chats` combining chat metadata, unread counts, and last message preview
- `GET /v1/me` combining identity and profile-facing data

Disallowed gateway behavior:

- storing business state
- implementing message send rules
- owning chat membership decisions

## 15. MVP Endpoint Set

Recommended MVP endpoint set:

- `POST /v1/auth/register`
- `POST /v1/auth/verify-otp`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`
- `GET /v1/me`
- `PATCH /v1/me`
- `GET /v1/users/by-username/{username}`
- `POST /v1/chats/direct`
- `POST /v1/chats/group`
- `GET /v1/chats`
- `GET /v1/chats/{chatId}`
- `GET /v1/chats/{chatId}/messages`
- `POST /v1/messages`
- `PATCH /v1/messages/{messageId}`
- `DELETE /v1/messages/{messageId}`
- `POST /v1/chats/{chatId}/read`
- `POST /v1/media/upload-sessions`
- `POST /v1/media/finalize`
- `POST /v1/notifications/devices`

## 16. Non-Functional API Requirements

- idempotent message send via `clientMessageId`
- cursor-based pagination for chats and messages
- request tracing via `X-Request-Id`
- strong validation on all write endpoints
- rate limiting on auth, messaging, and upload routes
- stable error codes for client behavior
- backward-compatible evolution under `/v1`

## 17. Open Decisions

Still to define in later documents:

- exact DTO field naming conventions for internal services
- whether some read endpoints are backed by projections or direct service calls
- final reaction constraints per user per message
- message delete policy semantics across private and group chats
- upload authorization and signed URL lifecycle details

## 18. Recommended Next Documents

The next architecture documents should be:

1. `event-schemas.md`
2. `sequence-flows.md`
3. `database-design.md`

## 19. Summary

These contracts define a stable MVP API around:

- auth and session control
- profile and privacy
- chat creation and membership
- durable message operations
- media upload and attachment linking
- notification registration
- websocket-based live updates

The API remains REST-first for clients, event-driven internally, and consistent with the defined service ownership model.
