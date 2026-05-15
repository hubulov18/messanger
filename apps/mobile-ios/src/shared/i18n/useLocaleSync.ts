/**
 * useLocaleSync
 *
 * Bridges the user's persisted `languagePreference` (Zustand / AsyncStorage)
 * with the i18n engine.  Mount this hook once at the app root — it listens to
 * language preference changes and calls `changeLanguage()` reactively.
 *
 * Mapping:
 *   'system'   → 'en'   (device language detection requires react-native-localize)
 *   'english'  → 'en'
 *   'russian'  → 'ru'
 *   'ossetian' → 'os'
 *   'tagalog'  → 'tl'
 *   'thai'     → 'th'
 */

import { useEffect } from 'react';

import { type LanguagePreference, useSettingsPreferencesStore } from '@features/settings/state/settings-preferences.store';
import { changeLanguage, type Locale } from './index';

function toLocale(pref: LanguagePreference): Locale {
  switch (pref) {
    case 'russian':
      return 'ru';
    case 'ossetian':
      return 'os';
    case 'tagalog':
      return 'tl';
    case 'thai':
      return 'th';
    default:
      // 'system', 'english' fall back to English.
      // When react-native-localize is added, 'system' should resolve
      // the device locale dynamically.
      return 'en';
  }
}

export function useLocaleSync(): void {
  const languagePreference = useSettingsPreferencesStore((state) => state.languagePreference);

  useEffect(() => {
    changeLanguage(toLocale(languagePreference));
  }, [languagePreference]);
}
