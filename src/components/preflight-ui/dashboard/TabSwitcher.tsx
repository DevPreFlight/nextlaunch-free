'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabSwitcherProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pills' | 'underline' | 'segmented';
  className?: string;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  className = '',
}) => {
  if (variant === 'segmented') {
    return (
      <div className={`w-full overflow-x-auto no-scrollbar scroll-smooth flex py-1 ${className}`}>
        <div
          role="tablist"
          className="inline-flex items-center p-1 rounded-[10px] bg-[#f1f5f9] border border-[#e2e8f0] shrink-0 max-w-full"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                disabled={tab.disabled}
                onClick={() => onChange(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-40 select-none ${
                  isActive
                    ? 'bg-white text-[#0f172a] shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#eff6ff] text-[#2563eb]' : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div className={`w-full overflow-x-auto no-scrollbar scroll-smooth border-b border-[#e2e8f0] ${className}`}>
        <div role="tablist" className="flex items-center gap-4 sm:gap-6 shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                disabled={tab.disabled}
                onClick={() => onChange(tab.id)}
                className={`inline-flex items-center gap-2 pb-2.5 sm:pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-40 select-none ${
                  isActive
                    ? 'border-[#2563eb] text-[#2563eb]'
                    : 'border-transparent text-[#64748b] hover:text-[#0f172a] hover:border-[#cbd5e1]'
                }`}
              >
                {tab.icon && <span className="shrink-0">{tab.icon}</span>}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.2 sm:py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#eff6ff] text-[#2563eb]' : 'bg-[#f1f5f9] text-[#64748b]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: 'pills'
  return (
    <div className={`w-full overflow-x-auto no-scrollbar scroll-smooth py-1 ${className}`}>
      <div role="tablist" className="flex items-center gap-2 shrink-0 flex-nowrap">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-[8px] text-xs sm:text-sm font-semibold transition-all cursor-pointer border whitespace-nowrap shrink-0 disabled:opacity-40 select-none ${
                isActive
                  ? 'bg-[#2563eb] text-white border-[#2563eb] shadow-xs'
                  : 'bg-white text-[#475569] border-[#cbd5e1] hover:border-[#94a3b8] hover:text-[#0f172a]'
              }`}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#f1f5f9] text-[#64748b]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
