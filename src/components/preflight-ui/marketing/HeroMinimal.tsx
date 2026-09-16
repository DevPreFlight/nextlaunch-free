'use client';

import React from 'react';
import { Button } from '../primitives/Button';

export interface HeroMinimalProps {
  tag?: string;
  headline?: React.ReactNode;
  subheadline?: string;
  primaryCtaText?: string;
  onPrimaryCta?: () => void;
  secondaryCtaText?: string;
  onSecondaryCta?: () => void;
  className?: string;
}

export const HeroMinimal: React.FC<HeroMinimalProps> = ({
  tag = 'PREFLIGHT FLAT UI KIT 1.0',
  headline = (
    <>
      Ship High-Converting SaaS Interfaces <br className="hidden sm:inline" />
      <span className="text-[#2563eb]">In Minutes, Not Weeks.</span>
    </>
  ),
  subheadline = '60+ accessible, modular, and WCAG AAA compliant flat UI components built for React 19, Next.js, and TypeScript. Zero heavy bloated dependencies.',
  primaryCtaText = 'Explore All 60+ Components',
  onPrimaryCta,
  secondaryCtaText = 'Live Playground',
  onSecondaryCta,
  className = '',
}) => {
  return (
    <section className={`py-12 sm:py-20 text-center ${className}`}>
      <div className="max-w-3xl mx-auto px-4">
        {tag && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
            <span>{tag}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-5">
          {headline}
        </h1>

        <p className="text-base sm:text-lg text-[#64748b] leading-relaxed mb-8 max-w-2xl mx-auto">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={onPrimaryCta}
            rightIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            }
          >
            {primaryCtaText}
          </Button>

          <Button variant="secondary" size="lg" onClick={onSecondaryCta}>
            {secondaryCtaText}
          </Button>
        </div>
      </div>
    </section>
  );
};
