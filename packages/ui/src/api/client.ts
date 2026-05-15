import type { ChatId, Message, MessageId, ReplyRef } from '../types';

/**
 * API client contract.
 *
 * The UI package does not import a fetch implementation — the host app
 * (mobile-ios) constructs a client and passes it through context. This keeps
 * the package transport-agnostic (REST, gRPC-web, whatever) and testable.
 */

export interface SendMessageArgs {
  readonly clientId: MessageId;
  readonly chatId: ChatId;
  readonly body: string;
  readonly replyTo?: ReplyRef;
}

export interface ApiClient {
  sendMessage(args: SendMessageArgs): Promise<Message>;
}

/** Transport-level failures raised by concrete implementations. */
export class ApiError extends Error {
  readonly status: number | undefined;
  readonly code: string | undefined;

  constructor(message: string, options: { status?: number; code?: string; cause?: unknown } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status;
    this.code = options.code;
    if (options.cause !== undefined) {
      (this as { cause?: unknown }).cause = options.cause;
    }
  }
}
