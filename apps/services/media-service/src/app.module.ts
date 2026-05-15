import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { HealthController } from './health/health.controller.js';
import { MediaModule } from './media/media.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { StorageModule } from './storage/storage.module.js';

@Module({
  imports: [AppConfigModule, AuthModule, PrismaModule, StorageModule, OutboxModule, MediaModule],
  controllers: [HealthController],
})
export class AppModule {}
