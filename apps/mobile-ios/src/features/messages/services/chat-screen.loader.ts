import { queryKeys, type Message, type MessageId, type MessageMap, type User } from '@telegram/ui';
import type { QueryClient } from '@tanstack/react-query';

import { getChats, type ChatListItem } from '@features/chats/api/chats.api';
import { getMessages, type MessageListItem } from '@features/messages/api/messages.api';
import { useSessionStore } from '@shared/auth/session.store';
import { mapBackendMessageToUiMessage } from '@shared/api/ui-message-mapper';

export type LoadedChatScreenData =
  | { kind: 'empty' }
  | {
      kind: 'ready';
      chatId: string;
      chat: ChatListItem;
      messages: MessageMap;
      messageIds: ReadonlyArray<MessageId>;
    };

export async function loadInitialChatScreenData(queryClient: QueryClient): Promise<LoadedChatScreenData> {
  seedCurrentUser(queryClient);

  const chatsResponse = await getChats();
  const firstChat = chatsResponse.items[0] ?? null;
  if (!firstChat) {
    return { kind: 'empty' };
  }

  const normalized = await loadChatMessagesIntoCache(firstChat.id, queryClient);

  return {
    kind: 'ready',
    chatId: firstChat.id,
    chat: firstChat,
    messages: normalized.messages,
    messageIds: normalized.messageIds,
  };
}

export async function loadChatMessagesIntoCache(queryChatId: string, queryClient: QueryClient) {
  seedCurrentUser(queryClient);

  const currentUserId = useSessionStore.getState().currentUser?.id ?? null;
  const messagesResponse = await getMessages(queryChatId);
  const normalized = normalizeMessages(messagesResponse.items, currentUserId);

  queryClient.setQueryData(queryKeys.messages(queryChatId), normalized.messages);
  queryClient.setQueryData(queryKeys.messageIds(queryChatId), normalized.messageIds);

  return normalized;
}

function seedCurrentUser(queryClient: QueryClient) {
  const currentUser = useSessionStore.getState().currentUser;
  if (!currentUser) {
    return;
  }

  const cachedCurrentUser: User = {
    id: currentUser.id,
    displayName: currentUser.displayName,
  };
  queryClient.setQueryData(queryKeys.currentUser(), cachedCurrentUser);
}

function normalizeMessages(items: MessageListItem[], currentUserId: string | null) {
  const orderedNewestFirst = items
    .slice()
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
    .map((item) => mapBackendMessageToUiMessage(item, currentUserId));

  const messages = Object.fromEntries(orderedNewestFirst.map((message) => [message.id, message])) as MessageMap;
  const messageIds = orderedNewestFirst.map((message) => message.id);

  return {
    messages,
    messageIds,
  };
}
