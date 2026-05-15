import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';

function BubbleDeletedLabelComponent() {
  return (
    <View style={styles.wrapper}>
      <Text role="body" color="textMuted">
        Message deleted
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    opacity: 0.8,
  },
});

export const BubbleDeletedLabel = memo(BubbleDeletedLabelComponent);
