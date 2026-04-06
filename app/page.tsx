import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-emerald-700">Holoholo.ai</span>
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-gray-600">
            <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">How It Works</a>
            <a href="#about" className="hover:text-emerald-700 transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">Under Construction</div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Travel with Purpose.<br />Experience Hawai&#39;i Regeneratively.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              AI-powered itineraries that connect you with culturally respectful, give-back experiences across O&#39;ahu &mdash; from reef restoration to taro farming.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/itinerary" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-full text-lg font-semibold hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg shadow-emerald-200">
                Plan Your Trip
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all border-2 border-emerald-200">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "\u{1F30D}", title: "Tell Us Your Vibe", desc: "Share your travel dates, interests, fitness level, and what kind of impact you want to make." },
              { icon: "\u{1F33F}", title: "Get a Regenerative Plan", desc: "Our AI builds a personalized itinerary featuring culturally respectful and environmentally positive experiences." },
              { icon: "\u2728", title: "Travel & Give Back", desc: "Book directly with local operators, enjoy your trip, and leave O\u02BBahu better than you found it." },
            ].map((step, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">About Holoholo.ai</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Holoholo means to go out for a walk, ride, or sail &mdash; to go out for pleasure. We believe tourism in Hawai&#39;i should be a force for good: connecting travelers with experiences that restore reefs, replant native forests, and support local farming communities.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our AI concierge builds personalized itineraries from a curated registry of regenerative experiences, ensuring every trip gives back more than it takes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Travel Differently?</h2>
          <p className="text-xl text-emerald-100 mb-10">Start planning your regenerative O&#39;ahu experience today.</p>
          <Link href="/itinerary" className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg">
            Start Planning
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-white mb-2">Holoholo.ai</p>
          <p className="text-sm">Regenerative tourism, powered by AI</p>
          <p className="text-xs mt-4">&copy; 2026 Holoholo.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
