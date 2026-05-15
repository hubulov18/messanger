import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly slowQueryThresholdMs = Number.parseInt(process.env.SLOW_QUERY_THRESHOLD_MS ?? '200', 10);

  constructor() {
    super({
      log: [{ emit: 'event', level: 'query' }],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();

    if (this.slowQueryThresholdMs <= 0) {
      return;
    }

    (this as any).$on('query', (event: any) => {
      if (event.duration < this.slowQueryThresholdMs) {
        return;
      }

      this.logger.warn(
        `slow_query durationMs=${event.duration} target=${event.target} query=${JSON.stringify(event.query)} params=${JSON.stringify(event.params)}`,
      );
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
