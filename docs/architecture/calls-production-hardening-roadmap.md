# Calls Production Hardening Roadmap

## Purpose

Define the canonical execution plan for taking calls from "works most of the time" to a production-ready communication surface.

This roadmap is intentionally implementation-driven.
It is based on the current call stack already present in:

- `apps/services/call-service`
- `apps/mobile-ios/src/features/calls`
- `apps/mobile-ios/src/app/providers/CallsProvider.tsx`
- `apps/mobile-ios/ios/MobileIosShell/CallManager.swift`

The roadmap should be followed in order.
Each phase has a specific goal, concrete work items, and exit criteria.

## Current Assessment

The product already has:

- a dedicated `call-service`
- REST call lifecycle endpoints
- Socket.IO signaling
- WebRTC audio and video call flows
- TURN credential issuance
- stale call cleanup on the backend
- iOS CallKit bridge
- iOS PushKit bridge
- client-side reconnect and recovery logic

The remaining work is not feature breadth.
It is production hardening across:

- signaling determinism
- lifecycle correctness
- background and terminated-app behavior
- reconnect behavior
- observability
- verification

## Phase 1: Protocol And Lifecycle Hardening

### Goal

Make call negotiation and recovery deterministic so reconnects and repeated joins do not rely on fragile client-side heuristics.

### Problems To Remove

- stale `offer` / `answer` / `ice_candidate` messages being applied after a recovery cycle
- race conditions between multiple join/rejoin attempts
- call session state being correct in the database while signaling still carries obsolete negotiation traffic
- client-side compensating logic becoming the primary source of correctness

### Scope

- introduce a per-bootstrap signaling session identifier
- bind `call.join`, `call.ready`, `call.offer`, `call.answer`, and `call.ice_candidate` to that signaling session
- ignore signaling messages from obsolete sessions on both server and client
- tighten server validation for message forwarding in joinable states
- reduce reliance on "duplicate offer/answer" guards as the main safety mechanism

### Exit Criteria

- every active negotiation cycle has a stable signaling session id
- after `join` or `rejoin`, only messages from the newest signaling session are accepted
- obsolete negotiation traffic cannot reopen or corrupt a newer call recovery cycle
- reconnects no longer depend on lucky event ordering

## Phase 2: Background And System Lifecycle Hardening

### Goal

Ensure calls survive realistic iOS lifecycle transitions and that incoming calls work correctly when the app is not already in the foreground.

### Scope

- close the full background and terminated incoming-call path
- validate PushKit -> CallKit -> REST bootstrap -> RN handoff as one flow
- stabilize foreground/background transitions during active calls
- ensure app switch, lock/unlock, and return-to-app do not force false reconnects
- ensure terminal states remain coherent when the app dies during ringing or during an active call

### Exit Criteria

- background incoming calls can be answered and declined reliably
- active calls survive app switch without false terminal transitions
- app return does not trigger avoidable reconnect loops
- terminated-app call lifecycle is predictable and recoverable

## Phase 3: Reconnect And Network-Switch Hardening

### Goal

Make calls resilient to real network instability.

### Scope

- harden Wi-Fi <-> cellular handoff
- formalize reconnect backoff and retry ceilings
- prevent overlapping recovery attempts
- treat signaling reconnect and media reconnect as separate but coordinated concerns
- improve server handling of disconnected-but-recoverable sessions

### Exit Criteria

- temporary network loss does not immediately collapse the call
- one recovery cycle runs at a time
- successful reconnects preserve media more often than they restart from scratch
- failed reconnects transition cleanly into `failed` instead of hanging

## Phase 4: PushKit And CallKit Production Closure

### Goal

Finish the system iOS integration so calling behaves like a first-class phone experience.

### Scope

- enable the full VoIP incoming path as a real feature path, not a dormant branch
- harden VoIP token registration, refresh, and invalidation
- separate benign CallKit transaction noise from truly fatal call errors
- guarantee that accept/decline actions from CallKit map cleanly to backend state transitions

### Exit Criteria

- incoming system calls are dependable on real devices
- CallKit controls do not trigger false declines or false terminal states
- VoIP token lifecycle is stable across reinstall / relogin / token refresh

## Phase 5: Observability And Operational Controls

### Goal

Make production incidents diagnosable without reproducing them manually.

### Scope

- add structured server-side call logs with correlation ids
- add structured client-side call diagnostics
- record transition timing:
  - start -> ringing
  - ringing -> accepted
  - accepted -> active
  - reconnect start -> reconnect success/failure
- record transport signals:
  - connection state
  - ICE state
  - first remote track
  - relay/TURN usage
- capture push delivery and incoming call display outcomes

### Exit Criteria

- every failed call can be traced across backend and client logs
- setup latency and failure buckets are measurable
- TURN usage and reconnect success rate are visible

## Phase 6: Verification Matrix And Release Gate

### Goal

Replace anecdotal confidence with a release-quality verification bar.

### Required Verification

#### Backend

- unit tests for:
  - state transitions
  - idempotent `accept`, `decline`, `end`
  - stale session cleanup
  - stale conflict cleanup
  - rejoin bootstrap rules
- integration tests for:
  - start -> ring -> accept -> active -> end
  - start -> decline
  - start -> timeout -> missed
  - active -> disconnect -> recover
  - obsolete signaling session rejection

#### iOS Real-Device Matrix

- audio call between two physical iPhones
- video call between two physical iPhones
- foreground incoming
- background incoming
- accept from CallKit
- decline from CallKit
- app switch during active call
- lock/unlock during active call
- Wi-Fi -> cellular switch
- cellular -> Wi-Fi switch
- abnormal app exit during ringing
- abnormal app exit during active call

### Release Gate

Calls are only "production-ready" when all of the following are true:

- no known reproducible stuck `connecting` path remains
- no known reproducible false `declined` / false `canceled` path remains
- no stale active call blocks the next call after abnormal termination
- background incoming-call flow is dependable on real devices
- reconnect behavior is measurable and bounded
- call failure classes are observable from logs and metrics

## Execution Order

Work strictly in this order:

1. Phase 1: protocol and lifecycle hardening
2. Phase 2: background and system lifecycle hardening
3. Phase 3: reconnect and network-switch hardening
4. Phase 4: PushKit and CallKit production closure
5. Phase 5: observability and operational controls
6. Phase 6: verification matrix and release gate

## Current Active Slice

The current implementation status is:

- `Phase 1: completed in code`
- `Phase 2: implemented in code, pending real-device validation`
- `Phase 3: implemented in code, pending real-device validation`
- `Phase 4: implemented in code, pending APNs/CallKit validation`
- `Phase 5: implemented in code, pending production telemetry sink integration`
- `Phase 6: verification gate prepared; final pass depends on manual real-device matrix`

## Implementation Progress Notes

### Phase 1 Done

- signaling bootstrap is versioned with `signalingSessionId`
- negotiation cycles are versioned with `negotiationVersion`
- obsolete signaling traffic is rejected on both backend and client
- ordinary `join` no longer bumps negotiation epoch unless media restart is explicitly requested

### Phase 2 Done In Code

- VoIP push bootstrap is enabled from iOS app startup instead of being left dormant
- active calls keep system audio session alive across app switch
- return-to-app recovery is gated by actual transport state instead of always forcing reconnect
- token refresh logic is retried on foreground re-entry

### Phase 3 Done In Code

- reconnect logging now distinguishes signaling reconnect attempts from media recovery
- recovery scheduling uses bounded backoff instead of immediate storm loops
- only one recovery cycle can be active at a time
- restart-media recovery is separated from ordinary rejoin/bootstrap

### Phase 4 Done In Code

- `CallManager` can be escalated from non-VoIP config to full VoIP config without app restart
- VoIP token refresh path is retried and re-read after foreground transitions
- standard push token is re-read from native state instead of depending only on one-shot events
- benign CallKit transaction noise remains suppressible on the JS side

### Phase 5 Done In Code

- `call-service` emits structured lifecycle logs for start, accept, rejoin, active, cleanup, missed, and terminal states
- signaling gateway emits structured join/offer/answer/ice forwarding logs
- client signaling logs now include reconnect attempt / success / error transitions
- client media logs already record signaling state, ICE state, connection state, track flow, and candidate type

### Phase 6 Release Gate

The codebase is ready for release-style validation, but the release gate is not considered passed until the manual real-device matrix is executed.
