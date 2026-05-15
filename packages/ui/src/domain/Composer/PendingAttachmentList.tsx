import { memo, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface PendingAttachmentListItem {
  readonly id: string;
  readonly title: string;
  readonly meta: string;
  readonly previewUri?: string | undefined;
  readonly progress?: number | undefined;
  readonly progressLabel?: string | undefined;
}

export interface PendingAttachmentFailureState {
  readonly title: string;
  readonly body: string;
  readonly retryLabel: string;
}

export interface PendingAttachmentListProps {
  readonly items: ReadonlyArray<PendingAttachmentListItem>;
  readonly onRemove: (id: string) => void;
  readonly failureState?: PendingAttachmentFailureState;
  readonly onRetryFailure?: () => void;
}

function PendingAttachmentListComponent({
  items,
  onRemove,
  failureState,
  onRetryFailure,
}: PendingAttachmentListProps) {
  const theme = useTheme();

  const cardStyle = useMemo(() => {
    return [
      styles.card,
      {
        backgroundColor: theme.colors.surfaceInput,
        borderRadius: theme.radius.md,
      },
    ];
  }, [theme.colors.surfaceInput, theme.radius.md]);

  const failureStyle = useMemo(() => {
    return [
      styles.failureCard,
      {
        backgroundColor: theme.colors.accentSoft,
        borderRadius: theme.radius.lg,
      },
    ];
  }, [theme.colors.accentSoft, theme.radius.lg]);

  return (
    <View style={styles.list}>
      {failureState && onRetryFailure ? (
        <View style={failureStyle}>
          <View style={styles.failureTextGroup}>
            <Text role="footnote" color="danger">
              {failureState.title}
            </Text>
            <Text role="footnote" color="textSecondary">
              {failureState.body}
            </Text>
          </View>
          <Pressable
            accessibilityLabel={failureState.retryLabel}
            animated={false}
            onPress={onRetryFailure}
            style={[styles.failureButton, { backgroundColor: theme.colors.surfaceRaised }]}
          >
            <Text role="footnote" color="accent">
              {failureState.retryLabel}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {items.map((item) => (
        <View key={item.id} style={cardStyle}>
          {item.previewUri ? (
            <Image source={{ uri: item.previewUri }} style={styles.preview} />
          ) : null}
          <View style={styles.textGroup}>
            <Text role="callout" color="text" numberOfLines={1}>
              {item.title}
            </Text>
            <Text role="footnote" color="textSecondary" numberOfLines={2}>
              {item.meta}
            </Text>
            {item.progressLabel ? (
              <View style={styles.progressGroup}>
                <View style={[styles.progressTrack, { backgroundColor: theme.colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: theme.colors.accent,
                        width: `${Math.max(0, Math.min(1, item.progress ?? 0)) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text role="caption" color="textMuted">
                  {item.progressLabel}
                </Text>
              </View>
            ) : null}
          </View>
          <Pressable
            accessibilityLabel={`Remove ${item.title}`}
            animated={false}
            onPress={() => onRemove(item.id)}
            style={styles.removeButton}
          >
            <Text role="footnote" color="accent">
              Remove
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  failureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  failureTextGroup: {
    flex: 1,
    gap: 2,
  },
  failureButton: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  preview: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  textGroup: {
    flex: 1,
    gap: 2,
  },
  removeButton: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  progressGroup: {
    gap: 4,
    marginTop: 4,
  },
  progressTrack: {
    height: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 999,
  },
});

export const PendingAttachmentList = memo(PendingAttachmentListComponent);
