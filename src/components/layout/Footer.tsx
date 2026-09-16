import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm overflow-hidden p-1">
                <img src="/logo.svg" alt="NextLaunch Pro" className="h-full w-full" />
              </div>
              <span className="text-lg font-bold text-slate-900">NextLaunch Pro</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Enterprise-grade Next.js 16 and React 19 full-stack SaaS boilerplate with Polar billing, multi-tenancy, and Flat UI components.
            </p>
            <p className="text-xs text-slate-400">
              Crafted by DevPreFlight. Built for speed and scale.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/#features" className="hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="/ws_demo_cloud_01" className="hover:text-blue-600 transition-colors">Dashboard Demo</Link></li>
              <li><Link href="/#architecture" className="hover:text-blue-600 transition-colors">Architecture</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Tech Stack</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Next.js 16 (App Router)</li>
              <li>React 19 & Server Actions</li>
              <li>Polar Subscriptions & Webhooks</li>
              <li>Prisma ORM & PostgreSQL</li>
              <li>PreFlight Flat UI Design System</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Legal & Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="https://devpreflight.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">DevPreFlight Hub</a></li>
              <li><a href="https://polar.sh" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Polar Merchant of Record</a></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Commercial License</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NextLaunch Pro / DevPreFlight. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
