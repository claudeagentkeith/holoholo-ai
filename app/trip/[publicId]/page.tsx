export const dynamic = "force-dynamic";

import { AutoGenerateItinerary } from "@/components/auto-generate-itinerary";
import { ConfirmItineraryButton } from "@/components/confirm-itinerary-button";
import { GenerateItineraryButton } from "@/components/generate-itinerary-button";
import { ItineraryTimeline, type TimelineItem } from "@/components/itinerary-timeline";
import { SectionTitle } from "@/components/section-title";
import { StatusPill } from "@/components/status-pill";
import { StatCard } from "@/components/stat-card";
import { formatCurrency } from "@/lib/date";
import { getScoreBandLabel, parseImpactBreakdown } from "@/lib/impact";
import { formatPreferenceSummary, parsePreferencePayload } from "@/lib/preferences";
import { prisma } from "@/lib/prisma";

type TripPageProps = {
  params: Promise<{
    publicId: string;
  }>;
};

export default async function TripPortalPage({ params }: TripPageProps) {
  const { publicId } = await params;

  if (!prisma) {
    return (
      <div className="page-shell">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold text-volcanic">Database not configured</h1>
          <p className="mt-3 text-sm text-slate-600">Set DATABASE_URL, run prisma generate and prisma db push, then reseed the project.</p>
        </div>
      </div>
    );
  }

  const trip = await prisma.trip.findUnique({
    where: { publicId },
    include: {
      previewSession: {
        select: { publicId: true }
      },
      versions: {
        orderBy: { versionNumber: "desc" },
        include: {
          itineraryItems: {
            orderBy: [{ dayDate: "asc" }, { orderIndex: "asc" }]
          },
          impactAssessment: true
        }
      },
      bookings: {
        orderBy: { createdAt: "desc" },
        include: { bookingSource: true }
      },
      riskSignals: {
        where: { status: "OPEN" },
        orderBy: { detectedAt: "desc" }
      }
    }
  });

  if (!trip) {
    return (
      <div className="page-shell">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold text-volcanic">Trip not found</h1>
          <p className="mt-3 text-sm text-slate-600">The trip link may be invalid or expired.</p>
        </div>
      </div>
    );
  }

  const latestVersion = trip.versions[0];
  const preferences = parsePreferencePayload(trip.preferencePayload);
  const impact = latestVersion?.impactAssessment ?? null;
  const impactBreakdown = parseImpactBreakdown(impact?.breakdownJson);

  const donationRecipients = impact?.scoreBand === "NET_NEGATIVE"
    ? await prisma.donationRecipient.findMany({
        where: { island: trip.island, active: true },
        orderBy: { name: "asc" }
      })
    : [];

  const timelineItems: TimelineItem[] =
    latestVersion?.itineraryItems.map((item) => ({
      id: item.id,
      dayDate: item.dayDate,
      displayTitle: item.displayTitle,
      startTimeLabel: item.startTimeLabel,
      endTimeLabel: item.endTimeLabel,
      whyNote: item.whyNote,
      locationLabel: item.preciseLocationName ?? item.broadAreaLabel,
      supplierEstimatedSubtotal: item.supplierEstimatedSubtotal ? Number(item.supplierEstimatedSubtotal) : null,
      itemStatus: item.itemStatus,
      itemType: item.itemType,
      bookingUrl: item.bookingUrl
    })) ?? [];

  const shouldAutogenerate = Boolean(trip.depositCapturedAt && !latestVersion);

  return (
    <div className="page-shell space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ocean-700">Guest trip portal</div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-volcanic">{trip.travelerName}’s Oʻahu itinerary</h1>
            </div>
            <StatusPill value={trip.tripStatus} />
          </div>
          <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div>
              <div className="font-medium text-volcanic">Dates</div>
              <div>{new Date(trip.arrivalDate).toLocaleDateString()} – {new Date(trip.departureDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="font-medium text-volcanic">Group size</div>
              <div>{trip.groupSize}</div>
            </div>
            <div>
              <div className="font-medium text-volcanic">Preferences</div>
              <div>{formatPreferenceSummary(preferences)}</div>
            </div>
          </div>
          {trip.specialRequests ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <div className="font-medium text-volcanic">Special requests</div>
              <div className="mt-1">{trip.specialRequests}</div>
            </div>
          ) : null}
          {trip.previewSession ? (
            <div className="mt-4 text-sm text-slate-600">
              Started from masked preview <a href={`/preview/${trip.previewSession.publicId}`} className="font-medium text-ocean-700">{trip.previewSession.publicId}</a>
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <StatCard
            label="Planning deposit"
            value={formatCurrency(Number(trip.depositAmount))}
            hint={trip.depositCapturedAt ? "Captured" : "Awaiting payment"}
          />
          <StatCard
            label="Service fee balance"
            value={latestVersion?.serviceFeeBalanceDue ? formatCurrency(Number(latestVersion.serviceFeeBalanceDue)) : "Pending"}
            hint="15% fee on paid activities and events, net of the deposit credit"
          />
          <StatCard
            label="Regenerative / Eco"
            value={getScoreBandLabel(impact?.scoreBand as "NET_POSITIVE" | "BALANCED" | "NET_NEGATIVE" | null)}
            hint={impact ? `${Number(impact.normalizedScore)} score` : "Revealed after the deposit"}
          />
        </div>
      </section>

      <AutoGenerateItinerary tripId={trip.id} enabled={shouldAutogenerate} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Trip status" value={trip.tripStatus.replaceAll("_", " ")} />
        <StatCard label="Versions" value={String(trip.versions.length)} />
        <StatCard label="Booking records" value={String(trip.bookings.length)} />
        <StatCard label="Open alerts" value={String(trip.riskSignals.length)} />
      </section>

      <section className="card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionTitle
            eyebrow="Final confirmation"
            title="Review the revealed itinerary"
            description="Once the deposit is captured, holoholo.ai reveals the supplier names, pricing math, and the single regenerative score. Confirming here creates the supplier launch queue."
          />
          <div className="flex flex-wrap gap-3">
            {trip.depositCapturedAt ? <GenerateItineraryButton tripId={trip.id} /> : null}
            {latestVersion ? <ConfirmItineraryButton tripId={trip.id} /> : null}
          </div>
        </div>
        {latestVersion ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Supplier subtotal" value={formatCurrency(Number(latestVersion.supplierSubtotal ?? 0))} />
            <StatCard label="Service fee" value={formatCurrency(Number(latestVersion.serviceFeeAmount ?? 0))} hint="15% on fee-eligible items" />
            <StatCard label="Deposit credit" value={`-${formatCurrency(Number(latestVersion.depositCreditApplied ?? 0))}`} />
            <StatCard label="Estimated total" value={formatCurrency(Number(latestVersion.allInEstimatedTotal ?? 0))} hint={latestVersion.confirmationWindowExpiresAt ? `Confirm by ${new Date(latestVersion.confirmationWindowExpiresAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` : undefined} />
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">Capture the deposit to build the first revealed itinerary version.</p>
        )}
      </section>

      {impact ? (
        <section className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-slate-500">Regenerative / Eco score</div>
              <div className="mt-1 text-xl font-semibold text-volcanic">{Number(impact.normalizedScore)} · {getScoreBandLabel(impact.scoreBand as "NET_POSITIVE" | "BALANCED" | "NET_NEGATIVE")}</div>
            </div>
            <StatusPill value={impact.scoreBand} />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">{impact.summary}</p>
          {impactBreakdown.length ? (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-medium text-volcanic">Score contributors</div>
              <div className="mt-3 space-y-3">
                {impactBreakdown.map((entry) => (
                  <div key={`${entry.productId}-${entry.title}`} className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-volcanic">{entry.title}</div>
                        {entry.rationale ? <div className="mt-1 text-sm text-slate-600">{entry.rationale}</div> : null}
                      </div>
                      <div className={`rounded-full px-3 py-1 text-sm font-semibold ${entry.score > 0 ? "bg-emerald-100 text-emerald-700" : entry.score < 0 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                        {entry.score > 0 ? `+${entry.score}` : entry.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {impact.scoreBand === "NET_NEGATIVE" && donationRecipients.length ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="font-medium text-volcanic">Support local regenerative projects on Oʻahu</div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Suggested donation amount: {impact.suggestedDonationAmount ? formatCurrency(Number(impact.suggestedDonationAmount)) : "TBD"}. Donations happen directly on the recipient’s site in V1.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {donationRecipients.map((recipient) => (
                  <a
                    key={recipient.id}
                    href={`/donate/${impact.id}/${recipient.id}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 no-underline hover:border-ocean-300"
                  >
                    <div className="font-medium text-volcanic">{recipient.name}</div>
                    <div className="mt-1 text-sm text-slate-600">Open donation page</div>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {latestVersion ? (
        <section className="space-y-4">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-500">Current version</div>
                <div className="mt-1 text-xl font-semibold text-volcanic">Version {latestVersion.versionNumber}</div>
              </div>
              <StatusPill value={latestVersion.status} />
            </div>
            {latestVersion.summaryText ? <p className="mt-4 text-sm leading-6 text-slate-600">{latestVersion.summaryText}</p> : null}
          </div>
          <ItineraryTimeline items={timelineItems} />
        </section>
      ) : (
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-volcanic">No revealed itinerary yet</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The masked preview came first. Once the deposit is captured, this page builds and reveals the real itinerary automatically.
          </p>
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-volcanic">Booking launch queue</h2>
          <div className="mt-4 space-y-3">
            {trip.bookings.length ? (
              trip.bookings.map((booking) => (
                <div key={booking.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-volcanic">{booking.bookingSource?.label ?? "Supplier checkout"}</div>
                      <div className="text-sm text-slate-600">{booking.bookingReference ?? "Reference pending"}</div>
                    </div>
                    <StatusPill value={booking.status} />
                  </div>
                  {booking.bookingSource?.url ? (
                    <div className="mt-3">
                      <a href={booking.bookingSource.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-ocean-700">
                        Open booking page
                      </a>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">No booking launches yet. Confirm the itinerary to create booking records and supplier checkout links.</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-volcanic">Open alerts</h2>
          <div className="mt-4 space-y-3">
            {trip.riskSignals.length ? (
              trip.riskSignals.map((signal) => (
                <div key={signal.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-medium text-volcanic">{signal.type.replaceAll("_", " ")}</div>
                    <StatusPill value={signal.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{signal.summary}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">No open alerts yet. Wire official monitoring pollers to turn external signals into replan suggestions here.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
