export const appConfig = () => ({
  app: {
    name: 'contacts-service',
    port: Number.parseInt(process.env.PORT ?? '3005', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'development-access-secret',
  },
  database: {
    url: process.env.CONTACTS_DATABASE_URL ?? '',
  },
  services: {
    identityServiceUrl: process.env.IDENTITY_SERVICE_URL ?? 'http://localhost:3001',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL ?? 'http://localhost:3004',
  },
  outbox: {
    rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'telegram.events',
    pollIntervalMs: Number.parseInt(process.env.OUTBOX_POLL_INTERVAL_MS ?? '2000', 10),
    batchSize: Number.parseInt(process.env.OUTBOX_BATCH_SIZE ?? '50', 10),
    lockTimeoutMs: Number.parseInt(process.env.OUTBOX_LOCK_TIMEOUT_MS ?? '30000', 10),
  },
});
