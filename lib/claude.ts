import Anthropic from '@anthropic-ai/sdk'

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

export async function generateItinerary(preferences: {
  interests: string[]
  duration: number
  budget: string
  travelStyle: string
}) {
  if (!anthropic) {
    return null
  }

  const prompt = 'Create a regenerative tourism itinerary for Hawaii with interests: '
    + preferences.interests.join(', ')
    + ', duration: ' + preferences.duration + ' days'
    + ', budget: ' + preferences.budget
    + ', style: ' + preferences.travelStyle

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }]
  })

  try {
    const content = message.content[0]
    if (content.type === 'text') {
      return JSON.parse(content.text)
    }
  } catch {
    return null
  }
  return null
}

export default anthropic
