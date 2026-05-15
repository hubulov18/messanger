import { ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type DirectMessageBlockStatus = {
  isBlocked: boolean;
};

@Injectable()
export class ProfileServiceClient {
  private readonly blockStatusCache = new Map<
    string,
    {
      expiresAt: number;
      status: DirectMessageBlockStatus;
    }
  >();
  private readonly blockStatusInflight = new Map<string, Promise<DirectMessageBlockStatus>>();

  constructor(private readonly configService: ConfigService) {}

  async assertUsersCanDirectMessage(leftUserId: string, rightUserId: string): Promise<void> {
    const payload = await this.getDirectMessageBlockStatus(leftUserId, rightUserId);

    if (payload.isBlocked) {
      throw new ForbiddenException({
        message: 'Message cannot be sent because one user has blocked the other',
        details: {
          reason: 'blocked_by_user_policy',
        },
      });
    }
  }

  private async getDirectMessageBlockStatus(
    leftUserId: string,
    rightUserId: string,
  ): Promise<DirectMessageBlockStatus> {
    const cacheTtlMs =
      this.configService.get<number>('services.directMessageBlockPolicyCacheTtlMs') ?? 1000;
    const cacheKey = [leftUserId, rightUserId].sort().join(':');

    if (cacheTtlMs > 0) {
      const cached = this.blockStatusCache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) {
        return cached.status;
      }
    }

    const inflight = this.blockStatusInflight.get(cacheKey);
    if (inflight) {
      return inflight;
    }

    const requestPromise = this.fetchDirectMessageBlockStatus(leftUserId, rightUserId)
      .then((status) => {
        if (cacheTtlMs > 0) {
          this.blockStatusCache.set(cacheKey, {
            expiresAt: Date.now() + cacheTtlMs,
            status,
          });
        }

        return status;
      })
      .finally(() => {
        this.blockStatusInflight.delete(cacheKey);
      });

    this.blockStatusInflight.set(cacheKey, requestPromise);
    return requestPromise;
  }

  private async fetchDirectMessageBlockStatus(
    leftUserId: string,
    rightUserId: string,
  ): Promise<DirectMessageBlockStatus> {
    const baseUrl = this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
    const response = await fetch(`${baseUrl}/v1/internal/blocks/${leftUserId}/${rightUserId}`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify block policy');
    }

    return (await response.json()) as DirectMessageBlockStatus;
  }
}
