"use client";

import { useRef, useState } from "react";
import { kpis, agentQuickActions } from "@/lib/data";

const nav = [
  { icon: "▦", label: "Dashboard" },
  { icon: "☰", label: "Tenders" },
  { icon: "✦", label: "AI Analysis" },
  { icon: "🔖", label: "Saved Tenders" },
  { icon: "⇄", label: "Comparisons" },
  { icon: "📄", label: "Documents" },
  { icon: "📈", label: "Agent Activity" },
  { icon: "📊", label: "Reports" },
  { icon: "⚙", label: "Settings" },
];

const tabs = [
  { key: "all", label: "All Tenders", count: kpis[0].value },
  { key: "new", label: "New", count: kpis[1].value },
  { key: "closing", label: "Closing Soon", count: kpis[2].value },
  { key: "high", label: "High-Value", count: kpis[3].value },
];

function today() {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [tab, setTab] = useState("all");
  const [panelOpen, setPanelOpen] = useState(true);
  const [query, setQuery] = useState("");
  const panelRef = useRef(null);

  return (
    <div className="db">
      {/* ---------- Sidebar ---------- */}
      <aside className="db-side">
        <div className="db-logo">
          <span className="db-logo-mark">◆</span>
          <span>Tender<b>Agent</b></span>
        </div>
        <nav className="db-nav">
          {nav.map((n) => (
            <button
              key={n.label}
              className={`db-nav-link ${active === n.label ? "on" : ""}`}
              onClick={() => setActive(n.label)}
            >
              <span className="db-nav-icon">{n.icon}</span> {n.label}
            </button>
          ))}
        </nav>

        <div className="db-promo">
          <span className="db-promo-bot" aria-hidden="true">🤖</span>
          <h4>AI Tender Agent</h4>
          <p>Automate tender search, analysis and insights with AI.</p>
          <button onClick={() => setPanelOpen(true)}>Start New Search</button>
        </div>
      </aside>

      {/* ---------- Main ---------- */}
      <div className="db-main">
        <header className="db-top">
          <div className="db-search">
            <span>🔍</span>
            <input placeholder="Search tenders, departments, keywords…" />
          </div>
          <div className="db-top-right">
            <button className="db-bell" aria-label="Notifications">🔔</button>
            <span className="db-avatar" aria-hidden="true">·</span>
          </div>
        </header>

        <div className="db-body">
          <div className="db-greet-row">
            <div>
              <h1>Good morning! 👋</h1>
              <p>Here&apos;s your tender intelligence overview</p>
            </div>
            <div className="db-date-card">
              <span>📅 Today</span>
              <strong>{today()}</strong>
            </div>
          </div>

          <div className="db-kpis">
            {kpis.map((k) => (
              <div className={`db-kpi tone-${k.tone}`} key={k.label}>
                <div className="db-kpi-top">
                  <span className="db-kpi-icon">{k.icon}</span>
                </div>
                <div className="db-kpi-value">{k.value}</div>
                <div className="db-kpi-label">{k.label}</div>
              </div>
            ))}
          </div>

          <div className="db-panel">
            <div className="db-panel-head">
              <h3>Search &amp; Filter Tenders</h3>
              <a href="#">Advanced Filters ⇅</a>
            </div>
            <div className="db-filters">
              <label>
                Location
                <select defaultValue=""><option value="">All Locations</option></select>
              </label>
              <label>
                Department
                <select defaultValue=""><option value="">All Departments</option></select>
              </label>
              <label>
                Category
                <select defaultValue=""><option value="">All Categories</option></select>
              </label>
              <label>
                Min (₹ Cr)
                <input placeholder="Min value" />
              </label>
              <label>
                Max (₹ Cr)
                <input placeholder="Max value" />
              </label>
              <label>
                Bid deadline
                <input placeholder="dd/mm/yyyy – dd/mm/yyyy" />
              </label>
            </div>
            <div className="db-filters-actions">
              <button className="btn btn-ghost btn-sm">Reset</button>
              <button className="btn btn-dark btn-sm">Search Tenders</button>
            </div>
          </div>

          <div className="db-panel">
            <div className="db-panel-head">
              <h3>Latest Tenders</h3>
              <select className="db-sort" defaultValue="deadline">
                <option value="deadline">Sort by: Bid Deadline (Earliest)</option>
                <option value="match">Sort by: Best Match</option>
                <option value="value">Sort by: Highest Value</option>
              </select>
            </div>

            <div className="db-tabs">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  className={`db-tab ${tab === t.key ? "on" : ""}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label} <span>({t.count})</span>
                </button>
              ))}
            </div>

            <div className="db-empty">No tenders to display.</div>
          </div>

          {/* ---------- AI agent panel ---------- */}
          {panelOpen && (
            <div className="db-panel db-agent" ref={panelRef}>
              <div className="db-agent-head">
                <span className="db-agent-bot">🤖</span>
                <h3>Tender Agent</h3>
                <span className="badge badge-success" style={{ marginLeft: 4 }}><span className="dot" /> Online</span>
                <span className="db-agent-tools">
                  <button aria-label="Save" title="Save">🔖</button>
                  <button aria-label="Refresh" title="Refresh">↻</button>
                  <button aria-label="Close" title="Close" onClick={() => setPanelOpen(false)}>✕</button>
                </span>
              </div>

              <p className="db-agent-note">
                Ask a question about tenders, eligibility or documents to get started.
              </p>

              <div className="db-agent-ask">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about tenders…"
                />
                <button className="btn btn-dark btn-sm" aria-label="Send">↑</button>
              </div>
              <div className="db-agent-chips">
                {agentQuickActions.map((a) => (
                  <button key={a} className="chip">{a}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
