import { format } from "date-fns";
import { StatusPill } from "@/components/status-pill";

export type TimelineItem = {
  id: string;
  dayDate: string | Date;
  displayTitle: string;
  startTimeLabel?: string | null;
  endTimeLabel?: string | null;
  whyNote?: string | null;
  locationLabel?: string | null;
  supplierEstimatedSubtotal?: number | null;
  itemStatus: string;
  itemType: string;
  bookingUrl?: string | null;
};

function formatMoney(amount?: number | null) {
  if (amount == null) return "TBD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

export function ItineraryTimeline({ items }: { items: TimelineItem[] }) {
  const grouped = items.reduce<Record<string, TimelineItem[]>>((acc, item) => {
    const key = format(new Date(item.dayDate), "yyyy-MM-dd");
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([day, dayItems]) => (
        <section key={day} className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-volcanic">{format(new Date(day), "EEEE, MMM d")}</h3>
            <div className="text-sm text-slate-500">
              {dayItems.length} block{dayItems.length === 1 ? "" : "s"}
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {dayItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-volcanic">{item.displayTitle}</div>
                    <div className="mt-1 text-sm text-slate-600">
                      {[item.startTimeLabel, item.endTimeLabel].filter(Boolean).join("–") || "Flexible"}
                      {item.locationLabel ? ` • ${item.locationLabel}` : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill value={item.itemStatus} />
                    <div className="text-sm font-medium text-volcanic">{formatMoney(item.supplierEstimatedSubtotal)}</div>
                  </div>
                </div>
                {item.whyNote ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.whyNote}</p> : null}
                {item.bookingUrl ? (
                  <div className="mt-3">
                    <a href={item.bookingUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-ocean-700">
                      Open supplier checkout
                    </a>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
