type EnvInput = Record<string, string | undefined>;

type EnvOutput = {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  CALLS_V1_ENABLED: string | undefined;
  NOTIFICATION_DATABASE_URL: string;
  JWT_ACCESS_SECRET: string;
  VOIP_PROVIDER_MODE: string | undefined;
  VOIP_APNS_TOPIC: string | undefined;
  VOIP_APNS_KEY_ID: string | undefined;
  VOIP_APNS_TEAM_ID: string | undefined;
  VOIP_APNS_AUTH_KEY: string | undefined;
  VOIP_APNS_AUTH_KEY_PATH: string | undefined;
  VOIP_APNS_USE_SANDBOX: string | undefined;
  PUSH_PROVIDER_MODE: string | undefined;
  PUSH_APNS_TOPIC: string | undefined;
  PUSH_APNS_KEY_ID: string | undefined;
  PUSH_APNS_TEAM_ID: string | undefined;
  PUSH_APNS_AUTH_KEY: string | undefined;
  PUSH_APNS_AUTH_KEY_PATH: string | undefined;
  PUSH_APNS_USE_SANDBOX: string | undefined;
  FCM_PROVIDER_MODE: string | undefined;
  FCM_SERVICE_ACCOUNT_JSON: string | undefined;
  FCM_SERVICE_ACCOUNT_PATH: string | undefined;
};

export function validateEnv(config: EnvInput): EnvOutput {
  const databaseUrl = config.NOTIFICATION_DATABASE_URL?.trim();
  const jwtAccessSecret = config.JWT_ACCESS_SECRET?.trim();

  if (!databaseUrl) {
    throw new Error('NOTIFICATION_DATABASE_URL is required');
  }

  if (!jwtAccessSecret) {
    throw new Error('JWT_ACCESS_SECRET is required');
  }

  return {
    PORT: config.PORT,
    NODE_ENV: config.NODE_ENV,
    CALLS_V1_ENABLED: config.CALLS_V1_ENABLED,
    NOTIFICATION_DATABASE_URL: databaseUrl,
    JWT_ACCESS_SECRET: jwtAccessSecret,
    VOIP_PROVIDER_MODE: config.VOIP_PROVIDER_MODE,
    VOIP_APNS_TOPIC: config.VOIP_APNS_TOPIC,
    VOIP_APNS_KEY_ID: config.VOIP_APNS_KEY_ID,
    VOIP_APNS_TEAM_ID: config.VOIP_APNS_TEAM_ID,
    VOIP_APNS_AUTH_KEY: config.VOIP_APNS_AUTH_KEY,
    VOIP_APNS_AUTH_KEY_PATH: config.VOIP_APNS_AUTH_KEY_PATH,
    VOIP_APNS_USE_SANDBOX: config.VOIP_APNS_USE_SANDBOX,
    PUSH_PROVIDER_MODE: config.PUSH_PROVIDER_MODE,
    PUSH_APNS_TOPIC: config.PUSH_APNS_TOPIC,
    PUSH_APNS_KEY_ID: config.PUSH_APNS_KEY_ID,
    PUSH_APNS_TEAM_ID: config.PUSH_APNS_TEAM_ID,
    PUSH_APNS_AUTH_KEY: config.PUSH_APNS_AUTH_KEY,
    PUSH_APNS_AUTH_KEY_PATH: config.PUSH_APNS_AUTH_KEY_PATH,
    PUSH_APNS_USE_SANDBOX: config.PUSH_APNS_USE_SANDBOX,
    FCM_PROVIDER_MODE: config.FCM_PROVIDER_MODE,
    FCM_SERVICE_ACCOUNT_JSON: config.FCM_SERVICE_ACCOUNT_JSON,
    FCM_SERVICE_ACCOUNT_PATH: config.FCM_SERVICE_ACCOUNT_PATH,
  };
}
