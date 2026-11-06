"use client";

import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID } from "@/lib/gtm";

/** GTM container + dataLayer bootstrap (public site only). */
export function Gtm() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script id="gtm-datalayer-shim" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
      <GoogleTagManager gtmId={GTM_ID} />
    </>
  );
}
