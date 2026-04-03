'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import UnderConstruction from '../../components/UnderConstruction';

const regenActivities = [
  { label: 'Reef Restoration', desc: 'Help restore coral reefs with marine biologists', image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=80&h=80&fit=crop' },
  { label: 'Native Reforestation', desc: 'Plant endemic Hawaiian trees and shrubs', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop' },
  { label: 'Coastal Cleanup', desc: 'Beach cleanups and dune restoration', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=80&fit=crop' },
  { label: 'Taro Farming', desc: "Traditional lo'i kalo restoration", image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=80&h=80&fit=crop' },
  { label: 'Wildlife Monitoring', desc: 'Help track endangered Hawaiian species', image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=80&h=80&fit=crop' },
  { label: 'Sea Turtle Conservation', desc: 'Protect nesting sites and hatchlings', image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=80&h=80&fit=crop' },
  { label: 'Wetland Restoration', desc: 'Restore native fishponds and wetlands', image: 'https://images.unsplash.com/photo-1500829243541-74b677fecc30?w=80&h=80&fit=crop' },
  { label: 'Shark Research', desc: 'Tag and track reef sharks for conservation', image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=80&h=80&fit=crop' },
  { label: 'Reef Monitoring', desc: 'Underwater surveys and data collection', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=80&h=80&fit=crop' },
  { label: 'Native Garden Planting', desc: 'Grow endemic Hawaiian plants', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&h=80&fit=crop' },
];

const leisureActivities = [
  { label: 'Diamond Head Hike', desc: 'Iconic crater trail with panoramic views', category: 'Hiking', image: 'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=80&h=80&fit=crop' },
  { label: 'Koko Head Stairs', desc: '1,048 steps to a breathtaking summit', category: 'Hiking', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=80&h=80&fit=crop' },
  { label: 'Manoa Falls Trail', desc: 'Lush rainforest hike to 150ft waterfall', category: 'Hiking', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8b04?w=80&h=80&fit=crop' },
  { label: 'Pillbox Hike (Lanikai)', desc: 'Short hike with stunning Windward views', category: 'Hiking', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=80&h=80&fit=crop' },
  { label: 'Polo at Hawaii Polo Club', desc: 'Watch or play at the North Shore fields', category: 'Sports', image: 'https://images.unsplash.com/photo-1591228127791-8e2eaef4f374?w=80&h=80&fit=crop' },
  { label: 'Golf at Ko Olina', desc: 'Championship course on the Leeward Coast', category: 'Sports', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=80&h=80&fit=crop' },
  { label: 'Surfing Lessons', desc: 'Learn to ride waves at Waikiki Beach', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1502680390548-bdbac40a5296?w=80&h=80&fit=crop' },
  { label: 'Snorkeling at Hanauma Bay', desc: 'World-famous reef snorkeling', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=80&h=80&fit=crop' },
  { label: 'Outrigger Canoe Paddling', desc: 'Traditional Hawaiian canoe experience', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=80&h=80&fit=crop' },
  { label: 'Kitesurfing at Kailua', desc: 'Ride the Windward trade winds', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=80&h=80&fit=crop' },
  { label: 'Dolphin Watching', desc: 'Boat tour along the West Coast', category: 'Tours', image: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=80&h=80&fit=crop' },
  { label: 'Sunset Sailing', desc: 'Catamaran cruise off Waikiki', category: 'Tours', image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=80&h=80&fit=crop' },
  { label: 'Helicopter Tour', desc: 'See the island from above', category: 'Tours', image: 'https://images.unsplash.com/photo-1534321238895-da3ab632df3e?w=80&h=80&fit=crop' },
  { label: 'Photography Tour', desc: 'Capture stunning landscapes with a guide', category: 'Tours', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=80&h=80&fit=crop' },
  { label: 'North Shore Day Trip', desc: 'Big waves, shrimp trucks, and sea turtles', category: 'Tours', image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=80&h=80&fit=crop' },
  { label: 'Traditional Luau', desc: 'Feast, hula, and fire dancing', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=80&h=80&fit=crop' },
  { label: 'Ukulele Workshop', desc: 'Learn the iconic Hawaiian instrument', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=80&h=80&fit=crop' },
  { label: 'Hula Dancing Lesson', desc: 'Learn traditional and modern hula', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=80&h=80&fit=crop' },
  { label: 'Polynesian Cultural Center', desc: 'Explore cultures of the Pacific Islands', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=80&h=80&fit=crop' },
  { label: 'Dole Plantation Tour', desc: "Pineapple gardens and the world's largest maze", category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=80&h=80&fit=crop' },
  { label: 'Local Food Tour', desc: 'Poke, shave ice, plate lunch, and more', category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=80&h=80&fit=crop' },
  { label: 'Craft Brewery Tour', desc: 'Sample local Hawaiian-brewed beers', category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=80&h=80&fit=crop' },
  { label: 'Chocolate Farm Visit', desc: 'Bean-to-bar tasting on the North Shore', category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=80&h=80&fit=crop' },
  { label: 'Beach Yoga', desc: 'Sunrise sessions on the sand', category: 'Wellness', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=80&h=80&fit=crop' },
  { label: 'Lomilomi Massage', desc: 'Traditional Hawaiian healing bodywork', category: 'Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=80&h=80&fit=crop' },
  { label: 'Hawaiian Herbal Medicine', desc: "Learn about la'au lapa'au healing plants", category: 'Wellness', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=80&h=80&fit=crop' },
  { label: 'Aloha Stadium Swap Meet', desc: 'Local crafts, souvenirs, and food stalls', category: 'Shopping', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=80&h=80&fit=crop' },
  { label: 'Pearl Harbor Memorial', desc: 'Visit the USS Arizona and museum', category: 'History', image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=80&h=80&fit=crop' },
  { label: 'Iolani Palace Tour', desc: 'The only royal palace in the US', category: 'History', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=80&h=80&fit=crop' },
  { label: 'Byodo-In Temple', desc: 'Stunning replica temple in the Valley of the Temples', category: 'History', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=80&h=80&fit=crop' },
];

const neighborhoods = ['Waikiki', 'North Shore', 'Ko Olina', 'Kailua', 'Honolulu', 'Lanikai', 'Haleiwa', 'Kapolei'];

export default function ItineraryPage() {
  const [step, setStep] = useState(1);
  const [selectedRegen, setSelectedRegen] = useState<string[]>([]);
  const [selectedLeisure, setSelectedLeisure] = useState<string[]>([]);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tripDetails, setTripDetails] = useState({ neighborhood: '', startDate: '', endDate: '', groupSize: '2', budget: 'moderate', rentalCar: false });
  const [preferences, setPreferences] = useState({ fitnessLevel: 'moderate', pace: 'balanced', schedule: 'flexible', dietary: '' });

  const toggleRegen = (label: string) => {
    setSelectedRegen(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };

  const toggleLeisure = (label: string) => {
    setSelectedLeisure(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };

  const stopWords = ['and', 'or', 'the', 'a', 'an', 'to', 'in', 'for', 'of', 'with', 'on', 'at'];
  const searchWords = searchQuery.toLowerCase().split(/[\s,]+/).filter(w => w.length > 1 && !stopWords.includes(w));
  const matchesSearch = (text: string) => {
    if (searchWords.length === 0) return true;
    const lower = text.toLowerCase();
    return searchWords.some(word => {
      if (lower.includes(word)) return true;
      // Check if any word in the text starts with the search term (or vice versa)
      const textWords = lower.split(/\s+/);
      return textWords.some(tw => tw.startsWith(word) || word.startsWith(tw));
    });
  };
  const filteredRegen = regenActivities.filter(a =>
    matchesSearch(a.label) || matchesSearch(a.desc)
  );

  const filteredLeisure = leisureActivities.filter(a =>
    matchesSearch(a.label) || matchesSearch(a.desc) || matchesSearch(a.category)
  );

  const categories = Array.from(new Set(filteredLeisure.map(a => a.category)));

  return (
    <>
      <Header />
      <UnderConstruction message="AI itinerary generation coming soon! This is a preview of the experience." />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Generate Your Itinerary</h1>
        <p className="text-gray-600 mb-8">Tell us about your trip and our AI will craft a personalized regenerative tourism experience.</p>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          {[{ n: 1, label: 'Activities' }, { n: 2, label: 'Trip Details' }, { n: 3, label: 'Preferences' }].map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.n ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s.n}</div>
              <span className={`ml-2 text-sm ${step >= s.n ? 'text-teal-700 font-medium' : 'text-gray-400'}`}>{s.label}</span>
              {i < 2 && <div className={`w-24 h-0.5 mx-4 ${step > s.n ? 'bg-teal-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            {/* Search Filter */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="List everything you want to do â e.g. luau beaches and hikes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-lg"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-2 text-sm text-gray-500">
                  Showing {filteredRegen.length + filteredLeisure.length} matching activities
                </p>
              )}
            </div>

            {/* Regenerative & Eco Activities */}
            {filteredRegen.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">&#x1F331;</span> Regenerative &amp; Eco Activities
                </h2>
                <p className="text-gray-600 mb-4 text-sm">These experiences directly contribute to Hawaii&apos;s environmental and cultural restoration. Your participation creates measurable positive impact.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredRegen.map(a => (
                    <button
                      key={a.label}
                      onClick={() => toggleRegen(a.label)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                        selectedRegen.includes(a.label)
                          ? 'border-teal-500 bg-teal-50 shadow-md'
                          : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                      }`}
                    >
                      <img src={a.image} alt={a.label} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-sm">{a.label}</span>
                        <p className="text-xs text-gray-500">{a.desc}</p>
                      </div>
                      {selectedRegen.includes(a.label) && <span className="ml-auto text-teal-600">&#x2713;</span>}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Divider */}
            {filteredRegen.length > 0 && filteredLeisure.length > 0 && <hr className="my-8 border-gray-200" />}

            {/* Leisure, Culture & Adventure */}
            {filteredLeisure.length > 0 && (
              <section className="mb-10 bg-amber-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className="text-2xl">&#x2728;</span> Leisure, Culture &amp; Adventure
                </h2>
                <p className="text-gray-600 mb-4 text-sm">Round out your itinerary with the best of Oahu. These activities can be seamlessly woven into your trip alongside your eco experiences.</p>

                {categories.map(category => {
                  const items = filteredLeisure.filter(a => a.category === category);
                  const isExpanded = !collapsedCategories.includes(category);

                  return (
                    <div key={category} className="mb-4">
                      <button
                        onClick={() => setCollapsedCategories(prev => isExpanded ? [...prev, category] : prev.filter(c => c !== category))}
                        className="w-full flex items-center justify-between py-3 px-2 border-b border-amber-200 hover:bg-amber-100 rounded-lg transition-colors"
                      >
                        <span className="font-semibold text-gray-800">{category} <span className="text-xs bg-amber-200 text-amber-800 rounded-full px-2 py-0.5 ml-2">{items.length}</span></span>
                        <span className="text-amber-600">{isExpanded ? '\u25B2' : '\u25BC'}</span>
                      </button>
                      {isExpanded && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {items.map(a => (
                            <button
                              key={a.label}
                              onClick={() => toggleLeisure(a.label)}
                              className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                                selectedLeisure.includes(a.label)
                                  ? 'border-amber-500 bg-amber-100 shadow-md'
                                  : 'border-amber-100 bg-white hover:border-amber-300'
                              }`}
                            >
                              <img src={a.image} alt={a.label} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                              <div>
                                <span className="font-semibold text-sm">{a.label}</span>
                                <p className="text-xs text-gray-500">{a.desc}</p>
                              </div>
                              {selectedLeisure.includes(a.label) && <span className="ml-auto text-amber-600">&#x2713;</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            )}

            {filteredRegen.length === 0 && filteredLeisure.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No activities match &ldquo;{searchQuery}&rdquo;</p>
                <button onClick={() => setSearchQuery('')} className="mt-2 text-teal-600 hover:underline">Clear search</button>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <div className="text-sm text-gray-500">
                {selectedRegen.length + selectedLeisure.length} activities selected
              </div>
              <button
                onClick={() => setStep(2)}
                className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
              >
                Next: Trip Details &rarr;
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Trip Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Area</label>
                <select
                  value={tripDetails.neighborhood}
                  onChange={(e) => setTripDetails({...tripDetails, neighborhood: e.target.value})}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select a neighborhood</option>
                  {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                <input
                  type="number"
                  value={tripDetails.groupSize}
                  onChange={(e) => setTripDetails({...tripDetails, groupSize: e.target.value})}
                  className="w-full border rounded-xl p-3"
                  min="1" max="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={tripDetails.startDate}
                  onChange={(e) => setTripDetails({...tripDetails, startDate: e.target.value})}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={tripDetails.endDate}
                  onChange={(e) => setTripDetails({...tripDetails, endDate: e.target.value})}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Level</label>
                <select
                  value={tripDetails.budget}
                  onChange={(e) => setTripDetails({...tripDetails, budget: e.target.value})}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="budget">Budget-Friendly</option>
                  <option value="moderate">Moderate</option>
                  <option value="premium">Premium</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  checked={tripDetails.rentalCar}
                  onChange={(e) => setTripDetails({...tripDetails, rentalCar: e.target.checked})}
                  className="w-5 h-5 text-teal-600"
                />
                <label className="text-sm text-gray-700">I will have a rental car</label>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="text-gray-600 px-6 py-3 rounded-xl border hover:bg-gray-50">&larr; Back</button>
              <button onClick={() => setStep(3)} className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700">Next: Preferences &rarr;</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Your Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Level</label>
                <select
                  value={preferences.fitnessLevel}
                  onChange={(e) => setPreferences({...preferences, fitnessLevel: e.target.value})}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="easy">Easy - Light walking only</option>
                  <option value="moderate">Moderate - Some hiking OK</option>
                  <option value="active">Active - Love a good workout</option>
                  <option value="intense">Intense - Challenge me!</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trip Pace</label>
                <select
                  value={preferences.pace}
                  onChange={(e) => setPreferences({...preferences, pace: e.target.value})}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="relaxed">Relaxed - Plenty of free time</option>
                  <option value="balanced">Balanced - Mix of activities and downtime</option>
                  <option value="packed">Packed - Fill every day</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Preference</label>
                <select
                  value={preferences.schedule}
                  onChange={(e) => setPreferences({...preferences, schedule: e.target.value})}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="early">Early Bird - Start at sunrise</option>
                  <option value="flexible">Flexible - No strong preference</option>
                  <option value="late">Night Owl - Sleep in, stay up late</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Restrictions</label>
                <input
                  type="text"
                  placeholder="e.g. Vegetarian, Gluten-free, None"
                  value={preferences.dietary}
                  onChange={(e) => setPreferences({...preferences, dietary: e.target.value})}
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(2)} className="text-gray-600 px-6 py-3 rounded-xl border hover:bg-gray-50">&larr; Back</button>
              <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700">Generate My Itinerary &#x2728;</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
