import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { StatCard } from "@/components/stat-card";
import {
  categoryOrder,
  countBy,
  easeOrder,
  launchWhitelist,
  sourceRegistry,
  sourceRegistryStats
} from "@/lib/source-registry";

function pillClassForEase(value: string) {
  if (value === "Very High") return "border-leaf/20 bg-leaf/10 text-leaf";
  if (value === "High") return "border-ocean-200 bg-ocean-50 text-ocean-700";
  if (value === "Medium") return "border-amber-200 bg-amber-50 text-amber-700";
  if (value === "Low") return "border-coral/20 bg-coral/10 text-coral";
  return "border-slate-300 bg-slate-50 text-slate-700";
}

function pillClassForFit(value: string) {
  if (value === "Yes") return "border-leaf/20 bg-leaf/10 text-leaf";
  if (value === "Mostly") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-coral/20 bg-coral/10 text-coral";
}

function percent(part: number, total: number) {
  if (!total) return "0.0%";
  return `${((part / total) * 100).toFixed(1)}%`;
}

export default function AdminSourcesPage() {
  const activeRows = sourceRegistry.filter((row) => row.status === "Active");

  const categorySummary = categoryOrder.map((categoryGroup) => {
    const items = activeRows.filter((row) => row.categoryGroup === categoryGroup);
    const recommended = items.filter((row) => row.recommendedForV1 === "Yes").length;
    const coverable = items.filter((row) => row.frameworkFit === "Yes" || row.frameworkFit === "Mostly").length;

    return {
      categoryGroup,
      active: items.length,
      recommended,
      coverableShare: percent(coverable, items.length)
    };
  });

  const easeSummary = easeOrder.map((label) => ({
    label,
    count: activeRows.filter((row) => row.integrationEase === label).length
  }));

  const surfaceSummary = countBy(activeRows, (row) => row.surfaceType).sort((a, b) => b.count - a.count);

  return (
    <div className="page-shell space-y-8">
      <SectionTitle
        eyebrow="Inventory strategy"
        title="PRD #4 source registry"
        description="This route turns the curated Oʻahu public-source list into a working admin artifact. It is the adapter backlog: which sources exist, how hard they are to support without supplier customization, and which ones belong in the launch whitelist first."
      />

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Link href="/admin" className="badge border border-slate-300 bg-white text-slate-700 no-underline">
          Back to admin overview
        </Link>
        <span className="badge border border-ocean-200 bg-ocean-50 text-ocean-700">
          Full registry lives in data/oahu_prd4_inventory_registry.json
        </span>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total curated rows" value={String(sourceRegistryStats.total)} />
        <StatCard label="Active rows" value={String(sourceRegistryStats.active)} />
        <StatCard label="Recommended for V1" value={String(sourceRegistryStats.recommended)} />
        <StatCard label="Coverable without supplier work" value={String(sourceRegistryStats.coverable)} hint={percent(sourceRegistryStats.coverable, sourceRegistryStats.active)} />
        <StatCard label="High-confidence rows" value={String(sourceRegistryStats.highConfidence)} hint={percent(sourceRegistryStats.highConfidence, sourceRegistryStats.active)} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-volcanic">Coverage by category</h2>
          <p className="mt-2 text-sm text-slate-600">
            The goal is breadth with disciplined source patterns. The strongest launch coverage comes from timed-entry attractions,
            restaurant reservation platforms, direct supplier booking pages, and a curated set of bundle-heavy lūʻau sources.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2 text-right">Active</th>
                  <th className="px-3 py-2 text-right">V1</th>
                  <th className="px-3 py-2 text-right">Coverable share</th>
                </tr>
              </thead>
              <tbody>
                {categorySummary.map((row) => (
                  <tr key={row.categoryGroup} className="border-t border-slate-200">
                    <td className="px-3 py-3 font-medium text-volcanic">{row.categoryGroup}</td>
                    <td className="px-3 py-3 text-right text-slate-600">{row.active}</td>
                    <td className="px-3 py-3 text-right text-slate-600">{row.recommended}</td>
                    <td className="px-3 py-3 text-right text-slate-600">{row.coverableShare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold text-volcanic">Integration shape</h2>
          <p className="mt-2 text-sm text-slate-600">
            These counts show where adapter work should go first: official activity booking pages, package matrices for luaus and
            bundles, plus platform-level dining and event coverage.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">By ease</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {easeSummary.map((row) => (
                  <span key={row.label} className={`badge border ${pillClassForEase(row.label)}`}>
                    {row.label}: {row.count}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Top surface types</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Surface type</th>
                      <th className="px-3 py-2 text-right">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surfaceSummary.map((row) => (
                      <tr key={row.label} className="border-t border-slate-200">
                        <td className="px-3 py-3 font-medium text-volcanic">{row.label.replaceAll("_", " ")}</td>
                        <td className="px-3 py-3 text-right text-slate-600">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-volcanic">Build implications</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-semibold text-volcanic">1. Platform adapters matter most</div>
            <p className="mt-2">
              Dining breadth comes from OpenTable, Resy, and Tock. Event breadth comes from venue ticketing plus feeds like
              Ticketmaster, Eventbrite, and Blaisdell.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-semibold text-volcanic">2. Official supplier pages should be primary</div>
            <p className="mt-2">
              Kualoa, surf schools, cruises, scuba, parasail, and timed-entry attractions fit the framework well with whitelist-based
              extraction and deep-link launch.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-semibold text-volcanic">3. Luaus need stronger QA, not supplier changes</div>
            <p className="mt-2">
              The challenge is package/seating/transfer complexity. That is adapter complexity on our side, not something operators need
              to customize for us.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-semibold text-volcanic">4. Walk-up and request-based items stay outside confident auto-booking</div>
            <p className="mt-2">
              These can still appear in itinerary planning, but the system should not promise a confident booking flow for them in V1.
            </p>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-volcanic">Launch whitelist</h2>
            <p className="mt-2 text-sm text-slate-600">
              All rows below are marked <span className="font-semibold text-volcanic">Recommended for V1</span>. This is the practical queue
              for source adapters, QA recipes, and browser fallback coverage.
            </p>
          </div>
          <div className="text-sm text-slate-500">{launchWhitelist.length} rows</div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-3 py-2">Item</th>
                <th className="px-3 py-2">Supplier</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Ease</th>
                <th className="px-3 py-2">Fit</th>
                <th className="px-3 py-2">Source</th>
              </tr>
            </thead>
            <tbody>
              {launchWhitelist.map((row) => (
                <tr key={row.id} className="border-t border-slate-200 align-top">
                  <td className="px-3 py-3">
                    <div className="font-medium text-volcanic">{row.itemName}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {row.area} · Priority {row.launchPriority}
                    </div>
                    {row.notes ? <div className="mt-2 text-xs text-slate-500">{row.notes}</div> : null}
                  </td>
                  <td className="px-3 py-3 text-slate-600">{row.supplier}</td>
                  <td className="px-3 py-3 text-slate-600">{row.categoryGroup}</td>
                  <td className="px-3 py-3">
                    <span className={`badge border ${pillClassForEase(row.integrationEase)}`}>{row.integrationEase}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`badge border ${pillClassForFit(row.frameworkFit)}`}>{row.frameworkFit}</span>
                  </td>
                  <td className="px-3 py-3 text-slate-600">
                    <div>{row.sourceClass}</div>
                    <a href={row.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 block break-all text-xs">
                      {row.sourceDomain}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
