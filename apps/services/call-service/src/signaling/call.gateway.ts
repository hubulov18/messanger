import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Server, Socket } from 'socket.io';

import { verifyAccessToken } from '../auth/jwt.js';
import { CallService } from '../call/call.service.js';
import { CallSignalsService } from './call-signals.service.js';
import { SignalingStateService } from './signaling-state.service.js';

type AuthenticatedSocket = Socket & {
  data: {
    userId?: string;
    joinedCalls?: Map<string, { sessionId: string; negotiationVersion: number }>;
  };
};

@Injectable()
@WebSocketGateway({
  namespace: '/calls',
  cors: {
    origin: '*',
  },
})
export class CallGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(CallGateway.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly signalingStateService: SignalingStateService,
    private readonly callSignalsService: CallSignalsService,
    private readonly callService: CallService,
  ) {}

  afterInit(server: Server) {
    this.callSignalsService.registerServer(server);
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      if (!this.isCallsEnabled()) {
        client.disconnect(true);
        return;
      }

      const authToken =
        typeof client.handshake.auth?.token === 'string'
          ? client.handshake.auth.token
          : typeof client.handshake.headers.authorization === 'string'
            ? client.handshake.headers.authorization.replace(/^Bearer\s+/i, '')
            : '';

      const secret = this.configService.get<string>('auth.jwtAccessSecret') ?? '';
      const payload = verifyAccessToken(authToken, secret);

      client.data.userId = payload.sub;
      client.data.joinedCalls = new Map<string, { sessionId: string; negotiationVersion: number }>();
      client.join(`user:${payload.sub}`);
      await this.signalingStateService.addConnection(payload.sub, client.id);
      this.logSignalingEvent('socket_connected', {
        userId: payload.sub,
        socketId: client.id,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthenticated socket';
      this.logger.warn(`Rejecting socket connection: ${message}`);
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    if (!client.data.userId) {
      return;
    }

    const remainingConnections = await this.signalingStateService.removeConnection(client.data.userId, client.id);
    if (remainingConnections === 0) {
      for (const [callId] of client.data.joinedCalls ?? []) {
        await this.callService.scheduleDisconnectCleanup(callId);
      }
    }
    this.logSignalingEvent('socket_disconnected', {
      userId: client.data.userId,
      socketId: client.id,
      remainingConnections,
    });
  }

  @SubscribeMessage('call.join')
  async handleJoin(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() body: { token?: string }) {
    if (!this.isCallsEnabled()) {
      return { ok: false, code: 'CALLS_DISABLED' };
    }

    const token = body?.token ?? '';
    if (!token || !client.data.userId) {
      return { ok: false };
    }

    const payload = await this.signalingStateService.consumeSignalingToken(token);
    if (!payload || payload.userId !== client.data.userId) {
      this.logger.warn(`call.join rejected user=${client.data.userId ?? 'unknown'} tokenSuffix=${token.slice(-8)}`);
      return { ok: false };
    }

    const canJoin = await this.callService.canJoinSignalingSession(payload.callId, client.data.userId);
    if (!canJoin) {
      this.logger.warn(`call.join rejected stale or terminal call=${payload.callId} user=${client.data.userId}`);
      return { ok: false, code: 'CALL_INVALID_STATE' };
    }

    client.join(`call:${payload.callId}`);
    client.data.joinedCalls?.set(payload.callId, {
      sessionId: payload.sessionId,
      negotiationVersion: payload.negotiationVersion,
    });
    this.callService.noteSignalingActivity(payload.callId);
    this.logSignalingEvent('call_join_ok', {
      callId: payload.callId,
      userId: client.data.userId,
      sessionId: payload.sessionId,
      negotiationVersion: payload.negotiationVersion,
      socketId: client.id,
    });
    client.to(`call:${payload.callId}`).emit('call.ready', {
      callId: payload.callId,
      userId: client.data.userId,
      sessionId: payload.sessionId,
      negotiationVersion: payload.negotiationVersion,
    });

    return {
      ok: true,
      callId: payload.callId,
      sessionId: payload.sessionId,
      negotiationVersion: payload.negotiationVersion,
    };
  }

  @SubscribeMessage('call.offer')
  async handleOffer(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() body: { callId: string; sdp: object }) {
    if (!this.isCallsEnabled()) {
      return { ok: false, code: 'CALLS_DISABLED' };
    }

    if (!(await this.hasJoinedCurrentCallSession(client, body.callId)) || !client.data.userId) {
      this.logger.warn(`call.offer rejected call=${body.callId} user=${client.data.userId ?? 'unknown'}`);
      return { ok: false };
    }

    const joinedSession = this.getJoinedCallSession(client, body.callId);
    this.logSignalingEvent('call_offer_forward', {
      callId: body.callId,
      userId: client.data.userId,
      sessionId: joinedSession?.sessionId ?? null,
      negotiationVersion: joinedSession?.negotiationVersion ?? null,
    });
    client.to(`call:${body.callId}`).emit('call.offer', {
      callId: body.callId,
      fromUserId: client.data.userId,
      sessionId: joinedSession?.sessionId ?? null,
      negotiationVersion: joinedSession?.negotiationVersion ?? null,
      sdp: body.sdp,
    });

    return { ok: true };
  }

  @SubscribeMessage('call.answer')
  async handleAnswer(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() body: { callId: string; sdp: object }) {
    if (!this.isCallsEnabled()) {
      return { ok: false, code: 'CALLS_DISABLED' };
    }

    if (!(await this.hasJoinedCurrentCallSession(client, body.callId)) || !client.data.userId) {
      this.logger.warn(`call.answer rejected call=${body.callId} user=${client.data.userId ?? 'unknown'}`);
      return { ok: false };
    }

    const joinedSession = this.getJoinedCallSession(client, body.callId);
    this.logSignalingEvent('call_answer_forward', {
      callId: body.callId,
      userId: client.data.userId,
      sessionId: joinedSession?.sessionId ?? null,
      negotiationVersion: joinedSession?.negotiationVersion ?? null,
    });
    client.to(`call:${body.callId}`).emit('call.answer', {
      callId: body.callId,
      fromUserId: client.data.userId,
      sessionId: joinedSession?.sessionId ?? null,
      negotiationVersion: joinedSession?.negotiationVersion ?? null,
      sdp: body.sdp,
    });
    await this.callService.markCallActiveFromSignaling(body.callId);

    return { ok: true };
  }

  @SubscribeMessage('call.ice_candidate')
  async handleIceCandidate(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() body: { callId: string; candidate: object | null },
  ) {
    if (!this.isCallsEnabled()) {
      return { ok: false, code: 'CALLS_DISABLED' };
    }

    if (!(await this.hasJoinedCurrentCallSession(client, body.callId)) || !client.data.userId) {
      this.logger.warn(`call.ice_candidate rejected call=${body.callId} user=${client.data.userId ?? 'unknown'}`);
      return { ok: false };
    }

    const joinedSession = this.getJoinedCallSession(client, body.callId);
    this.logSignalingEvent('call_ice_forward', {
      callId: body.callId,
      userId: client.data.userId,
      sessionId: joinedSession?.sessionId ?? null,
      negotiationVersion: joinedSession?.negotiationVersion ?? null,
      hasCandidate: Boolean(body.candidate),
    });
    client.to(`call:${body.callId}`).emit('call.ice_candidate', {
      callId: body.callId,
      fromUserId: client.data.userId,
      sessionId: joinedSession?.sessionId ?? null,
      negotiationVersion: joinedSession?.negotiationVersion ?? null,
      candidate: body.candidate,
    });

    return { ok: true };
  }

  @SubscribeMessage('call.heartbeat')
  async handleHeartbeat(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() body: { callId: string }) {
    if (!this.isCallsEnabled()) {
      return { ok: false, code: 'CALLS_DISABLED' };
    }

    if (!(await this.hasJoinedCurrentCallSession(client, body.callId)) || !client.data.userId) {
      return { ok: false };
    }

    await this.signalingStateService.recordHeartbeat(body.callId, client.data.userId);
    await this.callService.recordHeartbeatFromSignaling(body.callId, client.data.userId);
    return { ok: true };
  }

  private getJoinedCallSession(client: AuthenticatedSocket, callId: string) {
    return callId ? client.data.joinedCalls?.get(callId) ?? null : null;
  }

  private async hasJoinedCurrentCallSession(client: AuthenticatedSocket, callId: string) {
    const joinedSession = this.getJoinedCallSession(client, callId);
    const sessionId = joinedSession?.sessionId ?? null;
    if (!callId || !client.data.userId || !sessionId) {
      return false;
    }

    return this.signalingStateService.isCurrentSignalingSession(callId, client.data.userId, sessionId);
  }

  private isCallsEnabled() {
    return this.configService.get<boolean>('features.callsV1Enabled') ?? false;
  }

  private logSignalingEvent(event: string, details: Record<string, unknown>) {
    this.logger.debug(JSON.stringify({
      event,
      service: 'call-gateway',
      ...details,
    }));
  }
}
