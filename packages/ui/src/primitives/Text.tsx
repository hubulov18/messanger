import { memo, useMemo } from 'react';
import { StyleSheet, Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { TypographyRole } from '../theme/tokens';

/**
 * Typography primitive.
 *
 * `role` picks a preset from the theme. `color` is semantic — it must be a
 * key of the resolved color palette, not a hex string. This forces every
 * call site through the token system.
 */

type ColorKey = 'text' | 'textSecondary' | 'textMuted' | 'textOnAccent' | 'textOnAccentSecondary' | 'accent' | 'danger' | 'success' | 'warning';

export interface TextProps extends Omit<RNTextProps, 'style' | 'role' | 'numberOfLines'> {
  readonly role?: TypographyRole;
  readonly color?: ColorKey;
  readonly align?: 'left' | 'center' | 'right';
  readonly numberOfLines?: number;
}

function TextComponent({
  role = 'body',
  color = 'text',
  align,
  numberOfLines,
  children,
  ...rest
}: TextProps) {
  const theme = useTheme();
  const preset = theme.typography[role];
  const resolvedColor = theme.colors[color];

  const style = useMemo(() => {
    return [
      styles.base,
      {
        fontFamily: preset.fontFamily,
        fontWeight: preset.fontWeight,
        fontSize: preset.fontSize,
        lineHeight: preset.lineHeight,
        letterSpacing: preset.letterSpacing,
        color: resolvedColor,
        textAlign: align,
      },
    ];
  }, [preset, resolvedColor, align]);

  return (
    <RNText {...rest} style={style} numberOfLines={numberOfLines} allowFontScaling>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  } as const,
});

export const Text = memo(TextComponent);
