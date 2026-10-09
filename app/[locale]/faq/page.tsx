import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { FAQGroup } from '@/components/marketing/FAQGroup';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { faqSchema } from '@/lib/schema';
import { faqData } from '@/content/faq';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/faq',
    title: locale === 'de' ? 'FAQ Antworten zu CRM, RAG, KI-Agenten und IT' : 'FAQ Answers on CRM, RAG, AI agents, and IT support',
    description: locale === 'de'
      ? 'Antworten auf die häufigsten Fragen zu CRM, RAG, KI-Agenten, Automatisierung, Hardware-Support, Sicherheit, Preisen und Zusammenarbeit mit Deploris.'
      : 'Answers to the most common questions on CRM, RAG, AI agents, automation, hardware support, security, pricing, and working with Deploris.',
  });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const groups = faqData[locale];
  const flatItems = groups.flatMap((g) => g.items);

  return (
    <>
      <section className="container py-14">
        <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {locale === 'de' ? 'Häufige Fragen' : 'Frequently asked questions'}
        </h1>
        <p className="mt-3 max-w-2xl text-brand-900/85 dark:text-white/85">
          {locale === 'de'
            ? 'Wenn Ihre Frage nicht dabei ist, schreiben Sie uns kurz wir antworten innerhalb eines Werktags.'
            : "If your question isn't here, drop us a note we reply within one business day."}
        </p>
      </section>

      <section className="container pb-16">
        {groups.map((g) => (
          <FAQGroup key={g.slug} title={g.title} items={g.items} idPrefix={g.slug} />
        ))}
      </section>

      <SchemaJsonLd data={faqSchema(flatItems)} />
    </>
  );
}
