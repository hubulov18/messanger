import {
  useMutation,
  useQueryClient,
  type QueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { useCallback } from 'react';
import { useApiClient } from '../api/ApiClientContext';
import { queryKeys } from '../state/queryClient';
import type { ChatId, Message, MessageId, MessageMap, ReplyRef, TextMessage } from '../types';
import { clientMessageId } from '../utils/ids';
import { useCurrentUser } from './useCurrentUser';

/**
 * useSendMessage — optimistic send with rollback.
 *
 * Contract:
 *   1. `onMutate` upserts an optimistic TextMessage keyed by clientId with
 *      status='sending'. Id list placement is stable across retries — we move
 *      an existing clientId to position 0 rather than prepending a duplicate.
 *   2. `onSuccess` replaces the optimistic row with the server row, preserving
 *      list position and swapping the id.
 *   3. `onError` flips the optimistic row to status='failed' — we keep it in
 *      the list so the user can see + retry, rather than silently dropping.
 *
 * Idempotency: the mutation is idempotent from the server's perspective via
 * clientId, so retrying a failed send is safe.
 *
 * Websocket coordination: if the host's sync worker pushes the server message
 * before the HTTP response returns, it MUST call `reconcileServerMessage`
 * (exported below) so the optimistic row is removed by clientId match.
 * Otherwise `onSuccess` will overwrite what the worker wrote — correct end
 * state, but a brief flicker where two bubbles render.
 */

export interface SendTextArgs {
  readonly chatId: ChatId;
  readonly body: string;
  readonly replyTo?: ReplyRef;
}

interface MutationVariables {
  readonly clientId: MessageId;
  readonly chatId: ChatId;
  readonly body: string;
  readonly replyTo: ReplyRef | undefined;
}

interface MutationContext {
  readonly chatId: ChatId;
  readonly optimisticId: MessageId;
  readonly previousMap: MessageMap | undefined;
  readonly previousIds: ReadonlyArray<MessageId> | undefined;
}

export interface UseSendMessageResult {
  readonly send: (args: SendTextArgs) => void;
  readonly retry: (clientId: MessageId, chatId: ChatId, body: string, replyTo?: ReplyRef) => void;
  readonly isSending: boolean;
  readonly mutation: UseMutationResult<Message, Error, MutationVariables, MutationContext>;
}

/**
 * Move `id` to the front of `ids`. If `id` is absent, prepend. Pure; returns
 * the same reference when the list is already correct to preserve React
 * equality checks downstream.
 */
function moveToFront(
  ids: ReadonlyArray<MessageId> | undefined,
  id: MessageId,
): ReadonlyArray<MessageId> {
  if (ids === undefined || ids.length === 0) return [id];
  if (ids[0] === id) return ids;
  const filtered = ids.filter((existing) => existing !== id);
  return [id, ...filtered];
}

/**
 * Replace an optimistic row (keyed by clientId) with the server row in both
 * the message map and the id list. Idempotent — safe to call again if the
 * same serverMessage is delivered twice, or if the optimistic row is already
 * gone (e.g. because the sync worker already applied it).
 *
 * Exported for host-side websocket workers: when a pushed message carries
 * a `clientId` echoed from the sender, call this to dedupe against the local
 * optimistic row.
 */
export function reconcileServerMessage(
  queryClient: QueryClient,
  chatId: ChatId,
  clientId: MessageId,
  serverMessage: Message,
): void {
  reconcile(queryClient, chatId, clientId, serverMessage);
}

function reconcile(
  queryClient: QueryClient,
  chatId: ChatId,
  clientId: MessageId,
  serverMessage: Message,
): void {
  const mapKey = queryKeys.messages(chatId);
  const idsKey = queryKeys.messageIds(chatId);
  const serverId = serverMessage.id;

  queryClient.setQueryData<MessageMap>(mapKey, (prev) => {
    if (prev === undefined) return { [serverId]: serverMessage };
    // Drop the optimistic row; write (or overwrite) the server row. If
    // serverId === clientId the drop + write still produces the right map.
    const { [clientId]: _removed, ...rest } = prev;
    return { ...rest, [serverId]: serverMessage };
  });

  queryClient.setQueryData<ReadonlyArray<MessageId>>(idsKey, (prev) => {
    // Build the target: take the previous list, strip any occurrence of the
    // clientId and any prior occurrence of the serverId, and insert serverId
    // at the position the clientId occupied. If the clientId is absent
    // (sync worker beat us), insert serverId at the front if missing.
    if (prev === undefined || prev.length === 0) return [serverId];

    const clientIdx = prev.indexOf(clientId);
    const filtered = prev.filter((id) => id !== clientId && id !== serverId);

    if (clientIdx === -1) {
      // clientId not present. If serverId was already there, keep list stable.
      if (prev.includes(serverId)) return prev;
      return [serverId, ...filtered];
    }

    const next = filtered.slice();
    next.splice(Math.min(clientIdx, next.length), 0, serverId);
    return next;
  });
}

export function useSendMessage(): UseSendMessageResult {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  const mutation = useMutation<Message, Error, MutationVariables, MutationContext>({
    mutationFn: (vars) =>
      apiClient.sendMessage({
        clientId: vars.clientId,
        chatId: vars.chatId,
        body: vars.body,
        ...(vars.replyTo !== undefined ? { replyTo: vars.replyTo } : {}),
      }),

    onMutate: async (vars) => {
      if (currentUser === undefined) {
        throw new Error('Cannot send message before current user is loaded.');
      }

      const mapKey = queryKeys.messages(vars.chatId);
      const idsKey = queryKeys.messageIds(vars.chatId);

      await queryClient.cancelQueries({ queryKey: mapKey });
      await queryClient.cancelQueries({ queryKey: idsKey });

      const previousMap = queryClient.getQueryData<MessageMap>(mapKey);
      const previousIds = queryClient.getQueryData<ReadonlyArray<MessageId>>(idsKey);

      // Preserve the original createdAt on retry so the bubble doesn't jump
      // in time-ordered views. Status is reset to 'sending' in both cases.
      const existing = previousMap?.[vars.clientId];
      const optimistic: TextMessage = {
        id: vars.clientId,
        chatId: vars.chatId,
        senderId: currentUser.id,
        type: 'text',
        body: vars.body,
        createdAt: existing?.type === 'text' ? existing.createdAt : Date.now(),
        status: 'sending',
        reactions: existing?.reactions ?? [],
        ...(vars.replyTo !== undefined ? { replyTo: vars.replyTo } : {}),
      };

      queryClient.setQueryData<MessageMap>(mapKey, (prev) => ({
        ...(prev ?? {}),
        [vars.clientId]: optimistic,
      }));
      queryClient.setQueryData<ReadonlyArray<MessageId>>(idsKey, (prev) =>
        moveToFront(prev, vars.clientId),
      );

      return {
        chatId: vars.chatId,
        optimisticId: vars.clientId,
        previousMap,
        previousIds,
      };
    },

    onSuccess: (serverMessage, _vars, context) => {
      if (context === undefined) return;
      reconcile(queryClient, context.chatId, context.optimisticId, serverMessage);
    },

    onError: (_error, _vars, context) => {
      if (context === undefined) return;
      const mapKey = queryKeys.messages(context.chatId);

      queryClient.setQueryData<MessageMap>(mapKey, (prev) => {
        if (prev === undefined) return prev;
        const existing = prev[context.optimisticId];
        if (existing === undefined) return prev;
        if (existing.status === 'failed') return prev;
        return {
          ...prev,
          [context.optimisticId]: { ...existing, status: 'failed' },
        };
      });
    },
  });

  // Depend on `mutation.mutate` — stable across renders per TanStack v5 —
  // rather than the mutation object itself (fresh reference every render).
  const mutate = mutation.mutate;

  const send = useCallback(
    (args: SendTextArgs) => {
      const trimmed = args.body.trim();
      if (trimmed.length === 0) return;
      mutate({
        clientId: clientMessageId(),
        chatId: args.chatId,
        body: trimmed,
        replyTo: args.replyTo,
      });
    },
    [mutate],
  );

  const retry = useCallback(
    (clientId: MessageId, chatId: ChatId, body: string, replyTo?: ReplyRef) => {
      mutate({ clientId, chatId, body, replyTo });
    },
    [mutate],
  );

  return {
    send,
    retry,
    isSending: mutation.isPending,
    mutation,
  };
}
