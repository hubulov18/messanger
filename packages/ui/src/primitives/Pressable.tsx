import { memo, useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable as RNPressable,
  type GestureResponderEvent,
  type PressableProps as RNPressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { duration } from '../theme/tokens';

/**
 * Pressable with subtle scale + opacity feedback.
 *
 * Uses RN's built-in Animated (no Reanimated dependency) — a single Animated.Value
 * drives both scale and opacity. Press-in and press-out are independent timings,
 * so a quick tap still plays the full down+up sequence cleanly.
 *
 * accessibilityLabel is required. Every interactive surface in the app must
 * announce itself to assistive tech.
 */

export interface PressableProps
  extends Omit<RNPressableProps, 'style' | 'accessibilityLabel' | 'children'> {
  readonly accessibilityLabel: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly children?: React.ReactNode;
  /** Disable the scale animation (useful for large list rows where scaling looks odd). */
  readonly animated?: boolean;
}

function PressableComponent({
  accessibilityLabel,
  style,
  children,
  animated = true,
  disabled,
  onPressIn,
  onPressOut,
  ...rest
}: PressableProps) {
  const progress = useRef(new Animated.Value(0)).current;

  const animatedStyle = useMemo(() => {
    if (!animated) return undefined;
    return {
      opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.6] }),
      transform: [
        { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] }) },
      ],
    };
  }, [animated, progress]);

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      if (animated) {
        Animated.timing(progress, {
          toValue: 1,
          duration: duration.fast,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start();
      }
      onPressIn?.(event);
    },
    [animated, progress, onPressIn],
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      if (animated) {
        Animated.timing(progress, {
          toValue: 0,
          duration: duration.base,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start();
      }
      onPressOut?.(event);
    },
    [animated, progress, onPressOut],
  );

  return (
    <Animated.View style={animatedStyle}>
      <RNPressable
        {...rest}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole={rest.accessibilityRole ?? 'button'}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: disabled ?? false }}
        style={style}
      >
        {children}
      </RNPressable>
    </Animated.View>
  );
}

export const Pressable = memo(PressableComponent);
