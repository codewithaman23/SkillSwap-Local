import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  ShieldCheck,
  Building,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  FileCheck,
  Star,
} from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const {
    activeChat,
    activeChatPartnerId,
    setActiveChatPartnerId,
    sendMessage,
    proposeAgreement,
    acceptAgreement,
    completeSwapAndReview,
    meetupSpots,
    a11y,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isProposingAgreement, setIsProposingAgreement] = useState(false);
  const [agreementTerms, setAgreementTerms] = useState('');
  const [agreementLocation, setAgreementLocation] = useState('Local Public Library (Staffed & Safe)');
  const [agreementDate, setAgreementDate] = useState('This Saturday, 11:00 AM');

  // Review modal inside chat
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewBadge, setReviewBadge] = useState('Patient Teacher');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  useEffect(() => {
    if (activeChat?.swapTitle) {
      setAgreementTerms(`Exchange for "${activeChat.swapTitle}": 1 hour mutual skill share.`);
    }
  }, [activeChat?.swapTitle]);

  if (!activeChatPartnerId || !activeChat) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    await sendMessage(text);
  };

  const handleProposeAgreementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementTerms.trim()) return;
    await proposeAgreement(agreementTerms, agreementLocation, agreementDate);
    setIsProposingAgreement(false);
  };

  const handleAcceptAgreement = async () => {
    await acceptAgreement();
  };

  const handleCompleteSwap = async () => {
    setShowReviewPrompt(true);
  };

  const handleFinishReview = async (e: React.FormEvent) => {
    e.preventDefault();
    await completeSwapAndReview(reviewRating, reviewComment, reviewBadge);
    setShowReviewPrompt(false);
    setReviewComment('');
  };

  const agreement = activeChat.agreement;

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-all duration-300 animate-in slide-in-from-right"
      role="region"
      aria-label={`Chat conversation with ${activeChat.partnerName}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-slate-300">
            {!a11y.lowBandwidth ? (
              <img
                src={activeChat.partnerAvatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{activeChat.partnerName.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 truncate flex items-center gap-1">
              <span>{activeChat.partnerName}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <div className="text-xs text-slate-500 truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{activeChat.partnerNeighborhood}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveChatPartnerId(null)}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
          aria-label="Close chat drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Safety & Privacy Notice Ribbon */}
      <div className="bg-emerald-50 border-b border-emerald-200/70 px-4 py-2 flex items-center gap-2 text-[11px] text-emerald-900">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          <strong>Hyperlocal Privacy:</strong> Phone numbers & emails are hidden. Keep communication in-app.
        </span>
      </div>

      {/* Swap Agreement Status Banner */}
      {agreement && (
        <div className="bg-gradient-to-r from-brand-50 to-emerald-50 border-b border-emerald-200 p-3.5 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>
                {agreement.status === 'proposed' && '📝 Skill Swap Agreement Proposed'}
                {agreement.status === 'accepted' && '🤝 Swap Confirmed! Meetup Scheduled'}
                {agreement.status === 'completed' && '🎉 Swap Completed & Verified!'}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                agreement.status === 'completed'
                  ? 'bg-emerald-200 text-emerald-900'
                  : agreement.status === 'accepted'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {agreement.status}
            </span>
          </div>

          <p className="text-slate-700 font-medium leading-snug">{agreement.terms}</p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {agreement.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {agreement.date}
            </span>
          </div>

          {/* Action buttons on agreement */}
          <div className="mt-2.5 pt-2 border-t border-emerald-200/60 flex items-center gap-2">
            {agreement.status === 'proposed' && (
              <button
                onClick={handleAcceptAgreement}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs transition"
              >
                Accept Agreement Handshake
              </button>
            )}

            {agreement.status === 'accepted' && (
              <button
                onClick={handleCompleteSwap}
                className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold text-xs shadow-xs transition flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Swap as Completed</span>
              </button>
            )}

            {agreement.status === 'completed' && (
              <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Karma hours credited to your TimeBank!</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Propose Agreement Form (collapsible) */}
      {isProposingAgreement && (
        <form onSubmit={handleProposeAgreementSubmit} className="p-3.5 bg-amber-50/90 border-b border-amber-200 space-y-2.5 text-xs">
          <div className="flex items-center justify-between font-bold text-amber-950">
            <span>Propose Formal Skill Swap Terms</span>
            <button
              type="button"
              onClick={() => setIsProposingAgreement(false)}
              className="text-amber-800 hover:text-amber-950 font-semibold"
            >
              Cancel
            </button>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-0.5">Agreed Swap Terms</label>
            <input
              type="text"
              required
              value={agreementTerms}
              onChange={(e) => setAgreementTerms(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg text-xs bg-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-0.5">Meetup Location</label>
              <input
                type="text"
                value={agreementLocation}
                onChange={(e) => setAgreementLocation(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg text-xs bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-0.5">Date & Time</label>
              <input
                type="text"
                value={agreementDate}
                onChange={(e) => setAgreementDate(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-amber-300 rounded-lg text-xs bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition"
          >
            Send Agreement to Neighbor
          </button>
        </form>
      )}

      {/* Review Modal Prompt (when completed) */}
      {showReviewPrompt && (
        <form onSubmit={handleFinishReview} className="p-4 bg-emerald-50 border-b border-emerald-300 space-y-3 text-xs">
          <div className="font-bold text-emerald-950 text-sm flex items-center justify-between">
            <span>Leave Neighbor Endorsement & Review</span>
            <button
              type="button"
              onClick={() => setShowReviewPrompt(false)}
              className="text-emerald-800 hover:text-emerald-950"
            >
              Skip
            </button>
          </div>
          <p className="text-emerald-900">
            How was your exchange with {activeChat.partnerName}? Reviews build hyperlocal trust and community resilience.
          </p>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Star Rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setReviewRating(s)}
                  className="p-1 text-amber-500"
                >
                  <Star className={`w-5 h-5 ${s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Trust Badge to Award</label>
            <select
              value={reviewBadge}
              onChange={(e) => setReviewBadge(e.target.value)}
              className="w-full p-2 border border-emerald-300 rounded-lg bg-white"
            >
              <option value="Patient Teacher">🌟 Patient Teacher</option>
              <option value="Punctual Neighbor">⏰ Punctual Neighbor</option>
              <option value="Skilled Fixer">🔧 Skilled Fixer</option>
              <option value="Generous Heart">💚 Generous Heart</option>
              <option value="Community Pillar">🏛️ Community Pillar</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Public Feedback Comment</label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Great session! Very patient explaining the steps..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full p-2 border border-emerald-300 rounded-lg bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition shadow-xs"
          >
            Submit Review & Complete (+1 Karma Hour)
          </button>
        </form>
      )}

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        <div className="text-center my-2">
          <span className="px-2.5 py-1 rounded-full bg-slate-200/80 text-[11px] text-slate-600 font-medium">
            Coordination for "{activeChat.swapTitle || 'Skill Swap'}"
          </span>
        </div>

        {activeChat.messages.map((msg) => {
          const isMe = msg.senderId === 'usr_me';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  isMe
                    ? 'bg-brand-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Safe Meetup Spot Quick-Chips & Propose Agreement Action */}
      <div className="px-3 pt-2 pb-1 border-t border-slate-100 bg-white space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500 font-semibold">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>Suggest Safe Spot:</span>
          </div>

          {!agreement && !isProposingAgreement && (
            <button
              onClick={() => setIsProposingAgreement(true)}
              className="text-xs text-brand-700 hover:text-brand-800 font-bold flex items-center gap-1 underline underline-offset-2"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Propose Agreement</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          {meetupSpots.slice(0, 3).map((spot, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setInputText(`Let's meet safely at: ${spot.name}. Does that work for you?`)}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition"
            >
              📍 {spot.name.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="Message neighbor safely..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          aria-label="Type message"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-xl transition shadow-xs"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

