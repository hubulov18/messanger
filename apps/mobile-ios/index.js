import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';

// ── DEBUG: log full stack for every unhandled promise rejection ───────────────
// Piggy-backs on the same rejection-tracking module RN dev mode already uses.
// Safe to ship in dev builds; has no effect in production.
if (__DEV__) {
  const originalHandler = global.ErrorUtils.getGlobalHandler();
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('[RN GlobalError]', error?.stack ?? String(error));
    originalHandler(error, isFatal);
  });
}

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  if (__DEV__) {
    console.log('[push] background message received', {
      messageId: remoteMessage.messageId ?? null,
      data: remoteMessage.data ?? null,
    });
  }
});

AppRegistry.registerComponent(appName, () => App);
