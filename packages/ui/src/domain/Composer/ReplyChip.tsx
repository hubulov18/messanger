import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { ReplyRef } from '../../types';

/**
 * Compact pill above the Composer showing the reply target (or edit subject).
 * Tapping the dismiss glyph clears the modifier.
 */

export interface ReplyChipProps {
  readonly label: string;
  readonly preview: string;
  readonly onCancel: () => void;
}

function ReplyChipComponent({ label, preview, onCancel }: ReplyChipProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.accentSoft,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <View style={[styles.bar, { backgroundColor: theme.colors.accent }]} />
      <View style={styles.content}>
        <Text role="caption" color="accent" numberOfLines={1}>
          {label}
        </Text>
        <Text role="footnote" color="textSecondary" numberOfLines={1}>
          {preview}
        </Text>
      </View>
      <Pressable
        accessibilityLabel="Cancel reply"
        animated={false}
        onPress={onCancel}
        style={styles.dismiss}
      >
        <Text role="bodyStrong" color="textSecondary">
          ×
        </Text>
      </Pressable>
    </View>
  );
}

/** Convenience: build a ReplyChip from a ReplyRef. */
export function replyChipPropsFor(reply: ReplyRef, onCancel: () => void): ReplyChipProps {
  return {
    label: `Reply to ${reply.senderName}`,
    preview: reply.preview,
    onCancel,
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 8,
    paddingRight: 4,
    marginHorizontal: 12,
    marginTop: 8,
  },
  bar: {
    width: 2,
    alignSelf: 'stretch',
    borderRadius: 1,
    marginRight: 8,
  },
  content: {
    flex: 1,
    flexShrink: 1,
  },
  dismiss: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

export const ReplyChip = memo(ReplyChipComponent);
