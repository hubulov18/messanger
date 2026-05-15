import { useCallback } from 'react';
import { RTCSessionDescription } from 'react-native-webrtc';

import type { CallType } from '../api/calls.api';

type RefObjectLike<T> = { current: T };

type PeerConnectionLike = {
  createOffer: (options: { offerToReceiveAudio: boolean; offerToReceiveVideo: boolean }) => Promise<{
    type?: string;
    sdp?: string | null;
  }>;
  createAnswer: () => Promise<{ type?: string; sdp?: string | null }>;
  setLocalDescription: (description: unknown) => Promise<void>;
  setRemoteDescription: (description: unknown) => Promise<void>;
  localDescription?: { type?: string | null; sdp?: string | null } | null;
  remoteDescription?: { type?: string | null; sdp?: string | null } | null;
  signalingState: string;
};

type CallNegotiationLifecycleParams = {
  peerConnectionRef: RefObjectLike<PeerConnectionLike | null>;
  offerCreationRef: RefObjectLike<Promise<void> | null>;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  serializeSessionDescription: (
    description: { type?: string; sdp?: string | null } | null | undefined,
  ) => { type: string | null; sdp: string | null } | null;
  sendCallOffer: (callId: string, offer: object) => void;
  sendCallAnswer: (callId: string, answer: object) => void;
  flushPendingCandidates: () => Promise<void>;
};

export function useCallNegotiationLifecycle({
  peerConnectionRef,
  offerCreationRef,
  logCallFlow,
  serializeSessionDescription,
  sendCallOffer,
  sendCallAnswer,
  flushPendingCandidates,
}: CallNegotiationLifecycleParams) {
  const resendPendingLocalOffer = useCallback((callId: string) => {
    const connection = peerConnectionRef.current;
    const localDescription = connection?.localDescription;

    if (!connection || !localDescription || localDescription.type !== 'offer' || connection.remoteDescription) {
      return false;
    }

    const serializedOffer = serializeSessionDescription(localDescription);
    if (!serializedOffer) {
      throw new Error('Unable to serialize pending local offer');
    }

    logCallFlow('offer:resend:pending-local', {
      callId,
      signalingState: connection.signalingState,
    });
    sendCallOffer(callId, serializedOffer);
    return true;
  }, [logCallFlow, peerConnectionRef, sendCallOffer, serializeSessionDescription]);

  const createAndSendOffer = useCallback(async (callId: string, callType: CallType = 'audio') => {
    if (offerCreationRef.current) {
      logCallFlow('offer:create:skip:in-flight', { callId });
      await offerCreationRef.current;
      resendPendingLocalOffer(callId);
      return;
    }

    const connection = peerConnectionRef.current;
    if (!connection) {
      logCallFlow('offer:skip:no-pc', { callId });
      return;
    }

    if (connection.signalingState !== 'stable') {
      if (resendPendingLocalOffer(callId)) {
        return;
      }

      logCallFlow('offer:create:skip:non-stable', {
        callId,
        signalingState: connection.signalingState,
      });
      return;
    }

    const creation = (async () => {
      logCallFlow('offer:create:start', { callId, callType });
      const offer = await connection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: callType === 'video',
      });
      logCallFlow('offer:create:ok', {
        callId,
        sdpHasVideo: offer.sdp?.includes('m=video') ?? false,
      });
      await connection.setLocalDescription(offer);
      logCallFlow('offer:setLocalDescription:ok', {
        callId,
        localDescriptionType: connection.localDescription?.type ?? null,
      });
      const serializedOffer = serializeSessionDescription(offer);
      if (!serializedOffer) {
        throw new Error('Unable to serialize local offer');
      }
      sendCallOffer(callId, serializedOffer);
    })();

    offerCreationRef.current = creation;

    try {
      await creation;
    } finally {
      if (offerCreationRef.current === creation) {
        offerCreationRef.current = null;
      }
    }
  }, [
    logCallFlow,
    offerCreationRef,
    peerConnectionRef,
    resendPendingLocalOffer,
    sendCallOffer,
    serializeSessionDescription,
  ]);

  const applyRemoteOffer = useCallback(async (callId: string, sdp: object) => {
    const connection = peerConnectionRef.current;
    if (!connection) {
      logCallFlow('offer:recv:no-pc', { callId });
      return;
    }

    const remoteOffer = new RTCSessionDescription(sdp as never) as unknown as { sdp?: string | null };
    const isDuplicateOffer = connection.remoteDescription?.type === 'offer' && connection.remoteDescription?.sdp === remoteOffer.sdp;
    if (isDuplicateOffer) {
      logCallFlow('offer:recv:duplicate', {
        callId,
        signalingState: connection.signalingState,
        localDescriptionType: connection.localDescription?.type ?? null,
      });
      return;
    }

    if (connection.signalingState !== 'stable') {
      logCallFlow('offer:recv:skip:non-stable', {
        callId,
        signalingState: connection.signalingState,
      });
      return;
    }

    logCallFlow('offer:recv', { callId });
    await connection.setRemoteDescription(remoteOffer);
    logCallFlow('offer:setRemoteDescription:ok', {
      callId,
      remoteDescriptionType: connection.remoteDescription?.type ?? null,
    });
    await flushPendingCandidates();
    const answer = await connection.createAnswer();
    logCallFlow('answer:create:ok', {
      callId,
      sdpHasVideo: answer.sdp?.includes('m=video') ?? false,
    });
    if (connection.signalingState !== 'have-remote-offer') {
      logCallFlow('answer:setLocalDescription:skip:unexpected-state', {
        callId,
        signalingState: connection.signalingState,
      });
      return;
    }
    await connection.setLocalDescription(answer);
    logCallFlow('answer:setLocalDescription:ok', {
      callId,
      localDescriptionType: connection.localDescription?.type ?? null,
    });
    const serializedAnswer = serializeSessionDescription(answer);
    if (!serializedAnswer) {
      throw new Error('Unable to serialize local answer');
    }
    sendCallAnswer(callId, serializedAnswer);
  }, [flushPendingCandidates, logCallFlow, peerConnectionRef, sendCallAnswer, serializeSessionDescription]);

  const applyRemoteAnswer = useCallback(async (sdp: object) => {
    const connection = peerConnectionRef.current;
    if (!connection) {
      logCallFlow('answer:recv:no-pc');
      return;
    }

    const remoteAnswer = new RTCSessionDescription(sdp as never) as unknown as { sdp?: string | null };
    if (connection.signalingState !== 'have-local-offer') {
      const isDuplicateAnswer =
        connection.remoteDescription?.type === 'answer' && connection.remoteDescription?.sdp === remoteAnswer.sdp;

      logCallFlow(isDuplicateAnswer ? 'answer:recv:duplicate' : 'answer:recv:skip:unexpected-state', {
        signalingState: connection.signalingState,
      });
      return;
    }

    logCallFlow('answer:recv');
    await connection.setRemoteDescription(remoteAnswer);
    logCallFlow('answer:setRemoteDescription:ok', {
      remoteDescriptionType: connection.remoteDescription?.type ?? null,
    });
    await flushPendingCandidates();
  }, [flushPendingCandidates, logCallFlow, peerConnectionRef]);

  return {
    applyRemoteAnswer,
    applyRemoteOffer,
    createAndSendOffer,
  };
}
