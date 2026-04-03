export default function AdminPage() {
  const stats = [
    { label: 'Active Operators', value: '12', change: '+2 this month' },
    { label: 'Total Experiences', value: '48', change: '+5 this month' },
    { label: 'Bookings This Month', value: '156', change: '+23% vs last month' },
    { label: 'Impact Score', value: '94.2', change: 'Top 5% globally' },
  ]

  const recentBookings = [
    { id: 'BK-001', experience: 'Reef Restoration', date: '2026-04-01', status: 'Confirmed', guests: 4 },
    { id: 'BK-002', experience: 'Taro Farming Workshop', date: '2026-04-02', status: 'Pending', guests: 2 },
    { id: 'BK-003', experience: 'Native Reforestation', date: '2026-04-03', status: 'Confirmed', guests: 6 },
    { id: 'BK-004', experience: 'Cultural Navigation', date: '2026-04-04', status: 'Cancelled', guests: 3 },
  ]

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className="text-sm text-teal-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 text-sm font-medium text-gray-500">ID</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Experience</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Guests</th>
              <th className="text-left p-3 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3 text-sm font-mono">{b.id}</td>
                <td className="p-3 text-sm">{b.experience}</td>
                <td className="p-3 text-sm">{b.date}</td>
                <td className="p-3 text-sm">{b.guests}</td>
                <td className="p-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    b.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-400 mt-4 text-center">Dashboard showing mock data. Connect database for live stats.</p>
    </div>
  )
}
