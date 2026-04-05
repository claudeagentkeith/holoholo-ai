"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ConfirmItineraryButton({ tripId }: { tripId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/trips/${tripId}/confirm`, {
        method: "POST"
      });

      const json = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(json.error ?? "Unable to confirm itinerary.");
      }

      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected error");
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="rounded-xl bg-leaf px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Confirming..." : "Confirm final itinerary"}
      </button>
      {error ? <div className="mt-2 text-sm text-coral">{error}</div> : null}
    </div>
  );
}
