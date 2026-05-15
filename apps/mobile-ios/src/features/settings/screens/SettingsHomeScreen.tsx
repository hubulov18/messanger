import { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { listSessions, logout, type AuthSessionItem } from '@features/auth/api/auth.api';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { clearSession } from '@shared/storage/secure-session-storage';
import { ScreenPlaceholder } from '@shared/ui/ScreenPlaceholder';
import { SettingsAccountCard } from '../components/SettingsAccountCard';
import { SettingsDangerRow } from '../components/SettingsDangerRow';
import { SettingsNavigationRow, settingsRowStyles } from '../components/SettingsNavigationRow';
import { SettingsSection } from '../components/SettingsSection';
import { isDeveloperSettingsEnabled } from '../services/settings-dev-tools';
import { useSettingsPreferencesStore } from '../state/settings-preferences.store';

export function SettingsHomeScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const refreshToken = useSessionStore((state) => state.refreshToken);
  const deviceId = useSessionStore((state) => state.deviceId);
  const clearLocalSession = useSessionStore((state) => state.clearSession);
  const languagePreference = useSettingsPreferencesStore((state) => state.languagePreference);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sessions, setSessions] = useState<AuthSessionItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      void loadSessionsSummary();
    }, []),
  );

  async function loadSessionsSummary() {
    try {
      const response = await listSessions();
      setSessions(response.items);
    } catch {
      setSessions([]);
    }
  }

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    try {
      if (refreshToken) {
        try {
          await logout(refreshToken);
        } catch {
          // Local logout should still succeed if the upstream session is already invalid.
        }
      }

      await clearSession();
      clearLocalSession(deviceId);
    } finally {
      setIsLoggingOut(false);
    }
  }

  const currentSession = sessions.find((session) => session.current) ?? null;
  const remoteSessions = sessions.filter((session) => !session.current);
  const activeSessionsCount = remoteSessions.length + (currentSession ? 1 : 0);

  function confirmLogout() {
    if (isLoggingOut) {
      return;
    }

    Alert.alert(t('settings.home.logout.title'), logoutSummary(remoteSessions.length, t), [
      { text: t('settings.home.logout.cancel'), style: 'cancel' },
      {
        text: t('settings.home.rows.logOut'),
        style: 'destructive',
        onPress: () => {
          void handleLogout();
        },
      },
    ]);
  }

  return (
    <ScreenPlaceholder title={t('settings.home.title')}>
      <SettingsAccountCard currentUser={currentUser} onPress={() => navigation.navigate('EditProfile')} />

      <SettingsSection title={t('settings.home.sections.account')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#fff7d8"
          glyphText="🔔"
          glyphTextColor="#c27a00"
          onPress={() => navigation.navigate('NotificationSettings')}
          title={t('settings.home.rows.notifications')}
        />
        <ViewSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#edf4ff"
          glyphText="🔐"
          glyphTextColor="#4A7FA5"
          onPress={() => navigation.navigate('PrivacySettings')}
          title={t('settings.home.rows.privacySecurity')}
        />
        <ViewSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#edf7ef"
          glyphText="📱"
          glyphTextColor="#16803c"
          onPress={() => navigation.navigate('Devices')}
          title={t('settings.home.rows.devices')}
          value={t('settings.home.active_sessions', { count: activeSessionsCount })}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.home.sections.preferences')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#F6EEDB"
          glyphText="🎨"
          glyphTextColor="#9B6A00"
          onPress={() => navigation.navigate('AppearanceSettings')}
          title={t('settings.home.rows.appearance')}
          value={t('settings.home.appearance_default')}
        />
        <ViewSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#F3F0EA"
          glyphText="💬"
          glyphTextColor="#7A6652"
          onPress={() => navigation.navigate('AppearanceSettings')}
          title={t('settings.home.rows.chatBackground')}
        />
        <ViewSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#EEF2FF"
          glyphText="🔤"
          glyphTextColor="#5C6AC4"
          onPress={() => navigation.navigate('LanguagePicker')}
          title={t('settings.home.rows.language')}
          value={formatLanguageValue(languagePreference, t)}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.home.sections.session')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#EAF6EF"
          glyphText="💾"
          glyphTextColor="#207A4D"
          onPress={() => navigation.navigate('DataAndStorage')}
          title={t('settings.home.rows.dataAndStorage')}
        />
        <ViewSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#FDECEC"
          glyphText="🗑️"
          glyphTextColor="#C64E4E"
          onPress={() => navigation.navigate('DataAndStorage')}
          title={t('settings.home.rows.clearCache')}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.home.sections.devicesSupport')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#F7F2E8"
          glyphText="❓"
          glyphTextColor="#8A6C3A"
          onPress={() => navigation.navigate('HelpAndAbout')}
          title={t('settings.home.rows.helpAndAbout')}
        />
        <ViewSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#F1F3F6"
          glyphText="ℹ️"
          glyphTextColor="#667085"
          onPress={() => navigation.navigate('HelpAndAbout')}
          title={t('settings.home.rows.aboutApp')}
          value="v1.0.0"
        />
      </SettingsSection>

      <SettingsSection>
        <SettingsDangerRow
          onPress={confirmLogout}
          title={isLoggingOut ? t('settings.home.rows.loggingOut') : t('settings.home.rows.logOut')}
        />
      </SettingsSection>

      {isDeveloperSettingsEnabled() ? (
        <SettingsSection title={t('settings.home.rows.developer')}>
          <SettingsNavigationRow
            glyphBackgroundColor="#1f2937"
            glyphText="</>"
            glyphTextColor="#ffffff"
            onPress={() => navigation.navigate('DeveloperSettings')}
            title={t('settings.home.rows.developer')}
          />
        </SettingsSection>
      ) : null}
    </ScreenPlaceholder>
  );
}

function ViewSeparator() {
  return <View style={settingsRowStyles.separator} />;
}

function logoutSummary(remoteSessionsCount: number, t: (key: string, params?: Record<string, string | number>) => string) {
  if (remoteSessionsCount === 0) {
    return t('settings.home.logout.confirmSingle');
  }

  const key = remoteSessionsCount === 1
    ? 'settings.home.logout.confirmMultiple'
    : 'settings.home.logout.confirmMultiple_plural';

  return t(key, { count: remoteSessionsCount });
}

function formatLanguageValue(value: string, t: (key: string) => string) {
  switch (value) {
    case 'system':
      return t('settings.languagePicker.options.system');
    case 'english':
      return t('settings.languagePicker.options.english');
    case 'thai':
      return t('settings.languagePicker.options.thai');
    case 'russian':
      return t('settings.languagePicker.options.russian');
    case 'ossetian':
      return t('settings.languagePicker.options.ossetian');
    case 'tagalog':
      return t('settings.languagePicker.options.tagalog');
    default:
      return t('settings.languagePicker.options.english');
  }
}
