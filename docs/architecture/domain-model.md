# Telegram-Like Messenger Domain Model

## 1. Objective

Define the core domain model for a Telegram-like messenger before implementation. This document translates product features and service boundaries into business entities, aggregates, relationships, and rules.

The goal is to:

- clarify the core business objects
- define ownership boundaries
- identify source-of-truth entities
- support microservice API and database design
- keep the model aligned with MVP scope

## 2. Modeling Principles

The domain model follows these rules:

- model by business meaning, not UI screens
- keep source of truth explicit
- separate durable entities from ephemeral runtime state
- avoid premature fields that belong to later phases
- keep aggregate boundaries small enough for microservices
- use IDs and events for cross-service relationships

## 3. Core Bounded Contexts

The main bounded contexts are:

- Identity
- User Profile
- Contacts
- Chats
- Messaging
- Realtime Presence
- Media
- Notifications
- Moderation

These map directly to the architecture decisions already documented.

## 4. Core Aggregates and Entities

## 4.1 Identity Context

### Aggregate: UserAccount

Represents the authenticated account identity.

#### Fields

- `id`
- `phoneNumber` or alternative login identifier
- `status`
- `createdAt`
- `verifiedAt`
- `twoFactorEnabled`

#### Rules

- account identity is created only after verification flow succeeds
- login and authentication state belong here, not in user profile
- account status must support suspension or deletion later

### Entity: Session

Represents a user login session per device or client.

#### Fields

- `id`
- `userAccountId`
- `deviceId`
- `clientType`
- `refreshTokenId`
- `ipAddress`
- `userAgent`
- `createdAt`
- `lastSeenAt`
- `revokedAt`

#### Rules

- one user can have many active sessions
- sessions are individually revocable
- session history is security-relevant

### Entity: OtpChallenge

Represents one verification attempt.

#### Fields

- `id`
- `target`
- `codeHash`
- `purpose`
- `expiresAt`
- `attemptCount`
- `consumedAt`

#### Rules

- OTPs are short-lived
- OTP values must never be stored in plain text

## 4.2 User Profile Context

### Aggregate: UserProfile

Represents the public and user-controlled social identity.

#### Fields

- `userId`
- `username`
- `displayName`
- `bio`
- `avatarMediaId`
- `lastSeenVisibility`
- `phoneVisibility`
- `profilePhotoVisibility`
- `createdAt`
- `updatedAt`

#### Rules

- `userId` references the Identity context account
- profile can exist only for a valid account
- profile visibility rules belong here, not in chat logic

### Entity: BlockRelation

Represents one user blocking another.

#### Fields

- `id`
- `ownerUserId`
- `blockedUserId`
- `createdAt`

#### Rules

- block rules affect message initiation, visibility, and interaction policies
- block evaluation should be queryable without coupling to chat storage

## 4.3 Contacts Context

### Aggregate: ContactBook

Represents a user-owned contact import and discovery boundary.

#### Fields

- `ownerUserId`
- `lastImportedAt`
- `version`

### Entity: ImportedContact

Represents one imported contact item.

#### Fields

- `id`
- `ownerUserId`
- `normalizedHash`
- `displayName`
- `matchedUserId`
- `createdAt`

#### Rules

- raw contact data should be minimized or avoided where possible
- matching should prefer hashed normalized identifiers

## 4.4 Chats Context

### Aggregate: Chat

Represents a communication container.

#### Fields

- `id`
- `type` (`direct`, `group`, `channel`)
- `title`
- `description`
- `photoMediaId`
- `createdByUserId`
- `createdAt`
- `updatedAt`
- `isArchived`

#### Rules

- `direct` chats should have constrained membership semantics
- group and channel behavior diverge later, but can share the root aggregate early
- chat metadata belongs to Chat context, not Message context

### Entity: ChatMember

Represents a user membership inside a chat.

#### Fields

- `id`
- `chatId`
- `userId`
- `role`
- `joinedAt`
- `invitedByUserId`
- `status`
- `lastReadMessageId`
- `lastDeliveredMessageId`

#### Rules

- membership state is the authority for whether a user can post or read
- role semantics differ by chat type
- read and delivery cursors may later move to Messaging if scaling requires it

### Entity: InviteLink

Represents an invitation mechanism for group or channel access.

#### Fields

- `id`
- `chatId`
- `token`
- `createdByUserId`
- `expiresAt`
- `maxUses`
- `usedCount`
- `revokedAt`

#### Rules

- invite links are chat-level access artifacts
- token storage must support secure lookup and revocation

## 4.5 Messaging Context

### Aggregate: Message

Represents one durable message in a chat.

#### Fields

- `id`
- `chatId`
- `senderUserId`
- `type` (`text`, `image`, `video`, `audio`, `file`, `system`)
- `text`
- `replyToMessageId`
- `forwardedFromMessageId`
- `createdAt`
- `editedAt`
- `deletedAt`
- `status`

#### Rules

- Message Service is source of truth for durable message state
- edits must preserve auditability through revisions if needed
- deletion semantics should support both user-visible removal and system retention policies
- media attachments should reference Media entities, not embed file storage details

### Entity: MessageAttachment

Represents the relationship between a message and a media object.

#### Fields

- `id`
- `messageId`
- `mediaId`
- `attachmentType`
- `sortOrder`

### Entity: MessageReaction

Represents one reaction from one user to one message.

#### Fields

- `id`
- `messageId`
- `userId`
- `emoji`
- `createdAt`

#### Rules

- a user can react with a constrained set of active reactions per message depending on product rules

### Entity: MessageRevision

Represents an edit history item.

#### Fields

- `id`
- `messageId`
- `previousText`
- `editedAt`
- `editedByUserId`

#### Rules

- revision retention policy can vary by product and privacy decisions

### Entity: ReadReceipt

Represents a durable per-member read position.

#### Fields

- `id`
- `chatId`
- `userId`
- `lastReadMessageId`
- `updatedAt`

#### Rules

- for MVP this can be modeled simply as one latest position per user per chat
- detailed per-message receipts are unnecessary for Telegram-like semantics

### Entity: DeliveryReceipt

Represents a durable delivery cursor where needed.

#### Fields

- `id`
- `chatId`
- `userId`
- `lastDeliveredMessageId`
- `updatedAt`

#### Rules

- delivery should be stored as a cursor, not one row per message event, unless product behavior requires finer granularity

## 4.6 Realtime Presence Context

This context is mostly ephemeral and should not be modeled like durable chat data.

### Entity: PresenceState

#### Fields

- `userId`
- `state` (`online`, `offline`, `away`)
- `lastActiveAt`
- `connectionCount`

### Entity: TypingState

#### Fields

- `chatId`
- `userId`
- `startedAt`
- `expiresAt`

#### Rules

- presence and typing belong in Redis or equivalent ephemeral store
- they are not the source of truth for message delivery or read state

## 4.7 Media Context

### Aggregate: MediaObject

Represents one uploaded media asset.

#### Fields

- `id`
- `ownerUserId`
- `storageKey`
- `mediaType`
- `mimeType`
- `sizeBytes`
- `checksum`
- `processingStatus`
- `createdAt`

#### Rules

- storage details belong to Media context only
- message entities should reference `mediaId`
- processing states should support upload, ready, failed, and deleted semantics

### Entity: MediaVariant

Represents a derived version of a media object.

#### Fields

- `id`
- `mediaId`
- `variantType`
- `storageKey`
- `width`
- `height`
- `durationMs`
- `sizeBytes`

#### Rules

- thumbnails, previews, and transcoded versions belong here

## 4.8 Notification Context

### Aggregate: DeviceRegistration

Represents a client device capable of receiving notifications.

#### Fields

- `id`
- `userId`
- `platform`
- `pushToken`
- `voipPushToken`
- `deviceId`
- `appVersion`
- `lastRegisteredAt`
- `revokedAt`

### Entity: NotificationPreference

#### Fields

- `id`
- `userId`
- `chatId`
- `isMuted`
- `muteUntil`
- `showPreview`

#### Rules

- preferences can be global or per-chat
- notification decisions should be derived from these preferences plus membership and presence data

## 4.9 Moderation Context

### Aggregate: AbuseReport

Represents a submitted report against content or a user.

#### Fields

- `id`
- `reporterUserId`
- `targetType`
- `targetId`
- `reason`
- `description`
- `status`
- `createdAt`

### Entity: Sanction

#### Fields

- `id`
- `targetType`
- `targetId`
- `actionType`
- `reason`
- `createdAt`
- `expiresAt`

## 5. Relationship Overview

Key relationships:

- `UserAccount` 1 -> 1 `UserProfile`
- `UserAccount` 1 -> many `Session`
- `UserProfile` 1 -> many `BlockRelation`
- `Chat` 1 -> many `ChatMember`
- `Chat` 1 -> many `Message`
- `Message` 1 -> many `MessageReaction`
- `Message` 1 -> many `MessageAttachment`
- `MediaObject` 1 -> many `MediaVariant`
- `UserAccount` 1 -> many `DeviceRegistration`

Cross-context relationships should use IDs, not direct database joins across services.

## 6. MVP Entity Set

The MVP should focus on the minimum durable model needed for a real messenger:

- `UserAccount`
- `Session`
- `UserProfile`
- `BlockRelation`
- `Chat`
- `ChatMember`
- `Message`
- `MessageAttachment`
- `ReadReceipt`
- `MediaObject`
- `CallSession`
- `CallParticipant`
- `DeviceRegistration`
- `NotificationPreference`

Deferred from early MVP:

- `InviteLink`
- `MessageRevision`
- `DeliveryReceipt` if cursor logic is derived elsewhere initially
- `ImportedContact`
- `AbuseReport`
- `Sanction`
- advanced channel-specific entities

## 7. Aggregate Boundaries and Ownership

Recommended ownership by service:

- Identity Service -> `UserAccount`, `Session`, `OtpChallenge`
- User Profile Service -> `UserProfile`, `BlockRelation`
- Contacts Service -> `ContactBook`, `ImportedContact`
- Chat Service -> `Chat`, `ChatMember`, `InviteLink`
- Message Service -> `Message`, `MessageAttachment`, `MessageReaction`, `MessageRevision`, `ReadReceipt`, `DeliveryReceipt`
- Realtime Service -> `PresenceState`, `TypingState`
- Call Service -> `CallSession`, `CallParticipant`
- Media Service -> `MediaObject`, `MediaVariant`
- Notification Service -> `DeviceRegistration`, `NotificationPreference`
- Moderation Service -> `AbuseReport`, `Sanction`

## 8. Invariants

The system should enforce these core invariants:

- a message must belong to exactly one chat
- a sender must be a valid active member of the chat when sending
- a direct chat should not contain arbitrary membership growth
- a read receipt cannot point to a message outside the same chat
- a message attachment must reference an existing media object
- blocked-user policies must be checked before creating new direct interactions
- a revoked session cannot refresh or open new authenticated realtime connections

## 9. Data Classification

Durable source-of-truth data:

- accounts
- profiles
- chats
- memberships
- messages
- read state
- media metadata
- notification registrations

Ephemeral runtime data:

- online presence
- typing state
- connection registry
- temporary delivery fanout state

Derived or projection data:

- chat list previews
- unread counters
- search indexes
- notification decision inputs

## 10. Open Design Decisions

These decisions remain for later documents:

- exact direct-chat uniqueness rule
- whether read and delivery cursors live in Chat or Message service storage for MVP
- message edit history retention policy
- hard delete versus tombstone strategy
- privacy interaction rules for blocked users and last-seen visibility
- secret chat and end-to-end encryption support

## 11. Recommended Next Documents

The next design documents should be:

1. API contracts
2. event schemas
3. database schemas per service
4. sequence flows for send message, read message, and reconnect sync

## 12. Summary

This domain model defines the durable core of a Telegram-like messenger around:

- accounts and sessions
- profiles and privacy
- chats and memberships
- messages and read state
- media references
- notifications

It keeps durable business state separate from ephemeral realtime state and provides a clean base for service contracts and database design.
