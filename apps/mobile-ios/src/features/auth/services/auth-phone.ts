export type CountryOption = {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
  placeholder: string;
  sampleLocalNumber: string;
  localNumberLengths: number[];
  formatGroups: number[];
};

export const COUNTRY_OPTIONS: CountryOption[] = [
  {
    code: 'US',
    dialCode: '+1',
    flag: '🇺🇸',
    name: 'United States',
    placeholder: '(415) 555 2671',
    sampleLocalNumber: '4155552671',
    localNumberLengths: [10],
    formatGroups: [3, 3, 4],
  },
  {
    code: 'RU',
    dialCode: '+7',
    flag: '🇷🇺',
    name: 'Russia',
    placeholder: '912 345 67 89',
    sampleLocalNumber: '9123456789',
    localNumberLengths: [10],
    formatGroups: [3, 3, 2, 2],
  },
  {
    code: 'UA',
    dialCode: '+380',
    flag: '🇺🇦',
    name: 'Ukraine',
    placeholder: '50 123 45 67',
    sampleLocalNumber: '501234567',
    localNumberLengths: [9],
    formatGroups: [2, 3, 2, 2],
  },
  {
    code: 'DE',
    dialCode: '+49',
    flag: '🇩🇪',
    name: 'Germany',
    placeholder: '1512 3456789',
    sampleLocalNumber: '15123456789',
    localNumberLengths: [10, 11],
    formatGroups: [4, 3, 4],
  },
  {
    code: 'GB',
    dialCode: '+44',
    flag: '🇬🇧',
    name: 'United Kingdom',
    placeholder: '7400 123456',
    sampleLocalNumber: '7400123456',
    localNumberLengths: [10],
    formatGroups: [4, 6],
  },
  {
    code: 'FR',
    dialCode: '+33',
    flag: '🇫🇷',
    name: 'France',
    placeholder: '6 12 34 56 78',
    sampleLocalNumber: '612345678',
    localNumberLengths: [9],
    formatGroups: [1, 2, 2, 2, 2],
  },
  {
    code: 'ES',
    dialCode: '+34',
    flag: '🇪🇸',
    name: 'Spain',
    placeholder: '612 34 56 78',
    sampleLocalNumber: '612345678',
    localNumberLengths: [9],
    formatGroups: [3, 2, 2, 2],
  },
  {
    code: 'IT',
    dialCode: '+39',
    flag: '🇮🇹',
    name: 'Italy',
    placeholder: '312 345 6789',
    sampleLocalNumber: '3123456789',
    localNumberLengths: [10],
    formatGroups: [3, 3, 4],
  },
  {
    code: 'TR',
    dialCode: '+90',
    flag: '🇹🇷',
    name: 'Turkey',
    placeholder: '532 123 45 67',
    sampleLocalNumber: '5321234567',
    localNumberLengths: [10],
    formatGroups: [3, 3, 2, 2],
  },
  {
    code: 'AE',
    dialCode: '+971',
    flag: '🇦🇪',
    name: 'United Arab Emirates',
    placeholder: '50 123 4567',
    sampleLocalNumber: '501234567',
    localNumberLengths: [9],
    formatGroups: [2, 3, 4],
  },
  {
    code: 'IN',
    dialCode: '+91',
    flag: '🇮🇳',
    name: 'India',
    placeholder: '98765 43210',
    sampleLocalNumber: '9876543210',
    localNumberLengths: [10],
    formatGroups: [5, 5],
  },
  {
    code: 'TH',
    dialCode: '+66',
    flag: '🇹🇭',
    name: 'Thailand',
    placeholder: '81 234 5678',
    sampleLocalNumber: '812345678',
    localNumberLengths: [9],
    formatGroups: [2, 3, 4],
  },
];

export function normalizeDialCode(input: string) {
  const digits = input.replace(/[^\d]/g, '');
  if (!digits) {
    return '+';
  }

  return `+${digits.slice(0, 4)}`;
}

export function getLocalPhoneDigits(input: string) {
  return input.replace(/[^\d]/g, '');
}

export function formatLocalPhoneNumber(input: string, country?: CountryOption | null) {
  const digits = getLocalPhoneDigits(input);
  const maxLength = getCountryMaxLocalNumberLength(country);
  const trimmedDigits = digits.slice(0, maxLength);
  const formatGroups = country?.formatGroups?.length ? country.formatGroups : [3, 3, 2, 2, 3];

  return applyDigitGrouping(trimmedDigits, formatGroups);
}

export function normalizeAuthPhoneNumber(dialCodeInput: string, localPhoneNumber: string) {
  const dialDigits = dialCodeInput.replace(/[^\d]/g, '');
  const localDigits = getLocalPhoneDigits(localPhoneNumber);
  if (!dialDigits && !localDigits) {
    return '';
  }

  return `+${dialDigits}${localDigits}`;
}

export function filterCountryOptions(query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return COUNTRY_OPTIONS;
  }

  return COUNTRY_OPTIONS.filter((country) =>
    country.name.toLowerCase().includes(normalizedQuery) ||
    country.code.toLowerCase().includes(normalizedQuery) ||
    country.dialCode.includes(normalizedQuery.replace(/[^\d+]/g, '')),
  );
}

export function inferCountryFromDialCode(input: string) {
  const normalizedDialCode = normalizeDialCode(input);
  const matchingCountries = COUNTRY_OPTIONS.filter((country) => normalizedDialCode.startsWith(country.dialCode));

  if (matchingCountries.length === 0) {
    return null;
  }

  return matchingCountries.sort((left, right) => right.dialCode.length - left.dialCode.length)[0] ?? null;
}

export function isValidLocalPhoneNumber(input: string, country?: CountryOption | null) {
  const digits = getLocalPhoneDigits(input);
  if (!country) {
    return digits.length >= 6;
  }

  return country.localNumberLengths.includes(digits.length);
}

export function getCountryLocalNumberHint(country?: CountryOption | null) {
  if (!country) {
    return 'Enter your local phone number';
  }

  if (country.localNumberLengths.length === 1) {
    return `${country.localNumberLengths[0]} digits expected`;
  }

  return `${country.localNumberLengths.join(' or ')} digits expected`;
}

function getCountryMaxLocalNumberLength(country?: CountryOption | null) {
  if (!country || country.localNumberLengths.length === 0) {
    return 15;
  }

  return Math.max(...country.localNumberLengths);
}

function applyDigitGrouping(digits: string, formatGroups: number[]) {
  if (digits.length === 0) {
    return '';
  }

  const chunks: string[] = [];
  let cursor = 0;

  for (const groupLength of formatGroups) {
    if (cursor >= digits.length) {
      break;
    }

    chunks.push(digits.slice(cursor, cursor + groupLength));
    cursor += groupLength;
  }

  if (cursor < digits.length) {
    chunks.push(digits.slice(cursor));
  }

  return chunks.join(' ');
}
