import Link from 'next/link';

/**
 * Root-level 404 for URLs that never match the [locale] segment at all
 * (e.g. /anything-without-a-locale, or a bare /xxx). Rendered without the
 * next-intl provider, so copy stays locale-free. Branded shell so visitors
 * aren't dumped onto Next's bare default page.
 */
export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-brand-900 antialiased dark:bg-surface-dark dark:text-white">
        <main className="container flex min-h-screen flex-col items-center justify-center py-16 text-center">
          <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">404</p>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            That page could not be found.
          </h1>
          <p className="mt-3 max-w-md text-brand-900/85 dark:text-white/85">
            The link may be stale or mistyped. Head back to one of our main pages.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-brand-900 px-4 py-2 text-white hover:bg-brand-800"
            >
              English
            </Link>
            <Link
              href="/de"
              className="rounded-full border border-brand-900/20 px-4 py-2 text-brand-900 dark:border-white/20 dark:text-white"
            >
              Deutsch
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
