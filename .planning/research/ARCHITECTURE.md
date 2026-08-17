# Architecture Research

**Domain:** Premium bilingual (AR/EN) marketing website for an event production house
**Researched:** 2026-08-17
**Confidence:** MEDIUM

Seam note: `classify-confidence` rates `websearch --verified` as MEDIUM and `webfetch` as LOW even for official docs. Routing, RTL, metadata, motion-accessibility, and WhatsApp URL claims below were taken from official Next.js (docs v16.3.1, last updated 2026-06-10), next-intl, W3C, MDN, Motion, and WhatsApp Help Center pages and cross-checked against independent implementation guides. Treat version pins as a STACK.md concern; this file owns structure and build order.

## Standard Architecture

Bilingual marketing sites in this stack are **not two sites**. They are one statically generated App Router tree whose outermost segment is `[locale]`. Direction, type, copy, and metadata are all functions of that segment. Motion, forms, and WhatsApp sit on top of a layout that already works with JavaScript disabled.

Use **prefix-based URLs** (`/en/...` and `/ar/...`) as the single source of truth for language. Cookie- or `localStorage`-only toggles hide the Arabic (or English) tree from crawlers. Next.js App Router has no `next.config.js` `i18n` block — that is Pages Router only. Locale lives in the route.

**Opinionated defaults for EVENTS ON:**

- `localePrefix: 'always'` so `/en` and `/ar` are symmetric, bookmarkable, and crawlable.
- `html lang` and `html dir` set together in the locale layout. They are independent (W3C): `lang="ar"` does **not** turn on RTL.
- CSS logical properties only. No `[dir="rtl"] { margin-left: ... }` override sheets.
- Design tokens and i18n before any page composition. Motion last.
- Typed filesystem content (JSON/TS), not a CMS. v1 is five pages with placeholder copy.

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  REQUEST  /en/services  |  /ar/services  |  /  → locale redirect │
│  proxy/middleware (next-intl): cookie → Accept-Language → default│
└───────────────────────────────┬─────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                     LOCALE SHELL  app/[locale]                  │
│  html lang={locale} dir={rtl|ltr}                               │
│  fonts: Inter (en) / Cairo (ar) via next/font                   │
│  NextIntlClientProvider  |  MotionConfig reducedMotion="user"   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐ │
│  │ Header/Nav  │  │ Language    │  │ Footer + WhatsApp CTA    │ │
│  │ (chrome)    │  │ toggle      │  │ (chrome)                 │ │
│  └─────────────┘  └─────────────┘  └──────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     PAGE TEMPLATES (Server Components)          │
│  Home | About | Services | Work | Contact                       │
│  compose sections; never own hex, copy, or dir                  │
├─────────────────────────────────────────────────────────────────┤
│                     SECTION / UI PRIMITIVES                     │
│  Hero, ServiceGrid, WorkCard, ContactForm, WhatsAppLink, ...    │
│  consume tokens + content props; optional MotionReveal wrapper   │
├─────────────────────────────────────────────────────────────────┤
│  TOKENS          CONTENT              I18N                      │
│  CSS variables   content/{locale}/*   messages/{locale}.json    │
│  brand book      typed page bodies    chrome, form, nav         │
├─────────────────────────────────────────────────────────────────┤
│  CONVERSION (server)          MOTION (client, optional)         │
│  sendContact Server Action    thin wrappers / template.tsx      │
│  Resend → studio inbox        never required for layout         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Locale routing | Map `/en/*` and `/ar/*`; redirect bare paths; persist preference cookie **after** URL is set | `next-intl` `defineRouting` + `createMiddleware` in `proxy.ts` (Next.js 16) or `middleware.ts` (15) |
| Locale layout | Set `lang` + `dir` once; load fonts; wrap providers; `generateStaticParams` for both locales | `app/[locale]/layout.tsx` — Server Component |
| Design tokens | Brand-book colors, type, space, radii as CSS custom properties. Components never hardcode `#79C05E` | `styles/tokens.css` mapped into Tailwind theme. Skip Style Dictionary for a five-page site |
| Message catalogs | Chrome strings: nav, buttons, form labels, errors, WhatsApp prefill | `messages/en.json` + `messages/ar.json` via next-intl |
| Content modules | Page bodies, services list, work cards, image slots. Swappable without touching layout | `content/en/*.ts` + `content/ar/*.ts` with a shared TypeScript schema |
| Chrome | Header, footer, language toggle, persistent WhatsApp CTA | Locale-aware `Link` from `createNavigation`; toggle labels in the **target** language (`English` / `العربية`), never flags |
| Page templates | Compose sections for one route. No copy, no tokens, no motion library imports | `app/[locale]/{page}/page.tsx` |
| Sections | Layout of one block (hero, grid, form). Accept typed content props | `components/sections/*` |
| Motion layer | Hover and scroll seasoning on desktop. Disabled or opacity-only when `prefers-reduced-motion` | Client wrappers; `MotionConfig reducedMotion="user"`; `template.tsx` only if page transitions are needed |
| Contact form | Validate + deliver a lead | Server Action + Zod + Resend. UI stays a Server Component wrapping a small client form |
| WhatsApp link | Open click-to-chat with locale-specific prefill | Official `https://wa.me/<digits>?text=...` — no widget, no iframe |
| Metadata | Localized title/description + reciprocal `hreflang` | `generateMetadata` `alternates.languages` including `x-default` |

## Recommended Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # lang, dir, fonts, providers, generateStaticParams
│   │   ├── template.tsx        # optional: remounting motion host (not layout)
│   │   ├── page.tsx            # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── work/page.tsx
│   │   └── contact/page.tsx
│   └── not-found.tsx
├── i18n/
│   ├── routing.ts              # locales, defaultLocale, localePrefix: 'always'
│   ├── request.ts              # getRequestConfig + messages
│   ├── navigation.ts           # Link, useRouter, usePathname, getPathname
│   └── dir.ts                  # locale → 'rtl' | 'ltr'  (single source of truth)
├── messages/
│   ├── en.json                 # chrome + form + CTAs
│   └── ar.json
├── content/
│   ├── types.ts                # PageContent, Service, WorkItem, MediaSlot
│   ├── index.ts                # getContent(locale, page)
│   ├── en/{home,about,services,work,contact}.ts
│   └── ar/{home,about,services,work,contact}.ts
├── styles/
│   ├── tokens.css              # primitive → semantic CSS variables from brand book
│   └── globals.css             # reset, logical-property defaults, font assignment
├── components/
│   ├── chrome/                 # Header, Footer, LanguageToggle, SkipLink
│   ├── sections/               # Hero, ServiceGrid, WorkGrid, StudioStory, ContactPanel
│   ├── ui/                     # Button, Card, Input — token consumers
│   ├── conversion/             # ContactForm, WhatsAppLink
│   └── motion/                 # FadeIn, HoverLift — client-only, optional
├── lib/
│   ├── actions/contact.ts      # Server Action (outside locale tree)
│   └── whatsapp.ts             # buildWaLink(locale, messageKey)
└── proxy.ts                    # next-intl middleware (name: proxy.ts on Next 16)
```

### Structure Rationale

- **`app/[locale]/`:** Every user-facing route has a locale. API/Server Actions stay **outside** this segment so the middleware matcher can skip them (`/api`, `/_next`, dotted files).
- **`i18n/`:** Routing config is the contract for middleware, `Link`, and metadata URL builders. Do not duplicate locale lists.
- **`messages/` vs `content/`:** Chrome strings go through next-intl (ICU, typed keys). Structured page bodies (service cards, work items, image alts) are typed modules so a producer can replace a paragraph or photo without touching JSON key trees. Both are filesystem, both are locale-keyed.
- **`styles/tokens.css`:** Brand book becomes code **before** components exist. Primitive hex values are private; components use semantic names (`--color-brand-green`, `--font-latin`, `--space-4`).
- **`components/motion/`:** Isolated so pages and sections remain Server Components. If this folder is empty, the site must still look finished.
- **`lib/actions/`:** Conversion has no locale in the path. It receives locale as a hidden form field or from the calling page so error copy can be localized.

## Architectural Patterns

### Pattern 1: Locale in the URL, direction on `<html>`

**What:** `app/[locale]` is the root segment. The locale layout awaits `params`, validates with `hasLocale`, and sets both attributes. A tiny `dirFor(locale)` helper is the only place that maps `ar → rtl`.
**When to use:** Always for a crawlable bilingual marketing site.
**Trade-offs:** One extra path segment; middleware must redirect `/` and `/services`. Cookie-only is simpler and wrong for SEO.

**Example:**

```tsx
// src/i18n/dir.ts
export const dirFor = (locale: string): 'rtl' | 'ltr' =>
  locale === 'ar' ? 'rtl' : 'ltr';

// src/app/[locale]/layout.tsx
import {hasLocale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {dirFor} from '@/i18n/dir';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale); // legacy static-render hint if not on next/root-params yet

  return (
    <html lang={locale} dir={dirFor(locale)}>
      <body>{children}</body>
    </html>
  );
}
```

Language toggle uses next-intl `Link` with `locale` override so the **same pathname** is kept (`/en/work` → `/ar/work`). Do not send the user home.

### Pattern 2: Logical CSS + token cascade (RTL for free)

**What:** Write spacing, alignment, and insets in flow-relative terms. Set `dir` once; the browser mirrors. Tailwind: `ms-*` / `me-*` / `ps-*` / `pe-*` / `text-start` / `start-0`, never `ml-*` / `text-left`.
**When to use:** Every layout rule. Physical properties only for things that must **not** flip (logo, phone number row marked `dir="ltr"`).
**Trade-offs:** Team must unlearn `left`/`right`. The alternative — a second RTL stylesheet — is how bilingual sites get rewritten.

**Example:**

```css
/* styles/tokens.css — primitives from the 2026 brand book, then semantics */
:root {
  --color-green-500: #79c05e;
  --color-pink-500: #eb1a6c;
  --color-black: #000000;
  --color-gray-400: #c4c2c3;
  --color-gray-800: #2b2b2b;

  --color-bg: #ffffff;
  --color-fg: var(--color-black);
  --color-accent: var(--color-green-500);
  --color-accent-hot: var(--color-pink-500);

  --font-latin: var(--font-inter), system-ui, sans-serif;
  --font-arabic: var(--font-cairo), sans-serif;
}

html[lang='en'] { font-family: var(--font-latin); }
html[lang='ar'] { font-family: var(--font-arabic); }

.hero {
  padding-inline: var(--space-6);
  margin-inline-start: auto;
  text-align: start;
  border-inline-start: 4px solid var(--color-accent);
}
```

Arabic type: extra `line-height`, **never** `letter-spacing` tightening (it breaks connected glyphs). Apply tracking only under `[lang='en']`.

### Pattern 3: Pages compose; content and tokens are injected

**What:** A page is a composition of sections. Copy and media come from `getContent(locale, 'services')`. Chrome copy comes from `getTranslations`. Hex never appears in JSX.
**When to use:** All five routes. This is what makes placeholder → real assets a content edit, not a rebuild.
**Trade-offs:** One extra hop versus hardcoding. Pays off the first time photography arrives.

**Example:**

```tsx
// app/[locale]/services/page.tsx
import {getTranslations} from 'next-intl/server';
import {getContent} from '@/content';
import {ServiceGrid} from '@/components/sections/ServiceGrid';

export default async function ServicesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations('Services');
  const data = await getContent(locale, 'services');

  return (
    <main>
      <h1>{t('title')}</h1>
      <ServiceGrid items={data.items} />
    </main>
  );
}
```

### Pattern 4: Motion as a layer, not a foundation

**What:** Layout is complete in HTML/CSS. Motion is a client wrapper around already-positioned nodes. Prefer CSS `:hover` / `@media (prefers-reduced-motion: no-preference)` for chrome. Use Motion (`framer-motion`) for scroll reveals on **desktop only**. Wrap the tree in `MotionConfig reducedMotion="user"` so transforms disable automatically.
**When to use:** After pages look correct in both locales at all breakpoints with JS disabled.
**Trade-offs:** Slightly more files. Avoids CLS, scroll-jacking, and RTL `x` / `xPercent` bugs (GSAP ScrollTrigger and physical `x` animations assume LTR).

**Example:**

```tsx
// components/motion/FadeIn.tsx
'use client';
import {motion, useReducedMotion} from 'framer-motion';

export function FadeIn({children}: {children: React.ReactNode}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : {opacity: 0, y: 12}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-10%'}}
      transition={{duration: reduce ? 0 : 0.45, ease: 'easeOut'}}
    >
      {children}
    </motion.div>
  );
}
```

Do **not** animate `x` for directional slides unless the value is derived from `dir` (or use `inset-inline` / CSS). `y` and `opacity` are writing-mode safe. No Lenis, no Locomotive, no scroll-jacked `overflow: hidden` on `body`.

### Pattern 5: Dual conversion path (form + WhatsApp)

**What:** Contact page (and chrome) offer both a Server Action form and a `wa.me` link. Form captures a brief for the inbox; WhatsApp matches how this market follows up. Prefill text is a message key, not hardcoded English.
**When to use:** v1 conversion. No CMS, no CRM required.
**Trade-offs:** Server Action needs an email provider (Resend) and a verified from-domain. Formspree is the no-backend fallback, not the default — keeping the action in-repo keeps locale-aware validation.

**Example:**

```ts
// lib/whatsapp.ts — official click-to-chat; digits only, no + / dashes
export function waLink(e164Digits: string, prefill: string) {
  return `https://wa.me/${e164Digits}?text=${encodeURIComponent(prefill)}`;
}
```

Form textareas: `dir="auto"` so a Latin name inside an Arabic page does not scramble. Do not use Meta's official English-only "Chat on WhatsApp" badge if chrome is bilingual — use the brand-book WhatsApp icon + localized label.

## Data Flow

### Request Flow (locale)

```
Visitor hits /services
    ↓
proxy/middleware: no locale prefix
    ↓
Negotiate: NEXT_LOCALE cookie → Accept-Language → defaultLocale
    ↓
302 → /en/services  or  /ar/services
    ↓
app/[locale]/layout.tsx
    → validate locale
    → <html lang dir>
    → load messages + fonts
    ↓
page.tsx  →  getTranslations()  +  getContent(locale)
    ↓
HTML (static). Client hydrates chrome + motion only
```

After the redirect, **the URL is the source of truth**. The cookie remembers the next visit; it must not override a shared `/ar/work` link.

### Locale + content flow

```
params.locale
    ├─► dirFor(locale)           → html[dir]
    ├─► font assignment          → html[lang]
    ├─► getTranslations()        → chrome, form labels, metadata
    ├─► getContent(locale, page) → sections
    ├─► generateMetadata()       → title, description, alternates.languages
    └─► LanguageToggle           → Link href={pathname} locale={other}
```

`getPathname({ locale, href })` from next-intl is what metadata and the toggle use so hreflang URLs stay in lockstep with actual routes.

### Contact form flow

```
User submits <form action={sendContact}>
    ↓
Server Action (lib/actions/contact.ts)
    → honeypot / time-trap
    → Zod parse (locale-aware error keys)
    → Resend.emails.send(studio inbox)
    ↓
return { ok: true } | { ok: false, fieldErrors }
    ↓
useActionState on the client island
    → success copy from messages[locale]
    → WhatsApp remains available as the parallel path (no server)
```

WhatsApp does not enter this pipeline. It is a GET to `wa.me` built from `content` (phone digits) + `messages` (prefill). Track the click as an analytics event on-site; do not stuff UTMs into `wa.me` (they are unreliable there).

### State Management

This site does **not** need a global client store.

```
URL [locale]     →  language, dir, fonts, catalogs
Filesystem       →  page content (build-time import)
Server Action    →  form pending/error/success (useActionState)
CSS :hover       →  desktop chrome
Motion wrappers  →  local, optional, no shared store
```

### Key Data Flows

1. **Locale negotiation:** Bare path → middleware redirect → prefixed URL. Toggle swaps locale, keeps pathname.
2. **Content swap:** Same section component, different `content/{locale}` module. Images are slots (`src`, `alt[locale]`, `aspectRatio`) so photography can drop in later.
3. **Lead capture:** Form POST/Server Action to email; WhatsApp is an outbound link with localized prefill.

## Suggested Build Order

Dependencies are one-way. Do not skip ahead.

```
1. Tokens + fonts
      ↓
2. i18n routing + html lang/dir + logical CSS
      ↓
3. Chrome (header, footer, toggle) in BOTH locales
      ↓
4. Content schema + placeholder modules
      ↓
5. Page templates (five routes, responsive, no motion)
      ↓
6. Conversion (form Server Action + WhatsApp)
      ↓
7. Motion layer (desktop hover/scroll, reduced-motion)
```

| Step | Build | Depends on | Done when | Avoids |
|------|-------|------------|-----------|--------|
| 1 | Brand tokens, Inter + Cairo via `next/font`, semantic CSS variables | Brand book | A tokenized button and type specimen look on-brand in both scripts | Inventing a second palette; putting hex in components |
| 2 | `routing.ts`, middleware, `[locale]` layout, `dirFor`, logical-property Tailwind | Step 1 | `/en` and `/ar` render a blank shell with correct `lang`/`dir` and mirrored padding | English-first physical CSS; cookie-only locale |
| 3 | Header, footer, skip link, language toggle using `i18n/navigation` `Link` | Step 2 | Toggle keeps the current page; nav order mirrors in RTL; no flags | `next/link` without locale prefix; sending toggle to `/` |
| 4 | `content/types.ts` + EN/AR placeholder copy and image slots | Step 2 | Types reject a missing `alt.ar`; copy is professional placeholder, not lorem | Hardcoding strings in JSX |
| 5 | Home, About, Services, Work, Contact as Server Component templates | Steps 3–4 | All five URLs work at all breakpoints with JS off; `generateMetadata` emits reciprocal hreflang + `x-default` | Motion, carousels, or GSAP before layout is solid |
| 6 | `sendContact` + Zod + Resend; `WhatsAppLink` with `wa.me` | Step 5 | A lead arrives in email; WhatsApp opens with AR or EN prefill; `dir="auto"` on free text | Third-party chat widgets; CAPTCHA before a honeypot |
| 7 | `components/motion/*`, optional `template.tsx`, `MotionConfig` | Step 5–6 | Desktop hover/scroll feels expensive; mobile is calm; reduced-motion users get opacity/none | Lenis, magnetic cursor, scroll-jacking, physical `x` slides |

**Phase ordering rationale for the roadmap:** Tokens and i18n are load-bearing. Page composition on a broken direction model is a rewrite. Motion on an unfinished layout becomes the product (out of scope). Conversion can ship as soon as Contact exists; it should not wait for motion.

**Research flags:**

- Form spam/email deliverability: phase-specific (Turnstile vs honeypot, Resend domain). Standard pattern, confirm at plan time.
- Exact Next.js 15 vs 16 file name (`middleware.ts` vs `proxy.ts`) and `setRequestLocale` vs `next/root-params`: confirm against locked stack version.
- Default locale / `x-default` (EN vs AR): business choice, not an architecture fork.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–1k visits (v1) | Fully static `generateStaticParams` for `{en, ar} × 5 pages`. Server Action only on POST. No CMS, no CDN app layer beyond the host. |
| 1k–100k | Same architecture. Add a sitemap with both locales, cache-control on assets, and rate-limit the Server Action. Swap content files for a headless CMS **only** if non-dev editors become the bottleneck — keep the same `PageContent` types as the adapter boundary. |
| 100k+ | Still a marketing site. Split media to a CDN. Do not split into micro-frontends. If a client portal appears later, it is a different app, not a fold in this tree. |

### Scaling Priorities

1. **First bottleneck:** Unoptimized hero media and webfonts — not Node. Use `next/image`, subset Cairo/Inter, `font-display: swap`.
2. **Second bottleneck:** Form spam / Resend rate limits. Honeypot + time-trap first; Turnstile if abused. Keep WhatsApp as the resilient path.

## Anti-Patterns

### Anti-Pattern 1: Cookie- or client-only language toggle

**What people do:** One URL, `localStorage` locale, client swap of strings.
**Why it's wrong:** Crawlers index one language. Shared links ignore the visitor's language. `lang`/`dir` flash on hydrate.
**Do this instead:** Prefixed routes; toggle is a `Link` to the other locale's same pathname.

### Anti-Pattern 2: English layout, then "add RTL"

**What people do:** Ship LTR with `margin-left` / `left: 0`, then a dump of `[dir="rtl"]` overrides.
**Why it's wrong:** Every new section needs a second CSS pass. Flex order, icons, and absolute positioning leak forever.
**Do this instead:** `dir` on `<html>` from day one; logical properties; build chrome in both locales before inner pages.

### Anti-Pattern 3: Motion as the layout engine

**What people do:** Lenis/Locomotive `overflow: hidden` on `html`, GSAP pinning as page structure, magnetic cursors.
**Why it's wrong:** Breaks native scroll, mobile, RTL `x` animations, reduced-motion, and accessibility. Conflicts with "classy, not loud."
**Do this instead:** CSS layout first. Motion wrappers last. No scroll-jacking.

### Anti-Pattern 4: Copy inside components

**What people do:** `<h1>Keep your event ON!</h1>` in the hero file; Arabic as an afterthought string.
**Why it's wrong:** Placeholder replacement becomes a code hunt. Missing keys fail at runtime in one locale only.
**Do this instead:** `messages/` for chrome; `content/{locale}` for bodies; TypeScript so a missing AR field is a build error.

### Anti-Pattern 5: Inferring `dir` from `lang` (or from `navigator.language`)

**What people do:** `html lang="ar"` without `dir`, or `dir` from the OS locale.
**Why it's wrong:** W3C: language does not set direction. OS locale is not the page locale. Forms typed in the "other" script then break.
**Do this instead:** Explicit `dirFor(locale)` on `<html>`. `dir="auto"` only on user-typed fields.

### Anti-Pattern 6: Physical `x` / carousel libraries unaware of `dir`

**What people do:** `animate={{ x: -40 }}`, "next" chevrons, drag carousels that always advance left.
**Why it's wrong:** In RTL the motion fights reading direction.
**Do this instead:** Prefer `y` + opacity. Mirror chevrons with `scaleX(-1)` under `[dir="rtl"]`. If a carousel is needed later, use a library that reads `dir` — or skip it in v1 (Work can be a grid).

### Anti-Pattern 7: Next.js Pages-Router `i18n` config in App Router

**What people do:** `next.config.js { i18n: { locales: ['en','ar'] } }`.
**Why it's wrong:** App Router ignores it. Official docs: `[locale]` segment + middleware/proxy.
**Do this instead:** next-intl `defineRouting` + `app/[locale]`.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Resend (or equivalent) | Server Action calls `resend.emails.send` with server env `RESEND_API_KEY` | Verify sending domain before launch. Locale goes in the email subject/body, not the API path |
| WhatsApp click-to-chat | GET `https://wa.me/<E.164 digits>?text=<urlencoded>` | Official Help Center: no `+`, dashes, or leading zeros. Prefill from `messages`. No third-party widget |
| Hosting (static + one serverless fn) | Static pages + Server Action on POST | Matcher must exclude `/api` and the action's internal path from locale redirects |
| Analytics (optional) | Client event on form success and WhatsApp click | Do not block v1 architecture on this |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Tokens ↔ UI | CSS variables / Tailwind theme | One-way. Components never write tokens |
| i18n routing ↔ chrome/pages | `Link` / `getPathname` from `i18n/navigation.ts` | Never import `next/link` for internal routes |
| Messages ↔ chrome/form | `useTranslations` / `getTranslations` | Chrome only |
| Content ↔ sections | Typed props from `getContent` | Pages fetch; sections stay dumb |
| Pages ↔ motion | Optional wrapper | Page must render identically without it |
| Form UI ↔ Server Action | `action={sendContact}` + `useActionState` | Action lives in `lib/`, not under `[locale]` |
| WhatsApp ↔ content/messages | Pure function `waLink` | No server. Phone digits in content; prefill in messages |

## Sources

Official / primary (fetched; seam rates webfetch LOW):

- [Next.js App Router internationalization](https://nextjs.org/docs/app/guides/internationalization) — docs v16.3.1, last updated 2026-06-10. `[lang]` segment, middleware/proxy redirect, dictionaries on the server, `generateStaticParams`, `next/root-params`. Lists next-intl as a resource.
- [next-intl App Router getting started](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl locale-based routing setup](https://next-intl.dev/docs/routing/setup) — `defineRouting`, middleware/`proxy.ts`, `generateStaticParams`, `setRequestLocale` (legacy)
- [next-intl routing configuration](https://next-intl.dev/docs/routing/configuration) — `localePrefix: 'always' | 'as-needed' | 'never'`
- [next-intl navigation APIs](https://next-intl.dev/docs/routing/navigation) — locale-aware `Link`, toggle via `locale` prop, `getPathname`
- [Next.js `generateMetadata` `alternates`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — emits `hreflang` from `alternates.languages`
- [W3C: Structural markup and right-to-left text in HTML](https://www.w3.org/International/questions/qa-html-dir.en.html) — `dir` on `html`; `lang` ≠ direction; logical start/end
- [MDN: CSS logical properties and values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- [Motion for React: accessibility / reduced motion](https://motion.dev/docs/react-accessibility)
- [WhatsApp Help Center: Click to chat](https://faq.whatsapp.com/5913398998672934) — `wa.me/<number>` format; official button is English-only

Independent corroboration (websearch, MEDIUM when cross-checked):

- [Shipping a bilingual Next.js app in English and Arabic](https://dev.to/ahmed_mahmoud360/shipping-a-bilingual-nextjs-app-in-english-and-arabic-routing-rtl-and-what-crawlers-actually-see-517i) — URL-as-truth, logical properties, reciprocal hreflang
- [BahrTech: bilingual Next.js, RTL, Cairo typography](https://bahrtech.net/en/blog/bilingual-nextjs-rtl-arabic) — no `letter-spacing` on Arabic; `dir` from a typed locale map
- [SimpleLocalize RTL design guide](https://simplelocalize.io/blog/posts/rtl-design-guide-developers/)
- [i18n-l10n.com: RTL & bidirectional layout engineering](https://www.i18n-l10n.com/core-i18n-architecture-locale-negotiation/rtl-bidirectional-layout-engineering/) — set `dir` once; do not thread `isRTL` through every component
- Motion + App Router `template.tsx` vs `layout.tsx` practice: [Nayan Kyada](https://nayankyada.com/blog/how-i-use-framer-motion-with-nextjs-app-router-without-layout-shift), [duskolicanin.com](https://www.duskolicanin.com/stack/nextjs-framer-motion)
- Design token tiers (primitive → semantic → component): [Product Rocket](https://productrocket.ro/articles/design-tokens-guide/), [Eddie / Brad Frost](https://eddie.bradfrost.com/design-tokens/) — for this project, hand-authored CSS variables are enough; Style Dictionary is overkill
- Typed filesystem content without CMS: common agency-site pattern (JSON/TS modules as the CMS adapter boundary)

---
*Architecture research for: EVENTS ON bilingual marketing site*
*Researched: 2026-08-17*
