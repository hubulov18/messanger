import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { appConfig } from './app.config.js';
import { validateEnv } from './env.validation.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const serviceRoot = resolve(currentDir, '../..');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      validate: validateEnv,
    }),
  ],
})
export class AppConfigModule {}
