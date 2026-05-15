import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/auth.module.js';
import { ChatServiceClient } from '../chat-client/chat-service.client.js';
import { MessageServiceClient } from '../message-client/message-service.client.js';
import { NotificationServiceClient } from '../notification-client/notification-service.client.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { CallGateway } from '../signaling/call.gateway.js';
import { CallSignalsService } from '../signaling/call-signals.service.js';
import { SignalingStateService } from '../signaling/signaling-state.service.js';
import { CallController } from './call.controller.js';
import { CallService } from './call.service.js';
import { CallRepository } from './repositories/call.repository.js';

@Module({
  imports: [AuthModule, ConfigModule, PrismaModule],
  controllers: [CallController],
  providers: [
    CallService,
    CallRepository,
    ChatServiceClient,
    ProfileServiceClient,
    MessageServiceClient,
    NotificationServiceClient,
    CallSignalsService,
    SignalingStateService,
    CallGateway,
  ],
})
export class CallModule {}
