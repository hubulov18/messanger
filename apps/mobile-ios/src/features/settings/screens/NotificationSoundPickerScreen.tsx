import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';
import {
  type NotificationSoundPreference,
  useSettingsPreferencesStore,
} from '../state/settings-preferences.store';

type SoundOption = {
  value: NotificationSoundPreference;
  label: string;
  description: string;
};

export function NotificationSoundPickerScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const notificationSoundPreference = useSettingsPreferencesStore(
    (state) => state.notificationSoundPreference,
  );
  const setNotificationSoundPreference = useSettingsPreferencesStore(
    (state) => state.setNotificationSoundPreference,
  );

  function handleSelect(value: NotificationSoundPreference) {
    setNotificationSoundPreference(value);
  }

  const soundOptions: SoundOption[] = [
    {
      value: 'Default',
      label: t('settings.notification_sound.options.default.label'),
      description: t('settings.notification_sound.options.default.description'),
    },
    {
      value: 'Chime',
      label: t('settings.notification_sound.options.chime.label'),
      description: t('settings.notification_sound.options.chime.description'),
    },
    {
      value: 'Aurora',
      label: t('settings.notification_sound.options.aurora.label'),
      description: t('settings.notification_sound.options.aurora.description'),
    },
    {
      value: 'None',
      label: t('settings.notification_sound.options.none.label'),
      description: t('settings.notification_sound.options.none.description'),
    },
  ];

  return (
    <IosScreen
      title={t('settings.notification_sound.title')}
      subtitle={t('settings.notification_sound.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>♪</Text>
        </View>
        <Text style={styles.heroTitle}>{t('settings.notification_sound.title')}</Text>
        <Text style={styles.heroBody}>{t('settings.notification_sound.hero_body')}</Text>
      </View>

      <SettingsSection title={t('settings.notification_sound.section_sound')}>
        {soundOptions.map((option, index) => {
          const isSelected = notificationSoundPreference === option.value;

          return (
            <View key={option.value}>
              {index > 0 ? <View style={styles.separator} /> : null}
              <Pressable
                onPress={() => handleSelect(option.value)}
                style={({ pressed }: { pressed: boolean }) => [styles.row, pressed ? styles.rowPressed : null]}
              >
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle}>{option.label}</Text>
                  <Text style={styles.rowSubtitle}>{option.description}</Text>
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
