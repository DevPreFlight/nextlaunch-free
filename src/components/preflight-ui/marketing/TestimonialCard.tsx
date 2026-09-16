'use client';

import React from 'react';
import { TestimonialItem } from '../types';
import { Avatar } from '../primitives/Avatar';

export interface TestimonialCardProps {
  item: TestimonialItem;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ item, className = '' }) => {
  return (
    <div
      className={`p-6 rounded-[14px] bg-white border border-[#e2e8f0] hover:border-[#bfdbfe] hover:shadow-xs transition-all flex flex-col justify-between text-left ${className}`}
    >
      <div>
        {/* Rating Stars */}
        <div className="flex text-[#f59e0b] text-sm mb-3">
          {Array.from({ length: item.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-[#334155] leading-relaxed mb-5 italic">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#f1f5f9]">
        <Avatar name={item.author} src={item.avatar} size="sm" />
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold text-[#0f172a]">{item.author}</h4>
            {item.verified && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
                Verified Buyer
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#64748b]">
            {item.role}, {item.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface TestimonialsGridProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  items?: TestimonialItem[];
  className?: string;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: '1',
    quote:
      'DevPreFlight UI Kit literally cut 3 weeks off our SaaS launch. The flat blue and white design is crisp, clean, and converting our traffic way better than bulky UI libraries.',
    author: 'Sarah Jenkins',
    role: 'Founder',
    company: 'ShipFlow.co',
    avatar: '',
    rating: 5,
    verified: true,
  },
  {
    id: '2',
    quote:
      'Zero dependencies is a huge game changer. We simply copied the React TSX files and had our billing matrix and data grids running in less than an hour.',
    author: 'David Chen',
    role: 'Lead Architect',
    company: 'Veloce AI',
    avatar: '',
    rating: 5,
    verified: true,
  },
  {
    id: '3',
    quote:
      'The WCAG AAA contrast and keyboard shortcuts make our app feel like an enterprise-grade product from day one. Highly recommended for any serious builder.',
    author: 'Elena Rostova',
    role: 'Senior Product Designer',
    company: 'StackPulse',
    avatar: '',
    rating: 5,
    verified: true,
  },
];

export const TestimonialsGrid: React.FC<TestimonialsGridProps> = ({
  tag = 'REAL DEVELOPER STORIES',
  title = 'Loved by 1,200+ Builders Worldwide',
  subtitle = 'See what founders, designers, and engineers say about shipping with DevPreFlight Flat UI.',
  items = defaultTestimonials,
  className = '',
}) => {
  return (
    <section className={`py-12 sm:py-16 text-center ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12">
          {tag && (
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full">
              {tag}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight mt-3 mb-2">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#64748b]">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
