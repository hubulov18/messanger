import messaging from '@react-native-firebase/messaging';
import { checkNotifications, requestNotifications, RESULTS } from 'react-native-permissions';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

type PushNotificationNativeModule = {
  requestPermissions(): Promise<{ granted: boolean }>;
  getPermissionStatus(): Promise<{ status: 'authorized' | 'denied' | 'not_determined' | 'provisional' | 'ephemeral' | 'unknown' }>;
  getCurrentPushToken(): Promise<string | null>;
  setApplicationBadgeCount(count: number): Promise<void>;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
};

const nativeModule: PushNotificationNativeModule | null =
  Platform.OS === 'ios'
    ? ((NativeModules as { PushNotificationModule?: PushNotificationNativeModule }).PushNotificationModule ?? null)
    : null;

// Lazy singleton — created only when the native module is available
let emitter: NativeEventEmitter | null = null;
const androidListeners = new Set<(event: PushNotificationEvent) => void>();
const pendingAndroidEvents: PushNotificationEvent[] = [];
let didBindAndroidMessaging = false;
let didInspectInitialAndroidNotification = false;

type RemoteMessageLike = {
  data?: Record<string, unknown>;
};

function getEmitter(): NativeEventEmitter | null {
  if (!nativeModule) return null;
  if (!emitter) {
    emitter = new NativeEventEmitter(nativeModule as never);
  }
  return emitter;
}

export function isPushNotificationModuleAvailable(): boolean {
  return nativeModule !== null || Platform.OS === 'android';
}

export function requestPushPermissions(): Promise<{ granted: boolean }> {
  if (Platform.OS === 'android') {
    return requestNotifications(['alert', 'sound', 'badge']).then(({ status }) => ({
      granted: status === RESULTS.GRANTED,
    })).catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      console.warn('[push-notifications] requestPermissions failed', { message });
      return { granted: false };
    });
  }

  if (!nativeModule) {
    return Promise.resolve({ granted: false });
  }

  return nativeModule.requestPermissions().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[push-notifications] requestPermissions failed', { message });
    return { granted: false };
  });
}

export function getPushPermissionStatus() {
  if (Platform.OS === 'android') {
    return checkNotifications().then(({ status }) => ({ status: mapPermissionStatus(status) }));
  }
  if (!nativeModule) {
    return Promise.resolve({ status: 'not_determined' as const });
  }
  return nativeModule.getPermissionStatus();
}

export function getCurrentPushToken() {
  if (Platform.OS === 'android') {
    return messaging()
      .registerDeviceForRemoteMessages()
      .catch(() => undefined)
      .then(() => messaging().getToken())
      .catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        console.warn('[push-notifications] getCurrentPushToken failed', { message });
        return null;
      });
  }

  if (!nativeModule) {
    return Promise.resolve<string | null>(null);
  }

  return nativeModule.getCurrentPushToken().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[push-notifications] getCurrentPushToken failed', { message });
    return null;
  });
}

export async function setApplicationBadgeCount(count: number) {
  if (!nativeModule) {
    return;
  }

  try {
    await nativeModule.setApplicationBadgeCount(Math.max(0, Math.trunc(count)));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[push-notifications] setApplicationBadgeCount failed', { message, count });
  }
}

export type PushNotificationEvent =
  | { type: 'pushTokenRegistered'; token: string }
  | { type: 'notificationTapped'; chatId: string; messageId?: string }
  | {
      type: 'incomingCallReceived';
      callId: string;
      chatId?: string;
      callerUserId?: string;
      displayName?: string;
      callType?: 'audio' | 'video';
      openedFromNotification?: boolean;
    };

export function subscribeToPushNotificationEvents(
  handler: (event: PushNotificationEvent) => void,
): () => void {
  if (Platform.OS === 'android') {
    ensureAndroidMessagingBindings();
    androidListeners.add(handler);
    flushPendingAndroidEvents();
    return () => {
      androidListeners.delete(handler);
    };
  }

  const em = getEmitter();
  if (!em) return () => {};

  const tokenSub = em.addListener('pushTokenRegistered', (payload: unknown) => {
    const data = payload as { token: string };
    handler({ type: 'pushTokenRegistered', token: data.token });
  });

  const tapSub = em.addListener('notificationTapped', (payload: unknown) => {
    const data = payload as { chatId: string; messageId?: string };
    handler({
      type: 'notificationTapped',
      chatId: data.chatId,
      // exactOptionalPropertyTypes: omit the key entirely when undefined
      ...(data.messageId !== undefined ? { messageId: data.messageId } : {}),
    });
  });

  return () => {
    tokenSub.remove();
    tapSub.remove();
  };
}

function emitAndroidEvent(event: PushNotificationEvent) {
  if (androidListeners.size === 0) {
    pendingAndroidEvents.push(event);
    return;
  }

  androidListeners.forEach((listener) => listener(event));
}

function flushPendingAndroidEvents() {
  if (androidListeners.size === 0 || pendingAndroidEvents.length === 0) {
    return;
  }

  const queuedEvents = pendingAndroidEvents.splice(0, pendingAndroidEvents.length);
  queuedEvents.forEach((event) => {
    androidListeners.forEach((listener) => listener(event));
  });
}

function ensureAndroidMessagingBindings() {
  if (didBindAndroidMessaging || Platform.OS !== 'android') {
    return;
  }

  didBindAndroidMessaging = true;

  messaging().onTokenRefresh((token) => {
    emitAndroidEvent({ type: 'pushTokenRegistered', token });
  });

  messaging().onMessage((remoteMessage) => {
    const event = extractAndroidPushEvent(remoteMessage, false);
    if (event) {
      emitAndroidEvent(event);
    }
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    const event = extractAndroidPushEvent(remoteMessage, true);
    if (event) {
      emitAndroidEvent(event);
    }
  });

  if (!didInspectInitialAndroidNotification) {
    didInspectInitialAndroidNotification = true;
    void messaging().getInitialNotification().then((remoteMessage) => {
      const event = extractAndroidPushEvent(remoteMessage, true);
      if (event) {
        emitAndroidEvent(event);
      }
    }).catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      console.warn('[push-notifications] getInitialNotification failed', { message });
    });
  }
}

function extractAndroidPushEvent(
  remoteMessage: RemoteMessageLike | null,
  openedFromNotification: boolean,
): PushNotificationEvent | null {
  const data = remoteMessage?.data ?? {};
  const kind = readString(data.kind)?.trim();

  const callId = readString(data.callId);
  if (kind === 'incoming_call' && callId) {
    const event: Extract<PushNotificationEvent, { type: 'incomingCallReceived' }> = {
      type: 'incomingCallReceived',
      callId,
    };

    const chatId = readString(data.chatId);
    const callerUserId = readString(data.callerUserId);
    const displayName = readString(data.displayName);
    const callType = readString(data.callType);

    if (chatId) {
      event.chatId = chatId;
    }
    if (callerUserId) {
      event.callerUserId = callerUserId;
    }
    if (displayName) {
      event.displayName = displayName;
    }
    if (callType === 'audio' || callType === 'video') {
      event.callType = callType;
    }
    if (openedFromNotification) {
      event.openedFromNotification = true;
    }

    return event;
  }

  const chatId = readString(data.chatId);
  if (chatId) {
    const event: Extract<PushNotificationEvent, { type: 'notificationTapped' }> = {
      type: 'notificationTapped',
      chatId,
    };

    const messageId = readString(data.messageId);
    if (messageId) {
      event.messageId = messageId;
    }

    return event;
  }

  return null;
}

function mapPermissionStatus(status: string) {
  switch (status) {
    case RESULTS.GRANTED:
      return 'authorized' as const;
    case RESULTS.BLOCKED:
    case RESULTS.DENIED:
      return 'denied' as const;
    case RESULTS.UNAVAILABLE:
      return 'unknown' as const;
    default:
      return 'not_determined' as const;
  }
}

function readString(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}
