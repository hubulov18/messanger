import { createHash, createHmac, randomInt } from 'node:crypto';

const encoder = new TextEncoder();

export type AccessTokenPayload = {
  sub: string;
  typ: 'access';
  iat: number;
  exp: number;
};

function base64UrlEncode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function base64UrlDecode<T>(value: string): T {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;
}

function signValue(input: string, secret: string): string {
  return createHmac('sha256', encoder.encode(secret)).update(input).digest('base64url');
}

export function signAccessToken(params: { userId: string; secret: string; ttlSeconds: number }): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: AccessTokenPayload = {
    sub: params.userId,
    typ: 'access',
    iat: now,
    exp: now + params.ttlSeconds,
  };

  const encodedHeader = base64UrlEncode(
    JSON.stringify({
      alg: 'HS256',
      typ: 'JWT',
    }),
  );
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signValue(`${encodedHeader}.${encodedPayload}`, params.secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyAccessToken(token: string, secret: string): AccessTokenPayload {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT structure');
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error('Invalid JWT structure');
  }

  const expectedSignature = signValue(`${encodedHeader}.${encodedPayload}`, secret);
  if (signature !== expectedSignature) {
    throw new Error('Invalid JWT signature');
  }

  const header = base64UrlDecode<{ alg: string; typ: string }>(encodedHeader);
  if (header.alg !== 'HS256' || header.typ !== 'JWT') {
    throw new Error('Unsupported JWT header');
  }

  const payload = base64UrlDecode<AccessTokenPayload>(encodedPayload);
  if (payload.typ !== 'access') {
    throw new Error('Unsupported JWT type');
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) {
    throw new Error('JWT expired');
  }

  return payload;
}

export function hashSensitiveValue(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function generateOtpCode(): string {
  return `${randomInt(0, 1_000_000)}`.padStart(6, '0');
}
