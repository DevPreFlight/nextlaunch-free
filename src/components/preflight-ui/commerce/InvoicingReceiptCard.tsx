'use client';

import React from 'react';
import { Button } from '../primitives/Button';

export interface InvoicingReceiptCardProps {
  invoiceNumber?: string;
  date?: string;
  customerName?: string;
  customerEmail?: string;
  planName?: string;
  amount?: number;
  paymentMethod?: string;
  status?: 'PAID' | 'PENDING' | 'REFUNDED';
  onDownloadPdf?: () => void;
  className?: string;
}

export const InvoicingReceiptCard: React.FC<InvoicingReceiptCardProps> = ({
  invoiceNumber = 'INV-2026-8841',
  date = 'Sep 13, 2026',
  customerName = 'Alex Mercer',
  customerEmail = 'alex@devpreflight.com',
  planName = 'DevPreFlight Flat UI Component Kit - Pro Bundle',
  amount = 63.20,
  paymentMethod = 'Credit Card (•••• 4242)',
  status = 'PAID',
  onDownloadPdf,
  className = '',
}) => {
  return (
    <div
      className={`w-full max-w-lg bg-white rounded-[14px] border border-[#cbd5e1] p-6 sm:p-7 shadow-xs text-left ${className}`}
    >
      {/* Receipt Top Brand & Status */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-5 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[6px] bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm">
            ▲
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#0f172a]">DevPreFlight</h4>
            <span className="text-[11px] text-[#64748b]">Official Digital Receipt</span>
          </div>
        </div>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${status === 'PAID'
            ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]'
            : 'bg-[#fff7ed] text-[#ea580c] border-[#fed7aa]'
            }`}
        >
          {status}
        </span>
      </div>

      {/* Invoice Meta Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs mb-6 p-4 rounded-[8px] bg-[#f8fafc] border border-[#f1f5f9]">
        <div>
          <span className="text-[#64748b] block mb-0.5">Invoice Reference:</span>
          <span className="font-mono font-bold text-[#0f172a] break-all">{invoiceNumber}</span>
        </div>
        <div>
          <span className="text-[#64748b] block mb-0.5">Issued Date:</span>
          <span className="font-medium text-[#0f172a]">{date}</span>
        </div>
        <div>
          <span className="text-[#64748b] block mb-0.5">Billed To:</span>
          <span className="font-medium text-[#0f172a]">{customerName}</span>
          <span className="text-[11px] text-[#64748b] block break-all">{customerEmail}</span>
        </div>
        <div>
          <span className="text-[#64748b] block mb-0.5">Payment Method:</span>
          <span className="font-medium text-[#0f172a]">{paymentMethod}</span>
        </div>
      </div>

      {/* Item Line */}
      <div className="border-t border-b border-[#f1f5f9] py-4 mb-5">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div>
            <p className="font-semibold text-[#0f172a]">{planName}</p>
            <p className="text-xs text-[#64748b]">Lifetime commercial updates & repository access</p>
          </div>
          <span className="font-bold text-[#0f172a]">${amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Total Amount */}
      <div className="flex items-center justify-between text-base font-extrabold text-[#0f172a] mb-6">
        <span>Amount Paid</span>
        <span className="text-[#2563eb] text-xl">${amount.toFixed(2)} USD</span>
      </div>

      {/* Action */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          size="sm"
          fullWidth
          onClick={onDownloadPdf || (() => window.print())}
          leftIcon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          }
        >
          Download PDF / Print
        </Button>
      </div>
    </div>
  );
};
