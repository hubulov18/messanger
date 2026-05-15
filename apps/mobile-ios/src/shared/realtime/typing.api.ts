import { apiRequest } from '@shared/api/http-client';

/**
 * Sends a typing indicator event to other participants of the given chat.
 * Fire-and-forget — errors are intentionally swallowed; typing is best-effort.
 */
export function sendTypingIndicator(chatId: string, isTyping: boolean): void {
  void apiRequest<void>({
    method: 'POST',
    path: '/events/typing',
    authenticated: true,
    body: { chatId, isTyping },
  }).catch(() => {
    // typing indicators are best-effort — do not surface errors to the user
  });
}
