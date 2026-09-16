'use client';

import React from 'react';
import { Chip } from '../primitives/Chip';

export interface FilterSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  activeFilters?: string[];
  onRemoveFilter?: (filter: string) => void;
  onOpenShortcut?: () => void;
  showShortcutBadge?: boolean;
  className?: string;
}

export const FilterSearchBar: React.FC<FilterSearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search components, props, hooks...',
  activeFilters = [],
  onRemoveFilter,
  onOpenShortcut,
  showShortcutBadge = true,
  className = '',
}) => {
  return (
    <div className={`w-full flex flex-col gap-2.5 ${className}`}>
      <div className="relative flex items-center w-full">
        {/* Search icon */}
        <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748b]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm pl-10 pr-24 py-2.5 rounded-[10px] bg-white border border-[#cbd5e1] hover:border-[#94a3b8] focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe] outline-none transition-all text-[#0f172a] placeholder:text-[#94a3b8]"
        />

        {showShortcutBadge && (
          <button
            type="button"
            onClick={onOpenShortcut}
            className="absolute right-3 flex items-center gap-1 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] hover:text-[#0f172a] border border-[#e2e8f0] px-2 py-1 rounded-[6px] text-[11px] font-mono font-semibold transition-all cursor-pointer"
          >
            <span>⌘</span>
            <span>K</span>
          </button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#64748b] font-medium">Filters:</span>
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              variant="primary"
              size="sm"
              onRemove={onRemoveFilter ? () => onRemoveFilter(filter) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};
