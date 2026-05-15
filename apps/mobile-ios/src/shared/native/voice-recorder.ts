import { NativeModules } from 'react-native';

import type { DeviceMediaAsset } from './media-picker';

type NativeVoiceRecorderModule = {
  startRecording(): Promise<void>;
  stopRecording(): Promise<DeviceMediaAsset>;
  cancelRecording(): Promise<void>;
};

export class VoiceRecorderUnavailableError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function getVoiceRecorderModule() {
  const nativeModules = NativeModules as {
    VoiceRecorderModule?: NativeVoiceRecorderModule;
  };

  const module = nativeModules.VoiceRecorderModule;
  if (!module) {
    throw new VoiceRecorderUnavailableError('Voice recorder is unavailable on this build.');
  }

  return module;
}

function toRecorderError(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  return new VoiceRecorderUnavailableError(message || fallbackMessage);
}

export const voiceRecorderApi = {
  async startRecording() {
    try {
      await getVoiceRecorderModule().startRecording();
    } catch (error) {
      throw toRecorderError(error, 'Unable to start voice recording.');
    }
  },

  async stopRecording() {
    try {
      return await getVoiceRecorderModule().stopRecording();
    } catch (error) {
      throw toRecorderError(error, 'Unable to stop voice recording.');
    }
  },

  async cancelRecording() {
    try {
      await getVoiceRecorderModule().cancelRecording();
    } catch (error) {
      throw toRecorderError(error, 'Unable to cancel voice recording.');
    }
  },
};
