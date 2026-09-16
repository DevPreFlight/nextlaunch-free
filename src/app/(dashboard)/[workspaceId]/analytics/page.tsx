import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { BarChart3, TrendingUp, Users, Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default async function AnalyticsPage() {
  const channels = [
    { name: 'Direct Traffic & Search', visitors: '42,800', conv: '4.8%', revenue: '$6,420' },
    { name: 'GitHub Open Source Starters', visitors: '28,100', conv: '6.2%', revenue: '$4,100' },
    { name: 'DevHunt / ProductHunt', visitors: '14,500', conv: '3.1%', revenue: '$1,240' },
    { name: 'X / Twitter & Socials', visitors: '9,200', conv: '2.4%', revenue: '$720' },
  ];

  return (
    <div>
      <DashboardHeader
        title="Workspace Analytics"
        description="Comprehensive funnel conversion metrics, visitor channels, and subscription growth."
      />

      <main className="p-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Total Unique Visitors</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">94,600</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +31.2%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Checkout Conversion Rate</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">4.62%</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                +0.8% vs benchmark
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-medium text-slate-500">Average Revenue Per User (ARPU)</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">$38.50</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                Polar Merchant
              </span>
            </div>
          </div>
        </div>

        {/* Channels Breakdown Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Top Acquisition Channels</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                <tr>
                  <th className="py-3 px-4">Source Channel</th>
                  <th className="py-3 px-4">Visitors</th>
                  <th className="py-3 px-4">Checkout Rate</th>
                  <th className="py-3 px-4 text-right">Revenue Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {channels.map((ch, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-900">{ch.name}</td>
                    <td className="py-3 px-4 text-slate-600">{ch.visitors}</td>
                    <td className="py-3 px-4 text-slate-600">{ch.conv}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">{ch.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
