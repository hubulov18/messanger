import { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  createChatInviteLink,
  getChat,
  getChatInviteLinks,
  revokeChatInviteLink,
  type ChatInviteLinkListItem,
} from '@features/chats/api/chats.api';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type InviteLinksScreenProps = {
  navigation?: {
    goBack: () => void;
  };
  route?: {
    params?: {
      chatId?: string;
    };
  };
};

export function InviteLinksScreen({ navigation, route }: InviteLinksScreenProps) {
  const { t, locale } = useTranslation();
  const chatId = route?.params?.chatId ?? '';
  const [chatTitle, setChatTitle] = useState('');
  const [items, setItems] = useState<ChatInviteLinkListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingRevokeId, setPendingRevokeId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedExpiryDays, setSelectedExpiryDays] = useState<number | null>(7);
  const [selectedMaxUses, setSelectedMaxUses] = useState<number | null>(10);

  useFocusEffect(
    useCallback(() => {
      if (!chatId) {
        setErrorMessage(t('chats.info.error_unavailable'));
        setIsLoading(false);
        return;
      }

      void loadInviteLinks();
    }, [chatId]),
  );

  async function loadInviteLinks() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [chatResponse, inviteLinksResponse] = await Promise.all([
        getChat(chatId),
        getChatInviteLinks(chatId),
      ]);

      setChatTitle(chatResponse.summary.displayTitle);
      setItems(inviteLinksResponse.items);
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.invite_links.error_load'));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateInviteLink() {
    if (isCreating) {
      return;
    }

    setIsCreating(true);
    setErrorMessage(null);

    try {
      const response = await createChatInviteLink(chatId, {
        ...(selectedMaxUses ? { maxUses: selectedMaxUses } : {}),
        ...(selectedExpiryDays ? { expiresInDays: selectedExpiryDays } : {}),
      });
      setItems((current) => [response.inviteLink, ...current]);
      await Share.share({
        title: t('chats.invite_links.share_title', { chat: chatTitle }),
        message: t('chats.invite_links.share_message', { chat: chatTitle, url: response.inviteLink.inviteUrl }),
      });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.invite_links.error_create'));
    } finally {
      setIsCreating(false);
    }
  }

  function confirmRevoke(item: ChatInviteLinkListItem) {
    if (pendingRevokeId) {
      return;
    }

    Alert.alert(
      t('chats.invite_links.alert_revoke_title'),
      t('chats.invite_links.alert_revoke_body'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('chats.invite_links.action_revoke'),
          style: 'destructive',
          onPress: () => {
            void handleRevoke(item.id);
          },
        },
      ],
    );
  }

  async function handleRevoke(inviteLinkId: string) {
    if (pendingRevokeId) {
      return;
    }

    setPendingRevokeId(inviteLinkId);
    setErrorMessage(null);

    try {
      await revokeChatInviteLink(chatId, inviteLinkId);
      setItems((current) =>
        current.map((item) =>
          item.id === inviteLinkId
            ? { ...item, revokedAt: new Date().toISOString() }
            : item,
        ),
      );
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.invite_links.error_revoke'));
    } finally {
      setPendingRevokeId(null);
    }
  }

  async function handleShare(item: ChatInviteLinkListItem) {
    await Share.share({
      title: t('chats.invite_links.share_title', { chat: chatTitle }),
      message: t('chats.invite_links.share_message', { chat: chatTitle, url: item.inviteUrl }),
    });
  }

  const expiryPresets = [
    { label: t('chats.invite_links.expires_none'), value: null },
    { label: t('chats.invite_links.expires_1d'), value: 1 },
    { label: t('chats.invite_links.expires_7d'), value: 7 },
    { label: t('chats.invite_links.expires_30d'), value: 30 },
  ] as const;

  const maxUsesPresets = [
    { label: t('chats.invite_links.usage_unlimited'), value: null },
    { label: t('chats.invite_links.usage_1'), value: 1 },
    { label: t('chats.invite_links.usage_10'), value: 10 },
    { label: t('chats.invite_links.usage_100'), value: 100 },
  ] as const;

  return (
    <IosScreen
      title={t('chats.invite_links.title')}
      subtitle={t('chats.invite_links.body', { chat: chatTitle })}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.back')}</Text>
        </Pressable>
      }
      rightAction={
        <Pressable onPress={() => void handleCreateInviteLink()} style={styles.headerAction}>
          <Text style={styles.headerActionAccent}>{isCreating ? t('common.creating') : t('common.create')}</Text>
        </Pressable>
      }
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>🔗</Text>
        </View>
        <Text style={styles.heroTitle}>{chatTitle}</Text>
        <Text style={styles.heroBody}>{t('chats.invite_links.hint_create')}</Text>
      </View>

      <IosSection title={t('chats.invite_links.section_create')}>
        <View style={styles.createSection}>
          <View style={styles.presetGroup}>
            <Text style={styles.presetLabel}>{t('chats.invite_links.label_expires')}</Text>
            <View style={styles.presetWrap}>
              {expiryPresets.map((preset) => {
                const isSelected = selectedExpiryDays === preset.value;
                return (
                  <Pressable
                    key={preset.label}
                    onPress={() => setSelectedExpiryDays(preset.value)}
                    style={[styles.presetChip, isSelected ? styles.presetChipSelected : null]}
                  >
                    <Text style={[styles.presetChipText, isSelected ? styles.presetChipTextSelected : null]}>
                      {preset.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.presetGroup}>
            <Text style={styles.presetLabel}>{t('chats.invite_links.label_usage')}</Text>
            <View style={styles.presetWrap}>
              {maxUsesPresets.map((preset) => {
                const isSelected = selectedMaxUses === preset.value;
                return (
                  <Pressable
                    key={preset.label}
                    onPress={() => setSelectedMaxUses(preset.value)}
                    style={[styles.presetChip, isSelected ? styles.presetChipSelected : null]}
                  >
                    <Text style={[styles.presetChipText, isSelected ? styles.presetChipTextSelected : null]}>
                      {preset.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Text style={styles.createHint}>{t('chats.invite_links.hint_create')}</Text>
        </View>
      </IosSection>

      <IosSection title={t('chats.invite_links.section_links')}>
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('chats.invite_links.loading')}</Text>
            <Text style={styles.emptyBody}>{t('chats.invite_links.hint_loading')}</Text>
          </View>
        ) : items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('chats.invite_links.no_links')}</Text>
            <Text style={styles.emptyBody}>{t('chats.invite_links.hint_no_links')}</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.listContent}>
            {items.map((item, index) => (
              <View key={item.id}>
                {index > 0 ? <View style={styles.separatorInset} /> : null}
                <View style={styles.linkRow}>
                  <View style={styles.linkBody}>
                    <Text numberOfLines={1} style={styles.linkUrl}>{item.inviteUrl}</Text>
                    <Text style={styles.linkMeta}>
                      {item.revokedAt
                        ? t('chats.invite_links.status_revoked')
                        : item.maxUses
                          ? t('chats.invite_links.uses_limited', { used: item.usedCount, max: item.maxUses })
                          : t(item.usedCount === 1 ? 'chats.invite_links.uses_count_one' : 'chats.invite_links.uses_count_other', { count: item.usedCount })}
                    </Text>
                    <Text style={styles.linkMeta}>
                      {t('chats.invite_links.created_at', { date: formatTimestamp(item.createdAt, locale) })}
                      {item.expiresAt ? ` · ${t('chats.invite_links.expires_at', { date: formatTimestamp(item.expiresAt, locale) })}` : ''}
                    </Text>
                  </View>
                  <View style={styles.linkActions}>
                    {!item.revokedAt ? (
                      <Pressable onPress={() => void handleShare(item)} style={styles.actionChip}>
                        <Text style={styles.actionChipText}>{t('chats.invite_links.action_share')}</Text>
                      </Pressable>
                    ) : null}
                    <Pressable
                      disabled={Boolean(item.revokedAt) || pendingRevokeId !== null}
                      onPress={() => confirmRevoke(item)}
                      style={styles.actionChip}
                    >
                      <Text style={[styles.actionChipText, styles.actionChipTextDestructive]}>
                        {pendingRevokeId === item.id ? '…' : item.revokedAt ? t('chats.invite_links.status_revoked') : t('chats.invite_links.action_revoke')}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </IosSection>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </IosScreen>
  );
}

function formatTimestamp(value: string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return locale === 'ru' ? 'недавно' : 'recently';
  }

  return date.toLocaleString(locale === 'ru' ? 'ru-RU' : 'en-US');
}

const styles = StyleSheet.create({
  headerAction: {
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 44,
  },
  headerActionText: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  headerActionAccent: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
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
  emptyState: {
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  createSection: {
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  presetGroup: {
    gap: 8,
  },
  presetLabel: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  presetWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetChip: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 999,
    minHeight: 34,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  presetChipSelected: {
    backgroundColor: telegramColors.accent,
  },
  presetChipText: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  presetChipTextSelected: {
    color: '#FFFFFF',
  },
  createHint: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  emptyTitle: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyBody: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  listContent: {
    paddingBottom: 8,
  },
  separatorInset: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 14,
  },
  linkRow: {
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  linkBody: {
    gap: 4,
  },
  linkUrl: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  linkMeta: {
    color: telegramColors.textSecondary,
    fontSize: 13,
  },
  linkActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  actionChip: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  actionChipText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  actionChipTextDestructive: {
    color: telegramColors.destructive,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
    paddingHorizontal: 4,
  },
});
