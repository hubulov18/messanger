import { Injectable } from '@nestjs/common';
import {
  CHAT_MEMBER_ADDED_EVENT_TYPE,
  CHAT_MEMBER_REMOVED_EVENT_TYPE,
  CHAT_MEMBER_RESTRICTED_EVENT_TYPE,
  createEventEnvelope,
} from '@telegram/contracts/events';
import {
  Prisma,
  ChatMemberRole,
  ChatMemberStatus,
  ChatType,
  OutboxEventStatus,
  type Chat,
} from '../../generated/prisma/client.js';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../../prisma/prisma.service.js';

type MemberState = 'active' | 'inactive' | 'missing';
type ChatListRow = {
  id: string;
  type: ChatType;
  title: string | null;
  isArchived: boolean;
  peerUserId: string | null;
  memberCount: number;
  pinnedAt: Date | null;
  isMuted: boolean;
};

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
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findDirectChatBetweenUsers(userA: string, userB: string): Promise<Chat | null> {
    const memberships = await this.prisma.chatMember.findMany({
      where: {
        userId: {
          in: [userA, userB],
        },
        status: ChatMemberStatus.active,
        chat: {
          type: ChatType.direct,
        },
      },
      select: {
        chatId: true,
      },
    });

    const counts = new Map<string, number>();
    for (const membership of memberships) {
      counts.set(membership.chatId, (counts.get(membership.chatId) ?? 0) + 1);
    }

    const sharedChatId = [...counts.entries()].find(([, count]) => count === 2)?.[0];
    if (!sharedChatId) {
      return null;
    }

    const memberCount = await this.prisma.chatMember.count({
      where: {
        chatId: sharedChatId,
        status: ChatMemberStatus.active,
      },
    });

    if (memberCount !== 2) {
      return null;
    }

    return this.prisma.chat.findUnique({ where: { id: sharedChatId } });
  }

  async createDirectChat(params: { requesterUserId: string; participantUserId: string }) {
    const chatId = `chat_${randomUUID()}`;
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const chat = await tx.chat.create({
        data: {
          id: chatId,
          type: ChatType.direct,
          createdByUserId: params.requesterUserId,
        },
      });

      const members = [
        {
          id: `member_${randomUUID()}`,
          chatId,
          userId: params.requesterUserId,
          role: ChatMemberRole.owner,
          status: ChatMemberStatus.active,
          joinedAt: occurredAt,
        },
        {
          id: `member_${randomUUID()}`,
          chatId,
          userId: params.participantUserId,
          role: ChatMemberRole.member,
          status: ChatMemberStatus.active,
          joinedAt: occurredAt,
          invitedByUserId: params.requesterUserId,
        },
      ];

      await tx.chatMember.createMany({ data: members });
      await tx.chatPermission.create({ data: { chatId } });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.chat.created',
        aggregateId: chat.id,
        partitionKey: chat.id,
        payloadJson: {
          chatId: chat.id,
          type: chat.type,
          title: chat.title,
          createdByUserId: chat.createdByUserId,
          memberUserIds: [params.requesterUserId, params.participantUserId],
          createdAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      for (const member of members) {
        await this.writeChatMemberAddedEvent(tx, {
          aggregateId: member.id,
          chatId: chat.id,
          userId: member.userId,
          role: member.role,
          status: member.status,
          addedByUserId: params.requesterUserId,
          occurredAt,
          joinedAt: member.joinedAt ?? null,
        });
      }

      return chat;
    });
  }

  async createGroupChat(params: {
    requesterUserId: string;
    title: string;
    description?: string;
    memberUserIds: string[];
  }) {
    const chatId = `chat_${randomUUID()}`;
    const occurredAt = new Date();
    const uniqueMembers = [...new Set([params.requesterUserId, ...params.memberUserIds])];

    return this.prisma.$transaction(async (tx) => {
      const chat = await tx.chat.create({
        data: {
          id: chatId,
          type: ChatType.group,
          title: params.title,
          ...(params.description !== undefined ? { description: params.description } : {}),
          createdByUserId: params.requesterUserId,
        },
      });

      const members = uniqueMembers.map((userId) => ({
        id: `member_${randomUUID()}`,
        chatId,
        userId,
        role: userId === params.requesterUserId ? ChatMemberRole.owner : ChatMemberRole.member,
        status: ChatMemberStatus.active,
        joinedAt: occurredAt,
        invitedByUserId: userId === params.requesterUserId ? null : params.requesterUserId,
      }));

      await tx.chatMember.createMany({ data: members });
      await tx.chatPermission.create({ data: { chatId } });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.chat.created',
        aggregateId: chat.id,
        partitionKey: chat.id,
        payloadJson: {
          chatId: chat.id,
          type: chat.type,
          title: chat.title,
          createdByUserId: chat.createdByUserId,
          memberUserIds: uniqueMembers,
          createdAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      for (const member of members) {
        await this.writeChatMemberAddedEvent(tx, {
          aggregateId: member.id,
          chatId: chat.id,
          userId: member.userId,
          role: member.role,
          status: member.status,
          addedByUserId: params.requesterUserId,
          occurredAt,
          joinedAt: member.joinedAt ?? null,
        });
      }

      return chat;
    });
  }

  async createChannelChat(params: {
    requesterUserId: string;
    title: string;
    description?: string;
  }) {
    const chatId = `chat_${randomUUID()}`;
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const chat = await tx.chat.create({
        data: {
          id: chatId,
          type: ChatType.channel,
          title: params.title,
          ...(params.description !== undefined ? { description: params.description } : {}),
          createdByUserId: params.requesterUserId,
        },
      });

      const ownerMember = {
        id: `member_${randomUUID()}`,
        chatId,
        userId: params.requesterUserId,
        role: ChatMemberRole.owner,
        status: ChatMemberStatus.active,
        joinedAt: occurredAt,
      };

      await tx.chatMember.create({ data: ownerMember });
      await tx.chatPermission.create({
        data: {
          chatId,
          canSendMessages: true,
          canAddMembers: false,
          canPinMessages: true,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.chat.created',
        aggregateId: chat.id,
        partitionKey: chat.id,
        payloadJson: {
          chatId: chat.id,
          type: chat.type,
          title: chat.title,
          createdByUserId: chat.createdByUserId,
          memberUserIds: [params.requesterUserId],
          createdAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      await this.writeChatMemberAddedEvent(tx, {
        aggregateId: ownerMember.id,
        chatId: chat.id,
        userId: ownerMember.userId,
        role: ownerMember.role,
        status: ownerMember.status,
        addedByUserId: params.requesterUserId,
        occurredAt,
        joinedAt: ownerMember.joinedAt ?? null,
      });

      return chat;
    });
  }

  async findChatById(chatId: string) {
    return this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        permissions: true,
        members: {
          where: {
            status: ChatMemberStatus.active,
          },
        },
      },
    });
  }

  async listActiveMemberUserIds(chatId: string) {
    const members = await this.prisma.chatMember.findMany({
      where: {
        chatId,
        status: ChatMemberStatus.active,
      },
      select: {
        userId: true,
      },
    });

    return members.map((member) => member.userId);
  }

  async listActiveMembers(chatId: string) {
    return this.prisma.chatMember.findMany({
      where: {
        chatId,
        status: ChatMemberStatus.active,
      },
      select: {
        userId: true,
        role: true,
        joinedAt: true,
      },
      orderBy: [{ role: 'asc' }, { joinedAt: 'asc' }],
    });
  }

  async updateChatIdentity(params: {
    chatId: string;
    title?: string;
    description?: string | null;
    photoMediaId?: string | null;
    updatedByUserId: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const chat = await tx.chat.update({
        where: { id: params.chatId },
        data: {
          ...(params.title !== undefined ? { title: params.title } : {}),
          ...(params.description !== undefined ? { description: params.description } : {}),
          ...(params.photoMediaId !== undefined ? { photoMediaId: params.photoMediaId } : {}),
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.chat.updated',
        aggregateId: chat.id,
        partitionKey: chat.id,
        payloadJson: {
          chatId: chat.id,
          title: chat.title,
          description: chat.description,
          photoMediaId: chat.photoMediaId,
          updatedByUserId: params.updatedByUserId,
          updatedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return chat;
    });
  }

  async listInviteLinks(chatId: string) {
    return this.prisma.inviteLink.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createInviteLink(params: {
    chatId: string;
    tokenHash: string;
    createdByUserId: string;
    expiresAt?: Date | null;
    maxUses?: number | null;
  }) {
    return this.prisma.inviteLink.create({
      data: {
        id: `invite_${randomUUID()}`,
        chatId: params.chatId,
        tokenHash: params.tokenHash,
        createdByUserId: params.createdByUserId,
        ...(params.expiresAt !== undefined ? { expiresAt: params.expiresAt } : {}),
        ...(params.maxUses !== undefined ? { maxUses: params.maxUses } : {}),
      },
    });
  }

  async findInviteLinkByTokenHash(tokenHash: string) {
    return this.prisma.inviteLink.findUnique({
      where: { tokenHash },
      include: {
        chat: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async findInviteLinkById(inviteLinkId: string) {
    return this.prisma.inviteLink.findUnique({
      where: { id: inviteLinkId },
      include: {
        chat: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async revokeInviteLink(inviteLinkId: string) {
    return this.prisma.inviteLink.update({
      where: { id: inviteLinkId },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async activateMemberViaInvite(params: {
    chatId: string;
    userId: string;
    invitedByUserId: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const existingMembership = await tx.chatMember.findUnique({
        where: {
          chatId_userId: {
            chatId: params.chatId,
            userId: params.userId,
          },
        },
      });

      if (existingMembership?.status === ChatMemberStatus.active) {
        return {
          joined: false,
          role: existingMembership.role,
        };
      }

      if (existingMembership) {
        const updatedMember = await tx.chatMember.update({
          where: {
            chatId_userId: {
              chatId: params.chatId,
              userId: params.userId,
            },
          },
          data: {
            status: ChatMemberStatus.active,
            leftAt: null,
            joinedAt: occurredAt,
            invitedByUserId: params.invitedByUserId,
            role: existingMembership.role ?? ChatMemberRole.member,
          },
        });

        return {
          joined: true,
          role: updatedMember.role,
        };
      }

      const createdMember = await tx.chatMember.create({
        data: {
          id: `member_${randomUUID()}`,
          chatId: params.chatId,
          userId: params.userId,
          role: ChatMemberRole.member,
          status: ChatMemberStatus.active,
          joinedAt: occurredAt,
          invitedByUserId: params.invitedByUserId,
        },
      });

      return {
        joined: true,
        role: createdMember.role,
      };
    });
  }

  async markInviteLinkUsed(inviteLinkId: string) {
    return this.prisma.inviteLink.update({
      where: { id: inviteLinkId },
      data: {
        usedCount: {
          increment: 1,
        },
      },
    });
  }

  async isChatPinned(chatId: string, userId: string) {
    const chatPin = await this.prisma.chatPin.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
      select: {
        id: true,
      },
    });

    return chatPin !== null;
  }

  async listChatsForUser(userId: string, limit: number) {
    return this.prisma.$queryRaw<ChatListRow[]>(Prisma.sql`
      SELECT
        c.id,
        c.type,
        c.title,
        c.is_archived AS "isArchived",
        peer.user_id AS "peerUserId",
        CASE
          WHEN c.type = ${ChatType.direct}::"ChatType" THEN 2
          ELSE COALESCE(member_counts.active_member_count, 0)
        END AS "memberCount",
        pin.pinned_at AS "pinnedAt",
        (mute.chat_id IS NOT NULL) AS "isMuted"
      FROM chat_members AS membership
      INNER JOIN chats AS c
        ON c.id = membership.chat_id
      LEFT JOIN chat_pins AS pin
        ON pin.chat_id = c.id
       AND pin.user_id = ${userId}
      LEFT JOIN chat_mutes AS mute
        ON mute.chat_id = c.id
       AND mute.user_id = ${userId}
      LEFT JOIN LATERAL (
        SELECT cm.user_id
        FROM chat_members AS cm
        WHERE cm.chat_id = c.id
          AND cm.status = ${ChatMemberStatus.active}::"ChatMemberStatus"
          AND cm.user_id <> ${userId}
        ORDER BY cm.user_id ASC
        LIMIT 1
      ) AS peer
        ON c.type = ${ChatType.direct}::"ChatType"
      LEFT JOIN LATERAL (
        SELECT COUNT(*)::int AS active_member_count
        FROM chat_members AS cm_count
        WHERE cm_count.chat_id = c.id
          AND cm_count.status = ${ChatMemberStatus.active}::"ChatMemberStatus"
      ) AS member_counts
        ON c.type <> ${ChatType.direct}::"ChatType"
      WHERE membership.user_id = ${userId}
        AND membership.status = ${ChatMemberStatus.active}::"ChatMemberStatus"
      ORDER BY membership.joined_at DESC NULLS LAST
      LIMIT ${limit}
    `);
  }

  async pinChat(chatId: string, userId: string) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const chatPin = await tx.chatPin.upsert({
        where: {
          chatId_userId: {
            chatId,
            userId,
          },
        },
        update: {
          pinnedAt: occurredAt,
        },
        create: {
          id: `pin_${randomUUID()}`,
          chatId,
          userId,
          pinnedAt: occurredAt,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.chat.pinned',
        aggregateId: chatPin.id,
        partitionKey: chatId,
        payloadJson: {
          chatId,
          userId,
          pinnedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return chatPin;
    });
  }

  async unpinChat(chatId: string, userId: string) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.chatPin.findUnique({
        where: {
          chatId_userId: {
            chatId,
            userId,
          },
        },
      });

      if (!existing) {
        return null;
      }

      await tx.chatPin.delete({
        where: {
          chatId_userId: {
            chatId,
            userId,
          },
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.chat.unpinned',
        aggregateId: existing.id,
        partitionKey: chatId,
        payloadJson: {
          chatId,
          userId,
          unpinnedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return existing;
    });
  }

  async muteChat(chatId: string, userId: string) {
    const occurredAt = new Date();

    return this.prisma.chatMute.upsert({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
      update: {
        mutedAt: occurredAt,
      },
      create: {
        id: `mute_${randomUUID()}`,
        chatId,
        userId,
        mutedAt: occurredAt,
      },
    });
  }

  async unmuteChat(chatId: string, userId: string) {
    const existing = await this.prisma.chatMute.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
    });

    if (!existing) {
      return null;
    }

    return this.prisma.chatMute.delete({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
    });
  }

  async addMembers(chatId: string, userIds: string[], invitedByUserId: string) {
    const uniqueUserIds = [...new Set(userIds)];
    const existingMembers = await this.prisma.chatMember.findMany({
      where: {
        chatId,
        userId: {
          in: uniqueUserIds,
        },
      },
      select: {
        userId: true,
      },
    });

    const existingUserIds = new Set(existingMembers.map((member) => member.userId));
    const newUserIds = uniqueUserIds.filter((userId) => !existingUserIds.has(userId));

    if (newUserIds.length === 0) {
      return 0;
    }

    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const members = newUserIds.map((userId) => ({
        id: `member_${randomUUID()}`,
        chatId,
        userId,
        role: ChatMemberRole.member,
        status: ChatMemberStatus.active,
        joinedAt: occurredAt,
        invitedByUserId,
      }));

      const result = await tx.chatMember.createMany({ data: members });

      for (const member of members) {
        await this.writeChatMemberAddedEvent(tx, {
          aggregateId: member.id,
          chatId,
          userId: member.userId,
          role: member.role,
          status: member.status,
          addedByUserId: invitedByUserId,
          occurredAt,
          joinedAt: member.joinedAt ?? null,
        });
      }

      return result.count;
    });
  }

  async removeMember(chatId: string, userId: string) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const member = await tx.chatMember.update({
        where: {
          chatId_userId: {
            chatId,
            userId,
          },
        },
        data: {
          status: ChatMemberStatus.removed,
          leftAt: occurredAt,
        },
      });

      await this.writeChatMemberRemovedEvent(tx, {
        aggregateId: member.id,
        chatId,
        userId,
        role: member.role,
        status: member.status,
        occurredAt,
        removedByUserId: null,
      });

      return member;
    });
  }

  async getMemberManagementContext(chatId: string, actorUserId: string, targetUserId?: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        permissions: true,
      },
    });

    if (!chat) {
      return {
        chatExists: false,
        chatType: null,
        canAddMembers: false,
        actorMemberState: 'missing' as MemberState,
        actorRole: null,
        targetMemberState: targetUserId ? ('missing' as MemberState) : null,
      };
    }

    const actorMembership = await this.prisma.chatMember.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId: actorUserId,
        },
      },
      select: {
        role: true,
        status: true,
      },
    });

    const targetMembership = targetUserId
      ? await this.prisma.chatMember.findUnique({
          where: {
            chatId_userId: {
              chatId,
              userId: targetUserId,
            },
          },
          select: {
            role: true,
            status: true,
          },
        })
      : null;

    return {
      chatExists: true,
      chatType: chat.type,
      canAddMembers: chat.permissions?.canAddMembers ?? true,
      actorMemberState: this.toMemberState(actorMembership?.status),
      actorRole: actorMembership?.role ?? null,
      targetMemberState: targetUserId ? this.toMemberState(targetMembership?.status) : null,
      targetRole: targetMembership?.role ?? null,
    };
  }

  async updateChatPermissions(params: {
    chatId: string;
    canSendMessages?: boolean;
    canAddMembers?: boolean;
  }) {
    return this.prisma.chatPermission.update({
      where: {
        chatId: params.chatId,
      },
      data: {
        ...(params.canSendMessages !== undefined ? { canSendMessages: params.canSendMessages } : {}),
        ...(params.canAddMembers !== undefined ? { canAddMembers: params.canAddMembers } : {}),
      },
    });
  }

  async updateMemberRole(params: {
    chatId: string;
    userId: string;
    role: 'admin' | 'member';
  }) {
    return this.prisma.chatMember.update({
      where: {
        chatId_userId: {
          chatId: params.chatId,
          userId: params.userId,
        },
      },
      data: {
        role: params.role,
      },
    });
  }

  async getMembershipAccess(chatId: string, userId: string) {
    const membership = await this.prisma.chatMember.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
      select: {
        status: true,
        restriction: true,
        restrictionUntil: true,
        chat: {
          select: {
            type: true,
            permissions: true,
          },
        },
      },
    });

    const chat =
      membership?.chat ??
      (await this.prisma.chat.findUnique({
        where: { id: chatId },
        select: {
          type: true,
          permissions: true,
        },
      }));

    const chatExists = chat !== null;
    const memberState = membership
      ? membership.status === ChatMemberStatus.active
        ? 'active'
        : 'inactive'
      : 'missing';
    const canAccess = memberState === 'active';

    // Layered canSendMessages check:
    //  1. Chat-wide permission
    //  2. Per-member restriction overlay (if not expired)
    //  NOTE: restriction / restrictionUntil are new columns — types updated after `prisma generate`
    let canSendMessages = canAccess && (chat?.permissions?.canSendMessages ?? true);
    if (canSendMessages && membership) {
      const m = membership as unknown as { restriction: Record<string, unknown> | null; restrictionUntil: Date | null };
      const restriction = m.restriction;
      const restrictionUntil = m.restrictionUntil;
      const restrictionActive = restriction !== null && (restrictionUntil === null || restrictionUntil > new Date());
      if (restrictionActive && restriction?.['canSendMessages'] === false) {
        canSendMessages = false;
      }
    }

    const peerUserId =
      chat?.type === ChatType.direct
        ? (
            await this.prisma.chatMember.findFirst({
              where: {
                chatId,
                status: ChatMemberStatus.active,
                userId: {
                  not: userId,
                },
              },
              select: {
                userId: true,
              },
            })
          )?.userId ?? null
        : null;

    return {
      chatExists,
      memberState,
      canAccess,
      canSendMessages,
      chatType: chat?.type ?? null,
      peerUserId,
    };
  }

  private toMemberState(status?: ChatMemberStatus): MemberState {
    if (!status) {
      return 'missing';
    }

    return status === ChatMemberStatus.active ? 'active' : 'inactive';
  }

  private writeOutboxEvent(
    tx: OutboxWriter,
    params: {
      eventId?: string;
      eventType: string;
      eventVersion?: number;
      aggregateId: string;
      partitionKey: string;
      payloadJson: object;
      occurredAt: Date;
    },
  ) {
    return tx.outboxEvent.create({
      data: {
        id: params.eventId ?? `evt_${randomUUID()}`,
        eventType: params.eventType,
        eventVersion: params.eventVersion ?? 1,
        aggregateId: params.aggregateId,
        partitionKey: params.partitionKey,
        payloadJson: params.payloadJson,
        occurredAt: params.occurredAt,
        status: OutboxEventStatus.pending,
      },
    });
  }

  private writeChatMemberAddedEvent(
    tx: OutboxWriter,
    params: {
      aggregateId: string;
      chatId: string;
      userId: string;
      role: ChatMemberRole;
      status: ChatMemberStatus;
      addedByUserId: string | null;
      occurredAt: Date;
      joinedAt: Date | null;
    },
  ) {
    const eventId = `evt_${randomUUID()}`;
    const event = createEventEnvelope({
      eventId,
      eventType: CHAT_MEMBER_ADDED_EVENT_TYPE,
      aggregateId: params.aggregateId,
      occurredAt: params.occurredAt,
      payload: {
        chatId: params.chatId,
        userId: params.userId,
        role: params.role,
        status: params.status,
        addedByUserId: params.addedByUserId,
        joinedAt: params.joinedAt?.toISOString() ?? null,
      },
    });

    return this.writeOutboxEvent(tx, {
      eventId: event.eventId,
      eventType: event.eventType,
      eventVersion: event.eventVersion,
      aggregateId: params.aggregateId,
      partitionKey: params.chatId,
      payloadJson: event,
      occurredAt: params.occurredAt,
    });
  }

  private writeChatMemberRemovedEvent(
    tx: OutboxWriter,
    params: {
      aggregateId: string;
      chatId: string;
      userId: string;
      role: ChatMemberRole;
      status: ChatMemberStatus;
      occurredAt: Date;
      removedByUserId: string | null;
    },
  ) {
    const eventId = `evt_${randomUUID()}`;
    const event = createEventEnvelope({
      eventId,
      eventType: CHAT_MEMBER_REMOVED_EVENT_TYPE,
      aggregateId: params.aggregateId,
      occurredAt: params.occurredAt,
      payload: {
        chatId: params.chatId,
        userId: params.userId,
        role: params.role,
        status: params.status,
        removedAt: params.occurredAt.toISOString(),
        removedByUserId: params.removedByUserId,
      },
    });

    return this.writeOutboxEvent(tx, {
      eventId: event.eventId,
      eventType: event.eventType,
      eventVersion: event.eventVersion,
      aggregateId: params.aggregateId,
      partitionKey: params.chatId,
      payloadJson: event,
      occurredAt: params.occurredAt,
    });
  }

  private writeChatMemberRestrictedEvent(
    tx: OutboxWriter,
    params: {
      aggregateId: string;
      chatId: string;
      userId: string;
      role: ChatMemberRole;
      status: ChatMemberStatus;
      occurredAt: Date;
      restrictedByUserId: string | null;
      restrictionUntil: Date | null;
      restriction: Record<string, boolean> | null;
    },
  ) {
    const eventId = `evt_${randomUUID()}`;
    const event = createEventEnvelope({
      eventId,
      eventType: CHAT_MEMBER_RESTRICTED_EVENT_TYPE,
      aggregateId: params.aggregateId,
      occurredAt: params.occurredAt,
      payload: {
        chatId: params.chatId,
        userId: params.userId,
        role: params.role,
        status: params.status,
        restrictedByUserId: params.restrictedByUserId,
        restrictedAt: params.occurredAt.toISOString(),
        restrictionUntil: params.restrictionUntil?.toISOString() ?? null,
        restriction: params.restriction,
      },
    });

    return this.writeOutboxEvent(tx, {
      eventId: event.eventId,
      eventType: event.eventType,
      eventVersion: event.eventVersion,
      aggregateId: params.aggregateId,
      partitionKey: params.chatId,
      payloadJson: event,
      occurredAt: params.occurredAt,
    });
  }

  async archiveChat(chatId: string) {
    await this.prisma.chat.update({
      where: { id: chatId },
      data: { isArchived: true },
    });
  }

  async unarchiveChat(chatId: string) {
    await this.prisma.chat.update({
      where: { id: chatId },
      data: { isArchived: false },
    });
  }

  // ── New moderation methods ─────────────────────────────────────────────────

  /**
   * Fetches full member record including permission/restriction fields.
   * Used by the permission engine and moderation service methods.
   */
  async findMemberFull(chatId: string, userId: string) {
    return this.prisma.chatMember.findUnique({
      where: { chatId_userId: { chatId, userId } },
    });
  }

  /**
   * Fetches chat + permissions in one query (for permission engine input).
   */
  async findChatWithPermissions(chatId: string) {
    return this.prisma.chat.findUnique({
      where: { id: chatId },
      include: { permissions: true },
    });
  }

  /**
   * Bans a member. Status → banned. Writes moderation_log in same transaction.
   */
  async banMember(params: {
    chatId: string;
    userId: string;
    bannedByUserId: string;
    reason?: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const member = await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.userId } },
        data: {
          status: ChatMemberStatus.banned,
          leftAt: occurredAt,
          bannedByUserId: params.bannedByUserId,
          bannedAt: occurredAt,
          bannedReason: params.reason ?? null,
        },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.bannedByUserId,
        targetUserId: params.userId,
        action: 'ban',
        meta: { reason: params.reason ?? null },
        occurredAt,
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.member.banned',
        aggregateId: member.id,
        partitionKey: params.chatId,
        payloadJson: {
          chatId: params.chatId,
          userId: params.userId,
          bannedByUserId: params.bannedByUserId,
          reason: params.reason ?? null,
          bannedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return member;
    });
  }

  /**
   * Removes a ban. Deletes the membership record so user can rejoin freely.
   */
  async unbanMember(params: {
    chatId: string;
    userId: string;
    unbannedByUserId: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      await tx.chatMember.delete({
        where: { chatId_userId: { chatId: params.chatId, userId: params.userId } },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.unbannedByUserId,
        targetUserId: params.userId,
        action: 'unban',
        meta: null,
        occurredAt,
      });
    });
  }

  /**
   * Kicks a member (removed without ban — status → left). Can rejoin.
   */
  async kickMember(params: {
    chatId: string;
    userId: string;
    kickedByUserId: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const member = await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.userId } },
        data: {
          status: ChatMemberStatus.left,
          leftAt: occurredAt,
        },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.kickedByUserId,
        targetUserId: params.userId,
        action: 'kick',
        meta: null,
        occurredAt,
      });

      await this.writeChatMemberRemovedEvent(tx, {
        aggregateId: member.id,
        chatId: params.chatId,
        userId: params.userId,
        role: member.role,
        status: member.status,
        occurredAt,
        removedByUserId: params.kickedByUserId,
      });

      return member;
    });
  }

  /**
   * Applies a restriction overlay to an active member.
   * Does NOT change status — restriction is a JSONB overlay.
   */
  async restrictMember(params: {
    chatId: string;
    userId: string;
    restrictedByUserId: string;
    restriction: object;
    until: Date | null;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const member = await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.userId } },
        data: {
          restriction: params.restriction,
          restrictionUntil: params.until,
          restrictedByUserId: params.restrictedByUserId,
          restrictedAt: occurredAt,
        },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.restrictedByUserId,
        targetUserId: params.userId,
        action: 'restrict',
        meta: { restriction: params.restriction, until: params.until?.toISOString() ?? null },
        occurredAt,
      });

      await this.writeChatMemberRestrictedEvent(tx, {
        aggregateId: member.id,
        chatId: params.chatId,
        userId: params.userId,
        role: member.role,
        status: member.status,
        occurredAt,
        restrictedByUserId: params.restrictedByUserId,
        restrictionUntil: params.until,
        restriction: params.restriction as Record<string, boolean>,
      });

      return member;
    });
  }

  /**
   * Removes restriction overlay from a member.
   */
  async unrestrictMember(params: {
    chatId: string;
    userId: string;
    unrestrictedByUserId: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const member = await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.userId } },
        data: {
          restriction: Prisma.JsonNull,
          restrictionUntil: null,
          restrictedByUserId: null,
          restrictedAt: null,
        },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.unrestrictedByUserId,
        targetUserId: params.userId,
        action: 'unrestrict',
        meta: null,
        occurredAt,
      });

      await this.writeChatMemberRestrictedEvent(tx, {
        aggregateId: member.id,
        chatId: params.chatId,
        userId: params.userId,
        role: member.role,
        status: member.status,
        occurredAt,
        restrictedByUserId: params.unrestrictedByUserId,
        restrictionUntil: null,
        restriction: null,
      });

      return member;
    });
  }

  /**
   * Promotes a member to admin with configurable permission flags.
   */
  async promoteMember(params: {
    chatId: string;
    userId: string;
    promotedByUserId: string;
    adminPermissions: object;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const member = await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.userId } },
        data: {
          role: ChatMemberRole.admin,
          adminPermissions: params.adminPermissions,
          promotedByUserId: params.promotedByUserId,
          promotedAt: occurredAt,
        },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.promotedByUserId,
        targetUserId: params.userId,
        action: 'promote_admin',
        meta: { adminPermissions: params.adminPermissions },
        occurredAt,
      });

      return member;
    });
  }

  /**
   * Demotes an admin back to member. Clears adminPermissions.
   */
  async demoteMember(params: {
    chatId: string;
    userId: string;
    demotedByUserId: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const member = await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.userId } },
        data: {
          role: ChatMemberRole.member,
          adminPermissions: Prisma.JsonNull,
          promotedByUserId: null,
          promotedAt: null,
        },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.demotedByUserId,
        targetUserId: params.userId,
        action: 'demote_admin',
        meta: null,
        occurredAt,
      });

      return member;
    });
  }

  // ── Join requests ──────────────────────────────────────────────────────────

  /**
   * Creates a join request for approval-required chats.
   * Enforced by partial unique index: one pending request per (chat, user).
   */
  async createJoinRequest(params: {
    chatId: string;
    userId: string;
    inviteLinkId?: string;
  }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return (this.prisma as any).joinRequest.create({
      data: {
        id: `jreq_${randomUUID()}`,
        chatId: params.chatId,
        userId: params.userId,
        inviteLinkId: params.inviteLinkId ?? null,
        status: 'pending',
      },
    });
  }

  async listPendingJoinRequests(chatId: string): Promise<Array<{ id: string; chatId: string; userId: string; status: string; createdAt: Date }>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return (this.prisma as any).joinRequest.findMany({
      where: { chatId, status: 'pending' },
      orderBy: { createdAt: 'asc' },
    });
  }

  async approveJoinRequest(params: {
    requestId: string;
    reviewedByUserId: string;
    chatId: string;
  }) {
    const occurredAt = new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.prisma.$transaction(async (tx: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const request = await tx.joinRequest.update({
        where: { id: params.requestId },
        data: {
          status: 'approved',
          reviewedByUserId: params.reviewedByUserId,
          reviewedAt: occurredAt,
        },
      }) as { id: string; userId: string };

      // Activate the membership
      const existing = await tx.chatMember.findUnique({
        where: { chatId_userId: { chatId: params.chatId, userId: request.userId } },
      });

      const member = existing
        ? await tx.chatMember.update({
          where: { chatId_userId: { chatId: params.chatId, userId: request.userId } },
          data: {
            status: ChatMemberStatus.active,
            joinedAt: occurredAt,
            leftAt: null,
          },
        })
        : await tx.chatMember.create({
          data: {
            id: `member_${randomUUID()}`,
            chatId: params.chatId,
            userId: request.userId,
            role: ChatMemberRole.member,
            status: ChatMemberStatus.active,
            joinedAt: occurredAt,
          },
        });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.reviewedByUserId,
        targetUserId: request.userId,
        action: 'approve_join_request',
        meta: { requestId: params.requestId },
        occurredAt,
      });

      await this.writeChatMemberAddedEvent(tx, {
        aggregateId: member.id,
        chatId: params.chatId,
        userId: request.userId,
        role: member.role,
        status: member.status,
        addedByUserId: params.reviewedByUserId,
        occurredAt,
        joinedAt: member.joinedAt ?? occurredAt,
      });

      return request;
    });
  }

  async declineJoinRequest(params: {
    requestId: string;
    reviewedByUserId: string;
    chatId: string;
  }) {
    const occurredAt = new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.prisma.$transaction(async (tx: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const request = await tx.joinRequest.update({
        where: { id: params.requestId },
        data: {
          status: 'declined',
          reviewedByUserId: params.reviewedByUserId,
          reviewedAt: occurredAt,
        },
      }) as { id: string; userId: string };

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.reviewedByUserId,
        targetUserId: request.userId,
        action: 'decline_join_request',
        meta: { requestId: params.requestId },
        occurredAt,
      });

      return request;
    });
  }

  // ── Moderation log ────────────────────────────────────────────────────────

  async getModerationLog(chatId: string, limit = 50): Promise<Array<{ id: string; chatId: string; performedByUserId: string; targetUserId: string | null; action: string; meta: unknown; createdAt: Date }>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return (this.prisma as any).moderationLog.findMany({
      where: { chatId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  private writeModerationLog(
    // NOTE: moderationLog/joinRequest are new Prisma models — tx will have them
    // typed correctly after `npx prisma generate` is run with the updated schema.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx: any,
    params: {
      chatId: string;
      performedByUserId: string;
      targetUserId?: string;
      action: string;
      meta: object | null;
      occurredAt: Date;
    },
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return tx.moderationLog.create({
      data: {
        id: `mlog_${randomUUID()}`,
        chatId: params.chatId,
        performedByUserId: params.performedByUserId,
        targetUserId: params.targetUserId ?? null,
        action: params.action,
        meta: params.meta ?? undefined,
        createdAt: params.occurredAt,
      },
    });
  }

  // ── Direct join (respects joinMode at service layer) ──────────────────────

  /**
   * Activates or creates a membership record for a direct chat join.
   * Caller is responsible for checking joinMode before calling this.
   */
  async joinChatDirect(chatId: string, userId: string) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.chatMember.findUnique({
        where: { chatId_userId: { chatId, userId } },
      });

      if (existing?.status === ChatMemberStatus.active) {
        return { joined: false, alreadyMember: true };
      }

      if (existing?.status === ChatMemberStatus.banned) {
        return { joined: false, banned: true };
      }

      const member = existing
        ? await tx.chatMember.update({
          where: { chatId_userId: { chatId, userId } },
          data: { status: ChatMemberStatus.active, joinedAt: occurredAt, leftAt: null },
        })
        : await tx.chatMember.create({
          data: {
            id: `member_${randomUUID()}`,
            chatId,
            userId,
            role: ChatMemberRole.member,
            status: ChatMemberStatus.active,
            joinedAt: occurredAt,
          },
        });

      await this.writeChatMemberAddedEvent(tx, {
        aggregateId: member.id,
        chatId,
        userId,
        role: member.role,
        status: member.status,
        addedByUserId: null,
        occurredAt,
        joinedAt: member.joinedAt ?? occurredAt,
      });

      return { joined: true, alreadyMember: false, banned: false };
    });
  }

  // ── Transfer ownership ────────────────────────────────────────────────────

  /**
   * Atomically transfers ownership:
   *  current owner → admin, target → owner.
   * Enforced by the partial unique index (one owner per chat).
   */
  async transferOwnership(params: {
    chatId: string;
    fromUserId: string;
    toUserId: string;
  }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      // Step down current owner to admin
      await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.fromUserId } },
        data: { role: ChatMemberRole.admin },
      });

      // Promote target to owner (must be an active member)
      await tx.chatMember.update({
        where: { chatId_userId: { chatId: params.chatId, userId: params.toUserId } },
        data: {
          role: ChatMemberRole.owner,
          adminPermissions: Prisma.JsonNull,  // owner has implicit full permissions
          promotedByUserId: null,
          promotedAt: null,
        },
      });

      await this.writeModerationLog(tx, {
        chatId: params.chatId,
        performedByUserId: params.fromUserId,
        targetUserId: params.toUserId,
        action: 'transfer_ownership',
        meta: { fromUserId: params.fromUserId },
        occurredAt,
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'chat.ownership.transferred',
        aggregateId: params.chatId,
        partitionKey: params.chatId,
        payloadJson: {
          chatId: params.chatId,
          fromUserId: params.fromUserId,
          toUserId: params.toUserId,
          transferredAt: occurredAt.toISOString(),
        },
        occurredAt,
      });
    });
  }

  // ── Restriction expiry ────────────────────────────────────────────────────

  /**
   * Clears all restriction overlays whose `restriction_until` has passed.
   * Called periodically by RestrictionExpiryWorker.
   * Returns the number of rows cleared.
   */
  async clearExpiredRestrictions(): Promise<number> {
    const result = await this.prisma.chatMember.updateMany({
      where: {
        restriction: { not: Prisma.JsonNull },
        restrictionUntil: { lt: new Date() },
      },
      data: {
        restriction: Prisma.JsonNull,
        restrictionUntil: null,
        restrictedByUserId: null,
        restrictedAt: null,
      },
    });

    return result.count;
  }
}
