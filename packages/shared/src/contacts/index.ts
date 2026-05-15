import { createHash } from 'node:crypto';

export function normalizeContactPhoneNumber(value: string): string {
  return value.trim().replace(/[\s()-]/g, '');
}

export function hashNormalizedContactPhoneNumber(normalizedValue: string): string {
  return createHash('sha256').update(normalizedValue).digest('hex');
}

export function hashContactPhoneNumber(value: string): string {
  return hashNormalizedContactPhoneNumber(normalizeContactPhoneNumber(value));
}
