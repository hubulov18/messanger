import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface VoiceRecordingBarProps {
  readonly title: string;
  readonly meta: string;
  readonly mode: 'manual' | 'hold';
  readonly onCancel: () => void;
  readonly onStop?: () => void;
}

function VoiceRecordingBarComponent({
  title,
  meta,
  mode,
  onCancel,
  onStop,
}: VoiceRecordingBarProps) {
  const theme = useTheme();

  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {
        backgroundColor: theme.colors.accentSoft,
        borderRadius: theme.radius.lg,
      },
    ];
  }, [theme.colors.accentSoft, theme.radius.lg]);

  return (
    <View style={containerStyle}>
      <View style={[styles.pulse, { backgroundColor: theme.colors.accent }]} />
      <View style={styles.textGroup}>
        <Text role="footnote" color="text">
          {title}
        </Text>
        <Text role="footnote" color="textSecondary">
          {meta}
        </Text>
      </View>
      <Pressable accessibilityLabel="Cancel recording" animated={false} onPress={onCancel} style={styles.action}>
        <Text role="footnote" color="textSecondary">
          Cancel
        </Text>
      </Pressable>
      {mode === 'manual' && onStop ? (
        <Pressable accessibilityLabel="Stop recording" animated={false} onPress={onStop} style={styles.action}>
          <Text role="footnote" color="accent">
            Stop
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pulse: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  textGroup: {
    flex: 1,
    gap: 2,
  },
  action: {
    minHeight: 28,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});

export const VoiceRecordingBar = memo(VoiceRecordingBarComponent);
