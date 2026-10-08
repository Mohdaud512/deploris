'use client';

import Script from 'next/script';

/**
 * Google Consent Mode v2 deny-by-default bootstrap. Must run BEFORE any
 * gtag/GA4 script. Subsequent loaders (GA4Loader) call `gtag('consent','update')`
 * once the user grants analytics/marketing consent.
 */
export function ConsentBootstrap() {
  return (
    <Script id="ks-consent-default" strategy="beforeInteractive">
      {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: 500
});
`}
    </Script>
  );
}
