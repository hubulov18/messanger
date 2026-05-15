import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { telegramColors, telegramLayout, telegramShadows, telegramText } from '@shared/ui/ios/theme';

type AuthScreenLayoutProps = {
  title: string;
  subtitle: string;
  icon: string;
  iconTone?: 'accent' | 'badge';
  leftAction?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthScreenLayout({
  title,
  subtitle,
  icon,
  iconTone = 'accent',
  leftAction,
  children,
  footer,
}: AuthScreenLayoutProps) {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.topRow}>{leftAction ? leftAction : <View style={styles.leftSpacer} />}</View>
          <View style={styles.hero}>
            <View style={[styles.iconBadge, iconTone === 'badge' ? styles.iconBadgeSecondary : null]}>
              <Text style={styles.iconText}>{icon}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.body}>{children}</View>
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function AuthPrimaryButton({
  label,
  disabled = false,
  onPress,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <TextButtonContainer disabled={disabled} onPress={onPress} tone="primary">
      <Text style={[styles.primaryButtonText, disabled ? styles.primaryButtonTextDisabled : null]}>{label}</Text>
    </TextButtonContainer>
  );
}

export function AuthSecondaryButton({
  label,
  disabled = false,
  onPress,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <TextButtonContainer disabled={disabled} onPress={onPress} tone="secondary">
      <Text style={[styles.secondaryButtonText, disabled ? styles.secondaryButtonTextDisabled : null]}>{label}</Text>
    </TextButtonContainer>
  );
}

function TextButtonContainer({
  children,
  disabled,
  onPress,
  tone,
}: {
  children: ReactNode;
  disabled: boolean;
  onPress: () => void;
  tone: 'primary' | 'secondary';
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.buttonBase,
        tone === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled ? styles.buttonDisabled : null,
        pressed && !disabled ? styles.buttonPressed : null,
      ]}
    >
      {children}
    </Pressable>
  );
}

export function AuthStatusText({
  tone,
  children,
}: {
  tone: 'error' | 'success' | 'muted';
  children: ReactNode;
}) {
  return (
    <Text
      style={[
        styles.statusText,
        tone === 'error' ? styles.errorText : null,
        tone === 'success' ? styles.successText : null,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: telegramColors.appBackground,
  },
  scrollView: {
    flex: 1,
    backgroundColor: telegramColors.appBackground,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    gap: 20,
    paddingHorizontal: telegramLayout.screenPadding,
    paddingTop: 6,
    paddingBottom: 28,
  },
  topRow: {
    minHeight: 38,
  },
  leftSpacer: {
    minHeight: 38,
  },
  hero: {
    gap: 12,
  },
  iconBadge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 15,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  iconBadgeSecondary: {
    backgroundColor: telegramColors.badgeSoft,
  },
  iconText: {
    fontSize: 26,
  },
  title: {
    ...telegramText.sectionTitle,
  },
  subtitle: {
    ...telegramText.secondary,
    lineHeight: 21,
  },
  body: {
    gap: 14,
  },
  footer: {
    gap: 10,
  },
  buttonBase: {
    alignItems: 'center',
    borderRadius: telegramLayout.buttonRadius,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
  },
  primaryButton: {
    backgroundColor: telegramColors.accent,
    ...telegramShadows.button,
  },
  secondaryButton: {
    backgroundColor: telegramColors.white,
    borderColor: telegramColors.separator,
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.46,
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
  },
  primaryButtonText: {
    color: telegramColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonTextDisabled: {
    color: 'rgba(255,255,255,0.85)',
  },
  secondaryButtonText: {
    color: telegramColors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButtonTextDisabled: {
    color: telegramColors.textTertiary,
  },
  statusText: {
    ...telegramText.secondary,
  },
  successText: {
    color: telegramColors.online,
  },
  errorText: {
    color: telegramColors.destructive,
  },
});
