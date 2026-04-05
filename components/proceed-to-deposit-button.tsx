"use client";

import { useState } from "react";

export function ProceedToDepositButton({ previewPublicId }: { previewPublicId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const convertResponse = await fetch(`/api/preview-sessions/${previewPublicId}/convert`, {
        method: "POST"
      });
      const convertJson = (await convertResponse.json()) as { tripId?: string; error?: string };
      if (!convertResponse.ok || !convertJson.tripId) {
        throw new Error(convertJson.error ?? "Unable to convert preview.");
      }

      const depositResponse = await fetch("/api/payments/deposit", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          tripId: convertJson.tripId
        })
      });

      const depositJson = (await depositResponse.json()) as { url?: string; error?: string };
      if (!depositResponse.ok || !depositJson.url) {
        throw new Error(depositJson.error ?? "Unable to start deposit checkout.");
      }

      window.location.href = depositJson.url;
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
        className="rounded-xl bg-volcanic px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Starting deposit checkout..." : "Proceed with the $15 planning deposit"}
      </button>
      {error ? <div className="mt-2 text-sm text-coral">{error}</div> : null}
    </div>
  );
}
