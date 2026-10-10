import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/config/locales';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { LocaleSuggestBanner } from '@/components/layout/LocaleSuggestBanner';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { StickyCallButton } from '@/components/layout/StickyCallButton';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { ConsentBootstrap } from '@/components/analytics/ConsentBootstrap';
import { PlausibleLoader, GA4Loader, ClarityLoader } from '@/components/analytics/Loaders';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/schema';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const l = locale as Locale;

  return (
    <html lang={l === 'de' ? 'de-DE' : 'en-US'} suppressHydrationWarning>
      <head>
        {/* Pre-warm DNS + TCP for the only external resource we load (and only
            when consent has turned Plausible on). Plausible's script is async,
            so this just shaves ~100ms off its first byte. */}
        <link rel="preconnect" href="https://plausible.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <ConsentBootstrap />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={l}>
          <SkipToContent />
          <LocaleSuggestBanner />
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
          <StickyCallButton />
          <Chatbot />
          <CookieConsent />
          <PlausibleLoader />
          <GA4Loader />
          <ClarityLoader />
          <SchemaJsonLd
            data={[organizationSchema(l), localBusinessSchema(l), websiteSchema(l)]}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
