import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/cookies',
    title: locale === 'de' ? 'Cookie-Richtlinie Einwilligung und Verwaltung' : 'Cookie policy what we set and how to manage consent',
    description: locale === 'de'
      ? 'Welche Cookies Deploris setzt (essentiell, Analytics, Marketing), warum, wie lange sie gespeichert werden, und wie Sie Ihre Einwilligung jederzeit verwalten.'
      : 'Which cookies Deploris sets (essential, analytics, marketing), why, how long they persist, and how to review or change your consent at any time.',
  });
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';

  return (
    <section className="container py-14">
      <h1 className="font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
        {de ? 'Cookie-Richtlinie' : 'Cookie policy'}
      </h1>
      <div className="prose prose-brand mt-6 max-w-3xl dark:prose-invert">
        <p>
          {de
            ? 'Wir setzen technisch notwendige Cookies für den Betrieb der Website und nur mit Ihrer Einwilligung Analytik- und Marketing-Cookies. Ihre Einwilligung ist jederzeit widerruflich.'
            : 'We set strictly necessary cookies to run the site and only with your consent analytics and marketing cookies. You can withdraw consent any time.'}
        </p>

        <h2>{de ? 'Kategorien' : 'Categories'}</h2>
        <ul>
          <li>
            <strong>{de ? 'Notwendig' : 'Necessary'}</strong> {de ? 'Sitzung, Sicherheit, Formulare.' : 'session, security, forms.'}
          </li>
          <li>
            <strong>{de ? 'Analytik' : 'Analytics'}</strong> {de ? 'Plausible, GA4, Microsoft Clarity (nach Einwilligung).' : 'Plausible, GA4, Microsoft Clarity (after consent).'}
          </li>
          <li>
            <strong>Marketing</strong> {de ? 'Nur wenn aktiviert und eingewilligt.' : 'Only if enabled and consented.'}
          </li>
        </ul>

        <h2>{de ? 'Einwilligung ändern' : 'Change consent'}</h2>
        <p>
          {de
            ? 'Klicken Sie im Footer auf „Cookies Einstellungen", um Ihre Auswahl anzupassen.'
            : 'Click "Cookies preferences" in the footer to adjust your choices.'}
        </p>
      </div>
    </section>
  );
}
