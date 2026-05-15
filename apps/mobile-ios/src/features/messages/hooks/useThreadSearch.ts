import { useEffect, useState } from 'react';

import type { MessageListItem } from '@features/messages/api/messages.api';
import { searchMessages } from '@features/messages/api/messages.api';
import { useLatestRequestGuard } from '@shared/hooks/useLatestRequestGuard';

const THREAD_SEARCH_DEBOUNCE_MS = 250;

type ThreadSearchMessage = MessageListItem & {
  clientStatus?: 'pending' | 'failed';
};

export function useThreadSearch(params: {
  chatId: string;
  initialSearchQuery: string;
  initialFocusedMessageId: string;
  normalizeMessages: (items: MessageListItem[]) => ThreadSearchMessage[];
}) {
  const { beginRequest, isLatestRequest } = useLatestRequestGuard();
  const { chatId, initialSearchQuery, initialFocusedMessageId, normalizeMessages } = params;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [threadSearchQuery, setThreadSearchQuery] = useState('');
  const [currentSearchMatchIndex, setCurrentSearchMatchIndex] = useState(0);
  const [remoteSearchResults, setRemoteSearchResults] = useState<ThreadSearchMessage[]>([]);
  const [injectedSearchMessage, setInjectedSearchMessage] = useState<ThreadSearchMessage | null>(null);
  const [highlightedSearchMessageId, setHighlightedSearchMessageId] = useState<string | null>(
    initialFocusedMessageId || null,
  );
  const [isSearchingThread, setIsSearchingThread] = useState(false);

  useEffect(() => {
    setInjectedSearchMessage(null);
    setHighlightedSearchMessageId(initialFocusedMessageId || null);
  }, [chatId, initialFocusedMessageId]);

  useEffect(() => {
    if (!chatId || !initialSearchQuery) {
      return;
    }

    setIsSearchOpen(true);
    setThreadSearchQuery(initialSearchQuery);
    setCurrentSearchMatchIndex(0);
  }, [chatId, initialSearchQuery]);

  useEffect(() => {
    if (!isSearchOpen || !chatId) {
      setRemoteSearchResults([]);
      setIsSearchingThread(false);
      return;
    }

    const normalizedQuery = threadSearchQuery.trim();
    if (!normalizedQuery) {
      setRemoteSearchResults([]);
      setIsSearchingThread(false);
      return;
    }

    let cancelled = false;
    const requestId = beginRequest();
    setIsSearchingThread(true);

    const timeoutId = setTimeout(() => {
      void searchMessages(chatId, normalizedQuery, { limit: 20 })
        .then((response) => {
          if (cancelled || !isLatestRequest(requestId)) {
            return;
          }

          setRemoteSearchResults(normalizeMessages(response.items));
        })
        .catch(() => {
          if (cancelled || !isLatestRequest(requestId)) {
            return;
          }

          setRemoteSearchResults([]);
        })
        .finally(() => {
          if (!cancelled && isLatestRequest(requestId)) {
            setIsSearchingThread(false);
          }
        });
    }, THREAD_SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [beginRequest, chatId, isLatestRequest, isSearchOpen, normalizeMessages, threadSearchQuery]);

  return {
    isSearchOpen,
    setIsSearchOpen,
    threadSearchQuery,
    setThreadSearchQuery,
    currentSearchMatchIndex,
    setCurrentSearchMatchIndex,
    remoteSearchResults,
    injectedSearchMessage,
    setInjectedSearchMessage,
    highlightedSearchMessageId,
    setHighlightedSearchMessageId,
    isSearchingThread,
  };
}
