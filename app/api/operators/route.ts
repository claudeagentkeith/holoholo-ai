import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }

  const suppliers = await prisma.supplier.findMany({
    where: {
      island: "OAHU"
    },
    orderBy: {
      name: "asc"
    },
    include: {
      products: true
    }
  });

  return NextResponse.json({ suppliers });
}
