import Link from 'next/link';
import { ArrowRight, ShieldCheck, Webhook, KeyRound, CreditCard, Cpu, Database, CheckCircle2, FileSpreadsheet, Lock } from 'lucide-react';

export default function HomePage() {
  const stackFeatures = [
    {
      icon: Webhook,
      title: 'Outgoing Webhooks Engine',
      description: 'Standard Webhooks signing (v1 HMAC-SHA256), fan-out dispatching, delivery logs, & automatic retries.',
      badge: 'Module 1 Active',
      link: '/api/webhooks/outgoing',
    },
    {
      icon: FileSpreadsheet,
      title: 'Audit Logs & Activity Trail',
      description: 'Enterprise event tracking, actor attribution, diff metadata, and compliance export (CSV / JSON).',
      badge: 'Module 2 Active',
      link: '/api/audit-logs',
    },
    {
      icon: Lock,
      title: '2FA TOTP & Session Manager',
      description: 'RFC 6238 TOTP authenticator engine, 8-digit hashed backup recovery codes, and multi-device session revocation.',
      badge: 'Module 3 Active',
      link: '/api/auth/2fa',
    },
    {
      icon: KeyRound,
      title: 'API Key Management',
      description: 'Cryptographic SHA-256 key hashing (nl_live_...), prefix search, and last-used timestamp telemetry.',
      badge: 'Backend Service',
    },
    {
      icon: ShieldCheck,
      title: 'Auth & RBAC Guards',
      description: 'Session guards, role verification (OWNER, ADMIN, MEMBER, VIEWER), and secure cookie sessions.',
      badge: 'Production Ready',
    },
    {
      icon: CreditCard,
      title: 'Dual Billing Engine',
      description: 'Multi-provider checkout & customer portal adapters for Stripe and Polar.sh with webhook sync.',
      badge: 'Stripe + Polar',
    },
    {
      icon: Cpu,
      title: 'Gemini AI Integration',
      description: 'Google GenAI SDK 2.x streaming copilot, prompt token tracking, and structured outputs.',
      badge: 'GenAI 2.x',
    },
    {
      icon: Database,
      title: 'Prisma 6 & PostgreSQL',
      description: 'Multi-tenant relational data model, type-safe queries, and transactional integrity.',
      badge: 'PostgreSQL',
    },
  ];



  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
            NL
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              NextLaunch Starter Kit
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-normal">
                v0.1.0
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Backend Services Ready
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto w-full py-12 sm:py-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 mb-6">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Zero-Bloat Pure Modular Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The Clean, Enterprise-Grade Backend SaaS Engine.
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            All the complex infrastructure you need—Outgoing Webhooks, HMAC signatures, API keys, RBAC guards, multi-provider billing, and Gemini AI—tested and ready without opinionated UI bloat.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {stackFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-5 rounded-xl bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{feat.title}</h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                </div>

                {feat.link && (
                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <Link
                      href={feat.link}
                      className="text-xs text-blue-400 hover:text-blue-300 font-mono inline-flex items-center gap-1 transition-colors"
                    >
                      Explore Endpoint <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Testing & Verification Box */}
        <div className="mt-8 p-6 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2 font-mono">
                <span className="text-emerald-400">❯</span> Run Backend Unit Tests
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                24 backend unit tests covering Webhooks HMAC signing, Auth RBAC guards, Billing state sync, and API keys.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <code className="px-3 py-1.5 rounded-lg bg-slate-900 text-blue-400 font-mono text-xs border border-slate-800">
                npm test
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <p>© 2026 NextLaunch Pro. Built for high-velocity software engineering.</p>
        <div className="flex items-center gap-4">
          <span>Next.js 16</span>
          <span>•</span>
          <span>React 19</span>
          <span>•</span>
          <span>Vitest</span>
          <span>•</span>
          <span>Prisma</span>
        </div>
      </div>
    </main>
  );
}
