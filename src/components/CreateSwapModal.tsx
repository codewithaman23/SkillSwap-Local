import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import { SwapType, UrgencyLevel } from '../types';

export const CreateSwapModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, categories, neighborhoods, currentUser, createNewSwap } = useApp();

  const [type, setType] = useState<SwapType>('offer');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('language');
  const [offering, setOffering] = useState('');
  const [seeking, setSeeking] = useState('');
  const [description, setDescription] = useState('');
  const [neighborhood, setNeighborhood] = useState(
    currentUser?.neighborhoodName || 'Mission District, San Francisco'
  );
  const [urgency, setUrgency] = useState<UrgencyLevel>('flexible');
  const [preferredMeeting, setPreferredMeeting] = useState('Local Public Library (Staffed & Safe)');
  const [mode, setMode] = useState<'in-person' | 'remote' | 'hybrid'>('in-person');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCreateModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !offering.trim() || !seeking.trim()) {
      setErrorMessage('Please fill in the title, what you offer, and what you seek in return.');
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
      neighborhood,
      urgency,
      preferredMeeting,
      mode,
    });

    setIsSubmitting(false);
    if (!success) {
      setErrorMessage('Failed to publish swap listing. Please try again.');
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
            <h2 id="create-swap-title" className="text-lg sm:text-xl font-extrabold text-slate-900">
              Post a Hyperlocal Skill Swap
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Connect with your neighbors for mutual exchange. Zero cash.
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

        {/* Privacy Warning Banner */}
        <div className="bg-amber-50 border-b border-amber-200/70 px-4 sm:px-6 py-2.5 flex items-center gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Privacy Protection:</strong> Never include your exact house number, personal phone, or social links here. Coordinate safely in in-app chat.
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
              {errorMessage}
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
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
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
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
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
              placeholder="e.g. Teach French basics in exchange for bicycle maintenance"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

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
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500"
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
                Timing / Urgency
              </label>
              <select
                id="swap-urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500"
              >
                <option value="flexible">Flexible timing</option>
                <option value="this-week">This week</option>
                <option value="this-weekend">This weekend</option>
                <option value="urgent">Urgent need</option>
              </select>
            </div>
          </div>

          {/* The Barter Fields */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
            <div>
              <label htmlFor="swap-offering" className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                What You Can Offer / Give *
              </label>
              <input
                id="swap-offering"
                type="text"
                required
                placeholder="e.g. 1 hour conversational Spanish practice or pronunciation coaching"
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="swap-seeking" className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                What You Want in Return *
              </label>
              <input
                id="swap-seeking"
                type="text"
                required
                placeholder="e.g. Help tuning bicycle gear derailleur and replacing brake pads"
                value={seeking}
                onChange={(e) => setSeeking(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="swap-desc" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Detailed Description & Context
            </label>
            <textarea
              id="swap-desc"
              rows={3}
              placeholder="Tell your neighbors a bit more about your skill background, what materials you have, and how you prefer to meet..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Neighborhood & Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="swap-neigh" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Neighborhood
              </label>
              <select
                id="swap-neigh"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500"
              >
                {neighborhoods.map((n) => (
                  <option key={n.id} value={`${n.name}, ${n.city}`}>
                    {n.name} ({n.city.split(',')[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="swap-mode" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Exchange Mode
              </label>
              <select
                id="swap-mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as 'in-person' | 'remote' | 'hybrid')}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500"
              >
                <option value="in-person">In-Person (Meet Locally)</option>
                <option value="remote">Remote (Video/Audio Call)</option>
                <option value="hybrid">Flexible / Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="swap-meetup" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Safe Public Meetup Suggestion
            </label>
            <input
              id="swap-meetup"
              type="text"
              value={preferredMeeting}
              onChange={(e) => setPreferredMeeting(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-1.5 transition active:scale-95"
            >
              {isSubmitting ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish to Neighborhood</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

