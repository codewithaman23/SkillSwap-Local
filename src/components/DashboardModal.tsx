import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TimeBankTransaction } from '../types';
import {
  X,
  Clock,
  Star,
  DollarSign,
  Award,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  Layers,
} from 'lucide-react';

export const DashboardModal: React.FC = () => {
  const { isDashboardOpen, setIsDashboardOpen, currentUser } = useApp();
  const [transactions, setTransactions] = useState<TimeBankTransaction[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'timebank' | 'timeline'>('overview');

  useEffect(() => {
    if (isDashboardOpen) {
      fetch('/api/timebank/transactions')
        .then(res => res.json())
        .then(data => setTransactions(data))
        .catch(err => console.error(err));
    }
  }, [isDashboardOpen]);

  if (!isDashboardOpen || !currentUser) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-brand-800 via-emerald-700 to-teal-700 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-200 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Personal Member Center</span>
            </div>
            <h2 id="dashboard-title" className="text-xl sm:text-2xl font-black mt-1">
              Your SkillSwap Dashboard
            </h2>
          </div>
          <button
            onClick={() => setIsDashboardOpen(false)}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Close dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Statistics & Impact
          </button>
          <button
            onClick={() => setActiveTab('timebank')}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'timebank'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>TimeBank Ledger ({currentUser.karmaHours}h)</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'timeline'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Activity Timeline
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <>
              {/* Core Statistics Cards */}
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Your SkillSwap Statistics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center justify-between text-emerald-700 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Balance</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-950">{currentUser.karmaHours} Hours</div>
                    <div className="text-[11px] font-semibold text-emerald-700 mt-0.5">TimeBank Balance</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="flex items-center justify-between text-blue-700 mb-1">
                      <Award className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Swaps</span>
                    </div>
                    <div className="text-2xl font-black text-blue-950">{currentUser.swapsCompleted}</div>
                    <div className="text-[11px] font-semibold text-blue-700 mt-0.5">Swaps Completed</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="flex items-center justify-between text-amber-700 mb-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span className="text-[10px] font-bold uppercase">Rating</span>
                    </div>
                    <div className="text-2xl font-black text-amber-950">{currentUser.rating} ⭐</div>
                    <div className="text-[11px] font-semibold text-amber-700 mt-0.5">Community Rating</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200">
                    <div className="flex items-center justify-between text-teal-700 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase">Saved</span>
                    </div>
                    <div className="text-2xl font-black text-teal-950">₹{currentUser.estimatedMoneySavedINR.toLocaleString()}</div>
                    <div className="text-[11px] font-semibold text-teal-700 mt-0.5">Estimated Money Saved</div>
                  </div>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-xs font-semibold text-slate-500">Skills Offered</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentUser.skillsOfferedCount} Skills</div>
                  <span className="text-[10px] text-emerald-600 font-medium">Bicycle, Spanish, Cooking...</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-xs font-semibold text-slate-500">Skills Learned</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentUser.skillsLearnedCount} Skills</div>
                  <span className="text-[10px] text-blue-600 font-medium">Python, Guitar, Gardening...</span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-xs font-semibold text-slate-500">Total Hours Exchanged</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">{currentUser.hoursExchanged} Hours</div>
                  <span className="text-[10px] text-indigo-600 font-medium">Mutual non-monetary aid</span>
                </div>
              </div>

              {/* TimeBank Rule Banner */}
              <div className="bg-brand-50/70 border border-brand-200 rounded-xl p-4 flex items-start gap-3 text-xs">
                <Sparkles className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-brand-900 text-sm">How TimeBank Karma Works</h4>
                  <p className="text-brand-800 mt-0.5 leading-relaxed">
                    <strong>1 hour of help = +1 TimeBank Hour.</strong> You earn TimeBank hours by helping fellow community members. You can redeem these hours whenever you need help with repairs, tutoring, or creative projects. Everyone's hour is valued equally.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeTab === 'timebank' && (
            <div className="space-y-4">
              {/* Balance Card */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 rounded-2xl flex items-center justify-between shadow-md">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-100">
                    Available TimeBank Balance
                  </span>
                  <div className="text-3xl sm:text-4xl font-black mt-1">
                    {currentUser.karmaHours} Hours
                  </div>
                  <span className="text-xs text-emerald-100 mt-1 block">
                    Lifetime hours earned: {currentUser.totalLifetimeHours} Hours
                  </span>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Clock className="w-8 h-8" />
                </div>
              </div>

              {/* Transactions Ledger */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Transaction Ledger History
                </h4>
                <div className="space-y-2">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 ${
                            tx.type === 'earned'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {tx.type === 'earned' ? (
                            <ArrowDownLeft className="w-4 h-4" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{tx.description}</div>
                          <div className="text-[11px] text-slate-500">
                            Partner: {tx.partnerName} • {new Date(tx.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-sm font-black ${
                          tx.type === 'earned' ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {tx.type === 'earned' ? `+${tx.amount}` : `-${tx.amount}`} hr
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4 text-xs">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Recent SkillSwap Activity
              </h4>
              <div className="border-l-2 border-slate-200 ml-3 pl-4 space-y-4">
                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                  <span className="text-[11px] text-slate-400 font-semibold">Today, 9:26 AM</span>
                  <div className="font-bold text-slate-900 mt-0.5">Agreement proposed with Mateo R.</div>
                  <p className="text-slate-600 text-xs">1 Hour bicycle brake repair & derailleur service.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white" />
                  <span className="text-[11px] text-slate-400 font-semibold">Yesterday</span>
                  <div className="font-bold text-slate-900 mt-0.5">Completed Swap & Earned +1 Hour</div>
                  <p className="text-slate-600 text-xs">Helped with Spanish pronunciation & earned 5-star review.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white" />
                  <span className="text-[11px] text-slate-400 font-semibold">3 days ago</span>
                  <div className="font-bold text-slate-900 mt-0.5">Received Graphic Design Help from Neha K.</div>
                  <p className="text-slate-600 text-xs">Redeemed 1 TimeBank Hour for logo feedback.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>SkillSwap Local TimeBank Ledger System</span>
          <button
            onClick={() => setIsDashboardOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
