import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useChatInboxStore } from '@shared/chats/chat-inbox.store';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { navigateToChatThread } from '@app/navigation/navigation-service';
import { SettingsBackButton } from '../components/SettingsBackButton';
import { SettingsSection } from '../components/SettingsSection';
import { useNotificationInboxStore } from '../state/notification-inbox.store';

export function NotificationInboxScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const itemsByChatId = useNotificationInboxStore((state) => state.itemsByChatId);
  const orderedChatIds = useNotificationInboxStore((state) => state.orderedChatIds);
  const totalUnreadCount = useNotificationInboxStore((state) => state.totalUnreadCount);
  const markChatRead = useNotificationInboxStore((state) => state.markChatRead);
  const markAllRead = useNotificationInboxStore((state) => state.markAllRead);
  const clearChat = useNotificationInboxStore((state) => state.clearChat);
  const clearAll = useNotificationInboxStore((state) => state.clearAll);
  const chats = useChatInboxStore((state) => state.chats);
  const [expandedChatId, setExpandedChatId] = useState<string | null>(null);

  const items = orderedChatIds
    .map((chatId) => itemsByChatId[chatId])
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <IosScreen
      title={t('settings.notification_inbox.title')}
      subtitle={t('settings.notification_inbox.body')}
      headerMode="compact"
      leftAction={<SettingsBackButton onPress={() => navigation.goBack()} />}
      rightAction={
        items.length > 0 ? (
          <View style={styles.headerActions}>
            {totalUnreadCount > 0 ? (
              <Pressable onPress={markAllRead} style={styles.headerActionButton}>
                <Text style={styles.headerActionButtonText}>{t('settings.notification_inbox.read_all')}</Text>
              </Pressable>
            ) : null}
            <Pressable onPress={clearAll} style={styles.headerActionButton}>
              <Text style={styles.clearAllButtonText}>{t('settings.notification_inbox.clear_all')}</Text>
            </Pressable>
          </View>
        ) : undefined
      }
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>🔔</Text>
        </View>
        <Text style={styles.heroTitle}>{t('settings.notification_inbox.title')}</Text>
        <Text style={styles.heroBody}>{t('settings.notification_inbox.body')}</Text>
      </View>

      <SettingsSection title={t('settings.notification_inbox.section_overview')}>
        <View style={styles.summaryRow}>
          <SummaryCard label={t('settings.notification_inbox.metric_unread')} value={String(totalUnreadCount)} tone="accent" />
          <SummaryCard label={t('settings.notification_inbox.metric_chats')} value={String(items.length)} tone="calm" />
          <SummaryCard label={t('settings.notification_inbox.metric_status')} value={items.length === 0 ? t('settings.notification_inbox.status_empty') : t('settings.notification_inbox.status_live')} tone="muted" />
        </View>
      </SettingsSection>

      <SettingsSection title={t('settings.notification_inbox.section_recent')}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('settings.notification_inbox.empty_title')}</Text>
            <Text style={styles.emptyBody}>{t('settings.notification_inbox.empty_body')}</Text>
          </View>
        ) : (
          items.map((item, index) => {
            const chat = chats.find((entry) => entry.id === item.chatId);
            const chatTitle = chat?.summary.displayTitle || item.title;

            return (
              <View key={item.chatId}>
                {index > 0 ? <View style={styles.separator} /> : null}
                <Pressable
                  onPress={() => {
                    markChatRead(item.chatId);
                    navigateToChatThread(item.chatId);
                  }}
                  style={({ pressed }: { pressed: boolean }) => [
                    styles.alertCard,
                    pressed ? styles.alertCardPressed : null,
                  ]}
                >
                  <View style={styles.alertTopline}>
                    <View style={styles.alertTitleGroup}>
                      <Text numberOfLines={1} style={styles.alertTitle}>
                        {chatTitle}
                      </Text>
                      <Text numberOfLines={1} style={styles.alertTimestamp}>
                        {formatAlertTimestamp(item.lastReceivedAt)}
                      </Text>
                    </View>
                    <View style={styles.alertMetrics}>
                      {item.unreadCount > 0 ? (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
                        </View>
                      ) : (
                        <View style={styles.readBadge}>
                          <Text style={styles.readBadgeText}>{t('settings.notification_inbox.status_seen')}</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text numberOfLines={2} style={styles.alertBody}>
                    {item.body}
                  </Text>

                  <View style={styles.alertFooter}>
                    <Text style={styles.alertMeta}>
                      {item.totalCount === 1
                        ? t('settings.notification_inbox.alert_count_one', { count: item.totalCount })
                        : t('settings.notification_inbox.alert_count_other', { count: item.totalCount })}
                    </Text>
                    <View style={styles.alertActions}>
                      {item.recentAlerts.length > 1 ? (
                        <Pressable
                          hitSlop={8}
                          onPress={() => setExpandedChatId((current) => current === item.chatId ? null : item.chatId)}
                          style={({ pressed }: { pressed: boolean }) => [
                            styles.secondaryActionButton,
                            pressed ? styles.clearChatButtonPressed : null,
                          ]}
                        >
                          <Text style={styles.secondaryActionButtonText}>
                            {expandedChatId === item.chatId ? t('settings.notification_inbox.hide') : t('settings.notification_inbox.details')}
                          </Text>
                        </Pressable>
                      ) : null}
                      <Pressable
                        hitSlop={8}
                        onPress={() => clearChat(item.chatId)}
                        style={({ pressed }: { pressed: boolean }) => [
                          styles.clearChatButton,
                          pressed ? styles.clearChatButtonPressed : null,
                        ]}
                      >
                        <Text style={styles.clearChatButtonText}>{t('common.clear')}</Text>
                      </Pressable>
                    </View>
                  </View>

                  {expandedChatId === item.chatId ? (
                    <View style={styles.alertTrail}>
                      {item.recentAlerts.map((alert, alertIndex) => (
                        <View key={`${item.chatId}:${alert.receivedAt}:${alertIndex}`}>
                          {alertIndex > 0 ? <View style={styles.trailSeparator} /> : null}
                          <View style={styles.trailRow}>
                            <Text numberOfLines={2} style={styles.trailBody}>
                              {alert.body}
                            </Text>
                            <Text style={styles.trailTimestamp}>
                              {formatAlertTimestamp(alert.receivedAt)}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : null}
                </Pressable>
              </View>
            );
          })
        )}
      </SettingsSection>
    </IosScreen>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'accent' | 'calm' | 'muted';
}) {
  return (
    <View
      style={[
        styles.summaryCard,
        tone === 'accent' ? styles.summaryCardAccent : null,
        tone === 'calm' ? styles.summaryCardCalm : null,
      ]}
    >
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function formatAlertTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'Now';
  }

  const now = new Date();
  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isSameDay) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerActionButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  headerActionButtonText: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '600',
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    gap: 10,
    marginBottom: 18,
    paddingHorizontal: 20,
    paddingVertical: 22,
    ...telegramShadows.card,
  },
  heroBadge: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 18,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  heroBadgeText: {
    fontSize: 26,
  },
  heroTitle: {
    ...telegramText.sectionTitle,
    fontSize: 24,
    textAlign: 'center',
  },
  heroBody: {
    ...telegramText.secondary,
    textAlign: 'center',
  },
  clearAllButtonText: {
    color: '#c2410c',
    fontSize: 15,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  summaryCard: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 16,
    flex: 1,
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  summaryCardAccent: {
    backgroundColor: telegramColors.accentSoft,
  },
  summaryCardCalm: {
    backgroundColor: telegramColors.surfaceMuted,
  },
  summaryLabel: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: telegramColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyState: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 18,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  emptyTitle: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyBody: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: 0.5,
    marginLeft: 14,
  },
  alertCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  alertCardPressed: {
    opacity: 0.72,
  },
  alertTopline: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  alertTitleGroup: {
    flex: 1,
    gap: 4,
  },
  alertTitle: {
    ...telegramText.rowTitle,
  },
  alertTimestamp: {
    color: telegramColors.textSecondary,
    fontSize: 12,
  },
  alertMetrics: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  unreadBadge: {
    backgroundColor: telegramColors.accent,
    borderRadius: 999,
    minWidth: 28,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  unreadBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  readBadge: {
    backgroundColor: '#eef2f7',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  readBadgeText: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  alertBody: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  alertFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertMeta: {
    color: telegramColors.textSecondary,
    fontSize: 12,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryActionButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  secondaryActionButtonText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '600',
  },
  clearChatButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  clearChatButtonPressed: {
    opacity: 0.68,
  },
  clearChatButtonText: {
    color: '#c2410c',
    fontSize: 13,
    fontWeight: '600',
  },
  alertTrail: {
    backgroundColor: '#f8fafc',
    borderColor: '#e6ebf2',
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 2,
    overflow: 'hidden',
  },
  trailSeparator: {
    backgroundColor: telegramColors.separator,
    height: 0.5,
    marginLeft: 12,
  },
  trailRow: {
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  trailBody: {
    color: telegramColors.textPrimary,
    fontSize: 13,
    lineHeight: 18,
  },
  trailTimestamp: {
    color: telegramColors.textSecondary,
    fontSize: 11,
  },
});
