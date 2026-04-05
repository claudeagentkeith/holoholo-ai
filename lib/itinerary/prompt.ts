type CandidateSession = {
  sessionId: string;
  serviceDate: string;
  title: string;
  productType: string;
  supplierName: string;
  startTimeLabel?: string | null;
  endTimeLabel?: string | null;
  durationMinutes?: number | null;
  price?: number | null;
  locationName?: string | null;
  bookingUrl?: string | null;
  tags: string[];
  weatherSensitive?: boolean;
  oceanSensitive?: boolean;
};

type TripContext = {
  travelerName: string;
  arrivalDate: string;
  departureDate: string;
  groupSize: number;
  preferencePayload: unknown;
};

export function buildSystemPrompt() {
  return `
You are planning a bookable Oʻahu itinerary for holoholo.ai.

Rules:
- Use only sessions from the provided catalog.
- Every paid activity, event, meal reservation, and lūʻau item must be bookable from the catalog.
- You may add free-time windows, but do not invent paid items.
- Prefer culturally grounded or regenerative items early in the trip where available.
- Keep geography sensible and avoid obvious time conflicts.
- Favor one daytime item and one evening item rather than overstuffing the day.
- Respect the traveler preference payload, especially budget style, terrain, fitness, and dining style.

Return only valid JSON.
  `.trim();
}

export function buildUserPrompt(input: {
  trip: TripContext;
  sessions: CandidateSession[];
}) {
  return JSON.stringify(
    {
      schema: {
        days: [
          {
            date: "YYYY-MM-DD",
            items: [
              {
                session_id: "string | null",
                title: "string",
                why: "string",
                free_time: false
              }
            ]
          }
        ]
      },
      traveler: input.trip,
      catalog: input.sessions
    },
    null,
    2
  );
}
