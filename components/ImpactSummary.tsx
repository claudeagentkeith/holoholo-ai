interface ImpactSummaryProps {
  metrics?: Array<{
    label: string
    value: string | number
    unit?: string
  }>
}

export default function ImpactSummary({ metrics }: ImpactSummaryProps) {
  const defaultMetrics = [
    { label: 'Coral Fragments Planted', value: '2,847', unit: 'pieces' },
    { label: 'Trees Restored', value: '12,530', unit: 'native trees' },
    { label: 'Beach Cleaned', value: '15.3', unit: 'tons of debris' },
    { label: 'Cultural Sessions', value: '483', unit: 'workshops' },
    { label: 'Families Supported', value: '156', unit: 'local families' },
    { label: 'Carbon Offset', value: '342', unit: 'tons CO2' },
  ]

  const displayMetrics = metrics || defaultMetrics

  return (
    <div className="bg-gradient-to-br from-teal-800 to-emerald-900 text-white rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Community Impact</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {displayMetrics.map((metric, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-bold text-teal-200">{metric.value}</p>
            <p className="text-sm text-teal-300 mt-1">{metric.unit || ''}</p>
            <p className="text-xs text-teal-400 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
