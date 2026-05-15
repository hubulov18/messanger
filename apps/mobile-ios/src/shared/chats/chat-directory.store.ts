import { create } from 'zustand';

import type { ContactListItem } from '@features/contacts/api/contacts.api';

type KnownContact = {
  userId: string;
  displayName: string;
  username: string | null;
  avatarMediaId: string | null;
};

type KnownDirectChat = {
  chatId: string;
  title: string;
  participantUserId: string;
};

type ChatDirectoryState = {
  contactsByUserId: Record<string, KnownContact>;
  directChatsById: Record<string, KnownDirectChat>;
  registerContacts: (contacts: ContactListItem[]) => void;
  registerDirectChat: (chat: KnownDirectChat) => void;
};

export const useChatDirectoryStore = create<ChatDirectoryState>(
  (set: (partial: Partial<ChatDirectoryState>) => void) => ({
    contactsByUserId: {},
    directChatsById: {},
    registerContacts: (contacts: ContactListItem[]) => {
      const nextContactsByUserId = { ...useChatDirectoryStore.getState().contactsByUserId };

      for (const contact of contacts) {
        nextContactsByUserId[contact.userId] = {
          userId: contact.userId,
          displayName: contact.displayName,
          username: contact.username,
          avatarMediaId: contact.avatarMediaId,
        };
      }

      set({ contactsByUserId: nextContactsByUserId });
    },
    registerDirectChat: (chat: KnownDirectChat) => {
      set({
        directChatsById: {
          ...useChatDirectoryStore.getState().directChatsById,
          [chat.chatId]: chat,
        },
      });
    },
  }),
);

export function resolveKnownChatTitle(params: {
  chatId: string;
  chatType: string;
  fallbackTitle: string | null;
}) {
  const { chatId, chatType, fallbackTitle } = params;

  if (fallbackTitle && fallbackTitle.trim().length > 0) {
    return fallbackTitle;
  }

  if (chatType === 'direct') {
    const knownDirectChat = useChatDirectoryStore.getState().directChatsById[chatId];
    if (knownDirectChat) {
      return knownDirectChat.title;
    }

    return 'Direct chat';
  }

  return 'Untitled chat';
}

export function resolveKnownUserLabel(params: {
  userId: string;
  currentUserId: string | null | undefined;
  currentUserDisplayName: string | null | undefined;
}) {
  const { userId, currentUserId, currentUserDisplayName } = params;

  if (currentUserId && userId === currentUserId) {
    return currentUserDisplayName?.trim() || 'You';
  }

  const knownContact = useChatDirectoryStore.getState().contactsByUserId[userId];
  if (knownContact) {
    return knownContact.displayName;
  }

  return userId;
}
