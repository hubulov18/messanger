import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { telegramColors } from '@shared/ui/ios/theme';

type SettingsToggleRowProps = {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  glyphText: string;
  glyphBackgroundColor: string;
  glyphTextColor: string;
};

export function SettingsToggleRow({
  title,
  subtitle,
  value,
  onValueChange,
  glyphText,
  glyphBackgroundColor,
  glyphTextColor,
}: SettingsToggleRowProps) {
  const { t } = useTranslation();

  return (
    <Pressable onPress={() => onValueChange(!value)} style={styles.row}>
      <View style={[styles.glyph, { backgroundColor: glyphBackgroundColor }]}>
        <Text style={[styles.glyphText, { color: glyphTextColor }]}>{glyphText}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={[styles.toggleValue, value ? styles.toggleValueOn : null]}>
        {value ? t('common.on') : t('common.off')}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 58,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  glyph: {
    alignItems: 'center',
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  glyphText: {
    fontSize: 14,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: telegramColors.textPrimary,
    fontSize: 17,
  },
  subtitle: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  toggleValue: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  toggleValueOn: {
    color: telegramColors.online,
  },
});
