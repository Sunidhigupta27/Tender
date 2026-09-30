// Phone-with-padlock illustration for the login page (inline SVG, themed via CSS vars).
export default function LoginIllustration() {
  return (
    <svg className="login-art" viewBox="0 0 260 260" role="img" aria-label="Phone with a padlock">
      <circle cx="128" cy="130" r="124" className="la-bg" />
      <g className="la-phone">
        <rect x="64" y="30" width="126" height="200" rx="22" className="la-body" />
        <rect x="78" y="46" width="98" height="164" rx="12" className="la-screen" />
        <circle cx="127" cy="82" r="16" className="la-avatar" />
        <rect x="95" y="112" width="64" height="7" rx="3.5" className="la-line" />
        <rect x="95" y="128" width="46" height="7" rx="3.5" className="la-line" />
        <rect x="95" y="160" width="64" height="18" rx="9" className="la-btn" />
      </g>
      <g className="la-lock">
        <circle cx="194" cy="52" r="34" className="la-halo" />
        <circle cx="194" cy="52" r="26" className="la-badge" />
        <path d="M185 50v-6a9 9 0 0 1 18 0v6" className="la-shackle" />
        <rect x="181" y="49" width="26" height="20" rx="4" className="la-lockbody" />
        <circle cx="194" cy="59" r="3" className="la-keyhole" />
      </g>
    </svg>
  );
}
