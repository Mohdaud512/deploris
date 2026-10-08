import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale, type Locale } from './config/locales';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) ?? defaultLocale;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: locale === 'de' ? 'Europe/Berlin' : 'America/New_York',
    now: new Date(),
  };
});
