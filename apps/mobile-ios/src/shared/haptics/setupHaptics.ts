import { Vibration } from 'react-native';
import { setHapticImplementation, type HapticIntensity } from '@telegram/ui';
import { useSettingsPreferencesStore } from '@features/settings/state/settings-preferences.store';

/**
 * Host-side haptic implementation for @telegram/ui.
 *
 * Uses React Native's built-in Vibration API with intensity-based durations.
 * Respects the user's vibration preference from settings — when disabled,
 * all haptic calls are silently swallowed.
 *
 * Call once at app bootstrap (before any UI renders).
 */

const DURATIONS: Record<HapticIntensity, number> = {
  selection: 5,
  light: 10,
  medium: 20,
  heavy: 35,
  success: 15,
  warning: 25,
};

function hostHapticImpl(intensity: HapticIntensity): void {
  const vibrationEnabled = useSettingsPreferencesStore.getState().vibrationEnabled;
  if (!vibrationEnabled) return;
  Vibration.vibrate(DURATIONS[intensity]);
}

export function setupHaptics(): void {
  setHapticImplementation(hostHapticImpl);
}
