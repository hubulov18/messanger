import { Module } from '@nestjs/common';

import { ContactsModule } from './contacts/contacts.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { HealthModule } from './health/health.module.js';
import { OutboxModule } from './outbox/outbox.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [AppConfigModule, PrismaModule, HealthModule, ContactsModule, OutboxModule],
})
export class AppModule {}
