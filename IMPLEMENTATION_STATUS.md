# Implementation status

## Included now

- Masked preview before deposit
- Preview-to-trip conversion flow
- Oʻahu-only traveler intake with budget, terrain, fitness, dining, and event-type preferences
- Required phone capture plus SMS opt-in for operational alerts
- Auto-generation of the revealed itinerary after deposit
- Versioned itinerary storage with service-fee pricing fields
- Single Regenerative / Eco score with detailed post-deposit assessment
- Direct outbound donation links for island-specific recipients when the score is net negative
- Embedded intake route for plugging the product into an existing marketing site
- Updated schema for preview sessions, impact scoring, change requests, notifications, and donation tracking
- Seeded Oʻahu bookable inventory plus HTA-cohort donation recipients, including a Kahuku Farms positive-scoring example for the guided tour experience
- Item-level score contributor display on the guest trip portal

## Still stubbed

- Production email + SMS delivery
- Supplier-specific adapters and browser automation
- True preliminary cart/hold execution against real supplier pages
- Final service-fee checkout collection
- Daily monitoring jobs and traveler-approved replan suggestions
- Change-request quoting and approval workflow
- Signed magic-link auth

## Best next engineering sprint

1. Wave 1 adapters: timed-entry, direct activity booking, and restaurant platforms
2. Email/SMS layer for deposit receipt, itinerary ready, and confirmation request
3. Service-fee checkout collection on the final confirmation step
4. Daily monitoring workers and replan suggestion queue
