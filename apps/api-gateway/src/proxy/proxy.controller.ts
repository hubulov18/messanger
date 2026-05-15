import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';

import { GatewayAuthGuard } from '../auth/gateway-auth.guard.js';
import { ProxyService } from './proxy.service.js';

type SearchChatSummary = {
  displayTitle: string;
  subtitle: string;
  secondarySubtitle: string | null;
  counterpartUserId: string | null;
  counterpartUsername: string | null;
  counterpartAvatarMediaId: string | null;
  memberCount: number;
  lastMessagePreview: string | null;
  lastActivityAt: string | null;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  isMuted: boolean;
};

type SearchChatListItem = {
  id: string;
  type: string;
  title: string | null;
  summary: SearchChatSummary;
};

type SearchContactListItem = {
  userId: string;
  displayName: string;
  phoneNumber: string | null;
  username: string | null;
  avatarMediaId: string | null;
};

type SearchMessageListItem = {
  id: string;
  chatId: string;
  senderUserId: string;
  type: string;
  text: string | null;
  attachments: Array<{ mediaId: string; attachmentType: string }>;
  callEvent?: unknown;
  replyToMessageId: string | null;
  forwardedFromMessageId: string | null;
  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
  reactions: Array<{ emoji: string; userId: string }>;
  delivery: {
    delivered: boolean;
    seen: boolean;
  };
};

type SearchGlobalMessageResult = {
  chatId: string;
  chatTitle: string;
  chatType: string;
  counterpartUserId: string | null;
  counterpartUsername: string | null;
  counterpartAvatarMediaId: string | null;
  message: SearchMessageListItem;
};

type SearchProfileResult = {
  id: string;
  username: string;
  displayName: string;
  avatarMediaId: string | null;
};

@Controller()
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {}

  @Post('auth/register')
  register(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'identity',
        path: 'v1/auth/register',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('auth/verify-otp')
  verifyOtp(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'identity',
        path: 'v1/auth/verify-otp',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('auth/refresh')
  refresh(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'identity',
        path: 'v1/auth/refresh',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('auth/logout')
  logout(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'identity',
        path: 'v1/auth/logout',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Get('auth/sessions')
  @UseGuards(GatewayAuthGuard)
  listSessions(@Req() req: Request, @Res() res: Response, @Query() query: Record<string, string | string[]>) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'identity',
        path: 'v1/auth/sessions',
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
        query,
      }),
    );
  }

  @Delete('auth/sessions/:sessionId')
  @UseGuards(GatewayAuthGuard)
  revokeSession(@Req() req: Request, @Res() res: Response, @Param('sessionId') sessionId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'identity',
        path: `v1/auth/sessions/${sessionId}`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Delete('auth/sessions')
  @UseGuards(GatewayAuthGuard)
  revokeOtherSessions(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'identity',
        path: 'v1/auth/sessions',
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }


  @Get('me')
  @UseGuards(GatewayAuthGuard)
  getCurrentUserProfile(@Req() req: Request, @Res() res: Response) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: 'v1/me',
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Patch('me')
  @UseGuards(GatewayAuthGuard)
  updateCurrentUserProfile(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: 'v1/me',
        method: 'PATCH',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Patch('me/privacy')
  @UseGuards(GatewayAuthGuard)
  updateCurrentUserPrivacy(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: 'v1/me/privacy',
        method: 'PATCH',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Get('users/by-username/:username')
  resolveUserByUsername(@Req() req: Request, @Res() res: Response, @Param('username') username: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: `v1/users/by-username/${username}`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Get('profiles/by-phone/:phoneNumber')
  @UseGuards(GatewayAuthGuard)
  getProfileByPhoneNumber(
    @Req() req: Request,
    @Res() res: Response,
    @Param('phoneNumber') phoneNumber: string,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: `v1/profiles/by-phone/${phoneNumber}`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Get('profiles/:userId')
  getProfileByUserId(@Req() req: Request, @Res() res: Response, @Param('userId') userId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: `v1/profiles/${userId}`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Get('profiles/:userId/presence')
  @UseGuards(GatewayAuthGuard)
  getProfilePresenceByUserId(@Req() req: Request, @Res() res: Response, @Param('userId') userId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: `v1/profiles/${userId}/presence`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('me/blocks/:targetUserId')
  @UseGuards(GatewayAuthGuard)
  blockUser(@Req() req: Request, @Res() res: Response, @Param('targetUserId') targetUserId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: `v1/me/blocks/${targetUserId}`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Get('me/blocks')
  @UseGuards(GatewayAuthGuard)
  listBlockedUsers(@Req() req: Request, @Res() res: Response) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: 'v1/me/blocks',
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Delete('me/blocks/:targetUserId')
  @UseGuards(GatewayAuthGuard)
  unblockUser(@Req() req: Request, @Res() res: Response, @Param('targetUserId') targetUserId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'profile',
        path: `v1/me/blocks/${targetUserId}`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }


  @Post('media/upload-sessions')
  @UseGuards(GatewayAuthGuard)
  createMediaUploadSession(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'media',
        path: 'v1/media/upload-sessions',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('media/finalize')
  @UseGuards(GatewayAuthGuard)
  finalizeMediaUpload(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'media',
        path: 'v1/media/finalize',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Get('media/:mediaId')
  @UseGuards(GatewayAuthGuard)
  getMediaMetadata(@Req() req: Request, @Res() res: Response, @Param('mediaId') mediaId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'media',
        path: `v1/media/${mediaId}`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('contacts/import')
  @UseGuards(GatewayAuthGuard)
  importContacts(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'contacts',
        path: 'v1/contacts/import',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Get('contacts')
  @UseGuards(GatewayAuthGuard)
  listContacts(@Req() req: Request, @Res() res: Response) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'contacts',
        path: 'v1/contacts',
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Get('search/global')
  @Get('v1/search/global')
  @UseGuards(GatewayAuthGuard)
  async searchGlobal(
    @Req() req: Request,
    @Res() res: Response,
    @Query('q') rawQuery: string | undefined,
  ) {
    const requestId = this.getRequestId(req);
    const query = (rawQuery ?? '').trim();

    if (!query) {
      res.status(200);
      res.setHeader('content-type', 'application/json; charset=utf-8');
      res.setHeader('x-request-id', requestId);
      res.send(
        JSON.stringify({
          query: '',
          chats: [],
          contacts: [],
          usernameMatch: null,
          phoneMatch: null,
          messages: [],
        }),
      );
      return;
    }

    const chatsResponse = await this.forwardJson<{ items: SearchChatListItem[] }>(req, {
      target: 'chat',
      path: 'v1/chats',
      method: 'GET',
      requestId,
      headers: req.headers,
    });

    const contactsResponse = await this.forwardJson<{ items: SearchContactListItem[] }>(req, {
      target: 'contacts',
      path: 'v1/contacts',
      method: 'GET',
      requestId,
      headers: req.headers,
    });

    const chats = this.filterChatsByQuery(chatsResponse?.items ?? [], query).slice(0, 20);
    const contacts = this.filterContactsByQuery(contactsResponse?.items ?? [], query).slice(0, 8);
    const normalizedUsernameQuery = this.normalizeUsernameQuery(query);
    const normalizedPhoneQuery = this.normalizePhoneSearchQuery(query);

    const [usernameMatch, phoneMatch] = await Promise.all([
      normalizedUsernameQuery
        ? this.forwardJson<SearchProfileResult>(req, {
            target: 'profile',
            path: `v1/users/by-username/${normalizedUsernameQuery}`,
            method: 'GET',
            requestId,
            headers: req.headers,
          })
        : Promise.resolve(null),
      normalizedPhoneQuery
        ? this.forwardJson<SearchProfileResult>(req, {
            target: 'profile',
            path: `v1/profiles/by-phone/${encodeURIComponent(normalizedPhoneQuery)}`,
            method: 'GET',
            requestId,
            headers: req.headers,
          })
        : Promise.resolve(null),
    ]);

    const messageSearchCandidates = [...(chatsResponse?.items ?? [])]
      .sort((left, right) => this.getChatActivityTimestamp(right) - this.getChatActivityTimestamp(left))
      .slice(0, 20);

    const messages =
      query.length >= 2
        ? await this.searchMessagesAcrossChats(req, requestId, messageSearchCandidates, query)
        : [];

    res.status(200);
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.setHeader('x-request-id', requestId);
    res.send(
      JSON.stringify({
        query,
        chats,
        contacts,
        usernameMatch,
        phoneMatch,
        messages,
      }),
    );
  }

  @Post('contacts/matched-users')
  @UseGuards(GatewayAuthGuard)
  saveMatchedContact(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'contacts',
        path: 'v1/contacts/matched-users',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('notifications/devices')
  @UseGuards(GatewayAuthGuard)
  registerDevice(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'notification',
        path: 'v1/notifications/devices',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('chats/direct')
  @UseGuards(GatewayAuthGuard)
  createDirectChat(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: 'v1/chats/direct',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('chats/group')
  @UseGuards(GatewayAuthGuard)
  createGroupChat(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: 'v1/chats/group',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('chats/channel')
  @UseGuards(GatewayAuthGuard)
  createChannelChat(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: 'v1/chats/channel',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('chats/join-by-invite')
  @UseGuards(GatewayAuthGuard)
  joinByInvite(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: 'v1/chats/join-by-invite',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Get('chats')
  @UseGuards(GatewayAuthGuard)
  listChats(@Req() req: Request, @Res() res: Response, @Query() query: Record<string, string | string[]>) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: 'v1/chats',
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
        query,
      }),
    );
  }

  @Get('chats/:chatId/members')
  @UseGuards(GatewayAuthGuard)
  listMembers(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/members`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Get('chats/:chatId')
  @UseGuards(GatewayAuthGuard)
  getChat(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Get('chats/:chatId/invite-links')
  @UseGuards(GatewayAuthGuard)
  listInviteLinks(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/invite-links`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('chats/:chatId/invite-links')
  @UseGuards(GatewayAuthGuard)
  createInviteLink(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/invite-links`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Delete('chats/:chatId/invite-links/:inviteLinkId')
  @UseGuards(GatewayAuthGuard)
  revokeInviteLink(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Param('inviteLinkId') inviteLinkId: string,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/invite-links/${inviteLinkId}`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Patch('chats/:chatId')
  @UseGuards(GatewayAuthGuard)
  updateChat(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}`,
        method: 'PATCH',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Patch('chats/:chatId/permissions')
  @UseGuards(GatewayAuthGuard)
  updateChatPermissions(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/permissions`,
        method: 'PATCH',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('chats/:chatId/pin')
  @UseGuards(GatewayAuthGuard)
  pinChat(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/pin`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Delete('chats/:chatId/pin')
  @UseGuards(GatewayAuthGuard)
  unpinChat(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/pin`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('chats/:chatId/archive')
  @UseGuards(GatewayAuthGuard)
  archiveChat(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/archive`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Delete('chats/:chatId/archive')
  @UseGuards(GatewayAuthGuard)
  unarchiveChat(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/archive`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('chats/:chatId/mute')
  @UseGuards(GatewayAuthGuard)
  muteChat(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/mute`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Delete('chats/:chatId/mute')
  @UseGuards(GatewayAuthGuard)
  unmuteChat(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/mute`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Delete('chats/:chatId/self')
  @UseGuards(GatewayAuthGuard)
  deleteChatForSelf(@Req() req: Request, @Res() res: Response, @Param('chatId') chatId: string) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/self`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('chats/:chatId/members')
  @UseGuards(GatewayAuthGuard)
  addMembers(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/members`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Delete('chats/:chatId/members/:userId')
  @UseGuards(GatewayAuthGuard)
  removeMember(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/members/${userId}`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Patch('chats/:chatId/members/:userId/role')
  @UseGuards(GatewayAuthGuard)
  updateMemberRole(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Param('userId') userId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'chat',
        path: `v1/chats/${chatId}/members/${userId}/role`,
        method: 'PATCH',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('messages')
  @UseGuards(GatewayAuthGuard)
  sendMessage(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: 'v1/messages',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Patch('messages/:messageId')
  @UseGuards(GatewayAuthGuard)
  editMessage(
    @Req() req: Request,
    @Res() res: Response,
    @Param('messageId') messageId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: `v1/messages/${messageId}`,
        method: 'PATCH',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Delete('messages/:messageId')
  @UseGuards(GatewayAuthGuard)
  deleteMessage(
    @Req() req: Request,
    @Res() res: Response,
    @Param('messageId') messageId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: `v1/messages/${messageId}`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Get('chats/:chatId/messages')
  @UseGuards(GatewayAuthGuard)
  listMessages(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Query() query: Record<string, string | string[]>,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: `v1/chats/${chatId}/messages`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
        query,
      }),
    );
  }

  @Get('chats/:chatId/messages/search')
  @UseGuards(GatewayAuthGuard)
  searchMessages(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Query() query: Record<string, string | string[]>,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: `v1/chats/${chatId}/messages/search`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
        query,
      }),
    );
  }

  @Post('chats/:chatId/read')
  @UseGuards(GatewayAuthGuard)
  markRead(
    @Req() req: Request,
    @Res() res: Response,
    @Param('chatId') chatId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: `v1/chats/${chatId}/read`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Post('messages/:messageId/reactions')
  @UseGuards(GatewayAuthGuard)
  addReaction(
    @Req() req: Request,
    @Res() res: Response,
    @Param('messageId') messageId: string,
    @Body() body: unknown,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: `v1/messages/${messageId}/reactions`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Delete('messages/:messageId/reactions/:emoji')
  @UseGuards(GatewayAuthGuard)
  removeReaction(
    @Req() req: Request,
    @Res() res: Response,
    @Param('messageId') messageId: string,
    @Param('emoji') emoji: string,
  ) {
    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'message',
        path: `v1/messages/${messageId}/reactions/${emoji}`,
        method: 'DELETE',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('calls')
  @UseGuards(GatewayAuthGuard)
  startCall(@Req() req: Request, @Res() res: Response, @Body() body: unknown) {
    this.assertCallsEnabled();

    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'call',
        path: 'v1/calls',
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
        body,
      }),
    );
  }

  @Get('calls/:callId')
  @UseGuards(GatewayAuthGuard)
  getCall(@Req() req: Request, @Res() res: Response, @Param('callId') callId: string) {
    this.assertCallsEnabled();

    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'call',
        path: `v1/calls/${callId}`,
        method: 'GET',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('calls/:callId/accept')
  @UseGuards(GatewayAuthGuard)
  acceptCall(@Req() req: Request, @Res() res: Response, @Param('callId') callId: string) {
    this.assertCallsEnabled();

    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'call',
        path: `v1/calls/${callId}/accept`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('calls/:callId/decline')
  @UseGuards(GatewayAuthGuard)
  declineCall(@Req() req: Request, @Res() res: Response, @Param('callId') callId: string) {
    this.assertCallsEnabled();

    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'call',
        path: `v1/calls/${callId}/decline`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('calls/:callId/end')
  @UseGuards(GatewayAuthGuard)
  endCall(@Req() req: Request, @Res() res: Response, @Param('callId') callId: string) {
    this.assertCallsEnabled();

    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'call',
        path: `v1/calls/${callId}/end`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  @Post('calls/:callId/join')
  @UseGuards(GatewayAuthGuard)
  rejoinCall(@Req() req: Request, @Res() res: Response, @Param('callId') callId: string) {
    this.assertCallsEnabled();

    return this.respond(
      req,
      res,
      this.proxyService.forward({
        target: 'call',
        path: `v1/calls/${callId}/join`,
        method: 'POST',
        requestId: this.getRequestId(req),
        headers: req.headers,
      }),
    );
  }

  private getRequestId(req: Request): string {
    const headerValue = req.headers['x-request-id'];
    const requestId = Array.isArray(headerValue) ? headerValue[0] : headerValue;
    return requestId?.trim() || `req_${randomUUID()}`;
  }

  private assertCallsEnabled() {
    if (!(this.configService.get<boolean>('features.callsV1Enabled') ?? false)) {
      throw new NotFoundException('Calls feature is disabled');
    }
  }

  private async forwardJson<T>(
    req: Request,
    request: {
      target: Parameters<ProxyService['forward']>[0]['target'];
      path: string;
      method: string;
      requestId: string;
      headers: Record<string, string | string[] | undefined>;
      query?: Record<string, string | string[] | undefined>;
      body?: unknown;
    },
  ): Promise<T | null> {
    const result = await this.proxyService.forward(request);

    if (result.status < 200 || result.status >= 300) {
      return null;
    }

    try {
      return JSON.parse(result.body) as T;
    } catch {
      return null;
    }
  }

  private filterChatsByQuery(chats: SearchChatListItem[], query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    return chats.filter((chat) => {
      const haystack = [
        chat.summary.displayTitle,
        chat.summary.subtitle,
        chat.summary.secondarySubtitle ?? '',
        chat.summary.counterpartUsername ?? '',
        chat.summary.lastMessagePreview ?? '',
        chat.type,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }

  private filterContactsByQuery(contacts: SearchContactListItem[], query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    return contacts
      .filter((contact) => {
        const haystack = [
          contact.displayName,
          contact.username ?? '',
          contact.phoneNumber ?? '',
          contact.userId,
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(normalizedQuery);
      })
      .sort((left, right) => left.displayName.localeCompare(right.displayName));
  }

  private getChatActivityTimestamp(chat: SearchChatListItem) {
    return chat.summary.lastActivityAt ? new Date(chat.summary.lastActivityAt).getTime() : 0;
  }

  private normalizeUsernameQuery(value: string) {
    const normalizedValue = value.trim().replace(/^@+/, '');
    return normalizedValue.length >= 3 ? normalizedValue : '';
  }

  private normalizePhoneSearchQuery(value: string) {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return '';
    }

    const hasPhoneCharacters = /[+\d()\-\s]/.test(trimmed);
    const digits = trimmed.replace(/\D/g, '');

    if (!hasPhoneCharacters || digits.length < 6) {
      return '';
    }

    return `${trimmed.startsWith('+') ? '+' : '+'}${digits}`;
  }

  private async searchMessagesAcrossChats(
    req: Request,
    requestId: string,
    chats: SearchChatListItem[],
    query: string,
  ) {
    const settled = await Promise.all(
      chats.map(async (chat) => {
        const response = await this.forwardJson<{ items: SearchMessageListItem[] }>(req, {
          target: 'message',
          path: `v1/chats/${chat.id}/messages/search`,
          method: 'GET',
          requestId,
          headers: req.headers,
          query: {
            query,
            limit: '3',
          },
        });

        return (response?.items ?? []).map(
          (message): SearchGlobalMessageResult => ({
            chatId: chat.id,
            chatTitle: chat.summary.displayTitle,
            chatType: chat.type,
            counterpartUserId: chat.summary.counterpartUserId,
            counterpartUsername: chat.summary.counterpartUsername,
            counterpartAvatarMediaId: chat.summary.counterpartAvatarMediaId,
            message,
          }),
        );
      }),
    );

    return settled
      .flat()
      .sort((left, right) => new Date(right.message.createdAt).getTime() - new Date(left.message.createdAt).getTime())
      .slice(0, 20);
  }

  private async respond(
    req: Request,
    res: Response,
    forwardedResponse: Promise<{ status: number; headers: { contentType: string; requestId: string }; body: string }>,
  ) {
    const result = await forwardedResponse;
    res.status(result.status);
    res.setHeader('content-type', result.headers.contentType);
    res.setHeader('x-request-id', result.headers.requestId || this.getRequestId(req));
    res.send(result.body);
  }
}
