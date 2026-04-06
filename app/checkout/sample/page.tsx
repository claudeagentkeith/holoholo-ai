'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SampleCheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      router.push('/trip/sample');
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e5e5e5' }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #262626', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>{'\u{1F30A}'}</span>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>Holoholo.ai</span>
        </div>
        <Link href="/preview/sample" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #404040', color: '#a3a3a3', textDecoration: 'none', fontSize: '14px' }}>
          {'\u2190'} Back to Preview
        </Link>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Sample Banner */}
        <div style={{ backgroundColor: '#422006', border: '1px solid #a16207', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>{'\u{1F6A7}'}</span>
          <div>
            <div style={{ fontWeight: 600, color: '#fde68a', fontSize: '15px' }}>Sample Checkout</div>
            <div style={{ fontSize: '13px', color: '#fcd34d' }}>This is a demo â no real payment will be processed</div>
          </div>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', margin: '0 0 32px 0' }}>Complete Your Booking</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px' }}>
          {/* Left: Form */}
          <div>
            <form onSubmit={handleSubmit}>
              {/* Contact Info */}
              <div style={{ borderRadius: '16px', border: '1px solid #262626', backgroundColor: '#171717', padding: '24px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: '0 0 20px 0' }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#a3a3a3', marginBottom: '6px' }}>Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      placeholder="John Smith"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #404040', backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#a3a3a3', marginBottom: '6px' }}>Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="john@example.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #404040', backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#a3a3a3', marginBottom: '6px' }}>Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #404040', backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment (Mock) */}
              <div style={{ borderRadius: '16px', border: '1px solid #262626', backgroundColor: '#171717', padding: '24px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: '0 0 20px 0' }}>Payment Details (Demo)</h2>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#a3a3a3', marginBottom: '6px' }}>Card Number</label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={e => setForm({...form, cardNumber: e.target.value})}
                      placeholder="4242 4242 4242 4242"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #404040', backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#a3a3a3', marginBottom: '6px' }}>Expiry Date</label>
                      <input
                        type="text"
                        value={form.expiry}
                        onChange={e => setForm({...form, expiry: e.target.value})}
                        placeholder="MM/YY"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #404040', backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', color: '#a3a3a3', marginBottom: '6px' }}>CVC</label>
                      <input
                        type="text"
                        value={form.cvc}
                        onChange={e => setForm({...form, cvc: e.target.value})}
                        placeholder="123"
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #404040', backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: '100%', padding: '14px', borderRadius: '12px',
                  backgroundColor: isProcessing ? '#404040' : '#2563eb',
                  color: 'white', border: 'none', fontSize: '16px', fontWeight: 600,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                }}
              >
                {isProcessing ? 'Processing...' : 'Complete Booking (Demo)'}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div style={{ borderRadius: '16px', border: '1px solid #262626', backgroundColor: '#171717', padding: '24px', position: 'sticky' as const, top: '100px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: '0 0 20px 0' }}>Order Summary</h2>

              {/* Trip Details */}
              <div style={{ borderBottom: '1px solid #262626', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>3-Day {"O'ahu"} Regenerative Trip</div>
                <div style={{ fontSize: '13px', color: '#a3a3a3' }}>March 16-18, 2026 {'\u2022'} 2 Guests</div>
              </div>

              {/* Eco Impact Summary */}
              <div style={{ borderBottom: '1px solid #262626', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {'\u{1F30D}'} Eco Impact Summary
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#052e16', border: '1px solid #166534', textAlign: 'center' as const }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#4ade80' }}>+44.9</div>
                    <div style={{ fontSize: '10px', color: '#86efac' }}>Regenerative</div>
                  </div>
                  <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#3b0404', border: '1px solid #991b1b', textAlign: 'center' as const }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#f87171' }}>-9.8</div>
                    <div style={{ fontSize: '10px', color: '#fca5a5' }}>Leisure Impact</div>
                  </div>
                </div>
                <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#052e16', border: '1px solid #166534', textAlign: 'center' as const, marginBottom: '12px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#4ade80' }}>+35.1 Net Positive!</div>
                  <div style={{ fontSize: '10px', color: '#86efac' }}>5 regenerative + 7 leisure activities</div>
                </div>
                {/* Progress Bar */}
                <div style={{ height: '6px', borderRadius: '4px', backgroundColor: '#262626', overflow: 'hidden', position: 'relative' as const }}>
                  <div style={{ position: 'absolute' as const, left: 0, top: 0, height: '100%', width: '82%', backgroundColor: '#22c55e', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Line Items */}
              <div style={{ borderBottom: '1px solid #262626', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#d4d4d4', marginBottom: '8px' }}>
                  <span>Regenerative Activities (5)</span>
                  <span>$480</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#d4d4d4', marginBottom: '8px' }}>
                  <span>Leisure Activities (7)</span>
                  <span>$350</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#d4d4d4', marginBottom: '8px' }}>
                  <span>Accommodation (3 nights)</span>
                  <span>$594</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#d4d4d4', marginBottom: '8px' }}>
                  <span>Booking Fee</span>
                  <span>$49</span>
                </div>
              </div>

              {/* Offset Donation */}
              <div style={{ borderBottom: '1px solid #262626', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                  <div>
                    <span style={{ color: '#a78bfa' }}>{'\u{1F33F}'} Eco Offset Donation</span>
                    <div style={{ fontSize: '11px', color: '#737373', marginTop: '2px' }}>Supports Hawaii conservation projects</div>
                  </div>
                  <span style={{ color: '#a78bfa', fontWeight: 600 }}>$21</span>
                </div>
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                <span>Total</span>
                <span>$1,494</span>
              </div>
              <div style={{ fontSize: '12px', color: '#737373', marginTop: '4px', textAlign: 'right' as const }}>
                Includes $21 eco offset donation
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #262626', paddingTop: '24px', textAlign: 'center' as const, paddingBottom: '32px', marginTop: '48px' }}>
        <p style={{ fontSize: '14px', color: '#737373' }}>{'\u{1F30A}'} Holoholo.ai - Regenerative Travel, Powered by AI</p>
        <p style={{ fontSize: '12px', color: '#525252' }}>Secure checkout powered by Stripe. Your payment information is encrypted.</p>
      </footer>
    </div>
  );
}
