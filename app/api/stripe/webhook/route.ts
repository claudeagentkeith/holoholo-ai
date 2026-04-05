import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  try {
    const signature = request.headers.get("stripe-signature");
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Stripe webhook secret is missing." }, { status: 400 });
    }

    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const tripId = session.metadata?.tripId;
      const paymentId = session.metadata?.paymentId;

      if (tripId) {
        await prisma.trip.update({
          where: { id: tripId },
          data: {
            depositCapturedAt: new Date(),
            tripStatus: "REQUESTED"
          }
        });
      }

      if (paymentId) {
        await prisma.payment.update({
          where: { id: paymentId },
          data: {
            status: "SUCCEEDED",
            occurredAt: new Date(),
            providerReference: session.id
          }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to process Stripe webhook." },
      { status: 400 }
    );
  }
}
