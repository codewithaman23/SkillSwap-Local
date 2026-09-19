import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Languages,
  Wrench,
  Sprout,
  Laptop,
  Palette,
  HeartHandshake,
  Music,
  GraduationCap,
  LayoutGrid,
  Filter,
  X,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Languages,
  Wrench,
  Sprout,
  Laptop,
  Palette,
  HeartHandshake,
  Music,
  GraduationCap,
};

export const FilterBar: React.FC = () => {
  const { categories, filters, setFilters, resetFilters, swaps, neighborhoods } = useApp();

  const activeNeighborhood = neighborhoods.find(n => n.id === filters.neighborhoodId);

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.neighborhoodId !== 'all' ||
    filters.urgency !== 'all' ||
    filters.search !== '';

  return (
    <div className="bg-white border-b border-slate-200 py-3 sticky top-16 z-30 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Horizontal Scrollable Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none" role="toolbar" aria-label="Filter by skill category">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 ${
              filters.category === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
            <span>All Categories</span>
          </button>

          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || LayoutGrid;
            const isSelected = filters.category === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setFilters(prev => ({ ...prev, category: isSelected ? 'all' : cat.id }))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition shrink-0 ${
                  isSelected
                    ? 'bg-brand-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Bar: Active Filters, Urgency, Count, and Reset */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-slate-900 font-bold">{swaps.length}</strong>{' '}
              {filters.type === 'offer' ? 'skill offers' : filters.type === 'request' ? 'skill requests' : 'skill swaps'}{' '}
              {activeNeighborhood ? `in ${activeNeighborhood.name}` : 'across all communities'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Urgency selector */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              <label htmlFor="urgency-filter" className="sr-only">
                Filter by timeframe
              </label>
              <select
                id="urgency-filter"
                value={filters.urgency}
                onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-md px-2 py-1 font-medium focus:outline-none focus:border-brand-500"
              >
                <option value="all">Any Timeframe</option>
                <option value="flexible">Flexible Timing</option>
                <option value="this-week">This Week</option>
                <option value="this-weekend">This Weekend</option>
                <option value="urgent">Urgent Need</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-slate-500 hover:text-red-600 font-medium transition"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

