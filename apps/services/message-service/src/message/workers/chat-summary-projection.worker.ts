import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatSummaryProjectionService } from '../chat-summary-projection.service.js';

@Injectable()
export class ChatSummaryProjectionWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ChatSummaryProjectionWorker.name);
  private intervalHandle: ReturnType<typeof setInterval> | null = null;
  private running = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly projectionService: ChatSummaryProjectionService,
  ) {}

  onModuleInit(): void {
    const intervalMs = this.configService.get<number>('projection.chatSummaryPollIntervalMs') ?? 2000;
    this.intervalHandle = setInterval(() => {
      void this.tick();
    }, intervalMs);
    void this.tick();
    this.logger.log(`Chat summary projection worker started (interval: ${intervalMs} ms)`);
  }

  onModuleDestroy(): void {
    if (this.intervalHandle !== null) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
  }

  private async tick() {
    if (this.running) {
      return;
    }

    this.running = true;

    try {
      const batchSize = this.configService.get<number>('projection.chatSummaryBatchSize') ?? 100;
      const maxBatchesPerTick =
        this.configService.get<number>('projection.chatSummaryMaxBatchesPerTick') ?? 20;

      let totalProcessed = 0;
      let lagMs: number | null = null;
      let batches = 0;

      while (batches < maxBatchesPerTick) {
        const result = await this.projectionService.processPendingBatch(batchSize);
        batches += 1;
        totalProcessed += result.processed;
        lagMs = result.lagMs;

        if (!result.hasMore || result.processed === 0) {
          break;
        }
      }

      if (totalProcessed > 0) {
        this.logger.log(
          `Applied ${totalProcessed} chat summary projection event(s) across ${batches} batch(es)` +
            (lagMs !== null ? ` (lag=${lagMs}ms)` : ''),
        );
      }
    } catch (error) {
      this.logger.error('Failed to apply chat summary projection batch', error);
    } finally {
      this.running = false;
    }
  }
}
