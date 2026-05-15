import type { ChatListItem } from './chats.api';
import { apiRequest } from '@shared/api/http-client';

export type SearchProfileResult = {
  id: string;
  username: string;
  displayName: string;
  avatarMediaId: string | null;
};

export type SearchContactResult = {
  userId: string;
  displayName: string;
  phoneNumber: string | null;
  username: string | null;
  avatarMediaId: string | null;
};

export type SearchMessageResult = {
  chatId: string;
  chatTitle: string;
  chatType: string;
  counterpartUserId: string | null;
  counterpartUsername: string | null;
  counterpartAvatarMediaId: string | null;
  message: {
    id: string;
    chatId: string;
    senderUserId: string;
    type: string;
    text: string | null;
    attachments: Array<{ mediaId: string; attachmentType: string }>;
    callEvent?: {
      kind: 'call_event';
      callId: string;
      initiatorUserId: string;
      endedByUserId: string | null;
      outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
      durationSec: number;
    } | null;
    replyToMessageId: string | null;
    forwardedFromMessageId: string | null;
    createdAt: string;
    editedAt: string | null;
    deletedAt: string | null;
    reactions: Array<{ emoji: string; userId: string }>;
    delivery: {
      delivered: boolean;
      seen: boolean;
    };
  };
};

export function searchGlobal(query: string) {
  const params = new URLSearchParams({ q: query });

  return apiRequest<{
    query: string;
    chats: ChatListItem[];
    contacts: SearchContactResult[];
    usernameMatch: SearchProfileResult | null;
    phoneMatch: SearchProfileResult | null;
    messages: SearchMessageResult[];
  }>({
    method: 'GET',
    path: `/search/global?${params.toString()}`,
    authenticated: true,
    timeoutMs: 20000,
  });
}
