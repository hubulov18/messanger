import { NativeModules, Platform } from 'react-native';

import type { NotificationSoundPreference } from '@features/settings/state/settings-preferences.store';

type NotificationFeedbackNativeModule = {
  playNotificationSound(
    sound: NotificationSoundPreference,
  ): Promise<boolean>;
};

const nativeModule: NotificationFeedbackNativeModule | null =
  Platform.OS === 'ios'
    ? (
        (NativeModules as { NotificationFeedbackModule?: NotificationFeedbackNativeModule })
          .NotificationFeedbackModule ?? null
      )
    : null;

export async function playInAppNotificationSound(sound: NotificationSoundPreference) {
  if (!nativeModule || sound === 'None') {
    return false;
  }

  try {
    return await nativeModule.playNotificationSound(sound);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn('[notification-feedback] playNotificationSound failed', { message, sound });
    return false;
  }
}
