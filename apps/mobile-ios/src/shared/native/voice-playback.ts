import { NativeModules } from 'react-native';

type PlaybackState = {
  isPlaying: boolean;
  url: string | null;
};

type NativeVoicePlaybackModule = {
  play(url: string): Promise<void>;
  stop(): Promise<void>;
  getPlaybackState(): Promise<{ isPlaying?: boolean; url?: string | null }>;
};

export class VoicePlaybackUnavailableError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function getVoicePlaybackModule() {
  const nativeModules = NativeModules as {
    VoicePlaybackModule?: NativeVoicePlaybackModule;
  };

  const module = nativeModules.VoicePlaybackModule;
  if (!module) {
    throw new VoicePlaybackUnavailableError('Audio playback is unavailable on this build.');
  }

  return module;
}

function toPlaybackError(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  return new VoicePlaybackUnavailableError(message || fallbackMessage);
}

export const voicePlaybackApi = {
  async play(url: string) {
    try {
      await getVoicePlaybackModule().play(url);
    } catch (error) {
      throw toPlaybackError(error, 'Unable to start audio playback.');
    }
  },

  async stop() {
    try {
      await getVoicePlaybackModule().stop();
    } catch (error) {
      throw toPlaybackError(error, 'Unable to stop audio playback.');
    }
  },

  async getPlaybackState(): Promise<PlaybackState> {
    try {
      const state = await getVoicePlaybackModule().getPlaybackState();
      return {
        isPlaying: state.isPlaying === true,
        url: typeof state.url === 'string' ? state.url : null,
      };
    } catch (error) {
      throw toPlaybackError(error, 'Unable to read audio playback state.');
    }
  },
};
