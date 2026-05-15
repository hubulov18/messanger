import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MessageServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async canUserAccessMedia(userId: string, mediaId: string) {
    const baseUrl = this.configService.get<string>('services.messageServiceUrl') ?? 'http://localhost:3003';
    const params = new URLSearchParams({ userId });
    const response = await fetch(`${baseUrl}/v1/internal/messages/media/${mediaId}/access?${params.toString()}`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify media access');
    }

    const payload = (await response.json()) as { attachedToMessages: boolean; canAccess: boolean };
    return payload.canAccess;
  }
}
