'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '../lib/i18n';
import { Language } from '../lib/translations';

interface HeaderProps {
  activeRoute?: string;
}

export default function Header({ activeRoute }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, language, setLanguage, languageNames } = useTranslation();

  const navLinks = [
    { labelKey: 'nav.howItWorks', href: '#how-it-works' },
    { labelKey: 'nav.about', href: '#about' },
    { labelKey: 'nav.operatorLogin', href: '/operator' },
  ];

  const languages: Language[] = ['en', 'ja', 'zh', 'haw', 'ko'];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">\uD83C\uDF3A</span>
          <span className="text-xl font-bold text-emerald-700">Holoholo.ai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-emerald-600 ${activeRoute === link.href ? 'text-emerald-600' : 'text-gray-600'}`}>
              {t(link.labelKey)}
            </Link>
          ))}
          <Link href="/itinerary" className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${activeRoute === '/itinerary' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
            {t('nav.dashboard')}
          </Link>

          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 px-2 py-1 rounded-md hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              {languageNames[language]}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border py-1 min-w-[140px] z-50">
                {languages.map(lang => (
                  <button key={lang} onClick={() => { setLanguage(lang); setLangOpen(false); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 ${language === lang ? 'text-emerald-600 font-medium bg-emerald-50/50' : 'text-gray-700'}`}>
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button className="md:hidden text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="block text-sm text-gray-600 py-2">{t(link.labelKey)}</Link>
          ))}
          <Link href="/itinerary" className="block text-sm font-medium text-emerald-700 py-2">{t('nav_itinerary')}</Link>
          <div className="border-t pt-2 mt-2 flex flex-wrap gap-2">
            {languages.map(lang => (
              <button key={lang} onClick={() => { setLanguage(lang); setMobileOpen(false); }} className={`text-xs px-3 py-1 rounded-full ${language === lang ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                {languageNames[lang]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
