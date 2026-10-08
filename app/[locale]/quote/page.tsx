import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { QuoteWizard } from '@/components/forms/QuoteWizard';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quote' });
  return buildMetadata({
    locale,
    path: '/quote',
    title: t('title'),
    description:
      locale === 'de'
        ? 'Beschreiben Sie Ihr Projekt in drei Schritten Sie erhalten eine schriftliche Preisspanne binnen eines Werktags.'
        : 'Describe your project in three steps get a written price band within one business day.',
  });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'quote' });

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl font-bold text-brand-900 dark:text-white">{t('title')}</h1>
        <p className="mt-3 text-brand-900/85 dark:text-white/85">
          {locale === 'de'
            ? 'Drei Schritte. Ein Werktag. Eine schriftliche Preisspanne.'
            : 'Three steps. One business day. A written price band.'}
        </p>
        <div className="mt-8">
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
