'use client';

import Script from 'next/script';
import { publicEnv } from '@/lib/env';
import { ConsentGate } from './ConsentGate';

export function PlausibleLoader() {
  const domain = publicEnv.plausibleDomain;
  if (!domain) return null;
  return (
    <ConsentGate category="analytics">
      <Script
        strategy="afterInteractive"
        data-domain={domain}
        src="https://plausible.io/js/script.js"
      />
    </ConsentGate>
  );
}

export function GA4Loader() {
  const id = publicEnv.ga4Id;
  if (!id) return null;
  return (
    <ConsentGate category="analytics">
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
      />
      <Script id="ks-ga4-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','update',{ analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)}, { anonymize_ip: true });
`}
      </Script>
    </ConsentGate>
  );
}

export function ClarityLoader() {
  const id = publicEnv.clarityId;
  if (!id) return null;
  const safeId = JSON.stringify(id);
  return (
    <ConsentGate category="analytics">
      <Script id="ks-clarity" strategy="afterInteractive">
        {`
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${safeId});
`}
      </Script>
    </ConsentGate>
  );
}
