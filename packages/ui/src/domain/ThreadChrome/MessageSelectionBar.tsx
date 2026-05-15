import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Surface } from '../../primitives/Surface';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface MessageSelectionReactionItem {
  readonly key: string;
  readonly emoji: string;
  readonly active: boolean;
}

export interface MessageSelectionActionItem {
  readonly key: string;
  readonly label: string;
  readonly tone?: 'default' | 'danger';
}

export interface MessageSelectionBarProps {
  readonly reactions: ReadonlyArray<MessageSelectionReactionItem>;
  readonly actions: ReadonlyArray<MessageSelectionActionItem>;
  readonly onPressReaction: (key: string) => void;
  readonly onPressAction: (key: string) => void;
}

function MessageSelectionBarComponent({
  reactions,
  actions,
  onPressReaction,
  onPressAction,
}: MessageSelectionBarProps) {
  const theme = useTheme();

  return (
    <Surface radius="none" style={styles.root} variant="canvas">
      <View style={styles.reactionRow}>
        {reactions.map((reaction) => (
          <View key={reaction.key}>
            <Pressable
              accessibilityLabel={`React ${reaction.emoji}`}
              animated={false}
              onPress={() => onPressReaction(reaction.key)}
              style={[
                styles.reactionButton,
                {
                  backgroundColor: reaction.active
                    ? theme.colors.accentSoft
                    : theme.colors.surfaceInput,
                  borderRadius: theme.radius.pill,
                },
              ]}
            >
              <Text role="body" color="text">
                {reaction.emoji}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
      <View style={styles.actionsRow}>
        {actions.map((action) => (
          <View key={action.key}>
            <Pressable
              accessibilityLabel={action.label}
              animated={false}
              onPress={() => onPressAction(action.key)}
              style={styles.actionButton}
            >
              <Text role="footnote" color={action.tone === 'danger' ? 'danger' : 'accent'}>
                {action.label}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  reactionRow: {
    flexDirection: 'row',
    gap: 6,
  },
  reactionButton: {
    minWidth: 34,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    minHeight: 28,
    justifyContent: 'center',
  },
});

export const MessageSelectionBar = memo(MessageSelectionBarComponent);
