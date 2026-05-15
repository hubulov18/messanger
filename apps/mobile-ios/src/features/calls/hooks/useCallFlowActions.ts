import { useCallback } from 'react';

import { acceptCall, declineCall, endCall, startCall, type CallSessionResponse, type CallType } from '../api/calls.api';
import type { ActiveCallSession } from '../state/call-session.store';
import { normalizeBootstrapResponse, resolveCallDisplayName, resolveCallHandle } from './useCallSessionBootstrap';

type RefObjectLike<T> = { current: T };

type CallFlowActionsParams = {
  outgoingCallStartInFlightRef: RefObjectLike<boolean>;
  acceptInFlightCallIdRef: RefObjectLike<string | null>;
  ignoredSystemEndEchoRef: RefObjectLike<Set<string>>;
  getCurrentCall: () => ActiveCallSession | null;
  currentUserId: string | undefined;
  currentUserDisplayName: string | undefined;
  shouldUseSystemCallUi: boolean;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  mapErrorToUserFacing: (message: string) => string;
  clearCurrentCall: () => void;
  setCurrentCall: (call: ActiveCallSession | null) => void;
  setCallError: (message: string | null) => void;
  setTransportStatus: (status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed') => void;
  setVideoEnabled: (enabled: boolean) => void;
  clearTerminalCleanupTimer: () => void;
  scheduleTerminalCleanup: (callId: string) => void;
  scheduleReconnectWatchdog: (callId: string) => void;
  preparePeerConnection: (session: CallSessionResponse) => Promise<void>;
  cleanupPeerConnection: () => Promise<void>;
  startHeartbeat: (callId: string) => void;
  ensureCallSignalingConnection: (signalingUrl: string | undefined) => void;
  waitForCallSignalingReady: () => Promise<boolean>;
  joinCallRoom: (signalingToken: string | null) => Promise<boolean>;
  startOutgoingSystemCall: (
    callId: string,
    handle: string,
    displayName: string | null,
    hasVideo: boolean,
  ) => Promise<void>;
  endSystemCall: (callId: string) => Promise<void>;
};

export function useCallFlowActions({
  outgoingCallStartInFlightRef,
  acceptInFlightCallIdRef,
  ignoredSystemEndEchoRef,
  getCurrentCall,
  currentUserId,
  currentUserDisplayName,
  shouldUseSystemCallUi,
  logCallFlow,
  mapErrorToUserFacing,
  clearCurrentCall,
  setCurrentCall,
  setCallError,
  setTransportStatus,
  setVideoEnabled,
  clearTerminalCleanupTimer,
  scheduleTerminalCleanup,
  scheduleReconnectWatchdog,
  preparePeerConnection,
  cleanupPeerConnection,
  startHeartbeat,
  ensureCallSignalingConnection,
  waitForCallSignalingReady,
  joinCallRoom,
  startOutgoingSystemCall,
  endSystemCall,
}: CallFlowActionsParams) {
  const endSystemCallWithEchoSuppression = useCallback(async (callId: string) => {
    ignoredSystemEndEchoRef.current.add(callId);

    try {
      await endSystemCall(callId);
    } finally {
      setTimeout(() => {
        ignoredSystemEndEchoRef.current.delete(callId);
      }, 1500);
    }
  }, [endSystemCall, ignoredSystemEndEchoRef]);

  const startOutgoingCallFlow = useCallback(async (chatId: string, callType: CallType) => {
    if (outgoingCallStartInFlightRef.current || getCurrentCall()) {
      return;
    }

    outgoingCallStartInFlightRef.current = true;
    let startedCallId: string | null = null;

    try {
      logCallFlow('outgoing:start', { chatId, callType });
      clearTerminalCleanupTimer();
      const response = await startCall(chatId, callType);
      startedCallId = response.callId;
      logCallFlow('outgoing:bootstrap', {
        callId: response.callId,
        callType: response.callType,
        state: response.state,
        signalingUrl: response.signalingUrl,
      });
      ensureCallSignalingConnection(response.signalingUrl);
      const signalingReady = await waitForCallSignalingReady();
      if (!signalingReady) {
        throw new Error('Unable to connect to the call signaling channel.');
      }

      const joined = await joinCallRoom(response.signalingToken);
      if (!joined) {
        throw new Error('Unable to join call signaling');
      }

      const effectiveResponse = callType !== response.callType
        ? { ...response, callType }
        : response;

      setCurrentCall(normalizeBootstrapResponse(effectiveResponse));
      startHeartbeat(response.callId);
      setTransportStatus('connecting');
      if (callType === 'video') {
        setVideoEnabled(true);
      }
      await preparePeerConnection(effectiveResponse);
      setCallError(null);
      if (shouldUseSystemCallUi) {
        await startOutgoingSystemCall(
          response.callId,
          resolveCallHandle(response.counterpartUserId, currentUserId, currentUserDisplayName),
          resolveCallDisplayName(response.counterpartUserId, currentUserId, currentUserDisplayName),
          callType === 'video',
        );
      }
    } catch (error) {
      if (startedCallId) {
        try {
          await endCall(startedCallId);
        } catch {
          // Best-effort cleanup only.
        }
      }
      await cleanupPeerConnection();

      const message = error instanceof Error ? error.message : 'Unable to start the call';
      if (getCurrentCall()) {
        setCallError(mapErrorToUserFacing(message));
        scheduleTerminalCleanup(startedCallId ?? '');
      } else {
        clearCurrentCall();
      }
      return;
    } finally {
      outgoingCallStartInFlightRef.current = false;
    }
  }, [
    cleanupPeerConnection,
    clearCurrentCall,
    clearTerminalCleanupTimer,
    currentUserDisplayName,
    currentUserId,
    ensureCallSignalingConnection,
    getCurrentCall,
    joinCallRoom,
    logCallFlow,
    mapErrorToUserFacing,
    outgoingCallStartInFlightRef,
    preparePeerConnection,
    scheduleTerminalCleanup,
    setCallError,
    setCurrentCall,
    setTransportStatus,
    setVideoEnabled,
    shouldUseSystemCallUi,
    startHeartbeat,
    startOutgoingSystemCall,
    waitForCallSignalingReady,
  ]);

  const acceptIncomingCallFlow = useCallback(async (callId: string) => {
    const currentCall = getCurrentCall();
    if (acceptInFlightCallIdRef.current === callId) {
      return;
    }

    if (currentCall?.callId === callId && currentCall.role === 'callee' && currentCall.state !== 'ringing') {
      return;
    }

    acceptInFlightCallIdRef.current = callId;

    try {
      logCallFlow('incoming:accept:start', { callId });
      clearTerminalCleanupTimer();
      const response = await acceptCall(callId);
      logCallFlow('incoming:accept:bootstrap', {
        callId: response.callId,
        callType: response.callType,
        state: response.state,
        signalingUrl: response.signalingUrl,
      });
      ensureCallSignalingConnection(response.signalingUrl);
      const signalingReady = await waitForCallSignalingReady();
      if (!signalingReady) {
        throw new Error('Unable to connect to the call signaling channel.');
      }
      const joined = await joinCallRoom(response.signalingToken);
      if (!joined) {
        throw new Error('Unable to join call signaling');
      }

      const storedCallType = currentCall?.callType;
      const effectiveCallType: CallType = storedCallType ?? response.callType ?? 'audio';
      const effectiveResponse = effectiveCallType !== response.callType
        ? { ...response, callType: effectiveCallType }
        : response;

      setCurrentCall(normalizeBootstrapResponse(effectiveResponse));
      startHeartbeat(response.callId);
      if (effectiveCallType === 'video') {
        setVideoEnabled(true);
      }
      setTransportStatus('connecting');
      await preparePeerConnection(effectiveResponse);
      setCallError(null);
      // Schedule watchdog AFTER peer connection is fully prepared (media acquired,
      // tracks added). This gives the full 30s budget for the offer/answer/ICE
      // exchange to complete. Without this, the callee would wait indefinitely
      // if the caller's offer never arrives (e.g., server rejected it silently).
      scheduleReconnectWatchdog(response.callId);
    } catch (error) {
      await cleanupPeerConnection();
      clearCurrentCall();
      const message = error instanceof Error ? error.message : 'Unable to accept the call';
      setCallError(mapErrorToUserFacing(message));
      return;
    } finally {
      if (acceptInFlightCallIdRef.current === callId) {
        acceptInFlightCallIdRef.current = null;
      }
    }
  }, [
    acceptInFlightCallIdRef,
    cleanupPeerConnection,
    clearCurrentCall,
    clearTerminalCleanupTimer,
    ensureCallSignalingConnection,
    getCurrentCall,
    joinCallRoom,
    logCallFlow,
    preparePeerConnection,
    scheduleReconnectWatchdog,
    setCallError,
    setCurrentCall,
    setTransportStatus,
    setVideoEnabled,
    startHeartbeat,
    waitForCallSignalingReady,
  ]);

  const declineIncomingCallFlow = useCallback(async (callId: string) => {
    clearTerminalCleanupTimer();
    await declineCall(callId);
    await cleanupPeerConnection();
    clearCurrentCall();
    if (shouldUseSystemCallUi) {
      await endSystemCallWithEchoSuppression(callId);
    }
  }, [
    cleanupPeerConnection,
    clearCurrentCall,
    clearTerminalCleanupTimer,
    endSystemCallWithEchoSuppression,
    shouldUseSystemCallUi,
  ]);

  const endCurrentCallFlow = useCallback(async (callId: string) => {
    clearTerminalCleanupTimer();
    await endCall(callId);
    await cleanupPeerConnection();
    clearCurrentCall();
    if (shouldUseSystemCallUi) {
      await endSystemCallWithEchoSuppression(callId);
    }
  }, [
    cleanupPeerConnection,
    clearCurrentCall,
    clearTerminalCleanupTimer,
    endSystemCallWithEchoSuppression,
    shouldUseSystemCallUi,
  ]);

  return {
    acceptIncomingCallFlow,
    declineIncomingCallFlow,
    endCurrentCallFlow,
    endSystemCallWithEchoSuppression,
    startOutgoingCallFlow,
  };
}
