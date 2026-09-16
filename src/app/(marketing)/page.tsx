'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  CreditCard,
  Users,
  Database,
  Sparkles,
  Lock,
  Code2,
  Server,
  Layers,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Calculator
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hourlyRate, setHourlyRate] = useState(60);

  const triggerConfetti = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
  };

  const highlights = [
    {
      icon: CreditCard,
      title: 'Polar Payments & Subscriptions',
      desc: 'Hosted checkout sessions, cryptographic webhook signature verification, and edge customer portal redirects.',
    },
    {
      icon: Users,
      title: 'Multi-Tenant Workspaces & RBAC',
      desc: 'Invite team members with Owner, Admin, Member roles, workspace switcher, and isolated tenant data.',
    },
    {
      icon: Layers,
      title: '60+ PreFlight Flat UI Primitives',
      desc: 'Buttons, modals, data tables, sparklines, drawer overlays, and pricing matrices in modern flat white & blue.',
    },
    {
      icon: Database,
      title: 'Prisma ORM & Strict Types',
      desc: 'PostgreSQL, SQLite, MySQL support with zero `any` types and audited relational schemas.',
    },
    {
      icon: Zap,
      title: 'React 19 Server Actions',
      desc: 'Zero-boilerplate API routes. End-to-end type safety directly from forms and buttons to database mutations.',
    },
    {
      icon: Sparkles,
      title: 'AI-Native Agent Skills Included',
      desc: 'Pre-configured SKILL.md, .cursorrules, and CLAUDE.md to let AI agents build features for you autonomously.',
    },
  ];

  const faqs = [
    {
      q: 'What is NextLaunch Pro and who is it for?',
      a: 'NextLaunch Pro is an enterprise-grade full-stack boilerplate built on Next.js 16 (App Router), React 19, Polar Billing, and PreFlight Flat UI components. It is designed for founders, solo developers, and agencies who want to ship monetized SaaS products in hours without setting up auth, webhooks, or multi-tenancy from scratch.',
    },
    {
      q: 'How does the Polar Merchant of Record integration work?',
      a: 'Polar acts as the Merchant of Record, automatically handling global VAT/sales tax, EU compliance, and customer invoicing. NextLaunch includes pre-built checkout server actions, cryptographic webhook signature verification, and customer billing portal sessions.',
    },
    {
      q: 'Are the 60+ PreFlight Flat UI Kit components included?',
      a: 'Yes! NextLaunch Pro includes all 60+ PreFlight Flat UI Kit components (buttons, modals, drawers, data tables, pricing cards, and sparklines) directly in the source code.',
    },
    {
      q: 'Can I use NextLaunch for client commercial deliverables?',
      a: 'Yes! The commercial license allows unlimited personal and client SaaS projects with zero recurring royalties.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Top Banner: Double Promotion (NextLaunch + PreFlight UI Kit) */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white px-4 py-2 text-center text-xs font-medium shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="font-bold">✨ Dual Ecosystem Launch:</span>
          <span>NextLaunch Pro comes bundled with the full 60+ PreFlight Flat UI Component Kit!</span>
          <Link
            href="/ws_demo_cloud_01/ui-showcase"
            className="underline underline-offset-2 font-bold hover:text-blue-100 ml-1"
          >
            Explore Live UI Gallery →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Next.js 16 (Turbopack) • React 19 • Polar Subscriptions</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
              Ship your SaaS in hours,{' '}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy underline-offset-8">
                not months.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              The enterprise-grade full-stack boilerplate with Polar checkout, multi-tenant team workspaces, Prisma ORM, and 60+ pristine flat UI components.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                <span>Get NextLaunch Pro ($109)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ws_demo_cloud_01"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
              >
                <span>Explore Live Interactive Demo</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Quality Points */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Zero runtime bloat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Standard Webhooks Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span>60+ PreFlight UI Components</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span>Lifetime Updates</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Dashboard Preview */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl max-w-5xl mx-auto">
            <div className="rounded-xl border border-slate-200 bg-slate-900 text-white overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">app.yourdomain.com/ws_demo_cloud_01</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    Polar Webhook: Connected 200 OK
                  </span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900">
                <div className="rounded-lg border border-slate-800 bg-slate-800/60 p-4">
                  <p className="text-xs text-slate-400">Monthly Recurring Revenue (MRR)</p>
                  <p className="text-2xl font-bold text-white mt-1">$14,850.00</p>
                  <p className="text-xs text-emerald-400 mt-1">↑ +24.8% this month</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-800/60 p-4">
                  <p className="text-xs text-slate-400">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-white mt-1">512 Paying Teams</p>
                  <p className="text-xs text-blue-400 mt-1">Via Polar Merchant of Record</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-800/60 p-4">
                  <p className="text-xs text-slate-400">Database & Security</p>
                  <p className="text-2xl font-bold text-white mt-1">100% Type-Safe</p>
                  <p className="text-xs text-purple-400 mt-1">Prisma + Next.js 16 RSC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Section */}
      <section className="py-16 bg-blue-50/50 border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-800 px-3 py-0.5 text-xs font-bold">
            <Calculator className="h-3.5 w-3.5" />
            <span>ROI Calculator</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900">
            How Much Time & Money Does NextLaunch Save You?
          </h2>

          <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-sm max-w-2xl mx-auto space-y-6 text-left">
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
                <span>Your Hourly Developer Rate:</span>
                <span className="text-blue-600 text-sm font-mono">${hourlyRate} / hour</span>
              </div>
              <input
                type="range"
                min="30"
                max="200"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-center">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-500">Plumbing & Boilerplate Hours</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">140+ Hours</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Shipped instantly</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-xs text-blue-700 font-semibold">Total Cost Value Saved</p>
                <p className="text-2xl font-extrabold text-blue-600 mt-1">
                  ${(140 * hourlyRate).toLocaleString()}
                </p>
                <p className="text-[11px] text-blue-700">For a $109 one-time investment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Everything Included Out-of-the-Box
            </h2>
            <h3 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Engineered for Production Scale
            </h3>
            <p className="mt-3 text-base text-slate-600">
              Built with battle-tested patterns so you can launch your commercial SaaS with zero technical debt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-slate-900">{feat.title}</h4>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600">Got Questions?</h2>
            <h3 className="mt-2 text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-blue-600"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      openFaq === index ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Banner */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Start Building Your Next SaaS Today
          </h2>
          <p className="text-blue-100 text-base max-w-xl mx-auto">
            Get instant access to the full NextLaunch Pro source code, 60+ PreFlight Flat UI components, and lifetime updates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="rounded-xl bg-white px-6 py-3 text-base font-bold text-blue-600 shadow-md hover:bg-blue-50 transition-colors"
            >
              Get NextLaunch Pro ($109)
            </Link>
            <Link
              href="/ws_demo_cloud_01"
              className="rounded-xl border border-blue-400 bg-blue-700/50 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Launch Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
