import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Laptop,
  GraduationCap,
  Palette,
  Wrench,
  HeartHandshake,
  LayoutGrid,
  X,
  Clock,
  Award,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  GraduationCap,
  Palette,
  Wrench,
  HeartHandshake,
};

export const FilterBar: React.FC = () => {
  const { categories, filters, setFilters, resetFilters, swaps } = useApp();

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.availability !== 'all' ||
    filters.skillLevel !== 'all' ||
    filters.urgentOnly ||
    filters.search !== '';

  return (
    <div className="bg-white border-b border-slate-200 py-3 sticky top-16 z-30 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Horizontal Scrollable Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none" role="toolbar" aria-label="Filter by skill category">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition shrink-0 ${
              filters.category === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </button>

          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || LayoutGrid;
            const isSelected = filters.category === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setFilters(prev => ({ ...prev, category: isSelected ? 'all' : cat.id }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Bar: Availability, Skill Level, Results Count, and Reset */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-slate-900 font-bold">{swaps.length}</strong>{' '}
              {filters.type === 'offer' ? 'skill offers' : filters.type === 'request' ? 'skill requests' : 'skill exchanges'}
              {filters.urgentOnly ? ' (🚨 Urgent)' : ''}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Availability Filter */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="avail-filter" className="sr-only">Availability</label>
              <select
                id="avail-filter"
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2 py-1 font-semibold focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="all">🕒 Any Availability</option>
                <option value="now">🟢 Available Now</option>
                <option value="today">🟢 Available Today</option>
                <option value="this-week">📅 Available This Week</option>
              </select>
            </div>

            {/* Skill Level Filter */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="level-filter" className="sr-only">Skill Level</label>
              <select
                id="level-filter"
                value={filters.skillLevel}
                onChange={(e) => setFilters(prev => ({ ...prev, skillLevel: e.target.value }))}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2 py-1 font-semibold focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="all">All Skill Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-slate-500 hover:text-red-600 font-bold transition ml-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
