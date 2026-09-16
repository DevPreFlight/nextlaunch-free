'use client';

import React, { useState } from 'react';
import { Button } from '../primitives/Button';

export interface CheckoutItem {
  id: string;
  name: string;
  tier: string;
  price: number;
}

export interface CheckoutSummaryCardProps {
  items?: CheckoutItem[];
  defaultCoupon?: string;
  onCheckout?: (finalTotal: number, couponCode?: string) => void;
  className?: string;
}

export const CheckoutSummaryCard: React.FC<CheckoutSummaryCardProps> = ({
  items = [
    {
      id: '1',
      name: 'DevPreFlight Flat UI Component Kit',
      tier: 'Pro Commercial License',
      price: 79,
    },
  ],
  defaultCoupon = '',
  onCheckout,
  className = '',
}) => {
  const [couponInput, setCouponInput] = useState(defaultCoupon);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const taxableAmount = subtotal - discountAmount;
  const estimatedTax = 0; // 0% digital goods standard or computed
  const total = taxableAmount + estimatedTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setIsApplying(true);

    setTimeout(() => {
      setIsApplying(false);
      if (couponInput.toUpperCase() === 'PREFLIGHT20') {
        setAppliedDiscount(20);
      } else {
        setCouponError('Invalid coupon code. Try PREFLIGHT20');
      }
    }, 400);
  };

  return (
    <div
      className={`w-full max-w-md bg-white rounded-[14px] border border-[#cbd5e1] p-6 shadow-sm text-left ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4 mb-4">
        <h3 className="text-lg font-bold text-[#0f172a] tracking-tight">Order Summary</h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]">
          SSL 256-bit Encrypted
        </span>
      </div>

      {/* Item List */}
      <div className="space-y-3 mb-5">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
            <div>
              <p className="font-semibold text-[#0f172a]">{item.name}</p>
              <p className="text-xs text-[#64748b]">{item.tier}</p>
            </div>
            <span className="font-bold text-[#0f172a]">${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Promo Code Form */}
      <form onSubmit={handleApplyCoupon} className="mb-5">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Promo code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="flex-1 text-xs uppercase font-mono px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-[8px] outline-none focus:border-[#2563eb] text-[#0f172a]"
          />
          <button
            type="submit"
            disabled={isApplying || !couponInput.trim()}
            className="px-3.5 py-2 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] text-xs font-semibold rounded-[8px] transition-all cursor-pointer disabled:opacity-50"
          >
            {isApplying ? 'Applying...' : 'Apply'}
          </button>
        </div>
        {appliedDiscount > 0 && (
          <p className="text-xs text-[#16a34a] font-medium mt-1">✓ {appliedDiscount}% discount applied!</p>
        )}
        {couponError && <p className="text-xs text-[#dc2626] font-medium mt-1">{couponError}</p>}
      </form>

      {/* Calculation Breakdown */}
      <div className="space-y-2 border-t border-[#f1f5f9] pt-4 mb-5 text-xs text-[#64748b]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-[#334155]">${subtotal.toFixed(2)}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-[#16a34a]">
            <span>Promo Discount ({appliedDiscount}%)</span>
            <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>VAT / Tax (Included/Zero-rated)</span>
          <span className="font-semibold text-[#334155]">${estimatedTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-[#0f172a] border-t border-[#e2e8f0] pt-3 mt-1">
          <span>Total Due</span>
          <span className="text-[#2563eb]">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        fullWidth
        size="lg"
        onClick={() => onCheckout?.(total, couponInput)}
        rightIcon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        }
      >
        Complete Checkout (${total.toFixed(2)})
      </Button>

      <p className="text-[11px] text-center text-[#94a3b8] mt-3">
        Instant access via GitHub & Download link sent to email immediately.
      </p>
    </div>
  );
};
