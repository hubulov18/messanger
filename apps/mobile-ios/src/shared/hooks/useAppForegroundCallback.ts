import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import type { AppStateStatus } from 'react-native';

/**
 * Fires `callback` once each time the app transitions from background (or inactive) to active.
 * Useful for triggering an immediate silent re-poll when the user returns to the app.
 *
 * The callback ref is stable — you don't need to memoize it; the hook handles that internally.
 */
export function useAppForegroundCallback(callback: () => void): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    // Initialise to 'background' — safe because we only react to *transitions* to active,
    // so if the app is already active at mount time no spurious callback is fired.
    let prevState: AppStateStatus = 'background';

    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (prevState !== 'active' && nextState === 'active') {
        callbackRef.current();
      }
      prevState = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
