# EVENTS ON Website

## What This Is

The official company website for **EVENTS ON** — an event production house. It exists so corporate brands and companies can understand the studio, see the services and work, and start a conversation. v1 is a bilingual (Arabic / English) five-page site: Home, About, Services, Work, Contact.

The site should feel creative and premium, not loud. Desktop scrolling and hover are crafted and luxurious; mobile is fully responsive without trying to copy every desktop motion beat.

## Core Value

A corporate client should feel, within one visit, that EVENTS ON can run their exhibition or event — and be able to contact the team (form + WhatsApp) without friction in their language.

## Business Context

- **Customer**: Companies and brands that need an exhibition, conference, or live event produced
- **Revenue model**: Inbound leads that convert into production contracts (site itself is not a store)
- **Success metric**: A visitor can understand the offer, browse work/services, and submit a lead or open WhatsApp
- **Strategy notes**: Visual identity is locked by the 2026 EVENTS ON Brand Guidelines (`Events on Brend book copy.pdf`)

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Five-page company site: Home, About, Services, Work, Contact
- [ ] Bilingual AR/EN with a language toggle and proper RTL for Arabic
- [ ] Brand-faithful visual system (logo, colors, Inter + Cairo, icon language)
- [ ] Classy scroll and hover on desktop; solid responsive layout on mobile
- [ ] Contact form + WhatsApp as the conversion path
- [ ] Placeholder copy and imagery structured so real content can replace them later

### Out of Scope

- Client portal / login / CMS — v1 is a static marketing site with swappable content
- E-commerce or online booking/payments — leads go to form/WhatsApp
- 3D/WebGL spectacle or "loud" motion — motion is seasoning, not the product
- CMS, blog, careers, and live inventory of real case studies — content is placeholder until assets arrive
- Native apps — web only

## Context

Brand book (2026) already reviewed:

- Wordmark **EVENTS ON** with bar-E motif; tagline **Keep your event ON!**
- Primary: green `#79C05E`, pink `#EB1A6C`, black `#000000`
- Secondary: white, light gray `#C4C2C3`, dark gray `#2B2B2B`
- Type: **Inter** (Latin), **Cairo** (Arabic) — Bold / Medium / Regular
- Service icon set (exhibitions, booths, production, AV, logistics, hospitality, etc.)
- Social/comms icon set (WhatsApp, Instagram, LinkedIn, etc.)
- Logo rules: clear space 1X, min 20px / 8mm; no stretch, frame, glow, or recolor

Audience is corporate buyers, not attendees. Work and services pages must look real enough to sell, even while using placeholders.

v1 content strategy: write professional placeholder copy and use brand-consistent imagery/placeholders; swap later without rebuilding layout.

## Constraints

- **Brand**: Follow the 2026 guidelines; do not invent a competing identity
- **Motion**: Classy and expensive-feeling — no magnetic-cursor chaos, no scroll-jacking that fights the user
- **Language**: Arabic and English are first-class; RTL must not be an afterthought
- **Responsive**: Desktop is the hero experience for scroll/hover; mobile must remain beautiful and usable
- **Content**: No real photography or final copy yet — architecture must make replacement easy
- **Scope**: Marketing site only — no backend beyond whatever a contact form needs to be submit-able

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Official company site (not a one-page stunt) | Client needs About / Services / Work / Contact, not just a hero | — Pending |
| Full five pages in v1 | Matches how corporate buyers evaluate a production house | — Pending |
| Classy motion, not "loud" | Premium event brand; spectacle would cheapen trust | — Pending |
| Bilingual AR/EN with toggle | Brand ships Arabic type (Cairo) and serves regional + international clients | — Pending |
| Corporate brands as primary audience | They are the ones who hire and pay | — Pending |
| Contact form + WhatsApp | Form captures briefs; WhatsApp matches how this market actually follows up | — Pending |
| Placeholder content now, real assets later | Unblocks design/build without waiting on photography | — Pending |
| Project lives at `~/Desktop/events-on` | Cursor session was in the home directory; GSD must not init there | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-17 after initialization*
