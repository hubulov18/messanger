import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { UpdatePrivacyDto } from './dto/update-privacy.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileService } from './profile.service.js';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUserParam() currentUser: CurrentUser) {
    return this.profileService.getCurrentUserProfile(currentUser);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  updateProfile(@CurrentUserParam() currentUser: CurrentUser, @Body() body: UpdateProfileDto) {
    return this.profileService.updateProfile(currentUser, body);
  }

  @Get('users/by-username/:username')
  getByUsername(@Param('username') username: string) {
    return this.profileService.getByUsername(username);
  }

  @Get('profiles/by-phone/:phoneNumber')
  @UseGuards(AuthGuard)
  getByPhoneNumber(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('phoneNumber') phoneNumber: string,
  ) {
    return this.profileService.getByPhoneNumber(currentUser, phoneNumber);
  }

  @Get('profiles/:userId')
  getByUserId(@Param('userId') userId: string) {
    return this.profileService.getByUserId(userId);
  }

  @Get('profiles/:userId/presence')
  @UseGuards(AuthGuard)
  getPresence(@CurrentUserParam() currentUser: CurrentUser, @Param('userId') userId: string) {
    return this.profileService.getPresence(currentUser, userId);
  }

  @Patch('me/privacy')
  @UseGuards(AuthGuard)
  updatePrivacy(@CurrentUserParam() currentUser: CurrentUser, @Body() body: UpdatePrivacyDto) {
    return this.profileService.updatePrivacy(currentUser, body);
  }

  @Get('me/blocks')
  @UseGuards(AuthGuard)
  listBlockedUsers(@CurrentUserParam() currentUser: CurrentUser) {
    return this.profileService.listBlockedUsers(currentUser);
  }

  @Post('me/blocks/:targetUserId')
  @UseGuards(AuthGuard)
  blockUser(@CurrentUserParam() currentUser: CurrentUser, @Param('targetUserId') targetUserId: string) {
    return this.profileService.blockUser(currentUser, targetUserId);
  }

  @Delete('me/blocks/:targetUserId')
  @UseGuards(AuthGuard)
  unblockUser(@CurrentUserParam() currentUser: CurrentUser, @Param('targetUserId') targetUserId: string) {
    return this.profileService.unblockUser(currentUser, targetUserId);
  }
}
