import { useTranslations } from 'next-intl';

export function SkipToContent() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-white focus:outline focus:outline-2 focus:outline-accent-400"
    >
      Skip to content
    </a>
  );
}
