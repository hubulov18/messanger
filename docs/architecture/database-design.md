# Telegram-Like Messenger Database Design

## 1. Objective

Define the initial database design for a Telegram-like messenger MVP.

This document focuses on:

- service-owned persistence boundaries
- table-level schema direction
- primary and unique keys
- indexes and query patterns
- durability rules
- MVP versus later persistence scope

This is a database architecture document, not a migration file set.

## 2. Database Design Principles

The database layer should follow these rules:

- each service owns its own database or schema boundary
- no cross-service foreign keys
- durable business state lives in PostgreSQL
- ephemeral state lives in Redis
- object storage keys, not file blobs, are stored in relational tables
- tables are optimized for real query patterns, not abstract completeness
- outbox tables are used for reliable event publication

## 3. Storage Topology

Recommended persistence stack:

- PostgreSQL for durable relational data
- Redis for presence, typing, rate limits, and connection state
- S3-compatible object storage for media bytes

Recommended physical isolation for MVP:

- one PostgreSQL cluster
- separate database or schema per service
- strict ownership by service code

Example schema layout:

- `identity`
- `profiles`
- `contacts`
- `chats`
- `messages`
- `media`
- `notifications`
- `moderation`

## 4. Common Relational Conventions

## 4.1 ID Type

Use string-based opaque IDs generated in the application layer.

Examples:

- `user_...`
- `chat_...`
- `msg_...`
- `media_...`

## 4.2 Timestamp Columns

All durable tables should use:

- `created_at`
- `updated_at` where mutable

Optional lifecycle timestamps:

- `deleted_at`
- `revoked_at`
- `verified_at`
- `processed_at`

## 4.3 Soft Delete Policy

Default recommendation:

- use tombstones for messages and revocable entities
- avoid hard delete for audit-relevant records unless retention policy requires it

## 4.4 Event Publication Reliability

Services that publish RabbitMQ domain events should maintain an outbox table in the same transaction as the domain write.

Minimum columns:

- `id`
- `event_type`
- `event_version`
- `aggregate_id`
- `partition_key`
- `payload_json`
- `occurred_at`
- `published_at`
- `status`

## 5. Identity Service Database

Schema: `identity`

## 5.1 Table: `user_accounts`

Purpose:

- source of truth for account identity

Columns:

- `id` PK
- `phone_number` unique nullable depending on auth strategy
- `status`
- `two_factor_enabled`
- `created_at`
- `verified_at`

Indexes:

- unique index on `phone_number`
- index on `status`

Notes:

- account identity is distinct from social profile

## 5.2 Table: `sessions`

Purpose:

- track authenticated sessions per device

Columns:

- `id` PK
- `user_account_id`
- `device_id`
- `client_type`
- `refresh_token_hash`
- `ip_address`
- `user_agent`
- `created_at`
- `last_seen_at`
- `revoked_at`

Indexes:

- index on `user_account_id`
- index on `device_id`
- index on `revoked_at`
- unique index on active `refresh_token_hash`

Query patterns:

- list sessions for a user
- revoke one session
- validate refresh token

## 5.3 Table: `otp_challenges`

Purpose:

- OTP verification lifecycle

Columns:

- `id` PK
- `target`
- `purpose`
- `code_hash`
- `attempt_count`
- `expires_at`
- `consumed_at`
- `created_at`

Indexes:

- index on `target`
- index on `expires_at`

## 5.4 Table: `outbox_events`

Purpose:

- reliable publication of identity events

## 6. User Profile Service Database

Schema: `profiles`

## 6.1 Table: `user_profiles`

Purpose:

- source of truth for profile-facing data

Columns:

- `user_id` PK
- `username` unique
- `display_name`
- `bio`
- `avatar_media_id`
- `last_seen_visibility`
- `phone_visibility`
- `profile_photo_visibility`
- `created_at`
- `updated_at`

Indexes:

- unique index on `username`
- index on `display_name`

Query patterns:

- get current user profile
- resolve by username
- render chat counterpart profile

## 6.2 Table: `block_relations`

Purpose:

- user-level blocking policy

Columns:

- `id` PK
- `owner_user_id`
- `blocked_user_id`
- `created_at`

Indexes:

- unique index on (`owner_user_id`, `blocked_user_id`)
- index on `blocked_user_id`

## 6.3 Table: `outbox_events`

Purpose:

- publish profile and blocking events

## 7. Contacts Service Database

Schema: `contacts`

## 7.1 Table: `contact_books`

Columns:

- `owner_user_id` PK
- `last_imported_at`
- `version`

## 7.2 Table: `imported_contacts`

Columns:

- `id` PK
- `owner_user_id`
- `normalized_hash`
- `display_name`
- `matched_user_id`
- `created_at`

Indexes:

- index on `owner_user_id`
- index on `normalized_hash`
- unique index on (`owner_user_id`, `normalized_hash`)

Notes:

- raw phone numbers should not be stored unless explicitly required

## 7.3 Table: `outbox_events`

## 8. Chat Service Database

Schema: `chats`

## 8.1 Table: `chats`

Purpose:

- source of truth for chat containers

Columns:

- `id` PK
- `type`
- `title`
- `description`
- `photo_media_id`
- `created_by_user_id`
- `is_archived`
- `created_at`
- `updated_at`

Indexes:

- index on `type`
- index on `created_by_user_id`

Notes:

- direct, group, and channel records can share one root table initially

## 8.2 Table: `chat_members`

Purpose:

- membership and permissions per chat

Columns:

- `id` PK
- `chat_id`
- `user_id`
- `role`
- `status`
- `invited_by_user_id`
- `joined_at`
- `left_at`

Indexes:

- unique index on (`chat_id`, `user_id`)
- index on `user_id`
- index on (`chat_id`, `status`)

Query patterns:

- list chats for one user
- verify membership for one chat
- list members for group chat

## 8.3 Table: `chat_permissions`

Purpose:

- explicit override-style permission storage where needed

Columns:

- `chat_id` PK
- `can_send_messages`
- `can_add_members`
- `can_pin_messages`
- `updated_at`

Notes:

- keep compact in MVP
- move to richer rule model later only if needed

## 8.4 Table: `invite_links`

Deferred from core MVP but likely next.

Columns:

- `id` PK
- `chat_id`
- `token_hash`
- `created_by_user_id`
- `expires_at`
- `max_uses`
- `used_count`
- `revoked_at`
- `created_at`

Indexes:

- index on `chat_id`
- unique index on `token_hash`

## 8.5 Table: `outbox_events`

Purpose:

- publish chat and membership events

## 9. Message Service Database

Schema: `messages`

This is the most write-sensitive relational area.

## 9.1 Table: `messages`

Purpose:

- source of truth for durable message state

Columns:

- `id` PK
- `chat_id`
- `sender_user_id`
- `client_message_id`
- `type`
- `text`
- `reply_to_message_id`
- `forwarded_from_message_id`
- `created_at`
- `edited_at`
- `deleted_at`
- `status`

Indexes:

- index on (`chat_id`, `created_at` desc)
- unique index on (`chat_id`, `client_message_id`)
- index on `sender_user_id`
- index on `reply_to_message_id`

Query patterns:

- paginate messages by chat
- resolve one message by ID
- deduplicate mobile retries by `client_message_id`

Notes:

- design for future partitioning by `chat_id` or time if scale requires it

## 9.2 Table: `message_attachments`

Columns:

- `id` PK
- `message_id`
- `media_id`
- `attachment_type`
- `sort_order`
- `created_at`

Indexes:

- index on `message_id`

## 9.3 Table: `message_reactions`

Columns:

- `id` PK
- `message_id`
- `user_id`
- `emoji`
- `created_at`

Indexes:

- unique index on (`message_id`, `user_id`, `emoji`)
- index on `message_id`

## 9.4 Table: `message_revisions`

Deferred from strict MVP but useful soon after.

Columns:

- `id` PK
- `message_id`
- `previous_text`
- `edited_by_user_id`
- `edited_at`

Indexes:

- index on `message_id`

## 9.5 Table: `read_receipts`

Purpose:

- latest durable read cursor per user per chat

Columns:

- `id` PK
- `chat_id`
- `user_id`
- `last_read_message_id`
- `updated_at`

Indexes:

- unique index on (`chat_id`, `user_id`)
- index on `user_id`

## 9.6 Table: `delivery_receipts`

Can be deferred if delivery is initially handled through projection logic.

Columns:

- `id` PK
- `chat_id`
- `user_id`
- `last_delivered_message_id`
- `updated_at`

Indexes:

- unique index on (`chat_id`, `user_id`)

## 9.7 Table: `chat_message_counters`

Optional projection table for fast unread and last message reads.

Columns:

- `chat_id`
- `user_id`
- `last_message_id`
- `unread_count`
- `updated_at`

Indexes:

- unique index on (`chat_id`, `user_id`)
- index on `user_id`

Notes:

- this can also live in a dedicated read-model store instead of Message Service

## 9.8 Table: `outbox_events`

Purpose:

- publish message lifecycle events

## 10. Media Service Database

Schema: `media`

## 10.1 Table: `media_objects`

Purpose:

- source of truth for uploaded media metadata

Columns:

- `id` PK
- `owner_user_id`
- `storage_key`
- `media_type`
- `mime_type`
- `size_bytes`
- `checksum`
- `processing_status`
- `created_at`
- `processed_at`
- `deleted_at`

Indexes:

- index on `owner_user_id`
- index on `processing_status`
- unique index on `storage_key`

## 10.2 Table: `media_variants`

Columns:

- `id` PK
- `media_id`
- `variant_type`
- `storage_key`
- `width`
- `height`
- `duration_ms`
- `size_bytes`
- `created_at`

Indexes:

- index on `media_id`
- unique index on (`media_id`, `variant_type`)

## 10.3 Table: `upload_sessions`

Purpose:

- track pending upload authorization lifecycle

Columns:

- `id` PK
- `media_id`
- `owner_user_id`
- `status`
- `checksum` nullable until client provides one
- `expires_at`
- `completed_at`
- `created_at`

Indexes:

- index on `media_id`
- index on `owner_user_id`
- index on `expires_at`

Notes:

- one upload session belongs to exactly one media object
- finalize flow should validate ownership and reject expired sessions
- session rows are durable audit for upload lifecycle, not just temporary cache

## 10.4 Table: `outbox_events`

Purpose:

- publish upload and processing events

## 11. Notification Service Database

Schema: `notifications`

## 11.1 Table: `device_registrations`

Purpose:

- source of truth for push-capable devices

Columns:

- `id` PK
- `user_id`
- `platform`
- `device_id`
- `push_token`
- `voip_push_token` nullable
- `app_version`
- `last_registered_at`
- `revoked_at`

Indexes:

- unique index on (`user_id`, `device_id`)
- index on `push_token`
- index on `voip_push_token`
- index on `revoked_at`

## 11.2 Table: `notification_preferences`

Purpose:

- global or per-chat notification behavior

Columns:

- `id` PK
- `user_id`
- `chat_id` nullable for global defaults
- `is_muted`
- `mute_until`
- `show_preview`
- `created_at`
- `updated_at`

Indexes:

- unique index on (`user_id`, `chat_id`)
- index on `user_id`

## 11.3 Table: `notification_delivery_log`

Operational table, not business-critical.

Columns:

- `id` PK
- `user_id`
- `source_event_id`
- `provider`
- `status`
- `reason_code`
- `created_at`

Indexes:

- index on `user_id`
- index on `source_event_id`
- index on `status`

## 12. Realtime State In Redis

Redis, not PostgreSQL, should hold:

- active socket connections by user
- active socket connections by chat subscription
- presence state
- typing state with TTL
- short-lived delivery acknowledgments if needed
- rate limiting counters

Suggested key patterns:

- `presence:user:{userId}`
- `typing:chat:{chatId}:user:{userId}`
- `socket:user:{userId}`
- `calls:user:{userId}:connections`
- `calls:session:{callId}:signaling`
- `rate_limit:{scope}:{id}`

Call-specific Redis state:

- connected call socket IDs per user
- room membership for active call signaling
- short-lived signaling token claims
- heartbeat timestamps for active call peers

## 13. Moderation Service Database

Schema: `moderation`

Deferred from early MVP but designable now.

## 13.1 Table: `abuse_reports`

Columns:

- `id` PK
- `reporter_user_id`
- `target_type`
- `target_id`
- `reason`
- `description`
- `status`
- `created_at`
- `updated_at`

Indexes:

- index on (`target_type`, `target_id`)
- index on `reporter_user_id`
- index on `status`

## 13.2 Table: `sanctions`

Columns:

- `id` PK
- `target_type`
- `target_id`
- `action_type`
- `reason`
- `expires_at`
- `created_at`

Indexes:

- index on (`target_type`, `target_id`)
- index on `expires_at`

## 13.3 Table: `outbox_events`

## 14. Projection And Read-Model Tables

Some read needs are projection-oriented rather than transactional.

Candidates for projection tables:

- chat list preview
- unread counters
- searchable message snippets
- search indexes

Rule:

- projections may be rebuilt
- projections are not the source of truth
- projection tables may live inside a service schema or a dedicated read model later

## 15. MVP Persistence Scope

Must exist in MVP:

- `identity.user_accounts`
- `identity.sessions`
- `identity.otp_challenges`
- `profiles.user_profiles`
- `profiles.block_relations`
- `chats.chats`
- `chats.chat_members`
- `messages.messages`
- `messages.message_attachments`
- `messages.read_receipts`
- `media.media_objects`
- `media.media_variants`
- `media.upload_sessions`
- `calls.call_sessions`
- `calls.call_participants`
- `notifications.device_registrations`
- `notifications.notification_preferences`
- outbox tables in publishing services

Can be deferred:

- `contacts.imported_contacts`
- `chats.invite_links`
- `messages.message_revisions`
- `messages.delivery_receipts`
- `notifications.notification_delivery_log`
- moderation tables
- projection tables if basic reads are acceptable without them

## 16. Scaling Considerations

### Message Volume

Likely first hotspot:

- `messages.messages`

Mitigations later:

- partition large message tables
- archive cold chat history
- move expensive search paths to search infrastructure

### Chat List Reads

Likely first projection need:

- last message preview
- unread counts

Mitigations:

- dedicated read-model tables
- cache hot chat lists

### Realtime Fanout

Not primarily a PostgreSQL problem.

Use:

- Redis for connection routing
- RabbitMQ for event propagation

## 17. Constraints To Enforce In Application Layer

Because service boundaries prevent cross-service foreign keys, the application layer must enforce:

- valid account existence before profile creation
- valid chat membership before sending messages
- valid media existence before attaching files to messages
- blocked-user restrictions before creating direct chats or messages
- session revocation before token refresh and realtime connection authorization

## 18. Recommended Next Step

The next implementation-oriented artifact should be:

- Prisma schema design per service

Suggested order:

1. Identity Service schema
2. Chat Service schema
3. Message Service schema
4. Media Service schema
5. Notification Service schema

## 19. Summary

This database design establishes:

- PostgreSQL as the durable source-of-truth store
- Redis as the ephemeral state store
- S3-compatible storage for media bytes
- strict per-service schema ownership
- outbox-backed event publication
- a write-optimized message model with room for later projections and partitioning

It is now detailed enough to start service scaffolding without inventing persistence rules ad hoc.
