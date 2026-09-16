'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useDemo } from '@/lib/demo-context';
import {
  CreditCard,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileText,
  Zap,
  Check,
  Layers,
  ArrowRight
} from 'lucide-react';
import { FEATURES } from '@/config/features';
import { PaywallGate } from '@/components/preflight-ui';

export default function BillingPage() {
  const params = useParams();
  const workspaceId = (params.workspaceId as string) || 'ws_demo_cloud_01';
  const { currentPlan, setPlan, addToast, triggerConfetti } = useDemo();
  const [loading, setLoading] = useState(false);
  const isStripe = FEATURES.paymentProvider === 'stripe';
  const providerName = isStripe ? 'Stripe' : FEATURES.paymentProvider === 'midtrans' ? 'Midtrans' : 'Polar';

  const plans = [
    {
      id: 'free',
      name: 'Starter Plan',
      price: '$0',
      period: 'Forever free',
      desc: 'For solo creators and prototyping.',
      features: ['1 Workspace seat', '1,000 API calls/mo', 'Community Discord', 'Basic Analytics'],
    },
    {
      id: 'pro',
      name: 'Pro Launch',
      price: '$29',
      period: 'per month',
      desc: 'For fast-growing SaaS startups and teams.',
      features: [
        '50 Workspace seats',
        '1,000,000 API calls/mo',
        'Multi-tenant RBAC permissions',
        'Priority Email & Discord support',
        '60+ PreFlight Flat UI components',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Scale',
      price: '$99',
      period: 'per month',
      desc: 'For high-scale apps and agencies.',
      features: [
        'Unlimited Workspace seats',
        'Unlimited API calls & webhooks',
        'Custom domain setup',
        'Dedicated SLA & private onboarding',
        'Custom invoice & tax reports',
      ],
    },
  ];

  const invoices = [
    {
      id: 'INV-2026-009',
      date: 'Sep 01, 2026',
      amount: currentPlan === 'enterprise' ? '$99.00' : '$29.00',
      status: 'Paid',
      plan: `NextLaunch ${currentPlan.toUpperCase()} Plan`,
    },
    {
      id: 'INV-2026-008',
      date: 'Aug 01, 2026',
      amount: '$29.00',
      status: 'Paid',
      plan: 'NextLaunch PRO Plan',
    },
    {
      id: 'INV-2026-007',
      date: 'Jul 01, 2026',
      amount: '$29.00',
      status: 'Paid',
      plan: 'NextLaunch PRO Plan',
    },
  ];

  const handlePortalRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      addToast(
        `${providerName} Customer Portal`,
        `In production, this securely redirects to your hosted ${providerName} Customer Portal session.`,
        'info'
      );
      setLoading(false);
    }, 400);
  };

  return (
    <div>
      <DashboardHeader
        title="Subscription & Billing"
        description={`Manage your ${providerName} subscription, invoices, and active team seats in real-time.`}
        actions={
          <button
            type="button"
            onClick={handlePortalRedirect}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>{loading ? 'Opening Portal...' : `${providerName} Customer Portal`}</span>
          </button>
        }
      />

      <main className="p-6 space-y-6">
        {/* Interactive Plan Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Interactive Plan Switcher</h3>
            <span className="text-xs text-blue-600 font-semibold">Test plan tier transitions live</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => {
              const isCurrent = currentPlan === p.id;
              return (
                <div
                  key={p.id}
                  className={`rounded-2xl bg-white p-6 transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-2 border-blue-600 shadow-lg relative'
                      : 'border border-slate-200 shadow-sm hover:border-slate-300'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      CURRENT ACTIVE PLAN
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                      {p.popular && !isCurrent && (
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{p.desc}</p>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">{p.price}</span>
                      <span className="text-xs text-slate-500">{p.period}</span>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4 space-y-2">
                      {p.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={isCurrent}
                      onClick={() => setPlan(p.id as any)}
                      className={`w-full rounded-xl py-2 px-3 text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-slate-100 text-slate-400 cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm'
                      }`}
                    >
                      {isCurrent ? 'Current Plan' : `Switch to ${p.name}`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Paywall Gate Component Showcase */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Layers className="h-4 w-4 text-blue-600" />
            <span>PreFlight Flat UI Paywall Gate Component</span>
          </div>

          <PaywallGate
            featureName="Dedicated Enterprise Database Direct Connection Pool"
            price={99}
            promoCode="LAUNCH2026"
            onUpgrade={() => {
              setPlan('enterprise');
            }}
          >
            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-1">
              <p>POSTGRES_DIRECT_URL="postgresql://enterprise_usr:pass@db.eu-west-1.aws:5432/db"</p>
              <p>REPLICA_POOL_SIZE=50</p>
              <p>MAX_CONCURRENT_SOCKETS=10000</p>
            </div>
          </PaywallGate>
        </div>

        {/* Invoice & Payment History Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Invoices & Tax Receipts</h4>
              <p className="text-xs text-slate-500">
                {isStripe
                  ? 'Processed and generated securely via Stripe Invoicing.'
                  : 'Processed automatically by Polar Merchant of Record (VAT compliant).'}
              </p>
            </div>
            <span className="text-xs text-slate-400">{isStripe ? 'PCI-DSS Compliant' : 'VAT Compliant'}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">Invoice ID</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Plan Item</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">{inv.id}</td>
                    <td className="py-3 px-4 text-slate-600">{inv.date}</td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{inv.plan}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{inv.amount}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => addToast('Receipt Downloaded', `Invoice PDF for ${inv.id} generated.`, 'info')}
                        className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
