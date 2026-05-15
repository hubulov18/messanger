import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { addChatMembers, getChat, getChatMembers } from '@features/chats/api/chats.api';
import type { ContactListItem } from '@features/contacts/api/contacts.api';
import { loadMatchedContacts } from '@features/contacts/services/contacts-import.service';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSearchField } from '@shared/ui/ios/IosSearchField';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramLayout, telegramShadows } from '@shared/ui/ios/theme';

type AddChatMembersScreenProps = {
  navigation?: {
    goBack: () => void;
  };
  route?: {
    params?: {
      chatId?: string;
    };
  };
};

export function AddChatMembersScreen({ navigation, route }: AddChatMembersScreenProps) {
  const { t } = useTranslation();
  const chatId = route?.params?.chatId ?? '';
  const [chatTitle, setChatTitle] = useState('');
  const [contacts, setContacts] = useState<ContactListItem[]>([]);
  const [existingMemberIds, setExistingMemberIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId) {
      setErrorMessage(t('chats.info.error_unavailable'));
      return;
    }

    void loadData();
  }, [chatId]);

  async function loadData() {
    setErrorMessage(null);

    try {
      const [chatResponse, membersResponse, contactsResponse] = await Promise.all([
        getChat(chatId),
        getChatMembers(chatId),
        loadMatchedContacts(),
      ]);

      setChatTitle(chatResponse.summary.displayTitle);
      setExistingMemberIds(new Set(membersResponse.items.map((member) => member.userId)));
      setContacts(contactsResponse);
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.add_members.error'));
    }
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const availableContacts = contacts
    .filter((contact: ContactListItem) => !existingMemberIds.has(contact.userId))
    .filter((contact: ContactListItem) => {
      if (!normalizedQuery) {
        return true;
      }

      return [contact.displayName, contact.username ?? '', contact.phoneNumber ?? '']
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    });

  const selectedContacts = availableContacts.filter((contact: ContactListItem) => selectedIds.has(contact.userId));

  function toggleUser(userId: string) {
    setSelectedIds((current) => {
      const next = new Set(current);

      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }

      return next;
    });
  }

  async function handleAddMembers() {
    if (selectedIds.size === 0 || isSaving) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      await addChatMembers(chatId, [...selectedIds]);
      navigation?.goBack();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.add_members.error'));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <IosScreen
      title={t('chats.add_members.title')}
      subtitle={chatTitle}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.back')}</Text>
        </Pressable>
      }
      rightAction={
        <Pressable
          disabled={selectedIds.size === 0 || isSaving}
          onPress={() => void handleAddMembers()}
          style={styles.headerAction}
        >
          <Text style={[styles.headerActionAccent, selectedIds.size === 0 || isSaving ? styles.headerActionDisabled : null]}>
            {isSaving ? t('common.adding') : t('common.add')}
          </Text>
        </Pressable>
      }
    >
      {selectedContacts.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedStrip}
          contentContainerStyle={styles.selectedStripContent}
        >
          {selectedContacts.map((contact: ContactListItem) => (
            <Pressable
              key={contact.userId}
              onPress={() => toggleUser(contact.userId)}
              style={styles.selectedChip}
            >
              <ProfileAvatar
                title={contact.displayName}
                avatarMediaId={contact.avatarMediaId}
                color={telegramColors.accent}
                size={38}
              />
              <Text numberOfLines={1} style={styles.selectedChipName}>
                {contact.displayName.split(' ')[0]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <View style={styles.searchWrap}>
        <IosSearchField value={searchQuery} onChangeText={setSearchQuery} placeholder={t('chats.add_members.search_placeholder')} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <IosSection title={t('chats.add_members.section_contacts')}>
          {availableContacts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>{t('chats.add_members.no_contacts')}</Text>
              <Text style={styles.emptyBody}>
                {t('chats.add_members.hint_no_contacts')}
              </Text>
            </View>
          ) : (
            availableContacts.map((contact: ContactListItem, index: number) => {
              const isSelected = selectedIds.has(contact.userId);

              return (
                <View key={contact.userId}>
                  {index > 0 ? <View style={styles.separatorInset} /> : null}
                  <Pressable onPress={() => toggleUser(contact.userId)} style={styles.contactRow}>
                    <ProfileAvatar
                      title={contact.displayName}
                      avatarMediaId={contact.avatarMediaId}
                      color={telegramColors.accent}
                      size={42}
                    />
                    <View style={styles.contactBody}>
                      <Text style={styles.contactName}>{contact.displayName}</Text>
                      <Text style={styles.contactMeta}>
                        {contact.username ? `@${contact.username}` : contact.phoneNumber ?? t('chats.add_members.fallback_contact')}
                      </Text>
                    </View>
                    <View style={[styles.checkCircle, isSelected ? styles.checkCircleActive : null]}>
                      {isSelected ? <Text style={styles.checkMark}>✓</Text> : null}
                    </View>
                  </Pressable>
                </View>
              );
            })
          )}
        </IosSection>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </ScrollView>
    </IosScreen>
  );
}

const styles = StyleSheet.create({
  headerAction: {
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 44,
  },
  headerActionText: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  headerActionAccent: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  headerActionDisabled: {
    color: telegramColors.textTertiary,
  },
  selectedStrip: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    maxHeight: 92,
    marginHorizontal: 16,
    ...telegramShadows.card,
  },
  selectedStripContent: {
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectedChip: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 16,
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 68,
  },
  selectedChipName: {
    color: telegramColors.textPrimary,
    fontSize: 11,
    textAlign: 'center',
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scrollContent: {
    gap: 18,
    paddingBottom: 28,
    paddingHorizontal: 16,
  },
  emptyState: {
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  emptyTitle: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyBody: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
  },
  separatorInset: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 68,
  },
  contactRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  contactBody: {
    flex: 1,
    gap: 2,
  },
  contactName: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  contactMeta: {
    color: telegramColors.textSecondary,
    fontSize: 13,
  },
  checkCircle: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderColor: telegramColors.separator,
    borderRadius: 12,
    borderWidth: 1.5,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  checkCircleActive: {
    backgroundColor: telegramColors.accent,
    borderColor: telegramColors.accent,
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
    paddingHorizontal: 4,
  },
});
