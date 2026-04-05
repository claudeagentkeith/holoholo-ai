export const INTEREST_OPTIONS = [
  { value: "regenerative", label: "Regenerative / give-back" },
  { value: "culture", label: "Culture and heritage" },
  { value: "luau", label: "Lūʻau / evening shows" },
  { value: "ocean", label: "Ocean activities" },
  { value: "food", label: "Bookable meals" },
  { value: "family", label: "Family friendly" },
  { value: "adventure", label: "Adventure" }
] as const;

export const BUDGET_OPTIONS = [
  { value: "value", label: "Cost-effective" },
  { value: "balanced", label: "Balanced" },
  { value: "luxury", label: "Luxury" }
] as const;

export const TERRAIN_OPTIONS = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "mixed", label: "Mixed" }
] as const;

export const FITNESS_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "active", label: "Active" }
] as const;

export const DINING_OPTIONS = [
  { value: "casual", label: "Casual" },
  { value: "mixed", label: "Mixed" },
  { value: "elevated", label: "Elevated" }
] as const;

export type BudgetTier = (typeof BUDGET_OPTIONS)[number]["value"];
export type TerrainPreference = (typeof TERRAIN_OPTIONS)[number]["value"];
export type FitnessLevel = (typeof FITNESS_OPTIONS)[number]["value"];
export type DiningStyle = (typeof DINING_OPTIONS)[number]["value"];

export type PreferencePayload = {
  interests: string[];
  budgetTier: BudgetTier;
  terrainPreference: TerrainPreference;
  fitnessLevel: FitnessLevel;
  diningStyle: DiningStyle;
  specialRequests?: string | null;
};

export type PartyProfile = {
  travelerName?: string | null;
  travelerEmail?: string | null;
  travelerPhone?: string | null;
  smsAlertsRequested?: boolean;
};

const LABELS: Record<string, string> = {
  value: "Cost-effective",
  balanced: "Balanced",
  luxury: "Luxury",
  beach: "Beach",
  mountain: "Mountain",
  mixed: "Mixed",
  easy: "Easy",
  moderate: "Moderate",
  active: "Active",
  casual: "Casual",
  elevated: "Elevated"
};

export function getLabelForPreference(value?: string | null) {
  if (!value) return "—";
  return LABELS[value] ?? value;
}

export function buildPreferencePayload(input: {
  interests: string[];
  budgetTier: BudgetTier;
  terrainPreference: TerrainPreference;
  fitnessLevel: FitnessLevel;
  diningStyle: DiningStyle;
  specialRequests?: string | null;
}): PreferencePayload {
  return {
    interests: input.interests,
    budgetTier: input.budgetTier,
    terrainPreference: input.terrainPreference,
    fitnessLevel: input.fitnessLevel,
    diningStyle: input.diningStyle,
    specialRequests: input.specialRequests ?? null
  };
}

export function parsePreferencePayload(value: unknown): PreferencePayload {
  const payload = (value ?? {}) as Record<string, unknown>;
  return {
    interests: Array.isArray(payload.interests)
      ? payload.interests.filter((entry): entry is string => typeof entry === "string")
      : [],
    budgetTier: (payload.budgetTier as BudgetTier) ?? "balanced",
    terrainPreference: (payload.terrainPreference as TerrainPreference) ?? "mixed",
    fitnessLevel: (payload.fitnessLevel as FitnessLevel) ?? "moderate",
    diningStyle: (payload.diningStyle as DiningStyle) ?? "mixed",
    specialRequests: typeof payload.specialRequests === "string" ? payload.specialRequests : null
  };
}

export function formatPreferenceSummary(payload: PreferencePayload) {
  return [
    getLabelForPreference(payload.budgetTier),
    getLabelForPreference(payload.terrainPreference),
    `${getLabelForPreference(payload.fitnessLevel)} fitness`,
    `${getLabelForPreference(payload.diningStyle)} dining`
  ].join(" · ");
}
