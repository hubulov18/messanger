import { Injectable } from '@nestjs/common';
import type { OutboxEventRecord, OutboxStore } from '@telegram/shared/outbox';

import { PrismaService } from '../prisma/prisma.service.js';

type OutboxRow = {
  id: string;
  event_type: string;
  event_version: number;
  aggregate_id: string;
  partition_key: string;
  payload_json: unknown;
  occurred_at: Date;
  attempt_count: number;
};

@Injectable()
export class PrismaOutboxStore implements OutboxStore {
  constructor(private readonly prisma: PrismaService) {}

  async claimPendingBatch(params: {
    limit: number;
    workerId: string;
    lockTimeoutMs: number;
  }): Promise<OutboxEventRecord[]> {
    const rows = await this.prisma.$transaction((tx) =>
      tx.$queryRawUnsafe<OutboxRow[]>(
        `WITH claimable AS (
           SELECT id
           FROM outbox_events
           WHERE published_at IS NULL
             AND status IN ('pending', 'failed')
             AND (locked_at IS NULL OR locked_at < NOW() - ($2 * INTERVAL '1 millisecond'))
           ORDER BY occurred_at ASC
           LIMIT $1
           FOR UPDATE SKIP LOCKED
         )
         UPDATE outbox_events AS oe
         SET locked_at = NOW(),
             locked_by = $3,
             attempt_count = oe.attempt_count + 1,
             status = 'pending',
             last_error = NULL
         FROM claimable
         WHERE oe.id = claimable.id
         RETURNING
           oe.id,
           oe.event_type,
           oe.event_version,
           oe.aggregate_id,
           oe.partition_key,
           oe.payload_json,
           oe.occurred_at,
           oe.attempt_count`,
        params.limit,
        params.lockTimeoutMs,
        params.workerId,
      ),
    );

    return rows.map((row) => ({
      id: row.id,
      eventType: row.event_type,
      eventVersion: row.event_version,
      aggregateId: row.aggregate_id,
      partitionKey: row.partition_key,
      payloadJson: row.payload_json,
      occurredAt: new Date(row.occurred_at),
      attemptCount: row.attempt_count,
    }));
  }

  async markPublished(params: { eventId: string; workerId: string; publishedAt: Date }): Promise<void> {
    await this.prisma.outboxEvent.updateMany({
      where: {
        id: params.eventId,
        lockedBy: params.workerId,
      },
      data: {
        status: 'published',
        publishedAt: params.publishedAt,
        lockedAt: null,
        lockedBy: null,
        lastError: null,
      },
    });
  }

  async markFailed(params: {
    eventId: string;
    workerId: string;
    failedAt: Date;
    errorMessage: string;
  }): Promise<void> {
    await this.prisma.outboxEvent.updateMany({
      where: {
        id: params.eventId,
        lockedBy: params.workerId,
      },
      data: {
        status: 'failed',
        lockedAt: null,
        lockedBy: null,
        lastError: params.errorMessage.slice(0, 4000),
      },
    });
  }
}
