import type { MessageId, ReplyRef } from '../../types';

/**
 * Composer as a tiny state machine.
 *
 * The Composer has one piece of draft text and one optional "modifier"
 * (replying-to or editing) at a time. Modeling them as a union on a single
 * state field rejects illegal states like "editing + replying at the same
 * time" at the type level.
 */

export type ComposerModifier =
  | { readonly kind: 'none' }
  | { readonly kind: 'reply'; readonly target: ReplyRef }
  | { readonly kind: 'edit'; readonly messageId: MessageId; readonly originalBody: string };

export interface ComposerState {
  readonly text: string;
  readonly modifier: ComposerModifier;
}

export const initialComposerState: ComposerState = {
  text: '',
  modifier: { kind: 'none' },
};

export type ComposerAction =
  | { readonly type: 'setText'; readonly text: string }
  | { readonly type: 'startReply'; readonly target: ReplyRef }
  | { readonly type: 'cancelModifier' }
  | {
      readonly type: 'startEdit';
      readonly messageId: MessageId;
      readonly originalBody: string;
    }
  | { readonly type: 'reset' };

export function composerReducer(state: ComposerState, action: ComposerAction): ComposerState {
  switch (action.type) {
    case 'setText':
      return state.text === action.text ? state : { ...state, text: action.text };

    case 'startReply':
      return { ...state, modifier: { kind: 'reply', target: action.target } };

    case 'cancelModifier':
      return state.modifier.kind === 'none'
        ? state
        : {
            text: state.modifier.kind === 'edit' ? '' : state.text,
            modifier: { kind: 'none' },
          };

    case 'startEdit':
      return {
        text: action.originalBody,
        modifier: {
          kind: 'edit',
          messageId: action.messageId,
          originalBody: action.originalBody,
        },
      };

    case 'reset':
      return initialComposerState;
  }
}

/** Whether the composer has sendable content — non-empty after trimming. */
export function canSend(state: ComposerState): boolean {
  return state.text.trim().length > 0;
}
