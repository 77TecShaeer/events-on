# Project Research Summary

**Project:** EVENTS ON Website
**Domain:** Premium bilingual (AR/EN, RTL) marketing site for an event production house
**Researched:** 2026-08-17
**Confidence:** MEDIUM

## Executive Summary

EVENTS ON is a five-page company brochure — Home, About, Services, Work, Contact — for a production house that sells exhibitions, conferences, and live events to corporate buyers. Experts in this vertical copy Extraordinary Productions' restraint and IA, copy GCC houses' WhatsApp habit, and almost never ship a real Arabic site. That bilingual gap is the product. v1 is not a CMS, portal, quote engine, or 3D spectacle. It is a brand-faithful, statically generated App Router tree whose conversion paths are a submit-able brief and a locale-prefilled `wa.me` link.

Build it as one Next.js 16 App Router app with next-intl, always-prefixed `/en` and `/ar`, Tailwind 4 logical CSS, Inter + Cairo via `next/font`, typed filesystem content, Formspree for the form, and GSAP as a last-layer seasoning on **native scroll**. Default locale is `en` with `localePrefix: 'always'` so neither language is hidden; middleware still sends `Accept-Language: ar` visitors to `/ar`. Do not install Lenis until a Motion-phase spike proves sticky headers, hash links, reduced-motion, RTL, and iOS Safari still work — the default is native scroll + GSAP ScrollTrigger. Do not add Resend or a custom Server Action email path; PROJECT.md forbids a backend beyond what the form needs to submit.

The launch-killing risks are all process, not novelty: shipping English then "adding RTL," cookie-only language, scroll-jacking sold as classy, fake Work case studies, and a form that either dies in spam or never delivers. Tokens + `lang`/`dir` + logical CSS come first. Five pages in both locales with a swap-ready content map come second. Conversion third. Motion last, gated by `prefers-reduced-motion` and desktop-only luxury. Native Arabic review and a live Formspree + WhatsApp test are launch gates, not polish.

## Resolved Conflicts

These three disagreements across STACK / ARCHITECTURE / PITFALLS / PROJECT.md are **locked** for roadmap creation. Do not re-litigate as TBD.

| Conflict | Decision | Why |
|----------|----------|-----|
| **Motion / Lenis** | **Native scroll + GSAP 3.15 + `@gsap/react` + ScrollTrigger.** Lenis is **not** in the v1 default stack. Optional spike in Phase 4 only; ship Lenis iff sticky header, `#` anchors, `prefers-reduced-motion`, RTL, and iOS Safari all pass. Otherwise keep native scroll. | STACK wanted GSAP+Lenis for "classy" seasoning. ARCHITECTURE and PITFALLS (and PROJECT.md) forbid scroll-jacking: Lenis/Locomotive break sticky, hash links, find-in-page, and reduced-motion. Native scroll is the safe premium default. GSAP stays (not Framer Motion) — STACK is the stack lock; ARCHITECTURE's Motion/`framer-motion` example is superseded. v1 tweens: `opacity` + `y` only; no physical `x` slides. |
| **Forms** | **Formspree + `@formspree/react` 3.0** in a `"use client"` island. No Resend, no custom Server Action email, no Postgres. | STACK and PROJECT.md: marketing site, no custom backend. ARCHITECTURE preferred Resend + Zod + Server Action for locale-aware validation — that inherits spam, SPF/DKIM, rate limits, and a submissions log. Formspree already filters spam and emails the studio. Locale success/error copy still lives in `messages/{locale}.json`. Enable Formspree CAPTCHA if spam appears; do not build Turnstile+Resend in v1. |
| **Default locale** | **`defaultLocale: 'en'`** with **`localePrefix: 'always'`** (`/en/…` and `/ar/…` both first-class). `x-default` = `en`. | GCC buyers may prefer Arabic, but corporate procurement and Googlebot often arrive without `ar` Accept-Language. Always-prefix means Arabic is never a hidden cookie language. Middleware still negotiates `Accept-Language` / cookie on bare `/` so Arabic-preferring visitors land on `/ar`. Flipping `defaultLocale` later is a one-line routing change, not an architecture fork. Do **not** geo-force Egypt → Arabic. |

## Key Findings

### Recommended Stack

See [STACK.md](STACK.md). Pin Next 16 App Router (not Pages Router, not `output: 'export'`). SSG both locales via `generateStaticParams`. next-intl middleware file is **`src/proxy.ts`** on Next 16. Pin TypeScript **5.9.3** — npm `latest` is TypeScript 7 and is too new for `eslint-config-next`. Leave React Compiler off until GSAP is proven.

**Core technologies:**
- **Next.js 16.3.1 + React 19.2.8:** App Router, SSG, `next/image`, `next/font` — five marketing pages prerender per locale
- **TypeScript 5.9.3:** typed content modules; do not float to TS 7
- **next-intl 4.13.7:** AR/EN routing, messages, stay-on-page toggle; `locales: ['en','ar']`, `defaultLocale: 'en'`, `localePrefix: 'always'`
- **Tailwind CSS 4.3.3:** CSS-first `@theme` brand tokens; logical utilities (`ms-*`/`pe-*`/`text-start`) — no `tailwindcss-rtl`
- **GSAP 3.15.0 + `@gsap/react` 2.1.2:** desktop scroll reveals and hover; `useGSAP()` for cleanup on unmount/locale change; `gsap.matchMedia()` for reduced-motion and mobile
- **Formspree + `@formspree/react` 3.0.0:** hosted submit path; `NEXT_PUBLIC_FORM`
- **WhatsApp `wa.me`:** digits-only E.164 in `NEXT_PUBLIC_WHATSAPP`; locale-prefilled `text=`
- **Vercel:** native Next host, Image Optimization, preview deploys for bilingual QA
- **Node 20.9+** (prefer current LTS 22 or 24)

**Intentionally absent:** Lenis (unless Phase 4 spike passes), Framer Motion, WebGL/Three.js, CMS, Auth, Postgres, Resend, shadcn/ui, Lucide for service icons, TypeScript 7, React Compiler on first pass.

### Expected Features

See [FEATURES.md](FEATURES.md). Corporate buyers scan identity → services → proof → inquire. GCC competitors add WhatsApp and a quote form and skip a real Arabic experience. EVENTS ON should occupy that gap: first-class AR/EN + RTL + content parity, dual conversion (brief form + WhatsApp), classy motion as seasoning.

**Must have (table stakes):**
- Five-page IA (Home, About, Services, Work, Contact) + persistent header/footer — not a one-pager
- Brand-faithful visual system (2026 book: green `#79C05E`, pink `#EB1A6C`, Inter + Cairo, bar-E wordmark, brand service icons)
- Language toggle with native labels **العربية** / **English**, stay-on-page, persist locale, URL-prefixed
- First-class RTL (`lang` + `dir` on `<html>`, logical CSS, Cairo on `ar`)
- Content parity in both locales (professional placeholders, never Google Translate)
- Services page with brand icon language; Work grid of 6–8 swap-ready cards; About (studio + short process)
- Submit-able contact form (name, company, email, phone, event type, message) + locale success/error
- WhatsApp click-to-chat with locale prefill (header/footer/Contact; quiet mobile FAB)
- Homepage as trailer: hero → services teaser → featured work → proof-strip slot → dual CTA
- Mobile fully usable without cloning every desktop motion beat; image-performance basics

**Should have (competitive):**
- Dual conversion path (form **and** WhatsApp — neither optional)
- Qualifying brief field: event type (+ approximate timeline)
- Classy desktop motion with `prefers-reduced-motion` off-ramp
- Visible process (Discover → Design → Produce) on About/Services
- Placeholder content that still sells; proof-strip / testimonial **slots** (no fake names or logos)
- Locale-aware WhatsApp prefill; "what happens after you inquire" once ops agrees an SLA

**Defer (v2+):**
- CMS, blog, exhibition calendar, SEO service-page farm
- Client portal, booking, payments, instant quote, live inventory
- Real case-study pages, video showreels, careers, native app
- WebGL / magnetic cursor / scroll-jacked cinematic hero

### Architecture Approach

See [ARCHITECTURE.md](ARCHITECTURE.md). This is **one** statically generated tree whose outermost segment is `[locale]`. Direction, type, copy, and metadata are functions of that segment. Motion, forms, and WhatsApp sit on a layout that already works with JavaScript disabled. Cookie-only locale is an anti-pattern. Pages compose sections; they never own hex, copy, or `dir`.

**Correction vs ARCHITECTURE.md:** conversion is Formspree (client hook), not `sendContact` + Resend. Motion is GSAP islands, not `MotionConfig` / Framer Motion. Lenis is out unless the Phase 4 spike passes. The rest of the architecture (locale shell, tokens, messages vs content, chrome, section primitives) stands.

**Major components:**
1. **Locale shell** (`src/proxy.ts` + `app/[locale]/layout.tsx`) — prefix routes, `html lang`/`dir`, fonts, `generateStaticParams` for `{en, ar}`
2. **Design tokens** (`styles/tokens.css` + Tailwind `@theme`) — brand book as CSS variables; components never hardcode hex
3. **Messages vs content** — `messages/{locale}.json` for chrome/form/CTAs; `content/{locale}/*.ts` for page bodies, services, work cards, image slots
4. **Chrome** — header, footer, language toggle (`Link` with locale override, keep pathname), skip link
5. **Page templates** — five Server Component routes composing sections
6. **Conversion** — Formspree contact island + `WhatsAppLink` (`wa.me` + encoded locale prefill)
7. **Motion layer** — optional client wrappers; site must look finished with this folder empty

### Critical Pitfalls

See [PITFALLS.md](PITFALLS.md). Top risks for this project:

1. **RTL as a CSS flip of a finished English site** — set `lang`+`dir` on `<html>` from day one; logical CSS only; lint-ban `margin-left` / `text-align: left`; test with real Arabic that contains "EVENTS ON" and phone numbers.
2. **Cookie- or JS-only language toggle** — locale lives in the path; toggle navigates to the sibling URL; reciprocal `hreflang` + `x-default`.
3. **Scroll-jacking sold as classy** — native scroll default; never `overflow-x: hidden` on `html`/`body`; Lenis only after a passing spike; no magnetic cursor / WebGL.
4. **Motion that ignores `prefers-reduced-motion` (and hover-only luxury)** — `gsap.matchMedia` reduce branch; captions visible on touch; do not copy every desktop beat to mobile.
5. **Placeholder content that looks like a fake agency** — labeled sample slots, no invented clients/logos/lorem; native Arabic review before client; content map so photography swaps without CSS edits.
6. **Form that drowns in spam or never delivers / broken `wa.me`** — Formspree (not `mailto:`); UTF-8; digits-only WhatsApp URL + `encodeURIComponent`; live AR+EN submit and three-device tap test before launch.

## Implications for Roadmap

Granularity is **COARSE (4 phases)**. Tokens and i18n are load-bearing. Page composition on a broken direction model is a rewrite. Motion on an unfinished layout becomes the product (out of scope). Conversion ships as soon as Contact exists — it does not wait for motion.

### Phase 1: Bilingual Foundation
**Rationale:** Every later layout inherits `lang`/`dir`, logical CSS, fonts, and chrome. English-first then "add RTL" is the highest-cost pitfall. Brand tokens must exist before any page invents a second palette.
**Delivers:** Next.js 16 App Router scaffold (`src/`), next-intl routing (`en`/`ar`, always prefix, default `en`), `src/proxy.ts`, locale layout with `html lang`/`dir`, Inter + Cairo via `next/font` (locale-gated), Tailwind 4 `@theme` tokens from the 2026 brand book, official SVG wordmark + service/social icons, header/footer/skip/language toggle working in both locales (toggle keeps current path). Blank shells at `/en` and `/ar` with correct direction and type.
**Addresses:** Brand visual system; AR/EN toggle + URL locale; first-class RTL shell; persistent nav chrome (structure)
**Avoids:** RTL-as-afterthought; cookie-only locale; brand-book violations (stretch/recolor logo, mixed Inter+Cairo stack, both fonts on every page); Pages-Router `i18n` config; physical CSS
**Uses:** Next 16.3.1, next-intl 4.13.7, Tailwind 4.3.3, `next/font`, TypeScript 5.9.3

### Phase 2: Five-Page Templates and Content Contract
**Rationale:** Homepage teasers need real destinations. The five routes **are** the product. Content schema must exist before copy is inlined in JSX, or placeholder swap becomes a rebuild. Motion is forbidden until both locales look finished with JS off.
**Delivers:** Typed `content/` modules + `messages/` chrome for all five pages in **both** locales; Home (hero, services teaser, featured work, proof-strip slot, dual CTA); About (studio + process); Services (brand icons + short copy); Work (6–8 labeled sample cards, CSS grid not carousel); Contact layout (form UI + WhatsApp slot, not yet live submit); responsive layouts; `generateMetadata` with reciprocal `hreflang` + `x-default: en`; hover-independent captions on Work/Services.
**Addresses:** Five-page IA; homepage preview; services; work grid; about; content parity; placeholder content that still sells; proof-strip slots; dual CTA placement; mobile-responsive layout
**Avoids:** Copy inside components; EN-only pages then "translate"; hover-only luxury; carousel RTL bugs; lorem / fake case studies; invented logos
**Implements:** Page templates, sections, content map (`getContent(locale, page)`)

### Phase 3: Conversion
**Rationale:** Success metric is a lead. A pretty Contact page that does not submit fails the product. WhatsApp is how this market follows up; the form is how procurement leaves a brief. Neither waits on motion.
**Delivers:** Formspree-backed form (name, company, email, phone, event type, message) with locale success/error; `dir="ltr"` on email/tel; `dir="auto"` on free text; WhatsApp `wa.me` from one config number with encoded locale prefill; header/footer/Contact CTAs; quiet mobile FAB (not a bouncing desktop bubble); footer phone/email/social.
**Addresses:** Submit-able contact form; qualifying event-type field; WhatsApp click-to-chat + locale prefill; dual conversion path; footer contact/social
**Avoids:** `mailto:`; custom Resend backend; broken `wa.me` (`+`, spaces, unencoded Arabic); English-only WhatsApp badge restyle; form-only Contact with no WhatsApp
**Uses:** `@formspree/react`, `NEXT_PUBLIC_FORM`, `NEXT_PUBLIC_WHATSAPP`

### Phase 4: Motion and Launch Readiness
**Rationale:** Motion is seasoning on a stable bilingual layout. Launch QA is the same phase because sticky, reduced-motion, RTL transforms, form delivery, and brand-book diffs only become true after motion exists — and the site must ship without Lenis if the spike fails.
**Delivers:** GSAP ScrollTrigger + hover on **desktop** only (`gsap.matchMedia`); `opacity`/`y` reveals; reduced-motion path (no parallax, no scrub, Lenis off); mobile calm; optional Lenis spike with kill criteria (sticky, hash, reduced-motion, RTL, iOS). Launch gates: native AR copy review, live Formspree AR+EN submit, three-device WhatsApp tap, `hreflang` fetch, brand-book visual QA, lint-clean physical CSS, OS Reduce Motion on/off.
**Addresses:** Classy desktop motion; reduced-motion; mobile-without-cloned-beats; image performance; launch checklist
**Avoids:** Scroll-jacking; Lenis-by-default; GSAP `x` fighting RTL; ScrollTrigger before `document.fonts.ready`; magnetic cursor / WebGL; motion as layout engine
**Uses:** `gsap`, `@gsap/react`; Lenis **only if spike passes**

### Phase Ordering Rationale

- **Tokens + i18n before pages:** physical CSS and cookie locale cannot be patched later without a layout rewrite.
- **Both locales in the same phase as templates:** Arabic as a follow-on pass is how bilingual sites get rewritten.
- **Content contract with pages, not after:** swap-ready placeholders are an architecture feature, not a copy pass.
- **Conversion before motion:** the success metric does not depend on scroll reveals; Contact can convert the day it exists.
- **Motion last:** PROJECT.md — classy, not loud; PITFALLS — trigger positions lie on unfinished layout.
- **Launch QA bundled with motion:** coarse granularity; a fifth "QA-only" phase is too thin for a five-page site.

### Research Flags

Phases likely needing deeper research during planning (`/gsd-plan-phase --research-phase`):
- **Phase 4 (Motion):** Lenis vs native scroll spike protocol (sticky, RTL, reduced-motion, iOS). Standard GSAP fade/`y` + `matchMedia` does **not** need a new research pass. Confirm GSAP RTL `x` avoidance (prefer `y`/opacity).
- **Phase 3 (Conversion):** Formspree plan, inbox, CAPTCHA plugins, and the real WhatsApp Business number (E.164, Egypt/UAE). Spam model is known; the vendor account is not.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** next-intl App Router + Tailwind 4 logical CSS + `next/font` are well-documented. Confirm `proxy.ts` + `next/root-params` against Next 16.3 at plan time — that is a version check, not domain research.
- **Phase 2 (Templates + content):** Server Component page composition + typed TS modules is a standard agency-site pattern. Native AR copy is a people/process gate, not a research-phase.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Official Next 16.3 / next-intl / Tailwind 4 / GSAP / Formspree / npm pins. Context7 unavailable; classify-confidence rates verified websearch as MEDIUM. |
| Features | MEDIUM | Competitor IA + Showit/Cvent guidance converge on five pages + WhatsApp + form. No EVENTS ON buyer interviews. WhatsApp ROI stats are GCC ads, not exhibition RFPs. |
| Architecture | MEDIUM | Official Next/next-intl/W3C/MDN patterns. Form and motion examples in ARCHITECTURE.md were overridden here (Formspree, GSAP, no Lenis). |
| Pitfalls | MEDIUM | W3C/WCAG/GSAP/WhatsApp/Google/Cloudflare primary sources, cross-checked. No public post-mortem of a GCC event-agency site launch. |

**Overall confidence:** MEDIUM

### Gaps to Address

- **WhatsApp Business number and Formspree inbox:** product inputs, not library choices — collect before Phase 3 execution.
- **Native Arabic marketing copy:** cannot be automated; budget a speaker review before client/launch (Phase 2 draft, Phase 4 gate).
- **Real photography / logo permissions:** v1 must use labeled samples; do not invent clients. Swap is a content edit after releases exist.
- **Formspree free-tier (50/month) + spam plugins:** confirm once the real inbox is chosen; CAPTCHA on if abused.
- **`defaultLocale` business preference:** research recommends `en` + always-prefix. If stakeholders insist `ar` as default, keep always-prefix and only change `defaultLocale` / `x-default` — do not drop prefixes.
- **TypeScript 7:** re-check `eslint-config-next` peers before any upgrade; stay on 5.9.3 for v1.
- **Lenis:** not decided "never" — decided "not default." Phase 4 spike is the only reopen.

## Sources

### Primary (HIGH confidence)

Official docs were fetched; the project's classify-confidence seam still rates webfetch as LOW / websearch-verified as MEDIUM. Treat the following as primary anyway — they are vendor/spec sources, cross-checked across the four research files.

- [Next.js 16.3 blog](https://nextjs.org/blog/next-16-3) / [docs](https://nextjs.org/docs) / [App Router i18n](https://nextjs.org/docs/app/guides/internationalization) — framework, `[locale]`, `generateStaticParams`
- [next-intl App Router](https://next-intl.dev/docs/getting-started/app-router) / [routing setup](https://next-intl.dev/docs/routing/setup) / [configuration](https://next-intl.dev/docs/routing/configuration) — `proxy.ts`, `localePrefix: 'always'`, `next/root-params`
- [W3C: `dir` on `html`, lang ≠ direction, logical properties](https://www.w3.org/International/questions/qa-html-dir.en.html)
- [WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) / [C39 `prefers-reduced-motion`](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html)
- [GSAP `matchMedia()`](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
- [WhatsApp Click to Chat](https://faq.whatsapp.com/5913398998672934) — `wa.me/<digits>` format
- [Google Search Central: localized versions / `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Formspree Next.js guide](https://formspree.io/guides/nextjs/)
- [Tailwind + Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- EVENTS ON 2026 Brand Guidelines (project PDF) — tokens, type, logo rules, icon language
- npm registry pins (2026-08-17): `next@16.3.1`, `next-intl@4.13.7`, `gsap@3.15.0`, `tailwindcss@4.3.3`, `@formspree/react@3.0.0`, `typescript@5.9.3` (`latest` = 7.0.2)

### Secondary (MEDIUM confidence)

- [Showit event-pro templates](https://showit.com/website-tips/showits-top-event-professional-website-templates/) (2026-03-04) — five-page IA, homepage as preview, multi-CTA
- [Socialtables / Cvent portfolios](https://www.socialtables.com/blog/event-planning/digital-portfolio/)
- Competitors: [Extraordinary Productions](https://extraordinaryproductions.com/), [Spectrum UAE](https://spectrum-uae.com/), [Al Safa](https://alsafaadv.com/), [Beyond DXB](https://beyond-dxb.com/), [Arvento Edge](https://arventoevents.com/)
- [AivenSoft bilingual AR/EN](https://aivensoft.com/en/blog/bilingual-website-arabic-english) — native labels, no flags, stay-on-page, content parity
- [Shipping a bilingual Next.js app EN/AR](https://dev.to/ahmed_mahmoud360/shipping-a-bilingual-nextjs-app-in-english-and-arabic-routing-rtl-and-what-crawlers-actually-see-517i)
- Lenis + overflow/sticky breakage reports (community); used to **reject** Lenis-as-default

### Tertiary (LOW confidence)

- GCC WhatsApp ad ROI (Bowaba, Campaign ME) — directional that WhatsApp is a parallel path, not exhibition-RFP evidence
- Single-page fetches of competitor sites (Arabic toggle may be JS-hidden)
- ARCHITECTURE.md Framer Motion examples — superseded by GSAP decision
- No public post-mortem of a GCC event-agency site launch

---
*Research completed: 2026-08-17*
*Ready for roadmap: yes*
