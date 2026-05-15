import { Platform } from 'react-native';
import { startIOSPIP, stopIOSPIP } from 'react-native-webrtc';

type PiPViewRef = { current: unknown } | null;

let registeredPiPViewRef: PiPViewRef = null;
let isPiPRequested = false;

function logPiP(message: string, details?: Record<string, unknown>) {
  if (details) {
    console.log(`[call-pip] ${message}`, details);
    return;
  }

  console.log(`[call-pip] ${message}`);
}

export function registerCallPiPView(ref: PiPViewRef) {
  registeredPiPViewRef = ref;
}

export function unregisterCallPiPView(ref: PiPViewRef) {
  if (registeredPiPViewRef === ref) {
    registeredPiPViewRef = null;
  }

  isPiPRequested = false;
}

export function startCallPiP() {
  if (Platform.OS !== 'ios') {
    return;
  }

  const ref = registeredPiPViewRef;
  if (!ref?.current) {
    logPiP('start:skip:no-view');
    return;
  }

  if (isPiPRequested) {
    return;
  }

  try {
    isPiPRequested = true;
    startIOSPIP(ref);
    logPiP('start');
  } catch (error) {
    isPiPRequested = false;
    logPiP('start:error', {
      message: error instanceof Error ? error.message : String(error),
    });
  }
}

export function stopCallPiP() {
  if (Platform.OS !== 'ios') {
    return;
  }

  const ref = registeredPiPViewRef;
  if (!ref?.current) {
    isPiPRequested = false;
    return;
  }

  if (!isPiPRequested) {
    return;
  }

  try {
    isPiPRequested = false;
    stopIOSPIP(ref);
    logPiP('stop');
  } catch (error) {
    logPiP('stop:error', {
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
