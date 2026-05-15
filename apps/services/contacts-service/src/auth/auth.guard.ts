import { CanActivate, Injectable, UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { CurrentUser } from './current-user.type.js';
import { verifyAccessToken } from './jwt.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | string[] | undefined>;
      user?: CurrentUser;
    }>();
    const authorization = request.headers.authorization;
    const headerValue = Array.isArray(authorization) ? authorization[0] : authorization;

    if (!headerValue?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const accessToken = headerValue.slice('Bearer '.length).trim();
    const secret = this.configService.get<string>('auth.jwtAccessSecret');
    if (!secret) {
      throw new UnauthorizedException('JWT secret is not configured');
    }

    try {
      const payload = verifyAccessToken(accessToken, secret);
      request.user = {
        userId: payload.sub,
        accessToken,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
