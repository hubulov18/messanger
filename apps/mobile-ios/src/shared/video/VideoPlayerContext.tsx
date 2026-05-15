/**
 * Global video player context.
 *
 * Provides a single VideoPlayerOverlay rendered at the app root so the
 * native AVPlayerLayer stays inside the main UIWindow (React Native Modal
 * creates a separate UIWindow at a higher level, which causes AVPlayerLayer
 * to attach to the wrong window and produce "audio-only" playback).
 */

import { createContext, useContext, useState } from 'react';

export type VideoPlayerRequest = {
  videoUrl: string;
  mimeType?: string;
  title?: string;
  caption?: string | null;
};

type VideoPlayerContextValue = {
  request: VideoPlayerRequest | null;
  show: (req: VideoPlayerRequest) => void;
  hide: () => void;
};

const VideoPlayerContext = createContext<VideoPlayerContextValue>({
  request: null,
  show: () => undefined,
  hide: () => undefined,
});

export function VideoPlayerProvider({ children }: { children?: unknown }) {
  const [request, setRequest] = useState<VideoPlayerRequest | null>(null);

  function show(req: VideoPlayerRequest) {
    setRequest(req);
  }

  function hide() {
    setRequest(null);
  }

  return (
    <VideoPlayerContext.Provider value={{ request, show, hide }}>
      {children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayer(): VideoPlayerContextValue {
  return useContext(VideoPlayerContext);
}
