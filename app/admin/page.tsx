'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UnderConstruction from '../../components/UnderConstruction';

export default function AdminDashboard() {
  const stats = [
    { label: 'Active Operators', value: '12', change: '+2 this month' },
    { label: 'Total Experiences', value: '48', change: '+5 this month' },
    { label: 'Bookings This Month', value: '156', change: '+23% vs last month' },
    { label: 'Impact Score', value: '94.2', change: 'Top 5% globally' },
  ];

  const bookings = [
    { id: 'BK-001', exp: 'Reef Restoration', date: '2026-04-01', guests: 4, status: 'Confirmed' },
    { id: 'BK-002', exp: 'Taro Farming Workshop', date: '2026-04-02', guests: 2, status: 'Pending' },
    { id: 'BK-003', exp: 'Native Reforestation', date: '2026-04-03', guests: 6, status: 'Confirmed' },
    { id: 'BK-004', exp: 'Cultural Navigation', date: '2026-04-04', guests: 3, status: 'Cancelled' },
  ];

  return (
    <>
      <Header />
      <UnderConstruction message="Admin dashboard with live data coming soon. Showing sample layout." />
      <main className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-lg border p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-teal-600">{s.change}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          <table className="w-full text-left">
            <thead><tr className="border-b text-sm text-gray-500">
              <th className="pb-2">ID</th><th className="pb-2">Experience</th><th className="pb-2">Date</th><th className="pb-2">Guests</th><th className="pb-2">Status</th>
            </tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="py-3 text-sm">{b.id}</td>
                  <td className="py-3 text-sm">{b.exp}</td>
                  <td className="py-3 text-sm">{b.date}</td>
                  <td className="py-3 text-sm text-center">{b.guests}</td>
                  <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${b.status === 'Confirmed' ? 'bg-green-100 text-green-700' : b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* New: Analytics preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Booking Trends</h3>
            <div className="space-y-3">
              {['Jan', 'Feb', 'Mar', 'Apr'].map((month, i) => (
                <div key={month} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-8">{month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4">
                    <div className="bg-teal-500 h-4 rounded-full" style={{ width: `${[45, 60, 78, 92][i]}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{[18, 24, 31, 37][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Impact Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <p className="text-2xl font-bold text-teal-700">2,450</p>
                <p className="text-xs text-gray-600">Trees Planted</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">890</p>
                <p className="text-xs text-gray-600">Coral Fragments</p>
              </div>
              <div className="text-center p-3 bg-amber-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-700">156</p>
                <p className="text-xs text-gray-600">Cultural Sessions</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">12 tons</p>
                <p className="text-xs text-gray-600">Debris Removed</p>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-sm">Dashboard showing mock data. Connect database for live stats.</p>
      </main>
      <Footer />
    </>
  );
}
