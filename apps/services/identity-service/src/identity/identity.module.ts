import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { IdentityController } from './identity.controller.js';
import { InternalIdentityController } from './internal-identity.controller.js';
import { IdentityService } from './identity.service.js';
import { IdentityRepository } from './repositories/identity.repository.js';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [IdentityController, InternalIdentityController],
  providers: [IdentityService, IdentityRepository],
})
export class IdentityModule {}
