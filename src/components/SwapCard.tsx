import React from 'react';
import { Swap } from '../types';
import { useApp } from '../context/AppContext';
import {
  ArrowRightLeft,
  MapPin,
  Star,
  Sparkles,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

interface SwapCardProps {
  swap: Swap;
}

export const SwapCard: React.FC<SwapCardProps> = ({ swap }) => {
  const { setSelectedSwapDetail, openChatWithNeighbor, a11y } = useApp();

  const isOffer = swap.type === 'offer';

  const urgencyLabels: Record<string, { label: string; style: string }> = {
    flexible: { label: 'Flexible timing', style: 'bg-slate-100 text-slate-700' },
    'this-week': { label: 'This week', style: 'bg-blue-50 text-blue-700 border border-blue-200' },
    'this-weekend': { label: 'This weekend', style: 'bg-indigo-50 text-indigo-700 border border-indigo-200' },
    urgent: { label: 'Urgent need', style: 'bg-red-50 text-red-700 border border-red-200 font-semibold' },
  };

  const urgencyInfo = urgencyLabels[swap.urgency] || urgencyLabels.flexible;

  return (
    <article
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group focus-within:ring-2 focus-within:ring-brand-500"
      aria-labelledby={`swap-title-${swap.id}`}
    >
      <div className="p-5">
        {/* Header: Type Tag, Urgency & Category */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
              isOffer
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/60'
                : 'bg-amber-100 text-amber-900 border border-amber-300/60'
            }`}
          >
            {isOffer ? (
              <>
                <Sparkles className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                <span>Skill Offer</span>
              </>
            ) : (
              <>
                <HelpCircle className="w-3 h-3 text-amber-600" aria-hidden="true" />
                <span>Skill Request</span>
              </>
            )}
          </span>

          <div className="flex items-center gap-1.5 text-xs">
            <span className={`px-2 py-0.5 rounded-md text-[11px] ${urgencyInfo.style}`}>
              {urgencyInfo.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          id={`swap-title-${swap.id}`}
          onClick={() => setSelectedSwapDetail(swap)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-700 cursor-pointer transition line-clamp-2"
        >
          {swap.title}
        </h2>

        {/* The Barter Trade Terms: Offering vs Seeking */}
        <div className="mt-4 space-y-2 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
          <div className="flex items-start gap-2">
            <span className="shrink-0 px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
              Gives
            </span>
            <p className="text-xs text-slate-800 font-medium line-clamp-2 leading-relaxed">
              {swap.offering}
            </p>
          </div>

          <div className="flex items-center justify-center my-0.5" aria-hidden="true">
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400 rotate-90 sm:rotate-0" />
          </div>

          <div className="flex items-start gap-2">
            <span className="shrink-0 px-2 py-0.5 bg-amber-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
              Seeks
            </span>
            <p className="text-xs text-slate-800 font-medium line-clamp-2 leading-relaxed">
              {swap.seeking}
            </p>
          </div>
        </div>

        {/* Neighborhood Location & Safe Spot */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
          <span className="truncate">{swap.author.neighborhood}</span>
        </div>
      </div>

      {/* Footer: Neighbor Profile & Actions */}
      <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Author Details with Privacy-First presentation */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar (with text fallback for Low-Bandwidth mode) */}
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden ring-1 ring-slate-200">
            {!a11y.lowBandwidth ? (
              <img
                src={swap.author.avatar}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : null}
            <span className={a11y.lowBandwidth ? 'block' : 'hidden'}>
              {swap.author.name.substring(0, 2).toUpperCase()}
            </span>
          </div>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-900 truncate">
              {swap.author.name}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span className="flex items-center text-amber-600 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                {swap.author.rating}
              </span>
              <span>•</span>
              <span>{swap.author.swapsCompleted} swaps</span>
            </div>
          </div>
        </div>

        {/* Connect Action */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setSelectedSwapDetail(swap)}
            className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition"
            aria-label={`View details for ${swap.title}`}
          >
            Details
          </button>
          <button
            onClick={() => openChatWithNeighbor(swap.author.id, swap.id)}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition active:scale-95"
            aria-label={`Chat with ${swap.author.name} about skill swap`}
          >
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </article>
  );
};

