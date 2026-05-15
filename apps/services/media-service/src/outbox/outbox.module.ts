import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { OutboxPublisherService } from './outbox.publisher.service.js';
import { PrismaOutboxStore } from './prisma-outbox.store.js';

@Module({
  imports: [PrismaModule],
  providers: [PrismaOutboxStore, OutboxPublisherService],
})
export class OutboxModule {}
