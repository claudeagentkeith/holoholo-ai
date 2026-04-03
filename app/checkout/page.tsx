'use client'

import { useState } from 'react'

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-8">Thank you for choosing regenerative tourism. Check your email for details.</p>
        <a href="/" className="text-teal-700 hover:text-teal-800 font-medium">Return to Home</a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Complete Your Booking</h1>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4">Experience Summary</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Reef Restoration Workshop</span>
          <span className="font-medium">$150.00</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">2 guests x 1 day</span>
          <span className="font-medium">$300.00</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">$300.00</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="font-semibold text-lg mb-4">Payment Details</h2>
        <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded mb-4">
          Payment processing is in demo mode. No charges will be made.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input type="text" placeholder="4242 4242 4242 4242" className="w-full border rounded-lg p-2 text-sm" readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
              <input type="text" placeholder="12/28" className="w-full border rounded-lg p-2 text-sm" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input type="text" placeholder="123" className="w-full border rounded-lg p-2 text-sm" readOnly />
            </div>
          </div>
          <button 
            onClick={() => setSubmitted(true)}
            className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )
}
