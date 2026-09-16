'use client';

import React from 'react';
import { PricingTier } from '../types';
import { Button } from '../primitives/Button';

export interface PricingCardProps {
  tier: PricingTier;
  billingPeriod?: 'monthly' | 'yearly';
  onSelectTier?: (tier: PricingTier) => void;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  billingPeriod = 'yearly',
  onSelectTier,
  className = '',
}) => {
  const isYearly = billingPeriod === 'yearly';
  const price = isYearly ? tier.priceYearly : tier.priceMonthly;
  const originalPrice = isYearly ? tier.originalPriceYearly : tier.originalPriceMonthly;

  const tierBorderClasses = {
    1: 'border-t-[3px] border-t-[#64748b]',
    2: 'border-t-[3px] border-t-[#0284c7]',
    3: 'border-t-[3px] border-t-[#2563eb]',
  }[tier.tierNumber];

  return (
    <div
      className={`relative flex flex-col justify-between h-full bg-white rounded-[14px] border border-[#e2e8f0] p-4 sm:p-6 md:p-7 transition-all duration-200 hover:border-[#93c5fd] hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] ${tierBorderClasses} ${
        tier.popular ? 'ring-2 ring-[#2563eb] shadow-md' : ''
      } ${className}`}
    >
      {/* Top Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]">
          Tier {tier.tierNumber}: {tier.title}
        </span>
        {tier.popular && (
          <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]">
            Most Popular
          </span>
        )}
      </div>

      {/* Header Info */}
      <div className="mb-4 sm:mb-5 text-left">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0f172a] tracking-tight mb-1">
          {tier.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">{tier.tagline}</p>
      </div>

      {/* Price Display */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-[10px] bg-[#f8fafc] border border-[#f1f5f9] text-left">
        <div className="flex items-baseline gap-1">
          <span className="text-lg sm:text-xl font-bold text-[#0f172a]">$</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">{price}</span>
          {originalPrice && (
            <span className="text-xs sm:text-sm font-medium text-[#94a3b8] line-through ml-1.5">
              ${originalPrice}
            </span>
          )}
          <span className="text-xs text-[#64748b] ml-1 font-medium">
            /{isYearly ? 'yr' : 'mo'}
          </span>
        </div>
        <span className="block text-[10px] sm:text-[11px] text-[#64748b] mt-1 font-medium">
          {isYearly ? 'Billed annually • Save 20%' : 'Billed monthly • Cancel anytime'}
        </span>
      </div>

      {/* Highlights / Features list */}
      <div className="mb-5 sm:mb-6 flex-1 text-left">
        <p className="text-[10px] sm:text-xs font-bold text-[#334155] uppercase tracking-wider mb-2.5 sm:mb-3">
          What&apos;s included:
        </p>
        <ul className="space-y-2 sm:space-y-2.5 text-left">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#334155]">
              {feature.included ? (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb] shrink-0 mt-0.5 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#94a3b8] shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className={feature.highlight ? 'font-semibold text-[#0f172a]' : ''}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics Row if available */}
      {tier.metrics && (
        <div className="mb-4 sm:mb-6 grid grid-cols-2 gap-2 p-2 sm:p-2.5 rounded-[8px] bg-[#f8fafc] border border-[#f1f5f9] text-left">
          <div className="text-[10px] sm:text-[11px] text-[#475569]">
            <span className="block font-bold text-[#0f172a]">{tier.metrics.setupTime}</span>
            Setup time
          </div>
          <div className="text-[10px] sm:text-[11px] text-[#475569]">
            <span className="block font-bold text-[#0f172a]">{tier.metrics.linesOfCode}</span>
            Clean code
          </div>
        </div>
      )}

      {/* CTA Button */}
      <Button
        variant={tier.popular ? 'primary' : 'secondary'}
        fullWidth
        onClick={() => onSelectTier?.(tier)}
        rightIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        }
      >
        {tier.ctaText || 'Get Started Now'}
      </Button>
    </div>
  );
};
