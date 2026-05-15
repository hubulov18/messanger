import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { listSessions, revokeOtherSessions, type AuthSessionItem } from '@features/auth/api/auth.api';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsValueRow } from '../components/SettingsValueRow';
import {
  formatRelativeSessionActivity,
  formatTimestamp,
  glyphForClientType,
  humanizeClientType,
  truncateDeviceId,
} from '../services/session-presenter';

export function DevicesScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<AuthSessionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRevokingOthers, setIsRevokingOthers] = useState(false);

  useFocusEffect(
    useCallback(() => {
      void loadSessions();
    }, []),
  );

  async function loadSessions() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await listSessions();
      setSessions(response.items);
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('settings.devices.error_load'));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRevokeOtherSessions() {
    if (isRevokingOthers || remoteSessions.length === 0) {
      return;
    }

    setIsRevokingOthers(true);
    setErrorMessage(null);

    try {
      await revokeOtherSessions(currentSession?.id);
      setSessions((current) => current.filter((session) => session.current));
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('settings.devices.error_revoke'));
    } finally {
      setIsRevokingOthers(false);
    }
  }

  function confirmRevokeOtherSessions() {
    if (isRevokingOthers || remoteSessions.length === 0) {
      return;
    }

    Alert.alert(
      t('settings.devices.revoke_title'),
      t('settings.devices.revoke_body'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.devices.revoke_action'),
          style: 'destructive',
          onPress: () => {
            void handleRevokeOtherSessions();
          },
        },
      ],
    );
  }

  const currentSession = sessions.find((session) => session.current) ?? null;
  const remoteSessions = sessions.filter((session) => !session.current);

  return (
    <IosScreen
      title={t('settings.devices.title')}
      subtitle={t('settings.devices.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.devices.section_overview')}>
        <View style={styles.summaryRow}>
          <SummaryCard label={t('settings.devices.metric_current')} value={currentSession ? '1' : '0'} tone="accent" />
          <SummaryCard label={t('settings.devices.metric_remote')} value={String(remoteSessions.length)} tone="muted" />
          <SummaryCard label={t('settings.devices.metric_status')} value={isLoading ? t('settings.devices.status_syncing') : t('settings.devices.status_live')} tone="success" />
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.devices.section_security')}>
        <View style={styles.securityCard}>
          <View style={styles.securityTextGroup}>
            <Text style={styles.securityTitle}>{t('settings.devices.security_title')}</Text>
            <Text style={styles.securityBody}>{t('settings.devices.security_body')}</Text>
          </View>
          <Pressable
            disabled={remoteSessions.length === 0 || isRevokingOthers}
            onPress={confirmRevokeOtherSessions}
            style={[
              styles.revokeOthersButton,
              remoteSessions.length === 0 || isRevokingOthers ? styles.revokeOthersButtonDisabled : null,
            ]}
          >
            <Text style={styles.revokeOthersButtonText}>
              {isRevokingOthers ? t('settings.devices.revoking') : remoteSessions.length === 0 ? t('settings.devices.no_other_sessions') : t('settings.devices.revoke_action')}
            </Text>
          </Pressable>
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.devices.section_current')}>
        {currentSession ? (
          <Pressable onPress={() => navigation.navigate('SessionDetails', { session: currentSession })} style={styles.currentCard}>
            <View style={styles.currentGlyph}>
              <Text style={styles.currentGlyphText}>⌂</Text>
            </View>
            <View style={styles.currentBody}>
              <View style={styles.currentTopline}>
                <Text style={styles.currentTitle}>{humanizeClientType(currentSession.clientType)}</Text>
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>{t('settings.devices.metric_current')}</Text>
                </View>
              </View>
              <Text style={styles.currentSubtitle}>{t('settings.devices.device_id', { id: truncateDeviceId(currentSession.deviceId) })}</Text>
              <Text style={styles.currentMeta}>{formatRelativeSessionActivity(currentSession.lastSeenAt)}</Text>
              <Text style={styles.currentMeta}>{t('settings.devices.last_seen', { time: formatTimestamp(currentSession.lastSeenAt) })}</Text>
              <Text style={styles.currentMeta}>{t('settings.devices.protected_session')}</Text>
            </View>
            <Text style={styles.sessionChevron}>›</Text>
          </Pressable>
        ) : (
          <SettingsValueRow
            glyphBackgroundColor="#eff6ff"
            glyphText="⌂"
            glyphTextColor="#2563eb"
            subtitle={t('settings.devices.hint_no_current')}
            title={t('settings.devices.this_device')}
            value={t('settings.account.privacy_unknown')}
          />
        )}
      </SettingsSection>

      <SettingsSection title={t('settings.devices.section_other')}>
        {remoteSessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{isLoading ? t('settings.devices.loading_sessions') : t('settings.devices.no_other_active')}</Text>
          </View>
        ) : (
          remoteSessions.map((session) => (
            <Pressable
              key={session.id}
              disabled={isRevokingOthers}
              onPress={() => navigation.navigate('SessionDetails', { session })}
              style={styles.sessionCard}
            >
              <View style={styles.sessionHeader}>
                <View style={styles.sessionGlyph}>
                  <Text style={styles.sessionGlyphText}>{glyphForClientType(session.clientType)}</Text>
                </View>
                <View style={styles.sessionBody}>
                  <Text style={styles.sessionTitle}>{humanizeClientType(session.clientType)}</Text>
                  <Text style={styles.sessionSubtitle}>{t('settings.devices.device_id', { id: truncateDeviceId(session.deviceId) })}</Text>
                  <Text style={styles.sessionActivityText}>{formatRelativeSessionActivity(session.lastSeenAt)}</Text>
                </View>
                <Text style={styles.sessionChevron}>›</Text>
              </View>
              <View style={styles.sessionFooter}>
                <View style={styles.sessionMetaPill}>
                  <Text style={styles.sessionMetaPillText}>{t('settings.devices.remote_session')}</Text>
                </View>
                <Text style={styles.sessionMetaText}>{t('settings.devices.last_seen', { time: formatTimestamp(session.lastSeenAt) })}</Text>
              </View>
            </Pressable>
          ))
        )}
      </SettingsSection>

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </IosScreen>
  );
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
  securityCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 22,
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  securityTextGroup: {
    gap: 6,
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
  revokeOthersButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fee2e2',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 34,
    paddingHorizontal: 14,
  },
  revokeOthersButtonDisabled: {
    opacity: 0.55,
  },
  revokeOthersButtonText: {
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '700',
  },
  summaryLabel: {
    color: telegramColors.textTertiary,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: telegramColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  currentCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  currentGlyph: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 14,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  currentGlyphText: {
    color: telegramColors.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  currentBody: {
    flex: 1,
    gap: 4,
  },
  currentTopline: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  currentTitle: {
    color: telegramColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  currentBadge: {
    backgroundColor: telegramColors.onlineSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  currentBadgeText: {
    color: telegramColors.online,
    fontSize: 12,
    fontWeight: '700',
  },
  currentSubtitle: {
    color: telegramColors.textSecondary,
    fontSize: 14,
  },
  currentMeta: {
    color: telegramColors.textTertiary,
    fontSize: 13,
  },
  sessionChevron: {
    color: telegramColors.textTertiary,
    fontSize: 24,
    marginLeft: 8,
  },
  emptyState: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  emptyText: {
    color: telegramColors.textSecondary,
    fontSize: 14,
  },
  sessionCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  sessionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  sessionGlyph: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 12,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  sessionGlyphText: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    fontWeight: '700',
  },
  sessionBody: {
    flex: 1,
    gap: 2,
  },
  sessionTitle: {
    color: telegramColors.textPrimary,
    fontSize: 17,
  },
  sessionSubtitle: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  sessionActivityText: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  sessionFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 48,
  },
  sessionMetaPill: {
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sessionMetaPillText: {
    color: telegramColors.textTertiary,
    fontSize: 12,
    fontWeight: '600',
  },
  sessionMetaText: {
    color: telegramColors.textTertiary,
    fontSize: 13,
  },
  errorCard: {
    backgroundColor: telegramColors.destructSoft,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
  },
});
