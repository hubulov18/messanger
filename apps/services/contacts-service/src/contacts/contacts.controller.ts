import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUserParam } from '../auth/current-user.decorator.js';
import type { CurrentUser } from '../auth/current-user.type.js';
import { ImportContactsDto } from './dto/import-contacts.dto.js';
import { SaveMatchedContactDto } from './dto/save-matched-contact.dto.js';
import { ContactsService } from './contacts.service.js';

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('import')
  importContacts(@CurrentUserParam() currentUser: CurrentUser, @Body() body: ImportContactsDto) {
    return this.contactsService.importContacts(currentUser, body);
  }

  @Get()
  listContacts(@CurrentUserParam() currentUser: CurrentUser) {
    return this.contactsService.listContacts(currentUser);
  }

  @Post('matched-users')
  saveMatchedContact(@CurrentUserParam() currentUser: CurrentUser, @Body() body: SaveMatchedContactDto) {
    return this.contactsService.saveMatchedContact(currentUser, body.userId);
  }
}
