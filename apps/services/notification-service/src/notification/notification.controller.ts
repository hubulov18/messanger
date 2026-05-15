import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { RegisterDeviceDto } from './dto/register-device.dto.js';
import { NotificationService } from './notification.service.js';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('notifications/devices')
  @UseGuards(AuthGuard)
  registerDevice(@CurrentUserParam() currentUser: CurrentUser, @Body() body: RegisterDeviceDto) {
    return this.notificationService.registerDevice(currentUser, body);
  }
}
