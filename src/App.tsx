import React from 'react';
import { useApp } from './context/AppContext';
import { AccessibilityBar } from './components/AccessibilityBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { SwapCard } from './components/SwapCard';
import { SwapDetailModal } from './components/SwapDetailModal';
import { CreateSwapModal } from './components/CreateSwapModal';
import { ChatDrawer } from './components/ChatDrawer';
import { ImpactModal } from './components/ImpactModal';
import { PrivacyModal } from './components/PrivacyModal';
import {
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Users,
  RotateCcw,
} from 'lucide-react';

export const App: React.FC = () => {
  const {
    swaps,
    isLoading,
    error,
    resetFilters,
    setIsCreateModalOpen,
    setIsImpactModalOpen,
    setIsPrivacyModalOpen,
    a11y,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors">
      {/* Keyboard Accessibility Skip Link */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Top Accessibility & Low Bandwidth Controls Bar */}
      <AccessibilityBar />

      {/* Main Navbar */}
      <Navbar />

      {/* Hero with Search and Mission Statement */}
      <HeroBanner />

      {/* Category & Timeframe Filter Toolbar */}
      <FilterBar />

      {/* Main Feed Content */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Notification */}
        {error && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs sm:text-sm"
          >
            <span>{error}</span>
            <button
              onClick={() => window.location.reload()}
              className="font-bold underline ml-2"
            >
              Retry
            </button>
          </div>
        )}

        {/* Low-Bandwidth Mode Active Banner */}
        {a11y.lowBandwidth && (
          <div
            role="status"
            className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2 text-xs"
          >
            <Zap className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
            <span>
              <strong>Low-Bandwidth Mode Active:</strong> Heavy images, transitions, and decorative effects have been disabled to conserve mobile data and battery.
            </span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center space-y-3" aria-live="polite">
            <div className="inline-block w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading neighborhood skill swaps...</p>
          </div>
        )}

        {/* Swaps Grid */}
        {!isLoading && swaps.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="region"
            aria-label="Neighborhood skill listings"
          >
            {swaps.map((swap) => (
              <SwapCard key={swap.id} swap={swap} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && swaps.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-inner">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No skill swaps found</h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We couldn't find any swaps matching your current filters. Try changing categories, resetting your search, or be the first neighbor to post!
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Post a Skill Swap</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                SS
              </div>
              <span className="text-sm font-bold text-slate-900">
                SkillSwap <span className="text-brand-600">Local</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-500">
                Hyperlocal Mutual Aid & Skill Exchange Platform
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-slate-900 transition flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>Privacy by Design</span>
              </button>
              <button
                onClick={() => setIsImpactModalOpen(true)}
                className="hover:text-slate-900 transition flex items-center gap-1"
              >
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Community Resilience Impact</span>
              </button>
              <span className="text-slate-400">
                Built for Hackathon Submission
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals and Side Drawers */}
      <SwapDetailModal />
      <CreateSwapModal />
      <ChatDrawer />
      <ImpactModal />
      <PrivacyModal />
    </div>
  );
};

