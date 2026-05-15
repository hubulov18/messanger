import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAvatarPreviewUrl } from '@features/profile/hooks/useAvatarPreviewUrl';
import type { CurrentUserProfile } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { IosAvatar } from '@shared/ui/ios/IosAvatar';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type SettingsAccountCardProps = {
  currentUser: CurrentUserProfile | null;
  onPress?: () => void;
};

type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

export function SettingsAccountCard({ currentUser, onPress }: SettingsAccountCardProps) {
  const { t } = useTranslation();
  const avatarPreviewUrl = useAvatarPreviewUrl(currentUser?.avatarMediaId);

  const content = (
    <View style={styles.card}>
      <View style={styles.hero}>
        <IosAvatar
          title={currentUser?.displayName ?? t('settings.account.fallback_user')}
          size={60}
          imageUrl={avatarPreviewUrl}
        />
        <View style={styles.body}>
          <Text style={styles.displayName}>{currentUser?.displayName ?? t('settings.account.fallback_user')}</Text>
          <Text style={styles.username}>
            {currentUser?.username ? `@${currentUser.username}` : t('settings.account.no_username')}
          </Text>
          <Text numberOfLines={1} style={styles.meta}>
            Tap to edit profile
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return <Pressable onPress={onPress}>{content}</Pressable>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: telegramColors.separator,
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...telegramShadows.card,
  },
  hero: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  displayName: {
    color: telegramColors.textPrimary,
    fontSize: 19,
    fontWeight: '800',
  },
  username: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  meta: {
    color: telegramColors.textTertiary,
    fontSize: 13,
    marginTop: 2,
  },
  chevron: {
    color: telegramColors.textTertiary,
    fontSize: 18,
    fontWeight: '700',
  },
});
