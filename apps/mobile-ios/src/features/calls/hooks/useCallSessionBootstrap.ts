import { useCallback } from 'react';

import { getCall, rejoinCall, type CallDetailsResponse, type CallSessionResponse, type CallType } from '../api/calls.api';
import type { ActiveCallSession } from '../state/call-session.store';
import { resolveKnownUserLabel } from '@shared/chats/chat-directory.store';

type RefObjectLike<T> = { current: T };

type CallSessionBootstrapParams = {
  peerConnectionRef: RefObjectLike<unknown>;
  peerConnectionPreparationRef: RefObjectLike<Promise<void> | null>;
  getFallbackSignalingUrl: () => string | null;
  clearTerminalCleanupTimer: () => void;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  getStoredCallType: () => CallType | null | undefined;
  setCurrentCall: (call: ActiveCallSession | null) => void;
  setTransportStatus: (status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed') => void;
  preparePeerConnection: (session: CallSessionResponse) => Promise<void>;
  startHeartbeat: (callId: string) => void;
};

export function useCallSessionBootstrap({
  peerConnectionRef,
  peerConnectionPreparationRef,
  getFallbackSignalingUrl,
  clearTerminalCleanupTimer,
  logCallFlow,
  getStoredCallType,
  setCurrentCall,
  setTransportStatus,
  preparePeerConnection,
  startHeartbeat,
}: CallSessionBootstrapParams) {
  const syncIncomingCallIntoStore = useCallback(async (callId: string, callTypeOverride?: CallType) => {
    clearTerminalCleanupTimer();
    const call = await getCall(callId);
    setCurrentCall(normalizeIncomingCallDetails(call, getFallbackSignalingUrl(), callTypeOverride));
    return call;
  }, [clearTerminalCleanupTimer, getFallbackSignalingUrl, setCurrentCall]);

  const ensurePeerConnectionForExistingCall = useCallback(async (callId: string) => {
    if (peerConnectionPreparationRef.current) {
      await peerConnectionPreparationRef.current;
      return;
    }

    if (peerConnectionRef.current) {
      return;
    }

    clearTerminalCleanupTimer();
    const bootstrap = await rejoinCall(callId, { restartMedia: false });
    const storedCallType = getStoredCallType();
    const effectiveBootstrap =
      storedCallType && storedCallType !== bootstrap.callType
        ? { ...bootstrap, callType: storedCallType }
        : bootstrap;

    logCallFlow('peer:rejoin-bootstrap', {
      callId: effectiveBootstrap.callId,
      callType: effectiveBootstrap.callType,
      state: effectiveBootstrap.state,
    });

    setCurrentCall(normalizeBootstrapResponse(effectiveBootstrap));
    setTransportStatus(effectiveBootstrap.state === 'active' ? 'connected' : 'connecting');
    await preparePeerConnection(effectiveBootstrap);
    startHeartbeat(effectiveBootstrap.callId);
  }, [
    clearTerminalCleanupTimer,
    getStoredCallType,
    logCallFlow,
    peerConnectionPreparationRef,
    peerConnectionRef,
    preparePeerConnection,
    setCurrentCall,
    setTransportStatus,
    startHeartbeat,
  ]);

  return {
    ensurePeerConnectionForExistingCall,
    syncIncomingCallIntoStore,
  };
}

export function normalizeBootstrapResponse(response: CallSessionResponse): ActiveCallSession {
  return {
    callId: response.callId,
    chatId: response.chatId,
    callType: response.callType ?? ('audio' as const),
    state: response.state,
    role: response.role,
    counterpartUserId: response.counterpartUserId,
    signalingUrl: response.signalingUrl,
    signalingToken: response.signalingToken,
    signalingSessionId: response.signalingSessionId,
    negotiationVersion: response.negotiationVersion,
    iceServers: response.iceServers,
    participants: response.participants,
    startedAt: response.startedAt,
    acceptedAt: response.acceptedAt,
    activeAt: response.activeAt,
    endedAt: response.endedAt,
  };
}

export function normalizeIncomingCallDetails(
  response: CallDetailsResponse,
  signalingUrl: string | null,
  callTypeOverride?: CallType,
): ActiveCallSession {
  return {
    callId: response.callId,
    chatId: response.chatId,
    callType: callTypeOverride ?? response.callType ?? ('audio' as const),
    state: response.state,
    role: 'callee' as const,
    counterpartUserId: response.counterpartUserId,
    signalingUrl,
    signalingToken: null,
    signalingSessionId: null,
    negotiationVersion: 1,
    iceServers: [],
    participants: response.participants,
    startedAt: response.startedAt,
    acceptedAt: response.acceptedAt,
    activeAt: response.activeAt,
    endedAt: response.endedAt,
  };
}

export function resolveCallHandle(
  counterpartUserId: string | null,
  currentUserId?: string,
  currentUserDisplayName?: string,
) {
  if (!counterpartUserId) {
    return 'Voice call';
  }

  return resolveKnownUserLabel({
    userId: counterpartUserId,
    currentUserId,
    currentUserDisplayName,
  });
}

export function resolveCallDisplayName(
  counterpartUserId: string | null,
  currentUserId?: string,
  currentUserDisplayName?: string,
) {
  if (!counterpartUserId) {
    return null;
  }

  return resolveKnownUserLabel({
    userId: counterpartUserId,
    currentUserId,
    currentUserDisplayName,
  });
}
