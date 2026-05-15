import { ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetchWithDownstreamTimeout } from '../http/downstream-fetch.js';

export type ProfileSummary = {
  id: string;
  username: string;
  displayName: string;
  avatarMediaId: string | null;
};

@Injectable()
export class ProfileServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async assertUsersCanCall(leftUserId: string, rightUserId: string): Promise<void> {
    const baseUrl = this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
    const response = await fetchWithDownstreamTimeout(
      `${baseUrl}/v1/internal/blocks/${leftUserId}/${rightUserId}`,
      {},
      'Unable to verify block policy',
    );

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify block policy');
    }

    const payload = (await response.json()) as {
      blockedByLeftUser: boolean;
      blockedByRightUser: boolean;
      isBlocked: boolean;
    };

    if (payload.isBlocked) {
      throw new ForbiddenException('Calls are not allowed because one participant has blocked the other');
    }
  }

  async getProfilesByUserIds(userIds: string[]): Promise<ProfileSummary[]> {
    if (userIds.length === 0) {
      return [];
    }

    const baseUrl = this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
    const query = new URLSearchParams({ userIds: userIds.join(',') });
    const response = await fetchWithDownstreamTimeout(
      `${baseUrl}/v1/internal/profiles?${query.toString()}`,
      {},
      'Unable to load profile summaries',
    );

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to load profile summaries');
    }

    const payload = (await response.json()) as { items: ProfileSummary[] };
    return payload.items;
  }
}
