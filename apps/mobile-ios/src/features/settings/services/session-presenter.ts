import type { AuthSessionItem } from '@features/auth/api/auth.api';

export function glyphForClientType(clientType: string) {
  if (clientType === 'ios') {
    return '⌁';
  }

  if (clientType === 'android') {
    return '◫';
  }

  return '•';
}

export function humanizeClientType(clientType: string) {
  return clientType === 'ios' ? 'iPhone / iPad' : clientType;
}

export function truncateDeviceId(deviceId: string) {
  return deviceId.length > 14 ? `${deviceId.slice(0, 6)}…${deviceId.slice(-4)}` : deviceId;
}

export function formatTimestamp(timestamp: string | null) {
  if (!timestamp) {
    return 'recently';
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'recently';
  }

  return date.toLocaleString();
}

export function formatRelativeSessionActivity(timestamp: string | null) {
  if (!timestamp) {
    return 'Recently active';
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'Recently active';
  }

  const deltaMs = Date.now() - date.getTime();
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (deltaMs < minute) {
    return 'Active now';
  }

  if (deltaMs < hour) {
    return `Active ${Math.max(1, Math.round(deltaMs / minute))} min ago`;
  }

  if (deltaMs < day) {
    return `Active ${Math.max(1, Math.round(deltaMs / hour))} hr ago`;
  }

  return `Active ${Math.max(1, Math.round(deltaMs / day))} day ago`;
}

export function sessionTrustLabel(session: AuthSessionItem) {
  if (session.current) {
    return 'Protected current session';
  }

  return 'Review and revoke if you do not recognize this device';
}
