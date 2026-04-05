import { NextResponse } from "next/server";
import { getPlanningDepositAmount } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: {
    publicId: string;
  };
};

export async function POST(_request: Request, { params }: RouteContext) {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  try {
    const preview = await prisma.previewSession.findUnique({
      where: { publicId: params.publicId },
      include: {
        trip: true
      }
    });

    if (!preview) {
      return NextResponse.json({ error: "Preview session not found." }, { status: 404 });
    }

    if (preview.trip) {
      return NextResponse.json({ ok: true, tripId: preview.trip.id, publicId: preview.trip.publicId });
    }

    if (!preview.travelerName || !preview.travelerEmail || !preview.travelerPhone) {
      return NextResponse.json({ error: "Preview session is missing traveler contact data." }, { status: 400 });
    }

    const trip = await prisma.trip.create({
      data: {
        previewSessionId: preview.id,
        travelerName: preview.travelerName,
        travelerEmail: preview.travelerEmail,
        travelerPhone: preview.travelerPhone,
        smsAlertsEnabled: preview.smsAlertsRequested,
        smsConsentAt: preview.smsAlertsRequested ? new Date() : null,
        island: preview.island,
        arrivalDate: preview.arrivalDate,
        departureDate: preview.departureDate,
        groupSize: preview.groupSize,
        preferencePayload: preview.preferencePayload ?? {},
        partyProfile: {
          travelerName: preview.travelerName,
          travelerEmail: preview.travelerEmail,
          travelerPhone: preview.travelerPhone,
          smsAlertsRequested: preview.smsAlertsRequested
        },
        specialRequests:
          typeof (preview.preferencePayload as Record<string, unknown> | null)?.specialRequests === "string"
            ? String((preview.preferencePayload as Record<string, unknown>).specialRequests)
            : null,
        depositAmount: getPlanningDepositAmount(),
        tripStatus: "REQUESTED"
      }
    });

    await prisma.previewSession.update({
      where: { id: preview.id },
      data: {
        status: "CONVERTED",
        convertedAt: new Date()
      }
    });

    return NextResponse.json({ ok: true, tripId: trip.id, publicId: trip.publicId });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to convert preview session." },
      { status: 500 }
    );
  }
}
