import { memo, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../theme/ThemeContext';

/**
 * Avatar primitive.
 *
 * Two shapes only: `circle` for people, `rounded` for chats/bots (simplified
 * from the original 4-shape system). Falls back to initials with a stable
 * hue derived from the name — this makes missing-avatar states feel designed,
 * not broken.
 */

export type AvatarShape = 'circle' | 'rounded';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  readonly name: string;
  readonly imageUrl?: string;
  readonly size?: AvatarSize;
  readonly shape?: AvatarShape;
  /**
   * Override the preset size with an exact pixel value. When set, `size`
   * is still used to pick the typographic role for the initials fallback;
   * the closest preset is chosen automatically when `size` is omitted.
   */
  readonly pixelSize?: number;
}

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 28,
  md: 40,
  lg: 64,
};

const FONT_ROLE: Record<AvatarSize, 'caption' | 'footnote' | 'headline'> = {
  sm: 'caption',
  md: 'footnote',
  lg: 'headline',
};

/** Deterministic hue in [0, 360). FNV-1a-ish over string bytes. */
function hueFromName(name: string): number {
  let hash = 2166136261;
  for (let i = 0; i < name.length; i += 1) {
    hash ^= name.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % 360;
}

/** "Alice Johnson" → "AJ"; "Alice" → "A"; emoji-safe via Array.from. */
function initialsFor(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) return '?';
  const parts = trimmed.split(/\s+/).slice(0, 2);
  return parts
    .map((part) => Array.from(part)[0] ?? '')
    .join('')
    .toUpperCase();
}

/** Pick the closest preset size for font role selection. */
function closestPreset(px: number): AvatarSize {
  if (px <= 34) return 'sm';
  if (px <= 52) return 'md';
  return 'lg';
}

function AvatarComponent({ name, imageUrl, size = 'md', shape = 'circle', pixelSize }: AvatarProps) {
  const theme = useTheme();
  const [imageFailed, setImageFailed] = useState(false);

  // Reset the failure flag whenever the URL changes — a new URL deserves a
  // fresh attempt even if the previous one 404'd.
  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  const px = pixelSize ?? SIZE_PX[size];
  const fontRole = FONT_ROLE[pixelSize !== undefined ? closestPreset(pixelSize) : size];
  const showImage = imageUrl !== undefined && !imageFailed;

  const containerStyle = useMemo(() => {
    const borderRadius = shape === 'circle' ? px / 2 : theme.radius.md;
    const hue = hueFromName(name);
    const isDark = theme.mode === 'dark';
    const backgroundColor = `hsl(${hue}, 45%, ${isDark ? 32 : 78}%)`;
    return [
      styles.container,
      {
        width: px,
        height: px,
        borderRadius,
        backgroundColor,
      },
    ];
  }, [name, px, shape, theme.radius.md, theme.mode]);

  const imageStyle = useMemo(
    () => ({
      width: px,
      height: px,
      borderRadius: shape === 'circle' ? px / 2 : theme.radius.md,
    }),
    [px, shape, theme.radius.md],
  );

  return (
    <View style={containerStyle} accessibilityRole="image" accessibilityLabel={name}>
      {showImage ? (
        <Image
          source={{ uri: imageUrl }}
          style={imageStyle}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Text role={fontRole} color="textOnAccent">
          {initialsFor(name)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export const Avatar = memo(AvatarComponent);
