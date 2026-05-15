import { Module } from '@nestjs/common';

import { GatewayAuthGuard } from './gateway-auth.guard.js';

@Module({
  providers: [GatewayAuthGuard],
  exports: [GatewayAuthGuard],
})
export class AuthModule {}
