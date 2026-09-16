'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  RefreshCw,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ExternalLink
} from 'lucide-react';

type TemplateKey = 'welcome' | 'receipt' | 'invite' | 'magic-link' | 'dunning';

const TEMPLATES: {
  key: TemplateKey;
  name: string;
  category: string;
  badgeColor: string;
  description: string;
  subject: string;
}[] = [
  {
    key: 'welcome',
    name: '1. Welcome & Onboarding',
    category: 'ONBOARDING',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Sent immediately upon workspace provisioning with getting started steps.',
    subject: "Welcome to NextLaunch — Your SaaS foundation is ready",
  },
  {
    key: 'receipt',
    name: '2. Invoice & Tax Receipt',
    category: 'BILLING',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Sent upon successful Polar / Stripe payment with line items & VAT breakdown.',
    subject: 'Receipt for Invoice INV-2026-0982 — $99.00 Paid',
  },
  {
    key: 'invite',
    name: '3. Team Workspace Invitation',
    category: 'COLLAB',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Sent when inviting team members with role assignments and permission preview.',
    subject: 'Alex Rivera invited you to join Acme SaaS Inc. on NextLaunch',
  },
  {
    key: 'magic-link',
    name: '4. Passwordless Magic Link',
    category: 'AUTH',
    badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
    description: 'One-click sign-in button and 6-digit expiring verification code.',
    subject: 'Your NextLaunch sign-in code is 482-910',
  },
  {
    key: 'dunning',
    name: '5. Subscription Renewal',
    category: 'DUNNING',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Proactive notice 7 days prior to subscription renewal to reduce churn.',
    subject: 'Upcoming renewal reminder for NextLaunch Pro Plan — $49.00',
  },
];

export default function EmailPreviewsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('welcome');
  const [testEmail, setTestEmail] = useState('developer@company.com');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const activeTemplateMeta = TEMPLATES.find((t) => t.key === selectedTemplate)!;

  const handleSendTest = () => {
    setIsSending(true);
    setSendSuccess(false);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 4000);
    }, 1000);
  };

  const sampleSnippet = `import { sendTransactionalEmail } from '@/lib/email';
import { ${
    selectedTemplate === 'welcome'
      ? 'WelcomeEmail'
      : selectedTemplate === 'receipt'
      ? 'InvoiceReceiptEmail'
      : selectedTemplate === 'invite'
      ? 'TeamInviteEmail'
      : selectedTemplate === 'magic-link'
      ? 'MagicLinkEmail'
      : 'DunningRenewalEmail'
  } } from '@/emails/${
    selectedTemplate === 'welcome'
      ? 'WelcomeEmail'
      : selectedTemplate === 'receipt'
      ? 'InvoiceReceiptEmail'
      : selectedTemplate === 'invite'
      ? 'TeamInviteEmail'
      : selectedTemplate === 'magic-link'
      ? 'MagicLinkEmail'
      : 'DunningRenewalEmail'
  }';

await sendTransactionalEmail({
  to: '${testEmail}',
  subject: '${activeTemplateMeta.subject}',
  template: <${
    selectedTemplate === 'welcome'
      ? 'WelcomeEmail userName="Alex Rivera" workspaceName="Acme SaaS Inc."'
      : selectedTemplate === 'receipt'
      ? 'InvoiceReceiptEmail amountPaid="$99.00" invoiceNumber="INV-2026-0982"'
      : selectedTemplate === 'invite'
      ? 'TeamInviteEmail inviterName="Alex Rivera" workspaceName="Acme SaaS"'
      : selectedTemplate === 'magic-link'
      ? 'MagicLinkEmail authCode="482-910"'
      : 'DunningRenewalEmail amount="$49.00" renewalDate="Sep 20, 2026"'
  } />,
});`;

  const copySnippet = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Transactional Email Suite</h1>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">
              5 Pro Templates
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Production-ready React Email templates built for high deliverability and conversion.
          </p>
        </div>

        <a
          href={`/api/emails/preview?template=${selectedTemplate}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
        >
          <span>Open Raw HTML</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </a>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Template Navigator & Controls */}
        <div className="lg:col-span-4 space-y-4">
          {/* Template Selector */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Template</h3>
              <span className="text-[11px] font-semibold text-slate-500">5 Included</span>
            </div>

            {TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.key;
              return (
                <button
                  key={tmpl.key}
                  type="button"
                  onClick={() => setSelectedTemplate(tmpl.key)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600/20'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                      {tmpl.name}
                    </span>
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border ${tmpl.badgeColor}`}>
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Test Sender Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-900 text-xs font-bold">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>Resend Test Dispatcher</span>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Send Preview To</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={handleSendTest}
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSending ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Dispatching to Resend API...</span>
                </>
              ) : sendSuccess ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  <span>Test Dispatched Successfully!</span>
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Test Email</span>
                </>
              )}
            </button>
          </div>

          {/* Code Snippet Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700">Server Action Usage</span>
              <button
                type="button"
                onClick={copySnippet}
                className="text-slate-500 hover:text-blue-600 transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
                title="Copy code"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="text-[11px]">Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-[10px] font-mono text-slate-800 overflow-x-auto p-3 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed">
              {sampleSnippet}
            </pre>
          </div>
        </div>

        {/* Right Column: Clean Isolated Email Preview Sandbox */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden flex-1 flex flex-col">
            {/* Clean Header Bar */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  ✉
                </div>
                <span className="text-xs font-bold text-slate-900">Email Live Sandbox</span>
              </div>

              <span className="text-[11px] font-semibold text-slate-500">
                Sandboxed Frame (100% Isolated)
              </span>
            </div>

            {/* Email Metadata Info */}
            <div className="px-5 py-3 border-b border-slate-100 bg-white space-y-1 text-xs">
              <div className="flex items-baseline gap-3">
                <span className="font-bold text-slate-400 w-16 text-[11px] uppercase tracking-wider">Subject:</span>
                <span className="font-bold text-slate-900">{activeTemplateMeta.subject}</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-bold text-slate-400 w-16 text-[11px] uppercase tracking-wider">From:</span>
                <span className="text-slate-700 font-mono text-[11px]">
                  NextLaunch Notifications &lt;notifications@nextlaunch.dev&gt;
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-bold text-slate-400 w-16 text-[11px] uppercase tracking-wider">To:</span>
                <span className="text-slate-700 font-mono text-[11px]">{testEmail}</span>
              </div>
            </div>

            {/* Isolated Iframe Canvas */}
            <div className="flex-1 bg-slate-100/70 p-4 sm:p-6 flex justify-center items-start overflow-hidden min-h-[660px]">
              <iframe
                key={selectedTemplate}
                src={`/api/emails/preview?template=${selectedTemplate}`}
                className="w-full h-[660px] border border-slate-200 rounded-xl bg-white shadow-xs"
                title="Email Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
