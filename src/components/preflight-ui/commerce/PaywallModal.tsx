'use client';

import React, { useState } from 'react';
import { ModalDialog } from '../feedback/ModalDialog';
import { Button } from '../primitives/Button';

export interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
  featureName?: string;
  price?: number;
  promoCode?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  featureName = 'Advanced Analytics & Exports',
  price = 49,
  promoCode = 'PREFLIGHT20',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center py-1 sm:py-2">
        {/* Crown / Lock icon */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] flex items-center justify-center shadow-xs">
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-0.5 rounded-full inline-block">
          Pro Feature Locked
        </span>

        <h3 className="text-lg sm:text-2xl font-extrabold text-[#0f172a] tracking-tight mt-2.5 mb-1.5 sm:mt-3 sm:mb-2">
          Unlock {featureName}
        </h3>

        <p className="text-xs sm:text-sm text-[#64748b] max-w-sm mx-auto mb-4 sm:mb-6 leading-relaxed">
          Upgrade to the Pro tier today to instantly gain access to all locked modules, production
          ready boilerplates, and lifetime updates.
        </p>

        {/* Benefits list */}
        <div className="p-3.5 sm:p-4 rounded-[10px] bg-[#f8fafc] border border-[#e2e8f0] text-left mb-4 sm:mb-6 space-y-2">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#334155]">
            <svg className="w-4 h-4 text-[#16a34a] shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Full 60+ modular components unlocked</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#334155]">
            <svg className="w-4 h-4 text-[#16a34a] shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>React 19 + Next.js 15 (TypeScript) included</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#334155]">
            <svg className="w-4 h-4 text-[#16a34a] shrink-0 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Commercial license for unlimited client projects</span>
          </div>
        </div>

        {/* Coupon Copy Pill */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 rounded-[8px] bg-[#eff6ff] border border-[#bfdbfe] mb-5 sm:mb-6 gap-2 sm:gap-3">
          <div className="text-left">
            <span className="block text-[10px] font-bold text-[#1d4ed8]">SPECIAL LAUNCH OFFER</span>
            <span className="text-xs text-[#334155]">Get 20% off with coupon:</span>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-[6px] bg-white text-[#2563eb] border border-[#bfdbfe] text-xs font-mono font-bold hover:bg-[#dbeafe] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <span>{promoCode}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2} />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth={2} />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3">
          <Button variant="ghost" fullWidth onClick={onClose}>
            Maybe Later
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={onUpgrade}
            rightIcon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            }
          >
            Unlock Now for ${price}
          </Button>
        </div>
      </div>
    </ModalDialog>
  );
};
