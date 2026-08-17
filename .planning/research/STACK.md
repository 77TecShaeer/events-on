# Stack Research

**Domain:** Premium bilingual (AR/EN, RTL) marketing website for an event production house
**Project:** EVENTS ON Website
**Researched:** 2026-08-17
**Confidence:** MEDIUM (official docs + npm registry cross-checked; GSD classify-confidence seam awards MEDIUM for verified websearch/webfetch. Context7 MCP was unavailable.)

**One-liner:** Next.js 16 App Router + next-intl (AR/EN + RTL) + Tailwind 4 logical CSS + GSAP/Lenis classy motion + Formspree + WhatsApp — no custom backend, no WebGL.

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| **Next.js** (App Router) | **16.3.1** | Framework, routing, SSG, images, fonts | Current stable (docs `version: 16.3.1`, npm `16.3.1`, 16.3 blog 2026-08-03). App Router is the create-next-app default. Five marketing pages prerender per locale via `generateStaticParams` — CDN-fast, no Node work per visit. `next/image` and `next/font` are the right tools for brand photography placeholders and Inter/Cairo. Do **not** use Pages Router or `output: 'export'`. | MEDIUM |
| **React** / **react-dom** | **19.2.8** | UI runtime (declared in `package.json`) | npm current. Next 16 App Router bundles a React canary that includes React 19.2 features; you still must declare `react` and `react-dom` for TypeScript, ESLint, and peers. | MEDIUM |
| **TypeScript** | **5.9.3** | Typed content modules + app code | Next.js 16 requires TypeScript ≥ 5.1. Pin the latest 5.x (`5.9.3`), not npm `latest` — that is now TypeScript **7.0.2** (native compiler, `latest` dist-tag as of 2026-08-17). TS 7 is too new for `eslint-config-next` / Next 16 tooling risk on a five-page marketing site. | MEDIUM |
| **next-intl** | **4.13.7** | AR/EN routing, messages, language toggle | npm current (updated 2026-08-17). Next-native: App Router, Server Components, static rendering, ICU messages. Peers include `next@^16` and React 19. Official RTL guidance: set `dir` on `<html>`, mirror layout with CSS logical properties, mirror directional icons. Use `defineRouting({ locales: ['en','ar'], defaultLocale: 'en', localePrefix: 'always' })` so `/en` and `/ar` are both first-class. Next 16.3+: read locale via `next/root-params` (legacy `setRequestLocale` still works but is documented as legacy). Middleware file is **`src/proxy.ts`** on Next 16 (was `middleware.ts`). | MEDIUM |
| **Tailwind CSS** | **4.3.3** | Styling + brand tokens | npm current. Official Next install is CSS-first: `@tailwindcss/postcss` + `@import "tailwindcss"`. Put brand colors (`#79C05E`, `#EB1A6C`, `#000000`, `#C4C2C3`, `#2B2B2B`) and font families in `@theme`. Logical utilities (`ms-*`/`me-*`, `ps-*`/`pe-*`, `text-start`, `border-s-*`, `rounded-s-*`) flip with `dir="rtl"` — no `tailwindcss-rtl` plugin. | MEDIUM |
| **GSAP** | **3.15.0** | Scroll reveals, hover, timelines | npm current (updated 2026-04-13). Industry standard for classy marketing motion. Core + ScrollTrigger + SplitText are **free** (Webflow made the full plugin set no-charge). Imperative timelines give luxury easing without WebGL. Use **`@gsap/react` 2.1.2** `useGSAP()` for scoped cleanup in App Router client components. Gate heavy motion with `gsap.matchMedia()`: desktop-only, honor `prefers-reduced-motion`. | MEDIUM |
| **Lenis** | **1.3.26** | Smooth scroll (desktop seasoning) | npm current (updated 2026-08-05). Wraps **native** scroll (sticky, anchors, a11y keep working). Official GSAP recipe: `autoRaf: false`, drive `lenis.raf` from `gsap.ticker`, `lagSmoothing(0)`, import `lenis/dist/lenis.css`. React adapter is **`lenis/react`** (`ReactLenis`) — not the retired `@studio-freight/react-lenis`. Default `respectReducedMotion: true`. Soften or disable on mobile so the phone experience stays native. | MEDIUM |
| **Formspree** + **`@formspree/react`** | **3.0.0** | Contact form backend | Official Next.js guide. `useForm(formId)` in a `"use client"` component; spam filtering + email + dashboard; no Server Actions, no Resend, no database. Vercel integration stores the id in `NEXT_PUBLIC_FORM`. Free tier is 50 submissions/month — enough for v1 inbound leads. | MEDIUM |
| **WhatsApp click-to-chat** | n/a (URL) | Secondary conversion | No library. `https://wa.me/<E164>?text=` with locale-specific prefill. Matches how MENA corporate buyers actually follow up. Keep the number in `NEXT_PUBLIC_WHATSAPP`. | MEDIUM |
| **Node.js** | **20.9+** (prefer current LTS 22 or 24) | Runtime / CI | Next.js 16 dropped Node 18; minimum is 20.9.0. | MEDIUM |

### Supporting Libraries

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| **`@gsap/react`** | **2.1.2** | `useGSAP` hook | Always, wherever GSAP runs in React. Replaces `useEffect` so ScrollTriggers revert on unmount / locale change. | MEDIUM |
| **`@tailwindcss/postcss`** | **4.3.3** | Tailwind 4 PostCSS plugin | Always (official Next + Tailwind 4 path). | MEDIUM |
| **`postcss`** | **8.5.26** | CSS pipeline | Always, as Tailwind's peer. | MEDIUM |
| **`next/font/google`** | built into Next 16 | Self-host **Inter** + **Cairo** | Always. `Inter({ subsets: ['latin'], variable: '--font-inter' })` and `Cairo({ subsets: ['arabic','latin'], variable: '--font-cairo' })`. Browser never calls Google. Apply Inter on `lang="en"`, Cairo on `lang="ar"`. Weights: Regular / Medium / Bold per brand book. | MEDIUM |
| **`next/image`** | built into Next 16 | Optimized placeholders → real photos | Always for photography and work thumbs. Stable filenames under `public/media/` so swaps are file replacements, not layout rewrites. | MEDIUM |
| **`clsx`** | **2.1.1** | Conditional class names | Language toggle, RTL icon flips, form states. Keep it; skip `class-variance-authority` unless a real variant system appears. | MEDIUM |
| **Brand SVG icons** (inline components) | n/a | Service + social icon language | Always for exhibitions, AV, WhatsApp, etc. Trace the brand book. Do **not** substitute Lucide for service icons. | MEDIUM |
| **`lucide-react`** | **1.31.0** (optional) | Generic UI chevrons only | Only if a non-brand glyph is needed (e.g. language-switch chevron). Prefer brand SVGs. | MEDIUM |
| **`zod`** | **4.4.3** (optional) | Extra client-side form schema | Only if Formspree + native `required`/`type="email"` feels thin. Formspree already returns field errors via `ValidationError`. | MEDIUM |
| **`@vercel/analytics`** | skip for v1 | Traffic | Add after launch if they want privacy-friendly analytics. Not required to convert leads. | MEDIUM |

### Infrastructure

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Vercel** | current | Hosting, CDN, Image Optimization | Native Next.js host. SSG pages at the edge. Official Formspree integration. No Docker, no custom Node server. | MEDIUM |
| **Git + Vercel Git integration** | n/a | Preview deploys | Every PR gets a URL for bilingual/RTL visual QA. | MEDIUM |
| **Env vars** | n/a | Secrets-without-a-backend | `NEXT_PUBLIC_FORM`, `NEXT_PUBLIC_WHATSAPP`. Never commit Formspree hash ids to public docs if they want to rotate; public prefix is required for the client hook. | MEDIUM |

### Development Tools

| Tool | Purpose | Notes | Confidence |
|------|---------|-------|------------|
| **`create-next-app@16.3.1`** | Scaffold | Defaults: TypeScript, ESLint, Tailwind, App Router, Turbopack, `@/*`. Enable **`src/`** so next-intl's `src/i18n/*` + `src/proxy.ts` match official docs. Leave **React Compiler off** until GSAP is proven — compilers plus imperative animation are a footgun. | MEDIUM |
| **`eslint-config-next`** | **16.3.1** | Same major as Next. Let create-next-app pin ESLint. | MEDIUM |
| **Turbopack** | Dev + build | Enabled by default in Next 16. Keep it. | MEDIUM |
| **Content modules** (`src/content/`) | Placeholder → real copy | Typed TS objects (work items, services, about) **plus** `messages/en.json` + `messages/ar.json` for chrome (nav, buttons, form labels). Swapping copy is a data edit. No CMS in v1 (explicitly out of scope). | MEDIUM |

### Intentionally absent (no database / no app backend)

v1 is a marketing site. There is no Postgres, no Auth, no CMS, no custom API except Formspree's hosted endpoint. WhatsApp is a link.

## Installation

```bash
# Scaffold (Node 20.9+)
npx create-next-app@16.3.1 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-npm

# Pin TypeScript to 5.x (do not float to TypeScript 7)
npm install -D typescript@5.9.3

# i18n + motion + form
npm install next-intl@4.13.7 gsap@3.15.0 @gsap/react@2.1.2 lenis@1.3.26 @formspree/react@3.0.0 clsx@2.1.1

# Tailwind 4 is already added by create-next-app; verify these land:
#   tailwindcss@4.3.3  @tailwindcss/postcss@4.3.3  postcss@8.x

# Runtime (create-next-app should already add these; verify)
npm install next@16.3.1 react@19.2.8 react-dom@19.2.8
```

**Scaffold layout next-intl expects:**

```
src/
  proxy.ts                 # next-intl middleware (Next 16 name)
  i18n/routing.ts          # locales: en, ar; localePrefix: 'always'
  i18n/navigation.ts       # Link, useRouter, usePathname wrappers
  i18n/request.ts          # getRequestConfig + next/root-params
  app/[locale]/layout.tsx  # <html lang dir>, fonts, generateStaticParams
  app/[locale]/page.tsx    # Home
  app/[locale]/about/
  app/[locale]/services/
  app/[locale]/work/
  app/[locale]/contact/
  content/en/              # typed page copy + work items
  content/ar/
  components/              # motion only in "use client" islands
messages/en.json
messages/ar.json
```

**Lenis + GSAP (required pattern):** one RAF loop. Official Lenis docs: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add((time) => lenis.raf(time * 1000))` + `gsap.ticker.lagSmoothing(0)`. React: `<ReactLenis root options={{ autoRaf: false }} />`.

**RTL on the document:**

```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

**WhatsApp:** `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(t('whatsappPrefill'))}`

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js 16 App Router | **Astro** | Tiny content site with almost no client JS. Weaker first-class App Router i18n/RTL story than next-intl; you'd rebuild language toggle, metadata, and image pipeline. Not worth it for AR/EN + motion islands. |
| Next.js | **Webflow / Framer** | Designer-led no-code. Fails brand-faithful custom motion, Cairo/Inter dual fonts under our control, and git-based placeholder swap. |
| next-intl 4 | **next-i18next / Intlayer** | next-i18next is Pages-Router-era. Intlayer markets static-rendering DX; next-intl 4.13 + `next/root-params` already SSGs locale routes on Next 16.3. Stay on next-intl — it's the ecosystem standard. |
| GSAP + Lenis | **Motion (`motion` / Framer Motion) 13.x** | Better for app UI (exit animations, layout). Weaker scroll choreography. Use GSAP for this site. Do not run both. |
| GSAP + Lenis | **GSAP ScrollSmoother** | Also smooth-scrolls. Pick **one** smoother. Lenis is lighter, native-scroll-based, and the creative-dev default alongside ScrollTrigger. |
| Lenis | **Locomotive Scroll / `@studio-freight/*`** | Retired lineage. Studio Freight → Darkroom; package is now `lenis`. |
| Tailwind 4 logical props | **`tailwindcss-rtl` / separate RTL stylesheet** | Obsolete for Tailwind 4. Logical utilities + `dir` are the 2026 path. |
| Formspree | **Resend + Server Action** | Use if they already want branded HTML email templates and will own spam, rate limits, and a submissions log. Violates "no custom backend" for v1. |
| Formspree | **Getform / Forminit / Web3Forms** | Getform rebranded to Forminit; React DX and Next.js docs are thinner than Formspree's official guide. |
| Formspree | **Netlify Forms** | Couples the form to Netlify hosting. |
| Vercel | **Cloudflare (OpenNext) / Netlify** | Fine later for cost/region. Extra adapter work. Start on Vercel. |
| Typed `src/content` + JSON messages | **Sanity / Contentful / MDX CMS** | Explicitly out of scope for v1. Revisit when real case studies and photography arrive. |
| `next/font` | **Google Fonts `<link>`** | Extra origin, layout shift, privacy. next/font self-hosts at build. |
| TypeScript 5.9.3 | **TypeScript 7.0.2** (`npm latest`) | Native TS 7 just became `latest`. Next 16 documents TypeScript 5+. Do not adopt 7 until `eslint-config-next` and Next 16 explicitly bless it. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Three.js / React Three Fiber / WebGL / Spline** | Out of scope and off-brand: "loud" spectacle, heavy JS, GPU tax on corporate laptops, months of 3D craft for a five-page brochure. | GSAP transform/opacity + Lenis |
| **Magnetic cursor, fullpage.js, scroll-jacking** | Fights the user; cheapens a production-house brand; breaks a11y and mobile. | Native scroll + Lenis lerp; hover on cards/buttons only |
| **Locomotive Scroll, `@studio-freight/react-lenis`, `@studio-freight/hamo`** | Deprecated package names. | `lenis` + `lenis/react` |
| **GSAP ScrollSmoother + Lenis together** | Two smoothers fight; jittery ScrollTrigger. | Lenis only |
| **Framer Motion / `motion` as the motion system** | Wrong tool for scroll-tied luxury; duplicate runtime if GSAP is present. | GSAP + `useGSAP` |
| **Pages Router** | Legacy; next-intl App Router + `proxy.ts` is the 2026 path. | App Router `app/[locale]` |
| **`output: 'export'`** | Drops Image Optimization and fights next-intl's proxy/middleware. "Static" for this site means SSG, not a zip of HTML. | Default Next + `generateStaticParams` |
| **Custom Express/Nest backend, Postgres, Auth** | No product surface needs it. | Formspree + `wa.me` |
| **Resend as the v1 form** | You inherit spam, storage, retries, and a Server Action. | Formspree |
| **CMS (Sanity, WordPress headless, Notion)** | v1 copy is placeholder; CMS adds auth and modelling before assets exist. | `messages/*.json` + `src/content/{locale}` |
| **shadcn/ui as the visual system** | Generic SaaS look vs locked 2026 brand book. | Tailwind `@theme` tokens + custom components |
| **Lucide/Heroicons for service icons** | Brand book defines the icon language. | Inline SVGs from the guidelines |
| **`ml-*` / `pl-*` / `text-left` / `left-*` as defaults** | Physical properties do not flip in Arabic. | `ms-*`, `ps-*`, `text-start`, `inline-s-*` |
| **TypeScript 7 (`typescript@latest`)** | Dist-tag jumped to 7.0.2; Next 16 is specified against TS 5.x. | `typescript@5.9.3` |
| **React Compiler (first pass)** | Can rewrite components GSAP measures by ref. | Enable later, after motion QA |
| **i18n via cookies only (no URL locale)** | Shareable/SEO URLs matter for a company site. | `/en/...` and `/ar/...` |

## Stack Patterns by Variant

**If desktop (lg+), `prefers-reduced-motion: no-preference`:**
- Enable Lenis + GSAP ScrollTrigger reveals and hover.
- Because PROJECT.md: desktop is the hero experience.

**If mobile or `prefers-reduced-motion: reduce`:**
- `gsap.matchMedia` kills/skips scroll timelines; Lenis already disables smoothing when `respectReducedMotion` is true.
- Keep layout, type, and WhatsApp/form fully usable.
- Because mobile must not copy every desktop beat, and WCAG expects reduced motion.

**If locale is `ar`:**
- `<html lang="ar" dir="rtl">`, Cairo, logical CSS, mirrored chevrons/arrows.
- GSAP `x` / `xPercent` must be direction-aware (positive X is right in screen space, not "forward in reading order"). Prefer `xPercent` with explicit RTL branches or animate `opacity`/`y` only for v1.

**If real photography/copy arrives:**
- Replace files in `public/media/` and strings in `src/content/{locale}` / `messages/*.json`.
- Do not retouch layout components.

**If Formspree spam or volume exceeds free tier:**
- Turn on Formspree CAPTCHA, or upgrade the plan.
- Only then consider Resend + a Route Handler.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `next@16.3.1` | `react@19.2.8`, `eslint-config-next@16.3.1` | App Router uses bundled React canary at runtime; declared React is the tooling contract. |
| `next@16.3.1` | `next-intl@4.13.7` | Peer: `next@^12 \|\| … \|\| ^16`. Use **`src/proxy.ts`** + `next/root-params` (16.3+). |
| `next@16.3.1` | `typescript@5.9.3` | Next 16 minimum TS 5.1. Avoid TS 7 until blessed. |
| `next@16.3.1` | Node **≥ 20.9.0** | Node 18 unsupported. |
| `gsap@3.15.0` | `@gsap/react@2.1.2` | Hook peer: `gsap ^3.12.5`, `react >= 17`. |
| `gsap@3.15.0` | `lenis@1.3.26` | Sync via ticker recipe; do not add ScrollSmoother. |
| `tailwindcss@4.3.3` | `@tailwindcss/postcss@4.3.3` | CSS-first `@theme`. No `tailwind.config.js` required. |
| `@formspree/react@3.0.0` | `react@^19` | Peer includes React 19. `"use client"` required. |
| `next-intl@4.13.7` | `generateStaticParams` | Return `{ locale: 'en' }` and `{ locale: 'ar' }` from `[locale]/layout.tsx` so both languages SSG. |

## Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Framework / React / Next versions | MEDIUM | npm `view` + nextjs.org docs 16.3.1 / blog 16.3 (2026-08-03). Seam: verified websearch = MEDIUM. |
| next-intl + RTL + proxy.ts | MEDIUM | npm 4.13.7 + next-intl.dev App Router + routing/setup (fetched). |
| GSAP + Lenis | MEDIUM | npm versions + official Lenis GSAP snippet + @gsap/react README. |
| Tailwind 4 + logical RTL | MEDIUM | npm 4.3.3 + official Next.js Tailwind install page. |
| Formspree | MEDIUM | Official formspree.io/guides/nextjs + npm `@formspree/react@3.0.0`. |
| TypeScript 7 avoidance | MEDIUM | `npm view typescript dist-tags` shows `latest: 7.0.2`; Next 16 blog still says TypeScript 5+. |
| Hosting (Vercel) | MEDIUM | Ecosystem default; not A/B tested for this repo. |

## Gaps to Address in Phase Research

- Exact Formspree plan/spam plugins once a real inbox is chosen.
- WhatsApp Business number format (Egypt/UAE country code) — product input, not a library choice.
- Whether `defaultLocale` should be `ar` (regional) vs `en` (corporate international). Stack works either way; **recommend `en` + `localePrefix: 'always'`** so neither language is hidden in the URL. Easy to flip.
- GSAP RTL `x` transforms: verify during UI phase; prefer vertical/opacity motion in v1 if horizontal slides fight `dir=rtl`.
- TypeScript 7 adoption later — re-check `eslint-config-next` peers before upgrading.

## Sources

- [Next.js 16.3 blog](https://nextjs.org/blog/next-16-3) — Instant Navigations; install `next@latest` (published 2026-08-03) — MEDIUM
- [Next.js docs](https://nextjs.org/docs) / [Installation](https://nextjs.org/docs/app/getting-started/installation) — version field **16.3.1** — MEDIUM
- [Next.js 16 upgrade](https://nextjs.org/docs/app/guides/upgrading/version-16) — React 19.2 canary, Node 20.9+, TypeScript 5.1+ — MEDIUM
- [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app) — TS / Tailwind / ESLint / App Router defaults — MEDIUM
- npm registry: `next@16.3.1`, `react@19.2.8`, `next-intl@4.13.7`, `gsap@3.15.0`, `@gsap/react@2.1.2`, `lenis@1.3.26`, `tailwindcss@4.3.3`, `@formspree/react@3.0.0`, `typescript` dist-tag `latest=7.0.2` / `5.9.3` latest 5.x — MEDIUM
- [next-intl App Router](https://next-intl.dev/docs/getting-started/app-router) — plugin + messages — MEDIUM
- [next-intl routing setup](https://next-intl.dev/docs/routing/setup) — `proxy.ts`, `next/root-params`, `generateStaticParams`, legacy `setRequestLocale` — MEDIUM
- [next-intl translations / RTL](https://next-intl.dev/docs/usage/translations) — `dir`, logical CSS, icon mirroring — MEDIUM
- [Tailwind + Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs) — v4 PostCSS install — MEDIUM
- [Lenis npm / GSAP recipe](https://www.npmjs.com/package/lenis) — 1.3.26, ticker sync — MEDIUM
- [GSAP npm](https://www.npmjs.com/package/gsap) — 3.15.0, free plugin set — MEDIUM
- [@gsap/react](https://www.npmjs.com/package/@gsap/react) — 2.1.2 `useGSAP` — MEDIUM
- [Formspree Next.js guide](https://formspree.io/guides/nextjs/) — `@formspree/react`, `NEXT_PUBLIC_FORM` — MEDIUM
- [next/font](https://nextjs.org/docs/app/api-reference/components/font) — Google fonts self-hosted — MEDIUM

---
*Stack research for: EVENTS ON bilingual marketing site*
*Researched: 2026-08-17*
*Do not commit from this agent — orchestrator commits after parallel researchers finish.*
