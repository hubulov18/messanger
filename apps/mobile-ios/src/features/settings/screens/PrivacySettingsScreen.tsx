import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { listSessions, type AuthSessionItem } from '@features/auth/api/auth.api';
import { updateCurrentUserPrivacy } from '@features/profile/api/profile.api';
import type { ApiError } from '@shared/api/types';
import type { CurrentUserProfile } from '@shared/auth/session.store';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsNavigationRow, settingsRowStyles } from '../components/SettingsNavigationRow';
import { SettingsSection } from '../components/SettingsSection';
import { formatRelativeSessionActivity } from '../services/session-presenter';
import { type PrivacyVisibility, useSettingsPreferencesStore } from '../state/settings-preferences.store';

const visibilityCycle = ['everyone', 'contacts', 'nobody'] as const;

export function PrivacySettingsScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const setCurrentUser = useSessionStore((state) => state.setCurrentUser);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AuthSessionItem[]>([]);

  const callPrivacy = useSettingsPreferencesStore((state) => state.callPrivacy);
  const groupInvitePrivacy = useSettingsPreferencesStore((state) => state.groupInvitePrivacy);
  const setCallPrivacy = useSettingsPreferencesStore((state) => state.setCallPrivacy);
  const setGroupInvitePrivacy = useSettingsPreferencesStore((state) => state.setGroupInvitePrivacy);

  useFocusEffect(
    useCallback(() => {
      void loadSessionsSummary();
    }, []),
  );

  if (!currentUser) {
    return <IosScreen title={t('settings.privacy.title')} subtitle={t('settings.privacy.hint_signed_out')} headerMode="compact" />;
  }

  async function loadSessionsSummary() {
    try {
      const response = await listSessions();
      setSessions(response.items);
    } catch {
      setSessions([]);
    }
  }

  async function updateField(field: keyof CurrentUserProfile['privacy']) {
    const user = useSessionStore.getState().currentUser;
    if (!user) {
      return;
    }

    if (isSaving) {
      return;
    }

    const currentValue = user.privacy[field];
    const currentIndex = visibilityCycle.indexOf((currentValue as (typeof visibilityCycle)[number]) ?? 'everyone');
    const nextValue = visibilityCycle[(currentIndex + 1) % visibilityCycle.length];

    setIsSaving(true);
    setErrorMessage(null);

    try {
      await updateCurrentUserPrivacy({
        ...user.privacy,
        [field]: nextValue,
      });

      setCurrentUser({
        ...user,
        privacy: {
          ...user.privacy,
          [field]: nextValue,
        },
      });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('settings.privacy.error_update'));
    } finally {
      setIsSaving(false);
    }
  }

  const currentSession = sessions.find((session) => session.current) ?? null;
  const remoteSessionsCount = sessions.filter((session) => !session.current).length;

  return (
    <IosScreen
      title={t('settings.privacy.title')}
      subtitle={t('settings.privacy.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.privacy.section_security')}>
        <View style={styles.securityCard}>
          <Text style={styles.securityTitle}>{t('settings.privacy.security_title')}</Text>
          <Text style={styles.securityBody}>
            {t('settings.privacy.security_body')}
          </Text>
          <View style={styles.securityMetrics}>
            <SecurityMetric
              label={t('settings.privacy.metric_current_session')}
              tone="safe"
              value={currentSession ? formatRelativeSessionActivity(currentSession.lastSeenAt) : t('common.unavailable')}
            />
            <SecurityMetric
              label={t('settings.privacy.metric_other_devices')}
              tone={remoteSessionsCount === 0 ? 'safe' : 'warning'}
              value={remoteSessionsCount === 0 ? t('common.clear') : String(remoteSessionsCount)}
            />
          </View>
          <SettingsNavigationRow
            glyphBackgroundColor="#eef2ff"
            glyphText="⌂"
            glyphTextColor="#4338ca"
            onPress={() => navigation.navigate('Devices')}
            subtitle={
              remoteSessionsCount === 0
                ? t('settings.privacy.active_sessions_only_this_device')
                : remoteSessionsCount === 1
                  ? t('settings.privacy.active_sessions_review_one', { count: remoteSessionsCount })
                  : t('settings.privacy.active_sessions_review_other', { count: remoteSessionsCount })
            }
            title={t('settings.privacy.active_sessions_title')}
          />
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.privacy.section_visibility')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#edf7ef"
          glyphText="◌"
          glyphTextColor="#15803d"
          onPress={() => void updateField('lastSeenVisibility')}
          subtitle={t('settings.privacy.last_seen_subtitle')}
          title={t('settings.account.metric_last_seen')}
          value={capitalizeVisibility(currentUser.privacy.lastSeenVisibility, t)}
        />
        <RowSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#eef2ff"
          glyphText="☎"
          glyphTextColor="#4338ca"
          onPress={() => void updateField('phoneVisibility')}
          subtitle={t('settings.privacy.phone_subtitle')}
          title={t('settings.privacy.phone_number_title')}
          value={capitalizeVisibility(currentUser.privacy.phoneVisibility, t)}
        />
        <RowSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#fff4e6"
          glyphText="◉"
          glyphTextColor="#c2410c"
          onPress={() => void updateField('profilePhotoVisibility')}
          subtitle={t('settings.privacy.photo_subtitle')}
          title={t('settings.privacy.profile_photo_title')}
          value={capitalizeVisibility(currentUser.privacy.profilePhotoVisibility, t)}
        />
        <RowSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#fef2f2"
          glyphText="⊘"
          glyphTextColor="#b91c1c"
          onPress={() => navigation.navigate('BlockedUsers')}
          subtitle={t('settings.privacy.blocked_users_subtitle')}
          title={t('settings.blocked.title')}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.privacy.section_calls_groups')}>
        <SettingsNavigationRow
          glyphBackgroundColor="#fdf4ff"
          glyphText="✆"
          glyphTextColor="#7e22ce"
          onPress={() => setCallPrivacy(nextVisibility(callPrivacy))}
          subtitle={t('settings.privacy.call_privacy_subtitle')}
          title={t('settings.privacy.call_privacy_title')}
          value={capitalizeVisibility(callPrivacy, t)}
        />
        <RowSeparator />
        <SettingsNavigationRow
          glyphBackgroundColor="#eff6ff"
          glyphText="⊕"
          glyphTextColor="#1d4ed8"
          onPress={() => setGroupInvitePrivacy(nextVisibility(groupInvitePrivacy))}
          subtitle={t('settings.privacy.group_invite_subtitle')}
          title={t('settings.privacy.group_invite_title')}
          value={capitalizeVisibility(groupInvitePrivacy, t)}
        />
      </SettingsSection>

      {isSaving ? (
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>{t('settings.privacy.saving')}</Text>
        </View>
      ) : null}
      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </IosScreen>
  );
}

function nextVisibility(current: PrivacyVisibility): PrivacyVisibility {
  if (current === 'everyone') return 'contacts';
  if (current === 'contacts') return 'nobody';
  return 'everyone';
}

function capitalizeVisibility(
  value: PrivacyVisibility | string | null | undefined,
  t: (key: string, params?: Record<string, string | number>) => string,
): string {
  if (value === 'everyone') {
    return t('settings.account.privacy_everyone');
  }

  if (value === 'contacts') {
    return t('settings.account.privacy_contacts');
  }

  if (value === 'nobody') {
    return t('settings.account.privacy_nobody');
  }

  return t('settings.account.privacy_unknown');
}

function RowSeparator() {
  return <View style={settingsRowStyles.separator} />;
}

function SecurityMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'safe' | 'warning';
}) {
  return (
    <View style={[styles.metricCard, tone === 'safe' ? styles.metricCardSafe : styles.metricCardWarning]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  securityCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 22,
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  securityTitle: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  securityBody: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  securityMetrics: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    borderRadius: 12,
    flex: 1,
    gap: 4,
    minHeight: 62,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  metricCardSafe: {
    backgroundColor: telegramColors.onlineSoft,
  },
  metricCardWarning: {
    backgroundColor: telegramColors.accentSoft,
  },
  metricLabel: {
    color: telegramColors.textTertiary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metricValue: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  statusCard: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorCard: {
    backgroundColor: telegramColors.destructSoft,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  statusText: {
    color: telegramColors.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
  },
});
