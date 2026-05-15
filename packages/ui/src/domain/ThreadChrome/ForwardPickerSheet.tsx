import { memo, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Surface } from '../../primitives/Surface';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface ForwardPickerItem {
  readonly key: string;
  readonly title: string;
  readonly subtitle?: string | undefined;
  readonly disabled?: boolean | undefined;
}

export interface ForwardPickerSheetProps {
  readonly title: string;
  readonly cancelLabel?: string;
  readonly items: ReadonlyArray<ForwardPickerItem>;
  readonly onCancel: () => void;
  readonly onPressItem: (key: string) => void;
}

function ForwardPickerSheetComponent({
  title,
  cancelLabel = 'Cancel',
  items,
  onCancel,
  onPressItem,
}: ForwardPickerSheetProps) {
  const theme = useTheme();

  const overlayStyle = useMemo(() => {
    return [styles.overlay, { backgroundColor: theme.colors.scrim }];
  }, [theme.colors.scrim]);

  return (
    <View style={overlayStyle}>
      <Surface radius="lg" style={styles.sheet} variant="raised">
        <View style={styles.header}>
          <Text role="headline" color="text">
            {title}
          </Text>
          <Pressable accessibilityLabel={cancelLabel} animated={false} onPress={onCancel} style={styles.cancelButton}>
            <Text role="footnote" color="accent">
              {cancelLabel}
            </Text>
          </Pressable>
        </View>
        <ScrollView style={styles.list}>
          {items.map((item) => (
            <View key={item.key}>
              <Pressable
                accessibilityLabel={item.title}
                animated={false}
                onPress={() => onPressItem(item.key)}
                {...(item.disabled !== undefined ? { disabled: item.disabled } : {})}
                style={[styles.row, ...(item.disabled ? [styles.rowDisabled] : [])]}
              >
                <Text numberOfLines={1} role="callout" color="text">
                  {item.title}
                </Text>
                {item.subtitle ? (
                  <Text numberOfLines={1} role="footnote" color="textSecondary">
                    {item.subtitle}
                  </Text>
                ) : null}
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  sheet: {
    maxHeight: '70%',
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  cancelButton: {
    paddingVertical: 4,
  },
  list: {
    maxHeight: 420,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 2,
  },
  rowDisabled: {
    opacity: 0.45,
  },
});

export const ForwardPickerSheet = memo(ForwardPickerSheetComponent);
