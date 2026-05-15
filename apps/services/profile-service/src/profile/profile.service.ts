import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';

import type { CurrentUser } from '../auth/current-user.type.js';
import { ChatServiceClient } from '../chat-client/chat-service.client.js';
import { ContactsServiceClient } from '../contacts-client/contacts-service.client.js';
import { IdentityServiceClient } from '../identity-client/identity-service.client.js';
import type { UpdatePrivacyDto } from './dto/update-privacy.dto.js';
import type { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileRepository } from './repositories/profile.repository.js';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly identityServiceClient: IdentityServiceClient,
    private readonly contactsServiceClient: ContactsServiceClient,
    private readonly chatServiceClient: ChatServiceClient,
  ) {}

  async getCurrentUserProfile(currentUser: CurrentUser) {
    const profile = await this.profileRepository.getOrCreateProfile(currentUser.userId);

    return this.toCurrentUserResponse(profile);
  }

  async updateProfile(currentUser: CurrentUser, dto: UpdateProfileDto) {
    if (
      dto.username === undefined &&
      dto.displayName === undefined &&
      dto.bio === undefined &&
      dto.avatarMediaId === undefined
    ) {
      throw new BadRequestException('At least one profile field must be provided');
    }

    if (dto.username !== undefined && !/^[a-z0-9_]{4,32}$/.test(dto.username)) {
      throw new BadRequestException('Username must be 4-32 characters and use only lowercase letters, numbers, or underscores');
    }

    let profile;

    try {
      profile = await this.profileRepository.updateProfile({
        userId: currentUser.userId,
        ...(dto.username !== undefined ? { username: dto.username } : {}),
        ...(dto.displayName !== undefined ? { displayName: dto.displayName } : {}),
        ...(dto.bio !== undefined ? { bio: dto.bio } : {}),
        ...(dto.avatarMediaId !== undefined ? { avatarMediaId: dto.avatarMediaId } : {}),
        updatedAt: new Date(),
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Username is already in use');
      }

      throw error;
    }

    return {
      success: true,
      profile: {
        id: profile.userId,
        username: profile.username,
        displayName: profile.displayName,
        bio: profile.bio,
        avatarMediaId: profile.avatarMediaId,
      },
    };
  }

  async getByUsername(username: string) {
    const profile = await this.profileRepository.findByUsername(username);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return {
      id: profile.userId,
      username: profile.username,
      displayName: profile.displayName,
      avatarMediaId: profile.avatarMediaId,
    };
  }

  async getByPhoneNumber(currentUser: CurrentUser, phoneNumber: string) {
    const userId = await this.identityServiceClient.getUserByPhoneNumber(phoneNumber);

    if (!userId) {
      throw new NotFoundException('Profile not found');
    }

    const profile = await this.profileRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (currentUser.userId !== userId) {
      const blockStatus = await this.profileRepository.getBlockStatus(currentUser.userId, userId);
      if (blockStatus.blockedByLeftUser || blockStatus.blockedByRightUser) {
        throw new NotFoundException('Profile not found');
      }
    }

    return {
      id: profile.userId,
      username: profile.username,
      displayName: profile.displayName,
      avatarMediaId: profile.avatarMediaId,
    };
  }

  async getByUserId(userId: string) {
    const profile = await this.profileRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return {
      id: profile.userId,
      username: profile.username,
      displayName: profile.displayName,
      avatarMediaId: profile.avatarMediaId,
    };
  }

  async getPresence(currentUser: CurrentUser, userId: string) {
    const profile = await this.profileRepository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (currentUser.userId === userId) {
      const lastSeenAt = await this.identityServiceClient.getLastSeen(userId);

      return {
        userId,
        canViewLastSeen: true,
        lastSeenAt,
      };
    }

    const blockStatus = await this.profileRepository.getBlockStatus(currentUser.userId, userId);
    if (blockStatus.blockedByLeftUser || blockStatus.blockedByRightUser) {
      return {
        userId,
        canViewLastSeen: false,
        lastSeenAt: null,
      };
    }

    const canViewLastSeen = await this.canViewerAccessLastSeen(currentUser.userId, userId, profile.lastSeenVisibility);

    if (!canViewLastSeen) {
      return {
        userId,
        canViewLastSeen: false,
        lastSeenAt: null,
      };
    }

    return {
      userId,
      canViewLastSeen: true,
      lastSeenAt: await this.identityServiceClient.getLastSeen(userId),
    };
  }

  async getProfilesByUserIds(userIds: string[]) {
    if (userIds.length === 0) {
      return { items: [] };
    }

    const profiles = await this.profileRepository.findByUserIds(userIds);

    return {
      items: profiles.map((profile) => ({
        id: profile.userId,
        username: profile.username,
        displayName: profile.displayName,
        avatarMediaId: profile.avatarMediaId,
      })),
    };
  }

  async updatePrivacy(currentUser: CurrentUser, dto: UpdatePrivacyDto) {
    if (
      dto.lastSeenVisibility === undefined &&
      dto.phoneVisibility === undefined &&
      dto.profilePhotoVisibility === undefined
    ) {
      throw new BadRequestException('At least one privacy field must be provided');
    }

    await this.profileRepository.updatePrivacy({
      userId: currentUser.userId,
      privacy: dto,
      updatedAt: new Date(),
    });

    return {
      success: true,
    };
  }

  async listBlockedUsers(currentUser: CurrentUser) {
    const items = await this.profileRepository.listBlockedUsers(currentUser.userId);

    return {
      items: items.map((item) => ({
        id: item.blockedUserId,
        username: item.username,
        displayName: item.displayName,
        avatarMediaId: item.avatarMediaId,
        blockedAt: item.createdAt.toISOString(),
      })),
    };
  }

  async blockUser(currentUser: CurrentUser, targetUserId: string) {
    if (currentUser.userId === targetUserId) {
      throw new BadRequestException('You cannot block yourself');
    }

    await this.profileRepository.blockUser({
      ownerUserId: currentUser.userId,
      blockedUserId: targetUserId,
      createdAt: new Date(),
    });

    return {
      success: true,
    };
  }

  async unblockUser(currentUser: CurrentUser, targetUserId: string) {
    if (currentUser.userId === targetUserId) {
      throw new BadRequestException('You cannot unblock yourself');
    }

    await this.profileRepository.unblockUser({
      ownerUserId: currentUser.userId,
      blockedUserId: targetUserId,
      removedAt: new Date(),
    });

    return {
      success: true,
    };
  }

  async getBlockStatus(leftUserId: string, rightUserId: string) {
    const status = await this.profileRepository.getBlockStatus(leftUserId, rightUserId);

    return {
      leftUserId,
      rightUserId,
      blockedByLeftUser: status.blockedByLeftUser,
      blockedByRightUser: status.blockedByRightUser,
      isBlocked: status.blockedByLeftUser || status.blockedByRightUser,
    };
  }

  async canUserAccessAvatar(viewerUserId: string, ownerUserId: string) {
    if (!viewerUserId || !ownerUserId) {
      throw new BadRequestException('viewerUserId and ownerUserId are required');
    }

    if (viewerUserId === ownerUserId) {
      return { canAccess: true };
    }

    const profile = await this.profileRepository.findByUserId(ownerUserId);
    if (!profile?.avatarMediaId) {
      return { canAccess: false };
    }

    const blockStatus = await this.profileRepository.getBlockStatus(viewerUserId, ownerUserId);
    if (blockStatus.blockedByLeftUser || blockStatus.blockedByRightUser) {
      return { canAccess: false };
    }

    return {
      canAccess: profile.profilePhotoVisibility === 'everyone',
    };
  }

  private async canViewerAccessLastSeen(
    viewerUserId: string,
    ownerUserId: string,
    visibility: string,
  ) {
    switch (visibility) {
      case 'everyone':
        return true;
      case 'contacts':
        return (await this.contactsServiceClient.isMatchedContact(ownerUserId, viewerUserId))
          || (await this.chatServiceClient.hasSharedDirectChat(ownerUserId, viewerUserId));
      case 'nobody':
      default:
        return false;
    }
  }

  private toCurrentUserResponse(profile: {
    userId: string;
    username: string;
    displayName: string;
    bio: string | null;
    avatarMediaId: string | null;
    lastSeenVisibility: string;
    phoneVisibility: string;
    profilePhotoVisibility: string;
  }) {
    return {
      id: profile.userId,
      username: profile.username,
      displayName: profile.displayName,
      bio: profile.bio,
      avatarMediaId: profile.avatarMediaId,
      privacy: {
        lastSeenVisibility: profile.lastSeenVisibility,
        phoneVisibility: profile.phoneVisibility,
        profilePhotoVisibility: profile.profilePhotoVisibility,
      },
    };
  }
}
