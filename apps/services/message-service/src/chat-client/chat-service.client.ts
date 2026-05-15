import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type ChatAccessContext = {
  chatExists: boolean;
  memberState: 'active' | 'inactive' | 'missing';
  canAccess: boolean;
  canSendMessages: boolean;
  chatType: string | null;
  peerUserId: string | null;
};

@Injectable()
export class ChatServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async getChatAccessContext(chatId: string, userId: string): Promise<ChatAccessContext> {
    const baseUrl = this.configService.get<string>('services.chatServiceUrl') ?? 'http://localhost:3002';
    const response = await fetch(`${baseUrl}/v1/internal/chats/${chatId}/members/${userId}/access`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify chat membership');
    }

    return (await response.json()) as ChatAccessContext;
  }

  async assertChatAccess(chatId: string, userId: string, mode: 'access' | 'send'): Promise<void> {
    const payload = await this.getChatAccessContext(chatId, userId);

    if (mode === 'send' && !payload.canSendMessages) {
      throw new ServiceUnavailableException('User cannot send messages to this chat');
    }

    if (mode === 'access' && !payload.canAccess) {
      throw new ServiceUnavailableException('User cannot access this chat');
    }
  }
}
