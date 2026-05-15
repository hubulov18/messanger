import { generateOtpCode } from '@telegram/shared';

export function getOtpRetryAfterSeconds(createdAt: Date, resendCooldownMs: number, now = Date.now()) {
  const retryAt = createdAt.getTime() + resendCooldownMs;
  return retryAt > now ? Math.ceil((retryAt - now) / 1000) : 0;
}

export function shouldThrottleOtpChallenge(params: {
  latestChallengeCreatedAt: Date | null;
  resendCooldownMs: number;
  now?: number;
}) {
  if (!params.latestChallengeCreatedAt) {
    return null;
  }

  const retryAfterSeconds = getOtpRetryAfterSeconds(
    params.latestChallengeCreatedAt,
    params.resendCooldownMs,
    params.now,
  );

  return retryAfterSeconds > 0 ? retryAfterSeconds : null;
}

export function hasOtpAttemptsRemaining(attemptCount: number, maxAttempts: number) {
  return attemptCount < maxAttempts;
}

export function resolveOtpCode(params: {
  devOtpEnabled: boolean;
  devOtpCode: string;
}) {
  if (params.devOtpEnabled) {
    return params.devOtpCode;
  }

  return generateOtpCode();
}
