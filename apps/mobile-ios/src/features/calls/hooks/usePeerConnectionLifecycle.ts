import { useCallback } from 'react';
import { Platform } from 'react-native';
import {
  MediaStream,
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  type RTCSessionDescription,
} from 'react-native-webrtc';

import type { CallSessionResponse } from '../api/calls.api';
import type { CallMediaStream } from '../state/call-session.store';
import { callPermissionsApi } from '@shared/native/call-permissions';

type RefObjectLike<T> = { current: T };

type PeerConnectionLike = {
  addEventListener: (type: string, listener: (event?: any) => void) => void;
  addTrack: (track: unknown, stream: unknown) => void;
  addIceCandidate: (candidate: RTCIceCandidate) => Promise<void>;
  close: () => void;
  getSenders: () => Array<{ track?: { stop?: () => void } | null }>;
  remoteDescription?: RTCSessionDescription | null;
  localDescription?: RTCSessionDescription | null;
  signalingState: string;
  iceConnectionState: string;
  iceGatheringState: string;
  connectionState: string;
};

type TransportStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed';

type PeerConnectionLifecycleParams = {
  peerConnectionRef: RefObjectLike<PeerConnectionLike | null>;
  localStreamRef: RefObjectLike<CallMediaStream | null>;
  remoteStreamRef: RefObjectLike<MediaStream | null>;
  pendingCandidatesRef: RefObjectLike<Array<object>>;
  offerCreationRef: RefObjectLike<Promise<void> | null>;
  peerConnectionPreparationRef: RefObjectLike<Promise<void> | null>;
  isMuted: boolean;
  shouldUseSystemCallUi: boolean;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  setLocalStream: (stream: CallMediaStream | null) => void;
  setRemoteStream: (stream: CallMediaStream | null) => void;
  setVideoEnabled: (enabled: boolean) => void;
  setTransportStatus: (status: TransportStatus) => void;
  setCallError: (message: string | null) => void;
  patchCurrentCall: (patch: { state?: string }) => void;
  clearDelayedRecoveryTimer: () => void;
  clearReconnectWatchdog: () => void;
  resetRecoveryBudget: () => void;
  scheduleReconnectWatchdog: (callId: string) => void;
  scheduleRecovery: (reason: 'peer_disconnected' | 'peer_failed', delayMs: number) => void;
  stopHeartbeat: () => void;
  stopCallPiP: () => void;
  markSystemCallConnected: (callId: string) => Promise<void>;
  sendIceCandidate: (callId: string, candidate: object | null) => void;
  serializeIceCandidate: (candidate: {
    candidate?: string | null;
    sdpMid?: string | null;
    sdpMLineIndex?: number | null;
    usernameFragment?: string | null;
  } | null | undefined) => object | null;
};

export function usePeerConnectionLifecycle({
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
}: PeerConnectionLifecycleParams) {
  const shouldDisableLocalVideoCapture = useCallback(() => {
    if (Platform.OS !== 'android') {
      return false;
    }

    const platformConstants = Platform.constants as { Model?: string; Brand?: string; Manufacturer?: string } | undefined;
    const model = platformConstants?.Model ?? '';
    const brand = platformConstants?.Brand ?? '';
    const manufacturer = platformConstants?.Manufacturer ?? '';

    return model.toUpperCase() === 'RMX3195'
      || brand.toLowerCase() === 'realme'
      || manufacturer.toLowerCase() === 'realme';
  }, []);

  const cleanupPeerConnection = useCallback(async () => {
    stopHeartbeat();
    clearDelayedRecoveryTimer();
    clearReconnectWatchdog();
    resetRecoveryBudget();
    stopCallPiP();

    pendingCandidatesRef.current = [];
    offerCreationRef.current = null;

    const connection = peerConnectionRef.current;
    if (connection) {
      connection.getSenders().forEach((sender) => {
        sender.track?.stop?.();
      });
      connection.close();
      peerConnectionRef.current = null;
    }

    const stream = localStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (remoteStreamRef.current) {
      remoteStreamRef.current = null;
    }

    setLocalStream(null);
    setRemoteStream(null);
    setTransportStatus('idle');
  }, [
    clearDelayedRecoveryTimer,
    clearReconnectWatchdog,
    localStreamRef,
    offerCreationRef,
    peerConnectionRef,
    pendingCandidatesRef,
    remoteStreamRef,
    resetRecoveryBudget,
    setLocalStream,
    setRemoteStream,
    setTransportStatus,
    stopCallPiP,
    stopHeartbeat,
  ]);

  const flushPendingCandidates = useCallback(async () => {
    const connection = peerConnectionRef.current;
    if (!connection || !connection.remoteDescription) {
      return;
    }

    logCallFlow('ice:flush:start', { count: pendingCandidatesRef.current.length });
    while (pendingCandidatesRef.current.length > 0) {
      const candidate = pendingCandidatesRef.current.shift();
      if (!candidate) {
        continue;
      }

      await connection.addIceCandidate(new RTCIceCandidate(candidate as never));
    }
    logCallFlow('ice:flush:done');
  }, [logCallFlow, peerConnectionRef, pendingCandidatesRef]);

  const applyRemoteCandidate = useCallback(async (candidate: object | null) => {
    if (!candidate) {
      logCallFlow('ice:recv:null');
      return;
    }

    const rawCandidate =
      typeof candidate === 'object' && candidate !== null && 'candidate' in candidate
        ? String((candidate as { candidate?: string | null }).candidate ?? '')
        : '';
    const remoteParts = rawCandidate.split(' ');
    const remoteCandidateType = remoteParts[7] ?? null;
    const remoteProtocol = remoteParts[2] ?? null;

    const connection = peerConnectionRef.current;
    if (!connection) {
      logCallFlow('ice:queue:no-pc', {
        candidateType: remoteCandidateType,
        protocol: remoteProtocol,
      });
      pendingCandidatesRef.current.push(candidate);
      return;
    }

    if (!connection.remoteDescription) {
      logCallFlow('ice:queue:no-remote-description', {
        signalingState: connection.signalingState,
        candidateType: remoteCandidateType,
        protocol: remoteProtocol,
      });
      pendingCandidatesRef.current.push(candidate);
      return;
    }

    logCallFlow('ice:add:start', {
      candidateType: remoteCandidateType,
      protocol: remoteProtocol,
    });
    await connection.addIceCandidate(new RTCIceCandidate(candidate as never));
    logCallFlow('ice:add:ok');
  }, [logCallFlow, peerConnectionRef, pendingCandidatesRef]);

  const preparePeerConnection = useCallback(async (session: CallSessionResponse) => {
    if (peerConnectionPreparationRef.current) {
      await peerConnectionPreparationRef.current;
      return;
    }

    const preparation = (async () => {
      logCallFlow('pc:prepare:start', {
        callId: session.callId,
        callType: session.callType,
        state: session.state,
        role: session.role,
        negotiationVersion: session.negotiationVersion,
        iceServersCount: Array.isArray(session.iceServers) ? session.iceServers.length : 0,
        iceServers: Array.isArray(session.iceServers)
          ? session.iceServers.map((server) => ({
              urls: server.urls,
              hasUsername: Boolean(server.username),
              hasCredential: Boolean(server.credential),
            }))
          : [],
      });

      await cleanupPeerConnection();
      setTransportStatus('connecting');

      const isVideo = session.callType === 'video';
      const disableLocalVideoCapture = isVideo && shouldDisableLocalVideoCapture();
      const connection = new RTCPeerConnection({
        iceServers: session.iceServers,
      }) as unknown as PeerConnectionLike;
      peerConnectionRef.current = connection;

      connection.addEventListener('signalingstatechange', () => {
        logCallFlow('pc:signalingState', {
          callId: session.callId,
          signalingState: connection.signalingState,
        });
      });

      connection.addEventListener('iceconnectionstatechange', () => {
        const state = connection.iceConnectionState;
        logCallFlow('pc:iceConnectionState', {
          callId: session.callId,
          iceConnectionState: state,
        });

        if (state === 'failed') {
          logCallFlow('pc:ice:failed:trigger-recovery', { callId: session.callId });
          scheduleRecovery('peer_failed', 150);
          return;
        }

        if (state === 'disconnected') {
          logCallFlow('pc:ice:disconnected:schedule-recovery', { callId: session.callId });
          scheduleRecovery('peer_disconnected', 1800);
        }
      });

      connection.addEventListener('icegatheringstatechange', () => {
        logCallFlow('pc:iceGatheringState', {
          callId: session.callId,
          iceGatheringState: connection.iceGatheringState,
        });
      });

      connection.addEventListener('track', (event: any) => {
        logCallFlow('pc:ontrack', {
          callId: session.callId,
          kind: event.track.kind,
          streams: event.streams.length,
          trackId: event.track.id,
        });

        const [remoteStreamFromEvent] = event.streams;

        if (remoteStreamFromEvent) {
          remoteStreamRef.current = remoteStreamFromEvent;
          setRemoteStream(remoteStreamFromEvent as unknown as CallMediaStream);
          return;
        }

        if (!event.track) {
          logCallFlow('pc:ontrack:skip:no-track', { callId: session.callId });
          return;
        }

        if (!remoteStreamRef.current) {
          remoteStreamRef.current = new MediaStream();
        }

        const stream = remoteStreamRef.current as unknown as {
          getTracks(): Array<{ id: string }>;
          addTrack(track: unknown): void;
        };
        const alreadyPresent = stream.getTracks().some((t) => t.id === (event.track as { id: string }).id);

        if (!alreadyPresent) {
          stream.addTrack(event.track);
          logCallFlow('pc:ontrack:track-added', {
            callId: session.callId,
            kind: event.track.kind,
            totalTracks: remoteStreamRef.current.getTracks().length,
          });
        }

        setRemoteStream(remoteStreamRef.current as unknown as CallMediaStream);
      });

      connection.addEventListener('icecandidate', (event: any) => {
        if (!event.candidate) {
          logCallFlow('pc:onicecandidate:done', { callId: session.callId });
          sendIceCandidate(session.callId, null);
          return;
        }

        const parts = String(event.candidate.candidate).split(' ');
        const candidateType = parts[7] ?? null;
        const protocol = parts[2] ?? null;

        logCallFlow('pc:onicecandidate', {
          callId: session.callId,
          candidateType,
          protocol,
        });
        sendIceCandidate(session.callId, serializeIceCandidate(event.candidate));
      });

      connection.addEventListener('connectionstatechange', () => {
        logCallFlow('pc:connectionState', {
          callId: session.callId,
          connectionState: connection.connectionState,
        });
        switch (connection.connectionState) {
          case 'connected':
            clearDelayedRecoveryTimer();
            clearReconnectWatchdog();
            resetRecoveryBudget();
            patchCurrentCall({ state: 'active' });
            setTransportStatus('connected');
            setCallError(null);
            if (shouldUseSystemCallUi) {
              void markSystemCallConnected(session.callId);
            }
            break;
          case 'connecting':
            setTransportStatus('connecting');
            scheduleReconnectWatchdog(session.callId);
            break;
          case 'disconnected':
            setTransportStatus('reconnecting');
            scheduleRecovery('peer_disconnected', 1800);
            break;
          case 'failed':
            setTransportStatus('failed');
            setCallError('Connection was interrupted. Retry to reconnect.');
            clearReconnectWatchdog();
            scheduleRecovery('peer_failed', 150);
            break;
          case 'closed':
            clearDelayedRecoveryTimer();
            clearReconnectWatchdog();
            setTransportStatus('idle');
            break;
        }
      });

      const mediaAcquireTimeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error('Camera/microphone access timed out. Please allow permissions and try again.')),
          15_000,
        ),
      );

      let stream: Awaited<ReturnType<typeof mediaDevices.getUserMedia>>;
      try {
        const videoConstraints =
          disableLocalVideoCapture
            ? false
            : isVideo
            ? Platform.OS === 'android'
              ? {
                  facingMode: 'user',
                  // Realme C25 / MTK encoder path is unstable at higher capture sizes.
                  width: { min: 320, ideal: 640, max: 640 },
                  height: { min: 240, ideal: 360, max: 360 },
                  frameRate: { min: 15, ideal: 24, max: 24 },
                }
              : {
                  facingMode: 'user',
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                }
            : false;
        if (disableLocalVideoCapture) {
          logCallFlow('pc:video:disable-local-capture:device-workaround', {
            callId: session.callId,
            model: (Platform.constants as { Model?: string } | undefined)?.Model ?? null,
          });
          setVideoEnabled(false);
        }
        await callPermissionsApi.ensureMediaPermissions(Boolean(videoConstraints));
        stream = await Promise.race([
          mediaDevices.getUserMedia({
            audio: true,
            video: videoConstraints,
          }),
          mediaAcquireTimeoutPromise,
        ]);
      } catch (err) {
        const raw = err instanceof Error ? err.message : String(err);
        const lower = raw.toLowerCase();
        if (lower.includes('permission') || lower.includes('denied') || lower.includes('not allowed')) {
          throw new Error('Camera or microphone access was denied. Please allow permissions in Settings and try again.');
        }
        if (lower.includes('not found') || lower.includes('notfound') || lower.includes('devicesnotfound')) {
          throw new Error('No camera or microphone found on this device.');
        }
        throw new Error(`Unable to access camera/microphone: ${raw}`);
      }

      if (peerConnectionRef.current !== connection) {
        logCallFlow('pc:getUserMedia:aborted:call-ended', { callId: session.callId });
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      logCallFlow('pc:getUserMedia:ok', {
        callId: session.callId,
        audioTracks: stream.getAudioTracks().length,
        videoTracks: stream.getTracks().filter((t: any) => t.kind === 'video').length,
      });

      stream.getTracks().forEach((track) => {
        connection.addTrack(track, stream);
      });

      logCallFlow('pc:addTrack:done', {
        callId: session.callId,
        trackCount: stream.getTracks().length,
      });

      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });

      localStreamRef.current = stream as unknown as CallMediaStream;
      setLocalStream(stream as unknown as CallMediaStream);
    })();

    peerConnectionPreparationRef.current = preparation;

    try {
      await preparation;
    } finally {
      if (peerConnectionPreparationRef.current === preparation) {
        peerConnectionPreparationRef.current = null;
      }
    }
  }, [
    cleanupPeerConnection,
    clearDelayedRecoveryTimer,
    clearReconnectWatchdog,
    isMuted,
    localStreamRef,
    logCallFlow,
    markSystemCallConnected,
    patchCurrentCall,
    peerConnectionPreparationRef,
    peerConnectionRef,
    remoteStreamRef,
    resetRecoveryBudget,
    scheduleReconnectWatchdog,
    scheduleRecovery,
    sendIceCandidate,
    serializeIceCandidate,
    setVideoEnabled,
    setCallError,
    setLocalStream,
    setRemoteStream,
    setTransportStatus,
    shouldUseSystemCallUi,
    shouldDisableLocalVideoCapture,
  ]);

  return {
    applyRemoteCandidate,
    cleanupPeerConnection,
    flushPendingCandidates,
    preparePeerConnection,
  };
}
