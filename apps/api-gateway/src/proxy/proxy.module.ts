import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProxyController } from './proxy.controller.js';
import { ProxyService } from './proxy.service.js';

@Module({
  imports: [ConfigModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
