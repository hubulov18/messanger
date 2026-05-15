/**
 * Design tokens.
 *
 * Colors are pre-compiled sRGB hex (authored in OKLCH upstream).
 * Two tiers: raw palette + semantic roles. Components consume only semantic roles.
 * No runtime color math.
 */

export type ThemeMode = 'light' | 'dark';

/* -------------------------------------------------------------------------- */
/*  Raw palette                                                               */
/* -------------------------------------------------------------------------- */

/** Cool slate neutrals (light). N0 = surface, N10 = text strongest. */
const LIGHT_NEUTRALS = {
  N0: '#F2F3F7',
  N1: '#E8E9ED',
  N2: '#E2E4EA',
  N3: '#D0D2DA',
  N4: '#B0B3BF',
  N5: '#8B8FA0',
  N6: '#6B6F82',
  N7: '#4A4D5E',
  N8: '#2E3142',
  N9: '#1A1D2E',
  N10: '#0F1119',
} as const;

/** Deep indigo neutrals (dark). N0 = deepest surface, N10 = brightest text. */
const DARK_NEUTRALS = {
  N0: '#0F1119',
  N1: '#14161F',
  N2: '#1A1D2E',
  N3: '#252839',
  N4: '#363A50',
  N5: '#4E5270',
  N6: '#6B6F82',
  N7: '#8B8FA0',
  N8: '#B0B3BF',
  N9: '#D0D2DA',
  N10: '#E8E9ED',
} as const;

/** Amber / gold accent — primary actions, send button, links. */
const ACCENT = {
  light: '#D4943A',
  lightPressed: '#B87E2E',
  lightSoft: '#F5EAD8',
  dark: '#E8A94E',
  darkPressed: '#C9923F',
  darkSoft: '#2E2518',
} as const;

/** Status colors (same value both modes; backgrounds differ). */
const STATUS = {
  success: '#4F8A5B',
  warning: '#D4943A',
  danger: '#B5473E',
} as const;

/** Indigo-tinted outgoing bubble. */
const BUBBLE_OUTGOING = {
  light: '#DDD5F3',
  dark: '#2B2352',
} as const;

/* -------------------------------------------------------------------------- */
/*  Semantic color roles                                                      */
/* -------------------------------------------------------------------------- */

export interface Colors {
  /** Root chat background / wallpaper base. */
  readonly surface: string;
  /** Cards, composer, sheets, elevated rows. */
  readonly surfaceRaised: string;
  /** Input field background. */
  readonly surfaceInput: string;
  /** Hairlines and subtle dividers. */
  readonly border: string;

  /** Primary text. */
  readonly text: string;
  /** Secondary text (timestamps, captions). */
  readonly textSecondary: string;
  /** Muted text (placeholders, disabled). */
  readonly textMuted: string;
  /** Text rendered on top of the outgoing bubble background. */
  readonly textOnAccent: string;
  /** Secondary text on outgoing bubble (timestamps, captions). */
  readonly textOnAccentSecondary: string;

  /** Accent (Amber Gold) — send button, links, primary actions. */
  readonly accent: string;
  /** Accent in pressed state. */
  readonly accentPressed: string;
  /** Soft accent tint (chips, subtle emphasis). */
  readonly accentSoft: string;

  /** Incoming bubble background. Text inside uses `text`. */
  readonly bubbleIncoming: string;
  /** Outgoing (self) bubble background. Text inside uses `textOnAccent`. */
  readonly bubbleOutgoing: string;

  readonly success: string;
  readonly warning: string;
  readonly danger: string;

  /** Overlay scrim (modals, sheets). */
  readonly scrim: string;
}

function buildLightColors(): Colors {
  return {
    surface: LIGHT_NEUTRALS.N0,
    surfaceRaised: '#FFFFFF',
    surfaceInput: LIGHT_NEUTRALS.N1,
    border: LIGHT_NEUTRALS.N2,

    text: LIGHT_NEUTRALS.N9,
    textSecondary: LIGHT_NEUTRALS.N6,
    textMuted: LIGHT_NEUTRALS.N5,
    textOnAccent: '#2B2352',
    textOnAccentSecondary: '#6B5FA0',

    accent: ACCENT.light,
    accentPressed: ACCENT.lightPressed,
    accentSoft: ACCENT.lightSoft,

    bubbleIncoming: '#FFFFFF',
    bubbleOutgoing: BUBBLE_OUTGOING.light,

    success: STATUS.success,
    warning: STATUS.warning,
    danger: STATUS.danger,

    scrim: 'rgba(15, 17, 25, 0.55)',
  };
}

function buildDarkColors(): Colors {
  return {
    surface: DARK_NEUTRALS.N0,
    surfaceRaised: DARK_NEUTRALS.N2,
    surfaceInput: DARK_NEUTRALS.N2,
    border: DARK_NEUTRALS.N3,

    text: DARK_NEUTRALS.N10,
    textSecondary: DARK_NEUTRALS.N7,
    textMuted: DARK_NEUTRALS.N6,
    textOnAccent: '#E8E0F5',
    textOnAccentSecondary: '#8B7FC0',

    accent: ACCENT.dark,
    accentPressed: ACCENT.darkPressed,
    accentSoft: ACCENT.darkSoft,

    bubbleIncoming: DARK_NEUTRALS.N2,
    bubbleOutgoing: BUBBLE_OUTGOING.dark,

    success: STATUS.success,
    warning: STATUS.warning,
    danger: STATUS.danger,

    scrim: 'rgba(0, 0, 0, 0.65)',
  };
}

export function buildColors(mode: ThemeMode): Colors {
  return mode === 'dark' ? buildDarkColors() : buildLightColors();
}

/* -------------------------------------------------------------------------- */
/*  Typography                                                                */
/* -------------------------------------------------------------------------- */

export type TypographyRole =
  | 'display'
  | 'title'
  | 'headline'
  | 'body'
  | 'bodyStrong'
  | 'callout'
  | 'footnote'
  | 'caption';

export interface TypographyStyle {
  readonly fontFamily: string | undefined;
  readonly fontWeight: '400' | '500' | '600' | '700';
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly letterSpacing: number;
}

/** Platform-default sans for body. Serif reserved for display/title on iOS. */
const SANS: string | undefined = undefined;
const SERIF_IOS = 'Georgia';

export const typography: Readonly<Record<TypographyRole, TypographyStyle>> = {
  display: {
    fontFamily: SERIF_IOS,
    fontWeight: '600',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.2,
  },
  title: {
    fontFamily: SERIF_IOS,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  headline: {
    fontFamily: SANS,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  body: {
    fontFamily: SANS,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodyStrong: {
    fontFamily: SANS,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  },
  callout: {
    fontFamily: SANS,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  },
  footnote: {
    fontFamily: SANS,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.05,
  },
  caption: {
    fontFamily: SANS,
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.2,
  },
};

/* -------------------------------------------------------------------------- */
/*  Spacing, radius, duration, easing, elevation                              */
/* -------------------------------------------------------------------------- */

/** 4pt grid. Access as spacing[2] = 8pt, spacing[4] = 16pt, etc. */
export const spacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64] as const;
export type SpacingStep = keyof typeof spacing & number;

export const radius = {
  none: 0,
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;
export type RadiusToken = keyof typeof radius;

export const duration = {
  fast: 120,
  base: 200,
  slow: 320,
} as const;

/** Cubic-bezier tuples for RN Animated.Easing.bezier. */
export const easing = {
  standard: [0.2, 0, 0, 1] as const,
  emphasized: [0.3, 0, 0, 1] as const,
} as const;

export interface Elevation {
  readonly shadowColor: string;
  readonly shadowOpacity: number;
  readonly shadowRadius: number;
  readonly shadowOffsetY: number;
  readonly elevation: number; // Android
}

export const elevation: Readonly<Record<'flat' | 'raised' | 'floating', Elevation>> = {
  flat: {
    shadowColor: '#000',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffsetY: 0,
    elevation: 0,
  },
  raised: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffsetY: 2,
    elevation: 2,
  },
  floating: {
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffsetY: 8,
    elevation: 8,
  },
};

/* -------------------------------------------------------------------------- */
/*  Theme bundle                                                              */
/* -------------------------------------------------------------------------- */

export interface Theme {
  readonly mode: ThemeMode;
  readonly colors: Colors;
  readonly typography: typeof typography;
  readonly spacing: typeof spacing;
  readonly radius: typeof radius;
  readonly duration: typeof duration;
  readonly easing: typeof easing;
  readonly elevation: typeof elevation;
}

export function buildTheme(mode: ThemeMode): Theme {
  return {
    mode,
    colors: buildColors(mode),
    typography,
    spacing,
    radius,
    duration,
    easing,
    elevation,
  };
}
