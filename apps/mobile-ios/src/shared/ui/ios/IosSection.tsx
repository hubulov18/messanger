import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { telegramColors, telegramLayout, telegramShadows, telegramText } from './theme';

type IosSectionProps = {
  title?: string;
  children?: ReactNode;
};

export function IosSection({ title, children }: IosSectionProps) {
  return (
    <View style={styles.wrapper}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.section}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  title: {
    ...telegramText.caption,
    color: telegramColors.textTertiary,
    fontWeight: '700',
    letterSpacing: 1.1,
    paddingHorizontal: 14,
    textTransform: 'uppercase',
  },
  section: {
    backgroundColor: telegramColors.surface,
    borderRadius: telegramLayout.sectionRadius,
    overflow: 'hidden',
    ...telegramShadows.card,
  },
});
