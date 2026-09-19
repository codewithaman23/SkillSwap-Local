import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCheck,
  Sparkles,
  MessageSquare,
  FileCheck,
  Clock,
  ExternalLink,
  X,
} from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, openChatWithNeighbor } = useApp();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'agreement':
        return <FileCheck className="w-4 h-4 text-blue-600" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-amber-600" />;
      case 'karma':
        return <Clock className="w-4 h-4 text-teal-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div
      ref={panelRef}
      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100"
      role="region"
      aria-label="In-App Notifications"
    >
      {/* Header */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-600" />
          <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px] font-bold">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] font-semibold text-brand-600 hover:text-brand-800 transition flex items-center gap-1"
            >
              <CheckCheck className="w-3 h-3" />
              <span>Mark all read</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
            aria-label="Close notifications panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            No notifications yet. You're all caught up!
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationRead(notif.id);
                if (notif.actionData?.partnerId) {
                  openChatWithNeighbor(notif.actionData.partnerId, notif.actionData.swapId);
                  onClose();
                }
              }}
              className={`p-3.5 hover:bg-slate-50 cursor-pointer transition flex items-start gap-3 ${
                !notif.read ? 'bg-emerald-50/40' : 'bg-white'
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center justify-between gap-1">
                  <span className={`font-bold truncate ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                  )}
                </div>

                <p className="text-slate-600 mt-0.5 leading-snug line-clamp-2">
                  {notif.message}
                </p>

                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {notif.actionData?.partnerId && (
                    <span className="text-brand-600 font-semibold flex items-center gap-0.5">
                      <span>View</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
        Notifications keep you updated on mutual skill exchanges.
      </div>
    </div>
  );
};
