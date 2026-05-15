type EnvInput = Record<string, string | undefined>;

type EnvOutput = {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  CALLS_V1_ENABLED: string | undefined;
  CALL_DATABASE_URL: string;
  CHAT_SERVICE_URL: string | undefined;
  PROFILE_SERVICE_URL: string | undefined;
  MESSAGE_SERVICE_URL: string | undefined;
  NOTIFICATION_SERVICE_URL: string | undefined;
  REDIS_URL: string | undefined;
  JWT_ACCESS_SECRET: string;
  CALL_SIGNALING_PUBLIC_URL: string | undefined;
  CALL_SIGNALING_TOKEN_TTL_SECONDS: string | undefined;
  CALL_RING_TIMEOUT_MS: string | undefined;
  CALL_STALE_CLEANUP_INTERVAL_MS: string | undefined;
  CALL_STALE_SETUP_TIMEOUT_MS: string | undefined;
  CALL_STALE_ACTIVE_TIMEOUT_MS: string | undefined;
  CALL_STALE_CLEANUP_BATCH_SIZE: string | undefined;
  CALL_DISCONNECT_GRACE_MS: string | undefined;
  CALL_STUN_URL: string | undefined;
  CALL_TURN_URL: string | undefined;
  CALL_TURN_SHARED_SECRET: string | undefined;
  CALL_TURN_REALM: string | undefined;
  CALL_TURN_CREDENTIAL_TTL_SECONDS: string | undefined;
  RABBITMQ_URL: string | undefined;
  RABBITMQ_EXCHANGE: string | undefined;
  OUTBOX_POLL_INTERVAL_MS: string | undefined;
  OUTBOX_BATCH_SIZE: string | undefined;
  OUTBOX_LOCK_TIMEOUT_MS: string | undefined;
};

export function validateEnv(config: EnvInput): EnvOutput {
  const databaseUrl = config.CALL_DATABASE_URL?.trim();
  const jwtAccessSecret = config.JWT_ACCESS_SECRET?.trim();

  if (!databaseUrl) {
    throw new Error('CALL_DATABASE_URL is required');
  }

  if (!jwtAccessSecret) {
    throw new Error('JWT_ACCESS_SECRET is required');
  }

  return {
    PORT: config.PORT,
    NODE_ENV: config.NODE_ENV,
    CALLS_V1_ENABLED: config.CALLS_V1_ENABLED,
    CALL_DATABASE_URL: databaseUrl,
    CHAT_SERVICE_URL: config.CHAT_SERVICE_URL,
    PROFILE_SERVICE_URL: config.PROFILE_SERVICE_URL,
    MESSAGE_SERVICE_URL: config.MESSAGE_SERVICE_URL,
    NOTIFICATION_SERVICE_URL: config.NOTIFICATION_SERVICE_URL,
    REDIS_URL: config.REDIS_URL,
    JWT_ACCESS_SECRET: jwtAccessSecret,
    CALL_SIGNALING_PUBLIC_URL: config.CALL_SIGNALING_PUBLIC_URL,
    CALL_SIGNALING_TOKEN_TTL_SECONDS: config.CALL_SIGNALING_TOKEN_TTL_SECONDS,
    CALL_RING_TIMEOUT_MS: config.CALL_RING_TIMEOUT_MS,
    CALL_STALE_CLEANUP_INTERVAL_MS: config.CALL_STALE_CLEANUP_INTERVAL_MS,
    CALL_STALE_SETUP_TIMEOUT_MS: config.CALL_STALE_SETUP_TIMEOUT_MS,
    CALL_STALE_ACTIVE_TIMEOUT_MS: config.CALL_STALE_ACTIVE_TIMEOUT_MS,
    CALL_STALE_CLEANUP_BATCH_SIZE: config.CALL_STALE_CLEANUP_BATCH_SIZE,
    CALL_DISCONNECT_GRACE_MS: config.CALL_DISCONNECT_GRACE_MS,
    CALL_STUN_URL: config.CALL_STUN_URL,
    CALL_TURN_URL: config.CALL_TURN_URL,
    CALL_TURN_SHARED_SECRET: config.CALL_TURN_SHARED_SECRET,
    CALL_TURN_REALM: config.CALL_TURN_REALM,
    CALL_TURN_CREDENTIAL_TTL_SECONDS: config.CALL_TURN_CREDENTIAL_TTL_SECONDS,
    RABBITMQ_URL: config.RABBITMQ_URL,
    RABBITMQ_EXCHANGE: config.RABBITMQ_EXCHANGE,
    OUTBOX_POLL_INTERVAL_MS: config.OUTBOX_POLL_INTERVAL_MS,
    OUTBOX_BATCH_SIZE: config.OUTBOX_BATCH_SIZE,
    OUTBOX_LOCK_TIMEOUT_MS: config.OUTBOX_LOCK_TIMEOUT_MS,
  };
}
