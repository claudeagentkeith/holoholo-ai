import { NextResponse } from 'next/server'

const MOCK_OPERATORS = [
  { id: '1', name: 'Reef Restoration Hawaii', description: 'Marine conservation through coral reef restoration', category: 'MARINE', island: 'MAUI', rating: 4.9 },
  { id: '2', name: 'Kokua Farms', description: 'Traditional Hawaiian agriculture and taro farming', category: 'AGRICULTURE', island: 'BIG_ISLAND', rating: 4.8 },
  { id: '3', name: 'Hawaiian Legacy Reforestation', description: 'Native forest restoration with koa and ohia', category: 'FORESTRY', island: 'BIG_ISLAND', rating: 4.9 },
  { id: '4', name: 'Malama Hawaii Tours', description: 'Cultural exchange and community service', category: 'CULTURAL', island: 'OAHU', rating: 5.0 },
]

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const operators = await prisma.operator.findMany({
      include: { experiences: true },
    })
    if (operators.length > 0) {
      return NextResponse.json({ operators })
    }
  } catch {
    // Fall through to mock data
  }
  return NextResponse.json({ operators: MOCK_OPERATORS, mock: true })
}
