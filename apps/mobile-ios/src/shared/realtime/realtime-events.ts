import EventSource from 'react-native-sse';

import { useSessionStore } from '@shared/auth/session.store';
import { env } from '@shared/config/env';

export type RealtimeEvent =
  | {
      type: 'chat.message_created';
      chatId: string;
      messageId?: string;
      clientMessageId?: string;
      senderUserId?: string;
      preview?: string;
      createdAt?: string;
    }
  | {
      type: 'chat.message_updated';
      chatId: string;
      messageId?: string;
      senderUserId?: string;
      messageStatus?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
      updateKind?: 'edited' | 'deleted' | 'status';
      text?: string;
      editedAt?: string;
      deletedAt?: string;
      preview?: string;
    }
  | {
      type: 'chat.read_updated';
      chatId: string;
      userId?: string;
      lastReadMessageId?: string;
    }
  | {
      type: 'chat.typing_started';
      chatId: string;
      senderUserId: string;
    }
  | {
      type: 'chat.typing_stopped';
      chatId: string;
      senderUserId: string;
    };

type RealtimeListener = (event: RealtimeEvent) => void;

let eventSource: EventSource | null = null;
let activeConnectionKey = '';
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<RealtimeListener>();
const REALTIME_RECONNECT_DELAY_MS = 2000;

export function ensureRealtimeConnection() {
  const accessToken = useSessionStore.getState().accessToken;
  const deviceId = useSessionStore.getState().deviceId;

  if (!accessToken || !deviceId) {
    teardownRealtimeConnection();
    return;
  }

  const connectionKey = `${accessToken}:${deviceId}`;
  if (eventSource && activeConnectionKey === connectionKey) {
    return;
  }

  teardownRealtimeConnection();

  eventSource = new EventSource(`${env.apiBaseUrl}/events/stream`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-device-id': deviceId,
    },
  });
  activeConnectionKey = connectionKey;
  clearReconnectTimer();

  eventSource.addEventListener('message', (event) => {
    if (!event.data) {
      return;
    }

    try {
      const payload = JSON.parse(event.data) as RealtimeEvent;
      if (!payload.type || !payload.chatId) {
        return;
      }

      for (const listener of listeners) {
        listener(payload);
      }
    } catch {
      // ignore malformed realtime events
    }
  });
  eventSource.addEventListener('error', () => {
    closeRealtimeConnection();
    scheduleReconnect();
  });
}

export function subscribeToRealtimeEvents(listener: RealtimeListener) {
  listeners.add(listener);
  ensureRealtimeConnection();

  return () => {
    listeners.delete(listener);
  };
}

export function teardownRealtimeConnection() {
  clearReconnectTimer();
  closeRealtimeConnection();
}

function scheduleReconnect() {
  if (reconnectTimer) {
    return;
  }

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    ensureRealtimeConnection();
  }, REALTIME_RECONNECT_DELAY_MS);
}

function closeRealtimeConnection() {
  eventSource?.removeAllEventListeners();
  eventSource?.close();
  eventSource = null;
  activeConnectionKey = '';
}

function clearReconnectTimer() {
  if (!reconnectTimer) {
    return;
  }

  clearTimeout(reconnectTimer);
  reconnectTimer = null;
}
