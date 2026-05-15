import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { createUploadSession, finalizeUpload, uploadToSignedUrl } from '@features/messages/api/media.api';
import { pickPendingMediaAttachments, MediaPickerCancelledError, MediaPickerUnavailableError, type PendingMediaAttachment } from '@features/messages/services/media-compose.service';
import { updateCurrentUserProfile } from '@features/profile/api/profile.api';
import { useAvatarPreviewUrl } from '@features/profile/hooks/useAvatarPreviewUrl';
import { useUsernameAvailability } from '@features/profile/hooks/useUsernameAvailability';
import { buildUsernameSuggestions, normalizeUsernameInput, validateUsername } from '@features/profile/services/profile-validation';
import type { ApiError } from '@shared/api/types';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { IosAvatar } from '@shared/ui/ios/IosAvatar';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

export function EditProfileScreen({ navigation }: { navigation: any }) {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const setCurrentUser = useSessionStore((state) => state.setCurrentUser);
  const [username, setUsername] = useState(currentUser?.username ?? '');
  const [displayName, setDisplayName] = useState(currentUser?.displayName ?? '');
  const [bio, setBio] = useState(currentUser?.bio ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const [avatarMediaId, setAvatarMediaId] = useState<string | null>(currentUser?.avatarMediaId ?? null);
  const avatarPreviewUrl = useAvatarPreviewUrl(avatarMediaId);
  const trimmedUsername = username.trim().toLowerCase();
  const trimmedDisplayName = displayName.trim();
  const trimmedBio = bio.trim();
  const nextBio = trimmedBio.length > 0 ? trimmedBio : null;
  const usernameValidationMessage = validateUsername(trimmedUsername);
  const usernameAvailability = useUsernameAvailability(trimmedUsername, currentUser?.id ?? null);
  const isUnchanged =
    trimmedUsername === (currentUser?.username ?? '') &&
    trimmedDisplayName === (currentUser?.displayName ?? '') &&
    nextBio === (currentUser?.bio ?? null) &&
    avatarMediaId === (currentUser?.avatarMediaId ?? null);
  const canSave =
    Boolean(currentUser) &&
    !isSaving &&
    !isUploadingAvatar &&
    trimmedDisplayName.length > 0 &&
    !usernameValidationMessage &&
    usernameAvailability.status !== 'taken' &&
    !isUnchanged;

  useEffect(() => {
    setAvatarMediaId(currentUser?.avatarMediaId ?? null);
  }, [currentUser?.avatarMediaId]);

  if (!currentUser) {
    return (
      <IosScreen
        title={t('profile.edit.title')}
        headerMode="compact"
        headerAlignment="center"
        leftAction={
          <Pressable onPress={() => navigation.goBack()} style={styles.headerAction}>
            <Text style={styles.headerActionText}>{t('common.cancel')}</Text>
          </Pressable>
        }
      >
        <View style={styles.emptyStateCard}>
          <Text style={styles.emptyStateTitle}>{t('profile.edit.title')}</Text>
          <Text style={styles.emptyStateBody}>{t('settings.privacy.hint_signed_out')}</Text>
        </View>
      </IosScreen>
    );
  }

  async function handleSave() {
    const user = currentUser;

    if (!user) {
      return;
    }

    if (!canSave) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await updateCurrentUserProfile({
        username: trimmedUsername,
        displayName: trimmedDisplayName,
        bio: nextBio,
        avatarMediaId,
      });

      setCurrentUser({
        ...user,
        username: response.profile.username,
        displayName: response.profile.displayName,
        bio: response.profile.bio,
        avatarMediaId: response.profile.avatarMediaId,
      });
      setAvatarMediaId(response.profile.avatarMediaId);
      setUsernameSuggestions([]);
      setStatusMessage(t('profile.edit.toast_updated'));
    } catch (error) {
      const apiError = error as ApiError;
      const normalizedMessage = Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message;
      if (typeof normalizedMessage === 'string' && normalizedMessage.toLowerCase().includes('already in use')) {
        setUsernameSuggestions(buildUsernameSuggestions(trimmedUsername, user.id));
        setErrorMessage(t('profile.edit.error_username_taken'));
      } else {
        setErrorMessage(typeof normalizedMessage === 'string' ? normalizedMessage : t('profile.edit.error_generic'));
      }
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePickAvatar() {
    if (isSaving || isUploadingAvatar) {
      return;
    }

    setErrorMessage(null);
    setStatusMessage(null);
    setIsUploadingAvatar(true);

    try {
      const attachments = await pickPendingMediaAttachments('image');
      const attachment = attachments[0];

      if (!attachment) {
        setIsUploadingAvatar(false);
        return;
      }

      const uploadedAvatar = await uploadAvatarAttachment(attachment);
      setAvatarMediaId(uploadedAvatar.mediaId);
      setStatusMessage(t('profile.edit.toast_ready'));
    } catch (error) {
      if (error instanceof MediaPickerCancelledError) {
        setStatusMessage(t('profile.edit.toast_cancelled'));
      } else if (error instanceof MediaPickerUnavailableError) {
        setErrorMessage(error.message);
      } else {
        const apiError = error as ApiError;
        setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('profile.edit.error_avatar'));
      }
    } finally {
      setIsUploadingAvatar(false);
    }
  }

  function handleRemoveAvatar() {
    if (isSaving || isUploadingAvatar) {
      return;
    }

    setAvatarMediaId(null);
    setStatusMessage(t('profile.edit.toast_remove'));
    setErrorMessage(null);
  }

  function handleApplyUsernameSuggestion(candidate: string) {
    setUsername(candidate);
    setUsernameSuggestions([]);
    setErrorMessage(null);
    setStatusMessage(null);
  }

  return (
    <IosScreen
      title={t('profile.edit.title')}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.cancel')}</Text>
        </Pressable>
      }
      rightAction={
        <Pressable disabled={!canSave} onPress={() => void handleSave()} style={styles.headerAction}>
          <Text style={[styles.headerActionText, styles.headerActionTextAccent, !canSave ? styles.headerActionTextDisabled : null]}>
            {isSaving ? t('common.saving') : t('common.save')}
          </Text>
        </Pressable>
      }
    >
      <View style={styles.screenBody}>
        <View style={styles.avatarWrap}>
          <Pressable
            disabled={isUploadingAvatar || isSaving}
            onPress={() => void handlePickAvatar()}
            style={styles.avatarPressable}
          >
            <IosAvatar
              title={displayName || currentUser.displayName || t('profile.edit.fallback_name')}
              size={96}
              imageUrl={avatarPreviewUrl}
            />
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>✎</Text>
            </View>
          </Pressable>
          <Text style={styles.heroTitle}>{displayName || currentUser.displayName || t('profile.edit.fallback_name')}</Text>
          <Text style={styles.heroSubtitle}>{trimmedUsername ? `@${trimmedUsername}` : t('profile.edit.hint_no_username')}</Text>
          <Text style={styles.heroHelper}>
            {isUploadingAvatar
              ? t('profile.edit.status_uploading')
              : avatarMediaId
                ? t('profile.edit.action_change_avatar')
                : t('profile.edit.action_add_avatar')}
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('profile.edit.label_display_name')}</Text>
            <TextInput maxLength={80} onChangeText={setDisplayName} style={styles.input} value={displayName} />
            <Text style={styles.helperText}>{t('profile.edit.hint_display_name_count', { count: displayName.trim().length })}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.field}>
            <Text style={styles.label}>{t('profile.edit.label_username')}</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={32}
              onChangeText={(value: string) => {
                setUsername(normalizeUsernameInput(value));
                if (errorMessage) {
                  setErrorMessage(null);
                }
              }}
              style={styles.input}
              value={username}
            />
            <Text
              style={
                usernameValidationMessage || usernameAvailability.status === 'taken' || usernameAvailability.status === 'error'
                  ? styles.helperTextError
                  : usernameAvailability.status === 'available'
                    ? styles.helperTextSuccess
                    : styles.helperText
              }
            >
              {usernameValidationMessage ?? usernameAvailability.message ?? t('profile.edit.hint_username_rules')}
            </Text>
            {usernameSuggestions.length > 0 ? (
              <View style={styles.suggestionRow}>
                {usernameSuggestions.map((candidate) => (
                  <Pressable key={candidate} onPress={() => handleApplyUsernameSuggestion(candidate)} style={styles.suggestionChip}>
                    <Text style={styles.suggestionChipText}>@{candidate}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.formCard}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('profile.edit.label_bio')}</Text>
            <TextInput maxLength={160} multiline onChangeText={setBio} style={[styles.input, styles.multilineInput]} value={bio} />
            <Text style={styles.helperText}>{t('profile.edit.hint_bio_count', { count: bio.trim().length })}</Text>
          </View>
        </View>

        {statusMessage ? (
          <View style={[styles.feedbackCard, styles.feedbackCardSuccess]}>
            <Text style={styles.statusText}>{statusMessage}</Text>
          </View>
        ) : null}
        {errorMessage ? (
          <View style={[styles.feedbackCard, styles.feedbackCardError]}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {avatarMediaId ? (
          <Pressable disabled={isUploadingAvatar || isSaving} onPress={handleRemoveAvatar} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>{t('common.remove')}</Text>
          </Pressable>
        ) : null}

        <Text style={styles.footerHint}>
          {t('profile.edit.hint_username_rules')} {'\n'}
          {avatarMediaId ? t('profile.edit.hint_avatar_linked', { id: avatarMediaId.slice(0, 18) }) : t('profile.edit.hint_no_avatar')}
        </Text>
      </View>
    </IosScreen>
  );
}

async function uploadAvatarAttachment(attachment: PendingMediaAttachment) {
  const uploadSession = await createUploadSession({
    mediaType: 'avatar',
    fileName: attachment.displayName,
    mimeType: attachment.mimeType ?? 'image/jpeg',
    sizeBytes: attachment.fileSizeBytes ?? 1,
  });

  await uploadToSignedUrl({
    uploadUrl: uploadSession.upload.uploadUrl,
    method: uploadSession.upload.method,
    headers: uploadSession.upload.headers,
    localUri: attachment.localUri,
  });

  const finalized = await finalizeUpload({
    uploadId: uploadSession.uploadId,
  });

  return {
    mediaId: finalized.media.id,
  };
}

const styles = StyleSheet.create({
  headerAction: {
    minHeight: 32,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  headerActionText: {
    color: telegramColors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  headerActionTextAccent: {
    color: telegramColors.accent,
    fontWeight: '700',
  },
  headerActionTextDisabled: {
    color: telegramColors.textTertiary,
  },
  screenBody: {
    gap: 16,
    paddingBottom: 20,
  },
  emptyStateCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 22,
    ...telegramShadows.card,
  },
  emptyStateTitle: {
    ...telegramText.sectionTitle,
  },
  emptyStateBody: {
    ...telegramText.secondary,
    textAlign: 'center',
  },
  avatarWrap: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 4,
  },
  avatarPressable: {
    padding: 8,
    position: 'relative',
  },
  avatarBadge: {
    alignItems: 'center',
    backgroundColor: telegramColors.accent,
    borderColor: telegramColors.appBackground,
    borderRadius: 14,
    borderWidth: 3,
    bottom: 8,
    height: 28,
    justifyContent: 'center',
    position: 'absolute',
    right: 6,
    width: 28,
  },
  avatarBadgeText: {
    color: telegramColors.appBackground,
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    ...telegramText.sectionTitle,
    fontSize: 22,
  },
  heroSubtitle: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  heroHelper: {
    ...telegramText.secondary,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    overflow: 'hidden',
    ...telegramShadows.card,
  },
  field: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  label: {
    ...telegramText.caption,
    color: telegramColors.textSecondary,
    fontWeight: '600',
  },
  input: {
    backgroundColor: telegramColors.appBackground,
    borderRadius: 16,
    color: telegramColors.textPrimary,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  helperText: {
    ...telegramText.caption,
  },
  helperTextSuccess: {
    ...telegramText.caption,
    color: telegramColors.online,
  },
  helperTextError: {
    ...telegramText.caption,
    color: telegramColors.destructive,
  },
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 4,
  },
  suggestionChip: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  suggestionChipText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: telegramLayout.hairlineWidth,
    marginLeft: 16,
  },
  feedbackCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  feedbackCardSuccess: {
    backgroundColor: telegramColors.onlineSoft,
  },
  feedbackCardError: {
    backgroundColor: telegramColors.destructSoft,
  },
  statusText: {
    color: telegramColors.online,
    fontSize: 14,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
  },
  removeButton: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  removeButtonText: {
    color: telegramColors.destructive,
    fontSize: 16,
    fontWeight: '600',
  },
  footerHint: {
    ...telegramText.caption,
    color: telegramColors.textSecondary,
    lineHeight: 18,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});
