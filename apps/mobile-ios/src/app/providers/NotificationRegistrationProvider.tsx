import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useSessionStore } from '@shared/auth/session.store';
import { registerNotificationDevice } from '@shared/api/notification-device.api';
import { env } from '@shared/config/env';
import { APP_VERSION, clientPlatform } from '@shared/config/runtime';
import { useAppForegroundCallback } from '@shared/hooks/useAppForegroundCallback';
import {
  configureCallManager,
  getVoipPushToken,
  isCallManagerAvailable,
  subscribeToCallManagerEvents,
} from '@shared/native/call-manager';
import {
  isPushNotificationModuleAvailable,
  getCurrentPushToken,
  getPushPermissionStatus,
  requestPushPermissions,
  subscribeToPushNotificationEvents,
} from '@shared/native/push-notifications';

export function NotificationRegistrationProvider({ children }: PropsWithChildren) {
  const authStatus = useSessionStore((state) => state.authStatus);
  const accessToken = useSessionStore((state) => state.accessToken);
  const deviceId = useSessionStore((state) => state.deviceId);
  const lastRegistrationKeyRef = useRef<string | null>(null);
  const [registrationRetryTick, setRegistrationRetryTick] = useState(0);
  const [voipPushToken, setVoipPushToken] = useState<string | null | undefined>(undefined);
  const [pushToken, setPushToken] = useState<string | null | undefined>(undefined);

  async function refreshVoipPushToken() {
    if (!env.features.callsV1 || !env.features.voipPushIncoming || !isCallManagerAvailable()) {
      setVoipPushToken(null);
      return;
    }

    configureCallManager(true);
    const token = await getVoipPushToken();
    setVoipPushToken(token);
  }

  async function refreshStandardPushToken() {
    if (!isPushNotificationModuleAvailable()) {
      setPushToken(null);
      return;
    }

    const permissionStatus = await getPushPermissionStatus();
    if (permissionStatus.status === 'denied') {
      setPushToken(null);
      return;
    }

    const existingToken = await getCurrentPushToken();
    if (existingToken) {
      setPushToken(existingToken);
      return;
    }

    await requestPushPermissions();
  }

  // VoIP push token (for calls)
  useEffect(() => {
    if (!env.features.callsV1 || !env.features.voipPushIncoming || !isCallManagerAvailable()) {
      setVoipPushToken(null);
      return;
    }

    void refreshVoipPushToken().catch((e) =>
      console.warn('[NotifReg] refreshVoipPushToken failed', e),
    );

    return subscribeToCallManagerEvents((event) => {
      if (event.type === 'voipPushRegistered') {
        setVoipPushToken(event.token);
      }
    });
  }, []);

  useAppForegroundCallback(() => {
    void refreshVoipPushToken().catch((e) =>
      console.warn('[NotifReg] refreshVoipPushToken (foreground) failed', e),
    );
    void refreshStandardPushToken().catch((e) =>
      console.warn('[NotifReg] refreshStandardPushToken failed', e),
    );
    setRegistrationRetryTick((current) => current + 1);
  });

  // Standard push token (for message notifications)
  useEffect(() => {
    if (!isPushNotificationModuleAvailable()) {
      setPushToken(null);
      return;
    }

    void refreshStandardPushToken().catch((e) =>
      console.warn('[NotifReg] refreshStandardPushToken (mount) failed', e),
    );

    return subscribeToPushNotificationEvents((event) => {
      if (event.type === 'pushTokenRegistered') {
        setPushToken(event.token);
      }
    });
  }, []);

  // Register device with backend whenever auth or tokens change
  useEffect(() => {
    if (authStatus !== 'authenticated' || !accessToken || !deviceId) {
      lastRegistrationKeyRef.current = null;
      return;
    }

    // Wait until we have determined the voip token state (if applicable)
    if (env.features.voipPushIncoming && voipPushToken === undefined) {
      return;
    }

    // For standard push, undefined means we haven't received a token yet — skip for now
    // null means no token available (permission denied or unavailable) — register without it
    if (pushToken === undefined) {
      return;
    }

    const registrationKey = `${deviceId}:${accessToken}:${voipPushToken ?? 'none'}:${pushToken ?? 'none'}`;
    if (lastRegistrationKeyRef.current === registrationKey) {
      return;
    }

    lastRegistrationKeyRef.current = registrationKey;

    void registerNotificationDevice({
      platform: clientPlatform,
      deviceId,
      appVersion: APP_VERSION,
      ...(voipPushToken ? { voipPushToken } : {}),
      ...(pushToken ? { pushToken } : {}),
    }).catch(() => {
      lastRegistrationKeyRef.current = null;
    });
  }, [accessToken, authStatus, deviceId, voipPushToken, pushToken, registrationRetryTick]);

  return children;
}
