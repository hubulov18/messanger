import { NativeModules, Platform } from 'react-native';

type NativeDocumentPreviewModule = {
  present(url: string, title?: string | null): Promise<void>;
  dismiss(): Promise<void>;
};

export class DocumentPreviewUnavailableError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function getDocumentPreviewModule() {
  const nativeModules = NativeModules as {
    DocumentPreviewModule?: NativeDocumentPreviewModule;
  };

  const module = Platform.OS === 'ios' ? nativeModules.DocumentPreviewModule : null;
  if (!module) {
    throw new DocumentPreviewUnavailableError('In-app document preview is unavailable on this build.');
  }

  return module;
}

function toDocumentPreviewError(error: unknown, fallbackMessage: string) {
  const message = error instanceof Error ? error.message : fallbackMessage;
  return new DocumentPreviewUnavailableError(message || fallbackMessage);
}

export function isNativeDocumentPreviewAvailable() {
  try {
    getDocumentPreviewModule();
    return true;
  } catch {
    return false;
  }
}

export const documentPreviewApi = {
  async present(url: string, title?: string | null) {
    try {
      await getDocumentPreviewModule().present(url, title ?? null);
    } catch (error) {
      throw toDocumentPreviewError(error, 'Unable to preview this document.');
    }
  },

  async dismiss() {
    try {
      await getDocumentPreviewModule().dismiss();
    } catch (error) {
      throw toDocumentPreviewError(error, 'Unable to close the document preview.');
    }
  },
};
