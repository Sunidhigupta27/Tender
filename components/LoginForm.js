"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginIllustration from "@/components/LoginIllustration";
import { links } from "@/lib/config";

export default function LoginForm({ compact = false }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setError("");
    setBusy(true);
    // Demo: go to the built-in dashboard. Wire this to your auth API.
    setTimeout(() => router.push("/dashboard"), 500);
  }

  return (
    <div className={`login-wrap ${compact ? "login-compact" : ""}`}>
      <div className="login-card">
        {!compact && (
          <div className="login-side">
            <LoginIllustration />
            <h2>Welcome back</h2>
            <p>Log in to continue to your dashboard.</p>
          </div>
        )}

        <form className="login-form" onSubmit={onSubmit} noValidate>
          <h1 className="login-title">Log <span>In</span></h1>
          {compact ? (
            <p className="login-demo-note">Demo login — enter any email and a 6+ character password.</p>
          ) : (
            <div className="login-alt">
              <span>New to Tender Agent?</span>
              <a href={links.signup}>Sign up</a>
            </div>
          )}

          <label className="login-field">
            <span>Email address</span>
            <input
              type="email" autoComplete="email" placeholder="you@company.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="login-field">
            <span>Password</span>
            <div className="login-pass">
              <input
                type={show ? "text" : "password"} autoComplete="current-password" placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button" className="login-eye" onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                  {show && <path d="M4 20 20 4" />}
                </svg>
              </button>
            </div>
          </label>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button className="login-submit" type="submit" disabled={busy}>
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
