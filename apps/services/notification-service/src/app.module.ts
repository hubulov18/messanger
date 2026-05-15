import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { HealthModule } from './health/health.module.js';
import { NotificationModule } from './notification/notification.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AuthModule, AppConfigModule, PrismaModule, HealthModule, NotificationModule],
})
export class AppModule {}
