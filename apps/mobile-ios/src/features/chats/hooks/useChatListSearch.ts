import { useEffect, useState } from 'react';

import type { ChatListItem } from '@features/chats/api/chats.api';
import type { MessageListItem } from '@features/messages/api/messages.api';
import { searchMessages } from '@features/messages/api/messages.api';
import { getProfileByUsername } from '@features/profile/api/profile.api';
import type { ApiError } from '@shared/api/types';
import { useLatestRequestGuard } from '@shared/hooks/useLatestRequestGuard';

const USERNAME_SEARCH_DEBOUNCE_MS = 350;
const GLOBAL_MESSAGE_SEARCH_DEBOUNCE_MS = 320;
const GLOBAL_MESSAGE_SEARCH_CHAT_LIMIT = 6;
const GLOBAL_MESSAGE_RESULTS_LIMIT = 8;

export type UsernameLookupResult = {
  id: string;
  username: string;
  displayName: string;
  avatarMediaId: string | null;
};

export type GlobalMessageSearchResult = {
  chatId: string;
  chatTitle: string;
  chatType: string;
  counterpartUserId: string | null;
  counterpartUsername: string | null;
  counterpartAvatarMediaId: string | null;
  message: MessageListItem;
};

export function useChatListSearch(searchQuery: string, chats: ChatListItem[]) {
  const { beginRequest: beginUsernameRequest, isLatestRequest: isLatestUsernameRequest } = useLatestRequestGuard();
  const { beginRequest: beginGlobalSearchRequest, isLatestRequest: isLatestGlobalSearchRequest } = useLatestRequestGuard();
  const [usernameLookupResult, setUsernameLookupResult] = useState<UsernameLookupResult | null>(null);
  const [isSearchingByUsername, setIsSearchingByUsername] = useState(false);
  const [usernameLookupError, setUsernameLookupError] = useState<string | null>(null);
  const [globalMessageResults, setGlobalMessageResults] = useState<GlobalMessageSearchResult[]>([]);
  const [isSearchingMessages, setIsSearchingMessages] = useState(false);

  useEffect(() => {
    const usernameQuery = normalizeUsernameQuery(searchQuery);

    if (!usernameQuery) {
      setUsernameLookupResult(null);
      setUsernameLookupError(null);
      setIsSearchingByUsername(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const requestId = beginUsernameRequest();
      setIsSearchingByUsername(true);
      setUsernameLookupError(null);

      void getProfileByUsername(usernameQuery)
        .then((profile) => {
          if (!isLatestUsernameRequest(requestId)) {
            return;
          }

          setUsernameLookupResult(profile);
        })
        .catch((error) => {
          if (!isLatestUsernameRequest(requestId)) {
            return;
          }

          const apiError = error as ApiError;
          if (apiError.code === 'NOT_FOUND' || apiError.message === 'Profile not found') {
            setUsernameLookupResult(null);
            setUsernameLookupError('No Telegram account matched this username.');
            return;
          }

          setUsernameLookupResult(null);
          setUsernameLookupError(
            typeof apiError.message === 'string' ? apiError.message : 'Unable to search by username',
          );
        })
        .finally(() => {
          if (!isLatestUsernameRequest(requestId)) {
            return;
          }

          setIsSearchingByUsername(false);
        });
    }, USERNAME_SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [beginUsernameRequest, isLatestUsernameRequest, searchQuery]);

  useEffect(() => {
    const normalizedQuery = searchQuery.trim();

    if (normalizedQuery.length < 2) {
      setGlobalMessageResults([]);
      setIsSearchingMessages(false);
      return;
    }

    const candidateChats = [...chats]
      .sort(compareChatsByActivityDesc)
      .slice(0, GLOBAL_MESSAGE_SEARCH_CHAT_LIMIT);

    if (candidateChats.length === 0) {
      setGlobalMessageResults([]);
      setIsSearchingMessages(false);
      return;
    }

    let cancelled = false;
    const requestId = beginGlobalSearchRequest();
    setIsSearchingMessages(true);

    const timeoutId = setTimeout(() => {
      void Promise.all(
        candidateChats.map(async (chat) => {
          try {
            const response = await searchMessages(chat.id, normalizedQuery, { limit: 3 });
            return response.items.map((message) => ({
              chatId: chat.id,
              chatTitle: chat.summary.displayTitle,
              chatType: chat.type,
              counterpartUserId: chat.summary.counterpartUserId,
              counterpartUsername: chat.summary.counterpartUsername,
              counterpartAvatarMediaId: chat.summary.counterpartAvatarMediaId,
              message,
            }));
          } catch {
            return [];
          }
        }),
      )
        .then((results) => {
          if (cancelled || !isLatestGlobalSearchRequest(requestId)) {
            return;
          }

          const flattened = results
            .flat()
            .sort((left, right) => new Date(right.message.createdAt).getTime() - new Date(left.message.createdAt).getTime())
            .slice(0, GLOBAL_MESSAGE_RESULTS_LIMIT);

          setGlobalMessageResults(flattened);
        })
        .finally(() => {
          if (!cancelled && isLatestGlobalSearchRequest(requestId)) {
            setIsSearchingMessages(false);
          }
        });
    }, GLOBAL_MESSAGE_SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [beginGlobalSearchRequest, chats, isLatestGlobalSearchRequest, searchQuery]);

  return {
    usernameLookupResult,
    isSearchingByUsername,
    usernameLookupError,
    globalMessageResults,
    isSearchingMessages,
  };
}

function compareChatsByActivityDesc(left: ChatListItem, right: ChatListItem) {
  const leftTimestamp = Date.parse(left.summary.lastActivityAt ?? '');
  const rightTimestamp = Date.parse(right.summary.lastActivityAt ?? '');

  if (Number.isNaN(leftTimestamp) && Number.isNaN(rightTimestamp)) {
    return left.summary.displayTitle.localeCompare(right.summary.displayTitle);
  }

  if (Number.isNaN(leftTimestamp)) {
    return 1;
  }

  if (Number.isNaN(rightTimestamp)) {
    return -1;
  }

  return rightTimestamp - leftTimestamp;
}

function normalizeUsernameQuery(query: string) {
  return query.trim().replace(/^@+/, '').toLowerCase();
}
