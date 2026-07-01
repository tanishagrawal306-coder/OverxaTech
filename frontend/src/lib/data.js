import {
  Bot, MessageSquare, Mic, Filter, CalendarClock,
  Target, LineChart, LayoutDashboard, Rocket, Search,
  BarChart3,
} from "lucide-react";

export const SERVICES = [
  { icon: Bot, title: "AI Automation", copy: "Custom AI workflows that eliminate manual work across your business." },
  { icon: MessageSquare, title: "Chatbots", copy: "24/7 GPT-powered assistants trained on your brand and products." },
  { icon: Mic, title: "AI Voice Agents", copy: "Human-sounding voice agents that qualify leads and book meetings." },
  { icon: Filter, title: "Lead Generation", copy: "Predictable, high-intent pipeline built with paid, organic and AI outreach." },
  { icon: CalendarClock, title: "Appointment Automation", copy: "Booking engines that fill your calendar while you sleep." },
  { icon: Target, title: "Meta Ads", copy: "Full-funnel Facebook & Instagram campaigns tuned for pipeline, not vanity." },
  { icon: LineChart, title: "Google Ads", copy: "Search, PMax and YouTube — bid strategies driven by ROAS not clicks." },
  { icon: LayoutDashboard, title: "Website Design", copy: "High-conversion sites engineered like software, designed like Apple." },
  { icon: Rocket, title: "Landing Pages", copy: "Purpose-built pages that turn ad spend into booked calls." },
  { icon: Search, title: "SEO", copy: "Programmatic SEO + editorial content that compounds into inbound." },
  { icon: BarChart3, title: "Analytics Dashboard", copy: "One live dashboard for spend, pipeline, cost per lead and revenue." },
];

export const WHY_CHOOSE = [
  { label: "01", title: "Faster Growth", copy: "Ship in weeks, not quarters. Ruthless prioritisation, weekly compounding." },
  { label: "02", title: "AI Powered", copy: "Every deliverable is built on top of the latest generative and agentic AI." },
  { label: "03", title: "Transparent Process", copy: "Shared dashboards, weekly syncs, real numbers. No smoke, no jargon." },
  { label: "04", title: "ROI Focused", copy: "We measure success in revenue and pipeline — the vanity we skip." },
];

export const PROCESS = [
  { step: "01", title: "Discovery", copy: "Deep-dive workshop to map goals, offer, ICP and unfair advantages." },
  { step: "02", title: "Strategy", copy: "Growth model, channel mix and AI automation architecture." },
  { step: "03", title: "Build", copy: "Design, engineering and AI deployed by senior operators — no juniors." },
  { step: "04", title: "Launch", copy: "Go live with instrumentation from day zero and a 30-day ramp plan." },
  { step: "05", title: "Optimize", copy: "Weekly experiments, cohort learnings and compounding improvements." },
];

export const CASE_STUDIES = [
  {
    tag: "B2B SaaS",
    title: "3.2× pipeline in 90 days for a Series-A SaaS",
    problem: "Flat MQL volume and a 6-month sales cycle stalling growth.",
    solution: "Full outbound + Google Ads rebuild + AI SDR handling first-touch qualification.",
    result: [
      { k: "Pipeline", v: "+320%" },
      { k: "CPL", v: "-46%" },
      { k: "SQLs / mo", v: "184" },
    ],
    image: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg",
    chart: [12, 18, 22, 30, 42, 55, 68, 82, 96, 118, 140, 168],
  },
  {
    tag: "DTC / E-commerce",
    title: "From 1.4 ROAS to 4.7 for a fast-growing DTC brand",
    problem: "Meta ads plateaued after iOS changes; creative fatigue killing efficiency.",
    solution: "AI-generated UGC pipeline, server-side tracking, funnel + LP overhaul.",
    result: [
      { k: "ROAS", v: "1.4 → 4.7" },
      { k: "Blended CAC", v: "-38%" },
      { k: "Revenue", v: "+212%" },
    ],
    image: "https://images.pexels.com/photos/36950598/pexels-photo-36950598.jpeg",
    chart: [8, 9, 11, 10, 14, 22, 28, 34, 40, 46, 52, 63],
  },
  {
    tag: "Professional Services",
    title: "Booked-out calendar for a boutique consultancy",
    problem: "Founder-led sales capped growth at ~8 discovery calls per week.",
    solution: "AI voice agent + inbound funnel + automated LinkedIn nurture.",
    result: [
      { k: "Calls / wk", v: "8 → 41" },
      { k: "Close rate", v: "+22%" },
      { k: "Time saved", v: "18h/wk" },
    ],
    image: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg",
    chart: [5, 6, 7, 9, 12, 15, 18, 22, 26, 31, 36, 41],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "OverxaTech operates like an in-house product team, not an agency. Six weeks in, our pipeline doubled and I stopped worrying about lead flow.",
    name: "Ava Reinhardt",
    role: "CEO, NorthFold Labs",
    image: "https://images.pexels.com/photos/4797690/pexels-photo-4797690.jpeg",
  },
  {
    quote:
      "The AI systems they built pay for the retainer 10× over. I've never worked with a team this senior across paid, product and AI.",
    name: "Marcus Vale",
    role: "Founder, Latch & Loom",
    image: "https://images.pexels.com/photos/14585727/pexels-photo-14585727.jpeg",
  },
  {
    quote:
      "Their process is genuinely transparent — I see every dollar, every experiment, every lead. That trust changed how we grow.",
    name: "Priya Ananth",
    role: "CMO, Meridian Health",
    image: "https://images.pexels.com/photos/4797690/pexels-photo-4797690.jpeg",
  },
  {
    quote:
      "Best decision we made last year. Their AI voice agent alone books more meetings than two SDRs.",
    name: "Daniel Osei",
    role: "COO, Fielder Logistics",
    image: "https://images.pexels.com/photos/14585727/pexels-photo-14585727.jpeg",
  },
];

export const STATS = [
  { end: 100, suffix: "+", label: "Projects Shipped" },
  { end: 40, suffix: "+", label: "Happy Clients" },
  { end: 300, suffix: "%", label: "Average ROI" },
  { end: 95, suffix: "%", label: "Client Retention" },
];

export const FAQS = [
  {
    q: "What industries do you work with?",
    a: "We specialise in B2B SaaS, professional services, DTC and health / wellness — but the underlying playbook works anywhere with a real offer and a real customer.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most engagements go live within 3–4 weeks. Meaningful pipeline lift typically shows in weeks 4–8; compounding gains follow from there.",
  },
  {
    q: "How much does it cost?",
    a: "Engagements start around $6,000/mo for focused sprints and scale up for full growth partnerships. Every proposal is scoped to the outcome, not hours.",
  },
  {
    q: "Can AI really automate my business?",
    a: "Not everything — but 60–80% of repeatable ops (qualification, follow-up, reporting, onboarding, support) is automatable today with the right architecture.",
  },
  {
    q: "Do you manage Meta and Google Ads end-to-end?",
    a: "Yes. Creative, tracking, bidding, landing pages, reporting — one team, one dashboard, one line of accountability.",
  },
  {
    q: "Do you build websites too?",
    a: "We do. Marketing sites, product pages, landing funnels — designed like Apple, engineered like software.",
  },
];

export const CORE_VALUES = [
  { title: "Innovation", copy: "We prototype weekly and ship what wins." },
  { title: "Transparency", copy: "Real dashboards, real numbers, real conversations." },
  { title: "Results", copy: "If it doesn't move revenue, it doesn't ship." },
  { title: "Long-Term Partnerships", copy: "Retainer clients stay an average of 22 months." },
];

export const CLIENT_LOGOS = [
  "NORTHFOLD", "LATCH & LOOM", "MERIDIAN", "FIELDER", "AXIOM CO.",
  "PARALLAX", "ORBIT LABS", "HELIO", "KAIROS", "VANTA HEALTH",
];
