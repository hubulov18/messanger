import { performance } from 'node:perf_hooks';

const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000/v1';
const ownerPhoneNumber = process.env.SEED_OWNER_PHONE_NUMBER ?? '+14155552671';
const peerPhoneNumber = process.env.SEED_MATCHED_PHONE_NUMBER ?? '+14155552672';
const ownerDeviceId = process.env.PERF_OWNER_DEVICE_ID ?? 'device_owner_perf_smoke';
const peerDeviceId = process.env.PERF_PEER_DEVICE_ID ?? 'device_peer_perf_smoke';
const clientType = process.env.PERF_CLIENT_TYPE ?? 'ios';

const warmupIterations = readPositiveInt('PERF_WARMUP_ITERATIONS', 3);
const sequentialIterations = readPositiveInt('PERF_SEQUENTIAL_ITERATIONS', 15);
const burstRequests = readNonNegativeInt('PERF_BURST_REQUESTS', 0);
const burstConcurrency = readPositiveInt('PERF_BURST_CONCURRENCY', 3);
const chatListLimit = readPositiveInt('PERF_CHAT_LIST_LIMIT', 20);
const healthTimeoutMs = readPositiveInt('PERF_HEALTH_TIMEOUT_MS', 2000);

async function main() {
  const startedAt = new Date().toISOString();
  const gatewayHealth = await probeGatewayHealth().catch((error) => ({
    ok: false,
    error: error instanceof Error ? error.message : String(error),
  }));

  const owner = await authenticate(ownerPhoneNumber, ownerDeviceId);
  const peer = await authenticate(peerPhoneNumber, peerDeviceId);
  const chatId = await ensureDirectChat(owner, peer.user.id);

  const scenarios = [
    {
      key: 'getChats',
      label: 'GET /v1/chats',
      setupNotes: `limit=${chatListLimit}`,
      run: () =>
        timedRequest('/chats?limit=' + encodeURIComponent(String(chatListLimit)), {
          method: 'GET',
          headers: owner.headers,
        }),
    },
    {
      key: 'postMessages',
      label: 'POST /v1/messages',
      setupNotes: `chatId=${chatId}`,
      run: () =>
        timedRequest('/messages', {
          method: 'POST',
          headers: owner.headers,
          body: JSON.stringify({
            chatId,
            clientMessageId: `perf_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
            type: 'text',
            text: `perf baseline ${new Date().toISOString()}`,
            attachments: [],
          }),
        }),
    },
  ];

  const results = [];

  for (const scenario of scenarios) {
    console.log(`\n== ${scenario.label} ==`);
    console.log(`setup: ${scenario.setupNotes}`);
    console.log(`warmup: ${warmupIterations}, sequential: ${sequentialIterations}, burstRequests: ${burstRequests}, burstConcurrency: ${burstRequests > 0 ? burstConcurrency : 0}`);

    await runWarmupPhase(scenario, warmupIterations);
    const sequential = await runSequentialPhase(scenario, sequentialIterations);
    const burst = burstRequests > 0 ? await runBurstPhase(scenario, burstRequests, burstConcurrency) : [];
    const combined = [...sequential, ...burst];

    const summary = summarizeMeasurements(combined);
    results.push({
      scenario: scenario.label,
      key: scenario.key,
      summary,
      sampleCount: combined.length,
      sequentialCount: sequential.length,
      burstCount: burst.length,
    });

    printScenarioSummary(summary);
  }

  console.log('\n== Perf Baseline Result ==');
  console.log(
    JSON.stringify(
      {
        startedAt,
        baseUrl,
        warmupIterations,
        sequentialIterations,
        burstRequests,
        burstConcurrency: burstRequests > 0 ? burstConcurrency : 0,
        setup: {
          gatewayHealth,
          ownerUserId: owner.user.id,
          peerUserId: peer.user.id,
          chatId,
        },
        results,
      },
      null,
      2,
    ),
  );
}

async function probeGatewayHealth() {
  const gatewayUrl = new URL(baseUrl);
  gatewayUrl.pathname = '/health';
  gatewayUrl.search = '';
  gatewayUrl.hash = '';

  const response = await fetchWithTimeout(gatewayUrl.toString(), { method: 'GET' }, healthTimeoutMs);
  const text = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    body: safeJsonParse(text),
  };
}

async function authenticate(phoneNumber, deviceId) {
  const register = await request('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });

  const verify = await request('/auth/verify-otp', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      challengeId: register.challengeId,
      code: '123456',
      deviceId,
      clientType,
    }),
  });

  return {
    user: verify.user,
    accessToken: verify.accessToken,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${verify.accessToken}`,
      'x-device-id': deviceId,
    },
  };
}

async function ensureDirectChat(owner, participantUserId) {
  const body = await request('/chats/direct', {
    method: 'POST',
    headers: owner.headers,
    body: JSON.stringify({ participantUserId }),
  });

  const chatId = body?.chat?.id;
  if (typeof chatId !== 'string' || chatId.length === 0) {
    throw new Error(`Direct chat setup failed: ${JSON.stringify(body)}`);
  }

  return chatId;
}

async function runWarmupPhase(scenario, iterations) {
  for (let index = 0; index < iterations; index += 1) {
    const result = await scenario.run();
    if (!result.ok) {
      throw new Error(`Warmup failed for ${scenario.label}: ${formatMeasurementError(result)}`);
    }
  }
}

async function runSequentialPhase(scenario, iterations) {
  const measurements = [];

  for (let index = 0; index < iterations; index += 1) {
    const measurement = await scenario.run();
    measurements.push(measurement);
  }

  return measurements;
}

async function runBurstPhase(scenario, requestCount, concurrency) {
  const measurements = [];
  let nextIndex = 0;

  const workers = Array.from({ length: Math.min(concurrency, requestCount) }, async () => {
    while (nextIndex < requestCount) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      const measurement = await scenario.run();
      measurements[currentIndex] = measurement;
    }
  });

  await Promise.all(workers);
  return measurements;
}

async function timedRequest(path, init) {
  const started = performance.now();

  try {
    const response = await fetch(`${baseUrl}${path}`, init);
    const text = await response.text();
    const durationMs = performance.now() - started;
    const body = safeJsonParse(text);

    if (!response.ok) {
      return {
        ok: false,
        durationMs,
        status: response.status,
        error: body,
      };
    }

    return {
      ok: true,
      durationMs,
      status: response.status,
    };
  } catch (error) {
    return {
      ok: false,
      durationMs: performance.now() - started,
      status: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function request(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  const body = safeJsonParse(text);

  if (!response.ok) {
    throw new Error(JSON.stringify({ status: response.status, body }, null, 2));
  }

  return body;
}

async function fetchWithTimeout(url, init, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function summarizeMeasurements(measurements) {
  const durations = measurements.map((measurement) => measurement.durationMs);
  const successCount = measurements.filter((measurement) => measurement.ok).length;
  const errorCount = measurements.length - successCount;

  return {
    totalRequests: measurements.length,
    successCount,
    errorCount,
    errorRate: measurements.length === 0 ? 0 : errorCount / measurements.length,
    minMs: roundNumber(Math.min(...durations)),
    maxMs: roundNumber(Math.max(...durations)),
    p50Ms: percentile(durations, 50),
    p95Ms: percentile(durations, 95),
    p99Ms: percentile(durations, 99),
    failures: measurements
      .filter((measurement) => !measurement.ok)
      .slice(0, 5)
      .map((measurement) => ({
        status: measurement.status,
        durationMs: roundNumber(measurement.durationMs),
        error: measurement.error,
      })),
  };
}

function printScenarioSummary(summary) {
  console.log(`requests: ${summary.totalRequests}, success: ${summary.successCount}, errors: ${summary.errorCount}, errorRate: ${(summary.errorRate * 100).toFixed(2)}%`);
  console.log(`latency(ms): min=${summary.minMs} p50=${summary.p50Ms} p95=${summary.p95Ms} p99=${summary.p99Ms} max=${summary.maxMs}`);

  if (summary.failures.length > 0) {
    console.log('sample failures:');
    for (const failure of summary.failures) {
      console.log(`- status=${failure.status ?? 'n/a'} durationMs=${failure.durationMs} error=${JSON.stringify(failure.error)}`);
    }
  }
}

function percentile(values, percentileValue) {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil((percentileValue / 100) * sorted.length) - 1);
  return roundNumber(sorted[index]);
}

function safeJsonParse(text) {
  if (!text || !text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function readPositiveInt(name, fallback) {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer. Received: ${value}`);
  }

  return parsed;
}

function readNonNegativeInt(name, fallback) {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${name} must be a non-negative integer. Received: ${value}`);
  }

  return parsed;
}

function roundNumber(value) {
  return Number(value.toFixed(2));
}

function formatMeasurementError(result) {
  return JSON.stringify({
    status: result.status,
    durationMs: roundNumber(result.durationMs),
    error: result.error,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
