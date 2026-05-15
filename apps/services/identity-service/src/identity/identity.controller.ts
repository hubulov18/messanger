import { Body, Controller, Delete, Get, Headers, Param, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { ListSessionsDto } from './dto/list-sessions.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import { RevokeOtherSessionsDto } from './dto/revoke-other-sessions.dto.js';
import { RefreshSessionDto } from './dto/refresh-session.dto.js';
import { StartRegistrationDto } from './dto/start-registration.dto.js';
import { VerifyOtpDto } from './dto/verify-otp.dto.js';
import { IdentityService } from './identity.service.js';

@Controller('auth')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('register')
  startRegistration(@Body() body: StartRegistrationDto) {
    return this.identityService.startRegistration(body);
  }

  @Post('verify-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.identityService.verifyOtp(body);
  }

  @Post('refresh')
  refreshSession(@Body() body: RefreshSessionDto) {
    return this.identityService.refreshSession(body);
  }

  @Post('logout')
  logout(@Body() body: LogoutDto) {
    return this.identityService.logout(body);
  }

  @Get('sessions')
  @UseGuards(AuthGuard)
  listSessions(
    @CurrentUserParam() currentUser: CurrentUser,
    @Query() query: ListSessionsDto,
    @Headers('x-device-id') deviceId?: string,
  ) {
    return this.identityService.listSessions(currentUser, query, deviceId);
  }

  @Delete('sessions/:sessionId')
  @UseGuards(AuthGuard)
  revokeSession(@CurrentUserParam() currentUser: CurrentUser, @Param('sessionId') sessionId: string) {
    return this.identityService.revokeSession(currentUser, sessionId);
  }

  @Delete('sessions')
  @UseGuards(AuthGuard)
  revokeOtherSessions(
    @CurrentUserParam() currentUser: CurrentUser,
    @Body() body: RevokeOtherSessionsDto,
    @Headers('x-device-id') deviceId?: string,
  ) {
    return this.identityService.revokeOtherSessions(currentUser, body, deviceId);
  }
}
