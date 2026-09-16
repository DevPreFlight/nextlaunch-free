import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function RootPage() {
  const user = await getCurrentUser();
  const workspaceSlug = user?.workspaces?.[0]?.slug || user?.currentWorkspaceId || 'ws_demo_cloud_01';
  redirect(`/${workspaceSlug}`);
}

