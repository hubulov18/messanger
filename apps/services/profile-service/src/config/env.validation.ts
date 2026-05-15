type EnvInput = Record<string, string | undefined>;

type EnvOutput = {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  PROFILE_DATABASE_URL: string | undefined;
  JWT_ACCESS_SECRET: string | undefined;
  IDENTITY_SERVICE_URL: string | undefined;
  CONTACTS_SERVICE_URL: string | undefined;
  CHAT_SERVICE_URL: string | undefined;
  RABBITMQ_URL: string | undefined;
  RABBITMQ_EXCHANGE: string | undefined;
  OUTBOX_POLL_INTERVAL_MS: string | undefined;
  OUTBOX_BATCH_SIZE: string | undefined;
  OUTBOX_LOCK_TIMEOUT_MS: string | undefined;
};

export function validateEnv(config: EnvInput): EnvOutput {
  return {
    PORT: config.PORT,
    NODE_ENV: config.NODE_ENV,
    PROFILE_DATABASE_URL: config.PROFILE_DATABASE_URL,
    JWT_ACCESS_SECRET: config.JWT_ACCESS_SECRET,
    IDENTITY_SERVICE_URL: config.IDENTITY_SERVICE_URL,
    CONTACTS_SERVICE_URL: config.CONTACTS_SERVICE_URL,
    CHAT_SERVICE_URL: config.CHAT_SERVICE_URL,
    RABBITMQ_URL: config.RABBITMQ_URL,
    RABBITMQ_EXCHANGE: config.RABBITMQ_EXCHANGE,
    OUTBOX_POLL_INTERVAL_MS: config.OUTBOX_POLL_INTERVAL_MS,
    OUTBOX_BATCH_SIZE: config.OUTBOX_BATCH_SIZE,
    OUTBOX_LOCK_TIMEOUT_MS: config.OUTBOX_LOCK_TIMEOUT_MS,
  };
}
