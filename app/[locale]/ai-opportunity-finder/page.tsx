import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { AiOpportunityFinder } from '@/components/marketing/AiOpportunityFinder';
import { ToolFooter } from '@/components/tools/ToolFooter';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/ai-opportunity-finder',
    title: locale === 'de' ? 'KI-Chancen-Finder zehn Fragen zu Ihrem besten Nächsten Schritt' : 'AI Opportunity Finder ten questions to your best next step',
    description: locale === 'de'
      ? 'Zehn Fragen zu Ihrer tatsächlichen Lage, deterministische Bewertung gegen CRM, RAG, KI-Agenten und Managed IT. Kein Formular, keine E-Mail.'
      : 'Ten questions on where you actually are, scored against custom CRM, RAG, AI agents, and managed IT. Tailored next step. No form, no email.',
  });
}

export default async function AiOpportunityFinderPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';
  const prefix = de ? '/de' : '';
  return (
    <>
      <AiOpportunityFinder locale={locale} />
      <ToolFooter
        locale={locale}
        breadcrumbTrail={[
          { label: 'Home', href: prefix || '/' },
          { label: de ? 'KI-Chancen-Finder' : 'AI Opportunity Finder', href: `${prefix}/ai-opportunity-finder` },
        ]}
        nextSteps={[
          {
            label: de ? 'Alle vier Leistungen vergleichen' : 'Compare all four service lines',
            href: `${prefix}/services`,
          },
          {
            label: de ? 'Demo-Galerie durchsehen' : 'Browse the demo gallery',
            href: `${prefix}/demos`,
          },
          {
            label: de ? 'CRM-TCO-Rechner' : 'CRM TCO calculator',
            href: `${prefix}/tools/crm-tco`,
          },
          {
            label: de ? 'Schriftliches Angebot anfragen' : 'Request a written quote',
            href: `${prefix}/quote`,
          },
        ]}
      />
    </>
  );
}
