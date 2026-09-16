'use client';

import React from 'react';

export interface StepItem {
  step: string;
  title: string;
  description: string;
  codeSnippet?: string;
}

const defaultSteps: StepItem[] = [
  {
    step: '01',
    title: 'Browse & Choose Module',
    description: 'Explore 60+ components with live interactive props controls and mobile viewports.',
    codeSnippet: 'import { PricingMatrix } from "@/packages/react";',
  },
  {
    step: '02',
    title: 'Copy-Paste Into Project',
    description: 'Each component is self-contained. Copy clean TSX & Tailwind code into your Next.js project with one click.',
    codeSnippet: 'npx preflight-ui add pricing-matrix',
  },
  {
    step: '03',
    title: 'Ship & Collect Payments',
    description: 'Connect your payment gateway or checkout triggers and launch to your customers immediately.',
    codeSnippet: '<PricingMatrix onSelectTier={(tier) => openCheckout(tier)} />',
  },
];

export const HowItWorksSteps: React.FC<{ steps?: StepItem[]; className?: string }> = ({
  steps = defaultSteps,
  className = '',
}) => {
  return (
    <section className={`py-12 sm:py-16 text-center ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full">
            3-STEP WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-3 mb-2">
            How DevPreFlight UI Kit Works
          </h2>
          <p className="text-sm sm:text-base text-[#64748b]">
            No complex package configurations or npm lock-ins. Pure developer freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[14px] bg-white border border-[#e2e8f0] hover:border-[#bfdbfe] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold text-[#2563eb] block mb-3 font-mono">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-[#0f172a] mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {step.codeSnippet && (
                <div className="p-2.5 rounded-[8px] bg-[#0f172a] text-[#93c5fd] font-mono text-[11px] overflow-x-auto">
                  <code>{step.codeSnippet}</code>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
