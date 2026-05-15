import { ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
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

  async assertCanCreateDirectChat(requesterUserId: string, participantUserId: string): Promise<void> {
    const baseUrl = this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
    const response = await fetch(`${baseUrl}/v1/internal/blocks/${requesterUserId}/${participantUserId}`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify block policy');
    }

    const payload = (await response.json()) as {
      blockedByLeftUser: boolean;
      blockedByRightUser: boolean;
      isBlocked: boolean;
    };

    if (payload.isBlocked) {
      throw new ForbiddenException({
        message: 'Direct chat cannot be created because one user has blocked the other',
        details: { reason: 'blocked_by_user_policy' },
      });
    }
  }

  async getProfilesByUserIds(userIds: string[]): Promise<Map<string, ProfileSummary>> {
    if (userIds.length === 0) {
      return new Map();
    }

    const baseUrl = this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
    const params = new URLSearchParams({ userIds: userIds.join(',') });
    const response = await fetch(`${baseUrl}/v1/internal/profiles?${params.toString()}`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to load chat profile summaries');
    }

    const payload = (await response.json()) as { items: ProfileSummary[] };
    return new Map(payload.items.map((profile) => [profile.id, profile]));
  }
}
