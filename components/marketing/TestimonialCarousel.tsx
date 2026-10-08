'use client';

import { useEffect, useState } from 'react';

type Testimonial = { quote: string; author: string; role: string; company: string };

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [items.length]);

  if (items.length === 0) return null;
  const cur = items[i]!;

  return (
    <section aria-label="Testimonials" className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <blockquote className="font-display text-2xl leading-relaxed text-brand-900 md:text-3xl dark:text-white">
          “{cur.quote}”
        </blockquote>
        <p className="mt-6 text-sm text-brand-900/85 dark:text-white/70"> {cur.author}, {cur.role}, {cur.company}
        </p>
        {items.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={
                  i === idx
                    ? 'h-2 w-6 rounded-full bg-brand-900 dark:bg-white'
                    : 'h-2 w-2 rounded-full bg-brand-900/30 dark:bg-white/30'
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
