# OverxaTech — Product Requirements Document

## Original Problem Statement
Build a world-class AI Growth Agency website that looks better than 99% of agency websites on the internet — premium Silicon Valley startup meets luxury design agency. Brand: **OverxaTech**. Tagline: **Where Human Creativity Meets AI Automation.**

## User Decisions (locked)
- Brand name: **OverxaTech** (single brand)
- Theme: **Dark-only** (no light mode toggle)
- Palette: bg `#050816`, card `#101827`, primary `#6C63FF`, secondary `#00E5FF`, accent `#8B5CF6`, text white, subtext `#A8B2D1`
- Content: **placeholder** case studies + testimonials
- Contact form: **MongoDB storage + optional Resend email** (Resend disabled — user skipped API key)
- "Book Strategy Call" CTA: opens **in-app modal** (no external Calendly)
- Contact details (real): email `info.overxatech@gmail.com`, phone `+91 96645 88762`, address `Grand Square 201, nr. Taj Hotel, Sindhubhavan Road, Ahmedabad, Gujarat, India`

## User Personas
- **Founder / CEO of a scaling business** looking for a senior AI + growth partner
- **Marketing lead** vetting agencies for paid media + funnels
- **Investor / recruiter** doing quick brand due diligence

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Lenis + Shadcn/UI + react-countup + react-fast-marquee
- **Backend**: FastAPI + Motor (MongoDB) + optional Resend
- **Routing**: `/` (single-page Home with anchors), `/contact`
- **Design**: Cabinet Grotesk + Manrope + JetBrains Mono; glassmorphism; glowing gradient buttons; animated blobs; custom cursor; page loader; scroll progress bar; smooth scroll (Lenis)

## Implemented (2025-12 — v1.0)
- ✅ Site infrastructure: Custom cursor, page loader, Lenis smooth scroll, scroll progress, gradient scrollbar
- ✅ Navigation: sticky glass navbar with mobile menu + persistent Book Call CTA
- ✅ Hero: animated headline, gradient text, live-preview AI dashboard mock, floating chips, parallax
- ✅ Trusted-by marquee (10 placeholder logos)
- ✅ Services grid (11 services with icons, bento-style featured card)
- ✅ Why Choose Us (4 columns with gradient numerals)
- ✅ Process timeline (5 steps with scroll-linked animated gradient line)
- ✅ Case Studies (3 cards with Problem/Solution/Result + animated SVG charts)
- ✅ Testimonials carousel (auto-advance + manual controls + dot nav)
- ✅ About (Mission, Vision, 4 Core Values in bento grid)
- ✅ Stats (4 CountUp counters with intersection-observer trigger)
- ✅ FAQ accordion (6 questions, Shadcn Accordion)
- ✅ Final CTA with double-blob gradient panel
- ✅ Footer with giant brand text + social icons
- ✅ Contact page (split layout, 7-field form) with real contact details
- ✅ Book Call modal (compact form) opened from every CTA
- ✅ Backend: POST `/api/contact` + GET `/api/contacts` + GET `/api/health`
- ✅ Testing agent full pass: 6/6 backend, 8/8 frontend

## Backlog

### P0 (Ready to ship next)
- Add Resend API key + notification email once user provides them (backend already conditional)

### P1 (Value uplift)
- Real client logos + real case studies (currently premium placeholders)
- Admin route `/admin/leads` (basic auth) to view submitted contacts
- SEO metadata (OG image, sitemap, robots.txt)
- Analytics (GA4 / PostHog)
- Contact form: honeypot + rate-limit for spam protection

### P2 (Nice-to-have)
- Blog / insights section
- Framer-style page transitions
- Lottie hero animation replacing the CSS dashboard mock
- Case study detail pages

## Test Credentials
N/A — no auth yet.
