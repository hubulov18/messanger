import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, openSettings as openNativeSettings, request } from 'react-native-permissions';

export type DeviceCallPermissionStatus = 'unknown' | 'granted' | 'denied' | 'blocked';

function mapPermissionStatus(status: string): DeviceCallPermissionStatus {
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

function getRequestedPermissions(includeCamera: boolean) {
  if (Platform.OS === 'android') {
    const permissions: string[] = [PERMISSIONS.ANDROID.RECORD_AUDIO];
    if (includeCamera) {
      permissions.push(PERMISSIONS.ANDROID.CAMERA);
    }
    return permissions;
  }

  const permissions: string[] = [PERMISSIONS.IOS.MICROPHONE];
  if (includeCamera) {
    permissions.push(PERMISSIONS.IOS.CAMERA);
  }
  return permissions;
}

async function ensureSinglePermission(permission: string): Promise<DeviceCallPermissionStatus> {
  const currentStatus = mapPermissionStatus(await check(permission as never));
  if (currentStatus === 'granted' || currentStatus === 'blocked') {
    return currentStatus;
  }

  return mapPermissionStatus(await request(permission as never));
}

export const callPermissionsApi = {
  async ensureMediaPermissions(includeCamera: boolean): Promise<void> {
    const permissions = getRequestedPermissions(includeCamera);
    for (const permission of permissions) {
      const status = await ensureSinglePermission(permission);
      if (status === 'denied') {
        throw new Error('Camera or microphone access was denied. Please allow permissions and try again.');
      }
      if (status === 'blocked') {
        throw new Error('Camera or microphone access is blocked. Please allow permissions in Settings and try again.');
      }
    }
  },

  async openSettings() {
    await openNativeSettings('application');
  },
};
