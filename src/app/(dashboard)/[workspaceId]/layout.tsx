import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DemoSimulatorBar } from '@/components/layout/DemoSimulatorBar';
import { ImpersonationBanner } from '@/components/layout/ImpersonationBanner';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { DemoProvider } from '@/lib/demo-context';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const resolvedParams = await params;
  const workspaceId = resolvedParams.workspaceId;

  return (
    <DemoProvider>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <DashboardSidebar workspaceId={workspaceId} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
          <ImpersonationBanner />
          {children}
          <DemoSimulatorBar workspaceId={workspaceId} />
          <CommandPalette workspaceId={workspaceId} />
        </div>
      </div>
    </DemoProvider>
  );
}
