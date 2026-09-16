'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useDemo } from '@/lib/demo-context';
import {
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Sliders,
  CreditCard,
  Layout,
  MessageSquare,
  Zap
} from 'lucide-react';
import {
  Button,
  LoadingButton,
  ToggleSwitch,
  TextInput,
  PasswordInput,
  Chip,
  Avatar,
  AlertBanner,
  PaywallGate,
  DiscountCopyBar,
  InvoicingReceiptCard,
  StatusBadge,
  MetricSparklineCard,
} from '@/components/preflight-ui';

export default function UIShowcasePage() {
  const { addToast, triggerConfetti } = useDemo();
  const [activeTab, setActiveTab] = useState<'primitives' | 'feedback' | 'commerce' | 'dashboard'>('primitives');
  const [btnLoading, setBtnLoading] = useState(false);
  const [toggleState, setToggleState] = useState(true);
  const [sampleText, setSampleText] = useState('Production Flat UI');
  const [samplePassword, setSamplePassword] = useState('supersecret123');

  const tabs = [
    { id: 'primitives', label: 'Form Primitives & Buttons', icon: Sliders },
    { id: 'commerce', label: 'Commerce & Paywalls', icon: CreditCard },
    { id: 'dashboard', label: 'Dashboard & Metrics', icon: Layout },
    { id: 'feedback', label: 'Feedback & Overlays', icon: MessageSquare },
  ] as const;

  return (
    <div>
      <DashboardHeader
        title="PreFlight Flat UI Kit Showcase"
        description="Interactive playground featuring 60+ flat white & blue components built for React 19 & Next.js 16."
        actions={
          <a
            href="https://react-kit.devpreflight.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            <span>PreFlight UI Kit Docs</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        }
      />

      <main className="p-6 space-y-6">
        {/* Promotional Cross-Sell Banner */}
        <div className="rounded-2xl border-2 border-blue-600 bg-gradient-to-r from-blue-50 via-white to-blue-50/40 p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full UI Kit Included in NextLaunch Pro</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              PreFlight Flat UI Component Kit (React 19 & Tailwind CSS)
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Every component on this page is powered by the PreFlight Flat UI library. Zero bulky runtime dependencies, WCAG AAA accessibility compliant, and tailored with CSS design tokens.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                triggerConfetti();
                addToast('Component Action Tested!', 'React 19 interactive event executed.', 'success');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <span>Test UI Action</span>
              <Zap className="h-3.5 w-3.5 text-amber-500" />
            </button>
            <a
              href="https://devpreflight.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span>Standalone UI Kit ($29)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: FORM PRIMITIVES & BUTTONS */}
        {activeTab === 'primitives' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons Showcase */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Buttons & Loading States
              </h4>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" onClick={() => addToast('Primary Clicked', 'Standard action triggered')}>
                  Primary Button
                </Button>
                <Button variant="secondary" onClick={() => addToast('Secondary Clicked', 'Subtle action triggered')}>
                  Secondary
                </Button>
                <Button variant="outline" onClick={() => addToast('Outline Clicked', 'Light boundary button')}>
                  Outline
                </Button>
                <Button variant="danger" onClick={() => addToast('Danger Clicked', 'Destructive trigger', 'error')}>
                  Destructive
                </Button>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <LoadingButton
                  loading={btnLoading}
                  onClick={() => {
                    setBtnLoading(true);
                    setTimeout(() => {
                      setBtnLoading(false);
                      triggerConfetti();
                      addToast('Async Task Completed', 'Loading button finished execution', 'success');
                    }, 1200);
                  }}
                  variant="primary"
                >
                  {btnLoading ? 'Processing Request...' : 'Click for Async Spinner'}
                </LoadingButton>
              </div>
            </div>

            {/* Inputs Showcase */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Accessible Form Inputs
              </h4>
              <div className="space-y-3">
                <TextInput
                  label="Sample Text Input"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  placeholder="Enter value..."
                  helperText="Type something to test 2-way state reactivity."
                />
                <PasswordInput
                  label="Password with Reveal Toggle"
                  value={samplePassword}
                  onChange={(e) => setSamplePassword(e.target.value)}
                />
              </div>
            </div>

            {/* Switches & Chips */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Toggle Switches & Chips
              </h4>
              <div className="space-y-3">
                <ToggleSwitch
                  checked={toggleState}
                  onChange={setToggleState}
                  label="Enable Polar Automatic Webhook Dispatcher"
                  description="When active, subscriptions synchronize instantly."
                />
                <div className="pt-2 flex flex-wrap gap-2">
                  <Chip label="React 19" variant="primary" />
                  <Chip label="Next.js 16" variant="default" />
                  <Chip label="Polar Verified" variant="success" />
                  <Chip label="Turbopack Ready" variant="warning" />
                </div>
              </div>
            </div>

            {/* Avatars */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Avatars & User Indicators
              </h4>
              <div className="flex items-center gap-4">
                <Avatar size="lg" name="Alex Rivera" status="online" />
                <Avatar size="md" name="Sarah Chen" status="busy" />
                <Avatar size="sm" name="David Kim" status="offline" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Multi-tenant User Badges</p>
                  <p className="text-[11px] text-slate-500">Accessible fallback initials & online badges.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMMERCE & PAYWALLS */}
        {activeTab === 'commerce' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paywall Gate */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Paywall Gate Component</h4>
              <PaywallGate
                featureName="Advanced Enterprise RBAC & Audit Trails"
                price={29}
                promoCode="LAUNCH2026"
                onUpgrade={() => {
                  triggerConfetti();
                  addToast('Paywall Modal Triggered', 'Simulating Polar checkout flow', 'success');
                }}
              >
                <div className="p-4 space-y-2 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-mono text-xs text-slate-700">🔒 Secret Tenant Encryption Keys</p>
                  <p className="font-mono text-xs text-slate-700">🔒 Raw PostgreSQL Connection Pool</p>
                  <p className="font-mono text-xs text-slate-700">🔒 Webhook Dispatcher Replay Log</p>
                </div>
              </PaywallGate>
            </div>

            {/* Discount Bar & Invoicing */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Promo & Discount Copy Bar</h4>
                <DiscountCopyBar
                  code="LAUNCH2026"
                  discountText="20% off all kits & modules"
                  tag="EXCLUSIVE CODE"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Receipt & Invoice Card</h4>
                <InvoicingReceiptCard
                  invoiceNumber="INV-POLAR-9081"
                  date="September 13, 2026"
                  amount={29.00}
                  customerName="Vertex Labs Inc."
                  planName="NextLaunch Pro Plan"
                  onDownloadPdf={() => addToast('Receipt Generated', 'PDF invoice ready for tax records.', 'info')}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DASHBOARD & METRICS */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricSparklineCard
              item={{
                label: 'Monthly Recurring Revenue',
                value: '$14,850',
                delta: '+24.8%',
                deltaType: 'positive',
                comparisonPeriod: 'vs last month',
                sparklineData: [10, 12, 11, 14, 13, 16, 18, 19, 24],
              }}
            />
            <MetricSparklineCard
              item={{
                label: 'Active Paid Subscriptions',
                value: '512 Teams',
                delta: '+12.4%',
                deltaType: 'positive',
                comparisonPeriod: 'via Polar Merchant',
                sparklineData: [300, 320, 350, 410, 440, 480, 512],
              }}
            />
            <MetricSparklineCard
              item={{
                label: 'API Throughput Latency',
                value: '18.4 ms',
                delta: '-4.2ms',
                deltaType: 'positive',
                comparisonPeriod: 'Turbopack Edge',
                sparklineData: [28, 25, 24, 22, 21, 19, 18],
              }}
            />

            <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Status Badges with Pulse Indicators</h4>
              <div className="flex flex-wrap gap-3">
                <StatusBadge status="active" label="Polar Webhook Live" />
                <StatusBadge status="success" label="Database Synced" />
                <StatusBadge status="warning" label="Payment Pending" />
                <StatusBadge status="danger" label="License Expired" />
                <StatusBadge status="neutral" label="Archived" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FEEDBACK & OVERLAYS */}
        {activeTab === 'feedback' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Accessible Alert Banners
              </h4>
              <div className="space-y-3">
                <AlertBanner
                  variant="success"
                  title="Payment Succeeded"
                >
                  Your Polar Pro subscription was verified and activated instantly.
                </AlertBanner>
                <AlertBanner
                  variant="info"
                  title="New Feature Available"
                >
                  Multi-tenant team workspace invitations are now active.
                </AlertBanner>
                <AlertBanner
                  variant="warning"
                  title="Approaching Plan Limit"
                >
                  You have utilized 48 of your 50 available seats.
                </AlertBanner>
                <AlertBanner
                  variant="danger"
                  title="Webhook Signature Expired"
                >
                  Please refresh your Polar webhook signing secret.
                </AlertBanner>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Live Toast Trigger Playground
              </h4>
              <p className="text-xs text-slate-600">
                Test the non-intrusive toast provider with auto-dismiss timers and custom alert levels:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => addToast('Success Event', 'Operation completed without errors', 'success')}
                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                >
                  Trigger Success Toast
                </button>
                <button
                  type="button"
                  onClick={() => addToast('Information Note', 'Standard server status notification', 'info')}
                  className="rounded-xl border border-blue-200 bg-blue-50 p-2.5 text-xs font-bold text-blue-800 hover:bg-blue-100"
                >
                  Trigger Info Toast
                </button>
                <button
                  type="button"
                  onClick={() => addToast('Quota Warning', 'You have used 90% of your API credits', 'warning')}
                  className="rounded-xl border border-amber-200 bg-amber-50 p-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100"
                >
                  Trigger Warning Toast
                </button>
                <button
                  type="button"
                  onClick={() => addToast('Network Timeout', 'Failed to reach external webhook endpoint', 'error')}
                  className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-bold text-red-800 hover:bg-red-100"
                >
                  Trigger Error Toast
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
