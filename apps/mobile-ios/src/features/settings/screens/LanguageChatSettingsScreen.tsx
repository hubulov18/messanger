import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { ScreenPlaceholder } from '@shared/ui/ScreenPlaceholder';
import { telegramColors } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsNavigationRow, settingsRowStyles } from '../components/SettingsNavigationRow';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsToggleRow } from '../components/SettingsToggleRow';
import { useSettingsPreferencesStore } from '../state/settings-preferences.store';

export function LanguageChatSettingsScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();

  const languagePreference = useSettingsPreferencesStore((state) => state.languagePreference);
  const linkPreviewsEnabled = useSettingsPreferencesStore((state) => state.linkPreviewsEnabled);
  const largeEmojiEnabled = useSettingsPreferencesStore((state) => state.largeEmojiEnabled);
  const autoplayVideoPreviewsEnabled = useSettingsPreferencesStore((state) => state.autoplayVideoPreviewsEnabled);
  const setLinkPreviewsEnabled = useSettingsPreferencesStore((state) => state.setLinkPreviewsEnabled);
  const setLargeEmojiEnabled = useSettingsPreferencesStore((state) => state.setLargeEmojiEnabled);
  const setAutoplayVideoPreviewsEnabled = useSettingsPreferencesStore((state) => state.setAutoplayVideoPreviewsEnabled);

  return (
    <ScreenPlaceholder
      title={t('settings.languageChat.title')}
      body={t('settings.languageChat.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.languageChat.sections.overview')}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>{t('settings.languageChat.overview.title')}</Text>
          <Text style={styles.overviewBody}>{t('settings.languageChat.overview.body')}</Text>
          <View style={styles.overviewMetrics}>
            <OverviewMetric
              label={t('settings.languageChat.metrics.language')}
              value={t(`settings.languagePicker.options.${languagePreference}`)}
              tone="calm"
            />
            <OverviewMetric
              label={t('settings.languageChat.metrics.previews')}
              value={linkPreviewsEnabled ? t('settings.languageChat.metrics.on') : t('settings.languageChat.metrics.off')}
              tone={linkPreviewsEnabled ? 'calm' : 'muted'}
            />
            <OverviewMetric
              label={t('settings.languageChat.metrics.emoji')}
              value={largeEmojiEnabled ? t('settings.languageChat.metrics.large') : t('settings.languageChat.metrics.compact')}
              tone="accent"
            />
          </View>
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.languageChat.sections.language')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#e0f2fe"
          glyphText="⊕"
          glyphTextColor="#0369a1"
          onPress={() => navigation.navigate('LanguagePicker')}
          subtitle={t('settings.languageChat.rows.appLanguageSubtitle')}
          title={t('settings.languageChat.rows.appLanguage')}
          value={t(`settings.languagePicker.options.${languagePreference}`)}
        />
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{t('settings.languageChat.rows.appLanguageInfo')}</Text>
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.languageChat.sections.messages')}>
        <SettingsToggleRow
          glyphBackgroundColor="#f0fdf4"
          glyphText="⇲"
          glyphTextColor="#15803d"
          onValueChange={setLinkPreviewsEnabled}
          subtitle={t('settings.languageChat.rows.linkPreviewsSubtitle')}
          title={t('settings.languageChat.rows.linkPreviews')}
          value={linkPreviewsEnabled}
        />
        <RowSeparator />
        <SettingsToggleRow
          glyphBackgroundColor="#fdf4ff"
          glyphText="☺"
          glyphTextColor="#7e22ce"
          onValueChange={setLargeEmojiEnabled}
          subtitle={t('settings.languageChat.rows.largeEmojiSubtitle')}
          title={t('settings.languageChat.rows.largeEmoji')}
          value={largeEmojiEnabled}
        />
        <RowSeparator />
        <SettingsToggleRow
          glyphBackgroundColor="#eef2ff"
          glyphText="▶"
          glyphTextColor="#4338ca"
          onValueChange={setAutoplayVideoPreviewsEnabled}
          subtitle={t('settings.languageChat.rows.autoPlayVideoSubtitle')}
          title={t('settings.languageChat.rows.autoPlayVideo')}
          value={autoplayVideoPreviewsEnabled}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.languageChat.sections.chatPresentation')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#fff4e6"
          glyphText="◫"
          glyphTextColor="#c2410c"
          subtitle={t('settings.languageChat.rows.conversationLayoutSubtitle')}
          title={t('settings.languageChat.rows.conversationLayout')}
          value={conversationLayoutLabel({
            linkPreviewsEnabled,
            largeEmojiEnabled,
            autoplayVideoPreviewsEnabled,
            t,
          })}
        />
      </SettingsSection>
    </ScreenPlaceholder>
  );
}

function conversationLayoutLabel({
  linkPreviewsEnabled,
  largeEmojiEnabled,
  autoplayVideoPreviewsEnabled,
  t,
}: {
  linkPreviewsEnabled: boolean;
  largeEmojiEnabled: boolean;
  autoplayVideoPreviewsEnabled: boolean;
  t: (key: string) => string;
}) {
  const enabledCount = [linkPreviewsEnabled, largeEmojiEnabled, autoplayVideoPreviewsEnabled].filter(Boolean).length;

  if (enabledCount === 3) {
    return t('settings.languageChat.layout.rich');
  }

  if (enabledCount === 0) {
    return t('settings.languageChat.layout.minimal');
  }

  return t('settings.languageChat.layout.balanced');
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
  tone: 'calm' | 'accent' | 'muted';
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

const styles = StyleSheet.create({
  overviewCard: {
    backgroundColor: '#f8fafc',
    borderColor: '#e6ebf2',
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  overviewTitle: {
    color: telegramColors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
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
    backgroundColor: '#eef6ff',
    borderRadius: 16,
    flex: 1,
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  metricCardAccent: {
    backgroundColor: '#f7edff',
  },
  metricCardMuted: {
    backgroundColor: '#f3f4f6',
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
  infoRow: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 2,
  },
  infoText: {
    color: telegramColors.textTertiary,
    fontSize: 13,
    lineHeight: 18,
  },
});
