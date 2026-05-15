import { refreshSession } from '@features/auth/api/auth.api';
import { getCurrentUserProfile } from '@features/profile/api/profile.api';
import { getOrCreateDeviceId } from './device';
import { useSessionStore } from './session.store';
import { clearSession, loadSession, saveRefreshSession } from '@shared/storage/secure-session-storage';

export async function bootstrapSession() {
  const sessionStore = useSessionStore.getState();

  if (sessionStore.bootStatus === 'restoring') {
    return;
  }

  sessionStore.beginRestore();

  const storedSession = await loadSession();
  const deviceId = storedSession?.deviceId ?? getOrCreateDeviceId();

  if (!storedSession) {
    useSessionStore.getState().setAnonymousSession(deviceId);
    return;
  }

  try {
    const refreshedSession = await refreshSession({
      refreshToken: storedSession.refreshToken,
      deviceId,
    });

    await saveRefreshSession({
      deviceId,
      refreshToken: refreshedSession.refreshToken,
    });

    useSessionStore.setState({
      accessToken: refreshedSession.accessToken,
      refreshToken: refreshedSession.refreshToken,
      deviceId,
    });

    const currentUser = await getCurrentUserProfile();

    useSessionStore.getState().setAuthenticatedSession({
      accessToken: refreshedSession.accessToken,
      refreshToken: refreshedSession.refreshToken,
      deviceId,
      currentUser,
    });
  } catch {
    await clearSession();
    useSessionStore.getState().setAnonymousSession(deviceId);
  }
}
