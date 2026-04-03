export default function Home() {
  const experiences = [
    { title: 'Reef Restoration', location: 'Maui', desc: 'Help restore coral reefs with marine biologists. Plant coral fragments and monitor reef health.', impact: '500+ coral fragments planted', icon: '🐠' },
    { title: 'Native Reforestation', location: 'Big Island', desc: 'Plant native koa and ohia trees in areas affected by invasive species.', impact: '10,000+ trees planted', icon: '🌳' },
    { title: 'Taro Farming', location: 'Kauai', desc: 'Learn traditional Hawaiian taro cultivation from local farmers.', impact: '50+ families supported', icon: '🌿' },
    { title: 'Coastal Cleanup', location: 'Oahu', desc: 'Join organized beach cleanups and learn about marine debris prevention.', impact: '5 tons removed monthly', icon: '🏖️' },
    { title: 'Cultural Workshops', location: 'Molokai', desc: 'Participate in traditional Hawaiian craft and navigation workshops.', impact: '200+ cultural sessions', icon: '🎨' },
    { title: 'Wildlife Monitoring', location: 'Lanai', desc: 'Assist researchers in monitoring endangered Hawaiian species.', impact: '12 species tracked', icon: '🦅' },
  ]

  return (
    <div>
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Travel with Purpose in Hawaii
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">
            AI-powered itineraries connecting you with regenerative experiences that give back to the land, ocean, and communities of Hawaii.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/itinerary" className="bg-white text-teal-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-teal-50 transition">
              Generate My Itinerary
            </a>
            <a href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Our AI concierge creates personalized itineraries that balance adventure with impact</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Planning</h3>
            <p className="text-gray-600">Tell us your interests and our AI creates a personalized regenerative itinerary</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌺</div>
            <h3 className="text-xl font-semibold mb-2">Authentic Experiences</h3>
            <p className="text-gray-600">Connect with vetted local operators offering meaningful cultural exchanges</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
            <p className="text-gray-600">See the real environmental and community impact of your travels</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Regenerative Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
                <div className="text-3xl mb-3">{exp.icon}</div>
                <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                <p className="text-sm text-teal-700 mb-3">{exp.location}</p>
                <p className="text-gray-600 mb-4">{exp.desc}</p>
                <div className="bg-teal-50 text-teal-800 text-sm px-3 py-1 rounded-full inline-block">
                  {exp.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Make a Difference?</h2>
        <p className="text-gray-600 mb-8">Generate your personalized regenerative tourism itinerary today</p>
        <a href="/itinerary" className="bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-teal-800 transition">
          Get Started
        </a>
      </section>
    </div>
  )
}
