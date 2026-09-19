import React, { useState } from 'react';
import { Author } from '../types';
import { useApp } from '../context/AppContext';
import {
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Ban,
  Flag,
} from 'lucide-react';

interface TrustSafetyCardProps {
  author: Author;
  compact?: boolean;
}

export const TrustSafetyCard: React.FC<TrustSafetyCardProps> = ({ author, compact = false }) => {
  const { a11y, reportUser, blockUser } = useApp();
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  const handleReport = async () => {
    const reason = prompt('Please describe the issue or reason for reporting:');
    if (reason && reason.trim()) {
      await reportUser(author.id, reason.trim());
      setActionStatus('Report submitted for safety review');
      setTimeout(() => setActionStatus(null), 3000);
    }
  };

  const handleBlock = async () => {
    if (confirm(`Are you sure you want to block ${author.name}? You will no longer receive requests or messages from this user.`)) {
      await blockUser(author.id);
      setActionStatus(`Blocked ${author.name}`);
      setTimeout(() => setActionStatus(null), 3000);
    }
  };

  const getAvailabilityBadge = () => {
    switch (author.availability) {
      case 'now':
        return { label: 'Available Now', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'today':
        return { label: 'Available Today', color: 'bg-green-100 text-green-800 border-green-300' };
      case 'this-week':
        return { label: 'Available This Week', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      default:
        return { label: 'Flexible Availability', color: 'bg-slate-100 text-slate-700 border-slate-300' };
    }
  };

  const avail = getAvailabilityBadge();

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-slate-200">
            {!a11y.lowBandwidth ? (
              <img src={author.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span>{author.name.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-slate-900 truncate flex items-center gap-1">
              <span>{author.name}</span>
              {author.verifiedMember && (
                <span title="Verified Community Member">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center text-amber-600 font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                {author.rating}
              </span>
              <span>•</span>
              <span>{author.swapsCompleted} swaps</span>
            </div>
          </div>
        </div>

        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${avail.color}`}>
          🟢 {avail.label}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-colors">
      {actionStatus && (
        <div className="mb-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg text-center animate-in fade-in">
          {actionStatus}
        </div>
      )}

      {/* Author Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-800 font-bold text-sm flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-brand-500/20">
            {!a11y.lowBandwidth ? (
              <img src={author.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span>{author.name.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div>
            <div className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
              <span>{author.name}</span>
              {author.verifiedMember && (
                <span title="Verified Community Member" className="inline-flex items-center text-brand-600">
                  <CheckCircle2 className="w-4 h-4 fill-brand-100 text-brand-600" />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
              <span className="flex items-center font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                {author.rating} / 5.0
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified Community Member
              </span>
            </div>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${avail.color}`}>
          🟢 {avail.label}
        </span>
      </div>

      {/* Trust & Reputation Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-slate-100 text-center">
        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-base font-black text-slate-900">{author.swapsCompleted}</div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Swaps Completed</div>
        </div>

        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-base font-black text-slate-900">{author.hoursExchanged} hrs</div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Hours Exchanged</div>
        </div>

        <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-base font-black text-slate-900">{author.endorsementsCount}</div>
          <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Endorsements</div>
        </div>
      </div>

      {/* Availability Time Slot */}
      {author.preferredTime && (
        <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3 flex items-center justify-between">
          <span className="font-semibold text-slate-600 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span>Preferred Time:</span>
          </span>
          <span className="font-bold text-slate-800">{author.preferredTime}</span>
        </div>
      )}

      {/* Skills Offered & Learned */}
      <div className="space-y-2 text-xs">
        {author.skillsOffered && author.skillsOffered.length > 0 && (
          <div>
            <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider block mb-1">
              Skills Offered:
            </span>
            <div className="flex flex-wrap gap-1">
              {author.skillsOffered.map((sk, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold text-[11px] border border-emerald-200/60">
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>
        )}

        {author.skillsLearned && author.skillsLearned.length > 0 && (
          <div>
            <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider block mb-1">
              Interested in Learning:
            </span>
            <div className="flex flex-wrap gap-1">
              {author.skillsLearned.map((sk, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[11px] border border-amber-200/60">
                  ★ {sk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Safety Actions: Report & Block */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span className="text-[11px] text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          Community Safety Protected
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReport}
            className="hover:text-red-600 transition flex items-center gap-1 font-medium"
            title="Report this user to community safety"
          >
            <Flag className="w-3 h-3" />
            <span>Report</span>
          </button>
          <button
            onClick={handleBlock}
            className="hover:text-slate-800 transition flex items-center gap-1 font-medium"
            title="Block this user"
          >
            <Ban className="w-3 h-3" />
            <span>Block</span>
          </button>
        </div>
      </div>
    </div>
  );
};
