import { memo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { MediaRef, MessageId } from '../../types';

export interface BubbleMediaProps {
  readonly messageId: MessageId;
  readonly media: ReadonlyArray<MediaRef>;
  readonly onOpenMedia?: (messageId: MessageId, mediaIndex: number) => void;
  readonly onToggleAudio?: (messageId: MessageId, mediaIndex: number) => void;
  readonly audioPlaybackState?: {
    phase: 'idle' | 'loading' | 'playing' | 'error';
    errorText?: string;
  };
}

function BubbleMediaComponent({
  messageId,
  media,
  onOpenMedia,
  onToggleAudio,
  audioPlaybackState,
}: BubbleMediaProps) {
  const theme = useTheme();
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const mediaIndex = media.findIndex(
    (item) =>
      (item.type === 'image' || item.type === 'video')
        ? Boolean(item.thumbnailUrl || item.url)
        : item.type === 'audio' || item.type === 'file',
  );
  if (mediaIndex < 0) {
    return null;
  }

  const mediaItem = media[mediaIndex];
  if (!mediaItem) {
    return null;
  }

  const previewUrl = mediaItem.thumbnailUrl ?? mediaItem.url;
  const isVideo = mediaItem.type === 'video';
  const isVisual = mediaItem.type === 'image' || mediaItem.type === 'video';
  if (isVisual && !previewUrl) {
    return null;
  }

  const metadataLabel = formatMediaMetadata(mediaItem);
  const mediaTitle = mediaItem.fileName ?? getDefaultMediaTitle(mediaItem.type);
  const shouldShowOpenAffordance = typeof onOpenMedia === 'function';
  const shouldShowAudioAffordance = mediaItem.type === 'audio' && typeof onToggleAudio === 'function';
  const audioPhase = audioPlaybackState?.phase ?? 'idle';
  const audioErrorText = audioPlaybackState?.errorText;

  const mediaNode = isVisual ? (
    <View>
      {loadState !== 'loaded' ? <View style={[styles.image, styles.skeleton]} /> : null}
      {loadState === 'error' ? (
        <View style={[styles.image, styles.errorPlaceholder]}>
          <Text role="caption" color="textSecondary">
            {isVideo ? 'Unable to load video preview' : 'Unable to load image'}
          </Text>
        </View>
      ) : null}
      <Image
        source={{ uri: previewUrl }}
        style={[styles.image, loadState !== 'loaded' ? styles.hidden : null]}
        resizeMode="cover"
        onLoad={() => setLoadState('loaded')}
        onError={() => setLoadState('error')}
      />
      {isVideo ? (
        <View style={styles.videoPlayOverlay} pointerEvents="none">
          <View style={styles.videoPlayCircle}>
            <Text role="headline" color="textOnAccent">
              ▶
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  ) : (
    <View style={[styles.attachmentCard, { backgroundColor: theme.colors.surfaceInput, borderRadius: theme.radius.md }]}>
      <View style={[styles.attachmentThumb, { backgroundColor: theme.colors.surfaceRaised, borderRadius: theme.radius.sm }]}>
        <Text role="callout" color="text">
          {getAttachmentGlyph(mediaItem.type)}
        </Text>
      </View>
      <View style={styles.attachmentTextGroup}>
        <Text numberOfLines={1} role="callout" color="text">
          {mediaTitle}
        </Text>
        {metadataLabel ? (
          <Text role="caption" color="textSecondary">
            {metadataLabel}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.wrap}>
      {isVisual && typeof onOpenMedia === 'function' ? (
        <Pressable
          accessibilityLabel={isVideo ? 'Open video' : 'Open image'}
          animated={false}
          onPress={(event) => {
            event?.stopPropagation?.();
            onOpenMedia(messageId, mediaIndex);
          }}
          style={styles.pressable}
        >
          {mediaNode}
        </Pressable>
      ) : (
        mediaNode
      )}
      {mediaTitle || metadataLabel || shouldShowOpenAffordance || shouldShowAudioAffordance ? (
        <View style={styles.metadataRow}>
          {isVisual ? <View style={styles.metadataTextGroup}>
            {mediaTitle ? (
              <Text numberOfLines={1} role="footnote" color="text">
                {mediaTitle}
              </Text>
            ) : null}
            {metadataLabel ? (
              <Text role="caption" color="textSecondary">
                {metadataLabel}
              </Text>
            ) : null}
          </View> : <View style={styles.metadataTextGroup} />}
          {shouldShowAudioAffordance ? (
            <Pressable
              accessibilityLabel="Toggle audio"
              animated={false}
              onPress={(event) => {
                event?.stopPropagation?.();
                onToggleAudio?.(messageId, mediaIndex);
              }}
              style={[styles.openButton, { borderColor: theme.colors.border }]}
            >
              <Text role="caption" color="accent">
                {audioPhase === 'loading' ? 'Loading…' : audioPhase === 'playing' ? 'Stop' : 'Play'}
              </Text>
            </Pressable>
          ) : shouldShowOpenAffordance ? (
            <Pressable
              accessibilityLabel={isVideo ? 'Open video' : mediaItem.type === 'file' ? 'Open file' : 'Open image'}
              animated={false}
              onPress={(event) => {
                event?.stopPropagation?.();
                onOpenMedia?.(messageId, mediaIndex);
              }}
              style={[styles.openButton, { borderColor: theme.colors.border }]}
            >
              <Text role="caption" color="accent">
                Open
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {audioErrorText ? (
        <Text role="caption" color="danger">
          {audioErrorText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
  },
  wrap: {
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  metadataRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metadataTextGroup: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  image: {
    borderRadius: 12,
    height: 180,
    width: 220,
  },
  attachmentCard: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    minWidth: 220,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  attachmentThumb: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  attachmentTextGroup: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  openButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  skeleton: {
    backgroundColor: '#E8DECC',
  },
  errorPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#F3ECDF',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  hidden: {
    opacity: 0,
    position: 'absolute',
  },
  videoPlayOverlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  videoPlayCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(16, 13, 9, 0.58)',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
});

function formatMediaMetadata(media: MediaRef) {
  const parts = [] as string[];

  if (typeof media.mimeType === 'string' && media.mimeType.trim().length > 0) {
    parts.push(media.mimeType.trim());
  }

  if (typeof media.size === 'number' && media.size > 0) {
    parts.push(formatBytes(media.size));
  }

  return parts.join(' · ');
}

function getDefaultMediaTitle(type: MediaRef['type']) {
  switch (type) {
    case 'image':
      return 'Photo';
    case 'video':
      return 'Video';
    case 'audio':
      return 'Voice message';
    case 'file':
      return 'File';
  }
}

function getAttachmentGlyph(type: MediaRef['type']) {
  switch (type) {
    case 'image':
      return '◫';
    case 'video':
      return '▶';
    case 'audio':
      return '♪';
    case 'file':
      return '≣';
  }
}

function formatBytes(sizeBytes: number) {
  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0) {
    return '';
  }

  const units = ['B', 'KB', 'MB', 'GB'] as const;
  let value = sizeBytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const precision = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(precision)} ${units[unitIndex]}`;
}

export const BubbleMedia = memo(BubbleMediaComponent);
