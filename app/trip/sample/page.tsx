'use client';
import { useState } from 'react';

interface Activity {
  time: string;
  name: string;
  type: 'regenerative' | 'leisure';
  description: string;
  duration: string;
  impactScore: number;
  location: string;
  details: string;
  donateAmount?: number;
}

interface DayItinerary {
  day: number;
  date: string;
  activities: Activity[];
}

const itinerary: DayItinerary[] = [
  {
    day: 1,
    date: 'Monday, March 16',
    activities: [
      {
        time: '8:00 AM',
        name: 'Coral Reef Restoration Dive',
        type: 'regenerative',
        description: 'Join marine biologists to transplant coral fragments onto degraded reef sections at Hanauma Bay.',
        duration: '3 hours',
        impactScore: 9.2,
        location: 'Hanauma Bay Nature Preserve',
        details: 'All snorkel/dive equipment provided. Beginner-friendly with guided instruction. You will help plant 15-20 coral fragments that will grow for decades.',
      },
      {
        time: '12:00 PM',
        name: 'Farm-to-Table Lunch at Kahumana Organic Farm',
        type: 'regenerative',
        description: 'Harvest ingredients and enjoy a chef-prepared meal using 100% on-site organic produce.',
        duration: '2 hours',
        impactScore: 7.5,
        location: 'Kahumana Organic Farm, Waianae',
        details: 'Tour the 5-acre certified organic farm, pick your own herbs, and dine in the open-air pavilion. Supports local workforce development programs.',
      },
      {
        time: '3:00 PM',
        name: 'Waikiki Beach & Shopping',
        type: 'leisure',
        description: 'Free time to enjoy Waikiki Beach, browse luxury shops along Kalakaua Avenue, and catch the sunset.',
        duration: '4 hours',
        impactScore: -2.1,
        location: 'Waikiki, Honolulu',
        details: 'Beach chairs and umbrellas available at hotel. Popular shopping includes Royal Hawaiian Center and International Market Place.',
        donateAmount: 5,
      },
      {
        time: '7:30 PM',
        name: 'Sunset Dinner Cruise',
        type: 'leisure',
        description: 'Three-course dinner aboard a catamaran with live Hawaiian music as the sun sets over the Pacific.',
        duration: '2.5 hours',
        impactScore: -3.4,
        location: 'Departing Ala Wai Harbor',
        details: 'Includes welcome cocktail, choice of fresh catch or prime rib, and dessert. Whale sightings common in season.',
        donateAmount: 8,
      },
    ],
  },
  {
    day: 2,
    date: 'Tuesday, March 17',
    activities: [
      {
        time: '6:30 AM',
        name: 'Native Forest Bird Survey',
        type: 'regenerative',
        description: 'Assist ornithologists in counting endangered Hawaiian honeycreeper populations in the Koolau Range.',
        duration: '3.5 hours',
        impactScore: 8.8,
        location: 'Koolau Mountain Range, Windward Side',
        details: 'Moderate 2-mile hike through native ohia lehua forest. Binoculars provided. Data contributes to federal conservation programs.',
      },
      {
        time: '11:00 AM',
        name: 'Hawaiian Cultural Immersion & Lei Making',
        type: 'regenerative',
        description: 'Learn traditional lei-making with a Native Hawaiian cultural practitioner using sustainably gathered flowers.',
        duration: '2 hours',
        impactScore: 6.3,
        location: 'Bishop Museum Cultural Gardens',
        details: 'Supports Native Hawaiian cultural preservation. Take home your handmade lei. Includes museum admission.',
      },
      {
        time: '2:00 PM',
        name: 'Helicopter Tour of Na Pali Coast',
        type: 'leisure',
        description: 'Breathtaking aerial views of sea cliffs, waterfalls, and hidden valleys along the Na Pali coastline.',
        duration: '1.5 hours',
        impactScore: -6.8,
        location: 'Honolulu Heliport',
        details: 'Doors-off option available. Window seats guaranteed for all passengers. Includes headset narration by pilot.',
        donateAmount: 15,
      },
      {
        time: '5:00 PM',
        name: 'Wetland Restoration at Kawainui Marsh',
        type: 'regenerative',
        description: 'Help remove invasive plants and restore habitat for endangered Hawaiian stilts and coots.',
        duration: '2 hours',
        impactScore: 8.1,
        location: 'Kawainui Marsh, Kailua',
        details: 'Gloves and tools provided. Work alongside local conservation staff. The 830-acre marsh is Hawaii\'s largest remaining wetland.',
      },
      {
        time: '7:30 PM',
        name: 'Poolside BBQ & Stargazing',
        type: 'leisure',
        description: 'Relaxing evening with grilled local catch, tropical cocktails, and guided constellation viewing.',
        duration: '2.5 hours',
        impactScore: -1.2,
        location: 'Hotel Resort Pool Deck',
        details: 'Featuring Maui Brewing Co. craft beers, fresh poke stations, and a resident astronomer with telescope.',
        donateAmount: 3,
      },
    ],
  },
  {
    day: 3,
    date: 'Wednesday, March 18',
    activities: [
      {
        time: '7:00 AM',
        name: 'Coastal Dune Restoration',
        type: 'regenerative',
        description: 'Plant native naupaka and pohinahina to stabilize eroding beach dunes at Bellows Beach.',
        duration: '2.5 hours',
        impactScore: 7.9,
        location: 'Bellows Beach Park, Waimanalo',
        details: 'Plant 50+ native seedlings that prevent erosion and provide habitat for monk seals and sea turtles. All materials provided.',
      },
      {
        time: '10:30 AM',
        name: 'Zipline Adventure at Kualoa Ranch',
        type: 'leisure',
        description: 'Soar across 7 ziplines through the lush Kaaawa Valley, a Jurassic Park filming location.',
        duration: '3 hours',
        impactScore: -1.8,
        location: 'Kualoa Ranch, Kaneohe',
        details: 'Minimum age 7, max weight 280 lbs. Includes safety harness and helmet. Ranch donates 10% of proceeds to land conservation.',
        donateAmount: 4,
      },
      {
        time: '2:00 PM',
        name: 'Community Fish Pond Restoration',
        type: 'regenerative',
        description: 'Help restore an 800-year-old Hawaiian fishpond using traditional aquaculture techniques.',
        duration: '2.5 hours',
        impactScore: 9.0,
        location: 'He\'eia Fishpond, Kaneohe Bay',
        details: 'Learn ancient Hawaiian sustainability practices. Help rebuild the kuapa (rock wall) that created a self-sustaining fish ecosystem.',
      },
      {
        time: '5:30 PM',
        name: 'Farewell Luau & Fire Dance',
        type: 'leisure',
        description: 'Traditional Hawaiian luau with kalua pig, poi, hula performances, and a spectacular fire knife dance.',
        duration: '3 hours',
        impactScore: -2.5,
        location: 'Paradise Cove, Ko Olina',
        details: 'Premium seating with open bar. Includes flower lei greeting, Hawaiian games, and craft demonstrations.',
        donateAmount: 6,
      },
    ],
  },
];

function getScoreColor(score: number): string {
  if (score >= 7) return '#4ade80';
  if (score >= 4) return '#86efac';
  if (score >= 0) return '#fde047';
  if (score >= -3) return '#fb923c';
  return '#f87171';
}

function getScoreLabel(score: number): string {
  if (score >= 7) return 'Highly Regenerative';
  if (score >= 4) return 'Regenerative';
  if (score >= 0) return 'Low Impact';
  if (score >= -3) return 'Moderate Impact';
  return 'High Impact';
}

export default function TripSamplePage() {
  const [expandedActivities, setExpandedActivities] = useState<Set<string>>(new Set());

  const toggleActivity = (key: string) => {
    setExpandedActivities(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const allActivities = itinerary.flatMap(d => d.activities);
  const regenActivities = allActivities.filter(a => a.type === 'regenerative');
  const leisureActivities = allActivities.filter(a => a.type === 'leisure');
  const totalPositive = regenActivities.reduce((sum, a) => sum + a.impactScore, 0);
  const totalNegative = leisureActivities.reduce((sum, a) => sum + a.impactScore, 0);
  const netScore = totalPositive + totalNegative;
  const totalDonation = leisureActivities.reduce((sum, a) => sum + (a.donateAmount || 0), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e5e5e5' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #262626', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>{'\u{1F30A}'}</span>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>Holoholo.ai</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/itinerary" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #404040', color: '#a3a3a3', textDecoration: 'none', fontSize: '14px' }}>Plan New Trip</a>
          <button style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#2563eb', color: 'white', border: 'none', fontSize: '14px', cursor: 'pointer' }} onClick={() => window.print()}>Print Itinerary</button>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Confirmation Banner */}
        <div style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px' }}>{'\u2705'}</span>
            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: 0 }}>Your Trip is Confirmed!</h1>
          </div>
          <p style={{ color: '#a7f3d0', margin: '8px 0 0 0', fontSize: '16px' }}>Booking #HH-2026-0316 &bull; 3 Days in Oahu, Hawaii &bull; March 16-18, 2026</p>
          <p style={{ color: '#6ee7b7', margin: '4px 0 0 0', fontSize: '14px' }}>Confirmation sent to guest@example.com</p>
        </div>

        {/* Impact Score Summary Card */}
        <div style={{ borderRadius: '16px', border: '1px solid #262626', backgroundColor: '#171717', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {'\u{1F30D}'} Trip Eco Impact Scorecard
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', padding: '16px', borderRadius: '12px', backgroundColor: '#052e16', border: '1px solid #166534' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#4ade80' }}>+{totalPositive.toFixed(1)}</div>
              <div style={{ fontSize: '12px', color: '#86efac', marginTop: '4px' }}>Regenerative</div>
              <div style={{ fontSize: '11px', color: '#6ee7b7' }}>{regenActivities.length} activities</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', borderRadius: '12px', backgroundColor: '#3b0404', border: '1px solid #991b1b' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#f87171' }}>{totalNegative.toFixed(1)}</div>
              <div style={{ fontSize: '12px', color: '#fca5a5', marginTop: '4px' }}>Leisure Impact</div>
              <div style={{ fontSize: '11px', color: '#fecaca' }}>{leisureActivities.length} activities</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', borderRadius: '12px', backgroundColor: netScore >= 0 ? '#052e16' : '#3b0404', border: netScore >= 0 ? '1px solid #166534' : '1px solid #991b1b' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: netScore >= 0 ? '#4ade80' : '#f87171' }}>{netScore >= 0 ? '+' : ''}{netScore.toFixed(1)}</div>
              <div style={{ fontSize: '12px', color: netScore >= 0 ? '#86efac' : '#fca5a5', marginTop: '4px' }}>Net Score</div>
              <div style={{ fontSize: '11px', color: netScore >= 0 ? '#6ee7b7' : '#fecaca' }}>{netScore >= 0 ? 'Net Positive!' : 'Needs Offset'}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', borderRadius: '12px', backgroundColor: '#1e1b4b', border: '1px solid #4338ca' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#a78bfa' }}>${totalDonation}</div>
              <div style={{ fontSize: '12px', color: '#c4b5fd', marginTop: '4px' }}>Offset Amount</div>
              <div style={{ fontSize: '11px', color: '#ddd6fe' }}>Recommended</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#a3a3a3', marginBottom: '6px' }}>
              <span>Impact Balance</span>
              <span>{netScore >= 0 ? 'Net Positive Trip!' : 'Offset recommended'}</span>
            </div>
            <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#262626', overflow: 'hidden', position: 'relative' as const }}>
              <div style={{ position: 'absolute' as const, left: 0, top: 0, height: '100%', width: `${Math.min(100, ((totalPositive) / (totalPositive + Math.abs(totalNegative))) * 100)}%`, backgroundColor: '#22c55e', borderRadius: '4px', transition: 'width 1s ease' }} />
            </div>
          </div>

          {/* Donate CTA */}
          <div style={{ backgroundColor: '#1e1b4b', borderRadius: '12px', padding: '20px', border: '1px solid #4338ca', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#e0e7ff', fontSize: '15px' }}>{'\u{1F33F}'} Offset Your Leisure Impact</div>
              <div style={{ fontSize: '13px', color: '#a5b4fc', marginTop: '4px' }}>
                Your leisure activities have a combined impact of {totalNegative.toFixed(1)} points. A ${totalDonation} donation supports coral restoration, native reforestation, and wildlife habitat projects across Hawaii.
              </div>
            </div>
            <a href="/donate" style={{ padding: '12px 24px', borderRadius: '10px', backgroundColor: '#6366f1', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap' as const, display: 'inline-block' }}>
              Donate ${totalDonation} to Offset {'\u2192'}
            </a>
          </div>
        </div>

        {/* Day-by-Day Itinerary */}
        {itinerary.map((day) => (
          <div key={day.day} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '16px' }}>{day.day}</div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>Day {day.day}</h2>
                <p style={{ fontSize: '13px', color: '#a3a3a3', margin: 0 }}>{day.date}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
              {day.activities.map((activity, idx) => {
                const key = `${day.day}-${idx}`;
                const isExpanded = expandedActivities.has(key);
                return (
                  <div
                    key={key}
                    style={{
                      borderRadius: '12px',
                      border: `1px solid ${activity.type === 'regenerative' ? '#166534' : '#404040'}`,
                      backgroundColor: activity.type === 'regenerative' ? '#071a0e' : '#171717',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      onClick={() => toggleActivity(key)}
                      style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' as const }}>
                          <span style={{ fontSize: '12px', color: '#a3a3a3', fontFamily: 'monospace' }}>{activity.time}</span>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor: activity.type === 'regenerative' ? '#052e16' : '#1c1917',
                            color: activity.type === 'regenerative' ? '#4ade80' : '#a3a3a3',
                            border: `1px solid ${activity.type === 'regenerative' ? '#166534' : '#404040'}`,
                          }}>
                            {activity.type === 'regenerative' ? '\u{1F331} Regenerative' : '\u2728 Leisure'}
                          </span>
                          <span style={{ fontSize: '12px', color: '#737373' }}>{activity.duration}</span>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0' }}>{activity.name}</h3>
                        <p style={{ fontSize: '13px', color: '#a3a3a3', margin: 0 }}>{activity.description}</p>
                      </div>

                      {/* Impact Score Badge */}
                      <div style={{
                        minWidth: '80px',
                        textAlign: 'center' as const,
                        padding: '8px 12px',
                        borderRadius: '10px',
                        backgroundColor: activity.impactScore >= 0 ? '#052e16' : '#3b0404',
                        border: `1px solid ${activity.impactScore >= 0 ? '#166534' : '#991b1b'}`,
                      }}>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: activity.impactScore >= 0 ? '#4ade80' : '#f87171' }}>
                          {activity.impactScore >= 0 ? '+' : ''}{activity.impactScore}
                        </div>
                        <div style={{ fontSize: '10px', color: activity.impactScore >= 0 ? '#86efac' : '#fca5a5', marginTop: '2px' }}>
                          {getScoreLabel(activity.impactScore)}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ padding: '0 20px 16px 20px', borderTop: '1px solid #262626' }}>
                        <div style={{ paddingTop: '12px' }}>
                          <div style={{ fontSize: '13px', color: '#d4d4d4', marginBottom: '8px' }}>
                            <strong style={{ color: '#ffffff' }}>Location:</strong> {activity.location}
                          </div>
                          <div style={{ fontSize: '13px', color: '#d4d4d4', marginBottom: '8px' }}>
                            <strong style={{ color: '#ffffff' }}>Details:</strong> {activity.details}
                          </div>
                          {activity.donateAmount && (
                            <div style={{
                              marginTop: '12px',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              backgroundColor: '#1e1b4b',
                              border: '1px solid #4338ca',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                              <span style={{ fontSize: '13px', color: '#c4b5fd' }}>
                                {'\u{1F33F}'} Offset this activity&apos;s impact ({activity.impactScore} pts)
                              </span>
                              <a href="/donate" style={{
                                padding: '6px 16px',
                                borderRadius: '6px',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '13px',
                                fontWeight: 600,
                              }}>
                                Donate ${activity.donateAmount}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Impact Certificate */}
        <div style={{ borderRadius: '16px', border: '2px solid #2563eb', backgroundColor: '#0c1929', padding: '32px', textAlign: 'center' as const, marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>{'\u{1F3C6}'}</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', margin: '0 0 8px 0' }}>Regenerative Travel Certificate</h2>
          <p style={{ fontSize: '14px', color: '#93c5fd', margin: '0 0 16px 0' }}>
            This trip has a net positive impact score of +{netScore.toFixed(1)} points
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' as const, marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: '#a3a3a3' }}>{'\u{1F3DD}'} {regenActivities.length} Regenerative Activities</div>
            <div style={{ fontSize: '13px', color: '#a3a3a3' }}>{'\u{1F331}'} ~85 Coral Fragments Planted</div>
            <div style={{ fontSize: '13px', color: '#a3a3a3' }}>{'\u{1F426}'} 1 Bird Survey Completed</div>
            <div style={{ fontSize: '13px', color: '#a3a3a3' }}>{'\u{1FAB4}'} 50+ Native Plants Seeded</div>
          </div>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Certificate ID: HH-CERT-2026-0316-A7B3</p>
        </div>

        {/* Footer CTA */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const, marginBottom: '48px' }}>
          <a href="/itinerary" style={{ padding: '12px 28px', borderRadius: '10px', backgroundColor: '#2563eb', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Plan Another Trip</a>
          <a href="/donate" style={{ padding: '12px 28px', borderRadius: '10px', border: '1px solid #6366f1', color: '#a5b4fc', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>Donate to Offset {'\u2192'}</a>
        </div>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid #262626', paddingTop: '24px', textAlign: 'center' as const, paddingBottom: '32px' }}>
          <p style={{ fontSize: '14px', color: '#737373' }}>{'\u{1F30A}'} Holoholo.ai - Regenerative Travel, Powered by AI</p>
          <p style={{ fontSize: '12px', color: '#525252' }}>Impact scores are calculated based on activity type, carbon footprint, community benefit, and ecosystem contribution.</p>
        </footer>
      </main>
    </div>
  );
}

