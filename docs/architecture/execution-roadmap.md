# Telegram-Like Execution Roadmap

## Purpose

Translate the product gap analysis into an implementation roadmap that can be executed incrementally.

This document is the working delivery plan for the next product phase. It complements `product-gap-analysis.md` by converting priorities into concrete execution batches.

## Planning Rules

The roadmap follows these rules:

1. Deliver reliability before breadth.
2. Improve the primary communication loop before secondary settings polish.
3. Prefer slices that materially change daily product perception.
4. Avoid adding Telegram-like extras before the app feels dependable in chats and calls.

## P0

### P0.1 Chats Home Surface Maturity

Goal:

- make the chat list feel more complete and navigable before opening a thread

Scope:

- stronger chats home presentation
- better pinned vs recent separation
- clearer unread summaries and chat state
- stronger search affordance and search-state feedback
- safer and clearer refresh behavior

Execution order:

1. improve `ChatListScreen` information hierarchy
2. split pinned and recent conversations into sections
3. add overview and search-state summaries
4. improve empty states and refresh semantics

### P0.2 Message Delivery And Realtime Coherence

Goal:

- make sending, receipt, unread, and thread/list synchronization feel dependable

Scope:

- message pending and failed states
- retry behavior
- list/thread realtime alignment
- stronger unread state reconciliation
- safer polling and refresh fallback behavior

### P0.3 Search Foundations

Goal:

- make information retrieval usable at daily-product level

Scope:

- stronger chat search
- contact search polish
- groundwork for in-thread search

## P1

### P1.1 Calls Productionization

Goal:

- move calls from partial implementation to reliable real-device functionality

Scope:

- end-to-end device validation
- reconnect hardening
- cleaner user-facing error states
- production VoIP path where provisioning allows it

### P1.2 Media Polish

Goal:

- make photo, file, and audio flows feel consistent and predictable

Scope:

- attachment state polish
- fullscreen viewer refinement
- audio and voice playback stability
- failure and retry recovery

### P1.3 Security And Devices Depth

Goal:

- raise account trust closer to Telegram expectations

Scope:

- richer active sessions UX
- revoke-all-other-sessions
- stronger security cues in privacy and devices

## P2

### P2.1 Settings Depth Beyond v1

Goal:

- deepen the existing settings foundation without making it the current center of gravity

Scope:

- richer notifications and sounds
- fuller privacy and security
- deeper profile editing
- language and chat settings

### P2.2 Contacts And Discovery Polish

Goal:

- improve new-chat discovery and contact usability

Scope:

- stronger contacts list UX
- easier direct-chat creation
- clearer permission and empty states

### P2.3 Advanced Personalization And Support

Goal:

- add lower-priority parity and delight features after the core product is stable

Scope:

- appearance expansion
- help and support depth
- advanced Telegram-like extras

## Current Active Slice

The current active slice is `P2.1 Settings Depth Beyond v1`.

Reason:

- the settings foundation now covers the main `v1` shell and security/device depth
- the next useful parity gain is to deepen existing settings flows instead of opening a new product surface
- profile editing, richer privacy, and language/chat settings can be delivered incrementally on top of the current stack
- this slice keeps product momentum without distracting from the already-stabilized messaging, media, and security work
