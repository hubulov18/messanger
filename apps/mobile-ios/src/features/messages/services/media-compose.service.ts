import {
  createUploadSession,
  finalizeUpload,
  uploadToSignedUrl,
} from '@features/messages/api/media.api';
import {
  deviceMediaPickerApi,
  MediaPickerCancelledError,
  MediaPickerNotImplementedError,
  MediaPickerUnavailableError,
} from '@shared/native/media-picker';
import { voiceRecorderApi } from '@shared/native/voice-recorder';
import type { DeviceMediaAsset } from '@shared/native/media-picker';

export type PendingMediaAttachment = {
  localId: string;
  kind: DeviceMediaAsset['kind'];
  displayName: string;
  mimeType: string | null;
  localUri: string;
  fileSizeBytes: number | null;
  durationMs: number | null;
};

export type PendingAttachmentUploadPhase = 'preparing' | 'uploading' | 'finalizing' | 'ready';

export class MediaUploadNotReadyError extends Error {
  constructor(message = 'Media upload is not implemented yet.') {
    super(message);
  }
}

export {
  MediaPickerCancelledError,
  MediaPickerNotImplementedError,
  MediaPickerUnavailableError,
};

export async function pickPendingMediaAttachments(kind: 'image' | 'video' | 'file' | 'audio') {
  switch (kind) {
    case 'image':
      return (await deviceMediaPickerApi.pickImages()).map(toPendingMediaAttachment);
    case 'video': {
      const asset = await deviceMediaPickerApi.pickVideo();
      return asset ? [toPendingMediaAttachment(asset)] : [];
    }
    case 'file': {
      const asset = await deviceMediaPickerApi.pickDocument();
      return asset ? [toPendingMediaAttachment(asset)] : [];
    }
    case 'audio':
      return [];
    default:
      return [];
  }
}

export async function startVoiceRecording() {
  await voiceRecorderApi.startRecording();
}

export async function stopVoiceRecording() {
  return toPendingMediaAttachment(await voiceRecorderApi.stopRecording());
}

export async function cancelVoiceRecording() {
  await voiceRecorderApi.cancelRecording();
}

/**
 * Retry the S3 PUT upload up to `maxAttempts` times with exponential backoff.
 * Only the actual byte transfer is retried — session creation and finalization
 * are not retried here because they carry server-side state.
 */
async function withUploadRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  baseDelayMs = 800,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise<void>((resolve) =>
          setTimeout(resolve, baseDelayMs * 2 ** (attempt - 1)),
        );
      }
    }
  }

  throw lastError;
}

export async function uploadPendingMediaAttachments(
  attachments: PendingMediaAttachment[],
  options?: {
    onPhaseChange?: (attachment: PendingMediaAttachment, phase: PendingAttachmentUploadPhase) => void;
    onUploadProgress?: (attachment: PendingMediaAttachment, progress: number) => void;
  },
) {
  const uploaded = [] as Array<{ mediaId: string; attachmentType: string }>;

  for (const attachment of attachments) {
    const mimeType = attachment.mimeType ?? fallbackMimeType(attachment.kind);
    const sizeBytes = attachment.fileSizeBytes ?? 1;

    options?.onPhaseChange?.(attachment, 'preparing');
    const uploadSession = await createUploadSession({
      mediaType: toMediaType(attachment.kind),
      fileName: attachment.displayName,
      mimeType,
      sizeBytes,
    });

    options?.onPhaseChange?.(attachment, 'uploading');
    options?.onUploadProgress?.(attachment, 0);
    // Retry the S3 PUT up to 3 times (800 ms → 1.6 s → 3.2 s backoff).
    // Transient network blips are the most common cause of upload failures.
    await withUploadRetry(() =>
      uploadToSignedUrl({
        uploadUrl: uploadSession.upload.uploadUrl,
        method: uploadSession.upload.method,
        headers: uploadSession.upload.headers,
        localUri: attachment.localUri,
        mimeType,
        fileName: attachment.displayName,
        fileSizeBytes: attachment.fileSizeBytes,
        onProgress: (progress) => {
          options?.onUploadProgress?.(attachment, progress);
        },
      }),
    );
    options?.onUploadProgress?.(attachment, 1);

    options?.onPhaseChange?.(attachment, 'finalizing');
    const finalized = await finalizeUpload({
      uploadId: uploadSession.uploadId,
    });

    options?.onPhaseChange?.(attachment, 'ready');
    uploaded.push({
      mediaId: finalized.media.id,
      attachmentType: finalized.media.mediaType,
    });
  }

  return uploaded;
}

export function toPendingMediaAttachment(asset: DeviceMediaAsset): PendingMediaAttachment {
  return {
    localId: asset.localId,
    kind: asset.kind,
    displayName: asset.fileName ?? fallbackDisplayName(asset.kind),
    mimeType: asset.mimeType,
    localUri: asset.uri,
    fileSizeBytes: asset.fileSizeBytes,
    durationMs: typeof asset.durationMs === 'number' ? asset.durationMs : null,
  };
}

function fallbackDisplayName(kind: DeviceMediaAsset['kind']) {
  switch (kind) {
    case 'image':
      return 'Photo';
    case 'video':
      return 'Video';
    case 'audio':
      return 'Voice message';
    case 'file':
    default:
      return 'File';
  }
}

function fallbackMimeType(kind: DeviceMediaAsset['kind']) {
  switch (kind) {
    case 'image':
      return 'image/jpeg';
    case 'video':
      return 'video/mp4';
    case 'audio':
      return 'audio/aac';
    case 'file':
    default:
      return 'application/octet-stream';
  }
}

function toMediaType(kind: DeviceMediaAsset['kind']) {
  return kind;
}
