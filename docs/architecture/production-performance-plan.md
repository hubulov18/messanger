# Production Performance Plan

## 1. Objective

This document captures the current measured performance state of the repository and a concrete plan to move the system toward production-level latency under realistic concurrent usage.

The target is not only "no errors under load". The target is:

- predictable p95 latency
- bounded p99 tails
- stable behavior under concurrent read/write traffic
- repeatable measurement before and after each optimization step

## 2. Metrics Collected

The following metrics were collected on the local docker-backed environment using the real API gateway and real service graph.

### 2.1 Baseline Smoke

Command:

```bash
npm run perf:smoke:backend
```

Measured on isolated test users:

- `GET /v1/chats`
  - min: `63.22 ms`
  - p50: `78.45 ms`
  - p95: `115.72 ms`
  - p99: `115.72 ms`
  - error rate: `0%`
- `POST /v1/messages`
  - min: `85.19 ms`
  - p50: `132.81 ms`
  - p95: `295.85 ms`
  - p99: `295.85 ms`
  - error rate: `0%`

Interpretation:

- isolated flows are acceptable for an MVP baseline
- there is no evidence here of catastrophic single-user latency
- the serious issue appears only under concurrency

### 2.2 Chat Growth Smoke

Command:

```bash
PERF_GROWTH_PROFILE=small npm run perf:smoke:chats-growth
```

Measured on `5` chats with `1` message each:

- `GET /v1/chats`
  - min: `29.84 ms`
  - p50: `35.64 ms`
  - p95: `42.91 ms`
  - p99: `44.04 ms`
  - error rate: `0%`

Interpretation:

- at very small cardinality, the chat list path is fast
- the major problem is not the existence of a slow baseline
- the problem is growth under concurrency and data volume

### 2.3 Concurrent Load: 500 Users, Run A

Command:

```bash
PERF_LOAD_USERS=500 PERF_DATA_TAG=load500a npm run perf:load:messenger
```

Scenario:

- `500` authenticated users
- `250` direct chats
- concurrent flow per user:
  - `GET /v1/chats`
  - `GET /v1/chats/:chatId/messages`
  - `POST /v1/messages`

Measured:

- full scenario
  - p50: `17128.32 ms`
  - p95: `23395.51 ms`
  - p99: `23552.81 ms`
  - error rate: `0%`
- `GET /v1/chats`
  - p50: `2474.91 ms`
  - p95: `13464.65 ms`
  - p99: `21188.74 ms`
  - error rate: `0%`
- `GET /v1/chats/:chatId/messages`
  - p50: `12962.17 ms`
  - p95: `18738.47 ms`
  - p99: `18785.41 ms`
  - error rate: `0%`
- `POST /v1/messages`
  - p50: `402.39 ms`
  - p95: `8642.89 ms`
  - p99: `13217.67 ms`
  - error rate: `0%`

Interpretation:

- the system stays correct under load
- the system is not remotely production-level on latency
- read paths degrade much more than write paths

### 2.4 Concurrent Load: 500 Users, Run B With Resource Sampling

Command:

```bash
PERF_LOAD_USERS=500 PERF_DATA_TAG=load500b npm run perf:load:messenger
```

Measured:

- full scenario
  - p50: `5920.19 ms`
  - p95: `8167.08 ms`
  - p99: `8373.02 ms`
  - error rate: `0%`
- `GET /v1/chats`
  - p50: `1757.42 ms`
  - p95: `3844.10 ms`
  - p99: `3936.49 ms`
  - error rate: `0%`
- `GET /v1/chats/:chatId/messages`
  - p50: `4223.87 ms`
  - p95: `4501.77 ms`
  - p99: `4604.20 ms`
  - error rate: `0%`
- `POST /v1/messages`
  - p50: `99.64 ms`
  - p95: `532.66 ms`
  - p99: `4481.23 ms`
  - error rate: `0%`

Interpretation:

- the second run is materially faster than the first
- that strongly suggests warm-cache / warm-connection / warm-dataset effects
- this variance itself is a production risk
- even the better run is still far above acceptable production latency

### 2.5 Peak Container Resource Usage During 500-User Load

Peak CPU:

- `telegram-chat-service`: `372.03%`
- `telegram-identity-service`: `316.62%`
- `telegram-message-service`: `256.99%`
- `telegram-api-gateway`: `109.34%`
- `telegram-rabbitmq`: `96.37%`
- `telegram-postgres`: `72.18%`
- `telegram-profile-service`: `40.73%`

Peak memory:

- `telegram-rabbitmq`: `1538.05 MiB`
- `telegram-minio`: `410.30 MiB`
- `telegram-postgres`: `388.00 MiB`
- `telegram-chat-service`: `130.10 MiB`
- `telegram-message-service`: `122.90 MiB`
- `telegram-api-gateway`: `121.40 MiB`
- `telegram-identity-service`: `107.30 MiB`
- `telegram-profile-service`: `95.76 MiB`

Interpretation:

- the primary issue is not memory exhaustion in application services
- CPU pressure is highest in `chat-service`, `identity-service`, and `message-service`
- RabbitMQ memory is surprisingly high for the measured business flow and should be monitored closely

### 2.6 Database Statistics Signals

Observed from `pg_stat_database` and `pg_stat_user_tables`:

- `telegram_message` is by far the busiest database
- `messages`, `outbox_events`, `read_receipts`, and `delivery_receipts` show heavy activity
- `chat_members` and `outbox_events` in `telegram_chat` show significant scan volume
- `message` outbox and projection event tables show very large sequential scan counts

Interpretation:

- read and projection paths are expensive enough that table access patterns matter already
- outbox/projection plumbing is non-trivial overhead under load
- the message service is the hottest persistence boundary

## 3. Code-Level Findings

These findings connect measured behavior to the actual code.

### 3.1 `GET /v1/chats` does cross-service aggregation in the request path

Relevant code:

- [apps/services/chat-service/src/chat/chat.service.ts](/Users/judyannmartos/Movies/telegram/apps/services/chat-service/src/chat/chat.service.ts)
- [apps/services/chat-service/src/message-client/message-service.client.ts](/Users/judyannmartos/Movies/telegram/apps/services/chat-service/src/message-client/message-service.client.ts)

Behavior:

- list memberships
- fetch message summaries from `message-service`
- derive unique peer and sender IDs
- fetch profiles from `profile-service`
- sort in memory

Why this matters:

- latency accumulates across service boundaries
- variance in one dependency propagates directly into the endpoint
- concurrency amplifies this because every request performs multi-hop fanout

### 3.2 `listChatsForUser` eagerly includes nested relations

Relevant code:

- [apps/services/chat-service/src/chat/repositories/chat.repository.ts](/Users/judyannmartos/Movies/telegram/apps/services/chat-service/src/chat/repositories/chat.repository.ts)

Current pattern:

- fetch active memberships
- include `chat`
- include `members`
- include `chatPins`
- include `chatMutes`

Why this matters:

- the direct-chat list path fetches more relational data than the final response strictly needs
- nested include patterns increase query and hydration cost

### 3.3 `GET /v1/chats/:chatId/messages` loads full message rows plus attachments and reactions

Relevant code:

- [apps/services/message-service/src/message/repositories/message.repository.ts](/Users/judyannmartos/Movies/telegram/apps/services/message-service/src/message/repositories/message.repository.ts)

Current pattern:

- `findMany` by `chatId`
- include attachments
- include reactions
- order by `createdAt desc`

Why this matters:

- even a moderate message page becomes expensive when many users hit it at once
- the endpoint also updates delivery state after reading, so it is not a pure read path

### 3.4 Message read flow performs extra write work during list retrieval

Relevant code:

- [apps/services/message-service/src/message/message.service.ts](/Users/judyannmartos/Movies/telegram/apps/services/message-service/src/message/message.service.ts)

Current pattern:

- list messages
- derive latest visible message
- upsert delivery receipt
- compute delivery state

Why this matters:

- the read path mixes retrieval and mutation
- under concurrency this increases lock/contention surface and adds DB write pressure

### 3.5 Source/projection shadow reads add extra cost and variance

Relevant code:

- [apps/services/chat-service/src/message-client/message-service.client.ts](/Users/judyannmartos/Movies/telegram/apps/services/chat-service/src/message-client/message-service.client.ts)

Why this matters:

- shadow reads are useful for correctness validation
- but if left enabled in high-load environments they add extra downstream read amplification

## 4. Phase 0 Instrumentation Findings

Instrumentation was added to:

- `chat-service`
  - `slow_create_direct_chat`
  - `slow_list_chats`
  - Prisma `slow_query`
- `message-service`
  - `slow_list_messages`
  - `slow_send_message`
  - Prisma `slow_query`

Two additional diagnostic runs were executed through a fully local host-network service graph:

- `PERF_LOAD_USERS=100 PERF_LOAD_SETUP_CONCURRENCY=5 PERF_DATA_TAG=diag100b npm run perf:load:messenger`
- `PERF_LOAD_USERS=500 PERF_LOAD_SETUP_CONCURRENCY=10 PERF_DATA_TAG=diag500e npm run perf:load:messenger`

### 4.1 100-user diagnostic run

Measured:

- full scenario
  - p50: `5342.55 ms`
  - p95: `6041.18 ms`
  - error rate: `0%`
- `GET /v1/chats`
  - p50: `2128.63 ms`
  - p95: `3403.57 ms`
- `GET /v1/chats/:chatId/messages`
  - p50: `1071.41 ms`
  - p95: `1465.93 ms`
- `POST /v1/messages`
  - p50: `1753.69 ms`
  - p95: `2983.47 ms`

Findings:

- `createDirectChat` is not the primary bottleneck at this level
  - typical slow calls were around `200 ms`
  - dominant setup steps were:
    - `existingChatLookupMs ~ 80-90 ms`
    - `profilePolicyLookupMs ~ 80 ms`
- `GET /v1/chats` is already dominated by synchronous fanout, not transform/sort
  - common shape:
    - `membershipsQueryMs ~ 500-1600 ms`
    - `messageSummariesMs ~ 300-1100 ms`
    - `profileLookupMs ~ 100-800 ms`
    - `transformMs` and `sortMs` were negligible
- `GET /v1/chats/:chatId/messages` at low cardinality is dominated by access validation
  - common shape:
    - `chatAccessMs ~ 700-1500 ms`
    - `listMessagesMs ~ 50-350 ms`
    - delivery steps were usually near-zero when there were no visible messages yet
- `POST /v1/messages` is not primarily blocked on `createMessage`
  - common shape:
    - `chatAccessMs ~ 200-500 ms`
    - `directMessagePolicyMs ~ 400-2200 ms`
    - `createMessageMs ~ 200-900 ms`

Conclusion:

- the dominant early bottlenecks are synchronous cross-service checks, not local mapping logic

### 4.2 500-user diagnostic run

Measured:

- full scenario
  - p50: `20024.8 ms`
  - p95: `25063.8 ms`
  - error rate: `10.4%`
- `GET /v1/chats`
  - p50: `7000.02 ms`
  - p95: `23301.98 ms`
  - error rate: `0%`
- `GET /v1/chats/:chatId/messages`
  - p50: `5140.84 ms`
  - p95: `11281.18 ms`
  - error rate: `3.4%`
- `POST /v1/messages`
  - p50: `4135.75 ms`
  - p95: `13534.17 ms`
  - error rate: `7.0%`

Findings:

- `chat-service` became the main upstream amplifier
  - repeated `slow_list_chats` shapes:
    - `membershipsQueryMs ~ 1800-2300 ms`
    - `messageSummariesMs ~ 5700-12600 ms`
    - `profileLookupMs ~ 5000-6000 ms`
  - this directly explains the huge `GET /v1/chats` tails
- `message-service` write path degraded mostly in `directMessagePolicyMs`
  - repeated `slow_send_message` shapes:
    - `directMessagePolicyMs ~ 5000-11200 ms`
    - `createMessageMs` usually stayed under `1000 ms`
  - the direct message policy check is currently a production blocker
- `message-service` read path degraded in two distinct modes:
  - first mode:
    - `chatAccessMs` dominates when access checks are slow
  - second mode after writes begin:
    - `upsertDeliveryReceiptMs` and `deliveryStateMs` become material
    - examples exceeded `800 ms` and pushed total `listMessages` above `1.5 s`
- reliability degraded alongside latency
  - `GET /v1/chats/:chatId/messages` produced gateway `502` responses when the message upstream became unavailable
  - `POST /v1/messages` produced `500` responses during the same pressure window
- background workers were also starved
  - `ChatMembershipProjectionWorker` logged:
    - `PrismaClientKnownRequestError: Transaction API error: Unable to start a transaction in the given time.`
- async side effects were timing out
  - `NotificationServiceClient` repeatedly logged push queue timeouts during the same window

Conclusion:

- the system is now failing both latency and reliability at 500-user concurrency
- the top production blockers are:
  - `chat-service` request-path fanout for chat list
  - `message-service` direct-message policy check
  - read-path mutation work in message listing
  - transaction starvation in background projection workers

### 4.3 Multi-route optimization cycles after instrumentation

After the initial diagnostic runs, the strategy changed from single-endpoint tuning to repeated cycles of:

- measure several hot routes together
- refactor shared bottlenecks
- rerun the same `500-user` scenario

Key accepted optimizations already in source:

- `GET /v1/chats`
  - lighter `listChatsForUser`
  - parallel summaries and profile lookups
  - projection-first summaries enabled by default
- `GET /v1/chats/:chatId/messages`
  - delivery receipt update moved out of the synchronous response path
  - delivery/read state computation reduced from repeated scans to a compact position check
- `POST /v1/messages`
  - direct-message block policy lookup reduced and deduplicated in-process
  - write path switched to a batch transaction instead of an interactive transaction callback
- projection/outbox throughput
  - both projection workers now drain multiple batches per timer tick

Representative accepted `500-user` runs:

- `concurrent-messenger-load-500-2026-04-25T04-12-49-108Z.json`
  - flow p50: `8287.87 ms`
  - `GET /v1/chats` p50: `3106.42 ms`
  - `GET /v1/chats/:chatId/messages` p50: `2532.16 ms`
  - `POST /v1/messages` p50: `2513.5 ms`
  - major operational win:
    - projection lag fell from hundreds of seconds to low double-digit seconds
- `concurrent-messenger-load-500-2026-04-25T04-22-05-107Z.json`
  - flow p50: `5908.44 ms`
  - `GET /v1/chats` p50: `2165.7 ms`
  - `GET /v1/chats/:chatId/messages` p50: `1874.73 ms`
  - `POST /v1/messages` p50: `1542.3 ms`
  - result:
    - unread-count and batch-transaction work materially lowered both chat list cost and message send cost
- `concurrent-messenger-load-500-2026-04-25T04-27-47-701Z.json`
  - flow p50: `5499.31 ms`
  - `GET /v1/chats` p50: `2215.27 ms`
  - `GET /v1/chats/:chatId/messages` p50: `2102.27 ms`
  - `POST /v1/messages` p50: `796.08 ms`
  - result:
    - grouped unread-count SQL plus slimmer message selects cut `POST /v1/messages` roughly in half again
    - `GET /v1/chats` tail also improved:
      - p95 `3257.47 ms -> 3146.15 ms`
    - `GET /v1/chats/:chatId/messages` did not improve materially in the same cycle
- `concurrent-messenger-load-500-2026-04-25T04-48-25-224Z.json`
  - flow p50: `6606.92 ms`
  - `GET /v1/chats` p50: `3243.64 ms`
  - `GET /v1/chats/:chatId/messages` p50: `1595.73 ms`
  - `POST /v1/messages` p50: `1755.14 ms`
  - result:
    - `listChatsForUser` moved to a single SQL path
    - `membershipsQueryMs` dropped sharply in logs:
      - from frequent `1.7-2.0 s` ranges to roughly `60-170 ms` in many requests
    - the dominant remaining cost in `GET /v1/chats` is now `messageSummariesMs`, not memberships lookup
    - end-to-end behavior improved versus the original diagnostic runs, but not versus the best prior accepted mixed-route run

Important note:

- `concurrent-messenger-load-500-2026-04-25T04-27-08-867Z.json` is intentionally excluded from comparisons
  - that rerun was invalid because `message-service` was restarted without the correct `JWT_ACCESS_SECRET`, causing `401 UNAUTHENTICATED` on message routes

Current conclusion after these cycles:

- the platform is meaningfully better than the original diagnostic state
- `500` concurrent users now complete with `0%` errors in the accepted runs
- the write path is no longer the clearest production blocker
- the main remaining request-path bottlenecks are now:
  - `GET /v1/chats`
  - `GET /v1/chats/:chatId/messages`
- the next remaining systemic ceiling is projection and outbox table scan cost under sustained backlog

## 5. Assessment Against Production-Level Expectations

Current verdict:

- correctness under concurrency: acceptable
- latency under concurrency: unacceptable
- tail behavior: unacceptable
- variance run-to-run: too high
- observability depth: insufficient for confident production operation

This system is not production-ready yet for concurrent messenger traffic.

## 6. Production-Level Targets

Initial production-level targets for core flows:

- `GET /v1/chats`
  - p50 < `200 ms`
  - p95 < `500 ms`
  - p99 < `900 ms`
- `GET /v1/chats/:chatId/messages`
  - p50 < `250 ms`
  - p95 < `600 ms`
  - p99 < `1000 ms`
- `POST /v1/messages`
  - p50 < `150 ms`
  - p95 < `400 ms`
  - p99 < `800 ms`
- 500-user mixed load scenario
  - full scenario p95 < `1500 ms`
  - endpoint error rate < `0.5%`

## 7. Priority Plan

### Phase 0: Observability First

Goal:

- stop optimizing blind

Actions:

- add request duration logging at gateway and each backend service
- add per-dependency timing in `chat-service` list path:
  - membership query duration
  - message summary fetch duration
  - profile fetch duration
  - sort/transform duration
- add per-step timing in `message-service` list path:
  - message fetch
  - delivery receipt upsert
  - delivery/read state lookup
- add Prisma query logging with slow-query threshold
- add queue, consumer lag, and outbox polling metrics

Success criterion:

- every slow request can be attributed to a specific sub-step

### Phase 1: Fix The Highest ROI Read Path

Goal:

- reduce `GET /v1/chats/:chatId/messages` latency first

Actions:

- separate pure read from delivery receipt mutation
- make receipt update asynchronous or optional on first page load
- avoid loading attachments/reactions unless the response actually needs them
- verify that the `(chatId, createdAt desc)` index is being used effectively
- add explicit cursor pagination and avoid broader page reads than necessary

Success criterion:

- 500-user run shows material drop in `getMessages` p50/p95

Implementation status:

- implemented `listMessages` receipt update as asynchronous best-effort instead of blocking the response
- replaced the delivery/read-state calculation with a linear receipt-position pass instead of per-message scans across all receipts
- local targeted verification on a `25`-message direct thread showed:
  - `GET /v1/chats/:chatId/messages`
    - min: `13.81 ms`
    - p50: `16.81 ms`
    - p95: `22.80 ms`
    - max: `30.28 ms`

Interpretation:

- the hot read path is now much cheaper in the small, reproducible local scenario
- the next validation step is to rerun mixed concurrent load and confirm that `getMessages` tails shrink under contention, not only in isolated thread reads

Concurrent validation:

- `100` users mixed load after the optimization:
  - full scenario p50: `3107.68 ms`
  - `GET /v1/chats/:chatId/messages` p50: `820.64 ms`
  - `GET /v1/chats/:chatId/messages` p95: `1229.88 ms`
- `500` users mixed load after the optimization:
  - full scenario p50: `8258.15 ms`
  - `GET /v1/chats/:chatId/messages` p50: `2492.07 ms`
  - `GET /v1/chats/:chatId/messages` p95: `4997.51 ms`

Conclusion:

- the thread read path improved materially under contention compared with the pre-optimization runs
- it is no longer the worst endpoint in the system
- it is still too slow for production at `500` concurrent users, but it is no longer the first bottleneck to attack

### Phase 2: Reduce Chat List Fanout Cost

Goal:

- reduce `GET /v1/chats` cross-service aggregation time

Actions:

- slim `listChatsForUser` DB fetch to only fields needed for direct-chat list view
- avoid eager inclusion of full active member lists when only the peer user ID is needed
- prefer projection-backed summary reads over source reads where correctness has already been validated
- review whether shadow reads should be disabled in load-sensitive environments
- cache or precompute display data needed for direct chat list rows

Success criterion:

- `GET /v1/chats` p95 drops below `1 s` under the current 500-user scenario

Implementation status:

- implemented a slimmer `listChatsForUser` repository path without heavy nested relation includes
- parallelized chat summary and peer profile fetches in `chat-service`
- reduced `lastSender` profile lookups to the cases where they are actually needed
- local verification after the change showed:
  - `GET /v1/chats` baseline smoke p50: `15.18 ms`, p95: `37.45 ms`
  - `GET /v1/chats` medium growth smoke p50: `38.45 ms`, p95: `58.84 ms`

Concurrent validation:

- `100` users mixed load after the optimization:
  - `GET /v1/chats` p50: `1291.53 ms`
  - `GET /v1/chats` p95: `1656.89 ms`
- `500` users mixed load after the optimization:
  - `GET /v1/chats` p50: `4041.05 ms`
  - `GET /v1/chats` p95: `8056.56 ms`
- `500` users mixed load after switching projection-backed summaries on by default:
  - `GET /v1/chats` p50: `3287.12 ms`
  - `GET /v1/chats` p95: `4406.98 ms`
  - full flow p50: `7675.56 ms`
  - full flow p95: `10390.01 ms`

Important caveat:

- this projection-first validation run was executed on a local stack recovering from a prior `5000`-user saturation test
- projection lag was still elevated during the run, so these numbers are directionally useful but should be re-verified on a clean stack

Interpretation:

- even with backlog pressure still present, projection-first materially improved the chat list tail
- the biggest visible win was `GET /v1/chats` p95 dropping from `8056.56 ms` to `4406.98 ms`
- this is strong evidence that the synchronous summary source was still a meaningful bottleneck in the request path

Current finding:

- chat list remains the dominant production blocker
- slow request logs show the same shape repeatedly:
  - `membershipsQueryMs` in the hundreds of milliseconds
  - `messageSummariesMs` and `peerProfileLookupMs` were commonly in the `1.3-2.9 s` range before projection-first and still show up under backlog pressure
- the next high-ROI step is to reduce or eliminate synchronous summary/profile fanout in the request path

### Phase 3: Reduce Read Amplification With Projections

Goal:

- move expensive summary/unread computation further away from synchronous request paths

Actions:

- harden `chat_summary_projection` as the primary source for chat list summaries
- ensure projection lag remains bounded under burst traffic
- consider dedicated list-view projections that already contain:
  - last message preview
  - last activity timestamp
  - unread count
  - peer display metadata for direct chats

Success criterion:

- chat list request path becomes one service + one DB boundary, not an aggregation chain

### Phase 4: Tame Background Cost

Goal:

- ensure projections/outbox processing do not quietly steal too much capacity

Actions:

- inspect polling frequency and batch sizes for outbox and projections
- allow projection workers to drain multiple batches per timer tick instead of sleeping after every single batch
- reduce sequential scans on event/outbox tables
- archive or compact processed event tables if needed
- monitor RabbitMQ memory growth during sustained load

Implementation status:

- both projection workers now support multi-batch draining per tick
- new env controls:
  - `CHAT_MEMBERSHIP_PROJECTION_MAX_BATCHES_PER_TICK`
  - `CHAT_SUMMARY_PROJECTION_MAX_BATCHES_PER_TICK`
- default for both is `20`, so backlog recovery can process up to `2000` projection events per timer cycle with the current default batch size of `100`

Success criterion:

- lower broker memory footprint and lower DB background scan volume during equivalent load

### Phase 5: Production Hardening

Goal:

- prepare the system for repeatable staging and production validation

Actions:

- add automated nightly load regressions for:
  - baseline smoke
  - chats growth
  - 500-user concurrent flow
- define pass/fail SLO thresholds in CI or staging automation
- add dashboards for request latency, queue depth, projection lag, DB connections, and slow queries

Success criterion:

- performance regressions are detected before release

## 8. Recommended Execution Order

1. implement instrumentation in `message-service` list path
2. implement instrumentation in `chat-service` list path
3. rerun 500-user concurrent load
4. optimize `GET /v1/chats/:chatId/messages`
5. rerun 500-user concurrent load
6. optimize `GET /v1/chats`
7. rerun chats growth and 500-user concurrent load
8. harden projections/outbox and re-measure

## 9. Immediate Engineering Recommendation

If only one thing is funded next, it should be:

- harden projection throughput and chat list read path together

Reason:

- `GET /v1/chats` is now the clearest remaining synchronous blocker at `500` users
- the `5000`-user stress run showed that projection lag becomes the next system-wide ceiling once request-path reads improve
- it affects the core “open conversation” user experience
- it likely contains the cleanest first-wave wins because it mixes read and mutation work

If two things are funded next, the second should be:

- reduce synchronous aggregation in `GET /v1/chats`

## 10. Summary

## 11. Latest Measurement Cycle

Clean rerun after the accepted `chat list SQL path + lightweight projection payload` changes:

- artifact: [concurrent-messenger-load-500-2026-04-25T05-03-24-894Z.json](/Users/judyannmartos/Movies/telegram/artifacts/perf/concurrent-messenger-load-500-2026-04-25T05-03-24-894Z.json)
- `500` users, `0%` errors
- full flow:
  - `p50 5212.39ms`
  - `p95 6742.3ms`
- `GET /v1/chats`
  - `p50 2425.98ms`
  - `p95 3632.35ms`
- `GET /v1/chats/:chatId/messages`
  - `p50 1167.81ms`
  - `p95 2725.38ms`
- `POST /v1/messages`
  - `p50 1315.77ms`
  - `p95 2591.07ms`

Interpretation:

- this is a valid accepted benchmark point
- compared with the earlier accepted mixed-route baseline, full flow improved and `GET /v1/chats/:chatId/messages` improved materially
- `GET /v1/chats` remained the slowest read path and the main remaining synchronous bottleneck

Key slow-log findings from this rerun:

- `chat-service`
  - `membershipsQueryMs` is no longer dominant after the SQL rewrite
  - the main cost inside `slow_list_chats` is now `messageSummariesMs` plus `peerProfileLookupMs`
- `message-service`
  - `slow_send_message` is materially healthier than in earlier runs
  - typical slow sends were dominated by `directMessagePolicyMs`, then `chatAccessMs`, not by `createMessageMs`

Rejected experiment:

- artifact: [concurrent-messenger-load-500-2026-04-25T05-05-40-703Z.json](/Users/judyannmartos/Movies/telegram/artifacts/perf/concurrent-messenger-load-500-2026-04-25T05-05-40-703Z.json)
- change: short process-local profile summary cache in `chat-service`
- result:
  - `GET /v1/chats p50` improved slightly to `2222.82ms`
  - but `GET /v1/chats p95` regressed to `6032.58ms`
  - full flow regressed to `p50 7221.3ms`
- decision:
  - the profile cache is not accepted and should not be kept as a production candidate
  - it optimised a local sub-step without improving the full mixed route scenario

Additional validated cycle on an isolated host benchmark contour (`3100 -> 3102 -> 3103`):

- before the `deliveryState` read-path change:
  - artifact: [concurrent-messenger-load-100-2026-04-25T06-59-16-471Z.json](/Users/judyannmartos/Movies/telegram/artifacts/perf/concurrent-messenger-load-100-2026-04-25T06-59-16-471Z.json)
  - full flow `p50 7149.98ms`
  - `GET /v1/chats p50 2537.36ms`
  - `GET /v1/chats/:chatId/messages p50 1162.3ms`
  - `POST /v1/messages p50 3048.01ms`
- after replacing `deliveryState` reference lookups with receipt queries that already include message timestamps:
  - artifact: [concurrent-messenger-load-100-2026-04-25T07-02-07-778Z.json](/Users/judyannmartos/Movies/telegram/artifacts/perf/concurrent-messenger-load-100-2026-04-25T07-02-07-778Z.json)
  - full flow `p50 1592.51ms`
  - `GET /v1/chats p50 568.39ms`
  - `GET /v1/chats/:chatId/messages p50 412.94ms`
  - `POST /v1/messages p50 624.91ms`

Follow-up `500`-user rerun on the same host contour:

- artifact: [concurrent-messenger-load-500-2026-04-25T07-02-33-443Z.json](/Users/judyannmartos/Movies/telegram/artifacts/perf/concurrent-messenger-load-500-2026-04-25T07-02-33-443Z.json)
- `0%` errors
- full flow:
  - `p50 6205.9ms`
  - `p95 7512.38ms`
- `GET /v1/chats`
  - `p50 2523.82ms`
  - `p95 4139.85ms`
- `GET /v1/chats/:chatId/messages`
  - `p50 1649.1ms`
  - `p95 2562.39ms`
- `POST /v1/messages`
  - `p50 1730ms`
  - `p95 2693.73ms`

What the added instrumentation clarified:

- `chat-service`
  - previous `slow_list_chats` logs were overstating profile cost because two parallel steps were timed as one `Promise.all`
  - after timing was split correctly, the remaining `GET /v1/chats` issue still points primarily to message summary reads, not memberships
- `message-service`
  - `slow_projected_chat_summaries` now shows the internal split between:
    - `projectionRowsMs`
    - `unreadCountsMs`
    - `watermarkMs`
    - `transformMs`
    - `totalMs`
  - this confirmed that the projection row fetch and unread-count SQL are both significant under load
- `listMessages`
  - `deliveryStateMs` was paying for an avoidable extra lookup of referenced receipt messages
  - replacing that with receipt queries that already join the message timestamp removed one extra DB round-trip from the hot path

Rejected follow-up experiment on the same host contour:

- artifact: [concurrent-messenger-load-100-2026-04-25T07-06-21-994Z.json](/Users/judyannmartos/Movies/telegram/artifacts/perf/concurrent-messenger-load-100-2026-04-25T07-06-21-994Z.json)
- change:
  - tried to use existing `chat_message_counters` as a fast unread-count path with SQL fallback
  - added direct-message counter writes on `POST /messages`
- result:
  - full flow regressed from `p50 1592.51ms` to `p50 11285.7ms`
  - `GET /v1/chats` regressed from `p50 568.39ms` to `p50 3482.81ms`
  - `POST /v1/messages` regressed from `p50 624.91ms` to `p50 5995.07ms`
- decision:
  - this approach is rejected in its current form
  - the extra write amplification on the message send path is too expensive for the gain it was intended to provide
  - any future use of `chat_message_counters` should be projection-backed or otherwise decoupled from the synchronous send path

The current system proves that the architecture is functionally viable under concurrent use, but not that it is production-ready.

The measured bottlenecks are concentrated in synchronous read paths, especially:

- chat thread load
- chat list aggregation

The fastest path to production-level behavior is:

- instrument first
- optimize read paths second
- move summary work into projections third
- enforce regression load tests continuously after that
