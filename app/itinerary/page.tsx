'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


/* Inline UnderConstruction */
function UnderConstruction({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" style={{ background: 'rgba(0,0,0,0.0)' }}>
      <div className="pointer-events-auto bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl shadow-2xl transform -rotate-2 border-4 border-yellow-600">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚧</span>
          <div>
            <p className="font-bold text-xl">Under Construction</p>
            <p className="text-sm text-gray-700">{message || 'This page is being built. Check back soon!'}</p>
          </div>
          <span className="text-3xl">🚧</span>
        </div>
      </div>
    </div>
  );
}


/* Inline Header */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
    { label: 'Operator Login', href: '/operator' },
  ];
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌺</span>
          <span className="text-xl font-bold text-emerald-700">Holoholo.ai</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-emerald-600 text-gray-600">
              {link.label}
            </Link>
          ))}
          <Link href="/itinerary" className="text-sm font-medium px-4 py-2 rounded-full bg-emerald-600 text-white">
            Plan Your Trip
          </Link>
        </nav>
        <button className="md:hidden text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="block text-sm text-gray-600 py-2">{link.label}</Link>
          ))}
          <Link href="/itinerary" className="block text-sm font-medium text-emerald-700 py-2">Plan Your Trip</Link>
        </div>
      )}
    </header>
  );
}


/* Inline Footer */
function SiteFooter() {
  const year = new Date().getFullYear();
  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '#contact' },
  ];
  return (
    <footer className="bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Holoholo.ai LLC</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <p>1000 Bishop St, Suite 800</p>
              <p>Honolulu, HI 96813</p>
            </div>
            <p className="text-sm italic text-gray-400 mt-4">
              “Experience Hawaiʻi. Give back to Hawaiʻi.”
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-gray-400">© {year} Holoholo.ai LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}


const regenActivities = [
  { label: 'Reef Restoration', desc: 'Help restore coral reefs with marine biologists', image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=80&h=80&fit=crop', impactScore: 8.5 },
  { label: 'Native Reforestation', desc: 'Plant endemic Hawaiian trees and shrubs', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&h=80&fit=crop', impactScore: 9.2 },
  { label: 'Coastal Cleanup', desc: 'Beach cleanups and dune restoration', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=80&fit=crop', impactScore: 7.8 },
  { label: 'Taro Farming', desc: "Traditional lo'i kalo restoration", image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=80&h=80&fit=crop', impactScore: 8.1 },
  { label: 'Wildlife Monitoring', desc: 'Help track endangered Hawaiian species', image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=80&h=80&fit=crop', impactScore: 7.5 },
  { label: 'Sea Turtle Conservation', desc: 'Protect nesting sites and hatchlings', image: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=80&h=80&fit=crop', impactScore: 9 },
  { label: 'Wetland Restoration', desc: 'Restore native fishponds and wetlands', image: 'https://images.unsplash.com/photo-1500829243541-74b677fecc30?w=80&h=80&fit=crop', impactScore: 8.3 },
  { label: 'Shark Research', desc: 'Tag and track reef sharks for conservation', image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=80&h=80&fit=crop', impactScore: 7.9 },
  { label: 'Reef Monitoring', desc: 'Underwater surveys and data collection', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=80&h=80&fit=crop', impactScore: 8.7 },
  { label: 'Native Garden Planting', desc: 'Grow endemic Hawaiian plants', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&h=80&fit=crop', impactScore: 7.6 },
  { label: 'Kahuku Farms Tour', desc: 'Family-owned North Shore farm tour with tropical fruit tasting and smoothie bar', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=80&h=80&fit=crop', impactScore: 8 },
  { label: 'Ma\'o Organic Farms', desc: 'Youth-led organic farm in Waianae supporting community food sovereignty', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=80&h=80&fit=crop', impactScore: 8.4 },
  { label: 'Frankie\'s Nursery', desc: 'Family-run tropical fruit nursery and farm tours in Waimanalo', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=80&h=80&fit=crop', impactScore: 7.7 },
  { label: 'Gunstock Ranch', desc: 'Multi-generational family ranch with horseback riding and farm-to-table dining', image: 'https://images.unsplash.com/photo-1516367480789-5d2e7b1e7e0e?w=80&h=80&fit=crop', impactScore: 7.3 },
  { label: 'Waimea Valley', desc: 'Community-supported botanical garden and cultural preserve', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=80&h=80&fit=crop', impactScore: 9.1 },
  { label: 'Kuilima Farm', desc: 'HTA-accredited 468-acre regenerative farm at Turtle Bay with guided agricultural tours', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=80&h=80&fit=crop', impactScore: 9.5 },
  { label: 'North Shore EcoTours', desc: 'HTA-accredited Native Hawaiian-owned eco-tours through private conservation land in Haleiwa', image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=80&h=80&fit=crop', impactScore: 8.8 },
  { label: 'Kahumana Organic Farm', desc: 'Certified organic farm in Lualualei Valley since 1978 with permaculture tours and cafe', image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c8b32?w=80&h=80&fit=crop', impactScore: 8.2 },
  { label: 'Paepae o He\'eia', desc: 'Restore an ancient Hawaiian fishpond in Kaneohe through hands-on community work days', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop', impactScore: 9.8 },
];

const leisureActivities = [
  { label: 'Diamond Head Hike', desc: 'Iconic crater trail with panoramic views', category: 'Hiking', image: 'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=80&h=80&fit=crop', impactScore: -1.2 },
  { label: 'Koko Head Stairs', desc: '1,048 steps to a breathtaking summit', category: 'Hiking', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=80&h=80&fit=crop', impactScore: -1.5 },
  { label: 'Manoa Falls Trail', desc: 'Lush rainforest hike to 150ft waterfall', category: 'Hiking', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8b04?w=80&h=80&fit=crop', impactScore: -0.8 },
  { label: 'Pillbox Hike (Lanikai)', desc: 'Short hike with stunning Windward views', category: 'Hiking', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=80&h=80&fit=crop', impactScore: -1.8 },
  { label: 'Polo at Hawaii Polo Club', desc: 'Watch or play at the North Shore fields', category: 'Sports', image: 'https://images.unsplash.com/photo-1591228127791-8e2eaef4f374?w=80&h=80&fit=crop', impactScore: -1 },
  { label: 'Golf at Ko Olina', desc: 'Championship course on the Leeward Coast', category: 'Sports', image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=80&h=80&fit=crop', impactScore: -1.3 },
  { label: 'Surfing Lessons', desc: 'Learn to ride waves at Waikiki Beach', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1502680390548-bdbac40a5296?w=80&h=80&fit=crop', impactScore: -0.5 },
  { label: 'Snorkeling at Hanauma Bay', desc: 'World-famous reef snorkeling', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=80&h=80&fit=crop', impactScore: -0.9 },
  { label: 'Outrigger Canoe Paddling', desc: 'Traditional Hawaiian canoe experience', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=80&h=80&fit=crop', impactScore: -1.6 },
  { label: 'Kitesurfing at Kailua', desc: 'Ride the Windward trade winds', category: 'Water Sports', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=80&h=80&fit=crop', impactScore: -1.1 },
  { label: 'Dolphin Watching', desc: 'Boat tour along the West Coast', category: 'Tours', image: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=80&h=80&fit=crop', impactScore: -0.7 },
  { label: 'Sunset Sailing', desc: 'Catamaran cruise off Waikiki', category: 'Tours', image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=80&h=80&fit=crop', impactScore: -1.4 },
  { label: 'Helicopter Tour', desc: 'See the island from above', category: 'Tours', image: 'https://images.unsplash.com/photo-1534321238895-da3ab632df3e?w=80&h=80&fit=crop', impactScore: -0.6 },
  { label: 'Photography Tour', desc: 'Capture stunning landscapes with a guide', category: 'Tours', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=80&h=80&fit=crop', impactScore: -1.7 },
  { label: 'North Shore Day Trip', desc: 'Big waves, shrimp trucks, and sea turtles', category: 'Tours', image: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=80&h=80&fit=crop', impactScore: -0.4 },
  { label: 'Traditional Luau', desc: 'Feast, hula, and fire dancing', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=80&h=80&fit=crop', impactScore: -1.9 },
  { label: 'Ukulele Workshop', desc: 'Learn the iconic Hawaiian instrument', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=80&h=80&fit=crop', impactScore: -0.3 },
  { label: 'Hula Dancing Lesson', desc: 'Learn traditional and modern hula', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?w=80&h=80&fit=crop', impactScore: -1 },
  { label: 'Polynesian Cultural Center', desc: 'Explore cultures of the Pacific Islands', category: 'Culture & Entertainment', image: 'https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=80&h=80&fit=crop', impactScore: -0.8 },
  { label: 'Dole Plantation Tour', desc: "Pineapple gardens and the world's largest maze", category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=80&h=80&fit=crop', impactScore: -1.2 },
  { label: 'Local Food Tour', desc: 'Poke, shave ice, plate lunch, and more', category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=80&h=80&fit=crop', impactScore: -0.5 },
  { label: 'Craft Brewery Tour', desc: 'Sample local Hawaiian-brewed beers', category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=80&h=80&fit=crop', impactScore: -1.5 },
  { label: 'Chocolate Farm Visit', desc: 'Bean-to-bar tasting on the North Shore', category: 'Food & Drink', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=80&h=80&fit=crop', impactScore: -0.9 },
  { label: 'Beach Yoga', desc: 'Sunrise sessions on the sand', category: 'Wellness', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=80&h=80&fit=crop', impactScore: -1.3 },
  { label: 'Lomilomi Massage', desc: 'Traditional Hawaiian healing bodywork', category: 'Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=80&h=80&fit=crop', impactScore: -0.7 },
  { label: 'Hawaiian Herbal Medicine', desc: "Learn about la'au lapa'au healing plants", category: 'Wellness', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=80&h=80&fit=crop', impactScore: -1.1 },
  { label: 'Aloha Stadium Swap Meet', desc: 'Local crafts, souvenirs, and food stalls', category: 'Shopping', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=80&h=80&fit=crop', impactScore: -0.6 },
  { label: 'Pearl Harbor Memorial', desc: 'Visit the USS Arizona and museum', category: 'History', image: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=80&h=80&fit=crop', impactScore: -1.4 },
  { label: 'Iolani Palace Tour', desc: 'The only royal palace in the US', category: 'History', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=80&h=80&fit=crop', impactScore: -0.8 },
  { label: 'Byodo-In Temple', desc: 'Stunning replica temple in the Valley of the Temples', category: 'History', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=80&h=80&fit=crop', impactScore: -1 },
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

  
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    router.push('/preview/sample');
  };
      const res = await fetch('/api/preview-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.publicId) router.push('/preview/' + data.publicId);
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

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
      <UnderConstruction message={"AI itinerary generation coming soon! Browse activities and explore the experience."} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{"Generate Your Itinerary"}</h1>
        <p className="text-gray-600 mb-8">{"Tell us about your trip and our AI will craft a personalized regenerative tourism experience."}</p>

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
                  placeholder={"Search activities... (e.g. luau, beaches, hikes)"}
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
                  {"Showing"} {filteredRegen.length + filteredLeisure.length} {"matching activities"}
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
                      {a.impactScore && <span className="text-xs font-bold text-teal-600 mt-0.5 block">+{a.impactScore} eco score</span>}
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
                      {a.impactScore && <span className="text-xs font-bold text-red-500 mt-0.5 block">{a.impactScore} eco score</span>}
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
              <button onClick={handleSubmit} disabled={submitting} className="bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-700 disabled:opacity-50">{submitting ? 'Generating...' : 'Generate My Itinerary ✨'}</button>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
