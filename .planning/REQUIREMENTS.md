# Requirements: EVENTS ON Website

**Defined:** 2026-08-17
**Core Value:** A corporate client should feel, within one visit, that EVENTS ON can run their exhibition or event — and be able to contact the team (form + WhatsApp) without friction in their language.

## v1 Requirements

### Site IA

- [ ] **SITE-01**: Visitor can open five pages — Home, About, Services, Work, Contact — from persistent header and footer navigation
- [ ] **SITE-02**: Visitor landing on Home sees a trailer: hero, services teaser, featured work, and dual CTA (form path + WhatsApp)
- [ ] **SITE-03**: Visitor can skip to main content via a skip link

### Brand

- [ ] **BRAND-01**: Visitor sees the 2026 brand system — green `#79C05E`, pink `#EB1A6C`, black/white/grays, Inter (EN) and Cairo (AR)
- [ ] **BRAND-02**: Visitor sees the official EVENTS ON wordmark used with brand-book clear space; logo is not stretched, framed, recoloured, or given glow
- [ ] **BRAND-03**: Visitor sees brand service icons on Services (and Home teaser), not generic Lucide stand-ins

### Internationalization

- [ ] **I18N-01**: Visitor can use always-prefixed `/en` and `/ar` URLs; default locale is English; bare `/` negotiates then redirects
- [ ] **I18N-02**: Visitor can switch language with native labels العربية / English and stay on the same page
- [ ] **I18N-03**: Arabic visitor gets `lang="ar"` + `dir="rtl"` on `<html>`, logical CSS, and Cairo; English gets `lang="en"` + `dir="ltr"` and Inter
- [ ] **I18N-04**: Visitor sees content parity across locales (professional copy, not machine-translated leftovers)
- [ ] **I18N-05**: Search engines receive reciprocal `hreflang` plus `x-default` for English

### Content

- [ ] **CONT-01**: Editors can replace placeholder copy and images later without rewriting layout (typed content modules, not inline JSX copy)
- [ ] **CONT-02**: Visitor never sees invented client names, fake logos, or lorem; Work cards are labeled sample slots
- [ ] **CONT-03**: Visitor can scan all services with short copy and brand icons
- [ ] **CONT-04**: Visitor can browse a Work grid of 6–8 labeled sample project cards (CSS grid, not a carousel)
- [ ] **CONT-05**: Visitor can read About: studio positioning plus process Discover → Design → Produce

### Conversion

- [ ] **CONV-01**: Visitor can submit a brief via Formspree (name, company, email, phone, message) and see locale-correct success or error
- [ ] **CONV-02**: Visitor can start a WhatsApp chat from header, footer, and Contact using a digits-only `wa.me` link with locale-prefilled text
- [ ] **CONV-03**: Email and phone fields stay LTR inside RTL pages; free-text message uses `dir="auto"`

### Motion and Responsive

- [ ] **MOTN-01**: Desktop visitor gets classy GSAP scroll/hover (opacity + y) on native scroll — no scroll-jacking, no Lenis by default
- [ ] **MOTN-02**: Visitor with OS Reduce Motion on gets a static, complete site (no parallax, no scrub)
- [ ] **RESP-01**: Mobile visitor can complete the whole journey (nav, pages, form, WhatsApp) without needing desktop hover or cloned desktop motion
- [ ] **RESP-02**: Touch visitor can still read Work/Services captions without hovering

## v2 Requirements

### Conversion extras

- **CONV-04**: Event-type field on the brief form
- **CONV-05**: Quiet mobile WhatsApp FAB
- **CONT-06**: Proof-strip / logo slots once real permissions exist
- **CONT-07**: Real case-study pages and photography swap

### Motion

- **MOTN-03**: Lenis smooth scroll — only if a spike proves sticky, hash links, reduced-motion, RTL, and iOS Safari still work

### Product

- **PROD-01**: CMS / blog
- **PROD-02**: Careers
- **PROD-03**: Video showreel

## Out of Scope

| Feature | Reason |
|---------|--------|
| Client portal / login | v1 is a marketing site |
| E-commerce, booking, payments, instant quote | Leads go to form + WhatsApp |
| WebGL / Three.js / magnetic cursor | Motion is classy seasoning, not spectacle |
| Cookie-only language toggle | Locale must live in the URL |
| Google Translate / flag switchers | Native AR/EN with content parity |
| Custom email backend (Resend/Server Action) | Formspree is the v1 submit path |
| shadcn/Lucide as the service icon system | Brand book already has an icon language |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-01 | — | Pending |
| SITE-02 | — | Pending |
| SITE-03 | — | Pending |
| BRAND-01 | — | Pending |
| BRAND-02 | — | Pending |
| BRAND-03 | — | Pending |
| I18N-01 | — | Pending |
| I18N-02 | — | Pending |
| I18N-03 | — | Pending |
| I18N-04 | — | Pending |
| I18N-05 | — | Pending |
| CONT-01 | — | Pending |
| CONT-02 | — | Pending |
| CONT-03 | — | Pending |
| CONT-04 | — | Pending |
| CONT-05 | — | Pending |
| CONV-01 | — | Pending |
| CONV-02 | — | Pending |
| CONV-03 | — | Pending |
| MOTN-01 | — | Pending |
| MOTN-02 | — | Pending |
| RESP-01 | — | Pending |
| RESP-02 | — | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 0
- Unmapped: 23 (roadmap pending)

---
*Requirements defined: 2026-08-17*
*Last updated: 2026-08-17 after user directed skip-questions / implement*
