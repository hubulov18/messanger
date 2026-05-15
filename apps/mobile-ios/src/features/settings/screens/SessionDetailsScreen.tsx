import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { revokeSession, type AuthSessionItem } from '@features/auth/api/auth.api';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';
import { SettingsValueRow } from '../components/SettingsValueRow';
import {
  formatRelativeSessionActivity,
  formatTimestamp,
  glyphForClientType,
  humanizeClientType,
  sessionTrustLabel,
  truncateDeviceId,
} from '../services/session-presenter';

type SessionDetailsScreenProps = {
  navigation: any;
  route: {
    params: {
      session: AuthSessionItem;
    };
  };
};

export function SessionDetailsScreen({ navigation, route }: SessionDetailsScreenProps) {
  const { t } = useTranslation();
  const session = route.params.session;
  const [isRevoking, setIsRevoking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleRevoke() {
    if (isRevoking || session.current) {
      return;
    }

    setIsRevoking(true);
    setErrorMessage(null);

    try {
      await revokeSession(session.id);
      navigation.goBack();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('settings.session_details.error_revoke'));
      setIsRevoking(false);
    }
  }

  function confirmRevoke() {
    if (isRevoking || session.current) {
      return;
    }

    Alert.alert(
      t('settings.session_details.revoke_title'),
      t('settings.session_details.revoke_body', {
        clientType: humanizeClientType(session.clientType),
        deviceId: session.deviceId,
      }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.session_details.revoke_action'),
          style: 'destructive',
          onPress: () => {
            void handleRevoke();
          },
        },
      ],
    );
  }

  return (
    <IosScreen
      title={t('settings.session_details.title')}
      subtitle={t('settings.session_details.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <SettingsSection title={t('settings.session_details.section_status')}>
        <View style={styles.heroCard}>
          <View style={[styles.heroGlyph, session.current ? styles.heroGlyphCurrent : styles.heroGlyphRemote]}>
            <Text style={[styles.heroGlyphText, session.current ? styles.heroGlyphTextCurrent : styles.heroGlyphTextRemote]}>
              {glyphForClientType(session.clientType)}
            </Text>
          </View>
          <View style={styles.heroBody}>
            <View style={styles.heroTopline}>
              <Text style={styles.heroTitle}>{humanizeClientType(session.clientType)}</Text>
              <View style={[styles.heroBadge, session.current ? styles.heroBadgeCurrent : styles.heroBadgeRemote]}>
                <Text style={styles.heroBadgeText}>
                  {session.current ? t('settings.devices.metric_current') : t('settings.devices.metric_remote')}
                </Text>
              </View>
            </View>
            <Text style={styles.heroSubtitle}>{formatRelativeSessionActivity(session.lastSeenAt)}</Text>
            <Text style={styles.heroSupport}>{sessionTrustLabel(session)}</Text>
          </View>
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.session_details.section_details')}>
        <SettingsValueRow
          glyphBackgroundColor="#eef2ff"
          glyphText="⌂"
          glyphTextColor="#4338ca"
          title={t('settings.session_details.label_device_id')}
          subtitle={t('settings.session_details.hint_device_id')}
          value={truncateDeviceId(session.deviceId)}
        />
        <SettingsValueRow
          glyphBackgroundColor="#eff6ff"
          glyphText="◌"
          glyphTextColor="#2563eb"
          title={t('settings.session_details.label_client_type')}
          subtitle={t('settings.session_details.hint_client_type')}
          value={humanizeClientType(session.clientType)}
        />
        <SettingsValueRow
          glyphBackgroundColor="#edf7ef"
          glyphText="◷"
          glyphTextColor="#15803d"
          title={t('settings.session_details.label_last_seen')}
          subtitle={t('settings.session_details.hint_last_seen')}
          value={formatTimestamp(session.lastSeenAt)}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.session_details.section_guidance')}>
        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>{t('settings.session_details.guidance_title')}</Text>
          <Text style={styles.noteBody}>{t('settings.session_details.guidance_body')}</Text>
        </View>
      </SettingsSection>

      {!session.current ? (
        <SettingsSection title={t('settings.session_details.section_action')}>
          <Pressable disabled={isRevoking} onPress={confirmRevoke} style={[styles.revokeButton, isRevoking ? styles.revokeButtonDisabled : null]}>
            <Text style={styles.revokeButtonText}>
              {isRevoking ? t('settings.devices.revoking') : t('settings.session_details.revoke_action')}
            </Text>
          </Pressable>
        </SettingsSection>
      ) : null}

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </IosScreen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 22,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 16,
    ...telegramShadows.card,
  },
  heroGlyph: {
    alignItems: 'center',
    borderRadius: 18,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  heroGlyphCurrent: {
    backgroundColor: '#ecfdf3',
  },
  heroGlyphRemote: {
    backgroundColor: '#fef2f2',
  },
  heroGlyphText: {
    fontSize: 20,
    fontWeight: '700',
  },
  heroGlyphTextCurrent: {
    color: '#15803d',
  },
  heroGlyphTextRemote: {
    color: '#b91c1c',
  },
  heroBody: {
    flex: 1,
    gap: 4,
  },
  heroTopline: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  heroTitle: {
    ...telegramText.rowTitle,
  },
  heroBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  heroBadgeCurrent: {
    backgroundColor: telegramColors.onlineSoft,
  },
  heroBadgeRemote: {
    backgroundColor: telegramColors.destructSoft,
  },
  heroBadgeText: {
    color: telegramColors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  heroSupport: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  noteCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  noteTitle: {
    color: telegramColors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  noteBody: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  revokeButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.destructive,
    borderRadius: 14,
    marginHorizontal: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  revokeButtonDisabled: {
    opacity: 0.55,
  },
  revokeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
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
