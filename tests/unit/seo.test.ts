import { describe, it, expect } from 'vitest';
import { buildMetadata } from '@/lib/seo';
import { safeJsonLd, faqSchema, breadcrumbSchema } from '@/lib/schema';

describe('buildMetadata', () => {
  it('emits hreflang for both locales + x-default', () => {
    const meta = buildMetadata({
      locale: 'en',
      path: '/services/hardware',
      title: 'Hardware',
      description: 'test',
    });
    const langs = (meta.alternates?.languages ?? {}) as Record<string, string>;
    expect(langs['en']).toContain('/services/hardware');
    expect(langs['de']).toContain('/de/services/hardware');
    expect(langs['x-default']).toContain('/services/hardware');
  });
});

describe('safeJsonLd', () => {
  it('escapes < > & to defuse </script> injection', () => {
    const s = safeJsonLd({ x: '</script><script>alert(1)</script>' });
    expect(s).not.toContain('</script>');
    expect(s).toContain('\\u003c');
  });
});

describe('faqSchema', () => {
  it('builds a FAQPage', () => {
    const s = faqSchema([{ q: 'A?', a: 'B.' }]);
    expect(s['@type']).toBe('FAQPage');
    expect(s.mainEntity[0]?.name).toBe('A?');
  });
});

describe('breadcrumbSchema', () => {
  it('renders positions from 1', () => {
    const s = breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
    ]);
    expect(s.itemListElement[0]?.position).toBe(1);
    expect(s.itemListElement[1]?.position).toBe(2);
  });
});
