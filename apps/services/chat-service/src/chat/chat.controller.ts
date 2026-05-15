import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { AddMembersDto } from './dto/add-members.dto.js';
import { BanMemberDto } from './dto/ban-member.dto.js';
import { CreateChannelChatDto } from './dto/create-channel-chat.dto.js';
import { CreateDirectChatDto } from './dto/create-direct-chat.dto.js';
import { CreateGroupChatDto } from './dto/create-group-chat.dto.js';
import { CreateInviteLinkDto } from './dto/create-invite-link.dto.js';
import { JoinByInviteDto } from './dto/join-by-invite.dto.js';
import { ListChatsDto } from './dto/list-chats.dto.js';
import { PromoteMemberDto } from './dto/promote-member.dto.js';
import { RestrictMemberDto } from './dto/restrict-member.dto.js';
import { TransferOwnershipDto } from './dto/transfer-ownership.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
import { UpdateChatPermissionsDto } from './dto/update-chat-permissions.dto.js';
import { UpdateMemberRoleDto } from './dto/update-member-role.dto.js';
import { ChatService } from './chat.service.js';

@Controller('chats')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('direct')
  createDirectChat(@CurrentUserParam() currentUser: CurrentUser, @Body() body: CreateDirectChatDto) {
    return this.chatService.createDirectChat(currentUser, body);
  }

  @Post('group')
  createGroupChat(@CurrentUserParam() currentUser: CurrentUser, @Body() body: CreateGroupChatDto) {
    return this.chatService.createGroupChat(currentUser, body);
  }

  @Post('channel')
  createChannelChat(@CurrentUserParam() currentUser: CurrentUser, @Body() body: CreateChannelChatDto) {
    return this.chatService.createChannelChat(currentUser, body);
  }

  @Post('join-by-invite')
  joinByInvite(@CurrentUserParam() currentUser: CurrentUser, @Body() body: JoinByInviteDto) {
    return this.chatService.joinByInvite(currentUser, body);
  }

  @Post(':chatId/join')
  joinChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.joinChat(currentUser, chatId);
  }

  @Post(':chatId/transfer-ownership')
  transferOwnership(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Body() body: TransferOwnershipDto,
  ) {
    return this.chatService.transferOwnership(currentUser, chatId, body);
  }

  @Get()
  listChats(@CurrentUserParam() currentUser: CurrentUser, @Query() query: ListChatsDto) {
    return this.chatService.listChats(currentUser, query);
  }

  @Get(':chatId/members')
  listMembers(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.listMembers(currentUser, chatId);
  }

  @Get(':chatId')
  getChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.getChat(currentUser, chatId);
  }

  @Get(':chatId/invite-links')
  listInviteLinks(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.listInviteLinks(currentUser, chatId);
  }

  @Post(':chatId/invite-links')
  createInviteLink(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Body() body: CreateInviteLinkDto,
  ) {
    return this.chatService.createInviteLink(currentUser, chatId, body);
  }

  @Delete(':chatId/invite-links/:inviteLinkId')
  revokeInviteLink(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('inviteLinkId') inviteLinkId: string,
  ) {
    return this.chatService.revokeInviteLink(currentUser, chatId, inviteLinkId);
  }

  @Patch(':chatId')
  updateChat(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Body() body: UpdateChatDto,
  ) {
    return this.chatService.updateChat(currentUser, chatId, body);
  }

  @Patch(':chatId/permissions')
  updateChatPermissions(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Body() body: UpdateChatPermissionsDto,
  ) {
    return this.chatService.updateChatPermissions(currentUser, chatId, body);
  }

  @Post(':chatId/pin')
  pinChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.pinChat(currentUser, chatId);
  }

  @Delete(':chatId/pin')
  unpinChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.unpinChat(currentUser, chatId);
  }

  @Post(':chatId/archive')
  archiveChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.archiveChat(currentUser, chatId);
  }

  @Delete(':chatId/archive')
  unarchiveChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.unarchiveChat(currentUser, chatId);
  }

  @Post(':chatId/mute')
  muteChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.muteChat(currentUser, chatId);
  }

  @Delete(':chatId/mute')
  unmuteChat(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.unmuteChat(currentUser, chatId);
  }

  @Delete(':chatId/self')
  deleteChatForSelf(@CurrentUserParam() currentUser: CurrentUser, @Param('chatId') chatId: string) {
    return this.chatService.deleteChatForSelf(currentUser, chatId);
  }

  @Post(':chatId/members')
  addMembers(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Body() body: AddMembersDto,
  ) {
    return this.chatService.addMembers(currentUser, chatId, body);
  }

  @Delete(':chatId/members/:userId')
  removeMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return this.chatService.removeMember(currentUser, chatId, userId);
  }

  @Patch(':chatId/members/:userId/role')
  updateMemberRole(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
    @Body() body: UpdateMemberRoleDto,
  ) {
    return this.chatService.updateMemberRole(currentUser, chatId, userId, body);
  }

  // ── Permission diagnostics ────────────────────────────────────────────────

  @Get(':chatId/members/:userId/permissions')
  getMemberPermissions(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return this.chatService.getEffectivePermissions(currentUser, chatId, userId);
  }

  @Get(':chatId/me/permissions')
  getMyPermissions(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
  ) {
    return this.chatService.getEffectivePermissions(currentUser, chatId);
  }

  // ── Moderation ─────────────────────────────────────────────────────────────

  @Post(':chatId/members/:userId/ban')
  banMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
    @Body() body: BanMemberDto,
  ) {
    return this.chatService.banMember(currentUser, chatId, userId, body);
  }

  @Delete(':chatId/members/:userId/ban')
  unbanMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return this.chatService.unbanMember(currentUser, chatId, userId);
  }

  @Post(':chatId/members/:userId/kick')
  kickMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return this.chatService.kickMember(currentUser, chatId, userId);
  }

  @Post(':chatId/members/:userId/restrict')
  restrictMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
    @Body() body: RestrictMemberDto,
  ) {
    return this.chatService.restrictMember(currentUser, chatId, userId, body);
  }

  @Delete(':chatId/members/:userId/restrict')
  unrestrictMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return this.chatService.unrestrictMember(currentUser, chatId, userId);
  }

  @Post(':chatId/members/:userId/promote')
  promoteMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
    @Body() body: PromoteMemberDto,
  ) {
    return this.chatService.promoteMember(currentUser, chatId, userId, body);
  }

  @Post(':chatId/members/:userId/demote')
  demoteMember(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return this.chatService.demoteMember(currentUser, chatId, userId);
  }

  // ── Join requests ──────────────────────────────────────────────────────────

  @Get(':chatId/join-requests')
  listJoinRequests(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
  ) {
    return this.chatService.listJoinRequests(currentUser, chatId);
  }

  @Post(':chatId/join-requests/:requestId/approve')
  approveJoinRequest(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('requestId') requestId: string,
  ) {
    return this.chatService.approveJoinRequest(currentUser, chatId, requestId);
  }

  @Post(':chatId/join-requests/:requestId/decline')
  declineJoinRequest(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
    @Param('requestId') requestId: string,
  ) {
    return this.chatService.declineJoinRequest(currentUser, chatId, requestId);
  }

  // ── Moderation log ────────────────────────────────────────────────────────

  @Get(':chatId/moderation-log')
  getModerationLog(
    @CurrentUserParam() currentUser: CurrentUser,
    @Param('chatId') chatId: string,
  ) {
    return this.chatService.getModerationLog(currentUser, chatId);
  }
}
