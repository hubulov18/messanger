export function validateUsername(username: string) {
  if (username.length === 0) {
    return 'Username is required';
  }

  if (username.length < 4 || username.length > 32) {
    return 'Username must be 4-32 characters';
  }

  if (!/^[a-z0-9_]+$/.test(username)) {
    return 'Use only lowercase letters, numbers, and underscores';
  }

  return null;
}

export function normalizeUsernameInput(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').slice(0, 32);
}

export function slugifyUsernamePart(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

export function buildUsernameSuggestions(baseUsername: string, userId?: string) {
  const normalizedBase = normalizeUsernameInput(baseUsername).replace(/^_+|_+$/g, '');
  const fallbackBase = normalizedBase.length >= 4 ? normalizedBase : 'telegram_user';
  const suffix = (userId ?? '').slice(-4).toLowerCase();

  const candidates = [
    fallbackBase,
    `${fallbackBase}_${suffix || 'ios'}`,
    `${fallbackBase}_app`,
    `${fallbackBase}_chat`,
  ]
    .map((candidate) => normalizeUsernameInput(candidate))
    .filter((candidate) => candidate.length >= 4);

  return [...new Set(candidates)].slice(0, 4);
}
