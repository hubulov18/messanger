import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemePreference = 'system' | 'light' | 'dark';
export type TextSizePreference = 'default' | 'large';
export type NotificationSoundPreference = 'Default' | 'Chime' | 'Aurora' | 'None';
export type QuietHoursPreference = 'Off' | '22:00–07:00' | '23:00–08:00';
export type InAppBannerStylePreference = 'Full' | 'Compact' | 'Silent';
export type MediaRetentionPreference = '3 days' | '1 week' | 'Forever';
export type CallDataUsagePreference = 'Standard' | 'Reduced' | 'Minimal';

// Client-side only until backend privacy endpoint supports these fields.
export type PrivacyVisibility = 'everyone' | 'contacts' | 'nobody';

// Client-side chat experience preferences.
export type LanguagePreference = 'system' | 'english' | 'thai' | 'russian' | 'ossetian' | 'tagalog';

type SettingsPreferencesState = {
  // Appearance
  themePreference: ThemePreference;
  textSizePreference: TextSizePreference;

  // Notifications
  messageNotificationsEnabled: boolean;
  groupNotificationsEnabled: boolean;
  showNotificationPreviews: boolean;
  badgeCountEnabled: boolean;
  notificationSoundPreference: NotificationSoundPreference;
  inAppSoundsEnabled: boolean;
  vibrationEnabled: boolean;
  quietHoursPreference: QuietHoursPreference;
  inAppBannerStylePreference: InAppBannerStylePreference;

  // Data & Storage
  mediaRetentionPreference: MediaRetentionPreference;
  callDataUsagePreference: CallDataUsagePreference;
  autoDownloadOnWifi: boolean;
  autoDownloadOnCellular: boolean;

  // Privacy (client-side until backend adds these fields to /v1/me/privacy)
  callPrivacy: PrivacyVisibility;
  groupInvitePrivacy: PrivacyVisibility;

  // Language & Chat
  languagePreference: LanguagePreference;
  linkPreviewsEnabled: boolean;
  largeEmojiEnabled: boolean;
  autoplayVideoPreviewsEnabled: boolean;

  // Actions
  setThemePreference: (themePreference: ThemePreference) => void;
  setTextSizePreference: (textSizePreference: TextSizePreference) => void;
  setMessageNotificationsEnabled: (messageNotificationsEnabled: boolean) => void;
  setGroupNotificationsEnabled: (groupNotificationsEnabled: boolean) => void;
  setShowNotificationPreviews: (showNotificationPreviews: boolean) => void;
  setBadgeCountEnabled: (badgeCountEnabled: boolean) => void;
  setNotificationSoundPreference: (notificationSoundPreference: NotificationSoundPreference) => void;
  setInAppSoundsEnabled: (inAppSoundsEnabled: boolean) => void;
  setVibrationEnabled: (vibrationEnabled: boolean) => void;
  setQuietHoursPreference: (quietHoursPreference: QuietHoursPreference) => void;
  setInAppBannerStylePreference: (inAppBannerStylePreference: InAppBannerStylePreference) => void;
  setMediaRetentionPreference: (mediaRetentionPreference: MediaRetentionPreference) => void;
  setCallDataUsagePreference: (callDataUsagePreference: CallDataUsagePreference) => void;
  setAutoDownloadOnWifi: (autoDownloadOnWifi: boolean) => void;
  setAutoDownloadOnCellular: (autoDownloadOnCellular: boolean) => void;
  setCallPrivacy: (callPrivacy: PrivacyVisibility) => void;
  setGroupInvitePrivacy: (groupInvitePrivacy: PrivacyVisibility) => void;
  setLanguagePreference: (languagePreference: LanguagePreference) => void;
  setLinkPreviewsEnabled: (linkPreviewsEnabled: boolean) => void;
  setLargeEmojiEnabled: (largeEmojiEnabled: boolean) => void;
  setAutoplayVideoPreviewsEnabled: (autoplayVideoPreviewsEnabled: boolean) => void;
};

export const useSettingsPreferencesStore = create<SettingsPreferencesState>(
  persist<SettingsPreferencesState>(
    (set) => ({
      // Appearance
      themePreference: 'system',
      textSizePreference: 'default',

      // Notifications
      messageNotificationsEnabled: true,
      groupNotificationsEnabled: true,
      showNotificationPreviews: true,
      badgeCountEnabled: true,
      notificationSoundPreference: 'Default',
      inAppSoundsEnabled: true,
      vibrationEnabled: true,
      quietHoursPreference: 'Off',
      inAppBannerStylePreference: 'Full',

      // Data & Storage
      mediaRetentionPreference: '1 week',
      callDataUsagePreference: 'Standard',
      autoDownloadOnWifi: true,
      autoDownloadOnCellular: false,

      // Privacy (client-side until backend supports these fields)
      callPrivacy: 'everyone',
      groupInvitePrivacy: 'everyone',

      // Language & Chat
      languagePreference: 'system',
      linkPreviewsEnabled: true,
      largeEmojiEnabled: true,
      autoplayVideoPreviewsEnabled: true,

      // Actions
      setThemePreference: (themePreference) => set({ themePreference }),
      setTextSizePreference: (textSizePreference) => set({ textSizePreference }),
      setMessageNotificationsEnabled: (messageNotificationsEnabled) => set({ messageNotificationsEnabled }),
      setGroupNotificationsEnabled: (groupNotificationsEnabled) => set({ groupNotificationsEnabled }),
      setShowNotificationPreviews: (showNotificationPreviews) => set({ showNotificationPreviews }),
      setBadgeCountEnabled: (badgeCountEnabled) => set({ badgeCountEnabled }),
      setNotificationSoundPreference: (notificationSoundPreference) => set({ notificationSoundPreference }),
      setInAppSoundsEnabled: (inAppSoundsEnabled) => set({ inAppSoundsEnabled }),
      setVibrationEnabled: (vibrationEnabled) => set({ vibrationEnabled }),
      setQuietHoursPreference: (quietHoursPreference) => set({ quietHoursPreference }),
      setInAppBannerStylePreference: (inAppBannerStylePreference) => set({ inAppBannerStylePreference }),
      setMediaRetentionPreference: (mediaRetentionPreference) => set({ mediaRetentionPreference }),
      setCallDataUsagePreference: (callDataUsagePreference) => set({ callDataUsagePreference }),
      setAutoDownloadOnWifi: (autoDownloadOnWifi) => set({ autoDownloadOnWifi }),
      setAutoDownloadOnCellular: (autoDownloadOnCellular) => set({ autoDownloadOnCellular }),
      setCallPrivacy: (callPrivacy) => set({ callPrivacy }),
      setGroupInvitePrivacy: (groupInvitePrivacy) => set({ groupInvitePrivacy }),
      setLanguagePreference: (languagePreference) => set({ languagePreference }),
      setLinkPreviewsEnabled: (linkPreviewsEnabled) => set({ linkPreviewsEnabled }),
      setLargeEmojiEnabled: (largeEmojiEnabled) => set({ largeEmojiEnabled }),
      setAutoplayVideoPreviewsEnabled: (autoplayVideoPreviewsEnabled) => set({ autoplayVideoPreviewsEnabled }),
    }),
    {
      name: 'mobile-ios-settings-preferences',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: SettingsPreferencesState) => ({
        themePreference: state.themePreference,
        textSizePreference: state.textSizePreference,
        messageNotificationsEnabled: state.messageNotificationsEnabled,
        groupNotificationsEnabled: state.groupNotificationsEnabled,
        showNotificationPreviews: state.showNotificationPreviews,
        badgeCountEnabled: state.badgeCountEnabled,
        notificationSoundPreference: state.notificationSoundPreference,
        inAppSoundsEnabled: state.inAppSoundsEnabled,
        vibrationEnabled: state.vibrationEnabled,
        quietHoursPreference: state.quietHoursPreference,
        inAppBannerStylePreference: state.inAppBannerStylePreference,
        mediaRetentionPreference: state.mediaRetentionPreference,
        callDataUsagePreference: state.callDataUsagePreference,
        autoDownloadOnWifi: state.autoDownloadOnWifi,
        autoDownloadOnCellular: state.autoDownloadOnCellular,
        callPrivacy: state.callPrivacy,
        groupInvitePrivacy: state.groupInvitePrivacy,
        languagePreference: state.languagePreference,
        linkPreviewsEnabled: state.linkPreviewsEnabled,
        largeEmojiEnabled: state.largeEmojiEnabled,
        autoplayVideoPreviewsEnabled: state.autoplayVideoPreviewsEnabled,
      }),
    },
  ),
);
