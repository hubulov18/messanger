import { useEffect, useRef, useState, useCallback } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTranslation } from '@shared/i18n';

import type { ChatListItem } from '@features/chats/api/chats.api';
import { archiveChat, createDirectChat, deleteChatForSelf, getChats, muteChat, pinChat, unarchiveChat, unmuteChat, unpinChat } from '@features/chats/api/chats.api';
import { useChatListSearch, type GlobalMessageSearchResult } from '@features/chats/hooks/useChatListSearch';
import { saveMatchedContact } from '@features/contacts/api/contacts.api';
import type { MessageListItem } from '@features/messages/api/messages.api';
import { getProfileByUserId } from '@features/profile/api/profile.api';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import type { ApiError } from '@shared/api/types';
import { useSessionStore } from '@shared/auth/session.store';
import { useChatDirectoryStore } from '@shared/chats/chat-directory.store';
import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { useChatReadStateStore } from '@shared/chats/chat-read-state.store';
import { useAppForegroundCallback } from '@shared/hooks/useAppForegroundCallback';
import { useChatUnreadStore } from '@shared/chats/chat-unread.store';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSearchField } from '@shared/ui/ios/IosSearchField';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type ChatListScreenProps = {
  navigation?: {
    navigate: (screen: string, params?: unknown) => void;
    getParent?: () => {
      navigate: (screen: string, params?: unknown) => void;
    } | undefined;
  };
};

const CHAT_LIST_POLL_INTERVAL_MS = 10000;
const CHAT_LIST_SILENT_RELOAD_MIN_INTERVAL_MS = 900;
type ChatListFilter = 'all' | 'unread' | 'groups';
type ContactSearchResult = {
  userId: string;
  displayName: string;
  username: string | null;
  avatarMediaId: string | null;
};

export function ChatListScreen({ navigation }: ChatListScreenProps) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const contactsByUserId = useChatDirectoryStore((state) => state.contactsByUserId);
  const registerContacts = useChatDirectoryStore((state) => state.registerContacts);
  const registerDirectChat = useChatDirectoryStore((state) => state.registerDirectChat);
  const chats = useChatInboxStore((state) => state.chats);
  const syncInboxChats = useChatInboxStore((state) => state.syncFromChats);
  const markChatReadLocal = useChatInboxStore((state) => state.markChatReadLocal);
  const archiveChatLocal = useChatInboxStore((state) => state.archiveChatLocal);
  const unarchiveChatLocal = useChatInboxStore((state) => state.unarchiveChatLocal);
  const muteChatLocal = useChatInboxStore((state) => state.muteChatLocal);
  const unmuteChatLocal = useChatInboxStore((state) => state.unmuteChatLocal);
  const syncFromUnread = useChatUnreadStore((state) => state.syncFromChats);
  const clearChatUnread = useChatUnreadStore((state) => state.clearChatUnread);
  const suppressChatUnread = useChatReadStateStore((state) => state.suppressChatUnread);
  const realtimeRefreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatLoadInFlightRef = useRef(false);
  const queuedSilentReloadRef = useRef(false);
  const lastSilentChatLoadAtRef = useRef(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [creatingUsernameChatUserId, setCreatingUsernameChatUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTogglingPinChatId, setIsTogglingPinChatId] = useState<string | null>(null);
  const [isTogglingArchiveChatId, setIsTogglingArchiveChatId] = useState<string | null>(null);
  const [isTogglingMuteChatId, setIsTogglingMuteChatId] = useState<string | null>(null);
  const [isDeletingChatId, setIsDeletingChatId] = useState<string | null>(null);
  const [isAddingContactUserId, setIsAddingContactUserId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isShowingComposeMenu, setIsShowingComposeMenu] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listFilter, setListFilter] = useState<ChatListFilter>('all');
  const [selectedChatIds, setSelectedChatIds] = useState<Set<string>>(new Set());
  const {
    usernameLookupResult,
    isSearchingByUsername,
    usernameLookupError,
    globalMessageResults,
    isSearchingMessages,
  } = useChatListSearch(searchQuery, chats);

  useEffect(() => {
    void loadChats();

    const intervalId = setInterval(() => {
      requestSilentChatsReload();
    }, CHAT_LIST_POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  // Re-sync immediately when the app returns from background
  const handleForeground = useCallback(() => {
    requestSilentChatsReload();
  }, []);
  useAppForegroundCallback(handleForeground);

  useEffect(() => {
    return () => {
      if (!realtimeRefreshTimeoutRef.current) {
        return;
      }

      clearTimeout(realtimeRefreshTimeoutRef.current);
      realtimeRefreshTimeoutRef.current = null;
    };
  }, []);

  async function loadChats(options?: { silent?: boolean; refresh?: boolean }) {
    if (chatLoadInFlightRef.current) {
      if (options?.silent) {
        queuedSilentReloadRef.current = true;
      }
      return;
    }

    chatLoadInFlightRef.current = true;
    if (options?.silent) {
      lastSilentChatLoadAtRef.current = Date.now();
    }

    if (!options?.silent) {
      setIsLoading(true);
      setErrorMessage(null);
    }
    if (options?.refresh) {
      setIsRefreshing(true);
    }

    try {
      const response = await getChats();
      syncInboxChats(response.items);
      syncFromUnread(response.items);
    } catch (error) {
      if (!options?.silent) {
        const apiError = error as ApiError;
        setErrorMessage(typeof apiError.message === 'string' ? apiError.message : 'Unable to load chats');
      }
    } finally {
      chatLoadInFlightRef.current = false;
      if (!options?.silent) {
        setIsLoading(false);
      }
      if (options?.refresh) {
        setIsRefreshing(false);
      }

      if (queuedSilentReloadRef.current) {
        queuedSilentReloadRef.current = false;
        requestSilentChatsReload();
      }
    }
  }

  function requestSilentChatsReload() {
    if (chatLoadInFlightRef.current) {
      queuedSilentReloadRef.current = true;
      return;
    }

    const elapsedSinceLastSilentLoad = Date.now() - lastSilentChatLoadAtRef.current;
    if (elapsedSinceLastSilentLoad >= CHAT_LIST_SILENT_RELOAD_MIN_INTERVAL_MS) {
      void loadChats({ silent: true });
      return;
    }

    if (realtimeRefreshTimeoutRef.current) {
      return;
    }

    realtimeRefreshTimeoutRef.current = setTimeout(() => {
      realtimeRefreshTimeoutRef.current = null;
      void loadChats({ silent: true });
    }, CHAT_LIST_SILENT_RELOAD_MIN_INTERVAL_MS - elapsedSinceLastSilentLoad);
  }

  async function handleTogglePin(chat: ChatListItem) {
    if (isTogglingPinChatId) {
      return;
    }

    setIsTogglingPinChatId(chat.id);
    setErrorMessage(null);

    try {
      if (chat.summary.isPinned) {
        await unpinChat(chat.id);
      } else {
        await pinChat(chat.id);
      }

      requestSilentChatsReload();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : 'Unable to update pinned chats');
    } finally {
      setIsTogglingPinChatId(null);
    }
  }

  async function handleToggleArchive(chat: ChatListItem) {
    if (isTogglingArchiveChatId) {
      return;
    }

    setIsTogglingArchiveChatId(chat.id);
    setErrorMessage(null);

    try {
      if (chat.summary.isArchived) {
        await unarchiveChat(chat.id);
        unarchiveChatLocal(chat.id);
      } else {
        await archiveChat(chat.id);
        archiveChatLocal(chat.id);
      }
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : 'Unable to update archive');
      requestSilentChatsReload();
    } finally {
      setIsTogglingArchiveChatId(null);
    }
  }

  async function handleToggleMute(chat: ChatListItem) {
    if (isTogglingMuteChatId) {
      return;
    }

    setIsTogglingMuteChatId(chat.id);
    setErrorMessage(null);

    try {
      if (chat.summary.isMuted) {
        await unmuteChat(chat.id);
        unmuteChatLocal(chat.id);
      } else {
        await muteChat(chat.id);
        muteChatLocal(chat.id);
      }
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : 'Unable to update mute');
      requestSilentChatsReload();
    } finally {
      setIsTogglingMuteChatId(null);
    }
  }

  async function handleAddChatUserToContacts(chat: ChatListItem) {
    const counterpartUserId = chat.summary.counterpartUserId;

    if (!counterpartUserId || isAddingContactUserId) {
      return;
    }

    setIsAddingContactUserId(counterpartUserId);
    setErrorMessage(null);

    try {
      const response = await saveMatchedContact(counterpartUserId);

      if (response.item) {
        registerContacts([response.item]);
      }
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.list.error_add_to_contacts_unavailable'));
    } finally {
      setIsAddingContactUserId(null);
    }
  }

  async function handleDeleteChat(chat: ChatListItem) {
    if (isDeletingChatId) {
      return;
    }

    setIsDeletingChatId(chat.id);
    setErrorMessage(null);

    try {
      await deleteChatForSelf(chat.id);
      requestSilentChatsReload();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.list.error_delete_unavailable'));
    } finally {
      setIsDeletingChatId(null);
    }
  }

  function toggleEditMode() {
    setIsEditMode((value) => !value);
    setSelectedChatIds(new Set());
  }

  function toggleChatSelection(chatId: string) {
    setSelectedChatIds((current) => {
      const next = new Set(current);

      if (next.has(chatId)) {
        next.delete(chatId);
      } else {
        next.add(chatId);
      }

      return next;
    });
  }

  async function handleBatchPinSelection(selectedChats: ChatListItem[]) {
    if (selectedChats.length === 0 || isTogglingPinChatId) {
      return;
    }

    const shouldUnpin = selectedChats.every((chat) => chat.summary.isPinned);
    setIsTogglingPinChatId('__batch__');
    setErrorMessage(null);

    try {
      await Promise.all(
        selectedChats.map((chat) => (shouldUnpin ? unpinChat(chat.id) : pinChat(chat.id))),
      );
      setSelectedChatIds(new Set());
      setIsEditMode(false);
      requestSilentChatsReload();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.list.error_pin'));
    } finally {
      setIsTogglingPinChatId(null);
    }
  }

  async function handleBatchArchiveSelection(selectedChats: ChatListItem[]) {
    if (selectedChats.length === 0 || isTogglingArchiveChatId) {
      return;
    }

    const shouldUnarchive = selectedChats.every((chat) => chat.summary.isArchived);
    setIsTogglingArchiveChatId('__batch__');
    setErrorMessage(null);

    try {
      await Promise.all(
        selectedChats.map((chat) => (shouldUnarchive ? unarchiveChat(chat.id) : archiveChat(chat.id))),
      );
      setSelectedChatIds(new Set());
      setIsEditMode(false);
      requestSilentChatsReload();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.list.error_archive'));
    } finally {
      setIsTogglingArchiveChatId(null);
    }
  }

  async function handleBatchMuteSelection(selectedChats: ChatListItem[]) {
    if (selectedChats.length === 0 || isTogglingMuteChatId) {
      return;
    }

    const shouldUnmute = selectedChats.every((chat) => chat.summary.isMuted);
    setIsTogglingMuteChatId('__batch__');
    setErrorMessage(null);

    try {
      await Promise.all(
        selectedChats.map((chat) => (shouldUnmute ? unmuteChat(chat.id) : muteChat(chat.id))),
      );
      setSelectedChatIds(new Set());
      setIsEditMode(false);
      requestSilentChatsReload();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.list.error_mute'));
    } finally {
      setIsTogglingMuteChatId(null);
    }
  }

  async function handleBatchDeleteSelection(selectedChats: ChatListItem[]) {
    if (selectedChats.length === 0 || isDeletingChatId) {
      return;
    }

    setIsDeletingChatId('__batch__');
    setErrorMessage(null);

    try {
      await Promise.all(selectedChats.map((chat) => deleteChatForSelf(chat.id)));
      setSelectedChatIds(new Set());
      setIsEditMode(false);
      requestSilentChatsReload();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.list.error_delete_unavailable'));
    } finally {
      setIsDeletingChatId(null);
    }
  }

  function showComposeMenu() {
    if (isShowingComposeMenu) {
      return;
    }

    setIsShowingComposeMenu(true);

    const options = [
      t('common.cancel'),
      t('common.message'),
      t('common.group'),
      t('common.channel'),
      t('chats.join.section_invite'),
    ];

    const handleSelection = (selectedIndex: number) => {
      setIsShowingComposeMenu(false);

      switch (selectedIndex) {
        case 1:
          navigation?.navigate('Contacts');
          return;
        case 2:
          navigation?.navigate('CreateGroup');
          return;
        case 3:
          navigation?.navigate('CreateChannel');
          return;
        case 4:
          navigation?.navigate('JoinChat');
          return;
      }
    };

    Alert.alert(t('chats.list.compose_title'), undefined, [
      { text: t('common.cancel'), style: 'cancel', onPress: () => setIsShowingComposeMenu(false) },
      { text: t('common.message'), onPress: () => handleSelection(1) },
      { text: t('common.group'), onPress: () => handleSelection(2) },
      { text: t('common.channel'), onPress: () => handleSelection(3) },
      { text: t('chats.join.section_invite'), onPress: () => handleSelection(4) },
    ]);
  }

  function showChatActions(chat: ChatListItem) {
    const counterpartIsKnownContact = chat.summary.counterpartUserId
      ? Boolean(contactsByUserId[chat.summary.counterpartUserId])
      : false;
    const supportsAddToContacts = chat.type === 'direct' && !counterpartIsKnownContact;
    const supportsDelete = chat.type === 'direct';
    const pinActionLabel = chat.summary.isPinned ? t('chats.list.action_unpin') : t('chats.list.action_pin');
    const muteActionLabel = chat.summary.isMuted ? t('chats.list.action_unmute') : t('chats.list.action_mute');
    const archiveActionLabel = chat.summary.isArchived ? t('chats.list.action_unarchive') : t('chats.list.action_archive');

    const handleSelection = (selectedIndex: number) => {
      switch (selectedIndex) {
        case 1:
          void handleTogglePin(chat);
          return;
        case 2:
          void handleToggleMute(chat);
          return;
        case 3:
          void handleToggleArchive(chat);
          return;
        case 4:
          void handleAddChatUserToContacts(chat);
          return;
        case 5:
          void handleDeleteChat(chat);
          return;
      }
    };

    Alert.alert(chat.summary.displayTitle, undefined, [
      { text: t('common.cancel'), style: 'cancel' },
      { text: pinActionLabel, onPress: () => handleSelection(1) },
      { text: muteActionLabel, onPress: () => handleSelection(2) },
      { text: archiveActionLabel, onPress: () => handleSelection(3) },
      ...(supportsAddToContacts
        ? [{ text: isAddingContactUserId === chat.summary.counterpartUserId ? t('common.adding') : t('chats.list.action_add_to_contacts'), onPress: () => handleSelection(4) }]
        : []),
      ...(supportsDelete
        ? [{ text: isDeletingChatId === chat.id ? t('common.loading') : t('common.delete'), style: 'destructive' as const, onPress: () => handleSelection(5) }]
        : []),
    ]);
  }

  function handleOpenChat(chat: ChatListItem) {
    suppressChatUnread(chat.id, chat.summary.lastActivityAt);
    clearChatUnread(chat.id);
    markChatReadLocal(chat.id);
    navigation?.getParent?.()?.navigate('ChatThread', { chatId: chat.id });
  }

  async function openDirectChatForUser(user: {
    userId: string;
    displayName: string;
    username?: string | null;
    avatarMediaId?: string | null;
  }) {
    if (creatingUsernameChatUserId !== null || user.userId === currentUser?.id) {
      return;
    }

    const existingDirectChat = chats.find((chat) =>
      chat.type === 'direct' && chat.summary.counterpartUserId === user.userId,
    );

    if (existingDirectChat) {
      handleOpenChat(existingDirectChat);
      return;
    }

    setCreatingUsernameChatUserId(user.userId);
    setErrorMessage(null);

    try {
      const response = await createDirectChat(user.userId);
      registerDirectChat({
        chatId: response.chat.id,
        title: user.displayName,
        participantUserId: user.userId,
      });
      navigation?.getParent?.()?.navigate('ChatThread', { chatId: response.chat.id });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : 'Unable to open direct chat');
    } finally {
      setCreatingUsernameChatUserId(null);
    }
  }

  async function handleOpenUsernameResult() {
    if (!usernameLookupResult) {
      return;
    }

    await openDirectChatForUser({
      userId: usernameLookupResult.id,
      displayName: usernameLookupResult.displayName,
      username: usernameLookupResult.username,
      avatarMediaId: usernameLookupResult.avatarMediaId,
    });
  }

  function handleOpenMessageSearchResult(result: GlobalMessageSearchResult) {
    navigation?.getParent?.()?.navigate('ChatThread', {
      chatId: result.chatId,
      initialSearchQuery: searchQuery.trim(),
    });
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const normalizedUsernameQuery = normalizeUsernameQuery(searchQuery);
  const filteredChats = chats.filter((chat) => {
    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      chat.summary.displayTitle,
      chat.summary.subtitle,
      chat.summary.secondarySubtitle ?? '',
      chat.summary.counterpartUsername ?? '',
      chat.summary.lastMessagePreview ?? '',
      chat.type,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
  const filteredByTabChats = filteredChats.filter((chat) => {
    switch (listFilter) {
      case 'unread':
        return chat.summary.unreadCount > 0;
      case 'groups':
        return chat.type === 'group' || chat.type === 'channel';
      default:
        return true;
    }
  });
  const activeChats = filteredByTabChats.filter((chat) => !chat.summary.isArchived);
  const archivedChats = filteredByTabChats.filter((chat) => chat.summary.isArchived);
  const pinnedChats = activeChats.filter((chat) => chat.summary.isPinned);
  const recentChats = activeChats.filter((chat) => !chat.summary.isPinned);
  const archivedCount = chats.filter((chat) => chat.summary.isArchived).length;
  const isSearchActive = normalizedQuery.length > 0;
  const contactSearchResults = isSearchActive
    ? Object.values(contactsByUserId)
        .filter((contact): contact is ContactSearchResult => contact.userId !== currentUser?.id)
        .filter((contact) => {
          const haystack = [contact.displayName, contact.username ?? '', contact.userId].join(' ').toLowerCase();
          return haystack.includes(normalizedQuery);
        })
        .sort((left, right) => left.displayName.localeCompare(right.displayName))
        .slice(0, 5)
    : [];
  const isUsernameResultCurrentUser = usernameLookupResult?.id === currentUser?.id;
  const hasUsernameSearchBlock = normalizedUsernameQuery.length > 0;
  const hasExternalSearchResults =
    Boolean(usernameLookupResult) || contactSearchResults.length > 0 || globalMessageResults.length > 0;
  const totalSearchResultsCount =
    filteredByTabChats.length +
    contactSearchResults.length +
    globalMessageResults.length +
    (usernameLookupResult && !isUsernameResultCurrentUser ? 1 : 0);
  const isUsernameResultAlreadyInChats = usernameLookupResult
    ? chats.some((chat) => chat.type === 'direct' && chat.summary.counterpartUserId === usernameLookupResult.id)
    : false;
  const selectedChats = chats.filter((chat) => selectedChatIds.has(chat.id));
  const selectedDirectChats = selectedChats.filter((chat) => chat.type === 'direct');
  const canDeleteSelectedChats = selectedChats.length > 0 && selectedDirectChats.length === selectedChats.length;

  const headerSubtitle = isSearchActive
    ? totalSearchResultsCount === 1
      ? t('chats.list.subtitle_results_one', { count: totalSearchResultsCount })
      : t('chats.list.subtitle_results_other', { count: totalSearchResultsCount })
    : null;

  return (
    <IosScreen
      title={isSearchActive ? t('chats.list.section_results') : t('chats.list.title')}
      {...(headerSubtitle ? { subtitle: headerSubtitle } : {})}
      headerMode="large"
      headerAlignment="leading"
      leftAction={
        <Pressable onPress={toggleEditMode} style={styles.headerCapsuleButton}>
          <Text style={styles.headerCapsuleText}>{isEditMode ? t('common.done') : t('common.edit')}</Text>
        </Pressable>
      }
      rightAction={!isEditMode ? (
        <View style={styles.headerActions}>
          <Pressable onPress={showComposeMenu} style={styles.headerIconButton}>
            <Text style={styles.headerIconGlyph}>✎</Text>
          </Pressable>
        </View>
      ) : undefined}
      contentContainerStyle={styles.screenContent}
    >
      <View style={styles.searchWrap}>
        <IosSearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder={t('chats.list.search_placeholder')}
        />
      </View>

      {!isEditMode ? (
        <View style={styles.filterPills}>
          <FilterPill active={listFilter === 'all'} label={t('chats.list.filter_all')} onPress={() => setListFilter('all')} />
          <FilterPill active={listFilter === 'unread'} label={t('chats.list.filter_unread')} onPress={() => setListFilter('unread')} />
          <FilterPill active={listFilter === 'groups'} label={t('chats.list.filter_groups')} onPress={() => setListFilter('groups')} />
        </View>
      ) : null}

      {isRefreshing ? <Text style={styles.refreshHint}>{t('common.loading')}</Text> : null}

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {isSearchActive ? (
        <View style={styles.searchSummaryCard}>
          <Text style={styles.searchSummaryTitle}>{t('chats.list.section_results')}</Text>
          <Text style={styles.searchSummaryBody}>
            {t('chats.list.hint_search_results', { query: searchQuery.trim() })}
          </Text>
        </View>
      ) : null}

      {isSearchActive ? (
        <View style={styles.usernameLookupCard}>
          <Text style={styles.usernameLookupTitle}>{t('chats.list.section_messages')}</Text>
          {searchQuery.trim().length < 2 ? (
            <Text style={styles.usernameLookupBody}>{t('chats.list.hint_type_more')}</Text>
          ) : isSearchingMessages ? (
            <Text style={styles.usernameLookupBody}>{t('chats.list.hint_searching')}</Text>
          ) : globalMessageResults.length > 0 ? (
            <View style={styles.globalMessageList}>
              {globalMessageResults.map((result, index) => (
                <Pressable
                  key={`${result.chatId}:${result.message.id}`}
                  onPress={() => handleOpenMessageSearchResult(result)}
                  style={[styles.globalMessageCard, index < globalMessageResults.length - 1 ? styles.contactSearchRowBorder : null]}
                >
                  <ProfileAvatar
                    title={result.chatTitle}
                    avatarMediaId={result.counterpartAvatarMediaId}
                    color={getAvatarColor(result.chatType)}
                  />
                  <View style={styles.globalMessageBody}>
                    <View style={styles.globalMessageHeader}>
                      <Text numberOfLines={1} style={styles.globalMessageChatTitle}>
                        {result.chatTitle}
                      </Text>
                      <Text style={styles.globalMessageTimestamp}>{formatChatTimestamp(result.message.createdAt)}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.globalMessageMeta}>
                      {formatGlobalSearchContext(result, t)}
                    </Text>
                    <Text numberOfLines={2} style={styles.globalMessageSnippet}>
                      {buildGlobalSearchSnippet(result.message, t)}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={styles.usernameLookupBody}>{t('chats.list.hint_no_messages')}</Text>
          )}
        </View>
      ) : null}

      {hasUsernameSearchBlock ? (
        <View style={styles.usernameLookupCard}>
          <Text style={styles.usernameLookupTitle}>{t('chats.list.section_find_username')}</Text>
          {isSearchingByUsername ? (
            <Text style={styles.usernameLookupBody}>{t('chats.list.hint_searching_username', { username: normalizedUsernameQuery })}</Text>
          ) : usernameLookupResult ? (
            <View style={styles.usernameResultRow}>
              <ProfileAvatar
                title={usernameLookupResult.displayName}
                avatarMediaId={usernameLookupResult.avatarMediaId}
                color={telegramColors.accent}
              />
              <View style={styles.usernameResultBody}>
                <Text style={styles.usernameResultName}>{usernameLookupResult.displayName}</Text>
                <Text style={styles.usernameResultMeta}>@{usernameLookupResult.username}</Text>
                <Text style={styles.usernameResultHint}>
                  {isUsernameResultCurrentUser
                    ? t('chats.list.hint_own_account')
                    : isUsernameResultAlreadyInChats
                      ? t('chats.list.hint_chat_exists')
                      : t('chats.list.hint_found')}
                </Text>
              </View>
              <Pressable
                disabled={isUsernameResultCurrentUser || creatingUsernameChatUserId !== null}
                onPress={() => void handleOpenUsernameResult()}
                style={[styles.messageChip, isUsernameResultCurrentUser ? styles.messageChipDisabled : null]}
              >
                <Text style={[styles.messageChipText, isUsernameResultCurrentUser ? styles.messageChipTextDisabled : null]}>
                  {creatingUsernameChatUserId === usernameLookupResult.id
                    ? t('common.opening')
                    : isUsernameResultCurrentUser
                      ? t('common.you')
                      : isUsernameResultAlreadyInChats
                        ? t('chats.list.action_open_chat')
                        : t('chats.list.action_start_chat')}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.usernameLookupBody}>{usernameLookupError ?? t('chats.list.hint_no_match', { username: normalizedUsernameQuery })}</Text>
          )}
        </View>
      ) : null}

      {isSearchActive && contactSearchResults.length > 0 ? (
        <View style={styles.usernameLookupCard}>
          <Text style={styles.usernameLookupTitle}>{t('chats.list.section_contacts')}</Text>
          {contactSearchResults.map((contact, index) => {
            const directChatExists = chats.some(
              (chat) => chat.type === 'direct' && chat.summary.counterpartUserId === contact.userId,
            );

            return (
              <Pressable
                key={contact.userId}
                onPress={() => void openDirectChatForUser(contact)}
                disabled={creatingUsernameChatUserId !== null}
                style={[styles.contactSearchRow, index < contactSearchResults.length - 1 ? styles.contactSearchRowBorder : null]}
              >
                <ProfileAvatar
                  title={contact.displayName}
                  avatarMediaId={contact.avatarMediaId}
                  color={telegramColors.accent}
                />
                <View style={styles.usernameResultBody}>
                  <Text style={styles.usernameResultName}>{contact.displayName}</Text>
                  <Text style={styles.usernameResultMeta}>
                    {contact.username ? `@${contact.username}` : t('chats.list.hint_saved_contact')}
                  </Text>
                </View>
                <View style={styles.contactSearchMeta}>
                  <Text style={styles.contactSearchHint}>{directChatExists ? t('chats.list.action_open_chat') : t('chats.list.action_start_chat')}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      <View style={styles.listSurface}>
        {activeChats.length === 0 && archivedChats.length === 0 && !hasExternalSearchResults && !hasUsernameSearchBlock ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{normalizedQuery ? t('chats.list.no_results') : t('chats.list.no_chats')}</Text>
            <Text style={styles.emptyBody}>
              {normalizedQuery ? t('chats.list.hint_no_results') : t('chats.list.hint_no_chats')}
            </Text>
          </View>
        ) : (
          <View>
            {!isSearchActive && archivedCount > 0 ? (
              <View style={styles.sectionBlock}>
                <Pressable onPress={() => setShowArchived((value) => !value)} style={styles.archivedRow}>
                  <View style={styles.archivedRowIcon}>
                    <Text style={styles.archivedRowIconGlyph}>▾</Text>
                  </View>
                  <View style={styles.archivedRowBody}>
                    <Text style={styles.archivedRowTitle}>{t('chats.list.section_archived')}</Text>
                    <Text style={styles.archivedRowSubtitle}>
                      {showArchived ? t('chats.list.action_hide_archived') : t('chats.list.action_archived_label', { count: archivedCount })}
                    </Text>
                  </View>
                  {archivedCount > 0 ? (
                    <View style={styles.archivedCountBadge}>
                      <Text style={styles.archivedCountBadgeText}>{formatUnreadCount(archivedCount)}</Text>
                    </View>
                  ) : null}
                </Pressable>
              </View>
            ) : null}

            {pinnedChats.length > 0 ? (
              <View style={styles.sectionBlock}>
                <SectionHeader
                  title={t('chats.list.section_pinned')}
                  subtitle={pinnedChats.length === 1 ? t('chats.list.hint_priority_count_one', { count: pinnedChats.length }) : t('chats.list.hint_priority_count_other', { count: pinnedChats.length })}
                />
                {pinnedChats.map((chat, index) => (
                  <ChatRow
                    key={chat.id}
                    chat={chat}
                    isLast={index === pinnedChats.length - 1}
                    isTogglingPin={isTogglingPinChatId === chat.id}
                    isTogglingArchive={isTogglingArchiveChatId === chat.id}
                    isTogglingMute={isTogglingMuteChatId === chat.id}
                    isEditMode={isEditMode}
                    isSelected={selectedChatIds.has(chat.id)}
                    onOpen={() => handleOpenChat(chat)}
                    onToggleSelect={() => toggleChatSelection(chat.id)}
                    onTogglePin={() => void handleTogglePin(chat)}
                    onToggleMute={() => void handleToggleMute(chat)}
                    onToggleArchive={() => void handleToggleArchive(chat)}
                    onLongPress={() => showChatActions(chat)}
                  />
                ))}
              </View>
            ) : null}

            {recentChats.length > 0 ? (
              <View style={styles.sectionBlock}>
                <SectionHeader
                  title={pinnedChats.length > 0 ? t('chats.list.section_recent') : t('chats.list.section_all')}
                  subtitle={
                    pinnedChats.length > 0
                      ? recentChats.length === 1
                        ? t('chats.list.hint_recent_below_pinned_one', { count: recentChats.length })
                        : t('chats.list.hint_recent_below_pinned_other', { count: recentChats.length })
                      : recentChats.length === 1
                        ? t('chats.list.hint_recent_count_one', { count: recentChats.length })
                        : t('chats.list.hint_recent_count_other', { count: recentChats.length })
                  }
                />
                {recentChats.map((chat, index) => (
                  <ChatRow
                    key={chat.id}
                    chat={chat}
                    isLast={index === recentChats.length - 1}
                    isTogglingPin={isTogglingPinChatId === chat.id}
                    isTogglingArchive={isTogglingArchiveChatId === chat.id}
                    isTogglingMute={isTogglingMuteChatId === chat.id}
                    isEditMode={isEditMode}
                    isSelected={selectedChatIds.has(chat.id)}
                    onOpen={() => handleOpenChat(chat)}
                    onToggleSelect={() => toggleChatSelection(chat.id)}
                    onTogglePin={() => void handleTogglePin(chat)}
                    onToggleMute={() => void handleToggleMute(chat)}
                    onToggleArchive={() => void handleToggleArchive(chat)}
                    onLongPress={() => showChatActions(chat)}
                  />
                ))}
              </View>
            ) : null}

            {showArchived && archivedChats.length > 0 ? (
              <View style={styles.sectionBlock}>
                <SectionHeader
                  title={t('chats.list.section_archived')}
                  subtitle={archivedChats.length === 1 ? t('chats.list.hint_archived_count_one', { count: archivedChats.length }) : t('chats.list.hint_archived_count_other', { count: archivedChats.length })}
                />
                {archivedChats.map((chat, index) => (
                  <ChatRow
                    key={chat.id}
                    chat={chat}
                    isLast={index === archivedChats.length - 1}
                    isTogglingPin={isTogglingPinChatId === chat.id}
                    isTogglingArchive={isTogglingArchiveChatId === chat.id}
                    isTogglingMute={isTogglingMuteChatId === chat.id}
                    isEditMode={isEditMode}
                    isSelected={selectedChatIds.has(chat.id)}
                    onOpen={() => handleOpenChat(chat)}
                    onToggleSelect={() => toggleChatSelection(chat.id)}
                    onTogglePin={() => void handleTogglePin(chat)}
                    onToggleMute={() => void handleToggleMute(chat)}
                    onToggleArchive={() => void handleToggleArchive(chat)}
                    onLongPress={() => showChatActions(chat)}
                  />
                ))}
              </View>
            ) : null}
          </View>
        )}
      </View>

      {isEditMode ? (
        <View style={styles.selectionToolbar}>
          <Text style={styles.selectionToolbarLabel}>
            {selectedChats.length === 0
              ? t('chats.list.selection_none')
              : t('chats.list.selection_count', { count: selectedChats.length })}
          </Text>
          <View style={styles.selectionToolbarActions}>
            <Pressable
              disabled={selectedChats.length === 0 || isTogglingPinChatId !== null}
              onPress={() => void handleBatchPinSelection(selectedChats)}
              style={styles.selectionToolbarButton}
            >
              <Text style={[styles.selectionToolbarButtonText, selectedChats.length === 0 ? styles.selectionToolbarButtonTextDisabled : null]}>
                {selectedChats.length > 0 && selectedChats.every((chat) => chat.summary.isPinned)
                  ? t('chats.list.action_unpin')
                  : t('chats.list.action_pin')}
              </Text>
            </Pressable>
            <Pressable
              disabled={selectedChats.length === 0 || isTogglingMuteChatId !== null}
              onPress={() => void handleBatchMuteSelection(selectedChats)}
              style={styles.selectionToolbarButton}
            >
              <Text style={[styles.selectionToolbarButtonText, selectedChats.length === 0 ? styles.selectionToolbarButtonTextDisabled : null]}>
                {selectedChats.length > 0 && selectedChats.every((chat) => chat.summary.isMuted)
                  ? t('chats.list.action_unmute')
                  : t('chats.list.action_mute')}
              </Text>
            </Pressable>
            <Pressable
              disabled={selectedChats.length === 0 || isTogglingArchiveChatId !== null}
              onPress={() => void handleBatchArchiveSelection(selectedChats)}
              style={styles.selectionToolbarButton}
            >
              <Text style={[styles.selectionToolbarButtonText, selectedChats.length === 0 ? styles.selectionToolbarButtonTextDisabled : null]}>
                {selectedChats.length > 0 && selectedChats.every((chat) => chat.summary.isArchived)
                  ? t('chats.list.action_unarchive')
                  : t('chats.list.action_archive')}
              </Text>
            </Pressable>
            <Pressable
              disabled={!canDeleteSelectedChats || isDeletingChatId !== null}
              onPress={() => void handleBatchDeleteSelection(selectedDirectChats)}
              style={styles.selectionToolbarButton}
            >
              <Text style={[styles.selectionToolbarDestructiveText, !canDeleteSelectedChats ? styles.selectionToolbarButtonTextDisabled : null]}>
                {t('common.delete')}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </IosScreen>
  );
}

function ChatRow({
  chat,
  isLast,
  isTogglingPin,
  isTogglingArchive,
  isTogglingMute,
  isEditMode,
  isSelected,
  onOpen,
  onToggleSelect,
  onTogglePin,
  onToggleMute,
  onToggleArchive,
  onLongPress,
}: {
  key?: string;
  chat: ChatListItem;
  isLast: boolean;
  isTogglingPin: boolean;
  isTogglingArchive: boolean;
  isTogglingMute: boolean;
  isEditMode: boolean;
  isSelected: boolean;
  onOpen: () => void;
  onToggleSelect: () => void;
  onTogglePin: () => void;
  onToggleMute: () => void;
  onToggleArchive: () => void;
  onLongPress: () => void;
}) {
  const { t } = useTranslation();
  const hasUnread = chat.summary.unreadCount > 0;
  const [resolvedAvatarMediaId, setResolvedAvatarMediaId] = useState(chat.summary.counterpartAvatarMediaId);

  useEffect(() => {
    setResolvedAvatarMediaId(chat.summary.counterpartAvatarMediaId);
  }, [chat.summary.counterpartAvatarMediaId]);

  useEffect(() => {
    if (chat.summary.counterpartAvatarMediaId || !chat.summary.counterpartUserId || chat.type !== 'direct') {
      return;
    }

    let cancelled = false;

    void getProfileByUserId(chat.summary.counterpartUserId)
      .then((profile) => {
        if (!cancelled) {
          setResolvedAvatarMediaId(profile.avatarMediaId);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResolvedAvatarMediaId(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chat.summary.counterpartAvatarMediaId, chat.summary.counterpartUserId, chat.type]);

  const rowContent = (
    <Pressable
      delayLongPress={220}
      onLongPress={isEditMode ? onToggleSelect : onLongPress}
      onPress={isEditMode ? onToggleSelect : onOpen}
      style={({ pressed }: { pressed: boolean }) => [styles.chatRow, pressed ? styles.chatRowPressed : null]}
    >
      {isEditMode ? (
        <View style={[styles.selectionCircle, isSelected ? styles.selectionCircleSelected : null]}>
          {isSelected ? <Text style={styles.selectionCircleCheck}>✓</Text> : null}
        </View>
      ) : null}
      <ProfileAvatar
        title={chat.summary.displayTitle}
        avatarMediaId={resolvedAvatarMediaId}
        color={getAvatarColor(chat.type)}
        size={54}
      />
      <View style={[styles.chatMain, !isLast ? styles.rowBorderInset : null]}>
        <View style={styles.chatHeaderRow}>
          <View style={styles.chatTitleRow}>
            {chat.summary.isPinned ? <Text style={styles.pinMarker}>📌</Text> : null}
            {chat.summary.isMuted ? <Text style={styles.pinMarker}>🔕</Text> : null}
            <Text numberOfLines={1} style={[styles.chatTitle, hasUnread ? styles.chatTitleUnread : null]}>
              {chat.summary.displayTitle}
            </Text>
          </View>
          <View style={styles.trailingMeta}>
            <Text style={[styles.chatTime, hasUnread ? styles.chatTimeUnread : null]}>
              {formatChatTimestamp(chat.summary.lastActivityAt)}
            </Text>
            {chat.summary.unreadCount > 0 ? (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{formatUnreadCount(chat.summary.unreadCount)}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.chatMetaRow}>
          <Text style={styles.chatTypeLabel}>{formatChatKind(chat, t)}</Text>
          {chat.summary.secondarySubtitle ? <Text style={styles.chatMetaSeparator}>•</Text> : null}
          {chat.summary.secondarySubtitle ? (
            <Text numberOfLines={1} style={styles.chatMetaText}>
              {chat.summary.secondarySubtitle}
            </Text>
          ) : null}
        </View>
        <View style={styles.chatPreviewRow}>
          {hasUnread ? <View style={styles.newMessageDot} /> : null}
          <Text numberOfLines={1} style={[styles.chatPreview, hasUnread ? styles.chatPreviewUnread : null]}>
            {formatInboxPreview(chat)}
          </Text>
          {isTogglingPin || isTogglingArchive || isTogglingMute ? (
            <Text style={styles.chatActionState}>…</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );

  if (isEditMode) {
    return rowContent;
  }

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <View style={styles.swipeActionsWrap}>
          <Pressable onPress={onToggleArchive} style={[styles.swipeActionButton, styles.swipeActionArchive]}>
            <Text style={styles.swipeActionLabel}>
              {chat.summary.isArchived ? t('chats.list.action_unarchive') : t('chats.list.action_archive')}
            </Text>
          </Pressable>
          <Pressable onPress={onToggleMute} style={[styles.swipeActionButton, styles.swipeActionMute]}>
            <Text style={styles.swipeActionLabel}>
              {chat.summary.isMuted ? t('chats.list.action_unmute') : t('chats.list.action_mute')}
            </Text>
          </Pressable>
          <Pressable onPress={onTogglePin} style={[styles.swipeActionButton, styles.swipeActionPin]}>
            <Text style={styles.swipeActionLabel}>
              {chat.summary.isPinned ? t('chats.list.action_unpin') : t('chats.list.action_pin')}
            </Text>
          </Pressable>
        </View>
      )}
    >
      {rowContent}
    </Swipeable>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

function FilterPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }: { pressed: boolean }) => [
      styles.filterPill,
      active ? styles.filterPillActive : null,
      pressed ? styles.filterPillPressed : null,
    ]}>
      <Text style={[styles.filterPillText, active ? styles.filterPillTextActive : null]}>{label}</Text>
    </Pressable>
  );
}

function formatChatTimestamp(value: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const sameDay = now.toDateString() === date.toDateString();
  if (sameDay) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

function getAvatarColor(type: string) {
  switch (type) {
    case 'group':
      return '#52b788';
    case 'channel':
      return '#8b5cf6';
    default:
      return telegramColors.accent;
  }
}

function formatUnreadCount(value: number) {
  return value > 99 ? '99+' : String(value);
}

function formatInboxPreview(chat: ChatListItem) {
  if (chat.summary.lastMessagePreview) {
    return chat.summary.subtitle;
  }

  if (chat.summary.secondarySubtitle) {
    return chat.summary.secondarySubtitle;
  }

  switch (chat.type) {
    case 'group':
      return `${chat.summary.memberCount} members`;
    case 'channel':
      return 'Channel';
    default:
      return chat.summary.subtitle;
  }
}

function formatChatKind(chat: ChatListItem, t: (key: string, params?: Record<string, string | number>) => string) {
  switch (chat.type) {
    case 'group':
      return `${chat.summary.memberCount} members`;
    case 'channel':
      return t('common.channel');
    default:
      return chat.summary.counterpartUsername ? `@${chat.summary.counterpartUsername}` : t('chats.list.direct_chat');
  }
}

function buildGlobalSearchSnippet(message: MessageListItem, t: (key: string, params?: Record<string, string | number>) => string) {
  const text = message.text?.trim();
  if (text && text.length > 0) {
    return text;
  }

  if (message.callEvent) {
    switch (message.callEvent.outcome) {
      case 'completed':
        return message.callEvent.durationSec > 0 ? t('chats.list.msg_call_duration', { duration: message.callEvent.durationSec }) : t('chats.list.msg_call');
      case 'missed':
        return t('chats.list.msg_missed_call');
      case 'declined':
        return t('chats.list.msg_declined_call');
      case 'canceled':
        return t('chats.list.msg_canceled_call');
      case 'failed':
        return t('chats.list.msg_failed_call');
    }
  }

  if (message.attachments.length > 0) {
    const attachmentType = message.attachments[0]?.attachmentType ?? 'attachment';

    switch (attachmentType) {
      case 'image':
        return t('chats.list.msg_photo');
      case 'video':
        return t('chats.list.msg_video');
      case 'audio':
        return t('chats.list.msg_voice');
      case 'file':
        return t('chats.list.msg_file');
      default:
        return t('common.attachment');
    }
  }

  return t('common.message');
}

function formatGlobalSearchContext(result: GlobalMessageSearchResult, t: (key: string, params?: Record<string, string | number>) => string) {
  switch (result.chatType) {
    case 'group':
      return t('chats.list.group_chat');
    case 'channel':
      return t('common.channel');
    default:
      return result.counterpartUsername ? `@${result.counterpartUsername}` : t('chats.list.direct_chat');
  }
}

function normalizeUsernameQuery(value: string) {
  const normalizedValue = value.trim().replace(/^@+/, '');
  return normalizedValue.length >= 3 ? normalizedValue : '';
}

const styles = StyleSheet.create({
  screenContent: {
    gap: 12,
    paddingHorizontal: 0,
  },
  headerCapsuleButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 32,
    minWidth: 0,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  headerCapsuleText: {
    color: telegramColors.accent,
    fontSize: 17,
    fontWeight: '600',
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  headerIconButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderColor: telegramColors.separator,
    borderRadius: 16,
    borderWidth: telegramLayout.hairlineWidth,
    height: 32,
    justifyContent: 'center',
    width: 32,
    ...telegramShadows.card,
  },
  headerIconGlyph: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  searchWrap: {
    paddingHorizontal: 18,
  },
  filterPills: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
  },
  filterPill: {
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: telegramLayout.pillRadius,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  filterPillActive: {
    backgroundColor: telegramColors.accent,
  },
  filterPillPressed: {
    opacity: 0.82,
  },
  filterPillText: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  filterPillTextActive: {
    color: telegramColors.white,
  },
  refreshHint: {
    ...telegramText.caption,
    color: telegramColors.textSecondary,
    paddingHorizontal: 18,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 13,
    paddingHorizontal: 18,
  },
  searchSummaryCard: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 18,
    gap: 4,
    marginHorizontal: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  searchSummaryTitle: {
    ...telegramText.rowTitle,
    fontWeight: '700',
  },
  searchSummaryBody: {
    ...telegramText.secondary,
    lineHeight: 19,
  },
  usernameLookupCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    gap: 12,
    marginHorizontal: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  usernameLookupTitle: {
    ...telegramText.caption,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  usernameLookupBody: {
    ...telegramText.secondary,
    lineHeight: 19,
  },
  usernameResultRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  usernameResultBody: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  usernameResultName: {
    ...telegramText.rowTitle,
    fontWeight: '600',
  },
  usernameResultMeta: {
    ...telegramText.secondary,
  },
  usernameResultHint: {
    ...telegramText.caption,
  },
  messageChip: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 34,
    paddingHorizontal: 14,
  },
  messageChipDisabled: {
    backgroundColor: telegramColors.surfaceMid,
  },
  messageChipText: {
    color: telegramColors.accentDeep,
    fontSize: 13,
    fontWeight: '700',
  },
  messageChipTextDisabled: {
    color: telegramColors.textTertiary,
  },
  listSurface: {
    backgroundColor: telegramColors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    marginTop: 2,
    minHeight: 0,
    overflow: 'hidden',
  },
  contactSearchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 60,
    paddingVertical: 2,
  },
  contactSearchRowBorder: {
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
    paddingBottom: 12,
  },
  contactSearchMeta: {
    alignItems: 'flex-end',
    minWidth: 72,
  },
  contactSearchHint: {
    color: telegramColors.accentDeep,
    fontSize: 13,
    fontWeight: '700',
  },
  globalMessageList: {
    gap: 0,
  },
  globalMessageCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 72,
    paddingVertical: 4,
  },
  globalMessageBody: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  globalMessageHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  globalMessageChatTitle: {
    color: telegramColors.textPrimary,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  globalMessageTimestamp: {
    color: telegramColors.textTertiary,
    fontSize: 12,
  },
  globalMessageMeta: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  globalMessageSnippet: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  rowBorder: {
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
  },
  rowBorderInset: {
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
    paddingBottom: 10,
  },
  emptyState: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  sectionBlock: {
    paddingBottom: 4,
  },
  archivedRow: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    flexDirection: 'row',
    gap: 12,
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  archivedRowIcon: {
    alignItems: 'center',
    backgroundColor: telegramColors.badgeSoft,
    borderRadius: 27,
    height: 54,
    justifyContent: 'center',
    width: 54,
  },
  archivedRowIconGlyph: {
    color: telegramColors.badge,
    fontSize: 17,
    fontWeight: '700',
  },
  archivedRowBody: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  archivedRowTitle: {
    color: telegramColors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  archivedRowSubtitle: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  archivedCountBadge: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 10,
    justifyContent: 'center',
    minWidth: 28,
    paddingHorizontal: 8,
    height: 20,
  },
  archivedCountBadgeText: {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionHeader: {
    gap: 2,
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  sectionTitle: {
    ...telegramText.caption,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    ...telegramText.caption,
    color: telegramColors.textSecondary,
    lineHeight: 17,
  },
  emptyTitle: {
    ...telegramText.rowTitle,
  },
  emptyBody: {
    ...telegramText.secondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  chatRow: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    flexDirection: 'row',
    gap: 12,
    minHeight: 72,
    paddingLeft: 14,
    paddingRight: 12,
    paddingVertical: 9,
  },
  chatRowPressed: {
    backgroundColor: telegramColors.surfaceMid,
  },
  selectionCircle: {
    alignItems: 'center',
    borderColor: telegramColors.separator,
    borderRadius: 999,
    borderWidth: 1.5,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  selectionCircleSelected: {
    backgroundColor: telegramColors.accent,
    borderColor: telegramColors.accent,
  },
  selectionCircleCheck: {
    color: telegramColors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  chatMain: {
    flex: 1,
    gap: 2,
    justifyContent: 'center',
    marginRight: 2,
    paddingTop: 1,
  },
  chatHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    minHeight: 22,
  },
  chatTitleRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    minWidth: 0,
  },
  pinMarker: {
    color: telegramColors.textSecondary,
    fontSize: 11,
  },
  chatTitle: {
    color: telegramColors.textPrimary,
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  chatTitleUnread: {
    fontWeight: '700',
  },
  trailingMeta: {
    alignItems: 'flex-end',
    gap: 4,
    marginLeft: 10,
  },
  chatMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    minHeight: 17,
  },
  chatTypeLabel: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  chatMetaSeparator: {
    color: telegramColors.textTertiary,
    fontSize: 11,
  },
  chatMetaText: {
    color: telegramColors.textSecondary,
    flex: 1,
    fontSize: 12,
  },
  chatTime: {
    color: telegramColors.textTertiary,
    fontSize: 12,
    fontWeight: '400',
  },
  chatTimeUnread: {
    color: telegramColors.accent,
    fontWeight: '600',
  },
  unreadBadge: {
    alignItems: 'center',
    backgroundColor: telegramColors.badge,
    borderRadius: telegramLayout.pillRadius,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: 6,
    height: 20,
  },
  unreadBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  chatPreviewRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 1,
  },
  newMessageDot: {
    backgroundColor: telegramColors.accent,
    borderRadius: 999,
    height: 8,
    width: 8,
  },
  chatPreview: {
    color: telegramColors.textSecondary,
    flex: 1,
    fontSize: 14,
    letterSpacing: -0.2,
    lineHeight: 19,
  },
  chatPreviewUnread: {
    color: telegramColors.textPrimary,
    fontWeight: '600',
  },
  chatActionState: {
    color: telegramColors.textTertiary,
    fontSize: 16,
    fontWeight: '700',
  },
  swipeActionsWrap: {
    alignItems: 'stretch',
    flexDirection: 'row',
    marginVertical: 6,
    paddingRight: 10,
  },
  swipeActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    paddingHorizontal: 12,
    width: 86,
  },
  swipeActionArchive: {
    backgroundColor: '#8e9aa7',
  },
  swipeActionMute: {
    backgroundColor: '#f39c34',
  },
  swipeActionPin: {
    backgroundColor: telegramColors.accent,
  },
  swipeActionLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectionToolbar: {
    backgroundColor: telegramColors.surface,
    borderTopColor: telegramColors.separator,
    borderTopWidth: telegramLayout.hairlineWidth,
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 18,
  },
  selectionToolbarLabel: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  selectionToolbarActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectionToolbarButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 34,
    paddingHorizontal: 14,
  },
  selectionToolbarButtonText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  selectionToolbarDestructiveText: {
    color: telegramColors.destructive,
    fontSize: 13,
    fontWeight: '700',
  },
  selectionToolbarButtonTextDisabled: {
    color: telegramColors.textTertiary,
  },
});
