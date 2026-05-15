import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetchWithDownstreamTimeout } from '../http/downstream-fetch.js';

@Injectable()
export class NotificationServiceClient {
  private readonly logger = new Logger(NotificationServiceClient.name);

  constructor(private readonly configService: ConfigService) {}

  async queueIncomingCall(payload: {
    callId: string;
    chatId: string;
    targetUserId: string;
    callerUserId: string;
    callerDisplayName: string;
    callerUsername?: string;
    callType: 'audio' | 'video';
    startedAt: string;
    ringTimeoutMs: number;
  }) {
    const baseUrl = this.configService.get<string>('services.notificationServiceUrl') ?? 'http://localhost:3008';

    try {
      const response = await fetchWithDownstreamTimeout(
        `${baseUrl}/v1/internal/notifications/voip/incoming`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
        'Unable to queue incoming call notification',
      );

      if (!response.ok) {
        this.logger.warn(`Notification service returned ${response.status} for incoming call ${payload.callId}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      this.logger.warn(`Unable to queue incoming call notification for ${payload.callId}: ${message}`);
    }
  }
}
