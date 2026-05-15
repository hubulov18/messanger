import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import type { ContactListItem } from '@features/contacts/api/contacts.api';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import { telegramColors, telegramLayout, telegramText } from '@shared/ui/ios/theme';

type ContactRowProps = {
  contact: ContactListItem;
  isCreatingChat: boolean;
  showSeparator: boolean;
  onPress: (contact: ContactListItem) => void;
  onOpenProfile?: (contact: ContactListItem) => void;
};

export function ContactRow({ contact, isCreatingChat, showSeparator, onPress, onOpenProfile }: ContactRowProps) {
  const { t } = useTranslation();
  return (
    <View>
      <Pressable
        onPress={() => onPress(contact)}
        style={({ pressed }: { pressed: boolean }) => [styles.row, pressed ? styles.rowPressed : null]}
      >
        <Pressable onPress={() => onOpenProfile?.(contact)} style={styles.identity}>
          <ProfileAvatar
            title={contact.displayName}
            avatarMediaId={contact.avatarMediaId}
            color={telegramColors.accent}
            size={50}
          />
          <View style={styles.body}>
            <Text style={styles.name} numberOfLines={1}>
              {contact.displayName}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {contact.username ? `@${contact.username}` : t('contacts.item_no_phone')}
            </Text>
          </View>
        </Pressable>
        {isCreatingChat ? <Text style={styles.openingLabel}>{t('contacts.item_opening')}</Text> : null}
      </Pressable>
      {showSeparator ? <View style={styles.separator} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 70,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  rowPressed: {
    backgroundColor: telegramColors.surfaceMid,
  },
  identity: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...telegramText.rowTitle,
    fontWeight: '600',
  },
  meta: {
    fontSize: 13,
    color: telegramColors.accent,
  },
  openingLabel: {
    color: telegramColors.textTertiary,
    fontSize: 13,
    fontWeight: '600',
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 76,
  },
});
