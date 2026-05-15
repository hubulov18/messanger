import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { Reaction } from '../../types';

/**
 * Horizontal stack of reaction chips attached to a message.
 * Hidden when there are no reactions.
 *
 * Tap-to-toggle is wired at the parent ChatBubble level; this component
 * is pure presentation.
 */

export interface ReactionStackProps {
  readonly reactions: ReadonlyArray<Reaction>;
  readonly onAccent: boolean;
}

function ReactionStackComponent({ reactions, onAccent }: ReactionStackProps) {
  const theme = useTheme();
  if (reactions.length === 0) return null;

  return (
    <View style={styles.row}>
      {reactions.map((reaction) => {
        const borderColor = reaction.reactedByMe ? theme.colors.accent : theme.colors.border;
        const backgroundColor = onAccent ? theme.colors.surfaceRaised : theme.colors.surface;
        return (
          <View
            key={reaction.emoji}
            style={[
              styles.chip,
              {
                backgroundColor,
                borderColor,
                borderRadius: theme.radius.pill,
              },
            ]}
          >
            <Text role="caption" color="text">
              {`${reaction.emoji} ${reaction.count}`}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
    marginTop: 2,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export const ReactionStack = memo(ReactionStackComponent);
