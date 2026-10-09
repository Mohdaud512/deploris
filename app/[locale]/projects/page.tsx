import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ProjectsClient } from './ProjectsClient';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';
import { projects } from '@/content/projects';

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
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return (
    <>
      <ProjectsClient />
      <SchemaJsonLd
        data={[
          collectionPageSchema({
            locale,
            path: '/projects',
            title: locale === 'de' ? 'Deploris Referenzen' : 'Deploris Case studies',
            description:
              locale === 'de'
                ? 'Ausgewählte Deploris-Projekte CRM-Entwicklung, RAG-Systeme, KI-Automatisierung und IT-Infrastruktur.'
                : 'Selected Deploris engagements custom CRM, RAG systems, AI automation, and IT infrastructure.',
            hasPart: projects.map((p) => ({
              name: p.copy[locale].title,
              url: `${prefix}/projects/${p.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Referenzen' : 'Case studies', href: `${prefix}/projects` },
          ]),
        ]}
      />
    </>
  );
}
