'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export interface AuditEvent {
  id: string;
  type: string;
  desc: string;
  time: string;
  amount?: string;
  status: 'success' | 'info' | 'warning' | 'neutral';
}

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface DemoContextType {
  mrr: number;
  activeSubscribers: number;
  apiCalls: number;
  currentPlan: 'free' | 'pro' | 'enterprise';
  events: AuditEvent[];
  toasts: ToastItem[];
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  triggerConfetti: () => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  simulateWebhook: (eventType: 'order.created' | 'subscription.created' | 'subscription.canceled' | 'api.key.created' | 'team.invite') => void;
  setPlan: (plan: 'free' | 'pro' | 'enterprise') => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [mrr, setMrr] = useState(14850);
  const [activeSubscribers, setActiveSubscribers] = useState(512);
  const [apiCalls, setApiCalls] = useState(1420500);
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro' | 'enterprise'>('pro');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const [events, setEvents] = useState<AuditEvent[]>([
    {
      id: 'evt_1',
      type: 'polar.subscription.created',
      desc: 'New Pro Plan subscription from Vertex Labs ($29/mo)',
      time: 'Just now',
      amount: '+$29.00',
      status: 'success',
    },
    {
      id: 'evt_2',
      type: 'team.member.joined',
      desc: 'sarah@vertexlabs.io accepted workspace invite as Admin',
      time: '12m ago',
      status: 'info',
    },
    {
      id: 'evt_3',
      type: 'polar.order.created',
      desc: 'Annual Addon Package checkout completed ($120.00)',
      time: '45m ago',
      amount: '+$120.00',
      status: 'success',
    },
    {
      id: 'evt_4',
      type: 'api.key.created',
      desc: 'Production API Key "NextLaunch Prod" generated',
      time: '2h ago',
      status: 'neutral',
    },
  ]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#0284c7', '#10b981', '#6366f1'],
      });
    } catch (e) {
      // Fallback if browser environment issues
    }
  };

  const addToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const simulateWebhook = (
    eventType: 'order.created' | 'subscription.created' | 'subscription.canceled' | 'api.key.created' | 'team.invite'
  ) => {
    const now = 'Just now';
    if (eventType === 'subscription.created') {
      setMrr((prev) => prev + 29);
      setActiveSubscribers((prev) => prev + 1);
      setEvents((prev) => [
        {
          id: `evt_${Date.now()}`,
          type: 'polar.subscription.created',
          desc: 'Verified Polar Webhook: Customer upgraded to Pro ($29/mo)',
          time: now,
          amount: '+$29.00',
          status: 'success',
        },
        ...prev,
      ]);
      triggerConfetti();
      addToast('Polar Webhook Processed (200 OK)', 'New Pro subscription verified via Standard Webhooks Ed25519 signature.', 'success');
    } else if (eventType === 'order.created') {
      setMrr((prev) => prev + 49);
      setEvents((prev) => [
        {
          id: `evt_${Date.now()}`,
          type: 'polar.order.created',
          desc: 'Verified Polar Webhook: One-time Micro Module purchase ($49.00)',
          time: now,
          amount: '+$49.00',
          status: 'success',
        },
        ...prev,
      ]);
      triggerConfetti();
      addToast('Polar Order Completed', 'Received $49.00 order with automatic VAT receipt generation.', 'success');
    } else if (eventType === 'subscription.canceled') {
      setMrr((prev) => Math.max(0, prev - 29));
      setActiveSubscribers((prev) => Math.max(0, prev - 1));
      setEvents((prev) => [
        {
          id: `evt_${Date.now()}`,
          type: 'polar.subscription.canceled',
          desc: 'Polar Webhook: Subscription canceled at period end',
          time: now,
          status: 'warning',
        },
        ...prev,
      ]);
      addToast('Subscription Cancellation Handled', 'Customer downgrade scheduled gracefully at current period end.', 'warning');
    } else if (eventType === 'api.key.created') {
      setEvents((prev) => [
        {
          id: `evt_${Date.now()}`,
          type: 'api.key.created',
          desc: 'New high-throughput API key generated (Prefix: nl_live_8f3a)',
          time: now,
          status: 'neutral',
        },
        ...prev,
      ]);
      addToast('API Key Activated', 'New bearer token ready for programmatic access.', 'info');
    } else if (eventType === 'team.invite') {
      setEvents((prev) => [
        {
          id: `evt_${Date.now()}`,
          type: 'team.invite.dispatched',
          desc: 'Invitation email dispatched via Resend to developer seat',
          time: now,
          status: 'info',
        },
        ...prev,
      ]);
      addToast('Team Invitation Sent', 'Access link generated with secure temporary OAuth nonce.', 'info');
    }
  };

  const setPlan = (plan: 'free' | 'pro' | 'enterprise') => {
    setCurrentPlan(plan);
    if (plan === 'enterprise') {
      triggerConfetti();
      addToast('Upgraded to Enterprise Scale', 'All feature paywalls unlocked + custom domain provisioned.', 'success');
    } else if (plan === 'pro') {
      triggerConfetti();
      addToast('Plan set to Pro Launch', 'Team seats expanded to 50 members.', 'success');
    } else {
      addToast('Switched to Free Tier', 'Standard single-user limits applied.', 'info');
    }
  };

  return (
    <DemoContext.Provider
      value={{
        mrr,
        activeSubscribers,
        apiCalls,
        currentPlan,
        events,
        toasts,
        showUpgradeModal,
        setShowUpgradeModal,
        triggerConfetti,
        addToast,
        removeToast,
        simulateWebhook,
        setPlan,
      }}
    >
      {children}

      {/* Global Live Toast Notification Stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none select-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-300 ${
              toast.type === 'success'
                ? 'border-emerald-200 bg-emerald-50/95 text-emerald-900'
                : toast.type === 'warning'
                ? 'border-amber-200 bg-amber-50/95 text-amber-900'
                : toast.type === 'error'
                ? 'border-red-200 bg-red-50/95 text-red-900'
                : 'border-blue-200 bg-blue-50/95 text-blue-900'
            }`}
          >
            <div className="flex-1">
              <p className="text-xs font-bold leading-tight">{toast.title}</p>
              <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-xs opacity-60 hover:opacity-100 p-0.5"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return ctx;
}
