import { StyleSheet, Text, View } from 'react-native';

import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { ScreenPlaceholder } from '@shared/ui/ScreenPlaceholder';
import { useUiBubbleRendererStore } from '@shared/ui/ui-bubble-renderer.store';
import { telegramColors } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsNavigationRow } from '../components/SettingsNavigationRow';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsValueRow } from '../components/SettingsValueRow';
import { getDeveloperSettingsSnapshot } from '../services/settings-dev-tools';

export function DeveloperSettingsScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const deviceId = useSessionStore((state) => state.deviceId);
  const authStatus = useSessionStore((state) => state.authStatus);
  const cycleBubbleRendererMode = useUiBubbleRendererStore((state) => state.cycleMode);

  const snapshot = getDeveloperSettingsSnapshot({
    userId: currentUser?.id ?? null,
    deviceId,
    authStatus,
  });

  return (
    <ScreenPlaceholder
      title={t('settings.developer.title')}
      body={t('settings.developer.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.developer.section_env')}>
        <SettingsValueRow glyphBackgroundColor="#111827" glyphText="API" glyphTextColor="#ffffff" title={t('settings.developer.label_api_url')} value={snapshot.apiBaseUrl} />
        <View style={styles.separator} />
        <SettingsValueRow glyphBackgroundColor="#1f2937" glyphText="SIG" glyphTextColor="#ffffff" title={t('settings.developer.label_signaling_url')} value={snapshot.callSignalingUrl} />
      </SettingsSection>

      <SettingsSection title={t('settings.developer.section_runtime')}>
        <SettingsValueRow glyphBackgroundColor="#eff6ff" glyphText="U" glyphTextColor="#2563eb" title={t('settings.developer.label_user_id')} value={snapshot.userId ?? t('settings.developer.value_anonymous')} />
        <View style={styles.separator} />
        <SettingsValueRow glyphBackgroundColor="#ecfeff" glyphText="D" glyphTextColor="#0891b2" title={t('settings.developer.label_device_id')} value={snapshot.deviceId ?? t('common.unavailable')} />
        <View style={styles.separator} />
        <SettingsValueRow glyphBackgroundColor="#f5f3ff" glyphText="A" glyphTextColor="#7c3aed" title={t('settings.developer.label_auth_status')} value={snapshot.authStatus} />
      </SettingsSection>

      <SettingsSection title={t('settings.developer.section_flags')}>
        <SettingsValueRow glyphBackgroundColor="#eef2ff" glyphText="C" glyphTextColor="#4338ca" title={t('settings.developer.flag_calls_v1')} value={String(snapshot.callsV1)} />
        <View style={styles.separator} />
        <SettingsValueRow glyphBackgroundColor="#fff7ed" glyphText="V" glyphTextColor="#c2410c" title={t('settings.developer.flag_voip_push')} value={String(snapshot.voipPushIncoming)} />
        <View style={styles.separator} />
        <SettingsNavigationRow
          glyphBackgroundColor="#ecfccb"
          glyphText="B"
          glyphTextColor="#3f6212"
          title={t('settings.developer.bubble_renderer')}
          subtitle={t('settings.developer.bubble_renderer_subtitle', { value: String(snapshot.useRealUiBubbles) })}
          value={snapshot.bubbleRendererModeLabel}
          onPress={cycleBubbleRendererMode}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.developer.ui_preview_section')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#f4d9cb"
          glyphText="UI"
          glyphTextColor="#8f3f25"
          title={t('settings.developer.ui_preview_title')}
          subtitle={t('settings.developer.ui_preview_subtitle')}
          onPress={() => navigation.navigate('UiPreviewChat')}
        />
      </SettingsSection>
    </ScreenPlaceholder>
  );
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: telegramColors.separator,
    height: 0.5,
    marginLeft: 56,
  },
});
