import { useCallback, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { listBlockedUsers, unblockUser, type BlockedUserListItem } from '@features/profile/api/profile.api';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';

export function BlockedUsersScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const [items, setItems] = useState<BlockedUserListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      void loadBlockedUsers();
    }, []),
  );

  async function loadBlockedUsers() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await listBlockedUsers();
      setItems(response.items);
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('settings.blocked.error_load'));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUnblock(targetUserId: string) {
    if (pendingUserId) {
      return;
    }

    setPendingUserId(targetUserId);
    try {
      await unblockUser(targetUserId);
      setItems((current) => current.filter((item) => item.id !== targetUserId));
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('settings.blocked.error_unblock'));
    } finally {
      setPendingUserId(null);
    }
  }

  function confirmUnblock(item: BlockedUserListItem) {
    if (pendingUserId) {
      return;
    }

    Alert.alert(
      t('settings.blocked.unblock_title'),
      t('settings.blocked.unblock_body', { name: item.displayName }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('settings.blocked.unblock_action'),
          style: 'destructive',
          onPress: () => {
            void handleUnblock(item.id);
          },
        },
      ],
    );
  }

  return (
    <IosScreen
      title={t('settings.blocked.title')}
      subtitle={t('settings.blocked.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>⛔</Text>
        </View>
        <Text style={styles.heroTitle}>{t('settings.blocked.title')}</Text>
        <Text style={styles.heroBody}>{t('settings.blocked.body')}</Text>
      </View>

      <SettingsSection title={t('settings.blocked.section_blocked')}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              {isLoading ? t('settings.blocked.loading') : t('settings.blocked.empty_title')}
            </Text>
            <Text style={styles.emptyText}>
              {isLoading
                ? t('settings.blocked.loading_body')
                : t('settings.blocked.empty_body')}
            </Text>
            {!isLoading ? (
              <Pressable onPress={() => void loadBlockedUsers()} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>{t('common.retry')}</Text>
              </Pressable>
            ) : null}
          </View>
        ) : (
          items.map((item) => (
            <Pressable
              key={item.id}
              disabled={pendingUserId !== null}
              onPress={() => confirmUnblock(item)}
              style={styles.userCard}
            >
              <ProfileAvatar title={item.displayName} avatarMediaId={item.avatarMediaId} size={46} />
              <View style={styles.userBody}>
                <View style={styles.userTopline}>
                  <Text style={styles.userTitle}>{item.displayName}</Text>
                  <Text style={[styles.actionText, pendingUserId === item.id ? styles.actionTextDisabled : null]}>
                    {pendingUserId === item.id ? t('settings.blocked.unblocking') : t('settings.blocked.unblock_action')}
                  </Text>
                </View>
                <Text style={styles.userSubtitle}>{item.username ? `@${item.username}` : t('settings.blocked.no_username')}</Text>
                <Text style={styles.userMeta}>{t('settings.blocked.blocked_at', { date: formatTimestamp(item.blockedAt, t) })}</Text>
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

function formatTimestamp(timestamp: string, t: (key: string, params?: Record<string, string | number>) => string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return t('settings.blocked.recently');
  }

  return date.toLocaleString();
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
    backgroundColor: telegramColors.destructSoft,
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
  emptyState: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  emptyTitle: {
    ...telegramText.rowTitle,
    textAlign: 'center',
  },
  emptyText: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 999,
    marginTop: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  retryButtonText: {
    color: telegramColors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  userCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 12,
    minHeight: 72,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...telegramShadows.card,
  },
  userBody: {
    flex: 1,
    gap: 2,
  },
  userTopline: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  userTitle: {
    color: telegramColors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
  userSubtitle: {
    color: telegramColors.accent,
    fontSize: 14,
  },
  userMeta: {
    color: telegramColors.textTertiary,
    fontSize: 13,
  },
  actionText: {
    color: telegramColors.destructive,
    fontSize: 13,
    fontWeight: '700',
  },
  actionTextDisabled: {
    color: telegramColors.textTertiary,
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
