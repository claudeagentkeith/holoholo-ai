import { NextResponse } from "next/server";
import { getAppUrl, hasStripe } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
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

    const trip = await prisma.trip.findUnique({ where: { id: body.tripId } });
    if (!trip) {
      return NextResponse.json({ error: "Trip not found." }, { status: 404 });
    }

    const existingPayment = await prisma.payment.findFirst({
      where: {
        tripId: trip.id,
        kind: "DEPOSIT"
      },
      orderBy: { createdAt: "desc" }
    });

    if (!hasStripe()) {
      const payment =
        existingPayment ??
        (await prisma.payment.create({
          data: {
            tripId: trip.id,
            kind: "DEPOSIT",
            status: "SUCCEEDED",
            amount: trip.depositAmount,
            occurredAt: new Date(),
            metadata: { mode: "development-bypass" }
          }
        }));

      if (existingPayment && existingPayment.status !== "SUCCEEDED") {
        await prisma.payment.update({
          where: { id: existingPayment.id },
          data: {
            status: "SUCCEEDED",
            occurredAt: new Date(),
            metadata: { mode: "development-bypass" }
          }
        });
      }

      await prisma.trip.update({
        where: { id: trip.id },
        data: {
          depositCapturedAt: new Date(),
          tripStatus: "REQUESTED"
        }
      });

      return NextResponse.json({
        ok: true,
        paymentId: payment.id,
        url: `${getAppUrl()}/trip/${trip.publicId}?deposit=dev-success`
      });
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
    }

    const payment =
      existingPayment ??
      (await prisma.payment.create({
        data: {
          tripId: trip.id,
          kind: "DEPOSIT",
          status: "CREATED",
          amount: trip.depositAmount,
          metadata: {}
        }
      }));

    const previewSession = trip.previewSessionId
      ? await prisma.previewSession.findUnique({ where: { id: trip.previewSessionId }, select: { publicId: true } })
      : null;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${getAppUrl()}/trip/${trip.publicId}?deposit=success`,
      cancel_url: previewSession ? `${getAppUrl()}/preview/${previewSession.publicId}` : `${getAppUrl()}/trip/${trip.publicId}?deposit=cancelled`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(trip.depositAmount) * 100),
            product_data: {
              name: "holoholo.ai planning deposit",
              description: "Non-refundable deposit applied against the holoholo service fee when the itinerary is confirmed."
            }
          }
        }
      ],
      metadata: {
        tripId: trip.id,
        paymentId: payment.id,
        paymentKind: "DEPOSIT"
      }
    });

    await prisma.payment.update({
      where: { id: payment.id },
      data: { providerReference: session.id }
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to start deposit flow." },
      { status: 500 }
    );
  }
}
