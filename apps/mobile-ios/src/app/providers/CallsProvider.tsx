import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { type AppStateStatus } from 'react-native';
import {
  MediaStream,
  RTCIceCandidate,
} from 'react-native-webrtc';

import {
  acceptCall,
  declineCall,
  endCall,
  getCall,
  rejoinCall,
  startCall,
  type CallDetailsResponse,
  type CallSessionResponse,
  type CallType,
} from '@features/calls/api/calls.api';
import { CallOverlay } from '@features/calls/components/CallOverlay';
import { useCallAppStateLifecycle } from '@features/calls/hooks/useCallAppStateLifecycle';
import { useCallFlowActions } from '@features/calls/hooks/useCallFlowActions';
import { useCallManagerLifecycle } from '@features/calls/hooks/useCallManagerLifecycle';
import { useCallNegotiationLifecycle } from '@features/calls/hooks/useCallNegotiationLifecycle';
import { usePeerConnectionLifecycle } from '@features/calls/hooks/usePeerConnectionLifecycle';
import { useCallRecoveryController, type CallRecoveryReason } from '@features/calls/hooks/useCallRecoveryController';
import {
  normalizeBootstrapResponse,
  resolveCallDisplayName,
  resolveCallHandle,
  useCallSessionBootstrap,
} from '@features/calls/hooks/useCallSessionBootstrap';
import { useCallSignalingLifecycle } from '@features/calls/hooks/useCallSignalingLifecycle';
import {
  ensureCallSignalingConnection,
  getActiveCallSignalingUrl,
  joinCallRoom,
  sendCallAnswer,
  sendCallHeartbeat,
  sendCallOffer,
  sendIceCandidate,
  subscribeToCallSignalingState,
  teardownCallSignalingConnection,
  waitForCallSignalingReady,
} from '@features/calls/services/call-signaling.client';
import {
  matchesCurrentNegotiationVersion,
  serializeIceCandidate,
  serializeSessionDescription,
  toUserFacingCallError,
} from '@features/calls/services/call-lifecycle.helpers';
import { registerCallCoordinator } from '@features/calls/services/call-coordinator';
import { startCallPiP, stopCallPiP } from '@features/calls/services/call-pip-controller';
import { useCallSessionStore, type CallMediaStream } from '@features/calls/state/call-session.store';
import { useSessionStore } from '@shared/auth/session.store';
import { env } from '@shared/config/env';
import {
  configureCallManager,
  endSystemCall,
  ensureSystemCallAudioSession,
  isCallManagerAvailable,
  markSystemCallConnected,
  reportIncomingSystemCall,
  setSystemCallMuted,
  setSystemSpeakerEnabled,
  startOutgoingSystemCall,
} from '@shared/native/call-manager';
import { subscribeToPushNotificationEvents } from '@shared/native/push-notifications';

function logCallFlow(message: string, details?: Record<string, unknown>) {
  if (details) {
    console.log(`[call-flow] ${message}`, details);
    return;
  }

  console.log(`[call-flow] ${message}`);
}

export function CallsProvider({ children }: PropsWithChildren) {
  const shouldUseSystemCallUi = isCallManagerAvailable();
  const shouldUseIncomingSystemCallUi = env.features.voipPushIncoming && isCallManagerAvailable();
  const accessToken = useSessionStore((state) => state.accessToken);
  const authStatus = useSessionStore((state) => state.authStatus);
  const currentUser = useSessionStore((state) => state.currentUser);
  const setCurrentCall = useCallSessionStore((state) => state.setCurrentCall);
  const patchCurrentCall = useCallSessionStore((state) => state.patchCurrentCall);
  const clearCurrentCall = useCallSessionStore((state) => state.clearCurrentCall);
  const setCallError = useCallSessionStore((state) => state.setCallError);
  const isMuted = useCallSessionStore((state) => state.isMuted);
  const setMuted = useCallSessionStore((state) => state.setMuted);
  const setSpeakerOn = useCallSessionStore((state) => state.setSpeakerOn);
  const setVideoEnabled = useCallSessionStore((state) => state.setVideoEnabled);
  const setTransportStatus = useCallSessionStore((state) => state.setTransportStatus);
  const setLocalStream = useCallSessionStore((state) => state.setLocalStream);
  const setRemoteStream = useCallSessionStore((state) => state.setRemoteStream);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const peerConnectionRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localStreamRef = useRef<any>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const pendingCandidatesRef = useRef<Array<object>>([]);
  const peerConnectionPreparationRef = useRef<Promise<void> | null>(null);
  const acceptInFlightCallIdRef = useRef<string | null>(null);
  const offerCreationRef = useRef<Promise<void> | null>(null);
  const outgoingCallStartInFlightRef = useRef(false);
  const appStateRef = useRef<AppStateStatus>('background');
  const recentlyAnsweredSystemCallRef = useRef<{ callId: string; at: number } | null>(null);
  const ignoredSystemEndEchoRef = useRef<Set<string>>(new Set());

  const {
    clearAllTimers,
    clearDelayedRecoveryTimer,
    clearReconnectWatchdog,
    clearTerminalCleanupTimer,
    resetRecoveryBudget,
    runRecovery,
    scheduleRecovery,
    scheduleReconnectWatchdog,
    scheduleTerminalCleanup,
    startHeartbeat,
    stopHeartbeat,
  } = useCallRecoveryController({
    appStateRef,
    getCurrentCall: () => useCallSessionStore.getState().currentCall,
    getTransportStatus: () => useCallSessionStore.getState().transportStatus,
    logCallFlow,
    onSendHeartbeat: sendCallHeartbeat,
    onRecover: performRecoveryNow,
    onTerminalCleanup: () => {
      clearCurrentCall();
    },
  });

  const {
    applyRemoteCandidate,
    cleanupPeerConnection,
    flushPendingCandidates,
    preparePeerConnection,
  } = usePeerConnectionLifecycle({
    peerConnectionRef,
    localStreamRef,
    remoteStreamRef,
    pendingCandidatesRef,
    offerCreationRef,
    peerConnectionPreparationRef,
    isMuted,
    shouldUseSystemCallUi,
    logCallFlow,
    setLocalStream,
    setRemoteStream,
    setVideoEnabled,
    setTransportStatus,
    setCallError,
    patchCurrentCall,
    clearDelayedRecoveryTimer,
    clearReconnectWatchdog,
    resetRecoveryBudget,
    scheduleReconnectWatchdog,
    scheduleRecovery,
    stopHeartbeat,
    stopCallPiP,
    markSystemCallConnected,
    sendIceCandidate,
    serializeIceCandidate,
  });

  const {
    applyRemoteAnswer,
    applyRemoteOffer,
    createAndSendOffer,
  } = useCallNegotiationLifecycle({
    peerConnectionRef,
    offerCreationRef,
    logCallFlow,
    serializeSessionDescription,
    sendCallOffer,
    sendCallAnswer,
    flushPendingCandidates,
  });

  const {
    ensurePeerConnectionForExistingCall,
    syncIncomingCallIntoStore,
  } = useCallSessionBootstrap({
    peerConnectionRef,
    peerConnectionPreparationRef,
    getFallbackSignalingUrl: getActiveCallSignalingUrl,
    clearTerminalCleanupTimer,
    logCallFlow,
    getStoredCallType: () => useCallSessionStore.getState().currentCall?.callType,
    setCurrentCall,
    setTransportStatus,
    preparePeerConnection,
    startHeartbeat,
  });

  const {
    acceptIncomingCallFlow,
    declineIncomingCallFlow,
    endCurrentCallFlow,
    endSystemCallWithEchoSuppression,
    startOutgoingCallFlow,
  } = useCallFlowActions({
    outgoingCallStartInFlightRef,
    acceptInFlightCallIdRef,
    ignoredSystemEndEchoRef,
    getCurrentCall: () => useCallSessionStore.getState().currentCall,
    currentUserId: currentUser?.id,
    currentUserDisplayName: currentUser?.displayName,
    shouldUseSystemCallUi,
    logCallFlow,
    mapErrorToUserFacing: toUserFacingCallError,
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
    ensureCallSignalingConnection: (signalingUrl) => {
      ensureCallSignalingConnection(signalingUrl ?? undefined);
    },
    waitForCallSignalingReady,
    joinCallRoom: async (signalingToken) => {
      if (!signalingToken) {
        return false;
      }
      return joinCallRoom(signalingToken);
    },
    startOutgoingSystemCall,
    endSystemCall,
  });

  useEffect(() => {
    if (isCallManagerAvailable()) {
      configureCallManager(env.features.voipPushIncoming);
    }
  }, []);

  useEffect(() => {
    return subscribeToPushNotificationEvents((event) => {
      if (event.type !== 'incomingCallReceived' || !event.callId) {
        return;
      }

      const currentCall = useCallSessionStore.getState().currentCall;
      if (currentCall?.callId === event.callId) {
        return;
      }

      void syncIncomingCallIntoStore(event.callId, event.callType);
    });
  }, [syncIncomingCallIntoStore]);

  useEffect(() => {
    if (authStatus === 'authenticated' && accessToken) {
      ensureCallSignalingConnection();
      return;
    }

    teardownCallSignalingConnection();
  }, [accessToken, authStatus]);

  useEffect(() => {
    return subscribeToCallSignalingState((state) => {
      const currentCall = useCallSessionStore.getState().currentCall;
      if (!currentCall) {
        return;
      }

      if (state === 'connecting' || state === 'disconnected') {
        if (currentCall.state === 'accepted' || currentCall.state === 'active') {
          setTransportStatus('reconnecting');
          if (appStateRef.current === 'active') {
            scheduleRecovery('peer_disconnected', state === 'disconnected' ? 1200 : 2500);
          }
        }
        return;
      }

      if (state === 'connected') {
        clearDelayedRecoveryTimer();
        if (useCallSessionStore.getState().transportStatus === 'reconnecting') {
          setCallError(null);
          sendCallHeartbeat(currentCall.callId);
          if (
            appStateRef.current === 'active'
            && (currentCall.state === 'accepted' || currentCall.state === 'active')
            && (!peerConnectionRef.current || currentCall.state !== 'active')
          ) {
            scheduleRecovery('peer_disconnected', 300);
          }
        }
      }
    });
  }, [setCallError, setTransportStatus]);

  useEffect(() => {
    registerCallCoordinator({
      startChatCall: async (chatId: string, callType: CallType) => {
        await startOutgoingCallFlow(chatId, callType);
      },
      acceptIncomingCall: async () => {
        const callId = useCallSessionStore.getState().currentCall?.callId;
        if (!callId) {
          return;
        }

        await acceptIncomingCallFlow(callId);
      },
      declineIncomingCall: async () => {
        const callId = useCallSessionStore.getState().currentCall?.callId;
        if (!callId) {
          return;
        }

        await declineIncomingCallFlow(callId);
      },
      endCurrentCall: async () => {
        const callId = useCallSessionStore.getState().currentCall?.callId;
        if (!callId) {
          return;
        }

        await endCurrentCallFlow(callId);
      },
      retryCurrentCall: async () => {
        await runRecovery('manual_retry');
      },
      toggleMute: async () => {
        const stream = localStreamRef.current;
        if (!stream) {
          return;
        }

        const callId = useCallSessionStore.getState().currentCall?.callId;
        const nextMuted = !useCallSessionStore.getState().isMuted;
        stream.getAudioTracks().forEach((track: any) => {
          track.enabled = !nextMuted;
        });
        setMuted(nextMuted);

        if (callId && shouldUseSystemCallUi) {
          await setSystemCallMuted(callId, nextMuted);
        }
      },
      toggleSpeaker: async () => {
        const nextSpeakerOn = !useCallSessionStore.getState().isSpeakerOn;
        await setSystemSpeakerEnabled(nextSpeakerOn);
        setSpeakerOn(nextSpeakerOn);
      },
      toggleVideo: async () => {
        const stream = localStreamRef.current;
        if (!stream) {
          return;
        }

        const nextVideoEnabled = !useCallSessionStore.getState().isVideoEnabled;
        stream.getTracks().filter((t: any) => t.kind === 'video').forEach((track: any) => {
          track.enabled = nextVideoEnabled;
        });
        setVideoEnabled(nextVideoEnabled);
      },
    });

    return () => registerCallCoordinator(null);
  }, [clearCurrentCall, setCallError, setCurrentCall, setMuted, setSpeakerOn, setVideoEnabled, shouldUseSystemCallUi]);

  useEffect(() => {
    return () => {
      clearAllTimers();
      void cleanupPeerConnection();
      teardownCallSignalingConnection();
      registerCallCoordinator(null);
    };
  }, []);

  useCallAppStateLifecycle({
    appStateRef,
    getCurrentCall: () => useCallSessionStore.getState().currentCall,
    getIsSpeakerOn: () => useCallSessionStore.getState().isSpeakerOn,
    getTransportStatus: () => useCallSessionStore.getState().transportStatus,
    hasPeerConnection: () => Boolean(peerConnectionRef.current),
    logCallFlow,
    clearTerminalCleanupTimer,
    scheduleRecovery,
    onSendHeartbeat: sendCallHeartbeat,
    onEnsureAudioSession: ensureSystemCallAudioSession,
    onEnsureSignalingConnection: (signalingUrl) => {
      ensureCallSignalingConnection(signalingUrl ?? undefined);
    },
    onStartPiP: startCallPiP,
    onStopPiP: stopCallPiP,
    getFallbackSignalingUrl: getActiveCallSignalingUrl,
  });

  useCallManagerLifecycle({
    shouldUseSystemCallUi,
    shouldUseIncomingSystemCallUi,
    getCurrentCall: () => useCallSessionStore.getState().currentCall,
    getTransportStatus: () => useCallSessionStore.getState().transportStatus,
    getAcceptInFlightCallId: () => acceptInFlightCallIdRef.current,
    getRecentlyAnsweredSystemCall: () => recentlyAnsweredSystemCallRef.current,
    setRecentlyAnsweredSystemCall: (value) => {
      recentlyAnsweredSystemCallRef.current = value;
    },
    hasIgnoredSystemEndEcho: (callId) => ignoredSystemEndEchoRef.current.has(callId),
    logCallFlow,
    setCallError,
    setMuted,
    onSyncIncomingCallIntoStore: async (callId, callTypeOverride) => {
      await syncIncomingCallIntoStore(callId, callTypeOverride);
    },
    onAcceptIncomingCall: acceptIncomingCallFlow,
    onDeclineIncomingCall: declineIncomingCallFlow,
    onEndCurrentCall: endCurrentCallFlow,
    onEndSystemCallWithEchoSuppression: endSystemCallWithEchoSuppression,
  });

  useCallSignalingLifecycle({
    currentUserId: currentUser?.id,
    currentUserDisplayName: currentUser?.displayName,
    shouldUseIncomingSystemCallUi,
    shouldUseSystemCallUi,
    getCurrentCall: () => useCallSessionStore.getState().currentCall,
    getTransportStatus: () => useCallSessionStore.getState().transportStatus,
    hasPeerConnection: () => Boolean(peerConnectionRef.current),
    hasPeerRemoteDescription: () => Boolean(peerConnectionRef.current?.remoteDescription),
    logCallFlow,
    mapErrorToUserFacing: toUserFacingCallError,
    setCallError,
    setCurrentCall,
    patchCurrentCall,
    setTransportStatus,
    setVideoEnabled,
    clearTerminalCleanupTimer,
    scheduleRecovery,
    scheduleTerminalCleanup,
    startHeartbeat,
    matchesCurrentNegotiationVersion: (currentCall, eventNegotiationVersion, eventType) =>
      matchesCurrentNegotiationVersion(currentCall, eventNegotiationVersion, eventType, logCallFlow),
    normalizeBootstrapResponse,
    resolveCallHandle,
    resolveCallDisplayName,
    onSyncIncomingCallIntoStore: syncIncomingCallIntoStore,
    onReportIncomingSystemCall: reportIncomingSystemCall,
    onRejoinCall: async (callId, restartMedia) => rejoinCall(callId, { restartMedia }),
    onEnsureSignalingConnection: (signalingUrl) => {
      ensureCallSignalingConnection(signalingUrl ?? undefined);
    },
    onWaitForSignalingReady: waitForCallSignalingReady,
    onJoinCallRoom: async (signalingToken) => {
      if (!signalingToken) {
        return false;
      }
      return joinCallRoom(signalingToken);
    },
    onWaitForPeerPreparation: async () => {
      if (peerConnectionPreparationRef.current) {
        await peerConnectionPreparationRef.current;
      }
    },
    onPreparePeerConnection: preparePeerConnection,
    onEnsurePeerConnectionForExistingCall: ensurePeerConnectionForExistingCall,
    onCreateAndSendOffer: createAndSendOffer,
    onApplyRemoteOffer: applyRemoteOffer,
    onApplyRemoteAnswer: applyRemoteAnswer,
    onApplyRemoteCandidate: applyRemoteCandidate,
    onCleanupPeerConnection: cleanupPeerConnection,
    onEndSystemCallWithEchoSuppression: endSystemCallWithEchoSuppression,
  });

  async function performRecoveryNow(reason: CallRecoveryReason) {
    const currentCall = useCallSessionStore.getState().currentCall;
    if (!currentCall) {
      return;
    }
    try {
      logCallFlow('recovery:start', {
        callId: currentCall.callId,
        reason,
        callState: currentCall.state,
        transportStatus: useCallSessionStore.getState().transportStatus,
      });
      setTransportStatus('reconnecting');
      if (reason === 'manual_retry') {
        setCallError(null);
      }

      const callDetails = await getCall(currentCall.callId);

      if (['ended', 'declined', 'missed', 'canceled', 'failed'].includes(callDetails.state)) {
        patchCurrentCall({
          state: callDetails.state,
          endedAt: callDetails.endedAt,
        });
        setCallError(null);
        await cleanupPeerConnection();
        if (shouldUseSystemCallUi) {
          await endSystemCallWithEchoSuppression(callDetails.callId);
        }
        scheduleTerminalCleanup(callDetails.callId);
        return;
      }

      if (currentCall.role === 'caller' && callDetails.state === 'ringing') {
        clearTerminalCleanupTimer();
        const bootstrap = await rejoinCall(currentCall.callId, { restartMedia: false });
        ensureCallSignalingConnection(bootstrap.signalingUrl);
        const signalingReady = await waitForCallSignalingReady();
        if (!signalingReady) {
          throw new Error('Unable to reconnect to the call signaling channel.');
        }
        const joined = await joinCallRoom(bootstrap.signalingToken);
        if (!joined) {
          throw new Error(`Unable to rejoin call signaling after ${reason}`);
        }

        setCurrentCall(normalizeBootstrapResponse(bootstrap));
        startHeartbeat(bootstrap.callId);
        if (bootstrap.callType === 'video') {
          if (peerConnectionPreparationRef.current) {
            await peerConnectionPreparationRef.current;
          }
          if (!peerConnectionRef.current) {
            await preparePeerConnection(bootstrap);
          }
        }
        logCallFlow('recovery:complete:ringing', {
          callId: bootstrap.callId,
          reason,
        });
        return;
      }

      const bootstrap = await rejoinCall(currentCall.callId, { restartMedia: true });
      clearTerminalCleanupTimer();
      ensureCallSignalingConnection(bootstrap.signalingUrl);
      const signalingReady = await waitForCallSignalingReady();
      if (!signalingReady) {
        throw new Error('Unable to reconnect to the call signaling channel.');
      }
      const joined = await joinCallRoom(bootstrap.signalingToken);

      if (!joined) {
        throw new Error(`Unable to rejoin call signaling after ${reason}`);
      }

      // Preserve callType from store in case REST response has stale 'audio'
      const storedCallTypeForRecovery = useCallSessionStore.getState().currentCall?.callType;
      const effectiveBootstrapForRecovery =
        storedCallTypeForRecovery && storedCallTypeForRecovery !== bootstrap.callType
          ? { ...bootstrap, callType: storedCallTypeForRecovery }
          : bootstrap;

      setCurrentCall(normalizeBootstrapResponse(effectiveBootstrapForRecovery));
      await preparePeerConnection(effectiveBootstrapForRecovery);
      startHeartbeat(effectiveBootstrapForRecovery.callId);
      setCallError(null);
      logCallFlow('recovery:complete', {
        callId: effectiveBootstrapForRecovery.callId,
        reason,
        negotiationVersion: effectiveBootstrapForRecovery.negotiationVersion,
      });

      // Do NOT proactively send an offer after recovery.
      // The remote peer will also recover and rejoin the signaling room, which will
      // emit call.ready → createAndSendOffer. Sending an offer here without waiting
      // for the remote to rejoin would silently drop the offer since nobody is in the
      // room to receive it.
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to recover call session';
      logCallFlow('recovery:failed', {
        callId: currentCall.callId,
        reason,
        message,
      });
      setTransportStatus('failed');
      setCallError(toUserFacingCallError(message));
    }
  }

  return (
    <>
      {children}
      <CallOverlay />
    </>
  );
}
