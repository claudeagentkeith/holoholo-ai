"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BUDGET_OPTIONS,
  DINING_OPTIONS,
  FITNESS_OPTIONS,
  INTEREST_OPTIONS,
  TERRAIN_OPTIONS
} from "@/lib/preferences";

function addDays(base: Date, days: number) {
  const copy = new Date(base);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function toDateInputValue(value: Date) {
  return value.toISOString().slice(0, 10);
}

export function TripRequestForm({ embedded = false }: { embedded?: boolean }) {
  const router = useRouter();
  const now = useMemo(() => new Date(), []);
  const [travelerName, setTravelerName] = useState("");
  const [travelerEmail, setTravelerEmail] = useState("");
  const [travelerPhone, setTravelerPhone] = useState("");
  const [smsAlertsRequested, setSmsAlertsRequested] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(toDateInputValue(addDays(now, 21)));
  const [departureDate, setDepartureDate] = useState(toDateInputValue(addDays(now, 26)));
  const [groupSize, setGroupSize] = useState(2);
  const [budgetTier, setBudgetTier] = useState<"value" | "balanced" | "luxury">("balanced");
  const [terrainPreference, setTerrainPreference] = useState<"beach" | "mountain" | "mixed">("mixed");
  const [fitnessLevel, setFitnessLevel] = useState<"easy" | "moderate" | "active">("moderate");
  const [diningStyle, setDiningStyle] = useState<"casual" | "mixed" | "elevated">("mixed");
  const [specialRequests, setSpecialRequests] = useState("");
  const [interests, setInterests] = useState<string[]>(["regenerative", "culture", "food"]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/preview-sessions", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          travelerName,
          travelerEmail,
          travelerPhone,
          smsAlertsRequested,
          arrivalDate,
          departureDate,
          groupSize,
          interests,
          budgetTier,
          terrainPreference,
          fitnessLevel,
          diningStyle,
          specialRequests
        })
      });

      const json = (await response.json()) as { publicId?: string; error?: string };
      if (!response.ok || !json.publicId) {
        throw new Error(json.error ?? "Unable to build masked preview.");
      }

      router.push(`/preview/${json.publicId}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unexpected error");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  }

  return (
    <form className={`${embedded ? "p-0" : "card mt-8 p-6 sm:p-8"}`} onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="travelerName">Full name</label>
          <input id="travelerName" value={travelerName} onChange={(event) => setTravelerName(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="travelerEmail">Email</label>
          <input
            id="travelerEmail"
            type="email"
            value={travelerEmail}
            onChange={(event) => setTravelerEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="travelerPhone">Phone</label>
          <input id="travelerPhone" value={travelerPhone} onChange={(event) => setTravelerPhone(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="groupSize">Group size</label>
          <input
            id="groupSize"
            type="number"
            min={1}
            max={20}
            value={groupSize}
            onChange={(event) => setGroupSize(Number(event.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="arrivalDate">Arrival date</label>
          <input id="arrivalDate" type="date" value={arrivalDate} onChange={(event) => setArrivalDate(event.target.value)} required />
        </div>
        <div>
          <label htmlFor="departureDate">Departure date</label>
          <input
            id="departureDate"
            type="date"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="budgetTier">Trip style</label>
          <select id="budgetTier" value={budgetTier} onChange={(event) => setBudgetTier(event.target.value as typeof budgetTier)}>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="terrainPreference">Terrain preference</label>
          <select id="terrainPreference" value={terrainPreference} onChange={(event) => setTerrainPreference(event.target.value as typeof terrainPreference)}>
            {TERRAIN_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fitnessLevel">Fitness level</label>
          <select id="fitnessLevel" value={fitnessLevel} onChange={(event) => setFitnessLevel(event.target.value as typeof fitnessLevel)}>
            {FITNESS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="diningStyle">Dining style</label>
          <select id="diningStyle" value={diningStyle} onChange={(event) => setDiningStyle(event.target.value as typeof diningStyle)}>
            {DINING_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={smsAlertsRequested}
            onChange={(event) => setSmsAlertsRequested(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-300"
          />
          <span>
            Use this phone for operational trip texts. SMS reminders and disruption alerts will only be sent if you proceed after the masked preview.
          </span>
        </label>
      </div>

      <div className="mt-6">
        <label>Preferred event types</label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {INTEREST_OPTIONS.map((option) => {
            const checked = interests.includes(option.value);
            return (
              <label key={option.value} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleInterest(option.value)}
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm text-slate-700">{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="specialRequests">Anything else we should optimize for?</label>
        <textarea
          id="specialRequests"
          value={specialRequests}
          onChange={(event) => setSpecialRequests(event.target.value)}
          rows={4}
          placeholder="Examples: no snorkeling, lighter first day, stroller-friendly, need sunset dinner, avoid early mornings."
        />
      </div>

      <div className="mt-6 rounded-2xl border border-ocean-200 bg-ocean-50 p-4 text-sm text-slate-700">
        <div className="font-medium text-volcanic">See the masked itinerary before paying anything</div>
        <div className="mt-1">
          holoholo.ai will check coverage, build a masked schedule, estimate total cost, and show the regenerative score band before asking for the $15 planning deposit.
        </div>
      </div>

      {error ? <div className="mt-4 text-sm font-medium text-coral">{error}</div> : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-volcanic px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Building masked preview..." : "Preview my itinerary"}
        </button>
        <div className="text-sm text-slate-500">The masked preview hides supplier names and exact venues until you decide to proceed.</div>
      </div>
    </form>
  );
}
