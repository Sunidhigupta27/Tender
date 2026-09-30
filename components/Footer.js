import Link from "next/link";
import { links } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mk-footer" id="contact">
      <div className="container">
        <div className="mk-footer-grid">
          <div>
            <Link href="/" className="logo"><span className="logo-mark">TA</span>Tender Agent</Link>
            <p className="muted small" style={{ marginTop: 12, maxWidth: 300 }}>
              An AI assistant that reads your company profile and helps you find, understand and prepare for tenders.
            </p>
          </div>
          <div>
            <h5>Product</h5>
            <Link href="/#product">Discover</Link>
            <Link href="/#product">Analyse</Link>
            <Link href="/#product">Prepare</Link>
            <Link href="/#readiness">Document readiness</Link>
          </div>
          <div>
            <h5>Who it&apos;s for</h5>
            <Link href="/#who">MSMEs &amp; startups</Link>
            <Link href="/#who">Contractors</Link>
            <Link href="/#who">Service providers</Link>
            <Link href="/#who">Suppliers</Link>
          </div>
          <div>
            <h5>Company</h5>
            <Link href="/docs">Documentation</Link>
            <a href={links.contact}>Contact</a>
          </div>
        </div>
        <div className="mk-footer-bottom">
          <span>© {new Date().getFullYear()} Tender Agent. All rights reserved.</span>
          <span>Passwords are stored hashed, never in plain text.</span>
        </div>
      </div>
    </footer>
  );
}
