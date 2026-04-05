import { SectionTitle } from "@/components/section-title";
import { StatusPill } from "@/components/status-pill";
import { StatCard } from "@/components/stat-card";
import { operatorQueue } from "@/lib/mock/dashboard";

export default function OperatorDashboardPage() {
  return (
    <div className="page-shell space-y-8">
      <SectionTitle
        eyebrow="Operator placeholder"
        title="Upcoming booking queue"
        description="The revised product minimizes operator burden at launch, so this screen is intentionally lightweight. It is still useful as a future self-service view once public-source booking coverage stabilizes."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Bookings this month" value="12" />
        <StatCard label="Revenue this month" value="$4,180" />
        <StatCard label="Upcoming count" value="8" />
      </section>

      <section className="card p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Experience</th>
                <th className="px-3 py-2">Traveler</th>
                <th className="px-3 py-2">Group size</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {operatorQueue.map((row) => (
                <tr key={`${row.date}-${row.traveler}`} className="border-t border-slate-200">
                  <td className="px-3 py-3 text-slate-600">{row.date}</td>
                  <td className="px-3 py-3 font-medium text-volcanic">{row.experience}</td>
                  <td className="px-3 py-3 text-slate-600">{row.traveler}</td>
                  <td className="px-3 py-3 text-slate-600">{row.groupSize}</td>
                  <td className="px-3 py-3">
                    <StatusPill value={row.status} />
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
