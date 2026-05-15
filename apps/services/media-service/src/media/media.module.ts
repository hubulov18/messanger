import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth/auth.module.js';
import { MessageServiceClient } from '../message-client/message-service.client.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { StorageModule } from '../storage/storage.module.js';
import { MediaController } from './media.controller.js';
import { MediaProcessingService } from './media-processing.service.js';
import { MediaService } from './media.service.js';
import { MediaRepository } from './repositories/media.repository.js';

@Module({
  imports: [AuthModule, ConfigModule, PrismaModule, StorageModule],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, MediaProcessingService, MessageServiceClient, ProfileServiceClient],
})
export class MediaModule {}
