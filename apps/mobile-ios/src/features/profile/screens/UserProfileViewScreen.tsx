import { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Linking, Modal, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { createDirectChat, muteChat, unmuteChat } from '@features/chats/api/chats.api';
import { startChatVoiceCall } from '@features/calls/services/call-coordinator';
import { getMessages, type MessageListItem } from '@features/messages/api/messages.api';
import { getMedia, type MediaObject } from '@features/messages/api/media.api';
import {
  blockUser,
  getProfileByUserId,
  getProfilePresenceByUserId,
  listBlockedUsers,
  unblockUser,
  type ProfilePresence,
  type PublicProfile,
} from '@features/profile/api/profile.api';
import { useAvatarPreviewUrl } from '@features/profile/hooks/useAvatarPreviewUrl';
import type { ApiError } from '@shared/api/types';
import { env } from '@shared/config/env';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { useChatDirectoryStore } from '@shared/chats/chat-directory.store';
import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { documentPreviewApi, isNativeDocumentPreviewAvailable } from '@shared/native/document-preview';
import { isNativeVideoPlaybackAvailable, videoPlaybackApi } from '@shared/native/video-playback';
import { IosAvatar } from '@shared/ui/ios/IosAvatar';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import {
  ImageViewerContent as RealUiImageViewerContent,
  ThemeProvider as RealUiThemeProvider,
} from '@telegram/ui';

type UserProfileViewScreenProps = {
  navigation?: {
    goBack?: () => void;
    navigate?: (screen: string, params?: unknown) => void;
  };
  route?: {
    params?: {
      userId?: string;
      chatId?: string;
      displayName?: string;
      username?: string | null;
      avatarMediaId?: string | null;
      phoneNumber?: string | null;
    };
  };
};

type UserProfileState = PublicProfile & {
  phoneNumber?: string | null;
};

type ProfileMediaTile = {
  mediaId: string;
  messageId: string;
  type: 'image' | 'video' | 'file';
  previewUrl: string | null;
  title: string;
  mimeType: string;
  targetUrl: string | null;
};

export function UserProfileViewScreen({ navigation, route }: UserProfileViewScreenProps) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const registerDirectChat = useChatDirectoryStore((state) => state.registerDirectChat);
  const chats = useChatInboxStore((state) => state.chats);
  const muteChatLocal = useChatInboxStore((state) => state.muteChatLocal);
  const unmuteChatLocal = useChatInboxStore((state) => state.unmuteChatLocal);
  const params = route?.params;
  const userId = params?.userId ?? '';
  const seededName = params?.displayName?.trim() || t('profile.view.unknown_user');
  const seededProfile = useMemo<UserProfileState>(
    () => ({
      id: userId,
      displayName: seededName,
      username: params?.username ?? '',
      avatarMediaId: params?.avatarMediaId ?? null,
      phoneNumber: params?.phoneNumber ?? null,
      bio: null,
    }),
    [params?.avatarMediaId, params?.phoneNumber, params?.username, seededName, userId],
  );
  const [profile, setProfile] = useState<UserProfileState>(seededProfile);
  const [presence, setPresence] = useState<ProfilePresence | null>(null);
  const [chatId, setChatId] = useState<string | null>(params?.chatId ?? null);
  const [isLoading, setIsLoading] = useState(Boolean(userId));
  const [isOpeningChat, setIsOpeningChat] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isBlockingUser, setIsBlockingUser] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mediaTiles, setMediaTiles] = useState<ProfileMediaTile[]>([]);
  const [previewImageTile, setPreviewImageTile] = useState<ProfileMediaTile | null>(null);
  const avatarPreviewUrl = useAvatarPreviewUrl(profile.avatarMediaId);

  useEffect(() => {
    setProfile(seededProfile);
    setChatId(params?.chatId ?? null);
  }, [params?.chatId, seededProfile]);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setErrorMessage(t('profile.view.error_unavailable'));
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setErrorMessage(null);

    void Promise.allSettled([getProfileByUserId(userId), getProfilePresenceByUserId(userId), listBlockedUsers()]).then((results) => {
      if (cancelled) {
        return;
      }

      const [profileResult, presenceResult, blockedResult] = results;
      if (profileResult.status === 'fulfilled') {
        setProfile((current) => ({
          ...current,
          ...profileResult.value,
          phoneNumber: profileResult.value.phoneNumber ?? current.phoneNumber ?? null,
          bio: profileResult.value.bio ?? current.bio ?? null,
        }));
      } else {
        setErrorMessage('Unable to load profile details.');
      }

      if (presenceResult.status === 'fulfilled') {
        setPresence(presenceResult.value);
      }

      if (blockedResult.status === 'fulfilled') {
        setIsBlocked(blockedResult.value.items.some((item) => item.id === userId));
      }

      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const canStartCall = env.features.callsV1 && userId !== currentUser?.id;
  const displayName = profile.displayName?.trim() || seededName;
  const username = profile.username?.trim() ? `@${profile.username}` : t('profile.view.not_set');
  const phoneText = profile.phoneNumber?.trim() || t('profile.view.not_shared');
  const presenceText =
    presence?.lastSeenAt || !presence?.canViewLastSeen
      ? formatPresenceLabel(presence, t)
      : t('profile.view.online_now');
  const existingDirectChatId = useMemo(
    () => chats.find((candidate) => candidate.type === 'direct' && candidate.summary.counterpartUserId === userId)?.id ?? null,
    [chats, userId],
  );
  const currentChat = chatId ? chats.find((candidate) => candidate.id === chatId) ?? null : null;
  const isMuted = currentChat?.summary.isMuted ?? false;
  const mediaChatId = chatId ?? existingDirectChatId;

  useEffect(() => {
    if (!params?.chatId && existingDirectChatId && chatId !== existingDirectChatId) {
      setChatId(existingDirectChatId);
    }
  }, [chatId, existingDirectChatId, params?.chatId]);

  useEffect(() => {
    if (!mediaChatId || !userId) {
      setMediaTiles([]);
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        const response = await getMessages(mediaChatId);
        const candidateMessages = response.items
          .filter(isProfileMediaCandidate)
          .slice()
          .reverse()
          .slice(0, 6);

        const mediaResults = await Promise.allSettled(
          candidateMessages.map(async (message) => {
            const mediaId = message.attachments[0]?.mediaId ?? null;
            if (!mediaId) {
              return null;
            }

            const media = await getMedia(mediaId);
            const resolvedTile = buildProfileMediaTile(message, media);
            if (!resolvedTile) {
              return null;
            }

            return resolvedTile;
          }),
        );

        if (cancelled) {
          return;
        }

        setMediaTiles(
          mediaResults
            .map((result) => (result.status === 'fulfilled' ? result.value : null))
            .filter((item): item is ProfileMediaTile => item !== null),
        );
      } catch {
        if (!cancelled) {
          setMediaTiles([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mediaChatId, userId]);

  async function ensureDirectChat(): Promise<string | null> {
    if (chatId ?? existingDirectChatId) {
      return chatId ?? existingDirectChatId;
    }

    if (!userId || isOpeningChat) {
      return null;
    }

    setIsOpeningChat(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await createDirectChat(userId);
      registerDirectChat({
        chatId: response.chat.id,
        title: displayName,
        participantUserId: userId,
      });
      setChatId(response.chat.id);
      return response.chat.id;
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error as ApiError, 'Unable to open this conversation.'));
      return null;
    } finally {
      setIsOpeningChat(false);
    }
  }

  async function handleOpenMediaTile(tile: ProfileMediaTile) {
    setErrorMessage(null);

    if (tile.type === 'image' && tile.previewUrl) {
      setPreviewImageTile(tile);
      return;
    }

    if (!tile.targetUrl) {
      setErrorMessage('This attachment is unavailable.');
      return;
    }

    if (tile.type === 'video' && isNativeVideoPlaybackAvailable()) {
      try {
        await videoPlaybackApi.present(tile.targetUrl, tile.title);
        return;
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to open video.');
        return;
      }
    }

    if (tile.type === 'file' && isPreviewableDocument(tile.mimeType, tile.targetUrl)) {
      try {
        await documentPreviewApi.present(tile.targetUrl, tile.title);
        return;
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to preview file.');
        return;
      }
    }

    try {
      const canOpen = await Linking.canOpenURL(tile.targetUrl);
      if (!canOpen) {
        throw new Error('This attachment cannot be opened on this device.');
      }
      await Linking.openURL(tile.targetUrl);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to open attachment.');
    }
  }

  async function handleOpenChat() {
    const resolvedChatId = await ensureDirectChat();
    if (!resolvedChatId) {
      return;
    }

    navigation?.navigate?.('ChatThread', { chatId: resolvedChatId });
  }

  async function handleStartCall() {
    const resolvedChatId = await ensureDirectChat();
    if (!resolvedChatId || isCalling) {
      return;
    }

    setIsCalling(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      await startChatVoiceCall(resolvedChatId);
      navigation?.navigate?.('ChatThread', { chatId: resolvedChatId });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error as ApiError, t('profile.view.error_start_call')));
    } finally {
      setIsCalling(false);
    }
  }

  async function handleToggleMuteNotifications() {
    const resolvedChatId = await ensureDirectChat();
    if (!resolvedChatId) {
      return;
    }

    setErrorMessage(null);
    setStatusMessage(null);

    try {
      if (isMuted) {
        await unmuteChat(resolvedChatId);
        unmuteChatLocal(resolvedChatId);
        setStatusMessage(t('profile.view.notifications_unmuted'));
      } else {
        await muteChat(resolvedChatId);
        muteChatLocal(resolvedChatId);
        setStatusMessage(t('profile.view.notifications_muted'));
      }
    } catch {
      setErrorMessage(t('profile.view.error_notifications'));
    }
  }

  function handleBlockUser() {
    if (!userId || isBlockingUser) {
      return;
    }

    Alert.alert(
      isBlocked ? t('profile.view.unblock_user') : t('profile.view.block_user'),
      t('profile.view.block_confirm', { name: displayName }),
      [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: isBlocked ? t('profile.view.unblock_user') : t('profile.view.block_user'),
        style: 'destructive',
        onPress: () => {
          void confirmBlockUser();
        },
      },
    ]);
  }

  async function confirmBlockUser() {
    if (!userId || isBlockingUser) {
      return;
    }

    setIsBlockingUser(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      if (isBlocked) {
        await unblockUser(userId);
        setIsBlocked(false);
        setStatusMessage(t('profile.view.user_unblocked'));
      } else {
        await blockUser(userId);
        setIsBlocked(true);
        setStatusMessage(t('profile.view.user_blocked'));
      }
    } catch {
      setErrorMessage(isBlocked ? t('profile.view.error_unblock') : t('profile.view.error_block'));
    } finally {
      setIsBlockingUser(false);
    }
  }

  return (
    <IosScreen
      title={t('profile.view.title')}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack?.()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>‹</Text>
        </Pressable>
      }
      rightAction={
        <Pressable onPress={() => Alert.alert(t('profile.view.actions_title'), t('profile.view.actions_body'))} style={styles.headerAction}>
          <Text style={[styles.headerActionText, styles.headerActionMore]}>⋯</Text>
        </Pressable>
      }
    >
      <View style={styles.hero}>
        <View style={styles.heroTintPrimary} />
        <View style={styles.heroTintSecondary} />
        <View style={styles.heroAvatarWrap}>
          <IosAvatar imageUrl={avatarPreviewUrl} size={telegramLayout.avatarHero} title={displayName} />
          {presenceText === t('profile.view.online_now') ? <View style={styles.heroOnlineDot} /> : null}
        </View>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={[styles.presence, presenceText === t('profile.view.online_now') ? styles.presenceOnline : null]}>{presenceText}</Text>

        <View style={styles.heroActions}>
          <Pressable
            onPress={() => void handleOpenChat()}
            style={({ pressed }: { pressed: boolean }) => [styles.primaryAction, pressed ? styles.pressed : null]}
          >
            <Text style={styles.primaryActionText}>{isOpeningChat ? t('common.opening') : `💬 ${t('contacts.item_message')}`}</Text>
          </Pressable>
          <Pressable
            disabled={!canStartCall || isOpeningChat || isCalling}
            onPress={() => void handleStartCall()}
            style={({ pressed }: { pressed: boolean }) => [
              styles.secondaryAction,
              (!canStartCall || isOpeningChat || isCalling) ? styles.actionDisabled : null,
              pressed ? styles.pressed : null,
            ]}
          >
            <Text style={styles.secondaryActionText}>{isCalling ? t('calls.state_calling') : `📞 ${t('calls.voice_call')}`}</Text>
          </Pressable>
        </View>
      </View>

      <IosSection title={t('profile.view.section_info')}>
        <View style={styles.settingsRow}>
          <View style={styles.settingsGlyph}>
            <Text style={styles.settingsGlyphText}>📱</Text>
          </View>
          <Text style={styles.settingsLabel}>{t('profile.view.phone')}</Text>
          <Text style={styles.settingsValue}>{phoneText}</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.settingsRow}>
          <View style={styles.settingsGlyph}>
            <Text style={styles.settingsGlyphText}>🌐</Text>
          </View>
          <Text style={styles.settingsLabel}>{t('profile.view.username')}</Text>
          <Text style={styles.settingsValue}>{username}</Text>
        </View>
      </IosSection>

      <IosSection title={t('profile.view.section_media')}>
        <View style={styles.mediaGrid}>
          {mediaTiles.length > 0 ? (
            mediaTiles.map((item) => (
              <Pressable
                key={item.mediaId}
                onPress={() => void handleOpenMediaTile(item)}
                style={({ pressed }: { pressed: boolean }) => [styles.mediaTile, pressed ? styles.pressed : null]}
              >
                {item.previewUrl ? <Image source={{ uri: item.previewUrl }} style={styles.mediaTileImage} /> : null}
                {item.type === 'file' ? (
                  <View style={styles.mediaFileTile}>
                    <Text numberOfLines={2} style={styles.mediaFileTitle}>{item.title}</Text>
                    <Text style={styles.mediaFileMeta}>{simplifyMimeType(item.mimeType)}</Text>
                  </View>
                ) : null}
                {item.type === 'video' ? (
                  <View style={styles.mediaTileVideoBadge}>
                    <Text style={styles.mediaTileVideoIcon}>▶</Text>
                  </View>
                ) : null}
              </Pressable>
            ))
          ) : (
            <View style={styles.mediaEmptyState}>
              <Text style={styles.mediaEmptyText}>{mediaChatId ? t('profile.view.no_shared_media') : t('profile.view.open_conversation_media')}</Text>
            </View>
          )}
        </View>
      </IosSection>

      <IosSection>
        <Pressable onPress={() => void handleToggleMuteNotifications()} style={({ pressed }: { pressed: boolean }) => [styles.settingsRow, pressed ? styles.pressed : null]}>
          <View style={styles.settingsGlyph}>
            <Text style={styles.settingsGlyphText}>🔇</Text>
          </View>
          <Text style={styles.settingsLabel}>{isMuted ? t('profile.view.unmute_notifications') : t('profile.view.mute_notifications')}</Text>
        </Pressable>
        <View style={styles.infoDivider} />
        <Pressable onPress={handleBlockUser} style={({ pressed }: { pressed: boolean }) => [styles.settingsRow, pressed ? styles.pressed : null]}>
          <View style={[styles.settingsGlyph, styles.settingsGlyphDanger]}>
            <Text style={[styles.settingsGlyphText, styles.settingsGlyphTextDanger]}>🔒</Text>
          </View>
          <Text style={styles.blockText}>
            {isBlockingUser ? (isBlocked ? t('profile.view.unblocking') : t('profile.view.blocking')) : isBlocked ? t('profile.view.unblock_user') : t('profile.view.block_user')}
          </Text>
        </Pressable>
      </IosSection>

      {statusMessage ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.statusText}>{statusMessage}</Text>
        </View>
      ) : null}
      {isLoading ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.loadingText}>{t('profile.view.loading')}</Text>
        </View>
      ) : null}
      {errorMessage ? (
        <View style={[styles.feedbackCard, styles.feedbackCardError]}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <Modal transparent animationType="fade" visible={previewImageTile !== null} onRequestClose={() => setPreviewImageTile(null)}>
        <SafeAreaView style={styles.imageViewerOverlay}>
          {previewImageTile?.previewUrl ? (
            <RealUiThemeProvider mode="light">
              <RealUiImageViewerContent
                imageUrl={previewImageTile.previewUrl}
                meta={t('profile.view.section_media')}
                onPressClose={() => setPreviewImageTile(null)}
                title={displayName}
              />
            </RealUiThemeProvider>
          ) : null}
        </SafeAreaView>
      </Modal>
    </IosScreen>
  );
}

function formatPresenceLabel(
  presence: ProfilePresence | null,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  if (!presence?.canViewLastSeen) {
    return t('profile.view.last_seen_recently');
  }

  if (!presence.lastSeenAt) {
    return t('profile.view.online_now');
  }

  return t('profile.view.last_seen_recently');
}

function getApiErrorMessage(error: ApiError, fallbackMessage: string) {
  if (typeof error?.message === 'string' && error.message.trim().length > 0) {
    return error.message;
  }

  if (Array.isArray(error?.message) && error.message.length > 0) {
    return error.message.join(', ');
  }

  return fallbackMessage;
}

function isProfileMediaCandidate(message: MessageListItem) {
  if (message.deletedAt) {
    return false;
  }

  if ((message.type !== 'image' && message.type !== 'video' && message.type !== 'file') || message.attachments.length === 0) {
    return false;
  }

  return true;
}

function buildProfileMediaTile(message: MessageListItem, media: MediaObject): ProfileMediaTile | null {
  if (media.processingStatus !== 'ready') {
    return null;
  }

  if (message.type === 'video') {
    const thumbVariant = media.variants.find((item) => item.variantType === 'thumbnail');
    return thumbVariant?.downloadUrl
      ? {
          mediaId: media.id,
          messageId: message.id,
          mimeType: media.mimeType,
          previewUrl: thumbVariant.downloadUrl,
          targetUrl: media.downloadUrl,
          title: 'Video',
          type: 'video',
        }
      : null;
  }

  if (message.type === 'image') {
    const thumbVariant = media.variants.find((item) => item.variantType === 'thumbnail');
    const previewUrl = thumbVariant?.downloadUrl ?? media.variants[0]?.downloadUrl ?? media.downloadUrl;
    return previewUrl
      ? {
          mediaId: media.id,
          messageId: message.id,
          mimeType: media.mimeType,
          previewUrl,
          targetUrl: media.downloadUrl,
          title: 'Image',
          type: 'image',
        }
      : null;
  }

  return {
    mediaId: media.id,
    messageId: message.id,
    mimeType: media.mimeType,
    previewUrl: null,
    targetUrl: media.downloadUrl,
    title: buildFileTitle(media),
    type: 'file',
  };
}

function buildFileTitle(media: MediaObject) {
  const extension = extractExtension(media.downloadUrl);
  if (extension) {
    return extension.toUpperCase();
  }

  return simplifyMimeType(media.mimeType).toUpperCase();
}

function extractExtension(value: string) {
  const cleanValue = value.split('?')[0] ?? value;
  const segments = cleanValue.split('.');
  return segments.length > 1 ? segments[segments.length - 1]?.trim().toLowerCase() ?? '' : '';
}

function simplifyMimeType(mimeType: string) {
  const normalized = mimeType.trim().toLowerCase();
  if (normalized === 'text/plain') return 'TXT';
  if (normalized === 'application/pdf') return 'PDF';
  if (normalized === 'application/json') return 'JSON';
  if (normalized === 'text/markdown') return 'MD';
  return mimeType.split('/')[1]?.toUpperCase() ?? mimeType.toUpperCase();
}

function isPreviewableDocument(mimeType: string, url: string) {
  const normalized = mimeType.trim().toLowerCase();
  if (['application/pdf', 'text/plain', 'application/json', 'text/markdown'].includes(normalized)) {
    return true;
  }

  const extension = extractExtension(url);
  return ['pdf', 'txt', 'md', 'json', 'rtf'].includes(extension);
}

const styles = StyleSheet.create({
  headerAction: {
    minHeight: 32,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  headerActionText: {
    color: telegramColors.accent,
    fontSize: 22,
    fontWeight: '700',
  },
  headerActionMore: {
    fontSize: 20,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: telegramColors.appBackground,
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
    gap: 8,
    marginHorizontal: -telegramLayout.screenPadding,
    marginTop: -10,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 26,
    position: 'relative',
  },
  heroTintPrimary: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    height: 220,
    opacity: 0.8,
    position: 'absolute',
    right: -80,
    top: -80,
    width: 220,
  },
  heroTintSecondary: {
    backgroundColor: telegramColors.badgeSoft,
    borderRadius: 999,
    height: 180,
    left: -70,
    opacity: 0.45,
    position: 'absolute',
    top: -55,
    width: 180,
  },
  heroAvatarWrap: {
    position: 'relative',
  },
  heroOnlineDot: {
    backgroundColor: telegramColors.online,
    borderColor: telegramColors.surface,
    borderRadius: 999,
    borderWidth: 3,
    bottom: 4,
    height: 18,
    position: 'absolute',
    right: 2,
    width: 18,
  },
  displayName: {
    ...telegramText.sectionTitle,
    fontSize: 24,
    letterSpacing: -0.5,
    marginTop: 8,
    textAlign: 'center',
  },
  username: {
    ...telegramText.body,
    color: telegramColors.accent,
    fontWeight: '600',
    marginTop: -2,
  },
  presence: {
    ...telegramText.secondary,
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  presenceOnline: {
    color: telegramColors.online,
    fontWeight: '600',
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    width: '100%',
    maxWidth: 280,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: telegramColors.accent,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    ...telegramShadows.button,
  },
  secondaryAction: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    ...telegramShadows.card,
  },
  actionDisabled: {
    opacity: 0.45,
  },
  primaryActionText: {
    color: telegramColors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryActionText: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.82,
  },
  settingsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingsGlyph: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 9,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  settingsGlyphDanger: {
    backgroundColor: telegramColors.destructSoft,
  },
  settingsGlyphText: {
    fontSize: 17,
    fontWeight: '700',
  },
  settingsGlyphTextDanger: {
    color: telegramColors.destructive,
  },
  settingsLabel: {
    ...telegramText.rowTitle,
    fontWeight: '500',
    flex: 1,
  },
  settingsValue: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    maxWidth: 146,
    textAlign: 'right',
  },
  blockText: {
    ...telegramText.rowTitle,
    color: telegramColors.destructive,
    fontWeight: '500',
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
    aspectRatio: 1,
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '31.9%',
  },
  mediaTileImage: {
    height: '100%',
    width: '100%',
  },
  mediaFileTile: {
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mediaFileTitle: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  mediaFileMeta: {
    color: telegramColors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  mediaTileVideoBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(15, 17, 25, 0.52)',
    borderRadius: 999,
    height: 28,
    justifyContent: 'center',
    left: '50%',
    marginLeft: -14,
    marginTop: -14,
    position: 'absolute',
    top: '50%',
    width: 28,
  },
  mediaTileVideoIcon: {
    color: telegramColors.white,
    fontSize: 12,
    marginLeft: 1,
  },
  mediaEmptyState: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 12,
    minHeight: 92,
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  mediaEmptyText: {
    color: telegramColors.textTertiary,
    fontSize: 13,
    textAlign: 'center',
  },
  imageViewerOverlay: {
    backgroundColor: 'rgba(8, 10, 14, 0.96)',
    flex: 1,
  },
  feedbackCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...telegramShadows.card,
  },
  feedbackCardError: {
    backgroundColor: telegramColors.destructSoft,
  },
  statusText: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  loadingText: {
    color: telegramColors.textTertiary,
    fontSize: 13,
    textAlign: 'center',
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 13,
    textAlign: 'center',
  },
});
