'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UnderConstruction from '../../components/UnderConstruction';

const regenActivities = [
  { icon: '🐠', label: 'Reef Restoration', desc: 'Plant coral fragments with marine biologists' },
  { icon: '🌿', label: 'Native Reforestation', desc: 'Restore native koa and ohia forests' },
  { icon: '🏖️', label: 'Coastal Cleanup', desc: 'Beach cleanups and dune restoration' },
  { icon: '🌾', label: 'Taro Farming', desc: 'Traditional lo\'i kalo restoration' },
  { icon: '🐦', label: 'Wildlife Monitoring', desc: 'Help track endangered Hawaiian species' },
  { icon: '🐢', label: 'Sea Turtle Conservation', desc: 'Protect nesting sites and hatchlings' },
  { icon: '🌊', label: 'Wetland Restoration', desc: 'Restore native fishponds and wetlands' },
  { icon: '🦈', label: 'Shark Research', desc: 'Tag and track reef sharks for conservation' },
  { icon: '🪸', label: 'Reef Monitoring', desc: 'Underwater surveys and data collection' },
  { icon: '🌺', label: 'Native Garden Planting', desc: 'Grow endemic Hawaiian plants' },
];

const leisureActivities = [
  { icon: '🥾', label: 'Diamond Head Hike', desc: 'Iconic crater trail with panoramic views', category: 'Hiking' },
  { icon: '⛰️', label: 'Koko Head Stairs', desc: '1,048 steps to a breathtaking summit', category: 'Hiking' },
  { icon: '🌄', label: 'Manoa Falls Trail', desc: 'Lush rainforest hike to 150ft waterfall', category: 'Hiking' },
  { icon: '🏔️', label: 'Pillbox Hike (Lanikai)', desc: 'Short hike with stunning Windward views', category: 'Hiking' },
  { icon: '🐎', label: 'Polo at Hawaii Polo Club', desc: 'Watch or play at the North Shore fields', category: 'Sports' },
  { icon: '🏄', label: 'Surfing Lessons', desc: 'Learn to ride waves at Waikiki Beach', category: 'Water Sports' },
  { icon: '🤿', label: 'Snorkeling at Hanauma Bay', desc: 'World-famous reef snorkeling', category: 'Water Sports' },
  { icon: '🛶', label: 'Outrigger Canoe Paddling', desc: 'Traditional Hawaiian canoe experience', category: 'Water Sports' },
  { icon: '🪁', label: 'Kitesurfing at Kailua', desc: 'Ride the Windward trade winds', category: 'Water Sports' },
  { icon: '🐬', label: 'Dolphin Watching', desc: 'Boat tour along the West Coast', category: 'Tours' },
  { icon: '🌅', label: 'Sunset Sailing', desc: 'Catamaran cruise off Waikiki', category: 'Tours' },
  { icon: '🚁', label: 'Helicopter Tour', desc: 'See the island from above', category: 'Tours' },
  { icon: '🔥', label: 'Traditional Luau', desc: 'Feast, hula, and fire dancing', category: 'Culture & Entertainment' },
  { icon: '🎶', label: 'Ukulele Workshop', desc: 'Learn the iconic Hawaiian instrument', category: 'Culture & Entertainment' },
  { icon: '💃', label: 'Hula Dancing Lesson', desc: 'Learn traditional and modern hula', category: 'Culture & Entertainment' },
  { icon: '🎭', label: 'Polynesian Cultural Center', desc: 'Explore cultures of the Pacific Islands', category: 'Culture & Entertainment' },
  { icon: '🍍', label: 'Dole Plantation Tour', desc: 'Pineapple gardens and the world\'s largest maze', category: 'Food & Drink' },
  { icon: '🍣', label: 'Local Food Tour', desc: 'Poke, shave ice, plate lunch, and more', category: 'Food & Drink' },
  { icon: '🍺', label: 'Craft Brewery Tour', desc: 'Sample local Hawaiian-brewed beers', category: 'Food & Drink' },
  { icon: '🍫', label: 'Chocolate Farm Visit', desc: 'Bean-to-bar tasting on the North Shore', category: 'Food & Drink' },
  { icon: '🧘', label: 'Beach Yoga', desc: 'Sunrise sessions on the sand', category: 'Wellness' },
  { icon: '💆', label: 'Lomilomi Massage', desc: 'Traditional Hawaiian healing bodywork', category: 'Wellness' },
  { icon: '🌿', label: 'Hawaiian Herbal Medicine', desc: 'Learn about la\'au lapa\'au healing plants', category: 'Wellness' },
  { icon: '🏌️', label: 'Golf at Ko Olina', desc: 'Championship course on the Leeward Coast', category: 'Sports' },
  { icon: '📸', label: 'Photography Tour', desc: 'Capture stunning landscapes with a guide', category: 'Tours' },
  { icon: '🛍️', label: 'Aloha Stadium Swap Meet', desc: 'Local crafts, souvenirs, and food stalls', category: 'Shopping' },
  { icon: '🗿', label: 'Pearl Harbor Memorial', desc: 'Visit the USS Arizona and museum', category: 'History' },
  { icon: '🏛️', label: 'Iolani Palace Tour', desc: 'The only royal palace in the US', category: 'History' },
  { icon: '⛩️', label: 'Byodo-In Temple', desc: 'Stunning replica temple in the Valley of the Temples', category: 'History' },
  { icon: '🌋', label: 'North Shore Day Trip', desc: 'Big waves, shrimp trucks, and sea turtles', category: 'Tours' },
];

const leisureCategories = [...new Set(leisureActivities.map(a => a.category))];

export default function ItineraryPage() {
  const [step, setStep] = useState(1);
  const [selectedRegen, setSelectedRegen] = useState<string[]>([]);
  const [selectedLeisure, setSelectedLeisure] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleRegen = (label: string) => {
    setSelectedRegen(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };
  const toggleLeisure = (label: string) => {
    setSelectedLeisure(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };

  return (
    <>
      <Header />
      <UnderConstruction message="AI itinerary generation coming soon! This is a preview of the experience." />
      <main className="min-h-screen bg-gray-50 pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Your Itinerary</h1>
          <p className="text-gray-600 mb-8">Tell us about your trip and our AI will craft a personalized regenerative tourism experience.</p>
          
          {/* Progress Steps */}
          <div className="flex items-center mb-10">
            {['Activities', 'Trip Details', 'Preferences'].map((label, i) => (
              <div key={label} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-teal-600 text-white' : step === i + 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {step > i + 1 ? '\u2713' : i + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${step === i + 1 ? 'text-teal-700' : 'text-gray-400'}`}>{label}</span>
                {i < 2 && <div className={`flex-1 h-0.5 mx-3 ${step > i + 1 ? 'bg-teal-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Activities Selection */}
          {step === 1 && (
            <div className="space-y-8">
              {/* Regenerative Activities */}
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌱</span>
                  <h2 className="text-xl font-semibold text-gray-900">Regenerative & Eco Activities</h2>
                </div>
                <p className="text-sm text-gray-500 mb-6">These experiences directly contribute to Hawaii\'s environmental and cultural restoration. Your participation creates measurable positive impact.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {regenActivities.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => toggleRegen(item.label)}
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg transition text-left ${selectedRegen.includes(item.label) ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500' : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50'}`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      {selectedRegen.includes(item.label) && <span className="text-teal-600 font-bold">\u2713</span>}
                    </button>
                  ))}
                </div>
                {selectedRegen.length > 0 && (
                  <p className="mt-4 text-sm text-teal-700 font-medium">{selectedRegen.length} regenerative {selectedRegen.length === 1 ? 'activity' : 'activities'} selected</p>
                )}
              </div>

              {/* Leisure & Culture Activities */}
              <div className="bg-white rounded-xl shadow-sm border p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌴</span>
                  <h2 className="text-xl font-semibold text-gray-900">Leisure, Culture & Adventure</h2>
                </div>
                <p className="text-sm text-gray-500 mb-6">Round out your itinerary with the best of Oahu. These activities can be seamlessly woven into your trip alongside your eco experiences.</p>
                
                {leisureCategories.map(category => {
                  const catActivities = leisureActivities.filter(a => a.category === category);
                  const selectedInCat = catActivities.filter(a => selectedLeisure.includes(a.label)).length;
                  const isExpanded = expandedCategory === category;
                  
                  return (
                    <div key={category} className="mb-4">
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : category)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{category}</span>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{catActivities.length}</span>
                          {selectedInCat > 0 && (
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{selectedInCat} selected</span>
                          )}
                        </div>
                        <span className="text-gray-400">{isExpanded ? '\u25B2' : '\u25BC'}</span>
                      </button>
                      {isExpanded && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pl-2">
                          {catActivities.map(item => (
                            <button
                              key={item.label}
                              onClick={() => toggleLeisure(item.label)}
                              className={`flex items-start gap-3 p-3 border-2 rounded-lg transition text-left ${selectedLeisure.includes(item.label) ? 'border-amber-400 bg-amber-50 ring-1 ring-amber-400' : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'}`}
                            >
                              <span className="text-xl">{item.icon}</span>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                              </div>
                              {selectedLeisure.includes(item.label) && <span className="text-amber-600 font-bold">\u2713</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {selectedLeisure.length > 0 && (
                  <p className="mt-4 text-sm text-amber-700 font-medium">{selectedLeisure.length} leisure {selectedLeisure.length === 1 ? 'activity' : 'activities'} selected</p>
                )}
              </div>

              {/* Selection Summary & Continue */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your Selections</h3>
                {selectedRegen.length === 0 && selectedLeisure.length === 0 ? (
                  <p className="text-sm text-gray-400">No activities selected yet. Pick at least one to continue.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedRegen.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedRegen.map(label => (
                          <span key={label} className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">{label}</span>
                        ))}
                      </div>
                    )}
                    {selectedLeisure.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedLeisure.map(label => (
                          <span key={label} className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">{label}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedRegen.length === 0 && selectedLeisure.length === 0}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${selectedRegen.length > 0 || selectedLeisure.length > 0 ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Continue to Trip Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Trip Details */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h2 className="text-xl font-semibold mb-6">Trip Details</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Where on Oahu are you staying?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Waikiki', 'North Shore', 'Ko Olina', 'Kailua', 'Honolulu', 'Other'].map(area => (
                      <button key={area} className="py-2 px-3 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">{area}</button>
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
                <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Do you have a rental car?</label>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">Yes</button>
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">No</button>
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">Planning to rent</button>
                  </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pace</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option>Relaxed - one activity per day, lots of free time</option>
                    <option>Balanced - morning activity, free afternoon</option>
                    <option>Active - 2-3 activities per day</option>
                    <option>Packed - maximize every hour</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Early bird or night owl?</label>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">🌅 Early Riser</button>
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">☀️ Mid-Morning</button>
                    <button className="flex-1 py-2 border-2 border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition">🌙 Night Owl</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dietary preferences</label>
                  <div className="flex flex-wrap gap-2">
                    {['No restrictions', 'Vegetarian', 'Vegan', 'Gluten-free', 'Pescatarian', 'Halal', 'Kosher'].map(diet => (
                      <button key={diet} className="py-1.5 px-3 border-2 border-gray-200 rounded-full text-xs hover:border-teal-500 hover:bg-teal-50 transition">{diet}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anything else we should know?</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24" placeholder="Accessibility needs, special occasions, kids in the group, must-see spots..." />
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
