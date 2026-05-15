import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

import { CallParticipantRole, CallParticipantState, CallState, OutboxEventStatus } from '../../generated/prisma/client.js';

type CallType = 'audio' | 'video';
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

const NON_TERMINAL_STATES = [CallState.initiated, CallState.ringing, CallState.accepted, CallState.active];
const SETUP_STATES: CallState[] = [CallState.initiated, CallState.ringing, CallState.accepted];
const TERMINAL_STATES: CallState[] = [
  CallState.ended,
  CallState.declined,
  CallState.missed,
  CallState.canceled,
  CallState.failed,
];
@Injectable()
export class CallRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  findCallById(callId: string) {
    return this.prisma.callSession.findUnique({
      where: { id: callId },
      include: {
        participants: true,
      },
    });
  }

  async createOutgoingCall(params: { chatId: string; initiatorUserId: string; receiverUserId: string; callType?: CallType }) {
    const occurredAt = new Date();
    const staleSetupCutoff = new Date(occurredAt.getTime() - this.getStaleSetupTimeoutMs());
    const staleActiveCutoff = new Date(occurredAt.getTime() - this.getStaleActiveTimeoutMs());

    return this.prisma.$transaction(async (tx) => {
      const conflicts = await tx.callSession.findMany({
        where: {
          state: {
            in: NON_TERMINAL_STATES,
          },
          OR: [
            { chatId: params.chatId },
            { initiatorUserId: params.initiatorUserId },
            { receiverUserId: params.initiatorUserId },
            { initiatorUserId: params.receiverUserId },
            { receiverUserId: params.receiverUserId },
          ],
        },
        select: {
          id: true,
          chatId: true,
          initiatorUserId: true,
          receiverUserId: true,
          state: true,
          startedAt: true,
          ringingAt: true,
          acceptedAt: true,
          activeAt: true,
          updatedAt: true,
        },
      });

      const staleConflicts = conflicts.filter((candidate) =>
        this.isStaleConflict(candidate, staleSetupCutoff, staleActiveCutoff),
      );

      if (staleConflicts.length > 0) {
        await this.closeStaleConflicts(tx, staleConflicts, occurredAt);
      }

      const blockingConflict = conflicts.find(
        (candidate) => !staleConflicts.some((staleConflict) => staleConflict.id === candidate.id),
      );

      if (blockingConflict) {
        throw new ConflictException({
          message: 'Another call is already active for this chat or participant',
          details: {
            code: 'CALL_CONFLICT',
            callId: blockingConflict.id,
          },
        });
      }

      const call = await tx.callSession.create({
        data: {
          id: `call_${randomUUID()}`,
          chatId: params.chatId,
          initiatorUserId: params.initiatorUserId,
          receiverUserId: params.receiverUserId,
          callType: (params.callType ?? 'audio') as never,
          state: CallState.ringing,
          startedAt: occurredAt,
          ringingAt: occurredAt,
          participants: {
            create: [
              {
                id: `callp_${randomUUID()}`,
                userId: params.initiatorUserId,
                role: CallParticipantRole.caller,
                state: CallParticipantState.joined,
                joinedAt: occurredAt,
              },
              {
                id: `callp_${randomUUID()}`,
                userId: params.receiverUserId,
                role: CallParticipantRole.callee,
                state: CallParticipantState.ringing,
              },
            ],
          },
        },
        include: {
          participants: true,
        },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'call.session.created',
        aggregateId: call.id,
        partitionKey: call.id,
        payloadJson: {
          callId: call.id,
          chatId: call.chatId,
          initiatorUserId: call.initiatorUserId,
          receiverUserId: call.receiverUserId,
          state: call.state,
          startedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'call.participant.ringing',
        aggregateId: call.id,
        partitionKey: call.id,
        payloadJson: {
          callId: call.id,
          userId: call.receiverUserId,
          role: 'callee',
          state: 'ringing',
          occurredAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return call;
    });
  }

  async findStaleCalls(limit: number) {
    const now = new Date();
    const setupCutoff = new Date(now.getTime() - this.getStaleSetupTimeoutMs());
    const activeCutoff = new Date(now.getTime() - this.getStaleActiveTimeoutMs());

    return this.prisma.callSession.findMany({
      where: {
        OR: [
          {
            state: CallState.initiated,
            startedAt: { lt: setupCutoff },
          },
          {
            state: CallState.ringing,
            OR: [
              { ringingAt: { lt: setupCutoff } },
              {
                ringingAt: null,
                startedAt: { lt: setupCutoff },
              },
            ],
          },
          {
            state: CallState.accepted,
            updatedAt: { lt: setupCutoff },
          },
          {
            state: CallState.active,
            updatedAt: { lt: activeCutoff },
          },
        ],
      },
      include: {
        participants: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
      take: limit,
    });
  }

  private isStaleConflict(
    call: {
      id: string;
      chatId: string;
      initiatorUserId: string;
      receiverUserId: string;
      state: CallState;
      startedAt: Date;
      ringingAt: Date | null;
      acceptedAt: Date | null;
      activeAt: Date | null;
      updatedAt: Date;
    },
    setupCutoff: Date,
    activeCutoff: Date,
  ) {
    if (SETUP_STATES.includes(call.state)) {
      const baseline = call.acceptedAt ?? call.ringingAt ?? call.startedAt;
      return baseline < setupCutoff;
    }

    if (call.state === CallState.active) {
      const baseline = call.updatedAt ?? call.activeAt ?? call.acceptedAt ?? call.ringingAt ?? call.startedAt;
      return baseline < activeCutoff;
    }

    return false;
  }

  private getStaleSetupTimeoutMs() {
    return this.configService.get<number>('cleanup.staleSetupTimeoutMs') ?? 2 * 60 * 1000;
  }

  private getStaleActiveTimeoutMs() {
    return this.configService.get<number>('cleanup.staleActiveTimeoutMs') ?? 10 * 60 * 1000;
  }

  private async closeStaleConflicts(
    writer: OutboxWriter & {
      callSession: {
        update: (args: {
          where: { id: string };
          data: {
            state: CallState;
            endedAt: Date;
            endReason: string;
          };
        }) => Promise<unknown>;
      };
      callParticipant: {
        updateMany: (args: {
          where: {
            callId: string;
            state: {
              in: CallParticipantState[];
            };
          };
          data: {
            state: CallParticipantState;
            leftAt: Date;
          };
        }) => Promise<unknown>;
      };
    },
    calls: Array<{
      id: string;
      chatId: string;
      initiatorUserId: string;
      receiverUserId: string;
      state: CallState;
      startedAt: Date;
      ringingAt: Date | null;
      acceptedAt: Date | null;
      activeAt: Date | null;
      updatedAt: Date;
    }>,
    occurredAt: Date,
  ) {
    for (const call of calls) {
      await writer.callSession.update({
        where: { id: call.id },
        data: {
          state: CallState.failed,
          endedAt: occurredAt,
          endReason: 'stale_conflict_cleanup',
        },
      });

      await writer.callParticipant.updateMany({
        where: {
          callId: call.id,
          state: {
            in: [
              CallParticipantState.ringing,
              CallParticipantState.joined,
              CallParticipantState.accepted,
              CallParticipantState.active,
            ],
          },
        },
        data: {
          state: CallParticipantState.failed,
          leftAt: occurredAt,
        },
      });

      await this.writeOutboxEvent(writer, {
        eventType: 'call.session.ended',
        aggregateId: call.id,
        partitionKey: call.id,
        payloadJson: {
          callId: call.id,
          chatId: call.chatId,
          initiatorUserId: call.initiatorUserId,
          receiverUserId: call.receiverUserId,
          endedByUserId: null,
          outcome: CallState.failed,
          durationSec: this.computeDurationSec(call, occurredAt),
          endedAt: occurredAt.toISOString(),
          reason: 'stale_conflict_cleanup',
        },
        occurredAt,
      });
    }
  }

  async acceptCall(callId: string, userId: string) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.callSession.findUnique({
        where: { id: callId },
        include: { participants: true },
      });

      if (!existing) {
        return null;
      }

      if (existing.state !== CallState.ringing || existing.receiverUserId !== userId) {
        return existing;
      }

      const call = await tx.callSession.update({
        where: { id: callId },
        data: {
          state: CallState.accepted,
          acceptedAt: occurredAt,
          participants: {
            updateMany: {
              where: { userId },
              data: {
                state: CallParticipantState.accepted,
                joinedAt: occurredAt,
              },
            },
          },
        },
        include: { participants: true },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'call.participant.accepted',
        aggregateId: call.id,
        partitionKey: call.id,
        payloadJson: {
          callId: call.id,
          userId,
          role: 'callee',
          acceptedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return call;
    });
  }

  async markActive(callId: string) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.callSession.findUnique({
        where: { id: callId },
        include: { participants: true },
      });

      if (!existing) {
        return null;
      }

      if (existing.state === CallState.active) {
        return existing;
      }

      if (existing.state !== CallState.accepted) {
        return existing;
      }

      const call = await tx.callSession.update({
        where: { id: callId },
        data: {
          state: CallState.active,
          activeAt: occurredAt,
          participants: {
            updateMany: {
              where: {
                state: {
                  in: [CallParticipantState.joined, CallParticipantState.accepted],
                },
              },
              data: {
                state: CallParticipantState.active,
              },
            },
          },
        },
        include: { participants: true },
      });

      await this.writeOutboxEvent(tx, {
        eventType: 'call.session.active',
        aggregateId: call.id,
        partitionKey: call.id,
        payloadJson: {
          callId: call.id,
          chatId: call.chatId,
          activeAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return call;
    });
  }

  async touchCallActivity(callId: string) {
    await this.prisma.callSession.updateMany({
      where: {
        id: callId,
        state: {
          in: [CallState.accepted, CallState.active],
        },
      },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  async transitionToTerminalState(params: { callId: string; state: CallState; endedByUserId: string | null }) {
    const occurredAt = new Date();

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.callSession.findUnique({
        where: { id: params.callId },
        include: { participants: true },
      });

      if (!existing) {
        return null;
      }

      if (TERMINAL_STATES.includes(existing.state)) {
        return existing;
      }

      const participantState =
        params.state === CallState.declined
          ? CallParticipantState.declined
          : params.state === CallState.missed
            ? CallParticipantState.missed
            : params.state === CallState.failed
              ? CallParticipantState.failed
              : CallParticipantState.ended;

      const call = await tx.callSession.update({
        where: { id: params.callId },
        data: {
          state: params.state,
          endedAt: occurredAt,
          endReason: params.state,
          participants: {
            updateMany: {
              where: {
                state: {
                  in: [
                    CallParticipantState.ringing,
                    CallParticipantState.joined,
                    CallParticipantState.accepted,
                    CallParticipantState.active,
                  ],
                },
              },
              data: {
                state: participantState,
                leftAt: occurredAt,
              },
            },
          },
        },
        include: { participants: true },
      });

      await this.writeOutboxEvent(tx, {
        eventType: params.state === CallState.missed ? 'call.session.missed' : 'call.session.ended',
        aggregateId: call.id,
        partitionKey: call.id,
        payloadJson: {
          callId: call.id,
          chatId: call.chatId,
          initiatorUserId: call.initiatorUserId,
          receiverUserId: call.receiverUserId,
          endedByUserId: params.endedByUserId,
          outcome: params.state,
          durationSec: this.computeDurationSec(call, occurredAt),
          endedAt: occurredAt.toISOString(),
        },
        occurredAt,
      });

      return call;
    });
  }

  async setTimelineMessageId(callId: string, messageId: string) {
    await this.prisma.callSession.update({
      where: { id: callId },
      data: {
        timelineMessageId: messageId,
      },
    });
  }

  private computeDurationSec(
    call: {
      activeAt: Date | null;
      acceptedAt: Date | null;
      startedAt: Date;
    },
    endedAt: Date,
  ) {
    const baseline = call.activeAt ?? call.acceptedAt ?? call.startedAt;
    return Math.max(0, Math.round((endedAt.getTime() - baseline.getTime()) / 1000));
  }

  private async writeOutboxEvent(
    writer: OutboxWriter,
    params: {
      eventType: string;
      aggregateId: string;
      partitionKey: string;
      payloadJson: object;
      occurredAt: Date;
    },
  ) {
    await writer.outboxEvent.create({
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
