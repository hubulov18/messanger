import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { CallModule } from './call/call.module.js';
import { HealthModule } from './health/health.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AuthModule, AppConfigModule, PrismaModule, HealthModule, CallModule, OutboxModule],
})
export class AppModule {}
