"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades + lifts elements in as they enter the viewport. Siblings are staggered.
// Selectors are hidden by CSS only when <html> has the `js` class, so the page
// still shows everything if scripts don't run.
export const REVEAL_SELECTOR = [
  ".section-head .kicker",
  ".section-head p",
  ".card",
  ".jr-card",
  ".jr-stage-head",
  ".jr-explore",
  ".faq",
  ".mk-strip-grid > div",
  ".ptabs",
  ".readiness",
  ".doc-pill",
  ".cta-band",
  ".chat-card",
  ".hero-cta",
  ".hero-points",
  ".mk-hero .lead",
  ".eyebrow",
  ".db-kpi",
  ".db-panel",
  ".login-card",
].join(",");

export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(REVEAL_SELECTOR)).filter(
      (el) => !el.classList.contains("rv-in")
    );

    const reveal = (el) => {
      const sibs = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL_SELECTOR))
        : [el];
      const idx = Math.max(0, sibs.indexOf(el));
      el.style.transitionDelay = `${Math.min(idx, 6) * 80}ms`;
      el.classList.add("rv-in", "rv-anim");
      // clear the stagger delay afterwards so hover effects respond instantly
      setTimeout(() => { el.style.transitionDelay = ""; el.classList.remove("rv-anim"); }, 900 + Math.min(idx, 6) * 80);
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
