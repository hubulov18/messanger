import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import type { GatewayRequestContext } from './request-context.type.js';

type GatewayRequest = Request & {
  gatewayRequestContext?: GatewayRequestContext;
};

export const GatewayRequestContextDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext): GatewayRequestContext => {
    const request = context.switchToHttp().getRequest<GatewayRequest>();

    return request.gatewayRequestContext ?? {
      userId: '',
      accessToken: '',
      deviceId: '',
      requestId: '',
    };
  },
);
