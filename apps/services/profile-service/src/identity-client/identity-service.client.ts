import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IdentityServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async getLastSeen(userId: string): Promise<string | null> {
    const baseUrl = this.configService.get<string>('services.identityServiceUrl') ?? 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/v1/internal/users/${userId}/last-seen`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to load last seen');
    }

    const payload = (await response.json()) as { lastSeenAt: string | null };
    return payload.lastSeenAt;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<string | null> {
    const baseUrl = this.configService.get<string>('services.identityServiceUrl') ?? 'http://localhost:3001';
    const response = await fetch(
      `${baseUrl}/v1/internal/users/by-phone?phoneNumber=${encodeURIComponent(phoneNumber)}`,
    );

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to load user by phone number');
    }

    const payload = (await response.json()) as { userId: string | null };
    return payload.userId;
  }
}
