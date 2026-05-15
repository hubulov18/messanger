import { Injectable } from '@nestjs/common';
import type { Server } from 'socket.io';

@Injectable()
export class CallSignalsService {
  private server: Server | null = null;

  registerServer(server: Server) {
    this.server = server;
  }

  emitToUser(userId: string, event: string, payload: object) {
    this.server?.to(`user:${userId}`).emit(event, payload);
  }

  emitToCall(callId: string, event: string, payload: object) {
    this.server?.to(`call:${callId}`).emit(event, payload);
  }
}
