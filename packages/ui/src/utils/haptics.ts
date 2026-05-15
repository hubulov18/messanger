import { Vibration } from 'react-native';

/**
 * Haptics abstraction.
 *
 * React Native ships `Vibration` (coarse, cross-platform) but not a proper
 * haptics API. Most apps add react-native-haptic-feedback; we don't pull it
 * into @telegram/ui (keeps the package dependency-free beyond RN itself).
 *
 * The host app can swap in a richer implementation via `setHapticImplementation`
 * at boot. Falls back to `Vibration.vibrate` otherwise.
 */

export type HapticIntensity = 'selection' | 'light' | 'medium' | 'heavy' | 'success' | 'warning';

export type HapticImpl = (intensity: HapticIntensity) => void;

const defaultImpl: HapticImpl = (intensity) => {
  // Coarse fallback. Short pulses for light feedback, longer for emphasis.
  const durations: Record<HapticIntensity, number> = {
    selection: 5,
    light: 10,
    medium: 20,
    heavy: 35,
    success: 15,
    warning: 25,
  };
  Vibration.vibrate(durations[intensity]);
};

let impl: HapticImpl = defaultImpl;

export function setHapticImplementation(next: HapticImpl): void {
  impl = next;
}

export function haptic(intensity: HapticIntensity): void {
  impl(intensity);
}
