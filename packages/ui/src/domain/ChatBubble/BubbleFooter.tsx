import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { formatMessageTime } from '../../utils/time';
import { StatusGlyph } from './StatusGlyph';
import type { MessageStatus } from '../../types';

/**
 * Footer row inside a bubble: timestamp (+ optional "edited") + status glyph
 * for self-messages. Laid out once horizontally at the right edge.
 */

export interface BubbleFooterProps {
  readonly createdAt: number;
  readonly editedAt?: number;
  readonly status?: MessageStatus;
  /** True when footer is inside an outgoing (self) bubble. */
  readonly onAccent: boolean;
}

function BubbleFooterComponent({ createdAt, editedAt, status, onAccent }: BubbleFooterProps) {
  const timeLabel = formatMessageTime(createdAt);
  const color = onAccent ? 'textOnAccentSecondary' : 'textSecondary';

  return (
    <View style={styles.row}>
      <Text role="caption" color={color}>
        {editedAt !== undefined ? `edited · ${timeLabel}` : timeLabel}
      </Text>
      {status !== undefined ? (
        <View style={styles.glyphSlot}>
          <StatusGlyph status={status} onAccent={onAccent} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  glyphSlot: {
    marginLeft: 4,
  },
});

export const BubbleFooter = memo(BubbleFooterComponent);
