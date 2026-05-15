import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsValueRow } from '../components/SettingsValueRow';
import { getSettingsBuildInfo } from '../services/settings-build-info';

export function HelpAndAboutScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const buildInfo = getSettingsBuildInfo();

  return (
    <IosScreen
      title={t('settings.help.title')}
      subtitle={t('settings.help.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>ℹ️</Text>
        </View>
        <Text style={styles.heroTitle}>{buildInfo.appName}</Text>
        <Text style={styles.heroBody}>{t('settings.help.hint_description')}</Text>
      </View>

      <SettingsSection title={t('settings.help.section_application')}>
        <SettingsValueRow
          glyphBackgroundColor="#eef6ff"
          glyphText="i"
          glyphTextColor="#2563eb"
          subtitle={t('settings.help.hint_description')}
          title={t('settings.help.section_app')}
          value={buildInfo.appName}
        />
        <View style={styles.separator} />
        <SettingsValueRow
          glyphBackgroundColor="#f5f3ff"
          glyphText="#"
          glyphTextColor="#7c3aed"
          subtitle={t('settings.help.hint_version')}
          title={t('settings.help.section_version')}
          value={`${buildInfo.version} (${buildInfo.build})`}
        />
      </SettingsSection>

      <Text style={styles.helperText}>{t('settings.help.future_hint')}</Text>
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
