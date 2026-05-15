import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

import { getChats } from '@features/chats/api/chats.api';
import { useSessionStore } from '@shared/auth/session.store';
import { useActiveChatStore } from '@shared/chats/active-chat.store';
import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { useChatReadStateStore } from '@shared/chats/chat-read-state.store';
import { useChatUnreadStore } from '@shared/chats/chat-unread.store';
import { subscribeToRealtimeEvents } from '@shared/realtime/realtime-events';

const CHAT_LIST_RECOVERY_COOLDOWN_MS = 3000;

export function ChatInboxRealtimeProvider({ children }: PropsWithChildren) {
  const currentUser = useSessionStore((state) => state.currentUser);
  const applyIncomingMessage = useChatInboxStore((state) => state.applyIncomingMessage);
  const updateChatPreviewLocal = useChatInboxStore((state) => state.updateChatPreviewLocal);
  const markChatReadLocal = useChatInboxStore((state) => state.markChatReadLocal);
  const syncInboxChats = useChatInboxStore((state) => state.syncFromChats);
  const touchChat = useChatInboxStore((state) => state.touchChat);
  const syncFromUnread = useChatUnreadStore((state) => state.syncFromChats);
  const incrementChatUnread = useChatUnreadStore((state) => state.incrementChatUnread);
  const clearChatUnread = useChatUnreadStore((state) => state.clearChatUnread);
  const suppressChatUnread = useChatReadStateStore((state) => state.suppressChatUnread);
  const recoveryInFlightRef = useRef(false);
  const lastRecoveryAtRef = useRef(0);

  useEffect(() => {
    return subscribeToRealtimeEvents((event) => {
      if (event.chatId === '__connected__') {
        const now = Date.now();
        if (recoveryInFlightRef.current || now - lastRecoveryAtRef.current < CHAT_LIST_RECOVERY_COOLDOWN_MS) {
          return;
        }

        recoveryInFlightRef.current = true;
        lastRecoveryAtRef.current = now;
        void getChats()
          .then((response) => {
            syncInboxChats(response.items);
            syncFromUnread(response.items);
          })
          .finally(() => {
            recoveryInFlightRef.current = false;
          });
        return;
      }

      const activeChatId = useActiveChatStore.getState().activeChatId;

      if (event.chatId === '__connected__') {
        return;
      }

      if (event.type === 'chat.message_created') {
        if (event.senderUserId && event.senderUserId !== currentUser?.id) {
          const suppressUnread = activeChatId === event.chatId;

          if (!suppressUnread) {
            incrementChatUnread(event.chatId);
          }

          applyIncomingMessage({
            chatId: event.chatId,
            preview: event.preview ?? null,
            happenedAt: event.createdAt ?? new Date().toISOString(),
            suppressUnread,
          });
          return;
        }

        touchChat({
          chatId: event.chatId,
          happenedAt: event.createdAt ?? new Date().toISOString(),
        });
        if (event.preview) {
          updateChatPreviewLocal({
            chatId: event.chatId,
            preview: event.preview,
          });
        }
        return;
      }

      if (event.type === 'chat.read_updated' && event.userId && event.userId === currentUser?.id) {
        const currentChat = useChatInboxStore.getState().chats.find((chat) => chat.id === event.chatId);
        suppressChatUnread(event.chatId, currentChat?.summary.lastActivityAt ?? null);
        clearChatUnread(event.chatId);
        markChatReadLocal(event.chatId);
        return;
      }

      if (event.type === 'chat.message_updated') {
        if (event.preview) {
          updateChatPreviewLocal({
            chatId: event.chatId,
            preview: event.preview,
          });
        }

        if (event.editedAt || event.deletedAt) {
          const happenedAt = event.editedAt ?? event.deletedAt;
          touchChat(
            happenedAt
              ? {
                  chatId: event.chatId,
                  happenedAt,
                }
              : {
                  chatId: event.chatId,
                },
          );
        }
      }
    });
  }, [
    applyIncomingMessage,
    clearChatUnread,
    currentUser?.id,
    incrementChatUnread,
    markChatReadLocal,
    syncFromUnread,
    syncInboxChats,
    suppressChatUnread,
    touchChat,
    updateChatPreviewLocal,
  ]);

  return children;
}
