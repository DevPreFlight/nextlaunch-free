'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  CreditCard,
  Users,
  Settings,
  Sparkles,
  Layers,
  Activity,
  Zap,
  ArrowRight,
  Shield,
  FileText,
  X,
  ExternalLink
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Resources';
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { simulateWebhook, triggerConfetti } = useDemo();

  const commands: CommandItem[] = [
    {
      id: 'nav-overview',
      title: 'Dashboard Overview',
      category: 'Navigation',
      icon: LayoutDashboard,
      shortcut: 'G O',
      action: () => router.push(`/${workspaceId}`),
    },
    {
      id: 'nav-analytics',
      title: 'SaaS Analytics & Metrics',
      category: 'Navigation',
      icon: Activity,
      shortcut: 'G A',
      action: () => router.push(`/${workspaceId}/analytics`),
    },
    {
      id: 'nav-billing',
      title: 'Polar Billing & Subscriptions',
      category: 'Navigation',
      icon: CreditCard,
      shortcut: 'G B',
      action: () => router.push(`/${workspaceId}/billing`),
    },
    {
      id: 'nav-team',
      title: 'Team & RBAC Permissions',
      category: 'Navigation',
      icon: Users,
      shortcut: 'G T',
      action: () => router.push(`/${workspaceId}/team`),
    },
    {
      id: 'nav-ai-studio',
      title: 'Gemini AI Studio Playground',
      category: 'Navigation',
      icon: Sparkles,
      shortcut: 'G S',
      action: () => router.push(`/${workspaceId}/ai-studio`),
    },
    {
      id: 'nav-ui-showcase',
      title: 'PreFlight Flat UI Showcase (60+)',
      category: 'Navigation',
      icon: Layers,
      shortcut: 'G U',
      action: () => router.push(`/${workspaceId}/ui-showcase`),
    },
    {
      id: 'nav-settings',
      title: 'Workspace Settings & API Keys',
      category: 'Navigation',
      icon: Settings,
      action: () => router.push(`/${workspaceId}/settings`),
    },
    {
      id: 'act-simulate-sale',
      title: 'Simulate $29 Subscription Sale (Polar Webhook)',
      category: 'Actions',
      icon: Sparkles,
      shortcut: 'S S',
      action: () => {
        simulateWebhook('subscription.created');
      },
    },
    {
      id: 'act-simulate-addon',
      title: 'Simulate $49 Addon Order (Polar Webhook)',
      category: 'Actions',
      icon: Zap,
      shortcut: 'S A',
      action: () => {
        simulateWebhook('order.created');
      },
    },
    {
      id: 'act-confetti',
      title: 'Trigger Celebratory Confetti',
      category: 'Actions',
      icon: Sparkles,
      action: () => {
        triggerConfetti();
      },
    },
    {
      id: 'res-docs',
      title: 'DevPreFlight Documentation',
      category: 'Resources',
      icon: ExternalLink,
      action: () => {
        window.open('https://devpreflight.com', '_blank');
      },
    },
  ];

  const filteredCommands = query
    ? commands.filter((cmd) =>
        cmd.title.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const executeCommand = (cmd: CommandItem) => {
    setIsOpen(false);
    setQuery('');
    cmd.action();
  };

  const handleNavKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onKeyDown={handleNavKeyDown}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, route, or action (e.g. 'Billing', 'Sale', 'UI Kit')..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Command Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching commands or routes found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const Icon = cmd.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd className="hidden sm:inline-block font-mono text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              Navigate <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">↑↓</kbd>
            </span>
            <span>
              Select <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">↵</kbd>
            </span>
            <span>
              Close <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">Esc</kbd>
            </span>
          </div>
          <span className="text-slate-400 font-medium">NextLaunch Power Palette</span>
        </div>
      </div>
    </div>
  );
}
