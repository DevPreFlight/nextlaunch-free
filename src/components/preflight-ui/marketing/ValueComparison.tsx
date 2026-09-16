'use client';

import React from 'react';
import { Button } from '../primitives/Button';

export interface ValueComparisonProps {
  onCtaClick?: () => void;
  className?: string;
}

const comparisonRows = [
  {
    feature: 'Time to Market',
    detail: 'From project initialization to first production deployment',
    scratch: '3 to 5 Weeks',
    preflight: 'Under 1 Day',
    winner: true,
  },
  {
    feature: 'Estimated Engineering Cost',
    detail: 'Based on standard developer market rates ($40/hr)',
    scratch: '$4,800 – $7,000+',
    preflight: 'From $19 – $79 (Pay Once)',
    winner: true,
  },
  {
    feature: 'Global Commerce & Payments',
    detail: 'Webhook sync, VAT calculation, customer billing portal',
    scratch: 'Manual API research & webhook debugging',
    preflight: 'Pre-configured SDK & Webhooks',
    winner: true,
  },
  {
    feature: 'Frontend UI & Accessibility',
    detail: 'Design tokens, dark mode, accessible widgets',
    scratch: 'Days spent polishing responsive layouts',
    preflight: 'Flat Modern White & Blue UI Ready',
    winner: true,
  },
  {
    feature: 'Maintenance & Framework Upgrades',
    detail: 'Handling future major library and framework shifts',
    scratch: 'Manual upstream updates forever',
    preflight: 'Lifetime Free Updates via GitHub',
    winner: true,
  },
];

export const ValueComparison: React.FC<ValueComparisonProps> = ({
  onCtaClick,
  className = '',
}) => {
  return (
    <section className={`py-12 sm:py-16 text-center ${className}`}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full">
            Efficiency &amp; ROI Analysis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-3 mb-2">
            Why Choose DevPreFlight Over Building from Scratch?
          </h2>
          <p className="text-sm sm:text-base text-[#64748b]">
            Focus on your core product value, not spending weeks rebuilding the exact same
            infrastructure plumbing for every project.
          </p>
        </div>

        {/* Card Comparison Box */}
        <div className="rounded-[14px] border border-[#cbd5e1] bg-white shadow-xs overflow-hidden text-left">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse">
              <thead>
                <tr className="border-b border-[#cbd5e1] text-xs sm:text-sm">
                  <th className="p-4 sm:p-5 font-bold text-[#0f172a] bg-[#f8fafc] w-[40%]">
                    Feature &amp; Infrastructure
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-[#64748b] bg-[#f8fafc] w-[30%] text-left">
                    Building from Scratch
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-[#1d4ed8] bg-[#eff6ff] border-l border-[#bfdbfe] w-[30%] text-left">
                    <span className="inline-block bg-[#2563eb] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-2">
                      Smart Choice
                    </span>
                    DevPreFlight
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0] text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8fafc]/50 transition-colors">
                    <td className="p-4 sm:p-5">
                      <strong className="block text-[#0f172a] font-semibold">{row.feature}</strong>
                      <span className="block text-xs text-[#64748b] mt-0.5">{row.detail}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-[#64748b]">
                      <span className="text-[#dc2626] font-extrabold mr-1.5">✕</span>
                      {row.scratch}
                    </td>
                    <td className="p-4 sm:p-5 bg-[#f8fbff] text-[#0f172a] border-l border-[#bfdbfe]/60">
                      <span className="text-[#16a34a] font-extrabold mr-1.5">✓</span>
                      <strong className="font-bold text-[#0f172a]">{row.preflight}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Banner */}
          <div className="p-4 sm:p-6 bg-[#f8fafc] border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <span className="text-2xl font-extrabold text-[#2563eb]">120+ Hours</span>
              <span className="text-xs sm:text-sm text-[#334155]">
                Valuable engineering time saved so you can focus on distribution and monetization.
              </span>
            </div>
            <Button variant="primary" size="md" onClick={onCtaClick} className="shrink-0 w-full sm:w-auto">
              Get Started with DevPreFlight
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
