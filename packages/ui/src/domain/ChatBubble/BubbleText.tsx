import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';

/**
 * Body text inside a bubble. Deliberately plain in Phase 7 — link detection,
 * mentions, and markdown arrive in M2 alongside the parser package.
 *
 * A single <Text> block preserves native text selection and copy semantics.
 */

export interface BubbleTextProps {
  readonly body: string;
  readonly onAccent: boolean;
}

function BubbleTextComponent({ body, onAccent }: BubbleTextProps) {
  return (
    <View style={styles.wrapper}>
      <Text role="body" color={onAccent ? 'textOnAccent' : 'text'}>
        {body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});

export const BubbleText = memo(BubbleTextComponent);
