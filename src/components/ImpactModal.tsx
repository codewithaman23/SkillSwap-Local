import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Clock,
  DollarSign,
  Users,
  Star,
  Award,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';

export const ImpactModal: React.FC = () => {
  const { isImpactModalOpen, setIsImpactModalOpen, impactStats, reviews } = useApp();

  if (!isImpactModalOpen || !impactStats) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="impact-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-brand-800 via-emerald-700 to-teal-700 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-200 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Collective Mutual Aid Ledger</span>
            </div>
            <h2 id="impact-modal-title" className="text-xl sm:text-2xl font-black mt-1">
              Community Impact Dashboard
            </h2>
          </div>
          <button
            onClick={() => setIsImpactModalOpen(false)}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-brand-700 mx-auto mb-1" />
              <div className="text-xl font-black text-brand-950">
                {impactStats.communityMembers.toLocaleString()}
              </div>
              <div className="text-[11px] font-bold text-brand-700">Community Members</div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              <HeartHandshake className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
              <div className="text-xl font-black text-emerald-950">
                {impactStats.successfulSwaps.toLocaleString()}
              </div>
              <div className="text-[11px] font-bold text-emerald-700">Successful Swaps</div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-teal-700 mx-auto mb-1" />
              <div className="text-xl font-black text-teal-950">
                {impactStats.hoursExchanged.toLocaleString()} hrs
              </div>
              <div className="text-[11px] font-bold text-teal-700">Hours Exchanged</div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <DollarSign className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <div className="text-xl font-black text-amber-950">
                ₹8.4 Lakh
              </div>
              <div className="text-[11px] font-bold text-amber-700">Estimated Savings</div>
            </div>
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-lg font-black text-slate-900">{impactStats.skillsShared.toLocaleString()}</div>
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Skills Shared</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-lg font-black text-slate-900">{impactStats.communityConnections.toLocaleString()}</div>
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Connections Made</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-lg font-black text-emerald-600">{impactStats.communityResilienceScore}</div>
              <span className="text-slate-500 font-semibold text-[10px] uppercase">Resilience Score</span>
            </div>
          </div>

          {/* Core Mission Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-brand-600" />
              <span>"People exchange skills, not just money."</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When neighbors trade skills without cash transactions, household costs shrink, social isolation dissolves, and communities become self-reliant. Every hour of assistance is valued equally under our TimeBank system.
            </p>
          </div>

          {/* Top Exchanged Skill Categories */}
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span>Most Exchanged Skill Categories</span>
            </h3>
            <div className="space-y-2">
              {impactStats.topCategories.map((cat, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-800">{cat.name}</span>
                    <span className="text-emerald-700">{cat.percentage}% ({cat.count} swaps)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Endorsements Wall */}
          <div>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Verified Community Endorsements</span>
            </h3>

            <div className="space-y-2.5">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">
                      {rev.fromName} <span className="font-normal text-slate-400">swapped with</span> {rev.toName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {rev.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 italic">"{rev.comment}"</p>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Swap: {rev.swapTitle}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={() => setIsImpactModalOpen(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
