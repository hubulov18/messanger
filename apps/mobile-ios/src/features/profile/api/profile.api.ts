import { apiRequest } from '@shared/api/http-client';
import type { CurrentUserProfile } from '@shared/auth/session.store';

export type PublicProfile = Pick<CurrentUserProfile, 'id' | 'username' | 'displayName' | 'avatarMediaId'> & {
  bio?: string | null;
  phoneNumber?: string | null;
};

export type BlockedUserListItem = {
  id: string;
  username: string;
  displayName: string;
  avatarMediaId: string | null;
  blockedAt: string;
};

export type ProfilePresence = {
  userId: string;
  canViewLastSeen: boolean;
  lastSeenAt: string | null;
};

export function getCurrentUserProfile() {
  return apiRequest<CurrentUserProfile>({
    method: 'GET',
    path: '/me',
    authenticated: true,
  });
}

export function getProfileByUserId(userId: string) {
  return apiRequest<PublicProfile>({
    method: 'GET',
    path: `/profiles/${userId}`,
    authenticated: true,
  });
}

export function getProfilePresenceByUserId(userId: string) {
  return apiRequest<ProfilePresence>({
    method: 'GET',
    path: `/profiles/${userId}/presence`,
    authenticated: true,
  });
}

export function getProfileByUsername(username: string) {
  return apiRequest<PublicProfile>({
    method: 'GET',
    path: `/users/by-username/${username}`,
    authenticated: true,
  });
}

export function getProfileByPhoneNumber(phoneNumber: string) {
  return apiRequest<PublicProfile>({
    method: 'GET',
    path: `/profiles/by-phone/${encodeURIComponent(phoneNumber)}`,
    authenticated: true,
  });
}

export function updateCurrentUserProfile(params: {
  username?: string;
  displayName: string;
  bio: string | null;
  avatarMediaId?: string | null;
}) {
  return apiRequest<{
    success: true;
    profile: Pick<CurrentUserProfile, 'id' | 'username' | 'displayName' | 'bio' | 'avatarMediaId'>;
  }>({
    method: 'PATCH',
    path: '/me',
    body: {
      ...(params.username !== undefined ? { username: params.username } : {}),
      displayName: params.displayName,
      bio: params.bio,
      ...(params.avatarMediaId !== undefined ? { avatarMediaId: params.avatarMediaId } : {}),
    },
    authenticated: true,
  });
}

export function updateCurrentUserPrivacy(params: CurrentUserProfile['privacy']) {
  return apiRequest<{ success: true }>({
    method: 'PATCH',
    path: '/me/privacy',
    body: params,
    authenticated: true,
  });
}

export function listBlockedUsers() {
  return apiRequest<{
    items: BlockedUserListItem[];
  }>({
    method: 'GET',
    path: '/me/blocks',
    authenticated: true,
  });
}

export function blockUser(targetUserId: string) {
  return apiRequest<{ success: true }>({
    method: 'POST',
    path: `/me/blocks/${targetUserId}`,
    authenticated: true,
  });
}

export function unblockUser(targetUserId: string) {
  return apiRequest<{ success: true }>({
    method: 'DELETE',
    path: `/me/blocks/${targetUserId}`,
    authenticated: true,
  });
}
