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
  Layers,
  Code2,
  Zap,
  Users,
  Building2,
  RefreshCw,
  Server,
  Sparkles,
  CheckCheck,
  FolderTree,
  BookOpen,
  Settings,
  Activity,
  Play
} from 'lucide-react';

export default function HomePage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'endpoints' | 'structure' | 'env' | 'scripts'>('endpoints');
  const [activeSandboxTab, setActiveSandboxTab] = useState<'webhooks' | 'auth' | 'audit' | 'billing'>('webhooks');
  const [webhookEvent, setWebhookEvent] = useState('subscription.created');
  const [totpCode, setTotpCode] = useState('742819');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const localEndpoints = [
    {
      method: 'POST',
      path: '/api/webhooks/outgoing',
      description: 'Dispatches signed outgoing webhooks with Standard Webhooks HMAC-SHA256 signature.',
      category: 'Webhooks',
    },
    {
      method: 'GET',
      path: '/api/audit-logs',
      description: 'Fetches compliance audit event trail with actor attribution and metadata diffs.',
      category: 'Audit',
    },
    {
      method: 'POST',
      path: '/api/auth/2fa',
      description: 'Generates RFC 6238 TOTP QR secrets and single-use 8-digit hashed backup recovery codes.',
      category: 'Security',
    },
    {
      method: 'POST',
      path: '/api/auth/sessions',
      description: 'Multi-device session manager with remote revocation and IP tracking.',
      category: 'Auth',
    },
    {
      method: 'POST',
      path: '/api/ai/chat',
      description: 'Google GenAI SDK 2.x streaming LLM copilot endpoint with structured output.',
      category: 'AI',
    },
    {
      method: 'POST',
      path: '/api/webhooks/stripe',
      description: 'Idempotent Stripe webhook receiver for invoice.paid, customer.subscription events.',
      category: 'Billing',
    },
    {
      method: 'POST',
      path: '/api/webhooks/polar',
      description: 'Polar.sh Merchant of Record webhook receiver with cryptographic Svix signatures.',
      category: 'Billing',
    },
    {
      method: 'GET',
      path: '/admin',
      description: 'Super Admin Control Center with user inspection & 1-click user impersonation.',
      category: 'Admin Portal',
    },
  ];

  const quickSteps = [
    {
      step: '01',
      title: 'Configure Environment Variables',
      desc: 'Copy the sample environment configuration to activate your local database and API credentials.',
      code: 'cp .env.example .env.local',
      action: 'copy',
    },
    {
      step: '02',
      title: 'Setup Database & Prisma Client',
      desc: 'Run database migrations and seed default development roles and demo workspaces.',
      code: 'npx prisma migrate dev && npm run db:seed',
      action: 'copy',
    },
    {
      step: '03',
      title: 'Run Automated Test Suite',
      desc: 'Verify that HMAC signing, RBAC security guards, and billing adapters pass all 49 unit tests.',
      code: 'npm test',
      action: 'copy',
    },
    {
      step: '04',
      title: 'Inspect Database via Prisma Studio',
      desc: 'Launch local graphical database manager on localhost:5555 to explore multi-tenant records.',
      code: 'npx prisma studio',
      action: 'copy',
    },
  ];

  const subsystems = [
    {
      icon: CreditCard,
      title: 'Dual Billing Engine',
      subtitle: 'Stripe Subscriptions + Polar MoR',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Multi-provider payment adapters with customer portal redirect, subscription state sync, and webhook handlers.',
      path: 'src/services/billing.service.ts',
    },
    {
      icon: Webhook,
      title: 'Outgoing Webhooks Engine',
      subtitle: 'Standard Webhooks (HMAC-SHA256)',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Cryptographic event signing (webhook-signature: v1,t=...), fan-out queues, and automatic retries.',
      path: 'src/services/outgoing-webhook.service.ts',
    },
    {
      icon: Lock,
      title: '2FA TOTP & Session Security',
      subtitle: 'RFC 6238 + Backup Codes',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Authenticator OTP tokens, 8-digit hashed backup recovery codes, and multi-device session revocation.',
      path: 'src/services/two-factor.service.ts',
    },
    {
      icon: FileSpreadsheet,
      title: 'Audit Logs & Compliance',
      subtitle: 'Actor attribution & diff metadata',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Append-only event logger with IP attribution, JSON diffs, and compliance CSV export route.',
      path: 'src/services/audit-log.service.ts',
    },
    {
      icon: KeyRound,
      title: 'API Key Management',
      subtitle: 'SHA-256 Hashed Keys (nl_live_...)',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Prefix-indexed API secrets, cryptographic verification, and last-used timestamp telemetry.',
      path: 'src/services/api-key.service.ts',
    },
    {
      icon: ShieldCheck,
      title: 'RBAC & Session Guards',
      subtitle: 'OWNER, ADMIN, MEMBER, VIEWER',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Zero-trust role verification, secure HTTP-only cookie sessions, and Server Action guards.',
      path: 'src/services/auth.service.ts',
    },
    {
      icon: Cpu,
      title: 'Gemini GenAI 2.x Copilot',
      subtitle: 'Streaming LLM & Structured JSON',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Google GenAI SDK 2.x streaming copilot, prompt token tracking, and structured output parsing.',
      path: 'src/app/api/ai/chat/route.ts',
    },
    {
      icon: Database,
      title: 'Prisma 6 PostgreSQL ORM',
      subtitle: 'Multi-Tenant Relational Schema',
      status: 'Ready',
      statusColor: 'emerald',
      desc: 'Audited PostgreSQL schema, transaction safety, and workspace organization isolation.',
      path: 'prisma/schema.prisma',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Local Status Bar */}
      <div className="bg-slate-900 text-white px-4 py-2 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Local Environment Active
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Next.js 16.3.5 App Router • React 19 • DevPreFlight Flat UI Kit
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <Link href="/admin" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
              <span>Super Admin</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main App Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                NL
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900 leading-tight">NextLaunch App Workspace</span>
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                  Developer Control Center
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#quickstart" className="hover:text-blue-600 transition-colors">
                Setup Checklist
              </a>
              <a href="#subsystems" className="hover:text-blue-600 transition-colors">
                Subsystems ({subsystems.length})
              </a>
              <a href="#sandbox" className="hover:text-blue-600 transition-colors">
                API Sandbox
              </a>
              <a href="#routes" className="hover:text-blue-600 transition-colors">
                Local Endpoints
              </a>
              <a href="#docs" className="hover:text-blue-600 transition-colors">
                Architecture Tour
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm flex items-center gap-1.5"
            >
              <Server className="w-4 h-4" />
              <span>Open Super Admin Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero: Welcome & Developer Overview */}
      <section className="pt-10 pb-12 sm:pt-14 sm:pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>NextLaunch SaaS Engine Successfully Initialized</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your Full-Stack SaaS Boilerplate is Live.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              All core backend infrastructure—Dual Stripe & Polar billing, Standard Webhooks signing, cryptographic API keys, 2FA TOTP authentication, and DevPreFlight Flat UI primitives—is configured and ready for your custom business logic.
            </p>

            {/* Quick Action Cockpit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <Link
                href="/admin"
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Server className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Super Admin</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Inspect workspace metrics, users, and trigger user impersonation.
                </p>
              </Link>

              <a
                href="#sandbox"
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>API Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Test HMAC signatures, 2FA tokens, and audit event dispatching.
                </p>
              </a>

              <a
                href="#quickstart"
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Code2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Setup Checklist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  4 next steps to connect your database and launch your app.
                </p>
              </a>

              <a
                href="#routes"
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>API Endpoints</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Explore 8 pre-wired REST route handlers and Server Actions.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Developer Quickstart & Setup Checklist */}
      <section id="quickstart" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold mb-2">
              <Play className="w-3.5 h-3.5 text-blue-600" />
              <span>Getting Started Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Steps to Configure & Customize Your Project
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Follow this quick sequence to connect your local PostgreSQL database and start building features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">Ready in Terminal</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-5 p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto text-blue-300">
                    <span className="text-slate-500 select-none">❯</span>
                    <span>{step.code}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(step.code, `step-${step.step}`)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="Copy command"
                    aria-label="Copy terminal command"
                  >
                    {copiedSnippet === `step-${step.step}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Subsystems Overview */}
      <section id="subsystems" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Core Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              8 Pre-Integrated Backend Subsystems
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Every subsystem is modular, strictly typed, and covered by automated unit tests in <code className="text-blue-600 font-mono text-xs">tests/unit/</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {subsystems.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.title}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {sub.status} ✓
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{sub.title}</h3>
                    <span className="text-[11px] font-semibold text-blue-600 block mt-0.5">{sub.subtitle}</span>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{sub.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80">
                    <code className="text-[10px] font-mono text-slate-500 block truncate" title={sub.path}>
                      {sub.path}
                    </code>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Local API Sandbox */}
      <section id="sandbox" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold mb-2">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Local Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Test Core Backend Flows Locally
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Interact with simulated backend payloads, HMAC signature generators, 2FA tokens, and audit event logs.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Sandbox Tabs */}
            <div className="flex flex-wrap border-b border-slate-200 bg-slate-100/70 p-2 gap-1.5">
              <button
                onClick={() => setActiveSandboxTab('webhooks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSandboxTab === 'webhooks'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Webhook className="w-4 h-4" />
                <span>1. Standard Webhooks HMAC Signer</span>
              </button>

              <button
                onClick={() => setActiveSandboxTab('auth')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSandboxTab === 'auth'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>2. RFC 6238 TOTP Authenticator</span>
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
                <span>3. Compliance Audit Stream</span>
              </button>

              <button
                onClick={() => setActiveSandboxTab('billing')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeSandboxTab === 'billing'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>4. Multi-Billing Adapter</span>
              </button>
            </div>

            {/* Sandbox Content */}
            <div className="p-6 sm:p-8">
              {activeSandboxTab === 'webhooks' && (
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Standard Webhooks v1 Dispatcher</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Generates cryptographic SHA-256 signatures matching the Standard Webhooks specification.
                      </p>
                    </div>
                    <select
                      value={webhookEvent}
                      onChange={(e) => setWebhookEvent(e.target.value)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-800"
                    >
                      <option value="subscription.created">Event: subscription.created</option>
                      <option value="subscription.canceled">Event: subscription.canceled</option>
                      <option value="user.2fa_enabled">Event: user.2fa_enabled</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                      <span className="text-slate-400 block mb-2 font-bold">Standard Signed Headers:</span>
                      <div className="space-y-1.5 text-blue-300">
                        <div>webhook-id: <span className="text-emerald-400">msg_9k2mP1a8Lq</span></div>
                        <div>webhook-timestamp: <span className="text-emerald-400">{Math.floor(Date.now() / 1000)}</span></div>
                        <div className="break-all">webhook-signature: <span className="text-emerald-400">v1,v0a8h9mK2lPq7...=</span></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block mb-1">Testing Endpoint Locally:</span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          You can test dispatching an outgoing webhook by sending a POST request to <code className="text-blue-600 font-mono">/api/webhooks/outgoing</code>.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-500">Auto-retry: 5 backoffs</span>
                        <span className="text-emerald-600 font-bold">Signature Verified ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSandboxTab === 'auth' && (
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">RFC 6238 TOTP Engine</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        HMAC-based one-time password authenticator integration with backup recovery array.
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center">
                      <span className="text-xs font-semibold text-slate-500 font-mono uppercase">Current TOTP Token</span>
                      <div className="text-4xl font-extrabold font-mono text-blue-600 tracking-widest my-2">
                        {totpCode}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">30s interval • Valid ±1 time step</span>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-800 font-mono block mb-2">
                        Hashed Backup Recovery Codes
                      </span>
                      <div className="grid grid-cols-2 gap-2 font-mono text-xs text-slate-600">
                        <div className="p-2 rounded bg-white border border-slate-200 text-center">8472-9104</div>
                        <div className="p-2 rounded bg-white border border-slate-200 text-center">1938-4420</div>
                        <div className="p-2 rounded bg-white border border-slate-200 text-center">5092-1183</div>
                        <div className="p-2 rounded bg-white border border-slate-200 text-center">7264-9912</div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">
                        SHA-256 hashed in database for single-use emergency recovery.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSandboxTab === 'audit' && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Compliance Audit Event Trail</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Recorded events include actor ID, IP origin, action type, and diff snapshots.
                      </p>
                    </div>
                    <Link
                      href="/api/audit-logs"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-colors"
                    >
                      View /api/audit-logs →
                    </Link>
                  </div>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="pb-2">Action</th>
                          <th className="pb-2">Actor</th>
                          <th className="pb-2">IP Origin</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-2.5 font-bold text-slate-800">auth.session.create</td>
                          <td className="py-2.5 text-blue-600">user_demo_lead</td>
                          <td className="py-2.5 text-slate-600">127.0.0.1</td>
                          <td className="py-2.5 text-emerald-600 font-bold">SUCCESS</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-bold text-slate-800">api_key.verify</td>
                          <td className="py-2.5 text-blue-600">system_worker</td>
                          <td className="py-2.5 text-slate-600">127.0.0.1</td>
                          <td className="py-2.5 text-emerald-600 font-bold">SUCCESS</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeSandboxTab === 'billing' && (
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Stripe & Polar.sh Dual Billing</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Zero vendor lock-in. Switch or combine Stripe subscriptions and Polar Merchant of Record.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-blue-700 mb-2">Stripe Checkout Adapter</div>
                      <div className="text-slate-600 space-y-1">
                        <div>Handler: <code>/api/webhooks/stripe</code></div>
                        <div>Mode: Direct Merchant Checkout</div>
                        <div>Features: Subscriptions, Invoicing</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-blue-700 mb-2">Polar.sh MoR Adapter</div>
                      <div className="text-slate-600 space-y-1">
                        <div>Handler: <code>/api/webhooks/polar</code></div>
                        <div>Mode: Merchant of Record (Global Tax)</div>
                        <div>Features: Automated VAT/Sales Tax</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Local Endpoints Directory */}
      <section id="routes" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Route Handlers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pre-Wired Local Endpoints & Routes
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              These route handlers are live in your workspace and ready for requests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localEndpoints.map((ep) => (
              <div
                key={ep.path}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                      ep.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ep.method}
                    </span>
                    <code className="text-xs font-mono font-bold text-slate-900">{ep.path}</code>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{ep.category}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ep.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Architecture Tour & Directory Layout */}
      <section id="docs" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold mb-2">
              <FolderTree className="w-3.5 h-3.5 text-blue-600" />
              <span>Codebase Structure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Where Everything Lives in NextLaunch
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Organized with clean domain boundaries and zero circular dependencies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="font-bold text-slate-900 text-sm font-sans mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>src/app/ (App Router)</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><code className="text-blue-600 font-bold">admin/</code>: Super Admin Control Center</li>
                <li><code className="text-blue-600 font-bold">api/</code>: REST Route Handlers</li>
                <li><code className="text-blue-600 font-bold">actions/</code>: React Server Actions</li>
                <li><code className="text-blue-600 font-bold">globals.css</code>: Tailwind & Theme tokens</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="font-bold text-slate-900 text-sm font-sans mb-3 flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-600" />
                <span>src/services/ (Backend Logic)</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><code className="text-blue-600 font-bold">auth.service.ts</code>: RBAC & Sessions</li>
                <li><code className="text-blue-600 font-bold">billing.service.ts</code>: Stripe & Polar</li>
                <li><code className="text-blue-600 font-bold">outgoing-webhook.service.ts</code></li>
                <li><code className="text-blue-600 font-bold">two-factor.service.ts</code>: TOTP 2FA</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200">
              <div className="font-bold text-slate-900 text-sm font-sans mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>src/components/preflight-ui/</span>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><code className="text-blue-600 font-bold">primitives/</code>: Buttons, Inputs, Switches</li>
                <li><code className="text-blue-600 font-bold">feedback/</code>: Modals, Drawers, Toast, Cookies</li>
                <li><code className="text-blue-600 font-bold">marketing/</code>: Feature grids, FAQ</li>
                <li><code className="text-blue-600 font-bold">commerce/</code>: Pricing, Checkout cards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              NL
            </div>
            <div>
              <p className="font-bold text-slate-900">NextLaunch Developer Workspace</p>
              <p className="text-slate-500">Built with DevPreFlight Flat UI & Next.js 16 App Router.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/admin" className="text-blue-600 font-bold hover:underline">
              Super Admin Portal →
            </Link>
            <Link href="https://devpreflight.com" target="_blank" className="hover:text-blue-600 transition-colors">
              DevPreFlight Hub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
