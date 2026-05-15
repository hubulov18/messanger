import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AuthBackButton } from '@features/auth/components/AuthBackButton';
import { AuthPrimaryButton, AuthScreenLayout, AuthStatusText } from '@features/auth/components/AuthScreenLayout';
import { updateCurrentUserProfile } from '@features/profile/api/profile.api';
import { useUsernameAvailability } from '@features/profile/hooks/useUsernameAvailability';
import {
  buildUsernameSuggestions,
  normalizeUsernameInput,
  slugifyUsernamePart,
  validateUsername,
} from '@features/profile/services/profile-validation';
import type { ApiError } from '@shared/api/types';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

export function ProfileSetupScreen() {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const accessToken = useSessionStore((state) => state.accessToken);
  const refreshToken = useSessionStore((state) => state.refreshToken);
  const deviceId = useSessionStore((state) => state.deviceId);
  const setAuthenticatedSession = useSessionStore((state) => state.setAuthenticatedSession);
  const beginPhoneEntry = useSessionStore((state) => state.beginPhoneEntry);

  const initialDisplayName = currentUser?.displayName?.trim() && currentUser.displayName !== 'New User'
    ? currentUser.displayName.trim()
    : '';
  const [firstName, setFirstName] = useState(initialDisplayName.split(' ')[0] ?? '');
  const [lastName, setLastName] = useState(initialDisplayName.split(' ').slice(1).join(' '));
  const initialUsername = currentUser?.username?.trim() ?? '';
  const generatedUsername = buildSuggestedUsername(firstName, lastName, currentUser?.id ?? '');
  const [username, setUsername] = useState(initialUsername || generatedUsername);
  const [bio, setBio] = useState(currentUser?.bio ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const trimmedUsername = username.trim().toLowerCase();
  const normalizedBio = bio.trim() ? bio.trim() : null;
  const resolvedDisplayName = [trimmedFirstName, trimmedLastName].filter(Boolean).join(' ');
  const initials = [trimmedFirstName[0], trimmedLastName[0]].filter(Boolean).join('').slice(0, 2).toUpperCase();
  const usernameValidationMessage = validateUsername(trimmedUsername);
  const usernameAvailability = useUsernameAvailability(trimmedUsername, currentUser?.id ?? null);
  const canSubmit =
    resolvedDisplayName.length >= 2 &&
    !usernameValidationMessage &&
    usernameAvailability.status !== 'taken' &&
    !isSubmitting &&
    Boolean(currentUser && accessToken && refreshToken && deviceId);

  async function handleContinue() {
    if (!canSubmit || !currentUser || !accessToken || !refreshToken || !deviceId) {
      setErrorMessage(t('auth.profile.prompt_enter'));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setStatusMessage(t('auth.profile.toast_saving'));

    try {
      const response = await updateCurrentUserProfile({
        username: trimmedUsername,
        displayName: resolvedDisplayName,
        bio: normalizedBio,
      });
      setStatusMessage(t('auth.profile.toast_ready'));
      setUsernameSuggestions([]);

      setAuthenticatedSession({
        accessToken,
        refreshToken,
        deviceId,
        currentUser: {
          ...currentUser,
          displayName: response.profile.displayName,
          bio: response.profile.bio,
          avatarMediaId: response.profile.avatarMediaId,
          username: response.profile.username,
        },
      });
    } catch (error) {
      const apiError = error as ApiError;
      setStatusMessage(null);
      const normalizedMessage = Array.isArray(apiError.message) ? apiError.message.join(', ') : apiError.message;
      if (typeof normalizedMessage === 'string' && normalizedMessage.toLowerCase().includes('already in use')) {
        setUsernameSuggestions(buildUsernameSuggestions(trimmedUsername, currentUser?.id));
        setErrorMessage(t('auth.profile.error_username_taken'));
      } else {
        setErrorMessage(typeof normalizedMessage === 'string' ? normalizedMessage : t('auth.profile.error_generic'));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleApplyUsernameSuggestion(candidate: string) {
    setUsername(candidate);
    setUsernameSuggestions([]);
    setErrorMessage(null);
  }

  return (
    <AuthScreenLayout
      icon="✨"
      leftAction={<AuthBackButton label={t('auth.profile.back_label')} onPress={beginPhoneEntry} />}
      subtitle={t('auth.profile.body')}
      title={t('auth.profile.title')}
    >
      <View style={styles.avatarCard}>
        <View style={[styles.avatarPreview, resolvedDisplayName ? styles.avatarPreviewFilled : null]}>
          <Text style={styles.avatarPreviewText}>{resolvedDisplayName ? initials || 'A' : 'A'}</Text>
        </View>
        <View style={styles.avatarMeta}>
          <Text style={styles.avatarTitle}>{t('auth.profile.photo_title')}</Text>
          <Text style={styles.avatarSubtitle}>{t('auth.profile.photo_action')}</Text>
        </View>
      </View>

      <View style={styles.formCard}>
        <LabeledInput
          label={t('auth.profile.label_first_name')}
          onChangeText={setFirstName}
          placeholder={t('auth.profile.placeholder_first_name')}
          value={firstName}
        />
        <LabeledInput
          label={t('auth.profile.label_last_name')}
          onChangeText={setLastName}
          placeholder={t('auth.profile.placeholder_last_name')}
          value={lastName}
        />
        <LabeledInput
          autoCapitalize="none"
          autoCorrect={false}
          label={t('auth.profile.label_username')}
          maxLength={32}
          onChangeText={(value) => {
            setUsername(normalizeUsernameInput(value));
            if (errorMessage) {
              setErrorMessage(null);
            }
          }}
          placeholder={t('auth.profile.placeholder_username')}
          value={username}
        />
        <Text
          style={
            usernameValidationMessage || usernameAvailability.status === 'taken' || usernameAvailability.status === 'error'
              ? styles.helperError
              : usernameAvailability.status === 'available'
                ? styles.helperSuccess
                : styles.helperText
          }
        >
          {usernameValidationMessage ?? usernameAvailability.message ?? t('auth.profile.hint_username')}
        </Text>
        {usernameSuggestions.length > 0 ? (
          <View style={styles.suggestionRow}>
            {usernameSuggestions.map((candidate) => (
              <Pressable key={candidate} onPress={() => handleApplyUsernameSuggestion(candidate)} style={({ pressed }: { pressed: boolean }) => [styles.suggestionChip, pressed ? styles.pressed : null]}>
                <Text style={styles.suggestionChipText}>@{candidate}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <LabeledInput
          autoCapitalize="sentences"
          label={t('auth.profile.label_bio')}
          multiline
          onChangeText={setBio}
          placeholder={t('auth.profile.placeholder_bio')}
          value={bio}
        />
      </View>

      {(resolvedDisplayName || trimmedUsername) ? (
        <View style={styles.previewCard}>
          <Text style={styles.previewHeader}>{t('auth.profile.label_preview')}</Text>
          <View style={styles.previewRow}>
            <View style={[styles.previewAvatar, resolvedDisplayName ? styles.avatarPreviewFilled : null]}>
              <Text style={styles.previewAvatarText}>{resolvedDisplayName ? initials || 'A' : 'A'}</Text>
            </View>
            <View style={styles.previewMeta}>
              <Text style={styles.previewName}>{resolvedDisplayName || t('auth.profile.preview_name')}</Text>
              <Text style={styles.previewUsername}>{trimmedUsername ? `@${trimmedUsername}` : t('auth.profile.preview_username')}</Text>
            </View>
          </View>
        </View>
      ) : null}

      <AuthPrimaryButton
        disabled={!canSubmit}
        label={isSubmitting ? t('auth.profile.submit_saving') : t('auth.profile.submit_label')}
        onPress={() => void handleContinue()}
      />

      {statusMessage ? <AuthStatusText tone="success">{statusMessage}</AuthStatusText> : null}
      {errorMessage ? <AuthStatusText tone="error">{errorMessage}</AuthStatusText> : null}
    </AuthScreenLayout>
  );
}

function LabeledInput({
  label,
  multiline = false,
  ...rest
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  maxLength?: number;
  multiline?: boolean;
}) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        autoCorrect={false}
        placeholderTextColor={telegramColors.textTertiary}
        style={[styles.input, multiline ? styles.multilineInput : null]}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  avatarCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    ...telegramShadows.card,
  },
  avatarPreview: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  avatarPreviewFilled: {
    backgroundColor: telegramColors.accent,
  },
  avatarPreviewText: {
    color: telegramColors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  avatarMeta: {
    flex: 1,
    gap: 3,
  },
  avatarTitle: {
    ...telegramText.rowTitle,
  },
  avatarSubtitle: {
    ...telegramText.secondary,
    color: telegramColors.accent,
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 16,
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...telegramShadows.card,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    ...telegramText.caption,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 12,
    color: telegramColors.textPrimary,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  multilineInput: {
    minHeight: 92,
  },
  helperText: {
    ...telegramText.caption,
    color: telegramColors.textTertiary,
    marginTop: -4,
  },
  helperSuccess: {
    ...telegramText.caption,
    color: telegramColors.online,
    marginTop: -4,
  },
  helperError: {
    ...telegramText.caption,
    color: telegramColors.destructive,
    marginTop: -4,
  },
  suggestionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: telegramLayout.pillRadius,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  suggestionChipText: {
    color: telegramColors.accentDeep,
    fontSize: 13,
    fontWeight: '700',
  },
  previewCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 16,
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...telegramShadows.card,
  },
  previewHeader: {
    ...telegramText.caption,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  previewRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  previewAvatar: {
    alignItems: 'center',
    backgroundColor: telegramColors.surfaceMid,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  previewAvatarText: {
    color: telegramColors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  previewMeta: {
    flex: 1,
    gap: 2,
  },
  previewName: {
    ...telegramText.rowTitle,
  },
  previewUsername: {
    ...telegramText.secondary,
    color: telegramColors.accent,
    fontWeight: '600',
  },
});

function buildSuggestedUsername(firstName: string, lastName: string, userId: string) {
  const primary = slugifyUsernamePart(firstName);
  const secondary = slugifyUsernamePart(lastName);
  const merged = [primary, secondary].filter(Boolean).join('_');
  const suffix = userId.slice(-4).toLowerCase();
  const base = normalizeUsernameInput(merged || `user_${suffix || 'new'}`);
  const normalizedBase = base.slice(0, Math.max(0, 32 - (suffix ? 5 : 0)));
  const candidate = suffix ? `${normalizedBase}_${suffix}` : normalizedBase;
  return candidate.length >= 4 ? candidate : `user_${suffix || '0001'}`;
}
