import { useEffect, useRef, useState } from 'react';

import { subscribeToRealtimeEvents } from '@shared/realtime/realtime-events';

const TYPING_EXPIRY_MS = 5000;

export function useChatScreenTyping(params: {
  chatId: string | null;
  currentUserId: string | null;
}) {
  const { chatId, currentUserId } = params;
  const [typingUserId, setTypingUserId] = useState<string | null>(null);
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!chatId) {
      setTypingUserId(null);
      clearExpiryTimer(expiryTimerRef);
      return;
    }

    return subscribeToRealtimeEvents((event) => {
      if (event.chatId !== chatId) {
        return;
      }

      if (event.type === 'chat.typing_started') {
        if (!event.senderUserId || event.senderUserId === currentUserId) {
          return;
        }

        setTypingUserId(event.senderUserId);
        clearExpiryTimer(expiryTimerRef);
        expiryTimerRef.current = setTimeout(() => {
          setTypingUserId(null);
          expiryTimerRef.current = null;
        }, TYPING_EXPIRY_MS);
        return;
      }

      if (event.type === 'chat.typing_stopped') {
        if (!event.senderUserId || event.senderUserId !== typingUserId) {
          return;
        }

        setTypingUserId(null);
        clearExpiryTimer(expiryTimerRef);
      }
    });
  }, [chatId, currentUserId, typingUserId]);

  useEffect(() => {
    return () => {
      clearExpiryTimer(expiryTimerRef);
    };
  }, []);

  return {
    isTyping: typingUserId !== null,
    typingUserId,
  };
}

function clearExpiryTimer(timerRef: { current: ReturnType<typeof setTimeout> | null }) {
  if (!timerRef.current) {
    return;
  }

  clearTimeout(timerRef.current);
  timerRef.current = null;
}
