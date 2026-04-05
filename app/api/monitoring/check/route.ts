import { NextResponse } from "next/server";
import { derivePendingRiskChecks } from "@/lib/monitoring/risk-engine";
import { prisma } from "@/lib/prisma";

export async function POST() {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  try {
    const items = await prisma.itineraryItem.findMany({
      where: {
        tripVersion: {
          trip: {
            tripStatus: {
              in: ["FINAL_CONFIRM_PENDING", "BOOKING", "BOOKED", "MONITORING"]
            }
          }
        }
      },
      take: 100,
      select: {
        id: true,
        metadata: true,
        tripVersion: {
          select: {
            tripId: true
          }
        }
      }
    });

    const checks = items.flatMap((item) => derivePendingRiskChecks([item], item.tripVersion.tripId));

    return NextResponse.json({
      ok: true,
      pendingChecks: checks.length,
      checks
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to run monitoring check." },
      { status: 500 }
    );
  }
}
