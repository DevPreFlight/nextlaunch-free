'use client';

import React, { useState } from 'react';
import { PricingTier } from '../types';
import { PricingCard } from './PricingCard';

export interface PricingMatrixProps {
  tiers?: PricingTier[];
  title?: string;
  subtitle?: string;
  onSelectTier?: (tier: PricingTier) => void;
  className?: string;
}

const defaultTiers: PricingTier[] = [
  {
    id: 'standard',
    tierNumber: 1,
    title: 'Standard Commercial License',
    tagline: 'Ideal for indie hackers, solo creators, and single commercial SaaS projects.',
    priceMonthly: 29,
    priceYearly: 29,
    originalPriceMonthly: 29,
    originalPriceYearly: 29,
    popular: false,
    badge: 'Indie / Solo Dev',
    features: [
      { text: '1 Developer Seat / Creator', included: true, highlight: true },
      { text: '1 Commercial SaaS or Client Deliverable', included: true, highlight: true },
      { text: 'SKILL.md AI Agent Guide included (Claude, Cursor, Antigravity)', included: true, highlight: true },
      { text: '60+ Modern Flat React 19 UI components', included: true },
      { text: 'Next.js 16 App Router & Strict TypeScript', included: true },
      { text: 'Tailwind CSS design tokens & CSS presets', included: true },
      { text: 'WCAG AAA Accessibility compliant', included: true },
      { text: 'Lifetime access & free updates via GitHub', included: true },
      { text: 'Multi-seat team use & client transfer rights', included: false },
      { text: 'Unlimited commercial client projects', included: false },
    ],
    metrics: { setupTime: '< 5 mins', linesOfCode: '8,500+ LoC' },
    ctaText: 'Get Standard License',
  },
  {
    id: 'agency',
    tierNumber: 2,
    title: 'Agency & Team License',
    tagline: 'For dev studios, software agencies, and teams building unlimited client apps.',
    priceMonthly: 79,
    priceYearly: 79,
    originalPriceMonthly: 79,
    originalPriceYearly: 79,
    popular: true,
    badge: 'Best for Teams & Agencies',
    features: [
      { text: 'Unlimited Team Developers & Designers', included: true, highlight: true },
      { text: 'Unlimited Commercial Client Deliverables', included: true, highlight: true },
      { text: 'Unlimited Internal Commercial SaaS Products', included: true, highlight: true },
      { text: 'Deploy & Transfer Compiled Deliverables to Clients', included: true, highlight: true },
      { text: 'SKILL.md AI Agent Workflows & Prompt Guides', included: true, highlight: true },
      { text: '60+ Modern Flat React 19 UI components', included: true },
      { text: 'Next.js 16 App Router & Strict TypeScript', included: true },
      { text: 'Tailwind CSS design tokens & CSS presets', included: true },
      { text: 'Priority GitHub repository access & updates', included: true },
      { text: 'Commercial lifetime license for your whole team', included: true, highlight: true },
    ],
    metrics: { setupTime: 'Instant', linesOfCode: '8,500+ LoC' },
    ctaText: 'Get Agency License',
  },
];

export const PricingMatrix: React.FC<PricingMatrixProps> = ({
  tiers = defaultTiers,
  title = 'Predictable, Transparent Pricing',
  subtitle = 'Invest once, own forever. No monthly lock-in or recurring bloat.',
  onSelectTier,
  className = '',
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const gridClass =
    tiers.length === 2
      ? '@min-[680px]:grid-cols-2 max-w-4xl'
      : tiers.length === 1
      ? 'max-w-md'
      : '@min-[680px]:grid-cols-3 max-w-6xl';

  return (
    <section className={`@container w-full py-4 sm:py-8 text-center ${className}`}>
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block">
          Simple Pricing
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-2.5 sm:mt-3 mb-1.5 sm:mb-2 break-words">
          {title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#64748b] leading-relaxed">{subtitle}</p>

        {/* Toggle Billing Period Switcher */}
        <div className="mt-4 sm:mt-6 inline-flex flex-nowrap items-center justify-center p-1 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] max-w-full select-none">
          <button
            type="button"
            onClick={() => setBillingPeriod('monthly')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              billingPeriod === 'monthly'
                ? 'bg-white text-[#0f172a] shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod('yearly')}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              billingPeriod === 'yearly'
                ? 'bg-[#2563eb] text-white shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a]'
            }`}
          >
            <span>Yearly</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                billingPeriod === 'yearly' ? 'bg-white/20 text-white' : 'bg-[#dbeafe] text-[#1d4ed8]'
              }`}
            >
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Dynamic Grid of Cards */}
      <div className={`grid grid-cols-1 ${gridClass} gap-4 sm:gap-6 mx-auto items-stretch w-full`}>
        {tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            billingPeriod={billingPeriod}
            onSelectTier={onSelectTier}
          />
        ))}
      </div>
    </section>
  );
};
