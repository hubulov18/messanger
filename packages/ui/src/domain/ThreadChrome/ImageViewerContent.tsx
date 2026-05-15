import { memo, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Surface } from '../../primitives/Surface';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface ImageViewerContentProps {
  readonly title: string;
  readonly meta: string;
  readonly imageUrl: string;
  readonly caption?: string | undefined;
  readonly canGoPrev?: boolean | undefined;
  readonly canGoNext?: boolean | undefined;
  readonly onPressClose: () => void;
  readonly onPressPrev?: (() => void) | undefined;
  readonly onPressNext?: (() => void) | undefined;
}

function ImageViewerContentComponent({
  title,
  meta,
  imageUrl,
  caption,
  canGoPrev = false,
  canGoNext = false,
  onPressClose,
  onPressPrev,
  onPressNext,
}: ImageViewerContentProps) {
  const theme = useTheme();

  const overlayStyle = useMemo(() => {
    return [styles.overlay, { backgroundColor: theme.colors.scrim }];
  }, [theme.colors.scrim]);

  const navButtonStyle = useMemo(() => {
    return {
      backgroundColor: theme.colors.surfaceRaised,
      borderRadius: theme.radius.pill,
    };
  }, [theme.colors.surfaceRaised, theme.radius.pill]);

  return (
    <View style={overlayStyle}>
      <View style={styles.header}>
        <View style={styles.metaGroup}>
          <Text numberOfLines={1} color="textOnAccent" role="headline">
            {title}
          </Text>
          <Text numberOfLines={1} color="textOnAccent" role="footnote">
            {meta}
          </Text>
        </View>
        <Pressable accessibilityLabel="Close image viewer" animated={false} onPress={onPressClose} style={styles.closeButton}>
          <Text color="textOnAccent" role="callout">
            Close
          </Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        {onPressPrev ? (
          <Pressable
            accessibilityLabel="Previous image"
            animated={false}
            disabled={!canGoPrev}
            onPress={onPressPrev}
            style={[styles.navButton, navButtonStyle, ...(!canGoPrev ? [styles.navButtonDisabled] : [])]}
          >
            <Text color="text" role="footnote">
              Prev
            </Text>
          </Pressable>
        ) : null}
        <View style={styles.imageWrap}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          {caption && caption.trim().length > 0 ? (
            <Surface radius="md" style={styles.captionCard} variant="raised">
              <Text color="text" role="footnote">
                {caption}
              </Text>
            </Surface>
          ) : null}
        </View>
        {onPressNext ? (
          <Pressable
            accessibilityLabel="Next image"
            animated={false}
            disabled={!canGoNext}
            onPress={onPressNext}
            style={[styles.navButton, navButtonStyle, ...(!canGoNext ? [styles.navButtonDisabled] : [])]}
          >
            <Text color="text" role="footnote">
              Next
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    paddingTop: 8,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  metaGroup: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  closeButton: {
    minHeight: 32,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  navButtonDisabled: {
    opacity: 0.35,
  },
  imageWrap: {
    flex: 1,
    minHeight: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '82%',
  },
  captionCard: {
    marginTop: 12,
    maxWidth: '100%',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export const ImageViewerContent = memo(ImageViewerContentComponent);
