import { StyleSheet } from 'react-native';

export const telegramColors = {
  appBackground: '#F2F3F7',
  navBg: 'rgba(242,243,247,0.92)',
  surface: '#FFFFFF',
  surfaceMid: '#EDEEF3',
  surfaceMuted: '#E4E5EC',
  separator: '#E0E2EA',
  textPrimary: '#1A1D2E',
  textSecondary: '#6B6F82',
  textTertiary: '#9EA2B3',
  accent: '#D4943A',
  accentSoft: '#F5EAD8',
  accentDeep: '#B97A28',
  destructive: '#B5473E',
  destructSoft: '#F5E5E4',
  incomingBubble: '#ffffff',
  outgoingBubble: '#DDD5F3',
  bubble: '#DDD5F3',
  badge: '#7B6CB7',
  badgeSoft: '#EDE9F8',
  unreadBadge: '#7B6CB7',
  online: '#4F8A5B',
  onlineSoft: '#E3F0E7',
  white: '#FFFFFF',
  black: '#000000',
};

export const telegramLayout = {
  screenPadding: 18,
  sectionRadius: 14,
  rowHeight: 68,
  avatar: 52,
  avatarCompact: 44,
  avatarHero: 88,
  composerMinHeight: 52,
  buttonRadius: 14,
  bubbleRadius: 18,
  bubbleGroupedRadius: 6,
  pillRadius: 999,
  hairlineWidth: 0.5,
};

export const telegramShadows = {
  card: {
    shadowColor: telegramColors.black,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    shadowColor: telegramColors.accent,
    shadowOpacity: 0.27,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bubble: {
    shadowColor: telegramColors.black,
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  avatar: {
    shadowColor: telegramColors.accent,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
};

export const telegramText = StyleSheet.create({
  largeTitle: {
    color: telegramColors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
  },
  sectionTitle: {
    color: telegramColors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  navTitle: {
    color: telegramColors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
  },
  rowTitle: {
    color: telegramColors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    color: telegramColors.textPrimary,
    fontSize: 15,
    lineHeight: 22,
  },
  secondary: {
    color: telegramColors.textSecondary,
    fontSize: 14,
  },
  tertiary: {
    color: telegramColors.textTertiary,
    fontSize: 13,
  },
  caption: {
    color: telegramColors.textTertiary,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  mono: {
    color: telegramColors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  badge: {
    color: telegramColors.white,
    fontSize: 11,
    fontWeight: '700',
  },
});
