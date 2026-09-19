import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  MapPin,
  Clock,
  PlusCircle,
  MessageSquare,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    neighborhoods,
    currentUser,
    filters,
    switchNeighborhood,
    setIsCreateModalOpen,
    setIsImpactModalOpen,
    setIsPrivacyModalOpen,
    allChats,
    setActiveChatPartnerId,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
              aria-label="SkillSwap Local Homepage"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  SkillSwap <span className="text-brand-600">Local</span>
                </span>
                <span className="hidden sm:block text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                  Hyperlocal Barter & Community
                </span>
              </div>
            </a>

            {/* Neighborhood Location Selector */}
            <div className="hidden md:flex items-center ml-4 pl-4 border-l border-slate-200">
              <label htmlFor="neighborhood-selector" className="sr-only">
                Choose neighborhood
              </label>
              <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 transition">
                <MapPin className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
                <select
                  id="neighborhood-selector"
                  value={filters.neighborhoodId}
                  onChange={(e) => switchNeighborhood(e.target.value)}
                  className="bg-transparent text-slate-800 text-xs font-semibold focus:outline-none cursor-pointer pr-2"
                >
                  <option value="all">🌍 All Neighborhoods</option>
                  {neighborhoods.map((n) => (
                    <option key={n.id} value={n.id}>
                      📍 {n.name} ({n.city.split(',')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Center/Right Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Community Impact Stats Button */}
            <button
              onClick={() => setIsImpactModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition"
              title="View neighborhood resilience & timebank impact"
            >
              <BarChart3 className="w-4 h-4 text-brand-600" aria-hidden="true" />
              <span>Impact</span>
            </button>

            {/* Privacy Pledge Button */}
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition"
              title="Learn about zero-tracking and privacy safeguards"
            >
              <ShieldCheck className="w-4 h-4 text-brand-600" aria-hidden="true" />
              <span>Privacy</span>
            </button>

            {/* In-App Chats Button */}
            <button
              onClick={() => {
                if (allChats.length > 0) {
                  setActiveChatPartnerId(allChats[0].partnerId);
                } else {
                  setActiveChatPartnerId('usr_mateo');
                }
              }}
              className="relative p-2 text-slate-700 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
              aria-label="Open messages"
              title="Active skill swap conversations"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              {allChats.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {allChats.length}
                </span>
              )}
            </button>

            {/* Current User TimeBank / Karma badge */}
            {currentUser && (
              <div
                className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-full py-1 px-3"
                title="Your Community Karma & TimeBank Hours"
              >
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span>{currentUser.karmaHours}h TimeBank</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-emerald-300" />
                <span className="text-[11px] font-medium text-emerald-700">
                  {currentUser.swapsCompleted} Swaps
                </span>
              </div>
            )}

            {/* Post a Swap CTA Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-brand-500/30 active:scale-95 transition"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              <span>Post a Swap</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

