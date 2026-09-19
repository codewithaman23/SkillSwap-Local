import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Lock,
  MapPinOff,
  EyeOff,
  Building,
  CheckCircle,
} from 'lucide-react';

export const PrivacyModal: React.FC = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen } = useApp();

  if (!isPrivacyModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-lg sm:text-xl font-extrabold text-slate-900">
                Privacy-First Architecture & Safety
              </h2>
              <p className="text-xs text-slate-500">
                Built to protect your digital sovereignty and personal safety.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPrivacyModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          {/* Key Privacy Pillars */}
          <div className="space-y-3">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3">
              <MapPinOff className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">No Precise GPS Tracking</h3>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                  We will never ask for your device’s fine GPS coordinates or home address. Listings are categorized solely by district/neighborhood names (e.g. "Mission District" or "Bed-Stuy").
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-brand-50/70 border border-brand-200 rounded-xl flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">Zero Commercial Data Brokers & Trackers</h3>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                  SkillSwap contains zero analytics trackers, zero advertising SDKs, and zero social media tracking pixels. Your skill interests and communications remain confidential.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-start gap-3">
              <Lock className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">In-App Contact Protection</h3>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                  You do not need to share your telephone number or personal social profiles with strangers. All barter coordination, terms, and agreements are handled safely in-app.
                </p>
              </div>
            </div>
          </div>

          {/* Safe Meetup Guide */}
          <div className="border-t border-slate-200 pt-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-brand-600" />
              <span>Recommended Safe Neighbor Meetup Checklist</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Meet in staff-attended public spots like libraries, community centers, or busy cafes.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Schedule during broad daylight hours for outdoor exchanges (e.g., bike repairs in parks).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Agree on swap expectations upfront using the in-app SkillSwap Agreement Handshake.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Award Community Karma and an honest review after the exchange to build local trust.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={() => setIsPrivacyModalOpen(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
};

