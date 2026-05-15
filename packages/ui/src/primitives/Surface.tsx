import { memo, useMemo, type PropsWithChildren } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { RadiusToken } from '../theme/tokens';

/**
 * Surface primitive.
 *
 * Variants map to semantic background tokens and elevation presets. Direct
 * color / shadow overrides are deliberately not supported — bypass with a
 * plain <View> only when you're building a brand-new primitive.
 */

export type SurfaceVariant = 'canvas' | 'raised' | 'input' | 'floating';

export interface SurfaceProps {
  readonly variant?: SurfaceVariant;
  readonly radius?: RadiusToken;
  readonly style?: StyleProp<ViewStyle>;
}

const ELEVATION_FOR_VARIANT: Record<SurfaceVariant, 'flat' | 'raised' | 'floating'> = {
  canvas: 'flat',
  raised: 'raised',
  input: 'flat',
  floating: 'floating',
};

function SurfaceComponent({
  variant = 'canvas',
  radius = 'none',
  style,
  children,
}: PropsWithChildren<SurfaceProps>) {
  const theme = useTheme();

  const resolvedStyle = useMemo(() => {
    const backgroundColor =
      variant === 'raised' || variant === 'floating'
        ? theme.colors.surfaceRaised
        : variant === 'input'
          ? theme.colors.surfaceInput
          : theme.colors.surface;

    const el = theme.elevation[ELEVATION_FOR_VARIANT[variant]];

    return {
      backgroundColor,
      borderRadius: theme.radius[radius],
      shadowColor: el.shadowColor,
      shadowOpacity: el.shadowOpacity,
      shadowRadius: el.shadowRadius,
      shadowOffset: { width: 0, height: el.shadowOffsetY },
      elevation: el.elevation,
    };
  }, [variant, radius, theme]);

  return <View style={[styles.base, resolvedStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {},
});

export const Surface = memo(SurfaceComponent);
