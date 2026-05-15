import { useEffect, useRef } from 'react';
import type { QueryClient } from '@tanstack/react-query';

import {
  applyRealtimeChatScreenMessageCreated,
  applyRealtimeChatScreenReadUpdated,
  applyRealtimeChatScreenMessageUpdated,
} from '@features/messages/services/chat-screen-realtime-cache';
import { loadChatMessagesIntoCache } from '@features/messages/services/chat-screen.loader';
import { subscribeToRealtimeEvents } from '@shared/realtime/realtime-events';

const CHAT_RECOVERY_COOLDOWN_MS = 3000;

export function useChatScreenRealtime(params: {
  chatId: string | null;
  currentUserId: string | null;
  queryClient: QueryClient;
}) {
  const { chatId, currentUserId, queryClient } = params;
  const recoveryInFlightRef = useRef(false);
  const lastRecoveryAtRef = useRef(0);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    return subscribeToRealtimeEvents((event) => {
      if (event.chatId === '__connected__') {
        const now = Date.now();
        if (recoveryInFlightRef.current || now - lastRecoveryAtRef.current < CHAT_RECOVERY_COOLDOWN_MS) {
          return;
        }

        recoveryInFlightRef.current = true;
        lastRecoveryAtRef.current = now;
        void loadChatMessagesIntoCache(chatId, queryClient).finally(() => {
          recoveryInFlightRef.current = false;
        });
        return;
      }

      if (event.chatId !== chatId) {
        return;
      }

      if (event.type === 'chat.message_created') {
        applyRealtimeChatScreenMessageCreated({
          queryClient,
          event,
          currentUserId,
        });
        return;
      }

      if (event.type === 'chat.message_updated') {
        applyRealtimeChatScreenMessageUpdated({
          queryClient,
          event,
        });
        return;
      }

      if (event.type === 'chat.read_updated') {
        applyRealtimeChatScreenReadUpdated({
          queryClient,
          event,
          currentUserId,
        });
      }
    });
  }, [chatId, currentUserId, queryClient]);
}
