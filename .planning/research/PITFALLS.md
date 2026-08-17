# Pitfalls Research

**Domain:** Premium bilingual (AR/EN, RTL) creative marketing site for an event production house
**Project:** EVENTS ON website (five pages: Home, About, Services, Work, Contact)
**Researched:** 2026-08-17
**Confidence:** MEDIUM (cross-checked community reports + official W3C / WCAG / GSAP / WhatsApp / Google / Cloudflare pages; classify-confidence seam rates `websearch --verified` as MEDIUM and `webfetch` as LOW even for official docs)

Suggested prevention phases referenced below (for the roadmapper; not a locked roadmap):

| Suggested phase | Owns |
|-----------------|------|
| **Foundation** | `html lang`/`dir`, locale URLs, brand tokens, Inter + Cairo, logical CSS |
| **Layouts** | Five-page structure in both locales, nav, footer, Work/Services grids |
| **Motion** | Desktop scroll/hover, reduced-motion path, RTL-aware transforms |
| **Conversion** | Contact form, spam controls, WhatsApp click-to-chat |
| **Content** | Placeholder copy/imagery architecture, swap contract |
| **Launch QA** | RTL audit, a11y, hreflang, brand-book check, form live test |

## Critical Pitfalls

### Pitfall 1: Treating RTL as a CSS flip of a finished English site

**What goes wrong:**
Teams ship English layouts first, then add `dir="rtl"` and a handful of `margin-left` → `margin-right` overrides. Arabic "looks Arabic" in a screenshot and still breaks: nav clusters on the wrong edge, hero CTAs overflow, carousels travel the wrong way, dropdowns open off-screen, and mixed EN brand names / phone numbers shatter line order. Retrofitting physical CSS after pages exist is a rewrite of the layout layer, not a polish pass.

**Why it happens:**
LTR developers treat direction as a theme toggle. `dir="rtl"` on `<html>` only sets base direction; it does not rewrite hardcoded `left`/`right`. Flex `row-reverse` used to "fix" an English nav double-reverses under RTL and looks "correct" in English again. QA is done with mirrored Latin or lorem, which never exercises the Unicode Bidirectional Algorithm.

**How to avoid:**
- Set `lang` and `dir` on `<html>` from the locale (`lang="ar" dir="rtl"` / `lang="en" dir="ltr"`). W3C: never apply base direction with CSS; language tags do **not** imply direction.
- Write **logical CSS from day one**: `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align: start`, `border-start-start-radius`. In Tailwind, `ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`, not `ml-`/`mr-`/`left-`.
- Keep `flex-direction: row` (browser mirrors it). Do not use `row-reverse` as an RTL accommodation.
- Put `dir="ltr"` on email, tel, URL, and password fields even on Arabic pages.
- Wrap embedded LTR runs (EVENTS ON, `+20 …` phones, emails, URLs) in `<span dir="ltr">`.
- Ban physical properties in new code via lint (`margin-left`, `left:`, `text-align: left`).
- Test every layout with **real Arabic sentences that contain English brand names**, not flipped English.

**Warning signs:**
- Grep hits for `margin-left|padding-right|left:\s*0|text-align:\s*left` after Foundation.
- Arabic QA only done by toggling `dir` in DevTools on English copy.
- Nav uses `flex-row-reverse`.
- Language toggle changes strings but `<html dir>` stays `ltr`.
- Horizontal overflow on the inline-end edge in Arabic only.

**Phase to address:**
Foundation (hard gate). Layouts must inherit the logical system; Launch QA verifies with a native-speaker pass.

---

### Pitfall 2: Cookie- or JS-only language toggle (no URL per locale)

**What goes wrong:**
A client-side toggle swaps copy in place. Shared links open in the recipient's language, not the sender's. Googlebot (no cookies, US crawl, no `Accept-Language` variation) indexes one locale. `hreflang` cannot map two languages to one URL. CDNs cache the first language and serve it to everyone. Next.js/React apps hydrate into the wrong language.

**Why it happens:**
A toggle feels cheaper than `/en/…` and `/ar/…`. Teams confuse "remember my preference" with "the page's identity." Google Search Central is explicit: use **different URLs** per language, not cookies or browser settings to vary the same URL.

**How to avoid:**
- Locale lives in the path (`/en/services`, `/ar/services`). URL is source of truth.
- Toggle **navigates** to the sibling URL; it does not mutate strings in place.
- Cookie may remember the choice for the next visit to `/` only. After a prefixed URL, ignore the cookie.
- Reciprocal `hreflang` on every page: `en`, `ar`, self-link, plus `x-default`. Absolute `https://` URLs. If A points to B, B must point to A or Google may ignore the set.
- Do not vary HTML by `Accept-Language` on a single URL.
- Update `<html lang>` and `dir` in the same navigation as the copy.

**Warning signs:**
- Language switcher does not change the address bar.
- Viewing source of `/about` shows one language regardless of toggle.
- Missing or non-reciprocal `hreflang`.
- Hydration mismatch after toggling.
- Arabic WhatsApp/share preview shows English title.

**Phase to address:**
Foundation (routing + `lang`/`dir`). Launch QA: fetch both URLs unauthenticated and confirm distinct HTML.

---

### Pitfall 3: Scroll-jacking sold as "classy"

**What goes wrong:**
Lenis / Locomotive Scroll / ScrollSmoother intercept wheel/touch and lerp a fake scroll position. Native `position: sticky`, hash links, find-in-page, keyboard paging, and iOS overscroll break. `overflow-x: hidden` on `html, body` (the usual "kill horizontal scroll" fix) creates a new scroll container and kills sticky everywhere. Corporate buyers on trackpads feel the site fighting them — the opposite of premium. PROJECT.md already forbids scroll-jacking; creative-agency muscle memory will try to sneak it back in.

**Why it happens:**
Award-site tutorials treat hijacked scroll as table stakes. The bug is delayed: English desktop Chrome looks silky; Safari sticky, Android Chrome, and reduced-motion users fail later.

**How to avoid:**
- Default: **native scroll**. Add Lenis only if a Motion-phase spike proves it does not fight the user — and disable it entirely under `prefers-reduced-motion: reduce`.
- Never put `overflow-x: hidden` on `html`/`body`. Use `overflow-x: clip` on the offending component, or contain overflow locally.
- If Lenis ships: one RAF loop (drive Lenis from GSAP's ticker or vice versa, not both); `lenis.scrollTo` for anchors; `ScrollTrigger.refresh()` after fonts and images; `data-lenis-prevent` on nested scroll (modals, Work galleries).
- Mobile: no smooth-scroll library. PROJECT.md: desktop is the hero for scroll/hover; mobile stays usable.
- Pinning/scrub is seasoning: one or two sections max, never a full-page timeline the user cannot skip.

**Warning signs:**
- Hash `#contact` jumps then eases, or never reaches the form.
- Sticky header works, then dies after Lenis is added.
- Wheel feels laggy or overshoots on macOS trackpad.
- `overflow: hidden` on `body` in global CSS.
- Motion implemented before Layouts are stable (trigger positions lie).

**Phase to address:**
Motion. Foundation/Layouts must not introduce global overflow hacks. Launch QA: keyboard, hash links, sticky, iOS Safari, reduced-motion OS setting.

---

### Pitfall 4: Motion that ignores `prefers-reduced-motion` (and hover-only luxury)

**What goes wrong:**
Parallax, scrubbed heroes, magnetic cursors, and large `scale`/`translate` on scroll trigger vestibular symptoms (nausea, migraine). WCAG 2.3.3 Animation from Interactions (AAA) requires non-essential interaction-triggered motion to be disableable. Parallax, scroll reveals, magnetic hover, and page-flip transitions are **not** essential. Hover-only reveals also fail on touch: Services/Work "luxury" is invisible on the phones corporate assistants actually use.

**Why it happens:**
Motion is treated as brand. CSS media queries cover CSS animation but GSAP/Lenis keep running. A global `* { animation: none }` is skipped because "it would look broken," so nothing is gated. Teams test with a mouse on a large display.

**How to avoid:**
- Ship the **static layout first**. Motion is an enhancement inside `@media (prefers-reduced-motion: no-preference)` and `gsap.matchMedia()` with `reduceMotion: "(prefers-reduced-motion: reduce)"`.
- Under reduce: no parallax, no scrub, no large translates/scales. Opacity/color/underline is enough. Lenis off.
- PROJECT.md already bans magnetic-cursor chaos — keep that as a hard anti-feature.
- Hover effects need a non-hover equivalent (`:focus-visible`, always-visible captions on touch, `@media (hover: hover) and (pointer: fine)`).
- Do not copy every desktop beat to mobile. Shorter/no pin, no horizontal hijack.
- Autoplaying hero video/Lottie is WCAG 2.2.2 (Pause, Stop, Hide), a different criterion — still provide pause or do not autoplay.

**Warning signs:**
- GSAP/Lenis init with no `matchMedia` / `matchMedia('(prefers-reduced-motion: reduce)')`.
- Enabling macOS Reduce Motion changes nothing.
- Work cards show titles only on hover.
- Large `transform: scale` on the hero tied to scroll.
- Motion phase starts before reduced-motion fixtures exist in QA.

**Phase to address:**
Motion (implementation). Foundation can add the CSS `no-preference` wrapper so later GSAP cannot forget it. Launch QA: OS reduce-motion on and off, plus a phone with no hover.

---

### Pitfall 5: Placeholder content that looks like a fake agency

**What goes wrong:**
Lorem ipsum, stock "team in a loft," and invented case studies ("Global Brand X, 50,000 guests") ship to production. B2B buyers now read generic polish as untrustworthy or AI-generated. For an event house selling to corporate procurement, unverifiable Work is worse than a clearly labeled sample layout. PROJECT.md requires placeholders that can be swapped later **without rebuilding layout** — that is an architecture problem, not a copy problem.

**Why it happens:**
Designers need texture. "We'll replace it before launch" slips. Arabic is machine-translated and never reviewed, so EN and AR diverge in meaning and length.

**How to avoid:**
- Never ship Latin lorem on a live or client-review URL.
- Placeholders are **honest and structured**: "Sample exhibition stand — photography forthcoming," not a fake client name. Use brand-consistent color fields / motif patterns, not random Unsplash crowds.
- Content module contract: every block has a stable id, max lengths for EN and AR, image aspect ratio, and alt. Swapping a Work item must not change grid geometry.
- Work page: 4–6 slots with real service categories (exhibitions, booths, AV…) and **no invented logos**. Empty slots beat counterfeit prestige.
- Arabic copy is written (or at least reviewed) by a native speaker. Machine translation of marketing voice is a brand violation in this market.
- About page: real company facts (what they produce, where they operate) over "passion for excellence."

**Warning signs:**
- `Lorem` / `إيبسوم` / "Acme Corp" in the repo.
- EN and AR paragraph lengths differ by >2× in the same module (layout was sized to English).
- Work cards with logos the company does not have permission to show.
- Images hardcoded in JSX instead of a content map.
- Hero headlines that cannot be replaced without editing CSS magic-numbers.

**Phase to address:**
Content (contract + copy). Layouts must consume the content map, not inline strings. Launch QA: grep for lorem/fake brands; native AR review.

---

### Pitfall 6: Brand-book violations that cheapen a locked identity

**What goes wrong:**
The 2026 EVENTS ON guidelines are locked and still get broken in code: stretched header wordmark, logo recolored to `#79C05E` or given glow/frame, clear space crushed in a sticky bar, size under 20px, Inter used for Arabic (or Cairo for English), both fonts mixed in one sentence, tagline rewritten, service icons replaced with generic Lucide. Corporate buyers read sloppy identity as sloppy production.

**Why it happens:**
CSS `width: 100%` on an SVG stretches. Dark header leads to "just invert it." Google Fonts loads Inter+Cairo+every weight on every page, then the stack still falls back to Arial for Arabic. Icon libraries are faster than tracing the brand set.

**How to avoid:**
- Use official SVG/PNG assets only. Scale **uniformly**. Clear space **1X** on all sides; min **20px** digital. No stretch, frame, glow, outline, or recolor. Do not rebuild the wordmark in Inter.
- Logo does **not** flip in RTL (brands don't mirror). Tagline lockup follows the book, not a creative remix.
- Type: **Inter** for Latin, **Cairo** for Arabic, weights Bold / Medium / Regular only. Apply the family on the locale root, not per-span mixed stacks (`Inter, Cairo` in one `font-family` causes uneven line rhythm).
- Colors: green `#79C05E`, pink `#EB1A6C`, black `#000000`, white, `#C4C2C3`, `#2B2B2B` as tokens. Do not invent a third accent. Do not tint the logo with the green.
- Service and social icons: brand set (including WhatsApp). WhatsApp's own "Chat on WhatsApp" artwork must not be restyled (official FAQ: use the button as-is; currently English-only — for Arabic UI use `wa.me` plus the brand WhatsApp icon, not a hacked green blob).
- Encode don'ts as a visual QA checklist in Launch, not tribal knowledge.

**Warning signs:**
- Logo `width` and `height` set independently, or `object-fit: fill`.
- `filter: drop-shadow` / `text-shadow` on the wordmark.
- Computed font on Arabic body is not Cairo (system fallback).
- Pink/green gradients behind the logo.
- Sticky header logo < 20px or overlapping nav with no 1X gap.

**Phase to address:**
Foundation (tokens, assets, font loading). Layouts consume tokens only. Launch QA: side-by-side with the PDF brand book.

---

### Pitfall 7: Contact form that either drowns in spam or drops real briefs

**What goes wrong:**
A `mailto:` or a client-only fetch to a public endpoint harvests spam within days. A visible reCAPTCHA v2 cuts conversion. A honeypot-only form gets beaten by smarter bots. Turnstile is rendered but **never verified server-side**, so attackers POST directly. Tokens expire in 300s and are single-use — slow corporate forms fail with a dead widget. Success UI shows while email never arrives (SPF/DKIM/provider sandbox). Arabic names and RTL messages store mojibake. The form is the revenue path; if it lies, the site fails its success metric.

**Why it happens:**
v1 is "static," so spam is deferred. Widgets look like security. Email "works on localhost."

**How to avoid:**
- Real backend or a form service with **server-side** checks. Cloudflare Turnstile: widget **and** Siteverify (`POST https://challenges.cloudflare.com/turnstile/v0/siteverify`). Client widget alone is not protection.
- Layer: honeypot (supporting only; `autocomplete="off"`, not `display:none` that some bots skip / some password managers fill) + time-trap + rate limit + Turnstile. Do not start with reCAPTCHA v2.
- Validate on the server: length caps, email syntax, strip HTML, origin allow-list. UTF-8 end-to-end for Arabic.
- Honest errors: expired Turnstile → refresh widget, don't claim "message sent."
- Dual path: form for briefs, WhatsApp for the way this market actually follows up. Neither is optional.
- Confirm delivery with a real AR and EN submission from a non-dev network before launch.

**Warning signs:**
- Form `action="mailto:…"` or a serverless function with no secret, no CAPTCHA verify, no rate limit.
- Turnstile sitekey in the page, no Siteverify in the handler.
- Success toast with empty inbox.
- Honeypot labeled `name="email2"` that Safari autofills.
- No spam story in the Conversion phase plan.

**Phase to address:**
Conversion. Launch QA: submit both locales, expired-token path, and a scripted POST that skips the widget (must fail).

---

### Pitfall 8: Broken WhatsApp click-to-chat (silent conversion death)

**What goes wrong:**
`https://wa.me/+20-1xx` or missing country code opens a WhatsApp error, not a chat. Prefilled `text=` is not URL-encoded, so Arabic prefill vanishes. `api.whatsapp.com` vs `wa.me` mixed. Desktop users with no WhatsApp app and no Web session hit a dead end. Restyled unofficial green buttons violate WhatsApp brand rules and look spammy.

**Why it happens:**
Numbers are copied from stationery with `+`, spaces, and a leading zero. Prefill is treated as plain text.

**How to avoid:**
- Official format only: `https://wa.me/<digits>` with **full international number, no `+`, spaces, dashes, or leading zeros**. Egypt example shape: country code + subscriber digits, nothing else.
- Prefill: `?text=` + `encodeURIComponent` in the **current locale** ("I am enquiring about an exhibition" / Arabic equivalent). User still taps Send.
- `target="_blank" rel="noopener noreferrer"` plus an obvious visible number as fallback.
- Do not restyle official Chat on WhatsApp artwork. Custom header icon: use the brand social set.
- Store the number in one config module; both header and Contact read it.

**Warning signs:**
- `href` contains `+`, spaces, or `00`.
- Click on desktop does nothing useful.
- Prefill shows mojibake or `Hello%20` double-encoding.
- Three different numbers in footer / hero / Contact.

**Phase to address:**
Conversion (links + copy). Foundation can add the number to config. Launch QA: tap from iOS, Android, and desktop WhatsApp Web.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| English-first pages, "RTL later" | Faster first mock | Layout rewrite; physical CSS everywhere | Never for this project — bilingual is v1 |
| `[dir=rtl]` override stylesheet instead of logical properties | Familiar to LTR devs | Every new component needs a twin rule that will be forgotten | Never for new CSS; only as a temporary patch on a third-party widget |
| Cookie-only locale | Tiny toggle | SEO, share, CDN, hydration bugs | Never as source of truth; cookie only for `/` redirect |
| Lenis + GSAP from day one | "Award site" feel | Broken sticky/anchors/a11y; motion sickness | Only after native-scroll layouts exist, with reduced-motion off-ramp |
| `overflow-x: hidden` on `body` | Hides one overflowing decoration | Kills `position: sticky`, complicates scroll libraries | Never on `html`/`body`; contain the offender |
| Honeypot-only spam defense | No vendor | Inbox unusable after indexation | MVP week at most; Turnstile + server verify before public launch |
| `mailto:` contact form | No backend | Spam, no attachment of brief, broken on many mobiles | Never |
| Invented Work case studies | Fills the grid | Trust damage if a buyer checks | Never; labeled samples or fewer slots |
| Load Inter **and** Cairo (all weights) on every page | One font snippet | Arabic files are 2–5× Latin; LCP hit for EN visitors | Never; locale-gate faces; 400/500/700 only |
| Mix `Inter, Cairo` in one stack | "Covers both scripts" | Uneven Arabic/Latin metrics in one line | Never; family on `[lang]` / locale root |
| Machine-translated AR marketing | Fast bilingual checkbox | Tone/legal/brand errors; layout overflow | Internal draft only; native review before client |
| GSAP `translateX(-100%)` shared by both locales | One tween | Arabic enter/exit animations run backward | Never; direction multiplier or per-locale `matchMedia` |
| Hardcode copy in components | Ships faster | Content swap becomes a rebuild | Never; content map from Layouts onward |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Locale routing / Next (or similar) | `i18n` in `next.config` Pages-router key on App Router; middleware matcher eats `.css`/`.woff2` | Locale prefix in App Router; exclude static files from middleware; `generateStaticParams` for **both** `en` and `ar` |
| `hreflang` | Relative URLs; missing self-link; A→B without B→A; `ar-EG` mixed with `ar` inconsistently | Absolute URLs; reciprocal set; pick `en` + `ar` (language-only) unless you truly geo-target; include `x-default` |
| Google Fonts / `next/font` | Unconditional Cairo preload on English pages | Subset `latin` vs `arabic`; preload **active** locale only; `font-display: swap` + metric-adjusted fallbacks |
| GSAP ScrollTrigger | Init before Cairo/Inter swap; no refresh on locale change | `document.fonts.ready` then `ScrollTrigger.refresh()`; revert/rebuild on locale navigation |
| Cloudflare Turnstile | Widget without Siteverify; ignoring 300s / single-use tokens | Server `siteverify`; `turnstile.reset` on expiry; never log the secret |
| Form email (Resend/Postmark/etc.) | From-domain without SPF/DKIM; HTML body assumed Latin-1 | Authenticated sending domain; UTF-8; store a copy (inbox or log) the studio actually reads |
| WhatsApp `wa.me` | `+`, spaces, missing country code; unencoded Arabic `text` | Digits-only international; `encodeURIComponent`; one config number |
| Analytics | Counting language toggle as a pageview storm; ignoring RTL replay | Locale dimension from URL; session replay tested in AR |
| Third-party embeds (maps, calendars, chat) | Assume LTR; leftover `dir="ltr"` wrappers | Audit each embed in AR; wrap with explicit `dir` or don't embed in v1 |
| WhatsApp branded button assets | Recolor / rebuild in CSS | Official artwork as-is, or brand-book WhatsApp icon + text |

## Performance Traps

Patterns that work at small scale but fail as usage grows. This site will not see "1M users"; traps below bite at **first public launch** and on **4G in the region**.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Shipping full Cairo + Inter, all weights, both locales | 400KB+ font download, late Arabic paint | Locale-gate; 3 weights; `unicode-range`; self-host woff2 | First load on 4G; EN users pay for unused Arabic glyphs immediately |
| Hero image / video as LCP with no dimensions | CLS, late LCP, ScrollTrigger start positions wrong | Width/height or aspect-ratio; content-map image slots; refresh ST after decode | First home-page visit |
| Scroll-linked animation of `top`/`width`/`margin` | Jank while scrubbing | Only `transform` and `opacity` | Any laptop that is not the designer's |
| Two `requestAnimationFrame` loops (Lenis + GSAP) | Subtle jitter, high CPU | One ticker | Noticeable on 120Hz MacBooks and low-end Androids |
| Unoptimized Work gallery (10× 4K PNG) | Mobile scroll stutter | Responsive `srcset`, modern formats, lazy below fold | Work page on phone |
| Font swap after ScrollTrigger measured | Pins "drift," sections trigger early/late | Init ST inside `document.fonts.ready`; refresh on locale change | Every Arabic first load with `font-display: swap` |
| Horizontal overflow hidden globally | Sticky/fixed chrome bugs | Local clip | As soon as a sticky header is added |
| Client JS for all copy (no SSR/SSG locale HTML) | Flash of English, poor LCP, crawlers see one language | Locale in URL + server-rendered strings | Indexation and first paint |

## Security Mistakes

Domain-specific issues beyond generic OWASP (lead form + public marketing site).

| Mistake | Risk | Prevention |
|---------|------|------------|
| Public form endpoint with no server bot check | Spam flood; inbox abandoned; real briefs missed | Turnstile Siteverify + rate limit + origin check |
| Honeypot as sole defense | Bots that skip hidden fields | Supporting layer only |
| Logging raw form bodies to a public analytics bucket | PII (names, phones, event briefs) leak | Private inbox/CRM; retention limits |
| `dangerouslySetInnerHTML` for translated strings | XSS if a CMS/copy file is ever compromised | Plain text or a sanitised rich-text subset |
| Open redirect on locale prefix (`/{locale}` unsanitised) | Phishing off your domain | Allow-list `en` \| `ar` only |
| WhatsApp prefill that interpolates unsanitised query params | Message injection / scam prefill | Fixed templates per locale, not raw user query |
| Client-side-only "success" without a signed server response | User thinks the brief sent; it didn't | Server 2xx after persist/send |
| Secrets in `NEXT_PUBLIC_` (Turnstile secret, mail API key) | Inbox takeover / spam relay | Server-only env |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| English-only nav chrome on Arabic pages | Feels like a poorly localised microsite | Every chrome string in both dictionaries |
| Language toggle buried, or labelled "AR" in a font that doesn't support Arabic | Users never find their language | Visible toggle; Arabic label in Cairo; `aria-label` in the **other** language |
| Forcing locale from IP (Egypt → Arabic always) | Regional EN-speaking procurement gets the wrong site | `Accept-Language` hint on first `/` visit; always allow one-click switch; URL wins |
| Carousel / Work slider that ignores RTL | Content reads backward | Direction-aware slider or a wrapping grid (prefer grid for v1) |
| Hover-only service details | Touch users cannot evaluate the offer | Always-visible title + short blurb; hover is extra |
| Form labels that don't resize for Arabic | Labels clip; required markers jump | Labels above fields; start-aligned; extra line-height for Cairo |
| Email/phone inputs in RTL without `dir="ltr"` | Cursor jumps; `@` and `+` attach to the wrong side | `dir="ltr"` + `inputmode` |
| "Contact us" that is only a form, no WhatsApp | Drops the dominant regional follow-up channel | Form **and** WhatsApp, both above the fold on Contact |
| Autoplaying motion / video | Vestibular harm; data cost | User-initiated or paused; respect reduced motion |
| Sticky CTA covering the WhatsApp/form on mobile | Cannot convert | Reserve safe area; hide sticky when the form is in view |
| 404 / empty Work in one locale only | Looks unmaintained | Both locales always have the same slot count |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **`html` direction:** `lang` **and** `dir` set from locale — verify View Source on `/ar` and `/en`, not only the toggle UI
- [ ] **Logical CSS:** no physical inline-axis properties in app CSS — verify `rg` for `margin-left|padding-right|text-align: left|left:`
- [ ] **Icon mirroring:** chevrons/back/send flip; logo, search, check, WhatsApp, play do **not** — verify AR screenshot vs EN
- [ ] **BiDi samples:** Arabic paragraph containing "EVENTS ON" and a `+` phone — verify punctuation and number order
- [ ] **Form LTR fields:** email/tel/url have `dir="ltr"` on AR pages — verify caret while typing
- [ ] **Locale URLs:** toggle changes the path; copied AR URL opens in Arabic logged-out — verify incognito
- [ ] **`hreflang`:** reciprocal absolute `en`/`ar`/`x-default` — verify rendered `<head>`
- [ ] **Reduced motion:** OS setting disables parallax/Lenis/GSAP scrub — verify macOS/iOS Reduce Motion
- [ ] **Hover vs touch:** Services/Work readable on a phone with no hover — verify real device
- [ ] **Sticky + anchors:** header sticky; `#contact` lands on the form in both locales — verify after any smooth-scroll library
- [ ] **Fonts:** computed Arabic body is Cairo, English is Inter; EN page does not download Cairo — verify Network
- [ ] **Logo:** not stretched/recolored; 1X clear space; ≥20px — verify against brand PDF
- [ ] **Placeholders:** no lorem, no fake client logos — verify grep + visual
- [ ] **Native AR copy:** not raw MT — verify speaker review
- [ ] **Form server path:** Turnstile Siteverify (or equivalent) + UTF-8 delivery — verify by skipping the widget (must fail) and by a real AR submit (must arrive)
- [ ] **WhatsApp:** `wa.me` digits-only; prefill encoded; works on iOS/Android/desktop — verify tap
- [ ] **Mobile motion:** no scroll-jack; layout beautiful without desktop pins — verify 390px width
- [ ] **Content swap:** replacing a Work image/string does not require CSS edits — verify by swapping one fixture

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Physical CSS after pages exist | HIGH | Freeze features; lint-fail physical properties; convert layout primitives first (nav, hero, grid), then pages; do not add `[dir=rtl]` patches as the strategy |
| Cookie-only locale | MEDIUM | Add `/en` `/ar` prefixes; 301 the bare paths; add reciprocal `hreflang`; keep cookie only for `/` |
| Lenis/overflow-hidden sticky breakage | MEDIUM | Remove global overflow hidden → `clip` locally; if still broken, disable Lenis and keep ScrollTrigger on native scroll |
| Motion ignores reduced-motion | LOW | Wrap existing tweens in `gsap.matchMedia` reduce branch; CSS `no-preference` for CSS motion; kill Lenis when reduce matches |
| Fake Work/lorem in production | LOW–MEDIUM | Replace copy with labeled samples the same day; remove unverifiable logos; do not wait for photography |
| Logo/token violations | LOW | Revert to official SVG and token file; screenshot-diff against brand book |
| Spam flood | MEDIUM | Add server Turnstile + rate limit immediately; do not "redesign the form" first; triage inbox with a filter |
| WhatsApp 404 / wrong number | LOW | Fix the single config URL; test three devices; update QR if any |
| Font LCP / ST drift | LOW | Locale-gate fonts; `fonts.ready` + `ScrollTrigger.refresh()` |
| Hydration locale mismatch | MEDIUM | Stop reading `navigator.language` on the client for first paint; URL locale only |
| Third-party widget LTR-only | LOW | Drop the widget for v1 or isolate in `dir="ltr"` with a visible caption; do not patch internally |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| RTL as afterthought / physical CSS | **Foundation** | Lint clean; `/ar` screenshot of nav/hero/footer; real AR+EN mixed string |
| Cookie-only toggle / missing `hreflang` | **Foundation** | Incognito `/ar/work` stays Arabic; `<head>` reciprocal hreflang |
| `lang` vs `dir` confusion; CSS `direction` | **Foundation** | `html` attributes present; no `direction:` in CSS |
| Inter/Cairo mixed stack; both fonts on every page | **Foundation** | Network: EN does not fetch Cairo; computed fonts correct |
| Brand logo/token violations | **Foundation** | Clear-space overlay; hex tokens match brand book |
| Five pages EN-only then "translate" | **Layouts** | Every route exists under both prefixes with equal modules |
| Carousel / grid column bugs in RTL | **Layouts** | Prefer CSS grid wrapping; if carousel, test swipe both dirs |
| Hover-only luxury on Work/Services | **Layouts** | Phone: captions visible without hover |
| Scroll-jacking / `overflow-x: hidden` on body | **Motion** | Sticky header + hash links work; no Lenis unless spike passed |
| GSAP `translateX` wrong way in RTL | **Motion** | Same component, both locales, enter from inline-start |
| ScrollTrigger before font load | **Motion** | After hard reload on 3G throttle, pins still align |
| Motion vs `prefers-reduced-motion` | **Motion** | OS reduce-motion: no parallax/scrub/Lenis |
| Magnetic cursor / loud WebGL | **Motion** (do not build) | Code search empty; out of scope already in PROJECT.md |
| Form spam / no server verify | **Conversion** | Direct POST rejected; real submit delivered |
| WhatsApp `wa.me` format | **Conversion** | Official FAQ format; three-device tap test |
| Form `dir` / Arabic body mojibake | **Conversion** | AR name + message round-trip intact |
| Lorem / fake case studies | **Content** | Grep + visual; labeled sample slots only |
| Copy not swappable | **Content** | Swap one Work item via content map, no CSS change |
| Native AR review skipped | **Content** / **Launch QA** | Signed-off AR strings |
| Third-party LTR widgets | **Launch QA** | Each embed listed; drop or isolate |
| Reduced-motion + keyboard + iOS | **Launch QA** | Checklist above all green |
| Brand-book visual diff | **Launch QA** | Side-by-side with PDF |

**Research flags for later phases (deeper research likely):**

- **Motion:** Lenis vs native scroll vs CSS scroll-driven animations — spike with sticky, RTL, and reduced-motion before committing. Standard GSAP fade/slide does **not** need a new research pass if `matchMedia` is used.
- **Conversion:** Exact form backend (Turnstile + hosted form vs tiny serverless) — decide in Conversion; spam model above does not change.
- **Foundation:** Framework i18n helper (`next-intl` vs custom dictionaries) is a stack choice; the URL-per-locale rule is not negotiable.
- **Content:** Photography/rights for real work — legal, not technical; do not invent stand-ins.

## Sources

Official / spec (retrieved 2026-08-17; classify-confidence rates `webfetch` LOW even for these — treat as primary anyway, cross-checked with community):

- [W3C: Structural markup and RTL text (`dir` on `html`, no CSS base direction, logical properties)](https://www.w3.org/International/questions/qa-html-dir)
- [WCAG 2.2 Understanding SC 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- [W3C technique C39: `prefers-reduced-motion`](https://www.w3.org/WAI/WCAG21/Techniques/css/C39.html)
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [GSAP: `gsap.matchMedia()` (reduced-motion, desktop/mobile revert)](https://gsap.com/docs/v3/GSAP/gsap.matchMedia())
- [WhatsApp Help: Click to Chat (`wa.me` format, do not restyle button)](https://faq.whatsapp.com/5913398998672934/?locale=en_US)
- [Google Search Central: Localized versions / `hreflang` (separate URLs, reciprocal links)](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google Search Central: Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Cloudflare Turnstile: server-side Siteverify (300s, single-use)](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

Community / practice (MEDIUM via `websearch --verified` where cross-checked against official docs above):

- [Crawlix: Auditing RTL layouts (logical properties, icon flip list, flex double-reverse, form `dir="ltr"`, no lorem for RTL QA)](https://crawlix.app/blog/rtl-website-audit/)
- [RTL as first-class layout vs rtlcss mirroring](https://sadamkhan.spiralsync.com/blog/case-studies/implementing-rtl-bilingual-ecommerce)
- [Lenis + `overflow-x: hidden` breaking sticky; reduced-motion should disable Lenis](https://krishna-adhikari.com.np/blogs/lenis-nextjs-smooth-scroll)
- [Cookie locale vs URL: crawlers, `hreflang`, share links](https://dev.to/ahmed_mahmoud360/shipping-a-bilingual-nextjs-app-in-english-and-arabic-routing-rtl-and-what-crawlers-actually-see-517i)
- [Hydration mismatch from cookie locale](https://simplelocalize.io/blog/posts/locale-detection-strategies/)
- EVENTS ON 2026 Brand Guidelines (project constraint): 1X clear space, min 20px / 8mm, no stretch/frame/glow/recolor; Inter + Cairo; green `#79C05E`, pink `#EB1A6C`

**Gaps (honest):**

- No public post-mortem of a specific GCC event-agency site launch was found; pitfalls are synthesised from i18n/RTL, creative-frontend, B2B-trust, and form-abuse sources plus the locked brand book.
- Exact spam volume for this domain is unknown until the form is public — plan for Turnstile anyway.
- Native Arabic UX review cannot be automated; budget it in Launch QA.

---
*Pitfalls research for: bilingual creative marketing site (EVENTS ON)*
*Researched: 2026-08-17*
