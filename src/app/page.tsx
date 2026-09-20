'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  Database,
  CheckCircle2,
  Lock,
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Layers,
  Zap,
  Sparkles,
  FolderTree
} from 'lucide-react';

export default function FreeHomePage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const proFeatures = [
    {
      name: 'Stripe & Polar Multi-Billing',
      description: 'Dual subscription engine, checkout sessions, webhook handlers, customer portal, and invoice sync.',
      badge: 'Standard & Agency',
    },
    {
      name: 'Gemini AI Playground',
      description: 'Streaming multi-turn LLM chat agent, function calling tools, prompt templates, and rate limit guards.',
      badge: 'Standard & Agency',
    },
    {
      name: 'TOTP 2FA Security & Impersonation',
      description: 'RFC 6238 two-factor authentication, QR setup, recovery codes, and zero-trust admin impersonation.',
      badge: 'Standard & Agency',
    },
    {
      name: 'Standard Outgoing Webhooks',
      description: 'HMAC-SHA256 signature dispatch, exponential backoff retries, and delivery attempt logs.',
      badge: 'Standard & Agency',
    },
    {
      name: 'Audit Log Trail & CSV Export',
      description: 'Compliance event logging, actor attribution, metadata diffs, and streaming export downloads.',
      badge: 'Standard & Agency',
    },
    {
      name: 'Resend Transactional Emails',
      description: 'React Email templates for onboarding, magic links, invoices, password resets, and 2FA alerts.',
      badge: 'Standard & Agency',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navigation / Status Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              NL
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-base">NextLaunch</span>
              <span className="ml-2 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Community Edition (MIT)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Local Dev Server Online
            </div>

            <a
              href="https://devpreflight.com/products/nextlaunch-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Upgrade to Pro</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Cockpit Section */}
      <section className="relative overflow-hidden pt-10 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>Next.js 16 • React 19 • Flat UI Kit • Supabase Auth</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Developer Cockpit <span className="text-emerald-600">(Community Starter)</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Welcome to your NextLaunch Community workspace. You have the modern foundation ready for rapid full-stack SaaS prototyping: complete Flat UI component library, Supabase authentication setup, and Prisma PostgreSQL schema.
              </p>

              {/* Quick CLI Reference */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs border border-slate-800 shadow-md">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Quick Local Commands</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('npm run dev', 'cli-cmd')}
                    className="hover:text-white transition flex items-center gap-1 text-[11px]"
                  >
                    {copiedSnippet === 'cli-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'cli-cmd' ? 'Copied' : 'Copy dev command'}</span>
                  </button>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div><span className="text-emerald-400">$</span> npm run dev <span className="text-slate-500"># Start local server at localhost:3000</span></div>
                  <div><span className="text-emerald-400">$</span> npx prisma studio <span className="text-slate-500"># Launch visual database explorer</span></div>
                  <div><span className="text-emerald-400">$</span> npm run build <span className="text-slate-500"># Run Turbopack production build</span></div>
                </div>
              </div>
            </div>

            {/* Quick Status / Checklist Card */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h2 className="font-bold text-slate-900 text-base mb-4 flex items-center justify-between">
                <span>Setup Checklist</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700">4 Steps</span>
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">1. Dependencies Installed</p>
                    <p className="text-[11px] text-slate-500">Next.js 16 Turbopack & DevPreFlight UI Kit ready.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <div className="w-5 h-5 rounded-full border-2 border-amber-500 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-amber-600">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">2. Configure .env.local</p>
                    <p className="text-[11px] text-slate-500">Copy <code className="text-blue-600 font-bold">.env.example</code> to <code className="text-blue-600 font-bold">.env.local</code> and add database credentials.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-slate-500">
                    3
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">3. Initialize Database</p>
                    <p className="text-[11px] text-slate-500">Run <code className="text-blue-600 font-bold">npx prisma db push</code> to create user & workspace tables.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-slate-500">
                    4
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">4. Build Your Product</p>
                    <p className="text-[11px] text-slate-500">Customize UI components in <code className="text-blue-600 font-bold">src/components/preflight-ui/</code>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Included Free Subsystems */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Included in Free Community Edition
            </h2>
            <p className="text-sm text-slate-600">
              Core architectural foundations ready for your prototype without commercial restrictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">DevPreFlight Flat UI Kit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full access to buttons, inputs, modals, drawers, toasts, badges, and marketing grids with light/dark consistency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Supabase Auth Baseline</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-configured client and server auth helpers for email/password and OAuth provider sign-in workflows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-300 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Prisma 7 PostgreSQL ORM</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean PostgreSQL schema for Users, Accounts, Sessions, and Multi-Member Workspace relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Features Showcase / Upgrade Matrix */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NextLaunch Pro Capabilities</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Commercial Pro Upgrades (Standard & Agency)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Advanced backend subsystems included when upgrading to NextLaunch Pro.
              </p>
            </div>

            <a
              href="https://devpreflight.com/products/nextlaunch-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-sm self-start sm:self-auto"
            >
              <span>View NextLaunch Pro Editions</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proFeatures.map((feat, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden group hover:border-blue-300 transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                    {feat.badge}
                  </span>
                  <Lock className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{feat.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Codebase Tour for Free Edition */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-blue-600" />
              <span>Free Starter Codebase Structure</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="font-bold text-slate-900 text-sm font-sans mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>src/app/</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><code className="text-emerald-700 font-bold">layout.tsx</code>: Root App shell</li>
                <li><code className="text-emerald-700 font-bold">page.tsx</code>: Developer Cockpit</li>
                <li><code className="text-emerald-700 font-bold">api/auth/sessions/</code>: Session check</li>
                <li><code className="text-emerald-700 font-bold">api/og/</code>: Dynamic social image</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="font-bold text-slate-900 text-sm font-sans mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>src/components/preflight-ui/</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><code className="text-blue-600 font-bold">primitives/</code>: Buttons, Inputs, Switches</li>
                <li><code className="text-blue-600 font-bold">feedback/</code>: Modals, Drawers, Toast, Alerts</li>
                <li><code className="text-blue-600 font-bold">marketing/</code>: Feature grids, Hero sections</li>
                <li><code className="text-blue-600 font-bold">tokens/</code>: Design tokens & colors</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="font-bold text-slate-900 text-sm font-sans mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-600" />
                <span>prisma/ & src/lib/</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><code className="text-purple-600 font-bold">prisma/schema.prisma</code>: Postgres schema</li>
                <li><code className="text-purple-600 font-bold">src/lib/supabase/</code>: Auth helpers</li>
                <li><code className="text-purple-600 font-bold">src/lib/utils.ts</code>: Styling helpers</li>
                <li><code className="text-purple-600 font-bold">src/types/</code>: TypeScript interfaces</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 text-slate-600 text-xs border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              NL
            </div>
            <div>
              <p className="font-bold text-slate-900">NextLaunch Community Starter</p>
              <p className="text-slate-500">Built with DevPreFlight Flat UI & Next.js 16 App Router (MIT License).</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <a href="https://devpreflight.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              DevPreFlight
            </a>
            <a href="https://github.com/DevPreFlight/nextlaunch-free" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
              GitHub Repo
            </a>
            <a href="https://devpreflight.com/products/nextlaunch-pro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 font-bold text-blue-600 transition">
              Upgrade to Pro
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
