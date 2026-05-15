import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import {
  getChat,
  getChatMembers,
  removeChatMember,
  updateChatMemberRole,
  updateChatPermissions,
  type ChatDetails,
  type ChatMemberListItem,
} from '@features/chats/api/chats.api';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import type { ApiError } from '@shared/api/types';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramLayout, telegramText } from '@shared/ui/ios/theme';

type ChatInfoScreenProps = {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, params?: unknown) => void;
  };
  route?: {
    params?: {
      chatId?: string;
    };
  };
};

type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

export function ChatInfoScreen({ navigation, route }: ChatInfoScreenProps) {
  const { t } = useTranslation();
  const chatId = route?.params?.chatId ?? '';
  const currentUser = useSessionStore((state) => state.currentUser);
  const [chat, setChat] = useState<ChatDetails | null>(null);
  const [members, setMembers] = useState<ChatMemberListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRemovalUserId, setPendingRemovalUserId] = useState<string | null>(null);
  const [pendingRoleUserId, setPendingRoleUserId] = useState<string | null>(null);
  const [pendingPermissionKey, setPendingPermissionKey] = useState<'canSendMessages' | 'canAddMembers' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId) {
      setIsLoading(false);
      setErrorMessage(t('chats.info.error_unavailable'));
      return;
    }

    void loadInfo();
  }, [chatId]);

  useFocusEffect(
    useCallback(() => {
      if (!chatId) {
        return;
      }

      void loadInfo();
    }, [chatId]),
  );

  async function loadInfo() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [chatResponse, membersResponse] = await Promise.all([getChat(chatId), getChatMembers(chatId)]);
      setChat(chatResponse);
      setMembers(membersResponse.items);
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.info.error_load'));
    } finally {
      setIsLoading(false);
    }
  }

  const isDirectChat = chat?.type === 'direct';
  const currentMember = members.find((member) => member.userId === currentUser?.id) ?? null;
  const canEditIdentity = Boolean(
    chat &&
      !isDirectChat &&
      (currentMember?.role === 'owner' || currentMember?.role === 'admin'),
  );
  const canManageMembers = Boolean(
    chat &&
      !isDirectChat &&
      (chat.permissions.canAddMembers || currentMember?.role === 'owner' || currentMember?.role === 'admin'),
  );
  const canEditPermissions = Boolean(
    chat &&
      !isDirectChat &&
      (currentMember?.role === 'owner' || currentMember?.role === 'admin'),
  );
  const canManageRoles = currentMember?.role === 'owner';
  const title = chat?.summary.displayTitle ?? t('chats.info.title');
  const subtitle = chat
    ? chat.type === 'channel'
      ? members.length === 1 ? t('chats.info.subtitle_subscribers_one', { count: members.length }) : t('chats.info.subtitle_subscribers_other', { count: members.length })
      : members.length === 1 ? t('chats.info.subtitle_members_one', { count: members.length }) : t('chats.info.subtitle_members_other', { count: members.length })
    : t('chats.info.subtitle');

  function handleOpenMemberProfile(member: ChatMemberListItem) {
    navigation?.navigate('UserProfileView', {
      userId: member.userId,
      displayName: member.profile.displayName,
      username: member.profile.username,
      avatarMediaId: member.profile.avatarMediaId,
    });
  }

  function confirmRemoveMember(member: ChatMemberListItem) {
    const isCurrentUser = member.userId === currentUser?.id;
    const actionLabel = isCurrentUser ? t('chats.info.action_leave') : t('chats.info.action_remove');
    const targetLabel = isCurrentUser ? 'this chat' : member.profile.displayName;

    Alert.alert(
      t('chats.info.alert_title', { action: actionLabel, target: isCurrentUser ? 'Chat' : 'Member' }),
      isCurrentUser
        ? t('chats.info.alert_leave_body')
        : t('chats.info.alert_remove_body', { target: targetLabel }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: actionLabel,
          style: 'destructive',
          onPress: () => {
            void handleRemoveMember(member.userId);
          },
        },
      ],
    );
  }

  async function handleRemoveMember(userId: string) {
    if (pendingRemovalUserId) {
      return;
    }

    setPendingRemovalUserId(userId);
    setErrorMessage(null);

    try {
      await removeChatMember(chatId, userId);

      if (userId === currentUser?.id) {
        navigation?.goBack();
        return;
      }

      setMembers((current) => current.filter((member) => member.userId !== userId));
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.info.error_members'));
    } finally {
      setPendingRemovalUserId(null);
    }
  }

  async function handleTogglePermission(permissionKey: 'canSendMessages' | 'canAddMembers') {
    if (!chat || pendingPermissionKey) {
      return;
    }

    setPendingPermissionKey(permissionKey);
    setErrorMessage(null);

    try {
      const nextValue = !chat.permissions[permissionKey];
      const response = await updateChatPermissions(chatId, {
        [permissionKey]: nextValue,
      });

      setChat((current) =>
        current
          ? {
              ...current,
              permissions: {
                ...current.permissions,
                ...response.permissions,
              },
            }
          : current,
      );
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.info.error_permissions'));
    } finally {
      setPendingPermissionKey(null);
    }
  }

  async function handleUpdateMemberRole(member: ChatMemberListItem, role: 'admin' | 'member') {
    if (pendingRoleUserId) {
      return;
    }

    setPendingRoleUserId(member.userId);
    setErrorMessage(null);

    try {
      const response = await updateChatMemberRole(chatId, member.userId, role);
      setMembers((current) =>
        current.map((item) =>
          item.userId === member.userId
            ? {
                ...item,
                role: response.member.role,
              }
            : item,
        ),
      );
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.info.error_role'));
    } finally {
      setPendingRoleUserId(null);
    }
  }

  return (
    <IosScreen
      title={title}
      subtitle={subtitle}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.back')}</Text>
        </Pressable>
      }
      rightAction={
        canEditIdentity ? (
          <Pressable
            onPress={() => navigation?.navigate('EditChat', { chatId })}
            style={styles.headerAction}
          >
            <Text style={styles.headerActionText}>{t('common.edit')}</Text>
          </Pressable>
        ) : null
      }
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <IosSection title={t('chats.info.section_overview')}>
          <View style={styles.heroCard}>
            <ProfileAvatar
              title={chat?.summary.displayTitle ?? t('chats.info.title')}
              avatarMediaId={chat?.photoMediaId ?? chat?.summary.counterpartAvatarMediaId ?? null}
              color={getChatAccent(chat?.type)}
              size={86}
            />
            <View style={styles.heroBody}>
              <Text style={styles.heroTitle}>{chat?.summary.displayTitle ?? t('common.loading')}</Text>
              <Text style={styles.heroMeta}>
                {chat?.type === 'channel'
                  ? t('common.channel')
                  : chat?.type === 'group'
                    ? t('common.group')
                    : t('chats.info.type_conversation')}
              </Text>
              {chat?.description ? <Text style={styles.heroDescription}>{chat.description}</Text> : null}
              <View style={styles.heroActions}>
                {canEditIdentity ? (
                  <Pressable
                    onPress={() => navigation?.navigate('EditChat', { chatId })}
                    style={[styles.heroActionChip, styles.heroActionChipAccent]}
                  >
                    <Text style={styles.heroActionChipAccentText}>{t('chats.info.action_edit')}</Text>
                  </Pressable>
                ) : null}
                {canManageMembers ? (
                  <Pressable
                    onPress={() => navigation?.navigate('AddChatMembers', { chatId })}
                    style={styles.heroActionChip}
                  >
                    <Text style={styles.heroActionChipText}>{t('chats.info.action_add_members')}</Text>
                  </Pressable>
                ) : null}
                {canEditIdentity ? (
                  <Pressable
                    onPress={() => navigation?.navigate('InviteLinks', { chatId })}
                    style={styles.heroActionChip}
                  >
                    <Text style={styles.heroActionChipText}>{t('chats.info.action_invite_links')}</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </View>
        </IosSection>

        {!isDirectChat ? (
          <IosSection title={t('chats.info.section_permissions')}>
            <Pressable
              disabled={!canEditPermissions || pendingPermissionKey !== null}
              onPress={() => void handleTogglePermission('canSendMessages')}
              style={styles.permissionRow}
            >
              <View style={styles.permissionBody}>
                <Text style={styles.permissionLabel}>{t('chats.info.perm_send_messages')}</Text>
                <Text style={styles.permissionHint}>{t('chats.info.section_permissions')}</Text>
              </View>
              <View style={[styles.permissionValueChip, canEditPermissions ? styles.permissionValueChipActionable : null]}>
                <Text style={[styles.permissionValue, canEditPermissions ? styles.permissionValueActionable : null]}>
                  {pendingPermissionKey === 'canSendMessages'
                    ? t('common.updating')
                    : chat?.permissions.canSendMessages
                      ? t('common.allowed')
                      : t('common.restricted')}
                </Text>
              </View>
            </Pressable>
            <View style={styles.separator} />
            <Pressable
              disabled={!canEditPermissions || pendingPermissionKey !== null}
              onPress={() => void handleTogglePermission('canAddMembers')}
              style={styles.permissionRow}
            >
              <View style={styles.permissionBody}>
                <Text style={styles.permissionLabel}>{t('chats.info.perm_add_members')}</Text>
                <Text style={styles.permissionHint}>{t('chats.info.section_members')}</Text>
              </View>
              <View style={[styles.permissionValueChip, canEditPermissions ? styles.permissionValueChipActionable : null]}>
                <Text style={[styles.permissionValue, canEditPermissions ? styles.permissionValueActionable : null]}>
                  {pendingPermissionKey === 'canAddMembers'
                    ? t('common.updating')
                    : chat?.permissions.canAddMembers
                      ? t('common.allowed')
                      : t('common.restricted')}
                </Text>
              </View>
            </Pressable>
          </IosSection>
        ) : null}

        <IosSection title={chat?.type === 'channel' ? t('chats.info.section_subscribers') : t('chats.info.section_members')}>
          {isLoading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>{t('chats.info.loading_members')}</Text>
              <Text style={styles.emptyBody}>{t('chats.info.hint_loading_members')}</Text>
            </View>
          ) : members.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>{t('chats.info.no_members')}</Text>
              <Text style={styles.emptyBody}>{t('chats.info.hint_no_members')}</Text>
            </View>
          ) : (
            members.map((member, index) => {
              const isCurrentUser = member.userId === currentUser?.id;
              const canRemoveMember = Boolean(
                chat &&
                  !isDirectChat &&
                  (chat.permissions.canAddMembers || isCurrentUser),
              );
              const canChangeRole =
                Boolean(canManageRoles) &&
                !isCurrentUser &&
                member.role !== 'owner';

              return (
                <View key={member.userId}>
                  {index > 0 ? <View style={styles.separatorInset} /> : null}
                  <View style={styles.memberRow}>
                    <Pressable onPress={() => handleOpenMemberProfile(member)} style={styles.memberIdentity}>
                      <ProfileAvatar
                        title={member.profile.displayName}
                        avatarMediaId={member.profile.avatarMediaId}
                        color={telegramColors.accent}
                        size={44}
                      />
                      <View style={styles.memberBody}>
                        <Text style={styles.memberName}>
                          {member.profile.displayName}
                          {isCurrentUser ? ` ${t('chats.info.label_you')}` : ''}
                        </Text>
                        <Text style={styles.memberMeta}>
                          {member.profile.username ? `@${member.profile.username}` : formatMemberRole(member.role, t)}
                        </Text>
                        <Text style={styles.memberRole}>{formatMemberRole(member.role, t)}</Text>
                      </View>
                    </Pressable>
                    {canRemoveMember ? (
                      <Pressable
                        disabled={pendingRemovalUserId !== null || pendingRoleUserId !== null}
                        onPress={() => confirmRemoveMember(member)}
                        style={[styles.memberAction, styles.memberActionDestructive]}
                      >
                        <Text
                          style={[
                            styles.memberActionText,
                            pendingRemovalUserId === member.userId ? styles.memberActionTextDisabled : null,
                          ]}
                        >
                          {pendingRemovalUserId === member.userId
                            ? '…'
                            : isCurrentUser
                              ? t('chats.info.action_leave')
                              : t('chats.info.action_remove')}
                        </Text>
                      </Pressable>
                    ) : null}
                    {canChangeRole ? (
                      <Pressable
                        disabled={pendingRoleUserId !== null || pendingRemovalUserId !== null}
                        onPress={() => void handleUpdateMemberRole(member, member.role === 'admin' ? 'member' : 'admin')}
                        style={styles.memberAction}
                      >
                        <Text
                          style={[
                            styles.memberActionText,
                            styles.memberRoleActionText,
                            pendingRoleUserId === member.userId ? styles.memberActionTextDisabled : null,
                          ]}
                        >
                          {pendingRoleUserId === member.userId
                            ? '…'
                            : member.role === 'admin'
                              ? t('chats.info.action_demote')
                              : t('chats.info.action_promote')}
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              );
            })
          )}
        </IosSection>

        {errorMessage ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
      </ScrollView>
    </IosScreen>
  );
}

function formatMemberRole(
  role: ChatMemberListItem['role'],
  t: TranslateFn,
) {
  switch (role) {
    case 'owner':
      return t('common.owner');
    case 'admin':
      return t('common.admin');
    default:
      return t('common.member');
  }
}

function getChatAccent(chatType?: string) {
  switch (chatType) {
    case 'group':
      return '#52b788';
    case 'channel':
      return '#8b5cf6';
    default:
      return telegramColors.accent;
  }
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
  scrollContent: {
    gap: 18,
    paddingBottom: 28,
  },
  heroCard: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 22,
  },
  heroBody: {
    alignItems: 'center',
    gap: 4,
  },
  heroTitle: {
    ...telegramText.sectionTitle,
    fontSize: 24,
    textAlign: 'center',
  },
  heroMeta: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heroDescription: {
    ...telegramText.secondary,
    textAlign: 'center',
  },
  heroActions: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
  },
  heroActionChip: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  heroActionChipAccent: {
    backgroundColor: telegramColors.accentSoft,
  },
  heroActionChipText: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  heroActionChipAccentText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  permissionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 62,
    paddingHorizontal: 14,
  },
  permissionBody: {
    flex: 1,
    gap: 2,
  },
  permissionLabel: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  permissionHint: {
    color: telegramColors.textTertiary,
    fontSize: 12,
  },
  permissionValueChip: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  permissionValueChipActionable: {
    backgroundColor: telegramColors.accentSoft,
  },
  permissionValue: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  permissionValueActionable: {
    color: telegramColors.accent,
    fontWeight: '600',
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
  },
  emptyState: {
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 16,
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
  separatorInset: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 70,
  },
  memberRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  memberIdentity: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  memberBody: {
    flex: 1,
    gap: 2,
  },
  memberName: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  memberMeta: {
    color: telegramColors.textSecondary,
    fontSize: 13,
  },
  memberRole: {
    color: telegramColors.textTertiary,
    fontSize: 12,
  },
  memberAction: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    justifyContent: 'center',
    minWidth: 56,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  memberActionDestructive: {
    backgroundColor: telegramColors.destructSoft,
  },
  memberActionText: {
    color: telegramColors.destructive,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  memberRoleActionText: {
    color: telegramColors.accent,
  },
  memberActionTextDisabled: {
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
