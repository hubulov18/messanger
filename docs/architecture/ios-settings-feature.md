# iOS Settings Feature Specification

## 1. Objective

Define the functional scope, navigation model, data ownership, and implementation boundaries for the iOS `Settings` tab.

This document is the canonical reference for future implementation of the settings area.

It focuses on:

- information architecture of the `Settings` tab
- what belongs to `Settings` vs `Profile` vs `Chats`
- screen list and section hierarchy
- backend dependencies already available
- client-side state ownership
- rollout order for implementation

This is a feature specification and architecture note, not a pixel-perfect UI spec.

## 2. Product Role Of Settings

The `Settings` tab is the personal control surface for the currently authenticated user.

It should answer four user needs:

1. understand who is signed in on this device
2. change account and privacy preferences
3. inspect and control device/session state
4. access lower-frequency support and developer actions without polluting chat screens

The tab should not become a dump for unrelated actions.

## 3. Ownership Boundaries

### 3.1 Settings Owns

- current account summary
- profile entry points
- privacy entry points
- session/device management
- notification preferences entry points
- appearance and app preferences
- storage/data usage entry points
- help/about/legal screens
- developer tools visible only in local or internal builds
- logout and destructive account-scope actions

### 3.2 Settings Does Not Own

- editing another user
- chat-specific notification settings
- direct-chat actions
- media viewer preferences embedded inside thread UI
- call controls during an active call
- authentication bootstrap screens

### 3.3 Feature Split

Use this split consistently:

- `profile` feature owns current-user editable identity data
- `settings` feature owns the tab shell, grouping, and settings-specific screens
- `auth` feature owns sessions and logout APIs but `settings` owns the screen entry points
- `notifications` remain backend-owned by Notification Service, but user-facing controls live under `settings`

## 4. Information Architecture

The `Settings` tab should be a stack-based flow under one bottom-tab entry.

Top-level layout:

1. account header
2. primary settings list
3. support and diagnostics list
4. destructive actions footer

Recommended section order:

1. `Account`
2. `Privacy & Security`
3. `Notifications`
4. `Appearance`
5. `Data & Storage`
6. `Devices`
7. `Help`
8. `Developer` (dev builds only)
9. `Danger Zone`

## 5. Screen Inventory

## 5.1 Settings Home

Route:

- `SettingsHomeScreen`

Purpose:

- show current user summary
- present grouped navigation to settings subsections
- show lightweight state such as current phone visibility or active sessions count

Content blocks:

- account card with avatar, display name, username, phone visibility summary
- list rows for each settings group
- current device/session summary
- logout button

## 5.2 Edit Profile

Route:

- `EditProfileScreen`

Purpose:

- edit display name
- edit bio
- update avatar
- later: username editing if backend rules are finalized

Primary data source:

- `GET /v1/me`
- `PATCH /v1/me`

## 5.3 Privacy And Security

Route:

- `PrivacySettingsScreen`

Purpose:

- control who can see last seen
- control who can see phone number
- control who can see profile photo
- entry point to blocked users

Primary data source:

- `GET /v1/me`
- `PATCH /v1/me/privacy`

Rows:

- `Last Seen`
- `Phone Number`
- `Profile Photo`
- `Blocked Users`

## 5.4 Blocked Users

Route:

- `BlockedUsersScreen`

Purpose:

- list blocked users
- unblock from list
- later allow search/add flow if profile search entry exists

Current contract note:

- unblock API exists
- blocked-user list is read from `GET /v1/me/blocks`

Interim implementation rule:

- do not fake blocked-user list data in production code
- render only real blocked users returned by profile service

## 5.5 Notifications

Route:

- `NotificationSettingsScreen`

Purpose:

- define account-level push preferences
- explain that chat-specific mute remains inside chat details

Settings v1:

- `Message Notifications` master toggle
- `Group Notifications` master toggle
- `Show Previews`
- `Sound`
- `Badge Count`

Contract note:

- current backend contract already supports device registration and chat-level notification settings
- account-level notification preferences endpoint is referenced at service level but not yet fully frozen in API contracts

Implementation rule:

- the settings screen may ship in read-only or partial mode until account-level preference API is frozen
- `v1` may use client-side local preferences for `Message Notifications`, `Group Notifications`, `Show Previews`, `Sound`, and `Badge Count`, while preserving the same screen contract for later backend-backed migration

## 5.6 Appearance

Route:

- `AppearanceSettingsScreen`

Purpose:

- app theme selection
- text size scale
- message bubble density later if needed

v1 options:

- `System`
- `Light`
- `Dark`
- `Text Size`

Ownership:

- purely client-side preference storage in MVP

Persistence:

- lightweight local storage only

## 5.7 Data And Storage

Route:

- `DataAndStorageScreen`

Purpose:

- explain media download behavior
- expose cache cleanup and disk usage actions
- expose upload/download behavior later

v1 options:

- `Storage Usage`
- `Clear Cached Media`
- `Auto-Download on Wi-Fi`
- `Auto-Download on Cellular`

Ownership:

- fully client-side in MVP

## 5.8 Devices

Route:

- `DevicesScreen`

Purpose:

- list active sessions/devices
- mark current device
- revoke one remote session
- revoke all other sessions later

Primary data source:

- `GET /v1/auth/sessions`
- `DELETE /v1/auth/sessions/{sessionId}`

Rows:

- current device card
- remote sessions list

## 5.9 Help And About

Route:

- `HelpAndAboutScreen`

Purpose:

- FAQ/help placeholders
- privacy policy
- terms
- app version/build info

Ownership:

- mostly static client content in MVP

## 5.10 Developer Settings

Route:

- `DeveloperSettingsScreen`

Visibility:

- local builds only
- not visible in production builds

Purpose:

- inspect current environment
- copy device id / user id / API host
- toggle debug surfaces
- inspect notification registration state
- inspect call-feature flags
- open test/reset actions used by development

This screen is intentionally separate from end-user settings to avoid leaking internal controls into product UX.

## 5.11 Danger Zone

Embedded section or dedicated screen:

- `DangerZoneScreen`

v1 actions:

- `Log Out`

Deferred actions:

- `Delete Account`
- `Reset Local Cache`

## 6. Navigation Model

Recommended navigator shape:

```text
SettingsStack
  SettingsHomeScreen
  EditProfileScreen
  PrivacySettingsScreen
  BlockedUsersScreen
  NotificationSettingsScreen
  AppearanceSettingsScreen
  DataAndStorageScreen
  DevicesScreen
  HelpAndAboutScreen
  DeveloperSettingsScreen
```

Navigation rules:

- `Settings` tab always lands on `SettingsHomeScreen`
- subsections should be push navigation, not modals, unless a single focused editor is clearly transient
- destructive actions require confirmation sheets
- screens that depend on unfinished backend contracts should exist only behind feature gates or read-only placeholders

## 7. State Ownership

Split state by source of truth.

### 7.1 Server State

Use server-backed state for:

- current profile
- privacy values
- active sessions/devices
- account-level notification preferences once endpoint is frozen

Recommended query keys:

- `['me']`
- `['me', 'privacy']`
- `['auth', 'sessions']`
- `['settings', 'notifications']`

### 7.2 Persistent Client State

Use local persisted state for:

- theme mode
- text size
- cache/download preferences
- developer flags visible only on local builds

### 7.3 Ephemeral UI State

Use local component or feature store state for:

- editor dirty state
- confirmation sheet visibility
- in-flight save indicators
- last action toast/snackbar state

## 8. Backend Dependency Matrix

Already supported by current contracts:

- `GET /v1/me`
- `PATCH /v1/me`
- `PATCH /v1/me/privacy`
- `GET /v1/auth/sessions`
- `DELETE /v1/auth/sessions/{sessionId}`
- `POST /v1/notifications/devices`
- `PATCH /v1/chats/{chatId}/notification-settings`

Missing or not yet frozen for full settings scope:

- `GET /v1/me/blocks`
- account-level notification preferences read endpoint
- account-level notification preferences write endpoint
- optional username update endpoint if separated from `PATCH /v1/me`

Implementation rule:

- settings UI may show rows for planned capabilities, but actions must not silently write to fake local state when the backend source of truth should be authoritative

## 9. Screen-Level Functional Requirements

## 9.1 Settings Home Requirements

- must load current user summary from authoritative session/profile state
- must show clear navigation into subsections
- must not directly own profile editing fields inline in MVP
- must remain fast and mostly static after first load

## 9.2 Devices Requirements

- must clearly label current session
- must require confirmation before revoking another session
- revoking the current session from this screen is out of scope for v1

## 9.3 Privacy Requirements

- values must reflect backend state after save
- unsupported controls must not appear interactive if backend contract is absent

## 9.4 Developer Settings Requirements

- must be hidden outside local/internal builds
- must never contain destructive backend actions without explicit confirmation
- should prioritize observability over mutability

## 10. UX Rules

- `Settings` should feel structurally stable; section order must not jump per user state
- row subtitles should summarize current value when possible
- avoid deep nesting beyond two levels from `SettingsHomeScreen`
- high-frequency actions like chat mute should stay near chats, not in global settings
- end-user settings and developer diagnostics must be visually separated

## 11. Implementation Order

Recommended rollout:

1. `SettingsHomeScreen`
2. `EditProfileScreen`
3. `PrivacySettingsScreen`
4. `DevicesScreen`
5. `AppearanceSettingsScreen`
6. `DataAndStorageScreen`
7. `HelpAndAboutScreen`
8. `DeveloperSettingsScreen`
9. `NotificationSettingsScreen` after endpoint freeze
10. `BlockedUsersScreen` after list endpoint freeze

## 12. Out Of Scope For v1

- premium settings
- sticker/emoji preferences
- language packs and in-app translation
- proxy/network advanced settings
- account deletion
- multi-account switcher
- granular call settings
- wearable / companion device settings

## 13. Acceptance Criteria

The `Settings` feature is considered properly implemented when:

- the bottom tab no longer reuses a generic `ProfileScreen` as the entire settings experience
- settings home is a dedicated feature shell with stable navigation groups
- editable profile data, privacy controls, and device sessions each have separate dedicated screens
- local-only preferences are clearly separated from server-backed settings
- unfinished backend-backed settings are either gated or explicitly read-only
- developer-only controls are hidden from normal product flow
