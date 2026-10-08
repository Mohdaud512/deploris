import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

/**
 * Server-side MDX renderer. Content comes from files under content/*, which
 * are authored by us not from user input. `next-mdx-remote/rsc` compiles
 * and renders the MDX during SSR/ISR; we do not eval arbitrary strings.
 */
export function MdxRenderer({ source }: { source: string }) {
  return (
    <div className="prose prose-brand max-w-none dark:prose-invert">
      <MDXRemote source={source} components={components} />
    </div>
  );
}

const components = {
  a: ({ href, children, ...rest }: { href?: string; children?: React.ReactNode }) => {
    if (href && href.startsWith('/')) return <Link href={href} {...rest}>{children}</Link>;
    return (
      <a href={href} rel="noopener noreferrer" target={href?.startsWith('http') ? '_blank' : undefined} {...rest}>
        {children}
      </a>
    );
  },
};
