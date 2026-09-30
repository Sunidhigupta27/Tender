// Where the logged-in Tender Agent app lives (signup wizard, login, chat).
// Set NEXT_PUBLIC_APP_URL in .env.local, e.g. https://your-app.up.railway.app
// Leave empty to link to the built-in /dashboard demo instead.
const APP = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");

export const links = {
  signup: process.env.NEXT_PUBLIC_SIGNUP_URL || (APP ? `${APP}/` : "/dashboard"),
  login: process.env.NEXT_PUBLIC_LOGIN_URL || (APP ? `${APP}/` : "/login"),
  contact: process.env.NEXT_PUBLIC_CONTACT_EMAIL
    ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`
    : "#contact",
};

export const brand = { name: "Tender Agent", tagline: "AI assistant for Indian tenders" };
