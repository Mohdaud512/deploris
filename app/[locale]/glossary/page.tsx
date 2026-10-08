import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { glossaryData } from '@/content/glossary';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/glossary',
    title:
      locale === 'de'
        ? 'Glossar CRM, RAG, KI-Agenten und IT-Betrieb einfach erklärt | Deploris'
        : 'Glossary CRM, RAG, AI agents, and IT operations, plain-language | Deploris',
    description:
      locale === 'de'
        ? 'Klare Definitionen von Kernbegriffen aus CRM-Entwicklung, RAG-Systemen, KI-Automatisierung und IT-Infrastruktur.'
        : 'Clear definitions of the core terms from CRM development, RAG systems, AI automation, and IT infrastructure.',
  });
}

export default async function GlossaryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const terms = glossaryData[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="container py-14">
      <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {locale === 'de' ? 'Glossar' : 'Glossary'}
      </h1>
      <p className="mt-3 max-w-2xl text-brand-900/85 dark:text-white/85">
        {locale === 'de'
          ? 'Kurze Definitionen der Begriffe, mit denen wir arbeiten zum Verlinken und Zitieren.'
          : 'Short definitions of the terms we use quotable and link-friendly.'}
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {terms.map((t) => (
          <li key={t.slug}>
            <Link
              href={`${prefix}/glossary/${t.slug}`}
              className="block rounded-2xl border border-brand-900/10 bg-white p-5 hover:border-brand-900/30 dark:border-white/10 dark:bg-white/5"
            >
              <h2 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
                {t.term}
              </h2>
              <p className="mt-1 text-sm text-brand-900/80 dark:text-white/80">{t.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
