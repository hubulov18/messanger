import { NativeEventEmitter, NativeModules } from 'react-native';

export type CallManagerEvent =
  | {
      type: 'voipPushRegistered';
      token: string | null;
    }
  | {
      type: 'incomingVoipPushReceived';
      callId: string;
      chatId?: string | null;
      callerUserId?: string | null;
      displayName?: string | null;
      callType?: 'audio' | 'video' | null;
    }
  | {
      type: 'incomingCallDisplayed';
      callId: string;
      handle: string;
      displayName?: string | null;
    }
  | {
      type: 'callAnswered';
      callId: string | null;
    }
  | {
      type: 'callEnded';
      callId: string | null;
      reason?: string | null;
    }
  | {
      type: 'callMuted';
      callId: string | null;
      isMuted: boolean;
    }
  | {
      type: 'callManagerError';
      callId?: string | null;
      code: string;
      message: string;
    };

type NativeCallManagerModule = {
  configure?(enableVoipPush?: boolean): void;
  getVoipPushToken(): Promise<string | null>;
  startRingtone?(mode: 'incoming' | 'outgoing'): Promise<void>;
  stopRingtone?(): Promise<void>;
  reportIncomingCall(callId: string, handle: string, displayName?: string | null, hasVideo?: boolean): Promise<void>;
  startOutgoingCall(callId: string, handle: string, displayName?: string | null, hasVideo?: boolean): Promise<void>;
  markCallConnected(callId: string): Promise<void>;
  endCall(callId: string): Promise<void>;
  setMuted(callId: string, isMuted: boolean): Promise<void>;
  setSpeakerEnabled(enabled: boolean): Promise<void>;
  ensureCallAudioSession?(speakerEnabled: boolean, hasVideo?: boolean): Promise<void>;
};

const nativeModule = (NativeModules as { CallManagerModule?: NativeCallManagerModule }).CallManagerModule ?? null;
const emitter = nativeModule ? new NativeEventEmitter(nativeModule as never) : null;
const eventNames: CallManagerEvent['type'][] = [
  'voipPushRegistered',
  'incomingVoipPushReceived',
  'incomingCallDisplayed',
  'callAnswered',
  'callEnded',
  'callMuted',
  'callManagerError',
];

let didConfigure = false;
let didEnableVoipPush = false;

export function isCallManagerAvailable() {
  return nativeModule !== null;
}

export function configureCallManager(enableVoipPush = false) {
  if (!nativeModule) {
    return;
  }

  if (didConfigure && (!enableVoipPush || didEnableVoipPush)) {
    return;
  }

  nativeModule.configure?.(enableVoipPush || didEnableVoipPush);
  didConfigure = true;
  didEnableVoipPush = didEnableVoipPush || enableVoipPush;
}

export async function getVoipPushToken() {
  // Guard: nativeModule exists but the specific method may not be implemented
  // on this build — calling undefined() throws "TypeError: undefined is not a function".
  if (!nativeModule || typeof nativeModule.getVoipPushToken !== 'function') {
    return null;
  }

  configureCallManager(true);
  return nativeModule.getVoipPushToken();
}

export function subscribeToCallManagerEvents(listener: (event: CallManagerEvent) => void) {
  if (!emitter) {
    return () => undefined;
  }

  const subscriptions = eventNames.map((eventName) =>
    emitter.addListener(eventName, (payload: unknown) => {
      listener({
        type: eventName,
        ...(((payload as Record<string, unknown> | null | undefined) ?? {})),
      } as CallManagerEvent);
    }),
  );

  return () => {
    subscriptions.forEach((subscription) => subscription.remove());
  };
}

export async function reportIncomingSystemCall(
  callId: string,
  handle: string,
  displayName?: string | null,
  hasVideo = false,
) {
  if (!nativeModule || typeof nativeModule.reportIncomingCall !== 'function') {
    return;
  }

  configureCallManager();
  await nativeModule.reportIncomingCall(callId, handle, displayName ?? null, hasVideo);
}

export async function startOutgoingSystemCall(
  callId: string,
  handle: string,
  displayName?: string | null,
  hasVideo = false,
) {
  if (!nativeModule || typeof nativeModule.startOutgoingCall !== 'function') {
    return;
  }

  configureCallManager();
  await nativeModule.startOutgoingCall(callId, handle, displayName ?? null, hasVideo);
}

export async function markSystemCallConnected(callId: string) {
  if (!nativeModule || typeof nativeModule.markCallConnected !== 'function') {
    return;
  }

  await nativeModule.markCallConnected(callId);
}

export async function endSystemCall(callId: string) {
  if (!nativeModule || typeof nativeModule.endCall !== 'function') {
    return;
  }

  await nativeModule.endCall(callId);
}

export async function setSystemCallMuted(callId: string, isMuted: boolean) {
  if (!nativeModule || typeof nativeModule.setMuted !== 'function') {
    return;
  }

  await nativeModule.setMuted(callId, isMuted);
}

export async function setSystemSpeakerEnabled(enabled: boolean) {
  if (!nativeModule || typeof nativeModule.setSpeakerEnabled !== 'function') {
    return;
  }

  await nativeModule.setSpeakerEnabled(enabled);
}

export async function ensureSystemCallAudioSession(speakerEnabled: boolean, hasVideo = false) {
  if (!nativeModule?.ensureCallAudioSession) {
    return;
  }

  await nativeModule.ensureCallAudioSession(speakerEnabled, hasVideo);
}

export async function startSystemRingtone(mode: 'incoming' | 'outgoing') {
  if (!nativeModule?.startRingtone) {
    return;
  }

  await nativeModule.startRingtone(mode);
}

export async function stopSystemRingtone() {
  if (!nativeModule?.stopRingtone) {
    return;
  }

  await nativeModule.stopRingtone();
}
