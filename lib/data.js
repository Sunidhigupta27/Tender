// Company context shown on the dashboard.
// Replace these values with data from your backend / database.
export const company = {
  name: "Your Company",
  businessType: "Public Limited",
  documents: 1,
  sectors: ["Facility Management", "Manpower Supply", "Security Services"],
  states: ["Odisha", "Tamil Nadu"],
  turnover: "Add in profile",
  uploadedDocs: [{ name: "Company_Profile.pdf", size: "1.2 MB", uploaded: "Today" }],
};

// Sample tenders used by the demo analysis engine.
// These are illustrative placeholders, not live tenders.
export const sampleTenders = [
  {
    id: "T-1021",
    title: "Comprehensive Facility Management Services — University Campus",
    authority: "State University (sample)",
    location: "Odisha",
    value: "₹2.4 Cr",
    deadline: "15 Oct 2026",
    sector: "Facility Management",
    match: 92,
    risk: "Low",
  },
  {
    id: "T-1034",
    title: "Supply of Manpower for Sanitation Work, Wards 1–12",
    authority: "Municipal Body (sample)",
    location: "Odisha",
    value: "₹85 L",
    deadline: "09 Oct 2026",
    sector: "Manpower Supply",
    match: 88,
    risk: "Low",
  },
  {
    id: "T-1047",
    title: "Private Security Agency for Mining Site",
    authority: "PSU Mining Division (sample)",
    location: "Odisha",
    value: "₹1.1 Cr",
    deadline: "21 Oct 2026",
    sector: "Security Services",
    match: 84,
    risk: "Medium",
  },
  {
    id: "T-1052",
    title: "Housekeeping & Maintenance for 40 Branch Offices",
    authority: "Public Sector Bank (sample)",
    location: "Tamil Nadu",
    value: "₹1.6 Cr",
    deadline: "30 Oct 2026",
    sector: "Facility Management",
    match: 79,
    risk: "Medium",
  },
  {
    id: "T-1066",
    title: "Deployment of Technical Personnel on Outsourcing Basis",
    authority: "Judicial Institution (sample)",
    location: "Odisha",
    value: "₹3.2 Cr",
    deadline: "12 Nov 2026",
    sector: "Manpower Supply",
    match: 71,
    risk: "High",
  },
];

// KPI counters shown at the top of the demo dashboard — illustrative only.
export const kpis = [
  { label: "Total Tenders", value: 0, tone: "blue", icon: "▦" },
  { label: "New Tenders", value: 0, tone: "green", icon: "✓" },
  { label: "Closing Soon", value: 0, tone: "orange", icon: "◷" },
  { label: "High-Value", value: 0, tone: "purple", icon: "₹" },
  { label: "High-Risk", value: 0, tone: "red", icon: "!" },
];

export const agentQuickActions = [
  "Analyze Eligibility",
  "Find Risks",
  "Summarize",
  "List Documents",
  "Compare Tenders",
  "Calculate Bid Cost",
];

export const exampleQuestions = [
  "Which tenders are best for my company?",
  "Am I eligible for facility management tenders above ₹1 Cr?",
  "Which documents am I missing for bidding?",
  "Show tenders closing in the next 2 weeks",
];
