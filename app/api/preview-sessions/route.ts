import { NextResponse } from "next/server";
import { previewRequestSchema } from "@/lib/intake-schema";
import { buildPreferencePayload } from "@/lib/preferences";
import { prisma } from "@/lib/prisma";
import { generateMaskedPreviewForPreviewSession } from "@/lib/itinerary/planner";

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const parsed = previewRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid preview request payload.", details: parsed.error.flatten() }, { status: 400 });
    }

    const arrivalDate = new Date(parsed.data.arrivalDate);
    const departureDate = new Date(parsed.data.departureDate);

    if (Number.isNaN(arrivalDate.getTime()) || Number.isNaN(departureDate.getTime()) || departureDate <= arrivalDate) {
      return NextResponse.json({ error: "Travel dates are invalid." }, { status: 400 });
    }

    const preview = await prisma.previewSession.create({
      data: {
        travelerName: parsed.data.travelerName,
        travelerEmail: parsed.data.travelerEmail,
        travelerPhone: parsed.data.travelerPhone || null,
        smsAlertsRequested: parsed.data.smsAlertsRequested ?? false,
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
        island: "OAHU",
        status: "REQUESTED"
      }
    });

    await generateMaskedPreviewForPreviewSession(preview.id);

    return NextResponse.json({ ok: true, publicId: preview.publicId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create preview session." },
      { status: 500 }
    );
  }
}
