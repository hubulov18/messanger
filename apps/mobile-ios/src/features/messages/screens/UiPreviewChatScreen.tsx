import { useCallback, useEffect, useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { QueryClientProvider, skipToken, useQuery } from '@tanstack/react-query';
import { t, useTranslation } from '@shared/i18n';

import {
  ApiClientProvider,
  ApiError,
  ChatBubble,
  Composer,
  Pressable,
  Surface,
  Text,
  ThemeProvider,
  createQueryClient,
  queryKeys,
  type ApiClient,
  type ChatId,
  type Message,
  type MessageMap,
  type MessageStatus,
  type User,
} from '@telegram/ui';

type UiPreviewChatScreenProps = {
  navigation: {
    goBack?: () => void;
  } | undefined;
};

const PREVIEW_CHAT_ID: ChatId = 'ui_preview_chat';
const PREVIEW_CURRENT_USER: User = {
  id: 'user_preview_me',
  displayName: 'You',
};
const PREVIEW_PEER: User = {
  id: 'user_preview_peer',
  displayName: 'Alex',
};

const previewQueryClient = createQueryClient();

let previewServerMessageCounter = 0;

const previewApiClient: ApiClient = {
  async sendMessage(args) {
    await delay(320);

    if (args.body.toLowerCase().includes('fail')) {
      throw new ApiError(t('messages.preview.send_failed'), {
        status: 500,
        code: 'preview_send_failed',
      });
    }

    previewServerMessageCounter += 1;
    return {
      id: `server_preview_${previewServerMessageCounter}`,
      chatId: args.chatId,
      senderId: PREVIEW_CURRENT_USER.id,
      type: 'text',
      body: args.body,
      createdAt: Date.now(),
      status: resolvePreviewSendStatus(args.body),
      reactions: [],
      ...(args.replyTo ? { replyTo: args.replyTo } : {}),
    };
  },
};

export function UiPreviewChatScreen({ navigation }: UiPreviewChatScreenProps) {
  return (
    <QueryClientProvider client={previewQueryClient}>
      <ApiClientProvider client={previewApiClient}>
        <ThemeProvider mode="light">
          <UiPreviewChatContent navigation={navigation} />
        </ThemeProvider>
      </ApiClientProvider>
    </QueryClientProvider>
  );
}

function UiPreviewChatContent({ navigation }: UiPreviewChatScreenProps) {
  const { t, locale } = useTranslation();
  useEffect(() => {
    seedPreviewChat(previewQueryClient);
  }, []);

  const { data: currentUser } = useQuery<User>({
    queryKey: queryKeys.currentUser(),
    queryFn: skipToken,
    staleTime: Infinity,
  });
  const { data: messageIds = [] } = useQuery<ReadonlyArray<string>>({
    queryKey: queryKeys.messageIds(PREVIEW_CHAT_ID),
    queryFn: skipToken,
    staleTime: Infinity,
  });
  const { data: messageMap = {} as MessageMap } = useQuery<MessageMap>({
    queryKey: queryKeys.messages(PREVIEW_CHAT_ID),
    queryFn: skipToken,
    staleTime: Infinity,
  });

  const handleReset = useCallback(() => {
    seedPreviewChat(previewQueryClient);
  }, []);

  const previewSummary = useMemo(() => {
    const total = messageIds.length;
    const ownCount = messageIds.filter((messageId) => messageMap[messageId]?.senderId === PREVIEW_CURRENT_USER.id).length;
    return locale === 'ru'
      ? `${total} пузырей · ${ownCount} исходящих · рантайм реального пакета`
      : `${total} bubbles · ${ownCount} outgoing · real package runtime`;
  }, [locale, messageIds, messageMap]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Surface variant="raised" radius="lg" style={styles.headerCard}>
          <View style={styles.headerRow}>
            <View style={styles.headerCopy}>
              <Text role="title">{t('messages.preview.title')}</Text>
              <Text role="footnote" color="textSecondary">
                {previewSummary}
              </Text>
              <Text role="footnote" color="textSecondary">
                {t('messages.preview.body')}
              </Text>
            </View>
            <View style={styles.headerActions}>
              <Pressable accessibilityLabel={t('messages.preview.reset_accessibility')} onPress={handleReset} style={styles.headerButton}>
                <Text role="caption" color="accent">{t('messages.preview.reset')}</Text>
              </Pressable>
              <Pressable accessibilityLabel={t('messages.preview.close_accessibility')} onPress={() => navigation?.goBack?.()} style={styles.headerButton}>
                <Text role="caption" color="accent">{t('common.close')}</Text>
              </Pressable>
            </View>
          </View>
        </Surface>
      </View>

      <FlatList
        inverted
        data={messageIds}
        keyExtractor={(messageId: string) => messageId}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: messageId, index }: { item: string; index: number }) => {
          const message = messageMap[messageId];
          if (!message) {
            return null;
          }

          return (
            <ChatBubble
              chatId={PREVIEW_CHAT_ID}
              messageId={messageId}
              variant={message.senderId === PREVIEW_CURRENT_USER.id ? 'outgoing' : 'incoming'}
              position={getPreviewBubblePosition(messageIds, messageMap, index)}
              maxWidthFraction={0.78}
            />
          );
        }}
        style={styles.list}
      />

      <Composer
        chatId={PREVIEW_CHAT_ID}
        placeholder={
          currentUser
            ? t('messages.preview.placeholder_user', { name: currentUser.displayName })
            : t('messages.preview.placeholder')
        }
      />
    </SafeAreaView>
  );
}

function seedPreviewChat(queryClient: typeof previewQueryClient) {
  const messages = buildPreviewMessages();
  const messageMap = Object.fromEntries(messages.map((message) => [message.id, message])) as MessageMap;
  const messageIds = messages
    .slice()
    .sort((left, right) => right.createdAt - left.createdAt)
    .map((message) => message.id);

  queryClient.setQueryData(queryKeys.currentUser(), PREVIEW_CURRENT_USER);
  queryClient.setQueryData(queryKeys.messages(PREVIEW_CHAT_ID), messageMap);
  queryClient.setQueryData(queryKeys.messageIds(PREVIEW_CHAT_ID), messageIds);
}

function buildPreviewMessages(): Message[] {
  const baseTime = Date.now() - 1000 * 60 * 40;

  return [
    createPreviewMessage({
      id: 'preview_01',
      senderId: PREVIEW_PEER.id,
      body: 'Hey. This screen is using the real UI package directly.',
      createdAt: baseTime + 1_000,
      status: 'read',
    }),
    createPreviewMessage({
      id: 'preview_02',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'Good. I want to see the package design without touching production chat flow.',
      createdAt: baseTime + 40_000,
      status: 'read',
    }),
    createPreviewMessage({
      id: 'preview_03',
      senderId: PREVIEW_PEER.id,
      body: 'These next two are clustered incoming bubbles.',
      createdAt: baseTime + 80_000,
      status: 'read',
    }),
    createPreviewMessage({
      id: 'preview_04',
      senderId: PREVIEW_PEER.id,
      body: 'Second incoming in the same cluster.',
      createdAt: baseTime + 92_000,
      status: 'read',
    }),
    createPreviewMessage({
      id: 'preview_05',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'And here is an outgoing cluster start.',
      createdAt: baseTime + 130_000,
      status: 'delivered',
    }),
    createPreviewMessage({
      id: 'preview_06',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'Outgoing cluster end with delivered status.',
      createdAt: baseTime + 142_000,
      status: 'delivered',
    }),
    createPreviewMessage({
      id: 'preview_07',
      senderId: PREVIEW_PEER.id,
      body: 'Short reply preview target.',
      createdAt: baseTime + 182_000,
      status: 'read',
    }),
    createPreviewMessage({
      id: 'preview_08',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'This is an outgoing reply bubble that references the short target above.',
      createdAt: baseTime + 222_000,
      status: 'sent',
      replyTo: {
        messageId: 'preview_07',
        senderName: PREVIEW_PEER.displayName,
        preview: 'Short reply preview target.',
      },
    }),
    createPreviewMessage({
      id: 'preview_09',
      senderId: PREVIEW_PEER.id,
      body: 'A longer reply target so the compact preview block has to truncate gracefully without breaking the row height.',
      createdAt: baseTime + 262_000,
      status: 'read',
    }),
    createPreviewMessage({
      id: 'preview_10',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'Long reply preview example.',
      createdAt: baseTime + 298_000,
      status: 'read',
      replyTo: {
        messageId: 'preview_09',
        senderName: PREVIEW_PEER.displayName,
        preview: 'A longer reply target so the compact preview block has to truncate gracefully without breaking the row height.',
      },
    }),
    createPreviewMessage({
      id: 'preview_11',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'Message deleted',
      createdAt: baseTime + 332_000,
      status: 'sent',
    }),
    createPreviewMessage({
      id: 'preview_12',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'This seeded row is still sending.',
      createdAt: baseTime + 366_000,
      status: 'sending',
    }),
    createPreviewMessage({
      id: 'preview_13',
      senderId: PREVIEW_CURRENT_USER.id,
      body: 'This seeded row is failed. Type “fail” in the composer to create another one.',
      createdAt: baseTime + 400_000,
      status: 'failed',
    }),
    createPreviewMessage({
      id: 'preview_14',
      senderId: PREVIEW_PEER.id,
      body: 'Final incoming single bubble to show the tail shape clearly.',
      createdAt: baseTime + 442_000,
      status: 'read',
      editedAt: baseTime + 460_000,
    }),
  ];
}

function createPreviewMessage(params: {
  id: string;
  senderId: string;
  body: string;
  createdAt: number;
  status: MessageStatus;
  replyTo?: Message['replyTo'];
  editedAt?: number;
}): Message {
  return {
    id: params.id,
    chatId: PREVIEW_CHAT_ID,
    senderId: params.senderId,
    type: 'text',
    body: params.body,
    createdAt: params.createdAt,
    status: params.status,
    reactions: [],
    ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    ...(params.editedAt !== undefined ? { editedAt: params.editedAt } : {}),
  };
}

function resolvePreviewSendStatus(body: string): MessageStatus {
  const normalized = body.toLowerCase();
  if (normalized.includes('read')) {
    return 'read';
  }
  if (normalized.includes('delivered')) {
    return 'delivered';
  }
  return 'sent';
}

function getPreviewBubblePosition(
  messageIds: ReadonlyArray<string>,
  messageMap: MessageMap,
  index: number,
) {
  const currentId = messageIds[index];
  if (!currentId) {
    return 'single' as const;
  }

  const current = messageMap[currentId];
  if (!current) {
    return 'single' as const;
  }

  const previous = messageMap[messageIds[index - 1] ?? ''];
  const next = messageMap[messageIds[index + 1] ?? ''];
  const connectsToPrevious = canClusterPreviewBubble(previous, current);
  const connectsToNext = canClusterPreviewBubble(current, next);

  if (connectsToPrevious && connectsToNext) {
    return 'middle' as const;
  }

  if (connectsToPrevious) {
    return 'last' as const;
  }

  if (connectsToNext) {
    return 'first' as const;
  }

  return 'single' as const;
}

function canClusterPreviewBubble(left: Message | undefined, right: Message | undefined) {
  if (!left || !right) {
    return false;
  }

  return left.senderId === right.senderId;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#faf6f0',
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerCard: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  headerRow: {
    gap: 12,
  },
  headerCopy: {
    gap: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 12,
  },
});
