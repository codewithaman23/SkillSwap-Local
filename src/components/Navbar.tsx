import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Clock,
  PlusCircle,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Bell,
  Layers,
} from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    setIsCreateModalOpen,
    setIsImpactModalOpen,
    setIsPrivacyModalOpen,
    setIsDashboardOpen,
    notifications,
    allChats,
    setActiveChatPartnerId,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Core Tagline */}
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
                <span className="hidden sm:block text-[11px] font-semibold text-emerald-700 tracking-wide">
                  "People exchange skills, not just money."
                </span>
              </div>
            </a>
          </div>

          {/* Right Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Personal Dashboard Button */}
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition"
              title="View your personal TimeBank ledger & skill statistics"
            >
              <Layers className="w-4 h-4 text-brand-600" />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            {/* Community Impact Button */}
            <button
              onClick={() => setIsImpactModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition"
              title="View community resilience statistics"
            >
              <BarChart3 className="w-4 h-4 text-brand-600" />
              <span>Impact</span>
            </button>

            {/* Privacy Center Button */}
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition"
              title="Privacy-First Architecture (Zero GPS, Zero Trackers)"
            >
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Privacy</span>
            </button>

            {/* Notifications Bell & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 text-slate-700 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition"
                aria-label="Open notifications"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            {/* In-App Messages Button */}
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
              <MessageSquare className="w-5 h-5" />
              {allChats.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {allChats.length}
                </span>
              )}
            </button>

            {/* Current User TimeBank / Karma badge */}
            {currentUser && (
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="hidden lg:flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/80 rounded-full py-1 px-3 transition cursor-pointer"
                title="Click to view TimeBank ledger"
              >
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentUser.karmaHours}h TimeBank</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-emerald-300" />
                <span className="text-[11px] font-medium text-emerald-700">
                  {currentUser.swapsCompleted} Swaps
                </span>
              </button>
            )}

            {/* Post a Swap CTA Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-brand-500/30 active:scale-95 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Post a Swap</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
