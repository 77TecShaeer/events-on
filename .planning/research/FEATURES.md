# Feature Research

**Domain:** Premium bilingual (AR/EN) event-production / exhibition-house marketing website
**Researched:** 2026-08-17
**Confidence:** MEDIUM

Corporate buyers hire production houses the way they hire agencies: they scan identity, services, proof of work, then inquire. Across US premium houses (Extraordinary Productions, Ovation, Vibe Agency) and GCC exhibition/production sites (Spectrum UAE, Al Safa, Beyond DXB, Arvento Edge), the same five-page spine repeats: **Home, About, Services, Work, Contact**. Showit’s event-pro template guidance (updated 2026-03-04) names that menu as the “client-friendly” default and treats the homepage as a preview of work + services + CTA.

What GCC competitors usually add on top — WhatsApp chat, a quote form, client logos — is table stakes in this market. What they usually skip — a real Arabic experience with RTL, content parity, and a language switch that stays on the same page — is the gap EVENTS ON should occupy. What they sometimes add — client portals, live inventory, instant quotes, blogs, exhibition calendars, scroll-jacked 3D heroes — is out of scope and would cheapen a brand-led v1.

**Core value this landscape must serve:** a corporate visitor understands that EVENTS ON can run their exhibition or event, browses work/services in their language, and starts a conversation via form or WhatsApp without friction.

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete. Buyers do not thank you for having them; they leave if they are missing.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Five-page IA: Home, About, Services, Work, Contact | Corporate buyers evaluate a production house this way; Showit, Extraordinary, Spectrum, and PROJECT.md all converge here | LOW | Do not collapse to a one-page stunt. Homepage teasers must deep-link to the other four pages. |
| Persistent header nav + footer | Busy marketing teams want answers in one or two clicks | LOW | Header: logo, 5 links, language toggle, primary CTA. Footer: contact, social, legal stubs, language. |
| Homepage as site preview | Visitors decide in seconds whether this studio can run their show | MEDIUM | Hero (brand + promise) → services teaser → featured work → proof strip → CTA. Not a novel; a trailer. |
| Brand-faithful visual system | Hiring a production house is a taste test; mismatched identity kills trust | MEDIUM | Lock to 2026 brand book: green `#79C05E`, pink `#EB1A6C`, black, Inter + Cairo, bar-E wordmark, service icons. No competing aesthetic. |
| Language toggle (AR/EN) | GCC corporate buyers switch languages in a session; bilingualism is a Gulf business requirement, not a plugin | MEDIUM | Native labels **العربية** / **English**. No flags. Persist locale. Switch the current page, not dump to Home. |
| First-class RTL for Arabic | A flipped LTR layout reads as “translated afterthought” and loses Arabic-first buyers | HIGH | `dir`/`lang` on the document, logical CSS, mirrored nav, Cairo loaded only when needed. Arabic is not a CSS `direction` patch. |
| Content parity across locales | Users notice immediately when Arabic is thinner, machine-translated, or missing pages | MEDIUM | Every nav item, CTA, form label, and placeholder exists in both languages. Professional placeholder copy now; native rewrite later — never Google Translate. |
| Services page with icon language | Buyers need to know *what you actually produce* (exhibitions, booths, AV, logistics, hospitality) | MEDIUM | One page, icon + short descriptor per service from the brand set. Skimmable. No 20 SEO landing pages. |
| Work / portfolio grid | “Seeing is believing” (Socialtables/Cvent). Work is the sales engine. | MEDIUM | 6–8 curated case cards (title, category, still). Placeholders must look replaceable, not like Lorem stock. No 100-photo dump. |
| About page (studio, not attendees) | High-stakes hire: buyers want a grown-up studio, not an attendee microsite | LOW | Who we are, how we work at a high level, capability proof. Team headshots optional until assets exist. |
| Contact form (submit-able) | Inquiry is the conversion. A contact page that is only a mailto feels unfinished. | MEDIUM | Minimum: name, company, email, phone, message. Success/error in the active locale. Needs a submit path (serverless or form provider) — not a CMS. |
| WhatsApp click-to-chat | Default GCC follow-up channel. Spectrum, Al Safa, Beyond DXB, and Arvento all point here. Western houses use phone/email only. | LOW | `wa.me` with a prefilled message in the **current locale**. Header/footer + Contact. Quiet FAB on mobile; do not plaster a bouncing bubble on desktop. |
| Multiple inquiry CTAs | Buyers compare vendors; one footer link is not enough (Showit) | LOW | Header CTA, mid-page, page-end. Copy: “Start a brief” / “WhatsApp us” — not “Buy now”. |
| Client-logo / proof strip | Corporate buyers look for “people like us hired them” | LOW | Slot for 6–8 logos on Home (and optionally Work). Use tasteful placeholders until permissions exist. Avoid screaming counters (“0+ Stands Delivered”). |
| Phone + email in footer | Fallback when WhatsApp/form fail; expected on every serious company site | LOW | Real numbers/addresses when available; structured placeholders until then. |
| Social links (Instagram, LinkedIn, WhatsApp) | Socialtables lists social as portfolio-basic; brand book already has the icon set | LOW | Icons in footer. Do not embed a live Instagram grid in v1 (performance + empty-feed risk). |
| Mobile-responsive layout | Most discovery is phone (Instagram/Google); galleries must not crop or stack badly | MEDIUM | Desktop owns crafted hover/scroll. Mobile is fully usable, beautiful, and CTA-tappable — not a stripped desktop clone of every motion beat. |
| Image-heavy performance basics | Event sites die on unoptimized heroes | MEDIUM | Intentional featured stills, compressed assets, no autoplay-with-sound. Speed is a feature. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required for “a website exists,” but they are how EVENTS ON wins against English-only GCC mills and against loud experiential templates.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Native-quality bilingual experience (not a toggle glued on English) | Live GCC competitors surveyed (Spectrum, Al Safa, Beyond DXB, Arvento) claim bilingual *teams* and ship English-only *sites*. Doing AR/EN as two first-class surfaces is the clearest gap. | HIGH | Content parity + RTL + locale-aware form/WhatsApp. This is the differentiator that maps to Core Value. |
| Dual conversion path: qualifying form **and** WhatsApp | Form captures a brief for email/CRM-style follow-up; WhatsApp matches how this market actually replies. Either-only is a miss. | MEDIUM | Form is not replaced by chat. Prefill WhatsApp from locale. Keep both on Contact and as global CTAs. |
| Qualifying brief fields (not a naked Name/Email) | Showit and Spectrum show that date/event-type/size fields filter tire-kickers and make the lead usable | MEDIUM | v1 add: event type (exhibition / conference / live event / other) + approximate date or timeline. Do **not** add budget, stand-size calculators, or 12-field RFQs. |
| Classy desktop motion as seasoning | Signals premium production taste without becoming the product | MEDIUM | Scroll/hover that feels expensive. Respect `prefers-reduced-motion`. Conflicts with scroll-jacking, magnetic cursor, hover soundscapes. |
| Visible process (Discover → Design → Produce) | Extraordinary and Arvento use a 3–4 step “how we work” to sell operational discipline | LOW | One section on About and/or Services. Short. Reassures corporate PMs. No fake Gantt widgets. |
| Brand-book service icons as the services UI | Most competitors use generic stock icons or none; EVENTS ON already has a locked icon language | LOW | Use the brand set (exhibitions, booths, production, AV, logistics, hospitality). Differentiator is coherence, not novelty. |
| Placeholder content that still sells | v1 has no real photography; a site that *looks unfinished* will not generate leads | MEDIUM | Professional AR/EN copy, brand-consistent stills, structured case cards. Swap later without rebuilding layout. This is a content-architecture feature. |
| Locale-aware WhatsApp prefill | Tiny thing competitors do poorly; feels native when Arabic visitors get an Arabic opener | LOW | EN: “Hello, I’d like to brief EVENTS ON about an upcoming event.” AR: equivalent. Include page context optionally. |
| “What happens after you inquire” | Showit notes this reduces ghosting | LOW | One sentence on Contact: we reply within X via email or WhatsApp. Only claim what operations can keep. |
| Named testimonials (when assets arrive) | Tied-to-outcome quotes beat anonymous five-star bubbles (Creative Orion / CB Events; Spectrum’s named Google reviews) | LOW | Structure the component now; fill with placeholders. Do not invent fake names. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems. Explicitly do **not** build these in v1. Several are already PROJECT.md out-of-scope.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| CMS / blog / “news & insights” | Spectrum and Stand Creators use blogs for SEO (GITEX, ATM, etc.) | Needs editorial ops EVENTS ON does not have; stale blogs look abandoned; PROJECT.md out of scope | Static pages + placeholder copy. Revisit a journal only after a real content owner exists. |
| Client portal / login | Beyond DXB ships “Client Portal”; agencies like “a place for files” | Auth, permissions, hosting, support — a product, not a brochure. Out of scope. | Email + WhatsApp for file sharing until a real ops tool exists. |
| E-commerce, booking, payments, availability calendar | Venue sites (Orphmedia) and wedding templates treat the site as a booking engine | EVENTS ON sells production contracts, not rooms or tickets. Pricing is bespoke. | Inquiry form + WhatsApp. |
| Instant quote / live equipment inventory | Beyond DXB “Get Instant Quote” + hourly stock | Turns a premium house into a rental catalog; requires live data; wrong brand posture | Human brief. Quote offline. |
| Loud 3D / WebGL / scroll-jacked cinematic hero | Experiential templates (Rocket.new “Curate”) look “creative” | Fights the user, kills mobile, cheapens a classy brand. PROJECT.md forbids spectacle-as-product. | Classy scroll/hover on a stable layout. |
| Magnetic cursor / hover soundscapes / autoplay video with sound | Agency-awards aesthetics | Accessibility disaster; corporate buyers on mute in an office | Optional muted looping stills only if they do not block LCP. Prefer stills. |
| SEO service-page farm (one URL per city × service) | Stand Creators / Spectrum rank for “exhibition stand Dubai/Sharjah/KSA” | Dozens of thin pages, translation cost ×2, unmaintainable without CMS | One Services page, well written in both languages. Location mentions in About/Contact copy. |
| Upcoming-exhibition calendar as lead magnet | Spectrum lists GITEX, ADIPEC, etc. with countdown + “Request a quote” | Requires live event data and constant updates; wrong if dates rot | Optional later: a static “we work these shows” line. Not a calendar product. |
| Native app / “Install App” | Beyond DXB | Absurd for a five-page marketing site. Out of scope. | PWA not needed. Web only. |
| Wedding / attendee packages and shoppable rental grids | Showit templates for planners and rental firms | Wrong audience (corporate brands, not couples or attendees) | Corporate service taxonomy only. |
| Published rate card / pricing calculator | Buyers ask “how much?” | Production pricing is scoped; a number on the site either underbids or scares | “Brief us — we scope from the brief.” |
| AI chatbot / WhatsApp bot as the website | Agencies sell “qualification bots” | Impersonal on a premium brand; extra vendor; form + human WhatsApp is enough | Human `wa.me` + form. |
| Google Translate widget / flag language switcher | Cheap bilingual checkbox | AivenSoft: flags misrepresent language; machine Arabic destroys trust in UAE/KSA | First-class locales, native labels. |
| Live Instagram embed | “Show the feed” | Empty or off-brand feed, third-party script, layout shift | Footer icon to Instagram. Curate stills onto Work instead. |
| Careers page | Looks like a “real company” | No hiring pipeline in v1; empty jobs page is worse than none. Out of scope. | Skip. |
| Per-project case-study CMS with filters, metrics, PDFs | Agencies want “challenge / solution / results” | No real assets or client permission yet; live inventory is out of scope | Static placeholder cards with a swap-ready content shape. Real case studies after photography + releases. |
| Hijri date picker / IBAN / checkout-grade form UX | Generic GCC e-commerce checklists | This is not commerce. Overbuilding the form kills completion. | Gregorian date-or-text timeline; `dir="auto"` on text inputs; phone with a regional default when known. |

## Feature Dependencies

```
Brand visual system (tokens, type, icons, logo rules)
    └──requires──> Five-page templates
                       └──requires──> Homepage teasers (need real destinations)

Locale system (routing, `lang`/`dir`, message files)
    └──requires──> Language toggle
    └──requires──> RTL layout
    └──requires──> Content parity (every string keyed)
                       └──enhances──> Locale-aware form validation
                       └──enhances──> Locale-aware WhatsApp prefill

Contact page
    └──requires──> Submit-able form
    └──requires──> WhatsApp CTA
                       └──enhances──> Qualifying brief fields
                       └──enhances──> “What happens next” copy

Work page
    └──requires──> Placeholder content model (card: title, category, image)
                       └──enhances──> Homepage featured-work teaser

Services page
    └──requires──> Brand icon set
                       └──enhances──> Homepage services teaser
                       └──enhances──> Process section (About/Services)

Classy motion layer
    └──requires──> Stable layout first (motion is seasoning)
    └──conflicts──> Loud 3D / scroll-jacking / magnetic cursor

Proof strip (logos / testimonials)
    └──requires──> Slot in layout now
    └──requires──> Real assets later (do not fake names)

WhatsApp FAB (mobile)
    └──requires──> Same `wa.me` endpoint as header/footer
    └──conflicts──> Desktop-loud chat widgets that fight classy motion
```

### Dependency Notes

- **Locale system requires message files before page polish:** if English ships first and Arabic is “later,” RTL will be a rewrite. Build both locales in the same phase as the templates.
- **Homepage teasers require destination pages:** do not design Home as a one-pager that later splits; the five routes are the product.
- **Form requires a submit path:** a pretty form that does nothing fails the success metric. Pick one: serverless route, Formspree/Getform, or similar — still not a CMS.
- **Motion requires layout:** animate after the bilingual templates are solid. Motion that assumes LTR will break RTL.
- **Work cards require a content shape, not a CMS:** title, category, image, short caption — enough to swap photography later.
- **Classy motion conflicts with spectacle:** do not combine “premium hover” with WebGL heroes in the same phase.
- **WhatsApp enhances Contact but does not replace it:** corporate procurement still wants an emailable brief.

## MVP Definition

### Launch With (v1)

Minimum viable product — what’s needed to validate “a corporate visitor understands the offer and can start a conversation in their language.”

- [ ] Five-page site (Home, About, Services, Work, Contact) with persistent nav/footer
- [ ] Brand-faithful visual system (logo, colors, Inter + Cairo, service icons)
- [ ] AR/EN toggle with document `lang`/`dir`, RTL layout, content parity, persist locale, stay-on-page switch
- [ ] Homepage preview: hero, services teaser, featured work, proof-strip slot, dual CTA
- [ ] Services page: icon + short copy per offering (placeholder, brand icons)
- [ ] Work page: 6–8 placeholder case cards, swap-ready
- [ ] About page: studio story + short process
- [ ] Contact form that actually submits (name, company, email, phone, event type, message) + success/error in locale
- [ ] WhatsApp click-to-chat with locale-prefilled text (header/footer/Contact; quiet mobile FAB)
- [ ] Phone/email/social in footer
- [ ] Desktop classy scroll/hover; mobile fully usable without copying every desktop beat
- [ ] Professional placeholder copy and imagery in both languages

### Add After Validation (v1.x)

Features to add once core is working and real assets exist.

- [ ] Replace placeholders with real photography and client-approved case cards — trigger: assets + releases in hand
- [ ] Named testimonials tied to specific events — trigger: written permission
- [ ] Slightly richer brief fields (venue / city, guest-or-stand scale) if form leads are too vague — trigger: first 10 inquiries reviewed
- [ ] FAQ on Contact or Services answering timeline, geography, “do you do X” — trigger: repeating WhatsApp questions
- [ ] `hreflang` + locale URLs hardened for search — trigger: domain/SEO owner ready
- [ ] “What happens after you inquire” with a real SLA — trigger: ops agrees a response time

### Future Consideration (v2+)

Features to defer until the marketing site is earning leads and someone owns content.

- [ ] Real case-study pages (challenge / solution / result) — needs metrics and legal
- [ ] Blog / show calendar / per-service SEO pages — needs an editor
- [ ] CMS — only when placeholder swapping becomes painful
- [ ] Careers
- [ ] Client portal, booking, payments, inventory — never on this brochure unless the business model changes
- [ ] Video showreels / muted hero loops — after real footage exists and LCP is proven

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Five-page IA + nav/footer | HIGH | LOW | P1 |
| Brand visual system | HIGH | MEDIUM | P1 |
| AR/EN toggle + RTL + content parity | HIGH | HIGH | P1 |
| Homepage preview (work + services + CTA) | HIGH | MEDIUM | P1 |
| Services page (icons + copy) | HIGH | MEDIUM | P1 |
| Work grid (placeholder cards) | HIGH | MEDIUM | P1 |
| About (studio + process) | HIGH | LOW | P1 |
| Contact form (submit-able) | HIGH | MEDIUM | P1 |
| WhatsApp click-to-chat + locale prefill | HIGH | LOW | P1 |
| Dual CTAs on every page | HIGH | LOW | P1 |
| Mobile-responsive (usable, not cloned motion) | HIGH | MEDIUM | P1 |
| Placeholder copy/imagery that still sells | HIGH | MEDIUM | P1 |
| Qualifying field: event type (+ timeline) | MEDIUM | LOW | P1 |
| Classy desktop motion + reduced-motion | MEDIUM | MEDIUM | P1 |
| Proof-strip slots (logos) | MEDIUM | LOW | P1 |
| Footer phone/email/social | HIGH | LOW | P1 |
| Quiet mobile WhatsApp FAB | MEDIUM | LOW | P2 |
| “What happens next” on Contact | MEDIUM | LOW | P2 |
| Named testimonials component (empty-safe) | MEDIUM | LOW | P2 |
| FAQ | MEDIUM | LOW | P2 |
| hreflang / locale SEO | MEDIUM | MEDIUM | P2 |
| Richer brief fields | MEDIUM | LOW | P2 |
| Real case-study pages | HIGH | HIGH | P3 |
| Blog / exhibition calendar | LOW | HIGH | P3 |
| CMS | LOW (now) | HIGH | P3 |
| Video showreel | MEDIUM | MEDIUM | P3 |
| Client portal / booking / inventory / 3D | LOW | HIGH | P3 (do not build) |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration — or explicit anti-feature

## Competitor Feature Analysis

| Feature | Extraordinary Productions (US premium house) | Spectrum UAE / Al Safa (GCC exhibition) | Beyond DXB / Arvento (Dubai production) | EVENTS ON approach |
|---------|-----------------------------------------------|------------------------------------------|------------------------------------------|--------------------|
| IA | Home, About, services, work types, Contact, blog | Home-heavy + many service URLs + blog + calendar (Spectrum) | Home + services + projects + Contact; extras (portal, inventory) | **Five pages only.** No blog, calendar, or portal. |
| Bilingual UI | English only | English only (bilingual *team* claimed) | English only; WhatsApp mentioned | **First-class AR/EN + RTL.** Primary differentiator. |
| Work | Event-type pages, not a dump | Latest-work gallery + named shows | Case cards (Arvento); “recent projects” (Beyond) | Curated placeholder grid; swap-ready; no live CMS. |
| Services | Design / Build / Produce + event types | Stand types, pavilions, kiosks, SEO variants | AV, fabrication, MICE, rental catalog (Beyond) | One Services page, brand icons, corporate taxonomy. |
| Process | Discover → Design → Build → Produce | Implied via copy | 4-step (Arvento) | Short process on About/Services. |
| Proof | Fortune-500 logos, testimonials | Google reviews widget, ISO, awards, logos | License number, venue logos, stats | Logo strip + testimonial slots; no fake counters. |
| Conversion | Form + phone + email | Quote form (exhibition name, stand size) + WhatsApp widget | Form + WhatsApp + instant quote (Beyond) | **Form (brief) + WhatsApp.** No instant quote. |
| Motion / tone | Restrained, corporate-premium | SEO-loud, badge-heavy | Product-y (inventory, app, portal) | Classy motion, brand-faithful, not spectacle. |
| Extra surfaces | Blog | Blog, upcoming exhibitions, FAQ dump | Client portal, live inventory, app, talent/gifting sister sites | None in v1. |

**Opinionated read:** copy Extraordinary’s *restraint and IA*, copy GCC sites’ *WhatsApp habit*, and do the bilingual job almost nobody in this vertical actually ships. Do not copy Spectrum’s SEO mill or Beyond DXB’s operating system.

## Sources

Industry / template guidance (MEDIUM — websearch `--verified`):

- [Showit — Top Event Professional Website Templates](https://showit.com/website-tips/showits-top-event-professional-website-templates/) (page dated 2026-03-04): portfolio-forward design, services layouts, process/testimonials, multi-CTA inquiry, qualifying forms, Portfolio/Services/About/Contact nav, homepage as preview, mobile galleries, avoid animation-heavy templates.
- [Socialtables / Cvent — Event Planning Portfolios](https://www.socialtables.com/blog/event-planning/digital-portfolio/): logo/brand, testimonials, photos/video, awards, About, social links; work must prove capability.
- [Gray Park](https://graypark.agency/) and [Orphmedia event-space guidance](https://orphmedia.com/services/event-spaces): useful as negative space — portfolio sites vs venue booking engines. Booking calendars belong to venues, not production houses.

Live competitor sites (treat as MEDIUM when cross-checked against the articles above; single-page webfetch alone is LOW per classify-confidence):

- [Extraordinary Productions](https://extraordinaryproductions.com/) — Design/Build/Produce, process, logos, form+phone, blog.
- [Spectrum Exhibition UAE](https://spectrum-uae.com/) — quote form (exhibition name, stand size), WhatsApp widget, testimonials, logos, blog, upcoming-exhibition calendar.
- [Al Safa](https://alsafaadv.com/) — services, quote form, WhatsApp (“Chat with a Lead Designer”), stats, logos.
- [Beyond DXB](https://beyond-dxb.com/) — WhatsApp, form, instant quote, live inventory, client portal, app — overbuilt anti-pattern.
- [Arvento Edge Events](https://arventoevents.com/) — process, case cards, form, FAQ pointing to website or WhatsApp.
- [Stand Creators](https://standcreators.com/uae/dubai/) — multilingual-team claim + SEO location/service farm.

Bilingual UX (MEDIUM):

- [AivenSoft — Bilingual Website Development: Arabic & English](https://aivensoft.com/en/blog/bilingual-website-arabic-english) (2026-01-15): native labels, no flags, stay-on-page switch, persist locale, subdirectory locales, content parity. Gulf bilingualism framed as a requirement.
- [iTitans — Arabic–English bilingual websites](https://ititans.com/blog/how-to-build-a-high-performing-arabic-english-bilingual-website/): switcher must preserve intent; translation ≠ localization.
- [Stackzeno — Bilingual Arabic-English Website Development Guide](https://stackzeno.com/blog/bilingual-arabic-english-website-development): RTL as rebuild, not overlay; avoid Google Translate content.

GCC WhatsApp conversion (MEDIUM; consumer/B2B ads more than production-house sites — do not over-claim):

- [Bowaba — Click-to-WhatsApp in GCC](https://bowaba.com/2025/07/09/why-click-to-whatsapp-ads-are-outperforming-traditional-funnels-in-gcc-markets/) (2025-07-09).
- [Campaign Middle East — AAC Nissan WhatsApp vs click-to-site](https://campaignme.com/how-aac-increased-revenue-by-75-roi-by-55-with-whatsapp-marketing/).
- Supports WhatsApp as a **parallel** conversion path, not as a reason to delete the form.

Anti-pattern references:

- [Rocket.new Curate template](https://www.rocket.new/templates/curate-elite-event-production-landing-page-template) — scroll-jacked hero, hover soundscapes: what not to build.
- PROJECT.md out-of-scope: CMS, e-commerce/booking, loud 3D/WebGL, client portal, blog, careers, live case-study inventory, native apps.

### Gaps (honest)

- No public user-research sample of *EVENTS ON* buyers; buyer needs inferred from PROJECT.md + competitor IA.
- WhatsApp ROI stats are GCC ads/automotive/retail, not exhibition RFPs — directional only.
- Several GCC sites may hide an Arabic toggle behind JS not visible to a text fetch; UI still presented as English-first.
- Real case-study metrics and client-logo permissions are unknown; v1 must not invent them.

---
*Feature research for: EVENTS ON bilingual event-production marketing site*
*Researched: 2026-08-17*
