import { skipToken, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../state/queryClient';
import type { ChatId, Message, MessageId, MessageMap } from '../types';

/**
 * Selector-based subscription to a single message.
 *
 * The chat's full message map lives under one query key, but `select` narrows
 * the subscription so a component only re-renders when *this* message's
 * reference changes. This is what lets ChatBubble stay ~free during scroll
 * when other messages update (delivery receipts, reactions, typing).
 *
 * `queryFn: skipToken` — the map is populated by the messages fetcher elsewhere
 * (chat screen / sync worker). This hook is purely read-side.
 */
export function useMessage(chatId: ChatId, messageId: MessageId): Message | undefined {
  const { data } = useQuery<MessageMap, Error, Message | undefined>({
    queryKey: queryKeys.messages(chatId),
    queryFn: skipToken,
    staleTime: Infinity,
    select: (map) => map[messageId],
  });
  return data;
}
