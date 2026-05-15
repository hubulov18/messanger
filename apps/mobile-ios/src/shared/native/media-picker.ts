import { Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { launchImageLibrary } from 'react-native-image-picker';

export type DeviceMediaKind = 'image' | 'video' | 'audio' | 'file';

export type DeviceMediaAsset = {
  localId: string;
  kind: DeviceMediaKind;
  uri: string;
  fileName: string | null;
  mimeType: string | null;
  fileSizeBytes: number | null;
  durationMs?: number | null;
};

export type DeviceMediaPickerApi = {
  pickImages(): Promise<DeviceMediaAsset[]>;
  pickVideo(): Promise<DeviceMediaAsset | null>;
  pickDocument(): Promise<DeviceMediaAsset | null>;
};

export class MediaPickerNotImplementedError extends Error {
  constructor() {
    super('Native media picker is not implemented yet.');
  }
}

export class MediaPickerCancelledError extends Error {
  constructor() {
    super('Media selection was cancelled.');
  }
}

export class MediaPickerUnavailableError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const deviceMediaPickerApi: DeviceMediaPickerApi = {
  async pickImages() {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
      includeExtra: false,
    });

    if (response.didCancel) {
      throw new MediaPickerCancelledError();
    }

    if (response.errorCode || response.errorMessage) {
      throw new MediaPickerUnavailableError(response.errorMessage ?? response.errorCode ?? 'Unable to open image picker.');
    }

    return (response.assets ?? [])
      .filter(function (asset) {
        return typeof asset.uri === 'string' && asset.uri.length > 0;
      })
      .map(function (asset, index) {
        return {
          localId: buildLocalId('image', index),
          kind: 'image' as const,
          uri: asset.uri as string,
          fileName: asset.fileName ?? null,
          mimeType: asset.type ?? null,
          fileSizeBytes: typeof asset.fileSize === 'number' ? asset.fileSize : null,
          durationMs: null,
        };
      });
  },

  async pickVideo() {
    const response = await launchImageLibrary({
      mediaType: 'video',
      selectionLimit: 1,
      includeExtra: false,
      ...(Platform.OS === 'ios'
        ? {
            formatAsMp4: true,
            assetRepresentationMode: 'compatible' as const,
            videoQuality: 'medium' as const,
          }
        : null),
    });

    if (response.didCancel) {
      throw new MediaPickerCancelledError();
    }

    if (response.errorCode || response.errorMessage) {
      throw new MediaPickerUnavailableError(response.errorMessage ?? response.errorCode ?? 'Unable to open video picker.');
    }

    const asset = response.assets?.[0];
    if (!asset?.uri) {
      return null;
    }
    const durationSeconds = typeof (asset as { duration?: unknown }).duration === 'number'
      ? (asset as { duration: number }).duration
      : null;

    return {
      localId: buildLocalId('video', 0),
      kind: 'video',
      uri: asset.uri,
      fileName: asset.fileName ?? null,
      mimeType: asset.type ?? null,
      fileSizeBytes: typeof asset.fileSize === 'number' ? asset.fileSize : null,
      durationMs: durationSeconds !== null ? Math.round(durationSeconds * 1000) : null,
    };
  },

  async pickDocument() {
    if (Platform.OS === 'android') {
      throw new MediaPickerUnavailableError('Document picker is not available on Android yet.');
    }

    try {
      const documents = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [DocumentPicker.types.allFiles],
      });

      const asset = documents[0];
      if (!asset) {
        return null;
      }

      return {
        localId: buildLocalId('file', 0),
        kind: 'file',
        uri: asset.uri,
        fileName: asset.name ?? null,
        mimeType: asset.type ?? null,
        fileSizeBytes: typeof asset.size === 'number' ? asset.size : null,
        durationMs: null,
      };
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        throw new MediaPickerCancelledError();
      }

      const message = error instanceof Error ? error.message : 'Unable to open document picker.';
      throw new MediaPickerUnavailableError(message);
    }
  },
};

function buildLocalId(kind: DeviceMediaKind, index: number) {
  return kind + '_' + Date.now() + '_' + index;
}
