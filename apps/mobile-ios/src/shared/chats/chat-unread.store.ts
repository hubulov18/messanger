import { create } from 'zustand';

import type { ChatListItem } from '@features/chats/api/chats.api';
import { useChatReadStateStore } from './chat-read-state.store';

type ChatUnreadState = {
  unreadCountsByChatId: Record<string, number>;
  totalUnreadCount: number;
  syncFromChats: (chats: ChatListItem[]) => void;
  incrementChatUnread: (chatId: string) => void;
  clearChatUnread: (chatId: string) => void;
};

export const useChatUnreadStore = create<ChatUnreadState>((set: (partial: Partial<ChatUnreadState>) => void) => ({
  unreadCountsByChatId: {},
  totalUnreadCount: 0,
  syncFromChats: (chats) => {
    const readState = useChatReadStateStore.getState();
    const unreadCountsByChatId = Object.fromEntries(
      chats.map((chat) => {
        const suppressedAt = readState.readUpToActivityAtByChatId[chat.id];
        const serverActivityAt = Date.parse(chat.summary.lastActivityAt ?? '');
        const suppressedActivityAt = Date.parse(suppressedAt ?? '');
        const shouldSuppressUnread =
          Boolean(suppressedAt) &&
          chat.summary.unreadCount > 0 &&
          !Number.isNaN(serverActivityAt) &&
          !Number.isNaN(suppressedActivityAt) &&
          serverActivityAt <= suppressedActivityAt;

        if (shouldSuppressUnread) {
          return [chat.id, 0];
        }

        if (suppressedAt && (chat.summary.unreadCount === 0 || (!Number.isNaN(serverActivityAt) && serverActivityAt > suppressedActivityAt))) {
          readState.clearChatUnreadSuppression(chat.id);
        }

        return [chat.id, chat.summary.unreadCount];
      }),
    );

    set({
      unreadCountsByChatId,
      totalUnreadCount: Object.values(unreadCountsByChatId).reduce((sum, unreadCount) => sum + unreadCount, 0),
    });
  },
  incrementChatUnread: (chatId) => {
    const currentState = useChatUnreadStore.getState();
    useChatReadStateStore.getState().clearChatUnreadSuppression(chatId);
    const nextUnreadCount = (currentState.unreadCountsByChatId[chatId] ?? 0) + 1;

    set({
      unreadCountsByChatId: {
        ...currentState.unreadCountsByChatId,
        [chatId]: nextUnreadCount,
      },
      totalUnreadCount: currentState.totalUnreadCount + 1,
    });
  },
  clearChatUnread: (chatId) => {
    const currentState = useChatUnreadStore.getState();
    const currentUnreadCount = currentState.unreadCountsByChatId[chatId] ?? 0;

    if (currentUnreadCount === 0) {
      return;
    }

    set({
      unreadCountsByChatId: {
        ...currentState.unreadCountsByChatId,
        [chatId]: 0,
      },
      totalUnreadCount: Math.max(0, currentState.totalUnreadCount - currentUnreadCount),
    });
  },
}));
