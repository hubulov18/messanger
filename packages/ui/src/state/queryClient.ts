import { QueryClient } from '@tanstack/react-query';
import type { ChatId, UserId } from '../types';

/**
 * QueryClient factory and key registry.
 *
 * Queries intentionally do not retry on auth failures — those must bubble up
 * so the host can trigger re-auth. Stale time is short so bubbles reflect
 * real delivery state promptly; long gcTime preserves scrollback caches.
 */

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (isAuthError(error)) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

function isAuthError(error: unknown): boolean {
  if (error === null || typeof error !== 'object') return false;
  const status = (error as { status?: unknown }).status;
  return status === 401 || status === 403;
}

/**
 * Query key factory. Keys are tuples so TanStack can do structural matching
 * for cancelQueries / invalidateQueries by prefix.
 */
export const queryKeys = {
  all: ['app'] as const,
  currentUser: () => [...queryKeys.all, 'currentUser'] as const,
  user: (userId: UserId) => [...queryKeys.all, 'user', userId] as const,
  messages: (chatId: ChatId) => [...queryKeys.all, 'messages', chatId] as const,
  messageIds: (chatId: ChatId) => [...queryKeys.all, 'messageIds', chatId] as const,
} as const;
