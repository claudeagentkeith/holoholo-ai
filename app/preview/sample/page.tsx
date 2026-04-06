'use client';

import { useState } from 'react';
import Link from 'next/link';

const sampleDays = [
  {
    day: 1,
    title: 'North Shore Regenerative Experience',
    items: [
      {
        time: '8:30 AM',
        name: '██████ ████ ████████',
        maskedName: 'Organic Farm Tour & Tasting',
        type: 'regenerative',
        description: 'Visit a family-owned North Shore farm for a guided tour with tropical fruit tasting and smoothie bar.',
        impact: 'Supports local agriculture and food sovereignty',
        impactScore: 8.5,
        duration: '2.5 hours',
        masked: true,
      },
      {
        time: '11:30 AM',
        name: '███████ ██████ ████',
        maskedName: 'Coastal Cleanup Walk',
        type: 'regenerative',
        description: 'Join a beach restoration effort combining environmental stewardship with stunning coastal views.',
        impact: 'Direct marine ecosystem restoration',
        impactScore: 9.2,
        duration: '1.5 hours',
        masked: true,
      },
      {
        time: '1:00 PM',
        name: 'Lunch at Giovanni\'s Shrimp Truck',
        type: 'leisure',
        description: 'Famous North Shore garlic shrimp at one of Hawaii\'s most iconic food trucks.',
        duration: '1 hour',
        masked: false,
      },
      {
        time: '2:30 PM',
        name: '████████ ████ █████',
        maskedName: 'Surfing Lesson',
        type: 'leisure',
        description: 'Beginner-friendly surf instruction at a sheltered North Shore beach.',
        duration: '2 hours',
        masked: true,
      },
    ],
  },
  {
    day: 2,
    title: 'Windward Coast Cultural Immersion',
    items: [
      {
        time: '9:00 AM',
        name: '█████ ████████ ████████',
        maskedName: 'Ancient Fishpond Restoration',
        type: 'regenerative',
        description: 'Help restore a 800-year-old Hawaiian fishpond through hands-on community work.',
        impact: 'Cultural preservation and wetland restoration',
        impactScore: 9.8,
        duration: '3 hours',
        masked: true,
      },
      {
        time: '12:30 PM',
        name: 'Lunch in Kailua Town',
        type: 'leisure',
        description: 'Explore Kailua\'s charming downtown with farm-to-table dining options.',
        duration: '1.5 hours',
        masked: false,
      },
      {
        time: '2:00 PM',
        name: '███████ ████ ██████',
        maskedName: 'Pillbox Hike (Lanikai)',
        type: 'leisure',
        description: 'Short hike with stunning panoramic views of the Windward Coast and Mokulua Islands.',
        duration: '1.5 hours',
        masked: true,
      },
      {
        time: '4:00 PM',
        name: '██████ ███████ ████████',
        maskedName: 'Native Garden Planting',
        type: 'regenerative',
        description: 'Contribute to endemic Hawaiian plant restoration at a community botanical garden.',
        impact: 'Native species propagation',
        impactScore: 7.9,
        duration: '2 hours',
        masked: true,
      },
    ],
  },
  {
    day: 3,
    title: 'South Shore Discovery',
    items: [
      {
        time: '7:00 AM',
        name: 'Diamond Head Hike',
        type: 'leisure',
        description: 'Iconic crater trail with panoramic views of Waikiki and the Pacific Ocean.',
        duration: '2 hours',
        masked: false,
      },
      {
        time: '10:00 AM',
        name: '████ ██████████ ██████',
        maskedName: 'Reef Restoration Dive',
        type: 'regenerative',
        description: 'Help marine biologists with coral restoration work at a protected reef site.',
        impact: 'Marine ecosystem regeneration',
        impactScore: 9.5,
        duration: '3 hours',
        masked: true,
      },
      {
        time: '1:30 PM',
        name: '██████ ██ ███████',
        maskedName: 'Lunch at Local Spot',
        type: 'leisure',
        description: 'Authentic Hawaiian plate lunch at a local favorite near Waikiki.',
        duration: '1 hour',
        masked: true,
      },
      {
        time: '3:00 PM',
        name: 'Snorkeling at Hanauma Bay',
        type: 'leisure',
        description: 'World-famous reef snorkeling at a protected marine conservation area.',
        duration: '2.5 hours',
        masked: false,
      },
    ],
  },
];

const tripSummary = {
  totalImpactScore: 44.9,
  regenActivities: 5,
  leisureActivities: 7,
  estimatedCost: '$1,200 - $1,800',
  island: "O'ahu",
  duration: '3 days',
};

export default function SamplePreviewPage() {
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
            🌺 Holoholo.ai
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/#how-it-works" className="hover:text-gray-900">How It Works</Link>
            <Link href="/#about" className="hover:text-gray-900">About</Link>
            <Link href="/itinerary" className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700">Plan Your Trip</Link>
          </nav>
        </div>
      </header>

      {/* Under Construction Banner */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
        <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg shadow-2xl rotate-[-2deg] pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚧</span>
            <div>
              <p className="font-bold text-lg">Sample Preview</p>
              <p className="text-sm opacity-80">This is a demo of the masked itinerary experience</p>
            </div>
            <span className="text-2xl">🚧</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Trip Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Regenerative Itinerary</h1>
          <p className="text-gray-600 mb-4">
            Here is your personalized {tripSummary.duration} O\'ahu experience blending regenerative tourism with leisure activities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-emerald-50 rounded-xl p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-700">{tripSummary.totalImpactScore}</p>
              <p className="text-xs text-gray-600">Impact Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-700">{tripSummary.regenActivities}</p>
              <p className="text-xs text-gray-600">Regen Activities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-700">{tripSummary.leisureActivities}</p>
              <p className="text-xs text-gray-600">Leisure Activities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-700">{tripSummary.estimatedCost}</p>
              <p className="text-xs text-gray-600">Est. Budget</p>
            </div>
          </div>
        </div>

        {/* Day Cards */}
        {sampleDays.map((day) => (
          <div key={day.day} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                {day.day}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{day.title}</h2>
            </div>

            <div className="space-y-3">
              {day.items.map((item, idx) => {
                const key = day.day + '-' + idx;
                const isRevealed = revealedItems[key];
                return (
                  <div
                    key={idx}
                    className={'rounded-lg border p-4 ' + (item.type === 'regenerative' ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200 bg-white')}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500 font-mono">{item.time}</span>
                          <span className={'text-xs px-2 py-0.5 rounded-full ' + (item.type === 'regenerative' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700')}>
                            {item.type === 'regenerative' ? '🌱 Regenerative' : '✨ Leisure'}
                          </span>
                          {item.masked && !isRevealed && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">🔒 Masked</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {item.masked && !isRevealed ? (
                            <span className="font-mono tracking-wide text-gray-400">{item.name}</span>
                          ) : (
                            item.maskedName || item.name
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>⏱ {item.duration}</span>
                          {item.impactScore && (
                            <span className="text-emerald-600 font-medium">⭐ Impact: {item.impactScore}/10</span>
                          )}
                        </div>
                        {item.impact && (
                          <p className="text-xs text-emerald-600 mt-1 italic">{item.impact}</p>
                        )}
                      </div>
                      {item.masked && (
                        <button
                          onClick={() => setRevealedItems(prev => ({...prev, [key]: !prev[key]}))}
                          className="ml-4 text-xs px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 whitespace-nowrap"
                        >
                          {isRevealed ? 'Re-mask' : 'Peek'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Ready to Book This Trip?</h2>
          <p className="text-emerald-100 mb-6">Unlock all activity details and secure your spots with verified regenerative operators.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition opacity-50 cursor-not-allowed" disabled>
              Book Full Itinerary — Coming Soon
            </button>
            <Link href="/itinerary" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
              Modify Preferences
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-1">🌺 Holoholo.ai</p>
          <p className="text-gray-400 text-sm mb-4">Regenerative Tourism, Powered by AI</p>
          <p className="text-gray-400 text-xs">Holoholo.ai LLC • 1000 Bishop St Suite 800, Honolulu HI 96813</p>
          <div className="flex justify-center gap-6 mt-3 text-gray-400 text-xs">
            <Link href="/#about" className="hover:text-gray-200">About</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gray-200">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-200">Terms</Link>
            <span>•</span>
            <a href="mailto:aloha@holoholo.ai" className="hover:text-gray-200">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
