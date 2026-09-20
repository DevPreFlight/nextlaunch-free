'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Webhook,
  KeyRound,
  CreditCard,
  Cpu,
  Database,
  CheckCircle2,
  FileSpreadsheet,
  Lock,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  Terminal,
  ExternalLink,
  ChevronDown,
  Layers,
  Code2,
  Zap,
  Users,
  Building2,
  RefreshCw,
  Server,
  Sparkles,
  CheckCheck,
  X
} from 'lucide-react';

export default function HomePage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeCliTab, setActiveCliTab] = useState<'npx' | 'pnpm' | 'bun'>('npx');
  const [activeSandboxTab, setActiveSandboxTab] = useState<'billing' | 'webhooks' | 'audit' | 'totp'>('billing');
  const [billingProvider, setBillingProvider] = useState<'stripe' | 'polar'>('stripe');
  const [totpCode, setTotpCode] = useState('849201');
  const [webhookPayloadEvent, setWebhookPayloadEvent] = useState('subscription.created');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const cliCommands = {
    npx: 'npx @devpreflight/nextlaunch init my-saas-app',
    pnpm: 'pnpm dlx @devpreflight/nextlaunch init my-saas-app',
    bun: 'bunx @devpreflight/nextlaunch init my-saas-app',
  };

  const coreModules = [
    {
      id: 'billing',
      icon: CreditCard,
      title: 'Dual Billing Engine',
      subtitle: 'Stripe Subscriptions & Polar.sh MoR',
      description: 'Zero-lock-in payment architecture with unified customer portal, webhook reconciliation, and subscription state machines.',
      badge: 'Stripe + Polar',
      tag: 'Monetization',
      metrics: '2 Providers Built-in',
    },
    {
      id: 'webhooks',
      icon: Webhook,
      title: 'Outgoing Webhooks Engine',
      subtitle: 'Standard Webhooks v1 (HMAC-SHA256)',
      description: 'Enterprise webhook dispatching engine with cryptographic signatures, fan-out event distribution, and automatic retry queues.',
      badge: 'HMAC-SHA256',
      tag: 'Infrastructure',
      metrics: '5 Automatic Retries',
    },
    {
      id: 'audit',
      icon: FileSpreadsheet,
      title: 'Audit Logs & Compliance Trail',
      subtitle: 'Actor attribution & diff snapshots',
      description: 'Comprehensive audit trail system tracking actor ID, IP origin, state diff metadata, and one-click compliance CSV/JSON exports.',
      badge: 'Enterprise Log',
      tag: 'Security',
      metrics: 'CSV / JSON Export',
    },
    {
      id: 'totp',
      icon: Lock,
      title: '2FA TOTP & Session Revocation',
      subtitle: 'RFC 6238 Authenticator & Recovery Codes',
      description: 'Two-factor authentication with 8-digit hashed backup recovery codes, active session telemetry, and remote device revocation.',
      badge: 'RFC 6238 Compliant',
      tag: 'Security',
      metrics: '8 Backup Codes',
    },
    {
      id: 'apikeys',
      icon: KeyRound,
      title: 'Cryptographic API Key Manager',
      subtitle: 'SHA-256 hashed secret keys (nl_live_...)',
      description: 'Scoped API key generation with fast prefix indexing, cryptographic hashing, and automated last-used timestamp telemetry.',
      badge: 'SHA-256 Hashed',
      tag: 'Developer Platform',
      metrics: 'Prefix Fast-Lookup',
    },
    {
      id: 'rbac',
      icon: ShieldCheck,
      title: 'Multi-Tenant RBAC & Guards',
      subtitle: 'Cookie sessions & role enforcement',
      description: 'Strict hierarchical access control (OWNER, ADMIN, MEMBER, VIEWER) protecting Server Actions and API endpoints.',
      badge: 'Zero-Trust RBAC',
      tag: 'Auth & Teams',
      metrics: '4 Strict Roles',
    },
    {
      id: 'ai',
      icon: Cpu,
      title: 'Gemini GenAI 2.x Copilot',
      subtitle: 'Streaming LLM workflows & structured JSON',
      description: 'Google GenAI SDK 2.x integration with prompt token tracking, streaming responses, and schema-validated structured output.',
      badge: 'Gemini 2.x SDK',
      tag: 'AI Workflows',
      metrics: 'Streaming Tokens',
    },
    {
      id: 'database',
      icon: Database,
      title: 'Prisma 6 & PostgreSQL',
      subtitle: 'Multi-tenant relational data models',
      description: 'Production-ready database migrations, type-safe queries, transactional atomicity, and workspace isolation.',
      badge: 'PostgreSQL Ready',
      tag: 'Persistence',
      metrics: 'Type-Safe ORM',
    },
  ];

  const tiers = [
    {
      name: 'Free Community',
      subtitle: 'Open Source Starter',
      price: '$0',
      period: 'Forever (MIT)',
      description: 'Essential full-stack foundation for solo developers and open-source hobby projects.',
      features: [
        'Next.js 16 App Router & Turbopack',
        'React 19 Server Actions architecture',
        'DevPreFlight Flat UI Component Kit',
        'Supabase Auth (Email / Password, OAuth)',
        'Mobile-first responsive layouts',
        'Cursor & Claude AI agent instructions',
        'Standard community support',
      ],
      ctaText: 'Use Free Community',
      ctaHref: 'https://github.com/DevPreFlight/nextlaunch-free',
      isPopular: false,
      badge: 'MIT Open Source',
    },
    {
      name: 'Standard Pro',
      subtitle: 'Production SaaS Boilerplate',
      price: '$99',
      period: 'one-time payment',
      description: 'Complete commercial SaaS backend engine with dual billing, security, and AI integrations.',
      features: [
        'Everything in Free Community, plus:',
        'Dual Billing Engine (Stripe + Polar MoR)',
        'Standard Webhooks Engine (HMAC-SHA256)',
        'Enterprise Audit Trail & CSV Export',
        '2FA TOTP & Session Revocation Manager',
        'Cryptographic API Key Management',
        'Gemini GenAI 2.x Copilot integration',
        'Prisma 6 PostgreSQL database schema',
        'Single commercial product license',
      ],
      ctaText: 'Get Standard Edition',
      ctaHref: 'https://devpreflight.com/nextlaunch',
      isPopular: true,
      badge: 'Most Popular for Founders',
    },
    {
      name: 'Agency & Unlimited',
      subtitle: 'Unlimited Commercial Work',
      price: '$199',
      period: 'one-time payment',
      description: 'Full source rights for SaaS studios, agencies, and prolific founders building multiple ventures.',
      features: [
        'Everything in Standard Pro, plus:',
        'Unlimited client & commercial projects',
        'Multi-tenant workspace isolation engine',
        'Customer impersonation banner & tools',
        'Custom webhook worker templates',
        'Priority updates & future module releases',
        'Dedicated founder Discord channel',
        'Full commercial redistribution for clients',
      ],
      ctaText: 'Get Agency Edition',
      ctaHref: 'https://devpreflight.com/nextlaunch',
      isPopular: false,
      badge: 'Unlimited Projects',
    },
  ];

  const faqItems = [
    {
      question: 'How is NextLaunch different from generic Next.js boilerplates?',
      answer: 'NextLaunch is engineered as a zero-bloat backend engine paired with the DevPreFlight Flat UI kit. Rather than bloated opinionated mockups, NextLaunch provides real, verified modules: RFC 6238 TOTP 2FA, Standard Webhooks signing with exponential backoffs, cryptographic SHA-256 API key management, dual Stripe and Polar.sh billing, and Gemini AI 2.x streaming with 49 unit tests.',
    },
    {
      question: 'What is the difference between Stripe and Polar.sh in NextLaunch?',
      answer: 'NextLaunch includes native multi-provider billing adapters. You can use Stripe for traditional merchant account billing or Polar.sh as a Merchant of Record (MoR) to handle global VAT/sales taxes automatically. Switching between them or supporting both requires zero architectural refactoring.',
    },
    {
      question: 'Is the Free Community Edition really free for commercial use?',
      answer: 'Yes! The Free Community Edition is licensed under the permissive MIT License. You can clone it, modify it, and ship production projects with it. For enterprise modules like Dual Billing, Webhooks Engine, 2FA, Audit Logs, and Gemini AI, you can upgrade to Standard or Agency.',
    },
    {
      question: 'How do I scaffold a project using the CLI?',
      answer: 'Simply run "npx @devpreflight/nextlaunch init my-saas" in your terminal. The interactive wizard will let you choose your edition (Free, Standard, or Agency), configure your environment, and set up your project in seconds.',
    },
    {
      question: 'Does NextLaunch support Next.js 16 and React 19?',
      answer: 'Yes, NextLaunch is built from the ground up for Next.js 16 App Router with Turbopack and React 19. It uses modern Server Actions, type-safe route handlers, and Tailwind CSS.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs font-medium flex items-center justify-between border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-600/30 text-blue-300 font-mono text-[10px] border border-blue-500/40">
              v1.0.0 Stable
            </span>
            <span className="text-slate-300 hidden sm:inline">
              Production Full-Stack SaaS Engine with Next.js 16, React 19 & DevPreFlight Flat UI
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link
              href="https://github.com/DevPreFlight/nextlaunch-free"
              target="_blank"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>GitHub (MIT)</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/admin" className="text-blue-400 hover:text-blue-300 transition-colors font-mono">
              Admin Portal →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                NL
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900 leading-tight">NextLaunch</span>
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                  DevPreFlight Engine
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">
                Modules
              </a>
              <a href="#sandbox" className="hover:text-blue-600 transition-colors">
                Interactive Sandbox
              </a>
              <a href="#tiers" className="hover:text-blue-600 transition-colors">
                Editions & Pricing
              </a>
              <a href="#quickstart" className="hover:text-blue-600 transition-colors">
                CLI Quickstart
              </a>
              <a href="#faq" className="hover:text-blue-600 transition-colors">
                FAQ
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              <Server className="w-3.5 h-3.5 text-slate-500" />
              <span>Live Admin Demo</span>
            </Link>
            <a
              href="#tiers"
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Get NextLaunch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Crafted for Next.js 16 App Router & React 19</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              The Production-Grade Full-Stack SaaS Engine.
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              Ship with enterprise confidence. NextLaunch delivers verified dual Stripe & Polar multi-billing, Standard Webhooks signing, cryptographic SHA-256 API keys, 2FA TOTP security, and DevPreFlight Flat UI components—with zero fluff.
            </p>

            {/* Interactive CLI Scaffolder Snippet */}
            <div className="mt-8 p-3 sm:p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 shadow-sm max-w-xl">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveCliTab('npx')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeCliTab === 'npx' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    npx
                  </button>
                  <button
                    onClick={() => setActiveCliTab('pnpm')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeCliTab === 'pnpm' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    pnpm
                  </button>
                  <button
                    onClick={() => setActiveCliTab('bun')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeCliTab === 'bun' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    bun
                  </button>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Scaffold in 5 seconds</span>
              </div>

              <div className="flex items-center justify-between gap-3 font-mono text-xs sm:text-sm py-1 px-1">
                <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
                  <span className="text-blue-400 select-none">❯</span>
                  <span>{cliCommands[activeCliTab]}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCommands[activeCliTab], 'hero-cli')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors shrink-0"
                  aria-label="Copy CLI command"
                >
                  {copiedCmd === 'hero-cli' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-sans font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-sans font-medium">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CTA Button Group */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#sandbox"
                className="px-5 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm flex items-center gap-2"
              >
                <span>Test Live Interactive Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/admin"
                className="px-5 py-3 rounded-lg text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 active:scale-[0.99] transition-all flex items-center gap-2"
              >
                <Server className="w-4 h-4 text-slate-600" />
                <span>Open Admin Portal</span>
              </Link>
            </div>

            {/* Proof Badges */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>49 Unit Tests Passing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>RFC 6238 TOTP Standard</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Standard Webhooks v1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Stripe + Polar MoR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Sandbox Section */}
      <section id="sandbox" className="py-16 sm:py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold mb-3">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              <span>Real Architecture Playground</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Test Core Backend Modules in Real-Time
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Interact with live simulated states for billing reconciliation, webhook HMAC signatures, audit trails, and TOTP authentication.
            </p>
          </div>

          {/* Sandbox Component Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex flex-wrap border-b border-slate-200 bg-slate-100/70 p-2 gap-1.5">
              <button
                onClick={() => setActiveSandboxTab('billing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSandboxTab === 'billing'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>1. Dual Billing (Stripe vs Polar)</span>
              </button>

              <button
                onClick={() => setActiveSandboxTab('webhooks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSandboxTab === 'webhooks'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Webhook className="w-4 h-4" />
                <span>2. Outgoing Webhooks & HMAC</span>
              </button>

              <button
                onClick={() => setActiveSandboxTab('audit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSandboxTab === 'audit'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>3. Audit Logs & Diff Trail</span>
              </button>

              <button
                onClick={() => setActiveSandboxTab('totp')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSandboxTab === 'totp'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>4. 2FA TOTP & Recovery</span>
              </button>
            </div>

            {/* Tab 1 Content: Dual Billing */}
            {activeSandboxTab === 'billing' && (
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Unified Billing Provider Adapter</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Toggle between Stripe for direct payment processing or Polar.sh as a Merchant of Record (handling global tax).
                    </p>
                  </div>
                  <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200">
                    <button
                      onClick={() => setBillingProvider('stripe')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                        billingProvider === 'stripe' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Stripe Subscriptions
                    </button>
                    <button
                      onClick={() => setBillingProvider('polar')}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                        billingProvider === 'polar' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Polar.sh MoR
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider">
                      Active Adapter Configuration
                    </span>
                    <div className="mt-4 space-y-3 font-mono text-xs">
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Provider:</span>
                        <span className="font-bold text-slate-800 uppercase">{billingProvider}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Tax Mode:</span>
                        <span className="font-semibold text-slate-800">
                          {billingProvider === 'polar' ? 'Automated MoR (Global VAT/Sales Tax)' : 'Stripe Tax / Direct'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-200">
                        <span className="text-slate-500">Webhook Handler:</span>
                        <code className="text-blue-600">/api/webhooks/{billingProvider}</code>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-slate-500">Sync Strategy:</span>
                        <span className="text-emerald-700 font-semibold">Idempotent DB Upsert</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
                      <span>Mock Customer Portal Response</span>
                      <span className="text-emerald-400">200 OK</span>
                    </div>
                    <pre className="text-slate-300 leading-relaxed">
{JSON.stringify(
  {
    provider: billingProvider,
    customerId: `${billingProvider === 'stripe' ? 'cus_test_92k1' : 'usr_pol_88aa'}`,
    status: 'active',
    plan: 'Pro Tier ($29/mo)',
    currentPeriodEnd: '2026-10-21T00:00:00.000Z',
    cancelAtPeriodEnd: false,
  },
  null,
  2
)}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2 Content: Webhooks & HMAC */}
            {activeSandboxTab === 'webhooks' && (
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Standard Webhooks Signing Simulator</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Generates standard HMAC-SHA256 headers (<code className="text-blue-600 font-mono">webhook-signature: v1,t=...</code>) compliant with Standard Webhooks specification.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={webhookPayloadEvent}
                      onChange={(e) => setWebhookPayloadEvent(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="subscription.created">Event: subscription.created</option>
                      <option value="subscription.updated">Event: subscription.updated</option>
                      <option value="invoice.payment_succeeded">Event: invoice.payment_succeeded</option>
                      <option value="user.2fa_enabled">Event: user.2fa_enabled</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                    <span className="text-slate-400 block mb-1">Standard Webhooks Outgoing Headers:</span>
                    <div className="text-blue-300 space-y-1">
                      <div>webhook-id: <span className="text-emerald-400">msg_2tK9X8m10pQ</span></div>
                      <div>webhook-timestamp: <span className="text-emerald-400">1789926000</span></div>
                      <div className="break-all">webhook-signature: <span className="text-emerald-400">v1,g0hM2k9X7+v8aLk1pQmNoP...=</span></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        200
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Destination Endpoint: https://api.customer.io/webhooks</div>
                        <div className="text-[11px] text-slate-500 font-mono">Latency: 42ms • Signature Verified ✓</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Delivered (Attempt 1)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3 Content: Audit Logs */}
            {activeSandboxTab === 'audit' && (
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Enterprise Audit Log Stream</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Every sensitive action is cryptographically recorded with actor attribution and metadata snapshot.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Simulated CSV export download triggered for compliance audit.')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
                    <span>Export CSV Sample</span>
                  </button>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-2 font-semibold">Timestamp</th>
                        <th className="pb-2 font-semibold">Action</th>
                        <th className="pb-2 font-semibold">Actor</th>
                        <th className="pb-2 font-semibold">IP Address</th>
                        <th className="pb-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 text-slate-500">Just now</td>
                        <td className="py-2.5 font-bold text-slate-800">auth.2fa.enable</td>
                        <td className="py-2.5 text-blue-600">user_rhaka_adm</td>
                        <td className="py-2.5 text-slate-600">103.144.17.20</td>
                        <td className="py-2.5 text-emerald-600 font-semibold">SUCCESS</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-slate-500">2 mins ago</td>
                        <td className="py-2.5 font-bold text-slate-800">api_key.create</td>
                        <td className="py-2.5 text-blue-600">user_rhaka_adm</td>
                        <td className="py-2.5 text-slate-600">103.144.17.20</td>
                        <td className="py-2.5 text-emerald-600 font-semibold">SUCCESS</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-slate-500">15 mins ago</td>
                        <td className="py-2.5 font-bold text-slate-800">billing.subscription.create</td>
                        <td className="py-2.5 text-blue-600">system_webhook</td>
                        <td className="py-2.5 text-slate-600">35.184.22.10</td>
                        <td className="py-2.5 text-emerald-600 font-semibold">SUCCESS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 4 Content: 2FA TOTP */}
            {activeSandboxTab === 'totp' && (
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">RFC 6238 TOTP Engine & Backup Codes</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Industry standard HMAC-based one-time password authenticator integration with backup recovery array.
                    </p>
                  </div>
                  <button
                    onClick={() => setTotpCode(Math.floor(100000 + Math.random() * 900000).toString())}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Generate New OTP Token</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                      Current Authenticator Code
                    </span>
                    <div className="text-4xl font-extrabold font-mono text-blue-600 tracking-widest my-3">
                      {totpCode}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Window interval: 30s • Valid ±1 step
                    </span>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-700 font-mono block mb-2">
                      8-Digit Hashed Backup Recovery Codes
                    </span>
                    <div className="grid grid-cols-2 gap-2 font-mono text-xs text-slate-600">
                      <div className="p-2 rounded bg-white border border-slate-200 text-center">8472-9104</div>
                      <div className="p-2 rounded bg-white border border-slate-200 text-center">1938-4420</div>
                      <div className="p-2 rounded bg-white border border-slate-200 text-center">5092-1183</div>
                      <div className="p-2 rounded bg-white border border-slate-200 text-center">7264-9912</div>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Hashed with SHA-256 before persistence in database. Single-use only.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Architectural Modules Section */}
      <section id="features" className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Modular SaaS Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              8 Enterprise-Grade Subsystems
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Each module is isolated, strictly typed, and covered by automated unit tests. Use only what you need.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className="p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {mod.badge}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">
                      {mod.tag}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{mod.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{mod.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{mod.metrics}</span>
                    <span className="text-emerald-600 font-semibold">Active ✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3-Tier Editions & Pricing Section */}
      <section id="tiers" className="py-16 sm:py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold mb-3">
              <span>Fair & Transparent Licensing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose the Edition That Fits Your Workflow
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              From open-source community exploration to multi-client commercial SaaS production.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  tier.isPopular
                    ? 'bg-white border-2 border-blue-600 shadow-lg relative'
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-sm">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{tier.subtitle}</p>
                    </div>
                    {!tier.isPopular && (
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{tier.price}</span>
                    <span className="text-xs text-slate-500 font-medium">/ {tier.period}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">{tier.description}</p>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono block">
                      What is included:
                    </span>
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <a
                    href={tier.ctaHref}
                    target={tier.ctaHref.startsWith('http') ? '_blank' : undefined}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all ${
                      tier.isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-[0.99]'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLI Quickstart Section */}
      <section id="quickstart" className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Developer Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get Up and Running in 3 Steps
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              No complicated configuration steps. Run the scaffolder, set your environment keys, and start developing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">Run the Scaffolder</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Initialize with your preferred package manager and select your tier.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-slate-900 text-blue-300 font-mono text-xs">
                npx @devpreflight/nextlaunch init my-app
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Configure Database & Keys</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Copy the clean environment template and add your credentials.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-slate-900 text-blue-300 font-mono text-xs">
                cp .env.example .env.local
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Launch & Verify</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Run the test suite and launch the local Turbopack development server.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-slate-900 text-blue-300 font-mono text-xs">
                npm test && npm run dev
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Technical Questions
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Everything you need to know about architecture, dependencies, and licensing.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={item.question}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openFaqIndex === index ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern High-Craft Footer */}
      <footer className="bg-white py-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              NL
            </div>
            <div>
              <p className="font-bold text-slate-900">NextLaunch Pro SaaS Engine</p>
              <p className="text-slate-500">© 2026 DevPreFlight Team. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="https://devpreflight.com" target="_blank" className="hover:text-blue-600 transition-colors">
              DevPreFlight
            </Link>
            <Link href="https://github.com/DevPreFlight/nextlaunch-free" target="_blank" className="hover:text-blue-600 transition-colors">
              GitHub (MIT)
            </Link>
            <Link href="/admin" className="hover:text-blue-600 transition-colors">
              Admin Sandbox
            </Link>
            <Link href="#tiers" className="text-blue-600 font-bold hover:underline">
              Get Commercial
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
