export type PendingRiskCheck = {
  tripId: string;
  itineraryItemId?: string;
  signalType: "WEATHER" | "OCEAN_SAFETY" | "WATER_QUALITY" | "JELLYFISH" | "LOCAL_EVENT";
  reason: string;
};

export function derivePendingRiskChecks(
  items: Array<{
    id: string;
    metadata?: unknown;
  }>,
  tripId: string
): PendingRiskCheck[] {
  return items.flatMap((item) => {
    const metadata = (item.metadata ?? {}) as Record<string, unknown>;
    const checks: PendingRiskCheck[] = [];

    if (metadata.weatherSensitive) {
      checks.push({
        tripId,
        itineraryItemId: item.id,
        signalType: "WEATHER",
        reason: "Item is weather-sensitive and should be checked against forecast windows."
      });
    }

    if (metadata.oceanSensitive) {
      checks.push({
        tripId,
        itineraryItemId: item.id,
        signalType: "OCEAN_SAFETY",
        reason: "Item uses ocean conditions and should be checked against surf and safety guidance."
      });
    }

    return checks;
  });
}
