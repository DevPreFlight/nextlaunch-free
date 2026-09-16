'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useDemo } from '@/lib/demo-context';
import {
  DollarSign,
  Users,
  Activity,
  Sparkles,
  Plus,
  ExternalLink,
  Zap,
  TrendingUp,
  Layers
} from 'lucide-react';
import { MetricSparklineCard } from '@/components/preflight-ui';

export default function DashboardOverviewPage() {
  const params = useParams();
  const workspaceId = (params.workspaceId as string) || 'ws_demo_cloud_01';
  const { mrr, activeSubscribers, apiCalls, events, currentPlan, simulateWebhook } = useDemo();

  return (
    <div>
      <DashboardHeader
        title="Workspace Overview"
        description="Monitor your SaaS revenue, team seats, and Polar subscription status in real-time."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href={`/${workspaceId}/team`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Invite Member</span>
            </Link>
            <Link
              href={`/${workspaceId}/ui-showcase`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>UI Components</span>
            </Link>
          </div>
        }
      />

      <main className="p-6 space-y-6">
        {/* KPI Grid with Real Reactive State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Monthly Recurring Revenue</span>
              <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600 border border-blue-100">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">
                ${mrr.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> +24.8%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Active Paying Seats</span>
              <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600 border border-blue-100">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">{activeSubscribers} Teams</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                Polar Merchant
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">API Request Volume</span>
              <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600 border border-blue-100">
                <Activity className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">
                {(apiCalls / 1000000).toFixed(2)}M reqs
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                99.98% uptime
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Current Plan Status</span>
              <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600 border border-blue-100">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 uppercase">
                {currentPlan}
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Metric Sparklines Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricSparklineCard
            item={{
              label: 'Revenue Growth Trajectory',
              value: `$${mrr.toLocaleString()}`,
              delta: '+18.4%',
              deltaType: 'positive',
              comparisonPeriod: 'Past 30 days',
              sparklineData: [12000, 12400, 13100, 13500, 14200, 14850],
            }}
          />
          <MetricSparklineCard
            item={{
              label: 'Paying Seat Expansion',
              value: `${activeSubscribers} Teams`,
              delta: '+8.2%',
              deltaType: 'positive',
              comparisonPeriod: 'Monthly trend',
              sparklineData: [410, 430, 460, 485, 500, 512],
            }}
          />
          <MetricSparklineCard
            item={{
              label: 'Webhook Delivery Success',
              value: '100.0%',
              delta: '0 dropped',
              deltaType: 'positive',
              comparisonPeriod: 'Ed25519 Verified',
              sparklineData: [100, 100, 100, 100, 100, 100],
            }}
          />
        </div>

        {/* Two-Column Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Recent Activity Feed (2 Cols) */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Live Webhook & Audit Feed</h3>
                <p className="text-xs text-slate-500">Real-time simulation of incoming Polar payment webhooks.</p>
              </div>
              <button
                type="button"
                onClick={() => simulateWebhook('subscription.created')}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>+ Trigger Event</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {events.map((evt) => (
                <div key={evt.id} className="py-3.5 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-700">
                        {evt.type}
                      </span>
                      <span className="text-xs text-slate-400">• {evt.time}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800">{evt.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {evt.amount && (
                      <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {evt.amount}
                      </span>
                    )}
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      Synced
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: PreFlight Promotion & Polar Status Card (1 Col) */}
          <div className="space-y-6">
            <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  ▲
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Polar Merchant of Record</h4>
                  <p className="text-[11px] text-slate-500">Live Cryptographic Signature</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span>Standard Webhooks</span>
                  <span className="font-semibold text-emerald-600 font-mono">Ed25519 Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Customer Portal</span>
                  <span className="font-semibold text-blue-600 font-mono">Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Current Tier</span>
                  <span className="font-semibold text-slate-900 font-mono uppercase">{currentPlan}</span>
                </div>
              </div>

              <Link
                href={`/${workspaceId}/billing`}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 px-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <span>Manage Polar Subscriptions</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* UI Kit Promotion Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Layers className="h-4 w-4 text-blue-600" />
                <span>PreFlight Flat UI Kit Included</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                60+ React 19 primitives with zero runtime bloat, pre-styled for SaaS conversion.
              </p>
              <Link
                href={`/${workspaceId}/ui-showcase`}
                className="block text-center rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 py-2 text-xs font-bold text-slate-800 transition-colors"
              >
                Explore 60+ Components →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
