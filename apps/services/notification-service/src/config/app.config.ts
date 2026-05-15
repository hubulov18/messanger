export const appConfig = () => ({
  app: {
    name: 'notification-service',
    port: Number.parseInt(process.env.PORT ?? '3008', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
  features: {
    callsV1Enabled: process.env.CALLS_V1_ENABLED === 'true',
  },
  auth: {
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  },
  database: {
    url: process.env.NOTIFICATION_DATABASE_URL ?? '',
  },
  services: {
    chatServiceUrl: process.env.CHAT_SERVICE_URL ?? 'http://localhost:3002',
  },
  voip: {
    providerMode: process.env.VOIP_PROVIDER_MODE ?? 'disabled',
    apnsTopic: process.env.VOIP_APNS_TOPIC ?? '',
    apnsKeyId: process.env.VOIP_APNS_KEY_ID ?? '',
    apnsTeamId: process.env.VOIP_APNS_TEAM_ID ?? '',
    apnsAuthKey: process.env.VOIP_APNS_AUTH_KEY ?? '',
    apnsAuthKeyPath: process.env.VOIP_APNS_AUTH_KEY_PATH ?? '',
    useSandbox: process.env.VOIP_APNS_USE_SANDBOX !== 'false',
  },
  push: {
    // Standard (alert) push notifications for messages
    // providerMode: 'disabled' | 'dry_run' | 'apns'
    // Can reuse the same APNs key as VoIP — topic is the main bundle ID (without .voip suffix)
    providerMode: process.env.PUSH_PROVIDER_MODE ?? 'disabled',
    apnsTopic: process.env.PUSH_APNS_TOPIC ?? '',
    apnsKeyId: process.env.PUSH_APNS_KEY_ID ?? process.env.VOIP_APNS_KEY_ID ?? '',
    apnsTeamId: process.env.PUSH_APNS_TEAM_ID ?? process.env.VOIP_APNS_TEAM_ID ?? '',
    apnsAuthKey: process.env.PUSH_APNS_AUTH_KEY ?? process.env.VOIP_APNS_AUTH_KEY ?? '',
    apnsAuthKeyPath: process.env.PUSH_APNS_AUTH_KEY_PATH ?? process.env.VOIP_APNS_AUTH_KEY_PATH ?? '',
    useSandbox: process.env.PUSH_APNS_USE_SANDBOX !== 'false',
  },
  fcm: {
    providerMode: process.env.FCM_PROVIDER_MODE ?? 'disabled',
    serviceAccountJson: process.env.FCM_SERVICE_ACCOUNT_JSON ?? '',
    serviceAccountPath: process.env.FCM_SERVICE_ACCOUNT_PATH ?? '',
  },
});
