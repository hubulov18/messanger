import { apiRequest } from '@shared/api/http-client';

export type ContactListItem = {
  userId: string;
  displayName: string;
  phoneNumber: string | null;
  username: string | null;
  avatarMediaId: string | null;
};

export function importContacts(contacts: Array<{ normalizedHash: string; phoneNumber: string; displayName: string }>) {
  return apiRequest<{ success: true; matchedCount: number }>({
    method: 'POST',
    path: '/contacts/import',
    authenticated: true,
    body: { contacts },
  });
}

export function getContacts() {
  return apiRequest<{ items: ContactListItem[] }>({
    method: 'GET',
    path: '/contacts',
    authenticated: true,
  });
}

export function saveMatchedContact(userId: string) {
  return apiRequest<{ success: boolean; item: ContactListItem | null }>({
    method: 'POST',
    path: '/contacts/matched-users',
    authenticated: true,
    body: { userId },
  });
}
