import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ProjectsClient } from './ProjectsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/projects',
    title: locale === 'de' ? 'Referenzen | Deploris' : 'Case studies | Deploris',
    description:
      locale === 'de'
        ? 'Ausgewählte Kundenprojekte anonymisierte Platzhalter, bis freigegebene Fassungen vorliegen.'
        : 'Selected client engagements anonymized placeholders until approved versions are ready.',
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsClient />;
}
