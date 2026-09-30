"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const VB_W = 460;
const VB_H = 520;

// Points along the face/neck outline where the dotted lines start (viewBox coords)
const ANCHORS = [
  [345, 84], [392, 185], [412, 240], [400, 268],
  [392, 300], [370, 345], [334, 379], [290, 420],
];

export default function FaqBrain({ faqs = [] }) {
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState(null);
  const [paths, setPaths] = useState([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [inView, setInView] = useState(false);

  const wrapRef = useRef(null);
  const headRef = useRef(null);
  const dotRefs = useRef([]);
  const uid = useId();

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const head = headRef.current;
    if (!wrap || !head) return;

    const wr = wrap.getBoundingClientRect();
    const hr = head.getBoundingClientRect();
    setBox({ w: wr.width, h: wr.height });

    // Illustration hidden (mobile) → no lines
    if (hr.width === 0) return setPaths([]);

    const s = hr.width / VB_W;
    const n = faqs.length;

    setPaths(
      faqs.map((_, i) => {
        const dot = dotRefs.current[i];
        if (!dot) return null;
        const dr = dot.getBoundingClientRect();
        const a = ANCHORS[n <= 1 ? 0 : Math.round((i * (ANCHORS.length - 1)) / (n - 1))];

        const x1 = hr.left - wr.left + a[0] * s;
        const y1 = hr.top - wr.top + a[1] * s;
        const x2 = dr.left - wr.left + dr.width / 2;
        const y2 = dr.top - wr.top + dr.height / 2;
        const dx = x2 - x1;

        return {
          d: `M ${x1} ${y1} C ${x1 + dx * 0.45} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`,
          x1,
          y1,
        };
      })
    );
  }, [faqs]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    measure();
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    // Fires every frame while an answer expands/collapses, so lines follow the cards
    const ro = new ResizeObserver(schedule);
    ro.observe(wrap);
    window.addEventListener("resize", schedule);
    document.fonts?.ready?.then(schedule);

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [measure]);

  return (
    <div ref={wrapRef} className={`faqb ${inView ? "is-in" : ""}`}>
      {/* Dotted connector lines */}
      <svg className="faqb-lines" width={box.w} height={box.h} aria-hidden="true">
        {paths.map(
          (p, i) =>
            p && (
              <g
                key={i}
                className={`faqb-line ${open === i ? "is-open" : ""} ${hover === i ? "is-hover" : ""}`}
                style={{ "--i": i }}
              >
                <path className="faqb-line-base" d={p.d} />
                <path className="faqb-line-flow" d={p.d} />
                <circle className="faqb-node" cx={p.x1} cy={p.y1} r="3.5" />
              </g>
            )
        )}
      </svg>

      {/* Head + brain illustration */}
      <div className="faqb-art" aria-hidden="true">
        <svg ref={headRef} viewBox={`0 0 ${VB_W} ${VB_H}`} className="faqb-head">
          <path
            className="faqb-outline"
            d="M150 400 C80 360 40 300 40 215 C40 110 125 40 225 40 C325 40 390 110 392 185
               C394 210 400 225 412 240 C420 252 414 262 400 268 C396 280 398 290 392 300
               C386 318 380 330 370 345 C350 375 320 390 290 395 L290 430
               C290 445 280 450 265 450 L235 450 L235 505 L205 505 L205 450 L170 450
               C155 450 150 440 150 425 Z"
          />
          <path
            className="faqb-brain"
            d="M110 150 C105 105 150 88 215 90 L230 90 C300 88 350 105 352 160
               C354 215 320 245 265 245 L170 245 C120 245 105 205 110 150 Z"
          />
          <path className="faqb-split" d="M222 94 L222 241" />
          {/* re-keyed so the waves "think" each time a new question opens */}
          <g key={open ?? "none"} className="faqb-waves">
            <path d="M128 130 q22 10 44 0 t40 0" />
            <path d="M120 170 q24 10 48 0 t44 0" />
            <path d="M128 210 q22 10 44 0 t40 0" />
            <path d="M234 130 q24 -10 48 0 t48 0" />
            <path d="M234 170 q26 -10 52 0 t50 0" />
            <path d="M234 210 q22 -10 44 0 t44 0" />
          </g>
          <circle className="faqb-eye" cx="366" cy="205" r="7" />
        </svg>
      </div>

      {/* Accordion */}
      <div className="faqb-list">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div
              key={q}
              className={`faqb-item ${isOpen ? "is-open" : ""}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <button
                id={`${uid}-q-${i}`}
                className="faqb-q"
                aria-expanded={isOpen}
                aria-controls={`${uid}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span ref={(el) => (dotRefs.current[i] = el)} className="faqb-dot" aria-hidden="true" />
                <span className="faqb-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="faqb-text">{q}</span>
                <span className="faqb-icon" aria-hidden="true" />
              </button>
              <div
                id={`${uid}-a-${i}`}
                role="region"
                aria-labelledby={`${uid}-q-${i}`}
                className="faqb-a"
              >
                <div className="faqb-a-inner">
                  <p>{a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}