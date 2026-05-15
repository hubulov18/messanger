import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUploadSession(params: {
    mediaId: string;
    uploadId: string;
    ownerUserId: string;
    mediaType: 'image' | 'video' | 'audio' | 'file' | 'avatar';
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    checksum?: string;
    storageKey: string;
    expiresAt: Date;
    occurredAt: Date;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const media = await tx.mediaObject.create({
        data: {
          id: params.mediaId,
          ownerUserId: params.ownerUserId,
          storageKey: params.storageKey,
          mediaType: params.mediaType,
          mimeType: params.mimeType,
          sizeBytes: BigInt(params.sizeBytes),
          checksum: params.checksum ?? null,
          processingStatus: 'pending',
        },
      });

      const uploadSession = await tx.uploadSession.create({
        data: {
          id: params.uploadId,
          mediaId: params.mediaId,
          ownerUserId: params.ownerUserId,
          status: 'pending',
          checksum: params.checksum ?? null,
          expiresAt: params.expiresAt,
        },
      });

      await tx.outboxEvent.create({
        data: {
          id: `evt_${params.uploadId}_created`,
          eventType: 'media.upload.session.created',
          eventVersion: 1,
          aggregateId: params.mediaId,
          partitionKey: params.ownerUserId,
          payloadJson: {
            uploadId: params.uploadId,
            mediaId: params.mediaId,
            ownerUserId: params.ownerUserId,
            mediaType: params.mediaType,
            mimeType: params.mimeType,
            sizeBytes: params.sizeBytes,
            expiresAt: params.expiresAt.toISOString(),
            createdAt: params.occurredAt.toISOString(),
          },
          occurredAt: params.occurredAt,
          status: 'pending',
        },
      });

      return { media, uploadSession };
    });
  }

  async findMediaById(mediaId: string) {
    return this.prisma.mediaObject.findUnique({
      where: { id: mediaId },
      include: { variants: true },
    });
  }

  async findUploadSessionById(uploadId: string) {
    return this.prisma.uploadSession.findUnique({
      where: { id: uploadId },
      include: {
        media: {
          include: {
            variants: true,
          },
        },
      },
    });
  }

  async finalizeUploadSession(params: {
    uploadId: string;
    ownerUserId: string;
    checksum?: string;
    occurredAt: Date;
  }) {
    return this.prisma.$transaction(async (tx) => {
      const uploadSession = await tx.uploadSession.findUnique({
        where: { id: params.uploadId },
        include: { media: true },
      });

      if (!uploadSession) {
        return null;
      }

      if (uploadSession.ownerUserId !== params.ownerUserId) {
        return { type: 'forbidden' as const };
      }

      if (uploadSession.completedAt || uploadSession.status === 'uploaded') {
        const currentMedia = await tx.mediaObject.findUniqueOrThrow({
          where: { id: uploadSession.mediaId },
          include: { variants: true },
        });
        return { type: 'already_finalized' as const, media: currentMedia };
      }

      if (uploadSession.expiresAt.getTime() <= params.occurredAt.getTime()) {
        await tx.uploadSession.update({
          where: { id: uploadSession.id },
          data: { status: 'expired' },
        });
        return { type: 'expired' as const };
      }

      const updatedUploadSession = await tx.uploadSession.update({
        where: { id: uploadSession.id },
        data: {
          status: 'uploaded',
          checksum: params.checksum ?? uploadSession.checksum,
          completedAt: params.occurredAt,
        },
      });

      const updatedMedia = await tx.mediaObject.update({
        where: { id: uploadSession.mediaId },
        data: {
          checksum: params.checksum ?? uploadSession.media.checksum,
          processingStatus: 'uploaded',
          processedAt: null,
        },
        include: { variants: true },
      });

      await tx.outboxEvent.create({
        data: {
          id: `evt_${uploadSession.id}_uploaded`,
          eventType: 'media.object.uploaded',
          eventVersion: 1,
          aggregateId: uploadSession.mediaId,
          partitionKey: uploadSession.ownerUserId,
          payloadJson: {
            uploadId: uploadSession.id,
            mediaId: uploadSession.mediaId,
            ownerUserId: uploadSession.ownerUserId,
            mediaType: uploadSession.media.mediaType,
            mimeType: uploadSession.media.mimeType,
            sizeBytes: Number(uploadSession.media.sizeBytes),
            uploadedAt: params.occurredAt.toISOString(),
          },
          occurredAt: params.occurredAt,
          status: 'pending',
        },
      });

      return {
        type: 'finalized' as const,
        uploadSession: updatedUploadSession,
        media: updatedMedia,
      };
    });
  }

  async markMediaReadyIfUploaded(mediaId: string, processedAt: Date) {
    return this.prisma.mediaObject.updateMany({
      where: {
        id: mediaId,
        processingStatus: 'uploaded',
      },
      data: {
        processingStatus: 'ready',
        processedAt,
      },
    });
  }

  listUploadedMedia(limit: number) {
    return this.prisma.mediaObject.findMany({
      where: {
        processingStatus: 'uploaded',
        deletedAt: null,
      },
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: limit,
    });
  }

  async claimMediaForProcessing(mediaId: string) {
    const result = await this.prisma.mediaObject.updateMany({
      where: {
        id: mediaId,
        processingStatus: 'uploaded',
      },
      data: {
        processingStatus: 'processing',
      },
    });

    return result.count > 0;
  }

  async completeMediaProcessing(params: {
    mediaId: string;
    processedAt: Date;
    variants: Array<{
      variantType: string;
      storageKey: string;
    }>;
  }) {
    return this.prisma.$transaction(async (tx) => {
      for (const variant of params.variants) {
        await tx.mediaVariant.upsert({
          where: {
            mediaId_variantType: {
              mediaId: params.mediaId,
              variantType: variant.variantType,
            },
          },
          update: {
            storageKey: variant.storageKey,
          },
          create: {
            id: `variant_${params.mediaId}_${variant.variantType}`,
            mediaId: params.mediaId,
            variantType: variant.variantType,
            storageKey: variant.storageKey,
          },
        });
      }

      return tx.mediaObject.update({
        where: { id: params.mediaId },
        data: {
          processingStatus: 'ready',
          processedAt: params.processedAt,
        },
        include: {
          variants: true,
        },
      });
    });
  }

  markMediaProcessingFailed(mediaId: string) {
    return this.prisma.mediaObject.updateMany({
      where: {
        id: mediaId,
        processingStatus: 'processing',
      },
      data: {
        processingStatus: 'failed',
      },
    });
  }
}
