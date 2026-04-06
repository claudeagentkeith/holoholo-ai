'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ActivityItem {
  time: string;
  name: string;
  maskedName?: string;
  type: 'regenerative' | 'leisure';
  description: string;
  impact?: string;
  impactScore: number;
  duration: string;
  masked: boolean;
  donateAmount?: number;
}

const sampleDays = [
  {
    day: 1,
    title: 'North Shore Regenerative Experience',
    items: [
      {
        time: '8:30 AM',
        name: '\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588',
        maskedName: 'Organic Farm Tour & Tasting',
        type: 'regenerative' as const,
        description: 'Visit a family-owned North Shore farm for a guided tour with tropical fruit tasting and smoothie bar.',
        impact: 'Supports local agriculture and food sovereignty',
        impactScore: 8.5,
        duration: '2.5 hours',
        masked: true,
      },
      {
        time: '11:30 AM',
        name: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588',
        maskedName: 'Coastal Cleanup Walk',
        type: 'regenerative' as const,
        description: 'Join a beach restoration effort combining environmental stewardship with stunning coastal views.',
        impact: 'Direct marine ecosystem restoration',
        impactScore: 9.2,
        duration: '1.5 hours',
        masked: true,
      },
      {
        time: '1:00 PM',
        name: "Lunch at Giovanni's Shrimp Truck",
        type: 'leisure' as const,
        description: "Famous North Shore garlic shrimp at one of Hawaii's most iconic food trucks.",
        impactScore: -1.5,
        duration: '1 hour',
        masked: false,
        donateAmount: 3,
      },
      {
        time: '2:30 PM',
        name: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588',
        maskedName: 'Surfing Lesson',
        type: 'leisure' as const,
        description: 'Beginner-friendly surf instruction at a sheltered North Shore beach.',
        impactScore: -1.8,
        duration: '2 hours',
        masked: true,
        donateAmount: 4,
      },
    ],
  },
  {
    day: 2,
    title: 'Windward Coast Cultural Immersion',
    items: [
      {
        time: '9:00 AM',
        name: '\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588',
        maskedName: 'Ancient Fishpond Restoration',
        type: 'regenerative' as const,
        description: 'Help restore a 800-year-old Hawaiian fishpond through hands-on community work.',
        impact: 'Cultural preservation and wetland restoration',
        impactScore: 9.8,
        duration: '3 hours',
        masked: true,
      },
      {
        time: '12:30 PM',
        name: 'Lunch in Kailua Town',
        type: 'leisure' as const,
        description: "Explore Kailua's charming downtown with farm-to-table dining options.",
        impactScore: -0.8,
        duration: '1.5 hours',
        masked: false,
        donateAmount: 2,
      },
      {
        time: '2:00 PM',
        name: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588',
        maskedName: 'Pillbox Hike (Lanikai)',
        type: 'leisure' as const,
        description: 'Short hike with stunning panoramic views of the Windward Coast and Mokulua Islands.',
        impactScore: -1.2,
        duration: '1.5 hours',
        masked: true,
        donateAmount: 3,
      },
      {
        time: '4:00 PM',
        name: '\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588',
        maskedName: 'Native Garden Planting',
        type: 'regenerative' as const,
        description: 'Contribute to endemic Hawaiian plant restoration at a community botanical garden.',
        impact: 'Native species propagation',
        impactScore: 7.9,
        duration: '2 hours',
        masked: true,
      },
    ],
  },
  {
    day: 3,
    title: 'South Shore Discovery',
    items: [
      {
        time: '7:00 AM',
        name: 'Diamond Head Hike',
        type: 'leisure' as const,
        description: 'Iconic crater trail with panoramic views of Waikiki and the Pacific Ocean.',
        impactScore: -1.0,
        duration: '2 hours',
        masked: false,
        donateAmount: 2,
      },
      {
        time: '10:00 AM',
        name: '\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588',
        maskedName: 'Reef Restoration Dive',
        type: 'regenerative' as const,
        description: 'Help marine biologists with coral restoration work at a protected reef site.',
        impact: 'Marine ecosystem regeneration',
        impactScore: 9.5,
        duration: '3 hours',
        masked: true,
      },
      {
        time: '1:30 PM',
        name: '\u2588\u2588\u2588\u2588\u2588\u2588 \u2588\u2588 \u2588\u2588\u2588\u2588\u2588\u2588\u2588',
        maskedName: 'Lunch at Local Spot',
        type: 'leisure' as const,
        description: 'Authentic Hawaiian plate lunch at a local favorite near Waikiki.',
        impactScore: -1.0,
        duration: '1 hour',
        masked: true,
        donateAmount: 2,
      },
      {
        time: '3:00 PM',
        name: 'Snorkeling at Hanauma Bay',
        type: 'leisure' as const,
        description: 'World-famous reef snorkeling at a protected marine conservation area.',
        impactScore: -2.5,
        duration: '2.5 hours',
        masked: false,
        donateAmount: 5,
      },
    ],
  },
];

function getScoreColor(score: number): string {
  if (score >= 7) return 'text-emerald-400';
  if (score >= 4) return 'text-green-400';
  if (score >= 0) return 'text-yellow-400';
  if (score >= -3) return 'text-orange-400';
  return 'text-red-400';
}

function getScoreBg(score: number): string {
  if (score >= 7) return 'bg-emerald-950 border-emerald-700';
  if (score >= 4) return 'bg-green-950 border-green-700';
  if (score >= 0) return 'bg-yellow-950 border-yellow-700';
  if (score >= -3) return 'bg-orange-950 border-orange-700';
  return 'bg-red-950 border-red-700';
}

export default function SamplePreviewPage() {
  const [revealedItems, setRevealedItems] = useState<Record<string, boolean>>({});

  const allItems = sampleDays.flatMap(d => d.items);
  const regenItems = allItems.filter(a => a.type === 'regenerative');
  const leisureItems = allItems.filter(a => a.type === 'leisure');
  const totalPositive = regenItems.reduce((sum, a) => sum + a.impactScore, 0);
  const totalNegative = leisureItems.reduce((sum, a) => sum + a.impactScore, 0);
  const netScore = totalPositive + totalNegative;
  const totalDonation = leisureItems.reduce((sum, a) => sum + (a.donateAmount || 0), 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e5e5e5' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #262626', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>{'\u{1F30A}'}</span>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>Holoholo.ai</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/itinerary" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #404040', color: '#a3a3a3', textDecoration: 'none', fontSize: '14px' }}>Plan New Trip</Link>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Sample Banner */}
        <div style={{ backgroundColor: '#422006', border: '1px solid #a16207', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>{'\u{1F6A7}'}</span>
          <div>
            <div style={{ fontWeight: 600, color: '#fde68a', fontSize: '15px' }}>Sample Preview</div>
            <div style={{ fontSize: '13px', color: '#fcd34d' }}>This is a demo of the masked itinerary experience</div>
          </div>
        </div>

        {/* Trip Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: '0 0 8px 0' }}>Your Regenerative Itinerary</h1>
          <p style={{ color: '#a3a3a3', margin: '0 0 20px 0', fontSize: '15px' }}>
            {"Here's"} your personalized 3-day {"O'ahu"} experience blending regenerative tourism with leisure activities.
          </p>

          {/* Eco Impact Scorecard */}
          <div style={{ borderRadius: '16px', border: '1px solid #262626', backgroundColor: '#171717', padding: '24px', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {'\u{1F30D}'} Estimated Eco Impact
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div style={{ textAlign: 'center', padding: '14px 8px', borderRadius: '12px', backgroundColor: '#052e16', border: '1px solid #166534' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#4ade80' }}>+{totalPositive.toFixed(1)}</div>
                <div style={{ fontSize: '11px', color: '#86efac', marginTop: '4px' }}>Regenerative</div>
                <div style={{ fontSize: '10px', color: '#6ee7b7' }}>{regenItems.length} activities</div>
              </div>
              <div style={{ textAlign: 'center', padding: '14px 8px', borderRadius: '12px', backgroundColor: '#3b0404', border: '1px solid #991b1b' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#f87171' }}>{totalNegative.toFixed(1)}</div>
                <div style={{ fontSize: '11px', color: '#fca5a5', marginTop: '4px' }}>Leisure Impact</div>
                <div style={{ fontSize: '10px', color: '#fecaca' }}>{leisureItems.length} activities</div>
              </div>
              <div style={{ textAlign: 'center', padding: '14px 8px', borderRadius: '12px', backgroundColor: netScore >= 0 ? '#052e16' : '#3b0404', border: netScore >= 0 ? '1px solid #166534' : '1px solid #991b1b' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: netScore >= 0 ? '#4ade80' : '#f87171' }}>{netScore >= 0 ? '+' : ''}{netScore.toFixed(1)}</div>
                <div style={{ fontSize: '11px', color: netScore >= 0 ? '#86efac' : '#fca5a5', marginTop: '4px' }}>Net Score</div>
                <div style={{ fontSize: '10px', color: netScore >= 0 ? '#6ee7b7' : '#fecaca' }}>{netScore >= 0 ? 'Net Positive!' : 'Needs Offset'}</div>
              </div>
              <div style={{ textAlign: 'center', padding: '14px 8px', borderRadius: '12px', backgroundColor: '#1e1b4b', border: '1px solid #4338ca' }}>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#a78bfa' }}>${totalDonation}</div>
                <div style={{ fontSize: '11px', color: '#c4b5fd', marginTop: '4px' }}>Offset Amount</div>
                <div style={{ fontSize: '10px', color: '#ddd6fe' }}>Recommended</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#a3a3a3', marginBottom: '4px' }}>
                <span>Impact Balance</span>
                <span>{netScore >= 0 ? 'Net Positive Trip!' : 'Offset recommended'}</span>
              </div>
              <div style={{ height: '6px', borderRadius: '4px', backgroundColor: '#262626', overflow: 'hidden', position: 'relative' as const }}>
                <div style={{ position: 'absolute' as const, left: 0, top: 0, height: '100%', width: `${Math.min(100, ((totalPositive) / (totalPositive + Math.abs(totalNegative))) * 100)}%`, backgroundColor: '#22c55e', borderRadius: '4px' }} />
              </div>
            </div>

            {/* Donate CTA */}
            <div style={{ backgroundColor: '#1e1b4b', borderRadius: '10px', padding: '16px', border: '1px solid #4338ca', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '12px' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#e0e7ff', fontSize: '14px' }}>{'\u{1F33F}'} Offset Your Leisure Impact</div>
                <div style={{ fontSize: '12px', color: '#a5b4fc', marginTop: '4px' }}>
                  A ${totalDonation} donation supports coral restoration, reforestation, and wildlife habitat projects across Hawaii.
                </div>
              </div>
              <Link href="/donate" style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#6366f1', color: 'white', textDecoration: 'none', fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap' as const, display: 'inline-block' }}>
                Donate ${totalDonation} to Offset {'\u2192'}
              </Link>
            </div>
          </div>
        </div>

        {/* Day Cards */}
        {sampleDays.map((day) => (
          <div key={day.day} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '16px' }}>{day.day}</div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>{day.title}</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
              {day.items.map((item, idx) => {
                const key = day.day + '-' + idx;
                const isRevealed = revealedItems[key];
                const isRegen = item.type === 'regenerative';
                return (
                  <div
                    key={idx}
                    style={{
                      borderRadius: '12px',
                      border: isRegen ? '1px solid #166534' : '1px solid #333333',
                      backgroundColor: isRegen ? '#0a1f0a' : '#171717',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' as const }}>
                          <span style={{ fontSize: '13px', color: '#737373', fontFamily: 'monospace' }}>{item.time}</span>
                          <span style={{
                            fontSize: '11px', padding: '2px 8px', borderRadius: '9999px',
                            backgroundColor: isRegen ? '#052e16' : '#1e1b4b',
                            color: isRegen ? '#86efac' : '#c4b5fd',
                            border: isRegen ? '1px solid #166534' : '1px solid #4338ca',
                          }}>
                            {isRegen ? '\u{1F331} Regenerative' : '\u2728 Leisure'}
                          </span>
                          {item.masked && !isRevealed && (
                            <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: '#262626', color: '#737373', border: '1px solid #404040' }}>
                              {'\u{1F512}'} Masked
                            </span>
                          )}
                          {/* Impact Score Badge */}
                          <span style={{
                            fontSize: '11px', padding: '2px 8px', borderRadius: '9999px',
                            backgroundColor: item.impactScore >= 0 ? '#052e16' : '#3b0404',
                            color: item.impactScore >= 0 ? '#4ade80' : '#f87171',
                            border: item.impactScore >= 0 ? '1px solid #166534' : '1px solid #991b1b',
                            fontWeight: 600,
                          }}>
                            {item.impactScore >= 0 ? '+' : ''}{item.impactScore}
                          </span>
                        </div>
                        <h3 style={{ fontWeight: 600, color: '#ffffff', margin: '0 0 4px 0', fontSize: '15px' }}>
                          {item.masked && !isRevealed ? (
                            <span style={{ fontFamily: 'monospace', letterSpacing: '0.05em', color: '#525252' }}>{item.name}</span>
                          ) : (
                            item.maskedName || item.name
                          )}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#a3a3a3', margin: '0 0 8px 0' }}>{item.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#737373' }}>
                          <span>{'\u23F1'} {item.duration}</span>
                        </div>
                        {item.impact && (
                          <p style={{ fontSize: '12px', color: '#34d399', margin: '6px 0 0 0', fontStyle: 'italic' }}>{item.impact}</p>
                        )}
                        {!isRegen && item.donateAmount && (
                          <div style={{ marginTop: '8px' }}>
                            <Link href="/donate" style={{ fontSize: '11px', color: '#a78bfa', textDecoration: 'none', padding: '4px 10px', borderRadius: '6px', border: '1px solid #4338ca', backgroundColor: '#1e1b4b', display: 'inline-block' }}>
                              {'\u{1F33F}'} Offset: Donate ${item.donateAmount}
                            </Link>
                          </div>
                        )}
                      </div>
                      {item.masked && (
                        <button
                          onClick={() => setRevealedItems(prev => ({...prev, [key]: !prev[key]}))}
                          style={{
                            marginLeft: '12px', fontSize: '12px', padding: '6px 14px', borderRadius: '8px',
                            border: '1px solid #166534', color: '#86efac', backgroundColor: 'transparent',
                            cursor: 'pointer', whiteSpace: 'nowrap' as const,
                          }}
                        >
                          {isRevealed ? 'Re-mask' : 'Peek'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', borderRadius: '16px', padding: '32px', textAlign: 'center' as const, marginBottom: '32px', border: '1px solid #10b981' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#ffffff', margin: '0 0 8px 0' }}>Ready to Book This Trip?</h2>
          <p style={{ color: '#a7f3d0', margin: '0 0 24px 0', fontSize: '15px' }}>Unlock all activity details and secure your spots with verified regenerative operators.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/checkout/sample" style={{ padding: '12px 28px', borderRadius: '10px', backgroundColor: '#ffffff', color: '#064e3b', textDecoration: 'none', fontWeight: 600, fontSize: '15px', display: 'inline-block' }}>
              Book Full Itinerary {'\u2192'}
            </Link>
            <Link href="/itinerary" style={{ padding: '12px 28px', borderRadius: '10px', border: '2px solid #ffffff', color: '#ffffff', textDecoration: 'none', fontWeight: 600, fontSize: '15px', display: 'inline-block' }}>
              Modify Preferences
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #262626', paddingTop: '24px', textAlign: 'center' as const, paddingBottom: '32px' }}>
        <p style={{ fontSize: '14px', color: '#737373' }}>{'\u{1F30A}'} Holoholo.ai - Regenerative Travel, Powered by AI</p>
        <p style={{ fontSize: '12px', color: '#525252' }}>Impact scores are calculated based on activity type, carbon footprint, community benefit, and ecosystem contribution.</p>
      </footer>
    </div>
  );
}
