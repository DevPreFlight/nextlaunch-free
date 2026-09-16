'use client';

import React from 'react';

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
}

export interface ProductionReadyModulesProps {
  title?: string;
  modules?: ModuleItem[];
  includedTitle?: string;
  includedItems?: string[];
  className?: string;
}

const defaultModules: ModuleItem[] = [
  {
    id: 'commerce',
    title: 'Commerce UI Widgets',
    description: 'Pricing tables, checkout buttons, and discount code copy bars.',
  },
  {
    id: 'dashboard',
    title: 'Dashboard Controls',
    description: 'Stats metrics, data grids, modal drawers, and tab switchers.',
  },
  {
    id: 'marketing',
    title: 'Marketing Blocks',
    description: 'Clean hero sections, feature grids, and FAQ accordions.',
  },
];

const defaultIncluded: string[] = [
  '60+ copy-paste flat modern components in pure CSS / Tailwind',
  'Zero bulky dependencies: lightweight, accessible, and fast',
  'Pre-built pricing cards with checkout triggers',
  'Matching design token variables for instant color customization',
];

export const ProductionReadyModules: React.FC<ProductionReadyModulesProps> = ({
  title = 'Production-Ready Modules',
  modules = defaultModules,
  includedTitle = "What's Included in This Package:",
  includedItems = defaultIncluded,
  className = '',
}) => {
  return (
    <section className={`w-full text-left ${className}`}>
      {/* Top Section Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] tracking-tight mb-5">
        {title}
      </h2>

      {/* 2-column or 3-column Grid for Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="p-5 rounded-[12px] bg-white border border-[#e2e8f0] transition-all hover:border-[#bfdbfe] hover:shadow-xs"
          >
            <div className="flex items-start gap-3">
              {/* Modern Blue Check Icon */}
              <svg
                className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-base font-bold text-[#0f172a] mb-1">{mod.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{mod.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What's Included Section */}
      <div className="pt-2">
        <h3 className="text-lg font-bold text-[#0f172a] tracking-tight mb-4">
          {includedTitle}
        </h3>

        <ul className="space-y-3">
          {includedItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-[#334155]">
              <svg
                className="w-5 h-5 text-[#2563eb] shrink-0 mt-0.5 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-normal text-[#334155] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
