import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Operator Portal | Holoholo.ai',
  description: 'Manage your regenerative tourism experiences',
}

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-800 text-white px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold">Operator Portal</h1>
          <nav className="flex gap-4 text-sm">
            <a href="/operator/dashboard" className="hover:text-teal-200">Dashboard</a>
            <a href="/operator/profile" className="hover:text-teal-200">Profile</a>
          </nav>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
