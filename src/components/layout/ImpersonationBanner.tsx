'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, ArrowRightLeft, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ImpersonationBanner() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [impersonatingUser, setImpersonatingUser] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const checkImpersonation = () => {
      const target = localStorage.getItem('nextlaunch_impersonated_user');
      setImpersonatingUser(target);
    };

    checkImpersonation();
    window.addEventListener('storage', checkImpersonation);
    return () => window.removeEventListener('storage', checkImpersonation);
  }, []);

  if (!mounted || !impersonatingUser) return null;

  const handleExit = () => {
    localStorage.removeItem('nextlaunch_impersonated_user');
    setImpersonatingUser(null);
    router.push('/admin');
  };

  return (
    <div className="bg-amber-400 text-amber-950 font-medium px-4 py-2 text-xs flex items-center justify-between shadow-sm sticky top-0 z-50 border-b border-amber-500">
      <div className="flex items-center gap-2 max-w-2xl">
        <div className="flex items-center justify-center h-5 w-5 rounded bg-amber-950/10 text-amber-950 shrink-0">
          <Eye className="h-3.5 w-3.5" />
        </div>
        <span>
          <strong className="font-bold">Superadmin Impersonation:</strong> Viewing workspace as <span className="underline font-bold">{impersonatingUser}</span>.
        </span>
      </div>
      <button
        type="button"
        onClick={handleExit}
        className="flex items-center gap-1.5 bg-amber-950 hover:bg-black text-amber-100 px-3 py-1 rounded-md font-semibold text-xs transition-colors shadow-sm cursor-pointer shrink-0 ml-4"
      >
        <ArrowRightLeft className="h-3.5 w-3.5 text-amber-300" />
        <span>Exit Impersonation</span>
      </button>
    </div>
  );
}
