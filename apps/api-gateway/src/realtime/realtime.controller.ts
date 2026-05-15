import { Body, Controller, Get, HttpCode, HttpStatus, Post, Sse, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GatewayAuthGuard } from '../auth/gateway-auth.guard.js';
import { GatewayRequestContextDecorator } from '../auth/request-context.decorator.js';
import type { GatewayRequestContext } from '../auth/request-context.type.js';
import { ChatMembershipCacheService } from './chat-membership-cache.service.js';
import { RealtimeService } from './realtime.service.js';

class TypingDto {
  chatId!: string;
  isTyping!: boolean;
}

@Controller('events')
export class RealtimeController {
  constructor(
    private readonly realtimeService: RealtimeService,
    private readonly configService: ConfigService,
    private readonly chatMembershipCacheService: ChatMembershipCacheService,
  ) {}

  @Sse('stream')
  @UseGuards(GatewayAuthGuard)
  stream(@GatewayRequestContextDecorator() requestContext: GatewayRequestContext) {
    return this.realtimeService.createUserStream(requestContext.userId);
  }

  @Get('shadow/membership-metrics')
  @UseGuards(GatewayAuthGuard)
  getMembershipShadowMetrics() {
    return this.chatMembershipCacheService.getShadowReadMetrics();
  }

  /**
   * Ephemeral typing indicator — fire and forget.
   * Looks up chat members from chat-service (internal) and broadcasts to peers.
   */
  @Post('typing')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(GatewayAuthGuard)
  async typing(
    @GatewayRequestContextDecorator() requestContext: GatewayRequestContext,
    @Body() body: TypingDto,
  ) {
    const { chatId, isTyping } = body;
    const senderUserId = requestContext.userId;

    const memberUserIds = await this.chatMembershipCacheService.getActiveMemberUserIds(chatId);
    // Emit to all peers (everyone except the sender)
    const peerUserIds = memberUserIds.filter((id) => id !== senderUserId);
    if (peerUserIds.length === 0) {
      return;
    }

    this.realtimeService.emitToUsers(peerUserIds, {
      type: isTyping ? 'chat.typing_started' : 'chat.typing_stopped',
      chatId,
      senderUserId,
    });
  }
}
