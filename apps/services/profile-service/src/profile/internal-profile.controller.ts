import { Controller, Get, Param, Query } from '@nestjs/common';

import { ProfileService } from './profile.service.js';

@Controller('internal')
export class InternalProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('blocks/:leftUserId/:rightUserId')
  getBlockStatus(@Param('leftUserId') leftUserId: string, @Param('rightUserId') rightUserId: string) {
    return this.profileService.getBlockStatus(leftUserId, rightUserId);
  }

  @Get('profiles')
  getProfilesByUserIds(@Query('userIds') userIds: string) {
    const parsedUserIds = userIds
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    return this.profileService.getProfilesByUserIds(parsedUserIds);
  }

  @Get('profiles/:ownerUserId/avatar-access')
  getAvatarAccess(@Param('ownerUserId') ownerUserId: string, @Query('viewerUserId') viewerUserId: string) {
    return this.profileService.canUserAccessAvatar(viewerUserId, ownerUserId);
  }
}
