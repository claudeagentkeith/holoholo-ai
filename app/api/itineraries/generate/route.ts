import { NextResponse } from "next/server";
import { generateDraftForTrip } from "@/lib/itinerary/planner";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  try {
    const body = (await request.json()) as { tripId?: string };
    if (!body.tripId) {
      return NextResponse.json({ error: "tripId is required." }, { status: 400 });
    }

    const trip = await prisma.trip.findUnique({
      where: {
        id: body.tripId
      }
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found." }, { status: 404 });
    }

    if (!trip.depositCapturedAt) {
      return NextResponse.json({ error: "Deposit must be captured before itinerary generation." }, { status: 400 });
    }

    await prisma.trip.update({
      where: {
        id: trip.id
      },
      data: {
        tripStatus: "GENERATING"
      }
    });

    const version = await generateDraftForTrip(trip.id);

    return NextResponse.json({
      ok: true,
      versionId: version.id
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to generate itinerary." },
      { status: 500 }
    );
  }
}
