import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async hasSharedDirectChat(leftUserId: string, rightUserId: string): Promise<boolean> {
    const baseUrl = this.configService.get<string>('services.chatServiceUrl') ?? 'http://localhost:3002';
    const response = await fetch(`${baseUrl}/v1/internal/chats/direct/${leftUserId}/${rightUserId}/shared`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify shared direct chat');
    }

    const payload = (await response.json()) as { hasSharedDirectChat: boolean };
    return payload.hasSharedDirectChat;
  }
}
