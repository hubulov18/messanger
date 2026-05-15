# Performance Test Strategy

## 1. Goal

The system is functionally working, but intermittent slowdowns indicate that it is not yet at a production-ready performance baseline.

The goal of performance testing in this repository is not "maximum throughput at any cost". The goal is to prove that the current architecture can sustain realistic messenger workloads with predictable latency, acceptable mobile responsiveness, and controlled degradation under load.

## 2. System Areas That Must Be Measured Separately

Performance must be measured by layer. A single "the app is slow" result is not actionable.

Measure these layers independently:

- mobile rendering and interaction latency
- API gateway latency
- service-to-service latency
- database query latency
- realtime event fanout latency
- background projection lag

## 3. Most Important User Journeys

These flows should become the baseline performance suite.

### 3.1 Chat list open and refresh

Path:

- mobile client loads chat list
- API gateway calls chat-service
- chat-service enriches with message-service and profile-service
- mobile store updates and re-renders the inbox

Why it matters:

- this is a high-frequency screen
- current architecture does aggregation across services
- the mobile inbox store updates the full list repeatedly

### 3.2 Open chat thread

Path:

- mobile client loads recent messages
- message-service reads message list and receipt state
- mobile renders an inverted message list

Why it matters:

- users notice delay here immediately
- this flow is sensitive to both backend latency and client rendering cost

### 3.3 Send message

Path:

- client sends message
- gateway forwards to message-service
- message-service validates membership via chat-service
- message is persisted
- notification fanout is triggered
- realtime event reaches recipients
- sender UI settles from optimistic state to confirmed state

Why it matters:

- this is the core product interaction
- it includes synchronous and asynchronous parts

### 3.4 Realtime inbox updates

Path:

- message event arrives over SSE
- client updates unread state and chat preview
- inbox list reorders if needed

Why it matters:

- this is where "everything works but feels laggy" often appears
- repeated full-list sorting is expensive when chat count grows

### 3.5 Search inside chat

Path:

- client submits search query
- message-service performs text filtering in the message table

Why it matters:

- search queries often become slow first as message volume grows
- current implementation uses `contains` filtering, which must be tested with realistic data volume

## 4. Existing Risk Areas In Current Code

These are not abstract concerns. They are visible in the current codebase and should shape the first test suite.

### 4.1 Chat list aggregation is chat-count sensitive

`chat-service` builds chat list responses by combining:

- chat membership data
- message summaries
- profile lookups

This makes chat list latency sensitive to:

- number of chats returned
- number of unique peer users and last senders
- latency variance between dependent services

Relevant code:

- [apps/services/chat-service/src/chat/chat.service.ts](/Users/judyannmartos/Movies/telegram/apps/services/chat-service/src/chat/chat.service.ts)

### 4.2 Message summary lookups can become inefficient

`message-service` summary APIs derive last messages and unread counts from message and receipt tables. These paths should be measured with large per-chat and per-user datasets.

Relevant code:

- [apps/services/message-service/src/message/message.service.ts](/Users/judyannmartos/Movies/telegram/apps/services/message-service/src/message/message.service.ts)
- [apps/services/message-service/src/message/repositories/message.repository.ts](/Users/judyannmartos/Movies/telegram/apps/services/message-service/src/message/repositories/message.repository.ts)
- [apps/services/message-service/src/message/chat-summary-projection.service.ts](/Users/judyannmartos/Movies/telegram/apps/services/message-service/src/message/chat-summary-projection.service.ts)

### 4.3 Mobile inbox updates currently scale poorly with list size

The inbox Zustand store repeatedly maps and sorts the full chat array on incoming events and sync operations. That is acceptable at small scale, but it will degrade as chat count and event rate grow.

Relevant code:

- [apps/mobile-ios/src/shared/chats/chat-inbox.store.ts](/Users/judyannmartos/Movies/telegram/apps/mobile-ios/src/shared/chats/chat-inbox.store.ts)
- [apps/mobile-ios/src/app/providers/ChatInboxRealtimeProvider.tsx](/Users/judyannmartos/Movies/telegram/apps/mobile-ios/src/app/providers/ChatInboxRealtimeProvider.tsx)
- [apps/mobile-ios/src/features/chats/screens/ChatListScreen.tsx](/Users/judyannmartos/Movies/telegram/apps/mobile-ios/src/features/chats/screens/ChatListScreen.tsx)

### 4.4 Gateway overhead is small per request but constant

The gateway currently parses and normalizes every upstream response and error. That is fine for correctness, but under burst traffic it adds fixed overhead that should be quantified rather than assumed negligible.

Relevant code:

- [apps/api-gateway/src/proxy/proxy.service.ts](/Users/judyannmartos/Movies/telegram/apps/api-gateway/src/proxy/proxy.service.ts)

### 4.5 Realtime connection recovery can trigger reload bursts

On reconnect, the mobile realtime provider calls `getChats()` to recover state. If reconnects happen frequently, this can create visible UI churn and extra backend load.

Relevant code:

- [apps/mobile-ios/src/app/providers/ChatInboxRealtimeProvider.tsx](/Users/judyannmartos/Movies/telegram/apps/mobile-ios/src/app/providers/ChatInboxRealtimeProvider.tsx)

## 5. Suggested SLO Baseline For MVP

These are pragmatic targets for an MVP-quality messenger, not final scale targets.

### 5.1 Backend API targets

- `GET /chats`: p50 < 250 ms, p95 < 700 ms, p99 < 1200 ms
- `GET /chats/:chatId/messages`: p50 < 250 ms, p95 < 600 ms, p99 < 1000 ms
- `POST /messages`: p50 < 200 ms, p95 < 500 ms, p99 < 900 ms
- `GET /messages/search`: p50 < 300 ms, p95 < 800 ms, p99 < 1500 ms

### 5.2 Realtime targets

- message persisted to recipient event received: p95 < 500 ms
- read receipt persisted to sender event received: p95 < 400 ms
- projection lag under sustained write load: steady-state < 2 s

### 5.3 Mobile interaction targets

- opening chat list: usable content visible < 1.5 s on a representative test device
- opening existing chat thread: visible messages < 1.2 s
- message send feedback: optimistic bubble visible < 150 ms
- scroll in populated chat and inbox: no persistent frame drops during normal interaction

## 6. Required Test Types

Do not rely on a single load test. Use a small but complete set.

### 6.1 Microbenchmarks

Use for:

- chat list store update cost on the mobile side
- message metadata derivation for chat thread rendering
- gateway proxy overhead for small and medium payloads

Purpose:

- isolate hot functions before blaming infrastructure

### 6.2 API load tests

Use for:

- `GET /chats`
- `GET /chats/:chatId/messages`
- `POST /messages`
- `POST /messages/read`
- `GET /messages/search`

Measure:

- p50/p95/p99
- request rate
- error rate
- timeout rate

### 6.3 Soak tests

Run 30 to 60 minutes for:

- steady chat list polling plus realtime traffic
- continuous message sending in several active chats
- projection consumers processing live event streams

Measure:

- memory growth
- open connections
- projection lag drift
- throughput degradation over time

### 6.4 Spike tests

Run short bursts for:

- reconnect storms
- burst sends to the same large chat
- many users opening inbox simultaneously

Measure:

- recovery time
- backlog growth
- timeout and retry amplification

### 6.5 Mobile profiling runs

Run on a realistic iPhone simulator and at least one real device if possible.

Measure:

- JS thread stalls
- repeated rerenders of inbox and thread screens
- frame drops while new realtime events arrive
- memory growth after opening many chats

## 7. Test Data Profiles

Performance results are only useful if seeded data looks realistic.

Create at least these seed profiles:

### 7.1 Small

- 20 chats per user
- 50 to 200 messages per chat
- low realtime activity

### 7.2 Medium

- 200 chats per user
- 500 to 2000 messages per active chat
- moderate unread counts
- moderate reconnect churn

### 7.3 Large

- 1000 chats per user for inbox stress
- several chats with 10000+ messages
- large group or channel membership
- concurrent sends and read updates

The medium profile should become the default regression baseline. The large profile should be used to expose architectural limits.

## 8. First Implementation Wave

The first wave should be narrow and measurable.

### 8.1 Backend

Add basic performance scripts for:

- `GET /chats`
- `GET /chats/:chatId/messages`
- `POST /messages`

Add metrics capture for:

- request duration
- upstream dependency duration
- Prisma query duration
- projection lag

### 8.2 Mobile

Add profiling scenarios for:

- cold open of inbox
- receiving 20 to 50 realtime message events while inbox is visible
- opening a chat with 200+ rendered messages

Track:

- render count
- time to visible content
- JS thread spikes around inbox store updates

### 8.3 Validation gate

Before calling the system production-ready, require:

- no p95 regression above agreed thresholds
- no sustained projection lag growth
- no obvious UI jank in inbox and chat thread under medium profile

## 9. Practical Order Of Work

Recommended order:

1. establish baseline timings manually for the core three API flows
2. add instrumentation before writing a large number of tests
3. build repeatable seed data for small, medium, and large datasets
4. automate API load tests for inbox, thread open, and send message
5. profile the mobile inbox and chat thread with realtime traffic
6. fix the largest bottleneck
7. rerun the same suite and compare deltas

## 10. Likely First Bottlenecks To Confirm

Based on the current code, these are the first hypotheses worth validating:

- inbox list updates on mobile are doing too much work per realtime event
- chat list latency grows noticeably with the number of chats because of cross-service aggregation
- message summary and unread-count paths become expensive as message volume grows
- reconnect-driven state recovery creates avoidable load bursts
- message search will degrade early without deliberate indexing and query validation

## 11. What "Production-Level" Should Mean Here

For this project, "production-level" should mean:

- no obvious user-visible lag in the core chat flows under the medium data profile
- predictable p95 latency for core APIs
- acceptable behavior during reconnects and short traffic bursts
- measurable realtime lag
- a repeatable regression suite that can fail before performance quality silently drifts

Without that, the system may be functionally correct but still not production-ready.

## 12. First Practical Backend Baseline

The repository now includes a minimal backend performance smoke:

- script: [scripts/perf/run-backend-baseline.mjs](/Users/judyannmartos/Movies/telegram/scripts/perf/run-backend-baseline.mjs)
- npm command: `npm run perf:smoke:backend`

This is intentionally lightweight:

- no new dependencies
- no heavy load generation
- uses the real API gateway and real auth flow
- creates or reuses a direct chat via existing endpoints
- measures two core backend journeys:
  - `GET /v1/chats`
  - `POST /v1/messages`

### 12.1 Real Endpoints Used

The smoke uses these actual gateway endpoints:

- `POST /v1/auth/register`
- `POST /v1/auth/verify-otp`
- `POST /v1/chats/direct`
- `GET /v1/chats`
- `POST /v1/messages`

Auth requirements:

- `authorization: Bearer <accessToken>`
- `x-device-id: <deviceId>`

Message payload shape:

```json
{
  "chatId": "chat_xxx",
  "clientMessageId": "perf_...",
  "type": "text",
  "text": "perf baseline ...",
  "attachments": []
}
```

### 12.2 Local Run Prerequisites

The smoke assumes the backend stack is reachable locally through the API gateway.

Typical local setup:

1. Start infra:
```bash
infra/docker/scripts/up.sh
```
2. Apply core migrations if needed:
```bash
infra/docker/scripts/migrate-core.sh
```
3. Start backend services and gateway.

Possible approaches:

- local dev mode via `npm run dev`
- or the docker backend stack if you are using the compose-based backend services

Default gateway base URL expected by the smoke:

```bash
http://localhost:3000/v1
```

### 12.3 How To Run

Default run:

```bash
npm run perf:smoke:backend
```

Example with explicit base URL and slightly longer sequential phase:

```bash
API_BASE_URL=http://localhost:3000/v1 \
PERF_SEQUENTIAL_ITERATIONS=25 \
npm run perf:smoke:backend
```

Optional tiny burst phase:

```bash
PERF_BURST_REQUESTS=6 \
PERF_BURST_CONCURRENCY=3 \
npm run perf:smoke:backend
```

### 12.4 Environment Variables

- `API_BASE_URL`
  default: `http://localhost:3000/v1`
- `SEED_OWNER_PHONE_NUMBER`
  default: `+14155552671`
- `SEED_MATCHED_PHONE_NUMBER`
  default: `+14155552672`
- `PERF_OWNER_DEVICE_ID`
  default: `device_owner_perf_smoke`
- `PERF_PEER_DEVICE_ID`
  default: `device_peer_perf_smoke`
- `PERF_CLIENT_TYPE`
  default: `ios`
- `PERF_WARMUP_ITERATIONS`
  default: `3`
- `PERF_SEQUENTIAL_ITERATIONS`
  default: `15`
- `PERF_BURST_REQUESTS`
  default: `0`
- `PERF_BURST_CONCURRENCY`
  default: `3`
- `PERF_CHAT_LIST_LIMIT`
  default: `20`

### 12.5 What The Script Does

For each measured journey:

1. authenticate two dev users via the existing OTP flow
2. create or reuse a direct chat using `POST /v1/chats/direct`
3. run warmup requests
4. run sequential measured requests
5. optionally run a very small parallel burst
6. print:
   - min
   - p50
   - p95
   - p99
   - max
   - error rate

The script also emits a final JSON block so results can be copied into notes or compared across runs.

### 12.6 How To Interpret Results

Use this smoke as a baseline, not as a final load test.

Healthy first-pass signals:

- error rate remains `0%`
- `GET /v1/chats` stays stable between repeated local runs
- `POST /v1/messages` does not show large p95 spikes under the same dataset
- burst phase does not immediately trigger timeouts or auth failures

Warning signals:

- p95 or p99 are much worse than p50 even on a tiny local run
- repeated runs drift upward with no code change
- `POST /v1/messages` latency grows quickly when the small burst is enabled
- `GET /v1/chats` becomes unstable after message volume increases in the same chat set

### 12.7 Safe Assumptions And Limitations

Current assumptions:

- dev OTP code `123456` is enabled
- gateway auth secret matches service auth secret in local dev
- running against local/dev data, not production
- direct chat creation is idempotent enough for repeated smoke runs

Limitations:

- this is not a sustained load test
- it does not isolate DB time from service aggregation time
- repeated `POST /v1/messages` will intentionally add message rows, so latency should be compared across short runs, not infinitely growing datasets
- it measures end-to-end request duration from the script side, not server-side spans

### 12.8 Next Checks After This Baseline

After the first baseline is stable, the next likely bottlenecks to validate are:

- `GET /v1/chats` growth versus number of chats and peer profiles
- `GET /v1/chats/:chatId/messages` growth versus message count
- projection lag and summary freshness during repeated sends
- reconnect-driven inbox recovery on the mobile client
- inbox store update cost under realtime event bursts

## 13. Chats Growth Smoke

The repository now also includes a focused growth smoke for `GET /v1/chats`:

- script: [scripts/perf/run-chats-growth-smoke.mjs](/Users/judyannmartos/Movies/telegram/scripts/perf/run-chats-growth-smoke.mjs)
- npm command: `npm run perf:smoke:chats-growth`

This script is intentionally narrow. It exists to answer one question:

How does `GET /v1/chats` latency change as the number of direct chats and messages grows?

### 13.1 Safety Guard

This smoke must not run against production.

The script refuses to start unless `API_BASE_URL` points to a local or private-network development host such as:

- `localhost`
- `127.0.0.1`
- `0.0.0.0`
- `host.docker.internal`
- `*.local`
- private IPv4 ranges like `10.x.x.x`, `192.168.x.x`, `172.16.x.x` to `172.31.x.x`

If the URL looks public or production-like, the script exits with an error.

### 13.2 Profiles

Default profiles:

- `small`: `5` chats, `1` message per chat
- `medium`: `50` chats, `5` messages per chat
- `large`: `200` chats, `10` messages per chat

Important limitation from the real API:

- `GET /v1/chats` currently accepts `limit <= 100`

That means:

- `large` can create `200` chats
- but the measured request still returns at most `100` chats in one call

This is still useful, because it shows whether latency starts degrading as the user owns more chats, but it is not yet a full "return 200 chats" benchmark.

### 13.3 What The Script Does

For the selected profile the script:

1. authenticates a dedicated perf owner user
2. creates or reuses the requested number of direct chats
3. sends the requested number of messages into each chat
4. runs warmup requests for `GET /v1/chats`
5. measures `GET /v1/chats` repeatedly
6. prints:
   - min
   - p50
   - p95
   - p99
   - max
   - error rate
7. saves the full JSON result under `artifacts/perf`

### 13.4 How To Run

Default `small` profile:

```bash
npm run perf:smoke:chats-growth
```

Explicit profiles:

```bash
PERF_GROWTH_PROFILE=small npm run perf:smoke:chats-growth
PERF_GROWTH_PROFILE=medium npm run perf:smoke:chats-growth
PERF_GROWTH_PROFILE=large npm run perf:smoke:chats-growth
```

Example with explicit base URL and custom dataset:

```bash
API_BASE_URL=http://localhost:3000/v1 \
PERF_GROWTH_PROFILE=medium \
PERF_GROWTH_CHAT_COUNT=60 \
PERF_GROWTH_MESSAGES_PER_CHAT=3 \
PERF_GROWTH_MEASUREMENT_ITERATIONS=30 \
npm run perf:smoke:chats-growth
```

### 13.5 Environment Variables

- `API_BASE_URL`
  default: `http://localhost:3000/v1`
- `PERF_GROWTH_PROFILE`
  default: `small`
- `PERF_GROWTH_CHAT_COUNT`
  overrides the selected profile chat count
- `PERF_GROWTH_MESSAGES_PER_CHAT`
  overrides the selected profile message count
- `PERF_GROWTH_CHAT_LIST_LIMIT`
  default: `min(chatCount, 100)`
- `PERF_GROWTH_WARMUP_ITERATIONS`
  default: `5`
- `PERF_GROWTH_MEASUREMENT_ITERATIONS`
  default: `20`
- `PERF_OUTPUT_DIR`
  default: `artifacts/perf`
- `PERF_DATA_TAG`
  default: the selected profile name
- `PERF_OWNER_DEVICE_ID`
  default: `device_owner_chats_growth_<profile>`
- `PERF_PEER_DEVICE_ID_PREFIX`
  default: `device_peer_chats_growth_<profile>`
- `PERF_CLIENT_TYPE`
  default: `ios`
- `SEED_OWNER_PHONE_NUMBER`
  optional override for the owner phone number

### 13.6 Interpreting Results

Run the same script for `small`, `medium`, and `large`, then compare:

- p50
- p95
- p99
- error rate

What to look for:

- if latency grows slowly and roughly proportionally, the bottleneck may be expected aggregation cost
- if latency jumps sharply between profiles, the code likely crosses a threshold such as inefficient summary lookups, profile fanout, or query-plan degradation
- if p50 stays acceptable but p95/p99 explode, the system likely has variance problems rather than a uniformly slow path
- if error rate appears only on `medium` or `large`, the issue is no longer just performance; it is capacity or timeout behavior

### 13.7 What Conclusions To Draw

If growth looks roughly linear:

- measure which dependency contributes most
- add server-side timing around chat-service aggregation and message/profile lookups
- then decide whether caching or projection reads are enough

If growth bends upward sharply:

- inspect chat list query patterns first
- inspect message summary fetching second
- inspect profile lookup fanout third
- confirm whether work scales with total chats, returned chats, or unique users

If results barely change between profiles:

- the backend list path may still be acceptable at this scale
- the next likely bottlenecks are thread load, message search, projection lag, or mobile rendering

### 13.8 Warnings And Cleanup Notes

- `large` creates a lot of local test data; use it intentionally
- repeated runs with the same `PERF_DATA_TAG` will reuse the same phone-number namespace and continue adding messages
- for cleaner comparisons, either reset local databases or use a new `PERF_DATA_TAG`
- do not treat this script as a production benchmark; it is an early growth signal for local and dev environments
