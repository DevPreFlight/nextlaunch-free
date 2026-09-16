'use client';

import React from 'react';
import { MetricItem } from '../types';

export interface MetricSparklineCardProps {
  item: MetricItem;
  sparklineColor?: string;
  className?: string;
}

export const MetricSparklineCard: React.FC<MetricSparklineCardProps> = ({
  item,
  sparklineColor = '#2563eb',
  className = '',
}) => {
  const data = item.sparklineData || [12, 18, 15, 24, 21, 30, 28, 42, 38, 55];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Build SVG path
  const width = 120;
  const height = 40;
  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  const isPositive = item.deltaType === 'positive' || (item.delta && item.delta.startsWith('+'));

  return (
    <div
      className={`bg-white rounded-[12px] border border-[#cbd5e1] p-5 shadow-xs text-left flex items-end justify-between gap-4 transition-all duration-150 hover:border-[#93c5fd] ${className}`}
    >
      <div>
        <span className="text-xs font-semibold text-[#64748b] block mb-1">{item.label}</span>
        <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight block">
          {item.value}
        </span>
        {item.delta && (
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold mt-1 ${
              isPositive ? 'text-[#16a34a]' : 'text-[#dc2626]'
            }`}
          >
            {isPositive ? '▲' : '▼'} {item.delta} {item.comparisonPeriod || 'vs last month'}
          </span>
        )}
      </div>

      <div className="shrink-0">
        <svg width={width} height={height} className="overflow-visible">
          <polyline
            fill="none"
            stroke={sparklineColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
};
