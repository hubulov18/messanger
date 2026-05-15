import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { telegramColors, telegramLayout } from './theme';

type IosSearchFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
};

export function IosSearchField({ value, onChangeText, placeholder, onClear }: IosSearchFieldProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.shell}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder ?? t('common.search')}
        placeholderTextColor={telegramColors.textTertiary}
        style={styles.input}
        value={value}
      />
      {value ? (
        <Pressable hitSlop={6} onPress={onClear ?? (() => onChangeText(''))} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 12,
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 12,
  },
  icon: {
    color: telegramColors.textTertiary,
    fontSize: 15,
    marginRight: 8,
  },
  input: {
    color: telegramColors.textPrimary,
    flex: 1,
    fontSize: 15,
    letterSpacing: -0.2,
    paddingVertical: 10,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    minWidth: 20,
    paddingHorizontal: 2,
  },
  clearText: {
    color: telegramColors.textTertiary,
    fontSize: 16,
    fontWeight: '500',
  },
});
