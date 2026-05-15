# iOS Media Integration

## Goal

Add real Telegram-like media flows to the iOS client without coupling UI screens directly to native pickers or upload transport details.

The integration must keep four responsibilities separate:

1. device media selection
2. local asset normalization
3. media upload orchestration
4. message send using finalized `mediaId`

## Current State

The iOS thread UI already supports attachment-oriented message composition for these kinds:

- `image`
- `video`
- `audio`
- `file`

The current implementation uses prototype local `mediaId` values only so the UI and message contracts are already shaped correctly, but there is no real picker or upload pipeline yet.

## Target Flow

### Image / Video / File

1. User taps `+` in the thread composer.
2. Client opens a native picker for the chosen media type.
3. Picker returns one or more local assets.
4. Client normalizes each asset into a stable internal shape.
5. Client requests an upload session from Media Service.
6. Client uploads bytes to object storage using the session data.
7. Client finalizes the uploaded asset through Media Service.
8. Client sends `POST /v1/messages` referencing the finalized `mediaId`.
9. Thread updates with a real attachment message.

### Voice Note

1. User taps `Voice`.
2. Client requests microphone permission if needed.
3. Client records local audio.
4. Client normalizes recording metadata.
5. Client uploads and finalizes through the same Media Service pipeline.
6. Client sends an `audio` message referencing the finalized `mediaId`.

## Client Boundaries

### 1. Native Picker Boundary

The UI must not import native picker libraries directly.

Create a dedicated adapter layer that exposes:

- `pickImages()`
- `pickVideo()`
- `pickDocument()`
- later: `recordAudio()`

This keeps the rest of the app independent from the exact React Native package.

### 2. Normalized Device Asset Shape

All native picker outputs must be converted into a shared shape before any upload logic runs.

Recommended shape:

```ts
{
  localId: string;
  kind: 'image' | 'video' | 'audio' | 'file';
  uri: string;
  fileName: string | null;
  mimeType: string | null;
  fileSizeBytes: number | null;
}
```

This prevents screen-level code from depending on package-specific asset formats.

### 3. Upload Orchestration Layer

Upload logic should live in a feature service, not inside `ChatThreadScreen`.

Responsibilities:

- request upload session
- perform upload
- finalize upload
- return `mediaId`
- surface typed failure states

### 4. Message Send Layer

Only after upload finalization succeeds should the client call the message API.

That keeps media storage and message persistence cleanly separated, which matches the backend architecture already defined.

## iOS Native Dependencies

Recommended libraries:

- `react-native-image-picker` for photo/video selection
- `react-native-document-picker` for files
- later: audio recording package after recorder requirements are fixed

The current project already uses `react-native-permissions`, so permissions should stay behind dedicated adapters as with contacts.

## Permission Model

### Photos / Video Library

If the chosen picker package requires media-library permission handling, expose it through a dedicated adapter rather than reading permissions directly in screen code.

### Microphone

Voice note recording must have its own permission adapter and not be mixed with contacts or photo permissions.

## Error Model

Keep upload failures distinct from message-send failures.

Suggested categories:

- `picker_cancelled`
- `picker_unavailable`
- `permission_denied`
- `upload_session_failed`
- `upload_transfer_failed`
- `upload_finalize_failed`
- `message_send_failed`

The UI can then display more accurate recovery actions.

## UI Expectations

### Short Term

- keep current attachment tray in thread composer
- use real pickers behind the tray actions
- keep attachment bubble rendering

### Medium Term

- image thumbnail preview
- video preview card
- file icon + filename
- audio message bubble with play state
- progress indicators while uploading

## Implementation Order

1. add media integration contracts in the iOS client
2. add picker adapters with `not implemented` placeholders if needed
3. implement image/video picker integration
4. implement document picker integration
5. scaffold media upload client contracts
6. implement real upload once Media Service endpoints exist
7. wire voice-note recording after microphone flow is designed

## Important Constraint

Do not hide the lack of upload endpoints behind fake success behavior.

Until Media Service upload endpoints are implemented, the iOS client should:

- support architecture and local picker contracts
- support local pending asset state
- avoid claiming that uploaded media is persistent

That keeps the implementation honest and prevents product-facing garbage from forming in the message flow.
