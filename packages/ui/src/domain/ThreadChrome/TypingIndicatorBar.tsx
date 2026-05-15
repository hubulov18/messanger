import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';

export interface TypingIndicatorBarProps {
  readonly text?: string;
}

function TypingIndicatorBarComponent({ text = 'typing…' }: TypingIndicatorBarProps) {
  return (
    <View style={styles.root}>
      <Text color="textSecondary" role="caption">
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 18,
    paddingVertical: 5,
  },
});

export const TypingIndicatorBar = memo(TypingIndicatorBarComponent);
