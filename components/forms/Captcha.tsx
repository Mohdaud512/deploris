'use client';

import { useEffect, useRef } from 'react';
import { publicEnv } from '@/lib/env';

/**
 * Lightweight hCaptcha wrapper renders explicitly and calls onToken(token).
 * The site key is a public value; the secret is never sent to the client.
 */
export function Captcha({
  onToken,
  onExpire,
}: {
  onToken: (token: string) => void;
  onExpire?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!publicEnv.hcaptchaSiteKey) return;
    let cancelled = false;

    function render() {
      if (cancelled) return;
      const h = (window as unknown as { hcaptcha?: {
        render: (el: HTMLElement, opts: object) => string;
        reset: (id: string) => void;
      } }).hcaptcha;
      if (!h || !ref.current) return;
      widgetId.current = h.render(ref.current, {
        sitekey: publicEnv.hcaptchaSiteKey,
        callback: (token: string) => onToken(token),
        'expired-callback': () => onExpire?.(),
      });
    }

    if (!(window as unknown as { hcaptcha?: unknown }).hcaptcha) {
      const id = 'ks-hcaptcha-script';
      if (!document.getElementById(id)) {
        const s = document.createElement('script');
        s.id = id;
        s.src = 'https://js.hcaptcha.com/1/api.js?render=explicit';
        s.async = true;
        s.defer = true;
        s.onload = render;
        document.head.appendChild(s);
      } else {
        // Script tag exists but not yet loaded; poll briefly.
        const iv = setInterval(() => {
          if ((window as unknown as { hcaptcha?: unknown }).hcaptcha) {
            clearInterval(iv);
            render();
          }
        }, 100);
        setTimeout(() => clearInterval(iv), 5000);
      }
    } else {
      render();
    }
    return () => {
      cancelled = true;
    };
  }, [onToken, onExpire]);

  if (!publicEnv.hcaptchaSiteKey) {
    return (
      <p className="text-xs text-brand-900/60 dark:text-white/60">
        Captcha disabled in dev. Set NEXT_PUBLIC_HCAPTCHA_SITE_KEY to enable.
      </p>
    );
  }

  return <div ref={ref} className="h-[80px] min-h-[80px]" />;
}
