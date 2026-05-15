import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/auth.module.js';
import { ChatMembershipCacheService } from './chat-membership-cache.service.js';
import { RealtimeController } from './realtime.controller.js';
import { RealtimeListenerService } from './realtime.listener.service.js';
import { RealtimeService } from './realtime.service.js';

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [RealtimeController],
  providers: [RealtimeService, RealtimeListenerService, ChatMembershipCacheService],
})
export class RealtimeModule {}
