import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/app-config.module.js';
import { HealthModule } from './health/health.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProfileModule } from './profile/profile.module.js';

@Module({
  imports: [AppConfigModule, PrismaModule, HealthModule, ProfileModule, OutboxModule],
})
export class AppModule {}
