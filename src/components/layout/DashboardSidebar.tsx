'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Layers,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Lock,
  LogOut,
  Bot,
  Mail,
  ShieldCheck,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useDemo } from '@/lib/demo-context';
import { FEATURES } from '@/config/features';

interface SidebarProps {
  workspaceId: string;
}

export function DashboardSidebar({ workspaceId }: SidebarProps) {
  const pathname = usePathname();
  const { currentPlan } = useDemo();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Restore collapsed state from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    const savedState = localStorage.getItem('nextlaunch_sidebar_collapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('nextlaunch_sidebar_collapsed', String(next));
      return next;
    });
  };

  const navItems = [
    {
      name: 'Overview',
      href: `/${workspaceId}`,
      icon: LayoutDashboard,
      exact: true,
      enabled: true,
    },
    {
      name: 'AI Copilot Studio',
      href: `/${workspaceId}/ai-studio`,
      icon: Bot,
      proBadge: 'PRO',
      enabled: FEATURES.enableAiStudio,
    },
    {
      name: 'Analytics',
      href: `/${workspaceId}/analytics`,
      icon: BarChart3,
      enabled: true,
    },
    {
      name: 'Team & Members',
      href: `/${workspaceId}/team`,
      icon: Users,
      enabled: FEATURES.enableTeamWorkspaces,
    },
    {
      name: 'Transactional Emails',
      href: `/${workspaceId}/emails`,
      icon: Mail,
      badge: '5 Tmpl',
      enabled: FEATURES.enableEmails,
    },
    {
      name: 'Billing & Plans',
      href: `/${workspaceId}/billing`,
      icon: CreditCard,
      enabled: true,
    },
    {
      name: 'Security & Audit Logs',
      href: `/${workspaceId}/audit-logs`,
      icon: ShieldAlert,
      isPaywalled: currentPlan !== 'enterprise',
      badge: 'Enterprise',
      enabled: FEATURES.enableAuditLogs,
    },
    {
      name: 'UI Kit Gallery (60+)',
      href: `/${workspaceId}/ui-showcase`,
      icon: Layers,
      highlight: true,
      enabled: true,
    },
    {
      name: 'Settings & API Keys',
      href: `/${workspaceId}/settings`,
      icon: Settings,
      enabled: true,
    },
  ];

  return (
    <aside
      className={`border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none transition-all duration-300 ease-in-out z-20 ${
        isCollapsed ? 'w-[76px]' : 'w-64'
      }`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Workspace Switcher & Collapse Toggle Header */}
        <div className={`p-3 border-b border-slate-200 ${isCollapsed ? 'px-2' : 'p-4'}`}>
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/"
              className={`flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}
              title="NextLaunch Pro"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 shadow-sm shrink-0 overflow-hidden p-1">
                <img src="/logo.svg" alt="NextLaunch Pro" className="h-full w-full" />
              </div>
              {!isCollapsed && (
                <span className="font-bold text-slate-900 text-sm tracking-tight truncate">
                  NextLaunch Pro
                </span>
              )}
            </Link>

            {!isCollapsed && (
              <button
                type="button"
                onClick={toggleSidebar}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Workspace Pill / Avatar */}
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                className="h-9 w-9 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm hover:bg-blue-700 transition-colors"
                title={`Acme SaaS Inc. (${currentPlan.toUpperCase()} Plan)`}
              >
                A
              </button>
              <button
                type="button"
                onClick={toggleSidebar}
                className="p-1 mt-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="w-full flex items-center justify-between p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="h-6 w-6 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  A
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-900 truncate">Acme SaaS Inc.</p>
                  <p className="text-[10px] text-slate-500 uppercase font-semibold text-blue-600">
                    {currentPlan.toUpperCase()} Plan (Active)
                  </p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
            </button>
          )}
        </div>

        {/* Navigation items */}
        <nav className={`space-y-1 py-3 ${isCollapsed ? 'px-2' : 'px-3'}`}>
          {!isCollapsed && (
            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Workspace
            </div>
          )}

          {navItems
            .filter((i) => i.enabled)
            .map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center rounded-lg transition-all ${
                    isCollapsed
                      ? 'justify-center p-2.5 h-10 w-10 mx-auto relative group'
                      : 'gap-3 px-3 py-2 text-sm font-medium'
                  } ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-sm'
                      : item.highlight
                      ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`shrink-0 ${
                      isCollapsed ? 'h-5 w-5' : 'h-4 w-4'
                    } ${
                      isActive
                        ? 'text-blue-600'
                        : item.highlight
                        ? 'text-blue-600'
                        : 'text-slate-400'
                    }`}
                  />

                  {!isCollapsed && (
                    <>
                      <span className="truncate">{item.name}</span>

                      {item.proBadge && (
                        <span className="ml-auto inline-flex items-center rounded-md bg-blue-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                          {item.proBadge}
                        </span>
                      )}

                      {item.isPaywalled && (
                        <span className="ml-auto inline-flex items-center gap-0.5 rounded-md bg-purple-50 px-1.5 py-0.5 text-[9px] font-bold text-purple-700 border border-purple-200">
                          <Lock className="h-2.5 w-2.5" />
                          <span>$99</span>
                        </span>
                      )}

                      {item.badge && !item.isPaywalled && (
                        <span className="ml-auto inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600 border border-slate-200">
                          {item.badge}
                        </span>
                      )}

                      {item.highlight && (
                        <span className="ml-auto rounded-full bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold text-blue-700">
                          60+
                        </span>
                      )}
                    </>
                  )}

                  {/* Indicator Dot when collapsed */}
                  {isCollapsed && (item.proBadge || item.highlight || item.isPaywalled) && (
                    <span
                      className={`absolute top-1.5 right-1.5 h-2 w-2 rounded-full ${
                        item.proBadge
                          ? 'bg-blue-600'
                          : item.isPaywalled
                          ? 'bg-purple-600'
                          : 'bg-emerald-500'
                      }`}
                    />
                  )}
                </Link>
              );
            })}

          {/* Superadmin shortcut link if enabled */}
          {FEATURES.enableAdminBackoffice && (
            <div className={`pt-2 mt-2 border-t border-slate-100 ${isCollapsed ? 'px-0' : ''}`}>
              <Link
                href="/admin"
                title={isCollapsed ? 'Superadmin Backoffice' : undefined}
                className={`flex items-center rounded-lg text-red-600 hover:bg-red-50 transition-colors ${
                  isCollapsed
                    ? 'justify-center p-2.5 h-10 w-10 mx-auto'
                    : 'gap-3 px-3 py-2 text-xs font-semibold'
                }`}
              >
                <ShieldCheck className={`shrink-0 text-red-600 ${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'}`} />
                {!isCollapsed && (
                  <>
                    <span className="truncate">Superadmin Backoffice</span>
                    <span className="ml-auto text-[9px] font-bold uppercase bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                      Root
                    </span>
                  </>
                )}
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Footer Upgrade & User Profile */}
      <div className={`space-y-3 border-t border-slate-200 ${isCollapsed ? 'p-2' : 'p-3'}`}>
        {/* Upgrade / Polar Status Card */}
        {isCollapsed ? (
          <a
            href="https://react-kit.devpreflight.com"
            target="_blank"
            rel="noopener noreferrer"
            title="PreFlight Flat UI Standalone Kit (60+ Components)"
            className="flex items-center justify-center h-10 w-10 mx-auto rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
          </a>
        ) : (
          <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3">
            <div className="flex items-center gap-1.5 text-blue-800 text-xs font-bold mb-1">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>PreFlight Flat UI</span>
            </div>
            <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
              All 60+ components crafted for React 19 & Tailwind CSS.
            </p>
            <a
              href="https://react-kit.devpreflight.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Standalone Kit ($29)
            </a>
          </div>
        )}

        {/* User Card */}
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between pt-1'
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden" title="Alex Rivera (Owner)">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
              AR
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 truncate">Alex Rivera</p>
                <p className="text-[10px] text-slate-500 truncate">Owner</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <Link
              href="/login"
              title="Sign Out"
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
