import { skipToken, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../state/queryClient';
import type { User } from '../types';

/**
 * Reads the current user from the query cache.
 *
 * The cache is expected to be seeded at login by the auth flow via
 * `queryClient.setQueryData(queryKeys.currentUser(), user)`. This hook does
 * not own fetching — it only reads — so screens that render before auth
 * finishes must guard on `data === undefined`.
 *
 * `queryFn: skipToken` is the idiomatic v5 signal for "cache-only; never fetch".
 */
export function useCurrentUser(): User | undefined {
  const { data } = useQuery<User>({
    queryKey: queryKeys.currentUser(),
    queryFn: skipToken,
    staleTime: Infinity,
  });
  return data;
}
