interface Activity {
  time: string
  name: string
  type?: string
}

interface ItineraryDayProps {
  day: number
  title: string
  activities: Activity[]
}

export default function ItineraryDay({ day, title, activities }: ItineraryDayProps) {
  const typeColors: Record<string, string> = {
    cultural: 'bg-purple-100 text-purple-700',
    marine: 'bg-blue-100 text-blue-700',
    conservation: 'bg-green-100 text-green-700',
    forestry: 'bg-emerald-100 text-emerald-700',
    food: 'bg-orange-100 text-orange-700',
    education: 'bg-indigo-100 text-indigo-700',
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="bg-teal-700 text-white px-5 py-3">
        <span className="text-sm font-medium opacity-80">Day {day}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-5 space-y-3">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-sm text-gray-400 font-mono whitespace-nowrap mt-0.5">{activity.time}</span>
            <div>
              <p className="text-gray-800">{activity.name}</p>
              {activity.type && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[activity.type] || 'bg-gray-100 text-gray-600'}`}>
                  {activity.type}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
