import React from 'react';
import { Swap } from '../types';
import { useApp } from '../context/AppContext';
import {
  ArrowRightLeft,
  Star,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Clock,
  AlertTriangle,
  Zap,
  CheckCircle2,
} from 'lucide-react';

interface SwapCardProps {
  swap: Swap;
}

export const SwapCard: React.FC<SwapCardProps> = ({ swap }) => {
  const { setSelectedSwapDetail, setSelectedSmartMatchTarget, openChatWithNeighbor, a11y } = useApp();

  const isOffer = swap.type === 'offer';
  const isUrgent = swap.urgency === 'urgent';

  const getAvailabilityLabel = () => {
    switch (swap.availability) {
      case 'now':
        return 'Available Now';
      case 'today':
        return 'Available Today';
      case 'this-week':
        return 'Available This Week';
      default:
        return 'Flexible';
    }
  };

  return (
    <article
      className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group focus-within:ring-2 focus-within:ring-brand-500 ${
        isUrgent
          ? 'border-red-300 shadow-md ring-1 ring-red-400/20'
          : 'border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300'
      }`}
      aria-labelledby={`swap-title-${swap.id}`}
    >
      <div className="p-5">
        {/* Header: Type, Urgent Badge, Availability & Skill Level */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black tracking-wide uppercase ${
                isOffer
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/70'
                  : 'bg-amber-100 text-amber-900 border border-amber-300/70'
              }`}
            >
              {isOffer ? (
                <>
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Skill Offer</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-3 h-3 text-amber-600" />
                  <span>Skill Request</span>
                </>
              )}
            </span>

            {isUrgent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-black uppercase tracking-wider border border-red-300 animate-pulse">
                <AlertTriangle className="w-3 h-3 text-red-600" />
                <span>🚨 Urgent</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize">
              {swap.skillLevel}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          id={`swap-title-${swap.id}`}
          onClick={() => setSelectedSwapDetail(swap)}
          className="text-base sm:text-lg font-black text-slate-900 group-hover:text-brand-700 cursor-pointer transition line-clamp-2 leading-snug"
        >
          {swap.title}
        </h2>

        {/* Barter Exchange Details */}
        <div className="mt-4 space-y-2 bg-slate-50/90 rounded-xl p-3 border border-slate-100">
          <div className="flex items-start gap-2">
            <span className="shrink-0 px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-extrabold uppercase tracking-wider">
              Provides
            </span>
            <p className="text-xs text-slate-800 font-semibold line-clamp-2 leading-relaxed">
              {swap.offering}
            </p>
          </div>

          <div className="flex items-center justify-center my-0.5" aria-hidden="true">
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400 rotate-90 sm:rotate-0" />
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 px-2 py-0.5 bg-amber-600 text-white rounded text-[10px] font-extrabold uppercase tracking-wider">
              Receives
            </span>
            <p className="text-xs text-slate-800 font-semibold line-clamp-2 leading-relaxed">
              {swap.seeking}
            </p>
          </div>
        </div>

        {/* Availability & Preferred Time */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <Clock className="w-3.5 h-3.5" />
            <span>🟢 {getAvailabilityLabel()}</span>
          </span>
          <span className="text-[11px] font-medium text-slate-500 truncate max-w-[150px]">
            {swap.preferredTime}
          </span>
        </div>
      </div>

      {/* Footer: User Reputation Summary & Actions */}
      <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Author Avatar & Trust */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden ring-1 ring-slate-200">
            {!a11y.lowBandwidth ? (
              <img src={swap.author.avatar} alt="" className="w-full h-full object-cover" />
            ) : null}
            <span className={a11y.lowBandwidth ? 'block' : 'hidden'}>
              {swap.author.name.substring(0, 2).toUpperCase()}
            </span>
          </div>

          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
              <span>{swap.author.name}</span>
              {swap.author.verifiedMember && (
                <span title="Verified Member">
                  <CheckCircle2 className="w-3 h-3 text-brand-600" />
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span className="flex items-center text-amber-600 font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                {swap.author.rating}
              </span>
              <span>•</span>
              <span>{swap.author.swapsCompleted} swaps</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setSelectedSmartMatchTarget(swap)}
            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1 transition"
            title="Calculate complementary skill matches for this exchange"
          >
            <Zap className="w-3 h-3 text-emerald-600 fill-current" />
            <span className="hidden sm:inline">Matches</span>
          </button>

          <button
            onClick={() => setSelectedSwapDetail(swap)}
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition"
            aria-label={`View details for ${swap.title}`}
          >
            Details
          </button>

          <button
            onClick={() => openChatWithNeighbor(swap.author.id, swap.id)}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition active:scale-95"
            aria-label={`Chat with ${swap.author.name} about skill swap`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </article>
  );
};
