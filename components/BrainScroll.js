"use client";

import { useEffect, useRef } from "react";
import SplitWords from "@/components/SplitWords";

// Card content — tailored to Tender Agent. Each `pos` is the fanned-out
// resting position (px offset from centre, plus a slight rotation).
const cards = [
  {
    id: "vault",
    tag: "Company vault",
    title: "Every document, ready",
    lines: ["GST certificate ✓", "PAN & Udyam ✓", "Past work orders ✓"],
    pos: { x: -360, y: -110, r: -7 },
  },
  {
    id: "memory",
    tag: "AI memory",
    title: "Learns your patterns",
    lines: ["Sectors you win in", "Typical bid range", "States you operate in"],
    pos: { x: -140, y: -175, r: -3 },
  },
  {
    id: "feed",
    tag: "Live tender feed",
    title: "New tenders, scored",
    lines: ["Facility Mgmt — 92%", "Manpower supply — 88%", "Security agency — 84%"],
    pos: { x: 130, y: -175, r: 3 },
  },
  {
    id: "eligibility",
    tag: "Eligibility",
    title: "Auto-scored fit",
    lines: ["Turnover ✓", "Similar work ✓", "Net worth — review"],
    pos: { x: 360, y: -100, r: 7 },
  },
  {
    id: "checklist",
    tag: "Readiness",
    title: "16-document checklist",
    lines: ["9 of 16 ready", "CA turnover cert — missing", "DSC — missing"],
    pos: { x: -290, y: 170, r: 6 },
  },
  {
    id: "chat",
    tag: "Ask anything",
    title: "Cited answers",
    lines: ["“What’s the EMD?”", "₹2.5 Cr · clause 4.3.1"],
    pos: { x: 290, y: 170, r: -6 },
  },
];

// how much of the pinned section's scroll range each phase takes
const EMERGE_END = 0.32;
const HOLD_END = 0.68;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInCubic(t) {
  return t * t * t;
}

export default function BrainScroll() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const brainRef = useRef(null);

  useEffect(() => {
    let raf = null;
    let scale = 1;

    function setScale() {
      const w = window.innerWidth;
      scale = w < 640 ? 0.5 : w < 1024 ? 0.72 : 1;
    }

    function update() {
      raf = null;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      let progress = total > 0 ? -rect.top / total : 0;
      progress = Math.min(1, Math.max(0, progress));

      // brain pulses slightly as cards move through it
      if (brainRef.current) {
        const pulse =
          progress < EMERGE_END
            ? 1 - 0.06 * easeOutCubic(progress / EMERGE_END)
            : progress > HOLD_END
            ? 1 - 0.06 * (1 - easeInCubic((progress - HOLD_END) / (1 - HOLD_END)))
            : 0.94;
        brainRef.current.style.transform = `scale(${pulse})`;
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const { x, y, r } = cards[i].pos;
        let tx, ty, rot, cardScale, opacity;

        if (progress < EMERGE_END) {
          // phase 1: cards fly out from the brain to their fanned position
          const e = easeOutCubic(progress / EMERGE_END);
          tx = x * e;
          ty = y * e;
          rot = r * e;
          cardScale = 0.25 + 0.75 * e;
          opacity = e;
        } else if (progress < HOLD_END) {
          // phase 2: hold, fully visible
          tx = x;
          ty = y;
          rot = r;
          cardScale = 1;
          opacity = 1;
        } else {
          // phase 3: cards return into the brain and vanish
          const e = easeInCubic((progress - HOLD_END) / (1 - HOLD_END));
          tx = x * (1 - e);
          ty = y * (1 - e);
          rot = r * (1 - e);
          cardScale = 1 - 0.75 * e;
          opacity = 1 - e;
        }

        card.style.transform = `translate(${tx * scale}px, ${ty * scale}px) rotate(${rot}deg) scale(${cardScale})`;
        card.style.opacity = opacity;
      });
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }
    function onResize() {
      setScale();
      onScroll();
    }

    setScale();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="brain-scroll" ref={sectionRef}>
      <div className="brain-sticky">
        <div className="brain-head">
          <span className="kicker light">Your AI brain for tenders</span>
          <SplitWords>It reads your company before it answers</SplitWords>
          <p>Scroll — every card is something Tender Agent keeps in mind for you.</p>
        </div>

        <div className="brain-stage">
          <div className="brain-glow" aria-hidden="true" />
          <div className="brain-emoji" ref={brainRef} aria-hidden="true">🧠</div>

          {cards.map((c, i) => (
            <div
              key={c.id}
              className="brain-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <span className="brain-card-tag">{c.tag}</span>
              <h4>{c.title}</h4>
              <ul>
                {c.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <span className="brain-scroll-hint">Keep scrolling ↓</span>
      </div>
    </section>
  );
}
