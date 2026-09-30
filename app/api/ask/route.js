import { NextResponse } from "next/server";
import { company as defaultCompany, sampleTenders } from "@/lib/data";

/**
 * POST /api/ask
 * Body: { question: string, company?: object }
 * Returns: { summary, points[], tenders[], next, source }
 *
 * If ANTHROPIC_API_KEY is set, the question is answered by Claude using the
 * company context and the tender list. Otherwise a built-in demo engine
 * answers, so the site works out of the box.
 */
export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch {}
  const question = String(body.question || "").slice(0, 2000);
  const company = body.company || defaultCompany;

  if (!question.trim()) {
    return NextResponse.json({ summary: "Please type a question." }, { status: 400 });
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return NextResponse.json(await askClaude(question, company));
    } catch (e) {
      console.error("AI call failed, falling back to demo:", e);
    }
  }
  return NextResponse.json(demoAnswer(question, company));
}

async function askClaude(question, company) {
  const system = `You are Tender Agent, an AI assistant that helps a company find and analyse government and corporate tenders.
Company profile: ${JSON.stringify(company)}
Available tenders: ${JSON.stringify(sampleTenders)}
Reply ONLY with JSON: {"summary": string, "points": string[], "tenderIds": string[], "next": string}.
Keep "points" to at most 5 short bullets. "tenderIds" lists relevant tender ids from the list, best first.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
      max_tokens: 1024,
      system,
      messages: [{ role: "user", content: question }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const text = data.content?.map((c) => c.text || "").join("") || "{}";
  const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
  const tenders = (json.tenderIds || [])
    .map((id) => sampleTenders.find((t) => t.id === id))
    .filter(Boolean);
  return { summary: json.summary, points: json.points || [], tenders, next: json.next, source: "ai" };
}

function demoAnswer(question, company) {
  const q = question.toLowerCase();
  const byMatch = [...sampleTenders].sort((a, b) => b.match - a.match);

  if (/(missing|document|certificate|paper)/.test(q)) {
    return {
      source: "demo",
      summary: `Your profile has ${company.documents} document uploaded. Most tenders in your sectors ask for more before a bid is considered complete.`,
      points: [
        "GST registration and PAN card copy",
        "EPF and ESIC registration certificates",
        "Audited turnover / balance sheets for the last 3 years",
        "Work orders and performance certificates for similar work",
        "ISO certificates (often required for facility management)",
      ],
      tenders: [],
      next: "Upload these under Documents so eligibility checks become more accurate.",
    };
  }

  if (/(eligib|qualify|criteria)/.test(q)) {
    const list = byMatch.filter((t) => t.sector === "Facility Management");
    return {
      source: "demo",
      summary: `As a ${company.businessType} company working in ${company.sectors.join(", ")}, you likely meet the basic entity criteria. Turnover and past-experience thresholds still need your financial figures to confirm.`,
      points: [
        "Entity type: meets requirement",
        "Sector experience: matches Facility Management",
        "Turnover threshold: add turnover to profile to verify",
        "Similar-work experience: upload work orders to verify",
      ],
      tenders: list,
      next: "Add your last 3 years' turnover in Company Profile.",
    };
  }

  if (/(closing|deadline|week|soon|urgent)/.test(q)) {
    const soon = [...sampleTenders].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 3);
    return {
      source: "demo",
      summary: "These tenders close soonest. Start with the earliest deadline.",
      points: [],
      tenders: soon,
      next: "Shortlist one or two and begin the document checklist today.",
    };
  }

  const sectorHit = company.sectors.find((s) => q.includes(s.toLowerCase().split(" ")[0]));
  const tenders = sectorHit ? byMatch.filter((t) => t.sector === sectorHit) : byMatch.slice(0, 4);
  return {
    source: "demo",
    summary: `Based on your company context (${company.businessType}, ${company.documents} document, active in ${company.states.join(" & ")}), these tenders fit best:`,
    points: [
      "Ranked by sector fit, location and estimated eligibility",
      "Tenders in your operating states score higher",
      "Scores improve as you upload more documents",
    ],
    tenders,
    next: "Open the top match and check its eligibility criteria against your documents.",
  };
}
