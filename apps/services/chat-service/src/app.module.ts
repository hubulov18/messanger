import { Module } from '@nestjs/common';

import { ChatModule } from './chat/chat.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { HealthModule } from './health/health.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AppConfigModule, PrismaModule, HealthModule, ChatModule, OutboxModule],
})
export class AppModule {}
