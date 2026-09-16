'use client';

import React from 'react';

export const FooterMultiCol: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <footer className={`w-full bg-white border-t border-[#cbd5e1] py-12 text-left ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/logo.svg"
                alt="DevPreFlight Logo"
                className="w-7 h-7 rounded-[6px]"
              />
              <span className="font-extrabold text-[#0f172a] text-base tracking-tight">
                DevPreFlight UI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed max-w-sm mb-4">
              Modern, accessible, flat white &amp; blue UI kit with 60+ copy-paste components for
              React 19, Next.js, and TypeScript.
            </p>
            <span className="inline-block text-[11px] font-semibold text-[#16a34a] bg-[#f0fdf4] border border-[#bbf7d0] px-2.5 py-0.5 rounded-full">
              WCAG AAA Compliant
            </span>
          </div>

          {/* Col 1: Modules */}
          <div>
            <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">
              Modules
            </h4>
            <ul className="space-y-2 text-xs text-[#64748b]">
              <li><a href="#commerce" className="hover:text-[#2563eb] transition-colors">Commerce &amp; Billing</a></li>
              <li><a href="#dashboard" className="hover:text-[#2563eb] transition-colors">Dashboard Controls</a></li>
              <li><a href="#marketing" className="hover:text-[#2563eb] transition-colors">Marketing Blocks</a></li>
              <li><a href="#feedback" className="hover:text-[#2563eb] transition-colors">Feedback &amp; Overlays</a></li>
              <li><a href="#primitives" className="hover:text-[#2563eb] transition-colors">Form Primitives</a></li>
            </ul>
          </div>

          {/* Col 2: Architecture */}
          <div>
            <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">
              Tech Stack
            </h4>
            <ul className="space-y-2 text-xs text-[#64748b]">
              <li><a href="/docs" className="hover:text-[#2563eb] transition-colors">React 19 (TSX)</a></li>
              <li><a href="/docs" className="hover:text-[#2563eb] transition-colors">Next.js App Router</a></li>
              <li><a href="/docs" className="hover:text-[#2563eb] transition-colors">TypeScript (Strict)</a></li>
              <li><a href="/docs" className="hover:text-[#2563eb] transition-colors">Tailwind CSS 4.0</a></li>
              <li><a href="/docs" className="hover:text-[#2563eb] transition-colors">Pure CSS Tokens</a></li>
            </ul>
          </div>

          {/* Col 3: Resources & License */}
          <div>
            <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">
              Product &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#64748b]">
              <li><a href="#pricing" className="hover:text-[#2563eb] transition-colors">Commercial License</a></li>
              <li><a href="/playground" className="hover:text-[#2563eb] transition-colors">Interactive Playground</a></li>
              <li><a href="#faq" className="hover:text-[#2563eb] transition-colors">Frequently Asked</a></li>
              <li><a href="#pricing" className="hover:text-[#2563eb] transition-colors">Customer Portal</a></li>
              <li><a href="mailto:support@devpreflight.com" className="hover:text-[#2563eb] transition-colors">Email Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94a3b8]">
          <p>© {new Date().getFullYear()} DevPreFlight. All rights reserved. Built for global shipping.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span>Lifetime Access</span>
            <span>•</span>
            <span>Free Updates</span>
            <span>•</span>
            <span>Zero Lock-in</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
