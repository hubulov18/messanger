import AsyncStorage from '@react-native-async-storage/async-storage';

type StoredSession = {
  refreshToken: string;
  deviceId: string;
};

const SESSION_STORAGE_KEY = '@telegram/session';

let inMemorySession: StoredSession | null = null;

export async function saveSession(session: StoredSession) {
  inMemorySession = session;
  await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export async function loadSession() {
  if (inMemorySession) {
    return inMemorySession;
  }

  const rawValue = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as StoredSession;
    if (
      typeof parsedValue?.refreshToken === 'string' &&
      parsedValue.refreshToken.length > 0 &&
      typeof parsedValue?.deviceId === 'string' &&
      parsedValue.deviceId.length > 0
    ) {
      inMemorySession = parsedValue;
      return parsedValue;
    }
  } catch {
    // Corrupt session storage should be treated as absent.
  }

  await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
  inMemorySession = null;
  return null;
}

export async function saveRefreshSession(session: StoredSession) {
  await saveSession(session);
}

export async function clearSession() {
  inMemorySession = null;
  await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
}
