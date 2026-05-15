import amqp, { type Channel, type Options } from 'amqplib';
import { randomUUID } from 'node:crypto';

type AmqpConnection = Awaited<ReturnType<typeof amqp.connect>>;

export type OutboxEventRecord = {
  id: string;
  eventType: string;
  eventVersion: number;
  aggregateId: string;
  partitionKey: string;
  payloadJson: unknown;
  occurredAt: Date;
  attemptCount: number;
};

export interface OutboxStore {
  claimPendingBatch(params: {
    limit: number;
    workerId: string;
    lockTimeoutMs: number;
  }): Promise<OutboxEventRecord[]>;
  markPublished(params: { eventId: string; workerId: string; publishedAt: Date }): Promise<void>;
  markFailed(params: {
    eventId: string;
    workerId: string;
    failedAt: Date;
    errorMessage: string;
  }): Promise<void>;
}

export type OutboxWorkerOptions = {
  serviceName: string;
  pollIntervalMs: number;
  batchSize: number;
  lockTimeoutMs: number;
  workerId?: string;
};

export type RabbitMqPublisherOptions = {
  url: string;
  exchange: string;
  appId: string;
};

export class RabbitMqOutboxPublisher {
  private connection: AmqpConnection | null = null;
  private channel: Channel | null = null;

  constructor(private readonly options: RabbitMqPublisherOptions) {}

  async publish(event: OutboxEventRecord): Promise<void> {
    const channel = await this.getChannel();
    const payload = Buffer.from(
      JSON.stringify({
        id: event.id,
        eventType: event.eventType,
        eventVersion: event.eventVersion,
        aggregateId: event.aggregateId,
        partitionKey: event.partitionKey,
        occurredAt: event.occurredAt.toISOString(),
        attemptCount: event.attemptCount,
        payload: event.payloadJson,
      }),
      'utf8',
    );

    const publishOptions: Options.Publish = {
      appId: this.options.appId,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
      persistent: true,
      messageId: event.id,
      timestamp: event.occurredAt.getTime(),
      type: event.eventType,
      headers: {
        eventType: event.eventType,
        eventVersion: event.eventVersion,
        aggregateId: event.aggregateId,
        partitionKey: event.partitionKey,
        attemptCount: event.attemptCount,
      },
    };

    const published = channel.publish(this.options.exchange, event.eventType, payload, publishOptions);
    if (!published) {
      await new Promise<void>((resolve) => channel.once('drain', () => resolve()));
    }
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
    this.channel = null;
    this.connection = null;
  }

  private async getChannel(): Promise<Channel> {
    if (this.channel) {
      return this.channel;
    }

    const connection = await amqp.connect(this.options.url);
    const channel = await connection.createChannel();
    await channel.assertExchange(this.options.exchange, 'topic', { durable: true });

    this.connection = connection;
    this.channel = channel;

    return channel;
  }
}

export class OutboxWorker {
  private readonly workerId: string;
  private timer: ReturnType<typeof setInterval> | null = null;
  private running = false;

  constructor(
    private readonly store: OutboxStore,
    private readonly publisher: RabbitMqOutboxPublisher,
    private readonly options: OutboxWorkerOptions,
    private readonly logger: Pick<Console, 'log' | 'error'> = console,
  ) {
    this.workerId = options.workerId ?? `${options.serviceName}-${randomUUID()}`;
  }

  start(): void {
    if (this.timer) {
      return;
    }

    this.timer = setInterval(() => {
      void this.tick();
    }, this.options.pollIntervalMs);
    void this.tick();
  }

  async stop(): Promise<void> {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    while (this.running) {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    await this.publisher.close();
  }

  async tick(): Promise<void> {
    if (this.running) {
      return;
    }

    this.running = true;

    try {
      const events = await this.store.claimPendingBatch({
        limit: this.options.batchSize,
        workerId: this.workerId,
        lockTimeoutMs: this.options.lockTimeoutMs,
      });

      for (const event of events) {
        try {
          await this.publisher.publish(event);
          await this.store.markPublished({
            eventId: event.id,
            workerId: this.workerId,
            publishedAt: new Date(),
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown publish error';
          await this.store.markFailed({
            eventId: event.id,
            workerId: this.workerId,
            failedAt: new Date(),
            errorMessage,
          });
          this.logger.error(
            `[${this.options.serviceName}] failed to publish outbox event ${event.id} (${event.eventType}): ${errorMessage}`,
          );
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown outbox error';
      this.logger.error(`[${this.options.serviceName}] outbox worker cycle failed: ${message}`);
    } finally {
      this.running = false;
    }
  }
}
