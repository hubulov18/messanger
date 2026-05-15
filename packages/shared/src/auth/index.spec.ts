import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { generateOtpCode, hashSensitiveValue, signAccessToken, verifyAccessToken } from './index.js';

describe('shared auth helpers', () => {
  it('signs and verifies access tokens', () => {
    const token = signAccessToken({
      userId: 'user_1',
      secret: 'secret',
      ttlSeconds: 60,
    });

    const payload = verifyAccessToken(token, 'secret');
    assert.equal(payload.sub, 'user_1');
    assert.equal(payload.typ, 'access');
  });

  it('hashes sensitive values with stable sha256 output', () => {
    assert.equal(
      hashSensitiveValue('value'),
      'cd42404d52ad55ccfa9aca4adc828aa5800ad9d385a0671fbcbf724118320619',
    );
  });

  it('generates six digit otp codes', () => {
    assert.match(generateOtpCode(), /^\d{6}$/);
  });
});
