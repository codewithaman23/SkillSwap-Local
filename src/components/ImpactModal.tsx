import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
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
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-brand-700 to-emerald-600 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-100 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Hyperlocal Community Resilience Index</span>
            </div>
            <h2 id="impact-modal-title" className="text-xl sm:text-2xl font-black mt-1">
              Community Impact & TimeBank Ledger
            </h2>
          </div>
          <button
            onClick={() => setIsImpactModalOpen(false)}
            className="p-1.5 text-brand-100 hover:text-white hover:bg-brand-600/60 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-brand-700 mx-auto mb-1" />
              <div className="text-xl font-black text-brand-900">
                {impactStats.hoursExchanged} hrs
              </div>
              <div className="text-[11px] font-medium text-brand-700">Time Exchanged</div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <DollarSign className="w-5 h-5 text-amber-700 mx-auto mb-1" />
              <div className="text-xl font-black text-amber-900">
                ${impactStats.moneySavedEstimateUSD.toLocaleString()}
              </div>
              <div className="text-[11px] font-medium text-amber-700">Money Saved</div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-teal-700 mx-auto mb-1" />
              <div className="text-xl font-black text-teal-900">
                {impactStats.neighborsConnected}
              </div>
              <div className="text-[11px] font-medium text-teal-700">Connections</div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-center">
              <ShieldCheck className="w-5 h-5 text-indigo-700 mx-auto mb-1" />
              <div className="text-xl font-black text-indigo-900">
                {impactStats.communityResilienceScore}
              </div>
              <div className="text-[11px] font-medium text-indigo-700">Trust Score</div>
            </div>
          </div>

          {/* Social Value Statement */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-brand-600" />
              <span>How Hyperlocal Swapping Solves Critical Problems</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In an era of rising inflation and high loneliness rates, commercial services charge steep rates for small domestic tasks. SkillSwap Local revives the traditional barter system: seniors share life wisdom and cooking in exchange for tech support; students trade tutoring for bike repairs. No cash transactions, no financial barriers—just mutual community aid.
            </p>
          </div>

          {/* Top Swapped Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
              <span>Most In-Demand Neighborhood Exchanges</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800 block">Languages</span>
                <span className="text-[11px] text-emerald-600 font-medium">32% of swaps</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800 block">Home & Repairs</span>
                <span className="text-[11px] text-amber-600 font-medium">28% of swaps</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800 block">Digital Literacy</span>
                <span className="text-[11px] text-blue-600 font-medium">22% of swaps</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-800 block">Gardening & Food</span>
                <span className="text-[11px] text-green-600 font-medium">18% of swaps</span>
              </div>
            </div>
          </div>

          {/* Recent Neighbor Reviews & Trust Endorsements */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Recent Verified Neighbor Endorsements</span>
            </h3>

            <div className="space-y-2.5">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">
                      {rev.fromName} <span className="font-normal text-slate-400">swapped with</span> {rev.toName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      {rev.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 italic">"{rev.comment}"</p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
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

