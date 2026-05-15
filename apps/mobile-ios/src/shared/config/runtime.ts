import { Platform } from 'react-native';

export const APP_VERSION = '0.1.0';

export const clientPlatform: 'ios' | 'android' | 'web' =
  Platform.OS === 'android'
    ? 'android'
    : Platform.OS === 'ios'
      ? 'ios'
      : 'web';
