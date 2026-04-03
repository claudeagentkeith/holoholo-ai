'use client'

import { useState } from 'react'

export default function OperatorProfile() {
  const [profile] = useState({
    name: 'Kai Ocean Adventures',
    email: 'kai@example.com',
    phone: '(808) 555-0123',
    location: 'North Shore, Oahu',
    bio: 'Family-owned eco-tourism operator specializing in marine conservation since 2015.',
    experiences: 3,
    totalBookings: 234,
    rating: 4.9,
  })

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Operator Profile</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-3xl">🌊</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-gray-500">{profile.location}</p>
            <p className="mt-2 text-gray-700">{profile.bio}</p>
            <div className="mt-4 flex gap-6">
              <div><span className="text-2xl font-bold text-teal-700">{profile.experiences}</span><p className="text-sm text-gray-500">Experiences</p></div>
              <div><span className="text-2xl font-bold text-teal-700">{profile.totalBookings}</span><p className="text-sm text-gray-500">Bookings</p></div>
              <div><span className="text-2xl font-bold text-teal-700">{profile.rating}</span><p className="text-sm text-gray-500">Rating</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
