import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';

export interface BubbleSenderLabelProps {
  readonly senderLabel: string;
}

function BubbleSenderLabelComponent({ senderLabel }: BubbleSenderLabelProps) {
  const trimmedLabel = senderLabel.trim();
  if (!trimmedLabel) {
    return null;
  }

  return (
    <View style={styles.row}>
      <Text role="caption" color="accent" numberOfLines={1}>
        {trimmedLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 1,
  },
});

export const BubbleSenderLabel = memo(BubbleSenderLabelComponent);
