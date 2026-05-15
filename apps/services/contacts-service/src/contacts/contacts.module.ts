import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { IdentityServiceClient } from '../identity-client/identity-service.client.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import { ContactsController } from './contacts.controller.js';
import { InternalContactsController } from './internal-contacts.controller.js';
import { ContactsService } from './contacts.service.js';
import { ContactsRepository } from './repositories/contacts.repository.js';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ContactsController, InternalContactsController],
  providers: [ContactsService, ContactsRepository, IdentityServiceClient, ProfileServiceClient],
})
export class ContactsModule {}
