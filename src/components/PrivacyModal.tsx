import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Lock,
  MapPinOff,
  EyeOff,
  Users,
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
                Privacy Center: Your Privacy Matters
              </h2>
              <p className="text-xs text-slate-500">
                Zero GPS • Zero Commercial Trackers • Full User Control
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
          {/* Core Privacy Pillars */}
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-start gap-3">
              <EyeOff className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">Minimal Personal Information</h3>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                  Only the information strictly required to coordinate skill exchanges is displayed. We do not require your legal identity, surname, or personal social media handles.
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-xl flex items-start gap-3">
              <MapPinOff className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">No Precise Location or GPS</h3>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                  SkillSwap never requests your device's GPS coordinates, street address, or precise geolocation. Exchanges are matched on skill compatibility and availability alone.
                </p>
              </div>
            </div>

            <div className="p-4 bg-purple-50/80 border border-purple-200 rounded-xl flex items-start gap-3">
              <Users className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">User Control: Report & Block</h3>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                  You maintain complete authority over who can interact with you. Any user or listing can be reported or blocked instantly with one click.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-900">In-Platform Communication</h3>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                  All discussions, scheduling, and agreement terms occur within our secure in-app chat. There is never any need to share your personal phone number or email address with peers.
                </p>
              </div>
            </div>
          </div>

          {/* Safety Checklist */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Safety Best Practices</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Keep communication inside the platform at all times.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Formalize terms using the digital SkillSwap Agreement Handshake before starting.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Choose verified public meeting places or use in-app remote video.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Leave an honest review to maintain high community trust and safety.</span>
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
