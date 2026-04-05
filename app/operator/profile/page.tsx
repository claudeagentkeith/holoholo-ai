import { SectionTitle } from "@/components/section-title";

export default function OperatorProfilePage() {
  return (
    <div className="page-shell space-y-8">
      <SectionTitle
        eyebrow="Operator placeholder"
        title="Profile management"
        description="The original spec included a richer operator profile editor. For the Oʻahu pilot, most source maintenance moves to internal admin tooling, but this form shows where self-service fields can eventually live."
      />

      <form className="card grid gap-6 p-6 lg:grid-cols-2">
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={6} defaultValue="Place-based description for cultural and experience context." />
        </div>
        <div>
          <label htmlFor="pricing">Pricing</label>
          <input id="pricing" defaultValue="$145 per person" />
        </div>
        <div>
          <label htmlFor="availability">Availability days</label>
          <input id="availability" defaultValue="Mon, Wed, Fri" />
        </div>
        <div>
          <label htmlFor="maxGroup">Max group size</label>
          <input id="maxGroup" defaultValue="12" />
        </div>
        <div>
          <label htmlFor="contact">Contact information</label>
          <input id="contact" defaultValue="ops@example.com" />
        </div>
        <div>
          <label htmlFor="photos">Photo URLs</label>
          <input id="photos" defaultValue="https://example.com/photo-1.jpg" />
        </div>
        <div className="lg:col-span-2">
          <button type="button" className="rounded-xl bg-volcanic px-5 py-3 text-sm font-semibold text-white">
            Save placeholder profile
          </button>
        </div>
      </form>
    </div>
  );
}
