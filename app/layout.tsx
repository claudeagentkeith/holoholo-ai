import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holoholo.ai - Regenerative Tourism in Hawaii',
  description: 'AI-powered concierge for culturally respectful, give-back experiences in Hawaii',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-teal-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="text-xl font-bold">Holoholo.ai</a>
              <div className="flex space-x-4">
                <a href="/" className="hover:text-teal-200 transition">Home</a>
                <a href="/about" className="hover:text-teal-200 transition">About</a>
                <a href="/admin" className="hover:text-teal-200 transition">Dashboard</a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>Holoholo.ai - Regenerative Tourism for Hawaii</p>
            <p className="text-sm mt-2">Connecting travelers with culturally respectful, give-back experiences</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
