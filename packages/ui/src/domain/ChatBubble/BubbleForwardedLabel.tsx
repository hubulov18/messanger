import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { ForwardedRef } from '../../types';

export interface BubbleForwardedLabelProps {
  readonly forwarded: ForwardedRef;
  readonly onAccent: boolean;
}

function BubbleForwardedLabelComponent({ forwarded, onAccent }: BubbleForwardedLabelProps) {
  const theme = useTheme();
  const markerColor = onAccent ? theme.colors.textOnAccent : theme.colors.textSecondary;
  const detailColor = onAccent ? 'textOnAccent' : 'textMuted';
  const senderLabel = forwarded.originalSenderName?.trim();

  return (
    <View style={styles.row}>
      <Text role="caption" color={onAccent ? 'textOnAccent' : 'textSecondary'}>
        Forwarded
      </Text>
      {senderLabel ? (
        <>
          <View style={[styles.dot, { backgroundColor: markerColor }]} />
          <Text role="caption" color={detailColor} numberOfLines={1}>
            {senderLabel}
          </Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  dot: {
    borderRadius: 999,
    height: 3,
    marginHorizontal: 6,
    width: 3,
  },
});

export const BubbleForwardedLabel = memo(BubbleForwardedLabelComponent);
