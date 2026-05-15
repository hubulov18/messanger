import { Controller, Get, Param } from '@nestjs/common';

import { MessageServiceClient } from '../message-client/message-service.client.js';
import { ChatMembershipProjectionService } from './chat-membership-projection.service.js';
import { ChatService } from './chat.service.js';

@Controller('internal/chats')
export class InternalChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatMembershipProjectionService: ChatMembershipProjectionService,
    private readonly messageServiceClient: MessageServiceClient,
  ) {}

  @Get(':chatId/members')
  getActiveMemberUserIds(@Param('chatId') chatId: string) {
    return this.chatService.getActiveMemberUserIds(chatId);
  }

  @Get(':chatId/members/projection')
  getProjectedMembership(@Param('chatId') chatId: string) {
    return this.chatMembershipProjectionService.getProjectedMembership(chatId);
  }

  @Get('projection/memberships/metrics')
  getMembershipProjectionMetrics() {
    return this.chatMembershipProjectionService.getMetricsSnapshot();
  }

  @Get('shadow/summaries/metrics')
  getMessageSummaryShadowReadMetrics() {
    return this.messageServiceClient.getShadowReadMetrics();
  }

  @Get(':chatId/members/:userId/access')
  getMembershipAccess(@Param('chatId') chatId: string, @Param('userId') userId: string) {
    return this.chatService.getMembershipAccess(chatId, userId);
  }

  @Get('direct/:leftUserId/:rightUserId/shared')
  hasSharedDirectChat(@Param('leftUserId') leftUserId: string, @Param('rightUserId') rightUserId: string) {
    return this.chatService.hasSharedDirectChat(leftUserId, rightUserId);
  }
}
