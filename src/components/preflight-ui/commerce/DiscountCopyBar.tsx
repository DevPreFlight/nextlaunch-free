'use client';

import React, { useState } from 'react';

export interface DiscountCopyBarProps {
  code?: string;
  discountText?: string;
  tag?: string;
  className?: string;
}

export const DiscountCopyBar: React.FC<DiscountCopyBarProps> = ({
  code = 'PREFLIGHT20',
  discountText = 'Use coupon for 20% off all kits & modules',
  tag = 'LAUNCH DISCOUNT',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full bg-[#0f172a] text-[#f8fafc] text-xs py-2.5 px-3.5 sm:px-4 rounded-[8px] border border-[#1e293b] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shadow-xs ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2 overflow-hidden">
        {tag && (
          <span className="bg-[#2563eb] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] tracking-wider uppercase shrink-0">
            {tag}
          </span>
        )}
        <span className="text-[#cbd5e1] font-medium break-words">
          {discountText}{' '}
          <code className="bg-[#1e293b] text-[#93c5fd] px-1.5 py-0.5 rounded font-mono font-bold border border-[#334155] mx-1">
            {code}
          </code>
        </span>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155] hover:border-[#475569] text-xs font-semibold px-2.5 py-1 rounded-[6px] transition-all cursor-pointer shrink-0"
        aria-label="Copy coupon code"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5 text-[#16a34a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2} />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth={2} />
            </svg>
            <span>Copy Code</span>
          </>
        )}
      </button>
    </div>
  );
};
