interface ExperienceCardProps {
  title: string
  description: string
  location: string
  category: string
  price?: number
  impact?: string
  imageUrl?: string
}

export default function ExperienceCard({ title, description, location, category, price, impact }: ExperienceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border">
      <div className="h-48 bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
        <span className="text-6xl">
          {category === 'MARINE' ? '🐠' : category === 'FORESTRY' ? '🌳' : category === 'AGRICULTURE' ? '🌿' : '🌺'}
        </span>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {price && <span className="text-teal-700 font-bold">${price}</span>}
        </div>
        <p className="text-sm text-teal-600 mb-2">{location}</p>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        {impact && (
          <div className="bg-teal-50 text-teal-800 text-xs px-3 py-1 rounded-full inline-block">
            {impact}
          </div>
        )}
      </div>
    </div>
  )
}
