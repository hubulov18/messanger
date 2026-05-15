import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

type SignalingTokenPayload = {
  callId: string;
  userId: string;
  sessionId: string;
  negotiationVersion: number;
};

@Injectable()
export class SignalingStateService implements OnModuleDestroy {
  private readonly logger = new Logger(SignalingStateService.name);
  private redisClient: ReturnType<typeof createClient> | null = null;
  private readonly connectionSets = new Map<string, Set<string>>();
  private readonly tokenStore = new Map<string, { payload: SignalingTokenPayload; expiresAt: number }>();
  private readonly heartbeatStore = new Map<string, number>();
  private readonly activeSessionStore = new Map<string, string>();
  private readonly negotiationVersionStore = new Map<string, number>();

  constructor(private readonly configService: ConfigService) {
    const redisUrl = this.configService.get<string>('redis.url') ?? '';
    if (redisUrl) {
      const client = createClient({ url: redisUrl });
      client
        .connect()
        .then(() => {
          this.redisClient = client;
        })
        .catch((error) => {
          const message = error instanceof Error ? error.message : 'Unknown Redis error';
          this.logger.warn(`Falling back to in-memory signaling state: ${message}`);
        });
    }
  }

  async issueSignalingToken(
    payload: {
      callId: string;
      userId: string;
    },
    options?: {
      bumpNegotiationVersion?: boolean;
    },
  ) {
    const token = `cst_${payload.callId}_${payload.userId}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const sessionId = `css_${payload.callId}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    const ttlSeconds = this.configService.get<number>('signaling.tokenTtlSeconds') ?? 60;
    const expiresAt = Date.now() + ttlSeconds * 1000;
    const negotiationVersion = await this.resolveNegotiationVersion(payload.callId, options?.bumpNegotiationVersion === true);
    const fullPayload = {
      ...payload,
      sessionId,
      negotiationVersion,
    } satisfies SignalingTokenPayload;

    if (this.redisClient) {
      const pipeline = this.redisClient.multi();
      pipeline.set(`call:token:${token}`, JSON.stringify(fullPayload), {
        EX: ttlSeconds,
      });
      await pipeline.exec();

      return {
        token,
        sessionId,
        negotiationVersion,
      };
    }

    this.tokenStore.set(token, { payload: fullPayload, expiresAt });
    return {
      token,
      sessionId,
      negotiationVersion,
    };
  }

  async consumeSignalingToken(token: string) {
    if (this.redisClient) {
      const key = `call:token:${token}`;
      const raw = await this.redisClient.get(key);
      if (!raw) {
        return null;
      }

      await this.redisClient.del(key);
      const payload = JSON.parse(raw) as SignalingTokenPayload;
      await this.redisClient.set(this.getActiveSessionKey(payload.callId, payload.userId), payload.sessionId, {
        EX: (this.configService.get<number>('signaling.tokenTtlSeconds') ?? 60) * 10,
      });
      return payload;
    }

    const entry = this.tokenStore.get(token);
    if (!entry) {
      return null;
    }

    this.tokenStore.delete(token);
    if (entry.expiresAt <= Date.now()) {
      return null;
    }

    this.activeSessionStore.set(
      this.getActiveSessionKey(entry.payload.callId, entry.payload.userId),
      entry.payload.sessionId,
    );
    return entry.payload;
  }

  async addConnection(userId: string, socketId: string) {
    if (this.redisClient) {
      await this.redisClient.sAdd(`calls:user:${userId}:connections`, socketId);
      return;
    }

    const set = this.connectionSets.get(userId) ?? new Set<string>();
    set.add(socketId);
    this.connectionSets.set(userId, set);
  }

  async removeConnection(userId: string, socketId: string) {
    if (this.redisClient) {
      await this.redisClient.sRem(`calls:user:${userId}:connections`, socketId);
      return this.redisClient.sCard(`calls:user:${userId}:connections`);
    }

    const set = this.connectionSets.get(userId);
    if (!set) {
      return 0;
    }

    set.delete(socketId);
    if (set.size === 0) {
      this.connectionSets.delete(userId);
    }

    return set.size;
  }

  async recordHeartbeat(callId: string, userId: string) {
    const key = `calls:session:${callId}:heartbeat:${userId}`;

    if (this.redisClient) {
      await this.redisClient.set(key, String(Date.now()), { EX: 120 });
      return;
    }

    this.heartbeatStore.set(key, Date.now());
  }

  async getConnectionCount(userId: string) {
    if (this.redisClient) {
      return this.redisClient.sCard(`calls:user:${userId}:connections`);
    }

    return this.connectionSets.get(userId)?.size ?? 0;
  }

  async getLastHeartbeat(callId: string, userId: string) {
    const key = `calls:session:${callId}:heartbeat:${userId}`;

    if (this.redisClient) {
      const raw = await this.redisClient.get(key);
      if (!raw) {
        return null;
      }

      const value = Number.parseInt(raw, 10);
      return Number.isFinite(value) ? value : null;
    }

    return this.heartbeatStore.get(key) ?? null;
  }

  async isCurrentSignalingSession(callId: string, userId: string, sessionId: string) {
    const key = this.getActiveSessionKey(callId, userId);

    if (this.redisClient) {
      const currentSessionId = await this.redisClient.get(key);
      return currentSessionId === sessionId;
    }

    return this.activeSessionStore.get(key) === sessionId;
  }

  async getNegotiationVersion(callId: string) {
    const key = this.getNegotiationVersionKey(callId);

    if (this.redisClient) {
      const raw = await this.redisClient.get(key);
      const parsed = Number.parseInt(raw ?? '', 10);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
    }

    return this.negotiationVersionStore.get(key) ?? 1;
  }

  private async resolveNegotiationVersion(callId: string, bump: boolean) {
    const key = this.getNegotiationVersionKey(callId);

    if (this.redisClient) {
      const currentRaw = await this.redisClient.get(key);
      const currentVersion = Number.parseInt(currentRaw ?? '', 10);
      const safeCurrentVersion = Number.isFinite(currentVersion) && currentVersion > 0 ? currentVersion : 1;
      const nextVersion = bump ? safeCurrentVersion + 1 : safeCurrentVersion;
      await this.redisClient.set(key, String(nextVersion), { EX: 60 * 60 * 6 });
      return nextVersion;
    }

    const currentVersion = this.negotiationVersionStore.get(key) ?? 1;
    const nextVersion = bump ? currentVersion + 1 : currentVersion;
    this.negotiationVersionStore.set(key, nextVersion);
    return nextVersion;
  }

  private getActiveSessionKey(callId: string, userId: string) {
    return `calls:session:${callId}:participant:${userId}:signaling-session`;
  }

  private getNegotiationVersionKey(callId: string) {
    return `calls:session:${callId}:negotiation-version`;
  }

  async onModuleDestroy() {
    await this.redisClient?.quit();
  }
}
