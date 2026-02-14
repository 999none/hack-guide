import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Smartphone, ChevronRight, Construction } from 'lucide-react';

const consoles = [
  {
    id: 'wiiu',
    name: 'Nintendo Wii U',
    description: "Installation d'Aroma et Tiramisu pour les consoles 5.5.x.",
    Icon: Gamepad2,
    status: 'available',
    accentBg: 'bg-blue-500/10',
    accentText: 'text-blue-400',
    hoverBg: 'group-hover:bg-blue-600',
    hoverText: 'group-hover:text-white',
    link: '/guide/wiiu',
  },
  {
    id: '3ds',
    name: 'Nintendo 3DS',
    description: 'Installation de Luma3DS et Boot9Strap. (Bientôt disponible)',
    Icon: Smartphone,
    status: 'coming_soon',
    accentBg: 'bg-red-500/10',
    accentText: 'text-red-400',
    hoverBg: '',
    hoverText: '',
    link: null,
  },
];

function ConsoleCard({ console: c }) {
  const { name, description, Icon, status, accentBg, accentText, hoverBg, hoverText } = c;
  const isDisabled = status === 'coming_soon';

  const content = (
    <div
      data-testid={`console-card-${c.id}`}
      className={`glass-card ${isDisabled ? 'disabled' : 'group'} p-8 md:p-10 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden`}
    >
      {/* Subtle inner glow */}
      {!isDisabled && (
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-blue-500/[0.03] to-transparent pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={`w-20 h-20 mb-7 ${accentBg} rounded-2xl flex items-center justify-center ${accentText} ${hoverBg} ${hoverText} transition-all duration-300`}
      >
        <Icon className="w-10 h-10" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3 text-white">
        {name}
      </h3>

      {/* Description */}
      <p className="text-slate-500 font-medium mb-7 text-sm md:text-base leading-relaxed">
        {description}
      </p>

      {/* Action */}
      {isDisabled ? (
        <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
          <Construction className="w-4 h-4" />
          Bientôt disponible
        </div>
      ) : (
        <div className="flex items-center gap-1.5 font-bold text-blue-400 group-hover:text-blue-300 transition-colors text-sm">
          Démarrer
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );

  if (isDisabled) return content;

  return (
    <Link to={c.link} data-testid={`console-link-${c.id}`} className="block">
      {content}
    </Link>
  );
}

export default function ConsoleSelector() {
  return (
    <section
      id="selector"
      data-testid="console-selector"
      className="max-w-5xl w-full mx-auto px-6 py-24 md:py-32 border-t border-white/5"
    >
      <div
        className="text-center mb-14 md:mb-16 animate-reveal"
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
      >
        <h2
          data-testid="selector-title"
          className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight"
        >
          Sélecteur de console
        </h2>
        <p className="text-slate-500 font-medium text-base md:text-lg">
          Choisissez votre appareil pour accéder aux instructions spécifiques.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-reveal"
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
      >
        {consoles.map((c) => (
          <ConsoleCard key={c.id} console={c} />
        ))}
      </div>
    </section>
  );
}
