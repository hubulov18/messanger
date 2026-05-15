import { io, type Socket } from 'socket.io-client';

import { useSessionStore } from '@shared/auth/session.store';
import { env } from '@shared/config/env';

export type CallSignalEvent =
  | {
      type: 'call.ready';
      callId: string;
      userId: string;
      sessionId: string | null;
      negotiationVersion: number | null;
    }
  | {
      type: 'call.ringing';
      callId: string;
      chatId: string;
      callType?: 'audio' | 'video';
      initiatorUserId: string;
      receiverUserId: string;
      startedAt: string;
      state: string;
    }
  | {
      type: 'call.accepted';
      callId: string;
      chatId: string;
      acceptedAt: string | null;
      state: string;
    }
  | {
      type: 'call.active';
      callId: string;
      activeAt: string | null;
      state: string;
    }
  | {
      type: 'call.ended';
      callId: string;
      state: string;
      outcome: string;
      durationSec: number;
      endedAt: string | null;
    }
  | {
      type: 'call.offer';
      callId: string;
      fromUserId: string;
      sessionId: string | null;
      negotiationVersion: number | null;
      sdp: object;
    }
  | {
      type: 'call.answer';
      callId: string;
      fromUserId: string;
      sessionId: string | null;
      negotiationVersion: number | null;
      sdp: object;
    }
  | {
      type: 'call.ice_candidate';
      callId: string;
      fromUserId: string;
      sessionId: string | null;
      negotiationVersion: number | null;
      candidate: object | null;
    };

type CallSignalListener = (event: CallSignalEvent) => void;
type CallSignalingState = 'disconnected' | 'connecting' | 'connected';
type CallSignalingStateListener = (state: CallSignalingState) => void;

let socket: Socket | null = null;
let activeConnectionKey = '';
let activeBaseUrl = '';
let signalingState: CallSignalingState = 'disconnected';
const listeners = new Set<CallSignalListener>();
const stateListeners = new Set<CallSignalingStateListener>();
const JOIN_ACK_TIMEOUT_MS = 8000;

type PayloadOf<TType extends CallSignalEvent['type']> = Omit<Extract<CallSignalEvent, { type: TType }>, 'type'>;

function logSignaling(message: string, details?: Record<string, unknown>) {
  if (details) {
    console.log(`[call-signaling] ${message}`, details);
    return;
  }

  console.log(`[call-signaling] ${message}`);
}

export function ensureCallSignalingConnection(baseUrl?: string) {
  const accessToken = useSessionStore.getState().accessToken;
  const deviceId = useSessionStore.getState().deviceId;
  const resolvedBaseUrl = baseUrl ?? env.callSignalingUrl;

  if (!accessToken || !deviceId) {
    teardownCallSignalingConnection();
    return;
  }

  const connectionKey = `${resolvedBaseUrl}:${accessToken}:${deviceId}`;
  if (socket && activeConnectionKey === connectionKey) {
    return;
  }

  teardownCallSignalingConnection();
  setSignalingState('connecting');

  socket = io(resolvedBaseUrl, {
    transports: ['websocket'],
    timeout: 8000,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 4000,
    auth: {
      token: accessToken,
    },
    extraHeaders: {
      authorization: `Bearer ${accessToken}`,
      'x-device-id': deviceId,
    },
  });
  activeConnectionKey = connectionKey;
  activeBaseUrl = resolvedBaseUrl;
  logSignaling('connect:init', { baseUrl: resolvedBaseUrl });

  socket.on('connect', () => {
    logSignaling('connect:ok', { socketId: (socket as any)?.id ?? null });
    setSignalingState('connected');
  });
  socket.on('disconnect', (reason) => {
    logSignaling('disconnect', { reason });
    setSignalingState('disconnected');
  });
  socket.on('connect_error', (error) => {
    logSignaling('connect_error', { message: (error as Error).message });
    setSignalingState('disconnected');
  });
  const manager = (socket as Socket & {
    io: {
      on(event: 'reconnect_attempt', listener: (attempt: number) => void): void;
      on(event: 'reconnect', listener: (attempt: number) => void): void;
      on(event: 'reconnect_error', listener: (error: Error) => void): void;
    };
  }).io;
  manager.on('reconnect_attempt', (attempt: number) => {
    logSignaling('reconnect_attempt', { attempt });
    setSignalingState('connecting');
  });
  manager.on('reconnect', (attempt: number) => {
    logSignaling('reconnect_ok', { attempt });
    setSignalingState('connected');
  });
  manager.on('reconnect_error', (error: Error) => {
    logSignaling('reconnect_error', { message: error.message });
    setSignalingState('disconnected');
  });
  socket.on('call.ready', (payload) => emitTypedEvent('call.ready', payload as PayloadOf<'call.ready'>));
  socket.on('call.ringing', (payload) => emitTypedEvent('call.ringing', payload as PayloadOf<'call.ringing'>));
  socket.on('call.accepted', (payload) => emitTypedEvent('call.accepted', payload as PayloadOf<'call.accepted'>));
  socket.on('call.active', (payload) => emitTypedEvent('call.active', payload as PayloadOf<'call.active'>));
  socket.on('call.ended', (payload) => emitTypedEvent('call.ended', payload as PayloadOf<'call.ended'>));
  socket.on('call.offer', (payload) => emitTypedEvent('call.offer', payload as PayloadOf<'call.offer'>));
  socket.on('call.answer', (payload) => emitTypedEvent('call.answer', payload as PayloadOf<'call.answer'>));
  socket.on('call.ice_candidate', (payload) => emitTypedEvent('call.ice_candidate', payload as PayloadOf<'call.ice_candidate'>));
}

export function subscribeToCallSignals(listener: CallSignalListener) {
  listeners.add(listener);
  ensureCallSignalingConnection();

  return () => {
    listeners.delete(listener);
  };
}

export function subscribeToCallSignalingState(listener: CallSignalingStateListener) {
  stateListeners.add(listener);
  listener(signalingState);

  return () => {
    stateListeners.delete(listener);
  };
}

export function teardownCallSignalingConnection() {
  socket?.removeAllListeners();
  socket?.disconnect();
  socket = null;
  activeConnectionKey = '';
  activeBaseUrl = '';
  setSignalingState('disconnected');
}

export function getActiveCallSignalingUrl() {
  return activeBaseUrl || env.callSignalingUrl;
}

export function joinCallRoom(token: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!socket) {
      logSignaling('join:missing_socket');
      resolve(false);
      return;
    }

    let settled = false;
    const timeoutId = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      logSignaling('join:timeout', { tokenSuffix: token.slice(-8) });
      resolve(false);
    }, JOIN_ACK_TIMEOUT_MS);

    logSignaling('join:send', { tokenSuffix: token.slice(-8) });
    socket.emit('call.join', { token }, (response: { ok?: boolean }) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeoutId);
      logSignaling('join:ack', { ok: response?.ok === true });
      resolve(response?.ok === true);
    });
  });
}

export function waitForCallSignalingReady(timeoutMs = 8000): Promise<boolean> {
  if (signalingState === 'connected') {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;
    const timeoutId = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      unsubscribe();
      resolve(false);
    }, timeoutMs);

    const unsubscribe = subscribeToCallSignalingState((state) => {
      if (state !== 'connected' || settled) {
        return;
      }

      settled = true;
      clearTimeout(timeoutId);
      unsubscribe();
      resolve(true);
    });
  });
}

export function sendCallOffer(callId: string, sdp: object) {
  logSignaling('offer:send', { callId });
  if (!socket) {
    logSignaling('offer:send:no-socket', { callId });
    return;
  }

  socket.emit('call.offer', { callId, sdp }, (response: { ok?: boolean } | undefined) => {
    const ok = response?.ok === true;
    logSignaling(ok ? 'offer:send:ack:ok' : 'offer:send:ack:rejected', { callId });
    if (!ok) {
      // Server rejected the offer — session validation likely failed.
      // Emit a synthetic event so the recovery controller can act on it.
      emitEvent({
        type: 'call.offer_rejected' as never,
        callId,
      } as never);
    }
  });
}

export function sendCallAnswer(callId: string, sdp: object) {
  logSignaling('answer:send', { callId });
  if (!socket) {
    logSignaling('answer:send:no-socket', { callId });
    return;
  }

  socket.emit('call.answer', { callId, sdp }, (response: { ok?: boolean } | undefined) => {
    const ok = response?.ok === true;
    logSignaling(ok ? 'answer:send:ack:ok' : 'answer:send:ack:rejected', { callId });
    if (!ok) {
      emitEvent({
        type: 'call.answer_rejected' as never,
        callId,
      } as never);
    }
  });
}

export function sendIceCandidate(callId: string, candidate: object | null) {
  logSignaling('ice:send', {
    callId,
    hasCandidate: Boolean(candidate),
    candidateType:
      candidate && typeof candidate === 'object' && 'candidate' in candidate && typeof candidate.candidate === 'string'
        ? String(candidate.candidate).split(' ')[7] ?? null
        : null,
  });
  if (!socket) {
    logSignaling('ice:send:no-socket', { callId });
    return;
  }

  socket.emit('call.ice_candidate', { callId, candidate });
}

export function sendCallHeartbeat(callId: string) {
  socket?.emit('call.heartbeat', { callId });
}

function emitEvent(event: CallSignalEvent) {
  for (const listener of listeners) {
    listener(event);
  }
}

function setSignalingState(nextState: CallSignalingState) {
  signalingState = nextState;

  for (const listener of stateListeners) {
    listener(nextState);
  }
}

function emitTypedEvent<TType extends CallSignalEvent['type']>(type: TType, payload: PayloadOf<TType>) {
  const eventCallId =
    payload && typeof payload === 'object' && 'callId' in payload ? String(payload.callId) : undefined;
  logSignaling('event:recv', { type, callId: eventCallId ?? null });
  emitEvent({
    type,
    ...payload,
  } as Extract<CallSignalEvent, { type: TType }>);
}
