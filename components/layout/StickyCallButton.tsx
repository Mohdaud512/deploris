import { site } from '@/config/site';

export function StickyCallButton() {
  return (
    <a
      href={`tel:${site.contact.phoneRaw}`}
      aria-label={`Call ${site.name} at ${site.contact.phone}`}
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2 rounded-full bg-brand-900 px-4 py-3 text-sm font-medium text-white shadow-xl transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400 md:hidden"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.6-.4 1-.3a11 11 0 003.5.6c.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.1 2.3z" />
      </svg>
      {site.contact.phone}
    </a>
  );
}
