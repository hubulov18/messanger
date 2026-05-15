import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';
import {
  type LanguagePreference,
  useSettingsPreferencesStore,
} from '../state/settings-preferences.store';

const LANGUAGE_PREFERENCE_VALUES: LanguagePreference[] = [
  'system',
  'english',
  'thai',
  'russian',
  'ossetian',
  'tagalog',
];

export function LanguagePickerScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const languagePreference = useSettingsPreferencesStore((state) => state.languagePreference);
  const setLanguagePreference = useSettingsPreferencesStore((state) => state.setLanguagePreference);

  return (
    <IosScreen
      title={t('settings.languagePicker.title')}
      subtitle={t('settings.languagePicker.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>🌐</Text>
        </View>
        <Text style={styles.heroTitle}>{t('settings.languagePicker.title')}</Text>
        <Text style={styles.heroBody}>{t('settings.languagePicker.body')}</Text>
      </View>

      <SettingsSection title={t('settings.languagePicker.section')}>
        {LANGUAGE_PREFERENCE_VALUES.map((value, index) => {
          const isSelected = languagePreference === value;

          return (
            <View key={value}>
              {index > 0 ? <View style={styles.separator} /> : null}
              <Pressable
                onPress={() => setLanguagePreference(value)}
                style={({ pressed }: { pressed: boolean }) => [styles.row, pressed ? styles.rowPressed : null]}
              >
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle}>{t(`settings.languagePicker.options.${value}`)}</Text>
                  <Text style={styles.rowSubtitle}>{t(`settings.languagePicker.descriptions.${value}`)}</Text>
                </View>
                <View style={[styles.checkCircle, isSelected ? styles.checkCircleActive : null]}>
                  {isSelected ? <Text style={styles.checkMark}>✓</Text> : null}
                </View>
              </Pressable>
            </View>
          );
        })}
      </SettingsSection>
    </IosScreen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    gap: 10,
    marginBottom: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
    ...telegramShadows.card,
  },
  heroBadge: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 18,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  heroBadgeText: {
    fontSize: 26,
  },
  heroTitle: {
    ...telegramText.sectionTitle,
    fontSize: 24,
    textAlign: 'center',
  },
  heroBody: {
    ...telegramText.secondary,
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  rowPressed: {
    opacity: 0.7,
  },
  rowBody: {
    flex: 1,
    gap: 3,
  },
  rowTitle: {
    ...telegramText.rowTitle,
  },
  rowSubtitle: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  checkCircle: {
    alignItems: 'center',
    borderColor: telegramColors.separator,
    borderRadius: 12,
    borderWidth: 1.5,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  checkCircleActive: {
    backgroundColor: telegramColors.accent,
    borderColor: telegramColors.accent,
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: 0.5,
    marginLeft: 14,
  },
});
