import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { getChat, updateChat } from '@features/chats/api/chats.api';
import { createUploadSession, finalizeUpload, uploadToSignedUrl } from '@features/messages/api/media.api';
import {
  MediaPickerCancelledError,
  MediaPickerUnavailableError,
  pickPendingMediaAttachments,
  type PendingMediaAttachment,
} from '@features/messages/services/media-compose.service';
import { useAvatarPreviewUrl } from '@features/profile/hooks/useAvatarPreviewUrl';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosAvatar } from '@shared/ui/ios/IosAvatar';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type EditChatScreenProps = {
  navigation?: {
    goBack: () => void;
  };
  route?: {
    params?: {
      chatId?: string;
    };
  };
};

export function EditChatScreen({ navigation, route }: EditChatScreenProps) {
  const { t } = useTranslation();
  const chatId = route?.params?.chatId ?? '';
  const [initialTitle, setInitialTitle] = useState('');
  const [initialDescription, setInitialDescription] = useState('');
  const [initialPhotoMediaId, setInitialPhotoMediaId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoMediaId, setPhotoMediaId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const previewUrl = useAvatarPreviewUrl(photoMediaId);

  useEffect(() => {
    if (!chatId) {
      setIsLoading(false);
      setErrorMessage(t('chats.info.error_unavailable'));
      return;
    }

    void loadChat();
  }, [chatId]);

  async function loadChat() {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const chat = await getChat(chatId);
      const nextTitle = chat.title ?? chat.summary.displayTitle;
      const nextDescription = chat.description ?? '';
      const nextPhotoMediaId = chat.photoMediaId ?? null;

      setInitialTitle(nextTitle);
      setInitialDescription(nextDescription);
      setInitialPhotoMediaId(nextPhotoMediaId);
      setTitle(nextTitle);
      setDescription(nextDescription);
      setPhotoMediaId(nextPhotoMediaId);
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.info.error_load'));
    } finally {
      setIsLoading(false);
    }
  }

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const nextDescription = trimmedDescription.length > 0 ? trimmedDescription : null;
  const isUnchanged =
    trimmedTitle === initialTitle.trim() &&
    nextDescription === (initialDescription.trim().length > 0 ? initialDescription.trim() : null) &&
    photoMediaId === initialPhotoMediaId;
  const canSave = !isLoading && !isSaving && !isUploadingPhoto && trimmedTitle.length > 0 && !isUnchanged;

  async function handleSave() {
    if (!canSave) {
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      await updateChat(chatId, {
        title: trimmedTitle,
        description: nextDescription,
        photoMediaId,
      });
      setStatusMessage(t('chats.edit.toast_updated'));
      navigation?.goBack();
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.edit.error'));
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePickPhoto() {
    if (isSaving || isUploadingPhoto) {
      return;
    }

    setIsUploadingPhoto(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const attachments = await pickPendingMediaAttachments('image');
      const attachment = attachments[0];

      if (!attachment) {
        return;
      }

      const uploadedPhoto = await uploadChatPhoto(attachment);
      setPhotoMediaId(uploadedPhoto.mediaId);
      setStatusMessage(t('chats.edit.toast_photo_ready'));
    } catch (error) {
      if (error instanceof MediaPickerCancelledError) {
        setStatusMessage(t('chats.edit.toast_photo_cancelled'));
      } else if (error instanceof MediaPickerUnavailableError) {
        setErrorMessage(error.message);
      } else {
        const apiError = error as ApiError;
        setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.edit.error_photo'));
      }
    } finally {
      setIsUploadingPhoto(false);
    }
  }

  function handleRemovePhoto() {
    if (isSaving || isUploadingPhoto) {
      return;
    }

    setPhotoMediaId(null);
    setStatusMessage(t('chats.edit.toast_photo_remove'));
    setErrorMessage(null);
  }

  return (
    <IosScreen
      title={t('chats.edit.title')}
      subtitle={t('chats.edit.body')}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.cancel')}</Text>
        </Pressable>
      }
      rightAction={
        <Pressable disabled={!canSave} onPress={() => void handleSave()} style={styles.headerAction}>
          <Text style={[styles.headerActionAccent, !canSave ? styles.headerActionDisabled : null]}>
            {isSaving ? t('common.saving') : t('common.save')}
          </Text>
        </Pressable>
      }
    >
      <View style={styles.screenBody}>
        <View style={styles.heroShell}>
          <Pressable onPress={() => void handlePickPhoto()} style={styles.avatarRing}>
            <IosAvatar title={trimmedTitle || 'Chat'} size={92} imageUrl={previewUrl} />
          </Pressable>
          <Text style={styles.heroTitle}>{trimmedTitle || t('chats.edit.fallback_title')}</Text>
          <Text style={styles.heroSubtitle}>{nextDescription ?? t('chats.edit.fallback_description')}</Text>
          <View style={styles.avatarActions}>
            <Pressable onPress={() => void handlePickPhoto()} style={[styles.avatarActionChip, styles.avatarActionChipAccent]}>
              <Text style={styles.avatarActionChipAccentText}>
                {isUploadingPhoto ? t('chats.edit.status_uploading') : photoMediaId ? t('chats.edit.label_change_photo') : t('chats.edit.label_add_photo')}
              </Text>
            </Pressable>
            {photoMediaId ? (
              <Pressable onPress={handleRemovePhoto} style={styles.avatarActionChip}>
                <Text style={styles.avatarActionChipText}>{t('common.remove')}</Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        <IosSection title={t('chats.edit.section_identity')}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('chats.edit.label_title')}</Text>
            <TextInput maxLength={80} onChangeText={setTitle} style={styles.input} value={title} />
            <Text style={styles.helperText}>{t('chats.edit.hint_title_length', { length: trimmedTitle.length })}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.field}>
            <Text style={styles.label}>{t('chats.edit.label_description')}</Text>
            <TextInput
              maxLength={160}
              multiline
              onChangeText={setDescription}
              style={[styles.input, styles.multilineInput]}
              value={description}
            />
            <Text style={styles.helperText}>{t('chats.edit.hint_description_length', { length: trimmedDescription.length })}</Text>
          </View>
        </IosSection>

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
      </View>
    </IosScreen>
  );
}

async function uploadChatPhoto(attachment: PendingMediaAttachment) {
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
  screenBody: {
    gap: 18,
  },
  heroShell: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 22,
    ...telegramShadows.card,
  },
  avatarRing: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderColor: 'rgba(212,148,58,0.16)',
    borderRadius: 999,
    borderWidth: 8,
    justifyContent: 'center',
    padding: 4,
  },
  heroTitle: {
    ...telegramText.sectionTitle,
    fontSize: 24,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...telegramText.secondary,
    textAlign: 'center',
  },
  avatarActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  avatarActionChip: {
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  avatarActionChipAccent: {
    backgroundColor: telegramColors.accentSoft,
  },
  avatarActionChipText: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  avatarActionChipAccentText: {
    color: telegramColors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  field: {
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  label: {
    color: telegramColors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 14,
    color: telegramColors.textPrimary,
    fontSize: 17,
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  helperText: {
    color: telegramColors.textTertiary,
    fontSize: 12,
  },
  multilineInput: {
    minHeight: 82,
    textAlignVertical: 'top',
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: 0.5,
    marginLeft: 14,
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
});
