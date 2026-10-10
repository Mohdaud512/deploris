import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { AiOpportunityFinder } from '@/components/marketing/AiOpportunityFinder';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/ai-opportunity-finder',
    title: locale === 'de' ? 'KI-Chancen-Finder zehn Fragen zu Ihrem besten Nächsten Schritt' : 'AI Opportunity Finder ten questions to your best next step',
    description: locale === 'de'
      ? 'Beantworten Sie zehn Fragen zu Ihrer tatsächlichen Lage. Wir bewerten Ihre Situation gegen CRM, RAG, KI-Agenten und Managed IT und zeigen, was wirklich passt. Kein Formular, keine E-Mail.'
      : 'Answer ten questions on where you actually are today. We score your situation against custom CRM, RAG, AI agents, and managed IT, and show what actually fits. No form, no email.',
  });
}

export default async function AiOpportunityFinderPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AiOpportunityFinder locale={locale} />;
}
