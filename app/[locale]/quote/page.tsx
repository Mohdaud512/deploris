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
    title: t('meta_title'),
    description: t('meta_description'),
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
        <div className="mt-5 rounded-xl border border-brand-900/10 bg-brand-50/60 p-4 text-sm text-brand-900/80 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
          {locale === 'de' ? (
            <p>
              Nach dem Absenden antwortet ein Deploris-Ingenieur — kein Verkäufer — innerhalb eines
              Werktags mit schriftlichem Scope, Zeitplan und einer Preisspanne (nicht einer gerundeten
              Startzahl). Keine Formulare danach, keine Verkaufsschleife. Wenn das Projekt nicht zu uns
              passt, sagen wir das direkt.
            </p>
          ) : (
            <p>
              After you submit, a Deploris engineer — not a salesperson — replies within one business
              day with a written scope, a timeline, and a defensible price band (not a rounded starter
              number). No follow-up forms, no sales dance. If the project isn't a fit, we'll say so
              directly.
            </p>
          )}
        </div>
        <div className="mt-8">
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
