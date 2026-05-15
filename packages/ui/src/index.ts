/**
 * @telegram/ui — Phase 7 surface.
 *
 * Public export boundary for the mobile app. Internal modules (e.g. individual
 * BubbleText/BubbleFooter parts) are intentionally not re-exported — callers
 * use the composed ChatBubble and Composer.
 */

// Theme
export {
  ThemeProvider,
  useTheme,
  useColors,
  buildTheme,
  buildColors,
  typography,
  spacing,
  radius,
  duration,
  easing,
  elevation,
  type Theme,
  type ThemeMode,
  type Colors,
  type TypographyRole,
  type TypographyStyle,
  type RadiusToken,
  type SpacingStep,
  type Elevation,
  type ThemeProviderProps,
} from './theme';

// Primitives
export {
  Text,
  Pressable,
  Avatar,
  Surface,
  type TextProps,
  type PressableProps,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
  type SurfaceProps,
  type SurfaceVariant,
} from './primitives';

// Domain components
export {
  ChatBubble,
  type ChatBubbleProps,
  type BubbleVariant,
  type BubblePosition,
} from './domain/ChatBubble';
export {
  ForwardPickerSheet,
  ImageViewerContent,
  MessageSelectionBar,
  ThreadFeedbackBar,
  ThreadSearchPanel,
  TypingIndicatorBar,
  type ForwardPickerSheetProps,
  type ForwardPickerItem,
  type ImageViewerContentProps,
  type MessageSelectionBarProps,
  type MessageSelectionReactionItem,
  type MessageSelectionActionItem,
  type ThreadFeedbackBarProps,
  type ThreadSearchPanelProps,
  type ThreadSearchResultItem,
  type TypingIndicatorBarProps,
} from './domain/ThreadChrome';
export {
  Composer,
  ComposerAttachmentTray,
  PendingAttachmentList,
  VoiceRecordingBar,
  composerReducer,
  initialComposerState,
  canSend,
  type ComposerProps,
  type ComposerHandle,
  type ComposerAttachmentTrayProps,
  type ComposerAttachmentActionItem,
  type PendingAttachmentListProps,
  type PendingAttachmentListItem,
  type PendingAttachmentFailureState,
  type VoiceRecordingBarProps,
  type ComposerState,
  type ComposerAction,
  type ComposerModifier,
} from './domain/Composer';

export {
  SystemEventCard,
  type SystemEventCardProps,
} from './domain/SystemEventCard/SystemEventCard';

// Hooks
export {
  useCurrentUser,
  useMessage,
  useSendMessage,
  reconcileServerMessage,
  type SendTextArgs,
  type UseSendMessageResult,
} from './hooks';

// API surface (host supplies the concrete client)
export {
  ApiClientProvider,
  useApiClient,
  ApiError,
  type ApiClient,
  type ApiClientProviderProps,
  type SendMessageArgs,
} from './api';

// State
export { createQueryClient, queryKeys } from './state';

// Types
export type {
  Message,
  TextMessage,
  MessageMap,
  MessageId,
  MessageStatus,
  ChatId,
  UserId,
  User,
  Reaction,
  ReplyRef,
  ForwardedRef,
  MediaRef,
} from './types';

// Utils
export { clientMessageId, isClientId } from './utils/ids';
export { formatMessageTime } from './utils/time';
export { haptic, setHapticImplementation, type HapticIntensity, type HapticImpl } from './utils/haptics';
