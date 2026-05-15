import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  ChatMembershipListResponseDto,
  ChatMembershipProjectionResponseDto,
} from '@telegram/contracts/internal-api';

type CachedMembership = {
  userIds: string[];
  fetchedAt: number;
};

@Injectable()
export class ChatMembershipCacheService {
  private readonly logger = new Logger(ChatMembershipCacheService.name);
  private readonly membershipByChatId = new Map<string, CachedMembership>();
  private readonly inFlightFetches = new Map<string, Promise<string[]>>();
  private projectionShadowReads = 0;
  private projectionShadowMismatches = 0;
  private projectionShadowErrors = 0;
  private projectionShadowLastLatencyMs: number | null = null;

  constructor(private readonly configService: ConfigService) {}

  async getActiveMemberUserIds(chatId: string) {
    const cached = this.membershipByChatId.get(chatId);
    if (cached && Date.now() - cached.fetchedAt < this.getTtlMs()) {
      return cached.userIds;
    }

    const inFlight = this.inFlightFetches.get(chatId);
    if (inFlight) {
      return inFlight;
    }

    const fetchPromise = this.fetchActiveMemberUserIds(chatId)
      .then(async (userIds) => {
        this.set(chatId, userIds);
        void this.shadowReadProjection(chatId, userIds);
        return userIds;
      })
      .finally(() => {
        this.inFlightFetches.delete(chatId);
      });

    this.inFlightFetches.set(chatId, fetchPromise);
    return fetchPromise;
  }

  addMember(chatId: string, userId: string) {
    const cached = this.membershipByChatId.get(chatId);
    if (!cached) {
      return;
    }

    if (!cached.userIds.includes(userId)) {
      this.set(chatId, [...cached.userIds, userId]);
    }
  }

  removeMember(chatId: string, userId: string) {
    const cached = this.membershipByChatId.get(chatId);
    if (!cached) {
      return;
    }

    this.set(
      chatId,
      cached.userIds.filter((currentUserId) => currentUserId !== userId),
    );
  }

  invalidate(chatId: string) {
    this.membershipByChatId.delete(chatId);
    this.inFlightFetches.delete(chatId);
  }

  getShadowReadMetrics() {
    return {
      totalReads: this.projectionShadowReads,
      mismatches: this.projectionShadowMismatches,
      errors: this.projectionShadowErrors,
      lastLatencyMs: this.projectionShadowLastLatencyMs,
    };
  }

  private set(chatId: string, userIds: string[]) {
    this.membershipByChatId.set(chatId, {
      userIds: [...new Set(userIds)],
      fetchedAt: Date.now(),
    });
  }

  private getTtlMs() {
    return this.configService.get<number>('realtime.chatMembershipCacheTtlMs') ?? 15_000;
  }

  private async fetchActiveMemberUserIds(chatId: string) {
    const chatServiceUrl = this.configService.get<string>('services.chatServiceUrl') ?? 'http://localhost:3002';

    try {
      const response = await fetch(`${chatServiceUrl}/v1/internal/chats/${chatId}/members`);
      if (!response.ok) {
        this.logger.warn(`Unable to resolve chat members for ${chatId}: ${response.status}`);
        return [] as string[];
      }

      const payload = (await response.json()) as ChatMembershipListResponseDto;
      return payload.userIds ?? [];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown membership lookup error';
      this.logger.warn(`Failed to load chat members for ${chatId}: ${message}`);
      return [] as string[];
    }
  }

  private async shadowReadProjection(chatId: string, sourceUserIds: string[]) {
    if (!this.configService.get<boolean>('realtime.chatMembershipProjectionShadowReadEnabled')) {
      return;
    }

    const chatServiceUrl = this.configService.get<string>('services.chatServiceUrl') ?? 'http://localhost:3002';
    const startedAt = Date.now();

    try {
      const response = await fetch(`${chatServiceUrl}/v1/internal/chats/${chatId}/members/projection`);
      const latencyMs = Date.now() - startedAt;
      this.projectionShadowReads += 1;
      this.projectionShadowLastLatencyMs = latencyMs;

      if (!response.ok) {
        this.projectionShadowErrors += 1;
        this.logger.warn(`Projection membership shadow read failed for ${chatId}: ${response.status} (${latencyMs}ms)`);
        return;
      }

      const payload = (await response.json()) as ChatMembershipProjectionResponseDto;
      const projectedUserIds = [...new Set(payload.userIds)].sort();
      const sourceSorted = [...new Set(sourceUserIds)].sort();

      if (!this.areEqualSets(sourceSorted, projectedUserIds)) {
        this.projectionShadowMismatches += 1;
        this.logger.warn(
          `Membership projection mismatch for ${chatId}: source=${sourceSorted.join(',')} projection=${projectedUserIds.join(',')} latency=${latencyMs}ms`,
        );
        return;
      }

      this.logger.debug(`Membership projection shadow read matched for ${chatId} (${latencyMs}ms)`);
    } catch (error) {
      this.projectionShadowErrors += 1;
      const message = error instanceof Error ? error.message : 'Unknown projection shadow read error';
      this.logger.warn(`Failed to shadow read membership projection for ${chatId}: ${message}`);
    }
  }

  private areEqualSets(left: string[], right: string[]) {
    if (left.length !== right.length) {
      return false;
    }

    return left.every((value, index) => value === right[index]);
  }
}
