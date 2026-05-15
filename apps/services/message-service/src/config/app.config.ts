export const appConfig = () => ({
  app: {
    name: 'message-service',
    port: Number.parseInt(process.env.PORT ?? '3003', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  database: {
    url: process.env.MESSAGE_DATABASE_URL ?? '',
  },
  services: {
    chatServiceUrl: process.env.CHAT_SERVICE_URL ?? 'http://localhost:3002',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL ?? 'http://localhost:3004',
    notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3008',
    directMessageBlockPolicyCacheTtlMs: Number.parseInt(
      process.env.DIRECT_MESSAGE_BLOCK_POLICY_CACHE_TTL_MS ?? '1000',
      10,
    ),
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  },
  outbox: {
    rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'telegram.events',
    pollIntervalMs: Number.parseInt(process.env.OUTBOX_POLL_INTERVAL_MS ?? '2000', 10),
    batchSize: Number.parseInt(process.env.OUTBOX_BATCH_SIZE ?? '50', 10),
    lockTimeoutMs: Number.parseInt(process.env.OUTBOX_LOCK_TIMEOUT_MS ?? '30000', 10),
  },
  projection: {
    chatSummaryPollIntervalMs: Number.parseInt(process.env.CHAT_SUMMARY_PROJECTION_POLL_INTERVAL_MS ?? '2000', 10),
    chatSummaryBatchSize: Number.parseInt(process.env.CHAT_SUMMARY_PROJECTION_BATCH_SIZE ?? '100', 10),
    chatSummaryMaxBatchesPerTick: Number.parseInt(
      process.env.CHAT_SUMMARY_PROJECTION_MAX_BATCHES_PER_TICK ?? '20',
      10,
    ),
  },
  instrumentation: {
    slowRequestThresholdMs: Number.parseInt(process.env.SLOW_REQUEST_THRESHOLD_MS ?? '500', 10),
    slowQueryThresholdMs: Number.parseInt(process.env.SLOW_QUERY_THRESHOLD_MS ?? '200', 10),
  },
});
