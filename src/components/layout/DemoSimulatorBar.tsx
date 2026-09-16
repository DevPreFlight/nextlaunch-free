'use client';

import React, { useState } from 'react';
import { useDemo } from '@/lib/demo-context';
import { Sparkles, Zap, Layers, ChevronUp, ChevronDown, CheckCircle2, Shield, Activity } from 'lucide-react';
import Link from 'next/link';

export function DemoSimulatorBar({ workspaceId }: { workspaceId: string }) {
  const { simulateWebhook, triggerConfetti, currentPlan } = useDemo();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Control Center Panel */}
      {isExpanded && (
        <div className="mb-2 w-84 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs">
                ⚡
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide">Interactive Demo Control</h4>
                <p className="text-[10px] text-slate-400">Polar MoR & State Simulator</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Collapse demo dock"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <span className="text-slate-400">Active Tier:</span>
              <span className="font-semibold text-blue-400 capitalize">{currentPlan} Plan</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => simulateWebhook('subscription.created')}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 active:scale-95 transition-all shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>+ $29 Sale</span>
              </button>

              <button
                type="button"
                onClick={() => simulateWebhook('order.created')}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all shadow-sm"
              >
                <Zap className="h-3.5 w-3.5 text-emerald-300" />
                <span>+ $49 Addon</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={triggerConfetti}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white active:scale-95 transition-all border border-slate-700"
              >
                <span>🎉 Confetti</span>
              </button>

              <Link
                href={`/${workspaceId}/ui-showcase`}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 text-amber-950 px-2.5 py-1.5 text-xs font-bold hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>UI Kit (60+)</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/95 px-3.5 py-2 text-white shadow-xl backdrop-blur-md">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold">
          ⚡
        </div>
        <span className="text-xs font-semibold text-slate-200 hidden sm:inline">
          Demo Simulator
        </span>

        <div className="h-3.5 w-px bg-slate-800 mx-0.5 hidden sm:block" />

        <button
          type="button"
          onClick={() => simulateWebhook('subscription.created')}
          className="inline-flex items-center gap-1 rounded-full bg-blue-600/30 px-2.5 py-0.5 text-[11px] font-semibold text-blue-300 hover:bg-blue-600 hover:text-white active:scale-95 transition-all border border-blue-500/30"
          title="Simulate $29 Sale Webhook"
        >
          <Sparkles className="h-3 w-3 text-amber-300" />
          <span>+$29</span>
        </button>

        <button
          type="button"
          onClick={triggerConfetti}
          className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-200 hover:bg-slate-700 active:scale-95 transition-all border border-slate-700"
          title="Trigger celebratory confetti"
        >
          <span>🎉</span>
        </button>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ml-0.5"
          aria-label={isExpanded ? "Collapse demo controls" : "Expand demo controls"}
        >
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
