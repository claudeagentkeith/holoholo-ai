'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UnderConstruction from '../../components/UnderConstruction';

export default function CheckoutPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <Header />
      <UnderConstruction message="Payment processing coming soon. Stripe integration in progress." />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Booking Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Experience Summary</h2>
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 bg-teal-100 rounded-lg flex items-center justify-center text-3xl">🐠</div>
                  <div>
                    <p className="font-semibold text-gray-900">Reef Restoration Workshop</p>
                    <p className="text-sm text-gray-500">Maui &middot; Half Day (4 hours)</p>
                    <p className="text-sm text-teal-600">Led by Kai Ocean Adventures</p>
                  </div>
                </div>
                <div className="border-t pt-4 grid grid-cols-3 gap-4 text-sm">
                  <div><p className="text-gray-500">Date</p><p className="font-medium">Apr 15, 2026</p></div>
                  <div><p className="text-gray-500">Time</p><p className="font-medium">8:00 AM</p></div>
                  <div><p className="text-gray-500">Guests</p><p className="font-medium">2 adults</p></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Guest Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-600 mb-1">First Name</label><input className="w-full border rounded-lg px-3 py-2" placeholder="Keith" /></div>
                  <div><label className="block text-sm text-gray-600 mb-1">Last Name</label><input className="w-full border rounded-lg px-3 py-2" placeholder="Herrington" /></div>
                  <div><label className="block text-sm text-gray-600 mb-1">Email</label><input className="w-full border rounded-lg px-3 py-2" placeholder="you@email.com" /></div>
                  <div><label className="block text-sm text-gray-600 mb-1">Phone</label><input className="w-full border rounded-lg px-3 py-2" placeholder="(808) 555-0123" /></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800">Payment processing is in demo mode. No charges will be made.</p>
                </div>
                <div className="space-y-4">
                  <div><label className="block text-sm text-gray-600 mb-1">Card Number</label><input className="w-full border rounded-lg px-3 py-2" placeholder="4242 4242 4242 4242" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm text-gray-600 mb-1">Expiry</label><input className="w-full border rounded-lg px-3 py-2" placeholder="12/28" /></div>
                    <div><label className="block text-sm text-gray-600 mb-1">CVC</label><input className="w-full border rounded-lg px-3 py-2" placeholder="123" /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Reef Restoration Workshop</span><span>$150.00</span></div>
                  <div className="flex justify-between"><span>x 2 guests</span><span>$300.00</span></div>
                  <div className="flex justify-between text-teal-600"><span>Impact fee (supports conservation)</span><span>$15.00</span></div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg"><span>Total</span><span>$315.00</span></div>
                </div>
                <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                  <p className="text-xs text-teal-700 font-medium">Your Impact</p>
                  <p className="text-xs text-teal-600">This booking will help plant 5 coral fragments and fund reef monitoring equipment.</p>
                </div>
                <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition mt-6">
                  Confirm Booking
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">Secure checkout powered by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
