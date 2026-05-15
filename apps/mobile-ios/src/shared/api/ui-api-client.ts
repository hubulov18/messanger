import {
  ApiError,
  type ApiClient,
  type Message,
  type ReplyRef,
  type SendMessageArgs,
} from '@telegram/ui';

import { useSessionStore } from '@shared/auth/session.store';
import { apiRequest } from '@shared/api/http-client';
import { mapBackendMessageToUiMessage, type BackendMessageLike } from '@shared/api/ui-message-mapper';

/**
 * Host-side implementation of @telegram/ui's ApiClient contract.
 *
 * This module owns the mapping between the backend's wire format
 * (MessageListItem: strings for dates, nullable text, raw reactions) and
 * the UI package's internal Message shape (epoch ms, non-null body,
 * aggregated reactions with `reactedByMe`).
 *
 * Transport errors are normalized to ApiError so useSendMessage's retry
 * logic (in the package) can discriminate auth errors from generic failures.
 */

type BackendMessage = BackendMessageLike;

type SendMessageResponse = {
  readonly message: BackendMessage;
};

/**
 * HTTP error as raised by `apiRequest` (see shared/api/http-client.ts).
 * It throws the `.error` field of `ApiErrorResponse` directly, which has
 * shape `{ code: string; message: string; ... }`. We capture `status` via
 * the `code` where possible — http-client doesn't surface the raw status.
 */
type HttpErrorShape = {
  readonly code?: unknown;
  readonly message?: unknown;
};

function toApiError(cause: unknown): ApiError {
  if (cause instanceof ApiError) {
    return cause;
  }

  if (cause && typeof cause === 'object') {
    const e = cause as HttpErrorShape;
    const code = typeof e.code === 'string' ? e.code : undefined;
    const message = typeof e.message === 'string' ? e.message : 'Request failed';
    const options: { code?: string; cause?: unknown } = { cause };
    if (code !== undefined) {
      options.code = code;
    }
    return new ApiError(message, options);
  }

  return new ApiError('Request failed', { cause });
}

/**
 * Construct the app's UI ApiClient.
 *
 * The client reads `currentUserId` from the session store at call time
 * (not at construction time) so it picks up logins/logouts without needing
 * to be rebuilt.
 */
export function createUiApiClient(): ApiClient {
  return {
    async sendMessage(args: SendMessageArgs): Promise<Message> {
      const currentUserId = useSessionStore.getState().currentUser?.id ?? null;

      const body: Record<string, unknown> = {
        chatId: args.chatId,
        clientMessageId: args.clientId,
        type: 'text',
        text: args.body,
        attachments: [],
      };
      if (args.replyTo !== undefined) {
        body.replyToMessageId = args.replyTo.messageId;
      }

      let response: SendMessageResponse;
      try {
        response = await apiRequest<SendMessageResponse>({
          method: 'POST',
          path: '/messages',
          authenticated: true,
          timeoutMs: 20_000,
          body,
        });
      } catch (cause) {
        throw toApiError(cause);
      }

      return mapBackendMessageToUiMessage(response.message, currentUserId, args.replyTo);
    },
  };
}
