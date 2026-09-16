'use client';

import React, { useState } from 'react';
import { FaqItem } from '../types';

export interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultFaqs: FaqItem[] = [
  {
    id: '1',
    question: 'How do I use these components in my existing Next.js / React project?',
    answer:
      'All components are modular and copy-paste ready. You can simply copy the component file into your project or install the packages. Each component uses pure CSS variables or standard Tailwind utility classes, requiring zero third-party UI framework dependencies.',
  },
  {
    id: '2',
    question: 'Is this a one-time payment or a subscription?',
    answer:
      'It is 100% a one-time purchase. Once you buy a license, you own access to the repository with lifetime free updates. You will never be charged recurring fees.',
  },
  {
    id: '3',
    question: 'Can I use this UI Kit for commercial client projects?',
    answer:
      'Yes! The Pro and Enterprise licenses grant you unlimited commercial use rights for personal projects, SaaS startups, and client deliverables.',
  },
  {
    id: '4',
    question: 'Does this support Next.js 15 App Router and React Server Components?',
    answer:
      'Yes. All components are engineered natively for React 19 and Next.js 15 App Router with full TypeScript definitions and zero client runtime friction.',
  },
  {
    id: '5',
    question: 'How do I customize the brand colors and border radius?',
    answer:
      'All colors and styling rely on CSS custom properties (e.g. --primary: #2563eb). You can override them in your root CSS or configure the tailwind.preset.js file in seconds.',
  },
];

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items = defaultFaqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about DevPreFlight UI Kit and licensing.',
  className = '',
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={`py-12 sm:py-16 text-center ${className}`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-3 mb-2">
            {title}
          </h2>
          <p className="text-sm text-[#64748b]">{subtitle}</p>
        </div>

        <div className="space-y-3 text-left">
          {items.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[12px] border border-[#cbd5e1] bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-[#0f172a] hover:text-[#2563eb] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <span
                    className={`w-6 h-6 rounded-full bg-[#f1f5f9] text-[#2563eb] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#eff6ff]' : ''
                      }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#f1f5f9] animate-in fade-in duration-150">
                    <p className="mt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
