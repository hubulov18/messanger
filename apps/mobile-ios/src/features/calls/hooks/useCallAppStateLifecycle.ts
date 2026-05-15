import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

import type { ActiveCallSession } from '../state/call-session.store';
import type { CallRecoveryReason } from './useCallRecoveryController';

type AppStateRef = { current: AppStateStatus };
type TransportStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed';

type CallAppStateLifecycleParams = {
  appStateRef: AppStateRef;
  getCurrentCall: () => ActiveCallSession | null;
  getIsSpeakerOn: () => boolean;
  getTransportStatus: () => TransportStatus;
  hasPeerConnection: () => boolean;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  clearTerminalCleanupTimer: () => void;
  scheduleRecovery: (reason: CallRecoveryReason, delayMs: number) => void;
  onSendHeartbeat: (callId: string) => void;
  onEnsureAudioSession: (speakerOn: boolean, isVideo: boolean) => Promise<void> | void;
  onEnsureSignalingConnection: (signalingUrl: string | null) => void;
  onStartPiP: () => void;
  onStopPiP: () => void;
  getFallbackSignalingUrl: () => string | null;
};

export function useCallAppStateLifecycle({
  appStateRef,
  getCurrentCall,
  getIsSpeakerOn,
  getTransportStatus,
  hasPeerConnection,
  logCallFlow,
  clearTerminalCleanupTimer,
  scheduleRecovery,
  onSendHeartbeat,
  onEnsureAudioSession,
  onEnsureSignalingConnection,
  onStartPiP,
  onStopPiP,
  getFallbackSignalingUrl,
}: CallAppStateLifecycleParams) {
  const latestRef = useRef({
    getCurrentCall,
    getIsSpeakerOn,
    getTransportStatus,
    hasPeerConnection,
    logCallFlow,
    clearTerminalCleanupTimer,
    scheduleRecovery,
    onSendHeartbeat,
    onEnsureAudioSession,
    onEnsureSignalingConnection,
    onStartPiP,
    onStopPiP,
    getFallbackSignalingUrl,
  });
  latestRef.current = {
    getCurrentCall,
    getIsSpeakerOn,
    getTransportStatus,
    hasPeerConnection,
    logCallFlow,
    clearTerminalCleanupTimer,
    scheduleRecovery,
    onSendHeartbeat,
    onEnsureAudioSession,
    onEnsureSignalingConnection,
    onStartPiP,
    onStopPiP,
    getFallbackSignalingUrl,
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      const latest = latestRef.current;
      const previousState = appStateRef.current;
      appStateRef.current = nextState;

      const currentCall = latest.getCurrentCall();
      if (!currentCall) {
        return;
      }

      const isOngoingCall = currentCall.state === 'accepted' || currentCall.state === 'active';

      if (previousState === 'active' && nextState !== 'active') {
        latest.logCallFlow('appstate:background', {
          callId: currentCall.callId,
          callState: currentCall.state,
          nextState,
        });

        if (isOngoingCall) {
          latest.onSendHeartbeat(currentCall.callId);
          void latest.onEnsureAudioSession(latest.getIsSpeakerOn(), currentCall.callType === 'video');
          if (currentCall.callType === 'video') {
            latest.onStartPiP();
          }
        }

        return;
      }

      if (previousState === nextState || nextState !== 'active') {
        return;
      }

      latest.logCallFlow('appstate:active', {
        callId: currentCall.callId,
        callState: currentCall.state,
        previousState,
      });

      if (currentCall.callType === 'video') {
        latest.onStopPiP();
      }

      latest.clearTerminalCleanupTimer();
      if (!isOngoingCall) {
        return;
      }

      latest.onSendHeartbeat(currentCall.callId);
      void latest.onEnsureAudioSession(latest.getIsSpeakerOn(), currentCall.callType === 'video');

      const transportStatus = latest.getTransportStatus();
      const shouldRecoverOnReturn =
        transportStatus === 'reconnecting'
        || transportStatus === 'failed'
        || !latest.hasPeerConnection();

      if (!shouldRecoverOnReturn) {
        latest.logCallFlow('appstate:active:resume-without-recovery', {
          callId: currentCall.callId,
          transportStatus,
          callState: currentCall.state,
        });
        return;
      }

      latest.onEnsureSignalingConnection(currentCall.signalingUrl ?? latest.getFallbackSignalingUrl());
      latest.scheduleRecovery('app_active', 250);
    });

    return () => subscription.remove();
  }, [appStateRef]);
}
