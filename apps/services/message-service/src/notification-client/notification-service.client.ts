import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationServiceClient {
  private readonly logger = new Logger(NotificationServiceClient.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Fire-and-forget: queue a push notification for a new message.
   * Never throws — notification failures must not block message delivery.
   */
  async queueMessageNotification(payload: {
    messageId: string;
    chatId: string;
    senderUserId: string;
    senderDisplayName: string;
    messagePreview?: string;
  }): Promise<void> {
    const baseUrl =
      this.configService.get<string>('services.notificationServiceUrl') ?? 'http://localhost:3008';

    try {
      const response = await fetch(`${baseUrl}/v1/internal/notifications/message`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(4000),
      });

      if (!response.ok) {
        this.logger.warn(
          `notification-service returned ${response.status} for message ${payload.messageId}`,
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      this.logger.warn(`Failed to queue push for message ${payload.messageId}: ${message}`);
    }
  }
}
