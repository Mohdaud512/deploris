'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/config/locales';
import { site } from '@/config/site';
import { hardwareServices, developmentServices } from '@/config/services';
import { openCookiePreferences } from './CookieConsent';

export function SiteFooter() {
  const locale = useLocale() as Locale;
  const t = useTranslations('footer');
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const servicesRoot = `${prefix}/services`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-brand-950 text-white/80">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt={site.name}
              width={512}
              height={512}
              className="h-16 w-16 object-contain brightness-0 invert"
            />
          </div>
          <p className="mt-3 text-sm">{site.tagline[locale]}</p>
          <address className="mt-4 not-italic text-sm">
            {site.contact.address.street}
            <br />
            {site.contact.address.locality}, {site.contact.address.region} {site.contact.address.postalCode}
            <br />
            {site.contact.address.country}
          </address>
          <p className="mt-3 text-sm">
            <a href={`tel:${site.contact.phoneRaw}`} className="hover:text-white">
              {site.contact.phone}
            </a>
            <br />
            <a href={`mailto:${site.contact.email}`} className="hover:text-white">
              {site.contact.email}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {t('services_h')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {hardwareServices.slice(0, 4).map((s) => (
              <li key={s.id}>
                <Link
                  href={`${servicesRoot}/hardware/${s.copy[locale].slug}`}
                  className="hover:text-white"
                >
                  {s.copy[locale].title}
                </Link>
              </li>
            ))}
            {developmentServices.map((s) => (
              <li key={s.id}>
                <Link
                  href={`${servicesRoot}/development/${s.copy[locale].slug}`}
                  className="hover:text-white"
                >
                  {s.copy[locale].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {t('company')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={`${prefix}/about`} className="hover:text-white">About</Link></li>
            <li><Link href={`${prefix}/projects`} className="hover:text-white">Case Studies</Link></li>
            <li><Link href={`${prefix}/blog`} className="hover:text-white">Blog</Link></li>
            <li><Link href={`${prefix}/faq`} className="hover:text-white">FAQ</Link></li>
            <li><Link href={`${prefix}/glossary`} className="hover:text-white">Glossary</Link></li>
            <li><Link href={`${prefix}/careers`} className="hover:text-white">Careers</Link></li>
            <li><Link href={`${prefix}/contact`} className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            {t('legal')}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={`${prefix}/legal/impressum`} className="hover:text-white">{t('impressum')}</Link></li>
            <li><Link href={`${prefix}/legal/privacy`} className="hover:text-white">{t('privacy')}</Link></li>
            <li><Link href={`${prefix}/legal/cookies`} className="hover:text-white">{t('cookies')}</Link></li>
            <li><Link href={`${prefix}/legal/terms`} className="hover:text-white">{t('terms')}</Link></li>
            <li><Link href={`${prefix}/legal/dpa`} className="hover:text-white">{t('dpa')}</Link></li>
            <li><Link href={`${prefix}/legal/data-request`} className="hover:text-white">{t('data_request')}</Link></li>
            <li>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="hover:text-white"
              >
                {t('cookies')} preferences
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/60 md:flex-row">
          <p>© {year} {site.legalName}. {t('rights')}</p>
          <div className="flex items-center gap-4">
            <a href={site.social.linkedin} className="hover:text-white" rel="me noopener">LinkedIn</a>
            <a href={site.social.github} className="hover:text-white" rel="me noopener">GitHub</a>
            <a href={site.social.x} className="hover:text-white" rel="me noopener">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
