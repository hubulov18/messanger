import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  getOtpRetryAfterSeconds,
  hasOtpAttemptsRemaining,
  resolveOtpCode,
  shouldThrottleOtpChallenge,
} from './otp-policy.js';

describe('otp policy', () => {
  it('calculates cooldown remaining seconds', () => {
    const createdAt = new Date(1_000);
    assert.equal(getOtpRetryAfterSeconds(createdAt, 30_000, 10_000), 21);
  });

  it('returns null when latest challenge is outside cooldown', () => {
    const retryAfterSeconds = shouldThrottleOtpChallenge({
      latestChallengeCreatedAt: new Date(1_000),
      resendCooldownMs: 5_000,
      now: 10_000,
    });

    assert.equal(retryAfterSeconds, null);
  });

  it('detects remaining attempts correctly', () => {
    assert.equal(hasOtpAttemptsRemaining(0, 3), true);
    assert.equal(hasOtpAttemptsRemaining(2, 3), true);
    assert.equal(hasOtpAttemptsRemaining(3, 3), false);
  });

  it('uses configured dev otp code when enabled', () => {
    assert.equal(
      resolveOtpCode({
        devOtpEnabled: true,
        devOtpCode: '123456',
      }),
      '123456',
    );
  });
});
