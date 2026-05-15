import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { createGroupChat } from '@features/chats/api/chats.api';
import { loadMatchedContacts } from '@features/contacts/services/contacts-import.service';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import type { ApiError } from '@shared/api/types';
import { useChatDirectoryStore } from '@shared/chats/chat-directory.store';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSearchField } from '@shared/ui/ios/IosSearchField';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramLayout, telegramShadows } from '@shared/ui/ios/theme';
import { useEffect } from 'react';
import type { ContactListItem } from '@features/contacts/api/contacts.api';

type CreateGroupScreenProps = {
  // CreateGroupScreen lives in RootStack, so navigation.navigate goes directly to RootStack screens.
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, params?: unknown) => void;
    replace?: (screen: string, params?: unknown) => void;
  };
};

type Step = 'pick_members' | 'set_name';

export function CreateGroupScreen({ navigation }: CreateGroupScreenProps) {
  const { t } = useTranslation();
  const registerDirectChat = useChatDirectoryStore((state) => state.registerDirectChat);

  const [step, setStep] = useState<Step>('pick_members');
  const [contacts, setContacts] = useState<ContactListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [groupName, setGroupName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    void loadMatchedContacts().then(setContacts).catch(() => setContacts([]));
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredContacts = contacts.filter((c) =>
    normalizedQuery
      ? [c.displayName, c.username ?? ''].join(' ').toLowerCase().includes(normalizedQuery)
      : true,
  );
  const selectedContacts = contacts.filter((c) => selectedIds.has(c.userId));
  const trimmedName = groupName.trim();
  const canProceed = selectedIds.size >= 1;
  const canCreate = trimmedName.length > 0 && selectedIds.size >= 1 && !isCreating;

  function toggleSelect(userId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  }

  async function handleCreate() {
    if (!canCreate) return;
    setIsCreating(true);
    setErrorMessage(null);

    try {
      const response = await createGroupChat({
        title: trimmedName,
        memberUserIds: [...selectedIds],
      });

      registerDirectChat({
        chatId: response.chat.id,
        title: trimmedName,
        participantUserId: '',
      });

      navigation?.replace?.('ChatThread', { chatId: response.chat.id });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(
        typeof apiError.message === 'string' ? apiError.message : t('chats.create_group.error'),
      );
    } finally {
      setIsCreating(false);
    }
  }

  if (step === 'set_name') {
    return (
      <IosScreen
        title={t('chats.create_group.title_name')}
        headerMode="compact"
        headerAlignment="center"
        leftAction={
          <Pressable onPress={() => setStep('pick_members')} style={styles.headerAction}>
            <Text style={styles.headerActionText}>{t('common.back')}</Text>
          </Pressable>
        }
        rightAction={
          <Pressable
            disabled={!canCreate}
            onPress={() => void handleCreate()}
            style={styles.headerAction}
          >
            <Text style={[styles.headerActionAccent, !canCreate ? styles.headerActionDisabled : null]}>
              {isCreating ? t('common.creating') : t('common.create')}
            </Text>
          </Pressable>
        }
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <IosSection title={t('chats.create_group.section_name')}>
            <View style={styles.nameField}>
              <TextInput
                autoFocus
                maxLength={80}
                onChangeText={setGroupName}
                placeholder={t('chats.create_group.placeholder_name')}
                placeholderTextColor={telegramColors.textTertiary}
                style={styles.nameInput}
                value={groupName}
              />
              <Text style={styles.nameCounter}>{t('chats.create_group.hint_name_length', { length: groupName.trim().length })}</Text>
            </View>
          </IosSection>

          <IosSection title={selectedContacts.length === 1 ? t('chats.create_group.member_count_one', { count: selectedContacts.length }) : t('chats.create_group.member_count_other', { count: selectedContacts.length })}>
            {selectedContacts.map((contact, index) => (
              <View key={contact.userId}>
                {index > 0 ? <View style={styles.separator} /> : null}
                <View style={styles.memberRow}>
                  <ProfileAvatar
                    title={contact.displayName}
                    avatarMediaId={contact.avatarMediaId}
                    color={telegramColors.accent}
                    size={38}
                  />
                  <View style={styles.memberBody}>
                    <Text style={styles.memberName} numberOfLines={1}>{contact.displayName}</Text>
                    {contact.username ? (
                      <Text style={styles.memberMeta}>@{contact.username}</Text>
                    ) : null}
                  </View>
                  <Pressable onPress={() => toggleSelect(contact.userId)} style={styles.removeChip}>
                    <Text style={styles.removeChipText}>{t('common.remove')}</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </IosSection>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </ScrollView>
      </IosScreen>
    );
  }

  return (
    <IosScreen
      title={t('chats.create_group.title_members')}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.cancel')}</Text>
        </Pressable>
      }
      rightAction={
        <Pressable
          disabled={!canProceed}
          onPress={() => setStep('set_name')}
          style={styles.headerAction}
        >
          <Text style={[styles.headerActionAccent, !canProceed ? styles.headerActionDisabled : null]}>
            {t('common.next')}
          </Text>
        </Pressable>
      }
    >
      {selectedIds.size > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedStrip}
          contentContainerStyle={styles.selectedStripContent}
        >
          {selectedContacts.map((contact) => (
            <Pressable
              key={contact.userId}
              onPress={() => toggleSelect(contact.userId)}
              style={styles.selectedChip}
            >
              <ProfileAvatar
                title={contact.displayName}
                avatarMediaId={contact.avatarMediaId}
                color={telegramColors.accent}
                size={36}
              />
              <Text style={styles.selectedChipName} numberOfLines={1}>
                {contact.displayName.split(' ')[0]}
              </Text>
              <View style={styles.selectedChipBadge}>
                <Text style={styles.selectedChipBadgeText}>✕</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <View style={styles.searchWrap}>
        <IosSearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('chats.create_group.search_placeholder')}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {contacts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('chats.create_group.no_contacts')}</Text>
            <Text style={styles.emptyBody}>
              {t('chats.create_group.hint_no_contacts')}
            </Text>
          </View>
        ) : filteredContacts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>{t('chats.create_group.no_matches')}</Text>
            <Text style={styles.emptyBody}>{t('chats.create_group.hint_no_matches')}</Text>
          </View>
        ) : (
          <IosSection title={contacts.length === 1 ? t('chats.create_group.contact_count_one', { count: contacts.length }) : t('chats.create_group.contact_count_other', { count: contacts.length })}>
            {filteredContacts.map((contact, index) => {
              const isSelected = selectedIds.has(contact.userId);
              return (
                <View key={contact.userId}>
                  {index > 0 ? <View style={styles.separator} /> : null}
                  <Pressable
                    onPress={() => toggleSelect(contact.userId)}
                    style={({ pressed }: { pressed: boolean }) => [
                      styles.contactRow,
                      pressed ? styles.contactRowPressed : null,
                    ]}
                  >
                    <ProfileAvatar
                      title={contact.displayName}
                      avatarMediaId={contact.avatarMediaId}
                      color={telegramColors.accent}
                    />
                    <View style={styles.contactBody}>
                      <Text style={styles.contactName} numberOfLines={1}>{contact.displayName}</Text>
                      <Text style={styles.contactMeta} numberOfLines={1}>
                        {contact.username ? `@${contact.username}` : t('chats.create_group.no_username')}
                      </Text>
                    </View>
                    <View style={[styles.checkCircle, isSelected ? styles.checkCircleActive : null]}>
                      {isSelected ? <Text style={styles.checkMark}>✓</Text> : null}
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </IosSection>
        )}
      </ScrollView>
    </IosScreen>
  );
}

const styles = StyleSheet.create({
  headerAction: {
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 60,
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
    textAlign: 'right',
  },
  headerActionDisabled: {
    color: telegramColors.textTertiary,
  },
  selectedStrip: {
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    maxHeight: 88,
    marginHorizontal: 16,
    ...telegramShadows.card,
  },
  selectedStripContent: {
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectedChip: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 16,
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: 'relative',
    width: 64,
  },
  selectedChipName: {
    color: telegramColors.textPrimary,
    fontSize: 11,
    textAlign: 'center',
  },
  selectedChipBadge: {
    alignItems: 'center',
    backgroundColor: telegramColors.destructive,
    borderRadius: 999,
    height: 16,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    top: 0,
    width: 16,
  },
  selectedChipBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  contactRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  contactRowPressed: {
    opacity: 0.7,
  },
  contactBody: {
    flex: 1,
    gap: 2,
  },
  contactName: {
    color: telegramColors.textPrimary,
    fontSize: 17,
    fontWeight: '500',
  },
  contactMeta: {
    color: telegramColors.textSecondary,
    fontSize: 14,
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
  separator: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 58,
  },
  emptyState: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  emptyTitle: {
    color: telegramColors.textPrimary,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyBody: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
  nameField: {
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  nameInput: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 14,
    color: telegramColors.textPrimary,
    fontSize: 17,
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  nameCounter: {
    color: telegramColors.textTertiary,
    fontSize: 12,
  },
  memberRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  memberBody: {
    flex: 1,
    gap: 2,
  },
  memberName: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  memberMeta: {
    color: telegramColors.textSecondary,
    fontSize: 13,
  },
  removeChip: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  removeChipText: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
    paddingHorizontal: 4,
  },
});
