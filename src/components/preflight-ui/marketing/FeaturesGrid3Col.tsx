'use client';

import React from 'react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  features?: FeatureItem[];
  className?: string;
}

const defaultFeatures3Col: FeatureItem[] = [
  {
    id: '1',
    title: 'Zero Bulky Dependencies',
    description: 'Built with pure CSS variables and Tailwind CSS. No bloated third-party UI libraries dragging down your bundle.',
    badge: 'Lightweight',
  },
  {
    id: '2',
    title: 'WCAG AAA Accessibility',
    description: 'High color contrast, full ARIA semantics, focus trapping, and keyboard navigation tested out of the box.',
    badge: 'Accessible',
  },
  {
    id: '3',
    title: 'React 19 & Next.js 15 Ready',
    description: '100% strict TypeScript types with clean Next.js App Router support and Tailwind CSS styling.',
    badge: 'Modular',
  },
  {
    id: '4',
    title: 'High-Converting Commerce',
    description: 'Pre-built pricing cards, paywall dialogs, checkout summary cards, and 1-click discount copy bars.',
    badge: 'Monetize',
  },
  {
    id: '5',
    title: 'Dashboard Controls',
    description: 'Interactive sortable data tables, stats sparklines, tab switchers, and filter search bars.',
    badge: 'Analytics',
  },
  {
    id: '6',
    title: 'Commercial Lifetime License',
    description: 'Use across unlimited personal and client commercial projects without recurring subscription fees.',
    badge: 'Ownership',
  },
];

export const FeaturesGrid3Col: React.FC<FeaturesGridProps> = ({
  tag = 'ENGINEERED FOR VELOCITY',
  title = 'Why Builders Choose DevPreFlight Flat UI',
  subtitle = 'Crafted meticulously to give indie makers, startups, and agencies an unfair shipping advantage.',
  features = defaultFeatures3Col,
  className = '',
}) => {
  return (
    <section className={`w-full py-6 sm:py-12 md:py-16 text-center ${className}`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          {tag && (
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
              {tag}
            </span>
          )}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-2.5 sm:mt-3 mb-1.5 sm:mb-2 break-words">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#64748b] leading-relaxed">{subtitle}</p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 text-left w-full">
          {features.map((feature, idx) => (
            <div
              key={feature.id || idx}
              className="p-4 sm:p-6 rounded-[12px] sm:rounded-[14px] bg-white border border-[#e2e8f0] hover:border-[#bfdbfe] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] flex items-center justify-center font-bold shrink-0">
                    {feature.icon || (
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {feature.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] shrink-0">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
