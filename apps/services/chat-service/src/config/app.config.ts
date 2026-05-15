const isEnabledByDefault = (value: string | undefined, defaultValue: boolean) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value === 'true';
};

export const appConfig = () => ({
  app: {
    name: 'chat-service',
    port: Number.parseInt(process.env.PORT ?? '3002', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  database: {
    url: process.env.CHAT_DATABASE_URL ?? '',
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  },
  services: {
    profileServiceUrl: process.env.PROFILE_SERVICE_URL ?? 'http://localhost:3004',
    messageServiceUrl: process.env.MESSAGE_SERVICE_URL ?? 'http://localhost:3003',
  },
  outbox: {
    rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'telegram.events',
    pollIntervalMs: Number.parseInt(process.env.OUTBOX_POLL_INTERVAL_MS ?? '2000', 10),
    batchSize: Number.parseInt(process.env.OUTBOX_BATCH_SIZE ?? '50', 10),
    lockTimeoutMs: Number.parseInt(process.env.OUTBOX_LOCK_TIMEOUT_MS ?? '30000', 10),
  },
  projection: {
    chatMembershipPollIntervalMs: Number.parseInt(process.env.CHAT_MEMBERSHIP_PROJECTION_POLL_INTERVAL_MS ?? '2000', 10),
    chatMembershipBatchSize: Number.parseInt(process.env.CHAT_MEMBERSHIP_PROJECTION_BATCH_SIZE ?? '100', 10),
    chatMembershipMaxBatchesPerTick: Number.parseInt(
      process.env.CHAT_MEMBERSHIP_PROJECTION_MAX_BATCHES_PER_TICK ?? '20',
      10,
    ),
  },
  shadowReads: {
    chatSummaryProjectionEnabled: isEnabledByDefault(
      process.env.CHAT_SUMMARY_PROJECTION_SHADOW_READ_ENABLED,
      false,
    ),
  },
  reads: {
    chatSummaryProjectionEnabled: isEnabledByDefault(
      process.env.CHAT_SUMMARY_PROJECTION_READ_ENABLED,
      true,
    ),
  },
  instrumentation: {
    slowRequestThresholdMs: Number.parseInt(process.env.SLOW_REQUEST_THRESHOLD_MS ?? '500', 10),
    slowQueryThresholdMs: Number.parseInt(process.env.SLOW_QUERY_THRESHOLD_MS ?? '200', 10),
  },
});
