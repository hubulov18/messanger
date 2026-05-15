import { Pressable, StyleSheet, Text } from 'react-native';

import { telegramColors } from '@shared/ui/ios/theme';

type SettingsBackButtonProps = {
  onPress: () => void;
};

export function SettingsBackButton({ onPress }: SettingsBackButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>‹</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 44,
    paddingRight: 8,
  },
  text: {
    color: telegramColors.accent,
    fontSize: 22,
    fontWeight: '500',
    includeFontPadding: false,
  },
});
