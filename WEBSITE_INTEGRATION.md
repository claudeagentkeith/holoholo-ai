# Website integration guide

## What is ready now

The masked-preview flow is ready to plug into an existing website.

That means a visitor can:

1. open the holoholo intake from your current site
2. submit trip preferences
3. receive a masked itinerary preview with a score band and price estimate
4. decide whether to proceed with the $15 planning deposit

## Integration options

### Option A — fastest

Link a primary CTA on your current site to:

```text
/embed/intake
```

In deployment, that becomes something like:

```html
<a href="https://YOUR-HOLOHOLO-APP/embed/intake">Plan my Oʻahu itinerary</a>
```

This is the fastest, lowest-risk path because the intake and preview live in the holoholo app while your current site stays unchanged.

### Option B — embedded iframe

Embed the intake route inside your current site layout:

```html
<iframe
  src="https://YOUR-HOLOHOLO-APP/embed/intake"
  title="holoholo.ai itinerary planner"
  style="width:100%;min-height:1800px;border:0;border-radius:24px;"
  loading="lazy"
></iframe>
```

Use this when you want the flow to appear native inside the existing site before you do deeper frontend integration.

## Recommended rollout

### Phase 1 — this week

Deploy the app to a staging URL and connect:

- PostgreSQL
- Stripe
- seed data

Then add either a CTA link or iframe to the existing website.

### Phase 2 — next 1 to 2 weeks

Replace seed inventory with the first real public-source adapters.

Priority order:

- timed-entry / official booking pages
- direct activity pages
- restaurant platforms
- lūʻau package pages
- event ticketing pages

### Phase 3 — after adapter confidence is acceptable

Move from “preview + revealed itinerary + launch queue” to a production-ready booking workflow with:

- email/SMS
- final service-fee checkout
- monitoring alerts
- change requests

## Honest readiness assessment

You can start integrating the **front-end intake and masked preview immediately after deployment**.

You should wait before calling it fully live for paid acquisition until:

- at least the first real supplier adapters are in place
- deposit emails are live
- the final confirmation/payment path is wired

## Best answer to “when can I plug this into my existing website?”

**Staging integration:** same week

**Public soft launch on your site:** after 1 focused adapter sprint

**Production booking confidence:** after 2–3 focused implementation weeks, assuming you keep the first launch narrow and stay Oʻahu-only
