import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { performance } from 'node:perf_hooks';

const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000/v1';
const clientType = process.env.PERF_CLIENT_TYPE ?? 'ios';
const outputDir = process.env.PERF_OUTPUT_DIR ?? path.join(process.cwd(), 'artifacts', 'perf');
const dataTag = normalizeTag(process.env.PERF_DATA_TAG ?? 'load500');
const userCount = readPositiveInt('PERF_LOAD_USERS', 500);
const setupConcurrency = readPositiveInt('PERF_LOAD_SETUP_CONCURRENCY', 25);
const messageListLimit = readPositiveInt('PERF_LOAD_MESSAGE_LIST_LIMIT', 20);
const chatListLimit = readPositiveInt('PERF_LOAD_CHAT_LIST_LIMIT', 20);
const healthTimeoutMs = readPositiveInt('PERF_HEALTH_TIMEOUT_MS', 2000);
const scenarioStartSkewMs = readNonNegativeInt('PERF_LOAD_START_SKEW_MS', 0);

async function main() {
  assertSafeBaseUrl(baseUrl);

  if (userCount % 2 !== 0) {
    throw new Error(`PERF_LOAD_USERS must be even so users can be paired into direct chats. Received: ${userCount}`);
  }

  console.warn(`[perf] concurrent messenger load test will create ${userCount} local/dev users and ${userCount / 2} direct chats.`);
  console.warn('[perf] do not run this against production.');

  const startedAt = new Date().toISOString();
  const gatewayHealth = await probeGatewayHealth().catch((error) => ({
    ok: false,
    error: error instanceof Error ? error.message : String(error),
  }));

  console.log(`[perf] baseUrl=${baseUrl}`);
  console.log(`[perf] users=${userCount} chats=${userCount / 2} setupConcurrency=${setupConcurrency} dataTag=${dataTag}`);

  const users = await prepareUsers(userCount);
  const chats = await prepareChats(users);

  console.log(`[perf] setup complete, starting concurrent scenario for ${users.length} users`);

  const scenarioResults = await runConcurrentScenario(users, chats);

  const result = {
    startedAt,
    finishedAt: new Date().toISOString(),
    baseUrl,
    setup: {
      gatewayHealth,
      userCount,
      chatCount: chats.length,
      setupConcurrency,
      dataTag,
      chatListLimit,
      messageListLimit,
      sampleUsers: users.slice(0, 5).map((user) => ({
        userId: user.user.id,
        phoneNumber: user.phoneNumber,
        chatId: user.chatId,
        peerUserId: user.peerUserId,
      })),
      sampleChats: chats.slice(0, 5),
    },
    summary: {
      scenario: summarizeMeasurements(scenarioResults.scenarioMeasurements),
      getChats: summarizeMeasurements(scenarioResults.getChatsMeasurements),
      getMessages: summarizeMeasurements(scenarioResults.getMessagesMeasurements),
      postMessages: summarizeMeasurements(scenarioResults.postMessagesMeasurements),
    },
  };

  const outputPath = await writeResultFile(result);
  console.log(`[perf] saved result JSON to ${outputPath}`);

  console.log('\n== Concurrent Messenger Load Result ==');
  console.log(JSON.stringify(result, null, 2));
}

async function prepareUsers(count) {
  const users = new Array(count);

  await runWithConcurrency(count, setupConcurrency, async (index) => {
    const phoneNumber = buildPhoneNumber(index, dataTag);
    const deviceId = `device_load_${dataTag}_${index + 1}`;
    const auth = await authenticate(phoneNumber, deviceId);

    users[index] = {
      ...auth,
      phoneNumber,
      index,
      chatId: null,
      peerUserId: null,
    };

    if ((index + 1) % 50 === 0 || index === count - 1) {
      console.log(`[perf] authenticated ${index + 1}/${count} users`);
    }
  });

  return users;
}

async function prepareChats(users) {
  const chats = [];

  await runWithConcurrency(userCount / 2, setupConcurrency, async (pairIndex) => {
    const leftIndex = pairIndex * 2;
    const rightIndex = leftIndex + 1;
    const leftUser = users[leftIndex];
    const rightUser = users[rightIndex];

    const chatId = await ensureDirectChat(leftUser, rightUser.user.id);

    leftUser.chatId = chatId;
    leftUser.peerUserId = rightUser.user.id;
    rightUser.chatId = chatId;
    rightUser.peerUserId = leftUser.user.id;

    chats[pairIndex] = {
      chatId,
      leftUserId: leftUser.user.id,
      rightUserId: rightUser.user.id,
    };

    if ((pairIndex + 1) % 25 === 0 || pairIndex === userCount / 2 - 1) {
      console.log(`[perf] prepared ${pairIndex + 1}/${userCount / 2} chats`);
    }
  });

  return chats;
}

async function runConcurrentScenario(users) {
  const scenarioMeasurements = [];
  const getChatsMeasurements = [];
  const getMessagesMeasurements = [];
  const postMessagesMeasurements = [];

  const startGate = deferred();

  const tasks = users.map((user, index) => (async () => {
    if (scenarioStartSkewMs > 0) {
      await sleep((index % 10) * scenarioStartSkewMs);
    }

    await startGate.promise;

    const scenarioStartedAt = performance.now();

    const getChatsResult = await timedRequest('/chats?limit=' + encodeURIComponent(String(chatListLimit)), {
      method: 'GET',
      headers: user.headers,
    });
    getChatsMeasurements.push(getChatsResult);

    const getMessagesResult = await timedRequest(`/chats/${user.chatId}/messages?limit=${encodeURIComponent(String(messageListLimit))}`, {
      method: 'GET',
      headers: user.headers,
    });
    getMessagesMeasurements.push(getMessagesResult);

    const postMessagesResult = await timedRequest('/messages', {
      method: 'POST',
      headers: user.headers,
      body: JSON.stringify({
        chatId: user.chatId,
        clientMessageId: `load_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 10)}`,
        type: 'text',
        text: `load test message ${index + 1}`,
        attachments: [],
      }),
    });
    postMessagesMeasurements.push(postMessagesResult);

    const scenarioDurationMs = performance.now() - scenarioStartedAt;
    scenarioMeasurements.push({
      ok: getChatsResult.ok && getMessagesResult.ok && postMessagesResult.ok,
      durationMs: scenarioDurationMs,
      status: null,
      error: getFirstError([getChatsResult, getMessagesResult, postMessagesResult]),
    });
  })());

  const concurrentStartAt = performance.now();
  startGate.resolve();
  await Promise.all(tasks);
  const totalWallClockMs = roundNumber(performance.now() - concurrentStartAt);

  console.log(`[perf] concurrent wall clock: ${totalWallClockMs}ms`);
  console.log('[perf] scenario summary:');
  printScenarioSummary(summarizeMeasurements(scenarioMeasurements));
  console.log('[perf] GET /v1/chats summary:');
  printScenarioSummary(summarizeMeasurements(getChatsMeasurements));
  console.log('[perf] GET /v1/chats/:chatId/messages summary:');
  printScenarioSummary(summarizeMeasurements(getMessagesMeasurements));
  console.log('[perf] POST /v1/messages summary:');
  printScenarioSummary(summarizeMeasurements(postMessagesMeasurements));

  return {
    totalWallClockMs,
    scenarioMeasurements,
    getChatsMeasurements,
    getMessagesMeasurements,
    postMessagesMeasurements,
  };
}

function getFirstError(results) {
  for (const result of results) {
    if (!result.ok) {
      return result.error;
    }
  }

  return null;
}

async function runWithConcurrency(totalCount, concurrency, worker) {
  let nextIndex = 0;

  const workers = Array.from({ length: Math.min(concurrency, totalCount) }, async () => {
    while (true) {
      const currentIndex = nextIndex;
      nextIndex += 1;

      if (currentIndex >= totalCount) {
        return;
      }

      await worker(currentIndex);
    }
  });

  await Promise.all(workers);
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

async function timedRequest(pathname, init) {
  const started = performance.now();

  try {
    const response = await fetch(`${baseUrl}${pathname}`, init);
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
      error: null,
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

async function request(pathname, init = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, init);
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
    minMs: durations.length > 0 ? roundNumber(Math.min(...durations)) : 0,
    maxMs: durations.length > 0 ? roundNumber(Math.max(...durations)) : 0,
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

async function writeResultFile(result) {
  await mkdir(outputDir, { recursive: true });
  const fileName = `concurrent-messenger-load-${userCount}-${timestampToken(new Date())}.json`;
  const filePath = path.join(outputDir, fileName);
  await writeFile(filePath, JSON.stringify(result, null, 2) + '\n', 'utf8');
  return filePath;
}

function buildPhoneNumber(index, tag) {
  const hash = hashString(`${tag}:${index}`);
  const exchangeLeadingDigit = String(2 + (hash % 8));
  const subscriberDigits = String(Math.floor(hash / 8) % 1_000_000).padStart(6, '0');
  return `+1415${exchangeLeadingDigit}${subscriberDigits}`;
}

function hashString(value) {
  let hash = 0;

  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1_000_000_000;
  }

  return hash;
}

function normalizeTag(value) {
  const normalized = value.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
  return normalized.length > 0 ? normalized : 'default';
}

function timestampToken(date) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function deferred() {
  let resolve;
  const promise = new Promise((innerResolve) => {
    resolve = innerResolve;
  });

  return { promise, resolve };
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

function assertSafeBaseUrl(value) {
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();

  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === 'host.docker.internal' ||
    hostname.endsWith('.local') ||
    hostname === '::1' ||
    isPrivateIpv4(hostname)
  ) {
    return;
  }

  throw new Error(
    `Refusing to run concurrent messenger load against non-local API_BASE_URL: ${value}. Use a localhost or private-network dev URL only.`,
  );
}

function isPrivateIpv4(hostname) {
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return false;
  }

  const parts = hostname.split('.').map((value) => Number.parseInt(value, 10));
  const [first, second] = parts;

  if (first === 10) {
    return true;
  }

  if (first === 192 && second === 168) {
    return true;
  }

  return first === 172 && second >= 16 && second <= 31;
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
