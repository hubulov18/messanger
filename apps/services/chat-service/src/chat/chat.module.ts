import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { MessageServiceClient } from '../message-client/message-service.client.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ChatMembershipProjectionService } from './chat-membership-projection.service.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { ChatController } from './chat.controller.js';
import { InternalChatController } from './internal-chat.controller.js';
import { ChatService } from './chat.service.js';
import { ChatRepository } from './repositories/chat.repository.js';
import { ChatMembershipProjectionWorker } from './workers/chat-membership-projection.worker.js';
import { RestrictionExpiryWorker } from './workers/restriction-expiry.worker.js';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ChatController, InternalChatController],
  providers: [
    ChatService,
    ChatRepository,
    ChatMembershipProjectionService,
    ProfileServiceClient,
    MessageServiceClient,
    RestrictionExpiryWorker,
    ChatMembershipProjectionWorker,
  ],
  exports: [ChatService],
})
export class ChatModule {}
