export const dynamic = "force-dynamic";

import { ProceedToDepositButton } from "@/components/proceed-to-deposit-button";
import { SectionTitle } from "@/components/section-title";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { formatCurrency } from "@/lib/date";
import { getScoreBandLabel } from "@/lib/impact";
import { formatPreferenceSummary, parsePreferencePayload } from "@/lib/preferences";
import { prisma } from "@/lib/prisma";

type PreviewPageProps = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { publicId } = await params;

  if (!prisma) {
    return (
      <div className="page-shell">
        <div className="card p-6">Database not configured.</div>
      </div>
    );
  }

  const preview = await prisma.previewSession.findUnique({
    where: { publicId },
    include: {
      trip: {
        select: {
          publicId: true
        }
      }
    }
  });

  if (!preview) {
    return (
      <div className="page-shell">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold text-volcanic">Preview not found</h1>
          <p className="mt-3 text-sm text-slate-600">The masked preview may have expired or the link is invalid.</p>
        </div>
      </div>
    );
  }

  const preferences = parsePreferencePayload(preview.preferencePayload);
  const summary = (preview.maskedSummary ?? { days: [] }) as {
    days?: Array<{
      date: string;
      items: Array<{
        title: string;
        broadAreaLabel?: string;
        startTimeLabel?: string;
        endTimeLabel?: string;
        estimatedCost?: number;
        why?: string;
      }>;
    }>;
  };

  return (
    <div className="page-shell space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ocean-700">Masked preview</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-volcanic">Proposed Oʻahu itinerary preview</h1>
            </div>
            <StatusPill value={preview.status} />
          </div>
          <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div>
              <div className="font-medium text-volcanic">Dates</div>
              <div>{new Date(preview.arrivalDate).toLocaleDateString()} – {new Date(preview.departureDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="font-medium text-volcanic">Group size</div>
              <div>{preview.groupSize}</div>
            </div>
            <div>
              <div className="font-medium text-volcanic">Preferences</div>
              <div>{formatPreferenceSummary(preferences)}</div>
            </div>
          </div>
          {preferences.specialRequests ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="font-medium text-volcanic">Special requests</div>
              <div className="mt-1">{preferences.specialRequests}</div>
            </div>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard
            label="Estimated trip total"
            value={
              preview.maskedPriceEstimateMin != null && preview.maskedPriceEstimateMax != null
                ? `${formatCurrency(Number(preview.maskedPriceEstimateMin))} – ${formatCurrency(Number(preview.maskedPriceEstimateMax))}`
                : "Calculating"
            }
            hint="Masked estimate before the planning deposit"
          />
          <StatCard
            label="Regenerative / Eco"
            value={getScoreBandLabel(preview.scoreBand as "NET_POSITIVE" | "BALANCED" | "NET_NEGATIVE" | null)}
            hint="Detailed score is revealed only after the deposit"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="What we can accommodate"
            title="Feasible, bookable structure"
            description="Supplier names, exact venues, and direct booking URLs stay masked until you decide to proceed with planning."
          />
          {summary.days?.length ? (
            <div className="space-y-4">
              {summary.days.map((day) => (
                <section key={day.date} className="card p-6">
                  <div className="text-lg font-semibold text-volcanic">{new Date(day.date).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}</div>
                  <div className="mt-4 space-y-3">
                    {day.items.map((item, index) => (
                      <div key={`${day.date}-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="font-medium text-volcanic">{item.title}</div>
                            <div className="mt-1 text-sm text-slate-600">
                              {[item.startTimeLabel, item.endTimeLabel].filter(Boolean).join("–") || "Flexible"}
                              {item.broadAreaLabel ? ` • ${item.broadAreaLabel}` : ""}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-volcanic">
                            {item.estimatedCost != null ? formatCurrency(Number(item.estimatedCost)) : "Included"}
                          </div>
                        </div>
                        {item.why ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.why}</p> : null}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="card p-6 text-sm text-slate-600">The preview is still generating.</div>
          )}
        </div>

        <div className="space-y-6">
          <section className="card p-6">
            <SectionTitle
              eyebrow="Why use holoholo.ai"
              title="A planning layer, not just a list"
              description="The deposit starts live verification, supplier linking, and the revealed itinerary build."
            />
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <li>• Mixed-category itinerary that stays bookable across activities, lūʻau, meals, and events.</li>
              <li>• A revealed version with exact suppliers, detailed pricing, and a single regenerative score after the deposit.</li>
              <li>• One guest trip link for confirmations, change requests, reminders, and daily monitoring later in the trip.</li>
            </ul>
          </section>

          <section className="card p-6">
            <div className="text-lg font-semibold text-volcanic">Ready to continue?</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The $15 planning deposit is non-refundable, but it is applied against the holoholo service fee when the final itinerary is confirmed.
            </p>
            <div className="mt-4">
              {preview.trip ? (
                <a href={`/trip/${preview.trip.publicId}`} className="inline-flex rounded-xl bg-volcanic px-5 py-3 text-sm font-semibold text-white no-underline hover:opacity-90">
                  Open the trip portal
                </a>
              ) : (
                <ProceedToDepositButton previewPublicId={preview.publicId} />
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
