import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  OutboxEventStatus,
  VisibilityLevel,
  type BlockRelation,
  type UserProfile,
} from '../../generated/prisma/client.js';

import { PrismaService } from '../../prisma/prisma.service.js';
import type { UpdatePrivacyDto, VisibilityDto } from '../dto/update-privacy.dto.js';

type OutboxWriter = {
  outboxEvent: {
    create: (args: {
      data: {
        id: string;
        eventType: string;
        eventVersion: number;
        aggregateId: string;
        partitionKey: string;
        payloadJson: object;
        occurredAt: Date;
        status: OutboxEventStatus;
      };
    }) => Promise<unknown>;
  };
};

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateProfile(userId: string): Promise<UserProfile> {
    return this.prisma.userProfile.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        username: this.buildDefaultUsername(userId),
        displayName: this.buildDefaultDisplayName(userId),
      },
    });
  }

  findByUserId(userId: string): Promise<UserProfile | null> {
    return this.prisma.userProfile.findUnique({
      where: { userId },
    });
  }

  findByUsername(username: string): Promise<UserProfile | null> {
    return this.prisma.userProfile.findUnique({
      where: { username: username.toLowerCase() },
    });
  }

  findByUserIds(userIds: string[]): Promise<UserProfile[]> {
    return this.prisma.userProfile.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
    });
  }

  async updateProfile(params: {
    userId: string;
    username?: string;
    displayName?: string;
    bio?: string | null;
    avatarMediaId?: string | null;
    updatedAt: Date;
  }): Promise<UserProfile> {
    await this.getOrCreateProfile(params.userId);

    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.userProfile.update({
        where: { userId: params.userId },
        data: {
          ...(params.username !== undefined ? { username: params.username } : {}),
          ...(params.displayName !== undefined ? { displayName: params.displayName } : {}),
          ...(params.bio !== undefined ? { bio: params.bio } : {}),
          ...(params.avatarMediaId !== undefined ? { avatarMediaId: params.avatarMediaId } : {}),
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'profile.profile.updated',
        aggregateId: profile.userId,
        partitionKey: profile.userId,
        payloadJson: {
          userId: profile.userId,
          username: profile.username,
          displayName: profile.displayName,
          bio: profile.bio,
          avatarMediaId: profile.avatarMediaId,
          updatedAt: params.updatedAt.toISOString(),
        },
        occurredAt: params.updatedAt,
      });

      return profile;
    });
  }

  async updatePrivacy(params: {
    userId: string;
    privacy: UpdatePrivacyDto;
    updatedAt: Date;
  }): Promise<UserProfile> {
    await this.getOrCreateProfile(params.userId);

    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.userProfile.update({
        where: { userId: params.userId },
        data: {
          ...(params.privacy.lastSeenVisibility !== undefined
            ? { lastSeenVisibility: this.mapVisibility(params.privacy.lastSeenVisibility) }
            : {}),
          ...(params.privacy.phoneVisibility !== undefined
            ? { phoneVisibility: this.mapVisibility(params.privacy.phoneVisibility) }
            : {}),
          ...(params.privacy.profilePhotoVisibility !== undefined
            ? { profilePhotoVisibility: this.mapVisibility(params.privacy.profilePhotoVisibility) }
            : {}),
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'profile.privacy.updated',
        aggregateId: profile.userId,
        partitionKey: profile.userId,
        payloadJson: {
          userId: profile.userId,
          lastSeenVisibility: profile.lastSeenVisibility,
          phoneVisibility: profile.phoneVisibility,
          profilePhotoVisibility: profile.profilePhotoVisibility,
          updatedAt: params.updatedAt.toISOString(),
        },
        occurredAt: params.updatedAt,
      });

      return profile;
    });
  }

  findBlockRelation(ownerUserId: string, blockedUserId: string): Promise<BlockRelation | null> {
    return this.prisma.blockRelation.findUnique({
      where: {
        ownerUserId_blockedUserId: {
          ownerUserId,
          blockedUserId,
        },
      },
    });
  }

  async listBlockedUsers(ownerUserId: string): Promise<
    Array<{
      blockedUserId: string;
      username: string;
      displayName: string;
      avatarMediaId: string | null;
      createdAt: Date;
    }>
  > {
    const relations = await this.prisma.blockRelation.findMany({
      where: {
        ownerUserId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (relations.length === 0) {
      return [];
    }

    const profiles = await this.prisma.userProfile.findMany({
      where: {
        userId: {
          in: relations.map((relation) => relation.blockedUserId),
        },
      },
      select: {
        userId: true,
        username: true,
        displayName: true,
        avatarMediaId: true,
      },
    });

    const profileByUserId = new Map(
      profiles.map((profile) => [
        profile.userId,
        {
          username: profile.username,
          displayName: profile.displayName,
          avatarMediaId: profile.avatarMediaId,
        },
      ]),
    );

    return relations.map((relation) => {
      const profile = profileByUserId.get(relation.blockedUserId);

      return {
        blockedUserId: relation.blockedUserId,
        username: profile?.username ?? this.buildDefaultUsername(relation.blockedUserId),
        displayName: profile?.displayName ?? this.buildDefaultDisplayName(relation.blockedUserId),
        avatarMediaId: profile?.avatarMediaId ?? null,
        createdAt: relation.createdAt,
      };
    });
  }


  async getBlockStatus(leftUserId: string, rightUserId: string): Promise<{
    blockedByLeftUser: boolean;
    blockedByRightUser: boolean;
  }> {
    const [leftRelation, rightRelation] = await Promise.all([
      this.prisma.blockRelation.findUnique({
        where: {
          ownerUserId_blockedUserId: {
            ownerUserId: leftUserId,
            blockedUserId: rightUserId,
          },
        },
        select: {
          id: true,
        },
      }),
      this.prisma.blockRelation.findUnique({
        where: {
          ownerUserId_blockedUserId: {
            ownerUserId: rightUserId,
            blockedUserId: leftUserId,
          },
        },
        select: {
          id: true,
        },
      }),
    ]);

    return {
      blockedByLeftUser: leftRelation !== null,
      blockedByRightUser: rightRelation !== null,
    };
  }

  async blockUser(params: {
    ownerUserId: string;
    blockedUserId: string;
    createdAt: Date;
  }): Promise<BlockRelation> {
    return this.prisma.$transaction(async (tx) => {
      const relation = await tx.blockRelation.upsert({
        where: {
          ownerUserId_blockedUserId: {
            ownerUserId: params.ownerUserId,
            blockedUserId: params.blockedUserId,
          },
        },
        update: {},
        create: {
          id: `block_${randomUUID()}`,
          ownerUserId: params.ownerUserId,
          blockedUserId: params.blockedUserId,
          createdAt: params.createdAt,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'profile.user.blocked',
        aggregateId: relation.id,
        partitionKey: params.ownerUserId,
        payloadJson: {
          ownerUserId: params.ownerUserId,
          blockedUserId: params.blockedUserId,
          createdAt: params.createdAt.toISOString(),
        },
        occurredAt: params.createdAt,
      });

      return relation;
    });
  }

  async unblockUser(params: {
    ownerUserId: string;
    blockedUserId: string;
    removedAt: Date;
  }): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const relation = await tx.blockRelation.findUnique({
        where: {
          ownerUserId_blockedUserId: {
            ownerUserId: params.ownerUserId,
            blockedUserId: params.blockedUserId,
          },
        },
      });

      if (!relation) {
        return;
      }

      await tx.blockRelation.delete({
        where: {
          ownerUserId_blockedUserId: {
            ownerUserId: params.ownerUserId,
            blockedUserId: params.blockedUserId,
          },
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'profile.user.unblocked',
        aggregateId: relation.id,
        partitionKey: params.ownerUserId,
        payloadJson: {
          ownerUserId: params.ownerUserId,
          blockedUserId: params.blockedUserId,
          removedAt: params.removedAt.toISOString(),
        },
        occurredAt: params.removedAt,
      });
    });
  }

  private mapVisibility(value: VisibilityDto): VisibilityLevel {
    switch (value) {
      case 'everyone':
        return VisibilityLevel.everyone;
      case 'contacts':
        return VisibilityLevel.contacts;
      case 'nobody':
        return VisibilityLevel.nobody;
      default:
        throw new Error('Unsupported visibility value');
    }
  }


  private buildDefaultUsername(userId: string): string {
    return `u_${userId.replace(/[^a-zA-Z0-9]/g, '').slice(-10).toLowerCase()}`;
  }

  private buildDefaultDisplayName(userId: string): string {
    return `User ${userId.slice(-6)}`;
  }

  private writeOutboxEvent(
    tx: OutboxWriter,
    params: {
      eventType: string;
      aggregateId: string;
      partitionKey: string;
      payloadJson: object;
      occurredAt: Date;
    },
  ) {
    return tx.outboxEvent.create({
      data: {
        id: `evt_${randomUUID()}`,
        eventType: params.eventType,
        eventVersion: 1,
        aggregateId: params.aggregateId,
        partitionKey: params.partitionKey,
        payloadJson: params.payloadJson,
        occurredAt: params.occurredAt,
        status: OutboxEventStatus.pending,
      },
    });
  }
}
