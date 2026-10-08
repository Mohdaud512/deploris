import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/config/locales';

/**
 * MDX file loader for the blog + glossary.
 *
 * SECURITY:
 * - `slug` parameters are validated with a strict allowlist regex before ever
 * touching the filesystem (defuses path traversal via `../../etc/passwd`).
 * - We resolve the final path and confirm it stays inside the intended root.
 */

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');
const GLOSSARY_ROOT = path.join(process.cwd(), 'content', 'glossary');

const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertSafeSlug(slug: string) {
  if (!SAFE_SLUG.test(slug)) {
    throw new Error(`Rejected unsafe slug: ${slug}`);
  }
}

function resolveInside(root: string, ...segments: string[]): string {
  const resolved = path.resolve(root, ...segments);
  const rel = path.relative(root, resolved);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    throw new Error('Path escapes content root.');
  }
  return resolved;
}

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags?: string[];
  locale: Locale;
  slug: string;
  hero?: string;
};

export type GlossaryFrontmatter = {
  term: string;
  aliases?: string[];
  description: string;
  locale: Locale;
  slug: string;
};

function readMdx<T>(root: string, filename: string): { data: T; body: string } | null {
  try {
    const full = resolveInside(root, filename);
    if (!fs.existsSync(full)) return null;
    const raw = fs.readFileSync(full, 'utf8');
    const parsed = matter(raw);
    return { data: parsed.data as T, body: parsed.content };
  } catch {
    return null;
  }
}

function listMdx(root: string): string[] {
  try {
    return fs
      .readdirSync(root)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

// BLOG
export function listBlogSlugs(locale: Locale): string[] {
  return listMdx(BLOG_ROOT)
    .filter((f) => f.endsWith(`.${locale}`))
    .map((f) => f.replace(new RegExp(`\\.${locale}$`), ''));
}

export function getBlogPost(locale: Locale, slug: string) {
  assertSafeSlug(slug);
  return readMdx<BlogFrontmatter>(BLOG_ROOT, `${slug}.${locale}.mdx`);
}

export function getAllBlogPosts(locale: Locale) {
  const posts: (BlogFrontmatter & { body: string })[] = [];
  for (const slug of listBlogSlugs(locale)) {
    const p = getBlogPost(locale, slug);
    if (p) posts.push({ ...p.data, body: p.body, slug });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// GLOSSARY
export function listGlossarySlugs(locale: Locale): string[] {
  return listMdx(GLOSSARY_ROOT)
    .filter((f) => f.endsWith(`.${locale}`))
    .map((f) => f.replace(new RegExp(`\\.${locale}$`), ''));
}

export function getGlossaryTerm(locale: Locale, slug: string) {
  assertSafeSlug(slug);
  return readMdx<GlossaryFrontmatter>(GLOSSARY_ROOT, `${slug}.${locale}.mdx`);
}

export function getAllGlossaryTerms(locale: Locale) {
  const terms: (GlossaryFrontmatter & { body: string })[] = [];
  for (const slug of listGlossarySlugs(locale)) {
    const t = getGlossaryTerm(locale, slug);
    if (t) terms.push({ ...t.data, body: t.body, slug });
  }
  return terms.sort((a, b) => a.term.localeCompare(b.term));
}
