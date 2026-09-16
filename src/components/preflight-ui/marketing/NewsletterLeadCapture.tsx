'use client';

import React, { useState } from 'react';
import { Button } from '../primitives/Button';

export interface NewsletterLeadCaptureProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  onSubscribe?: (email: string) => Promise<boolean> | boolean;
  className?: string;
}

export const NewsletterLeadCapture: React.FC<NewsletterLeadCaptureProps> = ({
  tag = 'STAY IN THE LOOP',
  title = 'Get New Free UI Components Weekly',
  subtitle = 'Join 4,500+ developers receiving our newest flat UI modules, code recipes, and starter boilerplates.',
  onSubscribe,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className={`w-full max-w-3xl mx-auto p-6 sm:p-10 rounded-[14px] bg-[#f8fafc] border border-[#cbd5e1] text-center shadow-xs ${className}`}
    >
      {tag && (
        <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full">
          {tag}
        </span>
      )}

      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight mt-3 mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#64748b] max-w-xl mx-auto mb-6 leading-relaxed">
        {subtitle}
      </p>

      {status === 'success' ? (
        <div className="p-4 rounded-[10px] bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-xs sm:text-sm font-semibold max-w-md mx-auto animate-in fade-in">
          ✓ Thanks for subscribing! Check your inbox for the free component pack download link.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-sm px-4 py-2.5 bg-white border border-[#cbd5e1] rounded-[8px] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#bfdbfe] text-[#0f172a] placeholder:text-[#94a3b8]"
              disabled={status === 'loading'}
            />
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe Free'}
            </Button>
          </div>

          {errorMsg && <p className="text-xs text-[#dc2626] font-medium mt-2">{errorMsg}</p>}

          <p className="text-[11px] text-[#94a3b8] mt-3">
            Zero spam. Unsubscribe anytime with a single click.
          </p>
        </form>
      )}
    </div>
  );
};
