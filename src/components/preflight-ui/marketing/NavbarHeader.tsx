'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../primitives/Button';

export interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface NavbarHeaderProps {
  brandName?: string;
  brandTagline?: string;
  logoUrl?: string;
  links?: NavLinkItem[];
  showAnnouncement?: boolean;
  announcementBadge?: string;
  announcementText?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  className?: string;
}

const defaultLinks: NavLinkItem[] = [
  { label: 'Overview', href: '#overview', description: 'Core features & principles' },
  { label: 'Component Catalog', href: '#catalog', badge: '60+', description: 'Commerce, Dashboard & UI Primitives' },
  { label: 'Theme Inspector', href: '#theme-inspector', description: 'Design tokens & CSS variables' },
  { label: 'Playground', href: '/playground', badge: 'Live', description: 'Interactive Storybook sandbox' },
  { label: 'Documentation', href: '/docs', description: 'Setup guide & AI agent skills' },
];

export const NavbarHeader: React.FC<NavbarHeaderProps> = ({
  brandName = 'DevPreFlight',
  brandTagline = 'UI Component Kit',
  logoUrl = '/logo.svg',
  links = defaultLinks,
  showAnnouncement = true,
  announcementBadge = 'OFFICIAL SHOWCASE',
  announcementText = 'Interactive Component Explorer for React 19, Next.js 16 & Tailwind CSS',
  primaryCtaLabel = 'Browse 60+ Components',
  primaryCtaHref = '#catalog',
  secondaryCtaLabel = 'Playground',
  secondaryCtaHref = '/playground',
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close drawer on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] ${className}`}>
      {/* Top Announcement Bar (Subtle & High-Contrast) */}
      {showAnnouncement && (
        <div className="bg-[#0f172a] text-white py-1.5 px-4 sm:px-6 text-xs border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden truncate">
              <span className="bg-[#2563eb] text-white text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-[4px] shrink-0">
                {announcementBadge}
              </span>
              <span className="text-[#cbd5e1] text-xs font-normal truncate">
                {announcementText}
              </span>
            </div>

            <a
              href={secondaryCtaHref}
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#93c5fd] hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-0.5 rounded-[6px] transition-colors shrink-0"
            >
              <span>Launch Playground</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a href="/" className="flex items-center gap-3 select-none group shrink-0">
          <div className="relative w-8 h-8 rounded-[8px] bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            <img
              src={logoUrl}
              alt={`${brandName} Logo`}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                // Fallback icon if logo image not found
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#0f172a] text-base leading-tight tracking-tight">
                {brandName}
              </span>
              <span className="text-[10px] font-bold text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-1.5 py-0.2 rounded-[4px]">
                UI
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#64748b] leading-tight">
              {brandTagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Airy, Hover pill effect) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-[8px] text-xs font-semibold text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-all flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {secondaryCtaLabel && (
            <a href={secondaryCtaHref} className="hidden sm:inline-block">
              <Button variant="secondary" size="sm">
                {secondaryCtaLabel}
              </Button>
            </a>
          )}

          {primaryCtaLabel && (
            <a href={primaryCtaHref} className="hidden sm:inline-block">
              <Button
                variant="primary"
                size="sm"
                rightIcon={
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                }
              >
                {primaryCtaLabel}
              </Button>
            </a>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-[8px] border border-[#cbd5e1] text-[#334155] hover:bg-[#f1f5f9] active:bg-[#e2e8f0] cursor-pointer transition-colors"
            aria-label="Open mobile navigation drawer"
          >
            <svg className="w-5 h-5 text-[#0f172a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Premium Mobile Slide-Over Drawer Overlay & Panel        */}
      {/* ======================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative w-full sm:w-84 max-w-[88vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200 border-l border-[#cbd5e1] text-left">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[#e2e8f0] flex items-center justify-between gap-3 bg-[#f8fafc]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[6px] bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                  ▲
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-[#0f172a] text-sm leading-tight">
                    {brandName}
                  </span>
                  <span className="text-[10px] font-semibold text-[#64748b]">
                    {brandTagline}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-[6px] text-[#64748b] hover:text-[#0f172a] hover:bg-[#e2e8f0] transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
              <span className="block px-3 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#94a3b8]">
                Navigation Menu
              </span>

              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex flex-col p-3 rounded-[10px] bg-white hover:bg-[#f8fafc] border border-transparent hover:border-[#e2e8f0] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0f172a] group-hover:text-[#2563eb] transition-colors">
                      {link.label}
                    </span>
                    {link.badge && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  {link.description && (
                    <span className="text-xs text-[#64748b] mt-0.5 line-clamp-1">
                      {link.description}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Drawer Footer & Actions */}
            <div className="p-4 sm:p-5 border-t border-[#e2e8f0] bg-[#f8fafc] space-y-2.5">
              {primaryCtaLabel && (
                <a
                  href={primaryCtaHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="primary" size="md" fullWidth>
                    {primaryCtaLabel}
                  </Button>
                </a>
              )}

              {secondaryCtaLabel && (
                <a
                  href={secondaryCtaHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <Button variant="outline" size="md" fullWidth>
                    {secondaryCtaLabel}
                  </Button>
                </a>
              )}

              {/* Stack Badges */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono font-bold text-[#64748b]">
                <span>React 19</span>
                <span>•</span>
                <span>Next.js 16</span>
                <span>•</span>
                <span>Tailwind 4</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
