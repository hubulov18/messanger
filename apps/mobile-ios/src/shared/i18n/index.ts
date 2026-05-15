/**
 * Lightweight i18n system for mobile-ios.
 *
 * API surface mirrors react-i18next so the implementation can be swapped
 * to the real library (i18next + react-i18next) with no changes at call sites:
 *
 *   npm install i18next react-i18next
 *
 * Languages supported: English (en), Russian (ru), Ossetian (os), Tagalog (tl), Thai (th).
 * Falls back to English for any missing key.
 */

import { create } from 'zustand';

import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';
import osTranslations from './locales/os.json';
import tlTranslations from './locales/tl.json';
import thTranslations from './locales/th.json';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Locale = 'en' | 'ru' | 'os' | 'tl' | 'th';

type TranslationTree = Record<string, unknown>;

type InterpolationParams = Record<string, string | number>;

// ---------------------------------------------------------------------------
// Translation registry
// ---------------------------------------------------------------------------

const TRANSLATIONS: Record<Locale, TranslationTree> = {
  en: enTranslations as TranslationTree,
  ru: ruTranslations as TranslationTree,
  os: osTranslations as TranslationTree,
  tl: tlTranslations as TranslationTree,
  th: thTranslations as TranslationTree,
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Traverse a nested object using a dot-separated key path.
 * Returns undefined if the path does not resolve to a string.
 */
function getNestedValue(obj: TranslationTree, key: string): string | undefined {
  const parts = key.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Replace `{{variable}}` placeholders with values from params.
 */
function interpolate(template: string, params: InterpolationParams): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    params[key] !== undefined ? String(params[key]) : `{{${key}}}`,
  );
}

/**
 * Resolve a translation key for a given locale, with English fallback.
 */
function resolve(locale: Locale, key: string, params?: InterpolationParams): string {
  const value =
    getNestedValue(TRANSLATIONS[locale], key) ??
    getNestedValue(TRANSLATIONS.en, key) ??
    key;

  return params ? interpolate(value, params) : value;
}

// ---------------------------------------------------------------------------
// i18n Zustand store  (internal — use changeLanguage() / useTranslation())
// ---------------------------------------------------------------------------

type I18nState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const useI18nStore = create<I18nState>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
}));

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Imperatively switch the active language.
 * Called by useLocaleSync whenever the user's languagePreference changes.
 */
export function changeLanguage(locale: Locale): void {
  useI18nStore.getState().setLocale(locale);
}

/**
 * Imperatively translate a key outside of a component.
 * For use in plain functions, not in React render.
 */
export function t(key: string, params?: InterpolationParams): string {
  const locale = useI18nStore.getState().locale;
  return resolve(locale, key, params);
}

/**
 * React hook — returns a reactive `t` function that re-renders the component
 * whenever the locale changes.
 *
 * Usage:
 *   const { t } = useTranslation();
 *   <Text>{t('settings.home.title')}</Text>
 */
export function useTranslation(): {
  t: (key: string, params?: InterpolationParams) => string;
  locale: Locale;
} {
  const locale = useI18nStore((state) => state.locale);

  const translate = (key: string, params?: InterpolationParams): string =>
    resolve(locale, key, params);

  return { t: translate, locale };
}

export { useI18nStore };
