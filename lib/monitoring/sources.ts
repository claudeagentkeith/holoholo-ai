export const monitoringSources = [
  {
    key: "weather",
    label: "Forecast feed",
    frequencyMinutes: 60
  },
  {
    key: "ocean-safety",
    label: "Ocean safety feed",
    frequencyMinutes: 60
  },
  {
    key: "water-quality",
    label: "Water quality feed",
    frequencyMinutes: 180
  },
  {
    key: "jellyfish",
    label: "Jellyfish risk calendar",
    frequencyMinutes: 720
  },
  {
    key: "events",
    label: "Local events calendar",
    frequencyMinutes: 360
  }
] as const;
