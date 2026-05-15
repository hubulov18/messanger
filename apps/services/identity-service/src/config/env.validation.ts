type EnvInput = Record<string, string | undefined>;

type EnvOutput = {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  IDENTITY_DATABASE_URL: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_TTL_SECONDS: string | undefined;
  AUTH_OTP_TTL_SECONDS: string | undefined;
  AUTH_OTP_MAX_ATTEMPTS: string | undefined;
  AUTH_OTP_RESEND_COOLDOWN_SECONDS: string | undefined;
  AUTH_DEV_OTP_ENABLED: string | undefined;
  AUTH_DEV_OTP_CODE: string | undefined;
  RABBITMQ_URL: string | undefined;
  RABBITMQ_EXCHANGE: string | undefined;
  OUTBOX_POLL_INTERVAL_MS: string | undefined;
  OUTBOX_BATCH_SIZE: string | undefined;
  OUTBOX_LOCK_TIMEOUT_MS: string | undefined;
};

export function validateEnv(config: EnvInput): EnvOutput {
  const databaseUrl = config.IDENTITY_DATABASE_URL?.trim();
  const jwtAccessSecret = config.JWT_ACCESS_SECRET?.trim();

  if (!databaseUrl) {
    throw new Error('IDENTITY_DATABASE_URL is required');
  }

  if (!jwtAccessSecret) {
    throw new Error('JWT_ACCESS_SECRET is required');
  }

  return {
    PORT: config.PORT,
    NODE_ENV: config.NODE_ENV,
    IDENTITY_DATABASE_URL: databaseUrl,
    JWT_ACCESS_SECRET: jwtAccessSecret,
    JWT_ACCESS_TTL_SECONDS: config.JWT_ACCESS_TTL_SECONDS,
    AUTH_OTP_TTL_SECONDS: config.AUTH_OTP_TTL_SECONDS,
    AUTH_OTP_MAX_ATTEMPTS: config.AUTH_OTP_MAX_ATTEMPTS,
    AUTH_OTP_RESEND_COOLDOWN_SECONDS: config.AUTH_OTP_RESEND_COOLDOWN_SECONDS,
    AUTH_DEV_OTP_ENABLED: config.AUTH_DEV_OTP_ENABLED,
    AUTH_DEV_OTP_CODE: config.AUTH_DEV_OTP_CODE,
    RABBITMQ_URL: config.RABBITMQ_URL,
    RABBITMQ_EXCHANGE: config.RABBITMQ_EXCHANGE,
    OUTBOX_POLL_INTERVAL_MS: config.OUTBOX_POLL_INTERVAL_MS,
    OUTBOX_BATCH_SIZE: config.OUTBOX_BATCH_SIZE,
    OUTBOX_LOCK_TIMEOUT_MS: config.OUTBOX_LOCK_TIMEOUT_MS,
  };
}
