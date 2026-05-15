import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSessionStore } from '@shared/auth/session.store';
import { useTranslation } from '@shared/i18n';
import { telegramColors, telegramLayout, telegramShadows } from '@shared/ui/ios/theme';

export function SplashScreen() {
  const { t } = useTranslation();
  const beginPhoneEntry = useSessionStore((state) => state.beginPhoneEntry);
  const bootStatus = useSessionStore((state) => state.bootStatus);
  const isRestoring = bootStatus !== 'ready';

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.glowPrimary} />
        <View style={styles.glowSecondary} />
        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={styles.logoMark}>
              <Text style={styles.logoText}>A</Text>
            </View>
            <Text style={styles.title}>Analog</Text>
            <Text style={styles.tagline}>{t('auth.splash.body')}</Text>
          </View>

          <View style={styles.actions}>
            <Pressable disabled={isRestoring} onPress={beginPhoneEntry} style={({ pressed }: { pressed: boolean }) => [
              styles.primaryButton,
              isRestoring ? styles.buttonDisabled : null,
              pressed && !isRestoring ? styles.buttonPressed : null,
            ]}>
              <Text style={styles.primaryButtonText}>{isRestoring ? t('auth.splash.state_title') : t('auth.splash.get_started')}</Text>
            </Pressable>

            <Pressable disabled={isRestoring} onPress={beginPhoneEntry} style={({ pressed }: { pressed: boolean }) => [
              styles.secondaryButton,
              isRestoring ? styles.buttonDisabled : null,
              pressed && !isRestoring ? styles.buttonPressed : null,
            ]}>
              <Text style={styles.secondaryButtonText}>{t('auth.splash.sign_in')}</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerTitle}>{t('auth.splash.state_title')}</Text>
            <Text style={styles.footerBody}>{t('auth.splash.state_body')}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1D2E',
  },
  screen: {
    backgroundColor: '#1A1D2E',
    flex: 1,
    overflow: 'hidden',
  },
  glowPrimary: {
    backgroundColor: '#2C2340',
    borderRadius: 240,
    height: 280,
    opacity: 0.8,
    position: 'absolute',
    right: -80,
    top: -20,
    width: 280,
  },
  glowSecondary: {
    backgroundColor: '#3A2F56',
    borderRadius: 180,
    bottom: 120,
    height: 220,
    left: -100,
    opacity: 0.45,
    position: 'absolute',
    width: 220,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 44,
    paddingBottom: 28,
  },
  hero: {
    alignItems: 'center',
    gap: 16,
    marginTop: 72,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: telegramColors.accent,
    borderRadius: 28,
    height: 96,
    justifyContent: 'center',
    width: 96,
    ...telegramShadows.button,
  },
  logoText: {
    color: telegramColors.white,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
  },
  title: {
    color: telegramColors.white,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  tagline: {
    color: 'rgba(255,255,255,0.48)',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 300,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: telegramColors.accent,
    borderRadius: telegramLayout.buttonRadius,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
    ...telegramShadows.button,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.16)',
    borderRadius: telegramLayout.buttonRadius,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  buttonDisabled: {
    opacity: 0.64,
  },
  primaryButtonText: {
    color: telegramColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  footerTitle: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 14,
    fontWeight: '700',
  },
  footerBody: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});
