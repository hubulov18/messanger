import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { useChatReadStateStore } from '@shared/chats/chat-read-state.store';
import { useChatUnreadStore } from '@shared/chats/chat-unread.store';
import { subscribeToPushNotificationEvents } from '@shared/native/push-notifications';
import { navigateToChatThread } from '../navigation/navigation-service';

/**
 * Handles deep links originating from push notification taps.
 * Must be rendered inside AppNavigationProvider so that navigationRef is ready.
 */
export function DeepLinkProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    return subscribeToPushNotificationEvents((event) => {
      if (event.type === 'notificationTapped' && event.chatId) {
        const chat = useChatInboxStore.getState().chats.find((item) => item.id === event.chatId);
        useChatReadStateStore.getState().suppressChatUnread(event.chatId, chat?.summary.lastActivityAt ?? null);
        useChatUnreadStore.getState().clearChatUnread(event.chatId);
        useChatInboxStore.getState().markChatReadLocal(event.chatId);
        navigateToChatThread(event.chatId);
      }
    });
  }, []);

  return children;
}
