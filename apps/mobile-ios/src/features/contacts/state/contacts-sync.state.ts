import { create } from 'zustand';

import type { DeviceContactsPermissionStatus } from '@shared/native/contacts-permissions';

type ContactsSyncSnapshot = {
  permissionStatus: DeviceContactsPermissionStatus;
  lastSyncedAt: string | null;
  lastImportedCount: number | null;
  lastMatchedCount: number | null;
  lastErrorMessage: string | null;
};

type ContactsSyncState = ContactsSyncSnapshot & {
  setPermissionStatus: (status: DeviceContactsPermissionStatus) => void;
  setLastSyncResult: (params: {
    importedCount: number;
    matchedCount: number;
    syncedAt: string;
  }) => void;
  setLastErrorMessage: (message: string | null) => void;
};

export const useContactsSyncState = create<ContactsSyncState>((set) => ({
  permissionStatus: 'unknown',
  lastSyncedAt: null,
  lastImportedCount: null,
  lastMatchedCount: null,
  lastErrorMessage: null,
  setPermissionStatus: (permissionStatus) => set({ permissionStatus }),
  setLastSyncResult: ({ importedCount, matchedCount, syncedAt }) =>
    set({
      lastImportedCount: importedCount,
      lastMatchedCount: matchedCount,
      lastSyncedAt: syncedAt,
      lastErrorMessage: null,
    }),
  setLastErrorMessage: (lastErrorMessage) => set({ lastErrorMessage }),
}));
