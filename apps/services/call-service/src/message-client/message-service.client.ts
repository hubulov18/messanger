import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetchWithDownstreamTimeout } from '../http/downstream-fetch.js';

export type CallEventPayload = {
  callId: string;
  chatId: string;
  initiatorUserId: string;
  endedByUserId: string | null;
  outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
  durationSec: number;
};

@Injectable()
export class MessageServiceClient {
  private readonly logger = new Logger(MessageServiceClient.name);

  constructor(private readonly configService: ConfigService) {}

  async createCallEventMessage(payload: CallEventPayload): Promise<string | null> {
    const baseUrl = this.configService.get<string>('services.messageServiceUrl') ?? 'http://localhost:3003';
    const response = await fetchWithDownstreamTimeout(
      `${baseUrl}/v1/internal/messages/call-events`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
      'Unable to create call timeline entry',
    );

    if (!response.ok) {
      const details = await response.text();
      this.logger.error(`Unable to create call event message: ${details}`);
      throw new ServiceUnavailableException('Unable to create call timeline entry');
    }

    const body = (await response.json()) as { messageId?: string | null };
    return body.messageId ?? null;
  }
}
