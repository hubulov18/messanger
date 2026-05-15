import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { FindContactMatchesDto } from './dto/find-contact-matches.dto.js';
import { IdentityService } from './identity.service.js';

@Controller('internal')
export class InternalIdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('contacts/matches')
  findContactMatches(@Body() body: FindContactMatchesDto) {
    return this.identityService.findContactMatches(body);
  }

  @Get('users/:userId/last-seen')
  getLastSeen(@Param('userId') userId: string) {
    return this.identityService.getLastSeen(userId);
  }

  @Get('users/by-phone')
  getUserByPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    return this.identityService.getUserByPhoneNumber(phoneNumber);
  }
}
