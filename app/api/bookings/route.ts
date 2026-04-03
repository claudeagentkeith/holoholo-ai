import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const bookings = await prisma.booking.findMany({
      include: { experience: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    return NextResponse.json({ bookings })
  } catch {
    return NextResponse.json({ bookings: [], mock: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({
      booking: { id: 'mock-' + Date.now(), ...body, status: 'PENDING' },
      message: 'Booking created (mock mode)',
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
