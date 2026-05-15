import { ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetchWithDownstreamTimeout } from '../http/downstream-fetch.js';

export type ChatAccessContext = {
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
    const response = await fetchWithDownstreamTimeout(
      `${baseUrl}/v1/internal/chats/${chatId}/members/${userId}/access`,
      {},
      'Unable to verify chat membership',
    );

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify chat membership');
    }

    return (await response.json()) as ChatAccessContext;
  }

  async assertDirectChatAccess(chatId: string, userId: string): Promise<ChatAccessContext> {
    const payload = await this.getChatAccessContext(chatId, userId);

    if (!payload.chatExists || !payload.canAccess || payload.memberState !== 'active') {
      throw new ForbiddenException('User cannot access this chat');
    }

    if (payload.chatType !== 'direct' || !payload.peerUserId) {
      throw new ForbiddenException('Calls are allowed only in direct chats');
    }

    return payload;
  }
}
