import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrustSafetyCard } from './TrustSafetyCard';
import {
  X,
  Clock,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Flag,
} from 'lucide-react';

export const SwapDetailModal: React.FC = () => {
  const {
    selectedSwapDetail,
    setSelectedSwapDetail,
    setSelectedSmartMatchTarget,
    openChatWithNeighbor,
    reportListing,
  } = useApp();

  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSwapDetail(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedSwapDetail]);

  if (!selectedSwapDetail) return null;

  const isOffer = selectedSwapDetail.type === 'offer';
  const isUrgent = selectedSwapDetail.urgency === 'urgent';

  const handleReportListing = async () => {
    const reason = prompt('Please explain why you are reporting this listing:');
    if (reason && reason.trim()) {
      await reportListing(selectedSwapDetail.id, reason.trim());
      setReportSuccess(true);
      setTimeout(() => setReportSuccess(false), 3000);
    }
  };

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
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide ${
                isOffer
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              {isOffer ? <Sparkles className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
              {isOffer ? 'Skill Offer — Teaching / Sharing' : 'Skill Request — Seeking Assistance'}
            </span>

            {isUrgent && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-black uppercase tracking-wide border border-red-300">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>🚨 Urgent</span>
              </span>
            )}
          </div>

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
          {reportSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl text-center">
              Listing reported to safety moderators for review. Thank you for keeping the community safe.
            </div>
          )}

          <div>
            <h1 id="modal-swap-title" className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {selectedSwapDetail.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <Clock className="w-3.5 h-3.5" />
                🟢 Available {selectedSwapDetail.availability}
              </span>
              <span>•</span>
              <span>Preferred: {selectedSwapDetail.preferredTime}</span>
              <span>•</span>
              <span className="capitalize">Level: {selectedSwapDetail.skillLevel}</span>
              <span>•</span>
              <span className="capitalize">{selectedSwapDetail.mode} Exchange</span>
            </div>
          </div>

          {/* Barter Structure Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1.5">
              <span className="inline-block text-[11px] font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                What Member Provides
              </span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {selectedSwapDetail.offering}
              </p>
            </div>

            <div className="space-y-1.5 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
              <span className="inline-block text-[11px] font-black text-amber-900 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                What Member Seeks in Return
              </span>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {selectedSwapDetail.seeking}
              </p>
            </div>
          </div>

          {/* Detailed Context / Story */}
          <div>
            <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Exchange Overview & Description
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white p-3.5 rounded-xl border border-slate-100">
              {selectedSwapDetail.description}
            </p>
          </div>

          {/* Safety Tips Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs space-y-2">
            <h3 className="font-extrabold text-emerald-950 flex items-center gap-1.5 text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Safety Tips for Mutual Exchanges</span>
            </h3>
            <ul className="space-y-1.5 text-emerald-900">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Keep all initial messaging inside the platform.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Never share sensitive financial or personal identity info.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Use the digital <strong>SkillSwap Agreement Handshake</strong> before starting.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Award honest reviews and badges upon completion to build community trust.</span>
              </li>
            </ul>
          </div>

          {/* Reusable Trust & Safety Card */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Member Reputation & Trust Profile
            </h3>
            <TrustSafetyCard author={selectedSwapDetail.author} />
          </div>

          {/* Report Listing */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>Listing ID: {selectedSwapDetail.id}</span>
            <button
              onClick={handleReportListing}
              className="text-slate-500 hover:text-red-600 font-semibold flex items-center gap-1 transition"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report this listing</span>
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/90 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              const target = selectedSwapDetail;
              setSelectedSwapDetail(null);
              setSelectedSmartMatchTarget(target);
            }}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition"
          >
            <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            <span>Find Smart Matches (AI)</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSelectedSwapDetail(null)}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 rounded-lg transition"
            >
              Back
            </button>
            <button
              onClick={() => openChatWithNeighbor(selectedSwapDetail.author.id, selectedSwapDetail.id)}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-sm flex items-center gap-2 transition active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect & Coordinate Swap</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
