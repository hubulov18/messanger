import { Platform } from 'react-native';

import { apiRequest } from '@shared/api/http-client';

function withTimeout<T>(operation: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(message));
    }, timeoutMs);

    operation
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

export type MediaObject = {
  id: string;
  mediaType: 'image' | 'video' | 'audio' | 'file' | 'avatar';
  mimeType: string;
  sizeBytes: number;
  checksum: string | null;
  processingStatus: string;
  downloadUrl: string;
  createdAt: string;
  processedAt: string | null;
  variants: Array<{
    id: string;
    variantType: string;
    downloadUrl: string;
  }>;
};

export type CreateUploadSessionResponse = {
  uploadId: string;
  mediaId: string;
  upload: {
    method: 'PUT';
    uploadUrl: string;
    headers: Record<string, string>;
  };
  processingStatus: string;
  expiresAt: string;
};

export function createUploadSession(params: {
  mediaType: 'image' | 'video' | 'audio' | 'file' | 'avatar';
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  checksum?: string;
}) {
  return apiRequest<CreateUploadSessionResponse>({
    method: 'POST',
    path: '/media/upload-sessions',
    authenticated: true,
    timeoutMs: 20000,
    body: {
      mediaType: params.mediaType,
      fileName: params.fileName,
      mimeType: params.mimeType,
      sizeBytes: params.sizeBytes,
      ...(params.checksum ? { checksum: params.checksum } : {}),
    },
  });
}

export function finalizeUpload(params: { uploadId: string; checksum?: string }) {
  return apiRequest<{ media: MediaObject }>({
    method: 'POST',
    path: '/media/finalize',
    authenticated: true,
    timeoutMs: 20000,
    body: {
      uploadId: params.uploadId,
      ...(params.checksum ? { checksum: params.checksum } : {}),
    },
  });
}

export async function uploadToSignedUrl(params: {
  uploadUrl: string;
  method: 'PUT';
  headers: Record<string, string>;
  localUri: string;
  mimeType?: string | null;
  fileName?: string | null;
  fileSizeBytes?: number | null;
  onProgress?: (progress: number) => void;
}) {
  if (shouldUseDirectFileUpload(params)) {
    try {
      await withTimeout(uploadFileDirectly(params), 45000, 'Media upload timed out.');
      return;
    } catch (error) {
      if (!shouldFallbackToBlobUpload(params)) {
        throw error;
      }
    }
  }

  const fileResponse = await withTimeout(fetch(params.localUri), 20000, 'Unable to read local media file.');
  if (!fileResponse.ok) {
    throw new Error('Unable to read local media file.');
  }

  const blob = await withTimeout(fileResponse.blob(), 20000, 'Unable to prepare media upload.');
  await withTimeout(uploadBlobToSignedUrl({ ...params, blob }), 45000, 'Media upload timed out.');
}

function shouldUseDirectFileUpload(params: {
  localUri: string;
  mimeType?: string | null;
  fileName?: string | null;
}) {
  if (Platform.OS === 'ios') {
    return false;
  }

  if (!isFileBackedUri(params.localUri)) {
    return false;
  }

  if (typeof params.mimeType === 'string' && params.mimeType.startsWith('video/')) {
    return true;
  }

  const lowerFileName = params.fileName?.toLowerCase() ?? '';
  return (
    lowerFileName.endsWith('.mp4') ||
    lowerFileName.endsWith('.mov') ||
    lowerFileName.endsWith('.m4v') ||
    lowerFileName.endsWith('.avi')
  );
}

function shouldFallbackToBlobUpload(params: {
  localUri: string;
  fileSizeBytes?: number | null;
}) {
  if (isFileBackedUri(params.localUri)) {
    return false;
  }

  const sizeBytes = typeof params.fileSizeBytes === 'number' ? params.fileSizeBytes : null;
  if (sizeBytes === null) {
    return true;
  }

  return sizeBytes <= 20 * 1024 * 1024;
}

function isFileBackedUri(localUri: string) {
  return localUri.startsWith('file://') || localUri.startsWith('content://');
}

function uploadFileDirectly(params: {
  uploadUrl: string;
  method: 'PUT';
  headers: Record<string, string>;
  localUri: string;
  mimeType?: string | null;
  fileName?: string | null;
  onProgress?: (progress: number) => void;
}) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(params.method, params.uploadUrl, true);

    for (const [headerName, headerValue] of Object.entries(params.headers)) {
      xhr.setRequestHeader(headerName, headerValue);
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }

      reject(new Error('Media upload failed.'));
    };

    xhr.onerror = () => {
      reject(new Error('Media upload failed.'));
    };

    xhr.ontimeout = () => {
      reject(new Error('Media upload timed out.'));
    };

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) {
        params.onProgress?.(clampUploadProgress(event.loaded / event.total));
      }
    };

    xhr.timeout = 45000;
    xhr.send({
      uri: params.localUri,
      type: params.mimeType ?? 'application/octet-stream',
      name: params.fileName ?? 'upload',
    } as unknown as Document);
  });
}

function uploadBlobToSignedUrl(params: {
  uploadUrl: string;
  method: 'PUT';
  headers: Record<string, string>;
  blob: Blob;
  onProgress?: (progress: number) => void;
}) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(params.method, params.uploadUrl, true);

    for (const [headerName, headerValue] of Object.entries(params.headers)) {
      xhr.setRequestHeader(headerName, headerValue);
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        params.onProgress?.(1);
        resolve();
        return;
      }

      reject(new Error('Media upload failed.'));
    };

    xhr.onerror = () => {
      reject(new Error('Media upload failed.'));
    };

    xhr.ontimeout = () => {
      reject(new Error('Media upload timed out.'));
    };

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) {
        params.onProgress?.(clampUploadProgress(event.loaded / event.total));
      }
    };

    xhr.timeout = 45000;
    xhr.send(params.blob);
  });
}

function clampUploadProgress(progress: number) {
  if (!Number.isFinite(progress)) {
    return 0;
  }

  return Math.max(0, Math.min(1, progress));
}

export function getMedia(mediaId: string) {
  return apiRequest<MediaObject>({
    method: 'GET',
    path: `/media/${mediaId}`,
    authenticated: true,
    timeoutMs: 15000,
  });
}
