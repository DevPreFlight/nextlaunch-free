'use client';

import React from 'react';
import { ComparisonFeatureRow } from '../types';

export interface TierComparisonTableProps {
  rows?: ComparisonFeatureRow[];
  className?: string;
}

const defaultRows: ComparisonFeatureRow[] = [
  {
    category: 'Core Components',
    feature: 'Buttons, Inputs, Badges, Tabs',
    description: 'Fundamental accessible primitives',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    category: 'Core Components',
    feature: 'Modal, Drawer, Toast, Tooltip',
    description: 'Focus-trapped overlay primitives',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    category: 'Dashboard & Data',
    feature: 'KPI Metric & Sparkline Cards',
    description: 'Trend badges and mini SVG charts',
    starter: 'Basic only',
    pro: true,
    enterprise: true,
  },
  {
    category: 'Dashboard & Data',
    feature: 'Data Tables with Sort & Filter',
    description: 'Full pagination & search input',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    category: 'Commerce & SaaS',
    feature: 'Pricing Cards & Matrix Switchers',
    description: 'Monthly/yearly discount toggle',
    starter: '1 Card',
    pro: 'Full Matrix',
    enterprise: 'Full Matrix + Custom',
  },
  {
    category: 'Commerce & SaaS',
    feature: 'Paywall Dialog & Promo Copy Bar',
    description: 'High-converting conversion blocks',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    category: 'Framework Support',
    feature: 'React 19 + TypeScript (Strict)',
    description: 'Zero-any strict types',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    category: 'Framework Support',
    feature: 'Next.js 15 App Router & RSC',
    description: 'Server & Client Component Architecture',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    category: 'Licensing & Updates',
    feature: 'Commercial Project License',
    starter: 'Single Project',
    pro: 'Unlimited Personal & Client',
    enterprise: 'Unlimited Enterprise Org',
  },
  {
    category: 'Licensing & Updates',
    feature: 'Lifetime GitHub Repository Updates',
    starter: '3 Months',
    pro: true,
    enterprise: true,
  },
];

export const TierComparisonTable: React.FC<TierComparisonTableProps> = ({
  rows = defaultRows,
  className = '',
}) => {
  const renderCell = (val: boolean | string) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
          <svg className="w-3.5 h-3.5 stroke-current stroke-[3] fill-none" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#f8fafc] text-[#94a3b8] border border-[#e2e8f0]">
          <svg className="w-3 h-3 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    }
    return <span className="text-xs font-semibold text-[#0f172a]">{val}</span>;
  };

  return (
    <div className={`w-full overflow-hidden rounded-[12px] border border-[#cbd5e1] bg-white shadow-xs ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#cbd5e1] bg-[#f8fafc]">
              <th className="p-4 sm:p-5 text-sm font-bold text-[#0f172a] w-[40%]">
                Feature Breakdown
              </th>
              <th className="p-4 sm:p-5 text-sm font-bold text-[#64748b] text-center w-[20%]">
                Starter
              </th>
              <th className="p-4 sm:p-5 text-sm font-bold text-[#2563eb] text-center w-[20%] bg-[#eff6ff] border-x border-[#bfdbfe]">
                Pro Bundle
              </th>
              <th className="p-4 sm:p-5 text-sm font-bold text-[#0f172a] text-center w-[20%]">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#f8fafc]/60 transition-colors">
                <td className="p-4 sm:p-5 text-left">
                  <span className="block text-sm font-semibold text-[#0f172a]">{row.feature}</span>
                  {row.description && (
                    <span className="block text-xs text-[#64748b] mt-0.5">{row.description}</span>
                  )}
                </td>
                <td className="p-4 sm:p-5 text-center">{renderCell(row.starter)}</td>
                <td className="p-4 sm:p-5 text-center bg-[#eff6ff]/30 border-x border-[#bfdbfe]/50">
                  {renderCell(row.pro)}
                </td>
                <td className="p-4 sm:p-5 text-center">{renderCell(row.enterprise)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
