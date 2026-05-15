# Telegram-Like Messenger Service Decomposition

## 1. Objective

Define a clean microservice architecture for a Telegram-like messenger before implementation. The goal is to separate business domains clearly, avoid premature coupling, and create a roadmap that supports MVP delivery without creating operational debt.

This document focuses on:

- service boundaries
- responsibilities
- data ownership
- synchronous APIs
- asynchronous events
- infrastructure dependencies
- phased rollout

## 2. Architecture Principles

The system should follow these principles:

- Domain-first decomposition. Services are split by business capability, not by controller/repository layers.
- Single ownership. Each service owns its data and business rules.
- No shared database writes. Services communicate through APIs and events, never direct table access.
- Async where possible. Domain events are used for propagation and fanout.
- Sync where necessary. Client-facing reads and commands can go through gateway to the owning service.
- MVP before scale. Not every logical service needs independent deployment on day one.
- Operational simplicity. Start with a small number of independently deployed services while preserving clean service contracts.

## 3. System Context

The platform consists of:

- client applications: mobile, web, desktop
- API gateway
- backend domain services
- realtime transport layer
- event broker
- relational data stores
- cache and presence store
- object storage for media
- observability and admin tooling

## 4. High-Level Service Landscape

### 4.1 Core Services

1. API Gateway
2. Identity Service
3. User Profile Service
4. Contacts Service
5. Chat Service
6. Message Service
7. Realtime Gateway Service
8. Media Service
9. Notification Service
10. Search Service
11. Call Service
12. Moderation Service
13. Bot and Integration Service
14. Analytics and Audit Service

### 4.2 Deployment Recommendation

Logical microservices and physical deployments should not be identical at the beginning.

Deploy independently for MVP:

- API Gateway
- Identity Service
- Chat Service
- Message Service
- Realtime Gateway Service
- Media Service
- Notification Service

Keep logically separated but deploy later or combine temporarily:

- User Profile Service
- Contacts Service
- Search Service
- Call Service
- Moderation Service
- Bot and Integration Service
- Analytics and Audit Service

This keeps the architecture clean without forcing day-one operational complexity.

## 5. Service Definitions

## 5.1 API Gateway

### Responsibilities

- single entry point for all clients
- request authentication and authorization checks
- request routing to backend services
- rate limiting and abuse throttling
- response aggregation for client-optimized endpoints
- API versioning

### Does Not Own

- business data
- domain rules for chats, messages, users, or media

### Suggested Endpoints

- `POST /auth/*`
- `GET /me`
- `GET /chats`
- `GET /chats/{chatId}/messages`
- `POST /messages`
- `POST /media/upload`

## 5.2 Identity Service

### Responsibilities

- user registration
- login
- OTP generation and verification
- access and refresh tokens
- 2FA
- device/session management

### Owned Data

- credential records
- OTP records
- refresh sessions
- device sessions
- auth factors

### Key APIs

- `POST /identity/register`
- `POST /identity/verify-otp`
- `POST /identity/login`
- `POST /identity/refresh`
- `POST /identity/logout`
- `GET /identity/sessions`
- `DELETE /identity/sessions/{sessionId}`

### Emits Events

- `user_registered`
- `user_authenticated`
- `session_revoked`

## 5.3 User Profile Service

### Responsibilities

- public and private profile management
- username management
- avatar metadata
- privacy settings
- block list management

### Owned Data

- profile
- username mapping
- avatars metadata
- privacy settings
- block relations

### Key APIs

- `GET /profiles/{userId}`
- `GET /profiles/by-username/{username}`
- `PATCH /profiles/me`
- `PATCH /profiles/me/privacy`
- `POST /profiles/me/block/{targetUserId}`
- `DELETE /profiles/me/block/{targetUserId}`

### Emits Events

- `profile_updated`
- `username_changed`
- `privacy_settings_changed`
- `user_blocked`
- `user_unblocked`

## 5.4 Contacts Service

### Responsibilities

- contact import and sync
- address book hashing and matching
- contact graph
- invite flows

### Owned Data

- contact sync batches
- discovered contacts
- invitation records

### Key APIs

- `POST /contacts/import`
- `GET /contacts`
- `GET /contacts/suggestions`

### Emits Events

- `contacts_imported`
- `contact_matched`

## 5.5 Chat Service

### Responsibilities

- create and manage chats
- direct chats metadata
- group metadata
- channel metadata
- membership and roles
- chat permissions
- invite links
- pinned chat-level entities

### Owned Data

- chats
- chat members
- roles and permissions
- invite links
- chat settings

### Key APIs

- `POST /chats`
- `GET /chats/{chatId}`
- `GET /chats`
- `POST /chats/{chatId}/members`
- `DELETE /chats/{chatId}/members/{userId}`
- `PATCH /chats/{chatId}`
- `POST /chats/{chatId}/invite-links`

### Emits Events

- `chat_created`
- `chat_updated`
- `member_added_to_chat`
- `member_removed_from_chat`
- `chat_permissions_changed`

## 5.6 Message Service

### Responsibilities

- send messages
- edit messages
- delete messages
- reply and forward relationships
- reactions
- read markers
- delivery state persistence
- message history retrieval

### Owned Data

- messages
- message revisions
- reactions
- read markers
- delivery markers
- attachments references

### Key APIs

- `POST /messages`
- `PATCH /messages/{messageId}`
- `DELETE /messages/{messageId}`
- `POST /messages/{messageId}/reactions`
- `DELETE /messages/{messageId}/reactions/{emoji}`
- `POST /chats/{chatId}/read`
- `GET /chats/{chatId}/messages`

### Emits Events

- `message_sent`
- `message_edited`
- `message_deleted`
- `message_reacted`
- `chat_read_position_updated`

## 5.7 Realtime Gateway Service

### Responsibilities

- WebSocket connection handling
- client subscription management
- presence state
- typing indicators
- event fanout to connected devices
- delivery coordination for live sessions

### Owned Data

- ephemeral connection state
- presence state
- subscriptions
- typing TTL state

### Key APIs

- `GET /realtime/connect` for session negotiation
- internal event ingestion endpoints or broker consumers

### Consumes Events

- `message_sent`
- `message_edited`
- `message_deleted`
- `member_added_to_chat`
- `member_removed_from_chat`

### Emits Events

- `presence_updated`
- `typing_started`
- `typing_stopped`
- `message_delivered`

## 5.8 Media Service

### Responsibilities

- upload management
- secure file storage references
- image, video, and audio processing
- preview and thumbnail generation
- media metadata extraction
- virus scan hooks if required

### Owned Data

- media metadata
- object storage keys
- upload sessions
- processing status
- previews and thumbnails metadata

### Key APIs

- `POST /media/upload-sessions`
- `PUT /media/upload-sessions/{uploadId}`
- `POST /media/finalize`
- `GET /media/{mediaId}`

### Emits Events

- `media_uploaded`
- `media_processed`
- `media_failed`

## 5.9 Notification Service

### Responsibilities

- push notifications
- device token registration
- notification preferences
- mute rules
- notification fanout policies

### Owned Data

- device tokens
- push providers configuration references
- notification preferences
- mute settings

### Key APIs

- `POST /notifications/devices`
- `DELETE /notifications/devices/{deviceId}`
- `PATCH /notifications/preferences`

### Consumes Events

- `message_sent`
- `member_added_to_chat`
- `call_started`

### Emits Events

- `push_notification_sent`
- `push_notification_failed`

## 5.10 Search Service

### Responsibilities

- indexing users, chats, messages, and media metadata
- query APIs for search
- relevance ranking

### Owned Data

- search indexes
- indexing jobs
- search analytics

### Key APIs

- `GET /search/users`
- `GET /search/chats`
- `GET /search/messages`

### Consumes Events

- `profile_updated`
- `chat_created`
- `chat_updated`
- `message_sent`
- `message_deleted`

## 5.11 Call Service

### Responsibilities

- call session creation
- signaling orchestration
- participant state
- voice call metadata
- TURN credential issuance
- PushKit and CallKit-aware incoming call orchestration
- reconnect bootstrap for interrupted call sessions

### Owned Data

- call sessions
- participants
- signaling session metadata
- call outcome history

### Key APIs

- `POST /calls`
- `GET /calls/{callId}`
- `POST /calls/{callId}/accept`
- `POST /calls/{callId}/decline`
- `POST /calls/{callId}/end`
- `POST /calls/{callId}/join`

### Emits Events

- `call.session.created`
- `call.participant.ringing`
- `call.participant.accepted`
- `call.session.active`
- `call.session.ended`
- `call.session.missed`

### Integrations

- synchronous reads to Chat Service for direct-chat membership and peer resolution
- synchronous reads to Profile Service for block enforcement
- synchronous internal command to Message Service for terminal `call_event` history entries
- synchronous internal command to Notification Service for VoIP-capable incoming call delivery
- Socket.IO namespace for live signaling separate from chat SSE

## 5.12 Moderation Service

### Responsibilities

- abuse reports
- spam rules
- user sanctions
- chat restrictions
- moderation workflows

### Owned Data

- reports
- sanctions
- moderation cases
- rule evaluations

### Key APIs

- `POST /moderation/reports`
- `GET /moderation/cases/{caseId}`
- `POST /moderation/actions`

### Emits Events

- `abuse_report_created`
- `user_sanctioned`
- `chat_restricted`

## 5.13 Bot and Integration Service

### Responsibilities

- bot registration
- bot credentials
- webhook delivery
- bot permissions and chat access
- future mini-app integration points

### Owned Data

- bot definitions
- bot tokens
- webhook subscriptions
- integration permissions

## 5.14 Analytics and Audit Service

### Responsibilities

- product analytics events
- admin audit logs
- compliance-oriented activity trails
- operational event retention

### Owned Data

- audit logs
- analytics events
- aggregation tables

## 6. Domain Ownership Matrix

| Domain | Owning Service |
| --- | --- |
| Registration, login, session | Identity Service |
| Profile, username, privacy | User Profile Service |
| Contacts and discovery | Contacts Service |
| Chat metadata and membership | Chat Service |
| Messages, reactions, read states | Message Service |
| Live presence and websocket fanout | Realtime Gateway Service |
| Files and media processing | Media Service |
| Push delivery | Notification Service |
| Search indexing and queries | Search Service |
| Calls and signaling | Call Service |
| Abuse workflows | Moderation Service |
| Bots and external hooks | Bot and Integration Service |
| Audit and analytics | Analytics and Audit Service |

## 7. Data Storage Strategy

Each service owns its storage.

### Recommended Storage Per Service

- Identity Service -> PostgreSQL
- User Profile Service -> PostgreSQL
- Contacts Service -> PostgreSQL
- Chat Service -> PostgreSQL
- Message Service -> PostgreSQL with partitioning strategy later
- Realtime Gateway Service -> Redis for ephemeral state
- Media Service -> PostgreSQL for metadata plus S3-compatible object storage
- Notification Service -> PostgreSQL or Redis-backed queues plus provider integrations
- Search Service -> OpenSearch or Elasticsearch later
- Analytics and Audit Service -> analytical store later, PostgreSQL initially

### Rules

- no shared tables across services
- no foreign keys across service databases
- references across services use stable IDs
- cross-service reads use APIs, read models, or event-built projections

## 8. Communication Patterns

## 8.1 Synchronous Communication

Use synchronous APIs for:

- login and token refresh
- profile fetch
- chat list fetch
- message history fetch
- media upload initiation
- explicit administrative actions

Preferred protocols:

- REST for external client APIs
- gRPC or REST for internal service-to-service calls

## 8.2 Asynchronous Communication

Use events for:

- message fanout
- notification triggers
- search indexing
- analytics capture
- moderation hooks
- cache invalidation

Recommended broker:

- NATS for simpler operational model and fast eventing
- Kafka if expected scale and replay requirements justify it

For MVP, NATS is the simpler choice.

## 9. Core Event Catalog

Initial domain events:

- `user_registered`
- `user_authenticated`
- `profile_updated`
- `username_changed`
- `chat_created`
- `chat_updated`
- `member_added_to_chat`
- `member_removed_from_chat`
- `message_sent`
- `message_edited`
- `message_deleted`
- `message_reacted`
- `media_uploaded`
- `media_processed`
- `message_delivered`
- `chat_read_position_updated`
- `presence_updated`
- `call_started`
- `abuse_report_created`

## 10. MVP Scope By Service

## 10.1 MVP In Scope

- Identity Service
- User Profile Service with only essential profile fields
- Chat Service for private chats and basic groups
- Message Service for text messages, edit, delete, reply, read status
- Realtime Gateway Service for live updates and typing
- Media Service for image/file attachments
- Notification Service for push delivery

## 10.2 Deferred From MVP

- full contacts sync
- channels
- voice and video calls
- bots
- advanced moderation automation
- advanced search
- scheduled messages
- large community tooling

## 11. Recommended Physical Deployment Stages

## Stage 1: Foundation

Deploy:

- API Gateway
- Identity Service
- Chat Service
- Message Service
- Realtime Gateway Service

Infra:

- PostgreSQL
- Redis
- NATS

Capabilities:

- auth
- private chat
- basic groups
- live messaging
- message history

## Stage 2: Rich Messaging

Deploy:

- Media Service
- Notification Service
- User Profile Service

Capabilities:

- avatars
- media attachments
- mobile push notifications
- privacy basics

## Stage 3: Discovery and Control

Deploy:

- Contacts Service
- Search Service
- Moderation Service

Capabilities:

- contact discovery
- search
- abuse reporting
- admin control

## Stage 4: Expansion

Deploy:

- Call Service
- Bot and Integration Service
- Analytics and Audit Service

Capabilities:

- voice/video calling
- bot ecosystem
- deeper product analytics

## 12. Non-Functional Requirements

The architecture should support:

- horizontal scaling of realtime nodes
- idempotent event handling
- eventual consistency across read models
- observability with logs, metrics, tracing
- auditability for admin actions
- data retention policies
- rate limiting and abuse protections
- secure media access
- multi-device session support

## 13. Security Requirements

- token-based authentication
- encrypted transport with TLS
- OTP replay protection
- session revocation
- media access authorization
- privacy rule enforcement in user/profile reads
- rate limiting on auth, messaging, and upload endpoints
- audit logging for moderation/admin actions

If end-to-end encryption is required later, it should be introduced as a separate security design track because it materially changes message delivery and storage assumptions.

## 14. Key Risks

### Risk 1: Over-splitting too early

Too many independently deployed services at the start will slow delivery.

Mitigation:

- keep logical boundaries strict
- deploy only the core services first

### Risk 2: Shared database shortcuts

This breaks service ownership immediately.

Mitigation:

- enforce per-service schemas or databases
- forbid direct cross-service table access

### Risk 3: Realtime and persistence coupling

Realtime delivery logic can accidentally become the source of truth.

Mitigation:

- Message Service remains source of truth
- Realtime Gateway only distributes events

### Risk 4: Search consistency assumptions

Search is eventually consistent and must not be treated as source of truth.

Mitigation:

- serve canonical message history from Message Service

## 15. Recommended Next Documents

Before implementation, create these documents next:

1. MVP feature scope
2. user flows
3. domain model and entities
4. API contracts
5. event schemas
6. deployment topology
7. database design per service
8. security and privacy model

## 16. Decision Summary

The recommended approach is:

- design as microservices by domain
- deploy only a small subset independently at first
- use one data store per service
- use events for propagation and fanout
- keep Message Service as source of truth for message state
- treat Realtime Gateway as delivery infrastructure, not domain storage

This provides a clean architecture foundation for a Telegram-like messenger without creating avoidable complexity in the first implementation phase.
