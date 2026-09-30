# Tender Agent — Website (Next.js)

AI-based tender assistant. Users review company information and ask natural-language
questions (e.g. "Which tenders are best for my company?") to get tender analysis and recommendations.

## Pages

| Route        | Page                                                             |
|--------------|------------------------------------------------------------------|
| `/`          | Marketing site — hero, product tabs, journey, readiness, FAQ, CTA |
| `/dashboard` | **Tender Agent Dashboard** — company context + AI query box      |
| `/login`     | Log in page (phone + padlock illustration, email/password form)  |
| `/docs`      | Documentation for users                                          |
| `/api/ask`   | API endpoint that answers questions (POST `{ question, company }`) |

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Enable real AI answers (optional)

Out of the box the site runs in **demo mode** with a built-in rules engine.
To use Claude for answers, create `.env.local`:

```
ANTHROPIC_API_KEY=your_key_here
# optional
ANTHROPIC_MODEL=claude-sonnet-5
```

## Customise

- `lib/data.js` — company profile (Documents, Business type, sectors, states) and the tender list.
  Replace the sample tenders with data from your database or tender feed.
- `app/api/ask/route.js` — answer logic (AI call + demo fallback).
- `app/globals.css` — colours and layout (light & dark mode supported).

## Deploy

Push to GitHub and import into Vercel, or run `npm run build && npm start` on any Node server.
Add `ANTHROPIC_API_KEY` as an environment variable on the host if you use AI answers.

## Connect the marketing site to your app

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_APP_URL` to your deployed app.
"Get started" and "Log in" buttons then point there. Home page copy lives in `app/page.js`,
product tab content in `components/ProductTabs.js`, colours in `app/globals.css` (`:root`).

## Theme & animations (v5)

- **Black & white theme** with a toggle in the navbar (white ↔ black). The choice is remembered per browser.
  Colours live in the last block of `app/globals.css` (`:root` and `:root[data-theme="dark"]`).
- **Scroll-drawn journey line** — `components/JourneyScroll.js`. The curved line snakes through
  Discover → Analyse → Prepare → Decide and draws itself as you scroll. Edit the stage/card text in the `stages` array.
- **Heading animations** — wrap any heading in `<SplitWords>` (`components/SplitWords.js`) for a word-by-word reveal.
- **Card reveal + hover lift/shadow** — `components/ScrollEffects.js` fades cards in on scroll; hover styles are in `globals.css`.
- Users with "reduce motion" turned on get the finished state with no animation.
- The login form currently sends users to `/dashboard` (demo). Connect it to your auth API in `components/LoginForm.js`.
