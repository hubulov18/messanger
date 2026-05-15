import { create } from 'zustand';

type BootStatus = 'idle' | 'restoring' | 'ready';
type AuthStatus = 'anonymous' | 'authenticated';
export type AuthFlowStep = 'phone_entry' | 'code_verification' | 'profile_setup';

export type CurrentUserProfile = {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarMediaId: string | null;
  privacy: {
    lastSeenVisibility: string;
    phoneVisibility: string;
    profilePhotoVisibility: string;
  };
};

export type PendingChallenge = {
  challengeId: string;
  phoneNumber: string;
  expiresAt: string;
};

type SessionState = {
  bootStatus: BootStatus;
  authStatus: AuthStatus;
  authFlowStep: AuthFlowStep;
  accessToken: string | null;
  refreshToken: string | null;
  deviceId: string | null;
  currentUser: CurrentUserProfile | null;
  pendingChallenge: PendingChallenge | null;
  setBootStatus: (bootStatus: BootStatus) => void;
  beginRestore: () => void;
  beginPhoneEntry: () => void;
  setPendingChallenge: (challenge: PendingChallenge) => void;
  clearPendingChallenge: () => void;
  setAuthFlowStep: (authFlowStep: AuthFlowStep) => void;
  setAuthenticatedSession: (params: {
    accessToken: string;
    refreshToken: string;
    deviceId: string;
    currentUser: CurrentUserProfile;
  }) => void;
  setProfileSetupSession: (params: {
    accessToken: string;
    refreshToken: string;
    deviceId: string;
    currentUser: CurrentUserProfile;
  }) => void;
  setCurrentUser: (currentUser: CurrentUserProfile) => void;
  setAnonymousSession: (deviceId: string) => void;
  clearSession: (deviceId: string | null) => void;
};

export const useSessionStore = create<SessionState>((set: (partial: Partial<SessionState>) => void) => ({
  bootStatus: 'idle',
  authStatus: 'anonymous',
  authFlowStep: 'phone_entry',
  accessToken: null,
  refreshToken: null,
  deviceId: null,
  currentUser: null,
  pendingChallenge: null,
  setBootStatus: (bootStatus: BootStatus) => set({ bootStatus }),
  beginRestore: () => set({ bootStatus: 'restoring' }),
  beginPhoneEntry: () => set({ authFlowStep: 'phone_entry', pendingChallenge: null }),
  setPendingChallenge: (pendingChallenge: PendingChallenge) =>
    set({
      authFlowStep: 'code_verification',
      pendingChallenge,
    }),
  clearPendingChallenge: () =>
    set({
      authFlowStep: 'phone_entry',
      pendingChallenge: null,
    }),
  setAuthFlowStep: (authFlowStep: AuthFlowStep) => set({ authFlowStep }),
  setAuthenticatedSession: ({
    accessToken,
    refreshToken,
    deviceId,
    currentUser,
  }: {
    accessToken: string;
    refreshToken: string;
    deviceId: string;
    currentUser: CurrentUserProfile;
  }) =>
    set({
      bootStatus: 'ready',
      authStatus: 'authenticated',
      authFlowStep: 'phone_entry',
      accessToken,
      refreshToken,
      deviceId,
      currentUser,
      pendingChallenge: null,
    }),
  setProfileSetupSession: ({
    accessToken,
    refreshToken,
    deviceId,
    currentUser,
  }: {
    accessToken: string;
    refreshToken: string;
    deviceId: string;
    currentUser: CurrentUserProfile;
  }) =>
    set({
      bootStatus: 'ready',
      authStatus: 'anonymous',
      authFlowStep: 'profile_setup',
      accessToken,
      refreshToken,
      deviceId,
      currentUser,
      pendingChallenge: null,
    }),
  setCurrentUser: (currentUser: CurrentUserProfile) => set({ currentUser }),
  setAnonymousSession: (deviceId: string) =>
    set({
      bootStatus: 'ready',
      authStatus: 'anonymous',
      authFlowStep: 'phone_entry',
      accessToken: null,
      refreshToken: null,
      deviceId,
      currentUser: null,
      pendingChallenge: null,
    }),
  clearSession: (deviceId: string | null) =>
    set({
      bootStatus: 'ready',
      authStatus: 'anonymous',
      authFlowStep: 'phone_entry',
      accessToken: null,
      refreshToken: null,
      deviceId,
      currentUser: null,
      pendingChallenge: null,
    }),
}));
