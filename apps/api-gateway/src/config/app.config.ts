export const appConfig = () => ({
  app: {
    name: 'api-gateway',
    port: Number.parseInt(process.env.PORT ?? '3000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  features: {
    callsV1Enabled: process.env.CALLS_V1_ENABLED === 'true',
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'development-access-secret',
  },
  services: {
    identityServiceUrl: process.env.IDENTITY_SERVICE_URL ?? 'http://localhost:3001',
    profileServiceUrl: process.env.PROFILE_SERVICE_URL ?? 'http://localhost:3004',
    chatServiceUrl: process.env.CHAT_SERVICE_URL ?? 'http://localhost:3002',
    messageServiceUrl: process.env.MESSAGE_SERVICE_URL ?? 'http://localhost:3003',
    contactsServiceUrl: process.env.CONTACTS_SERVICE_URL ?? 'http://localhost:3005',
    mediaServiceUrl: process.env.MEDIA_SERVICE_URL ?? 'http://localhost:3006',
    notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL ?? 'http://localhost:3008',
    callServiceUrl: process.env.CALL_SERVICE_URL ?? 'http://localhost:3007',
    upstreamTimeoutMs: Number.parseInt(process.env.UPSTREAM_TIMEOUT_MS ?? '25000', 10),
  },
  realtime: {
    rabbitMqUrl: process.env.RABBITMQ_URL ?? '',
    exchange: process.env.RABBITMQ_EXCHANGE ?? 'telegram.events',
    chatMembershipCacheTtlMs: Number.parseInt(process.env.REALTIME_CHAT_MEMBERSHIP_CACHE_TTL_MS ?? '15000', 10),
    chatMembershipProjectionShadowReadEnabled: process.env.REALTIME_CHAT_MEMBERSHIP_PROJECTION_SHADOW_READ_ENABLED === 'true',
  },
});
