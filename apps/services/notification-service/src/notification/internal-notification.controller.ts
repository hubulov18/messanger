import { Body, Controller, Post } from '@nestjs/common';

import { QueueIncomingVoipNotificationDto } from './dto/queue-incoming-voip-notification.dto.js';
import { QueueMessageNotificationDto } from './dto/queue-message-notification.dto.js';
import { NotificationService } from './notification.service.js';

@Controller('internal/notifications')
export class InternalNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('voip/incoming')
  queueIncomingVoipNotification(@Body() body: QueueIncomingVoipNotificationDto) {
    return this.notificationService.queueIncomingVoipNotification(body);
  }

  @Post('message')
  queueMessageNotification(@Body() body: QueueMessageNotificationDto) {
    return this.notificationService.queueMessageNotification(body);
  }
}
