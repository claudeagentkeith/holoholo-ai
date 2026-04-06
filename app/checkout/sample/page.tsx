'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SampleCheckoutPage() {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleCheckout = async () => {
    setProcessing(true);
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/trip/sample');
  };

  const lineItems = [
    { name: 'Regenerative Activities (5)', price: 425 },
    { name: 'Leisure Activities (7)', price: 380 },
    { name: 'Local Transport Coordination', price: 95 },
    { name: 'Impact Tracking & Certification', price: 50 },
  ];
  const subtotal = lineItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
            🌺 Holoholo.ai
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/preview/sample" className="hover:text-gray-900">← Back to Preview</Link>
          </nav>
        </div>
      </header>

      {/* Under Construction Banner */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
        <div className="bg-yellow-400 text-black px-8 py-4 rounded-lg shadow-2xl rotate-[-2deg] pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚧</span>
            <div>
              <p className="font-bold text-lg">Sample Checkout</p>
              <p className="text-sm opacity-80">This is a demo — no real payment is processed</p>
            </div>
            <span className="text-2xl">🚧</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
        <p className="text-gray-600 mb-8">Unlock your full itinerary and secure spots with verified regenerative operators.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Smith"
                    className="w-full border rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full border rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment (mock) */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full border rounded-lg px-4 py-2.5 text-gray-900 bg-gray-50"
                    disabled
                  />
                  <p className="text-xs text-gray-400 mt-1">Stripe integration coming soon</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full border rounded-lg px-4 py-2.5 text-gray-900 bg-gray-50" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full border rounded-lg px-4 py-2.5 text-gray-900 bg-gray-50" disabled />
                  </div>
                </div>
              </div>
            </div>

            {/* What you get */}
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
              <h2 className="text-lg font-semibold text-emerald-800 mb-3">✅ What You Get</h2>
              <ul className="space-y-2 text-sm text-emerald-700">
                <li className="flex items-start gap-2"><span>🌱</span> Full activity details revealed (names, locations, operators)</li>
                <li className="flex items-start gap-2"><span>📅</span> Confirmed reservations with all 12 activities</li>
                <li className="flex items-start gap-2"><span>📱</span> Real-time trip updates via SMS and email</li>
                <li className="flex items-start gap-2"><span>⭐</span> Personal regenerative impact certificate</li>
                <li className="flex items-start gap-2"><span>📞</span> 24/7 concierge support during your trip</li>
              </ul>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="text-sm text-gray-600 mb-2">3-Day O\'ahu Regenerative Trip</div>
              <div className="text-xs text-gray-400 mb-4">2 travelers • Balanced budget</div>

              <div className="space-y-3 border-t pt-4">
                {lineItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="text-gray-900 font-medium">${item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service fee (12%)</span>
                  <span className="text-gray-900">${serviceFee}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-emerald-700">${total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Complete Booking (Demo)'}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                This is a demo — no payment will be charged
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-1">🌺 Holoholo.ai</p>
          <p className="text-gray-400 text-sm">Regenerative Tourism, Powered by AI</p>
        </div>
      </footer>
    </>
  );
}
