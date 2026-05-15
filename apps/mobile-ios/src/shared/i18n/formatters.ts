/**
 * Locale-aware date and time formatters.
 *
 * All functions accept an optional `locale` parameter so they can be used
 * both inside React components (via useTranslation().locale) and in
 * plain utility functions (via useI18nStore.getState().locale).
 *
 * Uses the built-in Intl API — no external dependencies required.
 */

import { useI18nStore } from './index';

// ---------------------------------------------------------------------------
// Internal locale mapping
// ---------------------------------------------------------------------------

/** BCP-47 language tags understood by Intl. */
const INTL_LOCALE: Record<string, string> = {
  en: 'en-US',
  ru: 'ru-RU',
  os: 'ru-RU', // Ossetian shares the Russian calendar/numeral conventions
  tl: 'fil-PH', // Tagalog / Filipino
  th: 'th-TH', // Thai
};

function intlLocale(locale?: string): string {
  const active = locale ?? useI18nStore.getState().locale;
  return INTL_LOCALE[active] ?? 'en-US';
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

/**
 * Short time: "14:35" (24-hour) or "2:35 PM" depending on locale.
 */
export function formatTime(date: Date | string, locale?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(intlLocale(locale), {
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
}

/**
 * Short date: "18 апр." / "Apr 18" — no year.
 */
export function formatShortDate(date: Date | string, locale?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: 'numeric',
    month: 'short',
  }).format(d);
}

/**
 * Full date: "18 апреля 2026 г." / "April 18, 2026".
 */
export function formatFullDate(date: Date | string, locale?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

/**
 * Chat-list timestamp: shows time for today, short date otherwise.
 */
export function formatChatTimestamp(date: Date | string, locale?: string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  return isToday ? formatTime(d, locale) : formatShortDate(d, locale);
}

/**
 * Relative label for session last-seen: "сегодня в 14:35" / "today at 2:35 PM".
 * Falls back to full date if the date is older than 7 days.
 */
export function formatRelativeSession(date: Date | string | null, locale?: string): string {
  if (!date) {
    return '';
  }

  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const timeStr = formatTime(d, locale);
    const active = locale ?? useI18nStore.getState().locale;
    const prefix = active === 'ru' || active === 'os' ? 'сегодня в' : 'today at';
    return `${prefix} ${timeStr}`;
  }

  if (diffDays === 1) {
    const active = locale ?? useI18nStore.getState().locale;
    return active === 'ru' || active === 'os' ? 'вчера' : 'yesterday';
  }

  if (diffDays < 7) {
    return new Intl.DateTimeFormat(intlLocale(locale), { weekday: 'long' }).format(d);
  }

  return formatShortDate(d, locale);
}
