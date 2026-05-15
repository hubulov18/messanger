import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/auth.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ChatServiceClient } from './chat-service.client.js';
import { InternalNotificationController } from './internal-notification.controller.js';
import { FcmClient } from './fcm.client.js';
import { NotificationController } from './notification.controller.js';
import { NotificationService } from './notification.service.js';
import { NotificationRepository } from './repositories/notification.repository.js';
import { PushApnsClient } from './push-apns.client.js';
import { VoipApnsClient } from './voip-apns.client.js';
import { VoipNotificationPayloadBuilder } from './voip-notification-payload.builder.js';

@Module({
  imports: [AuthModule, ConfigModule, PrismaModule],
  controllers: [NotificationController, InternalNotificationController],
  providers: [
    NotificationService,
    NotificationRepository,
    VoipNotificationPayloadBuilder,
    VoipApnsClient,
    PushApnsClient,
    FcmClient,
    ChatServiceClient,
  ],
})
export class NotificationModule {}
