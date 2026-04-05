# Impact scoring rules (V1.1 update)

## What changed

The V1.1 scoring model now supports a positive override for **guided farm experiences** operated by **family-owned farms in the HTA CTC–Regenerative Experiences cohort**.

This keeps the public score simple while making the underlying scoring more faithful to holoholo.ai's regenerative lens.

## Current rule

A bookable item should score **positive** when all of the following are true:

- the supplier is part of the **HTA CTC–Regenerative Experiences cohort**
- the supplier is a **family-owned farm**
- the booked SKU is the **farm experience itself** (for example, a guided farm tour or hands-on farm learning experience)

For V1, these items receive a **+18** score unless a manual override is set.

## Important exception

This positive override does **not** automatically apply to every SKU sold by the same operator.

Examples of items that should remain **neutral by default** in V1:

- café purchases
- walk-up food orders
- retail / gift items
- other non-restorative purchases that do not directly deliver the farm experience

## Example included in the seed data

- **Kahuku Farms Guided Tour** → **+18**

The seed implementation also exposes this in the trip portal via the **Score contributors** section, so the per-item contribution can be seen after the deposit reveals the itinerary.
