/**
 * Domain types shared across UI package.
 *
 * Branded ID aliases are kept as plain string unions for ergonomics. If/when
 * the wider app adopts nominal typing (e.g. via a Brand<> helper in @telegram/shared),
 * these can be tightened without changing call sites.
 */

export type MessageId = string;
export type ChatId = string;
export type UserId = string;

/** Delivery lifecycle of an outgoing message. */
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Reaction {
  readonly emoji: string;
  readonly count: number;
  /** Whether the current user is among those who reacted. */
  readonly reactedByMe: boolean;
}

/** Lightweight reference to the message being replied to, embedded in the parent. */
export interface ReplyRef {
  readonly messageId: MessageId;
  readonly senderName: string;
  readonly preview: string;
}

/** Lightweight forwarded metadata rendered above the authored body text. */
export interface ForwardedRef {
  readonly originalMessageId?: MessageId;
  readonly originalSenderName?: string;
}

export interface MediaRef {
  readonly type: 'image' | 'video' | 'file' | 'audio';
  readonly url?: string;
  readonly thumbnailUrl?: string;
  readonly fileName?: string;
  readonly mimeType?: string;
  readonly size?: number;
}

interface BaseMessage {
  readonly id: MessageId;
  readonly chatId: ChatId;
  readonly senderId: UserId;
  readonly senderLabel?: string;
  readonly avatar?: string | null;
  readonly media?: ReadonlyArray<MediaRef>;
  readonly createdAt: number;
  readonly status: MessageStatus;
  readonly reactions: ReadonlyArray<Reaction>;
  readonly editedAt?: number;
  readonly deleted?: boolean;
  readonly deletedAt?: number;
  readonly replyTo?: ReplyRef;
  readonly forwarded?: ForwardedRef;
}

export interface TextMessage extends BaseMessage {
  readonly type: 'text';
  readonly body: string;
}

/**
 * Message is a discriminated union. For Phase 7 only `text` exists; media
 * variants land in M3. New variants must be added here, not in component props.
 */
export type Message = TextMessage;

export interface User {
  readonly id: UserId;
  readonly displayName: string;
  readonly avatarUrl?: string;
}

/** O(1) message cache keyed by id; the order list is maintained separately. */
export type MessageMap = Record<MessageId, Message>;
