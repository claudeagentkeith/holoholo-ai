# holoholo.ai Oʻahu V1.1 starter

This repository is now **integration-ready for the masked-preview flow**.

It keeps the original three-view architecture from the initial Hawaii regenerative tourism build spec — traveler flow, operator placeholder, and admin tooling — but updates the traveler funnel to the revised lifecycle we locked together:

**preferences → masked preview → $15 deposit → revealed itinerary → final confirmation → supplier launch queue → monitoring**

## What is included now

- Next.js App Router scaffold with Tailwind
- Prisma schema updated to the V1.1 lifecycle, including:
  - `PreviewSession`
  - `TripVersion`
  - service-fee pricing fields
  - regenerative/eco score assessment
  - donation recipients and outbound-click tracking
  - change-request and notification scaffolding
- Oʻahu masked-preview intake flow on `/`
- Dedicated preview page on `/preview/[publicId]`
- Embedded intake route on `/embed/intake`
- Conversion flow from preview to trip + deposit checkout
- Guest trip portal with:
  - auto-generation after deposit
  - revealed itinerary
  - service fee math
  - regenerative score details
  - island donation links when the score is net negative
  - supplier booking launch queue
- Anthropic itinerary wrapper with deterministic fallback
- Updated seed data with mostly illustrative Oʻahu inventory, HTA-cohort donation recipients, and a Kahuku Farms cohort-scoring example
- Admin source registry and PRD #4 coverage tooling from the prior step
- Impact score contributor display on the guest trip portal
- V1.1 family-farm cohort scoring rule (see `IMPACT_SCORING_RULES.md`)

## What is still scaffolded

- Site-specific public booking adapters
- Browser automation for unsupported supplier flows
- Production-grade email and SMS delivery
- Signed magic-link auth
- Daily monitoring pollers and automated replan generation
- Final service-fee checkout collection
- Change-request quoting workflow

## Quick start

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

## Core routes

### Pages

- `/` — masked-preview intake
- `/preview/[publicId]` — masked itinerary preview before deposit
- `/trip/[publicId]` — guest trip portal after deposit
- `/embed/intake` — integration-friendly intake route for an existing site
- `/admin` — internal admin overview
- `/admin/sources` — PRD #4 source registry and launch whitelist
- `/operator/dashboard` — operator placeholder
- `/operator/profile` — operator placeholder

### API

- `POST /api/preview-sessions` — create and generate a masked preview session
- `POST /api/preview-sessions/[publicId]/convert` — convert preview to trip
- `POST /api/payments/deposit` — start the deposit flow
- `POST /api/itineraries/generate` — generate or regenerate the revealed itinerary
- `POST /api/trips/[tripId]/confirm` — confirm the current version and create booking queue records
- `GET /api/bookings` — inspect booking queue records
- `GET /api/operators` — inspect seeded supplier coverage
- `GET /api/sources` — inspect curated PRD #4 source coverage
- `POST /api/monitoring/check` — monitoring hook surface
- `POST /api/stripe/webhook` — Stripe webhook for deposit confirmation

## Integration status

You can start plugging this into an existing website as soon as you deploy this repo with a database and Stripe keys.

The current build is best suited for one of these two modes:

1. **Fastest path** — add a CTA on the existing site that links to `/embed/intake`
2. **Embedded path** — iframe `/embed/intake` inside the current site shell

See `WEBSITE_INTEGRATION.md` for the rollout plan.
