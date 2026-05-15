export const appConfig = () => ({
  app: {
    name: 'identity-service',
    port: Number.parseInt(process.env.PORT ?? '3001', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  database: {
    url: process.env.IDENTITY_DATABASE_URL ?? '',
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
    jwtAccessTtlSeconds: Number.parseInt(process.env.JWT_ACCESS_TTL_SECONDS ?? '900', 10),
    otpTtlSeconds: Number.parseInt(process.env.AUTH_OTP_TTL_SECONDS ?? '300', 10),
    otpMaxAttempts: Number.parseInt(process.env.AUTH_OTP_MAX_ATTEMPTS ?? '5', 10),
    otpResendCooldownSeconds: Number.parseInt(process.env.AUTH_OTP_RESEND_COOLDOWN_SECONDS ?? '30', 10),
    devOtpEnabled:
      (process.env.AUTH_DEV_OTP_ENABLED ?? (process.env.NODE_ENV === 'production' ? 'false' : 'true')) === 'true',
    devOtpCode: process.env.AUTH_DEV_OTP_CODE ?? '123456',
  },
  outbox: {
    rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'telegram.events',
    pollIntervalMs: Number.parseInt(process.env.OUTBOX_POLL_INTERVAL_MS ?? '2000', 10),
    batchSize: Number.parseInt(process.env.OUTBOX_BATCH_SIZE ?? '50', 10),
    lockTimeoutMs: Number.parseInt(process.env.OUTBOX_LOCK_TIMEOUT_MS ?? '30000', 10),
  },
});
