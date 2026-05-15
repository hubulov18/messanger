# Telegram-Like Messenger Tech Stack Decision

## 1. Objective

Define the initial technology stack for a Telegram-like messenger with these constraints:

- architecture must remain microservice-friendly
- technology choices should stay inside the Node.js ecosystem
- the first mobile client targets iOS
- the stack must support realtime messaging, media processing, and future scale without premature complexity

## 2. Decision Summary

The recommended stack is:

- Backend runtime: Node.js LTS
- Language: TypeScript
- Backend framework: NestJS
- External API: REST
- Internal async communication: RabbitMQ
- Primary database: PostgreSQL
- ORM: Prisma
- Cache and ephemeral state: Redis
- Realtime transport: Socket.IO for MVP
- Object storage: S3-compatible storage such as MinIO or AWS S3
- Mobile client: React Native
- Web and admin client: Next.js
- Logging: Pino
- Observability: OpenTelemetry, Prometheus, Grafana
- Containerization: Docker
- Local orchestration: Docker Compose

## 3. Selection Principles

The stack should satisfy these requirements:

- strong TypeScript support across backend and client
- maintainable microservice structure
- efficient handling of websocket traffic
- asynchronous processing for notifications, media, and inter-service events
- simple local developer experience
- no unnecessary platform complexity in MVP

## 4. Backend Stack

## 4.1 Node.js

### Choice

- Node.js LTS

### Why

- aligned with your ecosystem preference
- excellent TypeScript support
- broad library ecosystem
- good fit for API services and websocket-based applications when CPU-heavy work is offloaded

### Constraints

- avoid CPU-intensive work inside request handlers
- separate media processing and background workloads
- design carefully for websocket scale and backpressure

## 4.2 TypeScript

### Choice

- TypeScript for all backend services

### Why

- stronger contracts across services
- safer refactoring in a microservice codebase
- shared DTO and validation patterns
- better long-term maintainability than plain JavaScript

## 4.3 NestJS

### Choice

- NestJS as the standard backend framework

### Why

- clear modular architecture
- strong support for microservice patterns
- good fit for controllers, application services, dependency injection, validation, and transport adapters
- helps keep service code structured instead of becoming ad hoc Express code

### Rule

Use one backend framework consistently. Do not mix NestJS, raw Express, and custom service patterns without a strong reason.

## 5. Communication Stack

## 5.1 External API

### Choice

- REST for client-facing APIs

### Why

- easy for mobile and web clients
- straightforward versioning and debugging
- sufficient for chat, auth, profile, and media flows

### Notes

- keep the API gateway thin
- avoid aggregating too much business logic into the gateway

## 5.2 Internal Async Communication

### Choice

- RabbitMQ

### Why

- suitable for asynchronous service-to-service communication
- supports retryable background processing
- handles event delivery and worker queues cleanly
- operationally simpler for many teams than Kafka

### RabbitMQ Responsibilities

- domain event propagation between services
- background task dispatch
- notification processing triggers
- media post-processing triggers
- retry and dead-letter patterns

### Important Clarification

RabbitMQ replaces the need for a separate queueing tool like BullMQ for many workloads. Redis is still needed for ephemeral state, but RabbitMQ should be the main async messaging layer.

## 5.3 Realtime Delivery

### Choice

- Socket.IO for MVP

### Why

- faster implementation than raw WebSocket
- useful built-in connection management and fallback behavior
- broad ecosystem and easier onboarding

### Tradeoff

- raw WebSocket may be preferable later if protocol control or overhead becomes a concern
- for MVP, Socket.IO is the pragmatic choice

## 6. Data Stack

## 6.1 PostgreSQL

### Choice

- PostgreSQL as the primary database for core services

### Why

- reliable transactions
- mature indexing and query capabilities
- strong fit for auth, chats, memberships, messages, and metadata
- safer default than document stores for this domain

### Usage Rule

- one database or schema ownership boundary per service
- no direct cross-service table access

## 6.2 Prisma

### Choice

- Prisma as the ORM for service-owned relational data

### Why

- strong TypeScript developer experience
- good migration workflow
- fast development for standard service CRUD and relational models

### Tradeoff

- some high-volume or highly specialized message queries may later justify selective raw SQL
- Prisma should remain the default, not an absolute rule

## 6.3 Redis

### Choice

- Redis for ephemeral and high-churn state

### Why

- presence tracking
- typing indicators
- websocket adapter support
- rate limiting
- hot cache and short-lived session helpers

### Rule

Redis is not the source of truth for chats or messages.

## 6.4 Object Storage

### Choice

- S3-compatible object storage

### Recommended Options

- MinIO for local development
- AWS S3 or equivalent cloud object store for production

### Why

- attachments should not be stored in PostgreSQL blobs
- scalable and operationally appropriate for media files

## 7. Client Stack

## 7.1 Mobile Client

### Choice

- React Native for the first iOS client

### Decision

React Native is a good choice for an iOS-first messenger if the project is intentionally engineered as a mobile app, not treated like a web app with native packaging.

### Why

- stays aligned with the JavaScript and TypeScript ecosystem
- faster iteration for MVP
- one codebase can later extend to Android
- mature enough for chat interfaces and push-driven applications

### Conditions For Success

- use proper navigation architecture
- design offline and reconnect behavior early
- handle websocket lifecycle explicitly
- optimize message list rendering and pagination
- prepare for native integrations such as push notifications, media handling, and call features

### Main Risks

- poor performance if chat rendering is naive
- instability if native integrations are postponed too long
- technical debt if app state becomes fragmented

### Recommendation

React Native is the right choice for this project under your stated constraint of staying in the Node.js ecosystem.

If maximum iOS-native polish were the only priority, Swift would be stronger, but that would break the ecosystem consistency and slow delivery.

## 7.2 React Native App Architecture

Recommended client-side stack:

- React Native with TypeScript
- React Navigation
- TanStack Query for server state
- Zustand for lightweight client state
- MMKV for lightweight local persistence
- native secure storage for tokens

### Why This Mix

- React Navigation is the standard choice
- TanStack Query keeps API synchronization disciplined
- Zustand is simpler than Redux for early product stages
- MMKV is fast and practical for mobile persistence

## 7.3 Expo vs Bare React Native

### Recommendation

- start with React Native in a configuration that preserves native flexibility

### Guidance

Expo is acceptable only if you confirm that your push, media, deep linking, and future calling requirements fit comfortably within the chosen Expo path.

For a messenger, native integrations tend to increase over time. Because of that, a bare or native-flexible React Native setup is usually the safer long-term choice.

## 7.4 Web and Admin Client

### Choice

- Next.js

### Why

- strong TypeScript support
- useful for admin tools, moderation tools, support dashboards, and optional web messaging client

## 8. Service-to-Technology Mapping

| Service | Recommended Technology |
| --- | --- |
| API Gateway | NestJS + REST |
| Identity Service | NestJS + Prisma + PostgreSQL |
| User Profile Service | NestJS + Prisma + PostgreSQL |
| Contacts Service | NestJS + Prisma + PostgreSQL |
| Chat Service | NestJS + Prisma + PostgreSQL |
| Message Service | NestJS + Prisma + PostgreSQL |
| Realtime Service | NestJS + Socket.IO + Redis |
| Media Service | NestJS + Prisma + RabbitMQ + S3/MinIO |
| Notification Service | NestJS + RabbitMQ + Redis + APNs provider integration |
| Search Service | NestJS + PostgreSQL search first, OpenSearch later |
| Moderation Service | NestJS + Prisma + PostgreSQL |
| Call Service | NestJS + Prisma + PostgreSQL + Redis + Socket.IO + coturn/WebRTC |

## 9. Rejected Alternatives

## 9.1 Go Backend

### Why Rejected

- strong technical fit, but does not match your Node.js ecosystem requirement

## 9.2 MongoDB As Primary Store

### Why Rejected

- weaker default fit for relational chat domains such as memberships, delivery markers, permissions, and read states

## 9.3 Kafka For MVP

### Why Rejected

- higher operational complexity than needed for the first delivery stages

## 9.4 BullMQ As Primary Queue

### Why Rejected

- RabbitMQ is the preferred async backbone in your chosen architecture
- BullMQ would duplicate queueing responsibility instead of simplifying the system

## 9.5 Native Swift iOS Client

### Why Rejected For Now

- highest iOS polish, but slower cross-platform expansion
- breaks the single-language ecosystem goal

## 10. MVP Infrastructure

Recommended local and early-stage infrastructure:

- Docker Compose
- PostgreSQL
- Redis
- RabbitMQ
- MinIO

### Why

- enough to run the entire MVP architecture locally
- avoids premature Kubernetes overhead

## 11. Operational Guidance

- keep CPU-heavy work out of API and websocket services
- use RabbitMQ consumers for background workflows
- keep Redis limited to ephemeral state and cache
- use PostgreSQL as source of truth for durable business data
- keep service boundaries strict even if some services are deployed together initially

## 12. Final Recommendation

The final recommended stack for this project is:

- Backend: Node.js + TypeScript + NestJS
- Async messaging: RabbitMQ
- Source-of-truth database: PostgreSQL
- Ephemeral state: Redis
- Realtime: Socket.IO
- ORM: Prisma
- Media storage: MinIO/S3
- Mobile client: React Native for iOS first
- Web/admin: Next.js
- Local infrastructure: Docker Compose

This stack fits your ecosystem preference, supports a microservice architecture, and remains realistic for building a Telegram-like messenger MVP without unnecessary early complexity.
