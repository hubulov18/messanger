import { Alert, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsNavigationRow } from '../components/SettingsNavigationRow';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsToggleRow } from '../components/SettingsToggleRow';
import { SettingsValueRow } from '../components/SettingsValueRow';
import { useSettingsPreferencesStore } from '../state/settings-preferences.store';

export function DataAndStorageScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const mediaRetentionPreference = useSettingsPreferencesStore((state) => state.mediaRetentionPreference);
  const callDataUsagePreference = useSettingsPreferencesStore((state) => state.callDataUsagePreference);
  const autoDownloadOnWifi = useSettingsPreferencesStore((state) => state.autoDownloadOnWifi);
  const autoDownloadOnCellular = useSettingsPreferencesStore((state) => state.autoDownloadOnCellular);
  const setMediaRetentionPreference = useSettingsPreferencesStore((state) => state.setMediaRetentionPreference);
  const setCallDataUsagePreference = useSettingsPreferencesStore((state) => state.setCallDataUsagePreference);
  const setAutoDownloadOnWifi = useSettingsPreferencesStore((state) => state.setAutoDownloadOnWifi);
  const setAutoDownloadOnCellular = useSettingsPreferencesStore((state) => state.setAutoDownloadOnCellular);
  const [estimatedCacheMb, setEstimatedCacheMb] = useState(248);

  function confirmClearCache() {
    Alert.alert(
      t('settings.data_storage.clear_title'),
      t('settings.data_storage.hint_clear_storage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.data_storage.clear_action'),
          style: 'destructive',
          onPress: () => setEstimatedCacheMb(0),
        },
      ],
    );
  }

  return (
    <IosScreen
      title={t('settings.data_storage.title')}
      subtitle={t('settings.data_storage.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.data_storage.section_overview')}>
        <View style={styles.summaryRow}>
          <SummaryCard label={t('settings.data_storage.metric_cache')} value={`${estimatedCacheMb} MB`} tone="accent" />
          <SummaryCard label="Wi-Fi" value={autoDownloadOnWifi ? t('settings.data_storage.value_auto') : t('settings.data_storage.value_manual')} tone="success" />
          <SummaryCard label={t('settings.data_storage.metric_cellular')} value={autoDownloadOnCellular ? t('settings.data_storage.value_auto') : t('settings.data_storage.value_manual')} tone="muted" />
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.data_storage.section_storage')}>
        <SettingsValueRow
          glyphBackgroundColor="#eef6ff"
          glyphText="▣"
          glyphTextColor="#2563eb"
          subtitle={t('settings.data_storage.hint_storage')}
          title={t('settings.data_storage.section_storage_usage')}
          value={`${estimatedCacheMb} MB`}
        />
        <View style={styles.separator} />
        <SettingsNavigationRow
          glyphBackgroundColor="#eef7ee"
          glyphText="⌛"
          glyphTextColor="#1f7a46"
          onPress={() => setMediaRetentionPreference(nextRetention(mediaRetentionPreference))}
          subtitle={t('settings.data_storage.keep_media_subtitle')}
          title={t('settings.data_storage.keep_media_title')}
          value={mediaRetentionPreference}
        />
        <View style={styles.separator} />
        <SettingsNavigationRow
          glyphBackgroundColor="#fff1f2"
          glyphText="×"
          glyphTextColor="#be123c"
          onPress={confirmClearCache}
          subtitle={t('settings.data_storage.clear_subtitle')}
          title={t('settings.data_storage.clear_cached_title')}
          value={estimatedCacheMb === 0 ? t('settings.data_storage.value_cleared') : t('settings.data_storage.value_ready')}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.data_storage.section_auto_download')}>
        <SettingsToggleRow
          glyphBackgroundColor="#ecfdf5"
          glyphText="W"
          glyphTextColor="#15803d"
          onValueChange={setAutoDownloadOnWifi}
          subtitle={t('settings.data_storage.wifi_subtitle')}
          title="Wi-Fi"
          value={autoDownloadOnWifi}
        />
        <View style={styles.separator} />
        <SettingsToggleRow
          glyphBackgroundColor="#fff7ed"
          glyphText="C"
          glyphTextColor="#c2410c"
          onValueChange={setAutoDownloadOnCellular}
          subtitle={t('settings.data_storage.cellular_subtitle')}
          title={t('settings.data_storage.metric_cellular')}
          value={autoDownloadOnCellular}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.data_storage.section_calls')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#f5f3ff"
          glyphText="≈"
          glyphTextColor="#7c3aed"
          onPress={() => setCallDataUsagePreference(nextCallDataMode(callDataUsagePreference))}
          subtitle={t('settings.data_storage.calls_subtitle')}
          title={t('settings.data_storage.calls_title')}
          value={callDataUsagePreference}
        />
      </SettingsSection>

      <Text style={styles.helperText}>{t('settings.data_storage.helper_text')}</Text>
    </IosScreen>
  );
}

function nextRetention(current: '3 days' | '1 week' | 'Forever') {
  if (current === '3 days') {
    return '1 week';
  }
  if (current === '1 week') {
    return 'Forever';
  }
  return '3 days';
}

function nextCallDataMode(current: 'Standard' | 'Reduced' | 'Minimal') {
  if (current === 'Standard') {
    return 'Reduced';
  }
  if (current === 'Reduced') {
    return 'Minimal';
  }
  return 'Standard';
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'accent' | 'muted' | 'success';
}) {
  return (
    <View
      style={[
        styles.summaryCard,
        tone === 'accent' ? styles.summaryCardAccent : null,
        tone === 'success' ? styles.summaryCardSuccess : null,
      ]}
    >
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  summaryCard: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 16,
    flex: 1,
    gap: 4,
    minHeight: 70,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  summaryCardAccent: {
    backgroundColor: telegramColors.accentSoft,
  },
  summaryCardSuccess: {
    backgroundColor: telegramColors.onlineSoft,
  },
  summaryLabel: {
    color: telegramColors.textTertiary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  summaryValue: {
    ...telegramText.rowTitle,
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: 0.5,
    marginLeft: 56,
  },
  helperText: {
    color: telegramColors.textTertiary,
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 4,
  },
});
