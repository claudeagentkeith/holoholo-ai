import { SectionTitle } from "@/components/section-title";
import { TripRequestForm } from "@/components/trip-request-form";
import { StatCard } from "@/components/stat-card";

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ocean-700">Comprehensive Oʻahu itineraries</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-volcanic sm:text-5xl">
            Show the masked plan first, then take the deposit.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            This build now follows the V1.1 lifecycle: preferences in, masked preview out, then the $15 planning deposit,
            revealed itinerary, final confirmation, supplier launch links, and trip monitoring. It keeps the original Next.js + Prisma + Stripe foundation from the initial build spec, but updates the traveler funnel to match the revised product logic.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="Pilot island" value="Oʻahu" hint="Hotels and transport stay outside booking for V1." />
            <StatCard label="Planning deposit" value="$15" hint="Shown only after the masked preview." />
            <StatCard label="Booking scope" value="Bookable only" hint="Paid itinerary items must come from supported public sources." />
          </div>
        </div>
        <div className="card overflow-hidden bg-gradient-to-br from-ocean-50 to-white p-6">
          <SectionTitle
            eyebrow="How the current implementation works"
            title="Preview → deposit → reveal → confirm"
            description="This is the first integration-ready funnel for plugging holoholo.ai into an existing site."
          />
          <ol className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
            <li><span className="font-semibold text-volcanic">1.</span> Traveler sets dates, event types, budget style, terrain, fitness, and other trip preferences.</li>
            <li><span className="font-semibold text-volcanic">2.</span> holoholo.ai builds a masked, bookable structure with time blocks, broad areas, cost estimate, and score band.</li>
            <li><span className="font-semibold text-volcanic">3.</span> The traveler decides whether to continue with the non-refundable $15 planning deposit.</li>
            <li><span className="font-semibold text-volcanic">4.</span> After deposit, the trip portal reveals the full itinerary, detailed score, service fee math, and supplier launch queue.</li>
          </ol>
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle
          eyebrow="Trip intake"
          title="Start with the masked preview"
          description="The same intake component can live on the main site, a dedicated subpage, or an embedded route on your existing website."
        />
        <TripRequestForm />
      </section>
    </div>
  );
}
