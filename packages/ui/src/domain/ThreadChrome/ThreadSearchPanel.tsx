import { memo, useMemo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Pressable } from '../../primitives/Pressable';
import { Surface } from '../../primitives/Surface';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';

export interface ThreadSearchResultItem {
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly meta: string;
  readonly loaded?: boolean;
}

export interface ThreadSearchPanelProps {
  readonly value: string;
  readonly onChangeText: (value: string) => void;
  readonly meta: string;
  readonly prevDisabled?: boolean;
  readonly nextDisabled?: boolean;
  readonly onPressPrev: () => void;
  readonly onPressNext: () => void;
  readonly results: ReadonlyArray<ThreadSearchResultItem>;
  readonly onPressResult: (key: string) => void;
  readonly placeholder?: string;
}

function ThreadSearchPanelComponent({
  value,
  onChangeText,
  meta,
  prevDisabled = false,
  nextDisabled = false,
  onPressPrev,
  onPressNext,
  results,
  onPressResult,
  placeholder = 'Search messages',
}: ThreadSearchPanelProps) {
  const theme = useTheme();

  const fieldStyle = useMemo(() => {
    return [
      styles.fieldShell,
      {
        backgroundColor: theme.colors.surfaceInput,
        borderRadius: theme.radius.md,
      },
    ];
  }, [theme.colors.surfaceInput, theme.radius.md]);

  const actionStyle = useMemo(() => {
    return {
      backgroundColor: theme.colors.accentSoft,
      borderRadius: theme.radius.pill,
    };
  }, [theme.colors.accentSoft, theme.radius.pill]);

  return (
    <Surface radius="none" style={styles.root} variant="canvas">
      <View style={fieldStyle}>
        <Text color="textMuted" role="caption">
          ⌕
        </Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          style={[
            styles.fieldInput,
            {
              color: theme.colors.text,
            },
          ]}
          value={value}
        />
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaTextWrap}>
          <Text color="textSecondary" role="caption">
            {meta}
          </Text>
        </View>
        <View style={styles.actionsRow}>
          <Pressable
            accessibilityLabel="Previous result"
            animated={false}
            disabled={prevDisabled}
            onPress={onPressPrev}
            style={[
              styles.actionButton,
              actionStyle,
              ...(prevDisabled ? [styles.actionButtonDisabled] : []),
            ]}
          >
            <Text color="accent" role="caption">
              Prev
            </Text>
          </Pressable>
          <Pressable
            accessibilityLabel="Next result"
            animated={false}
            disabled={nextDisabled}
            onPress={onPressNext}
            style={[
              styles.actionButton,
              actionStyle,
              ...(nextDisabled ? [styles.actionButtonDisabled] : []),
            ]}
          >
            <Text color="accent" role="caption">
              Next
            </Text>
          </Pressable>
        </View>
      </View>

      {results.length > 0 ? (
        <View style={styles.resultsList}>
          {results.map((result) => (
            <View key={result.key}>
              <Pressable
                accessibilityLabel={result.title}
                animated={false}
                onPress={() => onPressResult(result.key)}
                style={[
                  styles.resultCard,
                  {
                    backgroundColor: result.loaded
                      ? theme.colors.accentSoft
                      : theme.colors.surfaceInput,
                    borderRadius: theme.radius.lg,
                  },
                ]}
              >
                <Text color="accent" role="caption">
                  {result.title}
                </Text>
                <Text color="text" numberOfLines={2} role="footnote">
                  {result.body}
                </Text>
                <Text color="textSecondary" role="caption">
                  {result.meta}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent',
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
  },
  fieldShell: {
    minHeight: 36,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fieldInput: {
    flex: 1,
    fontSize: 17,
    letterSpacing: -0.2,
    paddingVertical: 7,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  metaTextWrap: {
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionButtonDisabled: {
    opacity: 0.45,
  },
  resultsList: {
    gap: 8,
  },
  resultCard: {
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export const ThreadSearchPanel = memo(ThreadSearchPanelComponent);
