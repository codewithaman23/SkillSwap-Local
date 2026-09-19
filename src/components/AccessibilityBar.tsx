import React from 'react';
import { useApp } from '../context/AppContext';
import { Eye, Type, Zap, BookOpen, RotateCcw, ShieldCheck } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const {
    a11y,
    toggleHighContrast,
    setFontSize,
    toggleLowBandwidth,
    toggleDyslexicFont,
    resetA11y,
    setIsPrivacyModalOpen,
  } = useApp();

  return (
    <aside
      role="region"
      aria-label="Accessibility and low-bandwidth controls"
      className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 border-b border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: A11y and Low Bandwidth Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          <span className="font-semibold text-slate-400 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-brand-400" aria-hidden="true" />
            <span className="hidden sm:inline">Accessibility & Low-Bandwidth:</span>
            <span className="sm:hidden">A11y:</span>
          </span>

          {/* Text Size Controls */}
          <div className="flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700" role="group" aria-label="Text size options">
            <Type className="w-3 h-3 text-slate-400 mr-1" aria-hidden="true" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 rounded font-medium transition ${
                a11y.fontSize === 'normal'
                  ? 'bg-brand-600 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Standard text size"
              aria-pressed={a11y.fontSize === 'normal'}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 rounded font-medium transition ${
                a11y.fontSize === 'large'
                  ? 'bg-brand-600 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Large text size"
              aria-pressed={a11y.fontSize === 'large'}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-1.5 py-0.5 rounded font-medium transition ${
                a11y.fontSize === 'xlarge'
                  ? 'bg-brand-600 text-white font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Extra large text size"
              aria-pressed={a11y.fontSize === 'xlarge'}
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition font-medium border ${
              a11y.highContrast
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            aria-pressed={a11y.highContrast}
          >
            <span className="w-2 h-2 rounded-full bg-current" aria-hidden="true" />
            High Contrast
          </button>

          {/* Low Bandwidth Mode Toggle */}
          <button
            onClick={toggleLowBandwidth}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition font-medium border ${
              a11y.lowBandwidth
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Optimizes site for spotty 2G/3G connections by hiding heavy images and animations"
            aria-pressed={a11y.lowBandwidth}
          >
            <Zap className="w-3 h-3 text-current" aria-hidden="true" />
            Low-Bandwidth (2G/3G)
          </button>

          {/* Dyslexia Friendly Toggle */}
          <button
            onClick={toggleDyslexicFont}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition font-medium border ${
              a11y.dyslexicFont
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            aria-pressed={a11y.dyslexicFont}
          >
            <BookOpen className="w-3 h-3 text-current" aria-hidden="true" />
            Dyslexia Font
          </button>

          {/* Reset */}
          {(a11y.highContrast || a11y.fontSize !== 'normal' || a11y.lowBandwidth || a11y.dyslexicFont) && (
            <button
              onClick={resetA11y}
              className="text-slate-400 hover:text-white flex items-center gap-0.5 ml-1"
              title="Reset accessibility options"
            >
              <RotateCcw className="w-3 h-3" aria-hidden="true" />
              Reset
            </button>
          )}
        </div>

        {/* Right: Privacy & Security Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="text-slate-400 hover:text-brand-300 flex items-center gap-1 underline underline-offset-2 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-400" aria-hidden="true" />
            Privacy-First Architecture (Zero Trackers)
          </button>
        </div>
      </div>
    </aside>
  );
};

