'use client';

import React from 'react';
import { FeatureItem } from './FeaturesGrid3Col';

export interface FeaturesGrid4ColProps {
  title?: string;
  subtitle?: string;
  features?: FeatureItem[];
  className?: string;
}

const defaultFeatures4Col: FeatureItem[] = [
  {
    id: '1',
    title: 'Instant Copy-Paste',
    description: 'Each component is self-contained. Copy one file straight to your repo.',
  },
  {
    id: '2',
    title: 'Tailwind & Pure CSS',
    description: 'Zero external component framework lock-in or fragile abstraction layers.',
  },
  {
    id: '3',
    title: 'High-Converting Flow',
    description: 'Built specifically for SaaS monetization, auth gateways, and stats dashboards.',
  },
  {
    id: '4',
    title: 'Lifetime Free Updates',
    description: 'Get free repository additions, new blocks, and upgrades forever.',
  },
];

export const FeaturesGrid4Col: React.FC<FeaturesGrid4ColProps> = ({
  title = 'Modular by Architecture',
  subtitle = 'Everything you need to launch a world-class digital product.',
  features = defaultFeatures4Col,
  className = '',
}) => {
  return (
    <div className={`w-full text-left ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-bold text-[#0f172a] mb-1">{title}</h3>}
          {subtitle && <p className="text-sm text-[#64748b]">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-[12px] bg-white border border-[#cbd5e1] hover:border-[#2563eb] transition-all"
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] flex items-center justify-center font-bold text-xs mb-3">
              0{idx + 1}
            </div>
            <h4 className="font-bold text-sm text-[#0f172a] mb-1">{item.title}</h4>
            <p className="text-xs text-[#64748b] leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
