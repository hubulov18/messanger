import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { startRegistration } from '@features/auth/api/auth.api';
import { AuthPrimaryButton, AuthScreenLayout, AuthStatusText } from '@features/auth/components/AuthScreenLayout';
import {
  COUNTRY_OPTIONS,
  filterCountryOptions,
  formatLocalPhoneNumber,
  getCountryLocalNumberHint,
  getLocalPhoneDigits,
  inferCountryFromDialCode,
  isValidLocalPhoneNumber,
  normalizeAuthPhoneNumber,
  normalizeDialCode,
  type CountryOption,
} from '@features/auth/services/auth-phone';
import type { ApiError } from '@shared/api/types';
import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { IosSearchField } from '@shared/ui/ios/IosSearchField';
import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

export function PhoneEntryScreen() {
  const { t } = useTranslation();
  const setPendingChallenge = useSessionStore((state) => state.setPendingChallenge);
  const [countryIndex, setCountryIndex] = useState(0);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [dialCodeInput, setDialCodeInput] = useState(COUNTRY_OPTIONS[0]?.dialCode ?? '+1');
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedCountry = COUNTRY_OPTIONS[countryIndex] ?? COUNTRY_OPTIONS[0]!;
  const normalizedPhoneNumber = normalizeAuthPhoneNumber(dialCodeInput, localPhoneNumber);
  const filteredCountries = filterCountryOptions(countrySearchQuery);
  const localPhoneDigits = getLocalPhoneDigits(localPhoneNumber);
  const isValidPhoneNumber = isValidLocalPhoneNumber(localPhoneNumber, selectedCountry);
  const canSubmit = normalizedPhoneNumber.length >= 8 && isValidPhoneNumber && !isSubmitting;
  const inferredCountry = inferCountryFromDialCode(dialCodeInput);
  const selectedCountryMatchesDialCode = inferredCountry?.code === selectedCountry.code;
  const localNumberHint = getCountryLocalNumberHint(selectedCountry);
  const shouldShowPreview = localPhoneDigits.length > 0;

  useEffect(() => {
    if (!inferredCountry || inferredCountry.code === selectedCountry.code) {
      return;
    }

    const inferredIndex = COUNTRY_OPTIONS.findIndex((country) => country.code === inferredCountry.code);
    if (inferredIndex >= 0) {
      setCountryIndex(inferredIndex);
    }
  }, [inferredCountry?.code, selectedCountry.code]);

  async function handleSubmit() {
    if (!canSubmit) {
      setErrorMessage(t('auth.phone.error_invalid', { country: selectedCountry.name }));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const challenge = await startRegistration(normalizedPhoneNumber);
      setPendingChallenge({
        challengeId: challenge.challengeId,
        phoneNumber: normalizedPhoneNumber,
        expiresAt: challenge.expiresAt,
      });
    } catch (error) {
      const apiError = error as ApiError;
      setErrorMessage(typeof apiError.message === 'string' ? apiError.message : t('auth.phone.error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSelectCountry(nextCountry: CountryOption) {
    const nextIndex = COUNTRY_OPTIONS.findIndex((country) => country.code === nextCountry.code);
    setCountryIndex(nextIndex >= 0 ? nextIndex : 0);
    setDialCodeInput(nextCountry.dialCode);
    setPickerVisible(false);
    setCountrySearchQuery('');
  }

  function handleUseExampleNumber() {
    setLocalPhoneNumber(formatLocalPhoneNumber(selectedCountry.sampleLocalNumber, selectedCountry));
    setErrorMessage(null);
  }

  return (
    <>
      <AuthScreenLayout
        icon="📱"
        subtitle={t('auth.phone.body')}
        title={t('auth.phone.title')}
      >
        <View style={styles.countryCardWrap}>
          <Text style={styles.fieldLegend}>{t('auth.phone.section_country')}</Text>
          <Pressable onPress={() => setPickerVisible(true)} style={({ pressed }: { pressed: boolean }) => [styles.countryCard, pressed ? styles.pressed : null]}>
            <View style={styles.countryIdentity}>
              <Text style={styles.countryFlag}>{selectedCountry.flag}</Text>
              <View style={styles.countryTextGroup}>
                <Text style={styles.countryName}>{selectedCountry.name}</Text>
                <Text style={styles.countryHint}>{t('auth.phone.hint_country')}</Text>
              </View>
            </View>
            <View style={styles.countryMeta}>
              <Text style={styles.countryDialCode}>{selectedCountry.dialCode}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.phoneCardWrap}>
          <Text style={styles.fieldLegend}>{t('auth.phone.section_phone')}</Text>
          <View style={styles.phoneRow}>
            <View style={styles.dialPill}>
              <Text style={styles.dialPillLabel}>{t('auth.phone.label_code')}</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                onChangeText={(value: string) => setDialCodeInput(normalizeDialCode(value))}
                placeholder={selectedCountry.dialCode}
                placeholderTextColor={telegramColors.textTertiary}
                style={styles.dialPillValue}
                value={dialCodeInput}
              />
            </View>

            <View style={styles.numberCard}>
              <Text style={styles.numberCardLabel}>{t('auth.phone.label_number')}</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
                onChangeText={(value: string) => {
                  setLocalPhoneNumber(formatLocalPhoneNumber(value, selectedCountry));
                  if (errorMessage) {
                    setErrorMessage(null);
                  }
                }}
                placeholder={selectedCountry.placeholder}
                placeholderTextColor={telegramColors.textTertiary}
                style={styles.numberCardInput}
                value={localPhoneNumber}
              />
            </View>
          </View>
          <Text style={isValidPhoneNumber || localPhoneDigits.length === 0 ? styles.fieldHelp : styles.fieldHelpError}>
            {isValidPhoneNumber || localPhoneDigits.length === 0
              ? t('auth.phone.hint_entered', { hint: localNumberHint, length: localPhoneDigits.length })
              : t('auth.phone.hint_incomplete', { country: selectedCountry.name, length: localPhoneDigits.length })}
          </Text>
        </View>

        {shouldShowPreview ? (
          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>{t('auth.phone.label_full_number')}</Text>
            <Text style={styles.previewValue}>{normalizedPhoneNumber || t('auth.phone.prompt_enter')}</Text>
            <Text style={selectedCountryMatchesDialCode ? styles.previewMeta : styles.previewWarning}>
              {selectedCountryMatchesDialCode
                ? t('auth.phone.hint_recognized', { flag: selectedCountry.flag, country: selectedCountry.name, dialCode: dialCodeInput || selectedCountry.dialCode })
                : t('auth.phone.hint_unmapped', { dialCode: dialCodeInput || '+' })}
            </Text>
          </View>
        ) : null}

        <View style={styles.deliveryCard}>
          <Text style={styles.deliveryTitle}>{t('auth.phone.delivery_title')}</Text>
          <Text style={styles.deliveryBody}>{t('auth.phone.delivery_body')}</Text>
          <Text style={styles.deliveryMeta}>{t('auth.phone.delivery_example', { country: selectedCountry.name, dialCode: selectedCountry.dialCode, sample: selectedCountry.sampleLocalNumber })}</Text>
          <Pressable onPress={handleUseExampleNumber} style={({ pressed }: { pressed: boolean }) => [styles.exampleChip, pressed ? styles.pressed : null]}>
            <Text style={styles.exampleChipText}>{t('auth.phone.delivery_use_example')}</Text>
          </Pressable>
        </View>

        <AuthPrimaryButton
          disabled={!canSubmit}
          label={isSubmitting ? t('common.requesting') : 'Send Code'}
          onPress={() => void handleSubmit()}
        />

        {errorMessage ? <AuthStatusText tone="error">{errorMessage}</AuthStatusText> : null}
      </AuthScreenLayout>

      <Modal transparent animationType="slide" visible={pickerVisible} onRequestClose={() => setPickerVisible(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalBackdropDismiss} onPress={() => setPickerVisible(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('auth.phone.modal_title')}</Text>
              <Pressable onPress={() => setPickerVisible(false)} style={({ pressed }: { pressed: boolean }) => [styles.modalDoneButton, pressed ? styles.pressed : null]}>
                <Text style={styles.modalDoneText}>{t('common.done')}</Text>
              </Pressable>
            </View>
            <IosSearchField
              onChangeText={setCountrySearchQuery}
              placeholder={t('auth.phone.modal_search_placeholder')}
              value={countrySearchQuery}
            />
            <ScrollView contentContainerStyle={styles.modalListContent} style={styles.modalList}>
              {filteredCountries.map((country) => (
                <Pressable
                  key={country.code}
                  onPress={() => handleSelectCountry(country)}
                  style={({ pressed }: { pressed: boolean }) => [styles.modalRow, pressed ? styles.pressed : null]}
                >
                  <View style={styles.countryIdentity}>
                    <Text style={styles.countryFlag}>{country.flag}</Text>
                    <View style={styles.countryTextGroup}>
                      <Text style={styles.countryName}>{country.name}</Text>
                      <Text style={styles.countryHint}>{country.code}</Text>
                    </View>
                  </View>
                  <Text style={styles.countryDialCode}>{country.dialCode}</Text>
                </Pressable>
              ))}
              {filteredCountries.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateTitle}>{t('auth.phone.modal_no_results')}</Text>
                  <Text style={styles.emptyStateBody}>{t('auth.phone.modal_no_results_hint')}</Text>
                </View>
              ) : null}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  fieldLegend: {
    ...telegramText.caption,
    color: telegramColors.textTertiary,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  countryCardWrap: {
    gap: 0,
  },
  countryCard: {
    alignItems: 'center',
    backgroundColor: telegramColors.surface,
    borderRadius: telegramLayout.sectionRadius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...telegramShadows.card,
  },
  countryIdentity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minWidth: 0,
  },
  countryFlag: {
    fontSize: 28,
  },
  countryTextGroup: {
    gap: 2,
    minWidth: 0,
  },
  countryName: {
    ...telegramText.rowTitle,
  },
  countryHint: {
    ...telegramText.caption,
    color: telegramColors.textSecondary,
  },
  countryMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  countryDialCode: {
    color: telegramColors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  chevron: {
    color: telegramColors.textTertiary,
    fontSize: 18,
    fontWeight: '600',
  },
  phoneCardWrap: {
    gap: 0,
  },
  phoneRow: {
    alignItems: 'stretch',
    flexDirection: 'row',
    gap: 10,
  },
  dialPill: {
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 14,
    justifyContent: 'center',
    minHeight: 72,
    paddingHorizontal: 12,
    width: 76,
  },
  dialPillLabel: {
    ...telegramText.caption,
    color: telegramColors.accentDeep,
    marginBottom: 4,
  },
  dialPillValue: {
    color: telegramColors.accentDeep,
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 0,
    textAlign: 'center',
  },
  numberCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 14,
    flex: 1,
    justifyContent: 'center',
    minHeight: 72,
    paddingHorizontal: 16,
    ...telegramShadows.card,
  },
  numberCardLabel: {
    ...telegramText.caption,
    marginBottom: 6,
  },
  numberCardInput: {
    color: telegramColors.textPrimary,
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 0,
  },
  fieldHelp: {
    ...telegramText.caption,
    color: telegramColors.textSecondary,
    marginTop: 10,
  },
  fieldHelpError: {
    ...telegramText.caption,
    color: telegramColors.destructive,
    marginTop: 10,
  },
  previewCard: {
    backgroundColor: telegramColors.accentSoft,
    borderColor: 'rgba(212,148,58,0.2)',
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  previewLabel: {
    ...telegramText.caption,
    color: telegramColors.accentDeep,
    fontWeight: '700',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  previewValue: {
    ...telegramText.mono,
    fontSize: 18,
  },
  previewMeta: {
    ...telegramText.caption,
    color: telegramColors.accentDeep,
  },
  previewWarning: {
    ...telegramText.caption,
    color: telegramColors.destructive,
  },
  deliveryCard: {
    backgroundColor: telegramColors.surface,
    borderRadius: 16,
    gap: 8,
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
  deliveryMeta: {
    ...telegramText.caption,
    color: telegramColors.textSecondary,
    lineHeight: 18,
  },
  exampleChip: {
    alignSelf: 'flex-start',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: telegramLayout.pillRadius,
    marginTop: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  exampleChipText: {
    color: telegramColors.accentDeep,
    fontSize: 13,
    fontWeight: '700',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(26,29,46,0.38)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdropDismiss: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: telegramColors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 14,
    maxHeight: '82%',
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
  },
  modalHandle: {
    alignSelf: 'center',
    backgroundColor: telegramColors.surfaceMuted,
    borderRadius: telegramLayout.pillRadius,
    height: 5,
    width: 44,
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    ...telegramText.navTitle,
  },
  modalDoneButton: {
    paddingVertical: 4,
  },
  modalDoneText: {
    color: telegramColors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  modalList: {
    flexGrow: 0,
  },
  modalListContent: {
    paddingBottom: 8,
  },
  modalRow: {
    alignItems: 'center',
    borderBottomColor: telegramColors.separator,
    borderBottomWidth: telegramLayout.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 64,
    paddingVertical: 10,
  },
  emptyState: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 20,
  },
  emptyStateTitle: {
    ...telegramText.rowTitle,
  },
  emptyStateBody: {
    ...telegramText.secondary,
    textAlign: 'center',
  },
});
