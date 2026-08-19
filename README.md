# EVENTS ON Website

Official bilingual marketing site for **EVENTS ON** (`Keep your event ON!`).

## Run

Open this folder in Cursor: `~/Desktop/events-on`

```bash
cp .env.example .env.local
# set NEXT_PUBLIC_FORM (Formspree id) and NEXT_PUBLIC_WHATSAPP (digits only, e.g. 2010xxxxxxxx)
npm install
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000) — you will be sent to `/en` or `/ar`.

## Stack

Next.js 16 · next-intl · Tailwind 4 · GSAP on native scroll · Formspree · WhatsApp `wa.me`

## Content

Copy and work cards live in `src/content/en.ts` + `src/content/ar.ts`. Chrome strings live in `messages/*.json`. Swap photography later without rewriting layout.
