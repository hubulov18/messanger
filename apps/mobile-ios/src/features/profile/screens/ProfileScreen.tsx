import { Pressable, StyleSheet, Text, View } from 'react-native';

import { logout } from '@features/auth/api/auth.api';
import { useAvatarPreviewUrl } from '@features/profile/hooks/useAvatarPreviewUrl';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { clearSession } from '@shared/storage/secure-session-storage';
import { IosAvatar } from '@shared/ui/ios/IosAvatar';
import { IosSection } from '@shared/ui/ios/IosSection';
import { ScreenPlaceholder } from '@shared/ui/ScreenPlaceholder';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

export function ProfileScreen() {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const refreshToken = useSessionStore((state) => state.refreshToken);
  const deviceId = useSessionStore((state) => state.deviceId);
  const clearLocalSession = useSessionStore((state) => state.clearSession);
  const avatarPreviewUrl = useAvatarPreviewUrl(currentUser?.avatarMediaId);

  async function handleLogout() {
    if (refreshToken) {
      try {
        await logout(refreshToken);
      } catch {
        // Local logout should still succeed if the upstream session is already invalid.
      }
    }

    await clearSession();
    clearLocalSession(deviceId);
  }

  const isOnline = currentUser?.privacy.lastSeenVisibility !== 'nobody';
  const privacyText = currentUser
    ? `${formatPrivacyValue(currentUser.privacy.lastSeenVisibility, t)} · ${formatPrivacyValue(currentUser.privacy.phoneVisibility, t)}`
    : t('common.unavailable');

  return (
    <ScreenPlaceholder title={t('profile.view.title')}>
      <View style={styles.hero}>
        <IosAvatar imageUrl={avatarPreviewUrl} size={telegramLayout.avatarHero} title={currentUser?.displayName ?? t('profile.view.unknown_user')} />
        <Text style={styles.displayName}>{currentUser?.displayName ?? t('profile.view.unknown_user')}</Text>
        <Text style={styles.username}>{currentUser?.username ? `@${currentUser.username}` : t('settings.account.no_username')}</Text>
        <Text style={[styles.presence, isOnline ? styles.presenceOnline : null]}>
          {isOnline ? t('profile.view.online_now') : t('profile.view.last_seen_recently')}
        </Text>

        <View style={styles.heroActions}>
          <Pressable style={({ pressed }: { pressed: boolean }) => [styles.primaryAction, pressed ? styles.pressed : null]}>
            <Text style={styles.primaryActionText}>💬 {t('contacts.item_message')}</Text>
          </Pressable>
          <Pressable style={({ pressed }: { pressed: boolean }) => [styles.secondaryAction, pressed ? styles.pressed : null]}>
            <Text style={styles.secondaryActionText}>📞 {t('calls.voice_call')}</Text>
          </Pressable>
        </View>
      </View>

      <IosSection title={t('profile.view.section_info')}>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📝</Text>
          <View style={styles.detailBody}>
            <Text style={styles.detailTitle}>{t('profile.edit.label_bio')}</Text>
            <Text style={styles.detailValue}>
              {currentUser?.bio?.trim() || t('settings.account.fallback_bio')}
            </Text>
          </View>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>🌐</Text>
          <View style={styles.detailBody}>
            <Text style={styles.detailTitle}>{t('profile.view.username')}</Text>
            <Text style={styles.detailValue}>
              {currentUser?.username ? `@${currentUser.username}` : t('profile.view.not_set')}
            </Text>
          </View>
        </View>
      </IosSection>

      <IosSection title={t('profile.view.section_media')}>
        <View style={styles.mediaGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.mediaTile}>
              <Text style={styles.mediaTileText}>{t('common.photo')}</Text>
            </View>
          ))}
        </View>
      </IosSection>

      <IosSection>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>🔕</Text>
          <View style={styles.detailBody}>
            <Text style={styles.detailTitle}>{t('profile.view.mute_notifications')}</Text>
          </View>
        </View>
        <View style={styles.infoDivider} />
        <Pressable onPress={() => void handleLogout()} style={({ pressed }: { pressed: boolean }) => [styles.detailRow, pressed ? styles.pressed : null]}>
          <Text style={styles.detailIcon}>🔒</Text>
          <View style={styles.detailBody}>
            <Text style={styles.logoutText}>{t('settings.home.rows.logOut')}</Text>
          </View>
        </Pressable>
      </IosSection>
    </ScreenPlaceholder>
  );
}

function formatPrivacyValue(value: string, t: (key: string) => string) {
  switch (value) {
    case 'everyone':
      return t('settings.account.privacy_everyone');
    case 'contacts':
      return t('settings.account.privacy_contacts');
    case 'nobody':
      return t('settings.account.privacy_nobody');
    default:
      return t('settings.account.privacy_unknown');
  }
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    backgroundColor: 'rgba(212,148,58,0.08)',
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 22,
  },
  displayName: {
    ...telegramText.sectionTitle,
    fontSize: 24,
    textAlign: 'center',
  },
  username: {
    ...telegramText.body,
    color: telegramColors.accent,
    fontWeight: '600',
  },
  presence: {
    ...telegramText.secondary,
  },
  presenceOnline: {
    color: telegramColors.online,
    fontWeight: '600',
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    width: '100%',
    maxWidth: 280,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: telegramColors.accent,
    borderRadius: telegramLayout.buttonRadius,
    flex: 1,
    justifyContent: 'center',
    minHeight: 46,
    ...telegramShadows.button,
  },
  secondaryAction: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: telegramLayout.buttonRadius,
    flex: 1,
    justifyContent: 'center',
    minHeight: 46,
    ...telegramShadows.card,
  },
  primaryActionText: {
    color: telegramColors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryActionText: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.82,
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailIcon: {
    fontSize: 17,
  },
  detailBody: {
    flex: 1,
    gap: 2,
  },
  detailTitle: {
    ...telegramText.rowTitle,
    fontWeight: '500',
  },
  detailValue: {
    ...telegramText.secondary,
    color: telegramColors.textSecondary,
  },
  infoDivider: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 44,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  mediaTile: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 10,
    justifyContent: 'center',
    width: '31.7%',
  },
  mediaTileText: {
    color: telegramColors.textTertiary,
    fontSize: 11,
    fontWeight: '600',
  },
  logoutText: {
    color: telegramColors.destructive,
    fontSize: 16,
    fontWeight: '500',
  },
});
