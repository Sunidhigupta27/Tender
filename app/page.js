import Link from "next/link";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import ProductTabs from "@/components/ProductTabs";
import BrainScroll from "@/components/BrainScroll";
import JourneyScroll from "@/components/JourneyScroll";
import SplitWords from "@/components/SplitWords";
import Icon from "@/components/Icon";

import FaqBrain from "@/components/FaqBrain";

const segments = [
  { icon: "sprout", title: "MSMEs & startups", text: "Not registered as a company yet? You can still bid on many tenders as a proprietor. The agent tells you which ones need more." },
  { icon: "building", title: "Contractors", text: "Civil, electrical and road works. Match past work orders and turnover to what each tender demands." },
  { icon: "briefcase", title: "Service providers", text: "Facility management, manpower, security and housekeeping — sectors with steady, repeat tenders." },
  { icon: "box", title: "Suppliers & traders", text: "Bulk quotes, size ranges, warranty and return terms — get the supply tender details pulled out for you." },
];

const faqs = [
  ["Do I need a registered company to use Tender Agent?", "No. During sign-up you tell us whether you have a registered company. If you don’t, the agent still helps you find tenders open to proprietors and individuals, and points out the ones that need a registered entity."],
  ["What do I need to get started?", "A work email and a few minutes. Onboarding takes six short steps: login, tender readiness, company details, contact and address, optional documents, and a final review."],
  ["Which documents does it look for?", "The commonly required ones — PAN, GST, Udyam (MSME), income tax returns, audited financials, CA turnover certificate, past work orders, Digital Signature Certificate, solvency certificate, EPF/ESIC, trade licence, ISO certificates and more."],
  ["Does it submit bids for me?", "No. Tender Agent analyses and recommends. Your team still prepares and submits the bid on the relevant portal."],
  ["Is my company data private?", "Your documents stay in your workspace and are used only to answer your questions. Passwords are stored hashed, never in plain text, and new accounts are activated by an administrator."],
  ["How is the match score calculated?", "It reflects how well a tender fits your sectors, locations, size and eligibility. Treat it as a way to prioritise — always confirm the tender’s own conditions before bidding."],
];

export default function Home() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className="mk-hero">
        <div className="container mk-hero-grid">
          <div>
            <span className="eyebrow"><span className="dot" /> AI assistant for Indian tenders</span>
            <SplitWords as="h1">Find, understand and win <span className="accent">the right tenders</span>.</SplitWords>
            <p className="lead">
              Tender Agent learns your company, then answers plain-English questions about tenders —
              which ones fit, what you’re eligible for, and what documents you still need.
            </p>
            <ul className="hero-points">
              <li>Six-step onboarding</li>
              {/* <li>Works without a registered company</li> */}
              <li>No bid is submitted without you</li>
            </ul>
          </div>

          <LoginForm compact />
        </div>
      </section>

      {/* ---------- Capability strip ---------- */}
      <section className="mk-strip">
        <div className="container mk-strip-grid">
          <div><strong>Plain English</strong><span>No tender codes or filters</span></div>
          <div><strong>16 documents</strong><span>Readiness checklist built in</span></div>
          <div><strong>Cited answers</strong><span>Tied back to the tender text</span></div>
          <div><strong>Private</strong><span>Your files stay in your workspace</span></div>
        </div>
      </section>

      {/* ---------- Product ---------- */}
      <section className="section" id="product">
        <div className="container">
          <div className="section-head">
            <span className="kicker">The product</span>
            <SplitWords>One assistant for the whole tender cycle</SplitWords>
            <p>From finding the opportunity to knowing whether you should bid.</p>
          </div>
          <ProductTabs />
        </div>
      </section>

      {/* ---------- AI brain (scroll animation) ---------- */}
      <BrainScroll />

      {/* ---------- Journey (scroll-drawn line) ---------- */}
      <JourneyScroll />

      {/* ---------- Readiness ---------- */}
      <section className="section" id="readiness" style={{ paddingTop: 10 }}>
        <div className="container readiness">
          <div>
            <span className="kicker">Tender readiness</span>
            <SplitWords>Start with what you already have</SplitWords>
            <p className="muted">
              Onboarding asks which of the usual tender documents you hold. It takes a minute and makes
              every later answer sharper — the agent knows what’s ready and what isn’t.
            </p>
          </div>
          <div className="doc-grid">
            {["PAN card","GST certificate","Udyam (MSME)","Income tax returns","Audited financials","CA turnover certificate","Past work orders","Digital Signature (DSC)","Bank solvency","EPF / ESIC","Trade licence","ISO certifications"].map((d, i) => (
              <span key={d} className={`doc-pill ${i < 2 ? "on" : ""}`}>{i < 2 ? "✓ " : ""}{d}</span>
            ))}
            <span className="doc-pill more">+ 4 more</span>
          </div>
        </div>
      </section>

      {/* ---------- Who ---------- */}
      <section className="section" id="who" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="section-head">
            <span className="kicker">Who it’s for</span>
            <SplitWords>Built for businesses of every size</SplitWords>
            <p>From a one-person firm to an established contractor.</p>
          </div>
          <div className="grid-4">
            {segments.map((s) => (
              <div className="card" key={s.title}>
                <div className="feature-icon"><Icon name={s.icon} size={22} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      {/* <section className="section" id="faq" style={{ paddingTop: 10 }}>
        <div className="container faq-wrap">
          <div className="section-head" style={{ marginBottom: 28 }}>
            <span className="kicker">FAQ</span>
            <SplitWords>Questions, answered</SplitWords>
          </div>
          {faqs.map(([q, a]) => (
            <details className="faq" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section> */}

      {/* ---------- FAQ ---------- */}
<section className="section" id="faq" style={{ paddingTop: 10 }}>
  <div className="container">
    <div className="section-head">
      <span className="kicker">FAQ</span>
      <SplitWords>Questions, answered</SplitWords>
      <p>Everything you need to know before your first tender question.</p>
    </div>
    <FaqBrain faqs={faqs} />
  </div>
</section>

      <Footer />
    </main>
  );
}
