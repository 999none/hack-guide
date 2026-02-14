import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Monitor,
  Wifi,
  HardDrive,
  Gamepad2,
  Info,
  Check,
} from 'lucide-react';

function ToolCard({ icon: Icon, title, desc, tag }) {
  return (
    <div
      data-testid={`tool-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="glass-card group rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/[0.02] to-transparent pointer-events-none" />
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 transition-colors">
        <Icon className="w-6 h-6 text-blue-400" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-white font-bold text-base">{title}</h4>
          {tag && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {tag}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function RequirementCheck({ text }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} />
      </div>
      <span className="text-slate-300 text-sm">{text}</span>
    </div>
  );
}

export default function StepTools() {
  return (
    <div data-testid="step-tools" className="w-full max-w-3xl mx-auto animate-reveal">
      {/* Header */}
      <div className="text-center pt-8 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-500 mb-6">
          <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
          ÉTAPE 2 SUR 3
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Outils{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            nécessaires
          </span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
          Rassemblez le matériel requis avant de commencer la modification de votre console.
        </p>
      </div>

      {/* Tools grid */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs text-white font-bold">1</span>
          Matériel requis
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <ToolCard
            icon={CreditCard}
            title="Carte SD"
            desc="Une carte SD d'au moins 32 Go est recommandée. Une Micro SD avec adaptateur fonctionne parfaitement. Doit être formatée en FAT32."
            tag="Requis"
          />
          <ToolCard
            icon={Monitor}
            title="Ordinateur"
            desc="Un PC, Mac ou Linux pour transférer les fichiers sur la carte SD et télécharger les outils nécessaires."
            tag="Requis"
          />
          <ToolCard
            icon={Wifi}
            title="Connexion Internet"
            desc="Votre Wii U doit être connectée à Internet pour effectuer l'exploit initial et télécharger les mises à jour."
            tag="Requis"
          />
          <ToolCard
            icon={HardDrive}
            title="Stockage USB"
            desc="Un disque dur externe USB pour installer des jeux et des homebrews. Optionnel mais fortement recommandé."
            tag="Optionnel"
          />
        </div>
      </div>

      {/* SD Card format info */}
      <div className="mt-8 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs text-white font-bold">2</span>
          Formatage de la carte SD
        </h3>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Votre carte SD doit être formatée en <strong className="text-white">FAT32</strong> avec
                une taille d'allocation de <strong className="text-white">32k (32768)</strong>.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                <strong className="text-amber-400">Ne nommez pas</strong> la carte SD « wiiu » car cela
                cause des problèmes avec les homebrews.
              </p>
            </div>
          </div>

          {/* Tool recommendation */}
          <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
            <p className="text-slate-300 text-sm font-medium mb-3">Outil recommandé pour le formatage :</p>
            <a
              href="http://ridgecrop.co.uk/index.htm?guiformat.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-bold transition-colors"
            >
              GUIFormat (Windows)
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-8 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-xs text-white font-bold">3</span>
          Checklist avant de continuer
        </h3>

        <div className="glass-card rounded-2xl p-6">
          <RequirementCheck text="Wii U avec firmware 5.5.5 ou 5.5.6" />
          <RequirementCheck text="Carte SD de 32 Go minimum, formatée en FAT32" />
          <RequirementCheck text="Ordinateur avec lecteur de carte SD" />
          <RequirementCheck text="Connexion Internet fonctionnelle sur la Wii U" />
          <RequirementCheck text="Console branchée sur secteur pendant toute la procédure" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-10 pb-6">
        <Link
          to="/guide/wiiu/info"
          data-testid="prev-step-btn"
          className="flex items-center gap-2 px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white rounded-full font-bold transition-all text-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </Link>
        <Link
          to="/guide/wiiu/preparation"
          data-testid="next-step-btn"
          className="btn-glow flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all text-sm"
        >
          Étape suivante
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
