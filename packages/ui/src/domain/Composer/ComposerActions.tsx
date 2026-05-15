import { memo, useCallback, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

/**
 * Composer right-side action cluster.
 *
 * Phase 7 scope: send button only. Attachment and voice buttons will hang
 * off this component in M3 without changing the Composer API.
 *
 * The send button stays mounted (not conditionally rendered) and toggles
 * its own disabled/active styling — this avoids layout shift as the user
 * types the first character.
 */

export interface ComposerActionsProps {
  readonly canSend: boolean;
  readonly onSend: () => void;
  readonly onSendPressIn?: () => void;
  readonly isEditing: boolean;
}

function ComposerActionsComponent({ canSend, onSend, onSendPressIn, isEditing }: ComposerActionsProps) {
  const theme = useTheme();
  const pressProgress = useRef(new Animated.Value(0)).current;

  const buttonStyle = useMemo(() => {
    return [
      styles.sendButton,
      {
        backgroundColor: canSend ? theme.colors.accent : theme.colors.border,
        borderRadius: 999,
      },
    ];
  }, [canSend, theme]);

  const animatedStyle = useMemo(() => {
    return {
      opacity: pressProgress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.72] }),
      transform: [{ scale: pressProgress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] }) }],
    };
  }, [pressProgress]);

  const animatePress = useCallback((toValue: 0 | 1) => {
    Animated.timing(pressProgress, {
      toValue,
      duration: toValue === 1 ? 90 : 140,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [pressProgress]);

  const handleResponderGrant = useCallback(() => {
    if (!canSend) {
      return;
    }

    animatePress(1);
    onSendPressIn?.();
  }, [animatePress, canSend, onSendPressIn]);

  const handleResponderRelease = useCallback(() => {
    animatePress(0);
    if (!canSend) {
      return;
    }
    onSend();
  }, [animatePress, canSend, onSend]);

  const handleResponderTerminate = useCallback(() => {
    animatePress(0);
  }, [animatePress]);

  return (
    <View style={styles.row}>
      <Animated.View style={animatedStyle}>
        <View
        accessibilityLabel={isEditing ? 'Save edit' : 'Send message'}
        accessibilityRole="button"
        accessible
        onAccessibilityTap={canSend ? onSend : undefined}
        onMagicTap={canSend ? onSend : undefined}
        onResponderGrant={handleResponderGrant}
        onResponderRelease={handleResponderRelease}
        onResponderTerminate={handleResponderTerminate}
        onStartShouldSetResponder={() => canSend}
        style={buttonStyle}
      >
        <Text role="bodyStrong" color={canSend ? 'textOnAccent' : 'textMuted'}>
          {isEditing ? '✓' : canSend ? '↑' : '🎤'}
        </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ComposerActions = memo(ComposerActionsComponent);
