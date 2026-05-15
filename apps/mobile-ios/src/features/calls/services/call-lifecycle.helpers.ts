export function toUserFacingCallError(message: string) {
  const normalizedMessage = message.trim();

  if (!normalizedMessage) {
    return 'Unable to reconnect the call right now.';
  }

  if (normalizedMessage.includes('Unable to rejoin call signaling')) {
    return 'Unable to reconnect to the call signaling channel.';
  }

  if (normalizedMessage.includes('Unable to join call signaling')) {
    return 'Unable to connect to the call signaling channel.';
  }

  return normalizedMessage;
}

export function matchesCurrentNegotiationVersion(
  currentCall: { callId: string; negotiationVersion: number } | null,
  eventNegotiationVersion: number | null,
  eventType: 'call.ready' | 'call.offer' | 'call.answer' | 'call.ice_candidate',
  logCallFlow: (message: string, details?: Record<string, unknown>) => void,
) {
  if (!currentCall) {
    logCallFlow('signal:negotiation:skip:no-current-call', {
      callId: null,
      eventType,
      eventNegotiationVersion,
    });
    return false;
  }

  if (!eventNegotiationVersion) {
    logCallFlow('signal:negotiation:skip:missing-event-version', {
      callId: currentCall.callId,
      eventType,
      currentNegotiationVersion: currentCall.negotiationVersion,
    });
    return false;
  }

  if (currentCall.negotiationVersion !== eventNegotiationVersion) {
    logCallFlow('signal:negotiation:skip:stale', {
      callId: currentCall.callId,
      eventType,
      currentNegotiationVersion: currentCall.negotiationVersion,
      eventNegotiationVersion,
    });
    return false;
  }

  return true;
}

export function serializeSessionDescription(
  description: { type?: string; sdp?: string | null } | null | undefined,
) {
  if (!description) {
    return null;
  }

  return {
    type: description.type ?? null,
    sdp: description.sdp ?? null,
  };
}

export function serializeIceCandidate(
  candidate:
    | {
        candidate?: string | null;
        sdpMid?: string | null;
        sdpMLineIndex?: number | null;
        usernameFragment?: string | null;
      }
    | null
    | undefined,
) {
  if (!candidate) {
    return null;
  }

  return {
    candidate: candidate.candidate ?? null,
    sdpMid: candidate.sdpMid ?? null,
    sdpMLineIndex: candidate.sdpMLineIndex ?? null,
    usernameFragment: candidate.usernameFragment ?? null,
  };
}
