import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async canUserAccessAvatar(viewerUserId: string, ownerUserId: string): Promise<boolean> {
    const baseUrl = this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
    const params = new URLSearchParams({ viewerUserId });
    const response = await fetch(`${baseUrl}/v1/internal/profiles/${ownerUserId}/avatar-access?${params.toString()}`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify avatar access');
    }

    const payload = (await response.json()) as { canAccess: boolean };
    return payload.canAccess;
  }
}
