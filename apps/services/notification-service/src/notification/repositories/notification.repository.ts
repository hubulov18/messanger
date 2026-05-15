import { Injectable } from '@nestjs/common';
import { NotificationDeliveryStatus } from '../../generated/prisma/client.js';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  registerDevice(params: {
    userId: string;
    platform: 'ios' | 'android' | 'web';
    deviceId: string;
    pushToken?: string | null;
    voipPushToken?: string | null;
    appVersion?: string;
  }) {
    return this.prisma.deviceRegistration.upsert({
      where: {
        userId_deviceId: {
          userId: params.userId,
          deviceId: params.deviceId,
        },
      },
      update: {
        platform: params.platform,
        ...(params.pushToken !== undefined ? { pushToken: params.pushToken } : {}),
        ...(params.voipPushToken !== undefined ? { voipPushToken: params.voipPushToken } : {}),
        ...(params.appVersion !== undefined ? { appVersion: params.appVersion } : {}),
        revokedAt: null,
        lastRegisteredAt: new Date(),
      },
      create: {
        id: `devreg_${randomUUID()}`,
        userId: params.userId,
        platform: params.platform,
        deviceId: params.deviceId,
        ...(params.pushToken !== undefined ? { pushToken: params.pushToken } : {}),
        ...(params.voipPushToken !== undefined ? { voipPushToken: params.voipPushToken } : {}),
        ...(params.appVersion !== undefined ? { appVersion: params.appVersion } : {}),
      },
    });
  }

  listPushDevices(userId: string) {
    return this.prisma.deviceRegistration.findMany({
      where: {
        userId,
        revokedAt: null,
        pushToken: {
          not: null,
        },
      },
      select: {
        id: true,
        platform: true,
        pushToken: true,
      },
    });
  }

  revokePushTokens(tokens: string[]) {
    if (tokens.length === 0) return Promise.resolve({ count: 0 });

    return this.prisma.deviceRegistration.updateMany({
      where: { pushToken: { in: tokens } },
      data: { revokedAt: new Date() },
    });
  }

  listVoipDevices(userId: string) {
    return this.prisma.deviceRegistration.findMany({
      where: {
        userId,
        revokedAt: null,
        voipPushToken: {
          not: null,
        },
      },
    });
  }

  revokeVoipDevices(registrationIds: string[]) {
    if (registrationIds.length === 0) {
      return Promise.resolve({ count: 0 });
    }

    return this.prisma.deviceRegistration.updateMany({
      where: {
        id: {
          in: registrationIds,
        },
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  logVoipDispatch(params: { userId: string; sourceEventId: string; status: NotificationDeliveryStatus; reasonCode?: string }) {
    return this.prisma.notificationDeliveryLog.create({
      data: {
        id: `notif_${randomUUID()}`,
        userId: params.userId,
        sourceEventId: params.sourceEventId,
        provider: 'voip_apns',
        status: params.status,
        ...(params.reasonCode !== undefined ? { reasonCode: params.reasonCode } : {}),
      },
    });
  }
}
