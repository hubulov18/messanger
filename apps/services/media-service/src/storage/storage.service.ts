import { PutObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private readonly client: S3Client;
  private readonly publicClient: S3Client;
  private readonly bucket: string;
  private readonly uploadUrlTtlSeconds: number;
  private readonly publicBaseUrl: string | null;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.get<string>('storage.bucket') ?? 'telegram-media';
    this.uploadUrlTtlSeconds = this.configService.get<number>('media.uploadUrlTtlSeconds') ?? 900;
    this.publicBaseUrl = this.configService.get<string>('media.publicBaseUrl') || null;

    const endpoint = this.configService.get<string>('storage.endpoint') || null;
    const publicEndpoint = this.configService.get<string>('storage.publicEndpoint') || endpoint;
    const region = this.configService.get<string>('storage.region') ?? 'us-east-1';
    const forcePathStyle = this.configService.get<boolean>('storage.forcePathStyle') ?? true;
    const credentials = {
      accessKeyId: this.configService.get<string>('storage.accessKeyId') ?? 'minio',
      secretAccessKey: this.configService.get<string>('storage.secretAccessKey') ?? 'minioadmin',
    };

    this.client = new S3Client({
      region,
      ...(endpoint ? { endpoint } : {}),
      forcePathStyle,
      credentials,
    });

    this.publicClient = new S3Client({
      region,
      ...(publicEndpoint ? { endpoint: publicEndpoint } : {}),
      forcePathStyle,
      credentials,
    });
  }

  async createSignedUpload(params: { storageKey: string; mimeType: string }) {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: params.storageKey,
      ContentType: params.mimeType,
    });

    return {
      method: 'PUT' as const,
      uploadUrl: await getSignedUrl(this.publicClient, command, { expiresIn: this.uploadUrlTtlSeconds }),
      headers: {
        'content-type': params.mimeType,
      },
    };
  }

  async createSignedDownloadUrl(storageKey: string) {
    if (this.publicBaseUrl) {
      const base = this.publicBaseUrl.replace(/\/$/, '');
      return `${base}/${storageKey}`;
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: storageKey,
    });

    return getSignedUrl(this.publicClient, command, { expiresIn: this.uploadUrlTtlSeconds });
  }
}
