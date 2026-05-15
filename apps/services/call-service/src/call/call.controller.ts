import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { StartCallDto } from './dto/start-call.dto.js';
import { RejoinCallDto } from './dto/rejoin-call.dto.js';
import { CallService } from './call.service.js';

@Controller()
@UseGuards(AuthGuard)
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Post('calls')
  startCall(@CurrentUserParam() currentUser: CurrentUser, @Body() body: StartCallDto) {
    return this.callService.startCall(currentUser, body);
  }

  @Get('calls/:callId')
  getCall(@CurrentUserParam() currentUser: CurrentUser, @Param('callId') callId: string) {
    return this.callService.getCall(currentUser, callId);
  }

  @Post('calls/:callId/accept')
  acceptCall(@CurrentUserParam() currentUser: CurrentUser, @Param('callId') callId: string) {
    return this.callService.acceptCall(currentUser, callId);
  }

  @Post('calls/:callId/decline')
  declineCall(@CurrentUserParam() currentUser: CurrentUser, @Param('callId') callId: string) {
    return this.callService.declineCall(currentUser, callId);
  }

  @Post('calls/:callId/end')
  endCall(@CurrentUserParam() currentUser: CurrentUser, @Param('callId') callId: string) {
    return this.callService.endCall(currentUser, callId);
  }

  @Post('calls/:callId/join')
  rejoinCall(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('callId') callId: string,
    @Body() body: RejoinCallDto,
  ) {
    return this.callService.rejoinCall(currentUser, callId, {
      restartMedia: body.restartMedia === true,
    });
  }
}
