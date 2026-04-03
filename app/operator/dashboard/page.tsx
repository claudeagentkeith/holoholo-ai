'use client'

import { useState } from 'react'

interface Booking { id: string; guest: string; experience: string; date: string; status: string; amount: number }

export default function OperatorDashboard() {
  const [bookings] = useState<Booking[]>([
    { id: 'BK001', guest: 'Sarah M.', experience: 'Reef Restoration', date: '2024-04-15', status: 'Confirmed', amount: 149 },
    { id: 'BK002', guest: 'James K.', experience: 'Taro Farming', date: '2024-04-16', status: 'Pending', amount: 89 },
    { id: 'BK003', guest: 'Lisa T.', experience: 'Coastal Cleanup', date: '2024-04-17', status: 'Confirmed', amount: 0 },
  ])

  const stats = [
    { label: 'Total Bookings', value: '47' },
    { label: 'This Month', value: '12' },
    { label: 'Revenue', value: '$4,230' },
    { label: 'Impact Score', value: '94' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Operator Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-teal-700">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Bookings</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="px-6 py-4 text-sm font-mono">{b.id}</td>
                <td className="px-6 py-4 text-sm">{b.guest}</td>
                <td className="px-6 py-4 text-sm">{b.experience}</td>
                <td className="px-6 py-4 text-sm">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
