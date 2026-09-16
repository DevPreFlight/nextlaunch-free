'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DollarSign,
  Users,
  Cpu,
  TrendingUp,
  Search,
  Eye,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Building2,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { startImpersonation } from '@/app/actions/impersonate';
import { MetricCard, StatusBadge, ToggleSwitch } from '@/components/preflight-ui';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  ownerEmail: string;
  plan: 'enterprise' | 'pro' | 'starter';
  mrr: number;
  credits: number;
  members: number;
  status: 'active' | 'pending' | 'trial';
  joinedDate: string;
}

const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'org_acme_01',
    name: 'Acme SaaS Inc.',
    slug: 'acme-corp',
    ownerEmail: 'alex@acme.inc',
    plan: 'enterprise',
    mrr: 99,
    credits: 4250,
    members: 14,
    status: 'active',
    joinedDate: '2026-08-12',
  },
  {
    id: 'org_synth_02',
    name: 'SynthAI Technologies',
    slug: 'synth-ai',
    ownerEmail: 'sarah@synthai.io',
    plan: 'pro',
    mrr: 49,
    credits: 12000,
    members: 8,
    status: 'active',
    joinedDate: '2026-08-20',
  },
  {
    id: 'org_veloce_03',
    name: 'Veloce Logistics Global',
    slug: 'veloce-logistics',
    ownerEmail: 'marco@veloce.dev',
    plan: 'enterprise',
    mrr: 99,
    credits: 1500,
    members: 22,
    status: 'active',
    joinedDate: '2026-09-01',
  },
  {
    id: 'org_hyperscale_04',
    name: 'HyperScale AI Cloud',
    slug: 'hyperscale-ai',
    ownerEmail: 'dev@hyperscale.cloud',
    plan: 'pro',
    mrr: 49,
    credits: 890,
    members: 5,
    status: 'active',
    joinedDate: '2026-09-05',
  },
  {
    id: 'org_nexify_05',
    name: 'Nexify Creative Studio',
    slug: 'nexify-studio',
    ownerEmail: 'clara@nexify.design',
    plan: 'starter',
    mrr: 19,
    credits: 200,
    members: 2,
    status: 'pending',
    joinedDate: '2026-09-10',
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [tenants] = useState<Tenant[]>(INITIAL_TENANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isImpersonating, setIsImpersonating] = useState<string | null>(null);

  const [features, setFeatures] = useState({
    aiStudio: true,
    auditLogs: true,
    resendEmails: true,
    mdxBlog: true,
    maintenanceMode: false,
  });

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImpersonate = async (tenant: Tenant) => {
    setIsImpersonating(tenant.id);
    try {
      localStorage.setItem('nextlaunch_impersonated_user', `${tenant.name} (${tenant.ownerEmail})`);
      await startImpersonation(tenant.id, tenant.ownerEmail, tenant.slug);
      router.push(`/${tenant.slug}`);
    } catch (err) {
      console.error('Impersonation failed:', err);
      setIsImpersonating(null);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner Alert (PreFlight Flat Style) */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Superuser Backoffice Active
              </h2>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                PRO ALL-IN-ONE
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Manage platform operations, toggle live feature flags, and initiate zero-password impersonation to debug customer workspaces.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-blue-200 text-blue-700 font-bold shadow-xs">
            v1.0.0-PRO
          </span>
        </div>
      </div>

      {/* Platform KPI Metrics using PreFlight MetricCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          item={{
            label: 'Platform Total MRR',
            value: '$38,420',
            delta: '+24.6%',
            deltaType: 'positive',
            comparisonPeriod: 'vs. previous 30 days',
          }}
        />
        <MetricCard
          item={{
            label: 'Active Tenant Workspaces',
            value: '1,428',
            delta: '+18 orgs',
            deltaType: 'positive',
            comparisonPeriod: 'Across Polar, Stripe & Midtrans',
          }}
        />
        <MetricCard
          item={{
            label: 'AI Token Credits Consumed',
            value: '312,850',
            delta: '+42.1%',
            deltaType: 'positive',
            comparisonPeriod: 'Gemini 2.5 Flash + GPT-4o',
          }}
        />
        <MetricCard
          item={{
            label: 'Platform Uptime & Webhooks',
            value: '99.98%',
            delta: '0 failed',
            deltaType: 'positive',
            comparisonPeriod: '12 active DB pool connections',
          }}
        />
      </div>

      {/* Tenant Directory & User Impersonation Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        {/* Table Toolbar Header */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              <h3 className="text-base font-extrabold text-slate-900">Tenant Organizations</h3>
              <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                {filteredTenants.length} Workspaces
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select any customer organization to inspect data or initiate a one-click impersonation session.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-5">Organization / Workspace</th>
                <th className="py-3.5 px-5">Owner Email</th>
                <th className="py-3.5 px-5">Plan Tier</th>
                <th className="py-3.5 px-5">MRR</th>
                <th className="py-3.5 px-5">AI Credits</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTenants.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-[11px] text-blue-600 font-mono">/{t.slug}</div>
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-600">{t.ownerEmail}</td>
                  <td className="py-4 px-5">
                    <StatusBadge
                      status={t.plan}
                      variant="subtle"
                      size="sm"
                      label={t.plan.toUpperCase()}
                    />
                  </td>
                  <td className="py-4 px-5 font-bold text-slate-900 font-mono text-sm">${t.mrr}/mo</td>
                  <td className="py-4 px-5 font-mono font-semibold text-purple-700">
                    {t.credits.toLocaleString()} pts
                  </td>
                  <td className="py-4 px-5">
                    <StatusBadge
                      status={t.status}
                      variant="dot"
                      size="sm"
                      label={t.status === 'active' ? 'Active' : 'Pending'}
                    />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => handleImpersonate(t)}
                      disabled={isImpersonating === t.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>{isImpersonating === t.id ? 'Connecting...' : 'Login as User'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-Column Grid: Feature Flags & Health Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Feature Flag Switcher using PreFlight ToggleSwitch */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Global Feature Flags</span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Live Control
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Instantly toggle application capabilities dynamically across all tenant workspaces without code redeployments.
          </p>

          <div className="divide-y divide-slate-100 pt-2">
            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Multi-LLM AI Copilot Studio</p>
                <p className="text-[11px] text-slate-500">Google Gemini 2.5 Flash, GPT-4o, Claude 3.5</p>
              </div>
              <ToggleSwitch
                checked={features.aiStudio}
                onChange={(val) => setFeatures((prev) => ({ ...prev, aiStudio: val }))}
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Enterprise Immutable Audit Logs</p>
                <p className="text-[11px] text-slate-500">Security event hashing & JSON trace inspector</p>
              </div>
              <ToggleSwitch
                checked={features.auditLogs}
                onChange={(val) => setFeatures((prev) => ({ ...prev, auditLogs: val }))}
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Transactional Email Pipelines</p>
                <p className="text-[11px] text-slate-500">5 React Email automated notification workflows</p>
              </div>
              <ToggleSwitch
                checked={features.resendEmails}
                onChange={(val) => setFeatures((prev) => ({ ...prev, resendEmails: val }))}
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">MDX SEO Marketing Blog</p>
                <p className="text-[11px] text-slate-500">Automated sitemap, RSS, and OpenGraph generator</p>
              </div>
              <ToggleSwitch
                checked={features.mdxBlog}
                onChange={(val) => setFeatures((prev) => ({ ...prev, mdxBlog: val }))}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Infrastructure & Gateway Health */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <Server className="h-4 w-4 text-blue-600" />
              <span>Infrastructure & Webhooks</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Healthy
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Real-time status of connected third-party providers and webhook ingestion pipelines.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Polar Merchant of Record</p>
                  <p className="text-[11px] text-slate-500">Standard Webhooks Ed25519 Verified</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                200 OK (32ms)
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Prisma PostgreSQL Pool</p>
                  <p className="text-[11px] text-slate-500">12/20 active connections (@prisma/adapter-pg)</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Connected
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Google Gemini 2.5 Flash SSE</p>
                  <p className="text-[11px] text-slate-500">Multi-LLM streaming endpoint (/api/ai/chat)</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
