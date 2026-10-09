import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { CTASection } from '@/components/marketing/CTASection';
import { ValuePropGrid } from '@/components/marketing/ValueProp';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { aboutPageSchema, breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/about',
    title: locale === 'de' ? 'Über Deploris IT- und Software-Partner' : 'About Deploris IT and software partner',
    description:
      locale === 'de'
        ? 'Wir liefern verlässlichen Infrastruktur-Support sowie individuelle CRM-, RAG- und KI-Systeme aus einer Hand.'
        : 'We deliver reliable infrastructure support alongside custom CRM, RAG, and AI systems under one team.',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const de = locale === 'de';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <section className="container py-16">
        <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">
          {de ? 'Über uns' : 'About'}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {de
            ? 'Ein Team für Infrastruktur und Software gebaut auf Verantwortung, nicht auf Marketing.'
            : 'One team for infrastructure and software built on accountability, not marketing.'}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-brand-900/85 dark:text-white/85">
          {de
            ? 'Deploris wurde gegründet, weil wir bei Kunden immer wieder dasselbe sahen: getrennte Anbieter für Hardware und Software, die sich gegenseitig die Verantwortung zuschieben, während der Betrieb wartet. Wir liefern beides aus einem Team, unter einer SLA, mit einer Verantwortlichkeit.'
            : 'Deploris was founded because we kept seeing the same failure pattern at clients: separate vendors for hardware and software, each pointing at the other while the business waited. We deliver both one team, one SLA, one point of accountability.'}
        </p>
      </section>

      <ValuePropGrid
        items={[
          {
            title: de ? 'Ergebnis vor Aufwand' : 'Outcome before effort',
            body: de
              ? 'Wir definieren Erfolg vorab in messbaren Größen und berichten in jedem Sprint dagegen.'
              : 'Every engagement starts with measurable success metrics and every sprint reports against them.',
          },
          {
            title: de ? 'Herstellerneutral' : 'Vendor-neutral',
            body: de
              ? 'Wir betreiben Ihre Technik. Hardware-Weiterverkauf ist nicht unser Kerngeschäft.'
              : 'We operate the technology you already own. Hardware resale is not our core business.',
          },
          {
            title: de ? 'Security-first' : 'Security-first',
            body: de
              ? 'Gehärtete Header, EU-Datenverarbeitung, auditierte Formularflüsse als Standard, nicht als Aufpreis.'
              : 'Hardened headers, EU-region processing, and audited form flows as standard, not as an upsell.',
          },
          {
            title: de ? 'Zweisprachig' : 'Bilingual',
            body: de
              ? 'Deutsch (formal Sie) und Englisch für US- und DACH-Kunden mit derselben Qualität.'
              : 'German (formal Sie) and English same quality for US and DACH clients.',
          },
        ]}
      />

      <section className="container py-8">
        <h2 className="font-display text-2xl font-bold text-brand-900 dark:text-white">
          {de ? 'Wie wir arbeiten' : 'How we work'}
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {[
            de ? 'Schriftlicher Scope vor jeder Umsetzung' : 'Written scope before every build',
            de ? 'Zweiwöchige Sprints mit Live-Demo' : 'Two-week sprints with a live demo',
            de ? 'Übergabe mit Docs, Tests und Runbook' : 'Handover with docs, tests, and runbook',
          ].map((line) => (
            <div key={line} className="rounded-2xl border border-brand-900/10 p-6 dark:border-white/10">
              <p className="text-brand-900 dark:text-white">{line}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={de ? 'Sprechen wir über Ihr Projekt.' : "Let's talk about your project."}
        body={de ? 'Ein Werktag Reaktionszeit. Kein Verkaufstanz.' : 'One business day response. No sales dance.'}
        primaryHref={`${prefix}/contact`}
        primaryLabel={tCommon('cta_contact')}
        secondaryHref={`${prefix}/quote`}
        secondaryLabel={tCommon('cta_quote')}
      />

      <SchemaJsonLd
        data={[
          aboutPageSchema({
            locale,
            title: de ? 'Über Deploris IT- und Software-Partner' : 'About Deploris IT and software partner',
            description: de
              ? 'Deploris liefert Hardware-/Infrastruktur-Support und individuelle CRM-, RAG- und KI-Systeme aus einem Team mit schriftlicher SLA.'
              : 'Deploris delivers reliable infrastructure support alongside custom CRM, RAG, and AI systems one team, one SLA, one accountability.',
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: de ? 'Über uns' : 'About', href: `${prefix}/about` },
          ]),
        ]}
      />
    </>
  );
}
