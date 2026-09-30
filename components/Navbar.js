"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const nav = [
  { href: "/#product", label: "Product" },
  { href: "/#journey", label: "How it works" },
  { href: "/#who", label: "Who it's for" },
  { href: "/#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">TA</span>
          Tender Agent
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {nav.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
        </nav>

        <ThemeToggle />

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
