import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Documentation — Tender Agent",
  description: "How to use the Tender Agent Dashboard: company context, AI query box and tender recommendations.",
};

const toc = [
  ["overview", "Overview"],
  ["dashboard", "Tender Agent Dashboard"],
  ["company-context", "Company context"],
  ["ask-ai", "Asking questions"],
  ["results", "Reading the results"],
  ["examples", "Example questions"],
  ["tips", "Tips for better answers"],
  ["faq", "FAQ"],
];

export default function Docs() {
  return (
    <main>
      <div className="container docs">
        <nav className="docs-toc">
          <div className="small muted" style={{ fontWeight: 600, marginBottom: 10, paddingLeft: 12 }}>ON THIS PAGE</div>
          {toc.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>

        <article className="docs-body">
          <span className="eyebrow">Documentation</span>
          <h1>Tender Agent</h1>
          <p>
            Tender Agent is an AI-based tender assistant. It lets you ask questions about your company
            and identify the tenders that fit it best, without searching tender portals by hand.
          </p>

          <h2 id="overview">Overview</h2>
          <p>
            The tool combines two things: a <strong>company profile</strong> that describes your business,
            and an <strong>AI analyst</strong> that reads that profile before answering. Every answer is
            therefore tailored to your company, not generic tender advice.
          </p>

          <h2 id="dashboard">Tender Agent Dashboard</h2>
          <p>
            The <Link href="/dashboard" style={{ color: "var(--brand)" }}>Tender Agent Dashboard</Link> is
            the main working page. On it, the user can review company information and enter
            natural-language questions to receive tender-related analysis or recommendations.
          </p>
          <p>The dashboard has four areas:</p>
          <table className="table">
            <thead><tr><th>Area</th><th>What it shows</th></tr></thead>
            <tbody>
              <tr><td><strong>Summary cards</strong></td><td>Documents uploaded, business type, number of sectors and operating states.</td></tr>
              <tr><td><strong>Ask the Tender Agent</strong></td><td>The AI query box, example questions, and the conversation with answers.</td></tr>
              <tr><td><strong>Company context</strong></td><td>The profile details the AI uses when it answers.</td></tr>
              <tr><td><strong>Documents</strong></td><td>Files uploaded to the company profile.</td></tr>
            </tbody>
          </table>

          <h2 id="company-context">Company context</h2>
          <p>The company context panel shows the information the AI takes into account. In the current setup it includes:</p>
          <ul>
            <li><strong>Documents: 1</strong> — the number of files uploaded to the profile.</li>
            <li><strong>Business type: Public Limited</strong> — the legal form of the company, used to check entity-type eligibility.</li>
            <li><strong>Sectors and states</strong> — the services offered and where the company operates, used to rank tenders.</li>
          </ul>
          <div className="callout">
            <p>The more complete the company context, the more precise the analysis. Uploading certificates and turnover figures lets the assistant check eligibility instead of estimating it.</p>
          </div>

          <h2 id="ask-ai">Asking questions</h2>
          <ol>
            <li>Click in the AI query box on the dashboard.</li>
            <li>Type your question in plain language, for example <code>Which tenders are best for my company?</code></li>
            <li>Press <strong>Ask AI</strong> (or Ctrl + Enter), or click one of the example questions.</li>
            <li>The answer appears below the box. You can keep asking follow-up questions; use <strong>Clear</strong> to start over.</li>
          </ol>

          <h2 id="results">Reading the results</h2>
          <p>Each answer can contain:</p>
          <ul>
            <li><strong>Summary</strong> — a short direct answer to your question.</li>
            <li><strong>Key points</strong> — reasons, eligibility notes or missing items.</li>
            <li><strong>Recommended tenders</strong> — cards with authority, location, estimated value, deadline and a <strong>match score</strong>.</li>
            <li><strong>Next step</strong> — the single most useful action to take.</li>
          </ul>
          <p>
            The match score (0–100%) reflects how well a tender fits your sectors, locations, size and
            eligibility. It is a guide for prioritising, not a guarantee of qualification — always verify
            the tender&apos;s own eligibility conditions before bidding.
          </p>

          <h2 id="examples">Example questions</h2>
          <table className="table">
            <thead><tr><th>Question</th><th>What you get</th></tr></thead>
            <tbody>
              <tr><td>Which tenders are best for my company?</td><td>A ranked shortlist with match scores.</td></tr>
              <tr><td>Am I eligible for facility management tenders above ₹1 Cr?</td><td>An eligibility breakdown and matching tenders.</td></tr>
              <tr><td>Which documents am I missing for bidding?</td><td>A checklist of documents to upload.</td></tr>
              <tr><td>Show tenders closing in the next 2 weeks</td><td>Tenders sorted by deadline.</td></tr>
            </tbody>
          </table>

          <h2 id="tips">Tips for better answers</h2>
          <ul>
            <li>Mention a sector, state or value range to narrow results.</li>
            <li>Keep the company profile up to date — especially turnover and experience certificates.</li>
            <li>Ask follow-ups such as “Why is this one ranked first?” to see the reasoning.</li>
          </ul>

          <h2 id="faq">FAQ</h2>
          <h3>Does the assistant submit bids?</h3>
          <p>No. It analyses and recommends; bids are still prepared and submitted by your team.</p>
          <h3>Are the tenders live?</h3>
          <p>The bundled data is sample data for demonstration. Connect your tender source in <code>lib/data.js</code> or the API route to use live tenders.</p>
          <h3>What does “Demo mode” mean?</h3>
          <p>When no AI key is configured, a built-in rules engine answers so the site still works. Add an API key to enable full AI answers (see README).</p>
        </article>
      </div>
      <Footer />
    </main>
  );
}
