import { currencyByLocale, formatLocale, type Locale } from '@/config/locales';

export function formatDate(date: string | Date, locale: Locale, opts?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(formatLocale[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...opts,
  }).format(typeof date === 'string' ? new Date(date) : date);
}

export function formatNumber(value: number, locale: Locale, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(formatLocale[locale], opts).format(value);
}

export function formatCurrency(value: number, locale: Locale) {
  return new Intl.NumberFormat(formatLocale[locale], {
    style: 'currency',
    currency: currencyByLocale[locale],
    maximumFractionDigits: 0,
  }).format(value);
}
