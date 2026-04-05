"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function AutoGenerateItinerary({ tripId, enabled }: { tripId: string; enabled: boolean }) {
  const router = useRouter();
  const started = useRef(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;

    const run = async () => {
      try {
        const response = await fetch("/api/itineraries/generate", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ tripId })
        });

        const json = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(json.error ?? "Unable to generate itinerary.");
        }

        router.refresh();
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Unexpected error");
      }
    };

    void run();
  }, [enabled, router, tripId]);

  if (!enabled) return null;

  return (
    <div className="rounded-2xl border border-ocean-200 bg-ocean-50 p-4 text-sm text-slate-700">
      <div className="font-medium text-volcanic">Building the preliminary itinerary…</div>
      <div className="mt-1">The deposit is captured, and holoholo.ai is now building the revealed itinerary and score breakdown.</div>
      {error ? <div className="mt-2 text-coral">{error}</div> : null}
    </div>
  );
}
