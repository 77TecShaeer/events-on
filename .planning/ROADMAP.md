# Roadmap: EVENTS ON Website

## Overview

v1 is a bilingual five-page marketing site so a corporate buyer can understand EVENTS ON, scan services and work, and start a conversation. Phase 1 locks the locale shell, brand tokens, and chrome so Arabic is never an afterthought. Phase 2 ships the five pages and a swap-ready content contract. Phase 3 makes the brief form and WhatsApp actually convert. Phase 4 adds classy desktop motion on native scroll and launch-gates reduced-motion, mobile, and live conversion.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Bilingual Foundation** - Locale-prefixed AR/EN shell with brand tokens, wordmark, and chrome
- [ ] **Phase 2: Five-Page Templates and Content Contract** - Home, About, Services, Work, Contact with swap-ready copy in both locales
- [ ] **Phase 3: Conversion** - Submit-able Formspree brief and locale-prefilled WhatsApp from chrome and Contact
- [ ] **Phase 4: Motion and Launch Readiness** - Classy desktop GSAP on native scroll, reduced-motion off-ramp, mobile journey complete

## Phase Details

### Phase 1: Bilingual Foundation
**Goal:** As a visitor, I want Arabic or English with correct RTL and brand, so that the site feels native in my language.
**Mode:** mvp
**Depends on:** Nothing (first phase)
**Requirements:** BRAND-01, BRAND-02, I18N-01, I18N-02, I18N-03, SITE-03
**Success Criteria** (what must be TRUE):
  1. Visitor opening `/en` or `/ar` (or `/`, which negotiates then redirects) lands on the matching locale with `lang`/`dir` and Inter (EN) or Cairo (AR)
  2. Visitor can switch language with native labels العربية / English and stay on the same page
  3. Visitor sees the 2026 brand system (green `#79C05E`, pink `#EB1A6C`, black/white/grays) and the official EVENTS ON wordmark used with brand-book clear space — not stretched, framed, recoloured, or given glow
  4. Visitor can skip to main content via a skip link
**Plans:** TBD
**UI hint**: yes

### Phase 2: Five-Page Templates and Content Contract
**Goal:** As a corporate buyer, I want to scan five pages of work and services, so that I trust EVENTS ON can produce my event.
**Mode:** mvp
**Depends on:** Phase 1
**Requirements:** SITE-01, SITE-02, BRAND-03, I18N-04, I18N-05, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, RESP-02
**Success Criteria** (what must be TRUE):
  1. Visitor can open Home, About, Services, Work, and Contact from persistent header and footer in both locales, with professional content parity (not machine-translated leftovers)
  2. Visitor landing on Home sees a trailer: hero, services teaser with brand icons, featured work, and dual CTA (form path + WhatsApp)
  3. Visitor can scan all services with short copy and brand icons, and browse a CSS-grid Work set of 6–8 cards labeled as sample slots — no invented client names, fake logos, or lorem
  4. Visitor can read About (studio positioning plus Discover → Design → Produce); placeholder copy and images can be replaced later without rewriting layout
  5. Touch visitor can still read Work/Services captions without hovering; search engines receive reciprocal `hreflang` plus `x-default` for English
**Plans:** TBD
**UI hint**: yes

### Phase 3: Conversion
**Goal:** As a corporate buyer, I want to submit a brief or open WhatsApp, so that I can start a conversation without friction.
**Mode:** mvp
**Depends on:** Phase 2
**Requirements:** CONV-01, CONV-02, CONV-03
**Success Criteria** (what must be TRUE):
  1. Visitor can submit a brief via Formspree (name, company, email, phone, message) and see locale-correct success or error
  2. Visitor can start a WhatsApp chat from header, footer, and Contact using a digits-only `wa.me` link with locale-prefilled text
  3. Email and phone fields stay LTR inside RTL pages; the free-text message uses `dir="auto"`
**Plans:** TBD
**UI hint**: yes

### Phase 4: Motion and Launch Readiness
**Goal:** As a visitor, I want classy desktop motion and a calm mobile site, so that the brand feels premium without fighting me.
**Mode:** mvp
**Depends on:** Phase 3
**Requirements:** MOTN-01, MOTN-02, RESP-01
**Success Criteria** (what must be TRUE):
  1. Desktop visitor gets classy GSAP scroll/hover (opacity + y) on native scroll — no scroll-jacking
  2. Visitor with OS Reduce Motion on gets a static, complete site (no parallax, no scrub)
  3. Mobile visitor can complete the whole journey (nav, pages, form, WhatsApp) without needing desktop hover or cloned desktop motion
**Plans:** TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Bilingual Foundation | 0/? | Not started | - |
| 2. Five-Page Templates and Content Contract | 0/? | Not started | - |
| 3. Conversion | 0/? | Not started | - |
| 4. Motion and Launch Readiness | 0/? | Not started | - |
