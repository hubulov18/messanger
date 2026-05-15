# Calls Architecture

## 1. Objective

Define the v1 architecture for direct voice calls so implementation can proceed without expanding scope into group calling, video, or multi-device telephony edge cases.

This document freezes:

- v1 scope and exclusions
- call session state model
- service responsibilities
- client and signaling boundaries
- TURN strategy
- iOS PushKit and CallKit lifecycle
- reliability and rollout rules

## 2. V1 Scope

Included in v1:

- 1:1 voice calls in direct chats only
- WebRTC peer-to-peer media with TURN fallback
- separate Call Service for call lifecycle and signaling
- in-app incoming ringing when the callee is connected
- PushKit and CallKit integration path for iOS incoming calls
- chat timeline call result entries after terminal outcomes

Explicitly excluded from v1:

- group voice calls
- video calls
- call waiting
- hold, merge, transfer
- cross-device ringing fanout policy beyond one active mobile session
- recording and transcription
- additional application-layer E2EE beyond WebRTC DTLS-SRTP

## 3. Core Principles

- call metadata is durable, media transport is not
- signaling is separate from chat SSE transport
- one service owns call state transitions
- clients must be able to recover current call state through REST after signaling disconnects
- TURN credentials are short-lived and never hard-coded in the client
- terminal call outcomes must be reflected in chat history through Message Service

## 4. Session Model

### 4.1 State Machine

Primary path:

- `initiated`
- `ringing`
- `accepted`
- `active`
- `ended`

Terminal branches:

- `declined`
- `missed`
- `canceled`
- `failed`

### 4.2 Session Rules

- a user may participate in at most one `ringing`, `accepted`, or `active` call at a time
- a direct chat may have at most one non-terminal call at a time
- only direct chats may create calls in v1
- a blocked direct pair cannot start or accept a call
- only call participants may fetch call details, accept, decline, end, or join signaling

### 4.3 Participant Roles

- `caller`
- `callee`

Participant state is tracked separately from the session so reconnect and terminal auditing remain explicit.

## 5. Service Ownership

### 5.1 Call Service

Owns:

- call session lifecycle
- participant state
- signaling token issuance
- Socket.IO namespace for call signaling
- TURN credential issuance
- outbox events for call lifecycle

Depends on:

- Chat Service for direct-chat membership and peer resolution
- Profile Service for block-policy checks
- Message Service for terminal call timeline entries
- Notification Service for VoIP-capable device registrations

### 5.2 Message Service

Owns:

- durable call result entries in chat timeline

Call Service asks Message Service to create one terminal `call_event` entry for:

- `declined`
- `missed`
- `canceled`
- `completed`
- `failed`

### 5.3 Notification Service

Owns:

- APNs push token registration
- VoIP token registration
- provider delivery logging

For v1 the service must expose enough API surface for Call Service to request an incoming VoIP notification dispatch, even if production provider credentials are configured later.

## 6. Signaling And Media

### 6.1 Transport Split

- REST: session lifecycle and reconnect bootstrap
- Socket.IO namespace: live signaling
- WebRTC: media transport

Chat SSE remains unchanged and is not reused for calls.

### 6.2 Signaling Events

- `call.join`
- `call.offer`
- `call.answer`
- `call.ice_candidate`
- `call.ringing`
- `call.accepted`
- `call.ended`
- `call.heartbeat`

### 6.3 TURN Strategy

- local and self-hosted environments use `coturn`
- Call Service issues short-lived TURN credentials from a shared secret
- returned ICE config includes STUN and TURN entries
- caller and callee both receive fresh ICE config from REST bootstrap responses

## 7. iOS Integration

### 7.1 Client Boundaries

The iOS client should add:

- `features/calls`
- `CallCoordinator` for cross-screen call state
- `CallSessionStore` for active and incoming session state
- a native boundary for WebRTC audio session routing, PushKit token capture, and CallKit interaction

Call UI must not be owned by the chat thread screen alone. A global coordinator should be able to present incoming and active call state regardless of current navigation stack.

### 7.2 PushKit And CallKit Lifecycle

Expected sequence:

1. app registers APNs push token and VoIP push token
2. Notification Service stores both against the authenticated device
3. Call Service requests a VoIP incoming push for offline or background iOS devices
4. PushKit wakes the app
5. native layer reports the incoming call to CallKit immediately
6. app resolves call details through `GET /v1/calls/{callId}`
7. answer or decline is routed through Call Service REST endpoints

Foreground-connected clients may receive `call.ringing` directly over Socket.IO without waiting for push delivery.

## 8. Reconnect And Failure Handling

- if signaling drops during `ringing` or `active`, the client calls `POST /v1/calls/{callId}/join` to fetch a new signaling token and ICE config
- signaling disconnect does not automatically end the durable call session
- unanswered calls time out into `missed`
- if media negotiation fails after accept, the session transitions to `failed`
- if the caller ends before accept, the session transitions to `canceled`

## 9. Rollout

- protect the feature behind `calls_v1`
- enable first in local/dev and on real iPhones
- treat simulator support as best-effort for foreground only
- track start attempts, answer rate, setup latency, missed rate, TURN usage, and VoIP delivery failures

## 10. Summary

V1 calls are a focused addition:

- direct voice only
- Call Service owns signaling and state
- WebRTC carries media
- coturn provides relay fallback
- Message Service records terminal call history
- Notification Service stores push and VoIP device reachability
