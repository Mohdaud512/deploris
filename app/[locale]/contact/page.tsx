import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ContactForm } from '@/components/forms/ContactForm';
import { site } from '@/config/site';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { contactPageSchema, breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({ locale, path: '/contact', title: t('meta_title'), description: t('meta_description') });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const de = locale === 'de';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="container py-16">
      <div className="grid gap-12 lg:grid-cols-[3fr,2fr]">
        <div>
          <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-xl text-brand-900/85 dark:text-white/85">{t('intro')}</p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
        <aside className="rounded-2xl border border-brand-900/10 bg-brand-50 p-6 text-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
            {de ? 'Direkt erreichen' : 'Reach us directly'}
          </h2>
          <p className="mt-3 text-brand-900/85 dark:text-white/85">
            <a href={`mailto:${site.contact.email}`} className="underline">
              {site.contact.email}
            </a>
            <br />
            <a href={`tel:${site.contact.phoneRaw}`}>{site.contact.phone}</a>
          </p>
          <address className="mt-4 not-italic text-brand-900/85 dark:text-white/85">
            {site.contact.address.street}
            <br />
            {site.contact.address.locality}, {site.contact.address.region} {site.contact.address.postalCode}
            <br />
            {site.contact.address.country}
          </address>
          <p className="mt-4 text-brand-900/85 dark:text-white/70">
            {de ? 'Mo–Fr' : 'Mon–Fri'} {site.contact.hours.opens}–{site.contact.hours.closes}
          </p>
        </aside>
      </div>
      <SchemaJsonLd
        data={[
          contactPageSchema({ locale, title: t('title'), description: t('intro') }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: de ? 'Kontakt' : 'Contact', href: `${prefix}/contact` },
          ]),
        ]}
      />
    </section>
  );
}
