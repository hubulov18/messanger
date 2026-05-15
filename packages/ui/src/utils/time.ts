/**
 * Time formatting for bubbles. Uses the runtime's default locale via Intl —
 * behavior matches the device's clock preference (12/24h). Formatters are
 * cached per-locale since Intl.DateTimeFormat instantiation is non-trivial.
 */

const timeFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getTimeFormatter(locale: string | undefined): Intl.DateTimeFormat {
  const key = locale ?? '__default__';
  const cached = timeFormatterCache.get(key);
  if (cached !== undefined) return cached;

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  });
  timeFormatterCache.set(key, formatter);
  return formatter;
}

/** "9:41" / "14:07" depending on locale. */
export function formatMessageTime(epochMs: number, locale?: string): string {
  return getTimeFormatter(locale).format(new Date(epochMs));
}
