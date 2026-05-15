import { Pressable, StyleSheet, Text, View } from 'react-native';

import { telegramColors, telegramLayout, telegramText } from '@shared/ui/ios/theme';

type SettingsNavigationRowProps = {
  title: string;
  subtitle?: string;
  value?: string | null;
  glyphText: string;
  glyphBackgroundColor: string;
  glyphTextColor: string;
  onPress?: () => void;
  hideChevron?: boolean;
};

export function SettingsNavigationRow({
  title,
  subtitle,
  value,
  glyphText,
  glyphBackgroundColor,
  glyphTextColor,
  onPress,
  hideChevron = false,
}: SettingsNavigationRowProps) {
  const content = (
    <View style={styles.row}>
      <View style={[styles.glyph, { backgroundColor: glyphBackgroundColor }]}>
        <Text style={[styles.glyphText, { color: glyphTextColor }]}>{glyphText}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {value ? <Text style={styles.value}>{value}</Text> : null}
      {!hideChevron ? <Text style={styles.chevron}>›</Text> : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return <Pressable onPress={onPress} style={({ pressed }: { pressed: boolean }) => [pressed ? styles.pressed : null]}>{content}</Pressable>;
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
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: telegramLayout.sectionRadius,
  },
  glyph: {
    alignItems: 'center',
    borderRadius: 9,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  glyphText: {
    fontSize: 17,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...telegramText.rowTitle,
    fontWeight: '500',
  },
  subtitle: {
    ...telegramText.secondary,
    lineHeight: 18,
  },
  value: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    marginLeft: 8,
    maxWidth: 120,
    textAlign: 'right',
  },
  chevron: {
    color: telegramColors.textTertiary,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 2,
  },
});

export const settingsRowStyles = StyleSheet.create({
  separator: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 56,
  },
});
