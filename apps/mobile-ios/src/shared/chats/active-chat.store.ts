import { create } from 'zustand';

type ActiveChatState = {
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
};

export const useActiveChatStore = create<ActiveChatState>((set: (partial: Partial<ActiveChatState>) => void) => ({
  activeChatId: null,
  setActiveChatId: (activeChatId) => set({ activeChatId }),
}));
