'use client';

import { useEffect, useState } from 'react';
import type { ConsentState } from '../layout/CookieConsent';

const KEY = 'ks-consent-v1';

function readInitial(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as ConsentState;
    return { necessary: true, analytics: !!p.analytics, marketing: !!p.marketing };
  } catch {
    return null;
  }
}

export function ConsentGate({
  category,
  children,
}: {
  category: 'analytics' | 'marketing';
  children: React.ReactNode;
}) {
  const [allowed, setAllowed] = useState<boolean>(() => {
    const c = readInitial();
    return !!c && !!c[category];
  });

  useEffect(() => {
    function onConsent(e: Event) {
      const detail = (e as CustomEvent<ConsentState>).detail;
      if (!detail) return;
      setAllowed(!!detail[category]);
    }
    window.addEventListener('ks-consent', onConsent as EventListener);
    return () => window.removeEventListener('ks-consent', onConsent as EventListener);
  }, [category]);

  if (!allowed) return null;
  return <>{children}</>;
}
