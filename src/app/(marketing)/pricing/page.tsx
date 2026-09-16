'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('yearly');

  const tiers = [
    {
      id: 'core',
      name: 'NextLaunch Core Kit',
      badge: 'Solo Founder',
      price: 69,
      originalPrice: 99,
      description: 'Essential Next.js 16, Polar billing, Auth, and Prisma setup for 1 project.',
      features: [
        'Next.js 16 App Router & React 19',
        'Polar Subscriptions & Webhook verifier',
        'Prisma ORM with PostgreSQL & SQLite',
        'Clean Flat Member Dashboard',
        'Supabase / Session Auth integration',
        'Single Commercial Project License',
        'Standard Lifetime Updates',
      ],
      ctaText: 'Get Core Kit ($69)',
      ctaUrl: 'https://buy.polar.sh/devpreflight-nextjs-core',
      popular: false,
    },
    {
      id: 'pro',
      name: 'NextLaunch Pro Mega Starter',
      badge: '👑 Most Popular & Full-Stack',
      price: 109,
      originalPrice: 169,
      description: 'The ultimate all-inclusive boilerplate with multi-tenancy, RBAC, and 60+ Flat UI components.',
      features: [
        'Everything in Core Kit',
        'Multi-Tenant Workspaces & Team Invitations',
        'Role-Based Access Control (Owner, Admin, Member)',
        'Full 60+ PreFlight Flat UI Component Kit',
        'AI Agent Skill recipes (SKILL.md & .cursorrules)',
        'MDX Blog & SEO Docs engine',
        'Transactional email engine (Resend)',
        'Unlimited Commercial & Client Projects',
        'Priority Founder Support & Lifetime Updates',
      ],
      ctaText: 'Get NextLaunch Pro ($109)',
      ctaUrl: 'https://buy.polar.sh/devpreflight-nextlaunch-pro',
      popular: true,
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
            <Sparkles className="h-3.5 w-3.5" />
            <span>One-time purchase • Zero recurring subscription fees</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Choose the starter that matches your scale. You get instant access to the full source code and lifetime updates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl bg-white p-8 transition-all flex flex-col justify-between ${
                tier.popular
                  ? 'border-2 border-blue-600 shadow-xl relative'
                  : 'border border-slate-200 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                  {!tier.popular && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-slate-500">{tier.description}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">${tier.price}</span>
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ${tier.originalPrice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Lifetime Access
                  </span>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    What's included
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href={tier.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-bold shadow-sm transition-all ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
                      : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-blue-800 font-bold text-sm mb-1">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>14-Day Money Back Guarantee</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
            If NextLaunch fails to meet the specifications listed or does not accelerate your product launch, contact us for an unconditional full refund.
          </p>
        </div>
      </div>
    </div>
  );
}
