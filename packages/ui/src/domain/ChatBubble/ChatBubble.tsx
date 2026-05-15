import { memo, useMemo } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useMessage } from '../../hooks/useMessage';
import { Avatar } from '../../primitives/Avatar';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTheme } from '../../theme/ThemeContext';
import type { ChatId, MessageId } from '../../types';
import { BubbleDeletedLabel } from './BubbleDeletedLabel';
import { BubbleFooter } from './BubbleFooter';
import { BubbleForwardedLabel } from './BubbleForwardedLabel';
import { BubbleMedia } from './BubbleMedia';
import { BubbleReply } from './BubbleReply';
import { BubbleSenderLabel } from './BubbleSenderLabel';
import { BubbleText } from './BubbleText';
import { ReactionStack } from './ReactionStack';

/**
 * ChatBubble — the single source of truth for rendering a message row.
 *
 * Subscription model:
 *   The component takes `messageId` (not the message object) and reads from
 *   the query cache with a `select` selector. This keeps the list item
 *   stable during scroll — only the bubble whose reference actually changed
 *   re-renders when, say, a delivery receipt arrives.
 *
 * Composition is internal: BubbleSenderLabel? → BubbleReply? → BubbleForwardedLabel? →
 * BubbleMedia? → BubbleText/BubbleDeletedLabel → Footer → ReactionStack?.
 * No slot props; callers control behavior via explicit props only.
 *
 * Cluster spacing:
 *   `position` describes where this bubble sits in its consecutive same-sender
 *   cluster. `first`/`middle` tighten the top margin, `last`/`single` add
 *   bottom breathing room. For incoming group rows with a real avatar URL,
 *   the component also reserves an avatar slot and only renders the avatar on
 *   `last`/`single` so clusters stay visually aligned.
 */

export type BubbleVariant = 'incoming' | 'outgoing';
export type BubblePosition = 'single' | 'first' | 'middle' | 'last';

export interface ChatBubbleProps {
  readonly chatId: ChatId;
  readonly messageId: MessageId;
  readonly variant: BubbleVariant;
  readonly position: BubblePosition;
  /** Maximum bubble width as a fraction of parent. Defaults to 0.82. */
  readonly maxWidthFraction?: number;
  /** Optional retry affordance for failed self-messages. */
  readonly onRetry?: (messageId: MessageId) => void;
  /** Optional media-open affordance for safe media rows. */
  readonly onOpenMedia?: (messageId: MessageId, mediaIndex: number) => void;
  /** Optional audio toggle affordance for safe audio rows. */
  readonly onToggleAudio?: (messageId: MessageId, mediaIndex: number) => void;
  /** Optional ephemeral audio playback state supplied by the host. */
  readonly audioPlaybackState?: {
    phase: 'idle' | 'loading' | 'playing' | 'error';
    errorText?: string;
  };
  /** Optional long-press affordance for host-level message actions. */
  readonly onLongPress?: (messageId: MessageId, event: unknown) => void;
}

const CLUSTER_SPACING: Record<BubblePosition, number> = {
  single: 8,
  first: 8,
  middle: 2,
  last: 8,
};

const GROUP_AVATAR_SLOT = 34;

function ChatBubbleComponent({
  chatId,
  messageId,
  variant,
  position,
  maxWidthFraction = 0.82,
  onRetry,
  onOpenMedia,
  onToggleAudio,
  audioPlaybackState,
  onLongPress,
}: ChatBubbleProps) {
  const theme = useTheme();
  const message = useMessage(chatId, messageId);

  const isSelf = variant === 'outgoing';
  const isDeleted = message?.deleted === true;
  const onAccent = isSelf && !isDeleted;

  const containerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return [
      styles.row,
      {
        alignSelf: isSelf ? 'flex-end' : 'flex-start',
        marginBottom: CLUSTER_SPACING[position],
      },
    ];
  }, [isSelf, position]);

  const bubbleStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const backgroundColor = isDeleted
      ? theme.colors.surfaceInput
      : isSelf
        ? theme.colors.bubbleOutgoing
        : theme.colors.bubbleIncoming;
    const isTail = position === 'single' || position === 'last';
    return [
      styles.bubble,
      {
        backgroundColor,
        borderRadius: theme.radius.lg,
        ...(isTail && isSelf ? { borderBottomRightRadius: theme.radius.sm / 2 } : {}),
        ...(isTail && !isSelf ? { borderBottomLeftRadius: theme.radius.sm / 2 } : {}),
        borderColor: isDeleted ? theme.colors.border : undefined,
        borderWidth: isDeleted ? StyleSheet.hairlineWidth : 0,
      },
    ];
  }, [
    isDeleted,
    isSelf,
    position,
    theme.colors.border,
    theme.colors.bubbleIncoming,
    theme.colors.bubbleOutgoing,
    theme.colors.surfaceInput,
    theme.radius.lg,
    theme.radius.sm,
  ]);

  const bubbleColumnStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return {
      maxWidth: `${maxWidthFraction * 100}%`,
    };
  }, [maxWidthFraction]);

  if (message === undefined) return null;
  if (message.type !== 'text') return null;

  const status = isSelf ? message.status : undefined;
  const shouldShowRetry = isSelf && message.status === 'failed' && typeof onRetry === 'function';
  const hasGroupAvatar = !isSelf && message.senderLabel !== undefined && Boolean(message.avatar);
  const shouldShowAvatar = hasGroupAvatar && (position === 'single' || position === 'last');

  const hasBodyText = message.body.trim().length > 0;

  return (
    <View style={containerStyle} accessibilityRole="text">
      {hasGroupAvatar ? (
        <View style={styles.avatarSlot}>
          {shouldShowAvatar ? (
            <Avatar
              name={message.senderLabel}
              size="sm"
              shape="circle"
              {...(message.avatar ? { imageUrl: message.avatar } : {})}
            />
          ) : null}
        </View>
      ) : null}
      <View style={bubbleColumnStyle}>
        <Pressable
          accessibilityLabel="Message actions"
          animated={false}
          {...(onLongPress ? { onLongPress: (event: unknown) => onLongPress(messageId, event) } : {})}
          style={bubbleStyle}
        >
          {message.senderLabel !== undefined ? (
            <BubbleSenderLabel senderLabel={message.senderLabel} />
          ) : null}
          {!isDeleted && message.replyTo !== undefined ? (
            <BubbleReply reply={message.replyTo} onAccent={onAccent} />
          ) : null}
          {!isDeleted && message.forwarded !== undefined ? (
            <BubbleForwardedLabel forwarded={message.forwarded} onAccent={onAccent} />
          ) : null}
          {!isDeleted && message.media !== undefined && message.media.length > 0 ? (
            <BubbleMedia
              messageId={messageId}
              media={message.media}
              {...(onOpenMedia ? { onOpenMedia } : {})}
              {...(onToggleAudio ? { onToggleAudio } : {})}
              {...(audioPlaybackState ? { audioPlaybackState } : {})}
            />
          ) : null}
          {isDeleted ? (
            <BubbleDeletedLabel />
          ) : hasBodyText ? (
            <BubbleText body={message.body} onAccent={onAccent} />
          ) : null}
          <BubbleFooter
            createdAt={message.createdAt}
            {...(!isDeleted && message.editedAt !== undefined ? { editedAt: message.editedAt } : {})}
            {...(status !== undefined ? { status } : {})}
            onAccent={onAccent}
          />
          {shouldShowRetry ? (
            <View style={styles.failedRow}>
              <Text role="caption" color={onAccent ? 'textOnAccent' : 'danger'}>
                Not delivered
              </Text>
              <Pressable
                accessibilityLabel="Retry message"
                animated={false}
                onPress={() => onRetry(messageId)}
                style={[
                  styles.retryButton,
                  {
                    backgroundColor: onAccent ? theme.colors.surfaceRaised : theme.colors.surface,
                    borderColor: onAccent ? theme.colors.surfaceRaised : theme.colors.border,
                    borderRadius: theme.radius.pill,
                  },
                ]}
              >
                <Text role="caption" color={onAccent ? 'accent' : 'danger'}>
                  Retry
                </Text>
              </Pressable>
            </View>
          ) : null}
        </Pressable>
        {isDeleted ? null : <ReactionStack reactions={message.reactions} onAccent={onAccent} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  bubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatarSlot: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 6,
    minWidth: GROUP_AVATAR_SLOT,
  },
  failedRow: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  retryButton: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});

export const ChatBubble = memo(ChatBubbleComponent);
