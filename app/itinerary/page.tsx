"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    id: "timed-entry",
    name: "Timed Entry & Attractions",
    icon: "🏛️",
    description: "Historic sites, museums, nature parks, and timed-entry hikes across Oʻahu",
    count: 22,
    examples: ["Diamond Head", "Hanauma Bay", "ʻIolani Palace", "Pearl Harbor"],
  },
  {
    id: "luaus-cultural",
    name: "Lūʻau & Cultural Shows",
    icon: "🌺",
    description: "Traditional Hawaiian lūʻau, cultural performances, and evening entertainment",
    count: 19,
    examples: ["Polynesian Cultural Center", "Paradise Cove", "Ka Moana Lūʻau"],
  },
  {
    id: "adventure-land",
    name: "Adventure, Ranch & Guided Tours",
    icon: "🌿",
    description: "Off-road adventures, ziplines, farm tours, scenic hikes, and guided cultural experiences",
    count: 45,
    examples: ["Kualoa Ranch", "North Shore Tours", "HTA Farm Cohort Tours", "Reforestation"],
  },
  {
    id: "ocean",
    name: "Ocean Activities",
    icon: "🌊",
    description: "Snorkeling, surfing, reef restoration, whale watching, and ocean conservation",
    count: 32,
    examples: ["Reef Restoration", "Coral Planting", "Surf Lessons", "Whale Watch"],
  },
  {
    id: "dining",
    name: "Dining & Meal Reservations",
    icon: "🍴",
    description: "Farm-to-table restaurants, local food experiences, and cultural dining",
    count: 18,
    examples: ["Taro Farming Dinner", "Local Fish Markets", "Hawaiian Cuisine"],
  },
  {
    id: "marketplace",
    name: "Marketplace & Passes",
    icon: "🌟",
    description: "Multi-attraction passes, marketplace bundles, and curated experience packages",
    count: 8,
    examples: ["Go Oʻahu Pass", "Activity Bundles", "Multi-day Packages"],
  },
];

export default function ItineraryPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-emerald-700">
            Holoholo.ai
          </Link>
          <span className="text-sm text-gray-500">Plan Your Trip</span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-4 border border-amber-200">
            Under Construction
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            What experiences interest you?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the categories that excite you. We&apos;ll build a regenerative
            itinerary tailored to your interests.
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const isSelected = selected.has(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggle(cat.id)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
                      : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{cat.icon}</span>
                    <span
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{cat.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    {cat.count} experiences available
                  </p>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">
              {selected.size === 0
                ? "Select at least one category to continue"
                : `${selected.size} categor${selected.size === 1 ? "y" : "ies"} selected`}
            </p>
            <button
              disabled={selected.size === 0}
              className={`inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold transition-all ${
                selected.size > 0
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 shadow-lg shadow-emerald-200 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Start Planning
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Powered by AI &middot; Culturally guided &middot; Regenerative first
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-white mb-1">Holoholo.ai</p>
          <p className="text-sm">Travel with purpose. Experience Hawaiʻi regeneratively.</p>
        </div>
      </footer>
    </div>
  );
}

