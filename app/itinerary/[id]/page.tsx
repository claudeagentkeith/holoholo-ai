'use client'

import { useState, useEffect } from 'react'
import ItineraryDay from '@/components/ItineraryDay'

interface Activity { time: string; title: string; description: string; type: string }
interface Day { day: number; title: string; activities: Activity[] }
interface Itinerary { id: string; title: string; days: Day[]; totalImpact: string }

export default function ItineraryPage({ params }: { params: { id: string } }) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mock: Itinerary = {
      id: params.id,
      title: 'Your Regenerative Hawaii Journey',
      days: [
        { day: 1, title: 'Ocean Conservation Day', activities: [
          { time: '8:00 AM', title: 'Reef Restoration Workshop', description: 'Learn coral planting techniques with marine biologists.', type: 'conservation' },
          { time: '12:00 PM', title: 'Farm-to-Table Lunch', description: 'Enjoy locally sourced cuisine at a regenerative farm.', type: 'dining' },
          { time: '2:00 PM', title: 'Coastal Cleanup', description: 'Join community volunteers for a beach cleanup.', type: 'volunteer' },
        ]},
        { day: 2, title: 'Cultural Immersion Day', activities: [
          { time: '9:00 AM', title: 'Taro Farming Experience', description: 'Work alongside Native Hawaiian farmers in a traditional loi.', type: 'cultural' },
          { time: '1:00 PM', title: 'Lei Making Workshop', description: 'Learn the art of lei making with native flowers.', type: 'cultural' },
          { time: '5:00 PM', title: 'Sunset Ceremony', description: 'Participate in a traditional Hawaiian blessing.', type: 'cultural' },
        ]},
        { day: 3, title: 'Land Restoration Day', activities: [
          { time: '7:00 AM', title: 'Native Reforestation', description: 'Plant endemic Hawaiian trees in a restoration area.', type: 'conservation' },
          { time: '11:00 AM', title: 'Wildlife Monitoring', description: 'Assist researchers tracking native bird species.', type: 'conservation' },
          { time: '3:00 PM', title: 'Impact Reflection', description: 'Review your environmental and cultural impact.', type: 'reflection' },
        ]},
      ],
      totalImpact: '3 coral fragments planted, 12 native trees planted, 15 lbs waste removed',
    }
    setItinerary(mock)
    setLoading(false)
  }, [params.id])

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div></div>
  if (!itinerary) return <div className="text-center py-20">Itinerary not found</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{itinerary.title}</h1>
      <p className="text-teal-600 mb-8">Itinerary #{itinerary.id}</p>
      <div className="space-y-6">
        {itinerary.days.map((day) => (
          <ItineraryDay key={day.day} day={day} />
        ))}
      </div>
      <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
        <h3 className="text-lg font-semibold text-teal-800 mb-2">Your Total Impact</h3>
        <p className="text-teal-700">{itinerary.totalImpact}</p>
      </div>
    </div>
  )
}
