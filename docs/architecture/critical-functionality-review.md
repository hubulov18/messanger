# Critical Functionality Review

## Purpose

Define the highest-impact product functionality that is still missing or materially incomplete when comparing the current application to Telegram as the reference bar.

This document is narrower than `product-gap-analysis.md`.
It focuses only on functionality that is still critical for the app to feel complete and dependable as a messenger.

Use this document as the next-step execution guide when deciding what to build after the current settings and polish work.

## Review Basis

This review is based on:

- the current iOS feature set in `apps/mobile-ios/src/features`
- the currently implemented backend services in `apps/services`
- the existing roadmap and architecture documents in `docs/architecture`

The review intentionally distinguishes between:

- functionality that exists but still needs polish
- functionality that is still fundamentally missing

Only the second category is treated as critical here.

## Current Product Strengths

The app already has a stronger foundation than an early prototype:

- authentication and multi-session support
- direct chats
- message send, edit, delete, reply, reactions, and read state
- media upload and rendering
- voice message recording and playback
- chat list with pinning and improved search
- in-thread search
- contacts sync and username discovery
- settings shell with real profile, privacy, devices, notifications, language/chat, and blocked users flows
- account avatar and username editing
- last seen in direct chat headers
- partial calls implementation

This means the main remaining gaps are no longer about having basic screens.
They are about missing product capabilities that users expect from a Telegram-like messenger.

## Critical Missing Functionality

### 1. Production-Ready Calls

Calls are still not fully complete as a Telegram-grade feature.

The project already has substantial call architecture and client work, but the experience is not yet complete enough to count as production-ready.

What is still missing:

- reliable validation on two real iPhones
- stable incoming call behavior outside foreground-only development paths
- background and terminated-state incoming call handling
- final PushKit and CallKit production path
- final APNs VoIP delivery validation
- stronger real-device network transition verification

Why this is critical:

- voice calls are a core Telegram expectation
- partial support creates visible trust problems quickly
- a messenger with unreliable calls feels incomplete even if text chat works

### 2. Group Chats And Channel User Flows

This is the biggest functional gap relative to Telegram.

The domain model and database already anticipate `direct`, `group`, and `channel`, but the implemented user-facing flow is still centered around direct conversations.

What is still missing:

- create group chat flow
- group member management UX
- channel creation and basic broadcast UX
- group and channel info screens
- invite and join flows
- role and permission management for multi-party chats

Why this is critical:

- Telegram is not only a direct messenger
- lack of groups and channels keeps the product far below Telegram’s actual product surface
- this limits the app to one-to-one communication only

### 3. Chat Management Parity

The chat list is much better than before, but it is still missing core management actions expected in a mature messenger.

What is still missing:

- archive and unarchive flow
- mute and mute-until controls near chats
- clearer per-chat notification state
- stronger unread management shortcuts
- conversation-level management beyond pin/unpin

Why this is critical:

- users manage conversations from the chats surface first
- without archive and mute, daily chat organization is still materially below Telegram

### 4. Typing And Live Presence Indicators

The backend architecture and docs reference presence and typing, but the implemented iOS product surface still lacks full live communication cues.

What is still missing:

- typing indicators in direct and future group chats
- stronger live online/offline presence states where privacy allows
- consistent realtime UX around activity status

Why this is critical:

- realtime conversational feedback is a core messenger behavior
- Telegram feels responsive because the live state is visible, not only because messages eventually arrive

### 5. Forwarding And Cross-Chat Message Reuse

Reply, edit, delete, and reactions already exist, but forwarding behavior is still absent from the actual product surface.

What is still missing:

- forward message action from the message menu
- choose-target flow for forwarding
- forwarded message presentation in the destination chat
- backend/client coherence for forward metadata in the user-facing flow

Why this is critical:

- forwarding is a fundamental Telegram behavior
- without it, message sharing between chats is materially limited

### 6. Reliable Push And Offline Delivery Experience

The app still does not fully behave like a dependable always-available messenger when the user is away from the foreground session.

What is still missing:

- fully validated background push behavior for normal messaging
- dependable offline wake-up and re-entry experience
- stronger notification-to-chat navigation coherence
- confidence that unread and delivery state remain correct after background return

Why this is critical:

- Telegram is trusted because conversations continue to feel alive when the app is not open
- foreground-only strength is not enough for a real messenger

### 7. Unified Discovery And Global Search

Search has improved significantly, but it is still fragmented compared to Telegram.

What is still missing:

- one global entry point for chats, contacts, and messages
- cross-chat message search
- easier navigation from global results into the exact conversation context

Why this is critical:

- Telegram search is not just local filtering
- once usage grows, fragmented search becomes a major product limitation

## Important But Not Critical Right Now

These areas still matter, but they should not outrank the critical gaps above:

- deeper settings parity beyond the current strong v1 foundation
- more appearance personalization
- richer help and support flows
- sticker and emoji ecosystem depth
- lower-priority delight features

## Recommended Delivery Order

### Phase 1. Communication Reliability And Daily Use

Prioritize the gaps that most directly affect daily trust in the messenger:

1. production-ready calls
2. reliable push and offline delivery experience
3. chat management parity
4. typing and live presence indicators

Expected outcome:

- the app feels dependable for everyday one-to-one communication

### Phase 2. Telegram-Core Social Surface

After daily-use reliability is strong, expand the product beyond direct chats:

1. group chats
2. basic group management
3. channel creation and broadcast basics
4. forwarding and cross-chat message reuse

Expected outcome:

- the app becomes recognizably closer to Telegram as a social communication platform, not only a direct messenger

### Phase 3. Information Retrieval And Scale

After the core chat surfaces are complete, strengthen scale behaviors:

1. unified global search
2. cross-chat message retrieval
3. stronger discovery navigation between chats, contacts, and search results

Expected outcome:

- the product remains usable as message volume and contact graph grow

## Immediate Next Recommendation

The next implementation slice should not be another settings expansion.

The strongest next step is:

1. finish production-facing call validation where possible
2. then move directly into chat management parity
3. then implement group chat creation as the first major Telegram-surface expansion

If real-device call validation remains blocked by hardware availability, skip ahead temporarily to:

1. archive and mute
2. typing indicators
3. group chat creation

## Decision Rule

When choosing the next feature, prefer the item that most improves one of these questions:

1. Can users trust the app for daily communication?
2. Can users manage many conversations cleanly?
3. Can users do the things Telegram is fundamentally known for?

If a proposed feature does not materially improve one of those three questions, it is probably not the next priority.
