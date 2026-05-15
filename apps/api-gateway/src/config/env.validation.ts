type EnvInput = Record<string, string | undefined>;

type EnvOutput = {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  CALLS_V1_ENABLED: string | undefined;
  IDENTITY_SERVICE_URL: string | undefined;
  PROFILE_SERVICE_URL: string | undefined;
  JWT_ACCESS_SECRET: string | undefined;
  CHAT_SERVICE_URL: string | undefined;
  MESSAGE_SERVICE_URL: string | undefined;
  CONTACTS_SERVICE_URL: string | undefined;
  MEDIA_SERVICE_URL: string | undefined;
  NOTIFICATION_SERVICE_URL: string | undefined;
  CALL_SERVICE_URL: string | undefined;
  UPSTREAM_TIMEOUT_MS: string | undefined;
  RABBITMQ_URL: string | undefined;
  RABBITMQ_EXCHANGE: string | undefined;
  REALTIME_CHAT_MEMBERSHIP_CACHE_TTL_MS: string | undefined;
  REALTIME_CHAT_MEMBERSHIP_PROJECTION_SHADOW_READ_ENABLED: string | undefined;
};

export function validateEnv(config: EnvInput): EnvOutput {
  return {
    PORT: config.PORT,
    NODE_ENV: config.NODE_ENV,
    CALLS_V1_ENABLED: config.CALLS_V1_ENABLED,
    IDENTITY_SERVICE_URL: config.IDENTITY_SERVICE_URL,
    PROFILE_SERVICE_URL: config.PROFILE_SERVICE_URL,
    JWT_ACCESS_SECRET: config.JWT_ACCESS_SECRET,
    CHAT_SERVICE_URL: config.CHAT_SERVICE_URL,
    MESSAGE_SERVICE_URL: config.MESSAGE_SERVICE_URL,
    CONTACTS_SERVICE_URL: config.CONTACTS_SERVICE_URL,
    MEDIA_SERVICE_URL: config.MEDIA_SERVICE_URL,
    NOTIFICATION_SERVICE_URL: config.NOTIFICATION_SERVICE_URL,
    CALL_SERVICE_URL: config.CALL_SERVICE_URL,
    UPSTREAM_TIMEOUT_MS: config.UPSTREAM_TIMEOUT_MS,
    RABBITMQ_URL: config.RABBITMQ_URL,
    RABBITMQ_EXCHANGE: config.RABBITMQ_EXCHANGE,
    REALTIME_CHAT_MEMBERSHIP_CACHE_TTL_MS: config.REALTIME_CHAT_MEMBERSHIP_CACHE_TTL_MS,
    REALTIME_CHAT_MEMBERSHIP_PROJECTION_SHADOW_READ_ENABLED: config.REALTIME_CHAT_MEMBERSHIP_PROJECTION_SHADOW_READ_ENABLED,
  };
}
