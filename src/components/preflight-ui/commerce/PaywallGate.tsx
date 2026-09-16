'use client';

import React, { useState } from 'react';
import { Button } from '../primitives/Button';

export interface PaywallGateProps {
  /** The protected content obscured behind the paywall gate */
  children: React.ReactNode;
  /** Whether the paywall gate is active and locking content */
  isLocked?: boolean;
  /** Title of the locked feature or workspace capability */
  featureName?: string;
  /** Status badge label (defaults to 'Pro Feature Locked') */
  badgeText?: string;
  /** Explanatory description of the locked capability */
  description?: string;
  /** Price amount for unlocking */
  price?: number | string;
  /** Currency symbol prefix (defaults to '$') */
  currencySymbol?: string;
  /** Optional promotional discount coupon code */
  promoCode?: string;
  /** Optional discount callout label (e.g. '-20%') */
  discountLabel?: string;
  /** List of feature highlights or custom entitlement node */
  benefits?: string[] | React.ReactNode;
  /** Callback triggered when user clicks the upgrade CTA */
  onUpgrade?: (promoCode?: string) => void | Promise<void>;
  /** Optional callback to dismiss or navigate away from the gate */
  onDismiss?: () => void;
  /** External loading state for the upgrade action */
  isUpgrading?: boolean;
  /** Minimum height for the locked container (defaults to '520px') */
  minHeight?: string | number;
  /** Custom additional className for the outer container */
  className?: string;
}

const defaultBenefits: string[] = [
  'Instant unminified React 19 (TypeScript) source',
  'Commercial unlimited client license',
];

export const PaywallGate: React.FC<PaywallGateProps> = ({
  children,
  isLocked = true,
  featureName = 'Pro Analytics & Deep Insights',
  badgeText = 'Pro Feature Locked',
  description = 'Upgrade your workspace plan to unlock unrestricted access to this feature and companion tools.',
  price = 49,
  currencySymbol = '$',
  promoCode = 'PREFLIGHT20',
  discountLabel = '-20%',
  benefits = defaultBenefits,
  onUpgrade,
  onDismiss,
  isUpgrading = false,
  minHeight = '520px',
  className = '',
}) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [internalLoading, setInternalLoading] = useState(false);

  const handleCopyCode = async () => {
    if (!promoCode) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(promoCode);
        setCopyStatus('copied');
      } else if (typeof document !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = promoCode;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyStatus(successful ? 'copied' : 'error');
      } else {
        setCopyStatus('error');
      }
    } catch {
      setCopyStatus('error');
    } finally {
      setTimeout(() => setCopyStatus('idle'), 2500);
    }
  };

  const handleUpgradeClick = async () => {
    if (!onUpgrade || isUpgrading || internalLoading) return;
    try {
      setInternalLoading(true);
      await onUpgrade(promoCode);
    } finally {
      setInternalLoading(false);
    }
  };

  if (!isLocked) {
    return <div className={`w-full ${className}`}>{children}</div>;
  }

  const computedMinHeight = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
  const isLoading = isUpgrading || internalLoading;

  return (
    <div
      className={`relative w-full rounded-2xl border border-slate-200 overflow-hidden bg-slate-900/5 flex items-center justify-center p-4 sm:p-8 ${className}`}
      style={{ minHeight: computedMinHeight }}
      role="region"
      aria-label={`Locked feature gate: ${featureName}`}
    >
      {/* Screen Reader Announcement Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {copyStatus === 'copied'
          ? `Promo code ${promoCode} copied to clipboard.`
          : copyStatus === 'error'
          ? 'Failed to copy promo code to clipboard.'
          : ''}
      </div>

      {/* Blurred / Obscured Children Content in Background with Focus Trapping */}
      <div
        className="absolute inset-0 w-full h-full filter blur-[8px] opacity-30 pointer-events-none select-none p-6 overflow-hidden flex flex-col justify-center"
        aria-hidden="true"
        tabIndex={-1}
        inert={true}
      >
        {children}
      </div>

      {/* Centered Paywall Gate Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl border border-blue-200/80 shadow-2xl p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200 my-auto">
        {/* Optional Dismiss Action */}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss paywall"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Lock Icon */}
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shadow-xs">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Status Badge */}
        {badgeText && (
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full inline-block">
            {badgeText}
          </span>
        )}

        {/* Feature Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-2.5 mb-1.5 break-words">
          {featureName}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-slate-600 max-w-xs mx-auto mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Entitlements / Benefits */}
        {benefits && (
          <div className="p-3.5 rounded-xl bg-slate-50/80 text-left mb-4 space-y-2">
            {Array.isArray(benefits) ? (
              benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-slate-700">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))
            ) : (
              benefits
            )}
          </div>
        )}

        {/* Promo Code Strip */}
        {promoCode && (
          <div
            onClick={handleCopyCode}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCopyCode();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Copy coupon code ${promoCode}${discountLabel ? ` for ${discountLabel}` : ''}`}
            className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 hover:border-blue-200 transition-all cursor-pointer mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 select-none group"
          >
            <div className="text-left">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-blue-800">COUPON CODE</span>
              <span className="text-xs font-semibold text-slate-900">
                {promoCode} {discountLabel ? `(${discountLabel})` : ''}
              </span>
            </div>
            <span
              className="px-2.5 py-1 rounded-lg bg-white text-blue-700 border border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300 text-xs font-mono font-bold transition-all shadow-xs"
              aria-hidden="true"
            >
              {copyStatus === 'copied' ? '✓ Copied' : copyStatus === 'error' ? 'Failed' : 'Copy'}
            </span>
          </div>
        )}

        {/* Primary Unlock CTA */}
        <Button
          variant="primary"
          fullWidth
          disabled={isLoading}
          onClick={handleUpgradeClick}
          rightIcon={
            isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )
          }
        >
          {isLoading ? 'Unlocking...' : `Unlock Now for ${currencySymbol}${price}`}
        </Button>
      </div>
    </div>
  );
};
