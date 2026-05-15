import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { ChatServiceClient } from '../chat-client/chat-service.client.js';
import { ContactsServiceClient } from '../contacts-client/contacts-service.client.js';
import { IdentityServiceClient } from '../identity-client/identity-service.client.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { InternalProfileController } from './internal-profile.controller.js';
import { ProfileController } from './profile.controller.js';
import { ProfileService } from './profile.service.js';
import { ProfileRepository } from './repositories/profile.repository.js';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ProfileController, InternalProfileController],
  providers: [ProfileService, ProfileRepository, IdentityServiceClient, ContactsServiceClient, ChatServiceClient],
})
export class ProfileModule {}
