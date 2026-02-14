import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldAlert,
  Info,
  ChevronRight,
  Gamepad2,
  Zap,
  Puzzle,
  Globe,
  Disc3,
  Save,
} from 'lucide-react';

function WarningCard({ icon: Icon, title, children, variant = 'danger' }) {
  const colors = {
    danger: {
      border: 'border-red-500/20',
      bg: 'bg-red-500/[0.06]',
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-400',
      titleColor: 'text-red-400',
    },
    warning: {
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/[0.06]',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      titleColor: 'text-amber-400',
    },
    info: {
      border: 'border-blue-500/20',
      bg: 'bg-blue-500/[0.06]',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      titleColor: 'text-blue-400',
    },
  };
  const c = colors[variant];

  return (
    <div className={`${c.bg} ${c.border} border rounded-2xl p-5 md:p-6`}>
      <div className="flex items-start gap-4">
        <div className={`${c.iconBg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${c.iconColor}`} />
        </div>
        <div>
          <h4 className={`font-heading font-bold text-sm uppercase tracking-wide mb-2 ${c.titleColor}`}>
            {title}
          </h4>
          <div className="text-slate-400 text-sm leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4.5 h-4.5 text-blue-400" strokeWidth={2} />
      </div>
      <div>
        <h4 className="text-white font-semibold text-sm mb-0.5">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function StepInfo() {
  return (
    <div data-testid="step-info" className="w-full max-w-3xl mx-auto animate-reveal">
      {/* Header */}
      <div className="text-center pt-8 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-500 mb-6">
          <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
          ÉTAPE 1 SUR 3
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Informations &{' '}
          <span className="bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent">
            Mise en garde
          </span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
          Avant de commencer, prenez connaissance des risques et des possibilités
          qu'offre le custom firmware.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Danger warning */}
        <WarningCard icon={ShieldAlert} title="Risque de brick" variant="danger">
          <p>
            <strong className="text-red-300">CHAQUE</strong> modification de votre système comporte
            un risque potentiel de <strong className="text-red-300">brick irréversible</strong>.
            Ces cas sont rares, mais possibles. Assurez-vous de suivre{' '}
            <strong className="text-red-300">TOUTES</strong> les instructions{' '}
            <strong className="text-red-300">EXACTEMENT</strong> comme indiqué.
          </p>
        </WarningCard>

        {/* Info notice */}
        <WarningCard icon={Info} title="Compatibilité" variant="info">
          <p>
            Ce guide fonctionne sur <strong className="text-blue-300">toutes les Wii U</strong>,
            dans toutes les régions, avec le firmware <strong className="text-blue-300">5.5.6</strong>{' '}
            (Amérique du Nord) ou <strong className="text-blue-300">5.5.5</strong> (autres régions)
            ou inférieur.
          </p>
        </WarningCard>

        {/* Warning about existing CFW */}
        <WarningCard icon={AlertTriangle} title="CFW existant" variant="warning">
          <p>
            Si vous avez déjà un CFW installé (CBHC, Haxchi, Mocha), veuillez d'abord le
            désinstaller avant de suivre ce guide. Les instructions de désinstallation sont
            disponibles sur le guide officiel.
          </p>
        </WarningCard>

        {/* What is Aroma */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mt-8">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
            Qu'est-ce qu'Aroma ?
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Aroma est un environnement de custom firmware (CFW) de nouvelle génération pour la Wii U,
            successeur de Tiramisu. Il offre un système de plugins, un nouveau moyen de lancer les
            homebrews, et de nombreux modules intégrés.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FeatureItem
              icon={Puzzle}
              title="Plugins & Modules"
              desc="Système extensible avec des plugins fonctionnant en arrière-plan."
            />
            <FeatureItem
              icon={Gamepad2}
              title="ROM Hacks"
              desc="Modifiez vos jeux avec des patches et des mods personnalisés."
            />
            <FeatureItem
              icon={Globe}
              title="Region Free"
              desc="Jouez à des jeux de n'importe quelle région sans restriction."
            />
            <FeatureItem
              icon={Save}
              title="Sauvegarde"
              desc="Sauvegardez, éditez et restaurez vos sauvegardes."
            />
            <FeatureItem
              icon={Disc3}
              title="Dump de disques"
              desc="Extrayez vos disques Wii U vers votre stockage."
            />
            <FeatureItem
              icon={Zap}
              title="Homebrew"
              desc="Lancez des applications homebrew directement depuis le menu Wii U."
            />
          </div>
        </div>

        {/* Data safety */}
        <WarningCard icon={Info} title="Vos données sont en sécurité" variant="info">
          <p>
            Si tout se passe comme prévu, vous ne perdrez aucune donnée. Vos jeux, sauvegardes,
            NNID, etc. seront préservés. <strong className="text-blue-300">Gardez votre console
            branchée</strong> tout au long du processus.
          </p>
        </WarningCard>
      </div>

      {/* Navigation */}
      <div className="flex justify-end pt-10 pb-6">
        <Link
          to="/guide/wiiu/outils"
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
