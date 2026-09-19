import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { SwapType, UrgencyLevel, AvailabilityLevel, SkillLevel } from '../types';

export const CreateSwapModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, categories, createNewSwap } = useApp();

  const [type, setType] = useState<SwapType>('offer');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('technology');
  const [offering, setOffering] = useState('');
  const [seeking, setSeeking] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('normal');
  const [availability, setAvailability] = useState<AvailabilityLevel>('today');
  const [preferredTime, setPreferredTime] = useState('5:00 PM – 7:00 PM');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('intermediate');
  const [mode, setMode] = useState<'in-person' | 'remote' | 'flexible'>('flexible');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 18. AI-Assisted Request Assistant
  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    type: SwapType;
    urgency: UrgencyLevel;
    skills: string[];
  } | null>(null);

  // Local lightweight keyword AI matcher
  useEffect(() => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('brake') || text.includes('cycle') || text.includes('bike') || text.includes('repair')) {
      setAiSuggestion({
        category: 'repair',
        type: text.includes('need') || text.includes('help') ? 'request' : 'offer',
        urgency: text.includes('today') || text.includes('urgent') ? 'urgent' : 'normal',
        skills: ['Bicycle Repair', 'Brake Repair', 'Cycle Maintenance']
      });
    } else if (text.includes('python') || text.includes('code') || text.includes('web') || text.includes('developer')) {
      setAiSuggestion({
        category: 'technology',
        type: text.includes('need') || text.includes('help') ? 'request' : 'offer',
        urgency: 'normal',
        skills: ['Python', 'Web Development', 'Debugging']
      });
    } else if (text.includes('spanish') || text.includes('french') || text.includes('math') || text.includes('tutor')) {
      setAiSuggestion({
        category: 'education',
        type: text.includes('need') || text.includes('help') ? 'request' : 'offer',
        urgency: 'normal',
        skills: ['Spanish', 'Mathematics', 'Language Practice']
      });
    } else if (text.includes('design') || text.includes('logo') || text.includes('photo') || text.includes('guitar')) {
      setAiSuggestion({
        category: 'creative',
        type: text.includes('need') || text.includes('help') ? 'request' : 'offer',
        urgency: 'normal',
        skills: ['Graphic Design', 'Logo Design', 'Music']
      });
    } else {
      setAiSuggestion(null);
    }
  }, [title, description]);

  if (!isCreateModalOpen) return null;

  const applyAiSuggestion = () => {
    if (!aiSuggestion) return;
    setCategory(aiSuggestion.category);
    setType(aiSuggestion.type);
    setUrgency(aiSuggestion.urgency);
    if (!offering && aiSuggestion.type === 'offer') {
      setOffering(aiSuggestion.skills[0]);
    }
    if (!seeking && aiSuggestion.type === 'request') {
      setSeeking(aiSuggestion.skills[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !offering.trim() || !seeking.trim()) {
      setErrorMessage('Please provide a headline, what you offer, and what you seek in return.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const success = await createNewSwap({
      title: title.trim(),
      type,
      category,
      offering: offering.trim(),
      seeking: seeking.trim(),
      description: description.trim(),
      urgency,
      availability,
      preferredTime,
      skillLevel,
      mode,
    });

    setIsSubmitting(false);
    if (success) {
      setSuccessMessage('🎉 Your skill swap listing is live at the top of the feed!');
      setTimeout(() => {
        setSuccessMessage('');
        setIsCreateModalOpen(false);
      }, 1500);
    } else {
      setErrorMessage('Failed to publish listing. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-swap-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 id="create-swap-title" className="text-lg sm:text-xl font-black text-slate-900">
              Post a New Skill Swap
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              "People exchange skills, not just money."
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold text-center animate-in fade-in">
              {successMessage}
            </div>
          )}

          {/* Offer vs Request Radio Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Listing Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('offer')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition ${
                  type === 'offer'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Skill Offer (I want to teach/give)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('request')}
                className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 transition ${
                  type === 'request'
                    ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Skill Request (I need help with something)</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="swap-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Headline Summary *
            </label>
            <input
              id="swap-title"
              type="text"
              required
              placeholder="e.g. Need help fixing my cycle brake / I can teach Python basics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* AI-Assisted Request Assistant Banner */}
          {aiSuggestion && (
            <div className="p-3 bg-gradient-to-r from-brand-50 to-emerald-50 border border-brand-200 rounded-xl text-xs space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-brand-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-brand-600 fill-brand-600" />
                  <span>AI Assistant Detected Keywords:</span>
                </span>
                <button
                  type="button"
                  onClick={applyAiSuggestion}
                  className="px-2 py-0.5 bg-brand-600 hover:bg-brand-700 text-white rounded-md text-[11px] font-bold transition shadow-xs"
                >
                  Apply Suggestions
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-brand-800">
                <span>Category: <strong>{aiSuggestion.category}</strong></span>
                <span>•</span>
                <span>Type: <strong>{aiSuggestion.type}</strong></span>
                <span>•</span>
                <span>Urgency: <strong>{aiSuggestion.urgency}</strong></span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {aiSuggestion.skills.map((sk, i) => (
                  <span key={i} className="px-1.5 py-0.2 bg-white text-emerald-800 border border-emerald-200 rounded text-[10px] font-bold">
                    + {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="swap-cat" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                id="swap-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500 font-semibold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="swap-urgency" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Urgency Priority
              </label>
              <select
                id="swap-urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500 font-semibold"
              >
                <option value="normal">Normal Exchange</option>
                <option value="urgent">🚨 Urgent Request</option>
              </select>
            </div>
          </div>

          {/* Barter Fields */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <div>
              <label htmlFor="swap-offering" className="block text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">
                What You Provide / Offer *
              </label>
              <input
                id="swap-offering"
                type="text"
                required
                placeholder="e.g. 1 hour of bicycle brake repair or 1 TimeBank hour"
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="swap-seeking" className="block text-xs font-black text-amber-900 uppercase tracking-wider mb-1">
                What You Seek in Return *
              </label>
              <input
                id="swap-seeking"
                type="text"
                required
                placeholder="e.g. Help adjusting bicycle gear derailleur or beginner Spanish practice"
                value={seeking}
                onChange={(e) => setSeeking(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Availability & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="swap-avail" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Availability
              </label>
              <select
                id="swap-avail"
                value={availability}
                onChange={(e) => setAvailability(e.target.value as AvailabilityLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500 font-semibold"
              >
                <option value="now">🟢 Available Now</option>
                <option value="today">🟢 Available Today</option>
                <option value="this-week">📅 Available This Week</option>
              </select>
            </div>

            <div>
              <label htmlFor="swap-time" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Time Slot
              </label>
              <input
                id="swap-time"
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="e.g. 5:00 PM – 7:00 PM"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Skill Level & Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="swap-level" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Skill Level
              </label>
              <select
                id="swap-level"
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500 font-semibold"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label htmlFor="swap-mode" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Exchange Mode
              </label>
              <select
                id="swap-mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as 'in-person' | 'remote' | 'flexible')}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500 font-semibold"
              >
                <option value="flexible">Flexible / Any Mode</option>
                <option value="in-person">In-Person (Safe Public Space)</option>
                <option value="remote">Remote (In-App Video / Chat)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="swap-desc" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Detailed Description
            </label>
            <textarea
              id="swap-desc"
              rows={3}
              placeholder="Provide a little more context about your background, tools or materials you have, and what you would like to achieve..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-black shadow-sm flex items-center gap-1.5 transition active:scale-95"
            >
              {isSubmitting ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Swap Listing</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
