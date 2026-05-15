import { create } from 'zustand';

type ChatReadState = {
  readUpToActivityAtByChatId: Record<string, string>;
  suppressChatUnread: (chatId: string, activityAt?: string | null) => void;
  clearChatUnreadSuppression: (chatId: string) => void;
};

export const useChatReadStateStore = create<ChatReadState>((set) => ({
  readUpToActivityAtByChatId: {},
  suppressChatUnread: (chatId, activityAt) => {
    if (!chatId) {
      return;
    }

    set((current) => ({
      readUpToActivityAtByChatId: {
        ...current.readUpToActivityAtByChatId,
        [chatId]: activityAt ?? new Date().toISOString(),
      },
    }));
  },
  clearChatUnreadSuppression: (chatId) =>
    set((current) => {
      if (!current.readUpToActivityAtByChatId[chatId]) {
        return current;
      }

      const next = { ...current.readUpToActivityAtByChatId };
      delete next[chatId];
      return {
        readUpToActivityAtByChatId: next,
      };
    }),
}));
