import { Controller, Get, Param, Query } from '@nestjs/common';

import { ContactsService } from './contacts.service.js';

@Controller('internal')
export class InternalContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('contacts/:ownerUserId/is-contact')
  isMatchedContact(@Param('ownerUserId') ownerUserId: string, @Query('candidateUserId') candidateUserId: string) {
    return this.contactsService.isMatchedContact(ownerUserId, candidateUserId);
  }
}
