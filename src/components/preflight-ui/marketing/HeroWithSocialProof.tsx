'use client';

import React from 'react';
import { Button } from '../primitives/Button';
import { Avatar, AvatarGroup } from '../primitives/Avatar';

export interface HeroWithSocialProofProps {
  onExplore?: () => void;
  onPricing?: () => void;
  className?: string;
}

export const HeroWithSocialProof: React.FC<HeroWithSocialProofProps> = ({
  onExplore,
  onPricing,
  className = '',
}) => {
  return (
    <section className={`w-full py-6 sm:py-12 md:py-20 text-center ${className}`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Rating & Avatar Stack */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-2 sm:p-1.5 px-3 sm:px-4 rounded-2xl sm:rounded-full bg-[#f8fafc] border border-[#e2e8f0] mb-5 sm:mb-6 max-w-full">
          <AvatarGroup max={4} size="xs">
            <Avatar name="Sarah Jenkins" />
            <Avatar name="David Chen" />
            <Avatar name="Elena Rostova" />
            <Avatar name="Marcus Miller" />
            <Avatar name="Kenji Sato" />
          </AvatarGroup>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#334155] font-semibold text-center flex-wrap justify-center">
            <div className="flex text-[#f59e0b] tracking-wider">★★★★★</div>
            <span>5.0 rating from 1,200+ SaaS builders</span>
          </div>
        </div>

        {/* Big Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-[1.15] mb-3 sm:mb-5 break-words">
          The Clean, Modern <br />
          <span className="text-[#2563eb]">Flat UI Component Kit</span>
        </h1>

        <p className="text-xs sm:text-base md:text-lg text-[#64748b] leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
          Speed up your web app development with 60+ battle-tested, copy-paste ready components.
          WCAG AAA compliant, zero runtime overhead, and includes <strong className="text-[#0f172a] font-semibold">SKILL.md</strong> for AI coding agents.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 w-full max-w-xs sm:max-w-none mx-auto">
          <Button
            variant="primary"
            size="md"
            onClick={onExplore}
            rightIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            }
          >
            Browse 60+ Components
          </Button>

          <Button variant="secondary" size="md" onClick={onPricing}>
            View Commercial Licenses
          </Button>
        </div>

        {/* Trust Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] text-center w-full">
          <div className="p-1 sm:p-2">
            <span className="text-lg sm:text-2xl font-extrabold text-[#0f172a] block">60+</span>
            <span className="text-[10px] sm:text-xs text-[#64748b] font-medium mt-0.5 block">UI Components</span>
          </div>
          <div className="p-1 sm:p-2">
            <span className="text-lg sm:text-2xl font-extrabold text-[#0f172a] block">0 kb</span>
            <span className="text-[10px] sm:text-xs text-[#64748b] font-medium mt-0.5 block">Bulky Dependencies</span>
          </div>
          <div className="p-1 sm:p-2">
            <span className="text-lg sm:text-2xl font-extrabold text-[#0f172a] block">100%</span>
            <span className="text-[10px] sm:text-xs text-[#64748b] font-medium mt-0.5 block">TypeScript Strict</span>
          </div>
          <div className="p-1 sm:p-2">
            <span className="text-lg sm:text-2xl font-extrabold text-[#2563eb] block">SKILL.md</span>
            <span className="text-[10px] sm:text-xs text-[#64748b] font-medium mt-0.5 block">AI-Agent Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};
