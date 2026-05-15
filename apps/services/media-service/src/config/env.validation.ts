export function validateEnv(config: Record<string, unknown>) {
  const mediaDatabaseUrl = config.MEDIA_DATABASE_URL;
  if (typeof mediaDatabaseUrl !== 'string' || mediaDatabaseUrl.length === 0) {
    throw new Error('MEDIA_DATABASE_URL is required');
  }

  const jwtAccessSecret = config.JWT_ACCESS_SECRET;
  if (typeof jwtAccessSecret !== 'string' || jwtAccessSecret.length === 0) {
    throw new Error('JWT_ACCESS_SECRET is required');
  }

  return config;
}
