import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile } from 'node:fs/promises';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getMessaging, type MulticastMessage } from 'firebase-admin/messaging';

type FcmCredentials =
  | { ok: true; app: App }
  | { ok: false; reasonCode: string };

export type FcmSendResult = {
  sentCount: number;
  failedCount: number;
  reasonCode: string;
  revokedTokens: string[];
};

@Injectable()
export class FcmClient {
  private readonly logger = new Logger(FcmClient.name);
  private appPromise: Promise<App | null> | null = null;

  constructor(private readonly configService: ConfigService) {}

  async sendMulticast(message: MulticastMessage, logContext: Record<string, unknown>): Promise<FcmSendResult> {
    const tokens = message.tokens ?? [];
    if (tokens.length === 0) {
      return { sentCount: 0, failedCount: 0, reasonCode: 'no_tokens', revokedTokens: [] };
    }

    const credentials = await this.resolveCredentials();
    if (!credentials.ok) {
      return {
        sentCount: 0,
        failedCount: tokens.length,
        reasonCode: credentials.reasonCode,
        revokedTokens: [],
      };
    }

    const response = await getMessaging(credentials.app).sendEachForMulticast(message);
    const revokedTokens: string[] = [];
    let firstFailureReason: string | null = null;

    response.responses.forEach((entry, index) => {
      if (entry.success) {
        return;
      }

      const errorCode = entry.error?.code ?? 'messaging/unknown-error';
      firstFailureReason ??= errorCode.replaceAll('/', '_');
      if (
        errorCode === 'messaging/registration-token-not-registered'
        || errorCode === 'messaging/invalid-registration-token'
      ) {
        revokedTokens.push(tokens[index] ?? '');
      }
    });

    const sentCount = response.successCount;
    const failedCount = response.failureCount;
    const reasonCode =
      sentCount === 0
        ? firstFailureReason ?? 'fcm_delivery_failed'
        : failedCount > 0
          ? 'partial_send_failure'
          : 'sent_to_provider';

    this.logger.log(
      JSON.stringify({
        event: 'fcm_dispatch',
        sentCount,
        failedCount,
        reasonCode,
        ...logContext,
      }),
    );

    return {
      sentCount,
      failedCount,
      reasonCode,
      revokedTokens: revokedTokens.filter(Boolean),
    };
  }

  private async resolveCredentials(): Promise<FcmCredentials> {
    const app = await this.getOrCreateApp();
    if (!app) {
      return { ok: false, reasonCode: 'missing_fcm_credentials' };
    }

    return { ok: true, app };
  }

  private async getOrCreateApp(): Promise<App | null> {
    if (!this.appPromise) {
      this.appPromise = this.createApp();
    }

    return this.appPromise;
  }

  private async createApp(): Promise<App | null> {
    const inlineServiceAccount = (this.configService.get<string>('fcm.serviceAccountJson') ?? '').trim();
    const serviceAccountPath = (this.configService.get<string>('fcm.serviceAccountPath') ?? '').trim();

    let rawJson = inlineServiceAccount;
    if (!rawJson && serviceAccountPath) {
      try {
        rawJson = await readFile(serviceAccountPath, 'utf8');
      } catch (error) {
        const message = error instanceof Error ? error.message : 'unknown error';
        this.logger.warn(`Unable to read FCM service account from ${serviceAccountPath}: ${message}`);
        return null;
      }
    }

    if (!rawJson) {
      return null;
    }

    try {
      const serviceAccount = JSON.parse(rawJson) as {
        project_id?: string;
        client_email?: string;
        private_key?: string;
      };
      if (!serviceAccount.project_id || !serviceAccount.client_email || !serviceAccount.private_key) {
        this.logger.warn('FCM service account JSON is missing required fields');
        return null;
      }

      const appName = `notification-service-${serviceAccount.project_id ?? 'default'}`;
      const existingApp = getApps().find((entry) => entry.name === appName);
      if (existingApp) {
        return existingApp;
      }

      return initializeApp(
        {
          credential: cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key.replace(/\\n/g, '\n'),
          }),
        },
        appName,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      this.logger.warn(`Unable to initialize Firebase Admin SDK: ${message}`);
      return null;
    }
  }
}
