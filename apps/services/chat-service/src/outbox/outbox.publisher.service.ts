import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OutboxWorker, RabbitMqOutboxPublisher } from '@telegram/shared/outbox';

import { PrismaOutboxStore } from './prisma-outbox.store.js';

@Injectable()
export class OutboxPublisherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OutboxPublisherService.name);
  private worker: OutboxWorker | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly store: PrismaOutboxStore,
  ) {}

  onModuleInit(): void {
    const rabbitMqUrl = this.configService.get<string>('outbox.rabbitMqUrl') ?? '';
    if (!rabbitMqUrl) {
      this.logger.log('Outbox publisher disabled: RABBITMQ_URL is not configured');
      return;
    }

    const serviceName = this.configService.get<string>('app.name') ?? 'chat-service';
    const publisher = new RabbitMqOutboxPublisher({
      url: rabbitMqUrl,
      exchange: this.configService.get<string>('outbox.exchange') ?? 'telegram.events',
      appId: serviceName,
    });

    this.worker = new OutboxWorker(
      this.store,
      publisher,
      {
        serviceName,
        pollIntervalMs: this.configService.get<number>('outbox.pollIntervalMs') ?? 2000,
        batchSize: this.configService.get<number>('outbox.batchSize') ?? 50,
        lockTimeoutMs: this.configService.get<number>('outbox.lockTimeoutMs') ?? 30000,
      },
      {
        log: (message) => this.logger.log(message),
        error: (message) => this.logger.error(message),
      },
    );

    this.worker.start();
    this.logger.log('Outbox publisher started');
  }

  async onModuleDestroy(): Promise<void> {
    await this.worker?.stop();
  }
}
