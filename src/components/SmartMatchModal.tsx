import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SmartMatch } from '../types';
import {
  X,
  Sparkles,
  Star,
  CheckCircle2,
  MessageSquare,
  Zap,
} from 'lucide-react';

export const SmartMatchModal: React.FC = () => {
  const { selectedSmartMatchTarget, setSelectedSmartMatchTarget, openChatWithNeighbor, a11y } = useApp();
  const [matches, setMatches] = useState<SmartMatch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedSmartMatchTarget) {
      setMatches([]);
      return;
    }

    const fetchMatches = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/smart-match/${selectedSmartMatchTarget.id}`);
        if (res.ok) {
          const data = await res.json();
          setMatches(data);
        }
      } catch (err) {
        console.error('Failed to fetch smart matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedSmartMatchTarget]);

  if (!selectedSmartMatchTarget) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="smart-match-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-brand-700 via-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-100 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Smart Skill Matching Engine</span>
            </div>
            <h2 id="smart-match-title" className="text-lg sm:text-xl font-black mt-1">
              Top Complementary Skill Matches
            </h2>
          </div>
          <button
            onClick={() => setSelectedSmartMatchTarget(null)}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Request Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 text-xs">
          <span className="text-slate-500 font-semibold uppercase tracking-wider block text-[10px]">
            Target {selectedSmartMatchTarget.type === 'request' ? 'Request' : 'Offer'}:
          </span>
          <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">
            {selectedSmartMatchTarget.title}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
            <span>Category: {selectedSmartMatchTarget.category}</span>
            <span>•</span>
            <span>Availability: {selectedSmartMatchTarget.availability}</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Matching based on skills & availability (zero GPS)</span>
          </div>
        </div>

        {/* Matches Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {loading && (
            <div className="py-12 text-center space-y-2">
              <div className="inline-block w-7 h-7 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium text-slate-500">
                Finding your best skill matches using skill compatibility...
              </p>
            </div>
          )}

          {!loading && matches.length === 0 && (
            <div className="py-10 text-center text-xs text-slate-500">
              No direct matches found yet. Try expanding your search terms or posting an open exchange request!
            </div>
          )}

          {!loading && matches.map((item, idx) => {
            const isTopMatch = idx === 0;
            return (
              <div
                key={item.swap.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isTopMatch
                    ? 'bg-gradient-to-b from-brand-50/60 to-white border-brand-300 shadow-md ring-2 ring-brand-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Match percentage pill & headline */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs sm:text-sm flex items-center gap-1 shadow-xs">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{item.matchPercentage}% Match</span>
                    </span>
                    {isTopMatch && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                        ★ Recommended Match
                      </span>
                    )}
                  </div>

                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-green-50 text-green-800 border border-green-200">
                    🟢 Available {item.swap.availability === 'now' ? 'Now' : item.swap.availability === 'today' ? 'Today' : 'This Week'}
                  </span>
                </div>

                {/* Candidate Author Profile & Listing */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center text-sm shrink-0 overflow-hidden ring-2 ring-brand-500/20">
                      {!a11y.lowBandwidth ? (
                        <img src={item.swap.author.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span>{item.swap.author.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                        <span>{item.swap.author.name}</span>
                        {item.swap.author.verifiedMember && (
                          <span title="Verified Member">
                            <CheckCircle2 className="w-4 h-4 text-brand-600" />
                          </span>
                        )}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                          {item.swap.author.rating}
                        </span>
                        <span>•</span>
                        <span>{item.swap.author.swapsCompleted} Swaps Completed</span>
                        <span>•</span>
                        <span>{item.swap.author.hoursExchanged} Hours Exchanged</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedSmartMatchTarget(null);
                      openChatWithNeighbor(item.swap.author.id, item.swap.id);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                </div>

                {/* Offered Skill */}
                <div className="mt-3 bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-emerald-800 shrink-0">Offers:</span>
                    <span className="text-slate-800 font-medium">{item.swap.offering}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <span className="font-bold text-amber-800 shrink-0">Seeking:</span>
                    <span className="text-slate-800 font-medium">{item.swap.seeking}</span>
                  </div>
                </div>

                {/* Algorithmic Match Reasons */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-500">Why this match:</span>
                  {item.reasons.map((r, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      ✓ {r}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Smart Matching uses skill compatibility, availability, and rating.</span>
          <button
            onClick={() => setSelectedSmartMatchTarget(null)}
            className="font-bold text-slate-700 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
