# mobile-ios

React Native mobile client shared across iOS and Android, still biased toward the iOS implementation details and native integrations.

Keep mobile-specific concerns here:

- navigation
- local persistence
- websocket lifecycle
- push notification integration
- UI and screen composition

Scaffold status:

- workspace package and TypeScript config
- root app bootstrap and providers
- auth/main navigation shells
- shared API/session/config/storage utilities
- feature placeholders for auth, contacts, chats, messages, and profile

Current implemented slices:

- auth bootstrap with refresh-token restore
- sign in via phone number and OTP
- authenticated GET /v1/me profile bootstrap
- authenticated GET /v1/contacts list screen
- native contacts permission and device-contact integration for iOS and Android
- debug-only manual contact import with local phone normalization and SHA-256 hashing
- contacts native adapter contracts and sync state
- batch device-contact import pipeline
- permission-aware contacts gate and settings path
- chat list backed by real chat membership data
- direct-chat creation from matched contacts
- local chat directory for contact-aware direct-chat labels and sender names
- thread screen with message list, send, and read marking

Next step:

- add optimistic send/error UI and better thread message states

## Android status

Android uses the same React Native `src/` tree, navigation, stores, API clients, session restore logic, realtime flow, and screen composition as iOS.

Android-specific wiring currently lives in:

- `android/` Gradle project and app entrypoint
- `src/shared/native/*` platform guards for native modules and permissions
- `AndroidManifest.xml` for runtime permissions

Implemented Android-focused adjustments:

- auth and notification-device registration now report the real platform (`android` vs `ios`)
- contacts permission requests now use `READ_CONTACTS` on Android
- Android manifest declares the runtime permissions required by current shared flows:
  - `READ_CONTACTS`
  - `POST_NOTIFICATIONS`
  - `INTERNET`
  - `WAKE_LOCK`
- Android now has FCM wiring for:
  - standard push token registration
  - closed-app message notifications
  - closed-app incoming call notifications via a high-importance Android notification channel

Known limitations:

- Android push requires a real Firebase setup:
  - `android/app/google-services.json`
  - backend `FCM_SERVICE_ACCOUNT_PATH` or `FCM_SERVICE_ACCOUNT_JSON`
- Android closed-app incoming calls currently use high-priority system notifications, not a separate native telecom/full-screen call implementation
- Android build/runtime verification requires a local Java + Android SDK toolchain and an emulator/device

## Run

From the repo root:

```bash
cd apps/mobile-ios
npm install
npm start
```

In a second terminal, with an Android emulator or device connected:

```bash
cd apps/mobile-ios
npm run android
```

If the backend is running on a different host, update `src/shared/config/env.ts` before launching the app.
