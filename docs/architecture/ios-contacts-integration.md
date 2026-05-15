# iOS Contacts Integration

## 1. Objective

Define the iOS contacts integration slice for the React Native client so native address-book access, local hashing, and backend import remain aligned with the existing backend contracts and privacy constraints.

This document focuses on:

- permission lifecycle
- native contacts adapter boundary
- client-owned normalization and hashing
- import batching strategy
- sync state ownership
- UI states and failure modes
- phased implementation order

This is an integration architecture document, not a library installation guide.

## 2. Principles

The contacts integration should follow these rules:

- raw device phone numbers never leave the client
- permission handling is explicit and stateful
- native address-book access is isolated behind one adapter
- imported payloads use the frozen backend hash contract
- sync behavior is resumable and observable
- UI clearly distinguishes permission failure from import failure
- batch import logic is independent from the screen layer

## 3. Scope

### 3.1 In Scope

- iOS contacts permission request flow
- reading native contacts from the device address book
- extracting display names and phone numbers
- local phone normalization
- local SHA-256 hashing
- batching `POST /v1/contacts/import`
- refreshing `GET /v1/contacts`
- last sync status on the client

### 3.2 Out of Scope

- Android contacts integration
- background sync scheduling
- server-side raw phone reconciliation
- contact invitation via SMS or share sheet
- incremental diff sync beyond a simple full re-import pass

## 4. Permission Model

The client should track permission as a first-class state.

### 4.1 Permission States

- `unknown`
- `granted`
- `denied`
- `blocked`

### 4.2 Meaning

- `unknown`: app has not requested permission yet
- `granted`: app can read contacts
- `denied`: user rejected access but the app may ask again depending on iOS behavior
- `blocked`: user must change permission in iOS Settings

### 4.3 UI Expectations

- `unknown`: explain why contacts are useful and show request action
- `granted`: allow sync/import actions immediately
- `denied`: show retry action and short explanation
- `blocked`: show open-settings action and fallback manual path

## 5. Native Boundary

The React Native app should not let screens talk directly to the contacts library.

Introduce one adapter boundary:

- `shared/native/contacts-permissions.ts`
- `shared/native/device-contacts.ts`

### 5.1 Permission Adapter Contract

```ts
export type DeviceContactsPermissionStatus =
  | 'unknown'
  | 'granted'
  | 'denied'
  | 'blocked';

export type DeviceContactsPermissionsApi = {
  getStatus(): Promise<DeviceContactsPermissionStatus>;
  request(): Promise<DeviceContactsPermissionStatus>;
  openSettings(): Promise<void>;
};
```

### 5.2 Device Contacts Adapter Contract

```ts
export type DeviceContactPhone = {
  label: string | null;
  value: string;
};

export type DeviceContact = {
  id: string;
  displayName: string;
  phoneNumbers: DeviceContactPhone[];
};

export type DeviceContactsApi = {
  list(): Promise<DeviceContact[]>;
};
```

This keeps native library choice replaceable.

## 6. Import Pipeline

The import pipeline should be client-owned and deterministic.

### 6.1 Steps

1. read contacts from native adapter
2. flatten contacts to `(displayName, phoneNumber)` pairs
3. normalize phone numbers locally
4. hash normalized phone numbers locally using SHA-256 lowercase hex
5. deduplicate by `normalizedHash`
6. batch `POST /v1/contacts/import`
7. refresh `GET /v1/contacts`
8. persist sync metadata locally

### 6.2 Normalization Contract

The client must reuse the frozen backend rule:

- trim leading/trailing whitespace
- remove spaces, `(`, `)`, and `-`
- preserve the rest, including leading `+`
- compute SHA-256 lowercase hex on the normalized value

This is already implemented in the current scaffold under:

- [contact-hash.ts](/Users/judyannmartos/Movies/telegram/apps/mobile-ios/src/shared/contacts/contact-hash.ts)

## 7. Payload Contract

The import payload must match the backend API contract:

```json
{
  "contacts": [
    {
      "normalizedHash": "sha256-lowercase-hex",
      "displayName": "Alice"
    }
  ]
}
```

Raw phone numbers must not be sent.

## 8. Sync State Ownership

Contacts sync should own lightweight client state only.

### 8.1 Persisted Local State

- last permission status
- last sync timestamp
- last import count
- last matched count
- last sync error code/message

### 8.2 Non-Persisted UI State

- current loading state
- current permission request in progress
- current import in progress
- import progress summary for the current screen

## 9. Batching Strategy

For MVP, use straightforward client batching.

### 9.1 Recommendation

- deduplicate before upload
- batch payloads in chunks of 250 contacts
- execute sequentially, not in parallel
- abort on authentication failure
- continue with surfaced partial failure for transient batch errors only if explicitly designed later

### 9.2 Why

This keeps retry and error handling simple while staying well under likely gateway/service limits.

## 10. UI Flow

### 10.1 First-Time Flow

1. user opens Contacts tab
2. app checks permission status
3. if not granted, app shows permission gate
4. user grants access
5. app reads native contacts
6. app imports hashed batches
7. app refreshes matched contacts list

### 10.2 Returning Flow

1. user opens Contacts tab
2. app loads cached sync metadata
3. if permission is granted, user can trigger refresh
4. app re-runs import pipeline
5. matched contacts list refreshes

## 11. Failure Modes

The client should distinguish these categories:

- permission denied
- permission blocked
- native contacts read failure
- local normalization/hashing failure
- auth failure from gateway
- contacts import validation failure
- partial batch failure
- matched contacts refresh failure

Each category should map to a clear UI message and retry behavior.

## 12. Recommended Libraries

Once the native shell is introduced, the likely implementation choices are:

- permissions: `react-native-permissions`
- native contacts access: `react-native-contacts`

These should be wrapped behind the adapter contracts in this document rather than imported directly into feature screens.

## 13. Implementation Order

### Phase 1

- define TS contracts for permission and device contacts adapters
- keep current dev import path available
- add sync-state model in client code

### Phase 2

- add iOS permission adapter
- add iOS device contacts adapter
- wire real import pipeline behind one feature service

### Phase 3

- replace manual dev import UI with permission gate and sync action
- keep hidden/internal dev import only if still needed for debugging

### Phase 4

- improve UX with sync metadata, progress copy, and retry states

## 14. Resulting Client Modules

Recommended additions under `apps/mobile-ios/src`:

```text
features/contacts/
  api/
  services/
  state/
  screens/
shared/native/
  contacts-permissions.ts
  device-contacts.ts
shared/contacts/
  contact-hash.ts
  contacts-import.ts
```

The screen should remain thin. The import orchestration should live in a feature service, not inside the component.
