'use client';

import UnderConstruction from '../../../components/UnderConstruction';

export default function OperatorProfile() {
  return (
    <>
      <UnderConstruction message="Operator profiles coming soon. Preview of the profile layout." />
      <div className="p-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Operator Profile</h1>
        
        <div className="bg-white rounded-xl border p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-4xl">🌊</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">Kai Ocean Adventures</h2>
              <p className="text-teal-600 text-sm mb-2">Maui, Hawaii</p>
              <p className="text-gray-600 text-sm mb-4">We specialize in ocean conservation experiences, connecting visitors with marine biologists to help restore coral reefs and protect marine life along Maui&apos;s coastline.</p>
              <div className="flex gap-6 text-sm">
                <div><span className="font-bold text-gray-900">8</span> <span className="text-gray-500">Experiences</span></div>
                <div><span className="font-bold text-gray-900">234</span> <span className="text-gray-500">Bookings</span></div>
                <div><span className="font-bold text-gray-900">4.9</span> <span className="text-gray-500">Rating</span></div>
                <div><span className="font-bold text-teal-600">96</span> <span className="text-gray-500">Impact Score</span></div>
              </div>
            </div>
            <button className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg text-sm hover:bg-teal-50 transition">Edit Profile</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold mb-4">Active Experiences</h3>
            <div className="space-y-3">
              {[
                { name: 'Reef Restoration Workshop', price: '$150', status: 'Active' },
                { name: 'Snorkel & Conservation Tour', price: '$95', status: 'Active' },
                { name: 'Marine Biology Deep Dive', price: '$200', status: 'Draft' },
                { name: 'Sunset Reef Monitoring', price: '$120', status: 'Active' },
              ].map(exp => (
                <div key={exp.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{exp.name}</p>
                    <p className="text-xs text-gray-500">{exp.price}/person</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${exp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{exp.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-semibold mb-4">Impact Dashboard</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">1,200</p>
                <p className="text-xs text-gray-600">Coral Fragments Planted</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <p className="text-2xl font-bold text-teal-700">3.2 mi</p>
                <p className="text-xs text-gray-600">Reef Monitored</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <p className="text-2xl font-bold text-amber-700">456</p>
                <p className="text-xs text-gray-600">Guests Educated</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">98%</p>
                <p className="text-xs text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-semibold mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah M.', rating: 5, text: 'Incredible experience! The marine biologists were so knowledgeable and passionate.', date: 'Mar 28' },
              { name: 'David L.', rating: 5, text: 'Best thing we did in Maui. Our kids loved planting coral and learning about the reef.', date: 'Mar 22' },
            ].map(review => (
              <div key={review.name} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{review.name}</span>
                  <span className="text-yellow-500 text-sm">{'\u2605'.repeat(review.rating)}</span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
