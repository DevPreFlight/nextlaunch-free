'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useDemo } from '@/lib/demo-context';
import { Key, Building, ShieldAlert, Copy, Check, Plus, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { addToast, simulateWebhook, triggerConfetti } = useDemo();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState('Acme SaaS Inc.');
  const [apiKeys, setApiKeys] = useState([
    {
      id: 'key_1',
      name: 'Production Primary Key',
      prefix: 'nl_live_9f81',
      created: 'Sep 01, 2026',
      lastUsed: '10 mins ago',
    },
    {
      id: 'key_2',
      name: 'Staging CI/CD Runner',
      prefix: 'nl_test_41b2',
      created: 'Sep 10, 2026',
      lastUsed: '2 days ago',
    },
  ]);

  const copyToClipboard = (prefix: string) => {
    navigator.clipboard.writeText(`${prefix}••••••••••••••••••••••••`);
    setCopiedKey(prefix);
    addToast('API Key Copied', 'Token copied to clipboard.', 'success');
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleGenerateKey = () => {
    const newPrefix = `nl_live_${Math.random().toString(36).substring(2, 6)}`;
    setApiKeys([
      ...apiKeys,
      {
        id: `key_${Date.now()}`,
        name: 'New API Key',
        prefix: newPrefix,
        created: 'Just now',
        lastUsed: 'Never',
      },
    ]);
    simulateWebhook('api.key.created');
    triggerConfetti();
  };

  const handleRevokeKey = (id: string, name: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
    addToast('Key Revoked', `API Key "${name}" has been disabled.`, 'warning');
  };

  return (
    <div>
      <DashboardHeader
        title="Workspace Settings & API Keys"
        description="Configure workspace details, security credentials, and programmatic API keys."
      />

      <main className="p-6 space-y-6 max-w-4xl">
        {/* General Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="h-4 w-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">General Workspace Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Workspace Name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Workspace Slug</label>
              <input
                type="text"
                disabled
                value="acme-saas-inc"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-3 text-sm text-slate-500 font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => addToast('Settings Saved', 'Workspace details updated successfully.', 'success')}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* API Keys Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900">Developer API Keys</h3>
            </div>
            <button
              type="button"
              onClick={handleGenerateKey}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create New Key</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {apiKeys.map((k) => (
              <div key={k.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">{k.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {k.prefix}••••••••••••
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(k.prefix)}
                      className="text-slate-400 hover:text-blue-600 p-0.5"
                      title="Copy Key"
                    >
                      {copiedKey === k.prefix ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="hidden sm:inline">Last used {k.lastUsed}</span>
                  <button
                    type="button"
                    onClick={() => handleRevokeKey(k.id, k.name)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-1"
                    title="Revoke Key"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-200 bg-red-50/30 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-600" />
            <h4 className="text-sm font-bold text-red-900">Danger Zone</h4>
          </div>
          <p className="text-xs text-slate-600">
            Permanently delete this workspace, including all member accounts, subscriptions, and stored tenant data.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => addToast('Safety Guard Active', 'Destructive actions are disabled in the live interactive demo.', 'warning')}
              className="rounded-xl border border-red-300 bg-white px-4 py-2 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50"
            >
              Delete Workspace
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
