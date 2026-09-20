'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, ChevronDown, ChevronUp, X } from 'lucide-react';

export interface CookieConsentBannerProps {
  storageKey?: string;
  onAccept?: (consent: { necessary: boolean; analytics: boolean; preferences: boolean }) => void;
  onDecline?: () => void;
  privacyPolicyUrl?: string;
}

export function CookieConsentBanner({
  storageKey = 'nextlaunch_cookie_consent',
  onAccept,
  onDecline,
  privacyPolicyUrl,
}: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [allowPreferences, setAllowPreferences] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsVisible(true);
    }
  }, [storageKey]);

  const saveConsent = (analytics: boolean, preferences: boolean) => {
    const consent = { necessary: true, analytics, preferences, timestamp: new Date().toISOString() };
    try {
      localStorage.setItem(storageKey, JSON.stringify(consent));
    } catch (e) {
      console.warn('Failed to write cookie consent to storage', e);
    }

    if (onAccept) {
      onAccept(consent);
    }
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleAcceptEssential = () => {
    if (onDecline) onDecline();
    saveConsent(false, false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and privacy consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none"
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-5 text-slate-900 pointer-events-auto font-sans">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">Privacy & Cookie Preferences</h3>
            <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
              GDPR & CCPA Compliant
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          We use essential cookies to maintain secure sessions, handle checkout, and anonymous analytics to improve our product experience.
        </p>

        {/* Detailed Preferences Customization */}
        {isCustomizing && (
          <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span>Strictly Necessary</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">Required</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Session authentication, billing, and CSRF protection.</p>
              </div>
              <input type="checkbox" checked disabled className="mt-1 accent-blue-600" />
            </div>

            <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span>Analytics & Telemetry</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Optional</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Anonymous metrics to help us optimize UI and APIs.</p>
              </div>
              <input
                type="checkbox"
                checked={allowAnalytics}
                onChange={(e) => setAllowAnalytics(e.target.checked)}
                className="mt-1 accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span>Preferences & UI State</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Optional</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Saves your preferred workspace theme and tab selections.</p>
              </div>
              <input
                type="checkbox"
                checked={allowPreferences}
                onChange={(e) => setAllowPreferences(e.target.checked)}
                className="mt-1 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {isCustomizing ? (
            <>
              <button
                type="button"
                onClick={() => saveConsent(allowAnalytics, allowPreferences)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={() => setIsCustomizing(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all text-center"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-all text-center"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => setIsCustomizing(true)}
                className="text-xs text-slate-500 hover:text-blue-600 underline font-medium text-center py-1 sm:py-0"
              >
                Customize
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
