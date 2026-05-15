import { apiRequest } from '@shared/api/http-client';

export type ChatSummary = {
  displayTitle: string;
  subtitle: string;
  secondarySubtitle: string | null;
  counterpartUserId: string | null;
  counterpartUsername: string | null;
  counterpartAvatarMediaId: string | null;
  memberCount: number;
  lastMessagePreview: string | null;
  lastActivityAt: string | null;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  isMuted: boolean;
};

export type ChatListItem = {
  id: string;
  type: string;
  title: string | null;
  summary: ChatSummary;
};

export type ChatDetails = {
  id: string;
  type: string;
  title: string | null;
  description: string | null;
  photoMediaId: string | null;
  permissions: {
    canSendMessages: boolean;
    canAddMembers: boolean;
  };
  memberCount: number;
  summary: ChatSummary;
};

export type ChatMemberListItem = {
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string | null;
  profile: {
    id: string;
    username: string;
    displayName: string;
    avatarMediaId: string | null;
  };
};

export type ChatIdentityUpdatePayload = {
  title?: string;
  description?: string | null;
  photoMediaId?: string | null;
};

export type ChatInviteLinkListItem = {
  id: string;
  inviteUrl: string;
  createdByUserId: string;
  expiresAt: string | null;
  maxUses: number | null;
  usedCount: number;
  revokedAt: string | null;
  createdAt: string;
};

export function getChats() {
  return apiRequest<{ items: ChatListItem[]; nextCursor: string | null }>({
    method: 'GET',
    path: '/chats',
    authenticated: true,
  });
}

export function getChat(chatId: string) {
  return apiRequest<ChatDetails>({
    method: 'GET',
    path: `/chats/${chatId}`,
    authenticated: true,
  });
}

export function getChatMembers(chatId: string) {
  return apiRequest<{ chatId: string; items: ChatMemberListItem[] }>({
    method: 'GET',
    path: `/chats/${chatId}/members`,
    authenticated: true,
  });
}

export function updateChat(chatId: string, params: ChatIdentityUpdatePayload) {
  return apiRequest<{
    success: true;
    chat: {
      id: string;
      type: string;
      title: string | null;
      description: string | null;
      photoMediaId: string | null;
    };
  }>({
    method: 'PATCH',
    path: `/chats/${chatId}`,
    authenticated: true,
    body: params,
  });
}

export function getChatInviteLinks(chatId: string) {
  return apiRequest<{ chatId: string; items: ChatInviteLinkListItem[] }>({
    method: 'GET',
    path: `/chats/${chatId}/invite-links`,
    authenticated: true,
  });
}

export function createChatInviteLink(chatId: string, params?: { maxUses?: number; expiresInDays?: number }) {
  return apiRequest<{ success: true; inviteLink: ChatInviteLinkListItem }>({
    method: 'POST',
    path: `/chats/${chatId}/invite-links`,
    authenticated: true,
    ...(params ? { body: params } : {}),
  });
}

export function revokeChatInviteLink(chatId: string, inviteLinkId: string) {
  return apiRequest<{ success: true; inviteLinkId: string; revoked: boolean }>({
    method: 'DELETE',
    path: `/chats/${chatId}/invite-links/${inviteLinkId}`,
    authenticated: true,
  });
}

export function joinChatByInvite(token: string) {
  return apiRequest<{
    success: true;
    joined: boolean;
    chat: { id: string; type: string; title: string | null };
  }>({
    method: 'POST',
    path: '/chats/join-by-invite',
    authenticated: true,
    body: { token },
  });
}

export function createDirectChat(participantUserId: string) {
  return apiRequest<{ chat: { id: string; type: string; createdAt: string } }>({
    method: 'POST',
    path: '/chats/direct',
    authenticated: true,
    body: { participantUserId },
  });
}

export function createGroupChat(params: { title: string; memberUserIds: string[]; description?: string }) {
  return apiRequest<{ chat: { id: string; type: string; createdAt: string } }>({
    method: 'POST',
    path: '/chats/group',
    authenticated: true,
    body: params,
  });
}

export function createChannelChat(params: { title: string; description?: string }) {
  return apiRequest<{ chat: { id: string; type: string; createdAt: string } }>({
    method: 'POST',
    path: '/chats/channel',
    authenticated: true,
    body: params,
  });
}

export function addChatMembers(chatId: string, userIds: string[]) {
  return apiRequest<{ success: true; addedCount: number }>({
    method: 'POST',
    path: `/chats/${chatId}/members`,
    authenticated: true,
    body: { userIds },
  });
}

export function removeChatMember(chatId: string, userId: string) {
  return apiRequest<{ success: true }>({
    method: 'DELETE',
    path: `/chats/${chatId}/members/${userId}`,
    authenticated: true,
  });
}

export function updateChatPermissions(
  chatId: string,
  params: {
    canSendMessages?: boolean;
    canAddMembers?: boolean;
  },
) {
  return apiRequest<{
    success: true;
    permissions: {
      canSendMessages: boolean;
      canAddMembers: boolean;
    };
  }>({
    method: 'PATCH',
    path: `/chats/${chatId}/permissions`,
    authenticated: true,
    body: params,
  });
}

export function updateChatMemberRole(
  chatId: string,
  userId: string,
  role: 'admin' | 'member',
) {
  return apiRequest<{
    success: true;
    member: {
      chatId: string;
      userId: string;
      role: 'owner' | 'admin' | 'member';
    };
  }>({
    method: 'PATCH',
    path: `/chats/${chatId}/members/${userId}/role`,
    authenticated: true,
    body: { role },
  });
}

export function pinChat(chatId: string) {
  return apiRequest<{ success: true; chatId: string; isPinned: boolean }>({
    method: 'POST',
    path: `/chats/${chatId}/pin`,
    authenticated: true,
  });
}

export function unpinChat(chatId: string) {
  return apiRequest<{ success: true; chatId: string; isPinned: boolean }>({
    method: 'DELETE',
    path: `/chats/${chatId}/pin`,
    authenticated: true,
  });
}

export function archiveChat(chatId: string) {
  return apiRequest<{ success: true; chatId: string; isArchived: boolean }>({
    method: 'POST',
    path: `/chats/${chatId}/archive`,
    authenticated: true,
  });
}

export function unarchiveChat(chatId: string) {
  return apiRequest<{ success: true; chatId: string; isArchived: boolean }>({
    method: 'DELETE',
    path: `/chats/${chatId}/archive`,
    authenticated: true,
  });
}

export function muteChat(chatId: string) {
  return apiRequest<{ success: true; chatId: string; isMuted: boolean }>({
    method: 'POST',
    path: `/chats/${chatId}/mute`,
    authenticated: true,
  });
}

export function unmuteChat(chatId: string) {
  return apiRequest<{ success: true; chatId: string; isMuted: boolean }>({
    method: 'DELETE',
    path: `/chats/${chatId}/mute`,
    authenticated: true,
  });
}

export function deleteChatForSelf(chatId: string) {
  return apiRequest<{ success: true; chatId: string; deleted: boolean }>({
    method: 'DELETE',
    path: `/chats/${chatId}/self`,
    authenticated: true,
  });
}
