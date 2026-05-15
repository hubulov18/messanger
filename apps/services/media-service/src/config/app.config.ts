export const appConfig = () => ({
  app: {
    name: 'media-service',
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  },
  media: {
    uploadUrlTtlSeconds: Number(process.env.MEDIA_UPLOAD_URL_TTL_SECONDS ?? '900'),
    publicBaseUrl: process.env.MEDIA_PUBLIC_BASE_URL ?? '',
    processingPollIntervalMs: Number(process.env.MEDIA_PROCESSING_POLL_INTERVAL_MS ?? '2000'),
    processingBatchSize: Number(process.env.MEDIA_PROCESSING_BATCH_SIZE ?? '10'),
  },
  storage: {
    endpoint: process.env.STORAGE_S3_ENDPOINT ?? '',
    publicEndpoint: process.env.STORAGE_S3_PUBLIC_ENDPOINT ?? '',
    bucket: process.env.STORAGE_S3_BUCKET ?? 'telegram-media',
    region: process.env.STORAGE_S3_REGION ?? 'us-east-1',
    accessKeyId: process.env.STORAGE_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.STORAGE_S3_SECRET_ACCESS_KEY ?? '',
    forcePathStyle: (process.env.STORAGE_S3_FORCE_PATH_STYLE ?? 'true') === 'true',
  },
  services: {
    messageServiceUrl: process.env.MESSAGE_SERVICE_URL ?? 'http://localhost:3003',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL ?? 'http://localhost:3004',
  },
  outbox: {
    rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'telegram.events',
    pollIntervalMs: Number(process.env.OUTBOX_POLL_INTERVAL_MS ?? '2000'),
    batchSize: Number(process.env.OUTBOX_BATCH_SIZE ?? '50'),
    lockTimeoutMs: Number(process.env.OUTBOX_LOCK_TIMEOUT_MS ?? '30000'),
  },
});
