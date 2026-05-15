import { memo, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useRef, forwardRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  type TextInput as RNTextInput,
} from 'react-native';
import { useSendMessage } from '../../hooks/useSendMessage';
import { useTheme } from '../../theme/ThemeContext';
import type { ChatId, MessageId, ReplyRef } from '../../types';
import { ComposerActions } from './ComposerActions';
import { ComposerInput } from './ComposerInput';
import { ReplyChip } from './ReplyChip';
import {
  canSend as computeCanSend,
  composerReducer,
  initialComposerState,
  type ComposerModifier,
} from './composerReducer';

/**
 * Composer — the bar at the bottom of a chat screen.
 *
 * Responsibilities:
 *   - Owns draft text + modifier (reply/edit) via a reducer.
 *   - Delegates send to useSendMessage (optimistic mutation).
 *   - Exposes an imperative handle so parents (e.g. a MessageList's long-press
 *     menu) can ask the Composer to "reply to X" or "edit X" without
 *     threading callbacks through.
 *
 * Non-goals (Phase 7):
 *   - Attachments, voice, stickers, smart replies — buttons will land in M3.
 *   - Typing indicators — live in a separate presence channel, not here.
 */

export interface ComposerHandle {
  readonly focus: () => void;
  readonly startReply: (target: ReplyRef) => void;
  readonly startEdit: (messageId: MessageId, originalBody: string) => void;
  readonly reset: () => void;
}

export interface ComposerProps {
  readonly chatId: ChatId;
  /** Hook called when the user triggers "save" while in edit mode. */
  readonly onSubmitEdit?: (messageId: MessageId, nextBody: string) => void;
  readonly onSendStart?: (body: string) => void;
  readonly onTextChange?: (text: string) => void;
  readonly onFocus?: () => void;
  readonly onModifierChange?: (modifier: ComposerModifier) => void;
  readonly placeholder?: string;
  readonly keyboardAvoiding?: boolean;
}

function modifierToReplyRef(modifier: ComposerModifier): ReplyRef | undefined {
  return modifier.kind === 'reply' ? modifier.target : undefined;
}

function ComposerImpl(
  {
    chatId,
    onSubmitEdit,
    onSendStart,
    onTextChange,
    onFocus,
    onModifierChange,
    placeholder,
    keyboardAvoiding = true,
  }: ComposerProps,
  forwardedRef: React.Ref<ComposerHandle>,
) {
  const theme = useTheme();
  const inputRef = useRef<RNTextInput>(null);
  const [state, dispatch] = useReducer(composerReducer, initialComposerState);
  const { send } = useSendMessage();

  const sendable = computeCanSend(state);
  const isEditing = state.modifier.kind === 'edit';

  const handleChangeText = useCallback((text: string) => {
    dispatch({ type: 'setText', text });
  }, []);

  const handleCancelModifier = useCallback(() => {
    dispatch({ type: 'cancelModifier' });
  }, []);

  // Guards against double-tap races. The reducer's `reset` doesn't flush
  // synchronously, so two presses in the same tick would otherwise both read
  // `state.text` from the memoized closure and fire two sends. We release
  // the lock on the next microtask — the UI will have re-rendered with the
  // cleared text by then, so the natural `sendable` check takes over.
  const sendingLockRef = useRef(false);
  const preserveKeyboardRef = useRef(false);
  const preserveKeyboardTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const restoreFocus = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    });
  }, []);

  const clearPreserveKeyboard = useCallback(() => {
    preserveKeyboardRef.current = false;
    if (preserveKeyboardTimeoutRef.current) {
      clearTimeout(preserveKeyboardTimeoutRef.current);
      preserveKeyboardTimeoutRef.current = null;
    }
  }, []);

  const armPreserveKeyboard = useCallback(() => {
    preserveKeyboardRef.current = true;
    if (preserveKeyboardTimeoutRef.current) {
      clearTimeout(preserveKeyboardTimeoutRef.current);
    }
    preserveKeyboardTimeoutRef.current = setTimeout(() => {
      preserveKeyboardRef.current = false;
      preserveKeyboardTimeoutRef.current = null;
    }, 500);
  }, []);

  const restoreFocusAndKeepKeyboard = useCallback(() => {
    armPreserveKeyboard();
    restoreFocus();
  }, [armPreserveKeyboard, restoreFocus]);

  const handleInputBlur = useCallback(() => {
    if (!preserveKeyboardRef.current) {
      return;
    }

    restoreFocus();
  }, [restoreFocus]);

  const handleSend = useCallback(() => {
    if (sendingLockRef.current) return;
    if (!sendable) return;
    const trimmed = state.text.trim();
    if (trimmed.length === 0) return;

    sendingLockRef.current = true;
    Promise.resolve().then(() => {
      sendingLockRef.current = false;
    });

    if (state.modifier.kind === 'edit') {
      onSubmitEdit?.(state.modifier.messageId, trimmed);
      dispatch({ type: 'reset' });
      restoreFocusAndKeepKeyboard();
      return;
    }

    const replyTo = modifierToReplyRef(state.modifier);
    onSendStart?.(trimmed);
    send({
      chatId,
      body: trimmed,
      ...(replyTo !== undefined ? { replyTo } : {}),
    });
    dispatch({ type: 'reset' });
    restoreFocusAndKeepKeyboard();
  }, [chatId, onSendStart, onSubmitEdit, restoreFocusAndKeepKeyboard, send, sendable, state.modifier, state.text]);

  useEffect(() => {
    return () => {
      clearPreserveKeyboard();
    };
  }, [clearPreserveKeyboard]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      focus: () => inputRef.current?.focus(),
      startReply: (target) => {
        dispatch({ type: 'startReply', target });
        inputRef.current?.focus();
      },
      startEdit: (messageId, originalBody) => {
        dispatch({ type: 'startEdit', messageId, originalBody });
        inputRef.current?.focus();
      },
      reset: () => dispatch({ type: 'reset' }),
    }),
    [],
  );

  useEffect(() => {
    onTextChange?.(state.text);
  }, [onTextChange, state.text]);

  useEffect(() => {
    onModifierChange?.(state.modifier);
  }, [onModifierChange, state.modifier]);

  const chipProps = useMemo(() => {
    const modifier = state.modifier;
    if (modifier.kind === 'reply') {
      return {
        label: `Reply to ${modifier.target.senderName}`,
        preview: modifier.target.preview,
      };
    }
    if (modifier.kind === 'edit') {
      return {
        label: 'Editing message',
        preview: modifier.originalBody,
      };
    }
    return null;
  }, [state.modifier]);

  const containerStyle = useMemo(() => {
    return [
      styles.outer,
      {
        backgroundColor: theme.colors.surfaceRaised,
        borderTopColor: theme.colors.border,
      },
    ];
  }, [theme.colors.surfaceRaised, theme.colors.border]);

  const inputRowStyle = useMemo(() => {
    return [
      styles.inputRow,
      {
        backgroundColor: theme.colors.surfaceInput,
        borderRadius: theme.radius.lg,
      },
    ];
  }, [theme.colors.surfaceInput, theme.radius.lg]);

  const composerContent = (
    <>
      {chipProps !== null ? (
        <ReplyChip
          label={chipProps.label}
          preview={chipProps.preview}
          onCancel={handleCancelModifier}
        />
      ) : null}
      <View style={styles.row}>
        <View style={inputRowStyle}>
          <ComposerInput
            ref={inputRef}
            value={state.text}
            onChangeText={handleChangeText}
            {...(onFocus !== undefined ? { onFocus } : {})}
            onBlur={handleInputBlur}
            {...(placeholder !== undefined ? { placeholder } : {})}
          />
          <View style={styles.emojiSlot}>
            <Text style={styles.emojiText}>😊</Text>
          </View>
        </View>
        <ComposerActions
          canSend={sendable}
          isEditing={isEditing}
          onSend={handleSend}
          onSendPressIn={restoreFocusAndKeepKeyboard}
        />
      </View>
    </>
  );

  if (!keyboardAvoiding) {
    return <View style={containerStyle}>{composerContent}</View>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={containerStyle}
    >
      {composerContent}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 2,
    minHeight: 40,
    justifyContent: 'center',
  },
  emojiSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    marginLeft: 8,
    width: 28,
  },
  emojiText: {
    fontSize: 18,
  },
});

export const Composer = memo(forwardRef<ComposerHandle, ComposerProps>(ComposerImpl));
