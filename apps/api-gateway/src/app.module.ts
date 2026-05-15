import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module.js';
import { AppConfigModule } from './config/app-config.module.js';
import { HealthModule } from './health/health.module.js';
import { ProxyModule } from './proxy/proxy.module.js';
import { RealtimeModule } from './realtime/realtime.module.js';

@Module({
  imports: [AuthModule, AppConfigModule, HealthModule, ProxyModule, RealtimeModule],
})
export class AppModule {}
