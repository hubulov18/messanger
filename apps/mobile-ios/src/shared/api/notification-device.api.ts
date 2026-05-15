import { apiRequest } from './http-client';

export function registerNotificationDevice(params: {
  platform: 'ios' | 'android' | 'web';
  deviceId: string;
  pushToken?: string | null;
  voipPushToken?: string | null;
  appVersion?: string;
}) {
  return apiRequest<{ success: true; deviceRegistrationId: string }>({
    method: 'POST',
    path: '/notifications/devices',
    authenticated: true,
    body: params,
  });
}
