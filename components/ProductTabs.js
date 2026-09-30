"use client";

import { useState } from "react";

const tabs = [
  {
    key: "discover",
    label: "Discover",
    title: "Every tender, ranked for your company.",
    text: "Tender Agent reads your profile — business type, sectors, states, turnover — and scores tenders against it, so you start with the ones worth bidding on.",
    bullets: [
      "Ask in plain English: “Which tenders are best for my company?”",
      "Match score based on sector, location, value and eligibility",
      "Filter by state, value range or closing date just by asking",
    ],
    mock: {
      head: "Top matches",
      rows: [
        ["Facility Management — Campus", "92%", "ok"],
        ["Sanitation Manpower — Wards 1–12", "88%", "ok"],
        ["Security Agency — Mining Site", "84%", "brand"],
        ["Housekeeping — 40 Branches", "79%", "warn"],
      ],
    },
  },
  {
    key: "analyse",
    label: "Analyse",
    title: "Long tender documents, decoded in minutes.",
    text: "Stop hunting through hundreds of pages. Ask about any clause and get a direct answer, the eligibility criteria and the risks that matter.",
    bullets: [
      "Pull out EMD, experience thresholds, deadlines and bid conditions",
      "Flag penalty, payment and liability clauses before you commit",
      "Turn a tender into a clear go / no-go summary",
    ],
    mock: {
      head: "Clause check",
      rows: [
        ["Bid security (EMD)", "₹2.5 Cr", "brand"],
        ["Similar work experience", "3 yrs", "brand"],
        ["Penalty for delay", "0.5% / day", "warn"],
        ["Payment terms", "45 days", "ok"],
      ],
    },
  },
  {
    key: "prepare",
    label: "Prepare",
    title: "Know exactly what you’re missing before you bid.",
    text: "Tick the documents you already hold and Tender Agent shows what each tender needs — GST, PAN, Udyam, turnover certificates, past work orders and more.",
    bullets: [
      "16-document readiness checklist built into onboarding",
      "See which documents block an eligibility check",
      "Upload PDFs, DOCX, TXT or MD to your company vault",
    ],
    mock: {
      head: "Document readiness",
      rows: [
        ["PAN card", "Ready", "ok"],
        ["GST registration", "Ready", "ok"],
        ["CA turnover certificate", "Missing", "warn"],
        ["Digital Signature (DSC)", "Missing", "warn"],
      ],
    },
  },
];

export default function ProductTabs() {
  const [active, setActive] = useState("discover");
  const t = tabs.find((x) => x.key === active);

  return (
    <div className="ptabs">
      <div className="ptabs-bar" role="tablist">
        {tabs.map((x) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={active === x.key}
            className={`ptab ${active === x.key ? "on" : ""}`}
            onClick={() => setActive(x.key)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="ptabs-body" key={t.key}>
        <div>
          <h3>{t.title}</h3>
          <p className="muted">{t.text}</p>
          <ul className="ticks">
            {t.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
        <div className="mock" aria-hidden="true">
          <div className="mock-head">{t.mock.head}<span>Sample</span></div>
          {t.mock.rows.map(([l, r, tone]) => (
            <div className="mock-row" key={l}>
              <span>{l}</span>
              <span className={`badge badge-${tone === "ok" ? "success" : tone}`}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
