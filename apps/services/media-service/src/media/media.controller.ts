import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { CreateUploadSessionDto } from './dto/create-upload-session.dto.js';
import { FinalizeUploadDto } from './dto/finalize-upload.dto.js';
import { MediaService } from './media.service.js';

@Controller('media')
@UseGuards(AuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload-sessions')
  createUploadSession(@CurrentUserParam() currentUser: CurrentUser, @Body() body: CreateUploadSessionDto) {
    return this.mediaService.createUploadSession(currentUser, body);
  }

  @Post('finalize')
  finalizeUpload(@CurrentUserParam() currentUser: CurrentUser, @Body() body: FinalizeUploadDto) {
    return this.mediaService.finalizeUpload(currentUser, body);
  }

  @Get(':mediaId')
  getMedia(@CurrentUserParam() currentUser: CurrentUser, @Param('mediaId') mediaId: string) {
    return this.mediaService.getMedia(currentUser, mediaId);
  }
}
