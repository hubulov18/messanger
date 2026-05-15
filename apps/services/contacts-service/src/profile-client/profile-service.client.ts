import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type ProfileSummary = {
  id: string;
  username: string;
  displayName: string;
  avatarMediaId: string | null;
};

@Injectable()
export class ProfileServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async getProfileByUserId(userId: string): Promise<ProfileSummary | null> {
    const baseUrl = this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
    const response = await fetch(`${baseUrl}/v1/profiles/${userId}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to resolve matched contact profile');
    }

    return (await response.json()) as ProfileSummary;
  }
}
