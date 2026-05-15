import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, openSettings as openNativeSettings, request } from 'react-native-permissions';

export type DeviceContactsPermissionStatus = 'unknown' | 'granted' | 'denied' | 'blocked';

export type DeviceContactsPermissionsApi = {
  getStatus(): Promise<DeviceContactsPermissionStatus>;
  request(): Promise<DeviceContactsPermissionStatus>;
  openSettings(): Promise<void>;
};

function getContactsPermission() {
  if (Platform.OS === 'android') {
    return PERMISSIONS.ANDROID.READ_CONTACTS;
  }

  return PERMISSIONS.IOS.CONTACTS;
}

function mapPermissionStatus(status: string): DeviceContactsPermissionStatus {
  switch (status) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
      return 'granted';
    case RESULTS.DENIED:
      return 'denied';
    case RESULTS.BLOCKED:
    case RESULTS.UNAVAILABLE:
      return 'blocked';
    default:
      return 'unknown';
  }
}

export const contactsPermissionsApi: DeviceContactsPermissionsApi = {
  async getStatus() {
    const status = await check(getContactsPermission());
    return mapPermissionStatus(status);
  },

  async request() {
    const status = await request(getContactsPermission());
    return mapPermissionStatus(status);
  },

  async openSettings() {
    await openNativeSettings('application');
  },
};
