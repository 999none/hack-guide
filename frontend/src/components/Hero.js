import React from 'react';
import { ArrowDown, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="pt-20 md:pt-28 pb-28 md:pb-36 px-6 flex flex-col items-center text-center space-y-8 animate-reveal"
    >
      {/* Update badge */}
      <div
        data-testid="update-badge"
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-400"
      >
        <Zap className="w-3.5 h-3.5 text-midnight-400" />
        <span className="text-midnight-300">Mise à jour</span>
        <span className="text-slate-600">•</span>
        Janvier 2026
      </div>

      {/* Main title */}
      <h1
        data-testid="hero-title"
        className="hero-title font-heading text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tighter max-w-5xl"
      >
        Le futur de votre{' '}
        <br />
        console commence ici.
      </h1>

      {/* Subtitle */}
      <p
        data-testid="hero-subtitle"
        className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
      >
        Libérez tout le potentiel de votre Wii U et 3DS avec nos guides complets,
        sécurisés et maintenus par la communauté.
      </p>

      {/* CTA */}
      <div className="flex gap-4 pt-2">
        <a
          href="#selector"
          data-testid="start-guide-button"
          className="btn-glow px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold flex items-center gap-2.5 transition-all"
        >
          Commencer le guide
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
