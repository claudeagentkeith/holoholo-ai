import {
  BookingMethod,
  Island,
  PricingModel,
  PrismaClient,
  ProductType,
  SnapshotStatus,
  SourceType,
  SupplierStatus,
  VerificationStatus,
  HoldType
} from "@prisma/client";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const prisma = new PrismaClient();

type ImpactSeedRule = {
  direction: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  baseScore: number;
  rationale: string;
  reviewNotes?: string;
  methodologyVersion?: string;
  confidenceScore?: number;
};

type ProductSeed = {
  supplierName: string;
  supplierWebsite: string;
  bookingHomeUrl: string;
  supplierDescription: string;
  latitude: number;
  longitude: number;
  categoryTags: string[];
  supplierTags?: string[];
  impactTags?: string[];
  impactOverride?: ImpactSeedRule;
  productTitle: string;
  productType: ProductType;
  pricingModel: PricingModel;
  basePrice: number;
  maxGuests: number;
  leadTimeHours: number;
  durationMinutes: number;
  locationName: string;
  weatherSensitive?: boolean;
  oceanSensitive?: boolean;
  localEventSensitive?: boolean;
  bookingSourceLabel: string;
  bookingSourceType: SourceType;
  bookingMethod: BookingMethod;
  serviceFeeEligible?: boolean;
  schedule: Array<{
    weekdays: number[];
    startHour: number;
    startMinute?: number;
    durationMinutes?: number;
    price?: number;
    seatsRemaining?: number;
  }>;
};

const products: ProductSeed[] = [
  {
    supplierName: "Hoʻokipa Reef Stewardship",
    supplierWebsite: "https://example.com/hookipa-reef",
    bookingHomeUrl: "https://example.com/hookipa-reef/book",
    supplierDescription: "Fictional community reef restoration crew used as seed data.",
    latitude: 21.2980,
    longitude: -157.6600,
    categoryTags: ["regenerative", "reef", "ocean", "give-back"],
    productTitle: "Shoreline Reef Stewardship Morning",
    productType: ProductType.REGENERATIVE,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 145,
    maxGuests: 12,
    leadTimeHours: 24,
    durationMinutes: 180,
    locationName: "Maunalua Bay",
    weatherSensitive: true,
    oceanSensitive: true,
    bookingSourceLabel: "Reef morning booking page",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [2, 4, 6], startHour: 8, durationMinutes: 180, price: 145, seatsRemaining: 10 }]
  },
  {
    supplierName: "Kālia Kalo Learning Collective",
    supplierWebsite: "https://example.com/kalia-kalo",
    bookingHomeUrl: "https://example.com/kalia-kalo/book",
    supplierDescription: "Fictional loʻi kalo learning collective used as seed data.",
    latitude: 21.3460,
    longitude: -157.8200,
    categoryTags: ["culture", "heritage", "regenerative", "family"],
    productTitle: "Loʻi Kalo and Foodways Visit",
    productType: ProductType.CULTURAL,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 135,
    maxGuests: 14,
    leadTimeHours: 24,
    durationMinutes: 180,
    locationName: "Nuʻuanu Valley",
    bookingSourceLabel: "Kalo visit calendar",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [1, 3, 5], startHour: 9, durationMinutes: 180, price: 135, seatsRemaining: 12 }]
  },
  {
    supplierName: "Lei Stories Studio",
    supplierWebsite: "https://example.com/lei-stories",
    bookingHomeUrl: "https://example.com/lei-stories/book",
    supplierDescription: "Fictional lei workshop studio used as seed data.",
    latitude: 21.3320,
    longitude: -157.8020,
    categoryTags: ["culture", "craft", "family", "food"],
    productTitle: "Lei Making and Story Session",
    productType: ProductType.CULTURAL,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 98,
    maxGuests: 16,
    leadTimeHours: 12,
    durationMinutes: 120,
    locationName: "Kakaʻako",
    bookingSourceLabel: "Lei workshop checkout",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [2, 4, 0], startHour: 14, durationMinutes: 120, price: 98, seatsRemaining: 16 }]
  },
  {
    supplierName: "Kahuku Farms",
    supplierWebsite: "https://kahukufarms.com/",
    bookingHomeUrl: "https://kahukufarms.com/pages/tours",
    supplierDescription: "Family-owned North Shore farm offering guided tours with seasonal tastings and agriculture education.",
    latitude: 21.6800,
    longitude: -157.9510,
    categoryTags: ["farm", "north-shore", "family", "local-food"],
    supplierTags: ["hta-ctc-regenerative-experiences-cohort", "family-owned-farm"],
    impactTags: ["guided-farm-experience", "hands-on-learning", "farm-experience"],
    productTitle: "Kahuku Farms Guided Tour",
    productType: ProductType.ACTIVITY,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 50,
    maxGuests: 20,
    leadTimeHours: 12,
    durationMinutes: 60,
    locationName: "Kahuku",
    bookingSourceLabel: "Kahuku Farms tour booking",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [5, 6, 0], startHour: 13, durationMinutes: 60, price: 50, seatsRemaining: 18 }]
  },

  {
    supplierName: "Waikīkī Twilight Lūʻau",
    supplierWebsite: "https://example.com/twilight-luau",
    bookingHomeUrl: "https://example.com/twilight-luau/book",
    supplierDescription: "Fictional Waikīkī lūʻau inventory used as seed data.",
    latitude: 21.2760,
    longitude: -157.8270,
    categoryTags: ["luau", "culture", "evening", "family"],
    productTitle: "Sunset Lūʻau Seating",
    productType: ProductType.LUAU,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 189,
    maxGuests: 80,
    leadTimeHours: 4,
    durationMinutes: 180,
    locationName: "Waikīkī",
    localEventSensitive: true,
    bookingSourceLabel: "Lūʻau seat map",
    bookingSourceType: SourceType.EMBEDDED_WIDGET,
    bookingMethod: BookingMethod.AUTOMATED_BROWSER_FLOW,
    schedule: [{ weekdays: [0, 1, 2, 3, 4, 5, 6], startHour: 17, startMinute: 30, durationMinutes: 180, price: 189, seatsRemaining: 60 }]
  },
  {
    supplierName: "South Shore Snorkel Sail",
    supplierWebsite: "https://example.com/snorkel-sail",
    bookingHomeUrl: "https://example.com/snorkel-sail/book",
    supplierDescription: "Fictional snorkel sail used as seed data.",
    latitude: 21.2860,
    longitude: -157.8440,
    categoryTags: ["ocean", "adventure", "family"],
    productTitle: "Morning Snorkel Sail",
    productType: ProductType.ACTIVITY,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 155,
    maxGuests: 24,
    leadTimeHours: 12,
    durationMinutes: 180,
    locationName: "Ala Wai Harbor",
    weatherSensitive: true,
    oceanSensitive: true,
    bookingSourceLabel: "Snorkel sail booking",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [1, 3, 5, 6], startHour: 7, startMinute: 30, durationMinutes: 180, price: 155, seatsRemaining: 18 }]
  },
  {
    supplierName: "North Shore Surf School",
    supplierWebsite: "https://example.com/north-shore-surf",
    bookingHomeUrl: "https://example.com/north-shore-surf/book",
    supplierDescription: "Fictional surf school used as seed data.",
    latitude: 21.6700,
    longitude: -158.0550,
    categoryTags: ["ocean", "adventure", "family"],
    productTitle: "Beginner Surf Lesson",
    productType: ProductType.ACTIVITY,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 125,
    maxGuests: 10,
    leadTimeHours: 12,
    durationMinutes: 120,
    locationName: "Haleʻiwa",
    weatherSensitive: true,
    oceanSensitive: true,
    bookingSourceLabel: "Surf lesson scheduler",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [
      { weekdays: [0, 1, 2, 3, 4, 5, 6], startHour: 8, durationMinutes: 120, price: 125, seatsRemaining: 8 },
      { weekdays: [0, 1, 2, 3, 4, 5, 6], startHour: 13, durationMinutes: 120, price: 125, seatsRemaining: 8 }
    ]
  },
  {
    supplierName: "Mānoa Mist Walks",
    supplierWebsite: "https://example.com/manoa-mist",
    bookingHomeUrl: "https://example.com/manoa-mist/book",
    supplierDescription: "Fictional guided trail walk used as seed data.",
    latitude: 21.3330,
    longitude: -157.8050,
    categoryTags: ["adventure", "nature", "family"],
    productTitle: "Guided Valley Trail Walk",
    productType: ProductType.ACTIVITY,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 85,
    maxGuests: 14,
    leadTimeHours: 12,
    durationMinutes: 180,
    locationName: "Mānoa",
    weatherSensitive: true,
    bookingSourceLabel: "Trail walk booking",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [2, 4, 6], startHour: 6, startMinute: 30, durationMinutes: 180, price: 85, seatsRemaining: 14 }]
  },
  {
    supplierName: "Harbor Sunset Catamaran",
    supplierWebsite: "https://example.com/harbor-sunset",
    bookingHomeUrl: "https://example.com/harbor-sunset/book",
    supplierDescription: "Fictional sunset catamaran cruise used as seed data.",
    latitude: 21.2800,
    longitude: -157.8420,
    categoryTags: ["evening", "ocean", "food"],
    productTitle: "Sunset Catamaran Cruise",
    productType: ProductType.EVENT,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 129,
    maxGuests: 36,
    leadTimeHours: 6,
    durationMinutes: 120,
    locationName: "Ala Wai Harbor",
    weatherSensitive: true,
    oceanSensitive: true,
    bookingSourceLabel: "Catamaran sunset checkout",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [0, 1, 2, 3, 4, 5, 6], startHour: 17, durationMinutes: 120, price: 129, seatsRemaining: 24 }]
  },
  {
    supplierName: "Kaimukī Farm Table",
    supplierWebsite: "https://example.com/kaimuki-farm-table",
    bookingHomeUrl: "https://example.com/kaimuki-farm-table/reserve",
    supplierDescription: "Fictional farm-to-table dining room used as seed data.",
    latitude: 21.2810,
    longitude: -157.7980,
    categoryTags: ["food", "dining", "evening"],
    productTitle: "Dinner Reservation",
    productType: ProductType.DINING,
    pricingModel: PricingModel.PER_TABLE,
    basePrice: 140,
    maxGuests: 6,
    leadTimeHours: 2,
    durationMinutes: 120,
    locationName: "Kaimukī",
    bookingSourceLabel: "Dinner reservation widget",
    bookingSourceType: SourceType.RESTAURANT_RESERVATION,
    bookingMethod: BookingMethod.AUTOMATED_BROWSER_FLOW,
    schedule: [
      { weekdays: [0, 1, 2, 3, 4, 5, 6], startHour: 17, startMinute: 30, durationMinutes: 120, price: 140, seatsRemaining: 10 },
      { weekdays: [0, 1, 2, 3, 4, 5, 6], startHour: 19, startMinute: 30, durationMinutes: 120, price: 160, seatsRemaining: 10 }
    ]
  },
  {
    supplierName: "Ala Moana Tasting Counter",
    supplierWebsite: "https://example.com/ala-moana-counter",
    bookingHomeUrl: "https://example.com/ala-moana-counter/reserve",
    supplierDescription: "Fictional tasting counter used as seed data.",
    latitude: 21.2910,
    longitude: -157.8440,
    categoryTags: ["food", "dining", "premium"],
    productTitle: "Chef Counter Reservation",
    productType: ProductType.DINING,
    pricingModel: PricingModel.PER_TABLE,
    basePrice: 220,
    maxGuests: 4,
    leadTimeHours: 6,
    durationMinutes: 120,
    locationName: "Ala Moana",
    bookingSourceLabel: "Counter reservation page",
    bookingSourceType: SourceType.RESTAURANT_RESERVATION,
    bookingMethod: BookingMethod.AUTOMATED_BROWSER_FLOW,
    schedule: [
      { weekdays: [2, 3, 4, 5, 6], startHour: 18, durationMinutes: 120, price: 220, seatsRemaining: 6 },
      { weekdays: [2, 3, 4, 5, 6], startHour: 20, startMinute: 15, durationMinutes: 120, price: 220, seatsRemaining: 6 }
    ]
  },
  {
    supplierName: "Chinatown Night Market House",
    supplierWebsite: "https://example.com/chinatown-market",
    bookingHomeUrl: "https://example.com/chinatown-market/tickets",
    supplierDescription: "Fictional nightlife and tasting event used as seed data.",
    latitude: 21.3110,
    longitude: -157.8600,
    categoryTags: ["food", "event", "evening", "culture"],
    productTitle: "Night Market Tasting Pass",
    productType: ProductType.EVENT,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 75,
    maxGuests: 50,
    leadTimeHours: 2,
    durationMinutes: 180,
    locationName: "Chinatown",
    localEventSensitive: true,
    bookingSourceLabel: "Night market ticket page",
    bookingSourceType: SourceType.EVENT_TICKET_PAGE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [3, 5, 6], startHour: 18, durationMinutes: 180, price: 75, seatsRemaining: 50 }]
  },
  {
    supplierName: "Windward Kayak Ecology",
    supplierWebsite: "https://example.com/windward-kayak",
    bookingHomeUrl: "https://example.com/windward-kayak/book",
    supplierDescription: "Fictional eco-tour paddle used as seed data.",
    latitude: 21.3990,
    longitude: -157.7390,
    categoryTags: ["ocean", "regenerative", "adventure"],
    productTitle: "Kayak Eco Tour",
    productType: ProductType.ACTIVITY,
    pricingModel: PricingModel.PER_PERSON,
    basePrice: 148,
    maxGuests: 10,
    leadTimeHours: 12,
    durationMinutes: 180,
    locationName: "Kailua",
    weatherSensitive: true,
    oceanSensitive: true,
    bookingSourceLabel: "Eco tour booking page",
    bookingSourceType: SourceType.DIRECT_WEBSITE,
    bookingMethod: BookingMethod.DEEP_LINK,
    schedule: [{ weekdays: [2, 4, 0], startHour: 8, startMinute: 30, durationMinutes: 180, price: 148, seatsRemaining: 10 }]
  }
];

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, count: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + count);
  return copy;
}

function buildDate(base: Date, hour: number, minute = 0) {
  const copy = new Date(base);
  copy.setHours(hour, minute, 0, 0);
  return copy;
}

function timeLabel(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}

function deriveHoldType(seed: ProductSeed): HoldType {
  if (seed.bookingSourceType === SourceType.RESTAURANT_RESERVATION || seed.bookingSourceType === SourceType.EMBEDDED_WIDGET) {
    return HoldType.CART_HOLD;
  }

  if (seed.bookingMethod === BookingMethod.AUTOMATED_BROWSER_FLOW) {
    return HoldType.CART_HOLD;
  }

  if (seed.bookingMethod === BookingMethod.SUPPLIER_HANDOFF) {
    return HoldType.MANUAL_ASSIST;
  }

  return HoldType.SOFT_VERIFY;
}

function deriveImpact(seed: ProductSeed): ImpactSeedRule {
  if (seed.impactOverride) {
    return {
      methodologyVersion: seed.impactOverride.methodologyVersion ?? "v1.1-manual-override",
      confidenceScore: seed.impactOverride.confidenceScore ?? 0.95,
      ...seed.impactOverride
    };
  }

  const supplierTags = (seed.supplierTags ?? []).map((tag) => tag.toLowerCase());
  const impactTags = (seed.impactTags ?? []).map((tag) => tag.toLowerCase());

  if (
    supplierTags.includes("hta-ctc-regenerative-experiences-cohort") &&
    supplierTags.includes("family-owned-farm") &&
    impactTags.some((tag) => ["guided-farm-experience", "farm-experience", "hands-on-learning"].includes(tag))
  ) {
    return {
      direction: "POSITIVE",
      baseScore: 18,
      rationale: "Guided farm experiences from HTA regenerative cohort family farms count as positive in V1 when the booked SKU directly connects travelers to local agriculture and care for the land.",
      reviewNotes: "This positive override applies to the guided farm experience itself, not neutral café or retail purchases sold by the same operator.",
      methodologyVersion: "v1.1-hta-cohort-family-farm",
      confidenceScore: 0.92
    };
  }

  if (seed.productType === ProductType.REGENERATIVE) {
    return {
      direction: "POSITIVE",
      baseScore: 32,
      rationale: "Hands-on stewardship or restoration improves the trip’s regenerative balance.",
      methodologyVersion: "v1-seed-ruleset",
      confidenceScore: 0.85
    };
  }

  if (seed.productTitle.includes("Catamaran") || seed.productTitle.includes("Snorkel Sail")) {
    return {
      direction: "NEGATIVE",
      baseScore: -22,
      rationale: "Motorized or higher-footprint ocean touring detracts from the itinerary’s regenerative balance.",
      methodologyVersion: "v1-seed-ruleset",
      confidenceScore: 0.85
    };
  }

  if (seed.productTitle.includes("Surf") || seed.productTitle.includes("Kayak")) {
    return {
      direction: "NEGATIVE",
      baseScore: -12,
      rationale: "This experience has a mild ecological burden relative to neutral cultural or dining items.",
      methodologyVersion: "v1-seed-ruleset",
      confidenceScore: 0.85
    };
  }

  if (seed.productType === ProductType.CULTURAL || seed.productType === ProductType.DINING || seed.productType === ProductType.LUAU || seed.productType === ProductType.EVENT) {
    return {
      direction: "NEUTRAL",
      baseScore: 0,
      rationale: "This experience is treated as neutral in V1 unless it has direct restorative impact.",
      methodologyVersion: "v1-seed-ruleset",
      confidenceScore: 0.85
    };
  }

  return {
    direction: "NEUTRAL",
    baseScore: 0,
    rationale: "This experience is currently treated as neutral in V1.",
    methodologyVersion: "v1-seed-ruleset",
    confidenceScore: 0.85
  };
}

function isServiceFeeEligible(seed: ProductSeed) {
  return seed.serviceFeeEligible ?? seed.productType !== ProductType.DINING;
}

function loadDonationRecipients() {
  const raw = readFileSync(join(process.cwd(), "data", "hta_donation_recipients.json"), "utf8");
  const parsed = JSON.parse(raw) as {
    confirmed: Array<{
      name: string;
      island: string;
      website: string;
      notes?: string;
    }>;
  };

  return parsed.confirmed.map((entry) => ({
    name: entry.name,
    organizationName: entry.name,
    island:
      entry.island === "Oʻahu"
        ? Island.OAHU
        : entry.island === "Maui"
          ? Island.MAUI
          : entry.island === "Kauaʻi"
            ? Island.KAUAI
            : entry.island === "Molokaʻi"
              ? Island.MOLOKAI
              : Island.BIG_ISLAND,
    donationUrl: entry.website,
    qualificationSource: "HTA CTC–Regenerative Experiences cohort",
    notes: entry.notes ?? null
  }));
}

async function resetDatabase() {
  await prisma.notification.deleteMany();
  await prisma.changeRequest.deleteMany();
  await prisma.replanSuggestion.deleteMany();
  await prisma.riskSignal.deleteMany();
  await prisma.donationLinkClick.deleteMany();
  await prisma.tripImpactAssessment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.itineraryItem.deleteMany();
  await prisma.tripVersion.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.previewSession.deleteMany();
  await prisma.session.deleteMany();
  await prisma.availabilitySnapshot.deleteMany();
  await prisma.bookingSource.deleteMany();
  await prisma.productImpactProfile.deleteMany();
  await prisma.donationRecipient.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();
}

async function main() {
  console.log("Resetting development data...");
  await resetDatabase();

  const donationRecipients = loadDonationRecipients();
  for (const recipient of donationRecipients) {
    await prisma.donationRecipient.create({
      data: recipient
    });
  }

  const today = startOfDay(new Date());
  let supplierCount = 0;
  let productCount = 0;
  let sessionCount = 0;

  for (const seed of products) {
    const supplier = await prisma.supplier.create({
      data: {
        name: seed.supplierName,
        island: Island.OAHU,
        status: SupplierStatus.PUBLIC_ONLY,
        websiteUrl: seed.supplierWebsite,
        bookingHomeUrl: seed.bookingHomeUrl,
        description: seed.supplierDescription,
        latitude: seed.latitude,
        longitude: seed.longitude,
        categoryTags: Array.from(new Set([...(seed.categoryTags ?? []), ...(seed.supplierTags ?? [])])),
        active: true,
        notes: "Seeded development supplier record for the Oʻahu pilot."
      }
    });
    supplierCount += 1;

    const product = await prisma.product.create({
      data: {
        supplierId: supplier.id,
        title: seed.productTitle,
        type: seed.productType,
        description: seed.supplierDescription,
        durationMinutes: seed.durationMinutes,
        pricingModel: seed.pricingModel,
        basePriceMin: seed.basePrice,
        basePriceMax: seed.basePrice,
        categoryTags: Array.from(new Set([...(seed.categoryTags ?? []), ...(seed.impactTags ?? [])])),
        maxGuests: seed.maxGuests,
        leadTimeHours: seed.leadTimeHours,
        cancellationPolicy: "Seed placeholder policy: 24-hour notice for changes where supported by the supplier.",
        locationName: seed.locationName,
        latitude: seed.latitude,
        longitude: seed.longitude,
        weatherSensitive: Boolean(seed.weatherSensitive),
        oceanSensitive: Boolean(seed.oceanSensitive),
        localEventSensitive: Boolean(seed.localEventSensitive),
        serviceFeeEligible: isServiceFeeEligible(seed),
        active: true
      }
    });
    productCount += 1;

    const impact = deriveImpact(seed);
    await prisma.productImpactProfile.create({
      data: {
        productId: product.id,
        direction: impact.direction,
        baseScore: impact.baseScore,
        confidenceScore: impact.confidenceScore ?? 0.85,
        rationale: impact.rationale,
        reviewNotes: impact.reviewNotes ?? null,
        methodologyVersion: impact.methodologyVersion ?? "v1-seed-ruleset",
        lastReviewedAt: new Date()
      }
    });

    const source = await prisma.bookingSource.create({
      data: {
        supplierId: supplier.id,
        productId: product.id,
        sourceType: seed.bookingSourceType,
        bookingMethod: seed.bookingMethod,
        defaultHoldType: deriveHoldType(seed),
        label: seed.bookingSourceLabel,
        url: seed.bookingHomeUrl,
        freshnessTargetMin: 60,
        reliabilityScore: 0.7,
        notes: "Seeded development booking source."
      }
    });

    const snapshot = await prisma.availabilitySnapshot.create({
      data: {
        bookingSourceId: source.id,
        productId: product.id,
        status: SnapshotStatus.FRESH,
        capturedAt: new Date(),
        expiresAt: addDays(new Date(), 1),
        availabilityConfidence: 0.85,
        priceConfidence: 0.9,
        rawSummary: "Seeded development source snapshot.",
        rawData: {
          seeded: true
        }
      }
    });

    for (let offset = 0; offset < 45; offset += 1) {
      const serviceDay = addDays(today, offset);

      for (const slot of seed.schedule) {
        if (!slot.weekdays.includes(serviceDay.getDay())) continue;

        const startAt = buildDate(serviceDay, slot.startHour, slot.startMinute ?? 0);
        const endAt = new Date(startAt.getTime() + (slot.durationMinutes ?? seed.durationMinutes) * 60 * 1000);

        await prisma.session.create({
          data: {
            productId: product.id,
            bookingSourceId: source.id,
            availabilitySnapshotId: snapshot.id,
            serviceDate: startAt,
            startTimeLabel: timeLabel(startAt),
            endTimeLabel: timeLabel(endAt),
            startAt,
            endAt,
            bookingUrl: seed.bookingHomeUrl,
            price: slot.price ?? seed.basePrice,
            seatsRemaining: slot.seatsRemaining ?? seed.maxGuests,
            holdType: deriveHoldType(seed),
            status: VerificationStatus.VERIFIED,
            restrictions: {
              partySizeMax: seed.maxGuests,
              seeded: true
            }
          }
        });
        sessionCount += 1;
      }
    }
  }

  console.log(`Seed complete. Donation recipients: ${donationRecipients.length}, Suppliers: ${supplierCount}, Products: ${productCount}, Sessions: ${sessionCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
