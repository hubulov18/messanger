import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { MessageService } from './message.service.js';

@Controller('internal/messages')
export class InternalMessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('summaries')
  getChatSummaries(@Query('chatIds') chatIds: string, @Query('userId') userId?: string) {
    const parsedChatIds = (chatIds ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    return this.messageService.getChatSummaries(parsedChatIds, userId);
  }

  @Get('summaries/projection')
  getProjectedChatSummaries(
    @Query('chatIds') chatIds: string,
    @Query('userId') userId?: string,
    @Query('includeMetadata') includeMetadata?: string,
  ) {
    const parsedChatIds = (chatIds ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    return this.messageService.getProjectedChatSummaries(
      parsedChatIds,
      userId,
      includeMetadata === undefined ? true : includeMetadata === 'true',
    );
  }

  @Get('projection/summaries/metrics')
  getChatSummaryProjectionMetrics() {
    return this.messageService.getChatSummaryProjectionMetrics();
  }

  @Get('media/:mediaId/access')
  getMediaAccess(@Param('mediaId') mediaId: string, @Query('userId') userId: string) {
    return this.messageService.getMediaAccess(mediaId, userId);
  }

  @Post('call-events')
  createCallEventMessage(
    @Body()
    body: {
      callId: string;
      chatId: string;
      initiatorUserId: string;
      endedByUserId: string | null;
      outcome: 'completed' | 'missed' | 'declined' | 'canceled' | 'failed';
      durationSec: number;
    },
  ) {
    return this.messageService.createCallEventMessage(body);
  }
}
