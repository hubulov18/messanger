import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { CurrentUser } from '../auth/current-user.type.js';
import { NotificationDeliveryStatus } from '../generated/prisma/client.js';
import { RegisterDeviceDto } from './dto/register-device.dto.js';
import { QueueIncomingVoipNotificationDto } from './dto/queue-incoming-voip-notification.dto.js';
import { QueueMessageNotificationDto } from './dto/queue-message-notification.dto.js';
import { ChatServiceClient } from './chat-service.client.js';
import { NotificationRepository } from './repositories/notification.repository.js';
import { FcmClient } from './fcm.client.js';
import { PushApnsClient } from './push-apns.client.js';
import { VoipApnsClient } from './voip-apns.client.js';
import { VoipNotificationPayloadBuilder } from './voip-notification-payload.builder.js';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly voipNotificationPayloadBuilder: VoipNotificationPayloadBuilder,
    private readonly voipApnsClient: VoipApnsClient,
    private readonly pushApnsClient: PushApnsClient,
    private readonly fcmClient: FcmClient,
    private readonly chatServiceClient: ChatServiceClient,
    private readonly configService: ConfigService,
  ) {}

  async registerDevice(currentUser: CurrentUser, body: RegisterDeviceDto) {
    const registration = await this.notificationRepository.registerDevice({
      userId: currentUser.userId,
      platform: body.platform,
      deviceId: body.deviceId,
      ...(body.pushToken !== undefined ? { pushToken: body.pushToken } : {}),
      ...(body.voipPushToken !== undefined ? { voipPushToken: body.voipPushToken } : {}),
      ...(body.appVersion !== undefined ? { appVersion: body.appVersion } : {}),
    });

    return {
      success: true,
      deviceRegistrationId: registration.id,
    };
  }

  async queueIncomingVoipNotification(body: QueueIncomingVoipNotificationDto) {
    if (!(this.configService.get<boolean>('features.callsV1Enabled') ?? false)) {
      await this.notificationRepository.logVoipDispatch({
        userId: body.targetUserId,
        sourceEventId: body.callId,
        status: NotificationDeliveryStatus.failed,
        reasonCode: 'calls_feature_disabled',
      });

      return {
        queued: false,
        deviceCount: 0,
        reasonCode: 'calls_feature_disabled',
      };
    }

    const devices = await this.notificationRepository.listVoipDevices(body.targetUserId);
    const androidPushDevices = (await this.notificationRepository.listPushDevices(body.targetUserId))
      .filter((device) => device.platform === 'android' && device.pushToken);
    const preparedDispatch = this.voipNotificationPayloadBuilder.buildIncomingCall(body);
    const dispatchResult = await this.dispatchIncomingVoipNotification({
      devices,
      androidPushDevices,
      preparedDispatch,
      body,
    });
    const status = dispatchResult.status;
    const reasonCode = dispatchResult.reasonCode;

    await this.notificationRepository.logVoipDispatch({
      userId: body.targetUserId,
      sourceEventId: body.callId,
      status,
      reasonCode,
    });

    this.logger.log(
      JSON.stringify({
        event: 'voip_notification_prepared',
        callId: body.callId,
        targetUserId: body.targetUserId,
        deviceCount: devices.length + androidPushDevices.length,
        iosDeviceCount: devices.length,
        androidDeviceCount: androidPushDevices.length,
        sentCount: dispatchResult.sentCount,
        failedCount: dispatchResult.failedCount,
        provider: preparedDispatch.provider,
        providerMode: preparedDispatch.providerMode,
        reasonCode,
        topic: preparedDispatch.topic,
        expiresAt: preparedDispatch.expiresAt,
        callerDisplayName: body.callerDisplayName,
      }),
    );

    return {
      queued: dispatchResult.queued,
      deviceCount: devices.length + androidPushDevices.length,
      sentCount: dispatchResult.sentCount,
      failedCount: dispatchResult.failedCount,
      reasonCode,
      provider: preparedDispatch.provider,
      providerMode: preparedDispatch.providerMode,
    };
  }

  async queueMessageNotification(body: QueueMessageNotificationDto) {
    const providerMode = this.configService.get<string>('push.providerMode') ?? 'disabled';
    const fcmProviderMode = this.configService.get<string>('fcm.providerMode') ?? 'disabled';
    const topic = (this.configService.get<string>('push.apnsTopic') ?? '').trim() || null;

    const apnsEnabled = providerMode !== 'disabled' && Boolean(topic);
    const fcmEnabled = fcmProviderMode !== 'disabled';

    if (!apnsEnabled && !fcmEnabled) {
      this.logger.debug(
        JSON.stringify({
          event: 'message_push_skipped',
          messageId: body.messageId,
          reason: 'push_provider_disabled',
        }),
      );
      return { queued: false, recipientCount: 0, reasonCode: 'push_provider_disabled' };
    }

    // Get all active chat members except the sender
    const memberUserIds = await this.chatServiceClient.getActiveMemberUserIds(body.chatId);
    const recipientUserIds = memberUserIds.filter((uid) => uid !== body.senderUserId);

    if (recipientUserIds.length === 0) {
      return { queued: false, recipientCount: 0, reasonCode: 'no_recipients' };
    }

    // Collect push tokens for all recipients
    const devicesByUserId = await Promise.all(
      recipientUserIds.map((uid) => this.notificationRepository.listPushDevices(uid)),
    );

    const iosPushTokens: string[] = [];
    const androidPushTokens: string[] = [];
    for (const devices of devicesByUserId) {
      for (const device of devices) {
        if (device.pushToken) {
          if (device.platform === 'android') {
            androidPushTokens.push(device.pushToken);
          } else {
            iosPushTokens.push(device.pushToken);
          }
        }
      }
    }

    if (iosPushTokens.length === 0 && androidPushTokens.length === 0) {
      return { queued: false, recipientCount: recipientUserIds.length, reasonCode: 'no_push_registrations' };
    }

    const preview = body.messagePreview ? body.messagePreview.slice(0, 100) : 'New message';
    const apnsDispatch = topic
      ? {
          topic,
          payload: {
            aps: {
              alert: { title: body.senderDisplayName, body: preview },
              sound: 'default' as const,
            },
            chatId: body.chatId,
            messageId: body.messageId,
          },
        }
      : null;

    if (providerMode === 'dry_run' || fcmProviderMode === 'dry_run') {
      this.logger.log(JSON.stringify({
        event: 'message_push_dry_run',
        messageId: body.messageId,
        iosTokenCount: iosPushTokens.length,
        androidTokenCount: androidPushTokens.length,
      }));
      return { queued: true, recipientCount: recipientUserIds.length, reasonCode: 'dry_run' };
    }

    const apnsResult = iosPushTokens.length > 0 && apnsEnabled
      ? await this.pushApnsClient.sendMessageNotification({ pushTokens: iosPushTokens, dispatch: apnsDispatch! })
      : { sentCount: 0, failedCount: 0, reasonCode: iosPushTokens.length > 0 ? 'apns_skipped' : 'no_ios_tokens', revokedTokens: [] };

    const fcmResult = androidPushTokens.length > 0 && fcmEnabled
      ? await this.fcmClient.sendMulticast(
          {
            tokens: androidPushTokens,
            notification: {
              title: body.senderDisplayName,
              body: preview,
            },
            data: {
              kind: 'chat_message',
              chatId: body.chatId,
              messageId: body.messageId,
            },
            android: {
              priority: 'high',
              notification: {
                channelId: 'messages',
                sound: 'default',
              },
            },
          },
          {
            messageId: body.messageId,
            chatId: body.chatId,
            provider: 'fcm',
            pushType: 'message',
          },
        )
      : { sentCount: 0, failedCount: 0, reasonCode: androidPushTokens.length > 0 ? 'fcm_skipped' : 'no_android_tokens', revokedTokens: [] };

    const revokedTokens = [...apnsResult.revokedTokens, ...fcmResult.revokedTokens];
    if (revokedTokens.length > 0) {
      await this.notificationRepository.revokePushTokens(revokedTokens);
    }

    const sentCount = apnsResult.sentCount + fcmResult.sentCount;
    const failedCount = apnsResult.failedCount + fcmResult.failedCount;
    const reasonCode = sentCount > 0
      ? (failedCount > 0 ? 'partial_send_failure' : 'sent_to_provider')
      : (fcmResult.reasonCode !== 'no_android_tokens' ? fcmResult.reasonCode : apnsResult.reasonCode);

    this.logger.log(
      JSON.stringify({
        event: 'message_push_dispatched',
        messageId: body.messageId,
        chatId: body.chatId,
        recipientCount: recipientUserIds.length,
        iosTokenCount: iosPushTokens.length,
        androidTokenCount: androidPushTokens.length,
        sentCount,
        failedCount,
        reasonCode,
      }),
    );

    return {
      queued: sentCount > 0,
      recipientCount: recipientUserIds.length,
      sentCount,
      failedCount,
      reasonCode,
    };
  }

  private async dispatchIncomingVoipNotification(params: {
    devices: Awaited<ReturnType<NotificationRepository['listVoipDevices']>>;
    androidPushDevices: Array<{ id: string; platform: 'ios' | 'android' | 'web'; pushToken: string | null }>;
    preparedDispatch: ReturnType<VoipNotificationPayloadBuilder['buildIncomingCall']>;
    body: QueueIncomingVoipNotificationDto;
  }) {
    if (params.devices.length === 0 && params.androidPushDevices.length === 0) {
      return {
        queued: false,
        sentCount: 0,
        failedCount: 0,
        status: NotificationDeliveryStatus.failed,
        reasonCode: 'missing_call_registration',
      };
    }

    const fcmProviderMode = this.configService.get<string>('fcm.providerMode') ?? 'disabled';

    if (!params.preparedDispatch.canQueue && fcmProviderMode === 'disabled') {
      return {
        queued: false,
        sentCount: 0,
        failedCount: params.devices.length + params.androidPushDevices.length,
        status: NotificationDeliveryStatus.failed,
        reasonCode: params.preparedDispatch.reasonCode,
      };
    }

    if (params.preparedDispatch.providerMode === 'dry_run' || fcmProviderMode === 'dry_run') {
      return {
        queued: true,
        sentCount: 0,
        failedCount: 0,
        status: NotificationDeliveryStatus.pending,
        reasonCode: 'dry_run',
      };
    }

    const apnsResult =
      params.devices.length > 0 && params.preparedDispatch.canQueue
        ? await this.voipApnsClient.sendIncomingCall({
            devices: params.devices,
            preparedDispatch: params.preparedDispatch,
          })
        : {
            sentCount: 0,
            failedCount: 0,
            reasonCode: params.devices.length > 0 ? params.preparedDispatch.reasonCode : 'no_ios_voip_devices',
            revokedRegistrationIds: [],
          };

    if (apnsResult.revokedRegistrationIds.length > 0) {
      await this.notificationRepository.revokeVoipDevices(apnsResult.revokedRegistrationIds);
    }

    const androidPushTokens = params.androidPushDevices
      .map((device) => device.pushToken?.trim() ?? null)
      .filter((token): token is string => Boolean(token));
    const fcmResult =
      androidPushTokens.length > 0 && fcmProviderMode !== 'disabled'
        ? await this.fcmClient.sendMulticast(
            {
              tokens: androidPushTokens,
              notification: {
                title: params.body.callerDisplayName,
                body: params.body.callType === 'video' ? 'Incoming video call' : 'Incoming audio call',
              },
              data: {
                kind: 'incoming_call',
                callId: params.body.callId,
                chatId: params.body.chatId,
                callerUserId: params.body.callerUserId,
                displayName: params.body.callerDisplayName,
                callType: params.body.callType,
                startedAt: params.body.startedAt,
                ringTimeoutMs: String(params.body.ringTimeoutMs),
              },
              android: {
                priority: 'high',
                ttl: params.body.ringTimeoutMs,
                notification: {
                  channelId: 'incoming_calls',
                  sound: 'default',
                  priority: 'max',
                  visibility: 'public',
                  tag: params.body.callId,
                },
              },
            },
            {
              callId: params.body.callId,
              provider: 'fcm',
              pushType: 'incoming_call',
            },
          )
        : {
            sentCount: 0,
            failedCount: 0,
            reasonCode: androidPushTokens.length > 0 ? 'fcm_skipped' : 'no_android_push_devices',
            revokedTokens: [],
          };

    if (fcmResult.revokedTokens.length > 0) {
      await this.notificationRepository.revokePushTokens(fcmResult.revokedTokens);
    }

    const sentCount = apnsResult.sentCount + fcmResult.sentCount;
    const failedCount = apnsResult.failedCount + fcmResult.failedCount;
    const reasonCode = sentCount > 0
      ? (failedCount > 0 ? 'partial_send_failure' : 'sent_to_provider')
      : (fcmResult.reasonCode !== 'no_android_push_devices' ? fcmResult.reasonCode : apnsResult.reasonCode);

    return {
      queued: sentCount > 0,
      sentCount,
      failedCount,
      status: sentCount > 0 ? NotificationDeliveryStatus.sent : NotificationDeliveryStatus.failed,
      reasonCode,
    };
  }
}
