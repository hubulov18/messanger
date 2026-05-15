type CallEventPayload = {
  kind: 'call_event';
  callId: string;
  initiatorUserId: string;
  endedByUserId: string | null;
  outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
  durationSec: number;
};

export type MessageSummaryPreviewType = 'text' | 'image' | 'video' | 'audio' | 'file' | 'system';

export type MessageSummaryPreviewInput = {
  type: MessageSummaryPreviewType;
  text: string | null;
  deletedAt: Date | null;
  attachmentCount: number;
};

export function toLastMessagePreview(message: MessageSummaryPreviewInput) {
  if (message.deletedAt) {
    return 'Message deleted';
  }

  if (message.type === 'text' && message.text && message.text.trim().length > 0) {
    return message.text.trim().slice(0, 120);
  }

  if (message.attachmentCount > 0) {
    return message.attachmentCount === 1 ? '1 attachment' : `${message.attachmentCount} attachments`;
  }

  switch (message.type) {
    case 'image':
      return 'Photo';
    case 'video':
      return 'Video';
    case 'audio':
      return 'Audio';
    case 'file':
      return 'File';
    case 'system': {
      const callEvent = parseCallEventText(message.text);
      if (!callEvent) {
        return 'System message';
      }

      switch (callEvent.outcome) {
        case 'completed':
          return 'Voice call';
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
    default:
      return 'New message';
  }
}

function parseCallEventText(text: string | null): CallEventPayload | null {
  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(text) as Partial<CallEventPayload>;
    if (
      parsed.kind === 'call_event' &&
      typeof parsed.callId === 'string' &&
      typeof parsed.initiatorUserId === 'string' &&
      (parsed.endedByUserId === null || typeof parsed.endedByUserId === 'string') &&
      typeof parsed.durationSec === 'number' &&
      (parsed.outcome === 'completed' ||
        parsed.outcome === 'missed' ||
        parsed.outcome === 'declined' ||
        parsed.outcome === 'canceled' ||
        parsed.outcome === 'failed')
    ) {
      return parsed as CallEventPayload;
    }
  } catch {
    return null;
  }

  return null;
}
