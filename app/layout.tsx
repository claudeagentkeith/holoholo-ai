import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oʻahu Itinerary Concierge",
  description: "Deposit-first itinerary planning scaffold for bookable Oʻahu experiences."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="page-shell flex items-center justify-between py-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-ocean-700">
                Oʻahu pilot
              </div>
              <div className="text-lg font-semibold text-volcanic">Itinerary Concierge</div>
            </div>
            <nav className="flex gap-4 text-sm text-slate-600">
              <a href="/">Plan a trip</a>
              <a href="/admin">Admin</a>
              <a href="/operator/dashboard">Operator</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
