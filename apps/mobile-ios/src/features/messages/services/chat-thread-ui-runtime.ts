import type { QueryClient } from '@tanstack/react-query';

import type { ThreadDataMessage } from '@features/messages/hooks/useThreadDataLifecycle';
import type { MediaObject } from '@features/messages/api/media.api';
import { resolveKnownUserLabel } from '@shared/chats/chat-directory.store';
import {
  queryKeys,
  type ForwardedRef as UiForwardedRef,
  type MediaRef as UiMediaRef,
  type Message as UiMessage,
  type MessageMap as UiMessageMap,
  type MessageStatus as UiMessageStatus,
  type ReplyRef as UiReplyRef,
} from '@telegram/ui';

export function syncChatThreadMessagesToRealUiCache(params: {
  chatId: string;
  messages: ThreadDataMessage[];
  threadMessages?: ThreadDataMessage[];
  mediaById?: Record<string, MediaObject>;
  shouldShowSenderLabel?: boolean;
  currentUserId?: string;
  currentUserDisplayName?: string | null;
  queryClient: QueryClient;
}) {
  const {
    chatId,
    messages,
    threadMessages,
    mediaById,
    shouldShowSenderLabel,
    currentUserId,
    currentUserDisplayName,
    queryClient,
  } = params;
  if (!chatId) {
    return;
  }

  const replyResolutionMessages = threadMessages ?? messages;

  const normalizedMessages = messages
    .filter((message) => !isCallEventMessage(message))
    .map((message) =>
      mapThreadMessageToUiMessage(
        message,
        replyResolutionMessages,
        mediaById,
        shouldShowSenderLabel,
        currentUserId,
        currentUserDisplayName,
      ),
    );

  const messageIds = normalizedMessages.map((message) => message.id);
  const previousMessageMap = queryClient.getQueryData<UiMessageMap>(queryKeys.messages(chatId)) ?? ({} as UiMessageMap);
  const previousMessageIds = queryClient.getQueryData<readonly string[]>(queryKeys.messageIds(chatId)) ?? [];

  const nextMessageMap = {} as UiMessageMap;
  let hasMessageMapChanges = Object.keys(previousMessageMap).length !== normalizedMessages.length;

  for (const message of normalizedMessages) {
    const previousMessage = previousMessageMap[message.id];
    const stableMessage = previousMessage && areUiMessagesEqual(previousMessage, message) ? previousMessage : message;
    nextMessageMap[message.id] = stableMessage;

    if (stableMessage !== previousMessage) {
      hasMessageMapChanges = true;
    }
  }

  const hasMessageIdsChanges = !areMessageIdsEqual(previousMessageIds, messageIds);

  if (!hasMessageMapChanges && !hasMessageIdsChanges) {
    return;
  }

  if (hasMessageMapChanges) {
    queryClient.setQueryData(queryKeys.messages(chatId), nextMessageMap);
  }

  if (hasMessageIdsChanges) {
    queryClient.setQueryData(queryKeys.messageIds(chatId), messageIds);
  }
}

function mapThreadMessageToUiMessage(
  message: ThreadDataMessage,
  threadMessages: ThreadDataMessage[],
  mediaById: Record<string, MediaObject> | undefined,
  shouldShowSenderLabel?: boolean,
  currentUserId?: string,
  currentUserDisplayName?: string | null,
): UiMessage {
  const editedAt = message.editedAt ? Date.parse(message.editedAt) || undefined : undefined;
  const replyTo = buildReplyRef(message, threadMessages, currentUserId, currentUserDisplayName);
  const forwarded = buildForwardedRef(message, threadMessages, currentUserId, currentUserDisplayName);
  const media = buildMediaRefs(message, mediaById);
  const senderLabel =
    shouldShowSenderLabel && message.senderUserId !== currentUserId
      ? resolveKnownUserLabel({
          userId: message.senderUserId,
          currentUserId,
          currentUserDisplayName,
        })
      : undefined;
  const avatar = senderLabel ? null : undefined;

  return {
    id: message.id,
    chatId: message.chatId,
    senderId: message.senderUserId,
    ...(senderLabel ? { senderLabel } : {}),
    ...(avatar !== undefined ? { avatar } : {}),
    ...(media !== undefined ? { media } : {}),
    type: 'text',
    body: describeThreadMessageBody(message),
    createdAt: Date.parse(message.createdAt) || Date.now(),
    status: mapThreadMessageStatus(message),
    reactions: aggregateReactions(message.reactions, currentUserId),
    ...(editedAt !== undefined ? { editedAt } : {}),
    ...(message.deletedAt
      ? {
          deleted: true,
          deletedAt: Date.parse(message.deletedAt) || Date.now(),
        }
      : {}),
    ...(replyTo !== undefined ? { replyTo } : {}),
    ...(forwarded !== undefined ? { forwarded } : {}),
  };
}

function buildReplyRef(
  message: ThreadDataMessage,
  threadMessages: ThreadDataMessage[],
  currentUserId?: string,
  currentUserDisplayName?: string | null,
): UiReplyRef | undefined {
  if (!message.replyToMessageId) {
    return undefined;
  }

  const replyTarget = threadMessages.find((candidate) => candidate.id === message.replyToMessageId);
  if (!replyTarget) {
    return undefined;
  }

  return {
    messageId: replyTarget.id,
    senderName: resolveKnownUserLabel({
      userId: replyTarget.senderUserId,
      currentUserId,
      currentUserDisplayName,
    }),
    preview: describeThreadMessageBody(replyTarget),
  };
}

function buildForwardedRef(
  message: ThreadDataMessage,
  threadMessages: ThreadDataMessage[],
  currentUserId?: string,
  currentUserDisplayName?: string | null,
): UiForwardedRef | undefined {
  if (!message.forwardedFromMessageId) {
    return undefined;
  }

  const forwardedTarget = threadMessages.find((candidate) => candidate.id === message.forwardedFromMessageId);

  return {
    originalMessageId: message.forwardedFromMessageId,
    ...(forwardedTarget
      ? {
          originalSenderName: resolveKnownUserLabel({
            userId: forwardedTarget.senderUserId,
            currentUserId,
            currentUserDisplayName,
          }),
        }
      : {}),
  };
}

function buildMediaRefs(
  message: ThreadDataMessage,
  mediaById?: Record<string, MediaObject>,
): ReadonlyArray<UiMediaRef> | undefined {
  if (message.type !== 'image' && message.type !== 'video' && message.type !== 'audio' && message.type !== 'file') {
    return undefined;
  }

  const primaryAttachment = message.attachments[0];
  if (!primaryAttachment) {
    return undefined;
  }

  const media = mediaById?.[primaryAttachment.mediaId];
  if (!media || !isMediaReady(media)) {
    return undefined;
  }

  const thumbnailUrl =
    message.type === 'image'
      ? resolveImageUrl(media)
      : message.type === 'video'
        ? resolveVideoThumbnailUrl(media)
        : undefined;
  const url =
    message.type === 'video'
      ? resolvePlayableVideoUrl(media)
      : media.downloadUrl || thumbnailUrl;
  const fileName = extractMediaFileName(media);
  if ((message.type === 'image' || message.type === 'video') && !url && !thumbnailUrl) {
    return undefined;
  }

  if ((message.type === 'audio' || message.type === 'file') && !url) {
    return undefined;
  }

  return [
    {
      type: message.type,
      ...(url ? { url } : {}),
      ...(thumbnailUrl ? { thumbnailUrl } : {}),
      ...(fileName ? { fileName } : {}),
      ...(media.mimeType ? { mimeType: media.mimeType } : {}),
      ...(typeof media.sizeBytes === 'number' ? { size: media.sizeBytes } : {}),
    },
  ];
}

function mapThreadMessageStatus(message: ThreadDataMessage): UiMessageStatus {
  if (message.clientStatus === 'pending') {
    return 'sending';
  }

  if (message.clientStatus === 'failed') {
    return 'failed';
  }

  if (message.delivery.seen) {
    return 'read';
  }

  if (message.delivery.delivered) {
    return 'delivered';
  }

  return 'sent';
}

function aggregateReactions(
  reactions: ThreadDataMessage['reactions'],
  currentUserId?: string,
) {
  const grouped = new Map<string, { emoji: string; count: number; reactedByMe: boolean }>();

  for (const reaction of reactions) {
    const current = grouped.get(reaction.emoji) ?? {
      emoji: reaction.emoji,
      count: 0,
      reactedByMe: false,
    };

    current.count += 1;
    current.reactedByMe = current.reactedByMe || reaction.userId === currentUserId;
    grouped.set(reaction.emoji, current);
  }

  return [...grouped.values()];
}

function describeThreadMessageBody(message: ThreadDataMessage) {
  if (message.deletedAt) {
    return '';
  }

  if (message.callEvent) {
    return getCallEventPreview(message.callEvent);
  }

  if (message.type === 'image' || message.type === 'video' || message.type === 'audio' || message.type === 'file') {
    return message.text?.trim() ?? '';
  }

  if (message.text && message.text.trim().length > 0) {
    return message.text.trim();
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

function isCallEventMessage(message: ThreadDataMessage) {
  return message.type === 'system' && message.callEvent?.kind === 'call_event';
}

function getCallEventPreview(callEvent: NonNullable<ThreadDataMessage['callEvent']>) {
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

function formatCallDurationSec(durationSec: number) {
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function areMessageIdsEqual(left: readonly string[], right: readonly string[]) {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
}

function areUiMessagesEqual(left: UiMessage, right: UiMessage) {
  return (
    left.id === right.id &&
    left.chatId === right.chatId &&
    left.senderId === right.senderId &&
    left.senderLabel === right.senderLabel &&
    left.avatar === right.avatar &&
    areMediaRefsEqual(left.media, right.media) &&
    left.type === right.type &&
    left.body === right.body &&
    left.createdAt === right.createdAt &&
    left.status === right.status &&
    left.editedAt === right.editedAt &&
    left.deleted === right.deleted &&
    left.deletedAt === right.deletedAt &&
    areReplyRefsEqual(left.replyTo, right.replyTo) &&
    areForwardedRefsEqual(left.forwarded, right.forwarded) &&
    areReactionsEqual(left.reactions, right.reactions)
  );
}

function areReplyRefsEqual(left: UiReplyRef | undefined, right: UiReplyRef | undefined) {
  if (left === right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  return (
    left.messageId === right.messageId &&
    left.senderName === right.senderName &&
    left.preview === right.preview
  );
}

function areForwardedRefsEqual(left: UiForwardedRef | undefined, right: UiForwardedRef | undefined) {
  if (left === right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  return (
    left.originalMessageId === right.originalMessageId &&
    left.originalSenderName === right.originalSenderName
  );
}

function areMediaRefsEqual(
  left: ReadonlyArray<UiMediaRef> | undefined,
  right: ReadonlyArray<UiMediaRef> | undefined,
) {
  if (left === right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    const leftItem = left[index];
    const rightItem = right[index];
    if (!leftItem || !rightItem) {
      return false;
    }

    if (
      leftItem.type !== rightItem.type ||
      leftItem.url !== rightItem.url ||
      leftItem.thumbnailUrl !== rightItem.thumbnailUrl ||
      leftItem.fileName !== rightItem.fileName ||
      leftItem.size !== rightItem.size
    ) {
      return false;
    }
  }

  return true;
}

function resolveImageUrl(media: MediaObject) {
  const thumbVariant = media.variants.find((variant) => variant.variantType === 'thumbnail');
  return thumbVariant?.downloadUrl ?? media.variants[0]?.downloadUrl ?? media.downloadUrl;
}

function resolveVideoThumbnailUrl(media: MediaObject) {
  const thumbVariant = media.variants.find((variant) => variant.variantType === 'thumbnail');
  return thumbVariant?.downloadUrl ?? undefined;
}

function resolvePlayableVideoUrl(media: MediaObject) {
  const preferredVariantTypes = ['playback', 'video', 'mp4', 'stream', 'source'];
  for (const variantType of preferredVariantTypes) {
    const variant = media.variants.find((item) => item.variantType === variantType);
    if (variant?.downloadUrl) {
      return variant.downloadUrl;
    }
  }

  return media.downloadUrl;
}

function extractMediaFileName(media: MediaObject) {
  const fileNameCandidate = (media as MediaObject & {
    fileName?: string | null;
    originalFileName?: string | null;
    name?: string | null;
  }).fileName
    ?? (media as MediaObject & { originalFileName?: string | null }).originalFileName
    ?? (media as MediaObject & { name?: string | null }).name;

  return typeof fileNameCandidate === 'string' && fileNameCandidate.trim().length > 0
    ? fileNameCandidate.trim()
    : undefined;
}

function isMediaReady(media: MediaObject) {
  return media.processingStatus === 'ready';
}

function areReactionsEqual(left: UiMessage['reactions'], right: UiMessage['reactions']) {
  if (left === right) {
    return true;
  }

  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    const leftReaction = left[index];
    const rightReaction = right[index];
    if (!leftReaction || !rightReaction) {
      return false;
    }

    if (
      leftReaction.emoji !== rightReaction.emoji ||
      leftReaction.count !== rightReaction.count ||
      leftReaction.reactedByMe !== rightReaction.reactedByMe
    ) {
      return false;
    }
  }

  return true;
}
