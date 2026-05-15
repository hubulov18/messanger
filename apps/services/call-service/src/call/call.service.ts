import { ConflictException, ForbiddenException, Injectable, Logger, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'node:crypto';

import type { CurrentUser } from '../auth/current-user.type.js';
import { ChatServiceClient } from '../chat-client/chat-service.client.js';
import { CallState } from '../generated/prisma/client.js';
import { MessageServiceClient } from '../message-client/message-service.client.js';
import { NotificationServiceClient } from '../notification-client/notification-service.client.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { CallSignalsService } from '../signaling/call-signals.service.js';
import { SignalingStateService } from '../signaling/signaling-state.service.js';
import { StartCallDto } from './dto/start-call.dto.js';
import { CallRepository } from './repositories/call.repository.js';

const TERMINAL_CALL_STATES: CallState[] = [
  CallState.ended,
  CallState.declined,
  CallState.missed,
  CallState.canceled,
  CallState.failed,
];

const JOINABLE_CALL_STATES: CallState[] = [CallState.accepted, CallState.active, CallState.ringing];

@Injectable()
export class CallService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CallService.name);
  private readonly ringTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
  private readonly disconnectCleanupTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private staleCleanupTimer: ReturnType<typeof setInterval> | null = null;
  private staleCleanupInFlight = false;

  constructor(
    private readonly callRepository: CallRepository,
    private readonly chatServiceClient: ChatServiceClient,
    private readonly profileServiceClient: ProfileServiceClient,
    private readonly messageServiceClient: MessageServiceClient,
    private readonly notificationServiceClient: NotificationServiceClient,
    private readonly signalingStateService: SignalingStateService,
    private readonly callSignalsService: CallSignalsService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    if (!this.isCallsEnabled()) {
      return;
    }

    const intervalMs = this.configService.get<number>('cleanup.intervalMs') ?? 30000;
    this.staleCleanupTimer = setInterval(() => {
      void this.cleanupStaleCalls();
    }, intervalMs);
    this.staleCleanupTimer.unref?.();

    void this.cleanupStaleCalls();
  }

  onModuleDestroy() {
    if (this.staleCleanupTimer) {
      clearInterval(this.staleCleanupTimer);
      this.staleCleanupTimer = null;
    }

    for (const timer of this.ringTimeouts.values()) {
      clearTimeout(timer);
    }
    this.ringTimeouts.clear();

    for (const timer of this.disconnectCleanupTimers.values()) {
      clearTimeout(timer);
    }
    this.disconnectCleanupTimers.clear();
  }

  async startCall(currentUser: CurrentUser, body: StartCallDto) {
    this.assertCallsEnabled();
    this.logCallLifecycle('start_call_requested', {
      userId: currentUser.userId,
      chatId: body.chatId,
      callType: body.callType,
    });

    const chatAccess = await this.chatServiceClient.assertDirectChatAccess(body.chatId, currentUser.userId);
    const receiverUserId = chatAccess.peerUserId;

    if (!receiverUserId || receiverUserId === currentUser.userId) {
      throw new ForbiddenException('Unable to resolve the call recipient');
    }

    const [, callerProfile] = await Promise.all([
      this.profileServiceClient.assertUsersCanCall(currentUser.userId, receiverUserId),
      this.resolveCallerProfile(currentUser.userId),
    ]);

    const call = await this.callRepository.createOutgoingCall({
      chatId: body.chatId,
      initiatorUserId: currentUser.userId,
      receiverUserId,
      callType: (body.callType === 'video' ? 'video' : 'audio') as 'audio' | 'video',
    });

    const {
      token: signalingToken,
      sessionId: signalingSessionId,
      negotiationVersion,
    } = await this.signalingStateService.issueSignalingToken(
      {
        callId: call.id,
        userId: currentUser.userId,
      },
      {
        bumpNegotiationVersion: false,
      },
    );

    this.scheduleMissedTimeout(call.id);

    this.callSignalsService.emitToUser(receiverUserId, 'call.ringing', {
      callId: call.id,
      chatId: call.chatId,
      callType: call.callType,
      initiatorUserId: call.initiatorUserId,
      receiverUserId: call.receiverUserId,
      callerDisplayName: callerProfile.displayName,
      callerUsername: callerProfile.username,
      startedAt: call.startedAt.toISOString(),
      state: call.state,
    });
    void this.notificationServiceClient.queueIncomingCall({
      callId: call.id,
      chatId: call.chatId,
      targetUserId: receiverUserId,
      callerUserId: currentUser.userId,
      callerDisplayName: callerProfile.displayName,
      ...(callerProfile.username ? { callerUsername: callerProfile.username } : {}),
      callType: call.callType as 'audio' | 'video',
      startedAt: call.startedAt.toISOString(),
      ringTimeoutMs: this.configService.get<number>('signaling.ringTimeoutMs') ?? 30000,
    });

    this.logCallLifecycle('start_call_created', {
      callId: call.id,
      chatId: call.chatId,
      initiatorUserId: call.initiatorUserId,
      receiverUserId,
      callType: call.callType,
      signalingSessionId,
      negotiationVersion,
    });

    return this.toCallBootstrapResponse(call, currentUser.userId, signalingToken, signalingSessionId, negotiationVersion);
  }

  async getCall(currentUser: CurrentUser, callId: string) {
    this.assertCallsEnabled();

    const call = await this.callRepository.findCallById(callId);
    const authorized = this.assertParticipantAccess(call, currentUser.userId);

    return this.toCallDetailResponse(authorized, currentUser.userId);
  }

  async acceptCall(currentUser: CurrentUser, callId: string) {
    this.assertCallsEnabled();
    this.logCallLifecycle('accept_call_requested', {
      callId,
      userId: currentUser.userId,
    });

    const existing = await this.callRepository.findCallById(callId);
    const authorized = this.assertParticipantAccess(existing, currentUser.userId);

    if (authorized.receiverUserId !== currentUser.userId) {
      throw new ForbiddenException('Only the callee can accept the call');
    }

    if (authorized.state === CallState.accepted || authorized.state === CallState.active) {
      const {
        token: signalingToken,
        sessionId: signalingSessionId,
        negotiationVersion,
      } = await this.signalingStateService.issueSignalingToken(
        {
          callId: authorized.id,
          userId: currentUser.userId,
        },
        {
          bumpNegotiationVersion: false,
        },
      );

      return this.toCallBootstrapResponse(authorized, currentUser.userId, signalingToken, signalingSessionId, negotiationVersion);
    }

    if (authorized.state !== CallState.ringing) {
      throw new ConflictException({
        message: 'Call is no longer available for acceptance',
        details: { code: 'CALL_INVALID_STATE', state: authorized.state },
      });
    }

    const updated = await this.callRepository.acceptCall(callId, currentUser.userId);
    const accepted = this.assertParticipantAccess(updated, currentUser.userId);
    const {
      token: signalingToken,
      sessionId: signalingSessionId,
      negotiationVersion,
    } = await this.signalingStateService.issueSignalingToken(
      {
        callId: accepted.id,
        userId: currentUser.userId,
      },
      {
        bumpNegotiationVersion: false,
      },
    );

    this.clearMissedTimeout(accepted.id);
    this.callSignalsService.emitToUser(accepted.initiatorUserId, 'call.accepted', {
      callId: accepted.id,
      chatId: accepted.chatId,
      acceptedAt: accepted.acceptedAt?.toISOString() ?? null,
      state: accepted.state,
    });
    this.logCallLifecycle('accept_call_completed', {
      callId: accepted.id,
      initiatorUserId: accepted.initiatorUserId,
      receiverUserId: accepted.receiverUserId,
      signalingSessionId,
      negotiationVersion,
    });

    return this.toCallBootstrapResponse(accepted, currentUser.userId, signalingToken, signalingSessionId, negotiationVersion);
  }

  async declineCall(currentUser: CurrentUser, callId: string) {
    this.assertCallsEnabled();

    const existing = await this.callRepository.findCallById(callId);
    const authorized = this.assertParticipantAccess(existing, currentUser.userId);

    if (authorized.state !== CallState.ringing) {
      throw new ConflictException({
        message: 'Call is no longer available for decline',
        details: { code: 'CALL_INVALID_STATE', state: authorized.state },
      });
    }

    const updated = await this.callRepository.transitionToTerminalState({
      callId,
      state: CallState.declined,
      endedByUserId: currentUser.userId,
    });
    const declined = this.assertParticipantAccess(updated, currentUser.userId);

    this.clearMissedTimeout(callId);
    await this.publishTerminalEffects(declined, 'declined', currentUser.userId);

    return {
      success: true,
      callId: declined.id,
      state: declined.state,
    };
  }

  async endCall(currentUser: CurrentUser, callId: string) {
    this.assertCallsEnabled();
    this.logCallLifecycle('end_call_requested', {
      callId,
      userId: currentUser.userId,
    });

    const existing = await this.callRepository.findCallById(callId);
    const authorized = this.assertParticipantAccess(existing, currentUser.userId);

    const targetState =
      authorized.state === CallState.ringing && authorized.initiatorUserId === currentUser.userId
        ? CallState.canceled
        : CallState.ended;

    if (TERMINAL_CALL_STATES.includes(authorized.state)) {
      return {
        success: true,
        callId: authorized.id,
        state: authorized.state,
      };
    }

    const updated = await this.callRepository.transitionToTerminalState({
      callId,
      state: targetState,
      endedByUserId: currentUser.userId,
    });
    const ended = this.assertParticipantAccess(updated, currentUser.userId);

    this.clearMissedTimeout(callId);
    await this.publishTerminalEffects(ended, targetState === CallState.canceled ? 'canceled' : 'completed', currentUser.userId);
    this.logCallLifecycle('end_call_completed', {
      callId: ended.id,
      userId: currentUser.userId,
      state: ended.state,
    });

    return {
      success: true,
      callId: ended.id,
      state: ended.state,
    };
  }

  async rejoinCall(currentUser: CurrentUser, callId: string, options?: { restartMedia?: boolean }) {
    this.assertCallsEnabled();
    this.logCallLifecycle('rejoin_call_requested', {
      callId,
      userId: currentUser.userId,
      restartMedia: options?.restartMedia === true,
    });

    const call = await this.callRepository.findCallById(callId);
    const authorized = this.assertParticipantAccess(call, currentUser.userId);

    if (!JOINABLE_CALL_STATES.includes(authorized.state)) {
      throw new ConflictException({
        message: 'Call is no longer joinable',
        details: { code: 'CALL_ALREADY_ENDED', state: authorized.state },
      });
    }

    const {
      token: signalingToken,
      sessionId: signalingSessionId,
      negotiationVersion,
    } = await this.signalingStateService.issueSignalingToken(
      {
        callId: authorized.id,
        userId: currentUser.userId,
      },
      {
        bumpNegotiationVersion: options?.restartMedia === true,
      },
    );

    this.logCallLifecycle('rejoin_call_issued', {
      callId: authorized.id,
      userId: currentUser.userId,
      restartMedia: options?.restartMedia === true,
      signalingSessionId,
      negotiationVersion,
      state: authorized.state,
    });

    return this.toCallBootstrapResponse(authorized, currentUser.userId, signalingToken, signalingSessionId, negotiationVersion);
  }

  async canJoinSignalingSession(callId: string, userId: string) {
    if (!this.isCallsEnabled()) {
      return false;
    }

    const call = await this.callRepository.findCallById(callId);
    const authorized = this.assertParticipantAccess(call, userId);

    return JOINABLE_CALL_STATES.includes(authorized.state);
  }

  async markCallActiveFromSignaling(callId: string) {
    if (!this.isCallsEnabled()) {
      return;
    }

    const call = await this.callRepository.markActive(callId);
    if (!call || call.state !== CallState.active) {
      return;
    }

    this.logCallLifecycle('call_marked_active_from_signaling', {
      callId: call.id,
      initiatorUserId: call.initiatorUserId,
      receiverUserId: call.receiverUserId,
      activeAt: call.activeAt?.toISOString() ?? null,
    });

    this.callSignalsService.emitToCall(call.id, 'call.active', {
      callId: call.id,
      activeAt: call.activeAt?.toISOString() ?? null,
      state: call.state,
    });
  }

  async recordHeartbeatFromSignaling(callId: string, userId: string) {
    if (!this.isCallsEnabled()) {
      return;
    }

    const call = await this.callRepository.findCallById(callId);
    const authorized = this.assertParticipantAccess(call, userId);

    if (authorized.state !== CallState.accepted && authorized.state !== CallState.active) {
      return;
    }

    this.cancelDisconnectCleanup(callId);
    await this.callRepository.touchCallActivity(callId);
    this.logCallLifecycle('signaling_heartbeat_recorded', {
      callId,
      userId,
      state: authorized.state,
    });
  }

  noteSignalingActivity(callId: string) {
    if (!this.isCallsEnabled()) {
      return;
    }

    this.cancelDisconnectCleanup(callId);
  }

  async scheduleDisconnectCleanup(callId: string) {
    if (!this.isCallsEnabled()) {
      return;
    }

    this.cancelDisconnectCleanup(callId);

    const graceMs = this.configService.get<number>('cleanup.disconnectGraceMs') ?? 45000;
    this.logCallLifecycle('disconnect_cleanup_scheduled', {
      callId,
      graceMs,
    });
    const timer = setTimeout(() => {
      void this.cleanupDisconnectedCall(callId);
    }, graceMs);
    timer.unref?.();
    this.disconnectCleanupTimers.set(callId, timer);
  }

  private assertParticipantAccess<T extends {
    id: string;
    initiatorUserId: string;
    receiverUserId: string;
    state: CallState;
    chatId: string;
    participants: Array<{ userId: string; role: string; state: string }>;
    startedAt: Date;
    acceptedAt: Date | null;
    activeAt: Date | null;
    endedAt: Date | null;
    timelineMessageId: string | null;
  } | null>(call: T, userId: string) {
    if (!call) {
      throw new NotFoundException('Call not found');
    }

    if (call.initiatorUserId !== userId && call.receiverUserId !== userId) {
      throw new NotFoundException('Call not found');
    }

    return call;
  }

  private cancelDisconnectCleanup(callId: string) {
    const timer = this.disconnectCleanupTimers.get(callId);
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    this.disconnectCleanupTimers.delete(callId);
  }

  private async cleanupDisconnectedCall(callId: string) {
    this.disconnectCleanupTimers.delete(callId);

    try {
      const call = await this.callRepository.findCallById(callId);
      if (!call || TERMINAL_CALL_STATES.includes(call.state)) {
        return;
      }

      if (call.state !== CallState.accepted && call.state !== CallState.active) {
        return;
      }

      const [initiatorConnections, receiverConnections, initiatorHeartbeat, receiverHeartbeat] = await Promise.all([
        this.signalingStateService.getConnectionCount(call.initiatorUserId),
        this.signalingStateService.getConnectionCount(call.receiverUserId),
        this.signalingStateService.getLastHeartbeat(call.id, call.initiatorUserId),
        this.signalingStateService.getLastHeartbeat(call.id, call.receiverUserId),
      ]);

      if (initiatorConnections > 0 || receiverConnections > 0) {
        return;
      }

      const graceMs = this.configService.get<number>('cleanup.disconnectGraceMs') ?? 45000;
      const cutoff = Date.now() - graceMs;
      if ((initiatorHeartbeat ?? 0) >= cutoff || (receiverHeartbeat ?? 0) >= cutoff) {
        return;
      }

      const updated = await this.callRepository.transitionToTerminalState({
        callId,
        state: CallState.failed,
        endedByUserId: null,
      });

      if (!updated || updated.state !== CallState.failed) {
        return;
      }

      this.clearMissedTimeout(callId);
      await this.publishTerminalEffects(updated, 'failed', null);
      this.logCallLifecycle('disconnect_cleanup_completed', {
        callId,
        state: updated.state,
        initiatorConnections,
        receiverConnections,
        initiatorHeartbeat,
        receiverHeartbeat,
      });
      this.logger.warn(`Cleaned disconnected call ${callId} after signaling grace timeout`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown disconnected cleanup error';
      this.logger.error(`Failed to clean disconnected call ${callId}: ${message}`);
    }
  }

  private toCallBootstrapResponse(
    call: {
      id: string;
      chatId: string;
      callType: string;
      initiatorUserId: string;
      receiverUserId: string;
      state: CallState;
      participants: Array<{ userId: string; role: string; state: string }>;
      startedAt: Date;
      acceptedAt: Date | null;
      activeAt: Date | null;
      endedAt: Date | null;
    },
    userId: string,
    signalingToken: string,
    signalingSessionId: string,
    negotiationVersion: number,
  ) {
    const role = call.initiatorUserId === userId ? 'caller' : 'callee';

    return {
      callId: call.id,
      chatId: call.chatId,
      callType: call.callType as 'audio' | 'video',
      state: call.state,
      role,
      counterpartUserId: call.initiatorUserId === userId ? call.receiverUserId : call.initiatorUserId,
      signalingUrl: this.configService.get<string>('signaling.publicUrl') ?? 'http://localhost:3007/calls',
      signalingToken,
      signalingSessionId,
      negotiationVersion,
      iceServers: this.buildIceServers(userId),
      participants: call.participants.map((participant) => ({
        userId: participant.userId,
        role: participant.role,
        state: participant.state,
      })),
      startedAt: call.startedAt.toISOString(),
      acceptedAt: call.acceptedAt?.toISOString() ?? null,
      activeAt: call.activeAt?.toISOString() ?? null,
      endedAt: call.endedAt?.toISOString() ?? null,
    };
  }

  private toCallDetailResponse(
    call: {
      id: string;
      chatId: string;
      callType: string;
      initiatorUserId: string;
      receiverUserId: string;
      state: CallState;
      participants: Array<{ userId: string; role: string; state: string }>;
      startedAt: Date;
      acceptedAt: Date | null;
      activeAt: Date | null;
      endedAt: Date | null;
    },
    userId: string,
  ) {
    return {
      callId: call.id,
      chatId: call.chatId,
      callType: call.callType as 'audio' | 'video',
      state: call.state,
      counterpartUserId: call.initiatorUserId === userId ? call.receiverUserId : call.initiatorUserId,
      participants: call.participants.map((participant) => ({
        userId: participant.userId,
        role: participant.role,
        state: participant.state,
      })),
      startedAt: call.startedAt.toISOString(),
      acceptedAt: call.acceptedAt?.toISOString() ?? null,
      activeAt: call.activeAt?.toISOString() ?? null,
      endedAt: call.endedAt?.toISOString() ?? null,
    };
  }

  private buildIceServers(userId: string) {
    const stunUrl = this.configService.get<string>('turn.stunUrl') ?? 'stun:localhost:3478';
    const turnUrl = this.configService.get<string>('turn.turnUrl') ?? '';
    const sharedSecret = this.configService.get<string>('turn.sharedSecret') ?? '';
    const credentialTtlSeconds = this.configService.get<number>('turn.credentialTtlSeconds') ?? 3600;

    const iceServers: Array<Record<string, unknown>> = [{ urls: [stunUrl] }];

    if (turnUrl && sharedSecret) {
      const expiresAt = Math.floor(Date.now() / 1000) + credentialTtlSeconds;
      const username = `${expiresAt}:${userId}`;
      const credential = createHmac('sha1', sharedSecret).update(username).digest('base64');
      const turnUrls = Array.from(new Set([
        ...turnUrl
          .split(',')
          .map((url) => url.trim())
          .filter(Boolean),
        ...deriveTurnFallbackUrls(turnUrl),
      ]));

      for (const url of turnUrls) {
        iceServers.push({
          urls: [url],
          username,
          credential,
        });
      }
    }

    return iceServers;
  }

  private scheduleMissedTimeout(callId: string) {
    this.clearMissedTimeout(callId);

    const timeoutMs = this.configService.get<number>('signaling.ringTimeoutMs') ?? 30000;
    const timer = setTimeout(() => {
      void this.handleMissedCall(callId);
    }, timeoutMs);

    this.ringTimeouts.set(callId, timer);
  }

  private clearMissedTimeout(callId: string) {
    const timer = this.ringTimeouts.get(callId);
    if (!timer) {
      return;
    }

    clearTimeout(timer);
    this.ringTimeouts.delete(callId);
  }

  private isCallsEnabled() {
    return this.configService.get<boolean>('features.callsV1Enabled') ?? false;
  }

  private assertCallsEnabled() {
    if (!this.isCallsEnabled()) {
      throw new NotFoundException('Calls feature is disabled');
    }
  }

  private async resolveCallerProfile(userId: string) {
    try {
      const profiles = await this.profileServiceClient.getProfilesByUserIds([userId]);
      const profile = profiles[0];

      if (profile) {
        return {
          username: profile.username,
          displayName: profile.displayName,
        };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown profile lookup error';
      this.logger.warn(`Unable to resolve caller profile ${userId}: ${message}`);
    }

    return {
      username: '',
      displayName: userId,
    };
  }

  private async handleMissedCall(callId: string) {
    try {
      const call = await this.callRepository.findCallById(callId);
      if (!call || call.state !== CallState.ringing) {
        return;
      }

      const updated = await this.callRepository.transitionToTerminalState({
        callId,
        state: CallState.missed,
        endedByUserId: null,
      });

      if (!updated) {
        return;
      }

      await this.publishTerminalEffects(updated, 'missed', null);
      this.logCallLifecycle('missed_call_expired', {
        callId,
        state: updated.state,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown missed-call error';
      this.logger.error(`Failed to auto-expire call ${callId}: ${message}`);
    } finally {
      this.clearMissedTimeout(callId);
    }
  }

  private async cleanupStaleCalls() {
    if (this.staleCleanupInFlight || !this.isCallsEnabled()) {
      return;
    }

    this.staleCleanupInFlight = true;

    try {
      const batchSize = this.configService.get<number>('cleanup.batchSize') ?? 20;
      const staleCalls = await this.callRepository.findStaleCalls(batchSize);

      if (staleCalls.length === 0) {
        return;
      }

      for (const staleCall of staleCalls) {
        const updated = await this.callRepository.transitionToTerminalState({
          callId: staleCall.id,
          state: CallState.failed,
          endedByUserId: null,
        });

        if (!updated || updated.state !== CallState.failed) {
          continue;
        }

        this.clearMissedTimeout(updated.id);
        await this.publishTerminalEffects(updated, 'failed', null);
        this.logCallLifecycle('stale_call_cleaned', {
          callId: updated.id,
          state: updated.state,
        });
      }

      this.logger.warn(`Cleaned up ${staleCalls.length} stale call session(s)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown stale-call cleanup error';
      this.logger.error(`Failed stale call cleanup cycle: ${message}`);
    } finally {
      this.staleCleanupInFlight = false;
    }
  }

  private async publishTerminalEffects(
    call: {
      id: string;
      chatId: string;
      initiatorUserId: string;
      receiverUserId: string;
      state: CallState;
      startedAt: Date;
      acceptedAt: Date | null;
      activeAt: Date | null;
      endedAt: Date | null;
      timelineMessageId: string | null;
    },
    outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed',
    endedByUserId: string | null,
  ) {
    const durationBaseline = call.activeAt ?? call.acceptedAt ?? call.startedAt;
    const durationSec = Math.max(0, Math.round(((call.endedAt ?? new Date()).getTime() - durationBaseline.getTime()) / 1000));
    this.logCallLifecycle('terminal_effects_published', {
      callId: call.id,
      chatId: call.chatId,
      outcome,
      state: call.state,
      endedByUserId,
      durationSec,
    });

    this.callSignalsService.emitToUser(call.initiatorUserId, 'call.ended', {
      callId: call.id,
      state: call.state,
      outcome,
      durationSec,
      endedAt: call.endedAt?.toISOString() ?? null,
    });
    this.callSignalsService.emitToUser(call.receiverUserId, 'call.ended', {
      callId: call.id,
      state: call.state,
      outcome,
      durationSec,
      endedAt: call.endedAt?.toISOString() ?? null,
    });

    if (call.timelineMessageId) {
      return;
    }

    try {
      const messageId = await this.messageServiceClient.createCallEventMessage({
        callId: call.id,
        chatId: call.chatId,
        initiatorUserId: call.initiatorUserId,
        endedByUserId,
        outcome,
        durationSec,
      });

      if (messageId) {
        await this.callRepository.setTimelineMessageId(call.id, messageId);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown call-event error';
      this.logger.warn(`Unable to persist call event message for ${call.id}: ${message}`);
    }
  }

  private logCallLifecycle(event: string, details: Record<string, unknown>) {
    this.logger.log(JSON.stringify({
      event,
      service: 'call-service',
      ...details,
    }));
  }
}

function deriveTurnFallbackUrls(turnUrl: string) {
  return turnUrl
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.startsWith('turn:'))
    .flatMap((value) => {
      if (value.includes('transport=tcp')) {
        return [];
      }

      if (value.includes('transport=udp')) {
        return [value.replace('transport=udp', 'transport=tcp')];
      }

      return value.includes('?')
        ? [`${value}&transport=tcp`]
        : [`${value}?transport=tcp`];
    });
}
