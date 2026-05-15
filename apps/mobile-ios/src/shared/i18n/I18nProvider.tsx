/**
 * I18nProvider
 *
 * Mount this component once at the app root (inside AppProviders).
 * It runs useLocaleSync() which keeps the i18n engine in sync with the
 * user's persisted languagePreference from the settings store.
 *
 * Renders nothing — it's a pure side-effect component.
 */

import type { PropsWithChildren } from 'react';

import { useLocaleSync } from './useLocaleSync';

export function I18nProvider({ children }: PropsWithChildren) {
  useLocaleSync();
  return <>{children}</>;
}
