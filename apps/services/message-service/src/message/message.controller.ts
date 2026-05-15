import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { AddReactionDto } from './dto/add-reaction.dto.js';
import { DeleteMessageDto } from './dto/delete-message.dto.js';
import { EditMessageDto } from './dto/edit-message.dto.js';
import { ListMessagesDto } from './dto/list-messages.dto.js';
import { MarkReadDto } from './dto/mark-read.dto.js';
import { SearchMessagesDto } from './dto/search-messages.dto.js';
import { SendMessageDto } from './dto/send-message.dto.js';
import { MessageService } from './message.service.js';

@Controller()
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('messages')
  sendMessage(@CurrentUserParam() currentUser: CurrentUser, @Body() body: SendMessageDto) {
    return this.messageService.sendMessage(currentUser, body);
  }

  @Patch('messages/:messageId')
  editMessage(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('messageId') messageId: string,
    @Body() body: EditMessageDto,
  ) {
    return this.messageService.editMessage(currentUser, messageId, body);
  }

  @Delete('messages/:messageId')
  deleteMessage(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('messageId') messageId: string,
    @Body() body: DeleteMessageDto,
  ) {
    return this.messageService.deleteMessage(currentUser, messageId, body);
  }

  @Get('chats/:chatId/messages')
  listMessages(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Query() query: ListMessagesDto,
  ) {
    return this.messageService.listMessages(currentUser, chatId, query);
  }

  @Get('chats/:chatId/messages/search')
  searchMessages(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Query() query: SearchMessagesDto,
  ) {
    return this.messageService.searchMessages(currentUser, chatId, query);
  }

  @Post('chats/:chatId/read')
  markRead(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Body() body: MarkReadDto,
  ) {
    return this.messageService.markRead(currentUser, chatId, body);
  }

  @Post('messages/:messageId/reactions')
  addReaction(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('messageId') messageId: string,
    @Body() body: AddReactionDto,
  ) {
    return this.messageService.addReaction(currentUser, messageId, body);
  }

  @Delete('messages/:messageId/reactions/:emoji')
  removeReaction(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('messageId') messageId: string,
    @Param('emoji') emoji: string,
  ) {
    return this.messageService.removeReaction(currentUser, messageId, emoji);
  }
}
