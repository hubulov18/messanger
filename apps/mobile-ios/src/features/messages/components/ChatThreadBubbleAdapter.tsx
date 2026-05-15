import { StyleSheet, View } from 'react-native';
import { ChatBubble as RealUiChatBubble, type BubblePosition, type BubbleVariant } from '@telegram/ui';

export function ChatThreadBubbleAdapter(params: {
  chatId: string;
  messageId: string;
  variant: BubbleVariant;
  position: BubblePosition;
  onRetry?: (messageId: string) => void;
  onOpenMedia?: (messageId: string, mediaIndex: number) => void;
  onToggleAudio?: (messageId: string, mediaIndex: number) => void;
  onLongPress?: (messageId: string, event: unknown) => void;
  audioPlaybackState?: {
    phase: 'idle' | 'loading' | 'playing' | 'error';
    errorText?: string;
  };
}) {
  const { chatId, messageId, variant, position, onRetry, onOpenMedia, onToggleAudio, onLongPress, audioPlaybackState } = params;

  return (
    <View style={styles.wrap}>
      <RealUiChatBubble
        chatId={chatId}
        messageId={messageId}
        variant={variant}
        position={position}
        maxWidthFraction={1}
        {...(onRetry ? { onRetry } : {})}
        {...(onOpenMedia ? { onOpenMedia } : {})}
        {...(onToggleAudio ? { onToggleAudio } : {})}
        {...(onLongPress ? { onLongPress } : {})}
        {...(audioPlaybackState ? { audioPlaybackState } : {})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: -12,
  },
});
