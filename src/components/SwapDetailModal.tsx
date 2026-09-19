import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  Star,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Building,
  CheckCircle2,
} from 'lucide-react';

export const SwapDetailModal: React.FC = () => {
  const { selectedSwapDetail, setSelectedSwapDetail, openChatWithNeighbor, a11y } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSwapDetail(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedSwapDetail]);

  if (!selectedSwapDetail) return null;

  const isOffer = selectedSwapDetail.type === 'offer';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-swap-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Top bar with close */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/70">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              isOffer
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}
          >
            {isOffer ? <Sparkles className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
            {isOffer ? 'Skill Offer — Teaching / Sharing' : 'Skill Request — Seeking Assistance'}
          </span>

          <button
            onClick={() => setSelectedSwapDetail(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div>
            <h1 id="modal-swap-title" className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {selectedSwapDetail.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                {selectedSwapDetail.author.neighborhood}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Timing: {selectedSwapDetail.urgency}
              </span>
              <span>•</span>
              <span className="capitalize">{selectedSwapDetail.mode} Exchange</span>
            </div>
          </div>

          {/* Barter Structure Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1.5">
              <span className="inline-block text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                What Neighbor Gives
              </span>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {selectedSwapDetail.offering}
              </p>
            </div>

            <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
              <span className="inline-block text-[11px] font-bold text-amber-900 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                What Neighbor Wants in Return
              </span>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {selectedSwapDetail.seeking}
              </p>
            </div>
          </div>

          {/* Detailed Story / Context */}
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              About This Exchange
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-3.5 rounded-xl border border-slate-100">
              {selectedSwapDetail.description}
            </p>
          </div>

          {/* Safe Meetup Spot Recommendation */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3 text-xs">
            <Building className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900">Preferred Safe Meetup Location:</span>
              <p className="text-emerald-800 mt-0.5">
                {selectedSwapDetail.preferredMeeting}
              </p>
              <p className="text-[11px] text-emerald-700 mt-1">
                Tip: SkillSwap recommends daytime meetups at staff-monitored public spots (library, community center, or neighborhood cafe).
              </p>
            </div>
          </div>

          {/* Author Trust & Reputation Profile */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-sm overflow-hidden ring-2 ring-brand-500/20">
                {!a11y.lowBandwidth ? (
                  <img
                    src={selectedSwapDetail.author.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{selectedSwapDetail.author.name.substring(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{selectedSwapDetail.author.name}</span>
                  <span title="Community Verified Neighbor">
                    <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span className="flex items-center text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                    {selectedSwapDetail.author.rating} / 5.0
                  </span>
                  <span>•</span>
                  <span>{selectedSwapDetail.author.swapsCompleted} verified swaps</span>
                </div>
                {/* Badges */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {selectedSwapDetail.author.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[10px] font-medium"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 max-w-xs sm:text-right">
              <span className="font-semibold text-slate-700 block">Privacy Guarantee</span>
              No home address or phone number shared.
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/90 flex items-center justify-end gap-3">
          <button
            onClick={() => setSelectedSwapDetail(null)}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition"
          >
            Back to Listings
          </button>
          <button
            onClick={() => openChatWithNeighbor(selectedSwapDetail.author.id, selectedSwapDetail.id)}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 transition active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect & Coordinate Swap</span>
          </button>
        </div>
      </div>
    </div>
  );
};

