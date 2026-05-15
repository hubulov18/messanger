import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import path from 'node:path';

const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000/v1';
const profileName = (process.env.PERF_GROWTH_PROFILE ?? 'small').trim().toLowerCase();
const clientType = process.env.PERF_CLIENT_TYPE ?? 'ios';
const ownerDeviceId = process.env.PERF_OWNER_DEVICE_ID ?? `device_owner_chats_growth_${profileName}`;
const peerDeviceIdPrefix = process.env.PERF_PEER_DEVICE_ID_PREFIX ?? `device_peer_chats_growth_${profileName}`;
const dataTag = normalizeTag(process.env.PERF_DATA_TAG ?? profileName);
const outputDir = process.env.PERF_OUTPUT_DIR ?? path.join(process.cwd(), 'artifacts', 'perf');
const warmupIterations = readPositiveInt('PERF_GROWTH_WARMUP_ITERATIONS', 5);
const measurementIterations = readPositiveInt('PERF_GROWTH_MEASUREMENT_ITERATIONS', 20);
const healthTimeoutMs = readPositiveInt('PERF_HEALTH_TIMEOUT_MS', 2000);

const defaultProfiles = {
  small: { chatCount: 5, messagesPerChat: 1 },
  medium: { chatCount: 50, messagesPerChat: 5 },
  large: { chatCount: 200, messagesPerChat: 10 },
};

async function main() {
  assertSafeBaseUrl(baseUrl);

  const profile = resolveProfile(profileName);
  const ownerPhoneNumber = process.env.SEED_OWNER_PHONE_NUMBER ?? buildPhoneNumber(0, dataTag);
  const configuredLimit = readPositiveInt('PERF_GROWTH_CHAT_LIST_LIMIT', Math.min(profile.chatCount, 100));
  const measureLimit = Math.min(profile.chatCount, configuredLimit, 100);

  if (profileName === 'large') {
    console.warn('[perf] large profile selected. This run will create many test users, chats, and messages in the local/dev database.');
  }

  console.log(`[perf] baseUrl=${baseUrl}`);
  console.log(`[perf] profile=${profileName} chats=${profile.chatCount} messagesPerChat=${profile.messagesPerChat} measureLimit=${measureLimit}`);
  console.log(`[perf] dataTag=${dataTag}`);

  const startedAt = new Date().toISOString();
  const gatewayHealth = await probeGatewayHealth().catch((error) => ({
    ok: false,
    error: error instanceof Error ? error.message : String(error),
  }));

  const owner = await authenticate(ownerPhoneNumber, ownerDeviceId);

  console.log(`[perf] authenticated owner user ${owner.user.id}`);
  console.log(`[perf] preparing dataset...`);

  const setupStarted = performance.now();
  const chats = [];

  for (let index = 0; index < profile.chatCount; index += 1) {
    const peerPhoneNumber = buildPhoneNumber(index + 1, dataTag);
    const peer = await authenticate(peerPhoneNumber, `${peerDeviceIdPrefix}_${index + 1}`);
    const chatId = await ensureDirectChat(owner, peer.user.id);
    chats.push({
      chatId,
      peerUserId: peer.user.id,
      peerPhoneNumber,
    });

    for (let messageIndex = 0; messageIndex < profile.messagesPerChat; messageIndex += 1) {
      await sendTextMessage(owner.headers, chatId, `growth:${profileName}:${index + 1}:${messageIndex + 1}:${Date.now()}`);
    }

    if ((index + 1) % 10 === 0 || index === profile.chatCount - 1) {
      console.log(`[perf] prepared ${index + 1}/${profile.chatCount} chats`);
    }
  }

  const setupDurationMs = roundNumber(performance.now() - setupStarted);
  console.log(`[perf] dataset prepared in ${setupDurationMs}ms`);

  const scenario = {
    key: 'getChatsGrowth',
    label: 'GET /v1/chats growth',
    run: () =>
      timedRequest('/chats?limit=' + encodeURIComponent(String(measureLimit)), {
        method: 'GET',
        headers: owner.headers,
      }),
  };

  console.log(`[perf] warmup iterations=${warmupIterations}`);
  await runWarmupPhase(scenario, warmupIterations);

  console.log(`[perf] measuring GET /v1/chats for ${measurementIterations} iterations`);
  const measurements = await runSequentialPhase(scenario, measurementIterations);
  const summary = summarizeMeasurements(measurements);
  printScenarioSummary(summary);

  const result = {
    startedAt,
    finishedAt: new Date().toISOString(),
    baseUrl,
    profile: {
      name: profileName,
      chatCount: profile.chatCount,
      messagesPerChat: profile.messagesPerChat,
      measureLimit,
      returnedChatsMayBeCappedByEndpoint: measureLimit < profile.chatCount,
    },
    setup: {
      gatewayHealth,
      ownerUserId: owner.user.id,
      ownerPhoneNumber,
      dataTag,
      setupDurationMs,
      createdChatCount: chats.length,
      createdMessageCount: chats.length * profile.messagesPerChat,
      sampleChatIds: chats.slice(0, 10).map((chat) => chat.chatId),
    },
    execution: {
      warmupIterations,
      measurementIterations,
    },
    summary,
  };

  const outputPath = await writeResultFile(result);
  console.log(`[perf] saved result JSON to ${outputPath}`);

  console.log('\n== Chats Growth Result ==');
  console.log(JSON.stringify(result, null, 2));
}

function resolveProfile(name) {
  if (!(name in defaultProfiles)) {
    throw new Error(`Unsupported PERF_GROWTH_PROFILE: ${name}. Expected one of: ${Object.keys(defaultProfiles).join(', ')}`);
  }

  const defaults = defaultProfiles[name];
  return {
    chatCount: readPositiveInt('PERF_GROWTH_CHAT_COUNT', defaults.chatCount),
    messagesPerChat: readPositiveInt('PERF_GROWTH_MESSAGES_PER_CHAT', defaults.messagesPerChat),
  };
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
    `Refusing to run perf growth smoke against non-local API_BASE_URL: ${value}. Use a localhost or private-network dev URL only.`,
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

async function sendTextMessage(headers, chatId, messageText) {
  return request('/messages', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      chatId,
      clientMessageId: `growth_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
      type: 'text',
      text: messageText,
      attachments: [],
    }),
  });
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

async function writeResultFile(result) {
  await mkdir(outputDir, { recursive: true });
  const fileName = `chats-growth-${profileName}-${timestampToken(new Date())}.json`;
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
