import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/auth.module.js';
import { ChatServiceClient } from '../chat-client/chat-service.client.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { NotificationServiceClient } from '../notification-client/notification-service.client.js';
import { ChatSummaryProjectionService } from './chat-summary-projection.service.js';
import { InternalMessageController } from './internal-message.controller.js';
import { MessageController } from './message.controller.js';
import { MessageService } from './message.service.js';
import { MessageRepository } from './repositories/message.repository.js';
import { ChatSummaryProjectionWorker } from './workers/chat-summary-projection.worker.js';

@Module({
  imports: [AuthModule, ConfigModule, PrismaModule],
  controllers: [MessageController, InternalMessageController],
  providers: [
    MessageService,
    MessageRepository,
    ChatSummaryProjectionService,
    ChatSummaryProjectionWorker,
    ChatServiceClient,
    ProfileServiceClient,
    NotificationServiceClient,
  ],
})
export class MessageModule {}
