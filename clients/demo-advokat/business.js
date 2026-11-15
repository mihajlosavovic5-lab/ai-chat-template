// DEMO (English): fictional law office. No real person, firm or number.
// The assistant gives NO legal advice.
export default {
  name: "Justice Plus Law Office",
  assistantName: "Justice Plus Law Office Assistant",
  tone: "friendly, polite and professional, no legal advice",

  languages: ["English", "Spanish", "French", "German", "Italian", "Portuguese"],

  about:
    "Fictional law office for a demo, based in a fictional city. It handles family law, real estate, contracts, employment law and litigation. The assistant gives NO legal advice, opinions on specific cases or assessments of chances in court; that requires a case review by a lawyer at a consultation.",

  hours: "Monday-Friday 09:00-17:00, closed on weekends. Consultations by appointment only.",
  address: "1 Example Street, Demo City",
  phone: "+1 555 000 0001",
  email: "office@justiceplus.example",

  services: [
    { name: "First consultation (case assessment)", price: "30 EUR (30 min)" },
    { name: "Family law (divorce, custody, child support)", price: "from 350 EUR, depends on complexity" },
    { name: "Real estate (purchase, document checks, contracts)", price: "from 200 EUR" },
    { name: "Contract drafting and review", price: "from 80 EUR" },
    { name: "Employment law (dismissals, contracts, compensation)", price: "from 170 EUR" },
    { name: "Representation in litigation", price: "by agreement, after a consultation" },
  ],

  faq: [
    {
      q: "How do I book a consultation?",
      a: "Call +1 555 000 0001 or email office@justiceplus.example. Consultations last 30 minutes and cost 30 EUR.",
    },
    {
      q: "What should I bring to the consultation?",
      a: "All documents related to your case (contracts, decisions, correspondence) and an ID card.",
    },
    {
      q: "Is the first consultation confidential?",
      a: "Yes, everything you share at the consultation is covered by attorney-client privilege. Please do not share personal data or case details in the chat.",
    },
  ],

  booking:
    "Book a consultation by calling +1 555 000 0001 or emailing office@justiceplus.example.",

  fallback:
    "If a question asks for legal advice or an assessment of a specific case, say that only a lawyer can do that at a consultation and offer to arrange one. Ask the user not to share personal data or case details in the chat. Never invent prices, deadlines or outcomes.",

  allowedOrigins: ["*"],
  greeting:
    "Hello! I'm the Justice Plus Law Office assistant. Ask me about practice areas, prices or booking a consultation.",
  accentColor: "#1f3a5f",
};
