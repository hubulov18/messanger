import { create } from 'zustand';

import type { ChatListItem } from '@features/chats/api/chats.api';
import { useChatReadStateStore } from './chat-read-state.store';

type ChatInboxState = {
  chats: ChatListItem[];
  syncFromChats: (chats: ChatListItem[]) => void;
  applyIncomingMessage: (params: { chatId: string; preview?: string | null; happenedAt?: string; suppressUnread?: boolean }) => void;
  updateChatPreviewLocal: (params: { chatId: string; preview?: string | null }) => void;
  applyOutgoingMessage: (params: { chatId: string; preview?: string | null; happenedAt?: string }) => void;
  markChatReadLocal: (chatId: string) => void;
  touchChat: (params: { chatId: string; happenedAt?: string }) => void;
  archiveChatLocal: (chatId: string) => void;
  unarchiveChatLocal: (chatId: string) => void;
  muteChatLocal: (chatId: string) => void;
  unmuteChatLocal: (chatId: string) => void;
};

export const useChatInboxStore = create<ChatInboxState>((set: (partial: Partial<ChatInboxState>) => void) => ({
  chats: [],
  syncFromChats: (chats) => {
    const readState = useChatReadStateStore.getState();

    set({
      chats: sortChats(
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

          if (suppressedAt && (chat.summary.unreadCount === 0 || (!Number.isNaN(serverActivityAt) && serverActivityAt > suppressedActivityAt))) {
            readState.clearChatUnreadSuppression(chat.id);
          }

          return shouldSuppressUnread
            ? {
                ...chat,
                summary: {
                  ...chat.summary,
                  unreadCount: 0,
                },
              }
            : chat;
        }),
      ),
    });
  },
  applyIncomingMessage: ({ chatId, preview, happenedAt, suppressUnread }) => {
    const currentChats = useChatInboxStore.getState().chats;
    const readState = useChatReadStateStore.getState();

    if (suppressUnread) {
      readState.suppressChatUnread(chatId, happenedAt ?? null);
    } else {
      readState.clearChatUnreadSuppression(chatId);
    }

    set({
      chats: sortChats(
        currentChats.map((chat) => {
          if (chat.id !== chatId) {
            return chat;
          }

          return {
            ...chat,
            summary: {
              ...chat.summary,
              subtitle: preview && preview.trim().length > 0 ? preview : chat.summary.subtitle,
              lastMessagePreview: preview && preview.trim().length > 0 ? preview : chat.summary.lastMessagePreview,
              lastActivityAt: happenedAt ?? new Date().toISOString(),
              unreadCount: suppressUnread ? 0 : Math.max(1, chat.summary.unreadCount + 1),
            },
          };
        }),
      ),
    });
  },
  updateChatPreviewLocal: ({ chatId, preview }) => {
    const normalizedPreview = preview?.trim() ?? '';
    if (!normalizedPreview) {
      return;
    }

    const currentChats = useChatInboxStore.getState().chats;

    set({
      chats: currentChats.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }

        return {
          ...chat,
          summary: {
            ...chat.summary,
            subtitle: normalizedPreview,
            lastMessagePreview: normalizedPreview,
          },
        };
      }),
    });
  },
  applyOutgoingMessage: ({ chatId, preview, happenedAt }) => {
    const currentChats = useChatInboxStore.getState().chats;

    set({
      chats: sortChats(
        currentChats.map((chat) => {
          if (chat.id !== chatId) {
            return chat;
          }

          return {
            ...chat,
            summary: {
              ...chat.summary,
              subtitle: preview && preview.trim().length > 0 ? preview : chat.summary.subtitle,
              lastMessagePreview: preview && preview.trim().length > 0 ? preview : chat.summary.lastMessagePreview,
              lastActivityAt: happenedAt ?? new Date().toISOString(),
              unreadCount: 0,
            },
          };
        }),
      ),
    });
  },
  markChatReadLocal: (chatId) => {
    const currentChats = useChatInboxStore.getState().chats;

    set({
      chats: currentChats.map((chat) => {
        if (chat.id !== chatId || chat.summary.unreadCount === 0) {
          return chat;
        }

        return {
          ...chat,
          summary: {
            ...chat.summary,
            unreadCount: 0,
          },
        };
      }),
    });
  },
  touchChat: ({ chatId, happenedAt }) => {
    const currentChats = useChatInboxStore.getState().chats;

    set({
      chats: sortChats(
        currentChats.map((chat) => {
          if (chat.id !== chatId) {
            return chat;
          }

          return {
            ...chat,
            summary: {
              ...chat.summary,
              lastActivityAt: happenedAt ?? new Date().toISOString(),
            },
          };
        }),
      ),
    });
  },
  archiveChatLocal: (chatId) => {
    const currentChats = useChatInboxStore.getState().chats;
    set({
      chats: currentChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, summary: { ...chat.summary, isArchived: true } }
          : chat,
      ),
    });
  },
  unarchiveChatLocal: (chatId) => {
    const currentChats = useChatInboxStore.getState().chats;
    set({
      chats: sortChats(
        currentChats.map((chat) =>
          chat.id === chatId
            ? { ...chat, summary: { ...chat.summary, isArchived: false } }
            : chat,
        ),
      ),
    });
  },
  muteChatLocal: (chatId) => {
    const currentChats = useChatInboxStore.getState().chats;
    set({
      chats: currentChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, summary: { ...chat.summary, isMuted: true } }
          : chat,
      ),
    });
  },
  unmuteChatLocal: (chatId) => {
    const currentChats = useChatInboxStore.getState().chats;
    set({
      chats: currentChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, summary: { ...chat.summary, isMuted: false } }
          : chat,
      ),
    });
  },
}));

function sortChats(chats: ChatListItem[]) {
  return [...chats].sort((left, right) => {
    if (left.summary.isPinned !== right.summary.isPinned) {
      return left.summary.isPinned ? -1 : 1;
    }

    const leftActivity = Date.parse(left.summary.lastActivityAt ?? '');
    const rightActivity = Date.parse(right.summary.lastActivityAt ?? '');

    if (!Number.isNaN(leftActivity) && !Number.isNaN(rightActivity) && leftActivity !== rightActivity) {
      return rightActivity - leftActivity;
    }

    return left.summary.displayTitle.localeCompare(right.summary.displayTitle);
  });
}
