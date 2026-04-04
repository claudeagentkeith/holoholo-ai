'use client';

import Link from 'next/link';
import Header from '../components/Header';
import { useTranslation } from '../lib/i18n';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
      <Header activeRoute="/" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/itinerary" className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-full text-lg font-semibold hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg shadow-emerald-200">
                {t('home.hero.cta')}
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all border-2 border-emerald-200">
                {t('home.hero.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white/60">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">{t('home.howItWorks')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '\uD83C\uDF0D', titleKey: 'home.step1.title', descKey: 'home.step1.desc' },
              { icon: '\uD83C\uDF3F', titleKey: 'home.step2.title', descKey: 'home.step2.desc' },
              { icon: '\u2728', titleKey: 'home.step3.title', descKey: 'home.step3.desc' },
            ].map((step, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t(step.titleKey)}</h3>
                <p className="text-gray-600 leading-relaxed">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{t('about.title')}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{t('about.p1')}</p>
          <p className="text-lg text-gray-600 leading-relaxed">{t('about.p2')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-emerald-100 mb-10">{t('cta.subtitle')}</p>
          <Link href="/itinerary" className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg">
            {t('cta.button')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold text-white mb-2">Holoholo.ai</p>
          <p className="text-sm">{t('footer.tagline')}</p>
          <p className="text-xs mt-4">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
