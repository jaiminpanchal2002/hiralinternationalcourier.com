"use client";

import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

function linkFromEvent(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a");
  return anchor instanceof HTMLAnchorElement ? anchor : null;
}

/** Delegated tel: and WhatsApp clicks → dataLayer for GTM/GA4. */
export function GtmClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = linkFromEvent(event.target);
      if (!anchor) return;

      const href = anchor.href;
      const text = (anchor.textContent || "").trim().slice(0, 120);

      if (href.startsWith("tel:")) {
        sendGTMEvent({
          event: "phone_click",
          event_category: "engagement",
          event_label: text || "phone",
          link_url: href,
        });
        return;
      }

      if (/wa\.me|whatsapp\.com|api\.whatsapp\.com/i.test(href)) {
        sendGTMEvent({
          event: "whatsapp_click",
          event_category: "engagement",
          event_label: text || "whatsapp",
          link_url: href,
        });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
