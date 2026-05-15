import { create } from 'zustand';

import type { CallType, CallParticipant, CallSessionResponse } from '../api/calls.api';

// react-native-webrtc MediaStream — typed loosely to avoid direct import
// (actual usage goes through refs in CallsProvider)
export type CallMediaStream = {
  id: string;
  getTracks: () => Array<{ stop: () => void; enabled: boolean; kind: string }>;
  getAudioTracks: () => Array<{ stop: () => void; enabled: boolean }>;
  getVideoTracks: () => Array<{ stop: () => void; enabled: boolean }>;
  toURL: () => string;
};

export type ActiveCallSession = {
  callId: string;
  chatId: string;
  callType: CallType;
  state: string;
  role: 'caller' | 'callee';
  counterpartUserId: string | null;
  signalingUrl: string | null;
  signalingToken: string | null;
  signalingSessionId: string | null;
  negotiationVersion: number;
  iceServers: CallSessionResponse['iceServers'];
  participants: CallParticipant[];
  startedAt: string;
  acceptedAt: string | null;
  activeAt: string | null;
  endedAt: string | null;
};

type CallSessionState = {
  currentCall: ActiveCallSession | null;
  errorMessage: string | null;
  isMuted: boolean;
  isSpeakerOn: boolean;
  isVideoEnabled: boolean;
  transportStatus: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed';
  // Streams are stored as opaque objects to avoid react-native-webrtc type
  // coupling at the store level; CallsProvider writes them, CallOverlay reads them.
  localStream: CallMediaStream | null;
  remoteStream: CallMediaStream | null;

  setCurrentCall: (call: ActiveCallSession | null) => void;
  patchCurrentCall: (patch: Partial<ActiveCallSession>) => void;
  clearCurrentCall: () => void;
  setCallError: (message: string | null) => void;
  setMuted: (isMuted: boolean) => void;
  setSpeakerOn: (isSpeakerOn: boolean) => void;
  setVideoEnabled: (isVideoEnabled: boolean) => void;
  setTransportStatus: (transportStatus: CallSessionState['transportStatus']) => void;
  setLocalStream: (stream: CallMediaStream | null) => void;
  setRemoteStream: (stream: CallMediaStream | null) => void;
};

export const useCallSessionStore = create<CallSessionState>((set) => ({
  currentCall: null,
  errorMessage: null,
  isMuted: false,
  isSpeakerOn: false,
  isVideoEnabled: false,
  transportStatus: 'idle',
  localStream: null,
  remoteStream: null,

  setCurrentCall: (currentCall) => set({ currentCall }),
  patchCurrentCall: (patch) =>
    set((state) => ({
      currentCall: state.currentCall ? { ...state.currentCall, ...patch } : state.currentCall,
    })),
  clearCurrentCall: () =>
    set({
      currentCall: null,
      isMuted: false,
      isSpeakerOn: false,
      isVideoEnabled: false,
      errorMessage: null,
      transportStatus: 'idle',
      localStream: null,
      remoteStream: null,
    }),
  setCallError: (errorMessage) => set({ errorMessage }),
  setMuted: (isMuted) => set({ isMuted }),
  setSpeakerOn: (isSpeakerOn) => set({ isSpeakerOn }),
  setVideoEnabled: (isVideoEnabled) => set({ isVideoEnabled }),
  setTransportStatus: (transportStatus) => set({ transportStatus }),
  setLocalStream: (localStream) => set({ localStream }),
  setRemoteStream: (remoteStream) => set({ remoteStream }),
}));
