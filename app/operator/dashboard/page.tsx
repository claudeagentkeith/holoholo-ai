'use client';

import { useState } from 'react';
import UnderConstruction from '../../../components/UnderConstruction';

export default function OperatorDashboard() {
  const stats = [
    { label: 'Total Bookings', value: '47', color: 'teal' },
    { label: 'This Month', value: '12', color: 'teal' },
    { label: 'Revenue', value: '$4,230', color: 'teal' },
    { label: 'Impact Score', value: '94', color: 'teal' },
  ];

  const bookings = [
    { id: 'BK001', guest: 'Sarah M.', exp: 'Reef Restoration', status: 'Confirmed', date: 'Apr 5' },
    { id: 'BK002', guest: 'James K.', exp: 'Taro Farming', status: 'Pending', date: 'Apr 7' },
    { id: 'BK003', guest: 'Lisa T.', exp: 'Coastal Cleanup', status: 'Confirmed', date: 'Apr 8' },
    { id: 'BK004', guest: 'Mike R.', exp: 'Cultural Workshop', status: 'Upcoming', date: 'Apr 10' },
  ];

  return (
    <>
      <UnderConstruction message="Operator portal coming soon. Preview of the dashboard layout." />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Operator Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-lg border-l-4 border-teal-500 p-4 shadow-sm">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white rounded-lg border p-6">
            <h2 className="font-semibold mb-4">Recent Bookings</h2>
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b text-gray-500"><th className="pb-2">ID</th><th>Guest</th><th>Experience</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} className="border-b last:border-0">
                    <td className="py-3 font-mono text-xs">{b.id}</td>
                    <td className="py-3">{b.guest}</td>
                    <td className="py-3">{b.exp}</td>
                    <td className="py-3 text-gray-500">{b.date}</td>
                    <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition text-sm">
                <span className="font-medium text-teal-700">+ Add New Experience</span>
              </button>
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-sm">
                <span className="font-medium text-blue-700">View Calendar</span>
              </button>
              <button className="w-full text-left p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition text-sm">
                <span className="font-medium text-amber-700">Message Guests</span>
              </button>
              <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition text-sm">
                <span className="font-medium text-green-700">Submit Impact Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
