import { NativeModules, Platform } from 'react-native';

type NativeVideoPlaybackModule = {
  present(url: string, title?: string | null): Promise<void>;
  dismiss(): Promise<void>;
};

export class VideoPlaybackUnavailableError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function getVideoPlaybackModule() {
  const nativeModules = NativeModules as {
    VideoPlaybackModule?: NativeVideoPlaybackModule;
  };

  const module = Platform.OS === 'ios' ? nativeModules.VideoPlaybackModule : null;
  if (!module) {
    throw new VideoPlaybackUnavailableError('In-app video playback is unavailable on this build.');
  }

  return module;
}

function toVideoPlaybackError(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  return new VideoPlaybackUnavailableError(message || fallbackMessage);
}

export function isNativeVideoPlaybackAvailable() {
  try {
    getVideoPlaybackModule();
    return true;
  } catch {
    return false;
  }
}

export const videoPlaybackApi = {
  async present(url: string, title?: string | null) {
    try {
      await getVideoPlaybackModule().present(url, title ?? null);
    } catch (error) {
      throw toVideoPlaybackError(error, 'Unable to start video playback.');
    }
  },

  async dismiss() {
    try {
      await getVideoPlaybackModule().dismiss();
    } catch (error) {
      throw toVideoPlaybackError(error, 'Unable to close the video player.');
    }
  },
};
