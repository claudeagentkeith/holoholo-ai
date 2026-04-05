import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  const bookings = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      itineraryItem: true,
      bookingSource: true,
      trip: {
        select: {
          travelerName: true,
          travelerEmail: true
        }
      }
    },
    take: 50
  });

  return NextResponse.json({ bookings });
}
