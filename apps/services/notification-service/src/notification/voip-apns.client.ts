import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { connect, type ClientHttp2Session, constants } from 'node:http2';

import type { DeviceRegistration } from '../generated/prisma/client.js';
import type { PreparedIncomingVoipDispatch } from './voip-notification-payload.builder.js';

type ApnsSendResult = {
  sentCount: number;
  failedCount: number;
  reasonCode: string;
  revokedRegistrationIds: string[];
};

type ApnsCredentials =
  | {
      ok: true;
      keyId: string;
      teamId: string;
      privateKeyPem: string;
      useSandbox: boolean;
    }
  | {
      ok: false;
      reasonCode: string;
    };

@Injectable()
export class VoipApnsClient {
  private readonly logger = new Logger(VoipApnsClient.name);

  constructor(private readonly configService: ConfigService) {}

  async sendIncomingCall(params: {
    devices: DeviceRegistration[];
    preparedDispatch: PreparedIncomingVoipDispatch;
  }): Promise<ApnsSendResult> {
    const credentials = await this.resolveCredentials();
    if (!credentials.ok) {
      return {
        sentCount: 0,
        failedCount: params.devices.length,
        reasonCode: credentials.reasonCode,
        revokedRegistrationIds: [],
      };
    }

    const topic = params.preparedDispatch.topic;
    if (!topic) {
      return {
        sentCount: 0,
        failedCount: params.devices.length,
        reasonCode: 'missing_voip_topic',
        revokedRegistrationIds: [],
      };
    }

    const authorization = `bearer ${this.createProviderToken(credentials)}`;
    const host = credentials.useSandbox ? 'https://api.sandbox.push.apple.com' : 'https://api.push.apple.com';
    const session = connect(host);
    const revokedRegistrationIds: string[] = [];
    let sentCount = 0;
    let failedCount = 0;
    let firstFailureReason: string | null = null;

    try {
      await this.waitForConnect(session);

      for (const device of params.devices) {
        const voipPushToken = device.voipPushToken?.trim();
        if (!voipPushToken) {
          failedCount += 1;
          firstFailureReason ??= 'missing_voip_registration';
          continue;
        }

        const response = await this.sendPushRequest(session, {
          authorization,
          topic,
          deviceToken: voipPushToken,
          expiration: params.preparedDispatch.expiresAt,
          payload: params.preparedDispatch.payload,
        });

        if (response.ok) {
          sentCount += 1;
          continue;
        }

        failedCount += 1;
        firstFailureReason ??= response.reasonCode;

        if (response.shouldRevokeRegistration) {
          revokedRegistrationIds.push(device.id);
        }
      }
    } finally {
      session.close();
    }

    const reasonCode =
      sentCount === 0
        ? firstFailureReason ?? 'apns_delivery_failed'
        : failedCount > 0
          ? 'partial_send_failure'
          : 'sent_to_provider';

    if (sentCount > 0 || failedCount > 0) {
      this.logger.log(
        JSON.stringify({
          event: 'voip_notification_apns_dispatch',
          provider: 'voip_apns',
          host,
          topic,
          sentCount,
          failedCount,
          reasonCode,
        }),
      );
    }

    return {
      sentCount,
      failedCount,
      reasonCode,
      revokedRegistrationIds,
    };
  }

  private async resolveCredentials(): Promise<ApnsCredentials> {
    const keyId = (this.configService.get<string>('voip.apnsKeyId') ?? '').trim();
    const teamId = (this.configService.get<string>('voip.apnsTeamId') ?? '').trim();
    const inlineAuthKey = (this.configService.get<string>('voip.apnsAuthKey') ?? '').trim();
    const authKeyPath = (this.configService.get<string>('voip.apnsAuthKeyPath') ?? '').trim();
    const useSandbox = this.configService.get<boolean>('voip.useSandbox') ?? true;

    if (!keyId || !teamId) {
      return {
        ok: false,
        reasonCode: 'missing_apns_credentials',
      };
    }

    let privateKeyPem = inlineAuthKey;
    if (!privateKeyPem && authKeyPath) {
      try {
        privateKeyPem = await readFile(authKeyPath, 'utf8');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown error';
        this.logger.warn(`Unable to read APNs auth key from ${authKeyPath}: ${message}`);
        return {
          ok: false,
          reasonCode: 'invalid_apns_auth_key',
        };
      }
    }

    if (!privateKeyPem) {
      return {
        ok: false,
        reasonCode: 'missing_apns_credentials',
      };
    }

    return {
      ok: true,
      keyId,
      teamId,
      privateKeyPem,
      useSandbox,
    };
  }

  private createProviderToken(credentials: Extract<ApnsCredentials, { ok: true }>) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const header = this.base64UrlEncode(
      JSON.stringify({
        alg: 'ES256',
        kid: credentials.keyId,
      }),
    );
    const payload = this.base64UrlEncode(
      JSON.stringify({
        iss: credentials.teamId,
        iat: issuedAt,
      }),
    );
    const unsignedToken = `${header}.${payload}`;
    const signature = sign('sha256', Buffer.from(unsignedToken), credentials.privateKeyPem);

    return `${unsignedToken}.${this.base64UrlEncode(signature)}`;
  }

  private base64UrlEncode(input: string | Buffer) {
    return Buffer.from(input)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }

  private waitForConnect(session: ClientHttp2Session) {
    if (!session.connecting) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const handleConnect = () => {
        cleanup();
        resolve();
      };
      const handleError = (error: Error) => {
        cleanup();
        reject(error);
      };
      const cleanup = () => {
        session.off('connect', handleConnect);
        session.off('error', handleError);
      };

      session.once('connect', handleConnect);
      session.once('error', handleError);
    });
  }

  private sendPushRequest(
    session: ClientHttp2Session,
    params: {
      authorization: string;
      topic: string;
      deviceToken: string;
      expiration: string;
      payload: PreparedIncomingVoipDispatch['payload'];
    },
  ) {
    return new Promise<
      | {
          ok: true;
        }
      | {
          ok: false;
          reasonCode: string;
          shouldRevokeRegistration: boolean;
        }
    >((resolve, reject) => {
      const request = session.request({
        [constants.HTTP2_HEADER_METHOD]: 'POST',
        [constants.HTTP2_HEADER_PATH]: `/3/device/${params.deviceToken}`,
        authorization: params.authorization,
        'apns-topic': params.topic,
        'apns-push-type': 'voip',
        'apns-priority': '10',
        'apns-expiration': `${Math.floor(Date.parse(params.expiration) / 1000)}`,
        'content-type': 'application/json',
      });

      let statusCode = 0;
      let rawBody = '';

      request.setEncoding('utf8');
      request.on('response', (headers) => {
        statusCode = Number(headers[constants.HTTP2_HEADER_STATUS] ?? 0);
      });
      request.on('data', (chunk: string) => {
        rawBody += chunk;
      });
      request.on('error', reject);
      request.on('end', () => {
        if (statusCode === 200) {
          resolve({ ok: true });
          return;
        }

        const apnsReason = this.parseApnsReason(rawBody);
        resolve({
          ok: false,
          reasonCode: this.mapFailureReason(statusCode, apnsReason),
          shouldRevokeRegistration: apnsReason === 'Unregistered',
        });
      });
      request.end(JSON.stringify(params.payload));
    });
  }

  private parseApnsReason(rawBody: string) {
    if (!rawBody) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawBody) as { reason?: string };
      return parsed.reason ?? null;
    } catch {
      return null;
    }
  }

  private mapFailureReason(statusCode: number, apnsReason: string | null) {
    if (apnsReason === 'Unregistered') {
      return 'unregistered_voip_token';
    }

    if (apnsReason === 'BadDeviceToken') {
      return 'invalid_voip_token';
    }

    if (
      apnsReason === 'MissingProviderToken' ||
      apnsReason === 'InvalidProviderToken' ||
      apnsReason === 'ExpiredProviderToken' ||
      statusCode === 403
    ) {
      return 'apns_auth_error';
    }

    if (statusCode === 429) {
      return 'apns_rate_limited';
    }

    if (statusCode === 500 || statusCode === 503) {
      return 'apns_unavailable';
    }

    return apnsReason ? `apns_${apnsReason}` : 'apns_delivery_failed';
  }
}
