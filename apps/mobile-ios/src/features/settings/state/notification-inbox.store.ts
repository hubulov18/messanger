import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type InAppNotificationInboxItem = {
  chatId: string;
  title: string;
  body: string;
  lastReceivedAt: string;
  unreadCount: number;
  totalCount: number;
  recentAlerts: Array<{
    body: string;
    receivedAt: string;
  }>;
};

type NotificationInboxState = {
  itemsByChatId: Record<string, InAppNotificationInboxItem>;
  orderedChatIds: string[];
  totalUnreadCount: number;
  pushAlert: (payload: { chatId: string; title: string; body: string; receivedAt?: string }) => void;
  markChatRead: (chatId: string) => void;
  markAllRead: () => void;
  clearChat: (chatId: string) => void;
  clearAll: () => void;
};

const MAX_PERSISTED_NOTIFICATION_CHATS = 30;
const MAX_RECENT_ALERTS_PER_CHAT = 4;

export const useNotificationInboxStore = create<NotificationInboxState>(
  persist<NotificationInboxState>(
    (set) => ({
      itemsByChatId: {},
      orderedChatIds: [],
      totalUnreadCount: 0,
      pushAlert: ({ chatId, title, body, receivedAt }) =>
        set((current) => {
          if (!chatId) {
            return current;
          }

          const timestamp = receivedAt ?? new Date().toISOString();
          const existing = current.itemsByChatId[chatId];
          const unreadDelta = 1;
          const nextItem: InAppNotificationInboxItem = {
            chatId,
            title,
            body,
            lastReceivedAt: timestamp,
            unreadCount: (existing?.unreadCount ?? 0) + unreadDelta,
            totalCount: (existing?.totalCount ?? 0) + 1,
            recentAlerts: [
              { body, receivedAt: timestamp },
              ...(existing?.recentAlerts ?? []),
            ].slice(0, MAX_RECENT_ALERTS_PER_CHAT),
          };

          const orderedChatIds = [
            chatId,
            ...current.orderedChatIds.filter((item) => item !== chatId),
          ].slice(0, MAX_PERSISTED_NOTIFICATION_CHATS);

          const itemsByChatId = Object.fromEntries(
            orderedChatIds.map((id) => [id, id === chatId ? nextItem : current.itemsByChatId[id]]).filter((entry) => Boolean(entry[1])),
          ) as Record<string, InAppNotificationInboxItem>;

          return {
            itemsByChatId,
            orderedChatIds,
            totalUnreadCount: Object.values(itemsByChatId).reduce((sum, item) => sum + item.unreadCount, 0),
          };
        }),
      markChatRead: (chatId) =>
        set((current) => {
          const existing = current.itemsByChatId[chatId];
          if (!existing || existing.unreadCount === 0) {
            return current;
          }

          const itemsByChatId = {
            ...current.itemsByChatId,
            [chatId]: {
              ...existing,
              unreadCount: 0,
            },
          };

          return {
            itemsByChatId,
            totalUnreadCount: Object.values(itemsByChatId).reduce((sum, item) => sum + item.unreadCount, 0),
          };
        }),
      markAllRead: () =>
        set((current) => {
          const itemsByChatId = Object.fromEntries(
            Object.entries(current.itemsByChatId).map(([chatId, item]) => [
              chatId,
              {
                ...item,
                unreadCount: 0,
              },
            ]),
          ) as Record<string, InAppNotificationInboxItem>;

          return {
            itemsByChatId,
            totalUnreadCount: 0,
          };
        }),
      clearChat: (chatId) =>
        set((current) => {
          const existing = current.itemsByChatId[chatId];
          if (!existing) {
            return current;
          }

          const nextItems = { ...current.itemsByChatId };
          delete nextItems[chatId];

          return {
            itemsByChatId: nextItems,
            orderedChatIds: current.orderedChatIds.filter((item) => item !== chatId),
            totalUnreadCount: Object.values(nextItems).reduce((sum, item) => sum + item.unreadCount, 0),
          };
        }),
      clearAll: () => ({
        itemsByChatId: {},
        orderedChatIds: [],
        totalUnreadCount: 0,
      }),
    }),
    {
      name: 'mobile-ios-notification-inbox',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: NotificationInboxState) => ({
        itemsByChatId: state.itemsByChatId,
        orderedChatIds: state.orderedChatIds,
        totalUnreadCount: state.totalUnreadCount,
      }),
    },
  ),
);
