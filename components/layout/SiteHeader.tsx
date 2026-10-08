'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { buildNav } from '@/config/nav';
import type { Locale } from '@/config/locales';
import { site } from '@/config/site';
import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const nav = buildNav(locale);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-900/10 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-surface-dark/95">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link
          href={locale === 'en' ? '/' : `/${locale}`}
          aria-label={site.name}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt={`${site.name} ${site.tagline[locale]}`}
            width={512}
            height={512}
            priority
            className="h-16 w-16 object-contain"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} hasChildren={!!item.children} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <Link
            href={locale === 'en' ? '/quote' : `/${locale}/quote`}
            className="rounded-full bg-brand-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
          >
            {t('common.cta_quote')}
          </Link>
        </div>

        <button
          type="button"
          className="rounded p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-brand-900/10 bg-white md:hidden dark:border-white/10 dark:bg-surface-dark"
        >
          <nav aria-label="Mobile" className="container flex flex-col py-2">
            {nav.map((item) => (
              <MobileNavGroup key={item.href} item={item} onNav={() => setOpen(false)} />
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-brand-900/10 pt-3 dark:border-white/10">
              <LocaleSwitcher />
              <Link
                href={locale === 'en' ? '/quote' : `/${locale}/quote`}
                onClick={() => setOpen(false)}
                className="rounded-full bg-brand-900 px-4 py-2 text-sm font-medium text-white"
              >
                {t('common.cta_quote')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  label,
  hasChildren,
}: {
  href: string;
  label: string;
  hasChildren: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'rounded px-3 py-2 text-sm text-brand-900 hover:bg-brand-50 dark:text-white dark:hover:bg-white/10',
      )}
    >
      {label}
      {hasChildren && <span className="ml-1 text-xs opacity-60" aria-hidden>▾</span>}
    </Link>
  );
}

function MobileNavGroup({
  item,
  onNav,
}: {
  item: ReturnType<typeof buildNav>[number];
  onNav: () => void;
}) {
  return (
    <div className="py-1">
      <Link
        href={item.href}
        onClick={onNav}
        className="block rounded px-2 py-2 text-base font-medium text-brand-900 dark:text-white"
      >
        {item.label}
      </Link>
      {item.children && (
        <div className="ml-3 flex flex-col border-l border-brand-900/10 pl-3 dark:border-white/10">
          {item.children.map((child) => (
            <div key={child.href}>
              <Link
                href={child.href}
                onClick={onNav}
                className="block py-1 text-sm text-brand-900/80 dark:text-white/80"
              >
                {child.label}
              </Link>
              {child.children && (
                <div className="ml-3 border-l border-brand-900/5 pl-3">
                  {child.children.map((leaf) => (
                    <Link
                      key={leaf.href}
                      href={leaf.href}
                      onClick={onNav}
                      className="block py-1 text-xs text-brand-900/70 dark:text-white/70"
                    >
                      {leaf.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
