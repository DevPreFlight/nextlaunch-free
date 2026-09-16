'use client';

import React from 'react';
import { MetricItem } from '../types';

export interface MetricCardProps {
  item: MetricItem;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ item, className = '' }) => {
  const isPositive = item.deltaType === 'positive' || (item.delta && item.delta.startsWith('+'));
  const isNegative = item.deltaType === 'negative' || (item.delta && item.delta.startsWith('-'));

  return (
    <div
      className={`bg-white rounded-[12px] border border-[#cbd5e1] p-5 shadow-xs text-left transition-all duration-150 hover:border-[#93c5fd] hover:shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold text-[#64748b] truncate">{item.label}</span>
        {item.delta && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border ${
              isPositive
                ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]'
                : isNegative
                ? 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'
                : 'bg-[#f8fafc] text-[#475569] border-[#e2e8f0]'
            }`}
          >
            {isPositive && '▲'}
            {isNegative && '▼'}
            {item.delta}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
          {item.value}
        </span>
      </div>

      {item.comparisonPeriod && (
        <p className="text-[11px] text-[#64748b] mt-1.5 font-medium">{item.comparisonPeriod}</p>
      )}
    </div>
  );
};
