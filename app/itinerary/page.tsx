'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UnderConstruction from '../../components/UnderConstruction';

export default function ItineraryPage() {
  const [step, setStep] = useState(1);

  return (
    <>
      <Header />
      <UnderConstruction message="AI itinerary generation coming soon! This is a preview of the experience." />
      <main className="min-h-screen bg-gray-50 pt-8 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Your Itinerary</h1>
          <p className="text-gray-600 mb-8">Tell us about your trip and our AI will craft a personalized regenerative tourism experience.</p>
          
          {/* Progress Steps */}
          <div className="flex items-center mb-10">
            {['Interests', 'Trip Details', 'Preferences'].map((label, i) => (
              <div key={label} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-teal-600 text-white' : step === i + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > i + 1 ? '\u2713' : i + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${step === i + 1 ? 'text-teal-700' : 'text-gray-400'}`}>{label}</span>
                {i < 2 && <div className={`flex-1 h-0.5 mx-3 ${step > i + 1 ? 'bg-teal-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Interests */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-xl font-semibold mb-6">What interests you most?</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '🐠', label: 'Ocean Conservation', desc: 'Reef restoration, marine life' },
                  { icon: '🌿', label: 'Reforestation', desc: 'Native tree planting, trail work' },
                  { icon: '🌾', label: 'Agriculture', desc: 'Taro farming, local food systems' },
                  { icon: '🎨', label: 'Cultural Heritage', desc: 'Traditional arts, navigation' },
                  { icon: '🐦', label: 'Wildlife', desc: 'Bird monitoring, species protection' },
                  { icon: '🏖️', label: 'Coastal Care', desc: 'Beach cleanup, dune restoration' },
                ].map((item) => (
                  <button key={item.label} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition text-left">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Trip Details */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-xl font-semibold mb-6">Trip Details</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Which island(s)?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Oahu', 'Maui', 'Big Island', 'Kauai', 'Molokai', 'Lanai'].map(island => (
                      <button key={island} className="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">{island}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                    <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>1 traveler</option>
                    <option>2 travelers</option>
                    <option>3-4 travelers</option>
                    <option>5-8 travelers</option>
                    <option>9+ travelers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Budget-friendly (under $100/day)</option>
                    <option>Moderate ($100-250/day)</option>
                    <option>Premium ($250-500/day)</option>
                    <option>Luxury ($500+/day)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">Continue</button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-xl font-semibold mb-6">Final Preferences</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Level</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Easy - minimal physical activity</option>
                    <option>Moderate - some hiking/swimming</option>
                    <option>Active - comfortable with physical challenges</option>
                    <option>Adventurous - bring it on!</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact Focus</label>
                  <p className="text-xs text-gray-500 mb-2">What kind of positive impact matters most to you?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Environmental Restoration', 'Cultural Preservation', 'Community Support', 'Education & Awareness'].map(focus => (
                      <button key={focus} className="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">{focus}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anything else we should know?</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24" placeholder="Dietary needs, accessibility requirements, special occasions..." />
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">Back</button>
                <button className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2">
                  <span>✨</span> Generate My Itinerary
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
