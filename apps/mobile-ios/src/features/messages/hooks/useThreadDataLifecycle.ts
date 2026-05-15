import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChatDetails } from '@features/chats/api/chats.api';
import { getChat } from '@features/chats/api/chats.api';
import { getMessages, markChatRead, type MessageListItem } from '@features/messages/api/messages.api';
import { getMedia, type MediaObject } from '@features/messages/api/media.api';
import { useMediaProcessingPoller } from '@features/messages/hooks/useMediaProcessingPoller';
import { getProfilePresenceByUserId, type ProfilePresence } from '@features/profile/api/profile.api';
import type { ApiError } from '@shared/api/types';
import { useAppForegroundCallback } from '@shared/hooks/useAppForegroundCallback';
import { useLatestRequestGuard } from '@shared/hooks/useLatestRequestGuard';

export type ThreadDataMessage = MessageListItem & {
  clientStatus?: 'pending' | 'failed';
};

const THREAD_POLL_INTERVAL_MS = 12000;
const THREAD_SILENT_RELOAD_MIN_INTERVAL_MS = 900;

export function useThreadDataLifecycle(params: {
  chatId: string;
  isSending: boolean;
  isMutatingMessage: boolean;
  onLoadError: (message: string) => void;
  suppressChatUnread: (chatId: string, activityAt?: string | null) => void;
  clearChatUnread: (chatId: string) => void;
  markChatReadLocal: (chatId: string) => void;
}) {
  const {
    chatId,
    isSending,
    isMutatingMessage,
    onLoadError,
    suppressChatUnread,
    clearChatUnread,
    markChatReadLocal,
  } = params;
  const threadLoadInFlightRef = useRef(false);
  const queuedSilentThreadReloadRef = useRef(false);
  const lastSilentThreadLoadAtRef = useRef(0);
  const pendingSilentReloadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mediaRequestsInFlightRef = useRef<Set<string>>(new Set());
  const lastMarkedReadMessageIdRef = useRef<string | null>(null);
  const chatRef = useRef<ChatDetails | null>(null);
  const { beginRequest: beginThreadLoadRequest, isLatestRequest: isLatestThreadLoadRequest } = useLatestRequestGuard();
  const { beginRequest: beginPresenceRequest, isLatestRequest: isLatestPresenceRequest } = useLatestRequestGuard();
  const { beginRequest: beginMediaResolveRequest, isLatestRequest: isLatestMediaResolveRequest } = useLatestRequestGuard();
  const [chat, setChat] = useState<ChatDetails | null>(null);
  const [chatPresence, setChatPresence] = useState<ProfilePresence | null>(null);
  const [messages, setMessages] = useState<ThreadDataMessage[]>([]);
  const [mediaById, setMediaById] = useState<Record<string, MediaObject>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    chatRef.current = chat;
  }, [chat]);

  const loadThread = useCallback(async (options?: { silent?: boolean }) => {
    if (!chatId) {
      return;
    }

    if (threadLoadInFlightRef.current) {
      if (options?.silent) {
        queuedSilentThreadReloadRef.current = true;
      }
      return;
    }

    threadLoadInFlightRef.current = true;
    if (options?.silent) {
      lastSilentThreadLoadAtRef.current = Date.now();
    }
    const requestId = beginThreadLoadRequest();

    if (!options?.silent) {
      setIsLoading(true);
    }

    try {
      const cachedChat = chatRef.current;
      const [chatResponse, messagesResponse] = await Promise.all([
        options?.silent && cachedChat ? Promise.resolve(cachedChat) : getChat(chatId),
        getMessages(chatId),
      ]);
      const orderedMessages = normalizeThreadMessages(messagesResponse.items);

      if (!isLatestThreadLoadRequest(requestId)) {
        return;
      }

      setChat(chatResponse);
      setMessages(orderedMessages);

      const lastMessageId = orderedMessages.at(-1)?.id;
      const lastMessageCreatedAt = orderedMessages.at(-1)?.createdAt ?? null;
      if (lastMessageId && lastMarkedReadMessageIdRef.current !== lastMessageId) {
        try {
          await markChatRead(chatId, lastMessageId);
          lastMarkedReadMessageIdRef.current = lastMessageId;
        } catch {
          // Keep the thread usable even if read receipts fail in the background.
        }
        suppressChatUnread(chatId, lastMessageCreatedAt);
        clearChatUnread(chatId);
        markChatReadLocal(chatId);
      }
    } catch (error) {
      if (!options?.silent && isLatestThreadLoadRequest(requestId)) {
        const apiError = error as ApiError;
        onLoadError(getApiErrorMessage(apiError, 'Unable to load thread'));
      }
    } finally {
      threadLoadInFlightRef.current = false;
      if (!options?.silent && isLatestThreadLoadRequest(requestId)) {
        setIsLoading(false);
      }

      if (queuedSilentThreadReloadRef.current) {
        queuedSilentThreadReloadRef.current = false;
        requestSilentThreadReload();
      }
    }
  }, [
    beginThreadLoadRequest,
    chatId,
    clearChatUnread,
    isLatestThreadLoadRequest,
    markChatReadLocal,
    onLoadError,
    suppressChatUnread,
  ]);

  const requestSilentThreadReload = useCallback(() => {
    if (!chatId) {
      return;
    }

    if (threadLoadInFlightRef.current) {
      queuedSilentThreadReloadRef.current = true;
      return;
    }

    const elapsedSinceLastSilentLoad = Date.now() - lastSilentThreadLoadAtRef.current;
    if (elapsedSinceLastSilentLoad >= THREAD_SILENT_RELOAD_MIN_INTERVAL_MS) {
      void loadThread({ silent: true });
      return;
    }

    if (pendingSilentReloadTimerRef.current) {
      return;
    }

    const delayMs = THREAD_SILENT_RELOAD_MIN_INTERVAL_MS - elapsedSinceLastSilentLoad;
    pendingSilentReloadTimerRef.current = setTimeout(() => {
      pendingSilentReloadTimerRef.current = null;
      void loadThread({ silent: true });
    }, delayMs);
  }, [chatId, loadThread]);

  useEffect(() => {
    threadLoadInFlightRef.current = false;
    lastMarkedReadMessageIdRef.current = null;

    if (!chatId) {
      setIsLoading(false);
      return;
    }

    void loadThread();

    const intervalId = setInterval(() => {
      if (!isSending && !isMutatingMessage) {
        requestSilentThreadReload();
      }
    }, THREAD_POLL_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
      if (pendingSilentReloadTimerRef.current) {
        clearTimeout(pendingSilentReloadTimerRef.current);
        pendingSilentReloadTimerRef.current = null;
      }
    };
  }, [chatId, isMutatingMessage, isSending, loadThread, requestSilentThreadReload]);

  useAppForegroundCallback(() => {
    if (chatId && !isSending && !isMutatingMessage) {
      requestSilentThreadReload();
    }
  });

  useEffect(() => {
    const counterpartUserId = chat?.type === 'direct' ? chat.summary.counterpartUserId : null;

    if (!counterpartUserId) {
      setChatPresence(null);
      return;
    }

    let cancelled = false;
    const requestId = beginPresenceRequest();

    void getProfilePresenceByUserId(counterpartUserId)
      .then((presence) => {
        if (!cancelled && isLatestPresenceRequest(requestId)) {
          setChatPresence(presence);
        }
      })
      .catch(() => {
        if (!cancelled && isLatestPresenceRequest(requestId)) {
          setChatPresence(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [beginPresenceRequest, chat?.summary.counterpartUserId, chat?.type, isLatestPresenceRequest]);

  useEffect(() => {
    void loadReferencedMedia(messages);
  }, [messages]);

  const processingMediaIds = Object.values(mediaById)
    .filter((media) => media.processingStatus !== 'ready' && media.processingStatus !== 'failed')
    .map((media) => media.id);

  const onMediaResolved = useCallback((mediaId: string, media: MediaObject) => {
    setMediaById((current) => ({ ...current, [mediaId]: media }));
  }, []);

  useMediaProcessingPoller(processingMediaIds, onMediaResolved);

  async function loadReferencedMedia(items: ThreadDataMessage[]) {
    const requestId = beginMediaResolveRequest();
    const mediaIdsToRefresh = [...new Set(items.flatMap((message) => message.attachments.map((attachment) => attachment.mediaId)))]
      .filter((mediaId) => {
        const media = mediaById[mediaId];

        if (!media) {
          return !mediaRequestsInFlightRef.current.has(mediaId);
        }

        return !isMediaReady(media) && !mediaRequestsInFlightRef.current.has(mediaId);
      });

    if (mediaIdsToRefresh.length === 0) {
      return;
    }

    mediaIdsToRefresh.forEach((mediaId) => {
      mediaRequestsInFlightRef.current.add(mediaId);
    });

    try {
      const resolvedMedia = await Promise.allSettled(mediaIdsToRefresh.map((mediaId) => getMedia(mediaId)));

      if (!isLatestMediaResolveRequest(requestId)) {
        return;
      }

      setMediaById((current) => {
        const next = { ...current };

        for (const result of resolvedMedia) {
          if (result.status === 'fulfilled') {
            next[result.value.id] = result.value;
          }
        }

        return next;
      });
    } catch {
      // Keep thread usable even if media metadata resolution fails.
    } finally {
      mediaIdsToRefresh.forEach((mediaId) => {
        mediaRequestsInFlightRef.current.delete(mediaId);
      });
    }
  }

  return {
    chat,
    chatRef,
    chatPresence,
    messages,
    setMessages,
    mediaById,
    setMediaById,
    isLoading,
    loadThread,
    requestSilentThreadReload,
  };
}

function normalizeThreadMessages(items: MessageListItem[]) {
  return items.slice().sort((left, right) => left.createdAt.localeCompare(right.createdAt));
}

function isMediaReady(media: MediaObject) {
  return media.processingStatus === 'ready';
}

function getApiErrorMessage(apiError: ApiError, fallbackMessage: string) {
  return typeof apiError.message === 'string' ? apiError.message : fallbackMessage;
}
