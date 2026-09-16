'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useDemo } from '@/lib/demo-context';
import {
  Bot,
  Sparkles,
  Send,
  Zap,
  Coins,
  Copy,
  Check,
  RefreshCw,
  Code2,
  FileText,
  Database,
  Mail,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/preflight-ui';

export default function AiStudioPage() {
  const { addToast, triggerConfetti } = useDemo();
  const [model, setModel] = useState('gemini-2.5-flash');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [credits, setCredits] = useState(1250);
  const [copied, setCopied] = useState(false);
  const responseEndRef = useRef<HTMLDivElement>(null);

  const models = [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', badge: 'Ultra-Fast & Smart', cost: '5 credits' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', badge: 'Complex Reasoning', cost: '15 credits' },
    { id: 'gpt-4o', name: 'OpenAI GPT-4o', badge: 'Omni Multimodal', cost: '20 credits' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', badge: 'Coding Specialist', cost: '20 credits' },
  ];

  const presets = [
    {
      title: 'Type-Safe Server Action',
      icon: Code2,
      prompt: 'Write a production-ready Next.js 16 React 19 Server Action with Zod validation, error handling, and Prisma ORM mutation.',
    },
    {
      title: 'High-Converting SaaS Copy',
      icon: FileText,
      prompt: 'Generate an engaging, high-converting hero headline, sub-headline, and 3 value propositions for a modern B2B analytics SaaS.',
    },
    {
      title: 'PostgreSQL Relational Schema',
      icon: Database,
      prompt: 'Draft a clean Prisma 7 schema for a multi-tenant workspace with User, Membership (RBAC), and Polar Subscription models.',
    },
    {
      title: 'Transactional Welcome Email',
      icon: Mail,
      prompt: 'Create a warm, crisp HTML onboarding welcome email template for newly registered SaaS users with a clear call-to-action.',
    },
  ];

  const handleGenerate = async (customPrompt?: string) => {
    const inputPrompt = customPrompt || prompt;
    if (!inputPrompt.trim() || isStreaming) return;

    if (credits < 5) {
      addToast('Insufficient Credits', 'Please top up your AI credits to continue generating.', 'warning');
      return;
    }

    setIsStreaming(true);
    setResponse('');
    setCredits((prev) => Math.max(0, prev - 5));

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt, model }),
      });

      if (!res.body) throw new Error('No readable stream available');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: !doneReading });
        setResponse((prev) => prev + chunkValue);
      }

      triggerConfetti();
      addToast('Generation Complete', 'AI output generated via multi-LLM stream (5 credits deducted).', 'success');
    } catch (err: any) {
      console.error('Generation Error:', err);
      setResponse(`\n⚠️ Generation failed: ${err.message}`);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    addToast('Copied to Clipboard', 'AI response copied.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <DashboardHeader
        title="Multi-LLM AI Copilot Studio"
        description="Build and deploy AI-powered SaaS features with real-time streaming, Gemini 2.5 SDK, and credit metering."
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 shadow-sm">
              <Coins className="h-4 w-4 text-amber-500 animate-pulse" />
              <span>{credits.toLocaleString()} Credits</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCredits((prev) => prev + 1000);
                triggerConfetti();
                addToast('Credits Added!', '+1,000 AI Credits added to workspace balance.', 'success');
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>Top-Up $10 (1k Credits)</span>
            </button>
          </div>
        }
      />

      <main className="p-6 space-y-6 max-w-6xl">
        {/* Model Selection Header Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Active Language Model Engine</h3>
            </div>
            <span className="text-xs text-slate-400">Low-Latency SSE Streaming</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {models.map((m) => {
              const isSelected = model === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setModel(m.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{m.name}</span>
                    <span className="text-[10px] font-mono font-semibold text-slate-500">{m.cost}</span>
                  </div>
                  <span className="inline-block text-[10px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                    {m.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Prompt Recipes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {presets.map((pr, i) => {
              const Icon = pr.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPrompt(pr.prompt);
                    handleGenerate(pr.prompt);
                  }}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group shadow-xs"
                >
                  <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{pr.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{pr.prompt}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Streaming Chat Output Window */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Streaming Output Preview</h3>
            </div>
            {response && (
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Output'}</span>
              </button>
            )}
          </div>

          <div className="min-h-[220px] max-h-[440px] overflow-y-auto rounded-xl bg-slate-950 p-5 font-mono text-xs text-white leading-relaxed whitespace-pre-wrap selection:bg-blue-700 selection:text-white border border-slate-800">
            {response ? (
              response
            ) : isStreaming ? (
              <span className="text-blue-400 animate-pulse">Generating response via {model}...</span>
            ) : (
              <span className="text-slate-500 italic">
                Select a recipe above or enter your prompt below to stream responses in real-time...
              </span>
            )}
            <div ref={responseEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate();
            }}
            className="flex items-center gap-3 pt-2"
          >
            <input
              type="text"
              placeholder="Ask anything or request code generation..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 rounded-xl border border-slate-300 py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs"
            />
            <button
              type="submit"
              disabled={isStreaming || !prompt.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {isStreaming ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span>{isStreaming ? 'Streaming...' : 'Generate'}</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
