import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, AlertTriangle, Wrench, HardDrive } from 'lucide-react';

const steps = [
  {
    id: 1,
    label: 'Informations',
    shortLabel: 'Info',
    path: '/guide/wiiu/info',
    icon: AlertTriangle,
  },
  {
    id: 2,
    label: 'Outils nécessaires',
    shortLabel: 'Outils',
    path: '/guide/wiiu/outils',
    icon: Wrench,
  },
  {
    id: 3,
    label: 'Préparation SD',
    shortLabel: 'SD',
    path: '/guide/wiiu/preparation',
    icon: HardDrive,
  },
];

export default function StepIndicator() {
  const location = useLocation();

  const currentIndex = steps.findIndex((s) => s.path === location.pathname);
  const activeStep = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div data-testid="step-indicator" className="w-full max-w-3xl mx-auto px-4 pt-8 pb-4">
      <div className="relative flex items-center justify-between">
        {/* Progress line background */}
        <div className="absolute top-5 left-[10%] right-[10%] h-[2px] bg-white/[0.06] rounded-full" />

        {/* Active progress line */}
        <div
          className="absolute top-5 left-[10%] h-[2px] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${activeStep === 0 ? 0 : (activeStep / (steps.length - 1)) * 80}%`,
          }}
        />

        {steps.map((step, i) => {
          const isCompleted = i < activeStep;
          const isCurrent = i === activeStep;
          const isFuture = i > activeStep;
          const Icon = step.icon;

          return (
            <Link
              key={step.id}
              to={step.path}
              data-testid={`step-${step.id}`}
              className={`relative z-10 flex flex-col items-center gap-2.5 group transition-all ${
                isFuture ? 'pointer-events-none' : ''
              }`}
            >
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                  isCompleted
                    ? 'bg-blue-600 border-blue-600 shadow-[0_0_16px_rgba(37,99,235,0.4)]'
                    : isCurrent
                    ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'bg-white/[0.03] border-white/10'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4.5 h-4.5 text-white" strokeWidth={3} />
                ) : (
                  <Icon
                    className={`w-4 h-4 ${
                      isCurrent ? 'text-blue-400' : 'text-slate-600'
                    }`}
                    strokeWidth={2}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] font-bold tracking-wide uppercase transition-colors hidden sm:block ${
                  isCompleted
                    ? 'text-blue-400'
                    : isCurrent
                    ? 'text-white'
                    : 'text-slate-600'
                }`}
              >
                {step.label}
              </span>
              <span
                className={`text-[11px] font-bold tracking-wide uppercase transition-colors sm:hidden ${
                  isCompleted
                    ? 'text-blue-400'
                    : isCurrent
                    ? 'text-white'
                    : 'text-slate-600'
                }`}
              >
                {step.shortLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export { steps };
