import { TripRequestForm } from "@/components/trip-request-form";

export default function EmbeddedIntakePage() {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ocean-700">Embedded intake</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-volcanic">Preview your Oʻahu itinerary</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          This route is meant to be linked to or embedded inside an existing marketing site. It uses the same masked-preview flow as the main landing page.
        </p>
        <TripRequestForm embedded />
      </div>
    </div>
  );
}
