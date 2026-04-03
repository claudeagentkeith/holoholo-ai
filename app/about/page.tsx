export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">About Holoholo.ai</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8">
          Holoholo.ai is an AI-powered regenerative tourism platform connecting travelers with meaningful, 
          give-back experiences across the Hawaiian Islands.
        </p>

        <div className="bg-teal-50 border-l-4 border-teal-600 p-6 mb-8 rounded-r-lg">
          <h2 className="text-2xl font-semibold text-teal-800 mb-2">Our Mission</h2>
          <p className="text-teal-700">
            To transform tourism in Hawaii from extractive to regenerative, ensuring that every visitor 
            leaves the islands better than they found them.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">What is Regenerative Tourism?</h2>
        <p className="text-gray-600 mb-4">
          Regenerative tourism goes beyond sustainability. While sustainable tourism aims to minimize harm, 
          regenerative tourism actively restores and improves the places we visit. This means contributing to 
          reef restoration, reforestation, cultural preservation, and community empowerment.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">How We Work</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">Vetted Operators</h3>
            <p className="text-gray-600">We partner only with locally-owned operators committed to cultural respect and environmental stewardship.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">AI Personalization</h3>
            <p className="text-gray-600">Our AI creates itineraries matched to your interests, fitness level, and the impact you want to make.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">Impact Tracking</h3>
            <p className="text-gray-600">Every experience has measurable outcomes -- trees planted, coral restored, communities supported.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">Cultural Sensitivity</h3>
            <p className="text-gray-600">All experiences are designed with input from Native Hawaiian communities and cultural practitioners.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
