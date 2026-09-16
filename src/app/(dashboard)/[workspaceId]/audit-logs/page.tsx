'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useDemo } from '@/lib/demo-context';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Lock,
  Unlock,
  Key,
  Database,
  Users,
  CreditCard,
  Sparkles,
  ExternalLink,
  Code
} from 'lucide-react';
import { PaywallGate, Button, StatusBadge } from '@/components/preflight-ui';

export default function AuditLogsPage() {
  const { currentPlan, setPlan, addToast, triggerConfetti } = useDemo();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const isLocked = currentPlan !== 'enterprise';

  const mockLogs = [
    {
      id: 'log_9081',
      timestamp: 'Sep 13, 2026 - 23:08:14 UTC',
      user: 'alex@devpreflight.com',
      action: 'API_KEY_ROTATED',
      severity: 'WARNING',
      ip: '194.26.29.11 (Frankfurt, DE)',
      status: 'success',
      details: { keyPrefix: 'nl_live_9f81', actorRole: 'OWNER', userAgent: 'Mozilla/5.0 (Macintosh; Apple Silicon)' },
    },
    {
      id: 'log_9080',
      timestamp: 'Sep 13, 2026 - 22:45:02 UTC',
      user: 'polar-webhook-engine',
      action: 'SUBSCRIPTION_RENEWAL_SYNC',
      severity: 'INFO',
      ip: '35.198.112.40 (Dublin, IE)',
      status: 'active',
      details: { polarSubscriptionId: 'sub_99a81c', amount: '$99.00', signature: 'Ed25519_verified' },
    },
    {
      id: 'log_9079',
      timestamp: 'Sep 13, 2026 - 21:12:33 UTC',
      user: 'sarah@vertexlabs.io',
      action: 'MEMBER_INVITED',
      severity: 'INFO',
      ip: '82.165.197.1 (London, UK)',
      status: 'success',
      details: { invitedEmail: 'david@vertexlabs.io', assignedRole: 'ADMIN' },
    },
    {
      id: 'log_9078',
      timestamp: 'Sep 13, 2026 - 19:30:11 UTC',
      user: 'alex@devpreflight.com',
      action: 'DATABASE_MIGRATION_DEPLOYED',
      severity: 'CRITICAL',
      ip: '194.26.29.11 (Frankfurt, DE)',
      status: 'success',
      details: { migration: '20260913_add_workspace_api_keys.sql', engine: 'Prisma 7 Postgres' },
    },
    {
      id: 'log_9077',
      timestamp: 'Sep 13, 2026 - 18:05:44 UTC',
      user: 'system_security_sentinel',
      action: 'RATE_LIMIT_PREVENTED',
      severity: 'WARNING',
      ip: '104.28.19.88 (Cloudflare Edge)',
      status: 'warning',
      details: { path: '/api/webhooks/polar', reqPerMin: 140, maxAllowed: 100 },
    },
  ];

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div>
      <DashboardHeader
        title="Security & Audit Logs"
        description="Immutable SOC-2 & HIPAA compliant event logs, access trails, and webhook dispatches."
        actions={
          <div className="flex items-center gap-2">
            {isLocked ? (
              <Button
                variant="primary"
                onClick={() => {
                  setPlan('enterprise');
                }}
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                <span>Simulate Enterprise Unlock ($99)</span>
              </Button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => addToast('Export Generated', 'SOC-2 Audit Log CSV downloaded successfully.', 'success')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export CSV Log</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPlan('pro');
                    addToast('Plan Switched to Pro', 'Audit logs feature is now locked again for testing.', 'info');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Re-Lock Feature</span>
                </button>
              </>
            )}
          </div>
        }
      />

      <main className="p-6 space-y-6">
        {/* Paywall Gate Component Wrapping */}
        <PaywallGate
          isLocked={isLocked}
          featureName="Enterprise Security Audit Logs & Compliance Stream"
          price={99}
          promoCode="ENTERPRISE20"
          onUpgrade={() => {
            setPlan('enterprise');
          }}
        >
          {/* Unlocked / Background Content */}
          <div className="space-y-6 w-full text-left">
            {/* Filter & Controls Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter logs by user, action, IP address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-500">Severity:</span>
                {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      severityFilter === sev
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Logs Table Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Immutable Event Ledger</h3>
                  <p className="text-xs text-slate-500">All administrative mutations and API token usage are recorded.</p>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ● Real-time WebSocket Ingest
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Timestamp (UTC)</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Severity</th>
                      <th className="py-3 px-4">IP & Geolocation</th>
                      <th className="py-3 px-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                        <td className="py-3 px-4 font-sans font-semibold text-slate-900">{log.user}</td>
                        <td className="py-3 px-4">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-800">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              log.severity === 'CRITICAL'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : log.severity === 'WARNING'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {log.severity}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-sans">{log.ip}</td>
                        <td className="py-3 px-4 text-right font-sans">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedLog(log);
                              addToast('Inspector Opened', `Viewing JSON payload for ${log.id}`, 'info');
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                          >
                            <Code className="h-3 w-3" />
                            <span>JSON</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* JSON Inspector Modal */}
            {selectedLog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">
                      Audit Event Payload — {selectedLog.id}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedLog(null)}
                      className="text-slate-400 hover:text-slate-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                    {JSON.stringify(selectedLog, null, 2)}
                  </pre>
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedLog(null)}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
                    >
                      Close Inspector
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </PaywallGate>
      </main>
    </div>
  );
}
