import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatServiceClient {
  private readonly logger = new Logger(ChatServiceClient.name);

  constructor(private readonly configService: ConfigService) {}

  async getActiveMemberUserIds(chatId: string): Promise<string[]> {
    const baseUrl = this.configService.get<string>('services.chatServiceUrl') ?? 'http://localhost:3002';

    try {
      const response = await fetch(`${baseUrl}/v1/internal/chats/${chatId}/members`, {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        this.logger.warn(`chat-service returned ${response.status} for members of chat ${chatId}`);
        return [];
      }

      const data = (await response.json()) as { userIds: string[] };
      return data.userIds ?? [];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      this.logger.warn(`Failed to get chat members for ${chatId}: ${message}`);
      return [];
    }
  }
}
