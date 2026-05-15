import { Module } from '@nestjs/common';

import { AppConfigModule } from './config/app-config.module.js';
import { HealthModule } from './health/health.module.js';
import { IdentityModule } from './identity/identity.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AppConfigModule, PrismaModule, HealthModule, IdentityModule, OutboxModule],
})
export class AppModule {}
