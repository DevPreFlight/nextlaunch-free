'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface PopoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  width?: string;
  className?: string;
}

export const PopoverCard: React.FC<PopoverCardProps> = ({
  trigger,
  children,
  align = 'center',
  width = 'w-72',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  }[align];

  return (
    <div ref={containerRef} className="relative inline-flex">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 z-40 ${alignClasses} ${width} max-w-[calc(100vw-32px)] bg-white rounded-[12px] border border-[#cbd5e1] shadow-xl p-4 animate-in fade-in zoom-in-95 duration-150 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
