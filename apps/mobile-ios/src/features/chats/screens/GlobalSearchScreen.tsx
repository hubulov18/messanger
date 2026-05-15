import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '@shared/i18n';

import type { ChatListItem } from '@features/chats/api/chats.api';
import { createDirectChat } from '@features/chats/api/chats.api';
import type { MessageListItem } from '@features/messages/api/messages.api';
import {
  searchGlobal,
  type SearchContactResult,
  type SearchMessageResult,
  type SearchProfileResult,
} from '@features/chats/api/search.api';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import type { ApiError } from '@shared/api/types';
import { useSessionStore } from '@shared/auth/session.store';
import { useChatDirectoryStore } from '@shared/chats/chat-directory.store';
import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSearchField } from '@shared/ui/ios/IosSearchField';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type GlobalSearchScreenProps = {
  navigation?: {
    goBack?: () => void;
    navigate: (screen: string, params?: unknown) => void;
  };
};

type SearchNavigationMessageTarget = {
  id: string;
  chatId: string;
  senderUserId: string;
  type: string;
  text: string | null;
  attachments: MessageListItem['attachments'];
  callEvent?: MessageListItem['callEvent'] | null;
  replyToMessageId: string | null;
  forwardedFromMessageId: string | null;
  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
  reactions: MessageListItem['reactions'];
  delivery: MessageListItem['delivery'];
};

type UsernameLookupResult = SearchProfileResult;
type PhoneLookupResult = SearchProfileResult;
type ContactSearchResult = SearchContactResult;
type GlobalMessageSearchResult = SearchMessageResult;

type UnifiedSearchResult =
  | { key: string; kind: 'chat'; title: string; subtitle: string; chat: ChatListItem }
  | { key: string; kind: 'contact'; title: string; subtitle: string; contact: ContactSearchResult }
  | { key: string; kind: 'username'; title: string; subtitle: string; user: UsernameLookupResult }
  | { key: string; kind: 'phone'; title: string; subtitle: string; user: PhoneLookupResult }
  | { key: string; kind: 'message'; title: string; subtitle: string; result: GlobalMessageSearchResult };

const USERNAME_SEARCH_DEBOUNCE_MS = 350;
const UNIFIED_TOP_RESULTS_LIMIT = 8;

export function GlobalSearchScreen({ navigation }: GlobalSearchScreenProps) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const chats = useChatInboxStore((state) => state.chats);
  const registerDirectChat = useChatDirectoryStore((state) => state.registerDirectChat);

  const [searchQuery, setSearchQuery] = useState('');
  const [creatingUsernameChatUserId, setCreatingUsernameChatUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filteredChats, setFilteredChats] = useState<ChatListItem[]>([]);
  const [contactSearchResults, setContactSearchResults] = useState<ContactSearchResult[]>([]);
  const [usernameLookupResult, setUsernameLookupResult] = useState<UsernameLookupResult | null>(null);
  const [isSearchingByUsername, setIsSearchingByUsername] = useState(false);
  const [usernameLookupError, setUsernameLookupError] = useState<string | null>(null);
  const [phoneLookupResult, setPhoneLookupResult] = useState<PhoneLookupResult | null>(null);
  const [isSearchingByPhone, setIsSearchingByPhone] = useState(false);
  const [phoneLookupError, setPhoneLookupError] = useState<string | null>(null);
  const [globalMessageResults, setGlobalMessageResults] = useState<GlobalMessageSearchResult[]>([]);
  const [isSearchingMessages, setIsSearchingMessages] = useState(false);

  useEffect(() => {
    const normalizedQuery = searchQuery.trim();
    const hasUsernameQuery = normalizeUsernameQuery(searchQuery).length > 0;
    const hasPhoneQuery = normalizePhoneSearchQuery(searchQuery).length > 0;

    if (!normalizedQuery) {
      setFilteredChats([]);
      setContactSearchResults([]);
      setUsernameLookupResult(null);
      setUsernameLookupError(null);
      setPhoneLookupResult(null);
      setPhoneLookupError(null);
      setGlobalMessageResults([]);
      setErrorMessage(null);
      setIsSearchingMessages(false);
      setIsSearchingByPhone(false);
      setIsSearchingByUsername(false);
      return;
    }

    let cancelled = false;
    setIsSearchingByUsername(hasUsernameQuery);
    setIsSearchingByPhone(hasPhoneQuery);
    setIsSearchingMessages(true);
    setUsernameLookupError(null);
    setPhoneLookupError(null);

    const timeoutId = setTimeout(() => {
      void searchGlobal(normalizedQuery)
        .then((response) => {
          if (cancelled) {
            return;
          }

          setFilteredChats(response.chats);
          setContactSearchResults(response.contacts);
          setUsernameLookupResult(response.usernameMatch);
          setPhoneLookupResult(response.phoneMatch);
          setGlobalMessageResults(response.messages);
          setUsernameLookupError(
            hasUsernameQuery && !response.usernameMatch ? 'No Telegram account matched this username.' : null,
          );
          setPhoneLookupError(
            hasPhoneQuery && !response.phoneMatch ? 'No Telegram account matched this phone number.' : null,
          );
          setErrorMessage(null);
        })
        .catch((error) => {
          if (cancelled) {
            return;
          }

          const apiError = error as ApiError;
          setFilteredChats([]);
          setContactSearchResults([]);
          setUsernameLookupResult(null);
          setPhoneLookupResult(null);
          setGlobalMessageResults([]);
          setErrorMessage(typeof apiError.message === 'string' ? apiError.message : 'Unable to search right now');
        })
        .finally(() => {
          if (!cancelled) {
            setIsSearchingByUsername(false);
            setIsSearchingByPhone(false);
            setIsSearchingMessages(false);
          }
        });
    }, USERNAME_SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const normalizedUsernameQuery = normalizeUsernameQuery(searchQuery);
  const normalizedPhoneQuery = normalizePhoneSearchQuery(searchQuery);
  const isSearchActive = normalizedQuery.length > 0;
  const isUsernameResultCurrentUser = usernameLookupResult?.id === currentUser?.id;
  const isPhoneResultCurrentUser = phoneLookupResult?.id === currentUser?.id;
  const isUsernameResultAlreadyInChats = usernameLookupResult
    ? chats.some((chat) => chat.type === 'direct' && chat.summary.counterpartUserId === usernameLookupResult.id)
    : false;
  const isPhoneResultAlreadyInChats = phoneLookupResult
    ? chats.some((chat) => chat.type === 'direct' && chat.summary.counterpartUserId === phoneLookupResult.id)
    : false;
  const hasUsernameSearchBlock = normalizedUsernameQuery.length > 0;
  const hasPhoneSearchBlock = normalizedPhoneQuery.length > 0;
  const totalSearchResultsCount =
    filteredChats.length +
    contactSearchResults.length +
    globalMessageResults.length +
    (usernameLookupResult && !isUsernameResultCurrentUser ? 1 : 0) +
    (phoneLookupResult && !isPhoneResultCurrentUser ? 1 : 0);
  const unifiedTopResults = buildUnifiedTopResults({
    query: searchQuery,
    chats: filteredChats,
    contacts: contactSearchResults,
    usernameLookupResult,
    phoneLookupResult,
    globalMessageResults,
    isUsernameResultCurrentUser,
    isPhoneResultCurrentUser,
    t,
  });
  const topResultKeys = new Set(unifiedTopResults.map((result) => result.key));
  const dedupedChats = filteredChats.filter((chat) => !topResultKeys.has(`chat:${chat.id}`));
  const dedupedMessages = globalMessageResults.filter((result) => !topResultKeys.has(`message:${result.message.id}`));
  const dedupedContacts = contactSearchResults.filter((contact) => !topResultKeys.has(`user:${contact.userId}`));
  const showUsernameSection = hasUsernameSearchBlock && (!usernameLookupResult || !topResultKeys.has(`user:${usernameLookupResult.id}`));
  const showPhoneSection = hasPhoneSearchBlock && (!phoneLookupResult || !topResultKeys.has(`user:${phoneLookupResult.id}`));
  const showTopResults = unifiedTopResults.length > 0 && totalSearchResultsCount > unifiedTopResults.length;
  const showUnifiedEmptyState =
    isSearchActive &&
    !errorMessage &&
    !isSearchingMessages &&
    !isSearchingByUsername &&
    !isSearchingByPhone &&
    totalSearchResultsCount === 0;

  function openChat(chat: ChatListItem) {
    navigation?.navigate('ChatThread', { chatId: chat.id });
  }

  async function openDirectChatForUser(user: ContactSearchResult | UsernameLookupResult) {
    const userId = 'userId' in user ? user.userId : user.id;

    if (creatingUsernameChatUserId !== null || userId === currentUser?.id) {
      return;
    }

    const existingDirectChat = chats.find(
      (chat) => chat.type === 'direct' && chat.summary.counterpartUserId === userId,
    );

    if (existingDirectChat) {
      openChat(existingDirectChat);
      return;
    }

    setCreatingUsernameChatUserId(userId);
    setErrorMessage(null);

    try {
      const response = await createDirectChat(userId);
      registerDirectChat({
        chatId: response.chat.id,
        title: user.displayName,
        participantUserId: userId,
      });
      navigation?.navigate('ChatThread', { chatId: response.chat.id });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('contacts.error_start_chat'));
    } finally {
      setCreatingUsernameChatUserId(null);
    }
  }

  function openMessageSearchResult(result: GlobalMessageSearchResult) {
    navigation?.navigate('ChatThread', {
      chatId: result.chatId,
      initialSearchQuery: searchQuery.trim(),
      initialFocusedMessageId: result.message.id,
      initialFocusedMessage: toSearchNavigationMessageTarget(result.message),
    });
  }

  function openUnifiedResult(result: UnifiedSearchResult) {
    switch (result.kind) {
      case 'chat':
        openChat(result.chat);
        return;
      case 'contact':
        void openDirectChatForUser(result.contact);
        return;
      case 'username':
      case 'phone':
        void openDirectChatForUser(result.user);
        return;
      case 'message':
        openMessageSearchResult(result.result);
        return;
    }
  }

  return (
    <IosScreen
      title={t('chats.search.title')}
      subtitle={
        isSearchActive
          ? totalSearchResultsCount === 1
            ? t('chats.search.subtitle_results_one', { count: totalSearchResultsCount })
            : t('chats.search.subtitle_results_other', { count: totalSearchResultsCount })
          : t('chats.search.subtitle')
      }
      headerMode="compact"
      leftAction={
        <Pressable onPress={() => navigation?.goBack?.()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.back')}</Text>
        </Pressable>
      }
      scrollable={false}
    >
      {!isSearchActive ? (
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🔎</Text>
          </View>
          <Text style={styles.heroTitle}>{t('chats.search.title')}</Text>
          <Text style={styles.heroBody}>{t('chats.search.hint_start_body')}</Text>
        </View>
      ) : null}

      <View style={styles.searchWrap}>
        <IosSearchField value={searchQuery} onChangeText={setSearchQuery} placeholder={t('chats.search.placeholder')} />
      </View>

      {errorMessage ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!isSearchActive ? (
          <IosSection title={t('chats.search.title')}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>{t('chats.search.hint_start')}</Text>
              <Text style={styles.emptyBody}>
                {t('chats.search.hint_start_body')}
              </Text>
            </View>
          </IosSection>
        ) : (
          <>
            {showTopResults ? (
              <IosSection title={t('common.result_other', { count: unifiedTopResults.length })}>
                {unifiedTopResults.map((result, index) => (
                  <Pressable
                    key={result.key}
                    onPress={() => openUnifiedResult(result)}
                    style={[styles.row, index < unifiedTopResults.length - 1 ? styles.rowBorder : null]}
                  >
                    <ProfileAvatar
                      title={result.title}
                      avatarMediaId={getUnifiedResultAvatarMediaId(result)}
                      color={getUnifiedResultAvatarColor(result)}
                    />
                    <View style={styles.rowBody}>
                      <View style={styles.messageHeader}>
                        <Text numberOfLines={1} style={styles.rowTitle}>
                          {renderHighlightedText(result.title, searchQuery, styles.highlightText)}
                        </Text>
                        <Text style={styles.resultKindChip}>{getUnifiedResultKindLabel(result, t)}</Text>
                      </View>
                      <Text numberOfLines={2} style={styles.rowMeta}>
                        {renderHighlightedText(result.subtitle, searchQuery, styles.highlightMetaText)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </IosSection>
            ) : null}

            {showUnifiedEmptyState ? (
              <IosSection title={t('chats.search.title')}>
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>{t('chats.list.no_results')}</Text>
                  <Text style={styles.emptyBody}>{t('chats.list.hint_no_results')}</Text>
                </View>
              </IosSection>
            ) : null}

            <IosSection title={t('chats.search.section_chats')}>
              {dedupedChats.length > 0 ? (
                dedupedChats.map((chat, index) => (
                  <Pressable
                    key={chat.id}
                    onPress={() => openChat(chat)}
                    style={[styles.row, index < dedupedChats.length - 1 ? styles.rowBorder : null]}
                  >
                    <ProfileAvatar
                      title={chat.summary.displayTitle}
                      avatarMediaId={chat.summary.counterpartAvatarMediaId}
                      color={getAvatarColor(chat.type)}
                    />
                    <View style={styles.rowBody}>
                      <Text numberOfLines={1} style={styles.rowTitle}>
                        {renderHighlightedText(chat.summary.displayTitle, searchQuery, styles.highlightText)}
                      </Text>
                      <Text numberOfLines={1} style={styles.rowMeta}>
                        {renderHighlightedText(formatChatKind(chat, t), searchQuery, styles.highlightMetaText)}
                      </Text>
                    </View>
                    <Text style={styles.rowAction}>{t('chats.search.action_open')}</Text>
                  </Pressable>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyBody}>{t('chats.search.hint_no_chats')}</Text>
                </View>
              )}
            </IosSection>

            <IosSection title={t('chats.search.section_messages')}>
              {searchQuery.trim().length < 2 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyBody}>{t('chats.search.hint_type_more')}</Text>
                </View>
              ) : isSearchingMessages ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyBody}>{t('chats.search.hint_searching')}</Text>
                </View>
              ) : dedupedMessages.length > 0 ? (
                dedupedMessages.map((result, index) => (
                  <Pressable
                    key={`${result.chatId}:${result.message.id}`}
                    onPress={() => openMessageSearchResult(result)}
                    style={[styles.row, index < dedupedMessages.length - 1 ? styles.rowBorder : null]}
                  >
                    <ProfileAvatar
                      title={result.chatTitle}
                      avatarMediaId={result.counterpartAvatarMediaId}
                      color={getAvatarColor(result.chatType)}
                    />
                    <View style={styles.rowBody}>
                      <View style={styles.messageHeader}>
                        <Text numberOfLines={1} style={styles.rowTitle}>
                          {renderHighlightedText(result.chatTitle, searchQuery, styles.highlightText)}
                        </Text>
                        <Text style={styles.timestamp}>{formatChatTimestamp(result.message.createdAt)}</Text>
                      </View>
                      <Text numberOfLines={1} style={styles.rowMeta}>
                        {renderHighlightedText(formatGlobalSearchContext(result, t), searchQuery, styles.highlightMetaText)}
                      </Text>
                      <Text numberOfLines={2} style={styles.messageSnippet}>
                        {renderHighlightedText(buildGlobalSearchSnippet(result.message, t), searchQuery, styles.highlightText)}
                      </Text>
                    </View>
                  </Pressable>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyBody}>{t('chats.search.hint_no_messages')}</Text>
                </View>
              )}
            </IosSection>

            <IosSection title={t('chats.search.section_contacts')}>
              {dedupedContacts.length > 0 ? (
                dedupedContacts.map((contact, index) => {
                  const directChatExists = chats.some(
                    (chat) => chat.type === 'direct' && chat.summary.counterpartUserId === contact.userId,
                  );

                  return (
                    <Pressable
                      key={contact.userId}
                      onPress={() => void openDirectChatForUser(contact)}
                      style={[styles.row, index < dedupedContacts.length - 1 ? styles.rowBorder : null]}
                    >
                      <ProfileAvatar
                        title={contact.displayName}
                        avatarMediaId={contact.avatarMediaId}
                        color={telegramColors.accent}
                      />
                      <View style={styles.rowBody}>
                        <Text numberOfLines={1} style={styles.rowTitle}>
                          {renderHighlightedText(contact.displayName, searchQuery, styles.highlightText)}
                        </Text>
                        <Text numberOfLines={1} style={styles.rowMeta}>
                          {renderHighlightedText(
                            contact.username ? `@${contact.username}` : t('chats.list.hint_saved_contact'),
                            searchQuery,
                            styles.highlightMetaText,
                          )}
                        </Text>
                      </View>
                      <Text style={styles.rowAction}>
                        {directChatExists ? t('chats.search.action_open') : t('chats.list.action_start_chat')}
                      </Text>
                    </Pressable>
                  );
                })
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyBody}>{t('chats.search.hint_no_contacts')}</Text>
                </View>
              )}
            </IosSection>

            {showUsernameSection ? (
              <IosSection title={t('chats.search.section_find_username')}>
                {isSearchingByUsername ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyBody}>{t('chats.search.hint_searching_username', { username: normalizedUsernameQuery })}</Text>
                  </View>
                ) : usernameLookupResult ? (
                  <Pressable
                    disabled={isUsernameResultCurrentUser || creatingUsernameChatUserId !== null}
                    onPress={() => void openDirectChatForUser(usernameLookupResult)}
                    style={styles.row}
                  >
                    <ProfileAvatar
                      title={usernameLookupResult.displayName}
                      avatarMediaId={usernameLookupResult.avatarMediaId}
                      color={telegramColors.accent}
                    />
                    <View style={styles.rowBody}>
                      <Text style={styles.rowTitle}>
                        {renderHighlightedText(usernameLookupResult.displayName, searchQuery, styles.highlightText)}
                      </Text>
                      <Text style={styles.rowMeta}>
                        {renderHighlightedText(`@${usernameLookupResult.username}`, searchQuery, styles.highlightMetaText)}
                      </Text>
                      <Text style={styles.usernameHint}>
                        {isUsernameResultCurrentUser
                          ? t('chats.search.hint_own_account')
                          : isUsernameResultAlreadyInChats
                            ? t('chats.search.hint_chat_exists')
                            : t('chats.search.hint_found')}
                      </Text>
                    </View>
                    <Text style={[styles.rowAction, isUsernameResultCurrentUser ? styles.rowActionMuted : null]}>
                      {creatingUsernameChatUserId === usernameLookupResult.id
                        ? '…'
                        : isUsernameResultCurrentUser
                          ? t('common.you')
                          : isUsernameResultAlreadyInChats
                            ? t('chats.search.action_open')
                            : t('common.message')}
                    </Text>
                  </Pressable>
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyBody}>
                      {usernameLookupError ?? t('chats.search.hint_no_match_username', { username: normalizedUsernameQuery })}
                    </Text>
                  </View>
                )}
              </IosSection>
            ) : null}

            {showPhoneSection ? (
              <IosSection title={t('chats.search.section_find_phone')}>
                {isSearchingByPhone ? (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyBody}>{t('chats.search.hint_searching_phone', { phone: normalizedPhoneQuery })}</Text>
                  </View>
                ) : phoneLookupResult ? (
                  <Pressable
                    disabled={isPhoneResultCurrentUser || creatingUsernameChatUserId !== null}
                    onPress={() => void openDirectChatForUser(phoneLookupResult)}
                    style={styles.row}
                  >
                    <ProfileAvatar
                      title={phoneLookupResult.displayName}
                      avatarMediaId={phoneLookupResult.avatarMediaId}
                      color={telegramColors.accent}
                    />
                    <View style={styles.rowBody}>
                      <Text style={styles.rowTitle}>
                        {renderHighlightedText(phoneLookupResult.displayName, searchQuery, styles.highlightText)}
                      </Text>
                      <Text style={styles.rowMeta}>
                        {renderHighlightedText(
                          phoneLookupResult.username ? `@${phoneLookupResult.username}` : normalizedPhoneQuery,
                          searchQuery,
                          styles.highlightMetaText,
                        )}
                      </Text>
                      <Text style={styles.usernameHint}>
                        {isPhoneResultCurrentUser
                          ? t('chats.search.hint_own_account')
                          : isPhoneResultAlreadyInChats
                            ? t('chats.search.hint_chat_exists')
                            : t('chats.search.hint_found_phone')}
                      </Text>
                    </View>
                    <Text style={[styles.rowAction, isPhoneResultCurrentUser ? styles.rowActionMuted : null]}>
                      {creatingUsernameChatUserId === phoneLookupResult.id
                        ? '…'
                        : isPhoneResultCurrentUser
                          ? t('common.you')
                          : isPhoneResultAlreadyInChats
                            ? t('chats.search.action_open')
                            : t('common.message')}
                    </Text>
                  </Pressable>
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyBody}>
                      {phoneLookupError ?? t('chats.search.hint_no_match_phone', { phone: normalizedPhoneQuery })}
                    </Text>
                  </View>
                )}
              </IosSection>
            ) : null}
          </>
        )}
      </ScrollView>
    </IosScreen>
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

function formatChatKind(
  chat: ChatListItem,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  switch (chat.type) {
    case 'group':
      return chat.summary.memberCount === 1
        ? t('chats.info.subtitle_members_one', { count: chat.summary.memberCount })
        : t('chats.info.subtitle_members_other', { count: chat.summary.memberCount });
    case 'channel':
      return t('common.channel');
    default:
      return chat.summary.counterpartUsername ? `@${chat.summary.counterpartUsername}` : t('chats.list.direct_chat');
  }
}

function buildGlobalSearchSnippet(
  message: MessageListItem,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  const text = message.text?.trim();
  if (text && text.length > 0) {
    return text;
  }

  if (message.callEvent) {
    switch (message.callEvent.outcome) {
      case 'completed':
        return message.callEvent.durationSec > 0
          ? t('chats.list.msg_call_duration', { duration: message.callEvent.durationSec })
          : t('chats.list.msg_call');
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

function formatGlobalSearchContext(
  result: GlobalMessageSearchResult,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  switch (result.chatType) {
    case 'group':
      return t('chats.list.group_chat');
    case 'channel':
      return t('common.channel');
    default:
      return result.counterpartUsername ? `@${result.counterpartUsername}` : t('chats.list.direct_chat');
  }
}

function toSearchNavigationMessageTarget(message: MessageListItem): SearchNavigationMessageTarget {
  return {
    id: message.id,
    chatId: message.chatId,
    senderUserId: message.senderUserId,
    type: message.type,
    text: message.text,
    attachments: message.attachments,
    callEvent: message.callEvent,
    replyToMessageId: message.replyToMessageId,
    forwardedFromMessageId: message.forwardedFromMessageId,
    createdAt: message.createdAt,
    editedAt: message.editedAt,
    deletedAt: message.deletedAt,
    reactions: message.reactions,
    delivery: message.delivery,
  };
}

function buildUnifiedTopResults(params: {
  query: string;
  chats: ChatListItem[];
  contacts: ContactSearchResult[];
  usernameLookupResult: UsernameLookupResult | null;
  phoneLookupResult: PhoneLookupResult | null;
  globalMessageResults: GlobalMessageSearchResult[];
  isUsernameResultCurrentUser: boolean;
  isPhoneResultCurrentUser: boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  const results: Array<{ score: number; result: UnifiedSearchResult }> = [];
  const seenKeys = new Set<string>();
  const normalizedQuery = normalizeSearchText(params.query);

  const push = (result: UnifiedSearchResult, score: number) => {
    if (seenKeys.has(result.key)) {
      return;
    }

    seenKeys.add(result.key);
    results.push({ score, result });
  };

  params.chats.forEach((chat) => {
    const score =
      Math.max(
        getTextMatchScore(normalizedQuery, chat.summary.displayTitle),
        getTextMatchScore(normalizedQuery, chat.summary.counterpartUsername),
        getTextMatchScore(normalizedQuery, chat.summary.subtitle),
      ) + getRecencyBoost(chat.summary.lastActivityAt);

    push({
      key: `chat:${chat.id}`,
      kind: 'chat',
      title: chat.summary.displayTitle,
      subtitle: formatChatKind(chat, params.t),
      chat,
    }, score);
  });

  params.globalMessageResults.forEach((result) => {
    const score =
      Math.max(
        getTextMatchScore(normalizedQuery, result.chatTitle),
        getTextMatchScore(normalizedQuery, result.message.text),
        getTextMatchScore(normalizedQuery, buildGlobalSearchSnippet(result.message, params.t)),
      ) + getRecencyBoost(result.message.createdAt);

    push({
      key: `message:${result.message.id}`,
      kind: 'message',
      title: result.chatTitle,
      subtitle: buildGlobalSearchSnippet(result.message, params.t),
      result,
    }, score);
  });

  params.contacts.forEach((contact) => {
    const score = Math.max(
      getTextMatchScore(normalizedQuery, contact.displayName),
      getTextMatchScore(normalizedQuery, contact.username),
      getTextMatchScore(normalizedQuery, contact.phoneNumber),
    );

    push({
      key: `user:${contact.userId}`,
      kind: 'contact',
      title: contact.displayName,
      subtitle: contact.username ? `@${contact.username}` : params.t('chats.list.hint_saved_contact'),
      contact,
    }, score + 40);
  });

  if (params.usernameLookupResult && !params.isUsernameResultCurrentUser) {
    const usernameScore = Math.max(
      getTextMatchScore(normalizedQuery, params.usernameLookupResult.username),
      getTextMatchScore(normalizedQuery, params.usernameLookupResult.displayName),
    );

    push({
      key: `user:${params.usernameLookupResult.id}`,
      kind: 'username',
      title: params.usernameLookupResult.displayName,
      subtitle: `@${params.usernameLookupResult.username}`,
      user: params.usernameLookupResult,
    }, usernameScore + 120);
  }

  if (params.phoneLookupResult && !params.isPhoneResultCurrentUser) {
    const phoneScore = Math.max(
      getTextMatchScore(normalizedQuery, params.phoneLookupResult.username),
      getTextMatchScore(normalizedQuery, params.phoneLookupResult.displayName),
      getTextMatchScore(normalizedQuery, normalizePhoneSearchQuery(params.query)),
    );

    push({
      key: `user:${params.phoneLookupResult.id}`,
      kind: 'phone',
      title: params.phoneLookupResult.displayName,
      subtitle: params.phoneLookupResult.username
        ? `@${params.phoneLookupResult.username}`
        : params.t('chats.search.hint_found_phone'),
      user: params.phoneLookupResult,
    }, phoneScore + 110);
  }

  return results
    .sort((left, right) => right.score - left.score)
    .slice(0, UNIFIED_TOP_RESULTS_LIMIT)
    .map((entry) => entry.result);
}

function normalizeSearchText(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? '';
}

function renderHighlightedText(
  value: string,
  rawQuery: string,
  highlightStyle: Record<string, unknown>,
) {
  const query = rawQuery.trim();

  if (!query) {
    return value;
  }

  const normalizedValue = value.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  const matchIndex = normalizedValue.indexOf(normalizedQuery);

  if (matchIndex < 0) {
    return value;
  }

  const before = value.slice(0, matchIndex);
  const match = value.slice(matchIndex, matchIndex + query.length);
  const after = value.slice(matchIndex + query.length);

  return (
    <>
      {before}
      <Text style={highlightStyle}>{match}</Text>
      {after}
    </>
  );
}

function getTextMatchScore(query: string, value: string | null | undefined) {
  const normalizedValue = normalizeSearchText(value);

  if (!query || !normalizedValue) {
    return 0;
  }

  if (normalizedValue === query) {
    return 1000;
  }

  if (normalizedValue.startsWith(query)) {
    return 820;
  }

  if (normalizedValue.includes(query)) {
    return 620;
  }

  return 0;
}

function getRecencyBoost(value: string | null | undefined) {
  if (!value) {
    return 0;
  }

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return 0;
  }

  const ageHours = Math.max(0, (Date.now() - timestamp) / (1000 * 60 * 60));
  return Math.max(0, 80 - Math.min(80, ageHours));
}

function getUnifiedResultAvatarMediaId(result: UnifiedSearchResult) {
  switch (result.kind) {
    case 'chat':
      return result.chat.summary.counterpartAvatarMediaId;
    case 'contact':
      return result.contact.avatarMediaId;
    case 'username':
    case 'phone':
      return result.user.avatarMediaId;
    case 'message':
      return result.result.counterpartAvatarMediaId;
  }
}

function getUnifiedResultAvatarColor(result: UnifiedSearchResult) {
  switch (result.kind) {
    case 'chat':
      return getAvatarColor(result.chat.type);
    case 'message':
      return getAvatarColor(result.result.chatType);
    default:
      return telegramColors.accent;
  }
}

function getUnifiedResultKindLabel(
  result: UnifiedSearchResult,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  switch (result.kind) {
    case 'chat':
      return t('chats.search.section_chats');
    case 'contact':
      return t('chats.search.section_contacts');
    case 'username':
      return t('chats.search.section_find_username');
    case 'phone':
      return t('chats.search.section_find_phone');
    case 'message':
      return t('chats.search.section_messages');
  }
}

function normalizeUsernameQuery(value: string) {
  const normalizedValue = value.trim().replace(/^@+/, '');
  return normalizedValue.length >= 3 ? normalizedValue : '';
}

function normalizePhoneSearchQuery(value: string) {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return '';
  }

  const hasPhoneCharacters = /[+\d()\-\s]/.test(trimmed);
  const digits = trimmed.replace(/\D/g, '');

  if (!hasPhoneCharacters || digits.length < 6) {
    return '';
  }

  return `${trimmed.startsWith('+') ? '+' : '+'}${digits}`;
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
  heroCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    gap: 10,
    marginBottom: 6,
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
  searchWrap: {
    paddingHorizontal: 2,
    paddingTop: 2,
  },
  errorCard: {
    backgroundColor: telegramColors.destructSoft,
    borderRadius: 16,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 13,
  },
  scrollContent: {
    gap: 14,
    paddingBottom: 24,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 68,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  rowBorder: {
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    ...telegramText.rowTitle,
  },
  rowMeta: {
    color: telegramColors.textSecondary,
    fontSize: 13,
  },
  rowAction: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  rowActionMuted: {
    color: telegramColors.textTertiary,
  },
  emptyState: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  emptyTitle: {
    ...telegramText.rowTitle,
    textAlign: 'center',
  },
  emptyBody: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
  messageHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  timestamp: {
    color: telegramColors.textTertiary,
    fontSize: 12,
    marginLeft: 'auto',
  },
  resultKindChip: {
    backgroundColor: telegramColors.accentSoft,
    color: telegramColors.accentDeep,
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  messageSnippet: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
  },
  highlightText: {
    backgroundColor: '#fff3a3',
    color: telegramColors.textPrimary,
    fontWeight: '700',
  },
  highlightMetaText: {
    backgroundColor: '#fff3a3',
    color: telegramColors.textSecondary,
    fontWeight: '700',
  },
  usernameHint: {
    color: telegramColors.textTertiary,
    fontSize: 12,
  },
});
