import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Sparkles, Clock, DollarSign, Users, HeartHandshake, ShieldCheck } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { filters, setFilters, impactStats, setIsCreateModalOpen, setIsImpactModalOpen } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-slate-50 border-b border-slate-200 py-8 sm:py-12">
      {/* Decorative background blur circle */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-semibold mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Hyperlocal Mutual Aid & Skill Barter</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-emerald-700 font-normal">Zero Cash Required</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Exchange skills with neighbors. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-600">
              Build real community resilience.
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Trade what you know for what you need—like <em>"I'll teach you Spanish for help fixing my bike"</em> or <em>"Gardening help for resume review"</em>. Reduce task costs, combat social isolation, and uplift underserved neighborhoods with privacy by design.
          </p>

          {/* Quick Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search skills (e.g. guitar, bike repair, Spanish, sourdough, plumbing)..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                aria-label="Search skills and services"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Post Your Skill</span>
              </button>
            </div>
          </div>

          {/* Type Filter Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Browse:</span>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'all' }))}
              className={`px-3 py-1 rounded-full font-medium transition ${
                filters.type === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'offer' }))}
              className={`px-3 py-1 rounded-full font-medium flex items-center gap-1 transition ${
                filters.type === 'offer'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Offers (Neighbors Teaching/Giving)
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'request' }))}
              className={`px-3 py-1 rounded-full font-medium flex items-center gap-1 transition ${
                filters.type === 'request'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Requests (Neighbors Seeking Help)
            </button>
          </div>
        </div>

        {/* Community Resilience Stats Ticker */}
        {impactStats && (
          <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/80 backdrop-blur rounded-xl p-3 border border-slate-200/70 hover:border-brand-300 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Clock className="w-4 h-4 text-brand-600" aria-hidden="true" />
                <span>Exchanged Hours</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition">
                {impactStats.hoursExchanged.toLocaleString()} hrs
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">Community mutual time</div>
            </div>

            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/80 backdrop-blur rounded-xl p-3 border border-slate-200/70 hover:border-brand-300 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <DollarSign className="w-4 h-4 text-amber-600" aria-hidden="true" />
                <span>Household Cost Saved</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition">
                ${impactStats.moneySavedEstimateUSD.toLocaleString()}
              </div>
              <div className="text-[11px] text-amber-600 font-medium">Small task expenses avoided</div>
            </div>

            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/80 backdrop-blur rounded-xl p-3 border border-slate-200/70 hover:border-brand-300 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <Users className="w-4 h-4 text-teal-600" aria-hidden="true" />
                <span>Neighbors Connected</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition">
                {impactStats.neighborsConnected.toLocaleString()}
              </div>
              <div className="text-[11px] text-teal-600 font-medium">Combatting isolation</div>
            </div>

            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/80 backdrop-blur rounded-xl p-3 border border-slate-200/70 hover:border-brand-300 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                <span>Resilience Score</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition">
                {impactStats.communityResilienceScore}
              </div>
              <div className="text-[11px] text-indigo-600 font-medium">High trust neighborhood</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

