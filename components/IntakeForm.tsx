'use client';

import { useState, FormEvent } from 'react';

export interface FormData {
  arrivalDate: string;
  departureDate: string;
  islands: string[];
  groupSize: number;
  interests: string[];
  budgetTier: 'budget' | 'mid-range' | 'premium';
  concierge: boolean;
  specialRequests: string;
}

export interface IntakeFormProps {
  onSubmit: (data: FormData) => Promise<void> | void;
  isLoading?: boolean;
}

const ISLANDS = ['Oʻahu', 'Maui', 'Hawaiʻi (Big Island)', 'Kauaʻi'];
const INTERESTS = ['Cultural', 'Ecological', 'Culinary', 'Adventure', 'Wellness', 'Educational'];
const BUDGET_TIERS = [
  { value: 'budget', label: 'Budget', symbol: '$' },
  { value: 'mid-range', label: 'Mid-Range', symbol: '$$' },
  { value: 'premium', label: 'Premium', symbol: '$$$' },
];

export default function IntakeForm({ onSubmit, isLoading = false }: IntakeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    arrivalDate: '',
    departureDate: '',
    islands: [],
    groupSize: 2,
    interests: [],
    budgetTier: 'mid-range',
    concierge: false,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (formData.arrivalDate && formData.departureDate && formData.arrivalDate >= formData.departureDate) {
      newErrors.departureDate = 'Departure must be after arrival';
    }
    if (formData.islands.length === 0) newErrors.islands = 'Select at least one island';
    if (formData.interests.length === 0) newErrors.interests = 'Select at least one interest';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIslandToggle = (island: string) => {
    setFormData((prev) => ({
      ...prev,
      islands: prev.islands.includes(island)
        ? prev.islands.filter((i) => i !== island)
        : [...prev.islands, island],
    }));
    if (errors.islands) setErrors((prev) => ({ ...prev, islands: '' }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
    if (errors.interests) setErrors((prev) => ({ ...prev, interests: '' }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-sand-white rounded-lg border border-mist p-6 sm:p-8 font-inter space-y-6"
    >
      {/* Arrival Date */}
      <div>
        <label className="block text-sm font-semibold text-volcanic-black mb-2">
          Arrival Date
        </label>
        <input
          type="date"
          value={formData.arrivalDate}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, arrivalDate: e.target.value }));
            if (errors.arrivalDate) setErrors((prev) => ({ ...prev, arrivalDate: '' }));
          }}
          className="w-full px-4 py-2 rounded-lg border border-mist focus:outline-none focus:ring-2 focus:ring-bright-sea bg-white text-volcanic-black"
        />
        {errors.arrivalDate && (
          <p className="text-sm text-coral mt-1">{errors.arrivalDate}</p>
        )}
      </div>

      {/* Departure Date */}
      <div>
        <label className="block text-sm font-semibold text-volcanic-black mb-2">
          Departure Date
        </label>
        <input
          type="date"
          value={formData.departureDate}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, departureDate: e.target.value }));
            if (errors.departureDate) setErrors((prev) => ({ ...prev, departureDate: '' }));
          }}
          className="w-full px-4 py-2 rounded-lg border border-mist focus:outline-none focus:ring-2 focus:ring-bright-sea bg-white text-volcanic-black"
        />
        {errors.departureDate && (
          <p className="text-sm text-coral mt-1">{errors.departureDate}</p>
        )}
      </div>

      {/* Islands */}
      <div>
        <label className="block text-sm font-semibold text-volcanic-black mb-3">
          Which islands would you like to visit?
        </label>
        <div className="space-y-2">
          {ISLANDS.map((island) => (
            <label key={island} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.islands.includes(island)}
                onChange={() => handleIslandToggle(island)}
                className="w-4 h-4 rounded border-mist text-bright-sea focus:ring-bright-sea"
              />
              <span className="text-sm text-volcanic-black">{island}</span>
            </label>
          ))}
        </div>
        {errors.islands && (
          <p className="text-sm text-coral mt-2">{errors.islands}</p>
        )}
      </div>

      {/* Group Size */}
      <div>
        <label className="block text-sm font-semibold text-volcanic-black mb-2">
          Group Size (1-20 people)
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={formData.groupSize}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              groupSize: Math.max(1, Math.min(20, parseInt(e.target.value) || 1)),
            }))
          }
          className="w-full px-4 py-2 rounded-lg border border-mist focus:outline-none focus:ring-2 focus:ring-bright-sea bg-white text-volcanic-black"
        />
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-semibold text-volcanic-black mb-3">
          What are your interests?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INTERESTS.map((interest) => (
            <label key={interest} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                className="w-4 h-4 rounded border-mist text-bright-sea focus:ring-bright-sea"
              />
              <span className="text-sm text-volcanic-black">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interests && (
          <p className="text-sm text-coral mt-2">{errors.interests}</p>
        )}
      </div>

      {/* Budget Tier */}
      <div>
        <label className="block text-sm font-semibold text-volcanic-black mb-3">
          Budget Tier
        </label>
        <div className="space-y-2">
          {BUDGET_TIERS.map((tier) => (
            <label key={tier.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="budgetTier"
                value={tier.value}
                checked={formData.budgetTier === tier.value}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    budgetTier: e.target.value as 'budget' | 'mid-range' | 'premium',
                  }))
                }
                className="w-4 h-4 text-bright-sea focus:ring-bright-sea"
              />
              <span className="text-sm text-volcanic-black">
                {tier.label} ({tier.symbol})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Premium Concierge Toggle */}
      <div className="border-t border-mist pt-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.concierge}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, concierge: e.target.checked }))
            }
            className="w-5 h-5 rounded border-mist text-coral focus:ring-coral"
          />
          <div>
            <p className="text-sm font-semibold text-volcanic-black">
              Premium Concierge Service
            </p>
            <p className="text-xs text-bright-sea">
              $79 — Priority support & real-time adjustments
            </p>
          </div>
        </label>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-semibold text-volcanic-black mb-2">
          Special Requests (Optional)
        </label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))
          }
          placeholder="Let us know if you have any dietary restrictions, accessibility needs, or special preferences..."
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-mist focus:outline-none focus:ring-2 focus:ring-bright-sea bg-white text-volcanic-black placeholder-gray-400 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full bg-deep-ocean text-sand-white font-semibold py-3 rounded-lg hover:bg-bright-sea disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isSubmitting || isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Generating...
          </>
        ) : (
          'Generate My Itinerary'
        )}
      </button>
    </form>
  );
}
