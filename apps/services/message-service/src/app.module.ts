import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { HealthModule } from './health/health.module.js';
import { MessageModule } from './message/message.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AuthModule, AppConfigModule, PrismaModule, HealthModule, MessageModule, OutboxModule],
})
export class AppModule {}
