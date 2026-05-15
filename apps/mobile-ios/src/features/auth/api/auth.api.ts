import { apiRequest } from '@shared/api/http-client';
import { clientPlatform } from '@shared/config/runtime';

export type StartRegistrationResponse = {
  challengeId: string;
  expiresAt: string;
};

export type VerifyOtpResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    isNewUser: boolean;
  };
};

export type RefreshSessionResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSessionItem = {
  id: string;
  clientType: string;
  deviceId: string;
  lastSeenAt: string;
  current: boolean;
};

export function startRegistration(phoneNumber: string) {
  return apiRequest<StartRegistrationResponse>({
    method: 'POST',
    path: '/auth/register',
    timeoutMs: 45000,
    body: { phoneNumber },
  });
}

export function verifyOtp(params: {
  challengeId: string;
  code: string;
  deviceId: string;
}) {
  return apiRequest<VerifyOtpResponse>({
    method: 'POST',
    path: '/auth/verify-otp',
    timeoutMs: 45000,
    body: {
      challengeId: params.challengeId,
      code: params.code,
      deviceId: params.deviceId,
      clientType: clientPlatform,
    },
  });
}

export function refreshSession(params: { refreshToken: string; deviceId: string }) {
  return apiRequest<RefreshSessionResponse>({
    method: 'POST',
    path: '/auth/refresh',
    timeoutMs: 45000,
    body: params,
  });
}

export function logout(refreshToken: string) {
  return apiRequest<{ success: true }>({
    method: 'POST',
    path: '/auth/logout',
    body: { refreshToken },
  });
}

export function listSessions() {
  return apiRequest<{
    items: AuthSessionItem[];
  }>({
    method: 'GET',
    path: '/auth/sessions',
    authenticated: true,
  });
}

export function revokeSession(sessionId: string) {
  return apiRequest<{ success: true }>({
    method: 'DELETE',
    path: `/auth/sessions/${sessionId}`,
    authenticated: true,
  });
}

export function revokeOtherSessions(keepSessionId?: string) {
  return apiRequest<{ success: true; revokedCount: number }>({
    method: 'DELETE',
    path: '/auth/sessions',
    authenticated: true,
    ...(keepSessionId ? { body: { keepSessionId } } : {}),
  });
}
