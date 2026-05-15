import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hashNormalizedContactPhoneNumber, hashSensitiveValue, normalizeContactPhoneNumber } from '@telegram/shared';
import { SessionClientType } from '../generated/prisma/client.js';
import { randomBytes, randomUUID } from 'node:crypto';

import type { CurrentUser } from '../auth/current-user.type.js';
import { signAccessToken } from '../auth/jwt.js';
import { ListSessionsDto } from './dto/list-sessions.dto.js';
import { LogoutDto } from './dto/logout.dto.js';
import { RevokeOtherSessionsDto } from './dto/revoke-other-sessions.dto.js';
import { RefreshSessionDto } from './dto/refresh-session.dto.js';
import { StartRegistrationDto } from './dto/start-registration.dto.js';
import { VerifyOtpDto } from './dto/verify-otp.dto.js';
import { FindContactMatchesDto } from './dto/find-contact-matches.dto.js';
import { hasOtpAttemptsRemaining, resolveOtpCode, shouldThrottleOtpChallenge } from './otp-policy.js';
import { IdentityRepository } from './repositories/identity.repository.js';

@Injectable()
export class IdentityService {
  constructor(
    private readonly identityRepository: IdentityRepository,
    private readonly configService: ConfigService,
  ) {}

  async startRegistration(body: StartRegistrationDto) {
    const normalizedPhoneNumber = normalizeContactPhoneNumber(body.phoneNumber);
    const resendCooldownMs = (this.configService.get<number>('auth.otpResendCooldownSeconds') ?? 30) * 1000;
    const latestChallenge = await this.identityRepository.findLatestActiveOtpChallenge({
      phoneNumber: normalizedPhoneNumber,
    });

    if (latestChallenge) {
      const retryAfterSeconds = shouldThrottleOtpChallenge({
        latestChallengeCreatedAt: latestChallenge.createdAt,
        resendCooldownMs,
      });
      if (retryAfterSeconds !== null) {
        throw new ConflictException({
          message: 'OTP challenge was already issued recently',
          details: {
            reason: 'otp_resend_cooldown',
            retryAfterSeconds,
          },
        });
      }
    }

    const challengeId = `otp_${randomUUID()}`;
    const expiresAt = new Date(
      Date.now() + (this.configService.get<number>('auth.otpTtlSeconds') ?? 300) * 1000,
    );
    const otpCode = resolveOtpCode({
      devOtpEnabled: this.isDevOtpEnabled(),
      devOtpCode: this.configService.get<string>('auth.devOtpCode') ?? '123456',
    });

    await this.identityRepository.upsertOtpChallenge({
      challengeId,
      phoneNumber: normalizedPhoneNumber,
      codeHash: this.hashValue(otpCode),
      expiresAt,
    });

    return {
      challengeId,
      expiresAt: expiresAt.toISOString(),
      ...(this.isDevOtpEnabled() ? { debugCode: otpCode } : {}),
    };
  }

  async verifyOtp(body: VerifyOtpDto) {
    const challenge = await this.identityRepository.findOtpChallenge(body.challengeId);

    if (!challenge) {
      throw new NotFoundException('OTP challenge not found');
    }

    if (challenge.consumedAt) {
      throw new BadRequestException('OTP challenge has already been consumed');
    }

    if (challenge.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException('OTP challenge has expired');
    }

    const otpMaxAttempts = this.configService.get<number>('auth.otpMaxAttempts') ?? 5;
    if (!hasOtpAttemptsRemaining(challenge.attemptCount, otpMaxAttempts)) {
      throw new UnauthorizedException('OTP challenge attempt limit exceeded');
    }

    if (challenge.codeHash !== this.hashValue(body.code)) {
      const updatedChallenge = await this.identityRepository.incrementOtpChallengeAttempts(challenge.id);
      if (!hasOtpAttemptsRemaining(updatedChallenge.attemptCount, otpMaxAttempts)) {
        throw new UnauthorizedException('OTP challenge attempt limit exceeded');
      }
      throw new UnauthorizedException('Invalid OTP code');
    }

    const verifiedAt = new Date();
    const normalizedPhoneNumber = normalizeContactPhoneNumber(challenge.target);
    const refreshToken = this.generateOpaqueToken('rt');
    const refreshTokenHash = this.hashValue(refreshToken);
    const account = await this.identityRepository.findAccountByPhoneNumber(normalizedPhoneNumber);

    const result = await this.identityRepository.completeOtpAuthentication({
      challengeId: challenge.id,
      phoneNumber: normalizedPhoneNumber,
      phoneNumberHash: hashNormalizedContactPhoneNumber(normalizedPhoneNumber),
      existingAccount: account,
      deviceId: body.deviceId,
      clientType: this.mapClientType(body.clientType),
      refreshTokenHash,
      verifiedAt,
    });

    return {
      accessToken: this.generateAccessToken(result.userId),
      refreshToken,
      user: {
        id: result.userId,
        isNewUser: result.isNewUser,
      },
    };
  }

  async refreshSession(body: RefreshSessionDto) {
    const session = await this.identityRepository.findSessionByRefreshTokenHash(
      this.hashValue(body.refreshToken),
    );

    if (!session || session.revokedAt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (session.deviceId !== body.deviceId) {
      throw new UnauthorizedException('Refresh token does not belong to this device');
    }

    const nextRefreshToken = this.generateOpaqueToken('rt');
    await this.identityRepository.rotateSessionRefreshToken({
      sessionId: session.id,
      refreshTokenHash: this.hashValue(nextRefreshToken),
      lastSeenAt: new Date(),
    });

    return {
      accessToken: this.generateAccessToken(session.userAccount.id),
      refreshToken: nextRefreshToken,
    };
  }

  async logout(body: LogoutDto) {
    const session = await this.identityRepository.findSessionByRefreshTokenHash(
      this.hashValue(body.refreshToken),
    );

    if (!session || session.revokedAt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.identityRepository.revokeSession(session.id, new Date());

    return {
      success: true,
    };
  }

  async listSessions(currentUser: CurrentUser, _query: ListSessionsDto, currentDeviceId?: string | null) {
    const sessions = await this.identityRepository.listSessions(currentUser.userId);

    return {
      items: sessions.map((session) => ({
        id: session.id,
        clientType: session.clientType,
        deviceId: session.deviceId,
        lastSeenAt: session.lastSeenAt?.toISOString() ?? null,
        current: currentDeviceId ? session.deviceId === currentDeviceId : false,
      })),
    };
  }

  async findContactMatches(body: FindContactMatchesDto) {
    const hashes = [...new Set(body.hashes.map((hash) => hash.trim()).filter((hash) => hash.length > 0))];
    const accounts = await this.identityRepository.findAccountsByPhoneNumberHashes(hashes);

    return {
      matches: accounts
        .filter((account) => account.phoneNumberHash)
        .map((account) => ({
          normalizedHash: account.phoneNumberHash as string,
          userId: account.id,
        })),
    };
  }

  async revokeSession(currentUser: CurrentUser, sessionId: string) {
    const session = await this.identityRepository.findSessionById(sessionId);

    if (!session || session.revokedAt || session.userAccountId !== currentUser.userId) {
      throw new NotFoundException('Session not found');
    }

    await this.identityRepository.revokeSession(session.id, new Date());

    return {
      success: true,
    };
  }

  async revokeOtherSessions(currentUser: CurrentUser, body: RevokeOtherSessionsDto, currentDeviceId?: string | null) {
    const revokedSessions = await this.identityRepository.revokeSessionsExceptSelection({
      userAccountId: currentUser.userId,
      keepSessionId: body.keepSessionId ?? null,
      currentDeviceId: currentDeviceId ?? null,
      revokedAt: new Date(),
    });

    return {
      success: true,
      revokedCount: revokedSessions.length,
    };
  }

  async getLastSeen(userId: string) {
    const lastSeenAt = await this.identityRepository.getLatestSessionActivity(userId);

    return {
      userId,
      lastSeenAt: lastSeenAt?.toISOString() ?? null,
    };
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    const normalizedPhoneNumber = normalizeContactPhoneNumber(phoneNumber);
    const account = await this.identityRepository.findAccountByPhoneNumber(normalizedPhoneNumber);

    return {
      userId: account?.id ?? null,
    };
  }

  private mapClientType(clientType: VerifyOtpDto['clientType']): SessionClientType {
    switch (clientType) {
      case 'ios':
        return SessionClientType.ios;
      case 'android':
        return SessionClientType.android;
      case 'web':
        return SessionClientType.web;
      case 'desktop':
        return SessionClientType.desktop;
      default:
        return SessionClientType.unknown;
    }
  }

  private generateAccessToken(userId: string): string {
    const secret = this.configService.get<string>('auth.jwtAccessSecret');
    const ttlSeconds = this.configService.get<number>('auth.jwtAccessTtlSeconds') ?? 900;

    if (!secret) {
      throw new Error('JWT access secret is not configured');
    }

    return signAccessToken({
      userId,
      secret,
      ttlSeconds,
    });
  }


  private hashValue(value: string): string {
    return hashSensitiveValue(value);
  }

  private generateOpaqueToken(prefix: string): string {
    return `${prefix}_${randomBytes(32).toString('hex')}`;
  }

  private isDevOtpEnabled() {
    return this.configService.get<boolean>('auth.devOtpEnabled') ?? false;
  }

}
