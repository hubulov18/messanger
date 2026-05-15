import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { startRegistration, verifyOtp } from '@features/auth/api/auth.api';
import { AuthBackButton } from '@features/auth/components/AuthBackButton';
import { AuthPrimaryButton, AuthScreenLayout, AuthSecondaryButton, AuthStatusText } from '@features/auth/components/AuthScreenLayout';
import { getCurrentUserProfile } from '@features/profile/api/profile.api';
import type { ApiError } from '@shared/api/types';
import { getOrCreateDeviceId } from '@shared/auth/device';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { saveRefreshSession } from '@shared/storage/secure-session-storage';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

const OTP_LENGTH = 6;
const RESEND_INTERVAL_SEC = 30;
const CHALLENGE_GRACE_MS = 1_000;

export function OtpVerificationScreen() {
  const { t } = useTranslation();
  const pendingChallenge = useSessionStore((state) => state.pendingChallenge);
  const clearPendingChallenge = useSessionStore((state) => state.clearPendingChallenge);
  const setPendingChallenge = useSessionStore((state) => state.setPendingChallenge);
  const setAuthenticatedSession = useSessionStore((state) => state.setAuthenticatedSession);
  const setProfileSetupSession = useSessionStore((state) => state.setProfileSetupSession);

  const inputRef = useRef<TextInput | null>(null);
  const lastSubmittedCodeRef = useRef<string | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [resendCountdownSec, setResendCountdownSec] = useState(RESEND_INTERVAL_SEC);
  const [challengeRemainingSec, setChallengeRemainingSec] = useState(getChallengeRemainingSec(pendingChallenge?.expiresAt));

  useEffect(() => {
    if (resendCountdownSec <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendCountdownSec((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCountdownSec]);

  useEffect(() => {
    setChallengeRemainingSec(getChallengeRemainingSec(pendingChallenge?.expiresAt));
  }, [pendingChallenge?.challengeId, pendingChallenge?.expiresAt]);

  useEffect(() => {
    if (!pendingChallenge?.expiresAt) {
      return;
    }

    const timer = setInterval(() => {
      setChallengeRemainingSec(getChallengeRemainingSec(pendingChallenge.expiresAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingChallenge?.expiresAt]);

  useEffect(() => {
    if (otpCode.length !== OTP_LENGTH || isSubmitting || challengeRemainingSec <= 0) {
      return;
    }

    if (lastSubmittedCodeRef.current === otpCode) {
      return;
    }

    lastSubmittedCodeRef.current = otpCode;
    void handleVerify(otpCode);
  }, [otpCode, isSubmitting, challengeRemainingSec]);

  async function handleVerify(codeOverride?: string) {
    if (!pendingChallenge || isSubmitting) {
      return;
    }

    if (challengeRemainingSec <= 0) {
      setStatusMessage(null);
      setErrorMessage(t('auth.otp.toast_expired'));
      return;
    }

    const code = (codeOverride ?? otpCode).trim();
    if (code.length !== OTP_LENGTH) {
      setStatusMessage(null);
      setErrorMessage(t('auth.otp.toast_enter_digits', { length: OTP_LENGTH }));
      return;
    }

    const deviceId = getOrCreateDeviceId();

    setIsSubmitting(true);
    setErrorMessage(null);
    setStatusMessage(t('auth.otp.toast_verifying'));

    try {
      const authSession = await verifyOtp({
        challengeId: pendingChallenge.challengeId,
        code,
        deviceId,
      });

      useSessionStore.setState({
        accessToken: authSession.accessToken,
        refreshToken: authSession.refreshToken,
        deviceId,
      });

      setStatusMessage(authSession.user.isNewUser ? t('auth.otp.toast_confirmed_setup') : t('auth.otp.toast_confirmed_open'));
      const currentUser = await getCurrentUserProfile();

      await saveRefreshSession({
        deviceId,
        refreshToken: authSession.refreshToken,
      });

      if (authSession.user.isNewUser) {
        setProfileSetupSession({
          accessToken: authSession.accessToken,
          refreshToken: authSession.refreshToken,
          deviceId,
          currentUser,
        });
      } else {
        setAuthenticatedSession({
          accessToken: authSession.accessToken,
          refreshToken: authSession.refreshToken,
          deviceId,
          currentUser,
        });
      }
    } catch (error) {
      lastSubmittedCodeRef.current = null;
      const apiError = error as ApiError;
      const normalizedError = mapOtpError(apiError, t);
      setStatusMessage(normalizedError.statusMessage);
      setErrorMessage(normalizedError.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendCode() {
    const challengeHasExpired = challengeRemainingSec <= 0;

    if (!pendingChallenge?.phoneNumber || isResending || (!challengeHasExpired && resendCountdownSec > 0)) {
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setStatusMessage(t('auth.otp.status_resending'));

    try {
      const challenge = await startRegistration(pendingChallenge.phoneNumber);
      setPendingChallenge({
        challengeId: challenge.challengeId,
        phoneNumber: pendingChallenge.phoneNumber,
        expiresAt: challenge.expiresAt,
      });
      setOtpCode('');
      lastSubmittedCodeRef.current = null;
      setResendCountdownSec(RESEND_INTERVAL_SEC);
      setChallengeRemainingSec(getChallengeRemainingSec(challenge.expiresAt));
      setStatusMessage(t('auth.otp.toast_new_code'));
      inputRef.current?.focus();
    } catch (error) {
      const apiError = error as ApiError;
      setStatusMessage(null);
      setErrorMessage(mapResendError(apiError, t));
    } finally {
      setIsResending(false);
    }
  }

  function handleCodeChange(value: string) {
    const normalizedValue = value.replace(/[^\d]/g, '').slice(0, OTP_LENGTH);
    lastSubmittedCodeRef.current = normalizedValue === otpCode ? lastSubmittedCodeRef.current : null;
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (statusMessage === null && normalizedValue.length > 0) {
      setStatusMessage(t('auth.otp.toast_entered_local'));
    }
    setOtpCode(normalizedValue);
  }

  const maskedPhoneNumber = maskPhoneNumber(pendingChallenge?.phoneNumber ?? '');
  const challengeHasExpired = challengeRemainingSec <= 0;
  const canSubmit = otpCode.length === OTP_LENGTH && !isSubmitting && !challengeHasExpired;
  const canResend = (resendCountdownSec === 0 || challengeHasExpired) && !isResending && !isSubmitting;
  const challengeStateLabel = challengeHasExpired
    ? t('auth.otp.status_expired')
    : t('auth.otp.status_expires_in', { duration: formatDurationLabel(challengeRemainingSec) });

  return (
    <AuthScreenLayout
      icon="🔐"
      iconTone="badge"
      leftAction={<AuthBackButton label={t('auth.otp.back_label')} onPress={clearPendingChallenge} />}
      subtitle={t('auth.otp.body', { phone: maskedPhoneNumber || t('auth.otp.back_label') })}
      title={t('auth.otp.title')}
    >
      <Pressable onPress={() => inputRef.current?.focus()} style={styles.codeCard}>
        <View style={styles.codeCellsRow}>
          {Array.from({ length: OTP_LENGTH }).map((_, index) => {
            const digit = otpCode[index] ?? '';
            const isFilled = Boolean(digit);
            const isActive = !isFilled && index === otpCode.length && otpCode.length < OTP_LENGTH;

            return (
              <View
                key={index}
                style={[
                  styles.codeCell,
                  isFilled ? styles.codeCellFilled : null,
                  isActive ? styles.codeCellActive : null,
                ]}
              >
                <Text style={styles.codeCellText}>{digit}</Text>
              </View>
            );
          })}
        </View>

        <TextInput
          ref={inputRef}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          onChangeText={handleCodeChange}
          placeholder={t('auth.otp.placeholder')}
          placeholderTextColor={telegramColors.textTertiary}
          style={styles.hiddenInput}
          value={otpCode}
        />

        <View style={styles.timerRow}>
          <View style={[styles.timerBadge, challengeHasExpired ? styles.timerBadgeExpired : null]}>
            <Text style={[styles.timerBadgeText, challengeHasExpired ? styles.timerBadgeTextExpired : null]}>
              {formatDurationLabel(Math.max(challengeRemainingSec, 0))}
            </Text>
          </View>
          <Text style={challengeHasExpired ? styles.challengeExpiredText : styles.challengeMetaText}>{challengeStateLabel}</Text>
        </View>
      </Pressable>

      <View style={styles.deliveryCard}>
        <Text style={styles.deliveryTitle}>{t('auth.otp.hint_not_received')}</Text>
        <Text style={styles.deliveryBody}>{t('auth.otp.hint_dev')}</Text>
        <View style={styles.deliveryActions}>
          <AuthSecondaryButton
            disabled={!canResend}
            label={isResending ? t('auth.otp.status_resending') : canResend ? t('auth.otp.resend_action') : t('auth.otp.resend_countdown', { sec: resendCountdownSec })}
            onPress={() => void handleResendCode()}
          />
          <AuthSecondaryButton
            disabled={isSubmitting || isResending}
            label={t('auth.otp.status_wrong_number')}
            onPress={clearPendingChallenge}
          />
        </View>
      </View>

      <AuthPrimaryButton
        disabled={!canSubmit}
        label={isSubmitting ? t('auth.otp.submit_checking') : t('auth.otp.submit_label')}
        onPress={() => void handleVerify()}
      />

      {statusMessage ? <AuthStatusText tone="success">{statusMessage}</AuthStatusText> : null}
      {errorMessage ? <AuthStatusText tone="error">{errorMessage}</AuthStatusText> : null}
    </AuthScreenLayout>
  );
}

function maskPhoneNumber(phoneNumber: string) {
  const normalized = phoneNumber.trim();
  if (normalized.length <= 6) {
    return normalized;
  }

  return `${normalized.slice(0, 3)} ${normalized.slice(3, 6)} ••• ${normalized.slice(-2)}`;
}

function getChallengeRemainingSec(expiresAt?: string) {
  if (!expiresAt) {
    return 0;
  }

  const expiresAtMs = new Date(expiresAt).getTime();
  if (!Number.isFinite(expiresAtMs)) {
    return 0;
  }

  const remainingMs = Math.max(0, expiresAtMs - Date.now() + CHALLENGE_GRACE_MS);
  return Math.ceil(remainingMs / 1000);
}

function formatDurationLabel(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function mapOtpError(error: ApiError, t: (key: string) => string) {
  const rawMessage = Array.isArray(error.message) ? error.message.join(', ') : error.message;
  const normalizedMessage = rawMessage.toLowerCase();

  if (normalizedMessage.includes('expired')) {
    return {
      statusMessage: null,
      errorMessage: t('auth.otp.toast_timeout_expired'),
    };
  }

  if (normalizedMessage.includes('invalid otp') || normalizedMessage.includes('invalid code')) {
    return {
      statusMessage: t('auth.otp.toast_rejected'),
      errorMessage: t('auth.otp.toast_incorrect'),
    };
  }

  if (normalizedMessage.includes('not found')) {
    return {
      statusMessage: null,
      errorMessage: t('auth.otp.toast_session_unavailable'),
    };
  }

  if (error.code === 'REQUEST_TIMEOUT') {
    return {
      statusMessage: null,
      errorMessage: t('auth.otp.toast_timed_out'),
    };
  }

  return {
    statusMessage: null,
    errorMessage: typeof rawMessage === 'string' ? rawMessage : t('auth.otp.error_verify'),
  };
}

function mapResendError(error: ApiError, t: (key: string) => string) {
  if (error.code === 'REQUEST_TIMEOUT') {
    return t('auth.otp.toast_resend_timeout');
  }

  return Array.isArray(error.message) ? error.message.join(', ') : error.message || t('auth.otp.error_resend');
}

const styles = StyleSheet.create({
  codeCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 16,
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    ...telegramShadows.card,
  },
  codeCellsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  codeCell: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderColor: telegramColors.separator,
    borderRadius: 14,
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    minHeight: 54,
  },
  codeCellFilled: {
    backgroundColor: telegramColors.accentSoft,
    borderColor: telegramColors.accent,
  },
  codeCellActive: {
    borderColor: telegramColors.accent,
  },
  codeCellText: {
    color: telegramColors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  hiddenInput: {
    height: 0,
    opacity: 0,
    position: 'absolute',
    width: 0,
  },
  timerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  timerBadge: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    minWidth: 60,
    paddingHorizontal: 10,
  },
  timerBadgeExpired: {
    backgroundColor: telegramColors.destructSoft,
  },
  timerBadgeText: {
    ...telegramText.mono,
    color: telegramColors.accentDeep,
    fontSize: 12,
  },
  timerBadgeTextExpired: {
    color: telegramColors.destructive,
  },
  challengeMetaText: {
    ...telegramText.caption,
    color: telegramColors.accentDeep,
    fontWeight: '700',
  },
  challengeExpiredText: {
    ...telegramText.caption,
    color: telegramColors.destructive,
    fontWeight: '700',
  },
  deliveryCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 16,
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...telegramShadows.card,
  },
  deliveryTitle: {
    ...telegramText.rowTitle,
    fontWeight: '700',
  },
  deliveryBody: {
    ...telegramText.secondary,
    lineHeight: 20,
  },
  deliveryActions: {
    gap: 10,
    paddingTop: 2,
  },
});
