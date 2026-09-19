import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Sparkles,
  Clock,
  DollarSign,
  Users,
  HeartHandshake,
  AlertTriangle,
  Award,
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { filters, setFilters, impactStats, setIsCreateModalOpen, setIsImpactModalOpen } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 border-b border-slate-200 py-8 sm:py-12">
      <div
        className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Mission Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold mb-3 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-700" />
            <span>Core Community Principle:</span>
            <span className="text-brand-700 font-extrabold underline underline-offset-2">
              "People exchange skills, not just money."
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Exchange skills & services. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-emerald-600 to-teal-600">
              Build mutual community resilience.
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Trade what you know for what you need—like <em>"I'll teach you Spanish for help fixing my bike"</em> or <em>"Python programming for graphic design"</em>. Zero financial barriers, zero GPS tracking, 100% mutual aid.
          </p>

          {/* Global Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills, services, users (e.g. Bicycle Repair, Python, Spanish, Mateo)..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 shadow-sm"
                aria-label="Global search for skills, services, users"
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
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>+ Post a Swap</span>
              </button>
            </div>
          </div>

          {/* Type Filter Pills & Urgent Toggle */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-bold">Browse:</span>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'all' }))}
              className={`px-3 py-1 rounded-full font-bold transition ${
                filters.type === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'offer' }))}
              className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 transition ${
                filters.type === 'offer'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Offers (Teaching / Giving)
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, type: 'request' }))}
              className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 transition ${
                filters.type === 'request'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Requests (Seeking Help)
            </button>

            {/* 🚨 Urgent Toggle Button */}
            <button
              onClick={() => setFilters((prev) => ({ ...prev, urgentOnly: !prev.urgentOnly }))}
              className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 transition border ${
                filters.urgentOnly
                  ? 'bg-red-600 text-white border-red-700 ring-2 ring-red-500/20'
                  : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>🚨 Urgent Only</span>
            </button>
          </div>
        </div>

        {/* Community Resilience Stats Ticker */}
        {impactStats && (
          <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/90 backdrop-blur rounded-xl p-3 border border-slate-200 hover:border-brand-400 transition cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <Users className="w-4 h-4 text-brand-600" />
                <span>Community Members</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand-600 transition">
                {impactStats.communityMembers.toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">{impactStats.successfulSwaps.toLocaleString()} successful swaps</div>
            </div>

            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/90 backdrop-blur rounded-xl p-3 border border-slate-200 hover:border-brand-400 transition cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Hours Exchanged</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-teal-600 transition">
                {impactStats.hoursExchanged.toLocaleString()} hrs
              </div>
              <div className="text-[11px] text-teal-600 font-semibold">1 hour = +1 TimeBank Hour</div>
            </div>

            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/90 backdrop-blur rounded-xl p-3 border border-slate-200 hover:border-brand-400 transition cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <DollarSign className="w-4 h-4 text-amber-600" />
                <span>Estimated Savings</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-600 transition">
                ₹8.4 Lakh
              </div>
              <div className="text-[11px] text-amber-600 font-semibold">Avoided gig-service fees</div>
            </div>

            <div
              onClick={() => setIsImpactModalOpen(true)}
              className="bg-white/90 backdrop-blur rounded-xl p-3 border border-slate-200 hover:border-brand-400 transition cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Positive Reviews</span>
              </div>
              <div className="mt-1 text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition">
                {impactStats.positiveReviewsPercentage}%
              </div>
              <div className="text-[11px] text-indigo-600 font-semibold">Resilience score {impactStats.communityResilienceScore}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
