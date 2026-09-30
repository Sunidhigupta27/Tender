"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import SplitWords from "@/components/SplitWords";

const stages = [
  {
    n: 1, title: "Discover", sub: "Find the right tenders before anyone else.",
    cards: [
      { icon: "sparkles", title: "Smart Match", text: "Every tender scored against your company profile." },
      { icon: "search", title: "Plain-English Search", text: "Ask “Which tenders fit us?” — no codes or filters." },
      { icon: "clock", title: "Closing Soon", text: "Tenders due in the next two weeks, sorted by date." },
      { icon: "trend", title: "Match Score", text: "Sector, location, value and eligibility in one number." },
    ],
  },
  {
    n: 2, title: "Analyse", sub: "Every document, decoded in minutes.",
    cards: [
      { icon: "file", title: "Reports", text: "Penalty traps, payment terms and liability triggers flagged instantly." },
      { icon: "check", title: "Eligibility", text: "Turnover, experience and net-worth criteria pulled out and checked." },
      { icon: "chat", title: "Cited Answers", text: "Every answer tied back to the tender clause it came from." },
      { icon: "calendar", title: "EMD & Deadlines", text: "Bid security, pre-bid dates and submission dates at a glance." },
    ],
  },
  {
    n: 3, title: "Prepare", sub: "Know what’s missing before you bid.",
    cards: [
      { icon: "list", title: "16-Document Checklist", text: "PAN, GST, Udyam, ITRs, CA certificate, DSC and more." },
      { icon: "lock", title: "Company Vault", text: "Upload PDFs, DOCX, TXT or MD once — reuse for every bid." },
      { icon: "alert", title: "Missing-Doc Alerts", text: "See which document blocks each eligibility check." },
    ],
  },
  {
    n: 4, title: "Decide", sub: "Go or no-go, with reasons.",
    cards: [
      { icon: "shield", title: "Fit Summary", text: "A clear verdict with the reasons behind it." },
      { icon: "flag", title: "Next Step", text: "The one action that moves the bid forward." },
      { icon: "users", title: "Team Hand-off", text: "A clean brief for your bid team. You still submit." },
    ],
  },
];

// Build an S-curve path that snakes left ↔ right through each stage.
function buildPath(panel, stageEls, titleEl) {
  const pr = panel.getBoundingClientRect();
  const W = pr.width;
  const narrow = W < 700;
  const left = W * (narrow ? 0.12 : 0.2);
  const right = W * (narrow ? 0.88 : 0.8);
  const rel = (r) => ({ top: r.top - pr.top, bottom: r.bottom - pr.top });

  const pts = [];
  const t = rel(titleEl.getBoundingClientRect());
  pts.push([W * 0.5, t.bottom + 24]);

  stageEls.forEach((el, i) => {
    if (!el) return;
    const grid = el.querySelector(".jr-grid");
    const g = rel((grid || el).getBoundingClientRect());
    const x = i % 2 === 0 ? left : right;
    pts.push([x, g.top + 40]);
    pts.push([x, g.bottom - 30]);
  });
  pts.push([W * 0.5, pr.height - 40]);

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x1, y1] = pts[i - 1];
    const [x2, y2] = pts[i];
    if (x1 === x2) {
      d += ` L ${x2} ${y2}`;
    } else {
      const dy = (y2 - y1) * 0.62;
      d += ` C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
    }
  }
  return { d, W, H: pr.height };
}

export default function JourneyScroll() {
  const panelRef = useRef(null);
  const titleRef = useRef(null);
  const stageRefs = useRef([]);
  const bandRef = useRef(null);
  const lineRef = useRef(null);
  const tipRef = useRef(null);
  const [geo, setGeo] = useState({ d: "", W: 1000, H: 1000 });

  // (re)build the path whenever the layout changes
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    let alive = true;
    const rebuild = () => {
      const title = titleRef.current;
      // skip if the section is unmounted / refs not attached (e.g. during hot reload)
      if (!alive || !panelRef.current || !title) return;
      setGeo(buildPath(panelRef.current, stageRefs.current, title));
    };
    rebuild();
    const ro = new ResizeObserver(rebuild);
    ro.observe(panel);
    return () => { alive = false; ro.disconnect(); };
  }, []);

  // draw the line up to the point level with ~65% of the viewport
  useEffect(() => {
    const line = lineRef.current;
    const band = bandRef.current;
    const tip = tipRef.current;
    const panel = panelRef.current;
    if (!line || !geo.d) return;

    const total = line.getTotalLength();
    // sample the path once so we can map a y position to a length
    const samples = [];
    const N = 500;
    for (let i = 0; i <= N; i++) {
      const l = (total * i) / N;
      samples.push([l, line.getPointAtLength(l)]);
    }
    [line, band].forEach((p) => { p.style.strokeDasharray = `${total} ${total}`; });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = null;

    function update() {
      raf = null;
      let len;
      if (reduce) {
        len = total;
      } else {
        const r = panel.getBoundingClientRect();
        const targetY = window.innerHeight * 0.65 - r.top;
        len = 0;
        for (let i = 0; i < samples.length; i++) {
          if (samples[i][1].y <= targetY) len = samples[i][0];
          else break;
        }
      }
      const off = total - len;
      line.style.strokeDashoffset = off;
      band.style.strokeDashoffset = off;
      if (tip) {
        const p = line.getPointAtLength(len);
        tip.setAttribute("cx", p.x);
        tip.setAttribute("cy", p.y);
        tip.style.opacity = len > 2 && len < total - 2 ? 1 : 0;
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [geo]);

  return (
    <section className="section jr-section" id="journey">
      <div className="container">
        <div className="jr-panel" ref={panelRef}>
          <svg
            className="jr-svg" width={geo.W} height={geo.H}
            viewBox={`0 0 ${geo.W} ${geo.H}`} aria-hidden="true"
          >
            <defs>
              <linearGradient id="jrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#9a9a9a" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
              <filter id="jrGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className="jr-track" d={geo.d} />
            <path className="jr-band" d={geo.d} ref={bandRef} />
            <path className="jr-line" d={geo.d} ref={lineRef} filter="url(#jrGlow)" />
            <circle className="jr-tip" r="7" ref={tipRef} filter="url(#jrGlow)" />
          </svg>

          <div className="jr-title" ref={titleRef}>
            <SplitWords as="h2">
              Your <span className="jr-shine">tender journey</span>, end-to-end.
            </SplitWords>
            <p>From discovery to decision, every step powered by AI.</p>
          </div>

          {stages.map((s, i) => (
            <div
              className={`jr-stage ${i % 2 ? "right" : "left"}`}
              key={s.n}
              ref={(el) => (stageRefs.current[i] = el)}
            >
              <div className="jr-stage-head">
                <h3 className="jr-num"><span>{s.n}.</span> {s.title}</h3>
                <p>{s.sub}</p>
              </div>
              <div className="jr-grid">
                {s.cards.map((c) => (
                  <div className="jr-card" key={c.title}>
                    <span className="jr-icon"><Icon name={c.icon} /></span>
                    <div>
                      <h4>{c.title}{c.soon && <em>Soon</em>}</h4>
                      <p>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href="/#product" className="jr-explore">
                Explore {s.title.toLowerCase()} <Icon name="arrow" size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
