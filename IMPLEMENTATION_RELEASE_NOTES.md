# Implementation release notes

## This pass focused on

- masked preview before deposit
- preview-to-trip conversion
- embedded intake for an existing website
- revealed itinerary generation after deposit
- regenerative score detail + donation-link experience
- HTA family-farm cohort scoring override + Kahuku Farms seed example
- per-item score contributor visibility in the guest trip portal

## What changed in the repo

- Added `PreviewSession` lifecycle support in Prisma
- Added `/preview/[publicId]`
- Added `/embed/intake`
- Added `/api/preview-sessions`
- Added `/api/preview-sessions/[publicId]/convert`
- Updated trip portal to show pricing math and score detail
- Added donation recipient redirect tracking route
- Updated seed data with impact profiles and donation recipients
- Added `IMPACT_SCORING_RULES.md`
- Added Kahuku Farms as a seeded positive-score tour example
- Added score contributor cards on `/trip/[publicId]`

## Integration readiness

You can now integrate the intake + preview on a staging version of your existing website.

The fastest production path is:

1. deploy this repo
2. connect Postgres + Stripe
3. add a CTA or iframe to `/embed/intake`
4. complete the first real public-source adapter sprint
