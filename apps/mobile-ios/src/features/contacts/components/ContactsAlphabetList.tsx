import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import type { ContactListItem } from '@features/contacts/api/contacts.api';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { ContactRow } from './ContactRow';

type ContactsAlphabetListProps = {
  contacts: ContactListItem[];
  creatingChatForUserId: string | null;
  onStartChat: (contact: ContactListItem) => void;
  onOpenProfile?: (contact: ContactListItem) => void;
};

type ContactGroup = {
  letter: string;
  items: ContactListItem[];
};

export function ContactsAlphabetList({
  contacts,
  creatingChatForUserId,
  onStartChat,
  onOpenProfile,
}: ContactsAlphabetListProps) {
  const groups = buildAlphabetGroups(contacts);

  if (groups.length === 0) {
    return null;
  }

  return (
    <View style={styles.root}>
      {groups.map((group) => (
        // key on View (native element) is always valid
        <View key={group.letter} style={styles.group}>
          <Text style={styles.sectionHeader}>{group.letter}</Text>
          {group.items.map((contact, index) => (
            <View key={contact.userId}>
              <ContactRow
                contact={contact}
                isCreatingChat={creatingChatForUserId === contact.userId}
                showSeparator={index < group.items.length - 1}
                onPress={onStartChat}
                {...(onOpenProfile ? { onOpenProfile } : {})}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

type ContactsEmptyStateProps = {
  isLoading: boolean;
  hasQuery: boolean;
  query: string;
};

export function ContactsEmptyState({ isLoading, hasQuery, query }: ContactsEmptyStateProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>↻</Text>
        <Text style={styles.emptyTitle}>{t('contacts.list_loading')}</Text>
        <Text style={styles.emptyBody}>
          {t('contacts.list_hint_loading')}
        </Text>
      </View>
    );
  }

  if (hasQuery) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>⊘</Text>
        <Text style={styles.emptyTitle}>{t('contacts.list_no_match', { query: query.trim() })}</Text>
        <Text style={styles.emptyBody}>
          {t('contacts.list_hint_no_match')}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyIcon}>◎</Text>
      <Text style={styles.emptyTitle}>{t('contacts.list_empty')}</Text>
      <Text style={styles.emptyBody}>
        {t('contacts.list_hint_empty')}
      </Text>
    </View>
  );
}

function buildAlphabetGroups(contacts: ContactListItem[]): ContactGroup[] {
  const sorted = [...contacts].sort((a, b) =>
    a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }),
  );

  const map = new Map<string, ContactListItem[]>();

  for (const contact of sorted) {
    const first = contact.displayName.charAt(0).toUpperCase();
    const letter = /^[A-Z]$/.test(first) ? first : '#';
    const existing = map.get(letter);
    if (existing) {
      existing.push(contact);
    } else {
      map.set(letter, [contact]);
    }
  }

  // Keep '#' at the end
  const letters = [...map.keys()].sort((a, b) => {
    if (a === '#') return 1;
    if (b === '#') return -1;
    return a.localeCompare(b);
  });

  return letters.map((letter) => ({
    letter,
    items: map.get(letter) ?? [],
  }));
}

const styles = StyleSheet.create({
  root: {
    gap: 8,
  },
  group: {
    gap: 0,
  },
  sectionHeader: {
    ...telegramText.caption,
    color: telegramColors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.8,
    paddingBottom: 6,
    paddingHorizontal: 14,
    paddingTop: 6,
    textTransform: 'uppercase',
  },
  emptyCard: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 32,
    paddingVertical: 32,
  },
  emptyIcon: {
    color: telegramColors.textTertiary,
    fontSize: 36,
  },
  emptyTitle: {
    ...telegramText.rowTitle,
    textAlign: 'center',
  },
  emptyBody: {
    ...telegramText.secondary,
    lineHeight: 21,
    textAlign: 'center',
  },
});
