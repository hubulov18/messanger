import { useEffect, useRef } from 'react';

import type { ActiveCallSession } from '../state/call-session.store';
import { subscribeToCallManagerEvents, type CallManagerEvent } from '@shared/native/call-manager';

type CallManagerLifecycleParams = {
  shouldUseSystemCallUi: boolean;
  shouldUseIncomingSystemCallUi: boolean;
  getCurrentCall: () => ActiveCallSession | null;
  getTransportStatus: () => 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed';
  getAcceptInFlightCallId: () => string | null;
  getRecentlyAnsweredSystemCall: () => { callId: string; at: number } | null;
  setRecentlyAnsweredSystemCall: (value: { callId: string; at: number } | null) => void;
  hasIgnoredSystemEndEcho: (callId: string) => boolean;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  setCallError: (message: string) => void;
  setMuted: (isMuted: boolean) => void;
  onSyncIncomingCallIntoStore: (callId: string, callTypeOverride?: 'audio' | 'video') => Promise<void>;
  onAcceptIncomingCall: (callId: string) => Promise<void>;
  onDeclineIncomingCall: (callId: string) => Promise<void>;
  onEndCurrentCall: (callId: string) => Promise<void>;
  onEndSystemCallWithEchoSuppression: (callId: string) => Promise<void>;
};

export function useCallManagerLifecycle({
  shouldUseSystemCallUi,
  shouldUseIncomingSystemCallUi,
  getCurrentCall,
  getTransportStatus,
  getAcceptInFlightCallId,
  getRecentlyAnsweredSystemCall,
  setRecentlyAnsweredSystemCall,
  hasIgnoredSystemEndEcho,
  logCallFlow,
  setCallError,
  setMuted,
  onSyncIncomingCallIntoStore,
  onAcceptIncomingCall,
  onDeclineIncomingCall,
  onEndCurrentCall,
  onEndSystemCallWithEchoSuppression,
}: CallManagerLifecycleParams) {
  const latestRef = useRef({
    shouldUseIncomingSystemCallUi,
    getCurrentCall,
    getTransportStatus,
    getAcceptInFlightCallId,
    getRecentlyAnsweredSystemCall,
    setRecentlyAnsweredSystemCall,
    hasIgnoredSystemEndEcho,
    logCallFlow,
    setCallError,
    setMuted,
    onSyncIncomingCallIntoStore,
    onAcceptIncomingCall,
    onDeclineIncomingCall,
    onEndCurrentCall,
    onEndSystemCallWithEchoSuppression,
  });
  latestRef.current = {
    shouldUseIncomingSystemCallUi,
    getCurrentCall,
    getTransportStatus,
    getAcceptInFlightCallId,
    getRecentlyAnsweredSystemCall,
    setRecentlyAnsweredSystemCall,
    hasIgnoredSystemEndEcho,
    logCallFlow,
    setCallError,
    setMuted,
    onSyncIncomingCallIntoStore,
    onAcceptIncomingCall,
    onDeclineIncomingCall,
    onEndCurrentCall,
    onEndSystemCallWithEchoSuppression,
  };

  useEffect(() => {
    return subscribeToCallManagerEvents((event) => {
      if (!shouldUseSystemCallUi) {
        return;
      }

      void handleCallManagerEvent(event);
    });
  }, [shouldUseSystemCallUi]);

  async function handleCallManagerEvent(event: CallManagerEvent) {
    const latest = latestRef.current;
    switch (event.type) {
      case 'incomingVoipPushReceived':
        if (!latest.shouldUseIncomingSystemCallUi) {
          return;
        }
        if (event.callId) {
          try {
            await latest.onSyncIncomingCallIntoStore(event.callId, event.callType ?? undefined);
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to load incoming call';
            latest.setCallError(message);
          }
        }
        return;
      case 'callAnswered':
        if (!event.callId) {
          return;
        }

        latest.setRecentlyAnsweredSystemCall({
          callId: event.callId,
          at: Date.now(),
        });

        try {
          await latest.onSyncIncomingCallIntoStore(event.callId);
          await latest.onAcceptIncomingCall(event.callId);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to answer call';
          latest.setCallError(message);
          await latest.onEndSystemCallWithEchoSuppression(event.callId);
        }
        return;
      case 'callEnded':
        if (!event.callId) {
          return;
        }

        if (shouldIgnoreCallEndedEvent(event)) {
          latest.logCallFlow('call-manager:ended:ignored', {
            callId: event.callId,
            reason: event.reason ?? null,
          });
          return;
        }

        if (latest.getCurrentCall()?.callId === event.callId) {
          const currentCall = latest.getCurrentCall();
          if (currentCall?.role === 'callee' && currentCall.state === 'ringing') {
            await latest.onDeclineIncomingCall(event.callId);
            return;
          }

          await latest.onEndCurrentCall(event.callId);
        }
        return;
      case 'callMuted':
        if (event.callId && latest.getCurrentCall()?.callId === event.callId) {
          latest.setMuted(event.isMuted);
        }
        return;
      case 'callManagerError':
        if (shouldIgnoreCallManagerError(event, latest.getCurrentCall())) {
          latest.logCallFlow('call-manager:error:ignored', {
            callId: event.callId ?? null,
            code: event.code,
            message: event.message,
          });
          return;
        }
        latest.setCallError(event.message);
        return;
      default:
        return;
    }
  }

  function shouldIgnoreCallEndedEvent(event: Extract<CallManagerEvent, { type: 'callEnded' }>) {
    const latest = latestRef.current;
    if (!event.callId) {
      return false;
    }

    if (latest.hasIgnoredSystemEndEcho(event.callId)) {
      return true;
    }

    const currentCall = latest.getCurrentCall();
    if (!currentCall || currentCall.callId !== event.callId) {
      return false;
    }

    if (event.reason === 'provider_reset') {
      return true;
    }

    if (event.reason !== 'local_end') {
      return false;
    }

    if (latest.getAcceptInFlightCallId() === event.callId) {
      return true;
    }

    if (currentCall.state === 'accepted' || latest.getTransportStatus() === 'connecting') {
      return true;
    }

    const recentAnswer = latest.getRecentlyAnsweredSystemCall();
    if (
      recentAnswer?.callId === event.callId
      && Date.now() - recentAnswer.at < 5000
      && currentCall.state !== 'active'
    ) {
      return true;
    }

    return false;
  }
}

function shouldIgnoreCallManagerError(
  event: Extract<CallManagerEvent, { type: 'callManagerError' }>,
  currentCall: ActiveCallSession | null,
) {
  if (!currentCall || (event.callId && currentCall.callId !== event.callId)) {
    return false;
  }

  if (
    event.code === 'outgoing_call_failed'
    && currentCall.role === 'caller'
    && ['ringing', 'accepted', 'active'].includes(currentCall.state)
  ) {
    return true;
  }

  return false;
}
