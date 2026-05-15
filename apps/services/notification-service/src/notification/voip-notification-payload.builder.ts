import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QueueIncomingVoipNotificationDto } from './dto/queue-incoming-voip-notification.dto.js';

export type ProviderMode = 'disabled' | 'dry_run' | 'apns';

export type PreparedIncomingVoipDispatch = {
  provider: 'voip_apns';
  providerMode: ProviderMode;
  topic: string | null;
  canQueue: boolean;
  reasonCode: string;
  expiresAt: string;
  payload: {
    aps: {
      'content-available': 1;
      sound: 'default';
      alert: {
        title: string;
        body: string;
      };
    };
    callId: string;
    chatId: string;
    callerUserId: string;
    displayName: string;
    call: {
      id: string;
      chatId: string;
      callerUserId: string;
      callerDisplayName: string;
      callerUsername?: string;
      callType: 'audio' | 'video';
      startedAt: string;
      ringTimeoutMs: number;
    };
  };
};

@Injectable()
export class VoipNotificationPayloadBuilder {
  constructor(private readonly configService: ConfigService) {}

  buildIncomingCall(body: QueueIncomingVoipNotificationDto): PreparedIncomingVoipDispatch {
    const providerMode = this.getProviderMode();
    const topic = (this.configService.get<string>('voip.apnsTopic') ?? '').trim() || null;
    const expiresAt = new Date(Date.parse(body.startedAt) + body.ringTimeoutMs).toISOString();
    const canQueue = providerMode !== 'disabled' && Boolean(topic);

    return {
      provider: 'voip_apns',
      providerMode,
      topic,
      canQueue,
      reasonCode: this.resolveReasonCode(providerMode, topic),
      expiresAt,
      payload: {
        aps: {
          'content-available': 1,
          sound: 'default',
          alert: {
            title: body.callerDisplayName,
            body: body.callType === 'video' ? 'Incoming video call' : 'Incoming voice call',
          },
        },
        callId: body.callId,
        chatId: body.chatId,
        callerUserId: body.callerUserId,
        displayName: body.callerDisplayName,
        call: {
          id: body.callId,
          chatId: body.chatId,
          callerUserId: body.callerUserId,
          callerDisplayName: body.callerDisplayName,
          ...(body.callerUsername ? { callerUsername: body.callerUsername } : {}),
          callType: body.callType,
          startedAt: body.startedAt,
          ringTimeoutMs: body.ringTimeoutMs,
        },
      },
    };
  }

  private getProviderMode(): ProviderMode {
    const configuredMode = this.configService.get<string>('voip.providerMode');

    if (configuredMode === 'apns') {
      return 'apns';
    }

    return configuredMode === 'dry_run' ? 'dry_run' : 'disabled';
  }

  private resolveReasonCode(providerMode: ProviderMode, topic: string | null) {
    if (!topic) {
      return 'missing_voip_topic';
    }

    if (providerMode === 'apns') {
      return 'prepared_for_provider';
    }

    return providerMode === 'dry_run' ? 'queued_for_provider_dry_run' : 'voip_provider_disabled';
  }
}
