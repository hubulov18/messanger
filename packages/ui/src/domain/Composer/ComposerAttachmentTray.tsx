import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface ComposerAttachmentActionItem {
  readonly key: string;
  readonly label: string;
  readonly color: string;
}

export interface ComposerAttachmentTrayProps {
  readonly actions: ReadonlyArray<ComposerAttachmentActionItem>;
  readonly onPressAction: (key: string) => void;
}

function ComposerAttachmentTrayComponent({
  actions,
  onPressAction,
}: ComposerAttachmentTrayProps) {
  const theme = useTheme();

  const itemStyle = useMemo(() => {
    return [
      styles.action,
      {
        backgroundColor: theme.colors.surfaceInput,
        borderRadius: theme.radius.pill,
      },
    ];
  }, [theme.colors.surfaceInput, theme.radius.pill]);

  return (
    <View style={styles.row}>
      {actions.map((action) => (
        <View key={action.key}>
          <Pressable
            accessibilityLabel={action.label}
            animated={false}
            onPress={() => onPressAction(action.key)}
            style={itemStyle}
          >
            <View style={[styles.dot, { backgroundColor: action.color }]} />
            <Text role="footnote" color="text">
              {action.label}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
});

export const ComposerAttachmentTray = memo(ComposerAttachmentTrayComponent);
