import { Pressable, StyleSheet, Text } from 'react-native';

import { telegramColors, telegramText } from '@shared/ui/ios/theme';

type AuthBackButtonProps = {
  label?: string;
  onPress: () => void;
};

export function AuthBackButton({ label = 'Back', onPress }: AuthBackButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }: { pressed: boolean }) => [styles.button, pressed ? styles.buttonPressed : null]}>
      <Text style={styles.chevron}>‹</Text>
      <Text numberOfLines={1} style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 38,
    minWidth: 44,
    paddingRight: 10,
  },
  buttonPressed: {
    opacity: 0.72,
  },
  chevron: {
    color: telegramColors.accent,
    fontSize: 20,
    fontWeight: '500',
    marginRight: 2,
  },
  text: {
    ...telegramText.secondary,
    color: telegramColors.accent,
    fontWeight: '500',
    includeFontPadding: false,
  },
});
