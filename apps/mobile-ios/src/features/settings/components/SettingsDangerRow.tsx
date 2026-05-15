import { Pressable, StyleSheet, Text, View } from 'react-native';

import { telegramColors, telegramLayout, telegramText } from '@shared/ui/ios/theme';

type SettingsDangerRowProps = {
  title: string;
  onPress: () => void;
};

export function SettingsDangerRow({ title, onPress }: SettingsDangerRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }: { pressed: boolean }) => [styles.row, pressed ? styles.pressed : null]}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>⏻</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: telegramLayout.rowHeight,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pressed: {
    opacity: 0.76,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: telegramColors.destructSoft,
    borderRadius: 9,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  icon: {
    color: telegramColors.destructive,
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    ...telegramText.rowTitle,
    color: telegramColors.destructive,
    fontWeight: '500',
  },
});
