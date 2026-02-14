import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Check,
  Download,
  Gamepad2,
  HardDrive,
  CreditCard,
  FolderSync,
  MonitorDown,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertTriangle,
  Info,
  Package,
} from 'lucide-react';

const payloads = [
  {
    id: 'envloader',
    apiId: 'environmentloader',
    name: 'EnvironmentLoader',
    desc: "Permet de démarrer dans différents environnements.",
    required: true,
    defaultChecked: true,
  },
  {
    id: 'nanddumper',
    apiId: 'wiiu-nanddumper-payload',
    name: 'Nanddumper',
    desc: 'Permet de sauvegarder votre NAND.',
    required: false,
    defaultChecked: true,
  },
  {
    id: 'fwimg',
    apiId: 'fw_img_loader',
    name: 'fw.img loader',
    desc: 'Payload pour charger un fw.img depuis la racine de votre carte SD.',
    required: false,
    defaultChecked: false,
  },
];

const aromaBase = [
  {
    id: 'base-aroma',
    apiId: 'base-aroma',
    name: 'Base-Aroma',
    desc: "CFW personnalisé, lance les homebrews depuis le menu Wii U.",
    required: true,
    defaultChecked: true,
  },
];

const plugins = [
  {
    id: 'bloopair',
    apiId: 'bloopair',
    name: 'Bloopair',
    desc: 'Support natif pour diverses manettes Bluetooth.',
    defaultChecked: true,
  },
  {
    id: 'inkay',
    apiId: 'inkay',
    name: 'Inkay',
    desc: 'Active Pretendo Network, services en ligne alternatifs pour la Wii U.',
    defaultChecked: false,
  },
  {
    id: 'ftpiiu',
    apiId: 'ftpiiu',
    name: 'FTPiiU Plugin',
    desc: "Serveur FTP fonctionnant en arrière-plan.",
    defaultChecked: true,
  },
  {
    id: 'sdcafiine',
    apiId: 'sdcafiine',
    name: 'SDCafiine Plugin',
    desc: 'Permet de modder vos jeux en remplaçant des fichiers à la volée.',
    defaultChecked: false,
  },
  {
    id: 'screenshot',
    apiId: 'screenshotplugin',
    name: 'Screenshot Plugin',
    desc: "Permet de prendre des captures d'écran.",
    defaultChecked: false,
  },
  {
    id: 'swipswap',
    apiId: 'swipswapme',
    name: 'SwipSwapMe',
    desc: "Permet d'intervertir l'écran TV et le GamePad.",
    defaultChecked: false,
  },
];

function ConfigCard({ item, checked, onChange }) {
  const isRequired = item.required;

  return (
    <label className="block h-full cursor-pointer" data-testid={`config-card-${item.id}`}>
      {!isRequired && (
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={() => onChange(item.id)}
        />
      )}

      <div
        className={`relative h-full p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 ${
          isRequired
            ? 'glass-card border-slate-700/30 opacity-60'
            : checked
            ? 'glass-card border-emerald-500/40 bg-emerald-500/[0.06] hover:-translate-y-1'
            : 'glass-card border-transparent hover:-translate-y-1 hover:border-white/20'
        }`}
      >
        {/* Check badge */}
        <div
          className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRequired
              ? 'bg-slate-600 opacity-100 scale-100'
              : checked
              ? 'bg-emerald-500 opacity-100 scale-100'
              : 'bg-emerald-500 opacity-0 scale-50'
          }`}
        >
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </div>

        <h4 className="font-bold text-white text-base mb-1 pr-8">{item.name}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </label>
  );
}

export default function StepPreparation() {
  const [payloadChecks, setPayloadChecks] = useState(
    Object.fromEntries(payloads.map((p) => [p.id, p.defaultChecked]))
  );
  const [pluginChecks, setPluginChecks] = useState(
    Object.fromEntries(plugins.map((p) => [p.id, p.defaultChecked]))
  );
  const [showMacTip, setShowMacTip] = useState(false);

  const togglePayload = (id) => {
    setPayloadChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const togglePlugin = (id) => {
    setPluginChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Build a flat list of all items with their checked state
  const allItems = [
    ...payloads.map(p => ({ ...p, checked: p.required || payloadChecks[p.id] })),
    ...aromaBase.map(a => ({ ...a, checked: true })),
    ...plugins.map(p => ({ ...p, checked: !!pluginChecks[p.id] })),
  ];
  const selectedItems = allItems.filter(i => i.checked);
  const selectedCount = selectedItems.length;
  const downloadUrl = `https://aroma.foryour.cafe/api/download?packages=${selectedItems.map(i => i.apiId).join(',')}`;

  return (
    <div data-testid="step-preparation" className="w-full max-w-4xl mx-auto animate-reveal">
      {/* Header */}
      <div className="text-center pt-8 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-slate-500 mb-6">
          <Gamepad2 className="w-3.5 h-3.5 text-blue-400" />
          ÉTAPE 3 SUR 3
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Préparation de la{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            carte SD
          </span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
          Sélectionnez les composants à installer, puis téléchargez les fichiers sur votre carte SD.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section: Payloads */}
        <section>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white font-bold">1</span>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-white">Base</h2>
          </div>
          <p className="text-slate-500 text-sm mb-5 ml-10">Payloads</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {payloads.map((p) => (
              <ConfigCard
                key={p.id}
                item={p}
                checked={payloadChecks[p.id]}
                onChange={togglePayload}
              />
            ))}
          </div>
        </section>

        {/* Section: Aroma Base */}
        <section>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white font-bold">2</span>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-white">Aroma</h2>
          </div>
          <p className="text-slate-500 text-sm mb-5 ml-10">Base Aroma</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aromaBase.map((a) => (
              <ConfigCard key={a.id} item={a} checked={true} onChange={() => {}} />
            ))}
          </div>
        </section>

        {/* Section: Plugins */}
        <section>
          <div className="flex items-center gap-3 mb-1.5">
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white font-bold">3</span>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-white">Plugins additionnels</h2>
          </div>
          <p className="text-slate-500 text-sm mb-5 ml-10">Modules et plugins supplémentaires</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {plugins.map((p) => (
              <ConfigCard
                key={p.id}
                item={p}
                checked={pluginChecks[p.id]}
                onChange={togglePlugin}
              />
            ))}
          </div>
        </section>

        {/* Pack Download - Single Button */}
        <section data-testid="pack-download-section">
          <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.08] via-emerald-500/[0.04] to-blue-500/[0.04]">
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-emerald-500/[0.05] pointer-events-none" />

            <div className="relative p-6 md:p-8">
              {/* Recap */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">Votre pack personnalisé</h3>
                  <p className="text-slate-500 text-xs">{selectedCount} composant{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Selected items summary */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedItems.map(i => (
                  <span
                    key={i.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold"
                  >
                    <Check className="w-3 h-3" strokeWidth={3} />
                    {i.name}
                  </span>
                ))}
              </div>

              {/* Single download button */}
              <a
                href={downloadUrl}
                data-testid="download-pack-btn"
                className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 text-base"
              >
                <Download className="w-5 h-5" />
                Télécharger le pack complet
              </a>

              <p className="text-slate-500 text-xs mt-4">
                Le téléchargement contient tous les fichiers sélectionnés ci-dessus, prêts à être copiés sur votre carte SD.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Installation Instructions */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-xs text-white font-bold">4</span>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-white">Installation sur la carte SD</h2>
          </div>

          {/* Warning FAT32 */}
          <div className="bg-amber-500/[0.06] border border-amber-500/20 rounded-2xl p-5 md:p-6 mb-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-2 text-amber-400">
                  Avertissement
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  Votre carte SD doit être formatée en <strong className="text-white">FAT32</strong>.
                  Si ce n'est pas le cas, utilisez{' '}
                  <a href="http://ridgecrop.co.uk/index.htm?guiformat.htm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                    GUIFormat
                  </a>{' '}
                  avec une taille d'allocation de <strong className="text-white">32k (32768)</strong>.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong className="text-red-400">Ne nommez pas</strong> la carte SD{' '}
                  <code className="text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded text-xs font-mono">wiiu</code>{' '}
                  car cela causerait des problèmes avec les homebrews.
                </p>
              </div>
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
            {/* Step A */}
            <div className="flex items-start gap-4" data-testid="install-step-1">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-lg shadow-blue-600/20">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-2">Télécharger le pack</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Cliquez sur le bouton <strong className="text-emerald-400">Télécharger le pack complet</strong> ci-dessus
                  pour obtenir l'archive contenant tous vos composants sélectionnés.
                </p>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Step B */}
            <div className="flex items-start gap-4" data-testid="install-step-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-lg shadow-blue-600/20">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  Insérer la carte SD
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Insérez la carte SD de votre Wii U dans votre ordinateur.
                </p>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Step C */}
            <div className="flex items-start gap-4" data-testid="install-step-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-sm shadow-lg shadow-blue-600/20">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <FolderSync className="w-4 h-4 text-blue-400" />
                  Extraire et copier les fichiers
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  <strong className="text-white">Extrayez</strong> le contenu de l'archive téléchargée et copiez le dossier{' '}
                  <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs font-mono">wiiu</code>{' '}
                  à la <strong className="text-white">racine</strong> de votre carte SD.
                </p>
                <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                  <p className="text-slate-300 text-sm leading-relaxed flex items-start gap-2">
                    <FolderSync className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    Si un dossier{' '}
                    <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs font-mono">wiiu</code>{' '}
                    existe déjà, les contenus doivent être <strong className="text-white">fusionnés</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-5 space-y-4">
            {/* Overwrite tip */}
            <div className="bg-emerald-500/[0.06] border border-emerald-500/20 rounded-2xl p-5" data-testid="overwrite-tip">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-emerald-400 font-bold text-sm mb-1">Conseil</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Si votre ordinateur vous demande d'écraser des fichiers existants sur votre carte SD, cliquez sur <strong className="text-white">Oui</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Mac tip collapsible */}
            <div className="glass-card rounded-2xl overflow-hidden" data-testid="mac-tip">
              <button
                onClick={() => setShowMacTip(!showMacTip)}
                className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer group"
              >
                <span className="text-white font-bold text-sm flex items-center gap-2">
                  <MonitorDown className="w-5 h-5 text-blue-400" />
                  Utilisateurs Mac : Instructions spécifiques
                </span>
                {showMacTip ? (
                  <ChevronUp className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                )}
              </button>
              {showMacTip && (
                <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed space-y-3 border-t border-white/5 pt-4 animate-fade-in">
                  <p>
                    Si vous êtes sur un Mac, extrayez le second zip dans une <strong className="text-white">seconde fenêtre Finder</strong> et glissez le contenu dans la première fenêtre avec le contenu du premier zip.
                  </p>
                  <p>
                    Lorsque vous y êtes invité, sélectionnez <strong className="text-white">Fusionner</strong> au lieu de Remplacer.
                  </p>
                  <p>
                    Si l'option de fusion n'apparaît pas immédiatement, maintenez la touche{' '}
                    <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded text-xs font-mono">Option</code>{' '}
                    enfoncée tout en déplaçant les fichiers vers la racine.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Final info */}
        <div className="bg-emerald-500/[0.06] border border-emerald-500/20 rounded-2xl p-5 md:p-6" data-testid="ready-info">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <HardDrive className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-2 text-emerald-400">
                Prêt pour l'installation
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Une fois tous les fichiers copiés sur votre carte SD, réinsérez-la dans votre Wii U.
                La prochaine étape sera l'installation du PayloadLoader via le navigateur Internet de la console.
              </p>
              <div className="bg-emerald-500/[0.06] rounded-xl p-3 border border-emerald-500/10">
                <p className="text-emerald-300/80 text-xs leading-relaxed flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  Si le PayloadLoader est déjà installé, vous pouvez aller directement à la{' '}
                  <a href="https://wiiu.hacks.guide/aroma/finalizing-setup.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline font-semibold">
                    Finalisation de la configuration
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-10 pb-6">
        <Link
          to="/guide/wiiu/outils"
          data-testid="prev-step-btn"
          className="flex items-center gap-2 px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white rounded-full font-bold transition-all text-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </Link>
      </div>
    </div>
  );
}
