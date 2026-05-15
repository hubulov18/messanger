import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import type { DeviceContactsPermissionStatus } from '@shared/native/contacts-permissions';
import { telegramColors } from '@shared/ui/ios/theme';

type ContactsPermissionGateProps = {
  permissionStatus: DeviceContactsPermissionStatus;
  isRequestingPermission: boolean;
  onRequestPermission: () => void;
  onOpenSettings: () => void;
};

type PermissionConfig = {
  icon: string;
  iconBackground: string;
  iconColor: string;
  titleKey: string;
  bodyKey: string;
  actionKey: string;
  showSecondaryAction: boolean;
};

const PERMISSION_CONFIG: Record<DeviceContactsPermissionStatus, PermissionConfig> = {
  unknown: {
    icon: '◎',
    iconBackground: telegramColors.accentSoft,
    iconColor: telegramColors.accent,
    titleKey: 'contacts.permission_unknown_title',
    bodyKey: 'contacts.permission_unknown_body',
    actionKey: 'contacts.permission_unknown_action',
    showSecondaryAction: false,
  },
  denied: {
    icon: '◌',
    iconBackground: '#fff4e5',
    iconColor: '#c27a00',
    titleKey: 'contacts.permission_denied_title',
    bodyKey: 'contacts.permission_denied_body',
    actionKey: 'contacts.permission_denied_action',
    showSecondaryAction: true,
  },
  blocked: {
    icon: '⊘',
    iconBackground: '#fff1f1',
    iconColor: telegramColors.destructive,
    titleKey: 'contacts.permission_blocked_title',
    bodyKey: 'contacts.permission_blocked_body',
    actionKey: 'contacts.permission_blocked_action',
    showSecondaryAction: false,
  },
  granted: {
    icon: '✓',
    iconBackground: '#e9f8ef',
    iconColor: telegramColors.online,
    titleKey: 'contacts.permission_granted_title',
    bodyKey: 'contacts.permission_granted_body',
    actionKey: 'contacts.permission_granted_action',
    showSecondaryAction: false,
  },
};

export function ContactsPermissionGate({
  permissionStatus,
  isRequestingPermission,
  onRequestPermission,
  onOpenSettings,
}: ContactsPermissionGateProps) {
  const { t } = useTranslation();
  const config = PERMISSION_CONFIG[permissionStatus] ?? PERMISSION_CONFIG.unknown;

  function handlePrimaryAction() {
    if (permissionStatus === 'blocked') {
      onOpenSettings();
    } else {
      onRequestPermission();
    }
  }

  return (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: config.iconBackground }]}>
        <Text style={[styles.iconText, { color: config.iconColor }]}>{config.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t(`contacts.${config.titleKey}`)}</Text>
        <Text style={styles.body}>{t(`contacts.${config.bodyKey}`)}</Text>
        <View style={styles.actions}>
          <Pressable
            disabled={isRequestingPermission}
            onPress={handlePrimaryAction}
            style={({ pressed }: { pressed: boolean }) => [
              styles.primaryButton,
              isRequestingPermission ? styles.primaryButtonDisabled : null,
              pressed ? styles.primaryButtonPressed : null,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isRequestingPermission ? t('common.requesting') : t(`contacts.${config.actionKey}`)}
            </Text>
          </Pressable>
          {config.showSecondaryAction ? (
            <Pressable onPress={onOpenSettings} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>{t('contacts.permission_open_settings')}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 999,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  iconText: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    gap: 8,
  },
  title: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 19,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: telegramColors.accent,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryButtonPressed: {
    opacity: 0.85,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  secondaryButtonText: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
