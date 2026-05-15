import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface SystemEventCardProps {
  readonly title: string;
  readonly meta: string;
}

function SystemEventCardComponent({ title, meta }: SystemEventCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.accentSoft,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <Text role="footnote" color="accent" align="center">
        {title}
      </Text>
      <Text role="caption" color="textSecondary" align="center">
        {meta}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: 2,
    maxWidth: '84%',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
});

export const SystemEventCard = memo(SystemEventCardComponent);
