import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from '@shared/i18n';
import { createDirectChat } from '@features/chats/api/chats.api';
import type { ContactListItem } from '@features/contacts/api/contacts.api';
import { ContactsAlphabetList, ContactsEmptyState } from '@features/contacts/components/ContactsAlphabetList';
import { ContactsPermissionGate } from '@features/contacts/components/ContactsPermissionGate';
import { getProfileByPhoneNumber, getProfileByUsername } from '@features/profile/api/profile.api';
import { ProfileAvatar } from '@features/profile/components/ProfileAvatar';
import {
  ContactsPermissionError,
  getContactsPermissionStatus,
  importDeviceContacts,
  loadMatchedContacts,
  openContactsSettings,
  requestContactsPermission,
} from '@features/contacts/services/contacts-import.service';
import { useContactsSyncState } from '@features/contacts/state/contacts-sync.state';
import type { ApiError } from '@shared/api/types';
import { useSessionStore } from '@shared/auth/session.store';
import { useChatDirectoryStore } from '@shared/chats/chat-directory.store';
import { useLatestRequestGuard } from '@shared/hooks/useLatestRequestGuard';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSearchField } from '@shared/ui/ios/IosSearchField';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

const USERNAME_SEARCH_DEBOUNCE_MS = 350;

type UsernameLookupResult = {
  id: string;
  username: string;
  displayName: string;
  avatarMediaId: string | null;
};

type PhoneLookupResult = UsernameLookupResult;

type ContactsScreenProps = {
  navigation?: {
    navigate: (screen: string, params?: unknown) => void;
    getParent?: () => {
      navigate: (screen: string, params?: unknown) => void;
    } | undefined;
  };
};

export function ContactsScreen({ navigation }: ContactsScreenProps) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const permissionStatus = useContactsSyncState((state) => state.permissionStatus);
  const lastSyncedAt = useContactsSyncState((state) => state.lastSyncedAt);
  const setPermissionStatus = useContactsSyncState((state) => state.setPermissionStatus);
  const setLastSyncResult = useContactsSyncState((state) => state.setLastSyncResult);
  const setLastErrorMessage = useContactsSyncState((state) => state.setLastErrorMessage);
  const registerContacts = useChatDirectoryStore((state) => state.registerContacts);
  const registerDirectChat = useChatDirectoryStore((state) => state.registerDirectChat);
  const bootstrapRequestGuard = useLatestRequestGuard();
  const usernameLookupRequestGuard = useLatestRequestGuard();
  const phoneLookupRequestGuard = useLatestRequestGuard();

  const [contacts, setContacts] = useState<ContactListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncingDeviceContacts, setIsSyncingDeviceContacts] = useState(false);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [creatingChatForUserId, setCreatingChatForUserId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [usernameLookupResult, setUsernameLookupResult] = useState<UsernameLookupResult | null>(null);
  const [isSearchingByUsername, setIsSearchingByUsername] = useState(false);
  const [usernameLookupError, setUsernameLookupError] = useState<string | null>(null);
  const [phoneLookupResult, setPhoneLookupResult] = useState<PhoneLookupResult | null>(null);
  const [isSearchingByPhone, setIsSearchingByPhone] = useState(false);
  const [phoneLookupError, setPhoneLookupError] = useState<string | null>(null);

  useEffect(() => {
    void bootstrapContactsScreen();
  }, []);

  useEffect(() => {
    const usernameQuery = normalizeUsernameQuery(searchQuery);

    if (!usernameQuery) {
      setUsernameLookupResult(null);
      setUsernameLookupError(null);
      setIsSearchingByUsername(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const requestId = usernameLookupRequestGuard.beginRequest();
      setIsSearchingByUsername(true);
      setUsernameLookupError(null);

      void getProfileByUsername(usernameQuery)
        .then((profile) => {
          if (!usernameLookupRequestGuard.isLatestRequest(requestId)) {
            return;
          }
          setUsernameLookupResult(profile);
        })
        .catch((error) => {
          if (!usernameLookupRequestGuard.isLatestRequest(requestId)) {
            return;
          }
          const apiError = error as ApiError;
          if (apiError.code === 'NOT_FOUND' || apiError.message === 'Profile not found') {
            setUsernameLookupResult(null);
            setUsernameLookupError(t('contacts.hint_no_match_phone'));
            return;
          }

          setUsernameLookupResult(null);
          setUsernameLookupError(typeof apiError.message === 'string' ? apiError.message : t('contacts.error_load'));
        })
        .finally(() => {
          if (!usernameLookupRequestGuard.isLatestRequest(requestId)) {
            return;
          }
          setIsSearchingByUsername(false);
        });
    }, USERNAME_SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const phoneQuery = normalizePhoneSearchQuery(searchQuery);

    if (!phoneQuery) {
      setPhoneLookupResult(null);
      setPhoneLookupError(null);
      setIsSearchingByPhone(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const requestId = phoneLookupRequestGuard.beginRequest();
      setIsSearchingByPhone(true);
      setPhoneLookupError(null);

      void getProfileByPhoneNumber(phoneQuery)
        .then((profile) => {
          if (!phoneLookupRequestGuard.isLatestRequest(requestId)) {
            return;
          }
          setPhoneLookupResult(profile);
        })
        .catch((error) => {
          if (!phoneLookupRequestGuard.isLatestRequest(requestId)) {
            return;
          }
          const apiError = error as ApiError;
          if (apiError.code === 'NOT_FOUND' || apiError.message === 'Profile not found') {
            setPhoneLookupResult(null);
            setPhoneLookupError(t('contacts.hint_no_match_phone'));
            return;
          }

          setPhoneLookupResult(null);
          setPhoneLookupError(typeof apiError.message === 'string' ? apiError.message : t('contacts.error_load'));
        })
        .finally(() => {
          if (!phoneLookupRequestGuard.isLatestRequest(requestId)) {
            return;
          }
          setIsSearchingByPhone(false);
        });
    }, USERNAME_SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  async function bootstrapContactsScreen() {
    const requestId = bootstrapRequestGuard.beginRequest();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const currentPermissionStatus = await getContactsPermissionStatus();
      if (!bootstrapRequestGuard.isLatestRequest(requestId)) {
        return;
      }
      setPermissionStatus(currentPermissionStatus);
      const items = await loadMatchedContacts();
      if (!bootstrapRequestGuard.isLatestRequest(requestId)) {
        return;
      }
      const visibleItems = items.filter((item) => item.userId !== currentUser?.id);
      setContacts(visibleItems);
      registerContacts(visibleItems);
    } catch (error) {
      if (!bootstrapRequestGuard.isLatestRequest(requestId)) {
        return;
      }
      const message = extractErrorMessage(error, t('contacts.error_load'));
      setErrorMessage(message);
      setLastErrorMessage(message);
    } finally {
      if (bootstrapRequestGuard.isLatestRequest(requestId)) {
        setIsLoading(false);
      }
    }
  }

  async function refreshContactsAndSyncState(result: { importedCount: number; matchedCount: number }) {
    const items = await loadMatchedContacts();
    const visibleItems = items.filter((item) => item.userId !== currentUser?.id);
    setContacts(visibleItems);
    registerContacts(visibleItems);
    setLastSyncResult({
      importedCount: result.importedCount,
      matchedCount: result.matchedCount,
      syncedAt: new Date().toISOString(),
    });
  }

  async function handleSyncDeviceContacts() {
    setIsSyncingDeviceContacts(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const result = await importDeviceContacts();
      await refreshContactsAndSyncState(result);
      const imported = result.importedCount;
      const matched = result.matchedCount;
      if (imported === 1 && matched === 1) {
        setStatusMessage(t('contacts.toast_synced', { imported, matched }));
      } else if (imported !== 1 && matched === 1) {
        setStatusMessage(t('contacts.toast_synced_contacts', { imported, matched }));
      } else if (imported === 1 && matched !== 1) {
        setStatusMessage(t('contacts.toast_synced_accounts', { imported, matched }));
      } else {
        setStatusMessage(t('contacts.toast_synced_both', { imported, matched }));
      }
    } catch (error) {
      handleServiceError(error, t('contacts.error_sync'));
    } finally {
      setIsSyncingDeviceContacts(false);
    }
  }

  async function handleStartChat(contact: ContactListItem) {
    if (creatingChatForUserId !== null) {
      return;
    }

    setCreatingChatForUserId(contact.userId);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await createDirectChat(contact.userId);
      registerDirectChat({
        chatId: response.chat.id,
        title: contact.displayName,
        participantUserId: contact.userId,
      });
      navigation?.getParent?.()?.navigate('ChatThread', { chatId: response.chat.id });
    } catch (error) {
      const message = extractErrorMessage(error, t('contacts.error_start_chat'));
      setErrorMessage(message);
      setLastErrorMessage(message);
    } finally {
      setCreatingChatForUserId(null);
    }
  }

  function handleOpenProfile(params: {
    userId: string;
    displayName: string;
    username: string | null;
    avatarMediaId: string | null;
    phoneNumber?: string | null;
  }) {
    navigation?.getParent?.()?.navigate('UserProfileView', {
      userId: params.userId,
      displayName: params.displayName,
      username: params.username,
      avatarMediaId: params.avatarMediaId,
      phoneNumber: params.phoneNumber ?? null,
    });
  }

  async function handleRequestPermission() {
    setIsRequestingPermission(true);
    setErrorMessage(null);

    try {
      const nextStatus = await requestContactsPermission();
      setPermissionStatus(nextStatus);
      if (nextStatus === 'granted') {
        setStatusMessage(t('contacts.permission_granted_body'));
      }
    } catch {
      const message = t('contacts.error_load');
      setErrorMessage(message);
      setLastErrorMessage(message);
    } finally {
      setIsRequestingPermission(false);
    }
  }

  async function handleOpenSettings() {
    await openContactsSettings();
  }

  function handleServiceError(error: unknown, fallback: string) {
    if (error instanceof ContactsPermissionError) {
      setErrorMessage(error.message);
      setLastErrorMessage(error.message);
      return;
    }

    const message = extractErrorMessage(error, fallback);
    setErrorMessage(message);
    setLastErrorMessage(message);
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const normalizedUsernameQuery = normalizeUsernameQuery(searchQuery);
  const normalizedPhoneQuery = normalizePhoneSearchQuery(searchQuery);
  const canSyncDeviceContacts = permissionStatus === 'granted';
  const filteredContacts = contacts.filter((contact) => {
    if (!normalizedQuery) {
      return true;
    }

    return [contact.displayName, contact.username ?? '', contact.phoneNumber ?? '', contact.userId]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);
  });
  const isUsernameResultCurrentUser = usernameLookupResult?.id === currentUser?.id;
  const isUsernameResultInContacts = usernameLookupResult
    ? contacts.some((contact) => contact.userId === usernameLookupResult.id)
    : false;
  const isPhoneResultCurrentUser = phoneLookupResult?.id === currentUser?.id;
  const isPhoneResultInContacts = phoneLookupResult
    ? contacts.some((contact) => contact.userId === phoneLookupResult.id)
    : false;

  return (
    <IosScreen title={t('contacts.title')} contentContainerStyle={styles.screenContent}>
      <View style={styles.searchShell}>
        <IosSearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t('contacts.search_placeholder')}
        />
      </View>

      {!normalizedQuery ? (
        <Pressable
          onPress={() =>
            canSyncDeviceContacts ? void handleSyncDeviceContacts() : void handleRequestPermission()
          }
          style={styles.inviteBanner}
        >
          <View style={styles.inviteIconCircle}>
            <Text style={styles.inviteIcon}>➕</Text>
          </View>
          <View style={styles.inviteBody}>
            <Text style={styles.inviteTitle}>
              {canSyncDeviceContacts
                ? isSyncingDeviceContacts
                  ? t('contacts.status_syncing')
                  : t('contacts.action_sync')
                : isRequestingPermission
                  ? t('contacts.status_requesting')
                  : t('contacts.action_allow')}
            </Text>
            <Text style={styles.inviteSubtitle}>
              {lastSyncedAt
                ? t('contacts.hint_last_synced', { time: formatSyncTime(lastSyncedAt) })
                : t('contacts.hint_sync_first')}
            </Text>
          </View>
        </Pressable>
      ) : null}

      <View style={styles.utilityRow}>
        <Pressable onPress={() => void bootstrapContactsScreen()} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>{isLoading ? t('common.loading') : t('contacts.action_refresh')}</Text>
        </Pressable>
      </View>

      {!canSyncDeviceContacts ? (
        <ContactsPermissionGate
          permissionStatus={permissionStatus}
          isRequestingPermission={isRequestingPermission}
          onRequestPermission={() => void handleRequestPermission()}
          onOpenSettings={() => void handleOpenSettings()}
        />
      ) : null}

      {normalizedUsernameQuery.length > 0 ? (
        <IosSection title={t('contacts.section_find_username')}>
          {isSearchingByUsername ? (
            <ContactsEmptyState isLoading hasQuery query={searchQuery} />
          ) : usernameLookupResult ? (
            <View style={styles.usernameResultRow}>
              <Pressable
                onPress={() =>
                  handleOpenProfile({
                    userId: usernameLookupResult.id,
                    displayName: usernameLookupResult.displayName,
                    username: usernameLookupResult.username,
                    avatarMediaId: usernameLookupResult.avatarMediaId,
                  })
                }
                style={styles.usernameIdentity}
              >
                <ProfileAvatar
                  title={usernameLookupResult.displayName}
                  avatarMediaId={usernameLookupResult.avatarMediaId}
                  color={telegramColors.accent}
                />
                <View style={styles.usernameResultBody}>
                  <Text style={styles.usernameResultName}>{usernameLookupResult.displayName}</Text>
                  <Text style={styles.usernameResultMeta}>@{usernameLookupResult.username}</Text>
                  <Text style={styles.usernameResultHint}>
                    {isUsernameResultCurrentUser
                      ? t('contacts.hint_own_account')
                      : isUsernameResultInContacts
                        ? t('contacts.hint_already_in_contacts')
                        : t('contacts.hint_found')}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                disabled={isUsernameResultCurrentUser || creatingChatForUserId !== null}
                onPress={() =>
                  !isUsernameResultCurrentUser
                    ? void handleStartChat({
                        userId: usernameLookupResult.id,
                        displayName: usernameLookupResult.displayName,
                        phoneNumber: null,
                        username: usernameLookupResult.username,
                        avatarMediaId: usernameLookupResult.avatarMediaId,
                      })
                    : undefined
                }
                style={[
                  styles.messageChip,
                  isUsernameResultCurrentUser ? styles.messageChipDisabled : null,
                ]}
              >
                <Text style={[styles.messageChipText, isUsernameResultCurrentUser ? styles.messageChipTextDisabled : null]}>
                  {creatingChatForUserId === usernameLookupResult.id ? t('contacts.item_opening') : isUsernameResultCurrentUser ? t('contacts.hint_own_account') : t('contacts.item_message')}
                </Text>
              </Pressable>
            </View>
          ) : (
            <ContactsEmptyState isLoading={false} hasQuery query={usernameLookupError ?? searchQuery} />
          )}
        </IosSection>
      ) : null}

      {normalizedPhoneQuery.length > 0 ? (
        <IosSection title={t('contacts.section_find_phone')}>
          {isSearchingByPhone ? (
            <ContactsEmptyState isLoading hasQuery query={searchQuery} />
          ) : phoneLookupResult ? (
            <View style={styles.usernameResultRow}>
              <Pressable
                onPress={() =>
                  handleOpenProfile({
                    userId: phoneLookupResult.id,
                    displayName: phoneLookupResult.displayName,
                    username: phoneLookupResult.username,
                    avatarMediaId: phoneLookupResult.avatarMediaId,
                    phoneNumber: normalizedPhoneQuery,
                  })
                }
                style={styles.usernameIdentity}
              >
                <ProfileAvatar
                  title={phoneLookupResult.displayName}
                  avatarMediaId={phoneLookupResult.avatarMediaId}
                  color={telegramColors.accent}
                />
                <View style={styles.usernameResultBody}>
                  <Text style={styles.usernameResultName}>{phoneLookupResult.displayName}</Text>
                  <Text style={styles.usernameResultMeta}>
                    {phoneLookupResult.username ? `@${phoneLookupResult.username}` : normalizedPhoneQuery}
                  </Text>
                  <Text style={styles.usernameResultHint}>
                    {isPhoneResultCurrentUser
                      ? t('contacts.hint_own_account')
                      : isPhoneResultInContacts
                        ? t('contacts.hint_already_in_contacts')
                        : t('contacts.hint_found_phone')}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                disabled={isPhoneResultCurrentUser || creatingChatForUserId !== null}
                onPress={() =>
                  !isPhoneResultCurrentUser
                    ? void handleStartChat({
                        userId: phoneLookupResult.id,
                        displayName: phoneLookupResult.displayName,
                        phoneNumber: normalizedPhoneQuery,
                        username: phoneLookupResult.username,
                        avatarMediaId: phoneLookupResult.avatarMediaId,
                      })
                    : undefined
                }
                style={[
                  styles.messageChip,
                  isPhoneResultCurrentUser ? styles.messageChipDisabled : null,
                ]}
              >
                <Text style={[styles.messageChipText, isPhoneResultCurrentUser ? styles.messageChipTextDisabled : null]}>
                  {creatingChatForUserId === phoneLookupResult.id ? t('contacts.item_opening') : isPhoneResultCurrentUser ? t('contacts.hint_own_account') : t('contacts.item_message')}
                </Text>
              </Pressable>
            </View>
          ) : (
            <ContactsEmptyState isLoading={false} hasQuery query={phoneLookupError ?? searchQuery} />
          )}
        </IosSection>
      ) : null}

      <IosSection title={t('contacts.section_people')}>
        {filteredContacts.length > 0 ? (
          <ContactsAlphabetList
            contacts={filteredContacts}
            creatingChatForUserId={creatingChatForUserId}
            onStartChat={(contact) => void handleStartChat(contact)}
            onOpenProfile={(contact) =>
              handleOpenProfile({
                userId: contact.userId,
                displayName: contact.displayName,
                username: contact.username,
                avatarMediaId: contact.avatarMediaId,
                phoneNumber: contact.phoneNumber,
              })
            }
          />
        ) : (
          <ContactsEmptyState isLoading={isLoading} hasQuery={normalizedQuery.length > 0} query={searchQuery} />
        )}
      </IosSection>

      {statusMessage ? <Text style={styles.statusText}>{statusMessage}</Text> : null}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </IosScreen>
  );
}

function normalizeUsernameQuery(value: string) {
  const normalized = value.trim().replace(/^@+/, '').toLowerCase();
  if (!/^[a-z0-9_]{3,32}$/.test(normalized)) {
    return '';
  }

  return normalized;
}

function normalizePhoneSearchQuery(value: string) {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return '';
  }

  const hasPhoneCharacters = /[+\d()\-\s]/.test(trimmed);
  const digits = trimmed.replace(/\D/g, '');

  if (!hasPhoneCharacters || digits.length < 6) {
    return '';
  }

  return `${trimmed.startsWith('+') ? '+' : '+'}${digits}`;
}

function formatSyncTime(value: string | null) {
  if (!value) {
    return 'never';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'recently';
  }

  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function extractErrorMessage(error: unknown, fallback: string) {
  const apiError = error as ApiError;
  return error instanceof Error ? error.message : typeof apiError.message === 'string' ? apiError.message : fallback;
}

const styles = StyleSheet.create({
  screenContent: {
    gap: 12,
    paddingBottom: 18,
  },
  searchShell: {
    paddingHorizontal: 0,
  },
  inviteBanner: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: telegramLayout.sectionRadius,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  inviteIconCircle: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  inviteIcon: {
    color: telegramColors.accentDeep,
    fontSize: 22,
  },
  inviteBody: {
    flex: 1,
    gap: 2,
  },
  inviteTitle: {
    ...telegramText.rowTitle,
    color: telegramColors.accent,
    fontWeight: '600',
  },
  inviteSubtitle: {
    color: telegramColors.textSecondary,
    fontSize: 13,
  },
  utilityRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -2,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderColor: telegramColors.separator,
    borderRadius: telegramLayout.buttonRadius,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 16,
    ...telegramShadows.card,
  },
  secondaryButtonText: {
    color: telegramColors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  usernameResultRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 68,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  usernameIdentity: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  usernameResultBody: {
    flex: 1,
    gap: 2,
  },
  usernameResultName: {
    ...telegramText.rowTitle,
    fontWeight: '600',
  },
  usernameResultMeta: {
    color: telegramColors.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  usernameResultHint: {
    ...telegramText.caption,
  },
  messageChip: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  messageChipDisabled: {
    backgroundColor: telegramColors.surfaceMuted,
  },
  messageChipText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  messageChipTextDisabled: {
    color: telegramColors.textTertiary,
  },
  statusText: {
    color: telegramColors.online,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 2,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 2,
  },
});
