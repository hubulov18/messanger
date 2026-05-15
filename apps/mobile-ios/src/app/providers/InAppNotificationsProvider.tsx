import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useActiveChatStore } from '@shared/chats/active-chat.store';
import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { useChatReadStateStore } from '@shared/chats/chat-read-state.store';
import { useChatUnreadStore } from '@shared/chats/chat-unread.store';
import { subscribeToRealtimeEvents, type RealtimeEvent } from '@shared/realtime/realtime-events';
import { useSessionStore } from '@shared/auth/session.store';
import { playInAppNotificationSound } from '@shared/native/notification-feedback';
import { setApplicationBadgeCount } from '@shared/native/push-notifications';
import { navigateToChatThread } from '../navigation/navigation-service';
import {
  type QuietHoursPreference,
  useSettingsPreferencesStore,
} from '../../features/settings/state/settings-preferences.store';
import { useNotificationInboxStore } from '../../features/settings/state/notification-inbox.store';

type InAppBannerPayload = {
  chatId: string;
  title: string;
  body: string;
};

const BANNER_VISIBLE_MS = 4200;
const MAX_PENDING_BANNERS = 5;
const MAX_DELIVERED_EVENT_KEYS = 64;

export function InAppNotificationsProvider({ children }: PropsWithChildren) {
  const chats = useChatInboxStore((state) => state.chats);
  const currentUserId = useSessionStore((state) => state.currentUser?.id ?? null);
  const activeChatId = useActiveChatStore((state) => state.activeChatId);
  const suppressChatUnread = useChatReadStateStore((state) => state.suppressChatUnread);
  const clearChatUnread = useChatUnreadStore((state) => state.clearChatUnread);
  const markChatReadLocal = useChatInboxStore((state) => state.markChatReadLocal);
  const markNotificationInboxChatRead = useNotificationInboxStore((state) => state.markChatRead);

  const messageNotificationsEnabled = useSettingsPreferencesStore((state) => state.messageNotificationsEnabled);
  const groupNotificationsEnabled = useSettingsPreferencesStore((state) => state.groupNotificationsEnabled);
  const showNotificationPreviews = useSettingsPreferencesStore((state) => state.showNotificationPreviews);
  const badgeCountEnabled = useSettingsPreferencesStore((state) => state.badgeCountEnabled);
  const inAppSoundsEnabled = useSettingsPreferencesStore((state) => state.inAppSoundsEnabled);
  const notificationSoundPreference = useSettingsPreferencesStore((state) => state.notificationSoundPreference);
  const quietHoursPreference = useSettingsPreferencesStore((state) => state.quietHoursPreference);
  const inAppBannerStylePreference = useSettingsPreferencesStore((state) => state.inAppBannerStylePreference);
  const notificationInboxUnreadCount = useNotificationInboxStore((state) => state.totalUnreadCount);

  const [banner, setBanner] = useState<InAppBannerPayload | null>(null);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bannerQueueRef = useRef<InAppBannerPayload[]>([]);
  const deliveredEventKeysRef = useRef<string[]>([]);

  useEffect(() => {
    if (inAppBannerStylePreference === 'Silent') {
      setBanner(null);
      bannerQueueRef.current = [];
      clearDismissTimer(dismissTimerRef);
    }
  }, [inAppBannerStylePreference]);

  useEffect(() => {
    return subscribeToRealtimeEvents((event) => {
      if (!isMessageCreatedEvent(event)) {
        return;
      }

      if (event.senderUserId === currentUserId) {
        return;
      }

      const chat = useChatInboxStore.getState().chats.find((item) => item.id === event.chatId);
      if (!chat) {
        return;
      }

      if (activeChatId === event.chatId) {
        return;
      }

      if (chat.summary.isMuted) {
        return;
      }

      if (!shouldDeliverForChatType(chat.type, {
        messageNotificationsEnabled,
        groupNotificationsEnabled,
      })) {
        return;
      }

      if (isWithinQuietHours(quietHoursPreference)) {
        return;
      }

      const eventKey = getRealtimeDeliveryKey(event);
      if (hasDeliveredEvent(deliveredEventKeysRef.current, eventKey)) {
        return;
      }
      rememberDeliveredEvent(deliveredEventKeysRef.current, eventKey);

      const title = chat.summary.displayTitle || 'New message';
      const body = showNotificationPreviews && event.preview?.trim()
        ? event.preview.trim()
        : chat.type === 'direct'
          ? 'New message'
          : `New message in ${title}`;

      useNotificationInboxStore.getState().pushAlert({
        chatId: event.chatId,
        title,
        body,
        ...(event.createdAt ? { receivedAt: event.createdAt } : {}),
      });

      if (inAppSoundsEnabled && notificationSoundPreference !== 'None') {
        void playInAppNotificationSound(notificationSoundPreference);
      }

      if (inAppBannerStylePreference === 'Silent') {
        return;
      }

      enqueueBanner(
        { chatId: event.chatId, title, body },
        {
          currentBanner: banner,
          setBanner,
          dismissTimerRef,
          bannerQueueRef,
        },
      );
    });
  }, [
    activeChatId,
    groupNotificationsEnabled,
    inAppSoundsEnabled,
    inAppBannerStylePreference,
    messageNotificationsEnabled,
    notificationSoundPreference,
    quietHoursPreference,
    showNotificationPreviews,
    currentUserId,
    banner,
  ]);

  useEffect(() => {
    if (!activeChatId) {
      return;
    }

    markNotificationInboxChatRead(activeChatId);
  }, [activeChatId, markNotificationInboxChatRead]);

  useEffect(() => {
    void setApplicationBadgeCount(badgeCountEnabled ? notificationInboxUnreadCount : 0);
  }, [badgeCountEnabled, notificationInboxUnreadCount]);

  useEffect(() => {
    return () => {
      bannerQueueRef.current = [];
      clearDismissTimer(dismissTimerRef);
    };
  }, []);

  const bannerBody = !banner || inAppBannerStylePreference === 'Compact'
    ? null
    : banner.body;

  function handleBannerPress() {
    if (!banner) {
      return;
    }

    const chat = chats.find((item) => item.id === banner.chatId);
    suppressChatUnread(banner.chatId, chat?.summary.lastActivityAt ?? null);
    clearChatUnread(banner.chatId);
    markChatReadLocal(banner.chatId);
    markNotificationInboxChatRead(banner.chatId);
    navigateToChatThread(banner.chatId);
    dismissActiveBanner({
      setBanner,
      dismissTimerRef,
      bannerQueueRef,
    });
  }

  return (
    <>
      {children}
      {banner ? (
        <View pointerEvents="box-none" style={styles.overlay}>
          <Pressable onPress={handleBannerPress} style={styles.banner}>
            <Text numberOfLines={1} style={styles.title}>
              {banner.title}
            </Text>
            {bannerBody ? (
              <Text numberOfLines={inAppBannerStylePreference === 'Full' ? 2 : 1} style={styles.body}>
                {bannerBody}
              </Text>
            ) : null}
          </Pressable>
        </View>
      ) : null}
    </>
  );
}

function isMessageCreatedEvent(
  event: RealtimeEvent,
): event is Extract<RealtimeEvent, { type: 'chat.message_created' }> {
  return event.type === 'chat.message_created' && Boolean(event.chatId) && Boolean(event.senderUserId);
}

function shouldDeliverForChatType(
  chatType: string,
  settings: { messageNotificationsEnabled: boolean; groupNotificationsEnabled: boolean },
) {
  if (chatType === 'direct') {
    return settings.messageNotificationsEnabled;
  }

  return settings.groupNotificationsEnabled;
}

function isWithinQuietHours(preference: QuietHoursPreference) {
  if (preference === 'Off') {
    return false;
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (preference === '22:00–07:00') {
    return currentMinutes >= 22 * 60 || currentMinutes < 7 * 60;
  }

  if (preference === '23:00–08:00') {
    return currentMinutes >= 23 * 60 || currentMinutes < 8 * 60;
  }

  return false;
}

function clearDismissTimer(timerRef: { current: ReturnType<typeof setTimeout> | null }) {
  if (!timerRef.current) {
    return;
  }

  clearTimeout(timerRef.current);
  timerRef.current = null;
}

function getRealtimeDeliveryKey(event: Extract<RealtimeEvent, { type: 'chat.message_created' }>) {
  if (event.messageId?.trim()) {
    return `message:${event.messageId}`;
  }

  return [
    event.chatId,
    event.senderUserId ?? 'unknown',
    event.createdAt ?? 'unknown',
    event.preview?.trim() ?? '',
  ].join('|');
}

function hasDeliveredEvent(deliveredKeys: string[], key: string) {
  return deliveredKeys.includes(key);
}

function rememberDeliveredEvent(deliveredKeys: string[], key: string) {
  deliveredKeys.push(key);
  if (deliveredKeys.length > MAX_DELIVERED_EVENT_KEYS) {
    deliveredKeys.splice(0, deliveredKeys.length - MAX_DELIVERED_EVENT_KEYS);
  }
}

function enqueueBanner(
  nextBanner: InAppBannerPayload,
  controls: {
    currentBanner: InAppBannerPayload | null;
    setBanner: (banner: InAppBannerPayload | null) => void;
    dismissTimerRef: { current: ReturnType<typeof setTimeout> | null };
    bannerQueueRef: { current: InAppBannerPayload[] };
  },
) {
  if (!controls.currentBanner) {
    controls.setBanner(nextBanner);
    scheduleBannerDismiss(controls);
    return;
  }

  const alreadyQueued = controls.bannerQueueRef.current.some((banner) => {
    return banner.chatId === nextBanner.chatId && banner.body === nextBanner.body && banner.title === nextBanner.title;
  });
  if (alreadyQueued) {
    return;
  }

  controls.bannerQueueRef.current = [
    ...controls.bannerQueueRef.current.slice(-(MAX_PENDING_BANNERS - 1)),
    nextBanner,
  ];
}

function scheduleBannerDismiss(controls: {
  setBanner: (banner: InAppBannerPayload | null) => void;
  dismissTimerRef: { current: ReturnType<typeof setTimeout> | null };
  bannerQueueRef: { current: InAppBannerPayload[] };
}) {
  clearDismissTimer(controls.dismissTimerRef);
  controls.dismissTimerRef.current = setTimeout(() => {
    controls.dismissTimerRef.current = null;
    advanceBannerQueue(controls);
  }, BANNER_VISIBLE_MS);
}

function dismissActiveBanner(controls: {
  setBanner: (banner: InAppBannerPayload | null) => void;
  dismissTimerRef: { current: ReturnType<typeof setTimeout> | null };
  bannerQueueRef: { current: InAppBannerPayload[] };
}) {
  clearDismissTimer(controls.dismissTimerRef);
  advanceBannerQueue(controls);
}

function advanceBannerQueue(controls: {
  setBanner: (banner: InAppBannerPayload | null) => void;
  dismissTimerRef: { current: ReturnType<typeof setTimeout> | null };
  bannerQueueRef: { current: InAppBannerPayload[] };
}) {
  const nextBanner = controls.bannerQueueRef.current.shift() ?? null;
  controls.setBanner(nextBanner);
  if (nextBanner) {
    scheduleBannerDismiss(controls);
  }
}

const styles = StyleSheet.create({
  overlay: {
    left: 0,
    pointerEvents: 'box-none',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2000,
  },
  banner: {
    alignSelf: 'stretch',
    backgroundColor: '#1f2937',
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 12,
    marginTop: 56,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  body: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
});
