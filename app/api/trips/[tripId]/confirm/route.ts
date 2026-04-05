import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: {
    tripId: string;
  };
};

export async function POST(_request: Request, { params }: RouteContext) {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  try {
    const trip = await prisma.trip.findUnique({
      where: { id: params.tripId },
      include: {
        versions: {
          orderBy: { versionNumber: "desc" },
          take: 1,
          include: {
            itineraryItems: {
              where: { itemType: "BOOKABLE_ITEM" },
              include: { session: true },
              orderBy: [{ dayDate: "asc" }, { orderIndex: "asc" }]
            },
            impactAssessment: true
          }
        }
      }
    });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found." }, { status: 404 });
    }

    if (!trip.depositCapturedAt) {
      return NextResponse.json({ error: "Deposit must be captured before confirmation." }, { status: 400 });
    }

    const latestVersion = trip.versions[0];
    if (!latestVersion) {
      return NextResponse.json({ error: "Generate an itinerary first." }, { status: 400 });
    }

    if (latestVersion.confirmationWindowExpiresAt && latestVersion.confirmationWindowExpiresAt < new Date()) {
      return NextResponse.json({ error: "The confirmation window expired. Regenerate the itinerary to continue." }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const createdBookingIds: string[] = [];

      for (const item of latestVersion.itineraryItems) {
        const existing = await tx.booking.findFirst({
          where: {
            itineraryItemId: item.id,
            status: {
              in: ["PENDING", "IN_PROGRESS", "BOOKED"]
            }
          }
        });

        if (!existing) {
          const booking = await tx.booking.create({
            data: {
              tripId: trip.id,
              tripVersionId: latestVersion.id,
              itineraryItemId: item.id,
              bookingSourceId: item.session?.bookingSourceId ?? null,
              sessionId: item.sessionId,
              prebookingStatus: item.holdType === "CART_HOLD" || item.holdType === "HARD_HOLD" ? "SOFT_VERIFIED" : "NONE",
              holdType: item.holdType,
              preliminarySetAt: new Date(),
              prebookingExpiresAt: latestVersion.confirmationWindowExpiresAt ?? null,
              status: "PENDING",
              supplierChargeAmount: item.supplierEstimatedSubtotal ?? 0,
              metadata: {
                launchMode: "supplier-checkout-or-adapter",
                versionStatus: latestVersion.status
              }
            }
          });
          createdBookingIds.push(booking.id);
        }

        await tx.itineraryItem.update({
          where: { id: item.id },
          data: { itemStatus: "BOOKING_REQUIRED" }
        });
      }

      const existingBalance = await tx.payment.findFirst({
        where: {
          tripId: trip.id,
          kind: "SERVICE_FEE_BALANCE"
        }
      });

      if (!existingBalance && latestVersion.serviceFeeBalanceDue && Number(latestVersion.serviceFeeBalanceDue) > 0) {
        await tx.payment.create({
          data: {
            tripId: trip.id,
            kind: "SERVICE_FEE_BALANCE",
            status: "CREATED",
            amount: latestVersion.serviceFeeBalanceDue,
            metadata: {
              note: "Service-fee balance due after deposit credit.",
              depositCreditApplied: latestVersion.depositCreditApplied ?? 0
            }
          }
        });
      }

      await tx.trip.update({
        where: { id: trip.id },
        data: { tripStatus: "BOOKING" }
      });

      return createdBookingIds;
    });

    return NextResponse.json({
      ok: true,
      createdBookingCount: result.length,
      serviceFeeBalanceDue: latestVersion.serviceFeeBalanceDue
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to confirm itinerary." },
      { status: 500 }
    );
  }
}
