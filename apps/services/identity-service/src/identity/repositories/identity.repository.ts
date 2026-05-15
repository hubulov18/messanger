import { Injectable } from '@nestjs/common';
import {
  AccountStatus,
  OtpPurpose,
  OutboxEventStatus,
  SessionClientType,
  type Session,
  type UserAccount,
} from '../../generated/prisma/client.js';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../../prisma/prisma.service.js';

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
export class IdentityRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsertOtpChallenge(params: {
    challengeId: string;
    phoneNumber: string;
    codeHash: string;
    expiresAt: Date;
  }) {
    return this.prisma.otpChallenge.upsert({
      where: { id: params.challengeId },
      update: {
        target: params.phoneNumber,
        purpose: OtpPurpose.register,
        codeHash: params.codeHash,
        expiresAt: params.expiresAt,
        attemptCount: 0,
        consumedAt: null,
      },
      create: {
        id: params.challengeId,
        target: params.phoneNumber,
        purpose: OtpPurpose.register,
        codeHash: params.codeHash,
        expiresAt: params.expiresAt,
      },
    });
  }

  findLatestActiveOtpChallenge(params: {
    phoneNumber: string;
    purpose?: OtpPurpose;
  }) {
    return this.prisma.otpChallenge.findFirst({
      where: {
        target: params.phoneNumber,
        purpose: params.purpose ?? OtpPurpose.register,
        consumedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOtpChallenge(challengeId: string) {
    return this.prisma.otpChallenge.findUnique({
      where: { id: challengeId },
    });
  }

  incrementOtpChallengeAttempts(challengeId: string) {
    return this.prisma.otpChallenge.update({
      where: { id: challengeId },
      data: {
        attemptCount: {
          increment: 1,
        },
      },
    });
  }

  findAccountByPhoneNumber(phoneNumber: string) {
    return this.prisma.userAccount.findUnique({
      where: { phoneNumber },
    });
  }

  findAccountsByPhoneNumberHashes(phoneNumberHashes: string[]) {
    return this.prisma.userAccount.findMany({
      where: {
        phoneNumberHash: {
          in: phoneNumberHashes,
        },
      },
      select: {
        id: true,
        phoneNumberHash: true,
      },
    });
  }

  listSessions(userAccountId: string): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: {
        userAccountId,
        revokedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getLatestSessionActivity(userAccountId: string): Promise<Date | null> {
    const session = await this.prisma.session.findFirst({
      where: {
        userAccountId,
        revokedAt: null,
      },
      orderBy: [{ lastSeenAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        createdAt: true,
        lastSeenAt: true,
      },
    });

    if (!session) {
      return null;
    }

    return session.lastSeenAt ?? session.createdAt;
  }

  async revokeSessionsExceptSelection(params: {
    userAccountId: string;
    keepSessionId?: string | null;
    currentDeviceId?: string | null;
    revokedAt: Date;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const sessions = await tx.session.findMany({
        where: {
          userAccountId: params.userAccountId,
          revokedAt: null,
          ...(params.keepSessionId ? { id: { not: params.keepSessionId } } : {}),
          ...(!params.keepSessionId && params.currentDeviceId ? { deviceId: { not: params.currentDeviceId } } : {}),
        },
        include: {
          userAccount: true,
        },
      });

      if (sessions.length === 0) {
        return [];
      }

      await tx.session.updateMany({
        where: {
          id: {
            in: sessions.map((session) => session.id),
          },
        },
        data: {
          revokedAt: params.revokedAt,
        },
      });

      for (const session of sessions) {
        await this.writeOutboxEvent(tx, {
          eventType: 'identity.session.revoked',
          aggregateId: session.id,
          partitionKey: session.userAccountId,
          payloadJson: {
            userId: session.userAccountId,
            sessionId: session.id,
            revokedAt: params.revokedAt.toISOString(),
            reason: 'revoke_other_sessions',
          },
          occurredAt: params.revokedAt,
        });
      }

      return sessions;
    });
  }

  findSessionByRefreshTokenHash(refreshTokenHash: string) {
    return this.prisma.session.findUnique({
      where: { refreshTokenHash },
      include: { userAccount: true },
    });
  }

  findSessionById(sessionId: string) {
    return this.prisma.session.findUnique({
      where: { id: sessionId },
    });
  }

  async completeOtpAuthentication(params: {
    challengeId: string;
    phoneNumber: string;
    phoneNumberHash: string;
    existingAccount: UserAccount | null;
    deviceId: string;
    clientType: SessionClientType;
    refreshTokenHash: string;
    verifiedAt: Date;
  }): Promise<{ userId: string; isNewUser: boolean; session: Session }> {
    return this.prisma.$transaction(async (tx) => {
      let account = params.existingAccount;
      let isNewUser = false;

      if (!account) {
        account = await tx.userAccount.create({
          data: {
            id: `user_${randomUUID()}`,
            phoneNumber: params.phoneNumber,
            phoneNumberHash: params.phoneNumberHash,
            status: AccountStatus.active,
            verifiedAt: params.verifiedAt,
          },
        });
        isNewUser = true;
      } else {
        account = await tx.userAccount.update({
          where: { id: account.id },
          data: {
            phoneNumber: params.phoneNumber,
            phoneNumberHash: params.phoneNumberHash,
            status: AccountStatus.active,
            verifiedAt: params.verifiedAt,
          },
        });
      }

      const session = await tx.session.create({
        data: {
          id: `sess_${randomUUID()}`,
          userAccountId: account.id,
          deviceId: params.deviceId,
          clientType: params.clientType,
          refreshTokenHash: params.refreshTokenHash,
          lastSeenAt: params.verifiedAt,
        },
      });

      await tx.otpChallenge.update({
        where: { id: params.challengeId },
        data: { consumedAt: params.verifiedAt },
      });

      if (isNewUser) {
        await this.writeOutboxEvent(tx, {
          eventType: 'identity.user.registered',
          aggregateId: account.id,
          partitionKey: account.id,
          payloadJson: {
            userId: account.id,
            phoneNumber: account.phoneNumber,
            registeredAt: params.verifiedAt.toISOString(),
            isNewUser: true,
          },
          occurredAt: params.verifiedAt,
        });
      }

      await this.writeOutboxEvent(tx, {
        eventType: 'identity.user.authenticated',
        aggregateId: session.id,
        partitionKey: account.id,
        payloadJson: {
          userId: account.id,
          sessionId: session.id,
          deviceId: session.deviceId,
          clientType: session.clientType,
          authenticatedAt: params.verifiedAt.toISOString(),
        },
        occurredAt: params.verifiedAt,
      });

      return {
        userId: account.id,
        isNewUser,
        session,
      };
    });
  }

  async rotateSessionRefreshToken(params: {
    sessionId: string;
    refreshTokenHash: string;
    lastSeenAt: Date;
  }): Promise<Session> {
    return this.prisma.session.update({
      where: { id: params.sessionId },
      data: {
        refreshTokenHash: params.refreshTokenHash,
        lastSeenAt: params.lastSeenAt,
      },
    });
  }

  async revokeSession(sessionId: string, revokedAt: Date) {
    return this.prisma.$transaction(async (tx) => {
      const session = await tx.session.update({
        where: { id: sessionId },
        data: { revokedAt },
        include: {
          userAccount: true,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'identity.session.revoked',
        aggregateId: session.id,
        partitionKey: session.userAccountId,
        payloadJson: {
          userId: session.userAccountId,
          sessionId: session.id,
          revokedAt: revokedAt.toISOString(),
          reason: 'user_logout',
        },
        occurredAt: revokedAt,
      });

      return session;
    });
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
