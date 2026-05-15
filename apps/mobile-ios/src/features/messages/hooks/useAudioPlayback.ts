import { useCallback, useEffect, useRef, useState } from 'react';

import { voicePlaybackApi } from '@shared/native/voice-playback';

export type AudioPlaybackPhase = 'idle' | 'loading' | 'playing' | 'error';

export type UseAudioPlaybackResult = {
  /** mediaId that is currently active (loading, playing, or errored). */
  activeMediaId: string | null;
  phase: AudioPlaybackPhase;
  /** Error messages keyed by mediaId, preserved so the UI can show them after playback ends. */
  errorByMediaId: Record<string, string>;
  /**
   * Toggle playback for a given mediaId + URL.
   * - Same item and currently loading/playing → stop.
   * - Different item → stop current, then start the new one.
   */
  toggle: (mediaId: string, url: string) => Promise<void>;
  /** Imperatively stop whatever is playing. */
  stop: () => Promise<void>;
};

const SYNC_INTERVAL_MS = 750;

export function useAudioPlayback(): UseAudioPlaybackResult {
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const [phase, setPhase] = useState<AudioPlaybackPhase>('idle');
  const [errorByMediaId, setErrorByMediaId] = useState<Record<string, string>>({});

  // Track whether a stop was requested by the user vs. natural end-of-track.
  const stoppingRef = useRef(false);
  // Keep current mediaId accessible inside the sync interval without closure staleness.
  const activeMediaIdRef = useRef<string | null>(null);

  useEffect(() => {
    activeMediaIdRef.current = activeMediaId;
  }, [activeMediaId]);

  // Sync playback state from the native module while something is playing.
  useEffect(() => {
    if (phase !== 'playing') {
      return;
    }

    let cancelled = false;

    const sync = async () => {
      try {
        const state = await voicePlaybackApi.getPlaybackState();

        if (cancelled || stoppingRef.current) {
          return;
        }

        if (!state.isPlaying) {
          // Track finished naturally.
          setActiveMediaId(null);
          setPhase('idle');
        }
      } catch {
        if (!cancelled) {
          setActiveMediaId(null);
          setPhase('idle');
        }
      }
    };

    const intervalId = setInterval(() => void sync(), SYNC_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [phase]);

  // Stop playback on unmount.
  useEffect(() => {
    return () => {
      void voicePlaybackApi.stop().catch(() => undefined);
    };
  }, []);

  const stop = useCallback(async () => {
    stoppingRef.current = true;
    try {
      await voicePlaybackApi.stop();
    } catch {
      // Ignore — best-effort stop.
    } finally {
      stoppingRef.current = false;
      setActiveMediaId(null);
      setPhase('idle');
    }
  }, []);

  const toggle = useCallback(
    async (mediaId: string, url: string) => {
      // Clear stale error for this item.
      setErrorByMediaId((current) => {
        if (!current[mediaId]) return current;
        const next = { ...current };
        delete next[mediaId];
        return next;
      });

      // Tapping the active item while it's loading or playing → stop.
      if (activeMediaIdRef.current === mediaId && phase !== 'idle' && phase !== 'error') {
        await stop();
        return;
      }

      // If a different item is playing, stop it first.
      if (activeMediaIdRef.current !== null) {
        stoppingRef.current = true;
        try {
          await voicePlaybackApi.stop();
        } catch {
          // Proceed anyway.
        } finally {
          stoppingRef.current = false;
        }
      }

      setActiveMediaId(mediaId);
      setPhase('loading');

      try {
        await voicePlaybackApi.play(url);
        // play() resolves when the native module starts streaming — transition to playing.
        setPhase('playing');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to play audio';
        setErrorByMediaId((current) => ({ ...current, [mediaId]: message }));
        setActiveMediaId(null);
        setPhase('error');
      }
    },
    [phase, stop],
  );

  return { activeMediaId, phase, errorByMediaId, toggle, stop };
}
