# iOS Client Architecture

## 1. Objective

Define the iOS-first client architecture for the messenger product so implementation stays aligned with the existing backend service boundaries and API contracts.

This document focuses on:

- iOS app module boundaries
- navigation structure
- state ownership
- API client strategy
- session and token handling
- offline and persistence constraints
- MVP screen scope
- implementation order

This is a client architecture document, not a UI spec.

## 2. Principles

The iOS client should follow these rules:

- feature-first structure, not screen dump structure
- domain state separated from presentation state
- API access isolated behind typed client modules
- no direct network calls inside screen components
- auth/session handling centralized
- persistent state kept minimal and explicit
- optimistic UI only where behavior is well-defined
- realtime integration additive, not the source of truth

## 3. Technology Choice

### 3.1 Primary Stack

- React Native
- TypeScript
- iOS-first target

### 3.2 Recommended Supporting Libraries

- navigation: React Navigation
- server state: TanStack Query
- app/session state: Zustand
- secure token storage: react-native-keychain or iOS Keychain wrapper
- lightweight local state persistence: MMKV
- forms: React Hook Form where needed

### 3.3 Why This Stack

This stack matches the backend TypeScript ecosystem while still allowing a clean native-quality app structure.

The important constraint is architectural discipline:

- screens render state
- feature services talk to backend APIs
- session storage is centralized
- websocket lifecycle is owned by one realtime boundary

## 4. Client Boundary

The iOS app should be treated as these layers:

1. app shell
2. feature modules
3. shared infrastructure
4. shared UI system

### 4.1 App Shell Responsibilities

- app bootstrap
- navigation container
- auth restoration
- dependency initialization
- global providers
- app-wide error boundary

### 4.2 Feature Responsibilities

Each feature owns:

- typed API requests/responses used by the feature
- query/mutation hooks
- feature state
- screens and view models
- feature-specific UI components

### 4.3 Shared Infrastructure Responsibilities

- HTTP client
- auth token attachment/refresh
- secure session storage
- environment configuration
- logging hooks
- realtime connection manager
- call coordinator
- native call integration boundary

## 5. Folder Structure

Recommended app structure:

```text
apps/mobile-ios/
  src/
    app/
      bootstrap/
      navigation/
      providers/
    features/
      auth/
      profile/
      contacts/
      chats/
      messages/
      calls/
      settings/
    shared/
      api/
      auth/
      config/
      realtime/
      storage/
      types/
      ui/
      utils/
```

## 6. Feature Modules

## 6.1 Auth

Responsibilities:

- phone number entry
- OTP verification
- token/session restore
- logout
- current session recovery

Key screens:

- phone entry
- OTP verification
- splash/restore gate

Backend dependencies:

- `POST /v1/auth/register`
- `POST /v1/auth/verify-otp`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`
- `GET /v1/auth/sessions`

## 6.2 Profile

Responsibilities:

- current user profile fetch
- profile edit
- avatar update
- username and bio management where supported

Key screens:

- edit profile screen
- profile preview or account summary surfaces

Backend dependencies:

- `GET /v1/me`
- `PATCH /v1/me`

## 6.3 Settings

Responsibilities:

- settings tab shell and grouped navigation
- privacy and security entry points
- session/device management
- notification preferences entry points
- appearance and local app preferences
- data and storage preferences
- help/about screens
- developer settings for local builds
- logout and account-scope destructive actions

Key screens:

- settings home screen
- privacy settings screen
- devices screen
- appearance settings screen
- data and storage screen
- help and about screen
- developer settings screen

Backend dependencies:

- `GET /v1/me`
- `PATCH /v1/me/privacy`
- `GET /v1/auth/sessions`
- `DELETE /v1/auth/sessions/{sessionId}`
- `POST /v1/notifications/devices`

Detailed feature specification:

- see [ios-settings-feature.md](/Users/judyannmartos/Movies/telegram/docs/architecture/ios-settings-feature.md)

## 6.4 Contacts

Responsibilities:

- import hashed contacts
- list matched contacts
- create direct chat from matched contact

Key screens:

- contacts permission gate
- contacts list
- invite/matched contacts section

Backend dependencies:

- `POST /v1/contacts/import`
- `GET /v1/contacts`
- `POST /v1/chats/direct`

Important note:

- raw phone numbers must not be sent to Contacts Service import
- the client hashes normalized numbers locally according to the frozen contract in [api-contracts.md](/Users/judyannmartos/Movies/telegram/docs/architecture/api-contracts.md)

## 6.5 Chats

Responsibilities:

- chat list
- chat details
- direct chat creation entry points
- unread indicators

Key screens:

- chat list/home
- chat details header state

Backend dependencies:

- `GET /v1/chats`
- `GET /v1/chats/{chatId}`
- `POST /v1/chats/direct`
- `POST /v1/chats/group`

## 6.6 Messages

Responsibilities:

- message list
- send message
- edit/delete message
- mark read
- reactions later in MVP+1

Key screens:

- message thread screen
- composer

Backend dependencies:

- `GET /v1/chats/{chatId}/messages`
- `POST /v1/messages`
- `PATCH /v1/messages/{messageId}`
- `DELETE /v1/messages/{messageId}`
- `POST /v1/chats/{chatId}/read`

## 6.7 Calls

Responsibilities:

- outgoing call initiation from direct chat
- incoming call state
- active call controls
- signaling connection lifecycle
- WebRTC peer connection and reconnect bootstrap
- CallKit and PushKit coordination through native bridges

Key screens or surfaces:

- active call overlay
- incoming call banner or handoff surface
- direct chat header call entry point

Backend dependencies:

- `POST /v1/calls`
- `GET /v1/calls/{callId}`
- `POST /v1/calls/{callId}/accept`
- `POST /v1/calls/{callId}/decline`
- `POST /v1/calls/{callId}/end`
- `POST /v1/calls/{callId}/join`
- `POST /v1/notifications/devices`

## 7. Navigation Architecture

Use a root split based on auth state.

### 7.1 Root Flows

- Boot flow
- Auth flow
- Main app flow

### 7.2 Suggested Navigator Structure

```text
RootNavigator
  BootGate
  AuthStack
    PhoneEntryScreen
    OtpVerificationScreen
  AppTabs
    ChatsStack
      ChatListScreen
      ChatThreadScreen
      ChatDetailsScreen
    ContactsStack
      ContactsPermissionScreen
      ContactsListScreen
    SettingsStack
      SettingsHomeScreen
      EditProfileScreen
      PrivacyScreen
      DevicesScreen
      AppearanceSettingsScreen
      DataAndStorageScreen
      HelpAndAboutScreen
      DeveloperSettingsScreen
```

### 7.3 Navigation Rules

- auth screens must not mount app tabs
- thread screen receives `chatId`, not full chat payload as source of truth
- settings should remain separate from main messaging state
- profile editing is a subordinate flow inside the settings stack, not the settings tab root

## 8. State Management

Split state into three categories.

### 8.1 Server State

Use TanStack Query for:

- current user profile
- contacts list
- chat list
- chat details
- message history
- sessions list

Rules:

- queries own cache lifecycle
- mutations invalidate or patch related queries
- query keys must be stable and feature-scoped

Examples:

- `['me']`
- `['contacts']`
- `['chats', 'list']`
- `['chats', chatId]`
- `['messages', chatId]`

### 8.2 Session/App State

Use Zustand for:

- current auth session metadata
- access token in memory
- boot status
- active chat/thread UI state where needed
- connectivity hints if needed

### 8.3 Persistent Local State

Persist only what is necessary:

- refresh token reference or secure token handle in Keychain
- device ID
- last selected account/session metadata if needed
- small UX preferences

Do not persist full chat history in MVP unless offline requirements become explicit.

## 9. API Client Design

## 9.1 HTTP Client

Create one shared HTTP client in `src/shared/api`.

Responsibilities:

- base URL handling
- request ID generation
- auth header injection
- `X-Device-Id` injection
- JSON serialization
- gateway error normalization

### 9.2 Error Model

The client should normalize all gateway responses into a typed shape:

```ts
{
  code: string;
  message: string;
  details?: unknown;
  requestId?: string;
}
```

This matters because the backend already uses `details.reason` for policy-denied flows.

Examples the client must handle explicitly:

- `blocked_by_user_policy`
- `chat_missing`
- `membership_missing`
- `membership_inactive`
- `send_restricted`
- `self_chat_not_allowed`

### 9.3 Service Modules

Recommended client modules:

- `authApi`
- `profileApi`
- `contactsApi`
- `chatsApi`
- `messagesApi`

## 10. Session and Token Handling

## 10.1 Storage Rules

- access token stays in memory
- refresh token or session recovery material goes in Keychain
- device ID is generated once and persisted locally

## 10.2 Boot Flow

On app launch:

1. load persisted device/session state
2. attempt session restoration
3. if restore succeeds, fetch `GET /v1/me`
4. enter app flow
5. if restore fails, clear session and enter auth flow

## 10.3 Refresh Strategy

- refresh on `401` once per request chain
- serialize refresh attempts so parallel requests do not stampede
- if refresh fails, clear session and redirect to auth flow

## 11. Contacts Hashing Contract

The iOS client must implement the same rule as backend/shared package.

Algorithm:

1. trim leading/trailing whitespace
2. remove spaces
3. remove `(` and `)`
4. remove `-`
5. preserve `+` if present
6. compute SHA-256
7. encode digest as lowercase hex

Example:

- raw: `+1 (415) 555-2672`
- normalized: `+14155552672`
- hash: backend-compatible lowercase hex digest

This logic should live in one iOS-side utility, not inside screens.

## 12. Realtime Design

Realtime should be introduced after the initial HTTP slices are stable.

Initial MVP recommendation:

- chat/message reads over HTTP
- message send over HTTP
- realtime disabled or stubbed behind an interface

Then add a `RealtimeManager` responsible for:

- socket lifecycle
- app foreground/background transitions
- reconnect policy
- event dispatch into query invalidation or targeted cache patching

Do not spread websocket code across screens.

## 13. Screen Priority

Build in this order:

1. splash/bootstrap
2. phone entry
3. OTP verification
4. chat list shell
5. thread screen with send/list
6. contacts import/list
7. profile/settings

This order matches the backend slices that already exist.

## 14. MVP UI Scope

Must-have screens:

- splash/auth restore
- phone auth
- OTP verify
- chat list
- direct thread screen
- contacts list/import
- current profile/settings

Deferred:

- group creation UI
- reactions UI
- advanced chat details
- media uploads
- voice/video
- search
- rich notifications

## 15. Integration Sequence

Recommended implementation sequence:

1. app bootstrap and environment config
2. secure session storage and device ID
3. typed HTTP client and error normalization
4. auth flow
5. current user fetch
6. contacts import/list
7. chat list
8. direct chat create
9. message list/send
10. realtime integration

## 16. Risks

Primary client risks:

- mixing server state with component state
- putting fetch logic inside screens
- weak token refresh handling
- inconsistent contact hashing implementation
- thread screen depending on stale navigation payload instead of API state
- introducing websocket logic before basic HTTP correctness is stable

## 17. Next Deliverables

The correct next artifacts are:

1. React Native app scaffold in [apps/mobile-ios](/Users/judyannmartos/Movies/telegram/apps/mobile-ios)
2. client module map and package choices
3. API client/session layer
4. auth slice implementation

The next code step should be scaffolding the React Native iOS-first app structure, not building screens ad hoc.
