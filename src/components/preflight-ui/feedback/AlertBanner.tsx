'use client';

import React, { useState } from 'react';

export interface AlertBannerProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  title,
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const variantStyles = {
    info: {
      wrap: 'bg-[#eff6ff] border-[#bfdbfe] text-[#1e40af]',
      icon: (
        <svg className="w-5 h-5 text-[#2563eb] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    success: {
      wrap: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]',
      icon: (
        <svg className="w-5 h-5 text-[#16a34a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    warning: {
      wrap: 'bg-[#fff7ed] border-[#fed7aa] text-[#9a3412]',
      icon: (
        <svg className="w-5 h-5 text-[#ea580c] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    danger: {
      wrap: 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]',
      icon: (
        <svg className="w-5 h-5 text-[#dc2626] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  }[variant];

  return (
    <div
      role="alert"
      className={`w-full flex items-start gap-3 p-4 rounded-[10px] border text-left ${variantStyles.wrap} ${className}`}
    >
      {variantStyles.icon}

      <div className="flex-1 text-sm leading-relaxed">
        {title && <h4 className="font-semibold text-current mb-0.5">{title}</h4>}
        <div className="text-current/90 text-xs sm:text-sm">{children}</div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="text-current/70 hover:text-current p-1 rounded-md transition-colors cursor-pointer -mr-1 -mt-1"
          aria-label="Dismiss alert"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
