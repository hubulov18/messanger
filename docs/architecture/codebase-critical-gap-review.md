# Codebase Critical Gap Review

## Purpose

Provide an up-to-date review of the current messenger codebase as it exists today, then identify the highest-priority product functionality that is still missing for the product to behave like a dependable Telegram-like messenger.

This document is intentionally codebase-driven.
It reflects the actual implemented boundaries in:

- `apps/mobile-ios/src/features`
- `apps/services`
- current iOS native modules in `apps/mobile-ios/ios`

It supersedes older gap summaries when they conflict with the real codebase state.

## Review Basis

This review was built from the current structure and visible implementation footprint of:

- iOS features:
  - `auth`
  - `calls`
  - `chats`
  - `contacts`
  - `messages`
  - `profile`
  - `settings`
- backend services:
  - `identity-service`
  - `profile-service`
  - `chat-service`
  - `message-service`
  - `media-service`
  - `contacts-service`
  - `notification-service`
  - `call-service`
  - `realtime-service`
- architecture docs already present in `docs/architecture`

The priority model used here:

- `P0`: required for the product to feel dependable as a real messenger
- `P1`: major product-surface gap that blocks Telegram-like parity
- `P2`: important maturity work, but not the next blocker

## Current Architecture Snapshot

### Mobile Client

The iOS app is no longer a shell.
It has real product modules for:

- authentication
- direct and group chat surfaces
- message thread interactions
- media composition and rendering
- calls
- contacts and discovery
- profile management
- settings and security surfaces

The native iOS boundary already includes custom modules for:

- call management / CallKit bridge
- voice playback
- voice recording
- push notification bridge

### Backend

The backend is already decomposed into dedicated services with persistent stores:

- Identity owns authentication and sessions
- Profile owns account profile and presence-related reads
- Chat owns conversation metadata and membership
- Message owns messages, reactions, replies, edits, deletes, forwarding metadata, and read state
- Media owns media metadata / processing lifecycle
- Contacts owns address-book matching and contact discovery
- Notification owns device registration and push dispatch surface
- Call owns call sessions, signaling tokens, TURN issuance, and call state
- Realtime owns websocket-style fanout for typing/presence/live events

### Practical Boundary

The project already behaves like a real multi-service messenger, not a prototype.
The main missing work is no longer “create screens.”
The missing work is about:

- reliability
- parity across flows
- multi-party communication surface
- background/offline correctness

## Implemented Functionality

The following areas are materially implemented in code today.

### Communication Core

- phone auth and session model
- direct chats
- group chat creation
- chat list
- pinned chats
- archived chats
- muted chats
- per-thread message history
- send text messages
- edit messages
- delete messages
- reply to messages
- reactions
- forwarded message flow
- in-thread message search
- unread/read state handling

### Media

- media upload flow
- attachment rendering in thread
- voice message recording
- voice message playback
- image, video, audio, and file attachment surfaces

### Discovery And Contacts

- device contact sync
- known-user discovery by username
- contacts list
- direct chat creation from contacts/discovery flows

### Presence And Live Signals

- last-seen lookup
- typing indicator send path
- typing indicator receive/render path
- realtime event subscription path

### Account And Settings

- profile editing
- avatar editing
- username editing
- privacy surfaces
- devices / sessions surface
- notifications settings shell
- blocked users flow
- appearance and other settings shells

### Calls

- dedicated call service
- signaling namespace
- audio/video call surfaces
- CallKit/native call management bridge
- TURN/STUN configuration path
- partial incoming/outgoing call logic

## Current Boundaries And Constraints

This is the most important section for deciding what to build next.

### 1. The product is already strong in one-to-one foreground usage

The app can already handle:

- auth
- direct chat
- sending messages
- media messages
- reactions / edit / delete / reply / forward
- settings and account flows

This means adding more settings breadth will not move the product meaningfully anymore.

### 2. Reliability is still weaker than feature breadth

The codebase already has many features, but several of them are not yet product-trustworthy in the way Telegram is:

- calls are present but unstable
- push/offline behavior is present in parts but not fully proven
- multi-surface realtime consistency still needs hardening

### 3. Multi-party communication is still below Telegram surface

Although the model supports `direct`, `group`, and `channel`, the user-facing product is still mostly optimized around:

- direct chats
- early group creation

The broader Telegram social surface is still missing:

- mature groups
- channels
- invite/join/admin flows

### 4. Search and navigation are still fragmented

There is meaningful local search, but not yet a unified global retrieval experience across:

- chats
- contacts
- messages

## Critical Missing Functionality

This section lists only functionality that is still critically missing or materially incomplete for product completeness.

### P0. Production-Ready Calls

Status:

- partially implemented
- still not dependable enough to count as complete

Why it remains critical:

- calls are already visible to users
- unstable calls reduce trust quickly
- partial support is worse than a clearly absent feature

What is still missing:

- stable two-device validation on real iPhones
- reliable background and terminated incoming-call flow
- final PushKit + CallKit production path
- robust reconnect and network-switch handling
- automatic cleanup of stale call sessions across all failure paths
- stronger signaling/ICE observability and failure recovery
- confidence that outgoing and incoming video calls are consistently usable

Connection to current codebase:

- `call-service` exists
- `calls` feature exists
- native call bridge exists
- this is not a “new feature” problem; it is a reliability-hardening problem

### P0. Reliable Push And Offline Delivery Experience

Status:

- partially implemented
- not yet proven end-to-end as a dependable product behavior

Why it remains critical:

- a messenger is judged when it is not open
- Telegram-like trust requires notifications, wake-up, and re-entry correctness

What is still missing:

- fully validated APNs normal push delivery path
- strong device registration and token refresh correctness
- dependable notification-to-chat navigation
- background return consistency for unread/read state
- reliable offline catch-up after foreground re-entry
- complete validation of notification behavior on real devices

Connection to current codebase:

- `notification-service` exists
- iOS push bridge exists
- device registration flow exists in parts
- this is mostly an integration-hardening gap, not a missing-screen gap

### P0. End-to-End Messaging Reliability Hardening

Status:

- core functionality exists
- reliability is still below production-grade messenger expectations

Why it remains critical:

- this is the main product loop
- any instability here makes every other feature less valuable

What is still missing:

- stronger retry/recovery semantics for failed sends
- clearer pending/failed/sent transitions across all message types
- more robust attachment lifecycle consistency
- tighter coherence between chat list preview state and thread state
- stronger resilience around network interruption and service timeouts
- final cleanup of background refresh / stale polling / request-timeout hotspots

Connection to current codebase:

- chat and message features are broad
- the remaining risk is operational correctness and state coherence

### P1. Mature Group Chat Flows

Status:

- group creation exists
- group lifecycle does not yet have Telegram-grade breadth

Why it remains critical:

- Telegram is not only a one-to-one messenger
- the product still lacks mature multi-user conversation management

What is still missing:

- group info screen with real management actions
- member management UX
- add/remove members flows after creation
- role and permission controls
- invite and join flows
- clearer group identity surfaces

Connection to current codebase:

- `createGroupChat` already exists on client and backend
- domain/database already support memberships and permissions
- the gap is product completion, not data-model absence

### P1. Channel Creation And Broadcast UX

Status:

- modeled in schema
- not implemented as a user-facing product flow

Why it remains critical:

- channels are core Telegram product identity
- without channels, the app remains meaningfully below Telegram surface area

What is still missing:

- channel creation flow
- channel info screen
- broadcast posting UX
- membership / subscribe model in the client surface
- channel discovery / invite / join flows

Connection to current codebase:

- `channel` already exists in the domain model and database enum
- the user-facing implementation is still effectively absent

### P1. Unified Global Search

Status:

- fragmented implementation exists
- unified cross-surface search does not

Why it remains critical:

- as usage grows, local-only search becomes a major limitation
- Telegram search is a primary utility behavior

What is still missing:

- one search entry point for chats, contacts, and messages
- cross-chat message search
- reliable jump from search result into exact chat/message context
- navigation model for global results

Connection to current codebase:

- chat search exists
- contact discovery exists
- in-thread search exists
- missing piece is unified retrieval and navigation

## Important But No Longer “Missing” In The Old Sense

These areas should not be treated as fully missing anymore, because they already exist in the codebase:

- archive / unarchive
- mute / unmute
- typing indicators
- last seen presence
- message forwarding
- group creation
- settings surface breadth

These can still require polish, but they should not be prioritized as if they were absent.

## Priority Order

### Phase 1. Trust In Daily Communication

Build next in this order:

1. production-ready calls
2. reliable push and offline delivery
3. messaging reliability hardening

Expected outcome:

- users can trust the app for day-to-day direct communication

### Phase 2. Expand Beyond One-to-One

After trust is strong:

1. mature group chat management
2. channel creation and broadcast basics

Expected outcome:

- the product stops feeling like a mostly direct-chat messenger

### Phase 3. Scale And Retrieval

Then:

1. unified global search
2. cross-chat message discovery
3. better navigation between discovery surfaces

Expected outcome:

- the product remains usable as data volume and social graph grow

## Decision Rule

If a candidate feature does not materially improve one of the following, it is probably not the next priority:

1. Can users trust the app when communicating daily?
2. Can users use the app beyond one-to-one chat?
3. Can users find and manage information once usage scales?

## Recommended Follow-Up

The older `critical-functionality-review.md` should be updated or replaced using this review as the new source of truth.

The most immediate product work should be:

1. close calls reliability and stale-session issues
2. finish real-device push/offline validation
3. move into mature group management
4. then implement channels
