import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { buildMediaProcessingVariants } from './media-processing-plan.js';
import { MediaRepository } from './repositories/media.repository.js';

type ProcessableMedia = Awaited<ReturnType<MediaRepository['listUploadedMedia']>>[number];

@Injectable()
export class MediaProcessingService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MediaProcessingService.name);
  private intervalHandle: ReturnType<typeof setInterval> | null = null;
  private processing = false;

  constructor(
    private readonly configService: ConfigService,
    private readonly mediaRepository: MediaRepository,
  ) {}

  onModuleInit() {
    const intervalMs = this.configService.get<number>('media.processingPollIntervalMs') ?? 2000;
    this.intervalHandle = setInterval(() => {
      void this.processPendingMedia();
    }, intervalMs);
    this.intervalHandle.unref?.();

    void this.processPendingMedia();
  }

  onModuleDestroy() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
  }

  private async processPendingMedia() {
    if (this.processing) {
      return;
    }

    this.processing = true;
    try {
      const batchSize = this.configService.get<number>('media.processingBatchSize') ?? 10;
      const mediaObjects = await this.mediaRepository.listUploadedMedia(batchSize);

      for (const media of mediaObjects) {
        const claimed = await this.mediaRepository.claimMediaForProcessing(media.id);
        if (!claimed) {
          continue;
        }

        try {
          const variants = buildMediaProcessingVariants({
            mediaType: media.mediaType,
            storageKey: media.storageKey,
          });
          await this.mediaRepository.completeMediaProcessing({
            mediaId: media.id,
            processedAt: new Date(),
            variants,
          });
        } catch (error) {
          await this.mediaRepository.markMediaProcessingFailed(media.id);
          const message = error instanceof Error ? error.message : 'Unknown media processing error';
          this.logger.error(`Failed to process media ${media.id}: ${message}`);
        }
      }
    } finally {
      this.processing = false;
    }
  }
}
