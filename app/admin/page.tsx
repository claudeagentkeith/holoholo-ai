
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { adminStats } from "@/lib/mock/dashboard";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  let stats = adminStats;
  let recentTrips: Array<{
    id: string;
    travelerName: string;
    travelerEmail: string;
    tripStatus: string;
    createdAt: Date;
  }> = [];

  try {
    if (prisma) {
      const [totalTrips, activeTrips, queuedBookings, pendingSignals, trips] = await Promise.all([
        prisma.trip.count(),
        prisma.trip.count({
          where: {
            tripStatus: {
              in: ["REQUESTED", "GENERATING", "VERIFYING", "PRELIMINARY_SET", "FINAL_CONFIRM_PENDING", "BOOKING", "BOOKED", "MONITORING"]
            }
          }
        }),
        prisma.booking.count({
          where: {
            status: {
              in: ["PENDING", "IN_PROGRESS"]
            }
          }
        }),
        prisma.riskSignal.count({
          where: {
            status: "OPEN"
          }
        }),
        prisma.trip.findMany({
          orderBy: {
            createdAt: "desc"
          },
          take: 10,
          select: {
            id: true,
            travelerName: true,
            travelerEmail: true,
            tripStatus: true,
            createdAt: true
          }
        })
      ]);

      stats = {
        totalTrips,
        activeTrips,
        queuedBookings,
        pendingSignals
      };
      recentTrips = trips;
    }
  } catch (e) {
    console.error("Database not available:", e);
  }

  return (
    <div className="page-shell space-y-8">
      <SectionTitle
        eyebrow="Internal operations"
        title="Admin overview"
        description="This page is intentionally light. The next layer now includes a curated PRD #4 source registry, and later should add extraction-confidence review, manual overrides, source health, and replan approval history."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total trips" value={String(stats.totalTrips)} />
        <StatCard label="Active trips" value={String(stats.activeTrips)} />
        <StatCard label="Queued bookings" value={String(stats.queuedBookings)} />
        <StatCard label="Open signals" value={String(stats.pendingSignals)} />
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-volcanic">Inventory strategy</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          The biggest OÊ»ahu launch risk is not itinerary generation â it is public-source coverage. The new PRD #4 registry scores
          bookable activities, luÊ»aus, hikes, dining, event feeds, and fallback marketplaces by how well they fit the framework without
          asking suppliers to customize anything.
        </p>
        <div className="mt-4">
          <Link href="/admin/sources" className="inline-flex items-center rounded-full bg-ocean-700 px-4 py-2 text-sm font-medium text-white no-underline hover:bg-ocean-800">
            Open PRD #4 source registry
          </Link>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-semibold text-volcanic">Recent trips</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="px-3 py-2">Traveler</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.length ? (
                recentTrips.map((trip) => (
                  <tr key={trip.id} className="border-t border-slate-200">
                    <td className="px-3 py-3 font-medium text-volcanic">{trip.travelerName}</td>
                    <td className="px-3 py-3 text-slate-600">{trip.travelerEmail}</td>
                    <td className="px-3 py-3 text-slate-600">{trip.createdAt.toLocaleDateString()}</td>
                    <td className="px-3 py-3">
                      <StatusPill value={trip.tripStatus} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-3 py-3 text-slate-600" colSpan={4}>
                    No trips yet. Seed and create a request from the landing page.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
