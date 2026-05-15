import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { joinChatByInvite } from '@features/chats/api/chats.api';
import type { ApiError } from '@shared/api/types';
import { useTranslation } from '@shared/i18n';
import { IosScreen } from '@shared/ui/ios/IosScreen';
import { IosSection } from '@shared/ui/ios/IosSection';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type JoinChatScreenProps = {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, params?: unknown) => void;
  };
};

export function JoinChatScreen({ navigation }: JoinChatScreenProps) {
  const { t } = useTranslation();
  const [inviteValue, setInviteValue] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const trimmedInviteValue = inviteValue.trim();
  const canJoin = trimmedInviteValue.length >= 6 && !isJoining;

  async function handleJoin() {
    if (!canJoin) {
      return;
    }

    setIsJoining(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await joinChatByInvite(trimmedInviteValue);
      setStatusMessage(
        response.joined ? t('chats.join.toast_joined') : t('chats.join.toast_already_member'),
      );
      navigation?.navigate('ChatThread', { chatId: response.chat.id });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('chats.join.error'));
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <IosScreen
      title={t('chats.join.title')}
      subtitle={t('chats.join.body')}
      headerMode="compact"
      headerAlignment="center"
      leftAction={
        <Pressable onPress={() => navigation?.goBack()} style={styles.headerAction}>
          <Text style={styles.headerActionText}>{t('common.cancel')}</Text>
        </Pressable>
      }
      rightAction={
        <Pressable disabled={!canJoin} onPress={() => void handleJoin()} style={styles.headerAction}>
          <Text style={[styles.headerActionAccent, !canJoin ? styles.headerActionDisabled : null]}>
            {isJoining ? 'Joining…' : t('common.join')}
          </Text>
        </Pressable>
      }
    >
      <View style={styles.screenBody}>
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>🔗</Text>
          </View>
          <Text style={styles.heroTitle}>{t('chats.join.title')}</Text>
          <Text style={styles.heroBody}>{t('chats.join.body')}</Text>
        </View>

        <IosSection title={t('chats.join.section_invite')}>
          <View style={styles.field}>
            <Text style={styles.label}>{t('chats.join.label_invite')}</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              multiline
              onChangeText={setInviteValue}
              placeholder={t('chats.join.placeholder_invite')}
              placeholderTextColor={telegramColors.textTertiary}
              style={[styles.input, styles.multilineInput]}
              value={inviteValue}
            />
            <Text style={styles.helperText}>{t('chats.join.hint_invite')}</Text>
          </View>
        </IosSection>

        {trimmedInviteValue.length > 0 ? (
          <IosSection title={t('profile.edit.section_preview')}>
            <View style={styles.previewCard}>
              <Text style={styles.previewLabel}>{t('chats.join.label_invite')}</Text>
              <Text style={styles.previewValue}>{trimmedInviteValue}</Text>
            </View>
          </IosSection>
        ) : null}

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
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 14,
    color: telegramColors.textPrimary,
    fontSize: 16,
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  multilineInput: {
    minHeight: 108,
    textAlignVertical: 'top',
  },
  helperText: {
    color: telegramColors.textTertiary,
    fontSize: 12,
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
  previewLabel: {
    ...telegramText.caption,
    color: telegramColors.accent,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  previewValue: {
    ...telegramText.body,
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
