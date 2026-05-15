import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { ChatMemberRole } from '../generated/prisma/client.js';

import type { CurrentUser } from '../auth/current-user.type.js';
import { AddMembersDto } from './dto/add-members.dto.js';
import { BanMemberDto } from './dto/ban-member.dto.js';
import { CreateChannelChatDto } from './dto/create-channel-chat.dto.js';
import { CreateDirectChatDto } from './dto/create-direct-chat.dto.js';
import { CreateGroupChatDto } from './dto/create-group-chat.dto.js';
import { CreateInviteLinkDto } from './dto/create-invite-link.dto.js';
import { JoinByInviteDto } from './dto/join-by-invite.dto.js';
import { ListChatsDto } from './dto/list-chats.dto.js';
import { PromoteMemberDto } from './dto/promote-member.dto.js';
import { RestrictMemberDto } from './dto/restrict-member.dto.js';
import { TransferOwnershipDto } from './dto/transfer-ownership.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
import { UpdateChatPermissionsDto } from './dto/update-chat-permissions.dto.js';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { MessageServiceClient } from '../message-client/message-service.client.js';
import { ChatRepository } from './repositories/chat.repository.js';
import {
  getEffectivePermissions,
  canActorModerateTarget,
  canActorConfigureAdmin,
  sanitiseGrantedAdminPermissions,
  MUTED_RESTRICTIONS,
  NO_RESTRICTIONS,
  DEFAULT_ADMIN_PERMISSIONS,
  type AdminPermissions,
  type MemberRestrictions,
} from './permissions/chat-permissions.js';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly profileServiceClient: ProfileServiceClient,
    private readonly messageServiceClient: MessageServiceClient,
    private readonly configService: ConfigService,
  ) {}

  async createDirectChat(currentUser: CurrentUser, body: CreateDirectChatDto) {
    const startedAt = performance.now();

    if (currentUser.userId === body.participantUserId) {
      throw new BadRequestException({
        message: 'Direct chat cannot be created with the same user',
        details: { reason: 'self_chat_not_allowed' },
      });
    }

    let existingChatLookupMs = 0;
    let profilePolicyLookupMs = 0;
    let createChatMs = 0;

    const existingChatLookupStartedAt = performance.now();
    const existingChat = await this.chatRepository.findDirectChatBetweenUsers(
      currentUser.userId,
      body.participantUserId,
    );
    existingChatLookupMs = performance.now() - existingChatLookupStartedAt;

    if (existingChat) {
      this.logSlowCreateDirectChat({
        currentUserId: currentUser.userId,
        participantUserId: body.participantUserId,
        reusedExistingChat: true,
        timings: {
          existingChatLookupMs: roundDuration(existingChatLookupMs),
          profilePolicyLookupMs: roundDuration(profilePolicyLookupMs),
          createChatMs: roundDuration(createChatMs),
          totalMs: roundDuration(performance.now() - startedAt),
        },
      });

      return {
        chat: {
          id: existingChat.id,
          type: existingChat.type,
          createdAt: existingChat.createdAt.toISOString(),
        },
      };
    }

    const profilePolicyLookupStartedAt = performance.now();
    await this.profileServiceClient.assertCanCreateDirectChat(
      currentUser.userId,
      body.participantUserId,
    );
    profilePolicyLookupMs = performance.now() - profilePolicyLookupStartedAt;

    const createChatStartedAt = performance.now();
    const chat = await this.chatRepository.createDirectChat({
      requesterUserId: currentUser.userId,
      participantUserId: body.participantUserId,
    });
    createChatMs = performance.now() - createChatStartedAt;

    this.logSlowCreateDirectChat({
      currentUserId: currentUser.userId,
      participantUserId: body.participantUserId,
      reusedExistingChat: false,
      timings: {
        existingChatLookupMs: roundDuration(existingChatLookupMs),
        profilePolicyLookupMs: roundDuration(profilePolicyLookupMs),
        createChatMs: roundDuration(createChatMs),
        totalMs: roundDuration(performance.now() - startedAt),
      },
    });

    return {
      chat: {
        id: chat.id,
        type: chat.type,
        createdAt: chat.createdAt.toISOString(),
      },
    };
  }

  async createGroupChat(currentUser: CurrentUser, body: CreateGroupChatDto) {
    const chat = await this.chatRepository.createGroupChat({
      requesterUserId: currentUser.userId,
      title: body.title,
      ...(body.description !== undefined ? { description: body.description } : {}),
      memberUserIds: body.memberUserIds,
    });

    return {
      chat: {
        id: chat.id,
        type: chat.type,
        title: chat.title,
        createdAt: chat.createdAt.toISOString(),
      },
    };
  }

  async createChannelChat(currentUser: CurrentUser, body: CreateChannelChatDto) {
    const chat = await this.chatRepository.createChannelChat({
      requesterUserId: currentUser.userId,
      title: body.title,
      ...(body.description !== undefined ? { description: body.description } : {}),
    });

    return {
      chat: {
        id: chat.id,
        type: chat.type,
        title: chat.title,
        createdAt: chat.createdAt.toISOString(),
      },
    };
  }

  async joinByInvite(currentUser: CurrentUser, body: JoinByInviteDto) {
    const normalizedToken = normalizeInviteToken(body.token);

    if (!normalizedToken) {
      throw new BadRequestException({
        message: 'Invite link is invalid',
        details: { reason: 'invite_token_invalid' },
      });
    }

    const inviteLink = await this.chatRepository.findInviteLinkById(normalizedToken);

    if (!inviteLink) {
      throw new NotFoundException({
        message: 'Invite link not found',
        details: { reason: 'invite_link_missing' },
      });
    }

    if (inviteLink.chat.type === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats cannot be joined by invite link',
        details: { reason: 'invite_link_not_supported_for_direct_chat' },
      });
    }

    if (inviteLink.revokedAt) {
      throw new ConflictException({
        message: 'Invite link has been revoked',
        details: { reason: 'invite_link_revoked' },
      });
    }

    if (inviteLink.expiresAt && inviteLink.expiresAt.getTime() <= Date.now()) {
      throw new ConflictException({
        message: 'Invite link has expired',
        details: { reason: 'invite_link_expired' },
      });
    }

    if (inviteLink.maxUses !== null && inviteLink.usedCount >= inviteLink.maxUses) {
      throw new ConflictException({
        message: 'Invite link usage limit reached',
        details: { reason: 'invite_link_exhausted' },
      });
    }

    // requiresApproval: create a pending join request instead of direct activation
    // NOTE: inviteLink.requiresApproval is available after `prisma generate` is run
    //       with the updated schema (migration 20260419T120000_groups_channels_v2).
    if ((inviteLink as Record<string, unknown>)['requiresApproval'] === true) {
      await this.chatRepository.createJoinRequest({
        chatId: inviteLink.chatId,
        userId: currentUser.userId,
        inviteLinkId: inviteLink.id,
      });

      await this.chatRepository.markInviteLinkUsed(inviteLink.id);

      return {
        success: true,
        joined: false,
        pendingApproval: true,
        chat: {
          id: inviteLink.chat.id,
          type: inviteLink.chat.type,
          title: inviteLink.chat.title,
        },
      };
    }

    const membership = await this.chatRepository.activateMemberViaInvite({
      chatId: inviteLink.chatId,
      userId: currentUser.userId,
      invitedByUserId: inviteLink.createdByUserId,
    });

    if (membership.joined) {
      await this.chatRepository.markInviteLinkUsed(inviteLink.id);
    }

    return {
      success: true,
      joined: membership.joined,
      pendingApproval: false,
      chat: {
        id: inviteLink.chat.id,
        type: inviteLink.chat.type,
        title: inviteLink.chat.title,
      },
    };
  }

  async listChats(currentUser: CurrentUser, query: ListChatsDto) {
    const startedAt = performance.now();
    const timings: Record<string, number> = {};
    const limit = query.limit ?? 20;

    const membershipsStartedAt = performance.now();
    const chats = await this.chatRepository.listChatsForUser(currentUser.userId, limit);
    timings.membershipsQueryMs = roundDuration(performance.now() - membershipsStartedAt);

    const peerUserIds = [...new Set(chats.map((chat) => chat.peerUserId).filter((value): value is string => value !== null))];
    const summariesStartedAt = performance.now();
    const messageSummariesPromise = this.messageServiceClient
      .getChatSummaries(chats.map((chat) => chat.id), currentUser.userId)
      .finally(() => {
        timings.messageSummariesMs = roundDuration(performance.now() - summariesStartedAt);
      });
    const peerProfilesStartedAt = performance.now();
    const peerProfilesPromise = this.profileServiceClient.getProfilesByUserIds(peerUserIds).finally(() => {
      timings.peerProfileLookupMs = roundDuration(performance.now() - peerProfilesStartedAt);
    });
    const [messageSummariesByChatId, peerProfilesByUserId] = await Promise.all([
      messageSummariesPromise,
      peerProfilesPromise,
    ]);

    const lastSenderProfileUserIds = [
      ...new Set(
        chats
          .filter((chat) => chat.type === 'group')
          .map((chat) => messageSummariesByChatId.get(chat.id)?.lastSenderUserId)
          .filter(
            (value): value is string =>
              value !== null && value !== undefined && value !== currentUser.userId && !peerProfilesByUserId.has(value),
          ),
      ),
    ];

    const lastSenderProfilesStartedAt = performance.now();
    const lastSenderProfilesByUserId = await this.profileServiceClient.getProfilesByUserIds(lastSenderProfileUserIds);
    timings.lastSenderProfileLookupMs = roundDuration(performance.now() - lastSenderProfilesStartedAt);
    timings.profileLookupMs = roundDuration(
      (timings.peerProfileLookupMs ?? 0) + timings.lastSenderProfileLookupMs,
    );

    const transformStartedAt = performance.now();
    const items = chats.map((chat) => {
      const peerProfile = chat.peerUserId ? peerProfilesByUserId.get(chat.peerUserId) ?? null : null;
      const messageSummary = messageSummariesByChatId.get(chat.id) ?? null;
      const lastSenderProfile =
        messageSummary?.lastSenderUserId === null || messageSummary?.lastSenderUserId === undefined
          ? null
          : peerProfilesByUserId.get(messageSummary.lastSenderUserId) ??
            lastSenderProfilesByUserId.get(messageSummary.lastSenderUserId) ??
            null;

      return {
        id: chat.id,
        type: chat.type,
        title: chat.title,
        summary: this.buildChatSummary({
          chatType: chat.type,
          explicitTitle: chat.title,
          memberCount: chat.memberCount,
          peerUserId: chat.peerUserId,
          peerProfile,
          currentUserId: currentUser.userId,
          lastSenderProfile,
          lastSenderUserId: messageSummary?.lastSenderUserId ?? null,
          lastMessagePreview: messageSummary?.lastMessagePreview ?? null,
          lastActivityAt: messageSummary?.lastActivityAt ?? null,
          unreadCount: messageSummary?.unreadCount ?? 0,
          isPinned: chat.pinnedAt !== null,
          isArchived: chat.isArchived,
          isMuted: chat.isMuted,
        }),
        pinnedAt: chat.pinnedAt?.toISOString() ?? null,
        isArchived: chat.isArchived,
      };
    });
    timings.transformMs = roundDuration(performance.now() - transformStartedAt);

    const sortStartedAt = performance.now();
    items.sort((left, right) => {
      const leftPinned = left.summary.isPinned;
      const rightPinned = right.summary.isPinned;

      if (leftPinned !== rightPinned) {
        return leftPinned ? -1 : 1;
      }

      if (leftPinned && rightPinned) {
        const leftPinnedAt = Date.parse(left.pinnedAt ?? '');
        const rightPinnedAt = Date.parse(right.pinnedAt ?? '');

        if (!Number.isNaN(leftPinnedAt) && !Number.isNaN(rightPinnedAt) && leftPinnedAt !== rightPinnedAt) {
          return rightPinnedAt - leftPinnedAt;
        }
      }

      const leftActivity = Date.parse(left.summary.lastActivityAt ?? '');
      const rightActivity = Date.parse(right.summary.lastActivityAt ?? '');

      if (!Number.isNaN(leftActivity) && !Number.isNaN(rightActivity) && leftActivity !== rightActivity) {
        return rightActivity - leftActivity;
      }

      return left.summary.displayTitle.localeCompare(right.summary.displayTitle);
    });
    timings.sortMs = roundDuration(performance.now() - sortStartedAt);
    timings.totalMs = roundDuration(performance.now() - startedAt);

    this.logSlowListChats({
      currentUserId: currentUser.userId,
      limit,
      chatCount: chats.length,
      peerProfileCount: peerUserIds.length,
      lastSenderProfileCount: lastSenderProfileUserIds.length,
      timings,
    });

    return {
      items,
      nextCursor: null,
    };
  }

  async getChat(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason: access.memberState === 'missing' ? 'membership_missing' : 'membership_inactive',
        },
      });
    }

    const chat = await this.chatRepository.findChatById(chatId);

    if (!chat) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    const peerUserId =
      chat.type === 'direct'
        ? chat.members.find((member) => member.userId !== currentUser.userId)?.userId ?? null
        : null;
    const peerProfileMap = await this.profileServiceClient.getProfilesByUserIds(
      peerUserId ? [peerUserId] : [],
    );
    const peerProfile = peerUserId ? peerProfileMap.get(peerUserId) ?? null : null;
    const [messageSummaryMap, isPinned] = await Promise.all([
      this.messageServiceClient.getChatSummaries([chat.id], currentUser.userId),
      this.chatRepository.isChatPinned(chat.id, currentUser.userId),
    ]);
    // isMuted not needed in getChat response (single-chat view doesn't show mute indicator)
    // but included for consistency with list view
    const isMuted = false;
    const messageSummary = messageSummaryMap.get(chat.id) ?? null;

    return {
      id: chat.id,
      type: chat.type,
      title: chat.title,
      description: chat.description,
      photoMediaId: chat.photoMediaId,
      permissions: {
        canSendMessages: chat.permissions?.canSendMessages ?? true,
        canAddMembers: chat.permissions?.canAddMembers ?? true,
      },
      memberCount: chat.members.length,
      summary: this.buildChatSummary({
        chatType: chat.type,
        explicitTitle: chat.title,
        memberCount: chat.members.length,
        peerUserId,
        peerProfile,
        currentUserId: currentUser.userId,
        lastSenderProfile: messageSummary?.lastSenderUserId ? peerProfileMap.get(messageSummary.lastSenderUserId) ?? null : null,
        lastSenderUserId: messageSummary?.lastSenderUserId ?? null,
        lastMessagePreview: messageSummary?.lastMessagePreview ?? null,
        lastActivityAt: messageSummary?.lastActivityAt ?? null,
        unreadCount: messageSummary?.unreadCount ?? 0,
        isPinned,
        isArchived: chat.isArchived,
        isMuted,
      }),
      pinnedAt: isPinned ? new Date().toISOString() : null,
    };
  }

  async hasSharedDirectChat(leftUserId: string, rightUserId: string) {
    const chat = await this.chatRepository.findDirectChatBetweenUsers(leftUserId, rightUserId);

    return {
      hasSharedDirectChat: Boolean(chat),
      chatId: chat?.id ?? null,
    };
  }

  private buildChatSummary(params: {
    chatType: string;
    explicitTitle: string | null;
    memberCount: number;
    peerUserId: string | null;
    peerProfile: { username: string; displayName: string; avatarMediaId: string | null } | null;
    currentUserId: string;
    lastSenderProfile: { username: string; displayName: string; avatarMediaId: string | null } | null;
    lastSenderUserId: string | null;
    lastMessagePreview: string | null;
    lastActivityAt: string | null;
    unreadCount: number;
    isPinned: boolean;
    isArchived: boolean;
    isMuted: boolean;
  }) {
    const displayTitle =
      params.explicitTitle ??
      (params.chatType === 'direct'
        ? params.peerProfile?.displayName ?? 'Direct chat'
        : params.chatType === 'group'
          ? 'Untitled group'
          : 'Untitled chat');

    const baseSubtitle =
      params.chatType === 'direct'
        ? params.peerProfile?.username
          ? `@${params.peerProfile.username}`
          : 'Direct conversation'
        : params.chatType === 'group'
          ? `${params.memberCount} members`
          : 'Channel updates';

    const senderPrefix = params.lastMessagePreview
      ? params.lastSenderUserId === params.currentUserId
        ? 'You: '
        : params.chatType === 'group'
          ? `${params.lastSenderProfile?.displayName ?? 'Member'}: `
          : ''
      : '';

    return {
      displayTitle,
      subtitle: params.lastMessagePreview ? senderPrefix + params.lastMessagePreview : baseSubtitle,
      secondarySubtitle: params.lastMessagePreview ? baseSubtitle : null,
      counterpartUserId: params.peerUserId,
      counterpartUsername: params.peerProfile?.username ?? null,
      counterpartAvatarMediaId: params.peerProfile?.avatarMediaId ?? null,
      memberCount: params.memberCount,
      lastMessagePreview: params.lastMessagePreview,
      lastActivityAt: params.lastActivityAt,
      unreadCount: params.unreadCount,
      isPinned: params.isPinned,
      isArchived: params.isArchived,
      isMuted: params.isMuted,
    };
  }

  async pinChat(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason: access.memberState === 'missing' ? 'membership_missing' : 'membership_inactive',
        },
      });
    }

    await this.chatRepository.pinChat(chatId, currentUser.userId);

    return { success: true, chatId, isPinned: true };
  }

  async unpinChat(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason: access.memberState === 'missing' ? 'membership_missing' : 'membership_inactive',
        },
      });
    }

    await this.chatRepository.unpinChat(chatId, currentUser.userId);

    return { success: true, chatId, isPinned: false };
  }

  async archiveChat(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({ message: 'User is not an active member of this chat', details: { reason: 'membership_inactive' } });
    }

    await this.chatRepository.archiveChat(chatId);

    return { success: true, chatId, isArchived: true };
  }

  async unarchiveChat(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({ message: 'User is not an active member of this chat', details: { reason: 'membership_inactive' } });
    }

    await this.chatRepository.unarchiveChat(chatId);

    return { success: true, chatId, isArchived: false };
  }

  async muteChat(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({ message: 'User is not an active member of this chat', details: { reason: 'membership_inactive' } });
    }

    await this.chatRepository.muteChat(chatId, currentUser.userId);

    return { success: true, chatId, isMuted: true };
  }

  async unmuteChat(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({ message: 'User is not an active member of this chat', details: { reason: 'membership_inactive' } });
    }

    await this.chatRepository.unmuteChat(chatId, currentUser.userId);

    return { success: true, chatId, isMuted: false };
  }

  async deleteChatForSelf(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({ message: 'User is not an active member of this chat', details: { reason: 'membership_inactive' } });
    }

    if (access.chatType !== 'direct') {
      throw new BadRequestException({
        message: 'Only direct chats can be deleted from the chat list',
        details: { reason: 'delete_chat_not_supported_for_non_direct' },
      });
    }

    await this.chatRepository.removeMember(chatId, currentUser.userId);

    return { success: true, chatId, deleted: true };
  }

  async updateChat(currentUser: CurrentUser, chatId: string, body: UpdateChatDto) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.chatType === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats do not support editable chat identity',
        details: { reason: 'direct_chat_identity_read_only' },
      });
    }

    if (managementContext.actorRole !== 'owner' && managementContext.actorRole !== 'admin') {
      throw new ForbiddenException({
        message: 'User cannot edit this chat',
        details: { reason: 'chat_edit_restricted' },
      });
    }

    const nextTitle = body.title?.trim();
    if (body.title !== undefined && !nextTitle) {
      throw new BadRequestException({
        message: 'Chat title cannot be empty',
        details: { reason: 'chat_title_required' },
      });
    }

    const updatePayload: {
      chatId: string;
      updatedByUserId: string;
      title?: string;
      description?: string | null;
      photoMediaId?: string | null;
    } = {
      chatId,
      updatedByUserId: currentUser.userId,
    };

    if (body.title !== undefined && nextTitle) {
      updatePayload.title = nextTitle;
    }

    if (body.description !== undefined) {
      updatePayload.description = body.description.trim() || null;
    }

    if (body.photoMediaId !== undefined) {
      updatePayload.photoMediaId = body.photoMediaId;
    }

    const chat = await this.chatRepository.updateChatIdentity(updatePayload);

    return {
      success: true,
      chat: {
        id: chat.id,
        type: chat.type,
        title: chat.title,
        description: chat.description,
        photoMediaId: chat.photoMediaId,
      },
    };
  }

  async updateChatPermissions(currentUser: CurrentUser, chatId: string, body: UpdateChatPermissionsDto) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.chatType === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats do not support editable chat permissions',
        details: { reason: 'direct_chat_permissions_read_only' },
      });
    }

    if (managementContext.actorRole !== 'owner' && managementContext.actorRole !== 'admin') {
      throw new ForbiddenException({
        message: 'User cannot edit this chat permissions',
        details: { reason: 'chat_permissions_restricted' },
      });
    }

    const permissions = await this.chatRepository.updateChatPermissions({
      chatId,
      ...(body.canSendMessages !== undefined ? { canSendMessages: body.canSendMessages } : {}),
      ...(body.canAddMembers !== undefined ? { canAddMembers: body.canAddMembers } : {}),
    });

    return {
      success: true,
      permissions: {
        canSendMessages: permissions.canSendMessages,
        canAddMembers: permissions.canAddMembers,
      },
    };
  }

  async addMembers(currentUser: CurrentUser, chatId: string, body: AddMembersDto) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.chatType === 'direct') {
      throw new BadRequestException({
        message: 'Members cannot be added to a direct chat',
        details: { reason: 'member_mutation_not_supported_for_direct_chat' },
      });
    }

    if (
      !managementContext.canAddMembers &&
      managementContext.actorRole !== 'owner' &&
      managementContext.actorRole !== 'admin'
    ) {
      throw new ForbiddenException({
        message: 'User cannot add members to this chat',
        details: { reason: 'add_members_restricted' },
      });
    }

    const addedCount = await this.chatRepository.addMembers(chatId, body.userIds, currentUser.userId);

    return {
      success: true,
      addedCount,
    };
  }

  async removeMember(currentUser: CurrentUser, chatId: string, userId: string) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
      userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.chatType === 'direct') {
      throw new BadRequestException({
        message: 'Members cannot be removed from a direct chat',
        details: { reason: 'member_mutation_not_supported_for_direct_chat' },
      });
    }

    if (managementContext.targetMemberState === 'missing') {
      throw new NotFoundException({
        message: 'Target user is not a member of this chat',
        details: { reason: 'target_membership_missing' },
      });
    }

    if (managementContext.targetMemberState !== 'active') {
      throw new ConflictException({
        message: 'Target user is not an active member of this chat',
        details: { reason: 'target_membership_inactive' },
      });
    }

    if (
      currentUser.userId !== userId &&
      !managementContext.canAddMembers &&
      managementContext.actorRole !== 'owner' &&
      managementContext.actorRole !== 'admin'
    ) {
      throw new ForbiddenException({
        message: 'User cannot remove other members from this chat',
        details: { reason: 'remove_members_restricted' },
      });
    }

    await this.chatRepository.removeMember(chatId, userId);

    return {
      success: true,
    };
  }

  async updateMemberRole(currentUser: CurrentUser, chatId: string, userId: string, body: UpdateMemberRoleDto) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
      userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.chatType === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats do not support member role updates',
        details: { reason: 'direct_chat_roles_read_only' },
      });
    }

    if (managementContext.targetMemberState === 'missing') {
      throw new NotFoundException({
        message: 'Target user is not a member of this chat',
        details: { reason: 'target_membership_missing' },
      });
    }

    if (managementContext.targetMemberState !== 'active') {
      throw new ConflictException({
        message: 'Target user is not an active member of this chat',
        details: { reason: 'target_membership_inactive' },
      });
    }

    if (currentUser.userId === userId) {
      throw new BadRequestException({
        message: 'User cannot change their own role',
        details: { reason: 'self_role_change_not_allowed' },
      });
    }

    if (managementContext.actorRole !== 'owner') {
      throw new ForbiddenException({
        message: 'Only the owner can update member roles',
        details: { reason: 'member_role_update_restricted' },
      });
    }

    if (managementContext.targetRole === 'owner') {
      throw new ConflictException({
        message: 'The owner role cannot be reassigned in v1',
        details: { reason: 'owner_role_immutable' },
      });
    }

    const nextRole = body.role === 'admin' ? ChatMemberRole.admin : ChatMemberRole.member;
    const member = await this.chatRepository.updateMemberRole({
      chatId,
      userId,
      role: nextRole,
    });

    return {
      success: true,
      member: {
        chatId,
        userId,
        role: member.role,
      },
    };
  }

  async getMembershipAccess(chatId: string, userId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, userId);

    return {
      chatId,
      userId,
      chatExists: access.chatExists,
      memberState: access.memberState,
      canAccess: access.canAccess,
      canSendMessages: access.canSendMessages,
      chatType: access.chatType,
      peerUserId: access.peerUserId,
    };
  }

  async getActiveMemberUserIds(chatId: string) {
    return {
      chatId,
      userIds: await this.chatRepository.listActiveMemberUserIds(chatId),
    };
  }

  async listMembers(currentUser: CurrentUser, chatId: string) {
    const access = await this.chatRepository.getMembershipAccess(chatId, currentUser.userId);

    if (!access.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (access.memberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            access.memberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    const members = await this.chatRepository.listActiveMembers(chatId);
    const profilesByUserId = await this.profileServiceClient.getProfilesByUserIds(
      members.map((member) => member.userId),
    );

    return {
      chatId,
      items: members.map((member) => {
        const profile = profilesByUserId.get(member.userId);

        return {
          userId: member.userId,
          role: member.role,
          joinedAt: member.joinedAt?.toISOString() ?? null,
          profile: profile
            ? {
                id: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                avatarMediaId: profile.avatarMediaId,
              }
            : {
                id: member.userId,
                username: '',
                displayName: 'Unknown user',
                avatarMediaId: null,
              },
        };
      }),
    };
  }

  async listInviteLinks(currentUser: CurrentUser, chatId: string) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.chatType === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats do not support invite links',
        details: { reason: 'invite_links_not_supported_for_direct_chat' },
      });
    }

    const inviteLinks = await this.chatRepository.listInviteLinks(chatId);

    return {
      chatId,
      items: inviteLinks.map((inviteLink) => ({
        id: inviteLink.id,
        inviteUrl: buildInviteUrl(inviteLink.id),
        createdByUserId: inviteLink.createdByUserId,
        expiresAt: inviteLink.expiresAt?.toISOString() ?? null,
        maxUses: inviteLink.maxUses,
        usedCount: inviteLink.usedCount,
        revokedAt: inviteLink.revokedAt?.toISOString() ?? null,
        createdAt: inviteLink.createdAt.toISOString(),
      })),
    };
  }

  async createInviteLink(currentUser: CurrentUser, chatId: string, body: CreateInviteLinkDto) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.chatType === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats do not support invite links',
        details: { reason: 'invite_links_not_supported_for_direct_chat' },
      });
    }

    if (managementContext.actorRole !== 'owner' && managementContext.actorRole !== 'admin') {
      throw new ForbiddenException({
        message: 'User cannot create invite links for this chat',
        details: { reason: 'invite_links_restricted' },
      });
    }

    const internalSecret = randomBytes(18).toString('base64url');
    const inviteLink = await this.chatRepository.createInviteLink({
      chatId,
      tokenHash: hashInviteToken(internalSecret),
      createdByUserId: currentUser.userId,
      ...(body.expiresInDays !== undefined
        ? { expiresAt: new Date(Date.now() + body.expiresInDays * 24 * 60 * 60 * 1000) }
        : {}),
      ...(body.maxUses !== undefined ? { maxUses: body.maxUses } : {}),
    });

    return {
      success: true,
      inviteLink: {
        id: inviteLink.id,
        inviteUrl: buildInviteUrl(inviteLink.id),
        createdByUserId: inviteLink.createdByUserId,
        expiresAt: inviteLink.expiresAt?.toISOString() ?? null,
        maxUses: inviteLink.maxUses,
        usedCount: inviteLink.usedCount,
        revokedAt: inviteLink.revokedAt?.toISOString() ?? null,
        createdAt: inviteLink.createdAt.toISOString(),
      },
    };
  }

  // ── Permission engine helper ───────────────────────────────────────────────

  /**
   * Resolves effective permissions for a user in a chat.
   * Exposed as an endpoint for UI diagnostics and used internally by all moderation methods.
   */
  async getEffectivePermissions(currentUser: CurrentUser, chatId: string, targetUserId?: string) {
    const userId = targetUserId ?? currentUser.userId;
    const [member, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, userId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (!member) {
      return {
        userId,
        chatId,
        participationType: null,
        memberRole: null,
        memberStatus: null,
        permissions: getEffectivePermissions(
          { role: 'member', status: 'left' },
          { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
          chat.permissions,
        ),
      };
    }

    const perms = getEffectivePermissions(
      {
        role: member.role as any,
        status: member.status as any,
        adminPermissions: member.adminPermissions as AdminPermissions | null,
        restriction: member.restriction as MemberRestrictions | null,
        restrictionUntil: member.restrictionUntil,
      },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    return {
      userId,
      chatId,
      memberRole: member.role,
      memberStatus: member.status,
      restrictionExpiresAt: member.restrictionUntil?.toISOString() ?? null,
      permissions: perms,
    };
  }

  // ── Moderation ─────────────────────────────────────────────────────────────

  async banMember(currentUser: CurrentUser, chatId: string, targetUserId: string, body: BanMemberDto) {
    if (currentUser.userId === targetUserId) {
      throw new BadRequestException({ message: 'You cannot ban yourself', details: { reason: 'self_ban_not_allowed' } });
    }

    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canBanMembers) {
      throw new ForbiddenException({ message: actorPerms.denialReasons.canBanMembers ?? 'Insufficient permissions', details: { reason: 'ban_restricted' } });
    }

    if (targetMember && !canActorModerateTarget(actorMember.role as any, targetMember.role as any)) {
      throw new ForbiddenException({ message: 'You cannot ban this user', details: { reason: 'target_protected' } });
    }

    if (targetMember?.status === 'banned') {
      return { success: true, userId: targetUserId, alreadyBanned: true };
    }

    await this.chatRepository.banMember({
      chatId,
      userId: targetUserId,
      bannedByUserId: currentUser.userId,
      ...(body.reason !== undefined ? { reason: body.reason } : {}),
    });

    return { success: true, userId: targetUserId, banned: true };
  }

  async unbanMember(currentUser: CurrentUser, chatId: string, targetUserId: string) {
    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canUnbanMembers) {
      throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'unban_restricted' } });
    }

    if (!targetMember || targetMember.status !== 'banned') {
      throw new ConflictException({ message: 'User is not banned', details: { reason: 'target_not_banned' } });
    }

    await this.chatRepository.unbanMember({ chatId, userId: targetUserId, unbannedByUserId: currentUser.userId });

    return { success: true, userId: targetUserId, unbanned: true };
  }

  async kickMember(currentUser: CurrentUser, chatId: string, targetUserId: string) {
    if (currentUser.userId === targetUserId) {
      throw new BadRequestException({ message: 'Use leave endpoint to remove yourself', details: { reason: 'self_kick_not_allowed' } });
    }

    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canKickMembers) {
      throw new ForbiddenException({ message: actorPerms.denialReasons.canKickMembers ?? 'Insufficient permissions', details: { reason: 'kick_restricted' } });
    }

    if (!targetMember || targetMember.status !== 'active') {
      throw new ConflictException({ message: 'User is not an active member', details: { reason: 'target_not_active' } });
    }

    if (!canActorModerateTarget(actorMember.role as any, targetMember.role as any)) {
      throw new ForbiddenException({ message: 'You cannot kick this user', details: { reason: 'target_protected' } });
    }

    await this.chatRepository.kickMember({ chatId, userId: targetUserId, kickedByUserId: currentUser.userId });

    return { success: true, userId: targetUserId, kicked: true };
  }

  async restrictMember(currentUser: CurrentUser, chatId: string, targetUserId: string, body: RestrictMemberDto) {
    if (currentUser.userId === targetUserId) {
      throw new BadRequestException({ message: 'You cannot restrict yourself', details: { reason: 'self_restrict_not_allowed' } });
    }

    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canRestrictMembers) {
      throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'restrict_not_allowed' } });
    }

    if (!targetMember || targetMember.status !== 'active') {
      throw new ConflictException({ message: 'User is not an active member', details: { reason: 'target_not_active' } });
    }

    if (!canActorModerateTarget(actorMember.role as any, targetMember.role as any)) {
      throw new ForbiddenException({ message: 'You cannot restrict this user', details: { reason: 'target_protected' } });
    }

    const restriction = buildRestriction(body);
    const until = body.durationSeconds ? new Date(Date.now() + body.durationSeconds * 1000) : null;

    await this.chatRepository.restrictMember({
      chatId,
      userId: targetUserId,
      restrictedByUserId: currentUser.userId,
      restriction,
      until,
    });

    return { success: true, userId: targetUserId, restriction, restrictedUntil: until?.toISOString() ?? null };
  }

  async unrestrictMember(currentUser: CurrentUser, chatId: string, targetUserId: string) {
    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canRestrictMembers) {
      throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'restrict_not_allowed' } });
    }

    if (!targetMember) {
      throw new NotFoundException({ message: 'Member not found', details: { reason: 'target_missing' } });
    }

    await this.chatRepository.unrestrictMember({ chatId, userId: targetUserId, unrestrictedByUserId: currentUser.userId });

    return { success: true, userId: targetUserId, unrestricted: true };
  }

  async promoteMember(currentUser: CurrentUser, chatId: string, targetUserId: string, body: PromoteMemberDto) {
    if (currentUser.userId === targetUserId) {
      throw new BadRequestException({ message: 'You cannot promote yourself', details: { reason: 'self_promote_not_allowed' } });
    }

    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canManageAdmins) {
      throw new ForbiddenException({ message: 'Insufficient permissions to manage admins', details: { reason: 'manage_admins_restricted' } });
    }

    if (!targetMember || targetMember.status !== 'active') {
      throw new ConflictException({ message: 'User is not an active member', details: { reason: 'target_not_active' } });
    }

    if (targetMember.role === 'owner') {
      throw new ConflictException({ message: 'Cannot change owner role', details: { reason: 'owner_role_immutable' } });
    }

    // Prevent privilege escalation: actor's own permissions act as ceiling
    const actorAdminPerms: AdminPermissions =
      actorMember.role === 'owner'
        ? { ...DEFAULT_ADMIN_PERMISSIONS, canChangeInfo: true, canManageAdmins: true, canManageVoiceChats: true }
        : (actorMember.adminPermissions as AdminPermissions | null) ?? DEFAULT_ADMIN_PERMISSIONS;

    const requested: Partial<AdminPermissions> = {
      ...(body.canChangeInfo !== undefined ? { canChangeInfo: body.canChangeInfo } : {}),
      ...(body.canDeleteMessages !== undefined ? { canDeleteMessages: body.canDeleteMessages } : {}),
      ...(body.canBanUsers !== undefined ? { canBanUsers: body.canBanUsers } : {}),
      ...(body.canInviteUsers !== undefined ? { canInviteUsers: body.canInviteUsers } : {}),
      ...(body.canPinMessages !== undefined ? { canPinMessages: body.canPinMessages } : {}),
      ...(body.canManageAdmins !== undefined ? { canManageAdmins: body.canManageAdmins } : {}),
      ...(body.canPostMessages !== undefined ? { canPostMessages: body.canPostMessages } : {}),
      ...(body.canEditMessages !== undefined ? { canEditMessages: body.canEditMessages } : {}),
      ...(body.canManageVoiceChats !== undefined ? { canManageVoiceChats: body.canManageVoiceChats } : {}),
      ...(body.isAnonymous !== undefined ? { isAnonymous: body.isAnonymous } : {}),
      ...(body.customTitle !== undefined ? { customTitle: body.customTitle } : {}),
    };

    const sanitised = sanitiseGrantedAdminPermissions(actorAdminPerms, requested);

    await this.chatRepository.promoteMember({
      chatId,
      userId: targetUserId,
      promotedByUserId: currentUser.userId,
      adminPermissions: sanitised,
    });

    return { success: true, userId: targetUserId, role: 'admin', adminPermissions: sanitised };
  }

  async demoteMember(currentUser: CurrentUser, chatId: string, targetUserId: string) {
    if (currentUser.userId === targetUserId) {
      throw new BadRequestException({ message: 'You cannot demote yourself', details: { reason: 'self_demote_not_allowed' } });
    }

    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    if (!targetMember || targetMember.role !== 'admin') {
      throw new ConflictException({ message: 'User is not an admin', details: { reason: 'target_not_admin' } });
    }

    // Owner can demote anyone; admin can only demote their own promotees
    if (actorMember.role !== 'owner') {
      const actorPerms = getEffectivePermissions(
        { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
        { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
        chat.permissions,
      );

      if (!actorPerms.canManageAdmins) {
        throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'manage_admins_restricted' } });
      }

      if (!canActorConfigureAdmin(
        actorMember.role as any,
        !!(actorMember.adminPermissions as AdminPermissions | null)?.canManageAdmins,
        targetMember.promotedByUserId,
        currentUser.userId,
      )) {
        throw new ForbiddenException({ message: 'You can only demote admins you promoted', details: { reason: 'demote_target_not_own_promotee' } });
      }
    }

    await this.chatRepository.demoteMember({ chatId, userId: targetUserId, demotedByUserId: currentUser.userId });

    return { success: true, userId: targetUserId, role: 'member' };
  }

  // ── Join requests ──────────────────────────────────────────────────────────

  async listJoinRequests(currentUser: CurrentUser, chatId: string) {
    const [actorMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canApproveJoinRequests) {
      throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'approve_join_requests_restricted' } });
    }

    const requests = await this.chatRepository.listPendingJoinRequests(chatId);
    return { chatId, items: requests };
  }

  async approveJoinRequest(currentUser: CurrentUser, chatId: string, requestId: string) {
    const [actorMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canApproveJoinRequests) {
      throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'approve_join_requests_restricted' } });
    }

    const result = await this.chatRepository.approveJoinRequest({ requestId, reviewedByUserId: currentUser.userId, chatId });
    return { success: true, requestId, approved: true, userId: result.userId };
  }

  async declineJoinRequest(currentUser: CurrentUser, chatId: string, requestId: string) {
    const [actorMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    const actorPerms = getEffectivePermissions(
      { role: actorMember.role as any, status: actorMember.status as any, adminPermissions: actorMember.adminPermissions as any },
      { type: chat.type as any, allowMemberInvites: chat.allowMemberInvites },
      chat.permissions,
    );

    if (!actorPerms.canApproveJoinRequests) {
      throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'approve_join_requests_restricted' } });
    }

    const result = await this.chatRepository.declineJoinRequest({ requestId, reviewedByUserId: currentUser.userId, chatId });
    return { success: true, requestId, declined: true, userId: result.userId };
  }

  // ── Moderation log ────────────────────────────────────────────────────────

  async getModerationLog(currentUser: CurrentUser, chatId: string) {
    const [actorMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    if (!actorMember) throw new ForbiddenException({ message: 'You are not a member of this chat', details: { reason: 'membership_missing' } });

    // Only owner/admin can view the moderation log
    if (actorMember.role !== 'owner' && actorMember.role !== 'admin') {
      throw new ForbiddenException({ message: 'Insufficient permissions', details: { reason: 'moderation_log_restricted' } });
    }

    const logs = await this.chatRepository.getModerationLog(chatId);
    return {
      chatId,
      items: logs.map((log) => ({
        id: log.id,
        action: log.action,
        performedByUserId: log.performedByUserId,
        targetUserId: log.targetUserId,
        meta: log.meta,
        createdAt: log.createdAt.toISOString(),
      })),
    };
  }

  // ── Direct join ────────────────────────────────────────────────────────────

  /**
   * Allows a user to join a chat directly (not via invite link).
   * Enforces joinMode:
   *  - open             → immediate membership
   *  - approval_required → creates a pending JoinRequest
   *  - invite_only      → rejected; must use an invite link
   */
  async joinChat(currentUser: CurrentUser, chatId: string) {
    const chat = await this.chatRepository.findChatWithPermissions(chatId);

    if (!chat) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (chat.type === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats cannot be joined this way',
        details: { reason: 'direct_chat_join_not_supported' },
      });
    }

    // Cast: joinMode is available after prisma generate
    const joinMode = (chat as Record<string, unknown>)['joinMode'] as string | undefined ?? 'open';

    if (joinMode === 'invite_only') {
      throw new ForbiddenException({
        message: 'This chat can only be joined via an invite link',
        details: { reason: 'join_mode_invite_only' },
      });
    }

    if (joinMode === 'approval_required') {
      await this.chatRepository.createJoinRequest({ chatId, userId: currentUser.userId });
      return {
        success: true,
        joined: false,
        pendingApproval: true,
        chatId,
      };
    }

    // open
    const result = await this.chatRepository.joinChatDirect(chatId, currentUser.userId);

    if (result.banned) {
      throw new ForbiddenException({
        message: 'You are banned from this chat',
        details: { reason: 'user_banned' },
      });
    }

    return {
      success: true,
      joined: result.joined,
      alreadyMember: result.alreadyMember,
      pendingApproval: false,
      chatId,
    };
  }

  // ── Transfer ownership ────────────────────────────────────────────────────

  async transferOwnership(currentUser: CurrentUser, chatId: string, body: TransferOwnershipDto) {
    if (currentUser.userId === body.targetUserId) {
      throw new BadRequestException({
        message: 'You are already the owner',
        details: { reason: 'self_transfer_not_allowed' },
      });
    }

    const [actorMember, targetMember, chat] = await Promise.all([
      this.chatRepository.findMemberFull(chatId, currentUser.userId),
      this.chatRepository.findMemberFull(chatId, body.targetUserId),
      this.chatRepository.findChatWithPermissions(chatId),
    ]);

    if (!chat) {
      throw new NotFoundException({ message: 'Chat not found', details: { reason: 'chat_missing' } });
    }

    if (chat.type === 'direct') {
      throw new BadRequestException({
        message: 'Direct chats do not support ownership transfer',
        details: { reason: 'direct_chat_ownership_not_supported' },
      });
    }

    if (!actorMember || actorMember.status !== 'active') {
      throw new ForbiddenException({ message: 'You are not an active member', details: { reason: 'membership_missing' } });
    }

    if (actorMember.role !== 'owner') {
      throw new ForbiddenException({
        message: 'Only the owner can transfer ownership',
        details: { reason: 'transfer_ownership_restricted' },
      });
    }

    if (!targetMember || targetMember.status !== 'active') {
      throw new ConflictException({
        message: 'Target user is not an active member of this chat',
        details: { reason: 'target_not_active' },
      });
    }

    await this.chatRepository.transferOwnership({
      chatId,
      fromUserId: currentUser.userId,
      toUserId: body.targetUserId,
    });

    return {
      success: true,
      chatId,
      newOwnerId: body.targetUserId,
      previousOwnerId: currentUser.userId,
    };
  }

  async revokeInviteLink(currentUser: CurrentUser, chatId: string, inviteLinkId: string) {
    const managementContext = await this.chatRepository.getMemberManagementContext(
      chatId,
      currentUser.userId,
    );

    if (!managementContext.chatExists) {
      throw new NotFoundException({
        message: 'Chat not found',
        details: { reason: 'chat_missing' },
      });
    }

    if (managementContext.actorMemberState !== 'active') {
      throw new ForbiddenException({
        message: 'User is not an active member of this chat',
        details: {
          reason:
            managementContext.actorMemberState === 'missing'
              ? 'membership_missing'
              : 'membership_inactive',
        },
      });
    }

    if (managementContext.actorRole !== 'owner' && managementContext.actorRole !== 'admin') {
      throw new ForbiddenException({
        message: 'User cannot revoke invite links for this chat',
        details: { reason: 'invite_links_restricted' },
      });
    }

    const inviteLinks = await this.chatRepository.listInviteLinks(chatId);
    const targetInviteLink = inviteLinks.find((inviteLink) => inviteLink.id === inviteLinkId);

    if (!targetInviteLink) {
      throw new NotFoundException({
        message: 'Invite link not found',
        details: { reason: 'invite_link_missing' },
      });
    }

    if (targetInviteLink.revokedAt) {
      return { success: true, inviteLinkId, revoked: true };
    }

    await this.chatRepository.revokeInviteLink(inviteLinkId);

    return {
      success: true,
      inviteLinkId,
      revoked: true,
    };
  }

  private logSlowListChats(params: {
    currentUserId: string;
    limit: number;
    chatCount: number;
    peerProfileCount: number;
    lastSenderProfileCount: number;
    timings: Record<string, number>;
  }) {
    const thresholdMs = this.configService.get<number>('instrumentation.slowRequestThresholdMs') ?? 500;
    if ((params.timings.totalMs ?? 0) < thresholdMs) {
      return;
    }

    this.logger.warn(
      `slow_list_chats ${JSON.stringify({
        userId: params.currentUserId,
        limit: params.limit,
        chatCount: params.chatCount,
        peerProfileCount: params.peerProfileCount,
        lastSenderProfileCount: params.lastSenderProfileCount,
        timings: params.timings,
      })}`,
    );
  }

  private logSlowCreateDirectChat(params: {
    currentUserId: string;
    participantUserId: string;
    reusedExistingChat: boolean;
    timings: Record<string, number>;
  }) {
    const thresholdMs = this.configService.get<number>('instrumentation.slowRequestThresholdMs') ?? 500;
    if ((params.timings.totalMs ?? 0) < thresholdMs) {
      return;
    }

    this.logger.warn(
      `slow_create_direct_chat ${JSON.stringify({
        userId: params.currentUserId,
        participantUserId: params.participantUserId,
        reusedExistingChat: params.reusedExistingChat,
        timings: params.timings,
      })}`,
    );
  }

}

function roundDuration(durationMs: number) {
  return Number(durationMs.toFixed(2));
}

/**
 * Builds a MemberRestrictions object from a RestrictMemberDto.
 *
 * Evaluation order:
 *  1. Named preset overrides all individual flags.
 *  2. 'mute'     → block all sending, keep invite right.
 *  3. 'no_media' → block media/stickers/polls/previews, allow text.
 *  4. No preset  → apply individual flags (default true = no restriction).
 */
function buildRestriction(body: RestrictMemberDto): MemberRestrictions {
  if (body.preset === 'mute') {
    return { ...MUTED_RESTRICTIONS };
  }

  if (body.preset === 'no_media') {
    return {
      canSendMessages:       true,
      canSendMedia:          false,
      canSendStickersAndGifs: false,
      canSendPolls:          false,
      canAddLinkPreviews:    false,
      canInviteUsers:        true,
    };
  }

  // Individual flags — default true (no restriction) when not explicitly set
  return {
    canSendMessages:        body.canSendMessages        ?? NO_RESTRICTIONS.canSendMessages,
    canSendMedia:           body.canSendMedia           ?? NO_RESTRICTIONS.canSendMedia,
    canSendStickersAndGifs: body.canSendStickersAndGifs ?? NO_RESTRICTIONS.canSendStickersAndGifs,
    canSendPolls:           body.canSendPolls           ?? NO_RESTRICTIONS.canSendPolls,
    canAddLinkPreviews:     body.canAddLinkPreviews     ?? NO_RESTRICTIONS.canAddLinkPreviews,
    canInviteUsers:         body.canInviteUsers         ?? NO_RESTRICTIONS.canInviteUsers,
  };
}

function normalizeInviteToken(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  const prefixedMatch = trimmed.match(/(?:https?:\/\/)?t\.me\/\+([A-Za-z0-9_-]+)/i);
  if (prefixedMatch?.[1]) {
    return prefixedMatch[1];
  }

  return trimmed.replace(/^[@+]+/, '');
}

function hashInviteToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

function buildInviteUrl(token: string) {
  return `https://t.me/+${token}`;
}
