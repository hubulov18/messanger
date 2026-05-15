import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsNavigationRow, settingsRowStyles } from '../components/SettingsNavigationRow';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsToggleRow } from '../components/SettingsToggleRow';
import {
  type InAppBannerStylePreference,
  type QuietHoursPreference,
  useSettingsPreferencesStore,
} from '../state/settings-preferences.store';
import { useNotificationInboxStore } from '../state/notification-inbox.store';

const quietHoursCycle: QuietHoursPreference[] = ['Off', '22:00–07:00', '23:00–08:00'];
const bannerStyleCycle: InAppBannerStylePreference[] = ['Full', 'Compact', 'Silent'];

export function NotificationSettingsScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const messageNotificationsEnabled = useSettingsPreferencesStore((state) => state.messageNotificationsEnabled);
  const groupNotificationsEnabled = useSettingsPreferencesStore((state) => state.groupNotificationsEnabled);
  const showNotificationPreviews = useSettingsPreferencesStore((state) => state.showNotificationPreviews);
  const badgeCountEnabled = useSettingsPreferencesStore((state) => state.badgeCountEnabled);
  const notificationSoundPreference = useSettingsPreferencesStore((state) => state.notificationSoundPreference);
  const inAppSoundsEnabled = useSettingsPreferencesStore((state) => state.inAppSoundsEnabled);
  const vibrationEnabled = useSettingsPreferencesStore((state) => state.vibrationEnabled);
  const quietHoursPreference = useSettingsPreferencesStore((state) => state.quietHoursPreference);
  const inAppBannerStylePreference = useSettingsPreferencesStore((state) => state.inAppBannerStylePreference);
  const notificationInboxUnreadCount = useNotificationInboxStore((state) => state.totalUnreadCount);
  const notificationInboxChatCount = useNotificationInboxStore((state) => state.orderedChatIds.length);
  const setMessageNotificationsEnabled = useSettingsPreferencesStore((state) => state.setMessageNotificationsEnabled);
  const setGroupNotificationsEnabled = useSettingsPreferencesStore((state) => state.setGroupNotificationsEnabled);
  const setShowNotificationPreviews = useSettingsPreferencesStore((state) => state.setShowNotificationPreviews);
  const setBadgeCountEnabled = useSettingsPreferencesStore((state) => state.setBadgeCountEnabled);
  const setInAppSoundsEnabled = useSettingsPreferencesStore((state) => state.setInAppSoundsEnabled);
  const setVibrationEnabled = useSettingsPreferencesStore((state) => state.setVibrationEnabled);
  const setQuietHoursPreference = useSettingsPreferencesStore((state) => state.setQuietHoursPreference);
  const setInAppBannerStylePreference = useSettingsPreferencesStore((state) => state.setInAppBannerStylePreference);

  return (
    <IosScreen
      title={t('settings.notifications.title')}
      subtitle={t('settings.notifications.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.notifications.section_overview')}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>{t('settings.notifications.overview_title')}</Text>
          <Text style={styles.overviewBody}>
            {t('settings.notifications.overview_body')}
          </Text>
          <View style={styles.overviewMetrics}>
            <OverviewMetric label={t('settings.notifications.metric_delivery')} value={notificationDeliveryLabel(messageNotificationsEnabled, groupNotificationsEnabled, t)} tone="accent" />
            <OverviewMetric label={t('settings.notifications.metric_banners')} value={inAppBannerStylePreference} tone="calm" />
            <OverviewMetric label={t('settings.notifications.metric_quiet_hours')} value={quietHoursPreference === 'Off' ? t('common.off') : t('common.on')} tone={quietHoursPreference === 'Off' ? 'muted' : 'accent'} />
          </View>
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.notifications.section_inbox')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#eef6ff"
          glyphText="◉"
          glyphTextColor="#2563eb"
          onPress={() => navigation.navigate('NotificationInbox')}
          subtitle={t('settings.notifications.hint_inbox')}
          title={t('settings.notifications.section_inbox_title')}
          value={
            notificationInboxChatCount === 0
              ? t('settings.notifications.value_empty')
              : notificationInboxUnreadCount > 0
                ? t('settings.notifications.value_unread', { count: notificationInboxUnreadCount })
                : t('settings.notifications.value_chats', { count: notificationInboxChatCount })
          }
        />
      </SettingsSection>

      <SettingsSection title={t('settings.notifications.section_delivery')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#e6f4ea"
          glyphText="✉"
          glyphTextColor="#1f7a46"
          onPress={() => {
            const nextPreset = getNextNotificationDeliveryPreset(messageNotificationsEnabled, groupNotificationsEnabled);
            setMessageNotificationsEnabled(nextPreset.messageNotificationsEnabled);
            setGroupNotificationsEnabled(nextPreset.groupNotificationsEnabled);
          }}
          subtitle={t('settings.notifications.delivery_mode_subtitle')}
          title={t('settings.notifications.delivery_mode_title')}
          value={notificationDeliveryLabel(messageNotificationsEnabled, groupNotificationsEnabled, t)}
        />
        <RowSeparator />
        <SettingsToggleRow
          glyphBackgroundColor="#eef2ff"
          glyphText="◌"
          glyphTextColor="#4f46e5"
          onValueChange={setMessageNotificationsEnabled}
          subtitle={t('settings.notifications.message_notifications_subtitle')}
          title={t('settings.notifications.message_notifications_title')}
          value={messageNotificationsEnabled}
        />
        <RowSeparator />
        <SettingsToggleRow
          glyphBackgroundColor="#f5f3ff"
          glyphText="◎"
          glyphTextColor="#6d28d9"
          onValueChange={setGroupNotificationsEnabled}
          subtitle={t('settings.notifications.group_notifications_subtitle')}
          title={t('settings.notifications.group_notifications_title')}
          value={groupNotificationsEnabled}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.notifications.section_presentation')}>
        <SettingsToggleRow
          glyphBackgroundColor="#fff4e5"
          glyphText="👁"
          glyphTextColor="#b45309"
          onValueChange={setShowNotificationPreviews}
          subtitle={t('settings.notifications.show_previews_subtitle')}
          title={t('settings.notifications.show_previews_title')}
          value={showNotificationPreviews}
        />
        <RowSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#eff6ff"
          glyphText="⇱"
          glyphTextColor="#2563eb"
          onPress={() => setInAppBannerStylePreference(nextCycleValue(bannerStyleCycle, inAppBannerStylePreference))}
          subtitle={t('settings.notifications.banner_style_subtitle')}
          title={t('settings.notifications.banner_style_title')}
          value={inAppBannerStylePreference}
        />
        <RowSeparator />
        <SettingsToggleRow
          glyphBackgroundColor="#eff6ff"
          glyphText="#"
          glyphTextColor="#2563eb"
          onValueChange={setBadgeCountEnabled}
          subtitle={t('settings.notifications.badge_count_subtitle')}
          title={t('settings.notifications.badge_count_title')}
          value={badgeCountEnabled}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.notifications.section_sounds')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#fdf2f8"
          glyphText="♪"
          glyphTextColor="#be185d"
          onPress={() => navigation.navigate('NotificationSoundPicker')}
          subtitle={t('settings.notifications.sound_subtitle')}
          title={t('settings.notifications.sound_title')}
          value={notificationSoundPreference}
        />
        <RowSeparator />
        <SettingsToggleRow
          glyphBackgroundColor="#f0fdf4"
          glyphText="◎"
          glyphTextColor="#15803d"
          onValueChange={setInAppSoundsEnabled}
          subtitle={t('settings.notifications.in_app_sounds_subtitle')}
          title={t('settings.notifications.in_app_sounds_title')}
          value={inAppSoundsEnabled}
        />
        <RowSeparator />
        <SettingsToggleRow
          glyphBackgroundColor="#fefce8"
          glyphText="〜"
          glyphTextColor="#854d0e"
          onValueChange={setVibrationEnabled}
          subtitle={t('settings.notifications.vibration_subtitle')}
          title={t('settings.notifications.vibration_title')}
          value={vibrationEnabled}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.notifications.section_focus')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#eef2ff"
          glyphText="☾"
          glyphTextColor="#4338ca"
          onPress={() => setQuietHoursPreference(nextCycleValue(quietHoursCycle, quietHoursPreference))}
          subtitle={t('settings.notifications.quiet_hours_subtitle')}
          title={t('settings.notifications.quiet_hours_title')}
          value={quietHoursPreference}
        />
        <View style={styles.helperRow}>
          <Text style={styles.helperText}>{t('settings.notifications.focus_helper')}</Text>
        </View>
      </SettingsSection>
    </IosScreen>
  );
}

function RowSeparator() {
  return <View style={settingsRowStyles.separator} />;
}

function OverviewMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'accent' | 'calm' | 'muted';
}) {
  return (
    <View
      style={[
        styles.metricCard,
        tone === 'accent' ? styles.metricCardAccent : null,
        tone === 'muted' ? styles.metricCardMuted : null,
      ]}
    >
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function nextCycleValue<T extends string>(values: readonly T[], currentValue: T): T {
  const index = values.indexOf(currentValue);
  return values[(index + 1) % values.length] ?? values[0]!;
}

function notificationDeliveryLabel(
  messageNotificationsEnabled: boolean,
  groupNotificationsEnabled: boolean,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  if (messageNotificationsEnabled && groupNotificationsEnabled) {
    return t('settings.notifications.delivery_all');
  }

  if (messageNotificationsEnabled && !groupNotificationsEnabled) {
    return t('settings.notifications.delivery_direct_only');
  }

  if (!messageNotificationsEnabled && groupNotificationsEnabled) {
    return t('settings.notifications.delivery_groups_only');
  }

  return t('settings.notifications.delivery_muted');
}

function getNextNotificationDeliveryPreset(messageNotificationsEnabled: boolean, groupNotificationsEnabled: boolean) {
  if (messageNotificationsEnabled && groupNotificationsEnabled) {
    return { messageNotificationsEnabled: true, groupNotificationsEnabled: false };
  }

  if (messageNotificationsEnabled && !groupNotificationsEnabled) {
    return { messageNotificationsEnabled: false, groupNotificationsEnabled: true };
  }

  if (!messageNotificationsEnabled && groupNotificationsEnabled) {
    return { messageNotificationsEnabled: false, groupNotificationsEnabled: false };
  }

  return { messageNotificationsEnabled: true, groupNotificationsEnabled: true };
}

const styles = StyleSheet.create({
  overviewCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 22,
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...telegramShadows.card,
  },
  overviewTitle: {
    ...telegramText.rowTitle,
  },
  overviewBody: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  overviewMetrics: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 16,
    flex: 1,
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  metricCardAccent: {
    backgroundColor: telegramColors.accentSoft,
  },
  metricCardMuted: {
    backgroundColor: telegramColors.surfaceMuted,
  },
  metricLabel: {
    color: telegramColors.textTertiary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  metricValue: {
    color: telegramColors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  helperRow: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 2,
  },
  helperText: {
    color: telegramColors.textTertiary,
    fontSize: 13,
    lineHeight: 18,
  },
});
