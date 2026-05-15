import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

import {
  ChatBubble,
  Composer,
  Text,
  TypingIndicatorBar,
  queryKeys,
  useCurrentUser,
  useSendMessage,
  type BubblePosition,
  type BubbleVariant,
  type MessageId,
  type MessageMap,
} from '@telegram/ui';
import { useChatScreenRealtime } from '@features/messages/hooks/useChatScreenRealtime';
import { useChatScreenTyping } from '@features/messages/hooks/useChatScreenTyping';
import { loadInitialChatScreenData } from '@features/messages/services/chat-screen.loader';
import { useTranslation } from '@shared/i18n';
import { telegramColors, telegramShadows } from '@shared/ui/ios/theme';

/**
 * ChatScreen — Phase 9 migration.
 *
 * Uses the real @telegram/ui package components instead of the shim.
 * ChatBubble reads its own message via useMessage internally (selector-based).
 * Composer handles send lifecycle internally via useSendMessage.
 * The host is only responsible for:
 *   - initial data load (seeding the cache)
 *   - realtime event handling (websocket → cache writes)
 *   - providing the message-id list to FlatList
 *   - computing variant/position per bubble
 */

export function ChatScreen() {
  const { t, locale } = useTranslation();
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageIds, setMessageIds] = useState<ReadonlyArray<MessageId>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // ---------- Initial load ---------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const loaded = await loadInitialChatScreenData(queryClient);
        if (cancelled) return;

        if (loaded.kind === 'empty') {
          setActiveChatId(null);
          setMessageIds([]);
          setIsEmpty(true);
          return;
        }

        setActiveChatId(loaded.chatId);
        setMessageIds(loaded.messageIds);
        setIsEmpty(false);
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : (locale === 'ru' ? 'Не удалось загрузить чат' : 'Unable to load chat'));
          setActiveChatId(null);
          setMessageIds([]);
          setIsEmpty(false);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [queryClient]);

  // ---------- Subscribe to message-id list changes ---------------------------

  useEffect(() => {
    if (!activeChatId) {
      setMessageIds([]);
      return;
    }

    const idsKey = queryKeys.messageIds(activeChatId);
    setMessageIds(queryClient.getQueryData<ReadonlyArray<MessageId>>(idsKey) ?? []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TS cannot resolve getQueryCache through #private; runtime OK
    const cache = (queryClient as any).getQueryCache() as { subscribe: (cb: () => void) => () => void };
    const unsubscribe = cache.subscribe(() => {
      setMessageIds(queryClient.getQueryData<ReadonlyArray<MessageId>>(idsKey) ?? []);
    });

    return unsubscribe;
  }, [activeChatId, queryClient]);

  // ---------- Realtime & typing ----------------------------------------------

  useChatScreenRealtime({
    chatId: activeChatId,
    currentUserId: currentUser?.id ?? null,
    queryClient,
  });

  const { isTyping } = useChatScreenTyping({
    chatId: activeChatId,
    currentUserId: currentUser?.id ?? null,
  });

  // ---------- Retry via useSendMessage ---------------------------------------

  const { retry } = useSendMessage();

  const handleRetry = useCallback(
    (messageId: MessageId) => {
      if (!activeChatId) return;
      const messages = queryClient.getQueryData<MessageMap>(queryKeys.messages(activeChatId));
      const msg = messages?.[messageId];
      if (!msg || msg.status !== 'failed') return;
      retry(messageId, activeChatId, msg.body, msg.replyTo);
    },
    [activeChatId, queryClient, retry],
  );

  // ---------- Compute variant & position per message -------------------------

  const messageMetadata = useMemo(() => {
    if (!activeChatId) return new Map<MessageId, { variant: BubbleVariant; position: BubblePosition }>();

    const messages = queryClient.getQueryData<MessageMap>(queryKeys.messages(activeChatId)) ?? {};
    const currentUserId = currentUser?.id ?? '';
    const meta = new Map<MessageId, { variant: BubbleVariant; position: BubblePosition }>();

    for (let i = 0; i < messageIds.length; i++) {
      const id = messageIds[i]!;
      const msg = messages[id];
      const senderId = msg?.senderId ?? '';
      const variant: BubbleVariant = senderId === currentUserId ? 'outgoing' : 'incoming';

      // FlatList is inverted, so messageIds[0] is the newest (bottom).
      // "previous" visually (above) = messageIds[i+1], "next" (below) = messageIds[i-1].
      const aboveId = messageIds[i + 1];
      const belowId = messageIds[i - 1];
      const aboveSender = aboveId ? messages[aboveId]?.senderId : undefined;
      const belowSender = belowId ? messages[belowId]?.senderId : undefined;
      const sameAbove = aboveSender === senderId;
      const sameBelow = belowSender === senderId;

      let position: BubblePosition;
      if (sameAbove && sameBelow) position = 'middle';
      else if (sameAbove && !sameBelow) position = 'last';
      else if (!sameAbove && sameBelow) position = 'first';
      else position = 'single';

      meta.set(id, { variant, position });
    }

    return meta;
  }, [activeChatId, messageIds, currentUser?.id, queryClient]);

  // ---------- Derived state --------------------------------------------------

  const showChatEmptyState = !isLoading && !loadError && activeChatId !== null && messageIds.length === 0;
  const showComposer = !isLoading && activeChatId !== null && currentUser !== undefined;

  // ---------- Render ---------------------------------------------------------

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text role="body">{locale === 'ru' ? 'Разговор' : 'Conversation'}</Text>
        <Text role="caption" color="textSecondary">{locale === 'ru' ? 'Превью реального пакета' : 'Real package preview'}</Text>
      </View>
      {isLoading ? (
        <View style={styles.stateWrap}>
          <Text role="body" color="textSecondary">{locale === 'ru' ? 'Загрузка чата…' : 'Loading chat…'}</Text>
        </View>
      ) : loadError ? (
        <View style={styles.stateWrap}>
          <Text role="body" color="textSecondary">{loadError}</Text>
        </View>
      ) : isEmpty || !activeChatId ? (
        <View style={styles.stateWrap}>
          <Text role="body" color="textSecondary">{t('chats.list.no_chats')}</Text>
        </View>
      ) : showChatEmptyState ? (
        <View style={styles.stateWrap}>
          <Text role="body" color="textSecondary">{t('chats.thread.empty')}</Text>
        </View>
      ) : (
        <FlatList
          data={messageIds as MessageId[]}
          inverted
          keyExtractor={(item: MessageId) => item}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }: { item: MessageId }) => {
            const meta = messageMetadata.get(item);
            return (
              <ChatBubble
                chatId={activeChatId}
                messageId={item}
                variant={meta?.variant ?? 'incoming'}
                position={meta?.position ?? 'single'}
                onRetry={handleRetry}
              />
            );
          }}
        />
      )}
      {activeChatId && isTyping ? <TypingIndicatorBar /> : null}
      {showComposer ? (
        <Composer chatId={activeChatId} placeholder={locale === 'ru' ? 'Напиши сообщение' : 'Write a message'} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: telegramColors.appBackground,
    flex: 1,
  },
  header: {
    backgroundColor: telegramColors.surface,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 2,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 14,
    ...telegramShadows.card,
  },
  listContent: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  stateWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
