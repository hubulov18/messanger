import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from '../../primitives/Surface';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface ThreadFeedbackBarProps {
  readonly message: string;
  readonly tone: 'status' | 'error';
}

function ThreadFeedbackBarComponent({ message, tone }: ThreadFeedbackBarProps) {
  const theme = useTheme();

  const textColor = tone === 'error' ? 'danger' : 'success';
  const style = useMemo(() => {
    return [
      styles.root,
      {
        borderTopColor: theme.colors.border,
      },
    ];
  }, [theme.colors.border]);

  return (
    <Surface radius="none" style={style} variant="canvas">
      <Text align="center" color={textColor} role="caption">
        {message}
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export const ThreadFeedbackBar = memo(ThreadFeedbackBarComponent);
