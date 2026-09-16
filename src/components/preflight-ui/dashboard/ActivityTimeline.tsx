'use client';

import React from 'react';
import { ActivityEvent } from '../types';
import { Avatar } from '../primitives/Avatar';
import { StatusBadge } from './StatusBadge';

export interface ActivityTimelineProps {
  events: ActivityEvent[];
  title?: string;
  className?: string;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  events,
  title,
  className = '',
}) => {
  return (
    <div className={`w-full bg-white rounded-[12px] border border-[#cbd5e1] p-5 shadow-xs text-left ${className}`}>
      {title && (
        <h3 className="text-base font-bold text-[#0f172a] tracking-tight mb-4 border-b border-[#f1f5f9] pb-3">
          {title}
        </h3>
      )}

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e2e8f0]">
        {events.map((event) => (
          <div key={event.id} className="relative flex items-start gap-3">
            {/* Timeline dot */}
            <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-[#2563eb] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                <div className="flex items-center gap-2">
                  <Avatar name={event.user.name} src={event.user.avatar} size="xs" />
                  <span className="text-xs font-bold text-[#0f172a]">{event.user.name}</span>
                </div>
                <span className="text-[11px] text-[#94a3b8]">{event.timestamp}</span>
              </div>

              <p className="text-xs text-[#334155] leading-relaxed">
                {event.action}{' '}
                {event.target && <strong className="text-[#0f172a]">{event.target}</strong>}
              </p>

              {event.status && (
                <div className="mt-1.5">
                  <StatusBadge status={event.status} size="sm" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
