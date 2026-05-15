type EnvInput = Record<string, string | undefined>;

type EnvOutput = {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  MESSAGE_DATABASE_URL: string;
  CHAT_SERVICE_URL: string | undefined;
  PROFILE_SERVICE_URL: string | undefined;
  DIRECT_MESSAGE_BLOCK_POLICY_CACHE_TTL_MS: string | undefined;
  JWT_ACCESS_SECRET: string;
  RABBITMQ_URL: string | undefined;
  RABBITMQ_EXCHANGE: string | undefined;
  OUTBOX_POLL_INTERVAL_MS: string | undefined;
  OUTBOX_BATCH_SIZE: string | undefined;
  OUTBOX_LOCK_TIMEOUT_MS: string | undefined;
  CHAT_SUMMARY_PROJECTION_POLL_INTERVAL_MS: string | undefined;
  CHAT_SUMMARY_PROJECTION_BATCH_SIZE: string | undefined;
  CHAT_SUMMARY_PROJECTION_MAX_BATCHES_PER_TICK: string | undefined;
  SLOW_REQUEST_THRESHOLD_MS: string | undefined;
  SLOW_QUERY_THRESHOLD_MS: string | undefined;
};

export function validateEnv(config: EnvInput): EnvOutput {
  const databaseUrl = config.MESSAGE_DATABASE_URL?.trim();
  const jwtAccessSecret = config.JWT_ACCESS_SECRET?.trim();

  if (!databaseUrl) {
    throw new Error('MESSAGE_DATABASE_URL is required');
  }

  if (!jwtAccessSecret) {
    throw new Error('JWT_ACCESS_SECRET is required');
  }

  return {
    PORT: config.PORT,
    NODE_ENV: config.NODE_ENV,
    MESSAGE_DATABASE_URL: databaseUrl,
    CHAT_SERVICE_URL: config.CHAT_SERVICE_URL,
    PROFILE_SERVICE_URL: config.PROFILE_SERVICE_URL,
    DIRECT_MESSAGE_BLOCK_POLICY_CACHE_TTL_MS: config.DIRECT_MESSAGE_BLOCK_POLICY_CACHE_TTL_MS,
    JWT_ACCESS_SECRET: jwtAccessSecret,
    RABBITMQ_URL: config.RABBITMQ_URL,
    RABBITMQ_EXCHANGE: config.RABBITMQ_EXCHANGE,
    OUTBOX_POLL_INTERVAL_MS: config.OUTBOX_POLL_INTERVAL_MS,
    OUTBOX_BATCH_SIZE: config.OUTBOX_BATCH_SIZE,
    OUTBOX_LOCK_TIMEOUT_MS: config.OUTBOX_LOCK_TIMEOUT_MS,
    CHAT_SUMMARY_PROJECTION_POLL_INTERVAL_MS: config.CHAT_SUMMARY_PROJECTION_POLL_INTERVAL_MS,
    CHAT_SUMMARY_PROJECTION_BATCH_SIZE: config.CHAT_SUMMARY_PROJECTION_BATCH_SIZE,
    CHAT_SUMMARY_PROJECTION_MAX_BATCHES_PER_TICK: config.CHAT_SUMMARY_PROJECTION_MAX_BATCHES_PER_TICK,
    SLOW_REQUEST_THRESHOLD_MS: config.SLOW_REQUEST_THRESHOLD_MS,
    SLOW_QUERY_THRESHOLD_MS: config.SLOW_QUERY_THRESHOLD_MS,
  };
}
