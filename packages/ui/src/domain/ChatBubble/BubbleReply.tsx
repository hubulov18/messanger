import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { ReplyRef } from '../../types';

/**
 * Quoted reply block that sits at the top of a bubble when replyTo is set.
 * A vertical accent bar + sender name + single-line preview.
 *
 * The bar color is the accent token — on self-bubbles it inverts to
 * textOnAccent so the bar reads correctly against the bubble ground.
 */

export interface BubbleReplyProps {
  readonly reply: ReplyRef;
  readonly onAccent: boolean;
}

function BubbleReplyComponent({ reply, onAccent }: BubbleReplyProps) {
  const theme = useTheme();
  const barColor = onAccent ? theme.colors.textOnAccent : theme.colors.accent;

  return (
    <View style={styles.row}>
      <View style={[styles.bar, { backgroundColor: barColor }]} />
      <View style={styles.content}>
        <Text role="caption" color={onAccent ? 'textOnAccent' : 'accent'} numberOfLines={1}>
          {reply.senderName}
        </Text>
        <Text
          role="footnote"
          color={onAccent ? 'textOnAccent' : 'textSecondary'}
          numberOfLines={1}
        >
          {reply.preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 4,
  },
  bar: {
    width: 2,
    borderRadius: 1,
    marginRight: 8,
  },
  content: {
    flexShrink: 1,
  },
});

export const BubbleReply = memo(BubbleReplyComponent);
