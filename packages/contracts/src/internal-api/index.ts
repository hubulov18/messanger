export type ChatMembershipProjectionRecordDto = {
  chatId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'invited' | 'requested' | 'banned' | 'left' | 'removed';
  updatedAt: string;
};

export type ChatMembershipListResponseDto = {
  userIds: string[];
};

export type ChatMembershipProjectionResponseDto = {
  userIds: string[];
  items: ChatMembershipProjectionRecordDto[];
  watermark: {
    consumer: string;
    lastEventId: string | null;
    lastOccurredAt: string | null;
    updatedAt: string | null;
  } | null;
};

export type ChatMessageSummaryDto = {
  chatId: string;
  lastMessagePreview: string | null;
  lastActivityAt: string | null;
  lastSenderUserId: string | null;
  unreadCount: number;
};

export type ChatSummaryProjectionRecordDto = {
  chatId: string;
  lastMessageId: string | null;
  lastMessagePreview: string | null;
  lastActivityAt: string | null;
  lastSenderUserId: string | null;
  updatedAt: string;
};

export type ChatSummaryProjectionResponseDto = {
  items: ChatMessageSummaryDto[];
  projectionItems: ChatSummaryProjectionRecordDto[];
  watermark: {
    consumer: string;
    lastEventId: string | null;
    lastOccurredAt: string | null;
    updatedAt: string | null;
  } | null;
};
