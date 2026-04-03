import { NextRequest, NextResponse } from 'next/server'

const MOCK_ITINERARY = {
  title: 'Your Regenerative Hawaii Experience',
  days: [
    {
      day: 1,
      title: 'Arrival & Cultural Immersion',
      activities: [
        { time: '10:00 AM', name: 'Traditional lei greeting ceremony', type: 'cultural' },
        { time: '1:00 PM', name: 'Visit sacred heiau (temple) with cultural guide', type: 'cultural' },
        { time: '5:00 PM', name: 'Farm-to-table dinner at local taro farm', type: 'food' },
      ],
    },
    {
      day: 2,
      title: 'Ocean Conservation',
      activities: [
        { time: '7:00 AM', name: 'Morning snorkel with coral restoration team', type: 'marine' },
        { time: '10:00 AM', name: 'Plant coral fragments on degraded reef', type: 'conservation' },
        { time: '2:00 PM', name: 'Marine biology workshop', type: 'education' },
      ],
    },
    {
      day: 3,
      title: 'Reforestation & Aloha Aina',
      activities: [
        { time: '8:00 AM', name: 'Plant native koa and ohia trees', type: 'forestry' },
        { time: '12:00 PM', name: 'Traditional Hawaiian lunch', type: 'food' },
        { time: '3:00 PM', name: 'Sunset ceremony with local kupuna', type: 'cultural' },
      ],
    },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const Anthropic = (await import('@anthropic-ai/sdk')).default
        const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
        const message = await client.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          messages: [{
            role: 'user',
            content: `Create a personalized regenerative tourism itinerary for Hawaii. Preferences: ${JSON.stringify(body)}. Return JSON with title, days array containing day number, title, and activities.`
          }],
        })
        const text = message.content[0].type === 'text' ? message.content[0].text : ''
        return NextResponse.json({ itinerary: JSON.parse(text), mock: false })
      } catch {
        // Fall through to mock
      }
    }

    return NextResponse.json({ itinerary: MOCK_ITINERARY, mock: true })
  } catch {
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 })
  }
}
