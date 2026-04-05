import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{
    assessmentId: string;
    recipientId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { assessmentId, recipientId } = await params;

  if (!prisma) {
    return NextResponse.redirect("https://example.com", { status: 302 });
  }

  const recipient = await prisma.donationRecipient.findUnique({
    where: { id: recipientId }
  });

  if (!recipient) {
    return NextResponse.json({ error: "Donation recipient not found." }, { status: 404 });
  }

  const assessment = await prisma.tripImpactAssessment.findUnique({
    where: { id: assessmentId }
  });

  if (assessment) {
    await prisma.donationLinkClick.create({
      data: {
        tripImpactAssessmentId: assessment.id,
        donationRecipientId: recipient.id,
        channel: "EMAIL",
        metadata: { source: "trip-portal" }
      }
    });
  }

  return NextResponse.redirect(recipient.donationUrl, { status: 302 });
}
