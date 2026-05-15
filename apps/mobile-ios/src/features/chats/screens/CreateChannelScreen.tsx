import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { createChannelChat } from '@features/chats/api/chats.api';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type CreateChannelScreenProps = {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, params?: unknown) => void;
    replace?: (screen: string, params?: unknown) => void;
  };
};

export function CreateChannelScreen({ navigation }: CreateChannelScreenProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const canCreate = trimmedTitle.length > 0 && !isCreating;

  async function handleCreate() {
    if (!canCreate) {
      return;
    }

    setIsCreating(true);
    setErrorMessage(null);

    try {
      const response = await createChannelChat({
        title: trimmedTitle,
        ...(trimmedDescription ? { description: trimmedDescription } : {}),
      });

      navigation?.replace?.('ChatThread', { chatId: response.chat.id });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.create_channel.error'));
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <IosScreen
      title={t('chats.create_channel.title')}
      subtitle={t('chats.create_channel.body')}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.cancel')}</Text>
        </Pressable>
      }
      rightAction={
        <Pressable disabled={!canCreate} onPress={() => void handleCreate()} style={styles.headerAction}>
          <Text style={[styles.headerActionAccent, !canCreate ? styles.headerActionDisabled : null]}>
            {isCreating ? t('common.creating') : t('common.create')}
          </Text>
        </Pressable>
      }
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>📢</Text>
          </View>
          <Text style={styles.heroTitle}>{t('chats.create_channel.title')}</Text>
          <Text style={styles.heroBody}>{t('chats.create_channel.body')}</Text>
        </View>

        <IosSection title={t('chats.create_channel.section_identity')}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('chats.create_channel.label_title')}</Text>
            <TextInput
              autoFocus
              maxLength={80}
              onChangeText={setTitle}
              placeholder={t('chats.create_channel.placeholder_title')}
              placeholderTextColor={telegramColors.textTertiary}
              style={styles.input}
              value={title}
            />
            <Text style={styles.helperText}>{t('chats.create_channel.hint_title_length', { length: trimmedTitle.length })}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.field}>
            <Text style={styles.label}>{t('chats.create_channel.label_description')}</Text>
            <TextInput
              maxLength={160}
              multiline
              onChangeText={setDescription}
              placeholder={t('chats.create_channel.placeholder_description')}
              placeholderTextColor={telegramColors.textTertiary}
              style={[styles.input, styles.multilineInput]}
              value={description}
            />
            <Text style={styles.helperText}>{t('chats.create_channel.hint_description_length', { length: trimmedDescription.length })}</Text>
          </View>
        </IosSection>

        <IosSection title={t('chats.create_channel.section_preview')}>
          <View style={styles.previewCard}>
            <Text style={styles.previewCaption}>{t('chats.create_channel.preview_caption')}</Text>
            <Text style={styles.previewTitle}>{trimmedTitle || t('chats.create_channel.preview_title')}</Text>
            <Text style={styles.previewBody}>
              {trimmedDescription || t('chats.create_channel.preview_body')}
            </Text>
          </View>
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
  scrollContent: {
    gap: 18,
    paddingBottom: 24,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 24,
    gap: 10,
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
  field: {
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  label: {
    color: telegramColors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: 12,
    color: telegramColors.textPrimary,
    fontSize: 17,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  multilineInput: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  helperText: {
    color: telegramColors.textTertiary,
    fontSize: 12,
  },
  separator: {
    backgroundColor: telegramColors.separator,
    height: 0.5,
    marginLeft: 14,
  },
  previewCard: {
    backgroundColor: telegramColors.accentSoft,
    borderColor: 'rgba(212,148,58,0.18)',
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  previewCaption: {
    color: telegramColors.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  previewTitle: {
    color: telegramColors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  previewBody: {
    color: telegramColors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    color: telegramColors.destructive,
    fontSize: 14,
    paddingHorizontal: 4,
  },
});
