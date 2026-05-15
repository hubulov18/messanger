import { apiRequest } from '@shared/api/http-client';

export type CallType = 'audio' | 'video';

export type CallParticipant = {
  userId: string;
  role: 'caller' | 'callee';
  state: string;
};

export type CallSessionResponse = {
  callId: string;
  chatId: string;
  callType: CallType;
  state: string;
  role: 'caller' | 'callee';
  counterpartUserId: string | null;
  signalingUrl: string;
  signalingToken: string;
  signalingSessionId: string;
  negotiationVersion: number;
  iceServers: Array<{
    urls: string[];
    username?: string;
    credential?: string;
  }>;
  participants: CallParticipant[];
  startedAt: string;
  acceptedAt: string | null;
  activeAt: string | null;
  endedAt: string | null;
};

export type CallDetailsResponse = {
  callId: string;
  chatId: string;
  callType: CallType;
  state: string;
  counterpartUserId: string | null;
  participants: CallParticipant[];
  startedAt: string;
  acceptedAt: string | null;
  activeAt: string | null;
  endedAt: string | null;
};

export function startCall(chatId: string, callType: CallType = 'audio') {
  return apiRequest<CallSessionResponse>({
    method: 'POST',
    path: '/calls',
    authenticated: true,
    body: { chatId, callType },
  });
}

export function getCall(callId: string) {
  return apiRequest<CallDetailsResponse>({
    method: 'GET',
    path: `/calls/${callId}`,
    authenticated: true,
  });
}

export function acceptCall(callId: string) {
  return apiRequest<CallSessionResponse>({
    method: 'POST',
    path: `/calls/${callId}/accept`,
    authenticated: true,
  });
}

export function declineCall(callId: string) {
  return apiRequest<{ success: true; callId: string; state: string }>({
    method: 'POST',
    path: `/calls/${callId}/decline`,
    authenticated: true,
  });
}

export function endCall(callId: string) {
  return apiRequest<{ success: true; callId: string; state: string }>({
    method: 'POST',
    path: `/calls/${callId}/end`,
    authenticated: true,
  });
}

export function rejoinCall(callId: string, options?: { restartMedia?: boolean }) {
  return apiRequest<CallSessionResponse>({
    method: 'POST',
    path: `/calls/${callId}/join`,
    authenticated: true,
    body: options?.restartMedia === true ? { restartMedia: true } : undefined,
  });
}
