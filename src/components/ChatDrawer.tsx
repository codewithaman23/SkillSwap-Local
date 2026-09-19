import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  FileCheck,
  Star,
  Clock,
  Flag,
  Ban,
} from 'lucide-react';

export const ChatDrawer: React.FC = () => {
  const {
    activeChat,
    activeChatPartnerId,
    setActiveChatPartnerId,
    sendMessage,
    acceptAgreement,
    completeSwapAndReview,
    reportUser,
    blockUser,
    a11y,
  } = useApp();

  const [inputText, setInputText] = useState('');

  // Review state
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('Outstanding experience! Very patient and skilled.');
  const [reviewBadge, setReviewBadge] = useState('Skilled Fixer');
  const [skillQuality, setSkillQuality] = useState(5);
  const [communicationQuality, setCommunicationQuality] = useState(5);
  const [reliability, setReliability] = useState(5);
  const [completedSuccessToast, setCompletedSuccessToast] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  if (!activeChatPartnerId || !activeChat) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    await sendMessage(text);
  };


  const handleAccept = async () => {
    await acceptAgreement();
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    await completeSwapAndReview(
      reviewRating,
      reviewComment,
      reviewBadge,
      skillQuality,
      communicationQuality,
      reliability
    );
    setShowReviewPrompt(false);
    setCompletedSuccessToast(true);
    setTimeout(() => setCompletedSuccessToast(false), 4000);
  };

  const agreement = activeChat.agreement;
  const agreementStatus = agreement?.status || activeChat.status || 'connected';

  const stateSteps = [
    { key: 'pending', label: 'Pending' },
    { key: 'connected', label: 'Connected' },
    { key: 'agreement_accepted', label: 'Agreement Accepted' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  const getCurrentStepIndex = () => {
    switch (agreementStatus) {
      case 'pending': return 0;
      case 'connected': return 1;
      case 'agreement_accepted': return 2;
      case 'in_progress': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const currentStepIdx = getCurrentStepIndex();

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[500px] bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-all duration-300 animate-in slide-in-from-right"
      role="region"
      aria-label={`Chat with ${activeChat.partnerName}`}
    >
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center shrink-0 overflow-hidden ring-1 ring-slate-300">
            {!a11y.lowBandwidth ? (
              <img src={activeChat.partnerAvatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <span>{activeChat.partnerName.substring(0, 2).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-slate-900 truncate flex items-center gap-1">
              <span>{activeChat.partnerName}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <div className="text-xs text-slate-500 truncate">
              {activeChat.swapTitle || 'Skill Exchange Coordination'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              const reason = prompt(`Reason for reporting ${activeChat.partnerName}:`);
              if (reason) reportUser(activeChat.partnerId, reason);
            }}
            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
            title="Report user"
          >
            <Flag className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Block ${activeChat.partnerName}?`)) {
                blockUser(activeChat.partnerId);
                setActiveChatPartnerId(null);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg transition"
            title="Block user"
          >
            <Ban className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveChatPartnerId(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
            aria-label="Close chat drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* State Machine Visual Progression */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-2.5">
        <div className="flex items-center justify-between text-[10px] font-bold">
          {stateSteps.map((step, idx) => {
            const isActive = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            return (
              <div key={step.key} className="flex flex-col items-center text-center flex-1">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] mb-1 font-bold ${
                    isActive ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                  } ${isCurrent ? 'ring-2 ring-emerald-400' : ''}`}
                >
                  {isActive ? '✓' : idx + 1}
                </div>
                <span className={isActive ? 'text-emerald-900 font-extrabold' : 'text-slate-500'}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swap Completed Success Banner */}
      {completedSuccessToast && (
        <div className="p-3 bg-emerald-600 text-white text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>🎉 Swap completed! You earned +1 TimeBank hour.</span>
          </div>
          <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded">Saved to Ledger</span>
        </div>
      )}

      {/* Swap Agreement Handshake Card */}
      {agreement && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-brand-50 border-b border-emerald-200 p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-black text-emerald-950 text-sm">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>
                {agreement.status === 'completed'
                  ? '🟢 Swap Completed & Verified!'
                  : agreement.status === 'agreement_accepted'
                  ? '🟢 Agreement Confirmed'
                  : '🤝 Swap Agreement Proposed'}
              </span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                agreement.status === 'completed'
                  ? 'bg-emerald-200 text-emerald-900'
                  : agreement.status === 'agreement_accepted'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {agreement.status === 'agreement_accepted' ? 'Confirmed' : agreement.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">You provide:</span>
              <span className="font-bold text-slate-900 text-xs">{agreement.userProvidedSkill || 'Bicycle repair assistance'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-900 block">You receive:</span>
              <span className="font-bold text-slate-900 text-xs">{agreement.userReceivedSkill || '1 TimeBank Hour'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>Estimated Duration: {agreement.durationHours || 1} Hour</span>
            </span>
            <span className="font-medium text-slate-500">
              {agreement.scheduledTime || 'Scheduled Today'}
            </span>
          </div>

          {/* Agreement Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            {agreement.status === 'pending' && (
              <button
                onClick={handleAccept}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-xs transition active:scale-95"
              >
                Accept Agreement Handshake
              </button>
            )}

            {(agreement.status === 'agreement_accepted' || agreement.status === 'in_progress') && (
              <button
                onClick={() => setShowReviewPrompt(true)}
                className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-black rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Swap as Completed</span>
              </button>
            )}

            {agreement.status === 'completed' && (
              <div className="w-full p-2 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-center text-xs flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>+1 TimeBank Hour Credited to Your Balance!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal Prompt */}
      {showReviewPrompt && (
        <form onSubmit={handleComplete} className="p-4 bg-emerald-50 border-b border-emerald-300 space-y-3 text-xs animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-emerald-950 text-sm">How was your exchange experience?</h4>
            <button
              type="button"
              onClick={() => setShowReviewPrompt(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Overall Stars */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Overall Rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setReviewRating(s)}
                  className="p-1"
                  aria-label={`Rate ${s} stars`}
                >
                  <Star className={`w-5 h-5 ${s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Quality Metrics */}
          <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-emerald-200 text-center">
            <div>
              <label htmlFor="skill-qual" className="text-[10px] font-bold text-slate-500 block">Skill Quality</label>
              <select
                id="skill-qual"
                value={skillQuality}
                onChange={(e) => setSkillQuality(Number(e.target.value))}
                className="text-amber-600 font-bold text-xs bg-transparent focus:outline-none cursor-pointer"
              >
                <option value={5}>5.0 ★</option>
                <option value={4}>4.0 ★</option>
                <option value={3}>3.0 ★</option>
              </select>
            </div>
            <div>
              <label htmlFor="comm-qual" className="text-[10px] font-bold text-slate-500 block">Communication</label>
              <select
                id="comm-qual"
                value={communicationQuality}
                onChange={(e) => setCommunicationQuality(Number(e.target.value))}
                className="text-amber-600 font-bold text-xs bg-transparent focus:outline-none cursor-pointer"
              >
                <option value={5}>5.0 ★</option>
                <option value={4}>4.0 ★</option>
                <option value={3}>3.0 ★</option>
              </select>
            </div>
            <div>
              <label htmlFor="rel-qual" className="text-[10px] font-bold text-slate-500 block">Reliability</label>
              <select
                id="rel-qual"
                value={reliability}
                onChange={(e) => setReliability(Number(e.target.value))}
                className="text-amber-600 font-bold text-xs bg-transparent focus:outline-none cursor-pointer"
              >
                <option value={5}>5.0 ★</option>
                <option value={4}>4.0 ★</option>
                <option value={3}>3.0 ★</option>
              </select>
            </div>
          </div>

          {/* Trust Badge Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Community Badge to Award</label>
            <select
              value={reviewBadge}
              onChange={(e) => setReviewBadge(e.target.value)}
              className="w-full p-2 border border-emerald-300 rounded-xl bg-white font-semibold"
            >
              <option value="Skilled Fixer">🔧 Skilled Fixer</option>
              <option value="Patient Teacher">🌟 Patient Teacher</option>
              <option value="Punctual Swapper">⏰ Punctual Swapper</option>
              <option value="Generous Heart">💚 Generous Heart</option>
              <option value="Community Pillar">🏛️ Community Pillar</option>
            </select>
          </div>

          {/* Written Comment */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Written Review</label>
            <textarea
              required
              rows={2}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full p-2 border border-emerald-300 rounded-xl bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-xs transition"
          >
            Submit Review & Claim +1 TimeBank Hour
          </button>
        </form>
      )}

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        <div className="text-center my-1">
          <span className="px-3 py-1 rounded-full bg-slate-200/80 text-[11px] text-slate-600 font-semibold">
            In-App Privacy Protected Conversation
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

      {/* Quick Suggestion Chips */}
      <div className="px-3 py-1.5 border-t border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
        <button
          type="button"
          onClick={() => setInputText("Hi Mateo, I would like to exchange one hour of help for bicycle repair.")}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition font-medium"
        >
          💬 "I'd like to exchange 1 hr help"
        </button>
        <button
          type="button"
          onClick={() => setInputText("I'm available today between 5:00 PM and 7:00 PM.")}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition font-medium"
        >
          🕒 "Available today 5-7pm"
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          placeholder="Message neighbor safely..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          aria-label="Type your message"
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
