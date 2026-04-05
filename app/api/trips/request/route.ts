import { NextResponse } from "next/server";
import { tripRequestSchema } from "@/lib/intake-schema";
import { getPlanningDepositAmount } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { buildPreferencePayload } from "@/lib/preferences";

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const parsed = tripRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid trip request payload.", details: parsed.error.flatten() }, { status: 400 });
    }

    const arrivalDate = new Date(parsed.data.arrivalDate);
    const departureDate = new Date(parsed.data.departureDate);

    if (Number.isNaN(arrivalDate.getTime()) || Number.isNaN(departureDate.getTime()) || departureDate <= arrivalDate) {
      return NextResponse.json({ error: "Travel dates are invalid." }, { status: 400 });
    }

    const trip = await prisma.trip.create({
      data: {
        travelerName: parsed.data.travelerName,
        travelerEmail: parsed.data.travelerEmail,
        travelerPhone: parsed.data.travelerPhone || "",
        smsAlertsEnabled: parsed.data.smsAlertsRequested ?? false,
        smsConsentAt: parsed.data.smsAlertsRequested ? new Date() : null,
        arrivalDate,
        departureDate,
        groupSize: parsed.data.groupSize,
        preferencePayload: buildPreferencePayload({
          interests: parsed.data.interests,
          budgetTier: parsed.data.budgetTier,
          terrainPreference: parsed.data.terrainPreference,
          fitnessLevel: parsed.data.fitnessLevel,
          diningStyle: parsed.data.diningStyle,
          specialRequests: parsed.data.specialRequests || null
        }),
        partyProfile: {
          travelerName: parsed.data.travelerName,
          travelerEmail: parsed.data.travelerEmail,
          travelerPhone: parsed.data.travelerPhone || "",
          smsAlertsRequested: parsed.data.smsAlertsRequested ?? false
        },
        specialRequests: parsed.data.specialRequests || null,
        depositAmount: getPlanningDepositAmount(),
        island: "OAHU",
        tripStatus: "REQUESTED"
      }
    });

    return NextResponse.json({ ok: true, tripId: trip.id, publicId: trip.publicId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create trip request." },
      { status: 500 }
    );
  }
}
