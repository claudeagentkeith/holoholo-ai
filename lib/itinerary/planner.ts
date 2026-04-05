import { addMinutes, compareAsc, format, isSameDay } from "date-fns";
import { getAnthropic } from "@/lib/anthropic";
import { enumerateTripDates } from "@/lib/date";
import { deriveImpactAssessment } from "@/lib/impact";
import { buildUserPrompt, buildSystemPrompt } from "@/lib/itinerary/prompt";
import { getBroadAreaLabel, getMaskedLocationHint, getMaskedTitle } from "@/lib/masking";
import { parsePreferencePayload, type PreferencePayload } from "@/lib/preferences";
import { computeVersionPricing } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";

type SessionCandidate = {
  id: string;
  serviceDate: Date;
  startAt?: Date | null;
  endAt?: Date | null;
  startTimeLabel?: string | null;
  endTimeLabel?: string | null;
  price?: number | null;
  seatsRemaining?: number | null;
  bookingUrl?: string | null;
  status: string;
  holdType?: string | null;
  bookingSourceId?: string | null;
  product: {
    id: string;
    title: string;
    type: string;
    durationMinutes?: number | null;
    maxGuests?: number | null;
    serviceFeeEligible?: boolean | null;
    locationName?: string | null;
    weatherSensitive: boolean;
    oceanSensitive: boolean;
    localEventSensitive: boolean;
    categoryTags: string[];
    supplier: {
      id: string;
      name: string;
      island: string;
    };
    impactProfile?: {
      direction: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
      baseScore: unknown;
      rationale?: string | null;
    } | null;
  };
};

type DraftItem = {
  dayDate: Date;
  displayTitle: string;
  broadAreaLabel?: string | null;
  preciseLocationName?: string | null;
  startTimeLabel?: string | null;
  endTimeLabel?: string | null;
  supplierEstimatedSubtotal?: number | null;
  feeEligible: boolean;
  whyNote: string;
  itemType: "BOOKABLE_ITEM" | "FREE_TIME";
  itemStatus: "VERIFIED" | "PROPOSED";
  verificationStatus: "VERIFIED" | "PROPOSED";
  productId?: string | null;
  sessionId?: string | null;
  bookingUrl?: string | null;
  holdType?: string | null;
  holdExpiresAt?: Date | null;
  maskedPreviewPayload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  productType?: string | null;
  impactProfile?: {
    direction: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
    baseScore: number;
    rationale?: string | null;
  } | null;
};

type PlannedDraft = {
  items: DraftItem[];
  summaryText: string;
};

function extractTextContent(content: unknown) {
  if (!Array.isArray(content)) return "";
  return content
    .map((chunk) => {
      if (chunk && typeof chunk === "object" && "type" in chunk && (chunk as { type?: string }).type === "text") {
        return (chunk as { text?: string }).text ?? "";
      }
      return "";
    })
    .join("\n");
}

function extractJsonObject(raw: string) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as {
      days: Array<{
        date: string;
        items: Array<{
          session_id: string | null;
          title: string;
          why: string;
          free_time: boolean;
        }>;
      }>;
    };
  } catch {
    return null;
  }
}

function numeric(value: unknown) {
  return Number(typeof value === "object" && value && "toString" in (value as Record<string, unknown>) ? (value as { toString: () => string }).toString() : value ?? 0);
}

function terrainBoost(candidate: SessionCandidate, preference: PreferencePayload["terrainPreference"]) {
  const tags = candidate.product.categoryTags.map((tag) => tag.toLowerCase());
  const location = (candidate.product.locationName ?? "").toLowerCase();
  if (preference === "beach") {
    if (tags.includes("ocean") || location.includes("waik") || location.includes("harbor")) return 8;
    if (location.includes("valley") || location.includes("trail") || location.includes("manoa")) return -4;
  }
  if (preference === "mountain") {
    if (location.includes("valley") || location.includes("trail") || location.includes("manoa") || tags.includes("adventure")) return 8;
    if (tags.includes("ocean") || location.includes("harbor")) return -4;
  }
  return 0;
}

function fitnessBoost(candidate: SessionCandidate, preference: PreferencePayload["fitnessLevel"]) {
  const duration = candidate.product.durationMinutes ?? 120;
  const tags = candidate.product.categoryTags.map((tag) => tag.toLowerCase());
  if (preference === "easy") {
    if (duration <= 150 || tags.includes("family") || candidate.product.type === "DINING") return 6;
    if (duration >= 240 || tags.includes("adventure")) return -6;
  }
  if (preference === "active") {
    if (duration >= 180 || tags.includes("adventure")) return 6;
    if (candidate.product.type === "DINING") return -2;
  }
  return 0;
}

function budgetBoost(candidate: SessionCandidate, preference: PreferencePayload["budgetTier"]) {
  const price = candidate.price ?? 0;
  if (preference === "value") {
    if (price <= 110) return 8;
    if (price >= 180) return -6;
  }
  if (preference === "luxury") {
    if (price >= 160) return 8;
    if (price <= 100) return -2;
  }
  return 0;
}

function diningBoost(candidate: SessionCandidate, preference: PreferencePayload["diningStyle"]) {
  const price = candidate.price ?? 0;
  if (candidate.product.type !== "DINING") return 0;
  if (preference === "casual") return price <= 160 ? 6 : -3;
  if (preference === "elevated") return price >= 160 ? 6 : -2;
  return 3;
}

function interestScore(candidate: SessionCandidate, preferences: PreferencePayload, dayIndex: number) {
  let score = 0;
  const lowered = preferences.interests.map((item) => item.toLowerCase());
  const tags = candidate.product.categoryTags.map((tag) => tag.toLowerCase());

  for (const interest of lowered) {
    if (tags.some((tag) => tag.includes(interest) || interest.includes(tag))) {
      score += 20;
    }
  }

  if (dayIndex <= 1 && ["CULTURAL", "REGENERATIVE"].includes(candidate.product.type)) {
    score += 15;
  }

  if (candidate.product.type === "DINING") score += 4;
  if (candidate.product.type === "LUAU") score += 8;
  if (candidate.product.type === "EVENT") score += 4;
  if (candidate.product.type === "REGENERATIVE") score += 10;
  if (candidate.product.type === "CULTURAL") score += 12;
  if ((candidate.seatsRemaining ?? 99) < 4) score -= 4;

  score += terrainBoost(candidate, preferences.terrainPreference);
  score += fitnessBoost(candidate, preferences.fitnessLevel);
  score += budgetBoost(candidate, preferences.budgetTier);
  score += diningBoost(candidate, preferences.diningStyle);

  return score;
}

function asDraftItem(candidate: SessionCandidate, whyNote: string): DraftItem {
  const broadAreaLabel = getBroadAreaLabel(candidate.product.locationName);
  return {
    dayDate: candidate.serviceDate,
    displayTitle: `${candidate.product.title} · ${candidate.product.supplier.name}`,
    broadAreaLabel,
    preciseLocationName: candidate.product.locationName ?? null,
    startTimeLabel: candidate.startTimeLabel,
    endTimeLabel: candidate.endTimeLabel,
    supplierEstimatedSubtotal: candidate.price ?? null,
    feeEligible: candidate.product.serviceFeeEligible ?? true,
    whyNote,
    itemType: "BOOKABLE_ITEM",
    itemStatus: "VERIFIED",
    verificationStatus: "VERIFIED",
    productId: candidate.product.id,
    sessionId: candidate.id,
    bookingUrl: candidate.bookingUrl ?? null,
    holdType: candidate.holdType ?? "SOFT_VERIFY",
    holdExpiresAt: null,
    maskedPreviewPayload: {
      title: getMaskedTitle({ productType: candidate.product.type, categoryTags: candidate.product.categoryTags }),
      broadAreaLabel: getMaskedLocationHint(candidate.product.locationName),
      startTimeLabel: candidate.startTimeLabel,
      endTimeLabel: candidate.endTimeLabel,
      estimatedCost: candidate.price ?? null,
      why: whyNote,
      productType: candidate.product.type
    },
    metadata: {
      supplierId: candidate.product.supplier.id,
      supplierName: candidate.product.supplier.name,
      productType: candidate.product.type,
      weatherSensitive: candidate.product.weatherSensitive,
      oceanSensitive: candidate.product.oceanSensitive,
      localEventSensitive: candidate.product.localEventSensitive,
      categoryTags: candidate.product.categoryTags
    },
    productType: candidate.product.type,
    impactProfile: candidate.product.impactProfile
      ? {
          direction: candidate.product.impactProfile.direction,
          baseScore: numeric(candidate.product.impactProfile.baseScore),
          rationale: candidate.product.impactProfile.rationale ?? null
        }
      : null
  };
}

function hasTimeConflict(items: DraftItem[], candidate: SessionCandidate) {
  const candidateStart = candidate.startAt?.getTime();
  const candidateEnd = candidate.endAt?.getTime();

  return items.some((item) => {
    if (!item.metadata || !candidateStart || !candidateEnd) return false;
    const start = item.metadata.startAt ? new Date(String(item.metadata.startAt)).getTime() : null;
    const end = item.metadata.endAt ? new Date(String(item.metadata.endAt)).getTime() : null;
    if (!start || !end) return false;
    return candidateStart < end && candidateEnd > start;
  });
}

function buildFallbackDraft(
  context: {
    arrivalDate: Date;
    departureDate: Date;
    preferences: PreferencePayload;
  },
  candidates: SessionCandidate[]
): PlannedDraft {
  const usedSessionIds = new Set<string>();
  const items: DraftItem[] = [];
  const dates = enumerateTripDates(context.arrivalDate, context.departureDate);

  dates.forEach((day, dayIndex) => {
    const dayCandidates = candidates
      .filter((candidate) => isSameDay(candidate.serviceDate, day))
      .sort((a, b) => {
        const scoreDiff = interestScore(b, context.preferences, dayIndex) - interestScore(a, context.preferences, dayIndex);
        if (scoreDiff !== 0) return scoreDiff;
        return compareAsc(a.startAt ?? a.serviceDate, b.startAt ?? b.serviceDate);
      });

    const dayItems: DraftItem[] = [];
    let pickedEvening = false;

    for (const candidate of dayCandidates) {
      if (usedSessionIds.has(candidate.id)) continue;
      if (dayItems.length >= 2) break;

      const evening = (candidate.startAt?.getHours() ?? 0) >= 16;
      if (pickedEvening && evening) continue;
      if (hasTimeConflict(dayItems, candidate)) continue;

      const why =
        candidate.product.type === "REGENERATIVE"
          ? "Placed to anchor the trip in a give-back experience while keeping logistics manageable."
          : candidate.product.type === "CULTURAL"
            ? "Selected to add place-based context and cultural grounding without overloading the day."
            : candidate.product.type === "DINING"
              ? "Chosen to fit the day cleanly with a bookable dining window near the rest of the schedule."
              : "Chosen because it matches the traveler’s preferences and fits the day without overloading the schedule.";

      const item = asDraftItem(candidate, why);
      item.metadata = {
        ...(item.metadata ?? {}),
        startAt: candidate.startAt?.toISOString(),
        endAt: candidate.endAt?.toISOString()
      };
      dayItems.push(item);
      usedSessionIds.add(candidate.id);
      if (evening) pickedEvening = true;
    }

    items.push(...dayItems);

    const shouldLeaveBreathingRoom = dayIndex % 3 === 2 || dayItems.length <= 1;
    if (shouldLeaveBreathingRoom) {
      items.push({
        dayDate: day,
        displayTitle: "Free time window",
        broadAreaLabel: "Flexible",
        preciseLocationName: null,
        startTimeLabel: dayItems.length ? "Flexible" : "Afternoon",
        endTimeLabel: undefined,
        supplierEstimatedSubtotal: 0,
        feeEligible: false,
        whyNote: "Reserved for rest, beach time, neighborhood exploration, or to absorb local conditions before committing to more activity.",
        itemType: "FREE_TIME",
        itemStatus: "VERIFIED",
        verificationStatus: "VERIFIED",
        holdType: "NONE",
        holdExpiresAt: null,
        maskedPreviewPayload: {
          title: "Flexible exploration window",
          broadAreaLabel: "Flexible",
          estimatedCost: 0,
          why: "Reserved for rest or spontaneous local exploration."
        },
        metadata: {},
        productType: null,
        impactProfile: null
      });
    }
  });

  return {
    items,
    summaryText: "Deterministic planner used. Replace or augment with live AI ranking as supplier coverage expands."
  };
}

async function buildAnthropicDraft(
  context: {
    travelerName?: string | null;
    arrivalDate: Date;
    departureDate: Date;
    groupSize: number;
    preferences: PreferencePayload;
  },
  candidates: SessionCandidate[]
): Promise<PlannedDraft | null> {
  const anthropic = getAnthropic();
  if (!anthropic) return null;

  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
    temperature: 0.2,
    max_tokens: 3000,
    system: buildSystemPrompt(),
    messages: [
      {
        role: "user",
        content: buildUserPrompt({
          trip: {
            travelerName: context.travelerName ?? "Guest",
            arrivalDate: context.arrivalDate.toISOString(),
            departureDate: context.departureDate.toISOString(),
            groupSize: context.groupSize,
            preferencePayload: context.preferences
          },
          sessions: candidates.map((candidate) => ({
            sessionId: candidate.id,
            serviceDate: candidate.serviceDate.toISOString(),
            title: candidate.product.title,
            productType: candidate.product.type,
            supplierName: candidate.product.supplier.name,
            startTimeLabel: candidate.startTimeLabel,
            endTimeLabel: candidate.endTimeLabel,
            durationMinutes: candidate.product.durationMinutes ?? null,
            price: candidate.price ?? null,
            locationName: candidate.product.locationName ?? null,
            bookingUrl: candidate.bookingUrl ?? null,
            tags: candidate.product.categoryTags,
            weatherSensitive: candidate.product.weatherSensitive,
            oceanSensitive: candidate.product.oceanSensitive
          }))
        })
      }
    ]
  });

  const text = extractTextContent(response.content);
  const parsed = extractJsonObject(text);
  if (!parsed) return null;

  const sessionMap = new Map(candidates.map((candidate) => [candidate.id, candidate]));
  const items: DraftItem[] = [];

  for (const day of parsed.days) {
    for (const entry of day.items) {
      if (entry.free_time || !entry.session_id) {
        items.push({
          dayDate: new Date(day.date),
          displayTitle: entry.title || "Free time window",
          broadAreaLabel: "Flexible",
          preciseLocationName: null,
          startTimeLabel: "Flexible",
          endTimeLabel: undefined,
          supplierEstimatedSubtotal: 0,
          feeEligible: false,
          whyNote: entry.why,
          itemType: "FREE_TIME",
          itemStatus: "VERIFIED",
          verificationStatus: "VERIFIED",
          holdType: "NONE",
          holdExpiresAt: null,
          maskedPreviewPayload: {
            title: entry.title || "Flexible exploration window",
            broadAreaLabel: "Flexible",
            estimatedCost: 0,
            why: entry.why
          },
          metadata: {},
          productType: null,
          impactProfile: null
        });
        continue;
      }

      const candidate = sessionMap.get(entry.session_id);
      if (!candidate) continue;
      const item = asDraftItem(candidate, entry.why);
      item.metadata = {
        ...(item.metadata ?? {}),
        startAt: candidate.startAt?.toISOString(),
        endAt: candidate.endAt?.toISOString()
      };
      items.push(item);
    }
  }

  return {
    items,
    summaryText: "Anthropic messages API generated the latest itinerary draft."
  };
}

async function loadCandidates(input: { arrivalDate: Date; departureDate: Date; groupSize: number }) {
  if (!prisma) {
    throw new Error("DATABASE_URL is required to load sessions.");
  }

  const sessions = (await prisma.session.findMany({
    where: {
      serviceDate: {
        gte: input.arrivalDate,
        lt: input.departureDate
      },
      OR: [{ status: "VERIFIED" }, { status: "PROPOSED" }],
      seatsRemaining: {
        gte: input.groupSize
      },
      product: {
        active: true,
        OR: [{ maxGuests: null }, { maxGuests: { gte: input.groupSize } }]
      }
    },
    include: {
      product: {
        include: {
          supplier: true,
          impactProfile: true
        }
      }
    },
    orderBy: [{ serviceDate: "asc" }, { startAt: "asc" }]
  })) as unknown as SessionCandidate[];

  return sessions;
}

function buildMaskedSummary(items: DraftItem[]) {
  const buckets = new Map<string, Array<Record<string, unknown>>>();

  for (const item of items) {
    const key = format(item.dayDate, "yyyy-MM-dd");
    const current = buckets.get(key) ?? [];
    if (item.itemType === "FREE_TIME") {
      current.push({
        title: "Flexible exploration window",
        broadAreaLabel: "Flexible",
        startTimeLabel: item.startTimeLabel ?? "Flexible",
        estimatedCost: 0,
        why: item.whyNote,
        itemType: item.itemType
      });
    } else {
      current.push({
        title: item.maskedPreviewPayload?.title ?? "Bookable experience",
        broadAreaLabel: item.maskedPreviewPayload?.broadAreaLabel ?? item.broadAreaLabel,
        startTimeLabel: item.startTimeLabel,
        endTimeLabel: item.endTimeLabel,
        estimatedCost: item.supplierEstimatedSubtotal ?? 0,
        why: item.whyNote,
        itemType: item.itemType
      });
    }
    buckets.set(key, current);
  }

  return {
    days: Array.from(buckets.entries()).map(([date, dayItems]) => ({ date, items: dayItems }))
  };
}

function getImpactPayload(items: DraftItem[]) {
  const bookableProfiles = items
    .filter((item) => item.itemType === "BOOKABLE_ITEM" && item.productId)
    .map((item) => ({
      productId: item.productId ?? "",
      title: item.displayTitle,
      profile: item.impactProfile ?? undefined
    }));

  return deriveImpactAssessment(bookableProfiles);
}

function draftFromCandidates(context: {
  travelerName?: string | null;
  arrivalDate: Date;
  departureDate: Date;
  groupSize: number;
  preferences: PreferencePayload;
}, candidates: SessionCandidate[]) {
  return buildAnthropicDraft(context, candidates).then((aiDraft) => aiDraft ?? buildFallbackDraft(context, candidates));
}

export async function generateMaskedPreviewForPreviewSession(previewId: string) {
  if (!prisma) {
    throw new Error("DATABASE_URL is required to generate previews.");
  }

  const preview = await prisma.previewSession.findUnique({ where: { id: previewId } });
  if (!preview) throw new Error("Preview session not found.");

  const preferences = parsePreferencePayload(preview.preferencePayload);
  const candidates = await loadCandidates({
    arrivalDate: preview.arrivalDate,
    departureDate: preview.departureDate,
    groupSize: preview.groupSize
  });

  if (!candidates.length) {
    throw new Error("No eligible sessions found for the requested travel window.");
  }

  await prisma.previewSession.update({
    where: { id: preview.id },
    data: { status: "GENERATING" }
  });

  const draft = await draftFromCandidates(
    {
      travelerName: preview.travelerName,
      arrivalDate: preview.arrivalDate,
      departureDate: preview.departureDate,
      groupSize: preview.groupSize,
      preferences
    },
    candidates
  );

  const impact = getImpactPayload(draft.items);
  const pricing = computeVersionPricing({
    items: draft.items,
    depositAmount: 15
  });

  const maskedSummary = buildMaskedSummary(draft.items);
  const maskedPriceEstimateMin = Number((pricing.allInEstimatedTotal * 0.95).toFixed(2));
  const maskedPriceEstimateMax = Number((pricing.allInEstimatedTotal * 1.1).toFixed(2));

  const result = await prisma.previewSession.update({
    where: { id: preview.id },
    data: {
      maskedSummary,
      maskedPriceEstimateMin,
      maskedPriceEstimateMax,
      scoreBand: impact.scoreBand,
      status: "READY",
      expiresAt: addMinutes(new Date(), 60)
    }
  });

  return result;
}

export async function generateDraftForTrip(tripId: string) {
  if (!prisma) {
    throw new Error("DATABASE_URL is required to generate itineraries.");
  }

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip) throw new Error("Trip not found.");

  const preferences = parsePreferencePayload(trip.preferencePayload);
  const candidates = await loadCandidates({
    arrivalDate: trip.arrivalDate,
    departureDate: trip.departureDate,
    groupSize: trip.groupSize
  });

  if (!candidates.length) {
    throw new Error("No eligible sessions found for the requested travel window.");
  }

  const previousVersions = await prisma.tripVersion.findMany({
    where: { tripId },
    orderBy: { versionNumber: "desc" },
    take: 1
  });
  const nextVersionNumber = (previousVersions[0]?.versionNumber ?? 0) + 1;

  const draft = await draftFromCandidates(
    {
      travelerName: trip.travelerName,
      arrivalDate: trip.arrivalDate,
      departureDate: trip.departureDate,
      groupSize: trip.groupSize,
      preferences
    },
    candidates
  );

  const impact = getImpactPayload(draft.items);
  const pricing = computeVersionPricing({
    items: draft.items,
    depositAmount: numeric(trip.depositAmount)
  });

  const restaurantEstimate = Number(
    draft.items
      .filter((item) => item.productType === "DINING")
      .reduce((sum, item) => sum + Number(item.supplierEstimatedSubtotal ?? 0), 0)
      .toFixed(2)
  );

  const confirmationWindowExpiresAt = addMinutes(new Date(), 15);

  const result = await prisma.$transaction(async (tx) => {
    await tx.tripVersion.updateMany({
      where: {
        tripId,
        status: {
          in: ["DRAFT", "VERIFYING", "PRELIMINARY_SET", "READY_TO_CONFIRM"]
        }
      },
      data: {
        status: "SUPERSEDED"
      }
    });

    const version = await tx.tripVersion.create({
      data: {
        tripId,
        versionNumber: nextVersionNumber,
        status: "READY_TO_CONFIRM",
        summaryText: draft.summaryText,
        generatedModel: process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_MODEL ?? "anthropic-configured" : "deterministic-fallback",
        supplierSubtotal: pricing.supplierSubtotal,
        restaurantEstimate,
        serviceFeeBase: pricing.serviceFeeBase,
        serviceFeeRate: pricing.serviceFeeRate,
        serviceFeeAmount: pricing.serviceFeeAmount,
        depositCreditApplied: pricing.depositCreditApplied,
        serviceFeeBalanceDue: pricing.serviceFeeBalanceDue,
        allInEstimatedTotal: pricing.allInEstimatedTotal,
        confirmationWindowExpiresAt
      }
    });

    let orderIndex = 0;
    for (const item of draft.items) {
      await tx.itineraryItem.create({
        data: {
          tripVersionId: version.id,
          productId: item.productId ?? null,
          sessionId: item.sessionId ?? null,
          itemType: item.itemType,
          itemStatus: item.itemStatus,
          dayDate: item.dayDate,
          orderIndex,
          displayTitle: item.displayTitle,
          broadAreaLabel: item.broadAreaLabel ?? null,
          preciseLocationName: item.preciseLocationName ?? null,
          startTimeLabel: item.startTimeLabel ?? null,
          endTimeLabel: item.endTimeLabel ?? null,
          supplierEstimatedSubtotal: item.supplierEstimatedSubtotal ?? 0,
          feeEligible: item.feeEligible,
          whyNote: item.whyNote,
          bookingUrl: item.bookingUrl ?? null,
          holdType: (item.holdType as "NONE" | "SOFT_VERIFY" | "CART_HOLD" | "HARD_HOLD" | "MANUAL_ASSIST" | undefined) ?? "SOFT_VERIFY",
          holdExpiresAt: item.holdExpiresAt ?? null,
          verificationStatus: item.verificationStatus,
          maskedPreviewPayload: item.maskedPreviewPayload ?? {},
          metadata: item.metadata ?? {}
        }
      });
      orderIndex += 1;
    }

    await tx.tripImpactAssessment.create({
      data: {
        tripVersionId: version.id,
        normalizedScore: impact.normalizedScore,
        scoreBand: impact.scoreBand,
        methodologyVersion: "v1-seed-ruleset",
        summary: impact.summary,
        positiveItemCount: impact.positiveItemCount,
        negativeItemCount: impact.negativeItemCount,
        suggestedDonationAmount: impact.suggestedDonationAmount,
        breakdownJson: impact.breakdown
      }
    });

    await tx.trip.update({
      where: { id: tripId },
      data: {
        tripStatus: "FINAL_CONFIRM_PENDING"
      }
    });

    return version;
  });

  return result;
}
