'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface HeaderProps {
  activeRoute?: string;
}

export default function Header({ activeRoute }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
    { label: 'Operator Login', href: '/operator' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-sand-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-6 w-6 text-deep-ocean"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
              <path d="M15.5 9.5C14 8 12.5 7.5 11 8" />
            </svg>
            <span className="text-xl font-bold text-deep-ocean font-inter">
              Holoholo.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors font-inter ${
                  activeRoute === link.label
                    ? 'border-b-2 border-bright-sea text-deep-ocean'
                    : 'text-volcanic-black hover:text-bright-sea'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-volcanic-black hover:text-bright-sea"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="mt-4 space-y-2 md:hidden border-t border-mist pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors font-inter ${
                  activeRoute === link.label
                    ? 'bg-mist text-deep-ocean border-l-4 border-bright-sea'
                    : 'text-volcanic-black hover:bg-mist'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
