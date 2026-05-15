import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// @ts-ignore – TypeScript 5.9 export* regression: ActivityIndicator not re-exported from react-native index
import { ActivityIndicator, Animated, Dimensions, Image, Keyboard, LayoutAnimation, Linking, Modal, PanResponder, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { startChatVideoCall, startChatVoiceCall } from '@features/calls/services/call-coordinator';
import { ChatThreadBubbleAdapter } from '@features/messages/components/ChatThreadBubbleAdapter';
import { useCallSessionStore } from '@features/calls/state/call-session.store';
import type { CallEventPayload, MessageAttachmentItem, MessageListItem } from '@features/messages/api/messages.api';
import {
    addMessageReaction,
    deleteMessage,
    editTextMessage,
    forwardMessage,
    removeMessageReaction,
    sendAttachmentMessage,
    sendTextMessage,
  } from '@features/messages/api/messages.api';
import { getMedia, type MediaObject } from '@features/messages/api/media.api';
import { useAudioPlayback } from '@features/messages/hooks/useAudioPlayback';
import { useThreadSearch } from '@features/messages/hooks/useThreadSearch';
import { useThreadDataLifecycle, type ThreadDataMessage } from '@features/messages/hooks/useThreadDataLifecycle';
import { syncChatThreadMessagesToRealUiCache } from '@features/messages/services/chat-thread-ui-runtime';
import type { ProfilePresence } from '@features/profile/api/profile.api';
import {
  cancelVoiceRecording,
  MediaPickerCancelledError,
  MediaPickerUnavailableError,
  pickPendingMediaAttachments,
  type PendingAttachmentUploadPhase,
  startVoiceRecording,
  stopVoiceRecording,
  uploadPendingMediaAttachments,
} from '@features/messages/services/media-compose.service';
import type { PendingMediaAttachment } from '@features/messages/services/media-compose.service';
import type { ApiError } from '@shared/api/types';
import { subscribeToRealtimeEvents } from '@shared/realtime/realtime-events';
import { sendTypingIndicator } from '@shared/realtime/typing.api';
import { useSessionStore } from '@shared/auth/session.store';
import { useActiveChatStore } from '@shared/chats/active-chat.store';
import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { useChatReadStateStore } from '@shared/chats/chat-read-state.store';
import { resolveKnownUserLabel } from '@shared/chats/chat-directory.store';
import { useChatUnreadStore } from '@shared/chats/chat-unread.store';
import { env } from '@shared/config/env';
import { useTranslation } from '@shared/i18n';
import { documentPreviewApi, isNativeDocumentPreviewAvailable } from '@shared/native/document-preview';
import { isNativeVideoPlaybackAvailable, videoPlaybackApi } from '@shared/native/video-playback';
import { createUiApiClient } from '@shared/api/ui-api-client';
import { queryClient } from '@shared/state/queryClient';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { resolveUseRealUiBubbles, useUiBubbleRendererStore } from '@shared/ui/ui-bubble-renderer.store';
import { telegramColors, telegramLayout, telegramShadows } from '@shared/ui/ios/theme';
import {
  ApiClientProvider as RealUiApiClientProvider,
  Composer as RealUiComposer,
  ComposerAttachmentTray as RealUiComposerAttachmentTray,
  ForwardPickerSheet as RealUiForwardPickerSheet,
  ImageViewerContent as RealUiImageViewerContent,
  PendingAttachmentList as RealUiPendingAttachmentList,
  Pressable as RealUiPressable,
  SystemEventCard as RealUiSystemEventCard,
  Text as RealUiText,
  ThemeProvider as RealUiThemeProvider,
  ThreadFeedbackBar as RealUiThreadFeedbackBar,
  ThreadSearchPanel as RealUiThreadSearchPanel,
  TypingIndicatorBar as RealUiTypingIndicatorBar,
  VoiceRecordingBar as RealUiVoiceRecordingBar,
  haptic as realUiHaptic,
  queryKeys as realUiQueryKeys,
  type ComposerHandle as RealUiComposerHandle,
  type ComposerModifier,
  type ReplyRef as RealUiReplyRef,
} from '@telegram/ui';

type ChatThreadScreenProps = {
  navigation?: {
    goBack?: () => void;
    navigate: (screen: string, params?: unknown) => void;
  };
  route?: {
    params?: {
      chatId?: string;
      initialSearchQuery?: string;
      initialFocusedMessageId?: string;
      initialFocusedMessage?: MessageListItem;
    };
  };
};

type ThreadMessage = ThreadDataMessage;
type MessageRowLayout = {
  y: number;
  height: number;
};
type MessageContextAnchor = {
  top: number;
  bottom: number;
  alignOwn: boolean;
};

type ComposerMode =
  | { type: 'send'; replyToMessageId: string | null }
  | { type: 'edit'; messageId: string };

type AttachmentAction = {
  key: 'image' | 'video' | 'audio' | 'file';
  label: string;
  type: 'image' | 'video' | 'audio' | 'file';
  color: string;
};

const THREAD_REALTIME_RELOAD_DEBOUNCE_MS = 350;
const REAL_UI_FORWARDED_TEXT_MAX_LENGTH = 140;
const QUICK_REACTIONS = ['👍', '❤️', '🔥', '😂'];
const ATTACHMENT_ACTIONS: AttachmentAction[] = [
  { key: 'image', label: 'Photo', type: 'image', color: '#55a6f8' },
  { key: 'video', label: 'Video', type: 'video', color: '#8b5cf6' },
  { key: 'audio', label: 'Voice', type: 'audio', color: '#f59e0b' },
  { key: 'file', label: 'File', type: 'file', color: '#52b788' },
];

export function ChatThreadScreen({ navigation, route }: ChatThreadScreenProps) {
  const { t } = useTranslation();
  const chatId = route?.params?.chatId ?? '';
  const initialSearchQuery = route?.params?.initialSearchQuery?.trim() ?? '';
  const initialFocusedMessageId = route?.params?.initialFocusedMessageId ?? '';
  const initialFocusedMessage = route?.params?.initialFocusedMessage ?? null;
  const currentUser = useSessionStore((state) => state.currentUser);
  const setActiveChatId = useActiveChatStore((state) => state.setActiveChatId);
  const currentCall = useCallSessionStore((state) => state.currentCall);
  const clearChatUnread = useChatUnreadStore((state) => state.clearChatUnread);
  const suppressChatUnread = useChatReadStateStore((state) => state.suppressChatUnread);
  const markChatReadLocal = useChatInboxStore((state) => state.markChatReadLocal);
  const applyOutgoingMessage = useChatInboxStore((state) => state.applyOutgoingMessage);
  const bubbleRendererMode = useUiBubbleRendererStore((state) => state.mode);
  const threadRootRef = useRef<any>(null);
  const scrollViewRef = useRef<any>(null);
  const legacyComposerInputRef = useRef<TextInput>(null);
  const realUiComposerRef = useRef<RealUiComposerHandle>(null);
  const realUiComposerSyncKeyRef = useRef<string>('none');
  const messageRowRefs = useRef<Record<string, any>>({});
  const messageLayoutsRef = useRef<Record<string, MessageRowLayout>>({});
  const threadRootWindowFrameRef = useRef({ x: 0, y: 0 });
  const messageScrollOffsetRef = useRef(0);
  const contextMenuAnimation = useRef<any>(new Animated.Value(0)).current;
  const holdToRecordActiveRef = useRef(false);
  const preserveLegacyKeyboardRef = useRef(false);
  const preserveLegacyKeyboardTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressNextComposerFocusScrollRef = useRef(false);
  const pendingOutgoingTransitionRef = useRef<{
    body: string;
    messageId?: string;
    startedAt: number;
  } | null>(null);
  const pendingOutgoingContentShiftRef = useRef(false);
  const messageListContentHeightRef = useRef(0);
  const prevLastVisibleMessageIdRef = useRef<string | null>(null);
  const outgoingMessageAnimationValueRef = useRef(new Animated.Value(1));
  const realtimeThreadRefreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMutatingMessage, setIsMutatingMessage] = useState(false);
  const [isStartingCall, setIsStartingCall] = useState(false);
  const [isAttachmentTrayOpen, setIsAttachmentTrayOpen] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<PendingMediaAttachment[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasAttachmentSendFailure, setHasAttachmentSendFailure] = useState(false);
  const [attachmentUploadPhaseById, setAttachmentUploadPhaseById] = useState<Record<string, PendingAttachmentUploadPhase>>({});
  const [attachmentUploadProgressById, setAttachmentUploadProgressById] = useState<Record<string, number>>({});
  const [composerMode, setComposerMode] = useState<ComposerMode>({ type: 'send', replyToMessageId: null });
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [contextMenuMessageId, setContextMenuMessageId] = useState<string | null>(null);
  const [contextMenuAnchor, setContextMenuAnchor] = useState<MessageContextAnchor | null>(null);
  const [previewImageMediaId, setPreviewImageMediaId] = useState<string | null>(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceRecordingMode, setVoiceRecordingMode] = useState<'manual' | 'hold' | null>(null);
  const [voiceRecordingStartedAt, setVoiceRecordingStartedAt] = useState<number | null>(null);
  const [voiceRecordingElapsedMs, setVoiceRecordingElapsedMs] = useState(0);
  const [animatingOutgoingMessageId, setAnimatingOutgoingMessageId] = useState<string | null>(null);
  const audioPlayback = useAudioPlayback();
  const [mediaActionErrorById, setMediaActionErrorById] = useState<Record<string, string>>({});
  const [peerTypingUserId, setPeerTypingUserId] = useState<string | null>(null);
  const [forwardPickerVisible, setForwardPickerVisible] = useState(false);
  const [forwardingMessage, setForwardingMessage] = useState<ThreadMessage | null>(null);
  const [isForwarding, setIsForwarding] = useState(false);
  const [threadRootLayout, setThreadRootLayout] = useState({ width: 0, height: 0 });
  const [messageViewportTop, setMessageViewportTop] = useState(0);
  const chats = useChatInboxStore((state) => state.chats);
  const realUiApiClient = useMemo(() => createUiApiClient(), []);
  const useRealUiBubbles = resolveUseRealUiBubbles({
    envEnabled: env.features.useRealUiBubbles,
    mode: bubbleRendererMode,
  });
  const useRealUiComposer =
    useRealUiBubbles &&
    !isVoiceRecording &&
    pendingAttachments.length === 0 &&
    !hasAttachmentSendFailure;
  const typingOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingSendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingSentRef = useRef(false);
  const hasAutoScrolledToLatestRef = useRef(false);
  const {
    chat,
    chatRef,
    chatPresence,
    messages,
    setMessages,
    mediaById,
    setMediaById,
    isLoading,
    loadThread,
    requestSilentThreadReload,
  } = useThreadDataLifecycle({
    chatId,
    isSending,
    isMutatingMessage,
    onLoadError: setErrorMessage,
    suppressChatUnread,
    clearChatUnread,
    markChatReadLocal,
  });
  const {
    isSearchOpen,
    setIsSearchOpen,
    threadSearchQuery,
    setThreadSearchQuery,
    currentSearchMatchIndex,
    setCurrentSearchMatchIndex,
    remoteSearchResults,
    injectedSearchMessage,
    setInjectedSearchMessage,
    highlightedSearchMessageId,
    setHighlightedSearchMessageId,
    isSearchingThread,
  } = useThreadSearch({
    chatId,
    initialSearchQuery,
    initialFocusedMessageId,
    normalizeMessages: normalizeThreadMessages,
  });

  useEffect(() => {
    if (!chatId) {
      setActiveChatId(null);
      return;
    }

    setActiveChatId(chatId);

    return () => {
      if (useActiveChatStore.getState().activeChatId === chatId) {
        setActiveChatId(null);
      }
    };
  }, [chatId, setActiveChatId]);

  useEffect(() => {
    const scheduleSilentReload = () => {
      if (realtimeThreadRefreshTimeoutRef.current) {
        return;
      }

      realtimeThreadRefreshTimeoutRef.current = setTimeout(() => {
        realtimeThreadRefreshTimeoutRef.current = null;
        requestSilentThreadReload();
      }, THREAD_REALTIME_RELOAD_DEBOUNCE_MS);
    };

    if (!chatId) {
      return;
    }

    return subscribeToRealtimeEvents((event) => {
      if (event.chatId !== chatId) {
        return;
      }

      if (event.type === 'chat.typing_started') {
        setPeerTypingUserId(event.senderUserId);
        // Auto-clear after 5 s if no stop event arrives
        if (typingOutTimerRef.current) {
          clearTimeout(typingOutTimerRef.current);
        }
        typingOutTimerRef.current = setTimeout(() => {
          setPeerTypingUserId(null);
          typingOutTimerRef.current = null;
        }, 5000);
        return;
      }

      if (event.type === 'chat.typing_stopped') {
        if (peerTypingUserId === event.senderUserId) {
          setPeerTypingUserId(null);
        }
        if (typingOutTimerRef.current) {
          clearTimeout(typingOutTimerRef.current);
          typingOutTimerRef.current = null;
        }
        return;
      }

      if (event.type === 'chat.read_updated' && event.userId === currentUser?.id) {
        const currentLastActivityAt = chatRef.current?.summary.lastActivityAt ?? null;
        suppressChatUnread(chatId, currentLastActivityAt);
        clearChatUnread(chatId);
        markChatReadLocal(chatId);
        return;
      }

      if (event.type === 'chat.message_updated' && event.messageId && event.preview === 'Message deleted') {
        setMessages((currentMessages) =>
          currentMessages.map((message) => {
            if (message.id !== event.messageId) {
              return message;
            }

            return {
              ...message,
              deletedAt: new Date().toISOString(),
              text: null,
              attachments: [],
              reactions: [],
            };
          }),
        );
        return;
      }

      scheduleSilentReload();
    });
  }, [chatId, clearChatUnread, currentUser?.id, markChatReadLocal, peerTypingUserId, suppressChatUnread]);

  useEffect(() => {
    hasAutoScrolledToLatestRef.current = false;
  }, [chatId]);

  useEffect(() => {
    messageListContentHeightRef.current = 0;
    pendingOutgoingContentShiftRef.current = false;
    pendingOutgoingTransitionRef.current = null;
    prevLastVisibleMessageIdRef.current = null;
    setAnimatingOutgoingMessageId(null);
    outgoingMessageAnimationValueRef.current.setValue(1);
  }, [chatId]);

  const scrollToLatestIfNeeded = useCallback(() => {
    if (isLoading || messages.length === 0 || hasAutoScrolledToLatestRef.current) {
      return;
    }

    if (initialFocusedMessageId || isSearchOpen) {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollToEnd?.({ animated: false });
        hasAutoScrolledToLatestRef.current = true;
      });
    });
  }, [initialFocusedMessageId, isLoading, isSearchOpen, messages.length]);

  const prepareOutgoingMessageTransition = useCallback((body: string, messageId?: string) => {
    suppressNextComposerFocusScrollRef.current = true;
    pendingOutgoingTransitionRef.current = {
      body: body.trim(),
      ...(messageId ? { messageId } : {}),
      startedAt: Date.now(),
    };
    pendingOutgoingContentShiftRef.current = true;
  }, []);

  const playOutgoingMessageTransition = useCallback((messageId: string) => {
    outgoingMessageAnimationValueRef.current.stopAnimation();
    outgoingMessageAnimationValueRef.current.setValue(0);
    setAnimatingOutgoingMessageId(messageId);
    Animated.timing(outgoingMessageAnimationValueRef.current, {
      toValue: 1,
      duration: 240,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!finished) {
        return;
      }

      setAnimatingOutgoingMessageId((current) => (current === messageId ? null : current));
    });
  }, []);

  const scrollThreadToBottom = useCallback((animated = true) => {
    if (isSearchOpen) {
      return;
    }

    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd?.({ animated });
    });
  }, [isSearchOpen]);

  useEffect(() => {
    scrollToLatestIfNeeded();
  }, [scrollToLatestIfNeeded]);

  useEffect(() => {
    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardShowSubscription = Keyboard.addListener(keyboardShowEvent, () => {
      if (suppressNextComposerFocusScrollRef.current) {
        return;
      }

      scrollThreadToBottom(true);
    });

    return () => {
      keyboardShowSubscription.remove();
    };
  }, [scrollThreadToBottom]);

  useEffect(() => {
    if (!isVoiceRecording || !voiceRecordingStartedAt) {
      setVoiceRecordingElapsedMs(0);
      return;
    }

    setVoiceRecordingElapsedMs(Date.now() - voiceRecordingStartedAt);

    const intervalId = setInterval(() => {
      setVoiceRecordingElapsedMs(Date.now() - voiceRecordingStartedAt);
    }, 500);

    return () => clearInterval(intervalId);
  }, [isVoiceRecording, voiceRecordingStartedAt]);

  useEffect(() => {
    return () => {
      if (realtimeThreadRefreshTimeoutRef.current) {
        clearTimeout(realtimeThreadRefreshTimeoutRef.current);
        realtimeThreadRefreshTimeoutRef.current = null;
      }
      // Audio cleanup is handled by useAudioPlayback on its own unmount.
    };
  }, []);

  // Clean up typing timers on unmount and send "stopped" if still typing
  useEffect(() => {
    return () => {
      if (typingOutTimerRef.current) {
        clearTimeout(typingOutTimerRef.current);
      }
      if (typingSendTimerRef.current) {
        clearTimeout(typingSendTimerRef.current);
      }
      if (isTypingSentRef.current && chatId) {
        sendTypingIndicator(chatId, false);
      }
    };
  }, [chatId]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    queryClient.setQueryData(realUiQueryKeys.currentUser(), {
      id: currentUser.id,
      displayName: currentUser.displayName,
    });
  }, [currentUser]);

  useEffect(() => {
    if (!useRealUiComposer) {
      realUiComposerSyncKeyRef.current = 'none';
      return;
    }

    if (composerMode.type === 'edit') {
      const editTarget = messages.find((message) => message.id === composerMode.messageId) ?? null;
      if (!editTarget?.text) {
        return;
      }
      const nextKey = `edit:${editTarget.id}:${editTarget.text}`;
      if (realUiComposerSyncKeyRef.current === nextKey) {
        return;
      }
      realUiComposerSyncKeyRef.current = nextKey;
      realUiComposerRef.current?.startEdit(editTarget.id, editTarget.text);
      return;
    }

    if (composerMode.replyToMessageId) {
      const replyTarget = messages.find((message) => message.id === composerMode.replyToMessageId) ?? null;
      if (!replyTarget) {
        return;
      }
      const nextKey = `reply:${replyTarget.id}`;
      if (realUiComposerSyncKeyRef.current === nextKey) {
        return;
      }
      realUiComposerSyncKeyRef.current = nextKey;
      realUiComposerRef.current?.startReply(buildRealUiReplyRef(replyTarget, currentUser?.id, currentUser?.displayName));
      return;
    }

    if (realUiComposerSyncKeyRef.current !== 'none') {
      realUiComposerSyncKeyRef.current = 'none';
      realUiComposerRef.current?.reset();
    }
  }, [composerMode, currentUser?.displayName, currentUser?.id, messages, useRealUiComposer]);

  async function handleSend() {
    const normalizedDraft = draft.trim();

    if (isSending || isMutatingMessage) {
      return;
    }

    if (!chatId) {
      setErrorMessage('Chat id is required');
      return;
    }

    if (composerMode.type === 'edit') {
      if (!normalizedDraft) {
        setErrorMessage('Message text is required');
        return;
      }

      await handleSaveEdit(normalizedDraft);
      return;
    }

    if (pendingAttachments.length > 0) {
      await uploadAndSendAttachments(pendingAttachments, normalizedDraft);
      return;
    }

    if (!normalizedDraft) {
      setErrorMessage('Type a message before sending');
      return;
    }

    if (chat && !chat.permissions.canSendMessages && composerMode.type === 'send') {
      setErrorMessage('You cannot send messages in this conversation.');
      return;
    }

    const messagesBeforeSend = messages;
    const optimisticMessage = buildOptimisticMessage({
      chatId: chatId,
      senderUserId: currentUser?.id ?? 'current-user',
      type: 'text',
      text: normalizedDraft,
      attachments: [],
      replyToMessageId: composerMode.replyToMessageId,
    });

    setIsSending(true);
    setErrorMessage(null);
    setStatusMessage(null);
    setHasAttachmentSendFailure(false);
    setDraft('');

    // Stop typing indicator immediately on send
    if (isTypingSentRef.current) {
      isTypingSentRef.current = false;
      if (typingSendTimerRef.current) {
        clearTimeout(typingSendTimerRef.current);
        typingSendTimerRef.current = null;
      }
      sendTypingIndicator(chatId, false);
    }
    prepareOutgoingMessageTransition(normalizedDraft, optimisticMessage.id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMessages(messagesBeforeSend.concat(optimisticMessage));

    try {
      await sendTextMessage(chatId, normalizedDraft, {
        replyToMessageId: composerMode.replyToMessageId,
      });
      applyOutgoingMessage({
        chatId,
        preview: normalizedDraft,
        happenedAt: new Date().toISOString(),
      });
      resetComposer();
      requestAnimationFrame(() => {
        realUiComposerRef.current?.focus();
      });
      await loadThread({ silent: true });
    } catch (error) {
      const apiError = error as ApiError;
      setMessages(
        messagesBeforeSend.concat({
          ...optimisticMessage,
          clientStatus: 'failed',
        }),
      );
      setErrorMessage(getSendErrorMessage(apiError));
    } finally {
      setIsSending(false);
    }
  }

  async function handleRetryFailedMessage(message: ThreadMessage) {
    if (isSending || isMutatingMessage || !chatId || message.clientStatus !== 'failed') {
      return;
    }

    setIsSending(true);
    setErrorMessage(null);
    setStatusMessage(t('chats.thread.retrying_message'));
    setMessages((currentMessages) =>
      currentMessages.map((candidate) => {
        if (candidate.id !== message.id) {
          return candidate;
        }

        return {
          ...candidate,
          clientStatus: 'pending',
        };
      }),
    );

    try {
      await sendTextMessage(chatId, message.text ?? '', {
        replyToMessageId: message.replyToMessageId,
      });
      applyOutgoingMessage({
        chatId,
        preview: message.text ?? '',
        happenedAt: new Date().toISOString(),
      });
      await loadThread({ silent: true });
    } catch (error) {
      const apiError = error as ApiError;
      setMessages((currentMessages) =>
        currentMessages.map((candidate) => {
          if (candidate.id !== message.id) {
            return candidate;
          }

          return {
            ...candidate,
            clientStatus: 'failed',
          };
        }),
      );
      setErrorMessage(getSendErrorMessage(apiError));
    } finally {
      setIsSending(false);
    }
  }

  function handleRetryFailedMessageById(messageId: string) {
    const failedMessage = messages.find((candidate) => candidate.id === messageId);
    if (!failedMessage) {
      return;
    }

    void handleRetryFailedMessage(failedMessage);
  }

  async function handlePickAttachment(action: AttachmentAction) {
    if (!chatId || isSending || isMutatingMessage || isVoiceRecording) {
      return;
    }

    if (action.type === 'audio') {
      await handleStartVoiceRecording();
      return;
    }

    if (chat && !chat.permissions.canSendMessages) {
      setErrorMessage('You cannot send messages in this conversation.');
      return;
    }

    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const selectedAttachments = await pickPendingMediaAttachments(action.type);
      if (selectedAttachments.length === 0) {
        return;
      }

      setPendingAttachments(selectedAttachments);
      setIsAttachmentTrayOpen(false);
      setHasAttachmentSendFailure(false);
      setAttachmentUploadPhaseById({});
      setAttachmentUploadProgressById({});
      setStatusMessage(action.label + (selectedAttachments.length > 1 ? 's selected' : ' selected'));
    } catch (error) {
      if (error instanceof MediaPickerCancelledError) {
        return;
      }

      if (error instanceof MediaPickerUnavailableError) {
        setErrorMessage(error.message);
        return;
      }

      setErrorMessage('Unable to select attachment');
    }
  }

  async function handleStartVoiceRecording() {
    if (!chatId || isSending || isMutatingMessage || isVoiceRecording) {
      return;
    }

    if (chat && !chat.permissions.canSendMessages) {
      setErrorMessage('You cannot send messages in this conversation.');
      return;
    }

    setErrorMessage(null);
    setStatusMessage(null);
    setIsAttachmentTrayOpen(false);

    try {
      await startVoiceRecording();
      setIsVoiceRecording(true);
      setVoiceRecordingMode('manual');
      setVoiceRecordingStartedAt(Date.now());
      setStatusMessage('Recording voice message…');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to start voice recording';
      setErrorMessage(message);
    }
  }

  async function handleStopVoiceRecording(options?: { autoSend?: boolean }) {
    if (!isVoiceRecording) {
      return;
    }

    setErrorMessage(null);

    try {
      const recordedAttachment = await stopVoiceRecording();
      setPendingAttachments([recordedAttachment]);
      setAttachmentUploadPhaseById({});
      setHasAttachmentSendFailure(false);
      setIsVoiceRecording(false);
      setVoiceRecordingMode(null);
      setVoiceRecordingStartedAt(null);
      setVoiceRecordingElapsedMs(0);

      if (options?.autoSend) {
        await uploadAndSendAttachments([recordedAttachment], '');
      } else {
        setStatusMessage('Voice message recorded');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to stop voice recording';
      setErrorMessage(message);
      setIsVoiceRecording(false);
      setVoiceRecordingMode(null);
      setVoiceRecordingStartedAt(null);
      setVoiceRecordingElapsedMs(0);
    }
  }

  async function handleCancelVoiceRecording() {
    if (!isVoiceRecording) {
      return;
    }

    try {
      await cancelVoiceRecording();
      setStatusMessage('Voice recording cancelled');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to cancel voice recording';
      setErrorMessage(message);
    } finally {
      holdToRecordActiveRef.current = false;
      setIsVoiceRecording(false);
      setVoiceRecordingMode(null);
      setVoiceRecordingStartedAt(null);
      setVoiceRecordingElapsedMs(0);
    }
  }

  async function uploadAndSendAttachments(attachments: PendingMediaAttachment[], text: string) {
    const normalizedText = text.trim();
    const replyToMessageId = composerMode.type === 'send' ? composerMode.replyToMessageId : null;

    setIsSending(true);
    setErrorMessage(null);
    setStatusMessage(attachments[0]?.kind === 'audio' ? 'Sending voice message…' : 'Uploading attachments...');
    setHasAttachmentSendFailure(false);
    setPendingAttachments(attachments);
    setAttachmentUploadPhaseById(() => {
      const next: Record<string, PendingAttachmentUploadPhase> = {};

      for (const attachment of attachments) {
        next[attachment.localId] = 'preparing';
      }

      return next;
    });
    setAttachmentUploadProgressById(() => {
      const next: Record<string, number> = {};

      for (const attachment of attachments) {
        next[attachment.localId] = 0;
      }

      return next;
    });

    try {
      const uploadedAttachments = await uploadPendingMediaAttachments(attachments, {
        onPhaseChange: (attachment, phase) => {
          setAttachmentUploadPhaseById((current) => ({
            ...current,
            [attachment.localId]: phase,
          }));
          if (phase === 'ready') {
            setAttachmentUploadProgressById((current) => ({
              ...current,
              [attachment.localId]: 1,
            }));
          }
        },
        onUploadProgress: (attachment, progress) => {
          setAttachmentUploadProgressById((current) => ({
            ...current,
            [attachment.localId]: progress,
          }));
        },
      });

      await sendAttachmentMessage({
        chatId,
        type: attachments[0]?.kind ?? 'file',
        attachments: uploadedAttachments,
        ...(normalizedText ? { text: normalizedText } : {}),
        replyToMessageId,
      });

      applyOutgoingMessage({
        chatId,
        preview: normalizedText || attachmentPreviewLabel(attachments),
        happenedAt: new Date().toISOString(),
      });
      setStatusMessage(attachments[0]?.kind === 'audio' ? 'Voice message sent' : 'Attachment message sent');
      setHasAttachmentSendFailure(false);
      resetComposer();
      await loadThread({ silent: true });
    } catch (error) {
      const apiError = error as ApiError;
      setHasAttachmentSendFailure(true);
      setErrorMessage(getApiErrorMessage(apiError, 'Unable to upload and send attachments'));
    } finally {
      setIsSending(false);
    }
  }

  // Audio playback is now managed by the useAudioPlayback hook (audioPlayback).
  // handleToggleAudioPlayback is kept as a thin wrapper for call sites that also
  // need to clear the per-media action error.
  async function handleToggleAudioPlayback(mediaId: string, downloadUrl: string) {
    setMediaActionErrorById((current) => {
      if (!current[mediaId]) return current;
      const next = { ...current };
      delete next[mediaId];
      return next;
    });
    await audioPlayback.toggle(mediaId, downloadUrl);
  }

  async function handleOpenMediaAttachment(mediaId: string, messageType: string, media: MediaObject | null) {
    let resolvedMedia = media;
    if (!resolvedMedia) {
      try {
        const fetchedMedia = await getMedia(mediaId);
        resolvedMedia = fetchedMedia;
        setMediaById((current) => ({
          ...current,
          [fetchedMedia.id]: fetchedMedia,
        }));
      } catch {
        setMediaActionErrorById((current) => ({
          ...current,
          [mediaId]: 'Attachment is not available yet.',
        }));
        return;
      }
    }

    const targetUrl =
      messageType === 'image'
        ? resolveImageUrl(resolvedMedia)
        : messageType === 'video'
          ? resolvePlayableVideoUrl(resolvedMedia)
          : resolvedMedia.downloadUrl;
    if (!targetUrl) {
      try {
        const fetchedMedia = await getMedia(mediaId);
        resolvedMedia = fetchedMedia;
        setMediaById((current) => ({
          ...current,
          [fetchedMedia.id]: fetchedMedia,
        }));
      } catch {
        setMediaActionErrorById((current) => ({
          ...current,
          [mediaId]: 'Attachment URL is unavailable.',
        }));
        return;
      }
    }

    const refreshedTargetUrl =
      messageType === 'image'
        ? resolveImageUrl(resolvedMedia)
        : messageType === 'video'
          ? resolvePlayableVideoUrl(resolvedMedia)
          : resolvedMedia.downloadUrl;
    if (!refreshedTargetUrl) {
      setMediaActionErrorById((current) => ({
        ...current,
        [mediaId]: 'Attachment URL is unavailable.',
      }));
      return;
    }

    if (messageType === 'image') {
      setPreviewImageMediaId(mediaId);
      setMediaActionErrorById((current) => {
        if (!current[mediaId]) return current;
        const next = { ...current };
        delete next[mediaId];
        return next;
      });
      return;
    }

    if (messageType === 'video') {
      const ownerMessage = messages.find((m) => m.attachments.some((a) => a.mediaId === mediaId));
      const title = ownerMessage
        ? resolveMessageSenderLabel(ownerMessage, currentUser?.id, currentUser?.displayName)
        : 'Video';
      if (Platform.OS === 'ios' && isNativeVideoPlaybackAvailable()) {
        try {
          await videoPlaybackApi.present(refreshedTargetUrl, title);
          setMediaActionErrorById((current) => {
            if (!current[mediaId]) return current;
            const next = { ...current };
            delete next[mediaId];
            return next;
          });
          return;
        } catch {
          // Fall through to the JS screen if the native presenter is unavailable.
        }
      }
      navigation?.navigate('VideoPlayer', {
        videoUrl: refreshedTargetUrl,
        mimeType: resolvedMedia.mimeType,
        title,
        caption: ownerMessage?.text ?? null,
      });
      setMediaActionErrorById((current) => {
        if (!current[mediaId]) return current;
        const next = { ...current };
        delete next[mediaId];
        return next;
      });
      return;
    }

    if (messageType === 'file' && isPreviewableDocument(resolvedMedia.mimeType, refreshedTargetUrl) && isNativeDocumentPreviewAvailable()) {
      try {
        await documentPreviewApi.present(refreshedTargetUrl, buildDocumentPreviewTitle(resolvedMedia));
        setMediaActionErrorById((current) => {
          if (!current[mediaId]) return current;
          const next = { ...current };
          delete next[mediaId];
          return next;
        });
        return;
      } catch {
        // Fall through to system open when preview is unavailable or fails.
      }
    }

    try {
      const canOpen = await Linking.canOpenURL(refreshedTargetUrl);
      if (!canOpen) {
        throw new Error('This attachment cannot be opened on this device.');
      }

      await Linking.openURL(refreshedTargetUrl);
      setMediaActionErrorById((current) => {
        if (!current[mediaId]) return current;
        const next = { ...current };
        delete next[mediaId];
        return next;
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to open attachment';
      setMediaActionErrorById((current) => ({
        ...current,
        [mediaId]: message,
      }));
    }
  }

  function handleOpenMediaMessageById(messageId: string, mediaIndex: number) {
    const message = messages.find((candidate) => candidate.id === messageId);
    if (!message) {
      return;
    }

    const attachment = message.attachments[mediaIndex] ?? message.attachments[0] ?? null;
    if (!attachment) {
      return;
    }

    const media = mediaById[attachment.mediaId] ?? null;
    void handleOpenMediaAttachment(attachment.mediaId, message.type, media);
  }

  function handleToggleAudioMessageById(messageId: string, mediaIndex: number) {
    const message = messages.find((candidate) => candidate.id === messageId);
    if (!message) {
      return;
    }

    const attachment = message.attachments[mediaIndex] ?? message.attachments[0] ?? null;
    if (!attachment) {
      return;
    }

    const media = mediaById[attachment.mediaId] ?? null;
    if (!media || !isMediaReady(media)) {
      return;
    }

    void handleToggleAudioPlayback(attachment.mediaId, media.downloadUrl);
  }

  async function handleStartVoiceCall() {
    if (!env.features.callsV1 || !chatId || !chat || chat.type !== 'direct' || currentCall || isStartingCall) {
      return;
    }

    setErrorMessage(null);
    setStatusMessage(t('calls.state_preparing'));
    setIsStartingCall(true);

    try {
      await startChatVoiceCall(chatId);
      setStatusMessage(t('calls.state_calling'));
    } catch (error) {
      if (error instanceof Error && error.message.trim().length > 0) {
        setErrorMessage(error.message);
      } else {
        const apiError = error as ApiError;
        setErrorMessage(getApiErrorMessage(apiError, t('profile.view.error_start_call')));
      }
      setStatusMessage(null);
    } finally {
      setIsStartingCall(false);
    }
  }

  async function handleStartVideoCall() {
    if (!env.features.callsV1 || !chatId || !chat || chat.type !== 'direct' || currentCall || isStartingCall) {
      return;
    }

    setErrorMessage(null);
    setStatusMessage('Starting video call…');
    setIsStartingCall(true);

    try {
      await startChatVideoCall(chatId);
      setStatusMessage('Calling…');
    } catch (error) {
      if (error instanceof Error && error.message.trim().length > 0) {
        setErrorMessage(error.message);
      } else {
        const apiError = error as ApiError;
        setErrorMessage(getApiErrorMessage(apiError, 'Unable to start video call'));
      }
      setStatusMessage(null);
    } finally {
      setIsStartingCall(false);
    }
  }

  async function handleSaveEdit(text: string, messageIdOverride?: string) {
    const messageId = composerMode.type === 'edit' ? composerMode.messageId : messageIdOverride;
    if (!messageId) {
      return;
    }

    setIsSending(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await editTextMessage(messageId, text);
      setMessages((currentMessages) =>
        currentMessages.map((candidate) => {
          if (candidate.id !== response.message.id) {
            return candidate;
          }

          return {
            ...candidate,
            text: response.message.text,
            editedAt: response.message.editedAt ?? new Date().toISOString(),
          };
        }),
      );
      setStatusMessage('Message updated');
      resetComposer();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(getApiErrorMessage(apiError, 'Unable to edit message'));
    } finally {
      setIsSending(false);
    }
  }

  async function handleDeleteMessage(message: ThreadMessage) {
    if (message.senderUserId !== currentUser?.id) {
      return;
    }

    setIsMutatingMessage(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      await deleteMessage(message.id, 'for_everyone');
      setMessages((currentMessages) =>
        currentMessages.map((candidate) => {
          if (candidate.id !== message.id) {
            return candidate;
          }

          return {
            ...candidate,
            deletedAt: new Date().toISOString(),
            text: null,
            attachments: [],
            reactions: [],
          };
        }),
      );
      setStatusMessage('Message deleted');
      resetComposer();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(getApiErrorMessage(apiError, 'Unable to delete message'));
    } finally {
      setIsMutatingMessage(false);
    }
  }

  async function handleToggleReaction(message: ThreadMessage, emoji: string) {
    setIsMutatingMessage(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const hasOwnReaction = message.reactions.some(function (reaction) {
        return reaction.emoji === emoji && reaction.userId === currentUser?.id;
      });

      if (hasOwnReaction) {
        await removeMessageReaction(message.id, emoji);
      } else {
        await addMessageReaction(message.id, emoji);
      }

      setMessages((currentMessages) =>
        currentMessages.map((candidate) => {
          if (candidate.id !== message.id) {
            return candidate;
          }

          const nextReactions = hasOwnReaction
            ? candidate.reactions.filter((reaction) => !(reaction.emoji === emoji && reaction.userId === currentUser?.id))
            : candidate.reactions.concat({
                emoji,
                userId: currentUser?.id ?? 'current-user',
              });

          return {
            ...candidate,
            reactions: nextReactions,
          };
        }),
      );
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(getApiErrorMessage(apiError, 'Unable to update reaction'));
    } finally {
      setIsMutatingMessage(false);
    }
  }

  function handleReply(message: ThreadMessage) {
    if (useRealUiComposer) {
      realUiComposerRef.current?.startReply(buildRealUiReplyRef(message, currentUser?.id, currentUser?.displayName));
      setSelectedMessageId(null);
      setStatusMessage('Replying to ' + resolveMessageSenderLabel(message, currentUser?.id, currentUser?.displayName));
      return;
    }

    setComposerMode({ type: 'send', replyToMessageId: message.id });
    setSelectedMessageId(message.id);
    setStatusMessage('Replying to ' + resolveMessageSenderLabel(message, currentUser?.id, currentUser?.displayName));
  }

  function handleStartEdit(message: ThreadMessage) {
    if (message.senderUserId !== currentUser?.id || !message.text) {
      return;
    }

    if (useRealUiComposer) {
      realUiComposerRef.current?.startEdit(message.id, message.text);
      setSelectedMessageId(null);
      setStatusMessage(t('chats.thread.editing_message'));
      setIsAttachmentTrayOpen(false);
      return;
    }

    setComposerMode({ type: 'edit', messageId: message.id });
    setSelectedMessageId(message.id);
    setDraft(message.text);
    setStatusMessage(t('chats.thread.editing_message'));
    setIsAttachmentTrayOpen(false);
  }

  function handleForward(message: ThreadMessage) {
    setForwardingMessage(message);
    setForwardPickerVisible(true);
  }

  function dismissMessageContextMenu(onComplete?: () => void) {
    Animated.timing(contextMenuAnimation, {
      toValue: 0,
      duration: 140,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setContextMenuMessageId(null);
      setContextMenuAnchor(null);
      setSelectedMessageId(null);
      onComplete?.();
    }, 140);
  }

  function presentMessageContextMenu(message: ThreadMessage, top: number, height: number) {
    contextMenuAnimation.stopAnimation();
    contextMenuAnimation.setValue(0);
    setSelectedMessageId(message.id);
    setContextMenuMessageId(message.id);
    setContextMenuAnchor({
      alignOwn: currentUser?.id === message.senderUserId,
      bottom: top + height,
      top,
    });
    realUiHaptic('selection');
    Animated.timing(contextMenuAnimation, {
      duration: 170,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function openMessageContextMenu(message: ThreadMessage, event?: any) {
    const rowRef = messageRowRefs.current[message.id];
    const layout = messageLayoutsRef.current[message.id];
    const fallbackTop = layout ? threadRootWindowFrameRef.current.y + messageViewportTop + layout.y - messageScrollOffsetRef.current : 88;
    const fallbackHeight = layout?.height ?? 52;

    if (rowRef?.measureInWindow) {
      rowRef.measureInWindow((x: number, y: number, _width: number, height: number) => {
        if (typeof y === 'number' && typeof height === 'number' && height > 0) {
          presentMessageContextMenu(message, Math.max(10, y), height);
          return;
        }

        presentMessageContextMenu(message, fallbackTop, fallbackHeight);
      });
      return;
    }

    const nativeEvent = event?.nativeEvent;
    const pageY = typeof nativeEvent?.pageY === 'number' ? nativeEvent.pageY : fallbackTop + Math.min(fallbackHeight / 2, 28);
    const locationY = typeof nativeEvent?.locationY === 'number' ? nativeEvent.locationY : Math.min(fallbackHeight / 2, 28);
    const estimatedHeight = layout?.height ?? Math.max(52, locationY * 2);
    const eventTop = pageY - locationY;
    const top = Math.max(10, Number.isFinite(eventTop) ? eventTop : fallbackTop);
    presentMessageContextMenu(message, top, estimatedHeight);
  }

  async function handleForwardToChat(targetChatId: string) {
    if (!forwardingMessage || isForwarding) {
      return;
    }

    setIsForwarding(true);
    setForwardPickerVisible(false);

    try {
      await forwardMessage({
        targetChatId,
        messageId: forwardingMessage.id,
        ...(forwardingMessage.text ? { text: forwardingMessage.text } : {}),
      });
      setSelectedMessageId(null);
      setForwardingMessage(null);
      setStatusMessage('Message forwarded');
      setTimeout(() => setStatusMessage(null), 2000);
    } catch {
      setErrorMessage('Failed to forward message');
    } finally {
      setIsForwarding(false);
    }
  }

  function handleCancelComposerMode() {
    if (useRealUiComposer) {
      realUiComposerRef.current?.reset();
    }
    resetComposer();
    setErrorMessage(null);
    setStatusMessage(null);
  }

  function handleRemovePendingAttachment(localId: string) {
    setPendingAttachments(function (currentAttachments) {
      return currentAttachments.filter(function (attachment) {
        return attachment.localId !== localId;
      });
    });
    setAttachmentUploadPhaseById((current) => {
      if (!current[localId]) {
        return current;
      }

      const next = { ...current };
      delete next[localId];
      return next;
    });
  }

  function resetComposer() {
    holdToRecordActiveRef.current = false;
    realUiComposerSyncKeyRef.current = 'none';
    realUiComposerRef.current?.reset();
    setComposerMode({ type: 'send', replyToMessageId: null });
    setSelectedMessageId(null);
    setDraft('');
    setPendingAttachments([]);
    setAttachmentUploadPhaseById({});
    setHasAttachmentSendFailure(false);
    setIsAttachmentTrayOpen(false);
    setIsVoiceRecording(false);
    setVoiceRecordingMode(null);
    setVoiceRecordingStartedAt(null);
    setVoiceRecordingElapsedMs(0);
  }

  const selectedMessage = getSelectedMessage(messages, selectedMessageId);
  const contextMenuMessage = getSelectedMessage(messages, contextMenuMessageId);
  const contextMenuActions = contextMenuMessage
    ? [
        { key: 'reply', label: 'Reply', icon: '↩', tone: 'default' as const },
        { key: 'forward', label: 'Forward', icon: '➜', tone: 'default' as const },
        ...(contextMenuMessage.senderUserId === currentUser?.id && contextMenuMessage.text
          ? [{ key: 'edit', label: 'Edit', icon: '✎', tone: 'default' as const }]
          : []),
        ...(contextMenuMessage.senderUserId === currentUser?.id
          ? [{ key: 'delete', label: 'Delete', icon: '🗑', tone: 'danger' as const }]
          : []),
      ]
    : [];
  const contextMenuLayout = useMemo(() => {
    if (!contextMenuMessage || !contextMenuAnchor) {
      return null;
    }

    const windowFrame = Dimensions.get('window');
    const trayWidth = 248;
    const trayHeight = 56;
    const menuWidth = 208;
    const actionRowHeight = 48;
    const menuHeight = contextMenuActions.length * actionRowHeight + 12;
    const horizontalPadding = 14;
    const reactionLeft = contextMenuAnchor.alignOwn
      ? Math.max(horizontalPadding, windowFrame.width - trayWidth - horizontalPadding)
      : horizontalPadding;
    const menuLeft = contextMenuAnchor.alignOwn
      ? Math.max(horizontalPadding, windowFrame.width - menuWidth - horizontalPadding)
      : horizontalPadding;
    const reactionTop = Math.max(44, Math.min(windowFrame.height - trayHeight - 16, contextMenuAnchor.top - trayHeight - 8));
    let menuTop = contextMenuAnchor.bottom + 10;

    if (menuTop + menuHeight > windowFrame.height - 16) {
      menuTop = Math.max(reactionTop + trayHeight + 8, contextMenuAnchor.top - menuHeight - 12);
    }

    return {
      menuLeft,
      menuTop,
      reactionLeft,
      reactionTop,
    };
  }, [contextMenuActions.length, contextMenuAnchor, contextMenuMessage]);
  const contextMenuBackdropStyle = useMemo(() => {
    return {
      opacity: contextMenuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
  }, [contextMenuAnimation]);
  const contextMenuTrayStyle = useMemo(() => {
    return {
      opacity: contextMenuAnimation,
      transform: [
        {
          translateY: contextMenuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 0],
          }),
        },
        {
          scale: contextMenuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.96, 1],
          }),
        },
      ],
    };
  }, [contextMenuAnimation]);
  const contextMenuSheetStyle = useMemo(() => {
    return {
      opacity: contextMenuAnimation,
      transform: [
        {
          translateY: contextMenuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 0],
          }),
        },
        {
          scale: contextMenuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.97, 1],
          }),
        },
      ],
    };
  }, [contextMenuAnimation]);
  const replyTarget =
    composerMode.type === 'send' && composerMode.replyToMessageId
      ? messages.find(function (message) {
          return message.id === composerMode.replyToMessageId;
        }) ?? null
      : null;

  useEffect(() => {
    if (!contextMenuMessageId) {
      return;
    }

    const stillExists = messages.some((message) => message.id === contextMenuMessageId);
    if (!stillExists) {
      dismissMessageContextMenu();
    }
  }, [contextMenuMessageId, messages]);
  const isSendDisabled =
    isSending ||
    isMutatingMessage ||
    isVoiceRecording ||
    (!draft.trim() && pendingAttachments.length === 0) ||
    (chat ? !chat.permissions.canSendMessages && composerMode.type === 'send' : false);
  const canUseHoldToRecord =
    !useRealUiComposer &&
    composerMode.type === 'send' &&
    !draft.trim() &&
    pendingAttachments.length === 0 &&
    !isSending &&
    !isMutatingMessage &&
    !isAttachmentTrayOpen &&
    (!chat || chat.permissions.canSendMessages);
  const title = chat?.summary.displayTitle ?? 'Conversation';
  const subtitle =
    chat?.type === 'group'
      ? `${chat.summary.memberCount} members`
      : formatChatHeaderSubtitle(chatPresence, chat?.summary.subtitle);

  const realUiComposerPlaceholder =
    composerMode.type === 'edit' ? 'Edit message' : 'Message';

  const handleRealUiComposerModifierChange = useCallback((modifier: ComposerModifier) => {
    switch (modifier.kind) {
      case 'reply':
        setComposerMode({ type: 'send', replyToMessageId: modifier.target.messageId });
        return;
      case 'edit':
        setComposerMode({ type: 'edit', messageId: modifier.messageId });
        return;
      default:
        setComposerMode({ type: 'send', replyToMessageId: null });
        setSelectedMessageId(null);
        return;
    }
  }, []);

  function handleBackToChats() {
    if (navigation?.goBack) {
      navigation.goBack();
      return;
    }

    navigation?.navigate('MainTabs');
  }

  function handleOpenChatInfo() {
    if (!chatId || chat?.type === 'direct') {
      return;
    }

    navigation?.navigate('ChatInfo', { chatId });
  }

  function handleOpenDirectProfile() {
    if (!chatId || chat?.type !== 'direct' || !chat.summary.counterpartUserId) {
      return;
    }

    navigation?.navigate('UserProfileView', {
      userId: chat.summary.counterpartUserId,
      chatId,
      displayName: chat.summary.displayTitle,
      username: chat.summary.counterpartUsername,
      avatarMediaId: chat.summary.counterpartAvatarMediaId,
    });
  }
  const shouldShowSenderLabel = chat?.type === 'group';
  const canStartVoiceCall = env.features.callsV1 && chat?.type === 'direct' && !currentCall && !isStartingCall;
  const normalizedThreadSearchQuery = threadSearchQuery.trim().toLowerCase();
  const visibleMessages = buildVisibleThreadMessages(messages, [
    injectedSearchMessage,
    initialFocusedMessage && initialFocusedMessage.chatId === chatId
      ? normalizeThreadMessages([initialFocusedMessage])[0] ?? null
      : null,
  ]);
  const searchSourceMessages =
    normalizedThreadSearchQuery && remoteSearchResults.length > 0 ? remoteSearchResults : visibleMessages;
  const matchedMessageIds = normalizedThreadSearchQuery
    ? searchSourceMessages
        .filter((message) => resolveThreadSearchText(message).toLowerCase().includes(normalizedThreadSearchQuery))
        .map((message) => message.id)
    : [];
  const loadedMatchedMessageIds = matchedMessageIds.filter((messageId) => {
    return visibleMessages.some((message) => message.id === messageId);
  });
  const currentMatchedMessageId =
    highlightedSearchMessageId && loadedMatchedMessageIds.includes(highlightedSearchMessageId)
      ? highlightedSearchMessageId
      : loadedMatchedMessageIds.length > 0
        ? loadedMatchedMessageIds[Math.min(currentSearchMatchIndex, loadedMatchedMessageIds.length - 1)]
        : null;
  const threadImageGallery = buildThreadImageGallery(visibleMessages, mediaById);
  const currentPreviewImageIndex = previewImageMediaId
    ? threadImageGallery.findIndex((item) => item.mediaId === previewImageMediaId)
    : -1;
  const currentPreviewImage = currentPreviewImageIndex >= 0 ? threadImageGallery[currentPreviewImageIndex] : null;

  useEffect(() => {
    const lastVisibleMessage = visibleMessages.at(-1) ?? null;
    const previousLastVisibleMessageId = prevLastVisibleMessageIdRef.current;
    prevLastVisibleMessageIdRef.current = lastVisibleMessage?.id ?? null;

    if (!lastVisibleMessage || lastVisibleMessage.id === previousLastVisibleMessageId) {
      return;
    }

    const pendingTransition = pendingOutgoingTransitionRef.current;
    if (!pendingTransition) {
      return;
    }

    if (currentUser?.id !== lastVisibleMessage.senderUserId) {
      return;
    }

    if (pendingTransition.messageId && pendingTransition.messageId !== lastVisibleMessage.id) {
      return;
    }

    if ((lastVisibleMessage.text ?? '').trim() !== pendingTransition.body) {
      return;
    }

    const createdAtMs = Date.parse(lastVisibleMessage.createdAt);
    if (!Number.isNaN(createdAtMs) && createdAtMs + 8000 < pendingTransition.startedAt) {
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    playOutgoingMessageTransition(lastVisibleMessage.id);
    pendingOutgoingTransitionRef.current = null;
  }, [currentUser?.id, playOutgoingMessageTransition, visibleMessages]);
  const realUiBubbleMessages = useMemo(() => {
    const realUiBubbleCandidateParams = {
      useRealUiBubbles,
      shouldShowSenderLabel,
      mediaById,
      ...(currentUser?.id ? { currentUserId: currentUser.id } : {}),
    };

    return visibleMessages.filter((message) =>
      getRealUiBubbleFallbackReason(message, visibleMessages, realUiBubbleCandidateParams) === null,
    );
  }, [currentUser?.id, mediaById, shouldShowSenderLabel, useRealUiBubbles, visibleMessages]);

  const realUiBubbleFallbackReasonById = useMemo(() => {
    const realUiBubbleCandidateParams = {
      useRealUiBubbles,
      shouldShowSenderLabel,
      mediaById,
      ...(currentUser?.id ? { currentUserId: currentUser.id } : {}),
    };

    return new Map(
      visibleMessages.map((message) => [
        message.id,
        getRealUiBubbleFallbackReason(message, visibleMessages, realUiBubbleCandidateParams),
      ]),
    );
  }, [currentUser?.id, mediaById, shouldShowSenderLabel, useRealUiBubbles, visibleMessages]);

  useEffect(() => {
    if (!chatId) {
      return;
    }

    const realUiCacheSyncInput = {
      chatId,
      messages: realUiBubbleMessages,
      threadMessages: visibleMessages,
      mediaById,
      queryClient,
      shouldShowSenderLabel,
      ...(currentUser?.id ? { currentUserId: currentUser.id } : {}),
      ...(currentUser?.displayName ? { currentUserDisplayName: currentUser.displayName } : {}),
    };

    syncChatThreadMessagesToRealUiCache(realUiCacheSyncInput);
  }, [chatId, currentUser?.displayName, currentUser?.id, mediaById, queryClient, realUiBubbleMessages, shouldShowSenderLabel, visibleMessages]);

  useEffect(() => {
    if (!__DEV__ || !chatId) {
      return;
    }

    const fallbackReasonCounts = {} as Record<string, number>;
    let realUiRowCount = 0;

    for (const message of visibleMessages) {
      const fallbackReason = realUiBubbleFallbackReasonById.get(message.id) ?? 'unknown';

      if (fallbackReason === null) {
        realUiRowCount += 1;
        continue;
      }

      fallbackReasonCounts[fallbackReason] = (fallbackReasonCounts[fallbackReason] ?? 0) + 1;
    }

    console.info('[ChatThreadScreen] bubble renderer audit', {
      chatId,
      rendererMode: bubbleRendererMode,
      useRealUiBubbles,
      visibleRows: visibleMessages.length,
      realUiRows: realUiRowCount,
      oldRendererRows: visibleMessages.length - realUiRowCount,
      fallbackReasonCounts,
    });
  }, [bubbleRendererMode, chatId, realUiBubbleFallbackReasonById, useRealUiBubbles, visibleMessages]);

  useEffect(() => {
    if (!isSearchOpen) {
      return;
    }

    if (loadedMatchedMessageIds.length === 0) {
      if (currentSearchMatchIndex !== 0) {
        setCurrentSearchMatchIndex(0);
      }
      return;
    }

    if (currentSearchMatchIndex > loadedMatchedMessageIds.length - 1) {
      setCurrentSearchMatchIndex(0);
    }
  }, [currentSearchMatchIndex, isSearchOpen, loadedMatchedMessageIds.length]);

  useEffect(() => {
    if (!isSearchOpen || !currentMatchedMessageId) {
      return;
    }

    const targetLayout = messageLayoutsRef.current[currentMatchedMessageId];
    if (!targetLayout) {
      return;
    }

    const timeoutId = setTimeout(() => {
      scrollViewRef.current?.scrollTo?.({
        y: Math.max(0, targetLayout.y - 80),
        animated: true,
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [currentMatchedMessageId, isSearchOpen]);

  function handleToggleSearch() {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setThreadSearchQuery('');
      setCurrentSearchMatchIndex(0);
      return;
    }

    setIsSearchOpen(true);
    setCurrentSearchMatchIndex(0);
  }

  function handleJumpToSearchMatch(direction: 'next' | 'previous') {
    if (loadedMatchedMessageIds.length === 0) {
      return;
    }

    setHighlightedSearchMessageId(null);
    setCurrentSearchMatchIndex((currentIndex) => {
      if (direction === 'next') {
        return (currentIndex + 1) % loadedMatchedMessageIds.length;
      }

      return (currentIndex - 1 + loadedMatchedMessageIds.length) % loadedMatchedMessageIds.length;
    });
  }

  function handleComposerFocus() {
    if (suppressNextComposerFocusScrollRef.current) {
      suppressNextComposerFocusScrollRef.current = false;
      return;
    }

    setTimeout(() => {
      scrollThreadToBottom(true);
    }, 120);
  }

  function clearLegacyKeyboardPreservation() {
    preserveLegacyKeyboardRef.current = false;
    if (preserveLegacyKeyboardTimeoutRef.current) {
      clearTimeout(preserveLegacyKeyboardTimeoutRef.current);
      preserveLegacyKeyboardTimeoutRef.current = null;
    }
  }

  function restoreLegacyComposerFocus() {
    preserveLegacyKeyboardRef.current = true;
    if (preserveLegacyKeyboardTimeoutRef.current) {
      clearTimeout(preserveLegacyKeyboardTimeoutRef.current);
    }
    preserveLegacyKeyboardTimeoutRef.current = setTimeout(() => {
      preserveLegacyKeyboardRef.current = false;
      preserveLegacyKeyboardTimeoutRef.current = null;
    }, 500);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        legacyComposerInputRef.current?.focus();
      });
    });
  }

  function handleLegacyComposerBlur() {
    if (!preserveLegacyKeyboardRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      legacyComposerInputRef.current?.focus();
    });
  }

  function handleDraftChange(text: string) {
    setDraft(text);

    if (!chatId) {
      return;
    }

    if (text.length === 0) {
      // Stopped typing
      if (isTypingSentRef.current) {
        isTypingSentRef.current = false;
        if (typingSendTimerRef.current) {
          clearTimeout(typingSendTimerRef.current);
          typingSendTimerRef.current = null;
        }
        sendTypingIndicator(chatId, false);
      }
      return;
    }

    // Send "started" once, then re-send every 3 s while still typing
    if (!isTypingSentRef.current) {
      isTypingSentRef.current = true;
      sendTypingIndicator(chatId, true);
    }

    // Reset the debounce timer; after 3 s of no changes, send stopped
    if (typingSendTimerRef.current) {
      clearTimeout(typingSendTimerRef.current);
    }
    typingSendTimerRef.current = setTimeout(() => {
      isTypingSentRef.current = false;
      typingSendTimerRef.current = null;
      sendTypingIndicator(chatId, false);
    }, 3000);
  }

  useEffect(() => {
    return () => {
      clearLegacyKeyboardPreservation();
    };
  }, []);

  function handleHoldToRecordPressIn() {
    if (!canUseHoldToRecord || isVoiceRecording) {
      return;
    }

    holdToRecordActiveRef.current = true;
    void handleStartHoldToRecord();
  }

  function handleHoldToRecordPressOut() {
    if (!holdToRecordActiveRef.current) {
      return;
    }

    holdToRecordActiveRef.current = false;
    void handleStopVoiceRecording({ autoSend: true });
  }

  async function handleStartHoldToRecord() {
    if (!chatId || isSending || isMutatingMessage || isVoiceRecording) {
      holdToRecordActiveRef.current = false;
      return;
    }

    if (chat && !chat.permissions.canSendMessages) {
      holdToRecordActiveRef.current = false;
      setErrorMessage('You cannot send messages in this conversation.');
      return;
    }

    setErrorMessage(null);
    setStatusMessage(null);
    setIsAttachmentTrayOpen(false);

    try {
      await startVoiceRecording();
      setIsVoiceRecording(true);
      setVoiceRecordingMode('hold');
      setVoiceRecordingStartedAt(Date.now());
      setStatusMessage('Recording voice message…');
    } catch (error) {
      holdToRecordActiveRef.current = false;
      const message = error instanceof Error ? error.message : 'Unable to start voice recording';
      setErrorMessage(message);
    }
  }

  return (
    <>
      <IosScreen
        title={title}
        headerMode="compact"
        headerAlignment="center"
        keyboardAvoiding
        scrollable={false}
        contentContainerStyle={styles.screenContent}
        {...(subtitle ? { subtitle } : {})}
        leftAction={
          <RealUiThemeProvider mode="light">
            <RealUiPressable accessibilityLabel={t('chats.thread.action_back')} animated={false} onPress={handleBackToChats} style={styles.headerButton}>
              <RealUiText color="accent" role="caption">‹</RealUiText>
            </RealUiPressable>
          </RealUiThemeProvider>
        }
        rightAction={
          <View style={styles.headerActions}>
            {chat?.type !== 'direct' ? (
              <RealUiThemeProvider mode="light">
                <RealUiPressable accessibilityLabel={t('chats.thread.action_info')} animated={false} onPress={handleOpenChatInfo} style={styles.headerButton}>
                  <RealUiText color="accent" role="caption">⋯</RealUiText>
                </RealUiPressable>
              </RealUiThemeProvider>
            ) : chat?.summary.counterpartUserId ? (
              <RealUiThemeProvider mode="light">
                <RealUiPressable accessibilityLabel={t('profile.view.title')} animated={false} onPress={handleOpenDirectProfile} style={styles.headerButton}>
                  <RealUiText color="accent" role="caption">⋯</RealUiText>
                </RealUiPressable>
              </RealUiThemeProvider>
            ) : null}
            <RealUiThemeProvider mode="light">
              <RealUiPressable accessibilityLabel={t('chats.thread.action_search')} animated={false} onPress={handleToggleSearch} style={styles.headerButton}>
                <RealUiText color="accent" role="caption">{isSearchOpen ? '✕' : '🔍'}</RealUiText>
              </RealUiPressable>
            </RealUiThemeProvider>
            {env.features.callsV1 && chat?.type === 'direct' ? (
              <>
                <RealUiThemeProvider mode="light">
                  <RealUiPressable
                    accessibilityLabel={t('calls.video_call')}
                    animated={false}
                    onPress={() => void handleStartVideoCall()}
                    disabled={!canStartVoiceCall}
                    style={[styles.headerButton, ...(!canStartVoiceCall ? [styles.headerButtonDisabled] : [])]}
                  >
                    <RealUiText color="accent" role="caption">📹</RealUiText>
                  </RealUiPressable>
                </RealUiThemeProvider>
                <RealUiThemeProvider mode="light">
                  <RealUiPressable
                    accessibilityLabel={t('calls.voice_call')}
                    animated={false}
                    onPress={() => void handleStartVoiceCall()}
                    disabled={!canStartVoiceCall}
                    style={[styles.headerButton, ...(!canStartVoiceCall ? [styles.headerButtonDisabled] : [])]}
                  >
                    <RealUiText color="accent" role="caption">{currentCall?.chatId === chatId ? '•' : '📞'}</RealUiText>
                  </RealUiPressable>
                </RealUiThemeProvider>
              </>
            ) : null}
          </View>
        }
      >
        <View
          ref={threadRootRef}
          onLayout={(event: { nativeEvent: { layout: { height: number; width: number } } }) => {
            setThreadRootLayout({
              height: event.nativeEvent.layout.height,
              width: event.nativeEvent.layout.width,
            });
            requestAnimationFrame(() => {
              threadRootRef.current?.measureInWindow?.((x: number, y: number) => {
                threadRootWindowFrameRef.current = { x, y };
              });
            });
          }}
          style={styles.threadRoot}
        >
          {isSearchOpen ? (
            <RealUiThemeProvider mode="light">
              <RealUiThreadSearchPanel
                meta={
                  normalizedThreadSearchQuery
                    ? isSearchingThread
                      ? 'Searching full conversation…'
                      : matchedMessageIds.length > 0
                        ? `${matchedMessageIds.length} result${matchedMessageIds.length === 1 ? '' : 's'} · ${loadedMatchedMessageIds.length} loaded`
                        : 'No matches'
                    : 'Search this conversation'
                }
                nextDisabled={loadedMatchedMessageIds.length === 0}
                onChangeText={setThreadSearchQuery}
                onPressNext={() => handleJumpToSearchMatch('next')}
                onPressPrev={() => handleJumpToSearchMatch('previous')}
                onPressResult={(messageId) => {
                  const message = remoteSearchResults.find((candidate) => candidate.id === messageId);
                  if (!message) {
                    return;
                  }
                  setInjectedSearchMessage(message);
                  setHighlightedSearchMessageId(message.id);
                  const nextIndex = loadedMatchedMessageIds.indexOf(message.id);
                  if (nextIndex >= 0) {
                    setCurrentSearchMatchIndex(nextIndex);
                  }
                }}
                prevDisabled={loadedMatchedMessageIds.length === 0}
                results={
                  normalizedThreadSearchQuery && remoteSearchResults.length > 0
                    ? remoteSearchResults.slice(0, 4).map((message) => {
                        const isLoadedMatch = visibleMessages.some((candidate) => candidate.id === message.id);

                        return {
                          body: describeMessagePreview(message),
                          key: message.id,
                          loaded: isLoadedMatch,
                          meta: isLoadedMatch ? 'Tap to jump' : 'Tap to open match preview',
                          title: formatTimestamp(message.createdAt),
                        };
                      })
                    : []
                }
                value={threadSearchQuery}
              />
            </RealUiThemeProvider>
          ) : null}
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.messageList}
              keyboardShouldPersistTaps="always"
              onLayout={(event: { nativeEvent: { layout: { y: number } } }) => {
                setMessageViewportTop(event.nativeEvent.layout.y);
              }}
              onScroll={(event: any) => {
                messageScrollOffsetRef.current = event.nativeEvent.contentOffset.y;
              }}
              onContentSizeChange={(_width: number, height: number) => {
                const previousHeight = messageListContentHeightRef.current;
                const delta = height - previousHeight;
                messageListContentHeightRef.current = height;

                scrollToLatestIfNeeded();

                if (!pendingOutgoingContentShiftRef.current || delta <= 0) {
                  return;
                }

                pendingOutgoingContentShiftRef.current = false;
                requestAnimationFrame(() => {
                  scrollViewRef.current?.scrollTo({
                    y: Math.max(0, messageScrollOffsetRef.current + delta),
                    animated: false,
                  });
                });
              }}
              scrollEventThrottle={16}
              style={styles.messageScrollView}
            >
            <RealUiThemeProvider mode="light">
            {!isLoading && visibleMessages.length === 0 ? <Text style={styles.emptyText}>{t('chats.thread.empty')}</Text> : null}
            {visibleMessages.map(function (message, messageIndex) {
            const isPending = message.clientStatus === 'pending';
            const isFailed = message.clientStatus === 'failed';
            const isOwnMessage = currentUser?.id === message.senderUserId;
            const isSystemCallEvent = isCallEventMessage(message);
            const isRealUiBubbleCandidate = realUiBubbleFallbackReasonById.get(message.id) === null;
            const replyPreview = message.replyToMessageId
              ? visibleMessages.find(function (candidate) {
                  return candidate.id === message.replyToMessageId;
                }) ?? null
              : null;
            const isSearchMatch = matchedMessageIds.includes(message.id);
            const isCurrentSearchMatch = currentMatchedMessageId === message.id;
            const audioBubblePlaybackState =
              message.type === 'audio'
                ? resolveAudioBubblePlaybackState(message, mediaById, audioPlayback)
                : null;

            if (isSystemCallEvent && message.callEvent) {
              return (
                <View
                  key={message.id}
                  ref={(node: any) => {
                    if (node) {
                      messageRowRefs.current[message.id] = node;
                    } else {
                      delete messageRowRefs.current[message.id];
                    }
                  }}
                  onLayout={(event: { nativeEvent: { layout: { y: number; height: number } } }) => {
                    messageLayoutsRef.current[message.id] = event.nativeEvent.layout;
                  }}
                  style={styles.systemEventRow}
                >
                  <RealUiSystemEventCard
                    title={getCallEventTitle(message.callEvent, currentUser?.id)}
                    meta={getCallEventMeta(message.callEvent, message.createdAt, currentUser?.id)}
                  />
                </View>
              );
            }

            return (
              <Animated.View
                key={message.id}
                ref={(node: any) => {
                  if (node) {
                    messageRowRefs.current[message.id] = node;
                  } else {
                    delete messageRowRefs.current[message.id];
                  }
                }}
                onLayout={(event: { nativeEvent: { layout: { y: number; height: number } } }) => {
                  messageLayoutsRef.current[message.id] = event.nativeEvent.layout;
                }}
                style={[
                  styles.messageRow,
                  isOwnMessage ? styles.ownMessageRow : styles.peerMessageRow,
                  animatingOutgoingMessageId === message.id
                    ? {
                        opacity: outgoingMessageAnimationValueRef.current.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                        transform: [
                          {
                            translateY: outgoingMessageAnimationValueRef.current.interpolate({
                              inputRange: [0, 1],
                              outputRange: [54, 0],
                            }),
                          },
                          {
                            scale: outgoingMessageAnimationValueRef.current.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.96, 1],
                            }),
                          },
                        ],
                      }
                    : null,
                ]}
              >
                <SwipeableMessageBubble
                  disabled={!isSelectableMessage(message) || Boolean(message.deletedAt)}
                  isOwnMessage={isOwnMessage}
                  onLongPress={(event) => openMessageContextMenu(message, event)}
                  onPress={contextMenuMessageId === message.id ? dismissMessageContextMenu : undefined}
                  onReplySwipe={() => handleReply(message)}
                  style={[
                    isRealUiBubbleCandidate ? styles.realUiBubblePressable : styles.messageBubble,
                    !isRealUiBubbleCandidate ? (isOwnMessage ? styles.ownMessageBubble : styles.peerMessageBubble) : null,
                    isPending ? styles.pendingMessageBubble : null,
                    isFailed ? styles.failedMessageBubble : null,
                    isSearchMatch ? styles.searchMatchedBubble : null,
                    isCurrentSearchMatch ? styles.currentSearchMatchBubble : null,
                    contextMenuMessageId === message.id ? styles.selectedMessageBubble : null,
                  ]}
                >
                  {!isRealUiBubbleCandidate && message.forwardedFromMessageId ? (
                    <Text style={styles.forwardedLabel}>↪ {t('chats.thread.action_forward')}</Text>
                  ) : null}
                  {!isRealUiBubbleCandidate && replyPreview ? (
                    <View style={[styles.replyPreview, isOwnMessage ? styles.ownReplyPreview : styles.peerReplyPreview]}>
                      <Text style={styles.replyPreviewAuthor}>
                        {resolveMessageSenderLabel(replyPreview, currentUser?.id, currentUser?.displayName)}
                      </Text>
                      <Text numberOfLines={2} style={styles.replyPreviewText}>
                        {describeMessagePreview(replyPreview)}
                      </Text>
                    </View>
                  ) : null}
                  {!isRealUiBubbleCandidate && shouldShowSenderLabel ? <Text style={styles.senderLabel}>{resolveMessageSenderLabel(message, currentUser?.id, currentUser?.displayName)}</Text> : null}
                  {isRealUiBubbleCandidate ? (
                    <ChatThreadBubbleAdapter
                      chatId={chatId}
                      messageId={message.id}
                      variant={isOwnMessage ? 'outgoing' : 'incoming'}
                      position={getBubblePosition(visibleMessages, messageIndex)}
                      onLongPress={(_messageId, event) => openMessageContextMenu(message, event)}
                      {...(isFailed ? { onRetry: handleRetryFailedMessageById } : {})}
                      {...(message.type === 'image' || message.type === 'video' || message.type === 'file'
                        ? { onOpenMedia: handleOpenMediaMessageById }
                        : {})}
                      {...(message.type === 'audio'
                        ? {
                            onToggleAudio: handleToggleAudioMessageById,
                            ...(audioBubblePlaybackState ? { audioPlaybackState: audioBubblePlaybackState } : {}),
                          }
                        : {})}
                    />
                  ) : renderMessageContent(
                    message,
                    isOwnMessage,
                    mediaById,
                    setPreviewImageMediaId,
                    audioPlayback.activeMediaId,
                    audioPlayback.phase,
                    audioPlayback.errorByMediaId,
                    mediaActionErrorById,
                    handleOpenMediaAttachment,
                    handleToggleAudioPlayback,
                  )}
                  {!isRealUiBubbleCandidate && !message.deletedAt && message.reactions.length > 0 ? (
                    <View style={styles.reactionRow}>
                      {groupReactions(message.reactions, currentUser?.id).map(function (reaction) {
                        return (
                          <View key={message.id + '_' + reaction.emoji} style={[styles.reactionChip, reaction.ownReaction ? styles.ownReactionChip : null]}>
                            <Text style={styles.reactionChipText}>{reaction.emoji + ' ' + reaction.count}</Text>
                          </View>
                        );
                      })}
                    </View>
                  ) : null}
                  {isRealUiBubbleCandidate ? null : isPending ? (
                    <Text style={[styles.messageMeta, isOwnMessage ? styles.ownMessageMeta : styles.peerMessageMeta]}>{t('common.sending')}</Text>
                  ) : isFailed ? (
                    <View style={styles.failedMessageFooter}>
                      <Text style={[styles.messageMeta, styles.failedMessageMeta]}>{t('chats.thread.status_not_delivered')}</Text>
                      <Pressable onPress={() => void handleRetryFailedMessage(message)} style={styles.retryMessageButton}>
                        <Text style={styles.retryMessageButtonText}>{t('chats.thread.action_retry')}</Text>
                      </Pressable>
                    </View>
                  ) : isOwnMessage ? (
                    renderOwnMessageMeta(message)
                  ) : (
                    <Text style={[styles.messageMeta, styles.peerMessageMeta]}>{formatPeerMessageMeta(message)}</Text>
                  )}
                </SwipeableMessageBubble>
              </Animated.View>
            );
            })}
            </RealUiThemeProvider>
          </ScrollView>

          {errorMessage ? (
            <RealUiThemeProvider mode="light">
              <RealUiThreadFeedbackBar message={errorMessage} tone="error" />
            </RealUiThemeProvider>
          ) : null}
          {!errorMessage && statusMessage ? (
            <RealUiThemeProvider mode="light">
              <RealUiThreadFeedbackBar message={statusMessage} tone="status" />
            </RealUiThemeProvider>
          ) : null}

          {peerTypingUserId ? (
            <RealUiThemeProvider mode="light">
              <RealUiTypingIndicatorBar />
            </RealUiThemeProvider>
          ) : null}

          <View style={styles.composerShell}>
            <View style={styles.composerShellContent}>
          {isVoiceRecording ? (
            <RealUiThemeProvider mode="light">
              <RealUiVoiceRecordingBar
                meta={`${formatDuration(voiceRecordingElapsedMs)}${voiceRecordingMode === 'hold' ? ' · Release to send' : ''}`}
                mode={voiceRecordingMode === 'hold' ? 'hold' : 'manual'}
                onCancel={() => void handleCancelVoiceRecording()}
                {...(voiceRecordingMode === 'manual' ? { onStop: () => void handleStopVoiceRecording() } : {})}
                title={voiceRecordingMode === 'hold' ? 'Hold to record voice message' : 'Recording voice message'}
              />
            </RealUiThemeProvider>
          ) : null}
          {!useRealUiComposer && replyTarget ? (
            <View style={styles.composerContextBar}>
              <View style={styles.contextAccent} />
              <View style={styles.composerContextTextGroup}>
                <Text style={styles.composerContextLabel}>Reply to {resolveMessageSenderLabel(replyTarget, currentUser?.id, currentUser?.displayName)}</Text>
                <Text numberOfLines={1} style={styles.composerContextPreview}>
                  {describeMessagePreview(replyTarget)}
                </Text>
              </View>
              <Pressable onPress={handleCancelComposerMode} style={styles.contextDismissButton}>
                <Text style={styles.contextDismissButtonText}>✕</Text>
              </Pressable>
            </View>
          ) : null}
          {!useRealUiComposer && composerMode.type === 'edit' && selectedMessage ? (
            <View style={styles.composerContextBar}>
              <View style={styles.contextAccent} />
              <View style={styles.composerContextTextGroup}>
                <Text style={styles.composerContextLabel}>{t('chats.thread.editing_message')}</Text>
                <Text numberOfLines={1} style={styles.composerContextPreview}>
                  {describeMessagePreview(selectedMessage)}
                </Text>
              </View>
              <Pressable onPress={handleCancelComposerMode} style={styles.contextDismissButton}>
                <Text style={styles.contextDismissButtonText}>✕</Text>
              </Pressable>
            </View>
          ) : null}

          {pendingAttachments.length > 0 ? (
            <RealUiThemeProvider mode="light">
              <RealUiPendingAttachmentList
                {...(hasAttachmentSendFailure
                  ? {
                      failureState: {
                        title: 'Attachments not sent',
                        body: t('chats.thread.attachments_failed_body'),
                        retryLabel: t('chats.thread.action_retry_send'),
                      },
                      onRetryFailure: () => void handleSend(),
                    }
                  : {})}
                items={pendingAttachments.map(function (attachment) {
                  const uploadPhase = attachmentUploadPhaseById[attachment.localId] ?? null;
                  const uploadProgress = attachmentUploadProgressById[attachment.localId] ?? 0;

                  return {
                    id: attachment.localId,
                    meta: formatPendingAttachmentMeta(attachment, uploadPhase),
                    ...(uploadPhase
                      ? {
                          progress: uploadProgress,
                          progressLabel: formatAttachmentUploadProgressText(uploadPhase, uploadProgress),
                        }
                      : {}),
                    ...(attachment.kind === 'image' ? { previewUri: attachment.localUri } : {}),
                    title: attachment.displayName,
                  };
                })}
                onRemove={handleRemovePendingAttachment}
              />
            </RealUiThemeProvider>
          ) : null}

          {isAttachmentTrayOpen ? (
            <RealUiThemeProvider mode="light">
              <RealUiComposerAttachmentTray
                actions={ATTACHMENT_ACTIONS.map(function (action) {
                  return {
                    color: action.color,
                    key: action.key,
                    label: action.label,
                  };
                })}
                onPressAction={(actionKey) => {
                  const action = ATTACHMENT_ACTIONS.find((candidate) => candidate.key === actionKey);
                  if (!action) {
                    return;
                  }
                  void handlePickAttachment(action);
                }}
              />
            </RealUiThemeProvider>
          ) : null}

          {useRealUiComposer ? (
            <View style={styles.realUiComposerRow}>
              <Pressable onPress={() => !isVoiceRecording && setIsAttachmentTrayOpen(!isAttachmentTrayOpen)} style={[styles.attachButton, isAttachmentTrayOpen ? styles.attachButtonActive : null]}>
                <Text style={styles.attachButtonText}>📎</Text>
              </Pressable>
              <View style={styles.realUiComposerWrap}>
                <RealUiApiClientProvider client={realUiApiClient}>
                  <RealUiThemeProvider mode="light">
                    <RealUiComposer
                      ref={realUiComposerRef}
                      chatId={chatId}
                      keyboardAvoiding={false}
                      onFocus={handleComposerFocus}
                      onSendStart={prepareOutgoingMessageTransition}
                      onModifierChange={handleRealUiComposerModifierChange}
                      onSubmitEdit={(messageId, nextBody) => {
                        void handleSaveEdit(nextBody, messageId);
                      }}
                      onTextChange={handleDraftChange}
                      placeholder={realUiComposerPlaceholder}
                    />
                  </RealUiThemeProvider>
                </RealUiApiClientProvider>
              </View>
            </View>
          ) : (
            <View style={styles.composerRow}>
              <Pressable onPress={() => !isVoiceRecording && setIsAttachmentTrayOpen(!isAttachmentTrayOpen)} style={[styles.attachButton, isAttachmentTrayOpen ? styles.attachButtonActive : null]}>
                <Text style={styles.attachButtonText}>📎</Text>
              </Pressable>
              <View style={styles.inputShell}>
                <TextInput
                  ref={legacyComposerInputRef}
                  autoCapitalize="sentences"
                  autoCorrect
                  blurOnSubmit={false}
                  editable={!isMutatingMessage}
                  multiline
                  onChangeText={handleDraftChange}
                  onBlur={handleLegacyComposerBlur}
                  onFocus={handleComposerFocus}
                  placeholder={pendingAttachments.length > 0 ? 'Add a caption' : composerMode.type === 'edit' ? 'Edit message' : 'Message'}
                  rejectResponderTermination={false}
                  style={[styles.input, isMutatingMessage ? styles.inputDisabled : null]}
                  value={draft}
                />
                <View style={styles.inputEmojiSlot}>
                  <Text style={styles.inputEmojiText}>😊</Text>
                </View>
              </View>
              {canUseHoldToRecord ? (
                <Pressable
                  onPressIn={handleHoldToRecordPressIn}
                  onPressOut={handleHoldToRecordPressOut}
                  style={[styles.voiceHoldButton, isVoiceRecording ? styles.voiceHoldButtonActive : null]}
                >
                  <Text style={styles.voiceHoldButtonText}>🎤</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPressIn={restoreLegacyComposerFocus}
                  onPress={() => void handleSend()}
                  style={[styles.sendButton, isSendDisabled ? styles.sendButtonDisabled : null]}
                >
                  <Text style={styles.sendButtonText}>{composerMode.type === 'edit' ? '✓' : '↑'}</Text>
                </Pressable>
              )}
            </View>
          )}
            </View>
          </View>

        {contextMenuMessage && contextMenuLayout ? (
          <Modal transparent visible animationType="none">
            <View pointerEvents="box-none" style={styles.messageContextOverlay}>
              <Animated.View pointerEvents="none" style={[styles.messageContextBackdrop, contextMenuBackdropStyle]} />
              <Pressable onPress={dismissMessageContextMenu} style={StyleSheet.absoluteFillObject} />
              <View pointerEvents="box-none" style={styles.messageContextLayer}>
                <Animated.View
                  style={[
                    styles.messageContextReactionTray,
                    {
                      left: contextMenuLayout.reactionLeft,
                      top: contextMenuLayout.reactionTop,
                    },
                    contextMenuTrayStyle,
                  ]}
                >
                  {QUICK_REACTIONS.map((emoji) => {
                    const isActive = contextMenuMessage.reactions.some((reaction) => reaction.emoji === emoji && reaction.userId === currentUser?.id);

                    return (
                      <Pressable
                        key={emoji}
                        onPress={() => {
                          void handleToggleReaction(contextMenuMessage, emoji);
                          dismissMessageContextMenu();
                        }}
                        style={[styles.messageContextReactionButton, isActive ? styles.messageContextReactionButtonActive : null]}
                      >
                        <Text style={styles.messageContextReactionText}>{emoji}</Text>
                      </Pressable>
                    );
                  })}
                </Animated.View>
                <Animated.View
                  style={[
                    styles.messageContextActionSheet,
                    {
                      left: contextMenuLayout.menuLeft,
                      top: contextMenuLayout.menuTop,
                    },
                    contextMenuSheetStyle,
                  ]}
                >
                  {contextMenuActions.map((action, actionIndex) => (
                    <Pressable
                      key={action.key}
                      onPress={() => {
                        switch (action.key) {
                          case 'reply':
                            dismissMessageContextMenu(() => {
                              handleReply(contextMenuMessage);
                            });
                            return;
                          case 'forward':
                            dismissMessageContextMenu(() => {
                              handleForward(contextMenuMessage);
                            });
                            return;
                          case 'edit':
                            dismissMessageContextMenu(() => {
                              handleStartEdit(contextMenuMessage);
                            });
                            return;
                          case 'delete':
                            dismissMessageContextMenu(() => {
                              void handleDeleteMessage(contextMenuMessage);
                            });
                            return;
                        }
                      }}
                      style={[
                        styles.messageContextActionRow,
                        actionIndex < contextMenuActions.length - 1 ? styles.messageContextActionRowBorder : null,
                      ]}
                    >
                      <Text style={[styles.messageContextActionIcon, action.tone === 'danger' ? styles.messageContextActionIconDanger : null]}>
                        {action.icon}
                      </Text>
                      <Text style={[styles.messageContextActionText, action.tone === 'danger' ? styles.messageContextActionTextDanger : null]}>
                        {action.label}
                      </Text>
                    </Pressable>
                  ))}
                </Animated.View>
              </View>
            </View>
          </Modal>
        ) : null}
        </View>
      </IosScreen>

      <Modal transparent animationType="slide" visible={forwardPickerVisible} onRequestClose={() => setForwardPickerVisible(false)}>
        <RealUiThemeProvider mode="light">
          <RealUiForwardPickerSheet
            items={chats
              .filter((c) => !c.summary.isArchived)
              .map((c) => ({
                disabled: c.id === chatId || isForwarding,
                key: c.id,
                ...(c.summary.subtitle ? { subtitle: c.summary.subtitle } : {}),
                title: c.summary.displayTitle,
              }))}
            onCancel={() => setForwardPickerVisible(false)}
            onPressItem={(targetChatId) => {
              void handleForwardToChat(targetChatId);
            }}
            title={t('chats.thread.forward_title')}
          />
        </RealUiThemeProvider>
      </Modal>

      <Modal transparent animationType="fade" visible={previewImageMediaId !== null} onRequestClose={() => setPreviewImageMediaId(null)}>
        <SafeAreaView style={styles.imageViewerOverlay}>
          {currentPreviewImage ? (
            <RealUiThemeProvider mode="light">
              <RealUiImageViewerContent
                {...(currentPreviewImage.message.text && currentPreviewImage.message.text.trim().length > 0
                  ? { caption: currentPreviewImage.message.text }
                  : {})}
                {...(threadImageGallery.length > 1
                  ? {
                      canGoNext: currentPreviewImageIndex < threadImageGallery.length - 1,
                      canGoPrev: currentPreviewImageIndex > 0,
                      onPressNext: () => setPreviewImageMediaId(threadImageGallery[currentPreviewImageIndex + 1]?.mediaId ?? null),
                      onPressPrev: () => setPreviewImageMediaId(threadImageGallery[currentPreviewImageIndex - 1]?.mediaId ?? null),
                    }
                  : {})}
                imageUrl={currentPreviewImage.imageUrl}
                meta={`${formatTimestamp(currentPreviewImage.message.createdAt)}${threadImageGallery.length > 1 ? ` · ${currentPreviewImageIndex + 1}/${threadImageGallery.length}` : ''}`}
                onPressClose={() => setPreviewImageMediaId(null)}
                title={resolveMessageSenderLabel(currentPreviewImage.message, currentUser?.id, currentUser?.displayName)}
              />
            </RealUiThemeProvider>
          ) : null}
        </SafeAreaView>
      </Modal>

      {/* Video playback is handled by VideoPlayerProvider at the app root. */}
    </>
  );
}

function normalizeThreadMessages(items: MessageListItem[]) {
  return items.slice().sort(function (left, right) {
    return left.createdAt.localeCompare(right.createdAt);
  });
}

function buildVisibleThreadMessages(baseMessages: ThreadMessage[], extraMessages: Array<ThreadMessage | null>) {
  const merged = [...baseMessages];
  const seenIds = new Set(baseMessages.map((message) => message.id));

  extraMessages.forEach((message) => {
    if (!message || seenIds.has(message.id)) {
      return;
    }

    seenIds.add(message.id);
    merged.push(message);
  });

  return normalizeThreadMessages(merged) as ThreadMessage[];
}

function buildOptimisticMessage(params: {
  chatId: string;
  senderUserId: string;
  type: MessageListItem['type'];
  text: string | null;
  attachments: MessageAttachmentItem[];
  replyToMessageId: string | null;
}): ThreadMessage {
  const createdAt = new Date().toISOString();

  return {
    id: 'pending_' + Date.now(),
    chatId: params.chatId,
    senderUserId: params.senderUserId,
    type: params.type,
    text: params.text,
    attachments: params.attachments,
    replyToMessageId: params.replyToMessageId,
    forwardedFromMessageId: null,
    createdAt: createdAt,
    editedAt: null,
    deletedAt: null,
    reactions: [],
    delivery: {
      delivered: false,
      seen: false,
    },
    clientStatus: 'pending',
  };
}

function isRealUiBubbleCandidateMessage(
  message: ThreadMessage,
  threadMessages: ThreadMessage[],
  params: {
    useRealUiBubbles: boolean;
    currentUserId?: string;
    shouldShowSenderLabel: boolean;
    mediaById: Record<string, MediaObject>;
  },
) {
  return getRealUiBubbleFallbackReason(message, threadMessages, params) === null;
}

function getRealUiBubbleFallbackReason(
  message: ThreadMessage,
  threadMessages: ThreadMessage[],
  params: {
    useRealUiBubbles: boolean;
    currentUserId?: string;
    shouldShowSenderLabel: boolean;
    mediaById: Record<string, MediaObject>;
  },
) {
  const { currentUserId, shouldShowSenderLabel, mediaById, useRealUiBubbles } = params;

  if (!useRealUiBubbles) {
    return 'feature_flag_old_renderer';
  }

  if (!currentUserId) {
    return 'current_user_missing';
  }

  if (shouldShowSenderLabel) {
    return getRealUiGroupMessageFallbackReason(message, threadMessages, mediaById);
  }

  if (message.clientStatus === 'failed') {
    return getRealUiFailedFallbackReason(message);
  }

  if (message.deletedAt) {
    return getRealUiDeletedFallbackReason(message);
  }

  if (message.forwardedFromMessageId) {
    return getRealUiForwardedFallbackReason(message);
  }

  const mediaFallbackReason = getRealUiMediaFallbackReason(message, mediaById);
  if (mediaFallbackReason === null) {
    return null;
  }

  if (message.type !== 'text') {
    return `unsupported_type_${message.type}`;
  }

  if (isCallEventMessage(message)) {
    return 'system_call_event';
  }

  if (message.attachments.length > 0) {
    return 'complex_attachments';
  }

  if (message.replyToMessageId) {
    return getRealUiReplyFallbackReason(message, threadMessages);
  }

  const body = (message.text ?? '').trim();
  return body.length > 0 ? null : 'empty_text_body';
}

function isRealUiForwardedCandidate(message: ThreadMessage) {
  return getRealUiForwardedFallbackReason(message) === null;
}

function getRealUiForwardedFallbackReason(message: ThreadMessage) {
  if (!message.forwardedFromMessageId) {
    return null;
  }

  if (message.replyToMessageId) {
    return 'forwarded_reply_combo';
  }

  const body = (message.text ?? '').trim();
  if (body.length === 0) {
    return 'forwarded_empty_text_body';
  }

  return body.length <= REAL_UI_FORWARDED_TEXT_MAX_LENGTH ? null : 'forwarded_text_too_long';
}

function isRealUiGroupTextCandidate(message: ThreadMessage, threadMessages: ThreadMessage[]) {
  return isRealUiGroupMessageCandidate(message, threadMessages, {});
}

function isRealUiGroupMessageCandidate(
  message: ThreadMessage,
  threadMessages: ThreadMessage[],
  mediaById: Record<string, MediaObject>,
) {
  return getRealUiGroupMessageFallbackReason(message, threadMessages, mediaById) === null;
}

function getRealUiGroupMessageFallbackReason(
  message: ThreadMessage,
  threadMessages: ThreadMessage[],
  mediaById: Record<string, MediaObject>,
) {
  const mediaFallbackReason = getRealUiMediaFallbackReason(message, mediaById);
  if (mediaFallbackReason === null) {
    return null;
  }

  if (message.type !== 'text') {
    return `group_unsupported_type_${message.type}`;
  }

  if (isCallEventMessage(message)) {
    return 'group_system_call_event';
  }

  if (message.attachments.length > 0) {
    return 'group_complex_attachments';
  }

  if (message.clientStatus === 'failed') {
    return getRealUiFailedFallbackReason(message);
  }

  if (message.deletedAt) {
    return getRealUiDeletedFallbackReason(message);
  }

  if (message.forwardedFromMessageId) {
    return getRealUiForwardedFallbackReason(message);
  }

  if (message.replyToMessageId) {
    return getRealUiReplyFallbackReason(message, threadMessages);
  }

  const body = (message.text ?? '').trim();
  return body.length > 0 ? null : 'group_empty_text_body';
}

function isRealUiImageCandidate(message: ThreadMessage, mediaById: Record<string, MediaObject>) {
  return getRealUiImageFallbackReason(message, mediaById) === null;
}

function isRealUiVideoCandidate(message: ThreadMessage, mediaById: Record<string, MediaObject>) {
  return getRealUiVideoFallbackReason(message, mediaById) === null;
}

function getRealUiMediaFallbackReason(message: ThreadMessage, mediaById: Record<string, MediaObject>) {
  if (message.type === 'image') {
    return getRealUiImageFallbackReason(message, mediaById);
  }

  if (message.type === 'video') {
    return getRealUiVideoFallbackReason(message, mediaById);
  }

  if (message.type === 'audio') {
    return getRealUiAudioFallbackReason(message, mediaById);
  }

  if (message.type === 'file') {
    return getRealUiFileFallbackReason(message, mediaById);
  }

  return 'not_supported_media_type';
}

function getRealUiImageFallbackReason(message: ThreadMessage, mediaById: Record<string, MediaObject>) {
  if (message.type !== 'image') {
    return 'not_image';
  }

  if (message.clientStatus === 'failed' || message.deletedAt) {
    return 'image_failed_or_deleted';
  }

  if (message.replyToMessageId || message.forwardedFromMessageId) {
    return 'image_reply_or_forwarded';
  }

  const primaryAttachment = message.attachments[0];
  if (!primaryAttachment || message.attachments.length !== 1) {
    return 'image_complex_attachments';
  }

  const media = mediaById[primaryAttachment.mediaId];
  if (!media || !isMediaReady(media)) {
    return 'image_media_unavailable';
  }

  return resolveImageUrl(media) ? null : 'image_url_missing';
}

function getRealUiVideoFallbackReason(message: ThreadMessage, mediaById: Record<string, MediaObject>) {
  if (message.type !== 'video') {
    return 'not_video';
  }

  if (message.clientStatus === 'failed' || message.deletedAt) {
    return 'video_failed_or_deleted';
  }

  if (message.replyToMessageId || message.forwardedFromMessageId) {
    return 'video_reply_or_forwarded';
  }

  const primaryAttachment = message.attachments[0];
  if (!primaryAttachment || message.attachments.length !== 1) {
    return 'video_complex_attachments';
  }

  const media = mediaById[primaryAttachment.mediaId];
  if (!media || !isMediaReady(media)) {
    return 'video_media_unavailable';
  }

  return resolveVideoThumbnailUrl(media) ? null : 'video_thumbnail_missing';
}

function getRealUiAudioFallbackReason(message: ThreadMessage, mediaById: Record<string, MediaObject>) {
  if (message.type !== 'audio') {
    return 'not_audio';
  }

  if (message.deletedAt) {
    return 'audio_deleted';
  }

  if (message.replyToMessageId || message.forwardedFromMessageId) {
    return 'audio_reply_or_forwarded';
  }

  const primaryAttachment = message.attachments[0];
  if (!primaryAttachment || message.attachments.length !== 1) {
    return 'audio_complex_attachments';
  }

  const media = mediaById[primaryAttachment.mediaId];
  if (!media || !isMediaReady(media) || !media.downloadUrl) {
    return 'audio_media_unavailable';
  }

  return null;
}

function getRealUiFileFallbackReason(message: ThreadMessage, mediaById: Record<string, MediaObject>) {
  if (message.type !== 'file') {
    return 'not_file';
  }

  if (message.clientStatus === 'failed' || message.deletedAt) {
    return 'file_failed_or_deleted';
  }

  if (message.replyToMessageId || message.forwardedFromMessageId) {
    return 'file_reply_or_forwarded';
  }

  const primaryAttachment = message.attachments[0];
  if (!primaryAttachment || message.attachments.length !== 1) {
    return 'file_complex_attachments';
  }

  const media = mediaById[primaryAttachment.mediaId];
  if (!media || !isMediaReady(media) || !media.downloadUrl) {
    return 'file_media_unavailable';
  }

  return null;
}

function isRealUiFailedCandidate(message: ThreadMessage) {
  return getRealUiFailedFallbackReason(message) === null;
}

function getRealUiFailedFallbackReason(message: ThreadMessage) {
  if (message.clientStatus !== 'failed') {
    return null;
  }

  if (message.deletedAt || message.forwardedFromMessageId || message.replyToMessageId) {
    return 'failed_complex_state';
  }

  const body = (message.text ?? '').trim();
  if (body.length > 0) {
    return null;
  }

  if (message.attachments.length === 1 && ['image', 'video', 'audio', 'file'].includes(message.type)) {
    return null;
  }

  return 'failed_empty_text_body';
}

function isRealUiDeletedCandidate(message: ThreadMessage) {
  return getRealUiDeletedFallbackReason(message) === null;
}

function getRealUiDeletedFallbackReason(message: ThreadMessage) {
  if (!message.deletedAt) {
    return null;
  }

  if (message.replyToMessageId || message.forwardedFromMessageId) {
    return 'deleted_complex_state';
  }

  if (isCallEventMessage(message)) {
    return 'deleted_system_call_event';
  }

  return null;
}

function isRealUiReplyCandidate(message: ThreadMessage, threadMessages: ThreadMessage[]) {
  return getRealUiReplyFallbackReason(message, threadMessages) === null;
}

function getRealUiReplyFallbackReason(message: ThreadMessage, threadMessages: ThreadMessage[]) {
  if (!message.replyToMessageId) {
    return null;
  }

  const replyTarget = threadMessages.find((candidate) => candidate.id === message.replyToMessageId);
  if (!replyTarget) {
    return 'reply_target_missing';
  }

  if (replyTarget.deletedAt || isCallEventMessage(replyTarget)) {
    return 'reply_target_deleted_or_system';
  }

  if (replyTarget.type !== 'text' || replyTarget.attachments.length > 0) {
    return 'reply_target_non_text';
  }

  const previewText = describeMessagePreview(replyTarget).trim();
  if (previewText.length === 0) {
    return 'reply_preview_empty';
  }

  return previewText.length <= 96 ? null : 'reply_preview_too_long';
}

function getBubblePosition(messages: ThreadMessage[], index: number) {
  const currentMessage = messages[index];
  if (!currentMessage) {
    return 'single' as const;
  }

  const previousMessage = messages[index - 1];
  const nextMessage = messages[index + 1];
  const connectsToPrevious = isBubbleClusterPeer(previousMessage, currentMessage);
  const connectsToNext = isBubbleClusterPeer(currentMessage, nextMessage);

  if (connectsToPrevious && connectsToNext) {
    return 'middle' as const;
  }

  if (connectsToPrevious) {
    return 'last' as const;
  }

  if (connectsToNext) {
    return 'first' as const;
  }

  return 'single' as const;
}

function isBubbleClusterPeer(left: ThreadMessage | undefined, right: ThreadMessage | undefined) {
  if (!left || !right) {
    return false;
  }

  if (left.senderUserId !== right.senderUserId) {
    return false;
  }

  if (left.type !== 'text' || right.type !== 'text') {
    return false;
  }

  if (left.attachments.length > 0 || right.attachments.length > 0) {
    return false;
  }

  if (left.forwardedFromMessageId || right.forwardedFromMessageId) {
    return false;
  }

  if (isCallEventMessage(left) || isCallEventMessage(right)) {
    return false;
  }

  return true;
}

function getSelectedMessage(messages: ThreadMessage[], selectedMessageId: string | null) {
  if (!selectedMessageId) {
    return null;
  }

  return messages.find(function (message) {
    return message.id === selectedMessageId;
  }) ?? null;
}

type SwipeableMessageBubbleProps = {
  children?: React.ReactNode;
  disabled: boolean;
  isOwnMessage: boolean;
  onLongPress: (event: any) => void;
  onPress: (() => void) | undefined;
  onReplySwipe: () => void;
  style: any;
};

function SwipeableMessageBubble({
  children,
  disabled,
  isOwnMessage,
  onLongPress,
  onPress,
  onReplySwipe,
  style,
}: SwipeableMessageBubbleProps) {
  const translateX = useRef<any>(new Animated.Value(0)).current;
  const didTriggerSwipeReplyRef = useRef(false);
  const didTriggerLongPressRef = useRef(false);
  const swipeDirection = isOwnMessage ? -1 : 1;

  const replyIndicatorOpacity = useMemo(() => {
    return translateX.interpolate({
      inputRange: swipeDirection === 1 ? [0, 24, 84] : [-84, -24, 0],
      outputRange: swipeDirection === 1 ? [0, 0.45, 1] : [1, 0.45, 0],
    });
  }, [swipeDirection, translateX]);

  const replyIndicatorScale = useMemo(() => {
    return translateX.interpolate({
      inputRange: swipeDirection === 1 ? [0, 84] : [-84, 0],
      outputRange: swipeDirection === 1 ? [0.92, 1] : [1, 0.92],
    });
  }, [swipeDirection, translateX]);

  const resetPosition = useCallback(() => {
    Animated.timing(translateX, {
      duration: 140,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_event: any, gestureState: any) => {
        if (disabled) {
          return false;
        }

        const horizontalDistance = Math.abs(gestureState.dx);
        const verticalDistance = Math.abs(gestureState.dy);
        const movingInReplyDirection = swipeDirection === 1 ? gestureState.dx > 0 : gestureState.dx < 0;

        return movingInReplyDirection && horizontalDistance > 10 && horizontalDistance > verticalDistance * 1.4;
      },
      onPanResponderGrant: () => {
        didTriggerSwipeReplyRef.current = false;
        didTriggerLongPressRef.current = false;
      },
      onPanResponderMove: (_event: any, gestureState: any) => {
        const nextValue = swipeDirection === 1
          ? Math.max(0, Math.min(gestureState.dx, 84))
          : Math.min(0, Math.max(gestureState.dx, -84));

        translateX.setValue(nextValue);
      },
      onPanResponderRelease: (_event: any, gestureState: any) => {
        const didReachReplyThreshold = swipeDirection === 1 ? gestureState.dx >= 72 : gestureState.dx <= -72;

        if (didReachReplyThreshold && !didTriggerSwipeReplyRef.current) {
          didTriggerSwipeReplyRef.current = true;
          onReplySwipe();
        }

        resetPosition();
      },
      onPanResponderTerminate: resetPosition,
      onPanResponderTerminationRequest: () => true,
    });
  }, [disabled, onReplySwipe, resetPosition, swipeDirection, translateX]);

  return (
    <Animated.View
      style={[
        style,
        styles.swipeableBubbleShell,
        { transform: [{ translateX }] },
      ]}
      {...(!disabled ? panResponder.panHandlers : {})}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.swipeReplyIndicator,
          isOwnMessage ? styles.swipeReplyIndicatorOwn : styles.swipeReplyIndicatorPeer,
          {
            opacity: replyIndicatorOpacity,
            transform: [{ scale: replyIndicatorScale }],
          },
        ]}
      >
        <Text style={styles.swipeReplyIndicatorText}>↩</Text>
      </Animated.View>
      <Pressable
        delayLongPress={220}
        onLongPress={disabled ? undefined : (event: any) => {
          didTriggerLongPressRef.current = true;
          onLongPress(event);
        }}
        onPress={onPress ? () => {
          if (didTriggerLongPressRef.current) {
            didTriggerLongPressRef.current = false;
            return;
          }
          onPress();
        } : undefined}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

function resolveMessageSenderLabel(
  message: ThreadMessage,
  currentUserId?: string,
  currentUserDisplayName?: string | null,
) {
  return resolveKnownUserLabel({
    userId: message.senderUserId,
    currentUserId: currentUserId,
    currentUserDisplayName: currentUserDisplayName,
  });
}

function buildRealUiReplyRef(
  message: ThreadMessage,
  currentUserId?: string,
  currentUserDisplayName?: string | null,
): RealUiReplyRef {
  return {
    messageId: message.id,
    senderName: resolveMessageSenderLabel(message, currentUserId, currentUserDisplayName),
    preview: describeMessagePreview(message),
  };
}

function groupReactions(reactions: MessageListItem['reactions'], currentUserId?: string) {
  const grouped = new Map<string, { emoji: string; count: number; ownReaction: boolean }>();

  for (const reaction of reactions) {
    const currentValue = grouped.get(reaction.emoji) ?? {
      emoji: reaction.emoji,
      count: 0,
      ownReaction: false,
    };

    currentValue.count += 1;
    currentValue.ownReaction = currentValue.ownReaction || reaction.userId === currentUserId;
    grouped.set(reaction.emoji, currentValue);
  }

  return [...grouped.values()];
}

function isCallEventMessage(message: ThreadMessage) {
  return message.type === 'system' && message.callEvent?.kind === 'call_event';
}

function isSelectableMessage(message: ThreadMessage) {
  return !isCallEventMessage(message);
}

function resolveAudioBubblePlaybackState(
  message: ThreadMessage,
  mediaById: Record<string, MediaObject>,
  audioPlayback: ReturnType<typeof useAudioPlayback>,
) {
  if (message.type !== 'audio') {
    return null;
  }

  const primaryAttachment = message.attachments[0] ?? null;
  if (!primaryAttachment) {
    return null;
  }

  const media = mediaById[primaryAttachment.mediaId] ?? null;
  if (!media) {
    return {
      phase: 'idle' as const,
    };
  }

  const isActive = audioPlayback.activeMediaId === primaryAttachment.mediaId;
  return {
    phase: isActive ? audioPlayback.phase : 'idle' as const,
    ...(audioPlayback.errorByMediaId[primaryAttachment.mediaId]
      ? { errorText: audioPlayback.errorByMediaId[primaryAttachment.mediaId] }
      : {}),
  };
}

function describeMessagePreview(message: ThreadMessage) {
  if (message.deletedAt) {
    return 'Message deleted';
  }

  if (message.callEvent) {
    return getCallEventPreview(message.callEvent);
  }

  if (message.text && message.text.trim().length > 0) {
    return message.text;
  }

  switch (message.type) {
    case 'image':
      return 'Photo attachment';
    case 'video':
      return 'Video attachment';
    case 'audio':
      return 'Voice message';
    case 'file':
      return 'File attachment';
    default:
      return '[non-text message]';
  }
}

function attachmentPreviewLabel(attachments: PendingMediaAttachment[]) {
  const firstAttachment = attachments[0];

  if (!firstAttachment) {
    return 'Attachment';
  }

  switch (firstAttachment.kind) {
    case 'image':
      return attachments.length > 1 ? 'Photos' : 'Photo';
    case 'video':
      return attachments.length > 1 ? 'Videos' : 'Video';
    case 'audio':
      return 'Voice message';
    case 'file':
      return attachments.length > 1 ? 'Files' : 'File';
    default:
      return 'Attachment';
  }
}

function resolveThreadSearchText(message: ThreadMessage) {
  const chunks = [describeMessagePreview(message)];

  if (message.text && message.text.trim().length > 0) {
    chunks.push(message.text);
  }

  if (message.replyToMessageId) {
    chunks.push(message.replyToMessageId);
  }

  return chunks.join(' ').trim();
}

function getCallEventPreview(callEvent: CallEventPayload) {
  switch (callEvent.outcome) {
    case 'completed':
      return callEvent.durationSec > 0 ? `Voice call · ${formatCallDurationSec(callEvent.durationSec)}` : 'Voice call';
    case 'missed':
      return 'Missed call';
    case 'declined':
      return 'Declined call';
    case 'canceled':
      return 'Canceled call';
    case 'failed':
      return 'Failed call';
  }
}

function getCallEventTitle(callEvent: CallEventPayload, currentUserId?: string) {
  switch (callEvent.outcome) {
    case 'completed':
      return 'Voice call';
    case 'missed':
      return callEvent.initiatorUserId === currentUserId ? 'No answer' : 'Missed call';
    case 'declined':
      return callEvent.endedByUserId === currentUserId ? 'Call declined' : 'Call was declined';
    case 'canceled':
      return callEvent.initiatorUserId === currentUserId ? 'Call canceled' : 'Incoming call canceled';
    case 'failed':
      return 'Call failed';
  }
}

function getCallEventMeta(callEvent: CallEventPayload, createdAt: string, currentUserId?: string) {
  const direction = callEvent.initiatorUserId === currentUserId ? 'Outgoing' : 'Incoming';
  const durationLabel = callEvent.durationSec > 0 ? ' · ' + formatCallDurationSec(callEvent.durationSec) : '';
  return `${direction} · ${formatTimestamp(createdAt)}${durationLabel}`;
}

function renderMessageContent(
  message: ThreadMessage,
  isOwnMessage: boolean,
  mediaById: Record<string, MediaObject>,
  onOpenImage: (mediaId: string) => void,
  activeAudioMediaId: string | null,
  audioPlaybackPhase: 'idle' | 'loading' | 'playing' | 'error',
  audioPlaybackErrorById: Record<string, string>,
  mediaActionErrorById: Record<string, string>,
  onOpenMediaAttachment: (mediaId: string, messageType: string, media: MediaObject | null) => void,
  onToggleAudioPlayback: (mediaId: string, downloadUrl: string) => Promise<void>,
) {
  if (message.deletedAt) {
    return (
      <Text style={[styles.deletedMessageText, isOwnMessage ? styles.ownDeletedMessageText : styles.peerDeletedMessageText]}>
        Message deleted
      </Text>
    );
  }

  if (isCallEventMessage(message) && message.callEvent) {
    return (
      <View style={styles.systemMessageCard}>
        <Text style={styles.systemMessageTitle}>{getCallEventTitle(message.callEvent)}</Text>
        <Text style={styles.systemMessageBody}>{getCallEventPreview(message.callEvent)}</Text>
      </View>
    );
  }

  const primaryAttachment = message.attachments[0] ?? null;
  const media = primaryAttachment ? mediaById[primaryAttachment.mediaId] ?? null : null;
  const imageUrl = media && isMediaReady(media) ? resolveImageUrl(media) : null;
  const mediaId = primaryAttachment?.mediaId ?? null;
  const isPlayableAudio = message.type === 'audio' && mediaId !== null && media !== null && isMediaReady(media);
  const isAudioActive = isPlayableAudio && mediaId === activeAudioMediaId;
  const isAudioLoading = isAudioActive && audioPlaybackPhase === 'loading';
  const isAudioPlaying = isAudioActive && audioPlaybackPhase === 'playing';
  const audioPlaybackError = mediaId ? audioPlaybackErrorById[mediaId] ?? null : null;
  const mediaActionError = mediaId ? mediaActionErrorById[mediaId] ?? null : null;
  const mediaStatusText = media ? formatMediaProcessingStatus(media.processingStatus) : null;
  const isProcessing = media !== null && !isMediaReady(media) && media.processingStatus !== 'failed';
  const canOpenAttachment =
    (message.type === 'image' || message.type === 'video' || message.type === 'file') && media !== null && isMediaReady(media);
  const attachmentActionLabel = message.type === 'image' ? 'Preview' : 'Open';

  if (message.type === 'text' && message.attachments.length === 0) {
    return <Text style={[styles.messageBody, isOwnMessage ? styles.ownMessageBody : styles.peerMessageBody]}>{message.text ?? ''}</Text>;
  }

  return (
    <View style={styles.messageContentGroup}>
      {message.type === 'image' ? (
        imageUrl ? (
          <MessageImagePreview
            imageUrl={imageUrl}
            onPress={() => { if (mediaId) onOpenImage(mediaId); }}
          />
        ) : isProcessing ? (
          <View style={styles.imageSkeletonWrap}>
            <ActivityIndicator size="small" color={telegramColors.accent} />
          </View>
        ) : null
      ) : message.type === 'video' && media ? (
        // Video thumbnail with play overlay — tapping opens the in-app player.
        <VideoThumbnail
          media={media}
          isProcessing={isProcessing}
          onPress={() => {
            if (mediaId) {
              onOpenMediaAttachment(mediaId, 'video', media);
            }
          }}
        />
      ) : null}
      {message.type !== 'text' ? (
        <View style={[styles.attachmentCard, isOwnMessage ? styles.ownAttachmentCard : styles.peerAttachmentCard]}>
          <View style={styles.attachmentTopRow}>
            <View style={[styles.attachmentThumb, isOwnMessage ? styles.ownAttachmentThumb : styles.peerAttachmentThumb]}>
              {isProcessing ? (
                <ActivityIndicator size="small" color={telegramColors.accent} />
              ) : (
                <Text style={styles.attachmentThumbText}>{getAttachmentGlyph(message.type)}</Text>
              )}
            </View>
            <View style={styles.attachmentTextGroup}>
              <Text style={[styles.attachmentTitle, isOwnMessage ? styles.ownAttachmentTitle : styles.peerAttachmentTitle]}>
                {getAttachmentTitle(message.type, media)}
              </Text>
              <Text style={[styles.attachmentMeta, isOwnMessage ? styles.ownAttachmentMeta : styles.peerAttachmentMeta]}>
                {getAttachmentMeta(media, message.attachments, message.type)}
              </Text>
              {mediaStatusText ? (
                <Text style={[styles.attachmentStatusText, media?.processingStatus === 'failed' ? styles.attachmentStatusTextFailed : null]}>
                  {mediaStatusText}
                </Text>
              ) : null}
            </View>
          </View>
          {isPlayableAudio ? (
            <Pressable
              onPress={(event: { stopPropagation: () => void }) => {
                event.stopPropagation();
                void onToggleAudioPlayback(mediaId, media.downloadUrl);
              }}
              style={[styles.audioPlaybackButton, isAudioPlaying ? styles.audioPlaybackButtonActive : null]}
            >
              {isAudioLoading ? (
                <ActivityIndicator size="small" color={telegramColors.accent} style={styles.audioPlaybackSpinner} />
              ) : (
                <Text style={[styles.audioPlaybackButtonText, isAudioPlaying ? styles.audioPlaybackButtonTextActive : null]}>
                  {isAudioPlaying ? '⏹ Stop' : '▶ Play'}
                </Text>
              )}
            </Pressable>
          ) : canOpenAttachment && mediaId ? (
            <Pressable
              onPress={(event: { stopPropagation: () => void }) => {
                event.stopPropagation();
                onOpenMediaAttachment(mediaId, message.type, media);
              }}
              style={styles.attachmentActionButton}
            >
              <Text style={styles.attachmentActionButtonText}>{attachmentActionLabel}</Text>
            </Pressable>
          ) : null}
          {audioPlaybackError ? <Text style={styles.attachmentInlineError}>{audioPlaybackError}</Text> : null}
          {mediaActionError ? <Text style={styles.attachmentInlineError}>{mediaActionError}</Text> : null}
        </View>
      ) : null}
      {message.text && message.text.trim().length > 0 ? (
        <Text style={[styles.messageBody, isOwnMessage ? styles.ownMessageBody : styles.peerMessageBody]}>
          {message.text}
        </Text>
      ) : null}
    </View>
  );
}

// ---------------------------------------------------------------------------
// MessageImagePreview — manages its own load/error state so that the parent
// pure-function renderer doesn't need per-image React state.
// ---------------------------------------------------------------------------

type MessageImagePreviewProps = {
  imageUrl: string;
  onPress: () => void;
};

function MessageImagePreview({ imageUrl, onPress }: MessageImagePreviewProps) {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <Pressable
      onPress={(event: { stopPropagation: () => void }) => {
        event.stopPropagation();
        onPress();
      }}
      style={styles.imagePreviewButton}
    >
      {/* Skeleton shown while image loads */}
      {loadState === 'loading' ? <View style={[styles.imagePreview, styles.imageSkeleton]} /> : null}

      {/* Error fallback */}
      {loadState === 'error' ? (
        <View style={[styles.imagePreview, styles.imageErrorPlaceholder]}>
          <Text style={styles.imageErrorText}>⚠ {t('chats.thread.image_load_error')}</Text>
        </View>
      ) : null}

      {/* Actual image — hidden until loaded to avoid flash */}
      <Image
        source={{ uri: imageUrl }}
        style={[styles.imagePreview, loadState !== 'loaded' ? styles.imageHidden : null]}
        onLoad={() => setLoadState('loaded')}
        onError={() => setLoadState('error')}
      />
    </Pressable>
  );
}

function formatAttachmentUploadProgressText(
  phase: PendingAttachmentUploadPhase | null,
  progress: number,
) {
  if (!phase || phase === 'preparing') {
    return undefined;
  }

  const normalizedProgress = Math.max(0, Math.min(1, progress));
  const progressPercent = phase === 'ready' ? 100 : Math.round(normalizedProgress * 100);

  return phase === 'finalizing' ? 'Finalizing…' : phase === 'ready' ? 'Upload complete' : progressPercent + '%';
}

// ---------------------------------------------------------------------------
// VideoThumbnail — shows the server-generated thumbnail (if available) with a
// play button overlay, or a styled placeholder when still processing.
// ---------------------------------------------------------------------------

type VideoThumbnailProps = {
  media: MediaObject;
  isProcessing: boolean;
  onPress: () => void;
};

function VideoThumbnail({ media, isProcessing, onPress }: VideoThumbnailProps) {
  const [thumbLoadState, setThumbLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const thumbnailUrl = resolveVideoThumbnailUrl(media);
  const isReady = isMediaReady(media);

  return (
    <Pressable
      onPress={(e: { stopPropagation: () => void }) => { e.stopPropagation(); onPress(); }}
      style={styles.videoThumbButton}
    >
      {/* Thumbnail image */}
      {thumbnailUrl && isReady ? (
        <>
          {thumbLoadState !== 'loaded' ? (
            <View style={[styles.videoThumb, styles.videoThumbSkeleton]} />
          ) : null}
          <Image
            source={{ uri: thumbnailUrl }}
            style={[styles.videoThumb, thumbLoadState !== 'loaded' ? styles.imageHidden : null]}
            resizeMode="cover"
            onLoad={() => setThumbLoadState('loaded')}
            onError={() => setThumbLoadState('error')}
          />
        </>
      ) : (
        // No thumbnail / still processing
        <View style={[styles.videoThumb, styles.videoThumbSkeleton]}>
          {isProcessing ? (
            <ActivityIndicator size="small" color={telegramColors.textSecondary} />
          ) : null}
        </View>
      )}

      {/* Play button overlay — only when ready */}
      {isReady ? (
        <View style={styles.videoPlayOverlay} pointerEvents="none">
          <View style={styles.videoPlayCircle}>
            <Text style={styles.videoPlayIcon}>▶</Text>
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

function getAttachmentTitle(type: string, media?: MediaObject | null) {
  switch (type) {
    case 'image':
      return media?.mimeType?.startsWith('image/') ? 'Photo' : 'Image';
    case 'video':
      return 'Video';
    case 'audio':
      return 'Voice message';
    case 'file':
      return 'File';
    default:
      return 'Attachment';
  }
}

function getAttachmentGlyph(type: string) {
  switch (type) {
    case 'image':
      return '◫';
    case 'video':
      return '▶';
    case 'audio':
      return '♪';
    case 'file':
      return '≣';
    default:
      return '•';
  }
}

function getAttachmentMeta(media: MediaObject | null, attachments: MessageAttachmentItem[], type: string) {
  if (media) {
    return formatMediaMeta(media);
  }

  if (attachments.length > 0) {
    return attachments[0]?.attachmentType ?? type;
  }

  return type;
}

function buildThreadImageGallery(messages: ThreadMessage[], mediaById: Record<string, MediaObject>) {
  return messages
    .filter((message) => message.type === 'image' && !message.deletedAt)
    .map((message) => {
      const primaryAttachment = message.attachments[0] ?? null;
      if (!primaryAttachment) {
        return null;
      }

      const media = mediaById[primaryAttachment.mediaId] ?? null;
      if (!media) {
        return null;
      }

      return {
        mediaId: primaryAttachment.mediaId,
        imageUrl: resolveImageUrl(media),
        message,
      };
    })
    .filter((item): item is { mediaId: string; imageUrl: string; message: ThreadMessage } => item !== null);
}

function resolveImageUrl(media: MediaObject) {
  const thumbVariant = media.variants.find((v) => v.variantType === 'thumbnail');
  return thumbVariant?.downloadUrl ?? media.variants[0]?.downloadUrl ?? media.downloadUrl;
}

function resolveVideoThumbnailUrl(media: MediaObject): string | null {
  const thumbVariant = media.variants.find((v) => v.variantType === 'thumbnail');
  return thumbVariant?.downloadUrl ?? null;
}

function resolvePlayableVideoUrl(media: MediaObject): string {
  const preferredVariantTypes = ['playback', 'video', 'mp4', 'stream', 'source'];
  for (const variantType of preferredVariantTypes) {
    const variant = media.variants.find((item) => item.variantType === variantType);
    if (variant?.downloadUrl) {
      return variant.downloadUrl;
    }
  }

  return media.downloadUrl;
}

function isMediaReady(media: MediaObject) {
  return media.processingStatus === 'ready';
}

function isPreviewableDocument(mimeType: string, url: string) {
  const normalized = mimeType.trim().toLowerCase();
  if (['application/pdf', 'text/plain', 'application/json', 'text/markdown'].includes(normalized)) {
    return true;
  }

  const extension = extractUrlExtension(url);
  return ['pdf', 'txt', 'md', 'json', 'rtf'].includes(extension);
}

function extractUrlExtension(value: string) {
  const cleanValue = value.split('?')[0] ?? value;
  const segments = cleanValue.split('.');
  return segments.length > 1 ? segments[segments.length - 1]?.trim().toLowerCase() ?? '' : '';
}

function buildDocumentPreviewTitle(media: MediaObject) {
  const extension = extractUrlExtension(media.downloadUrl);
  if (extension) {
    return `Document.${extension}`;
  }

  const normalizedMimeType = media.mimeType.trim().toLowerCase();
  switch (normalizedMimeType) {
    case 'application/pdf':
      return 'Document.pdf';
    case 'text/plain':
      return 'Document.txt';
    case 'application/json':
      return 'Document.json';
    case 'text/markdown':
      return 'Document.md';
    default:
      return 'Document';
  }
}

function formatMediaProcessingStatus(processingStatus: string) {
  switch (processingStatus) {
    case 'pending':
      return 'Preparing media…';
    case 'uploaded':
      return 'Uploaded · waiting for processing';
    case 'processing':
      return 'Processing media…';
    case 'failed':
      return 'Media processing failed';
    case 'deleted':
      return 'Media unavailable';
    default:
      return null;
  }
}

function formatMediaMeta(media: MediaObject) {
  const sizeLabel = media.sizeBytes > 0 ? ' · ' + formatBytes(media.sizeBytes) : '';
  return media.mimeType + sizeLabel;
}

function formatPendingAttachmentMeta(attachment: PendingMediaAttachment, uploadPhase: PendingAttachmentUploadPhase | null) {
  const sizeLabel = typeof attachment.fileSizeBytes === 'number' ? ' · ' + formatBytes(attachment.fileSizeBytes) : '';
  const durationLabel = attachment.kind === 'audio' && typeof attachment.durationMs === 'number' ? ' · ' + formatDuration(attachment.durationMs) : '';
  const phaseLabel = uploadPhase ? ' · ' + formatAttachmentUploadPhase(uploadPhase) : '';
  return attachment.kind.toUpperCase() + (attachment.mimeType ? ' · ' + attachment.mimeType : '') + durationLabel + sizeLabel + phaseLabel;
}

function formatAttachmentUploadPhase(uploadPhase: PendingAttachmentUploadPhase) {
  switch (uploadPhase) {
    case 'preparing':
      return 'Preparing';
    case 'uploading':
      return 'Uploading';
    case 'finalizing':
      return 'Finalizing';
    case 'ready':
      return 'Ready';
  }
}

function formatBytes(value: number) {
  if (value < 1024) {
    return value + ' B';
  }

  if (value < 1024 * 1024) {
    return Math.round(value / 1024) + ' KB';
  }

  return (value / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDuration(durationMs: number) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatCallDurationSec(durationSec: number) {
  return formatDuration(durationSec * 1000);
}

function getDeliveryMarker(delivery: { delivered: boolean; seen: boolean }) {
  if (delivery.seen) {
    return '✓✓✓';
  }

  if (delivery.delivered) {
    return '✓✓';
  }

  return '✓';
}

function formatPeerMessageMeta(message: ThreadMessage) {
  const editedMarker = message.editedAt ? ' · edited' : '';
  return formatTimestamp(message.createdAt) + editedMarker;
}

function renderOwnMessageMeta(message: ThreadMessage) {
  const deliveryMarker = getDeliveryMarker(message.delivery);

  return (
    <Text style={[styles.messageMeta, styles.ownMessageMeta]}>
      <Text>{formatTimestamp(message.createdAt)}</Text>
      {deliveryMarker ? (
        <Text style={[styles.deliveryMarker, message.delivery.seen ? styles.deliveryMarkerSeen : styles.deliveryMarkerDelivered]}>
          {' ' + deliveryMarker}
        </Text>
      ) : null}
      {message.editedAt ? <Text>{' · edited'}</Text> : null}
    </Text>
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatChatHeaderSubtitle(presence: ProfilePresence | null, fallbackSubtitle?: string | null) {
  if (!presence) {
    return fallbackSubtitle ?? undefined;
  }

  if (!presence.canViewLastSeen) {
    return fallbackSubtitle ?? undefined;
  }

  if (!presence.lastSeenAt) {
    return 'Last seen recently';
  }

  return formatLastSeenLabel(presence.lastSeenAt);
}

function formatLastSeenLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Last seen recently';
  }

  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (sameDay) {
    return `Last seen today at ${date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })}`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isYesterday) {
    return `Last seen yesterday at ${date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })}`;
  }

  return `Last seen ${date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  })} at ${date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}

function getSendErrorMessage(error: ApiError) {
  const reason = getApiErrorReason(error);

  switch (reason) {
    case 'blocked_by_user_policy':
      return 'You cannot send a message because one of you has blocked the other.';
    case 'membership_missing':
    case 'membership_inactive':
      return 'You no longer have access to this conversation.';
    case 'send_restricted':
      return 'You are not allowed to send messages in this conversation.';
    case 'chat_missing':
      return 'This conversation no longer exists.';
    default:
      return getApiErrorMessage(error, 'Unable to send message');
  }
}

function getApiErrorMessage(error: ApiError, fallbackMessage: string) {
  if (typeof error.message === 'string' && error.message.trim().length > 0) {
    return error.message;
  }

  if (Array.isArray(error.message) && error.message.length > 0) {
    return error.message.join(', ');
  }

  return fallbackMessage;
}

function getApiErrorReason(error: ApiError) {
  const details = error.details;

  if (!details || typeof details !== 'object' || !('reason' in details)) {
    return null;
  }

  const reason = (details as { reason?: unknown }).reason;
  return typeof reason === 'string' ? reason : null;
}

const styles = StyleSheet.create({
  screenContent: {
    gap: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  headerButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 28,
    minWidth: 28,
    paddingHorizontal: 2,
  },
  headerButtonDisabled: {
    opacity: 0.55,
  },
  headerButtonText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  threadRoot: {
    backgroundColor: telegramColors.appBackground,
    flex: 1,
    gap: 0,
  },
  threadSearchShell: {
    backgroundColor: '#f8fafd',
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
  },
  threadSearchFieldWrap: {
    paddingHorizontal: 0,
  },
  threadSearchMetaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  threadSearchMetaText: {
    color: telegramColors.textSecondary,
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  threadSearchActions: {
    flexDirection: 'row',
    gap: 8,
  },
  threadSearchActionButton: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  threadSearchActionButtonDisabled: {
    opacity: 0.45,
  },
  threadSearchActionText: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  threadSearchResultList: {
    gap: 8,
  },
  threadSearchResultCard: {
    backgroundColor: '#EEEDF5',
    borderRadius: 14,
    gap: 3,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  threadSearchResultCardLoaded: {
    backgroundColor: '#E8E0F5',
  },
  threadSearchResultTitle: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  threadSearchResultBody: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
  },
  threadSearchResultMeta: {
    color: telegramColors.textSecondary,
    fontSize: 12,
  },
  messageScrollView: {
    flex: 1,
  },
  messageList: {
    gap: 4,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 14,
  },
  emptyText: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 24,
    textAlign: 'center',
  },
  messageRow: {
    flexDirection: 'row',
  },
  swipeableBubbleShell: {
    position: 'relative',
  },
  swipeReplyIndicator: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    marginTop: -15,
    width: 30,
  },
  swipeReplyIndicatorPeer: {
    left: -40,
  },
  swipeReplyIndicatorOwn: {
    right: -40,
  },
  swipeReplyIndicatorText: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  systemEventRow: {
    alignItems: 'center',
    marginVertical: 4,
  },
  systemEventCard: {
    alignItems: 'center',
    backgroundColor: '#EDE8F5',
    borderRadius: 14,
    gap: 2,
    maxWidth: '84%',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  systemEventTitle: {
    color: '#5B4FA0',
    fontSize: 13,
    fontWeight: '700',
  },
  systemEventMeta: {
    color: telegramColors.textSecondary,
    fontSize: 12,
  },
  ownMessageRow: {
    justifyContent: 'flex-end',
  },
  peerMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    borderRadius: 18,
    gap: 4,
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 8,
  },
  ownMessageBubble: {
    backgroundColor: telegramColors.outgoingBubble,
    borderBottomRightRadius: 6,
  },
  peerMessageBubble: {
    backgroundColor: telegramColors.incomingBubble,
    borderBottomLeftRadius: 6,
  },
  realUiBubblePressable: {
    maxWidth: '75%',
  },
  pendingMessageBubble: {
    opacity: 0.78,
  },
  failedMessageBubble: {
    borderColor: '#D9A0A0',
    borderWidth: 1,
  },
  searchMatchedBubble: {
    shadowColor: '#f2c94c',
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  currentSearchMatchBubble: {
    borderColor: '#f2c94c',
    borderWidth: 2,
  },
  selectedMessageBubble: {
    backgroundColor: 'rgba(46, 166, 255, 0.12)',
    borderColor: 'rgba(46, 166, 255, 0.26)',
    borderWidth: 1,
    borderRadius: 22,
    shadowColor: telegramColors.accent,
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },
  replyPreview: {
    borderLeftWidth: 2.5,
    borderRadius: 12,
    gap: 2,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  ownReplyPreview: {
    backgroundColor: '#c9f0c1',
    borderLeftColor: telegramColors.accent,
  },
  peerReplyPreview: {
    backgroundColor: '#f1f1f4',
    borderLeftColor: telegramColors.accent,
  },
  replyPreviewAuthor: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  replyPreviewText: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  senderLabel: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 1,
  },
  messageContentGroup: {
    gap: 8,
  },
  systemMessageCard: {
    alignItems: 'center',
    gap: 2,
  },
  systemMessageTitle: {
    color: '#1c5ea8',
    fontSize: 14,
    fontWeight: '700',
  },
  systemMessageBody: {
    color: telegramColors.textSecondary,
    fontSize: 12,
  },
  imagePreviewButton: {
    alignSelf: 'flex-start',
  },
  imagePreview: {
    borderRadius: 14,
    height: 188,
    width: 232,
  },
  imageHidden: {
    // Keep layout space but invisible — revealed by onLoad to avoid blank flash.
    opacity: 0,
    position: 'absolute',
  },
  imageSkeleton: {
    backgroundColor: telegramColors.surfaceMuted,
  },
  imageSkeletonWrap: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 14,
    height: 188,
    justifyContent: 'center',
    width: 232,
  },
  // ── Video thumbnail ────────────────────────────────────────────────────────
  videoThumbButton: {
    alignSelf: 'flex-start',
  },
  videoThumb: {
    borderRadius: 14,
    height: 188,
    width: 232,
  },
  videoThumbSkeleton: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMuted,
    justifyContent: 'center',
  },
  videoPlayOverlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  videoPlayCircle: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 32,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  videoPlayIcon: {
    color: '#ffffff',
    fontSize: 20,
    marginLeft: 3, // optical centering of ▶
  },

  imageErrorPlaceholder: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMuted,
    justifyContent: 'center',
  },
  imageErrorText: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  audioPlaybackSpinner: {
    marginHorizontal: 8,
  },
  imageViewerOverlay: {
    backgroundColor: 'rgba(8, 10, 14, 0.96)',
    flex: 1,
  },
  imageViewerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  imageViewerMetaGroup: {
    flex: 1,
    minWidth: 0,
    gap: 3,
    paddingRight: 12,
  },
  imageViewerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    flexShrink: 1,
  },
  imageViewerMeta: {
    color: '#b8c2cf',
    fontSize: 12,
    flexShrink: 1,
  },
  imageViewerBody: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingBottom: 20,
    paddingTop: 8,
  },
  imageViewerImageWrap: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    paddingHorizontal: 12,
    minHeight: 0,
  },
  imageViewerImage: {
    flex: 1,
    maxHeight: '82%',
    width: '100%',
  },
  imageViewerCaptionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: 14,
    maxWidth: '100%',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  imageViewerCaptionText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 19,
  },
  imageViewerNavButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 56,
    paddingHorizontal: 12,
  },
  imageViewerNavButtonDisabled: {
    opacity: 0.35,
  },
  imageViewerNavText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  imageViewerCloseButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 999,
    justifyContent: 'center',
    marginLeft: 12,
    minHeight: 38,
    paddingHorizontal: 14,
  },
  imageViewerCloseText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  deletedMessageText: {
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  ownDeletedMessageText: {
    color: '#6B5FA0',
  },
  peerDeletedMessageText: {
    color: telegramColors.textSecondary,
  },
  messageBody: {
    fontSize: 16,
    lineHeight: 21,
  },
  ownMessageBody: {
    color: telegramColors.textPrimary,
  },
  peerMessageBody: {
    color: telegramColors.textPrimary,
  },
  attachmentCard: {
    borderRadius: 15,
    gap: 8,
    minWidth: 176,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  ownAttachmentCard: {
    backgroundColor: '#c9f0c1',
  },
  peerAttachmentCard: {
    backgroundColor: telegramColors.surfaceMuted,
  },
  attachmentTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  attachmentThumb: {
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  ownAttachmentThumb: {
    backgroundColor: '#bce8b4',
  },
  peerAttachmentThumb: {
    backgroundColor: '#ffffff',
  },
  attachmentThumbText: {
    color: telegramColors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  attachmentTextGroup: {
    flex: 1,
    gap: 2,
  },
  attachmentTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  ownAttachmentTitle: {
    color: telegramColors.textPrimary,
  },
  peerAttachmentTitle: {
    color: telegramColors.textPrimary,
  },
  attachmentMeta: {
    fontSize: 12,
    fontWeight: '500',
  },
  attachmentStatusText: {
    color: telegramColors.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  attachmentStatusTextFailed: {
    color: telegramColors.destructive,
  },
  ownAttachmentMeta: {
    color: telegramColors.textSecondary,
  },
  peerAttachmentMeta: {
    color: telegramColors.textSecondary,
  },
  audioPlaybackButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 999,
    marginTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  audioPlaybackButtonActive: {
    backgroundColor: telegramColors.accentSoft,
  },
  audioPlaybackButtonText: {
    color: telegramColors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  audioPlaybackButtonTextActive: {
    color: telegramColors.accent,
  },
  attachmentActionButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 999,
    marginTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  attachmentActionButtonText: {
    color: telegramColors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  attachmentInlineError: {
    color: telegramColors.destructive,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  reactionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 5,
  },
  reactionChip: {
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  ownReactionChip: {
    backgroundColor: '#eef7ff',
  },
  reactionChipText: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  messageMeta: {
    fontSize: 11,
    marginTop: 1,
    textAlign: 'right',
  },
  ownMessageMeta: {
    color: '#6B5FA0',
  },
  peerMessageMeta: {
    color: telegramColors.textTertiary,
  },
  failedMessageFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    marginTop: 1,
  },
  failedMessageMeta: {
    color: telegramColors.destructive,
  },
  retryMessageButton: {
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  retryMessageButtonText: {
    color: telegramColors.accent,
    fontSize: 11,
    fontWeight: '700',
  },
  deliveryMarker: {
    fontWeight: '700',
  },
  deliveryMarkerDelivered: {
    color: '#7b8a76',
  },
  deliveryMarkerSeen: {
    color: telegramColors.accent,
  },
  messageContextOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
  },
  messageContextBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 14, 22, 0.16)',
  },
  messageContextLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  messageContextReactionTray: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 22,
    elevation: 14,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 7,
    position: 'absolute',
    shadowColor: '#0d1529',
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  messageContextReactionButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    justifyContent: 'center',
    minWidth: 34,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  messageContextReactionButtonActive: {
    backgroundColor: telegramColors.accentSoft,
  },
  messageContextReactionText: {
    fontSize: 22,
  },
  messageContextActionSheet: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 18,
    elevation: 14,
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: '#0d1529',
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  messageContextActionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 48,
    paddingHorizontal: 14,
  },
  messageContextActionRowBorder: {
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
  },
  messageContextActionIcon: {
    color: telegramColors.accent,
    fontSize: 16,
    width: 20,
  },
  messageContextActionIconDanger: {
    color: telegramColors.destructive,
  },
  messageContextActionText: {
    color: telegramColors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  messageContextActionTextDanger: {
    color: telegramColors.destructive,
  },
  feedbackBar: {
    backgroundColor: '#fbfcff',
    borderTopColor: telegramColors.separator,
    borderTopWidth: telegramLayout.hairlineWidth,
    gap: 2,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    color: '#1f7a46',
    fontSize: 12,
    textAlign: 'center',
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 12,
    textAlign: 'center',
  },
  typingBar: {
    paddingHorizontal: 18,
    paddingVertical: 5,
  },
  typingText: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
  composerShell: {
    backgroundColor: telegramColors.navBg,
    borderTopColor: telegramColors.separator,
    borderTopWidth: telegramLayout.hairlineWidth,
  },
  composerShellContent: {
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  composerContextBar: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 8,
    minHeight: 38,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  contextAccent: {
    alignSelf: 'stretch',
    backgroundColor: telegramColors.accent,
    borderRadius: 999,
    width: 3,
  },
  composerContextTextGroup: {
    flex: 1,
    gap: 1,
  },
  composerContextLabel: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  composerContextPreview: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    lineHeight: 17,
  },
  contextDismissButton: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  contextDismissButtonText: {
    color: telegramColors.textTertiary,
    fontSize: 14,
    fontWeight: '700',
  },
  voiceRecordingBar: {
    alignItems: 'center',
    backgroundColor: '#fff1e2',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  voiceRecordingPulse: {
    backgroundColor: '#f97316',
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  voiceRecordingTextGroup: {
    flex: 1,
    gap: 2,
  },
  voiceRecordingTitle: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  voiceRecordingMeta: {
    color: telegramColors.textSecondary,
    fontSize: 12,
  },
  voiceRecordingActionButton: {
    justifyContent: 'center',
    minHeight: 28,
  },
  voiceRecordingCancelText: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  voiceRecordingStopText: {
    color: '#f97316',
    fontSize: 13,
    fontWeight: '700',
  },
  pendingAttachmentList: {
    gap: 6,
  },
  pendingAttachmentFailureCard: {
    alignItems: 'center',
    backgroundColor: '#fff3f1',
    borderColor: '#f1c0b7',
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  pendingAttachmentFailureTextGroup: {
    flex: 1,
    gap: 2,
  },
  pendingAttachmentFailureTitle: {
    color: telegramColors.destructive,
    fontSize: 13,
    fontWeight: '700',
  },
  pendingAttachmentFailureBody: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  pendingAttachmentRetryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  pendingAttachmentRetryText: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  pendingAttachmentCard: {
    alignItems: 'center',
    backgroundColor: '#f5f7fb',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  pendingAttachmentPreview: {
    borderRadius: 12,
    height: 48,
    width: 48,
  },
  pendingAttachmentTextGroup: {
    flex: 1,
    gap: 2,
  },
  pendingAttachmentTitle: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  pendingAttachmentMeta: {
    color: telegramColors.textSecondary,
    fontSize: 12,
  },
  pendingAttachmentProgressGroup: {
    gap: 3,
    marginTop: 4,
  },
  pendingAttachmentProgressTrack: {
    backgroundColor: '#d8dce4',
    borderRadius: 999,
    height: 4,
    overflow: 'hidden',
  },
  pendingAttachmentProgressFill: {
    backgroundColor: telegramColors.accent,
    borderRadius: 999,
    height: 4,
  },
  pendingAttachmentProgressText: {
    color: telegramColors.textTertiary,
    fontSize: 11,
    fontWeight: '500',
  },
  pendingAttachmentRemoveButton: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  pendingAttachmentRemoveText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '500',
  },
  attachmentTray: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  attachmentAction: {
    alignItems: 'center',
    backgroundColor: '#f4f7fb',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  attachmentActionDot: {
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  attachmentActionLabel: {
    color: telegramColors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  composerRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
  },
  realUiComposerRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
  },
  realUiComposerWrap: {
    flex: 1,
    minHeight: 52,
    overflow: 'hidden',
    borderRadius: 22,
    ...telegramShadows.card,
  },
  attachButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginBottom: 0,
    width: 36,
  },
  attachButtonActive: {
    backgroundColor: telegramColors.accentSoft,
  },
  attachButtonText: {
    color: telegramColors.textSecondary,
    fontSize: 18,
    lineHeight: 18,
  },
  inputShell: {
    backgroundColor: telegramColors.surface,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minHeight: 36,
    ...telegramShadows.card,
  },
  input: {
    color: telegramColors.textPrimary,
    flex: 1,
    fontSize: 15,
    maxHeight: 110,
    minHeight: 36,
    paddingHorizontal: 14,
    paddingTop: 9,
    paddingBottom: 9,
    textAlignVertical: 'center',
  },
  inputEmojiSlot: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    marginRight: 10,
    width: 28,
  },
  inputEmojiText: {
    color: telegramColors.textSecondary,
    fontSize: 17,
  },
  inputDisabled: {
    opacity: 0.7,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.accent,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginBottom: 0,
    width: 36,
    ...telegramShadows.button,
  },
  sendButtonDisabled: {
    opacity: 0.55,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  voiceHoldButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.accent,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    marginBottom: 0,
    width: 36,
    ...telegramShadows.button,
  },
  voiceHoldButtonActive: {
    backgroundColor: '#ef4444',
  },
  voiceHoldButtonText: {
    color: '#ffffff',
    fontSize: 17,
  },
  forwardedLabel: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  forwardPickerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  forwardPickerSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  forwardPickerHeader: {
    alignItems: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  forwardPickerTitle: {
    color: telegramColors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
  },
  forwardPickerClose: {
    paddingHorizontal: 4,
  },
  forwardPickerCloseText: {
    color: telegramColors.accent,
    fontSize: 16,
  },
  forwardPickerList: {
    flexGrow: 0,
  },
  forwardPickerRow: {
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  forwardPickerRowDisabled: {
    opacity: 0.4,
  },
  forwardPickerRowTitle: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  forwardPickerRowSub: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
});
