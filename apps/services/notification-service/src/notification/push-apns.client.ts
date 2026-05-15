import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { connect, type ClientHttp2Session, constants } from 'node:http2';

type ApnsCredentials =
  | { ok: true; keyId: string; teamId: string; privateKeyPem: string; useSandbox: boolean }
  | { ok: false; reasonCode: string };

export type PreparedAlertDispatch = {
  topic: string;
  payload: {
    aps: {
      alert: { title: string; body: string };
      sound: 'default';
      badge?: number;
    };
    chatId: string;
    messageId: string;
  };
};

export type AlertSendResult = {
  sentCount: number;
  failedCount: number;
  reasonCode: string;
  revokedTokens: string[];
};

@Injectable()
export class PushApnsClient {
  private readonly logger = new Logger(PushApnsClient.name);

  constructor(private readonly configService: ConfigService) {}

  async sendMessageNotification(params: {
    pushTokens: string[];
    dispatch: PreparedAlertDispatch;
  }): Promise<AlertSendResult> {
    if (params.pushTokens.length === 0) {
      return { sentCount: 0, failedCount: 0, reasonCode: 'no_tokens', revokedTokens: [] };
    }

    const credentials = await this.resolveCredentials();
    if (!credentials.ok) {
      return {
        sentCount: 0,
        failedCount: params.pushTokens.length,
        reasonCode: credentials.reasonCode,
        revokedTokens: [],
      };
    }

    const authorization = `bearer ${this.createProviderToken(credentials)}`;
    const host = credentials.useSandbox ? 'https://api.sandbox.push.apple.com' : 'https://api.push.apple.com';
    const session = connect(host);
    const revokedTokens: string[] = [];
    let sentCount = 0;
    let failedCount = 0;
    let firstFailureReason: string | null = null;

    try {
      await this.waitForConnect(session);

      for (const token of params.pushTokens) {
        const result = await this.sendRequest(session, {
          authorization,
          topic: params.dispatch.topic,
          deviceToken: token,
          payload: params.dispatch.payload,
        });

        if (result.ok) {
          sentCount += 1;
        } else {
          failedCount += 1;
          firstFailureReason ??= result.reasonCode;
          if (result.shouldRevoke) {
            revokedTokens.push(token);
          }
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

    this.logger.log(
      JSON.stringify({
        event: 'push_notification_apns_dispatch',
        provider: 'alert_apns',
        host,
        topic: params.dispatch.topic,
        sentCount,
        failedCount,
        reasonCode,
      }),
    );

    return { sentCount, failedCount, reasonCode, revokedTokens };
  }

  private async resolveCredentials(): Promise<ApnsCredentials> {
    const keyId = (this.configService.get<string>('push.apnsKeyId') ?? '').trim();
    const teamId = (this.configService.get<string>('push.apnsTeamId') ?? '').trim();
    const inlineAuthKey = (this.configService.get<string>('push.apnsAuthKey') ?? '').trim();
    const authKeyPath = (this.configService.get<string>('push.apnsAuthKeyPath') ?? '').trim();
    const useSandbox = this.configService.get<boolean>('push.useSandbox') ?? true;

    if (!keyId || !teamId) {
      return { ok: false, reasonCode: 'missing_apns_credentials' };
    }

    let privateKeyPem = inlineAuthKey;
    if (!privateKeyPem && authKeyPath) {
      try {
        privateKeyPem = await readFile(authKeyPath, 'utf8');
      } catch {
        return { ok: false, reasonCode: 'invalid_apns_auth_key' };
      }
    }

    if (!privateKeyPem) {
      return { ok: false, reasonCode: 'missing_apns_credentials' };
    }

    return { ok: true, keyId, teamId, privateKeyPem, useSandbox };
  }

  private createProviderToken(credentials: Extract<ApnsCredentials, { ok: true }>) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const header = this.base64UrlEncode(JSON.stringify({ alg: 'ES256', kid: credentials.keyId }));
    const payload = this.base64UrlEncode(JSON.stringify({ iss: credentials.teamId, iat: issuedAt }));
    const unsignedToken = `${header}.${payload}`;
    const signature = sign('sha256', Buffer.from(unsignedToken), credentials.privateKeyPem);
    return `${unsignedToken}.${this.base64UrlEncode(signature)}`;
  }

  private base64UrlEncode(input: string | Buffer) {
    return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  private waitForConnect(session: ClientHttp2Session) {
    if (!session.connecting) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      const cleanup = () => {
        session.off('connect', handleConnect);
        session.off('error', handleError);
      };
      const handleConnect = () => { cleanup(); resolve(); };
      const handleError = (error: Error) => { cleanup(); reject(error); };
      session.once('connect', handleConnect);
      session.once('error', handleError);
    });
  }

  private sendRequest(
    session: ClientHttp2Session,
    params: { authorization: string; topic: string; deviceToken: string; payload: PreparedAlertDispatch['payload'] },
  ) {
    return new Promise<{ ok: true } | { ok: false; reasonCode: string; shouldRevoke: boolean }>((resolve, reject) => {
      const request = session.request({
        [constants.HTTP2_HEADER_METHOD]: 'POST',
        [constants.HTTP2_HEADER_PATH]: `/3/device/${params.deviceToken}`,
        authorization: params.authorization,
        'apns-topic': params.topic,
        'apns-push-type': 'alert',
        'apns-priority': '10',
        'content-type': 'application/json',
      });

      let statusCode = 0;
      let rawBody = '';
      request.setEncoding('utf8');
      request.on('response', (headers) => { statusCode = Number(headers[constants.HTTP2_HEADER_STATUS] ?? 0); });
      request.on('data', (chunk: string) => { rawBody += chunk; });
      request.on('error', reject);
      request.on('end', () => {
        if (statusCode === 200) {
          resolve({ ok: true });
          return;
        }

        let apnsReason: string | null = null;
        try { apnsReason = (JSON.parse(rawBody) as { reason?: string }).reason ?? null; } catch { /* ignore */ }

        const shouldRevoke = apnsReason === 'Unregistered' || apnsReason === 'BadDeviceToken';
        const reasonCode = apnsReason ? `apns_${apnsReason}` : `apns_http_${statusCode}`;
        resolve({ ok: false, reasonCode, shouldRevoke });
      });

      request.end(JSON.stringify(params.payload));
    });
  }
}
