export type ScoreBand = "NET_POSITIVE" | "BALANCED" | "NET_NEGATIVE";

export type ImpactProfile = {
  direction: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  baseScore: number;
  rationale?: string | null;
};

export type ImpactBreakdownEntry = {
  productId: string;
  title: string;
  score: number;
  rationale?: string | null;
};

export type ImpactAssessment = {
  normalizedScore: number;
  scoreBand: ScoreBand;
  positiveItemCount: number;
  negativeItemCount: number;
  suggestedDonationAmount: number | null;
  summary: string;
  breakdown: ImpactBreakdownEntry[];
};

export function getScoreBand(score: number): ScoreBand {
  if (score >= 12) return "NET_POSITIVE";
  if (score <= -12) return "NET_NEGATIVE";
  return "BALANCED";
}

export function getScoreBandLabel(band?: ScoreBand | null) {
  if (band === "NET_POSITIVE") return "Net Positive";
  if (band === "NET_NEGATIVE") return "Net Negative";
  return "Balanced";
}

export function getSuggestedDonationAmount(score: number) {
  if (score >= 0) return null;
  const base = Math.max(15, Math.ceil(Math.abs(score) / 10) * 15);
  return base;
}

export function buildImpactSummary(input: {
  scoreBand: ScoreBand;
  positiveItemCount: number;
  negativeItemCount: number;
}) {
  if (input.scoreBand === "NET_POSITIVE") {
    return `This itinerary leans regenerative overall, with ${input.positiveItemCount} experience${input.positiveItemCount === 1 ? "" : "s"} materially improving the trip’s balance.`;
  }

  if (input.scoreBand === "NET_NEGATIVE") {
    return `This itinerary currently includes ${input.negativeItemCount} higher-impact item${input.negativeItemCount === 1 ? "" : "s"}. Consider a local regenerative add-on or a direct donation to improve the trip’s balance.`;
  }

  return "This itinerary is broadly balanced: most items are neutral, with no strong positive or negative swing yet.";
}

export function deriveImpactAssessment(
  profiles: Array<{
    productId: string;
    title: string;
    profile?: ImpactProfile | null;
  }>
): ImpactAssessment {
  const scored: ImpactBreakdownEntry[] = profiles.map((entry) => ({
    productId: entry.productId,
    title: entry.title,
    score: Number(entry.profile?.baseScore ?? 0),
    rationale: entry.profile?.rationale ?? null
  }));

  const normalizedScore = Number(
    (scored.length
      ? scored.reduce((sum, entry) => sum + entry.score, 0) / scored.length
      : 0
    ).toFixed(2)
  );
  const positiveItemCount = scored.filter((entry) => entry.score > 0).length;
  const negativeItemCount = scored.filter((entry) => entry.score < 0).length;
  const scoreBand = getScoreBand(normalizedScore);

  return {
    normalizedScore,
    scoreBand,
    positiveItemCount,
    negativeItemCount,
    suggestedDonationAmount: getSuggestedDonationAmount(normalizedScore),
    summary: buildImpactSummary({ scoreBand, positiveItemCount, negativeItemCount }),
    breakdown: scored
  };
}

export function parseImpactBreakdown(input: unknown): ImpactBreakdownEntry[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.flatMap((entry) => {
    if (!entry || typeof entry !== "object") {
      return [];
    }

    const record = entry as Record<string, unknown>;
    const productId = typeof record.productId === "string" ? record.productId : "unknown";
    const title = typeof record.title === "string" ? record.title : "Untitled item";
    const score = typeof record.score === "number" ? record.score : Number(record.score ?? 0);
    const rationale = typeof record.rationale === "string" ? record.rationale : null;

    return [{ productId, title, score: Number.isFinite(score) ? score : 0, rationale }];
  });
}
