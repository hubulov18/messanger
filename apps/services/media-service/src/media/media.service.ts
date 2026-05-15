import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

import type { CurrentUser } from '../auth/current-user.type.js';
import type { CreateUploadSessionDto } from './dto/create-upload-session.dto.js';
import type { FinalizeUploadDto } from './dto/finalize-upload.dto.js';
import { MessageServiceClient } from '../message-client/message-service.client.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { StorageService } from '../storage/storage.service.js';
import { MediaRepository } from './repositories/media.repository.js';

@Injectable()
export class MediaService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mediaRepository: MediaRepository,
    private readonly messageServiceClient: MessageServiceClient,
    private readonly profileServiceClient: ProfileServiceClient,
    private readonly storageService: StorageService,
  ) {}

  async createUploadSession(currentUser: CurrentUser, dto: CreateUploadSessionDto) {
    const now = new Date();
    const uploadId = `upload_${randomUUID()}`;
    const mediaId = `media_${randomUUID()}`;
    const storageKey = `${currentUser.userId}/${mediaId}/${sanitizeFileName(dto.fileName)}`;
    const expiresAt = new Date(
      now.getTime() + (this.configService.get<number>('media.uploadUrlTtlSeconds') ?? 900) * 1000,
    );

    await this.mediaRepository.createUploadSession({
      mediaId,
      uploadId,
      ownerUserId: currentUser.userId,
      mediaType: dto.mediaType,
      fileName: dto.fileName,
      mimeType: dto.mimeType,
      sizeBytes: dto.sizeBytes,
      ...(dto.checksum !== undefined ? { checksum: dto.checksum } : {}),
      storageKey,
      expiresAt,
      occurredAt: now,
    });

    return {
      uploadId,
      mediaId,
      upload: await this.storageService.createSignedUpload({
        storageKey,
        mimeType: dto.mimeType,
      }),
      processingStatus: 'pending',
      expiresAt: expiresAt.toISOString(),
    };
  }

  async finalizeUpload(currentUser: CurrentUser, dto: FinalizeUploadDto) {
    const result = await this.mediaRepository.finalizeUploadSession({
      uploadId: dto.uploadId,
      ownerUserId: currentUser.userId,
      ...(dto.checksum !== undefined ? { checksum: dto.checksum } : {}),
      occurredAt: new Date(),
    });

    if (!result) {
      throw new NotFoundException('Upload session not found');
    }

    if (result.type === 'forbidden') {
      throw new ForbiddenException('You do not have access to this upload session');
    }

    if (result.type === 'expired') {
      throw new UnprocessableEntityException({
        message: 'Upload session expired',
        details: { reason: 'upload_session_expired' },
      });
    }

    const media = result.type === 'already_finalized' ? result.media : result.media;

    return {
      media: await this.toMediaResponse(media),
    };
  }

  async getMedia(currentUser: CurrentUser, mediaId: string) {
    let media = await this.mediaRepository.findMediaById(mediaId);
    if (!media) {
      throw new NotFoundException('Media not found');
    }

    const isOwner = media.ownerUserId === currentUser.userId;
    const canAccessFromMessage = isOwner ? true : await this.messageServiceClient.canUserAccessMedia(currentUser.userId, mediaId);
    const canAccessAvatar =
      !isOwner && media.mediaType === 'avatar'
        ? await this.profileServiceClient.canUserAccessAvatar(currentUser.userId, media.ownerUserId)
        : false;

    if (!canAccessFromMessage && !canAccessAvatar) {
      throw new ForbiddenException('You do not have access to this media');
    }

    return await this.toMediaResponse(media);
  }

  private async toMediaResponse(media: {
    id: string;
    ownerUserId: string;
    storageKey: string;
    mediaType: string;
    mimeType: string;
    sizeBytes: bigint;
    checksum: string | null;
    processingStatus: string;
    createdAt: Date;
    processedAt: Date | null;
    variants: Array<{ id: string; variantType: string; storageKey: string }>;
  }) {
    return {
      id: media.id,
      mediaType: media.mediaType,
      mimeType: media.mimeType,
      sizeBytes: Number(media.sizeBytes),
      checksum: media.checksum,
      processingStatus: media.processingStatus,
      downloadUrl: await this.storageService.createSignedDownloadUrl(media.storageKey),
      createdAt: media.createdAt.toISOString(),
      processedAt: media.processedAt?.toISOString() ?? null,
      variants: await Promise.all(
        media.variants.map(async (variant) => ({
          id: variant.id,
          variantType: variant.variantType,
          downloadUrl: await this.storageService.createSignedDownloadUrl(variant.storageKey),
        })),
      ),
    };
  }
}

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '_');
}

function buildUploadUrl(baseUrl: string, storageKey: string) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
  return `${normalizedBaseUrl}/${storageKey}`;
}
