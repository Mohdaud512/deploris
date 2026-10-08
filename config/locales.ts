export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
export const localePrefix = 'as-needed'; // '/' for default, '/de' for German
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
};
export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  de: '🇩🇪',
};

/**
 * Formatting locales for Intl.NumberFormat / DateTimeFormat.
 * Matches Section 9b of the brief: en-US formats for the US market,
 * de-DE with formal Sie for the German market.
 */
export const formatLocale: Record<Locale, string> = {
  en: 'en-US',
  de: 'de-DE',
};

export const currencyByLocale: Record<Locale, string> = {
  en: 'USD',
  de: 'EUR',
};
