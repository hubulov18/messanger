import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

import type { GatewayRequestContext } from './request-context.type.js';
import { verifyAccessToken } from './jwt.js';

type GatewayRequest = Request & {
  gatewayRequestContext?: GatewayRequestContext;
};

@Injectable()
export class GatewayAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<GatewayRequest>();
    const authorization = this.readHeader(request, 'authorization');
    const deviceId = this.readHeader(request, 'x-device-id');
    const requestId = this.readHeader(request, 'x-request-id') ?? '';

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required.');
    }

    const accessToken = this.extractBearerToken(authorization);
    if (!accessToken) {
      throw new UnauthorizedException('Authorization header must use the Bearer scheme.');
    }

    if (!deviceId) {
      throw new BadRequestException('X-Device-Id header is required.');
    }

    const secret = this.configService.get<string>('auth.jwtAccessSecret');
    if (!secret) {
      throw new UnauthorizedException('Gateway JWT verification is not configured.');
    }

    let payload: { sub: string };
    try {
      payload = verifyAccessToken(accessToken, secret);
    } catch {
      throw new UnauthorizedException('Access token is invalid or expired.');
    }

    request.gatewayRequestContext = {
      userId: payload.sub,
      accessToken,
      deviceId,
      requestId,
    };

    return true;
  }

  private extractBearerToken(authorization: string): string | null {
    const [scheme, token] = authorization.split(' ');
    if (scheme !== 'Bearer' || !token?.trim()) {
      return null;
    }

    return token.trim();
  }

  private readHeader(request: Request, headerName: string): string | undefined {
    const value = request.headers[headerName];
    if (!value) {
      return undefined;
    }

    return Array.isArray(value) ? value[0] : value;
  }
}
