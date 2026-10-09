import { getBlogPost } from '@/lib/mdx';
import { renderOg } from '@/lib/og';
import type { Locale } from '@/config/locales';

// Node runtime: blog MDX is read from the filesystem, which isn't available
// on the edge. Other OG routes stay on edge.
export const runtime = 'nodejs';
export const alt = 'Deploris blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function BlogPostOG({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  const title = post?.data.title ?? 'Deploris blog';
  const date = post?.data.date;
  return renderOg({
    title,
    eyebrow: locale === 'de' ? 'Deploris · Blog' : 'Deploris · Blog',
    footer: date ? new Date(date).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined,
  });
}
