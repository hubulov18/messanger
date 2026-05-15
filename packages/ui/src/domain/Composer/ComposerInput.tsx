import { forwardRef, memo, useMemo } from 'react';
import { StyleSheet, TextInput, type TextInput as RNTextInput } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

/**
 * Composer text input.
 *
 * Multiline with a soft cap on visual height (~5 lines) after which it
 * scrolls internally. maxLength is a defensive guard — the server enforces
 * the real limit, this is just UX.
 */

export interface ComposerInputProps {
  readonly value: string;
  readonly onChangeText: (next: string) => void;
  readonly onFocus?: (() => void) | undefined;
  readonly onBlur?: (() => void) | undefined;
  readonly placeholder?: string;
  readonly maxLength?: number;
  readonly accessibilityLabel?: string;
}

const MAX_HEIGHT = 120;
const DEFAULT_MAX_LENGTH = 8192;

const ComposerInputComponent = forwardRef<RNTextInput, ComposerInputProps>(function ComposerInput(
  {
    value,
    onChangeText,
    onFocus,
    onBlur,
    placeholder = 'Message',
    maxLength = DEFAULT_MAX_LENGTH,
    accessibilityLabel = 'Message input',
  },
  ref,
) {
  const theme = useTheme();

  const inputStyle = useMemo(() => {
    return [
      styles.input,
      {
        color: theme.colors.text,
        fontFamily: theme.typography.body.fontFamily,
        fontSize: theme.typography.body.fontSize,
        lineHeight: theme.typography.body.lineHeight,
        maxHeight: MAX_HEIGHT,
      },
    ];
  }, [theme]);

  return (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => {
        onFocus?.();
      }}
      onBlur={() => {
        onBlur?.();
      }}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textMuted}
      blurOnSubmit={false}
      multiline
      rejectResponderTermination={false}
      scrollEnabled
      textAlignVertical="center"
      maxLength={maxLength}
      accessibilityLabel={accessibilityLabel}
      style={inputStyle}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 0,
    includeFontPadding: false,
  },
});

export const ComposerInput = memo(ComposerInputComponent);
