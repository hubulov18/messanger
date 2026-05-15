import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { ChatRepository } from '../repositories/chat.repository.js';

/**
 * RestrictionExpiryWorker
 *
 * Periodically clears per-member restriction overlays whose `restriction_until`
 * timestamp has passed. This is the cleanup half of the lazy-expiry strategy:
 * the permission engine already ignores expired restrictions at read time, but
 * the DB rows need to be nulled eventually so the partial index stays small.
 *
 * Design notes:
 *  - Uses plain setInterval — no extra packages needed.
 *  - Default interval: 60 s. Tune via RESTRICTION_EXPIRY_INTERVAL_MS env var.
 *  - Idempotent: running the UPDATE twice for the same row is harmless.
 *  - On error: logs and continues — next tick will retry.
 */
@Injectable()
export class RestrictionExpiryWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RestrictionExpiryWorker.name);
  private intervalHandle: ReturnType<typeof setInterval> | null = null;

  constructor(private readonly chatRepository: ChatRepository) {}

  onModuleInit(): void {
    const intervalMs = parseInt(process.env['RESTRICTION_EXPIRY_INTERVAL_MS'] ?? '60000', 10);
    this.logger.log(`Restriction expiry worker starting (interval: ${intervalMs} ms)`);

    this.intervalHandle = setInterval(() => {
      void this.tick();
    }, intervalMs);
  }

  onModuleDestroy(): void {
    if (this.intervalHandle !== null) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
      this.logger.log('Restriction expiry worker stopped');
    }
  }

  private async tick(): Promise<void> {
    try {
      const cleared = await this.chatRepository.clearExpiredRestrictions();
      if (cleared > 0) {
        this.logger.log(`Cleared ${cleared} expired restriction(s)`);
      }
    } catch (err) {
      this.logger.error('Failed to clear expired restrictions', err);
    }
  }
}
