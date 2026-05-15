export const appConfig = () => ({
  app: {
    name: 'call-service',
    port: Number.parseInt(process.env.PORT ?? '3007', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  features: {
    callsV1Enabled: process.env.CALLS_V1_ENABLED === 'true',
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  },
  database: {
    url: process.env.CALL_DATABASE_URL ?? '',
  },
  services: {
    chatServiceUrl: process.env.CHAT_SERVICE_URL ?? 'http://localhost:3002',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL ?? 'http://localhost:3004',
    messageServiceUrl: process.env.MESSAGE_SERVICE_URL ?? 'http://localhost:3003',
    notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3008',
  },
  signaling: {
    publicUrl: process.env.CALL_SIGNALING_PUBLIC_URL ?? 'http://localhost:3007/calls',
    tokenTtlSeconds: Number.parseInt(process.env.CALL_SIGNALING_TOKEN_TTL_SECONDS ?? '60', 10),
    ringTimeoutMs: Number.parseInt(process.env.CALL_RING_TIMEOUT_MS ?? '30000', 10),
  },
  cleanup: {
    intervalMs: Number.parseInt(process.env.CALL_STALE_CLEANUP_INTERVAL_MS ?? '30000', 10),
    staleSetupTimeoutMs: Number.parseInt(process.env.CALL_STALE_SETUP_TIMEOUT_MS ?? '120000', 10),
    staleActiveTimeoutMs: Number.parseInt(process.env.CALL_STALE_ACTIVE_TIMEOUT_MS ?? '600000', 10),
    batchSize: Number.parseInt(process.env.CALL_STALE_CLEANUP_BATCH_SIZE ?? '20', 10),
    disconnectGraceMs: Number.parseInt(process.env.CALL_DISCONNECT_GRACE_MS ?? '45000', 10),
  },
  turn: {
    stunUrl: process.env.CALL_STUN_URL ?? 'stun:localhost:3478',
    turnUrl: process.env.CALL_TURN_URL ?? 'turn:localhost:3478?transport=udp',
    sharedSecret: process.env.CALL_TURN_SHARED_SECRET ?? '',
    realm: process.env.CALL_TURN_REALM ?? 'telegram.local',
    credentialTtlSeconds: Number.parseInt(process.env.CALL_TURN_CREDENTIAL_TTL_SECONDS ?? '3600', 10),
  },
  redis: {
    url: process.env.REDIS_URL ?? '',
  },
  outbox: {
    rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'telegram.events',
    pollIntervalMs: Number.parseInt(process.env.OUTBOX_POLL_INTERVAL_MS ?? '2000', 10),
    batchSize: Number.parseInt(process.env.OUTBOX_BATCH_SIZE ?? '50', 10),
    lockTimeoutMs: Number.parseInt(process.env.OUTBOX_LOCK_TIMEOUT_MS ?? '30000', 10),
  },
});
