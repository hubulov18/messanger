# Remaining Implementation Backlog

## Purpose

Capture the most important functionality that is still missing, incomplete, or not yet production-trustworthy in the current messenger codebase.

This document is intended to be a practical implementation reference for the next development slices.

It reflects the current codebase more accurately than the original backlog snapshot and separates:

- what is already implemented well enough for v1
- what exists but still needs hardening or depth
- what is still meaningfully missing

## Current Snapshot

The product now has a strong functional base:

- authentication, onboarding, and session restore
- direct chats
- group creation and basic group management
- channel creation and basic channel management
- message send/edit/delete/reply/reactions/forward
- media upload and rendering
- voice message recording and playback
- contacts sync and username discovery
- settings, profile, privacy, devices, blocked users
- substantial audio/video call support

The biggest remaining gaps are now concentrated in:

- reliability outside the foreground app lifecycle
- hardening of already-visible communication surfaces
- search and retrieval coherence
- deeper product polish rather than basic scaffolding

## Done Or Largely Closed

These areas should not be treated as the main missing features anymore:

- auth flow and onboarding
- session persistence / restore
- direct chat core loop
- message actions and basic thread interactions
- media send/render basics
- voice message recording/send/playback basics
- username editing and profile basics
- contacts sync and username lookup
- chat archive/mute/pin foundations
- group creation
- channel creation
- chat info surface for group/channel
- edit group/channel identity
- add/remove members
- invite links and join-by-invite basics
- admin/member role management v1

## P0: Critical Reliability Gaps

### 1. Push And Offline Delivery Reliability

Still not fully closed:

- validate full APNs normal push path end-to-end
- verify token refresh and re-registration correctness
- ensure dependable notification-to-chat navigation
- verify unread/read recovery after background return
- validate offline catch-up after app relaunch
- confirm badge state stays coherent across app state transitions

Why this matters:

- a messenger is judged heavily when the app is not in the foreground
- reliability here affects trust more than surface-level feature breadth

### 2. Calls Production Hardening

Still not fully closed:

- real-device validation on two physical iPhones
- stronger background and terminated incoming-call behavior
- final PushKit and CallKit production path validation
- stronger stale-call cleanup across all failure paths
- reconnect and network-switch hardening
- more confidence around outgoing/incoming video stability
- better observability for signaling / ICE failures

Why this matters:

- calls are already visible in the product
- partially reliable calling damages product trust quickly

### 3. Runtime Verification And Stability For New Chat Management Flows

Code paths now exist, but runtime trust is not fully closed:

- verify `POST /chats/channel` end-to-end in local runtime
- verify invite-link flows through iOS -> gateway -> chat-service
- verify role/permissions updates through iOS -> gateway -> chat-service
- confirm no stale navigation or state bugs remain in newly added group/channel flows

Why this matters:

- these features are already user-visible
- they should be treated as product surfaces, not just code-complete patches

## P1: Major Product Surface Gaps

### 4. Group And Channel Management Depth

Current state:

- info screen exists
- edit title/description/photo exists
- add/remove members exists
- invite links and join-by-invite exist
- admin/member role management v1 exists

Still missing or incomplete:

- stronger broadcast-specific UX for channels
- clearer subscriber/member distinction for channels
- deeper permission model beyond current v1 toggles
- better moderation/admin ergonomics for larger groups
- stronger empty/loading/error states across these screens

Why this matters:

- the base functionality is present
- what remains is product depth and operational usability

### 5. Unified Global Search

Current state:

- chat search exists
- username lookup exists
- in-thread search exists
- recent cross-chat message search exists in limited form

Still missing:

- one coherent global search entry point
- stronger result grouping across chats, contacts, usernames, and messages
- better navigation into exact chat/message context
- broader cross-chat retrieval beyond recent limited surfaces

Why this matters:

- once usage grows, fragmented search becomes a real product limitation

### 6. Offline And Reentry Product Coherence

Still missing or incomplete:

- clearer recovery after background return
- better restoration of exact in-chat context after interruption
- stronger consistency between realtime state and restored state
- less incidental timeout/error surfacing in normal navigation

Why this matters:

- reliability is not only transport-layer correctness
- product coherence during interruption strongly affects perceived quality

## P2: Important Maturity Work

### 7. Media Polish

Still missing or incomplete:

- stronger attachment error and retry UX
- fullscreen viewer refinement
- more polished media loading/processing states
- further playback consistency for audio/video surfaces

### 8. Settings And Preference Depth

Current state:

- the settings surface is substantial and usable

Still missing or incomplete:

- deeper privacy/security controls
- richer notification settings depth
- more language/chat preference depth
- broader Telegram-like settings parity beyond the current strong v1 shell

### 9. Help, Support, And Personalization Extras

Still missing or incomplete:

- richer support/help flows
- more appearance personalization
- lower-priority Telegram-like extras and polish

## Recommended Next Delivery Order

### Phase 1

Focus on product trust:

1. push and offline delivery reliability
2. calls hardening
3. runtime verification and stabilization of new group/channel management flows

### Phase 2

Focus on product coherence:

1. unified global search
2. offline and reentry UX coherence
3. channel-specific / large-group management depth

### Phase 3

Refine maturity and polish:

1. media polish
2. deeper settings and preferences
3. help/support/personalization extras

## Decision Rule

When choosing the next implementation slice, prefer the item that most improves one of these:

1. daily communication trust
2. multi-party communication depth
3. information retrieval and product coherence

If a candidate task does not materially improve one of those three, it is probably not the next best priority.
