import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useSessionStore } from '@shared/auth/session.store';
import { useAppForegroundCallback } from '@shared/hooks/useAppForegroundCallback';
import { ensureRealtimeConnection, teardownRealtimeConnection } from '@shared/realtime/realtime-events';

export function RealtimeProvider({ children }: PropsWithChildren) {
  const accessToken = useSessionStore((state) => state.accessToken);
  const deviceId = useSessionStore((state) => state.deviceId);
  const authStatus = useSessionStore((state) => state.authStatus);

  useEffect(() => {
    if (authStatus === 'authenticated' && accessToken && deviceId) {
      ensureRealtimeConnection();
      return;
    }

    teardownRealtimeConnection();
  }, [accessToken, authStatus, deviceId]);

  useEffect(() => {
    return () => {
      teardownRealtimeConnection();
    };
  }, []);

  useAppForegroundCallback(() => {
    if (authStatus === 'authenticated' && accessToken && deviceId) {
      ensureRealtimeConnection();
    }
  });

  return children;
}
