import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsNavigationRow, settingsRowStyles } from '../components/SettingsNavigationRow';
import { useSettingsPreferencesStore } from '../state/settings-preferences.store';

type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

export function AppearanceSettingsScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const themePreference = useSettingsPreferencesStore((state) => state.themePreference);
  const textSizePreference = useSettingsPreferencesStore((state) => state.textSizePreference);
  const setThemePreference = useSettingsPreferencesStore((state) => state.setThemePreference);
  const setTextSizePreference = useSettingsPreferencesStore((state) => state.setTextSizePreference);

  return (
    <IosScreen
      title={t('settings.appearance.title')}
      subtitle={t('settings.appearance.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.appearance.section_preview')}>
        <View style={[styles.previewCard, themePreference === 'dark' ? styles.previewCardDark : null]}>
          <View style={styles.previewHeader}>
            <View>
              <Text style={[styles.previewTitle, themePreference === 'dark' ? styles.previewTitleDark : null]}>
                {t('settings.appearance.preview_title')}
              </Text>
              <Text style={[styles.previewSubtitle, themePreference === 'dark' ? styles.previewSubtitleDark : null]}>
                {t('settings.appearance.preview_subtitle', {
                  theme: themeLabel(themePreference, t),
                  size: textSizeLabel(textSizePreference, t),
                })}
              </Text>
            </View>
            <View style={styles.previewChips}>
              <Chip label={themeLabel(themePreference, t)} tone={themePreference === 'dark' ? 'dark' : 'light'} />
              <Chip label={textSizeLabel(textSizePreference, t)} tone="light" />
            </View>
          </View>

          <View style={[styles.incomingBubble, themePreference === 'dark' ? styles.incomingBubbleDark : null]}>
            <Text style={[styles.previewBubbleText, textSizePreference === 'large' ? styles.previewBubbleTextLarge : null]}>
              {t('settings.appearance.preview_incoming')}
            </Text>
          </View>

          <View style={[styles.outgoingBubble, themePreference === 'dark' ? styles.outgoingBubbleDark : null]}>
            <Text style={[styles.previewBubbleText, textSizePreference === 'large' ? styles.previewBubbleTextLarge : null]}>
              {t('settings.appearance.preview_outgoing')}
            </Text>
          </View>
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.appearance.section_theme')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#eef2ff"
          glyphText="◐"
          glyphTextColor="#4f46e5"
          onPress={() => setThemePreference(nextTheme(themePreference))}
          subtitle={t('settings.appearance.theme_subtitle', {
            current: themeDescription(themePreference, t),
          })}
          title={t('settings.appearance.theme_row')}
          value={themeLabel(themePreference, t)}
        />
        <RowSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#fff7ed"
          glyphText="A"
          glyphTextColor="#c2410c"
          onPress={() => setTextSizePreference(textSizePreference === 'default' ? 'large' : 'default')}
          subtitle={t('settings.appearance.text_size_subtitle', {
            current: textSizeDescription(textSizePreference, t),
          })}
          title={t('settings.appearance.text_size_row')}
          value={textSizeLabel(textSizePreference, t)}
        />
      </SettingsSection>
    </IosScreen>
  );
}

function nextTheme(current: 'system' | 'light' | 'dark') {
  if (current === 'system') {
    return 'light';
  }
  if (current === 'light') {
    return 'dark';
  }
  return 'system';
}

function RowSeparator() {
  return <View style={settingsRowStyles.separator} />;
}

function themeLabel(
  current: 'system' | 'light' | 'dark',
  t: TranslateFn,
) {
  if (current === 'system') {
    return t('settings.appearance.theme_system');
  }
  if (current === 'light') {
    return t('settings.appearance.theme_light');
  }
  return t('settings.appearance.theme_dark');
}

function themeDescription(
  current: 'system' | 'light' | 'dark',
  t: TranslateFn,
) {
  if (current === 'system') {
    return t('settings.appearance.theme_system_desc');
  }
  if (current === 'light') {
    return t('settings.appearance.theme_light_desc');
  }
  return t('settings.appearance.theme_dark_desc');
}

function textSizeLabel(
  current: 'default' | 'large',
  t: TranslateFn,
) {
  return current === 'large' ? t('settings.appearance.text_large') : t('settings.appearance.text_default');
}

function textSizeDescription(
  current: 'default' | 'large',
  t: TranslateFn,
) {
  return current === 'large'
    ? t('settings.appearance.text_large_desc')
    : t('settings.appearance.text_default_desc');
}

function Chip({ label, tone }: { label: string; tone: 'light' | 'dark' }) {
  return (
    <View style={[styles.chip, tone === 'dark' ? styles.chipDark : styles.chipLight]}>
      <Text style={[styles.chipText, tone === 'dark' ? styles.chipTextDark : styles.chipTextLight]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  previewCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    gap: 12,
    marginHorizontal: 14,
    marginVertical: 14,
    padding: 14,
    ...telegramShadows.card,
  },
  previewCardDark: {
    backgroundColor: '#17202a',
  },
  previewHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  previewTitle: {
    ...telegramText.rowTitle,
  },
  previewTitleDark: {
    color: '#ffffff',
  },
  previewSubtitle: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  previewSubtitleDark: {
    color: '#c8d1da',
  },
  previewChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-end',
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  chipLight: {
    backgroundColor: telegramColors.surfaceMid,
  },
  chipDark: {
    backgroundColor: '#243140',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextLight: {
    color: telegramColors.textSecondary,
  },
  chipTextDark: {
    color: '#ffffff',
  },
  incomingBubble: {
    alignSelf: 'flex-start',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 18,
    borderTopLeftRadius: 8,
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  incomingBubbleDark: {
    backgroundColor: '#243140',
  },
  outgoingBubble: {
    alignSelf: 'flex-end',
    backgroundColor: telegramColors.outgoingBubble,
    borderRadius: 18,
    borderTopRightRadius: 8,
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  outgoingBubbleDark: {
    backgroundColor: '#295d4f',
  },
  previewBubbleText: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
  },
  previewBubbleTextLarge: {
    fontSize: 16,
    lineHeight: 21,
  },
});
