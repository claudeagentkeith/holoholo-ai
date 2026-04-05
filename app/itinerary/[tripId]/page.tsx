export const dynamic = "force-dynamic";

import { ItineraryTimeline, type TimelineItem } from "@/components/itinerary-timeline";
import { SectionTitle } from "@/components/section-title";
import { prisma } from "@/lib/prisma";

type ItineraryPageProps = {
  params: Promise<{
    tripId: string;
  }>;
};

export default async function InternalItineraryPage({ params }: ItineraryPageProps) {
  const { tripId } = await params;

  if (!prisma) {
    return (
      <div className="page-shell">
        <div className="card p-6">Database not configured.</div>
      </div>
    );
  }

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      versions: {
        orderBy: { versionNumber: "desc" },
        include: {
          itineraryItems: {
            orderBy: [{ dayDate: "asc" }, { orderIndex: "asc" }]
          },
          impactAssessment: true
        }
      }
    }
  });

  if (!trip || !trip.versions[0]) {
    return (
      <div className="page-shell">
        <div className="card p-6">No itinerary found for this trip.</div>
      </div>
    );
  }

  const latest = trip.versions[0];
  const items: TimelineItem[] = latest.itineraryItems.map((item) => ({
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
  }));

  return (
    <div className="page-shell space-y-6">
      <SectionTitle
        eyebrow="Internal itinerary view"
        title={`Trip ${trip.id}`}
        description={`Latest version ${latest.versionNumber}. Use the public trip portal for the guest-facing flow.`}
      />
      <ItineraryTimeline items={items} />
    </div>
  );
}
