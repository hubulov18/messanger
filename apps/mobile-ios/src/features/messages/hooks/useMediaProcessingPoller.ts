import { useEffect, useRef } from 'react';

import { getMedia, type MediaObject } from '@features/messages/api/media.api';

/**
 * Polls the server for media items that are still in a non-ready processing state.
 *
 * Instead of waiting for the 12-second thread reload cycle to pick up a finished
 * server transcoding job, this hook watches the supplied mediaIds and re-fetches
 * each one on an independent backoff schedule until it reaches "ready" (or "failed").
 *
 * - First check:  2 s after the hook sees the id
 * - Second check: 4 s
 * - Third+ check: 8 s (capped)
 *
 * Once an item is ready or failed the hook stops polling it and calls `onResolved`.
 */

type PollerEntry = {
  attempt: number;
  timerId: ReturnType<typeof setTimeout> | null;
};

const BASE_DELAY_MS = 2000;
const MAX_DELAY_MS = 8000;

function nextDelay(attempt: number): number {
  return Math.min(BASE_DELAY_MS * 2 ** attempt, MAX_DELAY_MS);
}

function isTerminal(status: string): boolean {
  return status === 'ready' || status === 'failed';
}

export function useMediaProcessingPoller(
  processingMediaIds: string[],
  onResolved: (mediaId: string, media: MediaObject) => void,
): void {
  // Stable ref so interval callbacks always see the latest onResolved without
  // triggering re-registration every render.
  const onResolvedRef = useRef(onResolved);
  useEffect(() => {
    onResolvedRef.current = onResolved;
  });

  const entriesRef = useRef<Map<string, PollerEntry>>(new Map());

  useEffect(() => {
    const entries = entriesRef.current;

    function scheduleNext(mediaId: string) {
      const entry = entries.get(mediaId);
      if (!entry) return;

      const delay = nextDelay(entry.attempt);

      entry.timerId = setTimeout(() => {
        void (async () => {
          try {
            const media = await getMedia(mediaId);
            if (isTerminal(media.processingStatus)) {
              entries.delete(mediaId);
              onResolvedRef.current(mediaId, media);
            } else {
              // Still processing — schedule another check with incremented attempt.
              const next = entries.get(mediaId);
              if (next) {
                next.attempt += 1;
                next.timerId = null;
                scheduleNext(mediaId);
              }
            }
          } catch {
            // Network failure — retry on next schedule.
            const next = entries.get(mediaId);
            if (next) {
              next.attempt = Math.min(next.attempt + 1, 3); // don't back off past 8s for errors
              next.timerId = null;
              scheduleNext(mediaId);
            }
          }
        })();
      }, delay);
    }

    // Register new ids.
    for (const mediaId of processingMediaIds) {
      if (!entries.has(mediaId)) {
        entries.set(mediaId, { attempt: 0, timerId: null });
        scheduleNext(mediaId);
      }
    }

    // Remove ids that are no longer in the list (became ready via thread reload).
    for (const [mediaId, entry] of entries) {
      if (!processingMediaIds.includes(mediaId)) {
        if (entry.timerId !== null) {
          clearTimeout(entry.timerId);
        }
        entries.delete(mediaId);
      }
    }
  });

  // Cleanup all timers on unmount.
  useEffect(() => {
    return () => {
      for (const [, entry] of entriesRef.current) {
        if (entry.timerId !== null) {
          clearTimeout(entry.timerId);
        }
      }
      entriesRef.current.clear();
    };
  }, []);
}
