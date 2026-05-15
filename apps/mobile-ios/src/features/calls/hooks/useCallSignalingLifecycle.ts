import { useEffect, useRef } from 'react';

import type { CallDetailsResponse, CallSessionResponse, CallType } from '../api/calls.api';
import { subscribeToCallSignals, type CallSignalEvent } from '../services/call-signaling.client';
import type { ActiveCallSession } from '../state/call-session.store';

type CallSignalingLifecycleParams = {
  currentUserId: string | undefined;
  currentUserDisplayName: string | undefined;
  shouldUseIncomingSystemCallUi: boolean;
  shouldUseSystemCallUi: boolean;
  getCurrentCall: () => ActiveCallSession | null;
  getTransportStatus: () => 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed';
  hasPeerConnection: () => boolean;
  hasPeerRemoteDescription: () => boolean;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  mapErrorToUserFacing: (message: string) => string;
  setCallError: (message: string | null) => void;
  setCurrentCall: (call: ActiveCallSession | null) => void;
  patchCurrentCall: (patch: Partial<ActiveCallSession>) => void;
  setTransportStatus: (status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed') => void;
  setVideoEnabled: (enabled: boolean) => void;
  clearTerminalCleanupTimer: () => void;
  scheduleRecovery: (reason: 'peer_disconnected', delayMs: number) => void;
  scheduleTerminalCleanup: (callId: string) => void;
  startHeartbeat: (callId: string) => void;
  matchesCurrentNegotiationVersion: (
    currentCall: { callId: string; negotiationVersion: number } | null,
    eventNegotiationVersion: number | null,
    eventType: 'call.ready' | 'call.offer' | 'call.answer' | 'call.ice_candidate',
  ) => boolean;
  normalizeBootstrapResponse: (response: CallSessionResponse) => ActiveCallSession;
  resolveCallHandle: (counterpartUserId: string | null, currentUserId?: string, currentUserDisplayName?: string) => string;
  resolveCallDisplayName: (
    counterpartUserId: string | null,
    currentUserId?: string,
    currentUserDisplayName?: string,
  ) => string | null;
  onSyncIncomingCallIntoStore: (callId: string, callTypeOverride?: CallType) => Promise<CallDetailsResponse>;
  onReportIncomingSystemCall: (
    callId: string,
    handle: string,
    displayName: string | null,
    hasVideo: boolean,
  ) => Promise<void>;
  onRejoinCall: (callId: string, restartMedia: boolean) => Promise<CallSessionResponse>;
  onEnsureSignalingConnection: (signalingUrl: string | null) => void;
  onWaitForSignalingReady: () => Promise<boolean>;
  onJoinCallRoom: (signalingToken: string | null) => Promise<boolean>;
  onWaitForPeerPreparation: () => Promise<void>;
  onPreparePeerConnection: (session: CallSessionResponse) => Promise<void>;
  onEnsurePeerConnectionForExistingCall: (callId: string) => Promise<void>;
  onCreateAndSendOffer: (callId: string, callType: CallType) => Promise<void>;
  onApplyRemoteOffer: (callId: string, sdp: object) => Promise<void>;
  onApplyRemoteAnswer: (sdp: object) => Promise<void>;
  onApplyRemoteCandidate: (candidate: object | null) => Promise<void>;
  onCleanupPeerConnection: () => Promise<void>;
  onEndSystemCallWithEchoSuppression: (callId: string) => Promise<void>;
};

export function useCallSignalingLifecycle({
  currentUserId,
  currentUserDisplayName,
  shouldUseIncomingSystemCallUi,
  shouldUseSystemCallUi,
  getCurrentCall,
  getTransportStatus,
  hasPeerConnection,
  hasPeerRemoteDescription,
  logCallFlow,
  mapErrorToUserFacing,
  setCallError,
  setCurrentCall,
  patchCurrentCall,
  setTransportStatus,
  setVideoEnabled,
  clearTerminalCleanupTimer,
  scheduleRecovery,
  scheduleTerminalCleanup,
  startHeartbeat,
  matchesCurrentNegotiationVersion,
  normalizeBootstrapResponse,
  resolveCallHandle,
  resolveCallDisplayName,
  onSyncIncomingCallIntoStore,
  onReportIncomingSystemCall,
  onRejoinCall,
  onEnsureSignalingConnection,
  onWaitForSignalingReady,
  onJoinCallRoom,
  onWaitForPeerPreparation,
  onPreparePeerConnection,
  onEnsurePeerConnectionForExistingCall,
  onCreateAndSendOffer,
  onApplyRemoteOffer,
  onApplyRemoteAnswer,
  onApplyRemoteCandidate,
  onCleanupPeerConnection,
  onEndSystemCallWithEchoSuppression,
}: CallSignalingLifecycleParams) {
  const latestRef = useRef({
    currentUserId,
    currentUserDisplayName,
    shouldUseIncomingSystemCallUi,
    shouldUseSystemCallUi,
    getCurrentCall,
    getTransportStatus,
    hasPeerConnection,
    hasPeerRemoteDescription,
    logCallFlow,
    mapErrorToUserFacing,
    setCallError,
    setCurrentCall,
    patchCurrentCall,
    setTransportStatus,
    setVideoEnabled,
    clearTerminalCleanupTimer,
    scheduleRecovery,
    scheduleTerminalCleanup,
    startHeartbeat,
    matchesCurrentNegotiationVersion,
    normalizeBootstrapResponse,
    resolveCallHandle,
    resolveCallDisplayName,
    onSyncIncomingCallIntoStore,
    onReportIncomingSystemCall,
    onRejoinCall,
    onEnsureSignalingConnection,
    onWaitForSignalingReady,
    onJoinCallRoom,
    onWaitForPeerPreparation,
    onPreparePeerConnection,
    onEnsurePeerConnectionForExistingCall,
    onCreateAndSendOffer,
    onApplyRemoteOffer,
    onApplyRemoteAnswer,
    onApplyRemoteCandidate,
    onCleanupPeerConnection,
    onEndSystemCallWithEchoSuppression,
  });
  latestRef.current = {
    currentUserId,
    currentUserDisplayName,
    shouldUseIncomingSystemCallUi,
    shouldUseSystemCallUi,
    getCurrentCall,
    getTransportStatus,
    hasPeerConnection,
    hasPeerRemoteDescription,
    logCallFlow,
    mapErrorToUserFacing,
    setCallError,
    setCurrentCall,
    patchCurrentCall,
    setTransportStatus,
    setVideoEnabled,
    clearTerminalCleanupTimer,
    scheduleRecovery,
    scheduleTerminalCleanup,
    startHeartbeat,
    matchesCurrentNegotiationVersion,
    normalizeBootstrapResponse,
    resolveCallHandle,
    resolveCallDisplayName,
    onSyncIncomingCallIntoStore,
    onReportIncomingSystemCall,
    onRejoinCall,
    onEnsureSignalingConnection,
    onWaitForSignalingReady,
    onJoinCallRoom,
    onWaitForPeerPreparation,
    onPreparePeerConnection,
    onEnsurePeerConnectionForExistingCall,
    onCreateAndSendOffer,
    onApplyRemoteOffer,
    onApplyRemoteAnswer,
    onApplyRemoteCandidate,
    onCleanupPeerConnection,
    onEndSystemCallWithEchoSuppression,
  };

  useEffect(() => {
    return subscribeToCallSignals((event) => {
      const latest = latestRef.current;
      void handleSignalEvent(event).catch((error) => {
        const message = error instanceof Error ? error.message : 'Unable to handle call signaling event';
        latest.logCallFlow('signal:event:error', {
          type: event.type,
          callId: 'callId' in event ? event.callId : null,
          message,
        });
        latest.setCallError(latest.mapErrorToUserFacing(message));
      });
    });
  }, []);

  async function handleSignalEvent(event: CallSignalEvent) {
    const latest = latestRef.current;
    latest.logCallFlow('signal:event', { type: event.type, callId: 'callId' in event ? event.callId : null });

    switch (event.type) {
      case 'call.ringing': {
        if (latest.getCurrentCall()) {
          return;
        }

        if (latest.currentUserId && event.initiatorUserId === latest.currentUserId) {
          latest.logCallFlow('signal:ringing:skip:own-call', { callId: event.callId });
          return;
        }

        try {
          const call = await latest.onSyncIncomingCallIntoStore(event.callId, event.callType);
          if (latest.shouldUseIncomingSystemCallUi) {
            await latest.onReportIncomingSystemCall(
              call.callId,
              latest.resolveCallHandle(call.counterpartUserId, latest.currentUserId, latest.currentUserDisplayName),
              latest.resolveCallDisplayName(call.counterpartUserId, latest.currentUserId, latest.currentUserDisplayName),
              call.callType === 'video',
            );
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unable to load incoming call';
          latest.setCallError(message);
        }
        return;
      }
      case 'call.accepted': {
        if (latest.getCurrentCall()?.callId !== event.callId) {
          return;
        }

        latest.clearTerminalCleanupTimer();
        const bootstrap = await latest.onRejoinCall(event.callId, false);
        latest.onEnsureSignalingConnection(bootstrap.signalingUrl);
        const signalingReady = await latest.onWaitForSignalingReady();
        if (!signalingReady) {
          throw new Error('Unable to reconnect to the call signaling channel.');
        }

        const joined = await latest.onJoinCallRoom(bootstrap.signalingToken);
        if (!joined) {
          throw new Error('Unable to rejoin call signaling after acceptance.');
        }

        const storedCallTypeForAccepted = latest.getCurrentCall()?.callType;
        const effectiveBootstrapForAccepted =
          storedCallTypeForAccepted && storedCallTypeForAccepted !== bootstrap.callType
            ? { ...bootstrap, callType: storedCallTypeForAccepted }
            : bootstrap;

        latest.setCurrentCall(latest.normalizeBootstrapResponse(effectiveBootstrapForAccepted));
        if (effectiveBootstrapForAccepted.callType === 'video') {
          latest.setVideoEnabled(true);
        }
        await latest.onWaitForPeerPreparation();
        if (!latest.hasPeerConnection()) {
          await latest.onPreparePeerConnection(effectiveBootstrapForAccepted);
        }
        latest.setTransportStatus('connecting');
        latest.startHeartbeat(effectiveBootstrapForAccepted.callId);
        if (effectiveBootstrapForAccepted.role === 'caller') {
          // Proactively create and send the offer after joining the room.
          // The callee may have already joined the room and emitted call.ready
          // BEFORE the caller finished the rejoinCall → joinCallRoom sequence,
          // so waiting for call.ready would hang forever.
          // If the callee hasn't joined yet, it will receive call.ready when it
          // does join, which triggers resendPendingLocalOffer via the call.ready
          // handler — so the offer reaches the callee either way.
          latest.logCallFlow('signal:accepted:proactive-offer', {
            callId: effectiveBootstrapForAccepted.callId,
            callType: effectiveBootstrapForAccepted.callType,
          });
          await latest.onCreateAndSendOffer(
            effectiveBootstrapForAccepted.callId,
            effectiveBootstrapForAccepted.callType,
          );
        }
        return;
      }
      case 'call.ready': {
        const currentCall = latest.getCurrentCall();
        if (!currentCall || currentCall.callId !== event.callId || currentCall.role !== 'caller') {
          return;
        }

        if (!['ringing', 'accepted'].includes(currentCall.state)) {
          latest.logCallFlow('signal:ready:skip:unexpected-call-state', {
            callId: event.callId,
            state: currentCall.state,
          });
          return;
        }

        if (!latest.matchesCurrentNegotiationVersion(currentCall, event.negotiationVersion, event.type)) {
          return;
        }

        await latest.onWaitForPeerPreparation();
        await latest.onEnsurePeerConnectionForExistingCall(event.callId);
        await latest.onCreateAndSendOffer(event.callId, currentCall.callType);
        return;
      }
      case 'call.active':
        if (latest.getCurrentCall()?.callId === event.callId) {
          latest.patchCurrentCall({
            state: event.state,
            activeAt: event.activeAt,
          });
        }
        return;
      case 'call.offer': {
        if (latest.getCurrentCall()?.callId !== event.callId) {
          return;
        }

        if (!latest.matchesCurrentNegotiationVersion(latest.getCurrentCall(), event.negotiationVersion, event.type)) {
          const stuckState = {
            currentCall: latest.getCurrentCall(),
            transportStatus: latest.getTransportStatus(),
          };
          if (
            stuckState.transportStatus === 'connecting'
            && !latest.hasPeerRemoteDescription()
            && (stuckState.currentCall?.state === 'accepted' || stuckState.currentCall?.state === 'active')
          ) {
            latest.logCallFlow('signal:offer:version-mismatch:trigger-recovery', {
              callId: event.callId,
              eventNegotiationVersion: event.negotiationVersion,
            });
            latest.scheduleRecovery('peer_disconnected', 500);
          }
          return;
        }

        await latest.onEnsurePeerConnectionForExistingCall(event.callId);
        await latest.onApplyRemoteOffer(event.callId, event.sdp);
        return;
      }
      case 'call.answer':
        if (latest.getCurrentCall()?.callId !== event.callId) {
          return;
        }

        if (!latest.matchesCurrentNegotiationVersion(latest.getCurrentCall(), event.negotiationVersion, event.type)) {
          return;
        }

        await latest.onApplyRemoteAnswer(event.sdp);
        return;
      case 'call.ice_candidate':
        if (latest.getCurrentCall()?.callId !== event.callId) {
          return;
        }

        if (!latest.matchesCurrentNegotiationVersion(latest.getCurrentCall(), event.negotiationVersion, event.type)) {
          return;
        }

        await latest.onApplyRemoteCandidate(event.candidate);
        return;
      case 'call.ended':
        if (latest.getCurrentCall()?.callId !== event.callId) {
          return;
        }

        latest.patchCurrentCall({
          state: event.state,
          endedAt: event.endedAt,
        });
        latest.setCallError(null);
        latest.setTransportStatus('idle');
        await latest.onCleanupPeerConnection();
        if (latest.shouldUseSystemCallUi) {
          await latest.onEndSystemCallWithEchoSuppression(event.callId);
        }
        latest.scheduleTerminalCleanup(event.callId);
        return;
    }
  }
}
